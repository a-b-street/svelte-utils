import turfBbox from "@turf/bbox";
import type { Feature, FeatureCollection, GeoJSON, Point, Polygon, Position } from "geojson";
import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
} from "maplibre-gl";

export { default as Geocoder } from "./Geocoder.svelte";
export { default as Legend } from "./Legend.svelte";
export { default as Loading } from "./Loading.svelte";
export { default as Modal } from "./Modal.svelte";
export { default as OverpassSelector } from "./OverpassSelector.svelte";
export { default as Popup } from "./Popup.svelte";
export { default as PropertiesTable } from "./PropertiesTable.svelte";
export { default as SequentialLegend } from "./SequentialLegend.svelte";

// TODO Figure out subpath exports and organize these more

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

export const isPolygon: ExpressionSpecification = [
  "==",
  ["geometry-type"],
  "Polygon",
];
export const isLine: ExpressionSpecification = [
  "==",
  ["geometry-type"],
  "LineString",
];
export const isPoint: ExpressionSpecification = [
  "==",
  ["geometry-type"],
  "Point",
];

export function constructMatchExpression<OutputType>(
  getter: any[],
  map: { [name: string]: OutputType },
  fallback: OutputType,
): DataDrivenPropertyValueSpecification<OutputType> {
  let x: any[] = ["match", getter];
  for (let [key, value] of Object.entries(map)) {
    x.push(key);
    x.push(value);
  }
  x.push(fallback);
  return x as DataDrivenPropertyValueSpecification<OutputType>;
}

// Helper for https://maplibre.org/maplibre-style-spec/expressions/#step.
export function makeColorRamp(
  input: DataDrivenPropertyValueSpecification<number>,
  limits: number[],
  colorScale: string[],
): DataDrivenPropertyValueSpecification<string> {
  let step: any[] = ["step", input];
  for (let i = 1; i < limits.length; i++) {
    step.push(colorScale[i - 1]);
    step.push(limits[i]);
  }
  // Repeat the last color. The upper limit is exclusive, meaning a value
  // exactly equal to it will use this fallback. For things like percentages,
  // we want to set 100 as the cap.
  step.push(colorScale[colorScale.length - 1]);
  return step as DataDrivenPropertyValueSpecification<string>;
}

export function downloadGeneratedFile(filename: string, textInput: string) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(textInput),
  );
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Hack around
// https://stackoverflow.com/questions/67336062/typescript-not-parsed-in-svelte-html-section
// until we're using Svelte 5
export function notNull<T>(x: T | null | undefined): T {
  if (x == null || x == undefined) {
    throw new Error("Oops, notNull given something null");
  }
  return x;
}

// Create a feature for a point, with no properties.
export function pointFeature(pt: Position): Feature<Point> {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: setPrecision(pt),
    },
  };
}

// Per https://datatracker.ietf.org/doc/html/rfc7946#section-11.2, 6 decimal
// places (10cm) is plenty of precision for many use cases
export function setPrecision(pt: Position): Position {
  return [Math.round(pt[0] * 10e6) / 10e6, Math.round(pt[1] * 10e6) / 10e6];
}

export function emptyGeojson(): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: [],
  };
}

// Suitable for passing to map.fitBounds. Work around https://github.com/Turfjs/turf/issues/1807.
export function bbox(gj: GeoJSON): [number, number, number, number] {
  return turfBbox(gj) as [number, number, number, number];
}
