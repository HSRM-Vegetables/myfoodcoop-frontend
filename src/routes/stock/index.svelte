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

<div class="has-text-centered">
    <StockList bind:stockItems={stock.stockItems}/>
    <a href="stock/fill" class="button is-primary mt-6">Bestand hinzufügen</a>
</div>


<hr />

<div class="has-text-centered">
    <a href="/" class="button is-link container">Zur Hauptseite</a>
</div>
