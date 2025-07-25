<script lang="ts">
  import { GeoJSON, MapLibre, LineLayer } from "svelte-maplibre";
  import { Layout } from "../lib/two_column_layout/index.js";
  import {
    basemapStyles,
    Basemaps,
    StandardControls,
    MapContextMenu,
  } from "../lib/map/index.js";

  let style = $state(basemapStyles["Maptiler Dataviz"]);
</script>

<Layout>
  {#snippet left()}
    <div>
      <h1>svelte-utils demo</h1>
    </div>
  {/snippet}

  {#snippet main()}
    <div style="position:relative; width: 100%; height: 100vh;">
      <MapLibre
        {style}
        on:error={(e) => {
          // @ts-ignore ErrorEvent isn't exported
          console.log(e.detail.error);
        }}
      >
        {#snippet children({ map })}
          <StandardControls {map} />
          <MapContextMenu {map} />
          <Basemaps bind:style choice="Maptiler Dataviz" />
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
