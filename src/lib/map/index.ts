import turfBbox from "@turf/bbox";
import type {
  Feature,
  FeatureCollection,
  GeoJSON,
  Point,
  Position,
} from "geojson";
import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
} from "maplibre-gl";

export { default as Geocoder } from "./Geocoder.svelte";
export { default as Popup } from "./Popup.svelte";

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
export function makeRamp<OutputType>(
  input: DataDrivenPropertyValueSpecification<number>,
  limits: number[],
  output: OutputType[],
): DataDrivenPropertyValueSpecification<OutputType> {
  let step: any[] = ["step", input];
  for (let i = 1; i < limits.length; i++) {
    step.push(output[i - 1]);
    step.push(limits[i]);
  }
  // Repeat the last value. The upper limit is exclusive, meaning a value
  // exactly equal to it will use this fallback. For things like percentages,
  // we want to set 100 as the cap.
  step.push(output[output.length - 1]);
  return step as DataDrivenPropertyValueSpecification<OutputType>;
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
