<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import Cookie from 'js-cookie';
    import { mdiCartArrowDown, mdiCartArrowRight } from '@mdi/js';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import Purchase from '../../scripts/purchase/Purchase';
    import ShoppingCartItems from './ShoppingCartItems.svelte';
    import Button from '../common/Button.svelte';
    import Modal from '../common/Modal.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import { moneyStyler } from '../../scripts/common/Helper';
    import { cartItemsCount } from '../../stores/shoppingCart';
    import { currentBalance } from '../../stores/balance';
    import { getTaxPriceFromItem } from '../../scripts/stock/StockItem';

    // Stub item because onMount is called after the first render
    let cart = {
        cartItems: [],
        totalPrice: () => 0,
    };
    let checkoutInProgress = false;
    let requestError;
    let balanceAfterPurchase;
    let vatDetails = [];
    let modalOpen = false;

    $: {
        // This block is executed as soon as one of the stores or variables in this block is reassigned.
        // Immediatly after the currentBalance is set, the displayed value will be adapted.
        balanceAfterPurchase = moneyStyler($currentBalance - cart.totalPrice());
        updateTaxes();
    }

    onMount(() => {
        cart = new ShoppingCart();
        cartItemsCount.forceUpdate();
    });

    // updates the displayed tax and tax rates
    function updateTaxes() {
        const details = [];
        const distinctVatRates = [];

        // collect all currently existing vat rates
        cart.cartItems.forEach((item) => {
            if (!distinctVatRates.includes(item.stockItem.vat)) {
                distinctVatRates.push(item.stockItem.vat);
            }
        });

        // iterate over each vat rate
        distinctVatRates.forEach((rate) => {
            // get all items curently in cart, if they have the current rate
            const itemsByRate = cart.cartItems.filter((ci) => ci.stockItem.vat === rate);

            // accumulate the vat amount of all collected items
            let vatValue = 0;
            itemsByRate.forEach((item) => {
                vatValue += getTaxPriceFromItem(item.stockItem) * item.quantity;
            });

            // temporaly save the calculate values
            details.push({
                vat: rate,
                amount: vatValue,
            });
        });

        // assign the value to the global variable
        vatDetails = details;
    }

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

            const date = new Date().setTime(date.getTime() + 0.2 * 60 * 1000);
            Cookie.set('buy', 'true', { expires: date });
            goto('/');
        } catch (error) {
            requestError = error;
        } finally {
            checkoutInProgress = false;
        }
    }
    function setModalOpen(value) {
        modalOpen = value;
    }
</script>

<Modal title="Kauf bestätigen" bind:open={modalOpen}>
    <div slot="body">
        <p class="is-size-4">Gesamtpreis: {cart.totalPrice()} €</p>

        <span class="pl-3">davon Umsatzsteuer:
            {moneyStyler(vatDetails.reduce((sum, detail) => sum + detail.amount, 0))}
            €</span>
        <br />
        {#each vatDetails as details}
            <span class="is-size-7 pl-3">davon
                {moneyStyler(details.vat * 100)}
                %:
                {moneyStyler(details.amount)}
                €</span>
            <br />
        {/each}

        {#if balanceAfterPurchase}
            <p class="mt-3">Guthaben nach Kauf: {balanceAfterPurchase} €</p>
        {/if}
    </div>
    <div slot="footer">
        <button class="button is-primary" on:click={checkout}>Kaufen</button>
        <button class="button is-danger" on:click={() => setModalOpen(false)}>Abbrechen</button>
    </div>
</Modal>
<div class="has-text-centered">
    {#if cart.cartItems.length > 0}
        <ShoppingCartItems bind:cartItems={cart.cartItems} on:remove={removeItem} />
    {:else}
        <p>Der Warenkorb ist leer.</p>
    {/if}

    <Button
        href="/shopping/stock"
        text="Artikel hinzufügen"
        class="is-primary mt-6"
        size="full-width"
        icon={mdiCartArrowDown}
    />

    <hr />

    <p class="is-size-4">Gesamtpreis: {cart.totalPrice()} €</p>
    <span>davon Umsatzsteuer : {moneyStyler(vatDetails.reduce((sum, detail) => sum + detail.amount, 0))} €</span>
    <br />
    {#each vatDetails as details}
        <span class="is-size-7">davon {moneyStyler(details.vat * 100)} %: {moneyStyler(details.amount)} €</span>
        <br />
    {/each}

    {#if balanceAfterPurchase}
        <p class="is-size-7 mt-3">Guthaben nach Kauf: {balanceAfterPurchase} €</p>
    {/if}

    {#if cart.cartItems.length > 0}
        <Button
            text="Kaufen"
            class="is-primary mt-5"
            size="full-width"
            on:click={() => setModalOpen(true)}
            isLoading={checkoutInProgress}
            icon={mdiCartArrowRight}
        />
    {/if}

    <ErrorModal error={requestError} />
</div>
