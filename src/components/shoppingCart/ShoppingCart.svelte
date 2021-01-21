<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import Purchase from '../../scripts/purchase/Purchase';
    import ShoppingCartItems from './ShoppingCartItems.svelte';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import { moneyStyler } from '../../scripts/Helper';
    import { cartItemsCount } from '../../stores/shoppingCart';
    import { currentBalance } from '../../stores/balance';

    // Stub item because onMount is called after the first render
    let cart = {
        cartItems: [],
        totalPrice: () => 0,
    };
    let checkoutInProgress = false;
    let requestError;
    let balanceAfterPurchase;

    $: {
        // This block is executed as soon as one of the stores or variables in this block is reassigned.
        // Immediatly after the currentBalance is set, the displayed value will be adapted.
        balanceAfterPurchase = moneyStyler($currentBalance - cart.totalPrice());
    }

    onMount(() => {
        cart = new ShoppingCart();
        cartItemsCount.forceUpdate();
    });

    // removes an item from the cart
    function removeItem(event) {
        const itemId = event.detail.id;
        cart.removeItem(itemId);
        cart = cart; // tell svelte to update view

        cartItemsCount.forceUpdate();
    }

    // create a purchase and go to the main page
    async function checkout() {
        try {
            checkoutInProgress = true;
            $currentBalance = (await Purchase.addPurchase(cart.cartItems)).balance;
            cart.clear();
            cartItemsCount.forceUpdate();
            goto('/');
        } catch (error) {
            requestError = error;
        } finally {
            checkoutInProgress = false;
        }
    }
</script>

<div class="has-text-centered">
    {#if cart.cartItems.length > 0}
        <ShoppingCartItems bind:cartItems={cart.cartItems} on:remove={removeItem} />
    {:else}
        <p>Der Warenkorb ist leer.</p>
    {/if}

    <Button href="/shopping/stock" text="Artikel hinzufügen" class="is-primary mt-6" size="full-width" />

    <hr />

    <p class="is-size-4">Gesamtpreis: {cart.totalPrice()} €</p>

    {#if balanceAfterPurchase}
        <p class="is-size-7 mt-3">Guthaben nach Kauf: {balanceAfterPurchase} €</p>
    {/if}

    {#if cart.cartItems.length > 0}
        <Button
            text="Kaufen"
            class="is-primary mt-5"
            size="full-width"
            on:click={checkout}
            isLoading={checkoutInProgress}
        />
    {/if}

    <ErrorModal error={requestError} />
</div>
