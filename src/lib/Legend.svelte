<script lang="ts">
  // Vertical layout, for qualitative color schemes

  // (Label, color) pairs
  let { rows }: { rows: [string, string][] } = $props();
</script>

<ul>
  {#each rows as [label, color]}
    <li>
      <span style:background={color}></span>
      {label}
    </li>
  {/each}
</ul>

<style>
  span {
    display: block;
    float: left;
    height: 16px;
    width: 30px;
    margin-right: 5px;
    border: 1px solid #999;
  }
</style>
