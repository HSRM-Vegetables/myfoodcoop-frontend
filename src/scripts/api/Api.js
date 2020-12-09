import { get as storeGet } from 'svelte/store';
import { url, version } from './ApiConfig';
import { name } from '../../stores/user';

export default class Api {
    static async get(subpath) {
        const response = await fetch(`${url}/${version}/${subpath}/${storeGet(name)}`);
        return response.json();
    }

    static async post(subpath, content) {
        await fetch(`${url}/${version}/${subpath}/${storeGet(name)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: content
        });
    }
}
