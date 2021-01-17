<script>
    import { stores, goto } from '@sapper/app';
    import { mdiBasket, mdiAccount, mdiFormatListText, mdiHome } from '@mdi/js';
    import Icon from './common/Icon.svelte';

    const { page } = stores();

    const buttons = [
        {
            icon: mdiHome,
            href: '/',
        },
        {
            icon: mdiBasket,
            href: '/shopping/cart',
        },
        {
            icon: mdiFormatListText,
            href: '/stock/',
        },
        {
            icon: mdiAccount,
            href: '/profile',
        },
    ];

    function onKeyPress(event, href) {
        if (event.code === 'Space' || event.code === 'Enter') {
            goto(href);
        }
    }
</script>

<style>
    .appbar {
        width: 100%;
        background: white;
        position: fixed;
        bottom: 0;
        margin: 0;
        border-top: solid 1px #375a7f;
        z-index: 1000;

        height: 70px;
    }
    .appbar a {
        color: #375a7f;
    }
    .active {
        background-color: #5890cc;
        color: white !important;
    }
</style>

<div class="appbar columns is-mobile is-hidden-desktop has-text-centered">
    {#each buttons as button}
        <a
            class="column"
            href={button.href}
            on:keypress={(e) => onKeyPress(e, button.href)}
            class:active={$page.path === button.href}
        >
            <Icon icon={button.icon} appbar={true} />
        </a>
    {/each}
</div>
