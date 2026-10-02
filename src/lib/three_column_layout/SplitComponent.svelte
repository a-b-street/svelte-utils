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

  // Don't directly embed the contents divs. When a caller swaps out
  // SplitComponent, the DOM teardown order can sometimes delete unrelated
  // sibling element.
  let leftDiv: HTMLDivElement | undefined = $state();
  let mainDiv: HTMLDivElement | undefined = $state();
  let rightDiv: HTMLDivElement | undefined = $state();

  $effect(() => {
    let divs = [leftDiv, mainDiv, rightDiv];
    leftContents.value = leftDiv;
    mainContents.value = mainDiv;
    rightContents.value = rightDiv;

    return () => {
      for (let div of divs) {
        div?.remove();
      }
    };
  });
</script>

<div>
  <div bind:this={leftDiv}>
    {@render left?.()}
  </div>
  <div bind:this={mainDiv}>
    {@render main?.()}
  </div>
  <div bind:this={rightDiv}>
    {@render right?.()}
  </div>
</div>
