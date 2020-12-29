<script>
    import logo from 'images/logo_white.png';
    import { mdiBasket, mdiAccount, mdiFormatListText } from '@mdi/js';
    import ShowBalance from './balance/ShowBalance.svelte';
    import { name } from '../stores/user';
    import { title, navBalance } from '../stores/page';

    const buttons = [
        {
            icon: mdiBasket,
            href: '/shopping/cart',
        },
        {
            icon: mdiAccount,
            href: '/profile',
        },
        {
            icon: mdiFormatListText,
            href: '/stock/',
        },
    ];
</script>

<style>
    nav {
        border-radius: 0;
    }
    .nav-element img {
        height: 40px;
    }
    .name-title {
        position: absolute;
        padding-left: 15px;
        top: 23px;
        color: white;
    }
    a.balance {
        padding: 50px 0;
        color: white;
    }
    .blue-background {
        height: 30px;
        background: #375a7f;
    }
    .appbar {
        width: 100%;
        background: white;
        position: fixed;
        bottom: 0;
        margin: 0;
        border-top: solid 1px #375a7f;
        z-index: 1000;
    }
    .appbar svg {
        height: 40px;
        color: #375a7f;
    }
</style>

<svelte:head>
    <title>{$title}</title>
</svelte:head>
<div class="nav-element">
    <a href="/"><img src={logo} alt="Logo" /></a>
    <a href="/profile" class="is-size-4 name-title"> {$name} </a>
    {#if $navBalance === 'show'}
        <a href="/balance" class="balance has-text-centered has-text-weight-bold">
            <ShowBalance />
        </a>
    {/if}
</div>
<div class="blue-background" />
<div class="appbar columns is-mobile is-hidden-desktop has-text-centered">
    {#each buttons as button}
        <div class="column ">
            <a href={button.href}>
                <svg viewbox="0 0 24 24">
                    <path fill="currentColor" d={button.icon} />
                </svg>
            </a>
        </div>
    {/each}
</div>
