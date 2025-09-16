<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import { Popup, LngLat, type Map, type MapMouseEvent } from "maplibre-gl";
  import { MapEvents } from "svelte-maplibre";

  let {
    map,
    children,
  }: { map: Map | undefined; children?: Snippet<[{ position: LngLat }]> } =
    $props();

  let contents: HTMLDivElement | undefined = $state();
  let popup = new Popup({ closeButton: false, className: "popup-box" });
  // TODO A weird indirection. Could we instead construct contents only once popup is set?
  let position: LngLat | undefined = $state();

  $effect(() => {
    if (contents) {
      popup.setDOMContent(contents);
    }
  });

  onDestroy(() => {
    if (map && popup?.isOpen()) {
      popup.remove();
    }
  });

  function onRightClick(e: MapMouseEvent) {
    if (map) {
      position = e.lngLat;
      popup.setLngLat(e.lngLat).addTo(map);
    }
  }

  function openStreetview() {
    let { lng, lat } = popup.getLngLat();
    window.open(
      `http://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0`,
      "_blank",
    );
  }

  function openOSM() {
    let { lng, lat } = popup.getLngLat();
    // Or would it be better to match the current viewport?
    window.open(
      `https://www.openstreetmap.org/#map=17/${lat}/${lng}`,
      "_blank",
    );
  }
</script>

<MapEvents oncontextmenu={onRightClick} />

<div bind:this={contents}>
  <div class="d-grid gap-2">
    <button class="btn btn-primary" onclick={openStreetview}>
      Streetview
    </button>

    <button class="btn btn-primary" onclick={openOSM}>OSM</button>

    {@render children?.({ position: position! })}
  </div>
</div>

<style>
  :global(.popup-box) {
    border: 1px solid black;
  }
</style>
