<script lang="ts">
  import { basemapStyles } from "./index.js";

  interface Props {
    basemap: string;
    bottom?: string;
  }

  let { basemap = $bindable(), bottom = "60px" }: Props = $props();
</script>

<div style:bottom>
  <!-- svelte-ignore a11y_missing_content -->
  <h5 class="fa-solid fa-layer-group me-2 align-self-center"></h5>
  <select class="form-select" bind:value={basemap}>
    {#each Object.keys(basemapStyles) as value}
      <option {value}>{value}</option>
    {/each}
  </select>
</div>

<style>
  div {
    z-index: 100;
    position: absolute;
    left: 10px;

    background: white;
    padding: 4px;

    display: flex;
  }
</style>
