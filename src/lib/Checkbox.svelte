<script lang="ts">
  interface Props {
    // Bootstrap has too much boilerplate for checkboxes
    checked: boolean;
    children?: import("svelte").Snippet;
  }

  let { checked = $bindable(), children }: Props = $props();
</script>

<div class="form-check">
  <label class="form-check-label">
    <input class="form-check-input" type="checkbox" bind:checked />
    {@render children?.()}
  </label>
</div>
