export { default as Layout } from "./Layout.svelte";
export { default as SplitComponent } from "./SplitComponent.svelte";

// Each SplitComponent instance fills this out
export let leftContents: { value: HTMLDivElement | undefined } = $state({
  value: undefined,
});
export let mainContents: { value: HTMLDivElement | undefined } = $state({
  value: undefined,
});

// The user must bind these, usually somewhere within the Layout
export let leftTarget: { value: HTMLDivElement | undefined } = $state({
  value: undefined,
});
export let mainTarget: { value: HTMLDivElement | undefined } = $state({
  value: undefined,
});
