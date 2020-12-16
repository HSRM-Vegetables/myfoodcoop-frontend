<script>
    import { UnitType } from '../../scripts/UnitType';

    /**
     * An Array of StockItems to be displayed
     */
    export let stockItems;

    /**
     * Event Handler, triggerd by click on an item
     * The item is passed as paramter
     */
    export let onClick = undefined;

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
    <div class="column is-half has-text-left">Artikel</div>
    <div class="column is-one-quarter has-text-right">Menge</div>
    <div class="column is-one-quarter has-text-right">Preis</div>
</div>

{#each stockItems as item}
    <hr />
    <div class="columns" class:is-clickable="{!!onClick}" on:click="{() => !!onClick && onClick(item)}">
        <div class="column is-half has-text-left">{item.name}</div>
        <div class="column is-one-quarter has-text-right">
            {#if item.unitType === UnitType.PIECE}
                <span>{item.quantity} Stück</span>
            {:else}
                <span>{item.quantity} kg</span>
            {/if}
        </div>
        <div class="column is-one-quarter has-text-right">
            {#if item.unitType === UnitType.PIECE}
                <span>{item.unitPrice} € / Stück</span>
            {:else}
                <span>{item.unitPrice} € / kg</span>
            {/if}
        </div>
    </div>
{/each}
