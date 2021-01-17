import { writable } from 'svelte/store';

export const userName = writable('');
export const token = writable('');
export const tokenExpires = writable('')
export const tokenCreation = writable('')
export const refreshToken = writable('');
