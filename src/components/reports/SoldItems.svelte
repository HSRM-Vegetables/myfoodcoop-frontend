<script>
    import { UnitType } from '../../scripts/UnitType';

    /**
     * A list of items sold in a time window (quantity-sold-list response)
     */
    export let soldItems;
</script>

{#if soldItems !== undefined}
    <div class="columns is-mobile mt-6">
        <div class="column">
            Artikelname
        </div>
        <div class="column">
            verkaufte Menge
        </div>
    </div>
    {#each soldItems as item}
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