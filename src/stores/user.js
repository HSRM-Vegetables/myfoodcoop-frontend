import { writable } from 'svelte/store';

export const userName = writable('');
export const userId = writable('');
export const userRoles = writable('');
export const token = writable('');
export const tokenExpires = writable('')
export const tokenCreation = writable('')
export const refreshToken = writable('');
