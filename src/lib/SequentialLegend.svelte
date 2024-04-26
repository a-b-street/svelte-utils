<script lang="ts">
  // A horizontal scale of colors

  export let colorScale: string[];
  export let limits: any[];
  export let decimalPlaces = 0;
</script>

<div style="display: flex">
  {#each colorScale as color}
    <span style="background: {color}; width: 100%; border: 1px solid black;">
      &nbsp;
    </span>
  {/each}
</div>
<div style="display: flex; justify-content: space-between;">
  {#each limits as limit}
    {#if decimalPlaces > 0}
      <span>{limit.toFixed(decimalPlaces)}</span>
    {:else}
      <span>{limit}</span>
    {/if}
  {/each}
</div>
