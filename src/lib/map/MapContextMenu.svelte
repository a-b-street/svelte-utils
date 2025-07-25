<script lang="ts">
  import { run } from "svelte/legacy";

  import { onDestroy } from "svelte";
  import { Popup, type Map, type MapMouseEvent } from "maplibre-gl";
  import { MapEvents } from "svelte-maplibre";

  interface Props {
    map: Map | undefined;
  }

  let { map }: Props = $props();

  let contents: HTMLDivElement | undefined = $state();
  let popup = new Popup({ closeButton: false, className: "popup-box" });

  run(() => {
    if (contents) {
      popup.setDOMContent(contents);
    }
  });

  onDestroy(() => {
    if (map && popup?.isOpen()) {
      popup.remove();
    }
  });

  function onRightClick(e: CustomEvent<MapMouseEvent>) {
    if (map) {
      popup.setLngLat(e.detail.lngLat).addTo(map);
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

<MapEvents on:contextmenu={onRightClick} />

<div bind:this={contents}>
  <div class="d-grid gap-2">
    <button class="btn btn-primary" onclick={openStreetview}>
      Streetview
    </button>
    <button class="btn btn-primary" onclick={openOSM}>OSM</button>
  </div>
</div>

<style>
  :global(.popup-box) {
    border: 1px solid black;
  }
</style>
