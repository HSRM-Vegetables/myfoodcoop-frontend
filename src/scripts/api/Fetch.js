import { url, version } from './ApiConfig';

export default class Fetch {
    /**
     * Sends a GET request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @returns The JSON response of the request
     */
    static async get(subpath) {
        return Fetch.request('GET', subpath, undefined);
    }

    /**
     * Sends a POST request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Stringified JSON which should be send to the api
     * @param {string} additionalHeaders Stringified JSON with additional header parameters (optional)
     * @returns The JSON response of the request
     */
    static async post(subpath, content, additionalHeaders) {
        return Fetch.request('POST', subpath, content, additionalHeaders);
    }

    /**
     * Sends a PATCH request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Stringified JSON which should be send to the api
     * @returns The JSON response of the request
     */
    static async patch(subpath, content) {
        return Fetch.request('PATCH', subpath, content);
    }
    
    /**
     * Sends a DELETE request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @returns The JSON response of the request
     */
    static async delete(subpath) {
        return Fetch.request('DELETE', subpath, undefined);
    }

    /**
     * Sends a request to the api
     * @param {string} type An http request method
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Stringified JSON which should be send to the api
     * @param {string} additionalHeaders Stringified JSON with additional header parameters (optional)
     * @returns The JSON response of the request
     */
    static async request(type, subpath, content, additionalHeaders) {
        const response = await fetch(`${url}/${version}/${subpath}`, {
            method: type,
            headers: Object.assign(
                additionalHeaders ? JSON.parse(additionalHeaders) : {},
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            ),
            body: content
        });
        if (response.status >= 400) {
            throw await response.json();
        }
        if (response.status !== 204) {
            return response.json();
        }
        return undefined;
    }
    
}
