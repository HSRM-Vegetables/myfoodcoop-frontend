<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import StockList from '../../components/stock/StockList.svelte';
    import { title } from '../../stores/page';
    import Stock from '../../scripts/stock/Stock';
    import { currentShoppingItem } from '../../stores/priceCalculator';

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

<div class="has-text-centered mb-6">
    <StockList
        bind:stockItems={stock.stockItems}
        onClick={(item) => {
            // var will be used in another file
            /* eslint-disable no-unused-vars */
            $currentShoppingItem = item.name;
            goto('/shopping/price-calculator');
        }}
    />
</div>

<hr />

<div class="has-text-centered"><a href="/shopping/cart" class="button is-link">Zum Warenkorb</a></div>
