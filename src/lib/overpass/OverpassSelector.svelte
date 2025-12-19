<script lang="ts">
  import type { Feature, Polygon } from "geojson";
  import type { LngLat, Map } from "maplibre-gl";
  import { overpassQueryForPolygon } from "./index.js";
  import { PolygonTool, PolygonControls } from "maplibre-draw-polygon";
  import { downloadGeneratedFile, Checkbox } from "../index.js";

  interface Props {
    map: Map | undefined;
    onloading?: (msg: string) => void;
    gotXml?: (xml: string, boundary: Feature<Polygon>) => void;
    onerror?: (msg: string) => void;
  }
  let { map, onloading, gotXml, onerror }: Props = $props();

  let polygonTool: PolygonTool | null = $state(null);
  let saveCopy = $state(false);

  async function importPolygon(boundaryGj: Feature<Polygon>) {
    try {
      onloading?.("Loading from Overpass");
      let resp = await fetch(overpassQueryForPolygon(boundaryGj));
      if (!resp.ok) {
        throw new Error(
          `Overpass response is not OK: ${resp.status}. The API is often overloaded; try again in a few seconds.`,
        );
      }
      let osmXml = await resp.text();

      if (saveCopy) {
        downloadGeneratedFile("osm.xml", osmXml);
      }

      gotXml?.(osmXml, boundaryGj);
    } catch (err: any) {
      onerror?.(err.toString());
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
      onerror?.("Zoom in more to import");
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
  <button class="btn btn-primary" type="button" onclick={importCurrentView}>
    Import current view
  </button>

  <p class="fst-italic my-3">or...</p>

  <button class="btn btn-primary" type="button" onclick={startPolygonTool}>
    Draw an area to import on the map
  </button>
{/if}

<Checkbox bind:checked={saveCopy}>
  Save a copy of the osm.xml after importing
</Checkbox>
