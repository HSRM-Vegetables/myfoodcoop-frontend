<script>
    import { onMount } from 'svelte';
    import BulmaGlobalStyles from '../components/BulmaGlobalStyles.svelte';
    import EnsureLogin from '../components/common/EnsureLogin.svelte';
    import Nav from '../components/Nav.svelte';
    import { currentBalance } from '../stores/balance';

    onMount(() => {
        // Force update all store on page load. This is necessary because the window property and so
        // the fetch call are not available during store initialization.
        currentBalance.forceUpdate();
    });
</script>

<BulmaGlobalStyles />
<EnsureLogin />

<Nav />

<main>
    <slot />
</main>
