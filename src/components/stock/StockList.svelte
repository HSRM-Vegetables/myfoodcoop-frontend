<script>
    import { mdiDelete } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { UnitType } from '../../scripts/UnitType';
    import Icon from '../common/Icon.svelte';

    /**
     * An Array of StockItems to be displayed
     */
    export let stockItems;

    /**
     * Event Handler, triggerd by click on an item
     * The item is passed as paramter
     */
    export let onClick;

    export let allowRemoval = false;

    const removeEvent = createEventDispatcher();

    function removeItem(itemId) {
        removeEvent('remove', {
            id: itemId,
        });
    }
</script>

<style>
    .column.is-half.has-text-left {
        overflow-y: auto;
    }
    .shoppingElement {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        color: #000;
        display: block;
        padding: 1.25rem;
        margin-top: 20px;
        cursor: pointer;
    }
</style>

{#if stockItems && stockItems.length > 0}
    <div class="columns is-hidden-mobile has-text-weight-bold">
        {#if allowRemoval}
            <div class="column has-text-left" />
        {/if}
        <div class="column is-half has-text-left">Artikel</div>
        <div class="column has-text-right">Menge</div>
        <div class="column has-text-right">Preis</div>
    </div>

    {#each stockItems as item}
        <div class="shoppingElement">
            <!-- If the component is initalized without onClick, onClick is "undefined". 
                The expression !!undefined evaluates to false, thats why the class "is-clickable" is not applied. -->
            <div class="columns is-mobile" class:is-clickable={!!onClick} on:click={() => !!onClick && onClick(item)}>
                {#if allowRemoval}
                    <div class="column has-text-left">
                        <button class="button is-white" on:click={() => removeItem(item.id)}>
                            <span class="icon">
                                <Icon icon={mdiDelete} />
                            </span>
                        </button>
                    </div>
                {/if}
                <div class="column is-half has-text-left ">
                    <span class="has-text-weight-bold">{item.name}</span><br />
                    {#if item.unitType === UnitType.PIECE}
                        <span class="is-size-7 is-hidden-desktop">{item.unitPrice} € / Stück</span>
                    {:else}<span class="is-size-7 is-hidden-desktop">{item.unitPrice} € / kg</span>{/if}
                    
                </div>
                <div class="column has-text-right">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{item.quantity} Stück</span>
                    {:else}<span>{item.quantity} kg</span>{/if}
                </div>
                <div class="column has-text-right is-hidden-touch">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{item.unitPrice} € / Stück</span>
                    {:else}<span>{item.unitPrice} € / kg</span>{/if}
                </div>
            </div>
            <div class="columns" on:click={() => !!onClick && onClick(item)}>
                <div class="column has-text-justified">
                    {item.description.substring(0, 200)} + '...'}
                </div>
            </div>
        </div>
    {/each}
{:else}
    <p>Der Bestand ist leer.</p>
{/if}
