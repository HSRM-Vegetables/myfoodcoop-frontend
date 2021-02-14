<script>
    import { mdiEye, mdiLeaf } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { moneyStyler, stopPropagation } from '../../scripts/common/Helper';
    import { UnitType } from '../../scripts/stock/UnitType';
    import Icon from '../common/Icon.svelte';
    import { CertificateLogos } from '../../scripts/stock/CertificateLogos';
    import ListItem from '../common/ListItem.svelte';
    import Loader from '../common/Loader.svelte';
    import NoData from '../common/NoData.svelte';
    import Pagination from '../pagination/Pagination.svelte';

    /**
     * An Array of StockItems to be displayed
     */
    export let stockItems;

    /**
     * Defines if the cursor should switch to pointer
     * Default: false
     */
    export let isClickable = false;

    /**
     * Displays a button, which allows to delete items
     */
    export let allowDetails = false;

    /**
     * Display a loading spinner instead of the list
     */
    export let isLoading = false;

    /**
     * Defines if the items should be highlighted
     * Default: false
     */
    export let highlight = false;

    const selectEvent = createEventDispatcher();

    function selectItem(event, itemId) {
        stopPropagation(event);
        selectEvent('select', {
            id: itemId,
        });
    }

    function selectItemByDetail(event, itemdID) {
        stopPropagation(event);
        selectEvent('details', {
            id: itemdID,
        });
    }

    let currentPageIndex = 0;
    const pageSize = 5;
    let pageCount = Math.ceil(stockItems.length / pageSize);

    let offset = currentPageIndex * pageSize;
    let limit = pageSize;

    /**
     * Update the pagination details provided by the pagination component
     */
    function updatePaginationDetails(event) {
        currentPageIndex = event.detail.newPageIndex;

        // Calc offset and limit pagination params from current page index and page size
        offset = currentPageIndex * pageSize;
        limit = pageSize;
    }
</script>

<style>
    .has-text-right span {
        float: right;
    }
    img.cert-img {
        max-height: 25px;
        float: right;
    }
    .logo-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
</style>

{#if isLoading}
    <Loader bind:isLoading />
{:else if stockItems && stockItems.length > 0}
    {#each stockItems.slice(offset, offset + limit) as item}
        <ListItem isClickable={isClickable} highlight={highlight} on:click={(event) => selectItem(event, item.id)}>
            <!--First column with item name, buttons, stock quantity and price -->
            <div class="columns m-0 is-mobile">
                {#if allowDetails}
                    <div class="column is-narrow has-text-left">
                        <button class="button is-white" on:click={(event) => selectItemByDetail(event, item.id)}>
                            <span class="icon">
                                <Icon icon={mdiEye} />
                            </span>
                        </button>
                    </div>
                {/if}
                <div class="column has-text-left ">
                    <span class="has-text-weight-bold break-all">{item.name}</span><br />
                    {#if item.unitType === UnitType.PIECE}
                        <span class="is-size-7 is-hidden-desktop">{moneyStyler(item.pricePerUnit)} € / Stück</span>
                    {:else}<span class="is-size-7 is-hidden-desktop">{moneyStyler(item.pricePerUnit)} € / kg</span>{/if}
                </div>
                <div class="column is-one-quarter has-text-right">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{item.quantity} Stück vorhanden</span>
                    {:else}<span>{item.quantity} kg vorhanden</span>{/if}
                </div>
                <div class="column has-text-right is-hidden-touch">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{moneyStyler(item.pricePerUnit)} € / Stück</span>
                    {:else}<span>{moneyStyler(item.pricePerUnit)} € / kg</span>{/if}
                </div>
            </div>
            <div class="logo-container">
                {#if item.sustainablyProduced}
                    <div class="has-text-right">
                        <Icon icon={mdiLeaf} small={true} green={true} />
                    </div>
                {/if}
                <!-- Show column only if array contains a certificate from CertificateLogos -->
                {#if item.certificates.some((r) => CertificateLogos.map((l) => l.name).includes(r))}
                    {#each CertificateLogos as logo}
                        {#if item.certificates.includes(logo.name)}
                            <img class="cert-img" src={logo.imageMini} alt="{logo.name}_Logo" />
                        {/if}
                    {/each}
                {/if}
            </div>
        </ListItem>
    {/each}

    <Pagination currentPageIndex={currentPageIndex} pageCount={pageCount} on:update={updatePaginationDetails} />
    
{:else}
    <NoData text="Der Bestand ist leer" />
{/if}
