<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import StockFiller from '../../../components/stock/StockFiller.svelte';
    import Stock from '../../../scripts/stock/Stock';

    const { page } = stores();
    const { itemId } = $page.params;

    let stockItem;

    onMount(() => {
        const stock = new Stock();
        stockItem = stock.getItem(itemId);
    });
</script>

<StockFiller item={stockItem} />
