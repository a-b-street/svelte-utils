<script lang="ts">
  import { overpassServer, overpassServers } from "./index.js";
</script>

<details class="mt-3">
  <summary>Change Overpass server</summary>
  <div class="mt-2">
    {#each overpassServers as server}
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="overpass-server"
          id="server-{server}"
          value={server}
          bind:group={$overpassServer}
        />
        <label class="form-check-label" for="server-{server}">
          {server}
        </label>
      </div>
    {/each}
  </div>
</details>
