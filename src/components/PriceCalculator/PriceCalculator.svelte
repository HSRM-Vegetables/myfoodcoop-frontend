<script>
    import { goto } from '@sapper/app';
    import { onMount, onDestroy } from 'svelte';
    import { currentShoppingItem, currentShoppingItemQuantity } from '../../stores/priceCalculator';
    import { UnitType } from '../../scripts/UnitType';
    import ShowBalance from '../balance/ShowBalance.svelte';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import TextField from '../common/TextField.svelte';
    import Stock from '../../scripts/stock/Stock';

    let quantityElement;
    let quantityError = false;
    let currentTotal = 0;
    let linkBack = '/shopping/stock';

    // Stub item because onMount is called after the first render
    let stockItem = {
        name: '',
        unitType: UnitType.KILO,
        unitPrice: 0,
        quantity: 0,
        description: '',
    };

    onMount(() => {
        // get the current values by article name
        stockItem = new Stock().getItem($currentShoppingItem);

        // changes the link back if coming from cart
        if ($currentShoppingItemQuantity !== undefined) {
            linkBack = '/shopping/cart';
        }
        calcTotalPrice();
    });

    onDestroy(() => {
        $currentShoppingItem = undefined;
        $currentShoppingItemQuantity = undefined;
    });

    function calcTotalPrice() {
        const quantity = quantityElement.getValue();

        if (!Number.isNaN(stockItem.unitPrice) && !Number.isNaN(quantity)) {
            currentTotal = (stockItem.unitPrice * quantity).toFixed(2);
        }
    }

    function isQuantityValid() {
        const quantity = quantityElement.getValue();
        if (!quantity || Number.isNaN(quantity) || quantity <= 0) {
            quantityError = true;
            return false;
        }

        // Make sure one cannot purchase half of an item
        if (stockItem.unitType === UnitType.PIECE && quantity % 1 !== 0 ) {
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
        cart.addItem(stockItem.name, stockItem.unitType, stockItem.unitPrice, quantityElement.getValue());
        goto('/shopping/cart');
    }
</script>

<style>
    h2 {
        font-weight: bold;
        text-align: center;
        font-size: 1.5em;
    }

    .button-box {
        display: flex;
        flex-flow: column nowrap;
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

<div>
    <div class="form">
        <ShowBalance type="inline" />

        <hr />

        <div class="is-size-3 mb-4 breakwords">{stockItem.name}</div>

        {#if stockItem.description}
            <div class="box">{stockItem.description}</div>
        {/if}

        <div>
            Warenpreis<br />
            <span class="is-size-4">
                {stockItem.unitPrice}
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

        <div class="button-box">
            <button on:click={addItem} class="button is-medium is-primary mb-4"> zum Warenkorb hinzufügen </button>
            <button on:click={() => goto(linkBack)} class="button is-link is-medium mb-4"> Zurück </button>
        </div>
    </div>
</div>
