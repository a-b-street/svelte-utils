<script lang="ts">
  import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
  import { maptilerKey } from "./index.js";
  import { type Map } from "maplibre-gl";
  import { untrack } from "svelte";

  type BBox = [minX: number, minY: number, maxX: number, maxY: number];

  // Callers may want to override the position of :global(.maplibregl-ctrl-geocoder)
  interface Props {
    map: Map | undefined;
    loaded: boolean;
    country?: string;
    /** `[minX, minY, maxX, maxY]` — limits results to this area. */
    bbox?: BBox;
  }
  let { map, loaded, country, bbox }: Props = $props();

  let gc: GeocodingControl | undefined = $state();

  // From https://docs.maptiler.com/cloud/api/geocoding/#PlaceType. poi is excluded by default.
  const allTypes = [
    "continental_marine",
    "country",
    "major_landform",
    "region",
    "subregion",
    "county",
    "joint_municipality",
    "joint_submunicipality",
    "municipality",
    "municipal_district",
    "locality",
    "neighbourhood",
    "place",
    "postal_code",
    "address",
    "road",
    "poi",
  ] as const;

  $effect(() => {
    if (!map || !loaded) {
      return;
    }

    const control = new GeocodingControl({
      apiKey: maptilerKey,
      proximity: [
        {
          type: "map-center",
        },
      ],
      types: allTypes,
      country: untrack(() => country),
      bbox: untrack(() => bbox),
      marker: true,
      showResultMarkers: true,
      flyTo: {
        duration: 1000,
      },
      collapsed: true,
    });
    map.addControl(control, "top-left");
    gc = control;

    return () => {
      map.removeControl(control);
      gc = undefined;
    };
  });

  $effect(() => {
    gc?.setOptions({ bbox, country });
  });
</script>
