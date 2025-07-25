<script lang="ts">
  import { run, stopPropagation } from "svelte/legacy";

  interface Props {
    show?: boolean;
    children?: import("svelte").Snippet;
  }

  let { show = $bindable(false), children }: Props = $props();

  // Relies on external styling (picocss)
  let modalDialog: HTMLDialogElement | undefined = $state();

  run(() => {
    if (modalDialog) {
      if (show) {
        modalDialog.showModal();
      } else {
        modalDialog.close();
      }
    }
  });

  function onClick(e: MouseEvent) {
    // only dismiss the modal when clicking outside of the inner dialog content, on the dialog itself.
    if (e.target == modalDialog) {
      show = false;
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape" || e.key == "Enter") {
      e.stopPropagation();
      show = false;
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={modalDialog}
  onclick={stopPropagation(onClick)}
  onkeydown={onKeyDown}
>
  <div>
    {@render children?.()}
  </div>
</dialog>

<style>
  div {
    max-width: 80vw;
    max-height: 80vh;
  }

  dialog::backdrop {
    backdrop-filter: blur(2px);
  }
</style>
