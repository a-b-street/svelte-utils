import { type Writable, writable } from "svelte/store";

export { default as Checkbox } from "./Checkbox.svelte";
export { default as Legend } from "./Legend.svelte";
export { default as Loading } from "./Loading.svelte";
export { default as LocalStorageWrapper } from "./LocalStorageWrapper.svelte";
export { default as Modal } from "./Modal.svelte";
export { default as PropertiesTable } from "./PropertiesTable.svelte";
export { default as QualitativeLegend } from "./QualitativeLegend.svelte";
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

// Fetch a URL and return bytes. Along the way, calls setProgress with a number
// [0, 100] -- but sometimes over 100 when the file is compressed. This
// function will throw if the server doesn't send back a Content-Length header.
export async function fetchWithProgress(
  url: string,
  setProgress: (progress: number) => void,
  options?: RequestInit,
): Promise<Uint8Array> {
  let response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${url} not OK: ${response.status}`);
  }
  // TODO Handle error cases better
  let reader = response.body!.getReader();

  let lengthHeader = response.headers.get("Content-Length");
  if (!lengthHeader) {
    throw new Error(`No Content-Length header from ${url}`);
  }
  let contentLength = parseInt(lengthHeader);

  let receivedLength = 0;
  let chunks = [];
  while (true) {
    let { done, value } = await reader.read();
    if (done) {
      break;
    }

    if (value) {
      chunks.push(value);
      receivedLength += value.length;

      setProgress((100.0 * receivedLength) / contentLength);
    }
  }

  let allChunks = new Uint8Array(receivedLength);
  let position = 0;
  for (let chunk of chunks) {
    allChunks.set(chunk, position);
    position += chunk.length;
  }

  return allChunks;
}

export function stripPrefix(value: string, prefix: string): string {
  return value.startsWith(prefix) ? value.slice(prefix.length) : value;
}

export function stripSuffix(value: string, suffix: string): string {
  return value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;
}

/**
 * Creates a localStorage-backed writable store.
 * The value is automatically synced with localStorage on every change.
 * On initialization, the value is loaded from localStorage if available.
 */
export function localStorageStore<T>(
  key: string,
  defaultValue: T,
): Writable<T> {
  // Try to read initial value from localStorage
  let initialValue = defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      initialValue = JSON.parse(stored) as T;
    }
  } catch (err) {
    console.warn(`Failed to read ${key} from localStorage:`, err);
  }

  // Create the store
  const store = writable<T>(initialValue);

  // Subscribe to changes and write to localStorage
  store.subscribe((value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // Handle quota exceeded or other localStorage errors
      if (err instanceof DOMException && err.name === "QuotaExceededError") {
        console.warn(`localStorage quota exceeded for ${key}`);
      } else {
        console.warn(`Failed to write ${key} to localStorage:`, err);
      }
    }
  });

  return store;
}
