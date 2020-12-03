<script>
    import { goto } from '@sapper/app';
    import { onMount, onDestroy } from 'svelte';
    import Switch from './Switch.svelte';
    import { currentShoppingCartItem } from '../../stores/priceCalculator';
    import { UnitType } from '../../scripts/UnitType';
    import ShowBalance from '../balance/ShowBalance.svelte';

    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';

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
        if (!Number.isNaN(unitPriceElement.value) && !Number.isNaN(quantityElement.value)) {
            currentTotal = (unitPriceElement.value * quantityElement.value).toFixed(2);
        }
    }

    function addItem() {
        const cart = new ShoppingCart();
        cart.addItem(
            articleElement.value,
            unitType,
            unitPriceElement.value,
            quantityElement.value
        );
        goto('/shopping-cart');
    }

    function clearInputs() {
        articleElement.value = '';
        unitPriceElement.value = '';
        quantityElement.value = '';
        currentTotal = 0;
    }
</script>

<style>
    .button-box {
        display: flex;
        flex-flow: column nowrap;
    }

    .auto-margin {
        margin: auto;
    }
</style>

<div>
    <div>
        <div class="form">
            <h1>Preisrechner</h1>

            <ShowBalance />
            
            <hr />

            <div>
                <span>Artikel</span>
                <input
                    class="input"
                    type="text"
                    placeholder="Artikel"
                    bind:this={articleElement}
                    value={$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.name : ''} />
            </div>

            <div>
                <div>
                    <div class="auto-margin" >Stückpreis</div>
                    <div class="auto-margin">
                        <Switch bind:checked={unitTypeBoolean} />
                    </div>
                    <div class="auto-margin">Kilopreis</div>
                </div>
            </div>

            <div>                
                <span>Warenpreis</span>
                <input
                    bind:this={unitPriceElement}
                    class="input"
                    type="number"
                    placeholder="Warenpreis"
                    value={$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.unitPrice : ''}
                    on:change={() => calcTotalPrice()}
                    on:input={() => calcTotalPrice()} />
            </div>
            <div>
                {#if unitType === UnitType.KILO}
                    <span>/ kg</span>
                {:else}
                    <span>/ Stück</span>
                {/if}
            </div>
        </div>

        <div>
            <span >Menge</span>
            <input
                bind:this={quantityElement}
                class="input"
                type="number"
                placeholder="Menge"
                value={$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.quantity : ''}
                on:change={() => calcTotalPrice()}
                on:input={() => calcTotalPrice()} />
        </div>

        <hr />

        <div class="total">Gesamtpreis {currentTotal}€</div>

        <hr />

        <div class="button-box">
            <button
                on:click={addItem}
                class="button is-medium is-primary mb-4">
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
