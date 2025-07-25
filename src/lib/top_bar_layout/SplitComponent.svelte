<script lang="ts">
  import type { Snippet } from "svelte";
  import { mapContents, sidebarContents, topContents } from "./index.js";

  interface Props {
    top?: Snippet;
    sidebar?: Snippet;
    map?: Snippet;
  }

  let { top, sidebar, map }: Props = $props();

  // The kinda weird hack is that this must itself be nested underneath the
  // MapLibre bit, so it has context. The sidebar is the "remote" part.
</script>

<div bind:this={$topContents}>
  {@render top?.()}
</div>
<div bind:this={$sidebarContents}>
  {@render sidebar?.()}
</div>
<div bind:this={$mapContents}>
  {@render map?.()}
</div>
