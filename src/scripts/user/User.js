import Fetch, {getAuthorizationHeader} from '../api/Fetch';
import Tokens from './Tokens';

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
        const response = await Fetch.post('auth/login', {
            username,
            password
        })

        Tokens.handleTokens(response.token, response.refreshToken);

        return response;
    }
    
    /**
     * Fetch the data of the current user
     */
    static async getUser() {
        return Fetch.get(`user/`, getAuthorizationHeader());
    }

    /**
     * Fetch the data of the current user
     */
    static async getUserById(userId) {
        return Fetch.get(`user/${userId}`, getAuthorizationHeader());
    }
     
    /**
     * Deletes the given user
     */
    static async deleteUserById(userId) {
        return Fetch.delete(`user/${userId}`, getAuthorizationHeader());
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
     * Request a new updated token.
     * In example this will also update all assoziated roles.
     * @param {string} refreshToken RefreshToke which was initially provided during login
     */
    static async refreshToken(refreshToken) {
        const response = await Fetch.post(`auth/refresh`, {
            refreshToken
        });

        Tokens.handleTokens(response.token, response.refreshToken)

        return response;
    }

    /**
     * Request a new updated token.
     * In example this will also update all assoziated roles.
     * @param {string} refreshToken refresh token which was initially provided during login
     */
    static async revokeAllRefreshTokensByUserId(userId) {
        return Fetch.delete(`auth/refresh/all/${userId}`, getAuthorizationHeader());
    }
}
