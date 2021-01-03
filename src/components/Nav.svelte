<script>
    import logo from 'images/logo_white.png';
    import ShowBalance from './balance/ShowBalance.svelte';
    import { title, navBalance } from '../stores/page';

    export let isLoggedIn;
</script>

<style>
    .nav-element {
        color: white;
        background: #375a7f;
        position: relative;
        padding: 20px;
    }
    .nav-element img {
        height: 30px;
    }
    .page-title {
        position: absolute;
        left: 65px;
        top: 17px;
        color: white;
        font-size: 1.6em;
        font-weight: bold;
    }
    a.balance {
        color: white;
        font-size: 2.5em;
    }

    .blue-background {
        height: 30px;
        background: #375a7f;
    }
    span.nav-text {
        position: absolute;
        left: 25px;
        top: 70px;
    }
    .inline-balance {
        position: absolute;
        right: 15px;
        top: 25px;
    }
</style>

<svelte:head>
    <title>{$title}</title>
</svelte:head>
<div class="nav-element">
    <a href="/">
        {#if $navBalance === 'show' && isLoggedIn}
            <img class="mb-5" src={logo} alt="Logo" />
        {:else}<img src={logo} alt="Logo" />{/if}
    </a>

    <span class="page-title">{$title}</span>
    {#if isLoggedIn}
        {#if $navBalance === 'show'}
            <span class="nav-text is-hidden-desktop"> Guthaben: </span>
            <a href="/balance" class="balance has-text-centered has-text-weight-bold">
                <ShowBalance />
            </a>
        {/if}
        {#if $navBalance === 'inline'}
            <div class="inline-balance">
                <ShowBalance />
            </div>
        {/if}
    {/if}
</div>
<div class="blue-background" />
