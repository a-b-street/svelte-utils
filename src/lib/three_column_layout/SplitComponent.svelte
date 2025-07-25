<script lang="ts">
  import {
    mapContents,
    leftSidebarContents,
    rightSidebarContents,
  } from "./index.js";
  interface Props {
    left?: import("svelte").Snippet;
    map?: import("svelte").Snippet;
    right?: import("svelte").Snippet;
  }

  let { left, map, right }: Props = $props();

  // The kinda weird hack is that this must itself be nested underneath the
  // MapLibre bit, so it has context. The sidebars are the "remote" parts.
</script>

<div bind:this={$leftSidebarContents}>
  {@render left?.()}
</div>
<div bind:this={$mapContents}>
  {@render map?.()}
</div>
<div bind:this={$rightSidebarContents}>
  {@render right?.()}
</div>
