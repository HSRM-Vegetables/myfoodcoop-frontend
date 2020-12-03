<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import uuid from 'uuid';
    import { UnitType } from '../../scripts/UnitType';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import ShowBalance from '../balance/ShowBalance.svelte';
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import Purchase from '../../scripts/purchase/Purchase';
    import ShoppingCartItems from './ShoppingCartItems.svelte';

    // Stub item because onMount is called after the first render
    let cart = {
        cartItems: [],
        totalPrice: () => 0,
    };
    let currentBalance = 0.0;

    onMount(() => {
        cart = new ShoppingCart();
    });

    // TODO: should be removed if the price calculator is working
    function addSample() {
        cart.addItem('kartoffeln', UnitType.KILO, '5', '15');
        cart.addItem('kürbis', UnitType.PIECE, '5,12', '3');
        cart = cart; // tell svelte to update view
    }
    
    // removes an item from the cart
    function removeItem(event) {
        const itemName = event.detail.name;
        cart.removeItem(itemName);
        cart = cart; // tell svelte to update view
    }
    
    // create a purchase and go to the main page
    function checkout() {
        const purchasApi = new PurchaseApi();
        purchasApi.addPurchase(new Purchase(
            uuid(),
            new Date(),
            cart.cartItems
        ));

        cart.clear();
        cart = cart; // tell svelte to update view

        goto('/');
    }
</script>

<div class="has-text-centered">
    <h1 class="mb-4">Warenkorb</h1>

    <ShowBalance bind:currentBalance />

    <!-- to remove:-->
    <button on:click={addSample}>Sample hinzufügen</button>

    <hr>

    {#if cart.cartItems.length > 0}
        <ShoppingCartItems bind:cartItems={cart.cartItems} on:remove={removeItem} />
    {:else}
        <p>Der Warenkorb ist leer.</p>
    {/if}
    
    <button class="button is-primary mt-6" on:click={() => goto('price-calculator')}>Artikel hinzufügen</button>

    <hr>

    <p class="is-size-4">Gesamtpreis: {cart.totalPrice()} €</p>
    <p class="is-size-7 mt-3">Guthaben nach Kauf: {cart && cart.totalPrice() ? currentBalance - cart.totalPrice() : currentBalance} €</p>

    {#if cart.cartItems.length > 0}
        <button class="button is-primary mt-5" type="submit" on:click={checkout}>Kaufen</button>
    {/if}
</div>