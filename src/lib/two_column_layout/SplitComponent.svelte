<script lang="ts">
  import { mapContents, sidebarContents } from "./index.js";
  interface Props {
    sidebar?: import("svelte").Snippet;
    map?: import("svelte").Snippet;
  }

  let { sidebar, map }: Props = $props();

  // The kinda weird hack is that this must itself be nested underneath the
  // MapLibre bit, so it has context. The sidebar is the "remote" part.
</script>

<div bind:this={$sidebarContents}>
  {@render sidebar?.()}
</div>
<div bind:this={$mapContents}>
  {@render map?.()}
</div>
