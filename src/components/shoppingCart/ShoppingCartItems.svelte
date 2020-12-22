<script>
    import { mdiDelete, mdiPencil} from '@mdi/js';
    import { goto } from '@sapper/app';
    import { createEventDispatcher } from 'svelte';
    import Icon from '../common/Icon.svelte';
    import { currentShoppingItem, currentShoppingItemQuantity } from '../../stores/priceCalculator';
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
            name: itemName,
        });
    }

    function goToPriceCalculator(shoppingCartItem) {
        if (allowVisitPriceCalculator) {
            // var will be used in another file
            /* eslint-disable no-unused-vars */
            $currentShoppingItem = shoppingCartItem.name;
            $currentShoppingItemQuantity = shoppingCartItem.quantity;
            goto('/shopping/price-calculator');
        }
    }
</script>

<style>
    .clickable {
        cursor: pointer;
    }
    .shoppingElement {
        border-bottom: solid 1px whitesmoke;
        padding: 15px 0px;
    }
    .breakwords{
        word-break: break-all;
    }
</style>
{#each cartItems as item}
    <div class="shoppingElement">
        <div class="columns is-mobile">
            <div class="column clickable has-text-left has-text-weight-bold" on:click={() => goToPriceCalculator(item)}>
                <span class="breakwords">{item.name}</span>
            </div>
            {#if allowRemoval}
                <div class="column has-text-right">
                    <button class="button is-white" on:click={() => removeItem(item.name)}>
                        <span class="icon">
                            <Icon icon={mdiDelete} />
                        </span>
                    </button>
                     <button class="button is-white" on:click={() => goToPriceCalculator(item)}>
                        <span class="icon">
                            <Icon icon={mdiPencil} />
                        </span>
                    </button>
                </div>
            {/if}
        </div> 
        <div class="columns is-mobile is-vcentered">
            <div class="column has-text-left">
                 {#if item.unitType === UnitType.PIECE}
                    <span>{item.unitPrice} € / Stück</span>
                {:else}<span>{item.unitPrice} € / kg</span>{/if}
            </div>
            <div class="column has-text-right clickable" on:click={() => goToPriceCalculator(item)}>
                {#if item.unitType === UnitType.PIECE}
                    <span>{item.quantity} Stück</span>
                {:else}<span>{item.quantity} kg</span>{/if}
            </div>
            <div class="column has-text-right clickable" on:click={() => goToPriceCalculator(item)}>
             {(item.unitPrice * item.quantity).toFixed(2)} €
            </div>
       
        </div>
    </div>
{/each}

