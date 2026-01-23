<script lang="ts">
  import { GeoJSON, MapLibre, LineLayer } from "svelte-maplibre";
  import { Layout } from "../lib/two_column_layout/index.svelte.js";
  import {
    basemapStyles,
    Basemaps,
    StandardControls,
    MapContextMenu,
    Geocoder,
  } from "../lib/map/index.js";
  import { OsmLoader } from "../lib/osm/index.js";
  import { Loading } from "../lib/index.js";
  import type { Map } from "maplibre-gl";
  import { PolygonToolLayer } from "maplibre-draw-polygon";

  let basemap = $state("Maptiler Dataviz");
  let style = $derived(basemapStyles.get(basemap)!);

  let map: Map | undefined = $state();
  let loading = $state("");
  function onload(osmInput: Uint8Array, boundary: any) {
    loading = "";
    window.alert(`Got ${osmInput.length.toLocaleString()} bytes of OSM input`);
  }
</script>

<Loading {loading} />

<Layout>
  {#snippet left()}
    <h1>svelte-utils demo</h1>

    <OsmLoader
      {map}
      onloading={(msg) => (loading = msg)}
      {onload}
      onerror={(msg) => {
        window.alert(msg);
        loading = "";
      }}
    />
  {/snippet}

  {#snippet main()}
    <div style="position:relative; width: 100%; height: 100vh;">
      <MapLibre
        {style}
        onerror={(e) => {
          console.log(e.error);
        }}
        bind:map
      >
        {#snippet children({ map, loaded })}
          <StandardControls {map} />
          <MapContextMenu {map}>
            {#snippet children({ position })}
              <button onclick={() => window.alert(position)}
                >Custom control</button
              >
            {/snippet}
          </MapContextMenu>
          <Basemaps bind:basemap />
          <Geocoder {map} {loaded} />
          <PolygonToolLayer />
        {/snippet}
      </MapLibre>
    </div>
  {/snippet}
</Layout>

<style>
  :global(body) {
    margin: 0px;
  }

  :global(div) {
    box-sizing: border-box;
  }
</style>
