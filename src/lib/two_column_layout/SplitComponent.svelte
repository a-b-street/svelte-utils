<script lang="ts">
  import type { Snippet } from "svelte";
  import { mainContents, leftContents } from "./index.js";

  interface Props {
    left?: Snippet;
    main?: Snippet;
  }

  let { left, main }: Props = $props();

  // The kinda weird hack is that this must itself be nested underneath the
  // MapLibre bit, so it has context. The left is the "remote" part.
</script>

<div bind:this={$leftContents}>
  {@render left?.()}
</div>
<div bind:this={$mainContents}>
  {@render main?.()}
</div>
