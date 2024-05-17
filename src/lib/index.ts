export { default as Legend } from "./Legend.svelte";
export { default as Loading } from "./Loading.svelte";
export { default as Modal } from "./Modal.svelte";
export { default as PropertiesTable } from "./PropertiesTable.svelte";
export { default as SequentialLegend } from "./SequentialLegend.svelte";

export function downloadGeneratedFile(filename: string, textInput: string) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(textInput),
  );
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Hack around
// https://stackoverflow.com/questions/67336062/typescript-not-parsed-in-svelte-html-section
// until we're using Svelte 5
export function notNull<T>(x: T | null | undefined): T {
  if (x == null || x == undefined) {
    throw new Error("Oops, notNull given something null");
  }
  return x;
}
