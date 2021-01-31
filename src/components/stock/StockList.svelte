<script>
    import { mdiEye } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { moneyStyler, stopPropagation } from '../../scripts/common/Helper';
    import { UnitType } from '../../scripts/stock/UnitType';
    import Icon from '../common/Icon.svelte';
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
     * Display a loading spinner instead of the list
     */
    export let isLoading = false;

    /**
     * Display Description on cart
     */
    export let showDescription = true;

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

    function displayDescription(item) {
        if (!item || !item.description) {
            return '';
        }

        if (item.description.length > 200) {
            return `${item.description.substring(0, 200)}...`;
        }

        return item.description;
    }
</script>

<style>
    .breakwords {
        word-break: break-all;
    }

    .has-text-right span {
        float: right;
    }
</style>

{#if isLoading}
    <Loader bind:isLoading />
{:else if stockItems && stockItems.length > 0}
    {#each stockItems as item}
        <ListItem isClickable={isClickable} highlight={highlight} on:click={(event) => selectItem(event, item.id)}>
            <!--First column with item name, buttons, stock quantity and price -->
            <div class="columns is-mobile">
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
                    <span class="has-text-weight-bold breakwords">{item.name}</span><br />
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

            <!-- Second column with item description -->
            {#if item.description && showDescription}
                <div>
                    <div class="column has-text-justified">{displayDescription(item)}</div>
                </div>
            {/if}
        </ListItem>
    {/each}
{:else}
    <NoData text="Der Bestand ist leer" />
{/if}
