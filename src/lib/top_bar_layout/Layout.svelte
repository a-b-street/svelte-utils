<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    topContents,
    leftContents,
    mainContents,
    topTarget,
    leftTarget,
    mainTarget,
  } from "./index.svelte.js";

  interface Props {
    top?: Snippet;
    left?: Snippet;
    main?: Snippet;
  }
  let { top, left, main }: Props = $props();

  $effect(() => {
    if (topTarget.value && topContents.value) {
      topTarget.value.innerHTML = "";
      topTarget.value.appendChild(topContents.value);
    }
  });
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

<div class="flex-container">
  <div class="top">
    {@render top?.()}
  </div>
  <div class="content">
    <div class="left">
      {@render left?.()}
    </div>
    <div class="main">
      {@render main?.()}
    </div>
  </div>
</div>

<style>
  /* Note calling this "container" will clash with a pico built-in */
  .flex-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
  }

  .top {
    width: 100%;
    padding: 4px;
  }

  .content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .left {
    width: 25%;
    overflow-y: auto;
    padding: 4px;
  }

  .main {
    width: 75%;
  }
</style>
