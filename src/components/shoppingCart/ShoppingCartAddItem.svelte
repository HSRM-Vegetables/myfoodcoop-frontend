<script>
    import { goto } from '@sapper/app';
    import { mdiShopping, mdiCartArrowDown } from '@mdi/js';
    import { onMount, onDestroy } from 'svelte';
    import { currentShoppingItemQuantity } from '../../stores/priceCalculator';
    import { UnitType } from '../../scripts/stock/UnitType';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import TextField from '../common/TextField.svelte';
    import StockItemDetails from '../stock/StockItemDetails.svelte';
    import Button from '../common/Button.svelte';
    import { moneyStyler } from '../../scripts/common/Helper';
    import { getTaxPriceFromItem } from '../../scripts/stock/StockItem';

    // if undefined we asume, we are creating a new cart item
    export let stockItem;

    $: {
        if (stockItem && $currentShoppingItemQuantity !== undefined) {
            // update total price a soon as the item is set
            calcTotalPrice();
        }
    }

    let quantityElement;
    let quantityError = false;
    let currentTotal = 0;
    let currentTaxTotal = 0;
    let linkBack = '/shopping/stock';

    onMount(() => {
        // changes the link back if coming from cart
        if ($currentShoppingItemQuantity !== undefined) {
            linkBack = '/shopping/cart';
        }
    });

    onDestroy(() => {
        $currentShoppingItemQuantity = undefined;
    });

    function calcTotalPrice() {
        const quantity = quantityElement ? quantityElement.getValue() : $currentShoppingItemQuantity;

        if (!Number.isNaN(stockItem.pricePerUnit) && !Number.isNaN(quantity)) {
            currentTotal = stockItem.pricePerUnit ? (stockItem.pricePerUnit * quantity).toFixed(2) : 0;
            currentTaxTotal = getTaxPriceFromItem(stockItem) * quantity;
        }
    }

    function isQuantityValid() {
        const quantity = quantityElement.getValue();
        if (!quantity || Number.isNaN(quantity) || quantity <= 0) {
            quantityError = true;
            return false;
        }

        // Make sure one cannot purchase half of an item
        if (stockItem.unitType === UnitType.PIECE && quantity % 1 !== 0) {
            quantityError = true;
            return false;
        }

        quantityError = false;
        return true;
    }

    function addItem() {
        if (!isQuantityValid()) {
            return;
        }

        const cart = new ShoppingCart();
        cart.addItem(stockItem, quantityElement.getValue());
        goto('/shopping/cart');
    }
</script>

<style>
    h2 {
        font-weight: bold;
        text-align: center;
        font-size: 1.5em;
    }

    .total-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .total {
        font-weight: bold;
        font-size: 4em;
    }
</style>

{#if stockItem}
    <StockItemDetails item={stockItem} showButtons={false} />

    <div class="mt-5">
        <TextField
            label="Menge"
            placeholder="0"
            decoration={stockItem.unitType === UnitType.KILO ? 'kg' : 'Stück'}
            type="number"
            bind:this={quantityElement}
            value={$currentShoppingItemQuantity || ''}
            on:change={calcTotalPrice}
            on:input={calcTotalPrice}
            minimum="0"
            isInErrorState={quantityError}
        />
        {#if stockItem.unitType === UnitType.KILO}
            <span class="is-size-7">Menge im Bestand: {stockItem.quantity.toFixed(3)} kg</span>
        {:else}
            <span class="is-size-7">Menge im Bestand: {stockItem.quantity} Stück</span>
        {/if}
    </div>

    <hr />

    <div class="total-container">
        <h2>Gesamtpreis</h2>
        <div class="total">{moneyStyler(currentTotal)} €</div>
        <div>davon Umsatzsteuersatz ({moneyStyler(stockItem.vat * 100)} %): {moneyStyler(currentTaxTotal)} €</div>
    </div>

    <hr />
    <div class="container has-text-centered">
        <Button
            text="zum Warenkorb hinzufügen"
            class="button is-primary mb-4"
            size="full-width"
            icon={mdiShopping}
            on:click={addItem}
        />
        <Button
            text="Zurück zur Artikelauswahl"
            class="button is-link mb-4"
            size="full-width"
            icon={mdiCartArrowDown}
            on:click={() => goto(linkBack)}
        />
    </div>
{/if}
