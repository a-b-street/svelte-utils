<script lang="ts">
  interface Props {
    // Useful for quickly debugging a feature
    properties: { [name: string]: any };
  }

  let { properties }: Props = $props();
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
