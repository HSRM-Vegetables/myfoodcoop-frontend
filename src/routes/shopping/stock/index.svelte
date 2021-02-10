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
    import NoData from '../../../components/common/NoData.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Artikel auswählen';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';

    $: {
        spoiledItemsToDisplay = $spoilsSoonItems;
        inStockItemsToDisplay = $inStockItems;
        checkForNoResults();
        search();
    }

    let searchTermElement;
    let spoiledItemsToDisplay = $spoilsSoonItems;
    let inStockItemsToDisplay = $inStockItems;
    let noResults = true;

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }

    function itemDetails(event) {
        goto(`/stock/item/${event.detail.id}?comesFrom=shopping`);
    }

    function updateStock() {
        stockItems.forceUpdate();
    }

    function checkForNoResults() {
        noResults =
        (!inStockItemsToDisplay && !spoiledItemsToDisplay) ||
        (inStockItemsToDisplay.length <= 0 && spoiledItemsToDisplay.length <= 0);
    }

    function search() {
        if (!searchTermElement) {
            spoiledItemsToDisplay = $spoilsSoonItems;
            inStockItemsToDisplay = $inStockItems;
            checkForNoResults();
            return;
        }

        const searchText = searchTermElement.getValue();

        if (!searchText) {
            spoiledItemsToDisplay = $spoilsSoonItems;
            inStockItemsToDisplay = $inStockItems;
            checkForNoResults();
            return;
        }
        
        const filterBySearchTerm = (s, item) => item.name.toLowerCase().includes(s.toLowerCase().trim());
        
        spoiledItemsToDisplay = $spoilsSoonItems.filter((item) => filterBySearchTerm(searchText, item));
        inStockItemsToDisplay = $inStockItems.filter((item) => filterBySearchTerm(searchText, item));
        checkForNoResults();
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <MobileReloadButton on:click={updateStock} />
    <TextField bind:this={searchTermElement} label="Suchen" placeholder="Suchen" on:input={search} />


    <!-- Items spoiling soon -->
    {#if spoiledItemsToDisplay && spoiledItemsToDisplay.length > 0}
        <div class="mt-6">{getLocalizedStockStatus(StockStatus.SPOILSSOON)}</div>
        <StockList
            stockItems={spoiledItemsToDisplay}
            allowDetails={true}
            on:details={itemDetails}
            on:select={itemSelected}
            isClickable={true}
            highlight
        />
        <hr />
    {/if}

    <!-- items that are in stock -->
    {#if inStockItemsToDisplay && inStockItemsToDisplay.length > 0}
        <div>{getLocalizedStockStatus(StockStatus.INSTOCK)}</div>
        <StockList
            stockItems={inStockItemsToDisplay}
            allowDetails={true}
            on:details={itemDetails}
            on:select={itemSelected}
            isClickable={true}
        />
        <hr />
    {/if}

    {#if noResults }
        <NoData text="Keine Artikel im Bestand gefunden" />
    {/if}


    <div class="has-text-centered">
        <Button
            text="Zum Warenkorb"
            class="button is-link mt-3 mb-3"
            href="/shopping/cart"
            size="full-width"
            icon={mdiShopping}
        />
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
