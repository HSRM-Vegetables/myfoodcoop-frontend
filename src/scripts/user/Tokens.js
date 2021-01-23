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
import CookieDefaults from '../CookieDefaults';

export default class Tokens {
    /**
     * Decrypts the token and stores the details in the svelte store.
     * Additionally saves the token as a cookie for later use.
     * @param {string} token token initially obtained after a call to login
     * @param {string} refreshToken refresh token initially obtained after a call to login
     */
    static handleTokens(token, refreshToken) {
        // handle token
        const decodedToken = jwtDecode(token);
        const tokenExpiryDate = new Date(parseFloat(decodedToken.exp) * 1000);

        userName.set(decodedToken.sub);
        userIdStore.set(decodedToken.id);
        userRoles.set(decodedToken.roles);

        tokenCreation.set(new Date(parseFloat(decodedToken.iat) * 1000))
        tokenExpires.set(tokenExpiryDate)
        tokenStore.set(token);
        Cookie.set(CookieDefaults.TOKEN, token, { expires: tokenExpiryDate });

        // handle refresh token
        const decodedRefreshToken = jwtDecode(refreshToken);
        const refreshTokenExpiryDate = new Date(parseFloat(decodedRefreshToken.exp) * 1000);

        refreshTokenExpires.set(refreshTokenExpiryDate)
        refreshTokenCreation.set(new Date(parseFloat(decodedToken.iat) * 1000))
        refreshTokenStore.set(refreshToken);
        Cookie.set(CookieDefaults.REFRESH_TOKEN, refreshToken, { expires: refreshTokenExpiryDate });
    }
}