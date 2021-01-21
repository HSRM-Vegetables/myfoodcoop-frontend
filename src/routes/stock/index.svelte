<script>
    import { goto } from '@sapper/app';
    import StockList from '../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { stockItems, areStockItemsUpdating } from '../../stores/stock';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';
    $navBalance = 'hidden';

    function onSelectItem(event) {
        goto(`/stock/item/${event.detail.id}`);
    }
</script>

<div class="has-text-centered">
    <StockList
        bind:stockItems={$stockItems}
        bind:isLoading={$areStockItemsUpdating}
        allowDetails={true}
        on:select={onSelectItem}
        isClickable={true}
    />
    <Button text="Bestand hinzufügen" class="button is-primary mt-6" href="/stock/item/new" size="full-width" />
</div>

<hr />

<div class="has-text-centered">
    <Button goHome={true} size="full-width" />
</div>
