<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    leftContents,
    mainContents,
    rightContents,
    leftTarget,
    mainTarget,
    rightTarget,
  } from "./index.svelte.js";

  interface Props {
    left?: Snippet;
    main?: Snippet;
    right?: Snippet;
  }
  let { left, main, right }: Props = $props();

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
  $effect(() => {
    if (rightTarget.value && rightContents.value) {
      rightTarget.value.innerHTML = "";
      rightTarget.value.appendChild(rightContents.value);
    }
  });
</script>

<div class="left">
  {@render left?.()}
</div>
<div class="main">
  {@render main?.()}
</div>
<div class="right">
  {@render right?.()}
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
    width: 50%;
  }
  .right {
    width: 25%;
    height: 100vh;
    overflow: scroll;
    padding: 8px;
  }
</style>
