<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import uuid from 'uuid';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import Balance from '../../scripts/Balance';
    import ShowBalance from '../balance/ShowBalance.svelte';
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import Purchase from '../../scripts/purchase/Purchase';
    import ShoppingCartItems from './ShoppingCartItems.svelte';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import Stock from '../../scripts/stock/Stock';
    import { moneyStyler } from '../../scripts/Helper';

    // Stub item because onMount is called after the first render
    let cart = {
        cartItems: [],
        totalPrice: () => 0,
    };
    let balance = {
        money: 0,
    };
    let balanceUpdateInProgress = false;
    let requestError;
    let stock;
    let balanceAfterPurchase;

    onMount(() => {
        cart = new ShoppingCart();
        balance = new Balance();
        stock = new Stock();
        updateBalanceAfterPurchase(); // no need to await, update when you feel like it
    });

    async function updateBalanceAfterPurchase() {
        try {
            const currentBalance = await balance.getBalance();
            balanceAfterPurchase = moneyStyler(currentBalance - cart.totalPrice());
        } catch (error) {
            balanceAfterPurchase = 0.0;
        }
    }

    // removes an item from the cart
    function removeItem(event) {
        const itemId = event.detail.id;
        cart.removeItem(itemId);
        cart = cart; // tell svelte to update view

        updateBalanceAfterPurchase(); // no need to await, update when you feel like it
    }

    // create a purchase and go to the main page
    async function checkout() {
        try {
            balanceUpdateInProgress = true;
            balance.currentBalance = await balance.withdrawBalance(parseFloat(cart.totalPrice()));

            const purchaseApi = new PurchaseApi();
            purchaseApi.addPurchase(new Purchase(uuid(), new Date(), cart.cartItems));

            // update stock
            cart.cartItems.forEach((item) => {
                stock.removeQuantityFromItem(item.stockItem.id, item.quantity);
            });

            cart.clear();
            goto('/');
        } catch (error) {
            requestError = error;
        } finally {
            balanceUpdateInProgress = false;
        }
    }
</script>

<div class="has-text-centered">
    <h1 class="mb-4">Warenkorb</h1>

    <ShowBalance bind:currentBalance={balance.money} type="inline" />

    <hr />

    {#if cart.cartItems.length > 0}
        <ShoppingCartItems bind:cartItems={cart.cartItems} on:remove={removeItem} />
    {:else}
        <p>Der Warenkorb ist leer.</p>
    {/if}

    <Button href="/shopping/stock" text="Artikel hinzufügen" class="is-primary mt-6" size="medium" />

    <hr />

    <p class="is-size-4">Gesamtpreis: {cart.totalPrice()} €</p>

    {#if balanceAfterPurchase}
        <p class="is-size-7 mt-3">Guthaben nach Kauf: {balanceAfterPurchase} €</p>
    {/if}

    {#if cart.cartItems.length > 0}
        <Button
            text="Kaufen"
            class="is-primary mt-5"
            size="medium"
            on:click={checkout}
            isLoading={balanceUpdateInProgress}
        />
    {/if}

    <ErrorModal error={requestError} />
</div>
