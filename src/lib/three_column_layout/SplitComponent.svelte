<script lang="ts">
  import type { Snippet } from "svelte";
  import { mainContents, leftContents, rightContents } from "./index.svelte.js";

  interface Props {
    left?: Snippet;
    main?: Snippet;
    right?: Snippet;
  }

  let { left, main, right }: Props = $props();

  // The kinda weird hack is that this must itself be nested underneath the
  // MapLibre bit, so it has context. The left and right are the "remote" parts.
</script>

<div bind:this={leftContents.value}>
  {@render left?.()}
</div>
<div bind:this={mainContents.value}>
  {@render main?.()}
</div>
<div bind:this={rightContents.value}>
  {@render right?.()}
</div>
