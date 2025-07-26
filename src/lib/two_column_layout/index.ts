import { writable, type Writable } from "svelte/store";

export { default as Layout } from "./Layout.svelte";
export { default as SplitComponent } from "./SplitComponent.svelte";

export let leftContents: Writable<HTMLDivElement | null> = writable(null);
export let mainContents: Writable<HTMLDivElement | null> = writable(null);
