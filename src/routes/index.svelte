<script>
    import { goto } from '@sapper/app';
    import { onMount } from 'svelte';
    import { mdiPiggyBank, mdiShoppingSearch, mdiFormatListText } from '@mdi/js';
    import { title, navBalance } from '../stores/page';
    import StockList from '../components/stock/StockList.svelte';
    import Stock from '../scripts/stock/Stock';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Stadtgemüse e.V.';
    $navBalance = 'show';

    const buttons = [
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
            label: 'Bestands Liste',
            icon: mdiFormatListText,
            href: '/stock/',
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
</script>

<style>
    .icon-button {
        font-size: 15px;
        color: white;
        background: #375a7f;
        padding: 7px 24px;
        border-radius: 6px;
        cursor: pointer;
    }
    .icon-button svg {
        height: 120px;
    }
</style>

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

<div class="columns">
    {#each buttons as button}
        <div class="column">
            <div
                class="icon-button"
                tabindex="0"
                role="button"
                aria-label={button.label}
                on:click={() => goto(button.href)}
            >
                <svg viewbox="0 0 24 24">
                    <!-- Give the path the value currentColor, so it inherits the text-color of its parent -->
                    <path fill="currentColor" d={button.icon} />
                </svg>
                <span>{button.label}</span>
            </div>
        </div>
    {/each}
</div>
