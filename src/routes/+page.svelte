<script lang="ts">
  import { GeoJSON, MapLibre, LineLayer } from "svelte-maplibre";
  import { Layout } from "../lib/two_column_layout/index.js";
  import {
    basemapStyles,
    Basemaps,
    StandardControls,
    MapContextMenu,
  } from "../lib/map/index.js";

  let style = basemapStyles["Maptiler Dataviz"];
</script>

<Layout>
  <div slot="left">
    <h1>svelte-utils demo</h1>
  </div>

  <div slot="main" style="position:relative; width: 100%; height: 100vh;">
    <MapLibre
      {style}
      on:error={(e) => {
        // @ts-ignore ErrorEvent isn't exported
        console.log(e.detail.error);
      }}
      let:map
    >
      <StandardControls {map} />
      <MapContextMenu {map} />
      <Basemaps bind:style choice="Maptiler Dataviz" />
    </MapLibre>
  </div>
</Layout>

<style>
  :global(body) {
    margin: 0px;
  }

  :global(div) {
    box-sizing: border-box;
  }
</style>
