<script>
    import { onMount } from 'svelte';
    import ShoppingCart from '../../scripts/ShoppingCart';


    let cart;
    let cartItems = [];

    onMount(() => {
        cart = new ShoppingCart();
        cartItems = cart.items;
    });

    function addSample() {
        cart.addSampleData();
        cartItems = cart.items;
    }
    
    function removeItem(name) {
        cart.removeItem(name);
        cartItems = cart.items;
    }    
    
</script>


<div>
    <h1>Warenkorb</h1>

    <button on:click={addSample}>Sample hinzufügen</button>

    <p>Artikel | Typ | Preis / Typ | Anzahl | Gesamtpreis</p>
    {#each cartItems as item}
        <p><button on:click={() => removeItem(item.name)}>Delete</button> {item.name} | {item.unitType} | {item.unitPrice} € | {item.quantity} | {item.unitPrice * item.quantity} € </p>
    {/each}
</div>