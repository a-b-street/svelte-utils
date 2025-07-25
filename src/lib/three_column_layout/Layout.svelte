<script lang="ts">
  import type { Snippet } from "svelte";
  interface Props {
    left?: Snippet;
    main?: Snippet;
    right?: Snippet;
  }

  let { left, main, right }: Props = $props();
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
