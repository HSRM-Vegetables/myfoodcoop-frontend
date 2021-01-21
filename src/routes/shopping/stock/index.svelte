<script>
    import { goto } from '@sapper/app';
    import StockList from '../../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Button from '../../../components/common/Button.svelte';
    import { stockItems, areStockItemsUpdating } from '../../../stores/stock';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';
    $navBalance = 'inline';

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }

    function itemDetails(event) {
        goto(`/stock/item/${event.detail.id}?comesFrom=shopping`);
    }
</script>

<div class="has-text-centered mb-6">
    <StockList
        bind:stockItems={$stockItems}
        bind:isLoading={$areStockItemsUpdating}
        allowDetails={true}
        on:details={itemDetails}
        isClickable={true}
        on:select={itemSelected}
    />
</div>

<hr />

<div class="has-text-centered">
    <Button text="Zum Warenkorb" class="button is-link" href="/shopping/cart" size="full-width" />
</div>
