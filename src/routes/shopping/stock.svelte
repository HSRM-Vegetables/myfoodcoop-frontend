<script>
    import { onMount } from 'svelte';
    import StockList from '../../components/stock/StockList.svelte';
    import { title } from '../../stores/page';
    import Stock from '../../scripts/stock/Stock';

    let stock = {
        stockItems: [],
    };

    onMount(() => {
        stock = new Stock();
    });

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
$title = 'Bestand';
</script>

<svelte:head>
    <title>Bestand</title>
</svelte:head>

<div class="has-text-centered mb-6">
    {#if stock.stockItems.length > 0}
        <StockList bind:stockItems={stock.stockItems} allowVisitPriceCalculator={true}/>
    {:else}
        <p>Der Bestand ist leer.</p>
    {/if}
</div>

<hr />

<div class="has-text-centered">
    <a href="/shopping/cart" class="button is-link">Zum Warenkorb</a>
</div>