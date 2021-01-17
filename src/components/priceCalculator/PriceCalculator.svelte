<script>
    import { goto } from '@sapper/app';
    import { onMount, onDestroy } from 'svelte';
    import { currentShoppingItemQuantity } from '../../stores/priceCalculator';
    import { UnitType } from '../../scripts/UnitType';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import TextField from '../common/TextField.svelte';
    import Button from '../common/Button.svelte';

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
            currentTotal = (stockItem.pricePerUnit * quantity).toFixed(2);
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

    .form > div {
        margin-bottom: 3em;
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
    .breakwords {
        word-break: break-all;
    }
</style>

{#if stockItem}
    <div class="form">
        <div class="is-size-3 mb-4 breakwords">{stockItem.name}</div>

        {#if stockItem.description}
            <div class="box">{stockItem.description}</div>
        {/if}

        <div>
            Warenpreis<br />
            <span class="is-size-4">
                {stockItem.pricePerUnit}
                {stockItem.unitType === UnitType.KILO ? '€ / kg' : '€ / Stück'}
            </span>
        </div>

        <div>
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
            <span class="is-size-7">
                Menge im Bestand:
                {stockItem.quantity}
                {stockItem.unitType === UnitType.KILO ? 'kg' : 'Stück'}
            </span>
        </div>

        <hr />

        <div class="total-container">
            <h2>Gesamtpreis</h2>
            <div class="total">{currentTotal}€</div>
        </div>

        <hr />
        <div class="container has-text-centered">
            <Button
                text="zum Warenkorb hinzufügen"
                class="button is-primary mb-4"
                size="full-width"
                on:click={addItem}
            />
            <Button text="Zurück" class="button is-link mb-4" size="full-width" on:click={() => goto(linkBack)} />
        </div>
    </div>
{/if}
