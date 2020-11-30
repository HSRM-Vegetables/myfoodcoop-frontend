<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import ShoppingCart from '../../scripts/ShoppingCart';
    import ShowBalance from '../balance/ShowBalance.svelte';

    import Icon from '../common/Icon.svelte';
    import { mdiDelete } from '@mdi/js';

    let cart;
    let cartItems = [];
    let totalPrice = 0.0;
    let currentBalance = 0.0;

    onMount(() => {
        cart = new ShoppingCart();
        cartItems = cart.items;
        totalPrice = cart.totalPrice();
    });

    // to remove
    function addSample() {
        cart.addItem('kartoffeln', 'kg', '5', '15');
        cart.addItem('kürbis', 'piece', '5,12', '3');
        cartItems = cart.items;
        totalPrice = cart.totalPrice();        
    }
    
    function removeItem(name) {
        cart.removeItem(name);
        cartItems = cart.items;
        totalPrice = cart.totalPrice();
    }
    
    function checkout() {
        cart.clear();
        goto('/');
    }
    
</script>

<div class="has-text-centered">
    <h1>Warenkorb</h1>
    <br>
    <ShowBalance bind:currentBalance/>
    <br>

    <!-- to remove:-->
    <button on:click={addSample}>Sample hinzufügen</button>

    <br>
    <hr>

    {#if totalPrice > 0.0}
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th></th>
                    <th>Artikel</th>
                    <th>Menge</th>
                    <th>Preis</th>
                </tr>
            </thead>
            <tbody>
                {#each cartItems as item}
                    <tr>
                        <td><button class="button is-white" on:click={() => removeItem(item.name)}><span class="icon"><Icon icon={mdiDelete}/></span></button></td>
                        <td>
                            {item.name}<br>
                            <span class="is-size-7">{item.unitPrice} / {item.unitType}</span>
                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.unitPrice * item.quantity} €</td>
                    </tr>
            {/each}
            </tbody>
        </table>
    {:else}
        <p>Der Warenkorb ist leer.</p>
    {/if}
    
    <br>
    <button class="button is-link" on:click={() => goto('price-calculator')}>Artikel hinzufügen</button>
    <br>
    <br>

    <hr>
    <p class="is-size-4">Gesamtpreis: {totalPrice} €</p>
    <p class="is-size-7 mt-3">Guthaben nach Kauf: {currentBalance - totalPrice} €</p>

    {#if totalPrice > 0.0}
        <button class="button is-link mt-5" type="submit" on:click={checkout}>Kaufen</button>
    {/if}

</div>