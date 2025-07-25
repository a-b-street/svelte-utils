<script lang="ts">
  interface Props {
    left?: import("svelte").Snippet;
    main?: import("svelte").Snippet;
  }

  let { left, main }: Props = $props();
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
