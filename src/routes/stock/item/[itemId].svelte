<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import StockFiller from '../../../components/stock/StockFiller.svelte';
    import Stock from '../../../scripts/stock/Stock';

    const { page } = stores();
    const { itemId } = $page.params;
    let item;

    onMount(async () => {
        item = await Stock.getItem(itemId);
    });
</script>

<StockFiller item={item} />
