import type { Feature, Polygon } from "geojson";

export { default as Geocoder } from "./Geocoder.svelte";
export { default as Legend } from "./Legend.svelte";
export { default as Loading } from "./Loading.svelte";
export { default as Modal } from "./Modal.svelte";
export { default as OverpassSelector } from "./OverpassSelector.svelte";
export { default as Popup } from "./Popup.svelte";
export { default as PropertiesTable } from "./PropertiesTable.svelte";
export { default as SequentialLegend } from "./SequentialLegend.svelte";

// Construct a query to extract all XML data in the polygon clip. See
// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL
export function overpassQueryForPolygon(feature: Feature<Polygon>): string {
  let filter = 'poly:"';
  for (let [lng, lat] of feature.geometry.coordinates[0]) {
    filter += `${lat} ${lng} `;
  }
  filter = filter.slice(0, -1) + '"';
  let query = `(nwr(${filter}); node(w)->.x; <;); out meta;`;
  return `https://overpass-api.de/api/interpreter?data=${query}`;
}
