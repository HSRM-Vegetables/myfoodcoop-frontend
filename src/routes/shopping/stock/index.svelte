<script>
    import { goto } from '@sapper/app';
    import StockList from '../../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Button from '../../../components/common/Button.svelte';
    import { stockItems, areStockItemsUpdating } from '../../../stores/stock';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Artikel auswählen';
    $navBalance = 'inline';

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }
</script>

<div class="has-text-centered mb-6">
    <StockList
        bind:stockItems={$stockItems}
        bind:isLoading={$areStockItemsUpdating}
        isClickable={true}
        on:select={itemSelected}
    />
</div>

<hr />

<div class="has-text-centered">
    <Button text="Zum Warenkorb" class="button is-link" href="/shopping/cart" size="full-width" />
</div>
