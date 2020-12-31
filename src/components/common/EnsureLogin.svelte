<!-- 
    This component ensures tha t
 -->
<script>
    import Cookie from 'js-cookie';
    import { goto, stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import { name } from '../../stores/user';
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

    function checkLogin(pageLocal) {
        if (!isMounted) {
            isLoggedIn = false;
            return;
        }

        // if the page has an error, or we are on the login page, then don't redirect
        if (pageLocal.error || pageLocal.path.includes('/login')) {
            isLoggedIn = false;
            return;
        }

        // if the name is not set, try to read the cookie
        if (!$name) {
            $name = Cookie.get(CookieDefaults.NAME);
        }

        // if the name still has no value, redirect to login
        if (!$name) {
            isLoggedIn = false;
            goto(`/profile/login?returnUrl=${pageLocal.path}`);
        } else {
            isLoggedIn = true;
        }
    }
</script>


