import { url, version } from './ApiConfig';

export default class Fetch {
    /**
     * Sends a GET request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {object} additionalHeaders Additional header parameters (optional)
     * @returns The JSON response of the request
     */
    static async get(subpath, additionalHeaders) {
        return Fetch.request('GET', subpath, undefined, additionalHeaders);
    }

    /**
     * Sends a POST request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Body content which should be send to the api
     * @param {object} additionalHeaders Additional header parameters (optional)
     * @returns The JSON response of the request
     */
    static async post(subpath, content, additionalHeaders) {
        return Fetch.request('POST', subpath, content, additionalHeaders);
    }

    /**
     * Sends a PATCH request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {string} content Body content which should be send to the api
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
     * @param {object} content Body content which should be send to the api
     * @param {object} additionalHeaders Additional header parameters (optional)
     * @returns The JSON response of the request
     */
    static async request(type, subpath, content, additionalHeaders) {
        const response = await fetch(`${url}/${version}/${subpath}`, {
            method: type,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...additionalHeaders
            },
            body: JSON.stringify(content)
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
