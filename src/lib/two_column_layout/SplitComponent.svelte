<script lang="ts">
  import type { Snippet } from "svelte";
  import { mainContents, leftContents } from "./index.svelte.js";

  interface Props {
    left?: Snippet;
    main?: Snippet;
  }
  let { left, main }: Props = $props();

  // The kinda weird hack is that this must itself be nested underneath the
  // MapLibre bit, so it has context. The left is the "remote" part.

  // Don't directly embed the contents divs. When a caller swaps out
  // SplitComponent, the DOM teardown order can sometimes delete unrelated
  // sibling element.
  let leftDiv: HTMLDivElement | undefined = $state();
  let mainDiv: HTMLDivElement | undefined = $state();

  $effect(() => {
    let divs = [leftDiv, mainDiv];
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
  <div bind:this={leftDiv}>
    {@render left?.()}
  </div>
  <div bind:this={mainDiv}>
    {@render main?.()}
  </div>
</div>
