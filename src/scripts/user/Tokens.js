import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import { 
    userName,
    token as tokenStore,
    tokenCreation,
    tokenExpires,
    userId as userIdStore,
    userRoles,
    refreshToken as refreshTokenStore,
    refreshTokenCreation,
    refreshTokenExpires
} from '../../stores/user';
import CookieDefaults from '../common/CookieDefaults';

export default class Tokens {
    /**
     * Decrypts the tokens and stores their details in the svelte store.
     * Additionally saves the tokens as a cookie for later use.
     * @param {string} token token initially obtained after a call to login
     * @param {string} refreshToken refresh token initially obtained after a call to login
     */
    static handleTokens(token, refreshToken) {
        Tokens.handleToken(token);
        Tokens.handleRefreshToken(refreshToken);        
    }

    /**
     * Decrypts the token and stores the details in the svelte store.
     * Additionally saves the token as a cookie for later use.
     * @param {string} token token initially obtained after a call to login
     */
    static handleToken(token) {
        const decodedToken = jwtDecode(token);
        const tokenExpiryDate = new Date(parseFloat(decodedToken.exp) * 1000);

        userName.set(decodedToken.sub);
        userIdStore.set(decodedToken.id);
        userRoles.set(decodedToken.roles);

        tokenCreation.set(new Date(parseFloat(decodedToken.iat) * 1000))
        tokenExpires.set(tokenExpiryDate)
        tokenStore.set(token);
        Cookie.set(CookieDefaults.TOKEN, token, { expires: tokenExpiryDate });
    }

    /**
     * Decrypts the refresh token and stores the details in the svelte store.
     * Additionally saves the refresh token as a cookie for later use.
     * @param {string} refreshToken refresh token initially obtained after a call to login
     */
    static handleRefreshToken(refreshToken) {
        const decodedRefreshToken = jwtDecode(refreshToken);
        const refreshTokenExpiryDate = new Date(parseFloat(decodedRefreshToken.exp) * 1000);

        refreshTokenExpires.set(refreshTokenExpiryDate)
        refreshTokenCreation.set(new Date(parseFloat(decodedRefreshToken.iat) * 1000))
        refreshTokenStore.set(refreshToken);
        Cookie.set(CookieDefaults.REFRESH_TOKEN, refreshToken, { expires: refreshTokenExpiryDate });
    }

    /**
     * Checks if both tokens are set and are still valid
     * @param {string} token jwt woken
     * @param {string} refreshToken jwt refresh token
     * @param {Date} tokenExpiryDate token expiry date
     * @param {Date} refreshExpiryDate refresh token expiry date
     */
    static areValid(token, refreshToken, tokenExpiryDate, refreshExpiryDate) {
        if (token && refreshToken 
            && tokenExpiryDate > new Date() && refreshExpiryDate > new Date()) {
            return true;
        }
        return false;
    }
}