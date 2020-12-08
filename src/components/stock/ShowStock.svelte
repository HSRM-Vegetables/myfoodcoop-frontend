<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import uuid from 'uuid';
    import Stock from '../../scripts/stock/Stock';
    import Balance from '../../scripts/Balance';
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import Purchase from '../../scripts/purchase/Purchase';
    import StockList from '../stock/StockList.svelte';
    
    // Stub item because onMount is called after the first render
    let stock = {
        stockItems: [],
    };
    let balance = {
        money: 0,
    };
    onMount(() => {
        stock = new Stock();
        balance = new Balance();
    });

    // create a purchase and go to the main page
    function checkout() {
        const purchasApi = new PurchaseApi();
        purchasApi.addPurchase(new Purchase(
            uuid(),
            new Date(),
            stock.stockItems
        ));

        goto('/');
    }
</script>

<div class="has-text-centered">

    {#if stock.stockItems.length > 0}
        <StockList bind:cartItems={stock.stockItems}/>
    {:else}
        <p>Der Bestand ist leer.</p>
    {/if}
    
    <button class="button is-primary mt-6" on:click={() => goto('stock-filler')}>Bestand hinzufügen</button>

</div>
