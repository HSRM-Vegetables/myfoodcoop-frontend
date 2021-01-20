<script>
    import { mdiDelete, mdiPencil } from '@mdi/js';
    import { goto } from '@sapper/app';
    import { createEventDispatcher } from 'svelte';
    import Icon from '../common/Icon.svelte';
    import { currentShoppingItemQuantity } from '../../stores/priceCalculator';
    import { UnitType } from '../../scripts/UnitType';
    import { moneyStyler, stopPropagation } from '../../scripts/Helper';

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

    function removeItem(event, itemId) {
        stopPropagation(event);

        // Dispatch the remove event to the parent component to remove the item from cart
        removeItemEvent('remove', {
            id: itemId,
        });
    }

    function goToPriceCalculator(shoppingCartItem) {
        if (allowVisitPriceCalculator) {
            // var will be used in another file
            /* eslint-disable no-unused-vars */
            $currentShoppingItemQuantity = shoppingCartItem.quantity;
            goto(`/shopping/stock/${shoppingCartItem.stockItem.id}`);
        }
    }
</script>

<style>
    .clickable {
        cursor: pointer;
    }

    .shoppingElement {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        color: #000;
        display: block;
        padding: 1.25rem;
        margin-top: 20px;
    }

    .breakwords {
        word-break: break-all;
    }
</style>

{#each cartItems as item}
    <div class="shoppingElement" class:clickable={allowVisitPriceCalculator} on:click={() => goToPriceCalculator(item)}>
        <div class="columns is-mobile">
            <div class="column has-text-left has-text-weight-bold">
                <span class="breakwords">{item.stockItem.name}</span>
            </div>
            {#if allowRemoval}
                <div class="column has-text-right">
                    <button class="button is-white" on:click={(event) => removeItem(event, item.stockItem.id)}>
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
                {#if item.stockItem.unitType === UnitType.PIECE}
                    <span>{moneyStyler(item.stockItem.pricePerUnit)} € / Stück</span>
                {:else}<span>{moneyStyler(item.stockItem.pricePerUnit)} € / kg</span>{/if}
            </div>

            <div class="column has-text-right">
                {#if item.stockItem.unitType === UnitType.PIECE}
                    <span>{item.quantity} Stück</span>
                {:else}<span>{item.quantity} kg</span>{/if}
            </div>

            <div class="column has-text-right pr-5">{moneyStyler(item.stockItem.pricePerUnit * item.quantity)} €</div>
        </div>
    </div>
{/each}
