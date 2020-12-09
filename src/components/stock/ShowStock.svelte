<script>
    import { onMount } from 'svelte';
    import Stock from '../../scripts/stock/Stock';
    import StockList from './StockList.svelte';
    
    let stock = {
        stockItems: [],
    };
    onMount(() => {
        stock = new Stock();
    });
</script>
<div class="has-text-centered">
    {#if stock.stockItems.length > 0}
    <StockList bind:cartItems={stock.stockItems}/>
    {:else}
    <p>Der Bestand ist leer.</p>
    {/if}
    <a href="stock/fill" class="button is-primary mt-6">Bestand hinzufügen</a>
</div>
