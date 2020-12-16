<script>
    import { UnitType } from '../../scripts/UnitType';
    import LocalStorageKeys from '../../scripts/LocalStorageKeys';
    import Icon from '../common/Icon.svelte';
    import { mdiDelete } from '@mdi/js';

    export let cartItems;
    export let allowRemoval = false;
 
    function removeListElement(id) {
        cartItems = cartItems.filter((item) => item.id !== id);
        localStorage.setItem(LocalStorageKeys.STOCK, JSON.stringify(cartItems));
        console.log(cart);
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
    <div class="column is-one-quarter has-text-right"><button class="button" on:click={() => allowRemoval = !allowRemoval}>
        <span class="icon">
            <Icon icon={mdiDelete}/>
        </span>
    </button></div>
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
        <div class="column is-one-quarter has-text-left">
        {#if allowRemoval}
            <button class="button is-white" on:click={() => removeListElement(item.id)}>
                <span class="icon">
                    <Icon icon={mdiDelete}/>
                </span>
            </button>
        {/if}
        </div>
     
    </div>
{/each}
