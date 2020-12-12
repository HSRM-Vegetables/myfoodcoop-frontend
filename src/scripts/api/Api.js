import { url, version } from './ApiConfig';

export default class Api {
    /**
     * Sends a GET request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @returns The JSON response of the request
     */
    static async get(subpath) {
        const response = await fetch(`${url}/${version}/${subpath}`);
        return response.json();
    }

    /**
     * Sends a POST request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Stringified JSON which should be send to the api
     * @returns The JSON response of the request
     */
    static async post(subpath, content) {
        return Api.request('POST', subpath, content);
    }

    /**
     * Sends a PATCH request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Stringified JSON which should be send to the api
     * @returns The JSON response of the request
     */
    static async patch(subpath, content) {
        return Api.request('PATCH', subpath, content);
    }

    /**
     * Sends a request to the api
     * @param {string} type An http request method
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Stringified JSON which should be send to the api
     * @returns The JSON response of the request
     */
    static async request(type, subpath, content) {
        const response = await fetch(`${url}/${version}/${subpath}`, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
            },
            body: content
        });
        return response.json();
    }
}
