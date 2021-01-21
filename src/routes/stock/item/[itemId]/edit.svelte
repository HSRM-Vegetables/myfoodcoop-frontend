<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import ErrorModal from '../../../../components/common/ErrorModal.svelte';
    import StockFiller from '../../../../components/stock/StockFiller.svelte';
    import Stock from '../../../../scripts/stock/Stock';
    import { title, navBalance } from '../../../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand bearbeiten';
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
{#if item}
    <StockFiller item={item} linkBack="/stock/item/{item.id}" linkBackText="zurück" />
{/if}
