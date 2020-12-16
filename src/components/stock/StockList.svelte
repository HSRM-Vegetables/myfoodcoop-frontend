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
    export let onClick;
</script>

<style>
    .column.is-half.has-text-left {
        overflow-y: auto;
    }
    hr {
        margin: 0.5rem 0;
    }
</style>

{#if stockItems && stockItems.length > 0}

    <div class="columns is-hidden-mobile has-text-weight-bold">
        <div class="column is-half has-text-left">Artikel</div>
        <div class="column is-one-quarter has-text-right">Menge</div>
        <div class="column is-one-quarter has-text-right">Preis</div>
    </div>

    {#each stockItems as item}
        <hr />
        <!-- If the component is initalized without onClick, onClick is "undefined". 
            The expression !!undefined evaluates to false, thats why the class "is-clickable" is not applied. -->
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

{:else}
    <p>Der Bestand ist leer.</p>
{/if}

