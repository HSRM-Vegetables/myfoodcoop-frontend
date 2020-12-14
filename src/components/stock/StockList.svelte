<script>
    import { goto } from '@sapper/app';
    import { UnitType } from '../../scripts/UnitType';
    import { currentShoppingCartItem } from '../../stores/priceCalculator';

    /**
     * An Array of StockItems to be displayed
     */
    export let stockItems;

    /**
     * Allows the user to click on an article to open it in the price calculator
     */
    export let allowVisitPriceCalculator = false;

    function goToPriceCalculator(item) {
        if (allowVisitPriceCalculator) {
            // var will be used in another file
            /* eslint-disable no-unused-vars */
            $currentShoppingCartItem = item;
            goto('/shopping/price-calculator');
        }
    }
</script>

<style>
    .column.is-half.has-text-left {
        overflow-y: auto;
    }
    hr {
        margin: 0.5rem 0;
    }
</style>

<div class="columns is-hidden-mobile has-text-weight-bold">
    <div class="column is-half has-text-left">Artikel</div>
    <div class="column is-one-quarter has-text-right">Menge</div>
    <div class="column is-one-quarter has-text-right">Preis</div>
</div>

{#each stockItems as item}
    <hr />
    <div class="columns" class:is-clickable="{allowVisitPriceCalculator}" on:click="{() => goToPriceCalculator(item)}">
        <div class="column is-half has-text-left">{item.name}</div>
        <div class="column is-one-quarter has-text-right">
            {#if item.unitType === UnitType.PIECE}
                <span>{item.quantity} Stück</span>
            {:else}
                <span>{item.quantity} kg</span>
            {/if}
        </div>
        <div class="column is-one-quarter has-text-right">
            {#if item.unitType === UnitType.PIECE}
                <span>{item.unitPrice} € / Stück</span>
            {:else}
                <span>{item.unitPrice} € / kg</span>
            {/if}
        </div>
    </div>
{/each}
