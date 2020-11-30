<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import ShoppingCart from '../../scripts/ShoppingCart';


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

    <button on:click={addSample}>Sample hinzufügen</button>

    <p>Artikel | Typ | Preis / Typ | Anzahl | Preis</p>
    {#each cartItems as item}
        <p><button on:click={() => removeItem(item.name)}>Delete</button> {item.name} | {item.unitType} | {item.unitPrice} € | {item.quantity} | {item.unitPrice * item.quantity} € </p>
    {/each}

    Gesamtpreis: {totalPrice} €

    {#if totalPrice > 0.0}
        <button type="submit" on:click={checkout}>Kaufen</button>
    {/if}
</div>