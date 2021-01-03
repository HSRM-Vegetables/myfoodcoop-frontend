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
    import { title, navBalance } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Einkaufshistorie';
    $navBalance = 'hidden';

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

    <div class="has-text-centered"><a href="/history" class="button is-primary">Zur Einkaufshistorie</a></div>
{:else}<span>Loading...</span>{/if}
