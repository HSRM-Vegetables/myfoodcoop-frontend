<script>
    import { UnitType } from '../../scripts/UnitType';

    /**
     * A list of items sold in a time window (quantity-sold-list response)
     */
    export let soldItems;
</script>

{#if soldItems !== undefined}
    <div class="columns is-mobile">
        <div class="column has-text-weight-bold">
            Artikelname
        </div>
        <div class="column has-text-weight-bold">
            verkaufte Menge
        </div>
    </div>
    {#each soldItems.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) as item}
        <div class="columns is-mobile">
            <div class="column">
                {item.name}
            </div>
            <div class="column">
                {item.quantitySold} {item.unitType === UnitType.PIECE ? 'Stück' : 'kg'}
            </div>
        </div>
    {/each}
{/if}