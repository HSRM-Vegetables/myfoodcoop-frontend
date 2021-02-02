import { writable } from 'svelte/store';
import { ORGANIZATION_NAME } from '../scripts/Config';

export const title = writable(ORGANIZATION_NAME);
export const navBalance = writable('show');
