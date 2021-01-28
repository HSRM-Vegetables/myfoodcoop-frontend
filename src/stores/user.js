import { writable } from 'svelte/store';

export const userName = writable('');
export const userId = writable('');
export const userRoles = writable('');
export const keepLoggedIn = writable(false);
export const allowKeepLoggedIn = writable(false);

// token
export const token = writable('');
export const tokenExpires = writable('')
export const tokenCreation = writable('')

// refresh token
export const refreshToken = writable('');
export const refreshTokenExpires = writable('');
export const refreshTokenCreation = writable('');
