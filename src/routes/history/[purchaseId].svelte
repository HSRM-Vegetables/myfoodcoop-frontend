<script context="module">
    let purchasId = -1;

    export async function preload({ params }) {
        purchasId = params.purchaseId;
    }
</script>

<script>
    import { onMount } from 'svelte';
    import ShoppingCartItems from '../../components/shoppingCart/ShoppingCartItems.svelte';
    import { moneyStyler } from '../../scripts/Helper';
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import { title } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Einkaufshistorie';

    let purchase;
    onMount(() => {
        const purchaseApi = new PurchaseApi();
        purchase = purchaseApi.purchases.find((p) => p.id === purchasId);
    });
</script>

{#if purchase !== undefined}
    <ShoppingCartItems cartItems={purchase.cartItems} allowRemoval={false} allowVisitPriceCalculator={false} />

    <hr />

    <span>Gesamtbetrag: {moneyStyler(purchase.totalPrice())}€</span>

    <hr />

    <div class="has-text-centered">
        <Button text="Zur Einkaufshistorie" href="/history" class="button is-primary" size="full-width" /> 
    </div>
{:else}<span>Loading...</span>{/if}
