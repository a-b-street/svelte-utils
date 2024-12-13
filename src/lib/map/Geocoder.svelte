<script lang="ts">
  import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl";
  import type { MapController } from "@maptiler/geocoding-control/types";
  import GeocodingControl from "@maptiler/geocoding-control/svelte/GeocodingControl.svelte";
  import maplibregl, { type Map } from "maplibre-gl";

  export let apiKey: string;
  export let map: Map | null;

  $: mapController = setup(map);

  function setup(map: Map | null): MapController | null {
    if (!map) {
      return null;
    }
    let marker = true;
    let showResultMarkers = true;
    let flyToOptions = {
      duration: 1000,
    };
    let fitBoundsOptions = {
      duration: 1000,
    };
    return createMapLibreGlMapController(
      map,
      maplibregl,
      marker,
      showResultMarkers,
      flyToOptions,
      fitBoundsOptions,
    );
  }
</script>

{#if mapController}
  <div>
    <GeocodingControl
      {mapController}
      {apiKey}
      proximity={[
        {
          type: "map-center",
        },
      ]}
    />
  </div>
{/if}

<style>
  div {
    position: absolute;
    top: 20px;
    left: 50px;
  }
</style>
