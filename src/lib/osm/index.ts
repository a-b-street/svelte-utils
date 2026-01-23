import type { Feature, Polygon, MultiPolygon } from "geojson";
import { writable, type Writable, get } from "svelte/store";

export { default as OsmLoader } from "./OsmLoader.svelte";
export { default as OverpassServerSelector } from "./OverpassServerSelector.svelte";

// Construct a query to extract all XML data in the polygon clip. See
// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL. Note polygon holes are ignored, and
// for MultiPolygons, only the first polygon is used. Use fetchOverpass to then run this query.
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
  return `(nwr(${filter}); node(w)->.x; <;); out meta;`;
}

const localStorageKey = "overpass-server";
const defaultServer = "https://overpass-api.de/api/";
// https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
export const overpassServers = [
  "https://overpass-api.de/api/",
  "https://maps.mail.ru/osm/tools/overpass/api/",
  "https://overpass.openstreetmap.ru/api/",
  "https://overpass.kumi.systems/api/",
];

export const overpassServer: Writable<string> = writable(
  window?.localStorage.getItem(localStorageKey) || defaultServer,
);

// Store changes in local storage
overpassServer.subscribe((server) => {
  window?.localStorage.setItem(localStorageKey, server);
});

export async function fetchOverpass(query: string): Promise<Response> {
  let resp = await fetch(`${get(overpassServer)}interpreter`, {
    method: "POST",
    body: query,
    headers: {
      "Content-Type": "text/plain",
    },
  });

  if (!resp.ok) {
    if (resp.status === 504) {
      throw new Error(
        `Overpass API timed out. The query might be too large. Try again later or switch to a different Overpass server.`,
      );
    }
    throw new Error(
      `Overpass failed: ${resp.status}. Try again or switch to a different Overpass server.`,
    );
  }

  return resp;
}
