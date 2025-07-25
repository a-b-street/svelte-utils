<script lang="ts">
  interface Props {
    labelColors: Record<string, string>;
    swatchClass?: "rectangle" | "circle";
    itemsPerRow?: 1 | 2 | 3 | 4;
  }

  let {
    labelColors,
    swatchClass = "rectangle",
    itemsPerRow = 2,
  }: Props = $props();

  let gridItemWidth = $derived(`${100 / itemsPerRow}%`);
</script>

<div
  style="display: grid; grid-template-columns: repeat(auto-fill, calc({gridItemWidth} - 10px)); gap: 10px;"
>
  {#each Object.entries(labelColors) as [label, color]}
    <div style="display: flex; align-items: center; gap: 6px;">
      <span class="color-swatch {swatchClass}" style:background={color}></span>
      {label}
    </div>
  {/each}
</div>

<style>
  .color-swatch.circle {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    border: 1px solid black;
  }
  .color-swatch.rectangle {
    height: 16px;
    width: 24px;
    border: 1px solid #888;
  }
</style>
