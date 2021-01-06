<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import StockList from '../../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Stock from '../../../scripts/stock/Stock';
    import Button from '../../../components/common/Button.svelte';

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
    $navBalance = 'inline';

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }
</script>

<div class="has-text-centered mb-6">
    <StockList bind:stockItems={stockList.items} bind:isLoading isClickable={true} on:select={itemSelected} />
</div>

<hr />

<div class="has-text-centered">
    <Button text="Zum Warenkorb" class="button is-link" href="/shopping/cart" size="full-width" />
</div>
