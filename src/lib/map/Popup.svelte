<script lang="ts">
  // Use this component instead of the one from svelte-maplibre, to more
  // conveniently get the properties of the topmost feature in a TS-friendly
  // way.
  import type { Feature } from "geojson";
  import { Popup } from "svelte-maplibre";

  interface Props {
    // TODO Maybe set openIfTopMost and other props, or pass them through
    openOn?: "hover" | "click";
    children?: import("svelte").Snippet<[any]>;
  }

  let { openOn = "hover", children }: Props = $props();

  function getProperties(features: Feature[] | null): { [name: string]: any } {
    if (!features) {
      console.log("A Popup with null features should be impossible");
      return {};
    }
    return features[0].properties ?? {};
  }

  const children_render = $derived(children);
</script>

<Popup {openOn}>
  {#snippet children({ features })}
    {@render children_render?.({ props: getProperties(features), features })}
  {/snippet}
</Popup>
