<script>
    import { goto } from '@sapper/app';
    import { mdiShopping } from '@mdi/js';
    import StockList from '../../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Button from '../../../components/common/Button.svelte';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import { inStockItems, spoilsSoonItems } from '../../../stores/stock';
    import { getLocalizedStockStatus, StockStatus } from '../../../scripts/stock/StockStatus';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Artikel auswählen';
    $navBalance = 'inline';

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }

    function itemDetails(event) {
        goto(`/stock/item/${event.detail.id}?comesFrom=shopping`);
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    {#if $spoilsSoonItems && $spoilsSoonItems.length > 0}
        <div>{getLocalizedStockStatus(StockStatus.SPOILSSOON)}</div>
        <StockList
            stockItems={$spoilsSoonItems}
            allowDetails={true}
            on:details={itemDetails}
            on:select={itemSelected}
            isClickable={true}
            highlight={true}
        />
        <hr />
    {/if}

    {#if $inStockItems && $inStockItems.length > 0}
        <!-- items that are in stock -->
        <div>{getLocalizedStockStatus(StockStatus.INSTOCK)}</div>
        <StockList
            stockItems={$inStockItems}
            allowDetails={true}
            on:details={itemDetails}
            on:select={itemSelected}
            isClickable={true}
        />
        <hr />
    {/if}

    <div class="has-text-centered">
        <Button
            text="Zum Warenkorb"
            class="button is-link"
            href="/shopping/cart"
            size="full-width"
            icon={mdiShopping}
        />
    </div>
</AuthorizeByRoles>
