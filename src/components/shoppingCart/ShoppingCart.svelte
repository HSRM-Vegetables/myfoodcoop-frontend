<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import { mdiDelete } from '@mdi/js';
    import { UnitType } from '../../scripts/UnitType';
    import ShoppingCart from '../../scripts/shoppingCart/ShoppingCart';
    import ShowBalance from '../balance/ShowBalance.svelte';
    import { currentShoppingCartItem } from '../../stores/priceCalculator';
    import Icon from '../common/Icon.svelte';

    // Stub item because onMount is called after the first render
    let cart = {
        cartItems: [],
        totalPrice: () => 0,
    };
    let currentBalance = 0.0;

    onMount(() => {
        cart = new ShoppingCart();
    });

    // to remove
    function addSample() {
        cart.addItem('kartoffeln', UnitType.KILO, '5', '15');
        cart.addItem('kürbis', UnitType.PIECE, '5,12', '3'); 
        cart = cart; // tell svelte to update view
    }
    
    function removeItem(name) {
        cart.removeItem(name);
        cart = cart; // tell svelte to update view
    }
    
    function checkout() {
        cart.clear();
        cart = cart; // tell svelte to update view
        goto('/');
    }
    
    function goToPriceCalculator(shoppingCartItem) {
        // var will be used in another file
        /* eslint-disable no-unused-vars */
        $currentShoppingCartItem = shoppingCartItem;
        goto('/price-calculator');
    }
</script>

<style>
    .clickable {
        cursor: pointer;
    }
</style>

<div class="has-text-centered">
    <h1 class="mb-4">Warenkorb</h1>

    <ShowBalance bind:currentBalance />

    <!-- to remove:-->
    <button on:click={addSample}>Sample hinzufügen</button>

    <hr>

    {#if cart.cartItems.length > 0}
        <table class="table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th></th>
                    <th>Artikel</th>
                    <th>Menge</th>
                    <th>Preis</th>
                </tr>
            </thead>
            <tbody>
                {#each cart.cartItems as item}
                    <tr>
                        <td>
                            <button class="button is-white" on:click={() => removeItem(item.name)}>
                                <span class="icon">
                                    <Icon icon={mdiDelete}/>
                                </span>
                            </button>
                        </td>
                        <td class="clickable" on:click="{() => goToPriceCalculator(item)}">
                            <span class="item-name">{item.name}</span><br>
                            {#if item.unitType === UnitType.PIECE }
                                <span class="is-size-7">{item.unitPrice} € / Stück</span> 
                            {:else}
                                <span class="is-size-7">{item.unitPrice} € / kg</span>
                            {/if}
                        </td>
                        <td class="clickable" on:click="{() => goToPriceCalculator(item)}">{item.quantity}</td>
                        <td class="clickable" on:click="{() => goToPriceCalculator(item)}">{item.unitPrice * item.quantity} €</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>Der Warenkorb ist leer.</p>
    {/if}
    
    <button class="button is-primary mt-6" on:click={() => goto('price-calculator')}>Artikel hinzufügen</button>

    <hr>

    <p class="is-size-4">Gesamtpreis: {cart.totalPrice()} €</p>
    <p class="is-size-7 mt-3">Guthaben nach Kauf: {cart && cart.totalPrice() ? currentBalance - cart.totalPrice() : currentBalance} €</p>

    {#if cart.cartItems.length > 0}
        <button class="button is-primary mt-5" type="submit" on:click={checkout}>Kaufen</button>
    {/if}
</div>