<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    leftContents,
    mainContents,
    leftTarget,
    mainTarget,
  } from "./index.svelte.js";

  interface Props {
    left?: Snippet;
    main?: Snippet;
  }
  let { left, main }: Props = $props();

  $effect(() => {
    if (leftTarget.value && leftContents.value) {
      leftTarget.value.innerHTML = "";
      leftTarget.value.appendChild(leftContents.value);
    }
  });
  $effect(() => {
    if (mainTarget.value && mainContents.value) {
      mainTarget.value.innerHTML = "";
      mainTarget.value.appendChild(mainContents.value);
    }
  });
</script>

<div class="left">
  {@render left?.()}
</div>
<div class="main">
  {@render main?.()}
</div>

<style>
  div {
    float: left;
  }

  .left {
    width: 25%;
    height: 100vh;
    overflow: scroll;
    padding: 8px;
  }
  .main {
    width: 75%;
  }
</style>
