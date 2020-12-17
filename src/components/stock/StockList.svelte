<script>
    import { mdiDelete } from '@mdi/js';
    import { onMount, createEventDispatcher } from 'svelte';
    import { UnitType } from '../../scripts/UnitType';
    import Icon from '../common/Icon.svelte';

    export let stockItems;
    export let allowRemoval = false;

    const removeEvent = createEventDispatcher();

    onMount(() => {});

    function removeItem(itemId) {
        removeEvent('remove', {
            id: itemId
        });
    }
</script>

<style>
    .column.is-half.has-text-left {
        overflow-y: auto;
    }
    hr {
        margin: 0.5rem 0;
    }
</style>

<div class="columns is-hidden-mobile has-text-weight-bold">
    {#if allowRemoval}
        <div class="column has-text-left" />
    {/if}
    <div class="column is-half has-text-left">Artikel</div>
    <div class="column has-text-right">Menge</div>
    <div class="column has-text-right">Preis</div>
</div>

{#each stockItems as item}
    <hr />
    <div class="columns">
        {#if allowRemoval}
            <div class="column has-text-center">
                <button
                    class="button is-white"
                    on:click={() => removeItem(item.id)}>
                    <span class="icon">
                        <Icon icon={mdiDelete} />
                    </span>
                </button>
            </div>
        {/if}
        <div class="column is-half has-text-left">{item.name}</div>
        <div class="column has-text-right">
            {#if item.unitType === UnitType.PIECE}
                <span>{item.quantity} Stück</span>
            {:else}<span>{item.quantity} kg</span>{/if}
        </div>
        <div class="column has-text-right">
            {#if item.unitType === UnitType.PIECE}
                <span>{item.unitPrice} € / Stück</span>
            {:else}<span>{item.unitPrice} € / kg</span>{/if}
        </div>
    </div>
{/each}
