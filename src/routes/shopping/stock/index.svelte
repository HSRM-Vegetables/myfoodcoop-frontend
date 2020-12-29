<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import StockList from '../../../components/stock/StockList.svelte';
    import { title } from '../../../stores/page';
    import Stock from '../../../scripts/stock/Stock';

    let stockList = {
        items: [],
    };

    let isLoading = true;

    onMount(async () => {
        stockList = await Stock.getStockList();
        isLoading = false;
    });

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }
</script>

<div class="has-text-centered mb-6">
    <StockList bind:stockItems={stockList.items} bind:isLoading isClickable={true} on:select={itemSelected} />
</div>

<hr />

<div class="has-text-centered"><a href="/shopping/cart" class="button is-link">Zum Warenkorb</a></div>
