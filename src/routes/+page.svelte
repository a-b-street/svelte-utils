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

  let basemap = $state("Maptiler Dataviz");
  let style = $derived(basemapStyles.get(basemap)!);
</script>

<Layout>
  {#snippet left()}
    <h1>svelte-utils demo</h1>
  {/snippet}

  {#snippet main()}
    <div style="position:relative; width: 100%; height: 100vh;">
      <MapLibre
        {style}
        onerror={(e) => {
          console.log(e.error);
        }}
      >
        {#snippet children({ map })}
          <StandardControls {map} />
          <MapContextMenu {map} />
          <Basemaps bind:basemap />
          <Geocoder {map} />
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
