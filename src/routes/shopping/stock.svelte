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

<StockList bind:stockItems={stock.stockItems} allowVisitPriceCalculator={true}/>

<div class="has-text-centered">
    <a href="/shopping/cart" class="button is-primary">Zum Warenkorb</a>
</div>