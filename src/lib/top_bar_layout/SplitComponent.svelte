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

  // Don't directly embed the contents divs. When a caller swaps out
  // SplitComponent, the DOM teardown order can sometimes delete unrelated
  // sibling element.
  let topDiv: HTMLDivElement | undefined = $state();
  let leftDiv: HTMLDivElement | undefined = $state();
  let mainDiv: HTMLDivElement | undefined = $state();

  $effect(() => {
    let divs = [topDiv, leftDiv, mainDiv];
    topContents.value = topDiv;
    leftContents.value = leftDiv;
    mainContents.value = mainDiv;

    return () => {
      for (let div of divs) {
        div?.remove();
      }
    };
  });
</script>

<div>
  <div bind:this={topDiv}>
    {@render top?.()}
  </div>
  <div bind:this={leftDiv}>
    {@render left?.()}
  </div>
  <div bind:this={mainDiv}>
    {@render main?.()}
  </div>
</div>
