<script lang="ts">
  import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl";
  import GeocodingControl from "@maptiler/geocoding-control/svelte/GeocodingControl.svelte";
  import maplibregl, { type Map } from "maplibre-gl";

  export let apiKey: string;
  export let map: Map | null;

  $: mapController = map
    ? createMapLibreGlMapController(map, maplibregl)
    : null;

  // TODO Show markers
  // TODO Set the flyTo duration
</script>

{#if mapController}
  <div>
    <GeocodingControl {mapController} {apiKey} />
  </div>
{/if}

<style>
  div {
    position: absolute;
    top: 20px;
    left: 50px;
  }
</style>
