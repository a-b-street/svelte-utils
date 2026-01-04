import type { Feature, Polygon, MultiPolygon } from "geojson";

export { default as OsmLoader } from "./OsmLoader.svelte";

// Construct a query to extract all XML data in the polygon clip. See
// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL. Note polygon
// holes are ignored, and for MultiPolygons, only the first polygon is used.
export function overpassQueryForPolygon(
  feature: Feature<Polygon | MultiPolygon>,
): string {
  let filter = 'poly:"';
  if (feature.geometry.type == "Polygon") {
    for (let [lng, lat] of feature.geometry.coordinates[0]) {
      filter += `${lat} ${lng} `;
    }
  } else if (feature.geometry.type == "MultiPolygon") {
    for (let [lng, lat] of feature.geometry.coordinates[0][0]) {
      filter += `${lat} ${lng} `;
    }
  } else {
    throw new Error("overpassQueryForPolygon needs a Polygon or MultiPolygon");
  }
  filter = filter.slice(0, -1) + '"';
  let query = `(nwr(${filter}); node(w)->.x; <;); out meta;`;
  return `https://overpass-api.de/api/interpreter?data=${query}`;
}
