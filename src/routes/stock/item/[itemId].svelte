<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import StockFiller from '../../../components/stock/StockFiller.svelte';
    import Stock from '../../../scripts/stock/Stock';

    const { page } = stores();
    const { itemId } = $page.params;
    let item;
    let requestError;

    onMount(async () => {
        try {
            item = await Stock.getItem(itemId);
        } catch (error) {
            requestError = error;
        }
    });
</script>

<ErrorModal error={requestError} />
<StockFiller item={item} />
