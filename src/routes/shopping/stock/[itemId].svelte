<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import PriceCalculator from '../../../components/PriceCalculator/PriceCalculator.svelte';
    import { title } from '../../../stores/page';
    import Stock from '../../../scripts/stock/Stock';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Preisrechner';

    const { page } = stores();
    const { itemId } = $page.params;

    let stockItem;

    onMount(async () => {
        stockItem = await Stock.getItem(itemId);
    });
</script>

<PriceCalculator stockItem={stockItem} />
