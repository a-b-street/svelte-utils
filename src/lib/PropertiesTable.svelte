<script lang="ts">
  // Useful for quickly debugging a feature
  let { properties }: { properties: { [name: string]: any } } = $props();
</script>

<table>
  <tbody>
    {#each Object.entries(properties) as [key, value]}
      <tr>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    border: solid;
  }
</style>
