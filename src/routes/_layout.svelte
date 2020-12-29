<script>
    import BulmaGlobalStyles from '../components/BulmaGlobalStyles.svelte';
    import EnsureLogin from '../components/common/EnsureLogin.svelte';
    import Nav from '../components/Nav.svelte';
</script>

<style>
    @media (max-width: 920px) {
        main {
            border-radius: 26px !important;
            margin-top: -24px;
            background: white;
            min-height: 60px;
        }
    }
</style>

<BulmaGlobalStyles />
<EnsureLogin />
<Nav />
<main>
    <slot />
</main>
