<script>
    import { onMount, onDestroy } from 'svelte';
    import Switch from './Switch.svelte';
    import { currentShoppingCartItem } from '../../stores/priceCalculator';
    import ShowBalance from '../balance/ShowBalance.svelte'
    import { goto } from '@sapper/app';

    var DOMstrings = {
    name: 'input__item',
    unitType: 'input__type',
    unitPrice: 'input__unitPrice',
    quantity: 'input__quantity',
    totalPrice: 'output__totalPrice'
};

    let acceptTerms = false;
    let goodsPriceInput;
    let amountInput;
    let totalPriceOutput;
    let goodsPrice;
    let amount;
    let article;

    onMount(async () => {});
    onDestroy(() => {
        $currentShoppingCartItem = undefined;
    })

    function calcTotalPrice() {
        article = document.getElementById(DOMstrings.name).value;
        goodsPrice = parseFloat(
            document.getElementById(DOMstrings.unitPrice).value
        );
        amount = parseFloat(document.getElementById(DOMstrings.quantity).value);

        if (!isNaN(goodsPrice) && !isNaN(amount)) {
            totalPriceOutput = (goodsPrice * amount).toFixed(2);
            document.getElementById(DOMstrings.totalPrice).innerHTML = `${totalPriceOutput} €`;
        }
    }

    function getData() {
        var obj = {
            name: article,
            unitType: acceptTerms,
            unitPrice: goodsPrice,
            quantity: amount,
        };
        console.dir(obj); 
        // const shoppingCart = new ShoppingCart()
        // ShoppingCart.addItem(name, unitType .-.-)
        // goto("/warenkorb")
        return obj;
    }

    function clearInputs() {
        document.getElementById(DOMstrings.name).value = '';
        document.getElementById(DOMstrings.unitPrice).value = '';
        document.getElementById(DOMstrings.quantity).value = '';
        document.getElementById(DOMstrings.totalPrice).innerHTML = '0€';
    }
</script>

