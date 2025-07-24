<script lang="ts">
  // Bootstrap has too much boilerplate for checkboxes
  export let checked: boolean;
</script>

<div class="form-check">
  <label class="form-check-label">
    <input class="form-check-input" type="checkbox" bind:checked />
    <slot />
  </label>
</div>
