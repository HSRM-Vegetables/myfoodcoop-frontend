<script>
    import { goto } from '@sapper/app';
    import { mdiPlusBoxMultiple } from '@mdi/js';
    import StockList from '../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { inStockItems, orderedItems, outOfStockItems, spoilsSoonItems } from '../../stores/stock';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import { StockStatus, getLocalizedStockStatus } from '../../scripts/stock/StockStatus';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';
    $navBalance = 'hidden';

    function onSelectItem(event) {
        goto(`/stock/item/${event.detail.id}`);
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    {#if $spoilsSoonItems && $spoilsSoonItems.length > 0}
        <div>{getLocalizedStockStatus(StockStatus.SPOILSSOON)}</div>
        <StockList
            stockItems={$spoilsSoonItems}
            allowDetails={true}
            on:details={onSelectItem}
            on:select={onSelectItem}
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
            on:details={onSelectItem}
            on:select={onSelectItem}
            isClickable={true}
        />
        <hr />
    {/if}

    <AuthorizeByRoles allowedRoles={[Roles.ORDERER]} displayPermissionNotAllowed={false}>
        {#if $orderedItems && $orderedItems.length > 0}
            <!-- items that are ordered -->
            <div>{getLocalizedStockStatus(StockStatus.ORDERED)}</div>
            <StockList
                stockItems={$orderedItems}
                allowDetails={true}
                on:details={onSelectItem}
                on:select={onSelectItem}
                isClickable={true}
            />
            <hr />
        {/if}

        {#if $outOfStockItems && $outOfStockItems.length > 0}
            <!-- items that are out of stock -->
            <div>{getLocalizedStockStatus(StockStatus.OUTOFSTOCK)}</div>
            <StockList
                stockItems={$outOfStockItems}
                allowDetails={true}
                on:details={onSelectItem}
                on:select={onSelectItem}
                isClickable={true}
            />
        {/if}

        <div class="has-text-centered">
            <Button
                text="Bestand hinzufügen"
                class="button is-primary mt-6"
                href="/stock/item/new"
                size="full-width"
                icon={mdiPlusBoxMultiple}
            />
        </div>
    </AuthorizeByRoles>

    <hr />

    <div class="has-text-centered">
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
