import { writable } from 'svelte/store';
import { ORGANIZATION_NAME } from '../scripts/Config';

export const title = writable(ORGANIZATION_NAME);
export const navBalance = writable('show');
export const backendUrl = writable(undefined);
export const isPointOfSales = writable(true);
export const isBackendActive = writable(false);