import { derived, readable } from "svelte/store";

export const title = readable("Stadtgemüse e.V.");
export const titleWithSuffix = derived(
    title, 
    $title => `${$title} - `
);
