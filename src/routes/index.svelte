<script>
    import { goto } from '@sapper/app';
    import {
        mdiAccount,
        mdiBasket,
        mdiPiggyBank,
        mdiShoppingSearch,
        mdiFormatListText,
        mdiChartAreasplineVariant,
    } from '@mdi/js';
    import { onMount } from 'svelte';
    import { title, navBalance } from '../stores/page';
    import StockList from '../components/stock/StockList.svelte';
    import Stock from '../scripts/stock/Stock';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Stadtgemüse e.V.';
    $navBalance = 'show';

    const buttons = [
        {
            label: 'Einkaufen',
            icon: mdiBasket,
            href: '/shopping/cart',
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
        {
            label: 'Bestand',
            icon: mdiFormatListText,
            href: '/stock/',
        },
        {
            label: 'Reports',
            icon: mdiChartAreasplineVariant,
            href: '/reports/',
        },
    ];

    let stockList = {
        items: [],
    };
    let cutList = [];
    let isLoading = true;

    onMount(async () => {
        stockList = await Stock.getStockList();
        cutList = stockList.items.slice(0, 3);
        isLoading = false;
    });

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }

    function onKeyPress(event, href) {
        if (event.code === 'Space' || event.code === 'Enter') {
            goto(href);
        }
    }
</script>

<style>
    .icon-box {
        display: flex;
        flex-flow: wrap;
    }
    .icon-button {
        font-size: 15px;
        color: white;
        background: #375a7f;
        padding: 7px 24px;
        border-radius: 6px;
        cursor: pointer;
        display: grid;
        place-items: center;
        margin: 20px;
        min-width: 200px;
    }
    .icon-button svg {
        height: 120px;
    }
    @media (max-width: 920px) {
        .icon-button {
            display: inline-flex;
            place-items: center;
            margin: 20px 0;
        }
        .icon-box div {
            width: 100%;
        }
    }
</style>

<h2 class="pt-4 is-size-5 has-text-weight-bold">Neueste Artikel:</h2>
<div class="has-text-centered mb-6">
    <StockList
        bind:stockItems={cutList}
        bind:isLoading
        isClickable={true}
        on:select={itemSelected}
        showDescription={false}
    />
</div>

<hr />
<h2 class="is-size-5 has-text-weight-bold">Funktionen:</h2>

<div class="icon-box">
    {#each buttons as button}
        <div class="has-text-centered-desktop-only">
            <div
                class="icon-button"
                tabindex="0"
                role="button"
                aria-label={button.label}
                on:keypress={(e) => onKeyPress(e, button.href)}
                on:click={() => goto(button.href)}
            >
                <svg viewbox="0 0 24 24">
                    <!-- Give the path the value currentColor, so it inherits the text-color of its parent -->
                    <path fill="currentColor" d={button.icon} />
                </svg>
                <span class="pl-4 has-text-weight-bold">{button.label}</span>
            </div>
        </div>
    {/each}
</div>
