<script>
    import { mdiDelete, mdiPencil } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { stopPropagation } from '../../scripts/Helper';
    import { UnitType } from '../../scripts/UnitType';
    import Icon from '../common/Icon.svelte';

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
    export let allowRemoval = false;

    /**
     * Displays a button, which allows to edit items
     */
    export let allowEdit = false;
    const removeEvent = createEventDispatcher();
    const selectEvent = createEventDispatcher();

    function removeItem(event, itemId) {
        stopPropagation(event);
        removeEvent('remove', {
            id: itemId,
        });
    }

    function selectItem(event, itemId) {
        stopPropagation(event);
        selectEvent('select', {
            id: itemId,
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
    .shoppingElement {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        color: #000;
        display: block;
        padding: 1.25rem;
        margin-top: 20px;
    }

    .breakwords {
        word-break: break-all;
    }

    .is-clickable {
        cursor: pointer;
    }
</style>

{#if stockItems && stockItems.length > 0}
    {#each stockItems as item}
        <div class="shoppingElement" class:is-clickable={isClickable} on:click={(event) => selectItem(event, item.id)}>
            <!--First column with item name, buttons, stock quantity and price -->
            <div class="columns is-mobile">
                {#if allowRemoval || allowEdit}
                    <div class="column has-text-left">
                        {#if allowRemoval}
                            <button class="button is-white" on:click={(event) => removeItem(event, item.id)}>
                                <span class="icon">
                                    <Icon icon={mdiDelete} />
                                </span>
                            </button>
                        {/if}

                        {#if allowEdit}
                            <button class="button is-white" on:click={(event) => selectItem(event, item.id)}>
                                <span class="icon">
                                    <Icon icon={mdiPencil} />
                                </span>
                            </button>
                        {/if}
                    </div>
                {/if}
                <div class="column is-half has-text-left ">
                    <span class="has-text-weight-bold breakwords">{item.name}</span><br />
                    {#if item.unitType === UnitType.PIECE}
                        <span class="is-size-7 is-hidden-desktop">{item.pricePerUnit} € / Stück</span>
                    {:else}<span class="is-size-7 is-hidden-desktop">{item.pricePerUnit} € / kg</span>{/if}
                </div>
                <div class="column has-text-right">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{item.quantity} Stück vorhanden</span>
                    {:else}<span>{item.quantity} kg vorhanden</span>{/if}
                </div>
                <div class="column has-text-right is-hidden-touch">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{item.pricePerUnit} € / Stück</span>
                    {:else}<span>{item.pricePerUnit} € / kg</span>{/if}
                </div>
            </div>

            <!-- Second column with item description -->
            {#if item.description}
                <div>
                    <div class="column has-text-justified">{displayDescription(item)}</div>
                </div>
            {/if}
        </div>
    {/each}
{:else}
    <p>Der Bestand ist leer.</p>
{/if}
