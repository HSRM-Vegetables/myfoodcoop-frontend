<script>
    import { createEventDispatcher } from 'svelte';
    import { UnitType } from '../../scripts/UnitType';

    /**
     * A list of items sold in a time window (quantity-sold-list response)
     */
    export let soldItems;

    const selectEvent = createEventDispatcher();
</script>

<style>
    .item_name {
        word-break: break-all;
    }
</style>

{#if soldItems !== undefined}
    <div class="columns is-mobile">
        <div class="column has-text-weight-bold">Artikelname</div>
        <div class="column has-text-weight-bold has-text-right">verkaufte Menge</div>
    </div>
    {#each soldItems.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)) as item}
        <div class="columns is-mobile is-clickable" on:click={selectEvent('select', { id: item.id })}>
            <div class="column is-three-quarters item_name">{item.name}</div>
            <div class="column has-text-right">
                {item.quantitySold}
                {item.unitType === UnitType.PIECE ? 'Stück' : 'kg'}
            </div>
        </div>
    {/each}
{/if}
