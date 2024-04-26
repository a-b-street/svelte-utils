<script lang="ts">
  // Useful for quickly debugging a feature

  export let properties: { [name: string]: any };
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
