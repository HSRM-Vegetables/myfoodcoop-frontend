<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import StockItemDetails from '../../../components/stock/StockItemDetails.svelte';
    import Stock from '../../../scripts/stock/Stock';
    import Button from '../../../components/common/Button.svelte';
    import { title, navBalance } from '../../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Artikel';
    $navBalance = 'hidden';

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
<StockItemDetails item={item} />

<Button text="zum Bestand" href="/stock/" class="button is-link mt-5" size="full-width" />
