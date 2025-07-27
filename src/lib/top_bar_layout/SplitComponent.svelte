<script lang="ts">
  import type { Snippet } from "svelte";
  import { mainContents, leftContents, topContents } from "./index.svelte.js";

  interface Props {
    top?: Snippet;
    left?: Snippet;
    main?: Snippet;
  }
  let { top, left, main }: Props = $props();

  // The kinda weird hack is that this must itself be nested underneath the
  // MapLibre bit, so it has context. The top and left are the "remote" parts.
</script>

<div bind:this={topContents.value}>
  {@render top?.()}
</div>
<div bind:this={leftContents.value}>
  {@render left?.()}
</div>
<div bind:this={mainContents.value}>
  {@render main?.()}
</div>
