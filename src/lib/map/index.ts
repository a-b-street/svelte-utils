import type { StyleSpecification } from "maplibre-gl";
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

export { default as Basemaps } from "./Basemaps.svelte";
export { default as Geocoder } from "./Geocoder.svelte";
export { default as MapContextMenu } from "./MapContextMenu.svelte";
export { default as Popup } from "./Popup.svelte";
export { default as StandardControls } from "./StandardControls.svelte";

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

// Only for use in A/B Street projects
let maptilerKey = "MZEJTanw3WpxRvt7qDfo";

// We always need these, even in blank or raster styles
let glyphs = `https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${maptilerKey}`;

// A set of basemaps that work reasonably well in many projects
export let basemapStyles: Record<string, string | StyleSpecification> = {
  Blank: {
    version: 8,
    sources: {},
    layers: [],
    glyphs,
  },
  "Maptiler Streets": `https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`,
  "Maptiler Dataviz": `https://api.maptiler.com/maps/dataviz/style.json?key=${maptilerKey}`,
  "Maptiler Hybrid": `https://api.maptiler.com/maps/hybrid/style.json?key=${maptilerKey}`,
  "Maptiler OpenStreetMap": `https://api.maptiler.com/maps/openstreetmap/style.json?key=${maptilerKey}`,
  "Maptiler OS Open Zoomstack": `https://api.maptiler.com/maps/uk-openzoomstack-light/style.json?key=${maptilerKey}`,
  "ESRI World Imagery": {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        // See https://wiki.openstreetmap.org/wiki/Esri
        attribution:
          "ESRI &copy; <a href='http://www.esri.com' target='_blank'>ESRI</a>",
        minzoom: 0,
        maxzoom: 18,
      },
    },
    layers: [
      {
        id: "raster-basemap",
        type: "raster",
        source: "raster-tiles",
      },
    ],
    glyphs,
  },
};
