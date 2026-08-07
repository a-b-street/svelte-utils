<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    show: boolean;
    children: Snippet;
    closeable?: boolean;
  }
  // TODO https://caniuse.com/wf-dialog-closedby not supported yet

  let { show = $bindable(false), children, closeable = true }: Props = $props();

  // Relies on external styling
  let modalDialog: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (modalDialog) {
      if (show) {
        modalDialog.showModal();
        // showModal() auto-focuses the first focusable descendant (often a
        // button near the bottom of the content), which scrolls it into
        // view. Move focus to the dialog itself and reset the scroll
        // position that the auto-focus already caused, so it opens
        // scrolled to the top.
        modalDialog.focus();
        modalDialog.scrollTop = 0;
      } else {
        modalDialog.close();
      }
    }
  });

  function onClick(e: MouseEvent) {
    // only dismiss the modal when clicking outside of the inner dialog content, on the dialog itself.
    if (e.target == modalDialog) {
      e.stopPropagation();
      if (closeable) {
        show = false;
      }
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape" || e.key == "Enter") {
      e.stopPropagation();
      if (closeable) {
        show = false;
      }
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={modalDialog}
  tabindex="-1"
  onclick={onClick}
  onkeydown={onKeyDown}
  closedby="none"
>
  <div>
    {@render children()}
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
