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
    if (map) {
        console.log(`https://www.openstreetmap.org/#map=${getViewportHash(map)}`);
      window.open(
        `https://www.openstreetmap.org/#map=${getViewportHash(map)}`,
        "_blank",
      );
    }
  }

  // Adapted from https://github.com/maplibre/maplibre-gl-js/blob/5d7e6d52000a8569ac2308a9aef14c98933eb0d8/src/ui/hash.ts
  function getViewportHash(map: Map): string {
    let center = map.getCenter();
    let zoom = Math.round(map.getZoom() * 100) / 100;
    // derived from equation: 512px * 2^z / 360 / 10^d < 0.5px
    let precision = Math.ceil(
      (zoom * Math.LN2 + Math.log(512 / 360 / 0.5)) / Math.LN10,
    );
    let m = Math.pow(10, precision);
    let lat = Math.round(center.lat * m) / m;
    let lng = Math.round(center.lng * m) / m;
    let hash = `${zoom}/${lat}/${lng}`;

    let bearing = map.getBearing();
    let pitch = map.getPitch();
    if (bearing || pitch) {
      hash += `/${Math.round(bearing * 10) / 10}`;
    }
    if (pitch) {
      hash += `/${Math.round(pitch)}`;
    }
    return hash;
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
