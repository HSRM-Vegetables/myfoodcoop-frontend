<script>
    import { stores } from '@sapper/app';
    import BulmaGlobalStyles from '../components/BulmaGlobalStyles.svelte';
    import EnsureLogin from '../components/common/EnsureLogin.svelte';
    import Nav from '../components/Nav.svelte';
    import Appbar from '../components/Appbar.svelte';
    import { stockItems } from '../stores/stock';
    import { backendUrl } from '../stores/page';

    const { page, session } = stores();

    // eslint-disable-next-line prefer-const, no-unused-vars
    $backendUrl = $session.BACKEND_API_URL;

    let isLoggedIn;
    let hasUpdatedStockAfterMount = false;

    $: {
        if (isLoggedIn && !hasUpdatedStockAfterMount) {
            // update stock items after page load and after the user is logged in
            stockItems.forceUpdate();
            hasUpdatedStockAfterMount = true;
        }
    }
</script>

<style>
    @media (max-width: 920px) {
        main {
            border-radius: 26px !important;
            margin-top: -29px;
            background: white;
            min-height: 60px;
            padding-bottom: 125px;
        }
    }
</style>

<BulmaGlobalStyles />
<EnsureLogin bind:isLoggedIn />
<Nav bind:isLoggedIn />
<main>
    <!-- Only allow the user to visit the page if he is logged in, he tries to login, or if an error occured -->
    {#if isLoggedIn || $page.path.includes('/login') || $page.path.includes('/register') || $page.error}
        <slot />
    {/if}
</main>
{#if isLoggedIn}
    <Appbar />
{/if}