<style>
    h1 {
        color: rgba(0, 0, 0);
        text-align: center;
    }
    :root {
        --color__accent: #6200ee;

        --field__background: #f5f5f5;
        --field__background--hover: #e9e9e9;
        --input__border: rgba(0, 0, 0, 0.42);
        --input__border--hover: rgba(0, 0, 0, 0.62);
        --label__color: #222;

        --font__size: 16px;
        --font__family: Roboto, Arial, sans-serif;
    }

    .floating {
        background-color: var(--field__background);
        transition: background-color 0.2s ease;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .floating:hover,
    .floating:focus-within {
        background-color: var(--field__background--hover);
    }

    .floating__input {
        padding: 1.8rem 1rem 0.6rem;
        font-size: 1rem;
        border-bottom: 0.1rem solid var(--input__border);
        transition: border-color 0.2s ease;
        caret-color: var(--color__accent);
    }

    .floating:hover .floating__input {
        border-color: var(--input__border--hover);
    }

    .floating__input::placeholder {
        color: rgba(0, 0, 0, 0);
    }

    .floating__label {
        display: block;
        position: relative;
        max-height: 0;
        font-weight: 500;
        pointer-events: none;
    }

    .floating__label::before {
        color: var(--label__color);
        content: attr(data-content);
        display: inline-block;
        filter: blur(0);
        backface-visibility: hidden;
        transform-origin: left top;
        transition: transform 0.2s ease;
        left: 1rem;
        position: relative;
    }

    .floating__label::after {
        bottom: 1rem;
        content: '';
        height: 0.1rem;
        position: absolute;
        transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
            opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),
            background-color 0.3s ease;
        opacity: 0;
        left: 0;
        top: 100%;
        margin-top: -0.1rem;
        transform: scale3d(0, 1, 1);
        width: 100%;
        background-color: var(--color__accent);
    }

    .floating__input:focus + .floating__label::after {
        transform: scale3d(1, 1, 1);
        opacity: 1;
    }

    .floating__input:placeholder-shown + .floating__label::before {
        transform: translate3d(0, -2.2rem, 0) scale3d(1, 1, 1);
    }

    .floating__label::before,
    .floating__input:focus + .floating__label::before {
        transform: translate3d(0, -3.12rem, 0) scale3d(0.82, 0.82, 1);
    }

    .floating__input:focus + .floating__label::before {
        color: var(--color__accent);
    }

    input {
        background: none;
        border-width: 0;
        display: block;
        width: 100%;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    .hidden--visually {
        border: 0;
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    .form {
        background-color: #fff;
        padding: 2rem 3rem 4rem;
        box-shadow: 2px 2px 16px 3px rgba(0, 0, 0, 0.4);
    }

    ul li {
        display: inline-block;
        text-align: center;
    }

    ul {
        text-align: center;
    }

    li {
        margin: 10px 30px;
    }

    .balance {
        display: flex;
        justify-content: space-between;
    }

    .field2 {
        margin-top: 2rem;
    }

    .control2 {
        display: flex;
        justify-content: center;
    }
    .control3 {
        margin: 10px 10px;
    }

    .flexbox {
        display: flex;
        align-items: center;
        margin-top: 2rem;
    }

    .margin {
        margin-left: 20px;
    }

    .margin40 {
        margin-top: 40px;
    }

    .total {
        margin-top: 20px;
        text-align: center;
        font-size: 24px;
    }

    .totalPrice {
        text-align: center;
        font-size: 40px;
    }

    .margin3 {
        margin-top: 20px;
    }
</style>


<div>
    <div class="content">
        <div class="form">
            <h1>Preisrechner</h1>

            <ShowBalance />
            <hr />

            <div class="floating">
                <input
                    id="input__item"
                    class="floating__input"
                    name="article"
                    type="text"
                    placeholder="Artikel"
                    value="{$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.name : ""}" />
                <label
                    for="input__item"
                    class="floating__label"
                    data-content="Artikel">
                    <span class="hidden--visually">Artikel</span>
                </label>
            </div>

            <div class="field field2">
                <div class="control control2">
                    <div>Stückpreis</div>
                    <div class="control3">
                        <Switch bind:checked={acceptTerms} />
                    </div>
                    <div>Kilopreis</div>
                </div>
            </div>

            <div class="flexbox">
                <div class="floating">
                    <input
                        bind:this={goodsPriceInput}
                        id="input__unitPrice"
                        class="floating__input"
                        name="goodsPrice"
                        type="number"
                        placeholder="Warenpreis"
                        value="{$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.unitPrice : ""}" 
                        on:change={() => calcTotalPrice()}
                        on:input={() => calcTotalPrice()} />
                    <label
                        for="input__unitPrice"
                        class="floating__label"
                        data-content="Warenpreis">
                        <span class="hidden--visually">Warenpreis</span>
                    </label>
                </div>
                <div class="margin">
                    {#if !acceptTerms}/ Stück{:else}/ Kg{/if}
                </div>
            </div>

            <div class="floating field2">
                <input
                    bind:this={amountInput}
                    id="input__quantity"
                    class="floating__input"
                    name="amount"
                    type="number"
                    placeholder="Menge"
                    value="{$currentShoppingCartItem !== undefined ? $currentShoppingCartItem.quantity: ""}" 
                    on:change={() => calcTotalPrice()}
                    on:input={() => calcTotalPrice()} />
                <label
                    for="input__quantity"
                    class="floating__label"
                    data-content="Menge">
                    <span class="hidden--visually">Menge</span>
                </label>
            </div>

            <hr class="margin40" />

            <div class="total">Gesamtpreis</div>
            <div
                class="totalPrice"
                id="output__totalPrice"
                bind:this={totalPriceOutput}>
                0€
            </div>
            <hr class="margin3" />

            <div>
                <ul>
                    <li>
                        <button
                            on:click={getData}
                            class="button is-medium is-success is-link is-rounded">
                            Warenkorb hinzufügen
                        </button>
                    </li>
                    <li>
                        <button
                            on:click={clearInputs}
                            class="button is-medium is-link is-danger is-rounded">
                            Eingabe löschen
                        </button>
                    </li>
                    <li>
                        <button
                            on:click={() => goto("/shopping-cart")}
                            class="button is-medium is-link is-danger is-rounded">
                            Zurück zum Warenkorb
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
