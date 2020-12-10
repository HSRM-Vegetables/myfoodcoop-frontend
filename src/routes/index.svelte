<script>
    import { goto } from '@sapper/app';
    import {
        mdiAccount,
        mdiBasket,
        mdiPiggyBank,
        mdiShoppingSearch
    } from '@mdi/js';
    import ShowBalance from '../components/balance/ShowBalance.svelte';
    import { title } from '../stores/page';
    import Icon from '../components/common/Icon.svelte';
    import { name } from '../stores/user';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Stadtgemüse e.V.';

    function onKeyPress(event, href) {
        if (event.code === 'Space' || event.code === 'Enter') {
            goto(href);
        }
    }

    const buttons = [
        {
            label: 'Einkaufen',
            icon: mdiBasket,
            href: '/shopping-cart',
        },
        {
            label: 'Vorherige Einkäufe',
            icon: mdiShoppingSearch,
            href: '/history',
        },
        {
            label: 'Guthaben verwalten',
            icon: mdiPiggyBank,
            href: '/balance',
        },
        {
            label: 'Benutzerdaten',
            icon: mdiAccount,
            href: '/profile',
        },
    ];
</script>

<style>
    .button-container {
        padding-left: 2em;
        padding-right: 2em;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .big-icon-button {
        background: #375a7f;
        color: white;
        border: 3px solid black;
        max-width: 10em;
        border-radius: 20%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-bottom: 3em;
        padding-left: 1em;
        padding-right: 1em;
    }

    .big-icon-button > span {
        text-align: center;
        font-weight: bold;
    }
</style>

<span class="is-size-4">Hallo {$name}!</span>

<hr />

<ShowBalance type="inline" />

<hr />

<div class="button-container">
    {#each buttons as button}
        <div
            class="big-icon-button"
            tabindex="0"
            role="button"
            aria-label={button.label}
            on:keypress={(e) => onKeyPress(e, button.href)}
            on:click={() => goto(button.href)}>
            <Icon icon={button.icon} />
            <span>{button.label}</span>
        </div>
    {/each}
</div>
