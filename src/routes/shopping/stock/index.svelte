<script>
    import { goto } from '@sapper/app';
    import { mdiShopping } from '@mdi/js';
    import StockList from '../../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Button from '../../../components/common/Button.svelte';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import { inStockItems, spoilsSoonItems, stockItems } from '../../../stores/stock';
    import { getLocalizedStockStatus, StockStatus } from '../../../scripts/stock/StockStatus';
    import MobileReloadButton from '../../../components/common/MobileReloadButton.svelte';
    import TextField from '../../../components/common/TextField.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Artikel auswählen';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }

    function itemDetails(event) {
        goto(`/stock/item/${event.detail.id}?comesFrom=shopping`);
    }

    function updateStock() {
        stockItems.forceUpdate();
    }
    let searchTermElement;
    let searchResults;
    let searchText;
    function search() {
        searchText = searchTermElement.getValue();
        const newStock = $inStockItems.concat($spoilsSoonItems);
        searchResults = newStock.filter((i) =>
            i.name.toLocaleUpperCase().includes(searchTermElement.getValue().toLocaleUpperCase())
        );
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <MobileReloadButton on:click={updateStock} />
    <TextField bind:this={searchTermElement} label="Suchen" placeholder="Suchen" on:input={search} />
    {#if !searchText}
        {#if $spoilsSoonItems && $spoilsSoonItems.length > 0}
            <div class="mt-6">{getLocalizedStockStatus(StockStatus.SPOILSSOON)}</div>
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
    {:else}
        <StockList
            stockItems={searchResults}
            allowDetails={true}
            on:details={itemDetails}
            on:select={itemSelected}
            isClickable={true}
        />
    {/if}
    <div class="has-text-centered">
        <Button
            text="Zum Warenkorb"
            class="button is-link mt-3"
            href="/shopping/cart"
            size="full-width"
            icon={mdiShopping}
        />
    </div>
</AuthorizeByRoles>
