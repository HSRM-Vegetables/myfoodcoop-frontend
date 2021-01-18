import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import Fetch, {getAuthorizationHeader} from '../api/Fetch';
import { userName, token as tokenStore, tokenCreation, tokenExpires } from '../../stores/user';
import CookieDefaults from '../CookieDefaults';

export default class User {
    /**
     * Register the user
     * @param {string} username username as defined by the user
     * @param {number} memberId memberid given to the user by the customer
     * @param {string} password password as defined by the user
     * @param {string} email email as defined by the user (optional)
     */
    static async register(username, memberId, password, email) {
        return Fetch.post('user/register', {
            username,
            memberId,
            password,
            email,
        })
    }

    /**
     * Login the user in and request the jwt token
     * @param {string} username username of the user
     * @param {string} password password of the user
     */
    static async login(username, password) {
        return Fetch.post('auth/login', {
            username,
            password
        })
    }
    
    /**
     * Fetch the data of the current user
     */
    static async getUser() {
        return Fetch.get(`user/`, getAuthorizationHeader());
    }    
    
    /**
     * Add a role to the user
     * @param {string} userId unique user id of the user the role should be added to
     * @param {string} role name of the role which should be added to the user
     */
    static async userAddRole(userId, role) {
        return Fetch.post(`user/${userId}/roles/${role}`,{}, getAuthorizationHeader());
    }    
    
    /**
     * Removes a role from the user
     * @param {string} userId unique user id of the user the role should be removed from
     * @param {string} role name of the role which should be removed from the user
     */
    static async userDeleteRole(userId, role) {
        return Fetch.delete(`user/${userId}/roles/${role}`, getAuthorizationHeader());
    }

    /**
     * Decrypts the token and stores the details in the svelte store.
     * Additionally saves the token as a cookie for later use.
     * @param {string} token token obtained after a call to login
     */
    static handleToken(token) {
        tokenStore.set(token);

        const decodedToken = jwtDecode(token);
        userName.set(decodedToken.sub);
        tokenCreation.set(new Date(parseFloat(decodedToken.iat) * 1000))

        const tokenExpiryDate = new Date(parseFloat(decodedToken.exp) * 1000);
        tokenExpires.set(tokenExpiryDate)

        Cookie.set(CookieDefaults.TOKEN, token, { expires: tokenExpiryDate });
    }
}
