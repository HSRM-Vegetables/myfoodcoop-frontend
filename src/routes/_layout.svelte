<script>
    import { stores } from '@sapper/app';
    import BulmaGlobalStyles from '../components/BulmaGlobalStyles.svelte';
    import EnsureLogin from '../components/common/EnsureLogin.svelte';
    import Nav from '../components/Nav.svelte';

    const { page } = stores();

    let isLoggedIn;
</script>

<BulmaGlobalStyles />
<EnsureLogin bind:isLoggedIn />

<Nav />

<main>
    <!-- Only allow the user to visit the page if he is logged in, he tries to login, or if an error occured -->
    {#if isLoggedIn || $page.path.includes('/login') || $page.error}
        <slot />
    {/if}
</main>
