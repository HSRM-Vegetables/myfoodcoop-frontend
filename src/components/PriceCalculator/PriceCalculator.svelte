<script>
    import { goto } from '@sapper/app';
    import { onMount, onDestroy } from 'svelte';
    import Switch from '../common/Switch.svelte';
    import { currentShoppingCartItem } from '../../stores/priceCalculator';
    import { UnitType } from '../../scripts/UnitType';
    import ShowBalance from '../balance/ShowBalance.svelte';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import TextField from '../common/TextField.svelte';
    import { moneyStyler } from '../../scripts/Helper';

    let unitPriceElement;
    let quantityElement;
    let articleElement;
    let currentTotal = 0;
    let unitTypeBoolean;
    let unitType;

    $: untiTypeChanged(unitTypeBoolean);

    onMount(() => {
        calcTotalPrice();
    });

    onDestroy(() => {
        $currentShoppingCartItem = undefined;
    });

    function untiTypeChanged(value) {
        if (value === true) {
            unitType = UnitType.KILO;
        } else {
            unitType = UnitType.PIECE;
        }
    }

    function calcTotalPrice() {
        const unitPrice = moneyStyler(unitPriceElement.getValue());
        const quantity = quantityElement.getValue();

        if (
            !Number.isNaN(unitPrice)
            && !Number.isNaN(quantity)
        ) {
            currentTotal = (
                unitPrice * quantity
            ).toFixed(2);
        }
    }

    function addItem() {
        const cart = new ShoppingCart();
        cart.addItem(
            articleElement.getValue(),
            unitType,
            unitPriceElement.getValue(),
            quantityElement.getValue(),
        );
        goto('/shopping-cart');
    }

    function clearInputs() {
        articleElement.clear();
        unitPriceElement.clear();
        quantityElement.clear();
        currentTotal = 0;
    }
</script>

<style>
    h1 {
        font-weight: bold;
        text-align: center;
        font-size: 2em;
    }

    h2 {
        font-weight: bold;
        text-align: center;
        font-size: 1.5em;
    }

    .button-box {
        display: flex;
        flex-flow: column nowrap;
    }

    .auto-margin {
        margin: auto;
    }

    .form-row {
        display: flex;
        flex-flow: row nowrap;
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
</style>

<div>
    <div class="form">
        <h1>Preisrechner</h1>

        <ShowBalance type="inline" />

        <hr />

        <div>
            <TextField
                label="Artikel"
                placeholder="Artikel"
                bind:this={articleElement}
                value={$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.name : ''}
            />
        </div>

        <div class="form-row">
            <div class="auto-margin">Stückpreis</div>
            <div class="auto-margin">
                <Switch bind:checked={unitTypeBoolean} />
            </div>
            <div class="auto-margin">Kilopreis</div>
        </div>

        <div>
            <TextField 
                label='Warenpreis'
                placeholder='0'
                decoration={unitType === UnitType.KILO ? '€ / kg' : '€ / Stück'}
                bind:this={unitPriceElement}
                type='number'
                value={$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.unitPrice : ''}
                onChange={() => calcTotalPrice()}
                onInput={() => calcTotalPrice()} 
            />
        </div>

        <div>
            <TextField 
                label="Menge"
                placeholder="0"
                decoration={unitType === UnitType.KILO ? 'kg' : 'Stück'}
                type="number"
                bind:this={quantityElement}
                value={$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.quantity : ''}
                onChange={() => calcTotalPrice()}
                onInput={() => calcTotalPrice()}
            />
        </div>

        <hr />

        <div class="total-container">
            <h2>Gesamtpreis</h2>
            <div class="total">{currentTotal}€</div>
        </div>

        <hr />

        <div class="button-box">
            <button on:click={addItem} class="button is-medium is-primary mb-4">
                Warenkorb hinzufügen
            </button>
            <button
                on:click={clearInputs}
                class="button is-medium is-danger mb-4">
                Eingabe löschen
            </button>
            <button
                on:click={() => goto('/shopping-cart')}
                class="button is-link is-medium mb-4">
                Zurück zum Warenkorb
            </button>
        </div>
    </div>
</div>
