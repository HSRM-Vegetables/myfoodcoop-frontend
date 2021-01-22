<!-- 
    This component ensures tha t
 -->
<script>
    import Cookie from 'js-cookie';
    import { goto, stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import User from '../../scripts/user/User';
    import Tokens from '../../scripts/user/Tokens';
    import { refreshToken, token, tokenExpires } from '../../stores/user';
    import CookieDefaults from '../../scripts/CookieDefaults';

    // export the property if the current user is logged in or not
    export let isLoggedIn = false;

    const { page } = stores();

    // store if the component is mounted
    let isMounted = false;

    // This is executed as soon as the page stores change.
    // This usually happens when the url changes or an error occured
    $: checkLogin($page);

    onMount(() => {
        isMounted = true;

        // also check the page
        checkLogin($page);
    });

    async function checkLogin(pageLocal) {
        if (!isMounted) {
            isLoggedIn = false;
            return;
        }

        // if the page has an error, or we are on the login page, then don't redirect
        if (pageLocal.error || pageLocal.path.includes('/login') || $page.path.includes('/register')) {
            isLoggedIn = false;
            return;
        }

        // if the name is not set, try to read the cookie
        if (!$token) {
            $token = Cookie.get(CookieDefaults.TOKEN);
            $refreshToken = Cookie.get(CookieDefaults.REFRESH_TOKEN);

            if ($token && $refreshToken) {
                // if both tokens are set, use them
                Tokens.handleTokens($token, $refreshToken);
            } else if (!$token && $refreshToken) {
                // if only the refresh token is set, get new tokens
                await User.refreshToken($refreshToken);
            }
        }

        // if the token still has no value, redirect to login
        if (!$token || $tokenExpires < new Date()) {
            isLoggedIn = false;
            goto(`/profile/login?returnUrl=${pageLocal.path}`);
        } else {
            isLoggedIn = true;
        }
    }
</script>


