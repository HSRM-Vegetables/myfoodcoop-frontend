<script>
    import { UnitType } from '../../scripts/UnitType';

    export let cartItems;
    let id;
    let test = [];
    let value = 2;
    let i = -1;
    

    function dell(index) {
        console.log(index);
        cartItems = cartItems.filter(element => cartItems.indexOf(element) != index);
        console.log(cartItems);  
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
    <div class="column is-half has-text-left">Artikel</div>
    <div class="column is-one-quarter has-text-right">Menge</div>
    <div class="column is-one-quarter has-text-right">Preis</div>
</div>

{#each cartItems as item}
    <hr />
    <div class="columns">
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
        <div>
            <button on:click ={() => dell(cartItems.indexOf(item))} class="button is-danger">Delete</button>
        </div>
     
    </div>
{/each}
