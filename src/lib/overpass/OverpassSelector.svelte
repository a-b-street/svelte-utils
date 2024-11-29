<script lang="ts">
  import type { Feature, Polygon } from "geojson";
  import type { LngLat, Map } from "maplibre-gl";
  import { createEventDispatcher } from "svelte";
  import { overpassQueryForPolygon } from "./index.js";
  import { PolygonTool, PolygonControls } from "maplibre-draw-polygon";
  import { downloadGeneratedFile } from "../index.js";

  export let map: Map | null;

  const dispatch = createEventDispatcher<{
    loading: string;
    gotXml: {
      xml: string;
      boundary: Feature<Polygon>;
    };
    error: string;
  }>();

  let polygonTool: PolygonTool | null = null;
  let saveCopy = false;

  async function importPolygon(boundaryGj: Feature<Polygon>) {
    try {
      dispatch("loading", "Loading from Overpass");
      let resp = await fetch(overpassQueryForPolygon(boundaryGj));
      let osmXml = await resp.text();

      if (saveCopy) {
        downloadGeneratedFile("osm.xml", osmXml);
      }

      dispatch("gotXml", { xml: osmXml, boundary: boundaryGj });
    } catch (err: any) {
      dispatch("error", err.toString());
    }
  }

  function latLngToGeojson(pt: LngLat): [number, number] {
    return [pt.lng, pt.lat];
  }

  // Turn the current viewport into a rectangular boundary
  function mapBoundsToGeojson(): Feature<Polygon> {
    let b = map!.getBounds();
    return {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [
            latLngToGeojson(b.getSouthWest()),
            latLngToGeojson(b.getNorthWest()),
            latLngToGeojson(b.getNorthEast()),
            latLngToGeojson(b.getSouthEast()),
            latLngToGeojson(b.getSouthWest()),
          ],
        ],
        type: "Polygon",
      },
    };
  }

  async function importCurrentView() {
    if (!map) {
      return;
    }
    if (map.getZoom() < 13) {
      dispatch("error", "Zoom in more to import");
      return;
    }
    await importPolygon(mapBoundsToGeojson());
  }

  function startPolygonTool() {
    if (!map) {
      return;
    }
    polygonTool = new PolygonTool(map);
    polygonTool.startNew();
    polygonTool.addEventListenerSuccess(async (f) => {
      polygonTool = null;
      await importPolygon(f);
    });
    polygonTool.addEventListenerFailure(() => {
      polygonTool = null;
    });
  }
</script>

{#if polygonTool}
  <PolygonControls {polygonTool} />
{:else}
  <button type="button" on:click={importCurrentView}>
    Import current view
  </button>

  <i>or...</i>

  <button type="button" on:click={startPolygonTool}>
    Draw an area to import on the map
  </button>
{/if}

<label>
  <input type="checkbox" bind:checked={saveCopy} />Save a copy of the osm.xml
  after importing
</label>
