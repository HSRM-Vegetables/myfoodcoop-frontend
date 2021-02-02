<!-- 
    This component ensures tha t
 -->
<script>
    import Cookie from 'js-cookie';
    import { goto, stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import User from '../../scripts/user/User';
    import Tokens from '../../scripts/user/Tokens';
    import {
        refreshToken,
        token,
        tokenExpires,
        keepLoggedIn,
        allowKeepLoggedIn,
        refreshTokenExpires,
    } from '../../stores/user';
    import CookieDefaults from '../../scripts/CookieDefaults';

    // export the property if the current user is logged in or not
    export let isLoggedIn = false;

    const { page } = stores();
    const { returnUrl = '/' } = $page.query;

    // store if the component is mounted
    let isMounted = false;

    // This is executed as soon as the page stores change.
    // This usually happens when the url changes or an error occured
    $: checkLogin($page);

    onMount(() => {
        isMounted = true;

        // check the login status after page load
        checkLogin($page);
    });

    async function checkLogin(pageLocal) {
        if (!isMounted) {
            isLoggedIn = false;
            return;
        }

        // load some cookies
        $keepLoggedIn = localStorage.getItem(CookieDefaults.KEEP_LOGGED_IN) === 'true';
        const allowKeepLoggedInCookieValue = localStorage.getItem(CookieDefaults.ALLOW_KEEP_LOGGED_IN);
        // if the cookie is not set or the cookie value equals to true, allow to check keepLoggedIn
        // eslint-disable-next-line no-unused-vars
        $allowKeepLoggedIn = !allowKeepLoggedInCookieValue || allowKeepLoggedInCookieValue === 'true';

        if (Tokens.areValid($token, $refreshToken, $tokenExpires, $refreshTokenExpires)) {
            // all tokens are valid, we don't need to do anything
            isLoggedIn = true;
            return;
        }

        if (
            $keepLoggedIn &&
            $token &&
            $refreshToken &&
            $tokenExpires <= new Date() &&
            $refreshTokenExpires > new Date()
        ) {
            // token is expired, get a new one
            await User.refreshToken($refreshToken);
            isLoggedIn = true;
            return;
        }

        // at least one of the tokens is not loaded, try to get them from cookies
        const tokenTemp = Cookie.get(CookieDefaults.TOKEN);
        const refreshTokenTemp = Cookie.get(CookieDefaults.REFRESH_TOKEN);

        if (tokenTemp && refreshTokenTemp) {
            // if both tokens are set, load them and check if they are valid
            Tokens.handleTokens(tokenTemp, refreshTokenTemp);

            if (Tokens.areValid($token, $refreshToken, $tokenExpires, $refreshTokenExpires)) {
                // both tokens are still valid, the user is logged in
                isLoggedIn = true;
                redirectAfterLogin();
                return;
            }

            if ($keepLoggedIn && $refreshToken && $refreshTokenExpires > new Date()) {
                // refresh token is still valid, get a new token
                await User.refreshToken($refreshToken);
                isLoggedIn = true;
                redirectAfterLogin();
                return;
            }

            // user is not logged in
            isLoggedIn = false;
        } else if (!tokenTemp && refreshTokenTemp) {
            Tokens.handleRefreshToken(refreshTokenTemp);

            if ($keepLoggedIn && $refreshTokenExpires > new Date()) {
                // refresh token is still valid, gat a new token
                await User.refreshToken($refreshToken);
                isLoggedIn = true;
                redirectAfterLogin();
                return;
            }

            // user is not logged in
            isLoggedIn = false;
        }

        if (!isLoggedIn) {
            if (!pageLocal.error && !pageLocal.path.includes('/login') && !$page.path.includes('/register')) {
                goto(`/profile/login?returnUrl=${pageLocal.path}`);
            }
        }
    }

    function redirectAfterLogin() {
        if (isLoggedIn && $page.path.includes('/login')) {
            goto(returnUrl);
        }
    }
</script>


