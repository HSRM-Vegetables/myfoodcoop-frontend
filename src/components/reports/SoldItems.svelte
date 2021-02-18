<script>
    import { createEventDispatcher } from 'svelte';
    import { UnitType } from '../../scripts/stock/UnitType';
    import { moneyStyler } from '../../scripts/common/Helper';

    /**
     * A list of items sold in a time window (quantity-sold-list response)
     */
    export let soldItems;

    const selectEvent = createEventDispatcher();
</script>

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
            <div class="column break-all has-text-left">{item.name}</div>
            <div class="column has-text-centered">
                {item.quantitySold}
                {item.unitType === UnitType.PIECE ? 'Stück' : 'kg'}
            </div>
            <div class="column has-text-centered is-hidden-touch">{Math.floor(item.vat * 100)} %</div>
            <div class="column has-text-centered is-hidden-touch">{moneyStyler(item.totalVat)} €</div>
            <div class="column has-text-right">{moneyStyler(item.grossAmount)} €</div>
        </div>
    {/each}
{/if}
