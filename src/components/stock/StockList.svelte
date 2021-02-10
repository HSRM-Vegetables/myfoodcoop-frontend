<script>
    import { mdiEye, mdiLeaf } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { moneyStyler, stopPropagation } from '../../scripts/common/Helper';
    import { UnitType } from '../../scripts/stock/UnitType';
    import { StockStatus } from '../../scripts/stock/StockStatus';
    import Icon from '../common/Icon.svelte';
    import { CertificateLogos } from '../../scripts/stock/CertificateLogos';
    import ListItem from '../common/ListItem.svelte';
    import Loader from '../common/Loader.svelte';
    import NoData from '../common/NoData.svelte';

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
     * Show limited stock
     */
    export let limit = 9999;

    /**
     * Display a loading spinner instead of the list
     */
    export let isLoading = false;

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
    .color-main {
        color: #375a7f;
    }
</style>

{#if isLoading}
    <Loader bind:isLoading />
{:else if stockItems && stockItems.length > 0}
    {#each stockItems as item, i}
        {#if limit >= i + 1}
            <ListItem
                isClickable={isClickable}
                highlight={item.stockStatus === StockStatus.SPOILSSOON}
                on:click={(event) => selectItem(event, item.id)}
            >
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
                        {:else}
                            <span class="is-size-7 is-hidden-desktop">{moneyStyler(item.pricePerUnit)} € / kg</span>
                        {/if}
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
                                <img class="cert-img" src={logo.image} alt="{logo.name}_Logo" />
                            {/if}
                        {/each}
                    {/if}
                </div>
            </ListItem>
        {/if}
        {#if parseFloat(limit) + 1 === i}
            <div class="has-text-right"><a class="color-main" href="/shopping/stock">Mehr anzeigen ...</a></div>
        {/if}
    {/each}
{:else}
    <NoData text="Der Bestand ist leer" />
{/if}
