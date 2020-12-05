<script>
    import { mdiDelete } from '@mdi/js';
    import { goto } from '@sapper/app';
    import { createEventDispatcher } from 'svelte';
    import Icon from '../common/Icon.svelte';
    import { currentShoppingCartItem } from '../../stores/priceCalculator';
    import { UnitType } from '../../scripts/UnitType';
    
    /**
     * An Array of ShoppingCartItems to be displayed
     */
    export let cartItems;

    /**
     * Allow ShoppingCartItems to be removed from the cart by the user
     */
    export let allowRemoval = true;

    /**
     * Allows the user to click on a row to open it in the price calculator
     */
    export let allowVisitPriceCalculator = true;

    const removeItemEvent = createEventDispatcher();

    function removeItem(itemName) {
        // Dispatch the remove event to the parent component to remove the item from cart
        removeItemEvent('remove', {
            name: itemName
        });
    }

    function goToPriceCalculator(shoppingCartItem) {
        if (allowVisitPriceCalculator) {
            // var will be used in another file
            /* eslint-disable no-unused-vars */
            $currentShoppingCartItem = shoppingCartItem;
            goto('/price-calculator');
        }
    }
</script>

<style>
    .clickable {
        cursor: pointer;
    }
</style>

<table class="table is-fullwidth is-hoverable">
    <thead>
        <tr>
            {#if allowRemoval}
                <th></th>
            {/if}
            <th>Artikel</th>
            <th>Menge</th>
            <th>Preis</th>
        </tr>
    </thead>
    <tbody>
        {#each cartItems as item}
            <tr>
                {#if allowRemoval}
                    <td>
                        <button class="button is-white" on:click={() => removeItem(item.name)}>
                            <span class="icon">
                                <Icon icon={mdiDelete}/>
                            </span>
                        </button>
                    </td>
                {/if}
                <td class:clickable={allowVisitPriceCalculator} on:click="{() => goToPriceCalculator(item)}">
                    <span class="item-name">{item.name}</span><br>
                    {#if item.unitType === UnitType.PIECE }
                        <span class="is-size-7">{item.unitPrice} € / Stück</span> 
                    {:else}
                        <span class="is-size-7">{item.unitPrice} € / kg</span>
                    {/if}
                </td>
                <td class:clickable={allowVisitPriceCalculator} on:click="{() => goToPriceCalculator(item)}">
                    {#if item.unitType === UnitType.PIECE }
                        <span>{item.quantity} Stück</span> 
                    {:else}
                        <span>{item.quantity} kg</span>
                    {/if}
                </td>
                <td class:clickable={allowVisitPriceCalculator} on:click="{() => goToPriceCalculator(item)}">{(item.unitPrice * item.quantity).toFixed(2)} €</td>
            </tr>
        {/each}
    </tbody>
</table>