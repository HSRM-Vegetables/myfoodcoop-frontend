import { get } from 'svelte/store'
import { backendUrl } from '../../stores/page';

export const getUrl = () => process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : get(backendUrl) ;
export const version = 'v2';
