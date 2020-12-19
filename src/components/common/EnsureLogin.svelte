<script>
    import Cookie from 'js-cookie';
    import { goto, stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import { name } from '../../stores/user';
    import CookieDefaults from '../../scripts/CookieDefaults';

    const { page } = stores();

    onMount(() => {
        // if the page has an error, or we are on the login page, then don't redirect
        if ($page.error || $page.path.includes('/login')) {
            return;
        }

        // if the name is not set, try to read the cookie
        if (!$name) {
            $name = Cookie.get(CookieDefaults.NAME);
        }

        // if the name still has no value, redirect to login
        if (!$name) {
            goto(`/profile/login?returnUrl=${$page.path}`);
        }
    });
</script>
