<script lang="ts">
  import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
  import "@maptiler/geocoding-control/style.css";
  import maplibregl, { type Map } from "maplibre-gl";
  import { maptilerKey } from "./index.js";
  import { onDestroy } from "svelte";

  // Callers may want to override the position of :global(.maplibregl-ctrl-geocoder)
  interface Props {
    map: Map | undefined;
    loaded: boolean;
    country?: string;
  }
  let { map, loaded, country }: Props = $props();

  let gc: GeocodingControl | undefined = $state();

  // From https://docs.maptiler.com/cloud/api/geocoding/#PlaceType. poi is excluded by default.
  let allTypes = [
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
  ];

  onDestroy(() => {
    if (gc) {
      map?.removeControl(gc);
      gc = undefined;
    }
  });

  $effect(() => {
    if (map && loaded && !gc) {
      // TODO There's no TS for these options, but I think they're right...
      gc = new GeocodingControl({
        apiKey: maptilerKey,
        maplibregl,
        proximity: [
          {
            type: "map-center",
          },
        ],
        types: allTypes,
        country,
        marker: true,
        showResultMarkers: true,
        flyToOptions: {
          duration: 1000,
        },
        fitBoundsOptions: {
          duration: 1000,
        },
      });
      // This position is overridden by the style rule below
      map.addControl(gc, "top-left");
    }
  });
</script>
