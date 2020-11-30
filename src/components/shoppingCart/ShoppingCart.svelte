<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import ShoppingCart from '../../scripts/ShoppingCart';
    import ShowBalance from '../balance/ShowBalance.svelte';


    let cart;
    let cartItems = [];
    let totalPrice = 0.0;

    onMount(() => {
        cart = new ShoppingCart();
        cartItems = cart.items;
        totalPrice = cart.totalPrice();
    });

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


<div>
    <h1>Warenkorb</h1>
    <br>
    <ShowBalance/>
    <br>

    <button on:click={addSample}>Sample hinzufügen</button>

    <br>

    {#if totalPrice > 0.0}
        <table class="table">
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
                        <td><button on:click={() => removeItem(item.name)}>Delete</button></td>
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
    <button on:click={() => goto('price-calculator')}>Artikel hinzufügen</button>
    <br>
    <br>

    <hr>
    <p>Gesamtpreis: {totalPrice} €</p>

    {#if totalPrice > 0.0}
        <button type="submit" on:click={checkout}>Kaufen</button>
    {/if}
</div>