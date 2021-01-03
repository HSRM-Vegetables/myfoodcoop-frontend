<script>
    import { mdiBasket, mdiAccount, mdiFormatListText, mdiHome } from '@mdi/js';

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
    }
    .appbar svg {
        height: 40px;
        color: #375a7f;
    }
</style>

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
