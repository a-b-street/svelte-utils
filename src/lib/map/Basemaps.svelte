<script lang="ts">
  import { run } from "svelte/legacy";

  import type { StyleSpecification } from "maplibre-gl";
  import { basemapStyles } from "./index.js";

  interface Props {
    // Input
    choice: string;
    bottom?: string;
    // Output
    style?: string | StyleSpecification;
  }

  let {
    choice = $bindable(),
    bottom = "60px",
    style = $bindable(basemapStyles[choice]),
  }: Props = $props();

  run(() => {
    style = basemapStyles[choice];
  });
</script>

<div style:bottom>
  <!-- svelte-ignore a11y_missing_content -->
  <h5 class="fa-solid fa-layer-group me-2 align-self-center"></h5>
  <select class="form-select" bind:value={choice}>
    {#each Object.keys(basemapStyles) as value}
      <option {value}>{value}</option>
    {/each}
  </select>
</div>

<style>
  div {
    position: absolute;
    left: 10px;

    background: white;
    padding: 4px;

    display: flex;
  }
</style>
