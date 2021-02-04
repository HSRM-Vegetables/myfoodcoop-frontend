<script>
    import { createEventDispatcher } from 'svelte';
    import { UnitType } from '../../scripts/stock/UnitType';

    /**
     * A list of items sold in a time window (quantity-sold-list response)
     */
    export let soldItems;

    const selectEvent = createEventDispatcher();
</script>

<style>
    .item-name {
        word-break: break-all;
    }
</style>

{#if soldItems !== undefined}
    <div class="columns is-mobile">
        <div class="column has-text-weight-bold has-text-left">Artikelname</div>
        <div class="column has-text-weight-bold has-text-centered">verkaufte Menge</div>
        <div class="column has-text-weight-bold has-text-centered is-hidden-touch">MwSt. Satz</div>
        <div class="column has-text-weight-bold has-text-centered is-hidden-touch">Steuern</div>
        <div class="column has-text-weight-bold has-text-right">Brutto</div>
    </div>
    {#each soldItems.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)) as item}
        <div class="columns is-mobile is-clickable" on:click={selectEvent('select', { id: item.id })}>
            <div class="column item-name has-text-left">{item.name}</div>
            <div class="column has-text-centered">
                {item.quantitySold}
                {item.unitType === UnitType.PIECE ? 'Stück' : 'kg'}
            </div>
            <div class="column has-text-centered is-hidden-touch">{item.vat}%</div>
            <div class="column has-text-centered is-hidden-touch">{item.totalVat}€</div>
            <div class="column has-text-right">{item.grossAmount}€</div>
        </div>
    {/each}
{/if}
