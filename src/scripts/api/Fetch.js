import { get } from 'svelte/store';
import { goto } from '@sapper/app';
import { url, version } from './ApiConfig';
import { refreshToken, refreshTokenExpires, token, tokenExpires } from '../../stores/user';
import Tokens from '../user/Tokens'

export const Headers = {
    Authorization: 'Authorization'
};

export const getAuthorizationHeader = () => ({
    [Headers.Authorization]: `Bearer ${get(token)}`,
});

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
     * @param {object} additionalHeaders Additional header parameters (optional)
     * @returns The JSON response of the request
     */
    static async patch(subpath, content, additionalHeaders) {
        return Fetch.request('PATCH', subpath, content, additionalHeaders);
    }
    
    /**
     * Sends a DELETE request to the api
     * @param {string} subpath Path relativ to the version number of the api
     * @param {object} additionalHeaders Additional header parameters (optional)
     * @returns The JSON response of the request
     */
    static async delete(subpath, additionalHeaders) {
        return Fetch.request('DELETE', subpath, undefined, additionalHeaders);
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
        const headers = additionalHeaders;

        // check if the authorization header is necessary
        if (additionalHeaders !== undefined && Headers.Authorization in additionalHeaders) {
            // check if the current token has expired, the refresh token is set and the refresh token is still valid
            if (get(tokenExpires) < Date.now() && get(refreshToken) && get(refreshTokenExpires) > Date.now()) {
                // get a new token
                await Tokens.refreshToken(get(refreshToken))

                // update the token of the current request
                headers[Headers.Authorization] = `Bearer ${get(token)}`;
            } else if (get(tokenExpires) < Date.now()) {
                // if the token is invalid, the refresh token is not set or is invalid, redirect the user to the login
                goto("/profile/login");
            }
        }

        // do the request
        const response = await fetch(`${url}/${version}/${subpath}`, {
            method: type,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers
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
