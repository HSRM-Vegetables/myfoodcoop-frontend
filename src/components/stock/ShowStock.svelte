<script>
    import { onMount } from 'svelte';
    import Swal from 'sweetalert2';
    import Stock from '../../scripts/stock/Stock';
    import StockList from './StockList.svelte';
    
    let stock = {
        stockItems: [],
    };

    onMount(() => {
        stock = new Stock();
    });
    
    function confirmRemoveItem(event) {
        Swal.fire({
            title: 'Artikel löschen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Löschen',
            cancelButtonText: 'Abbruch'
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(event.detail.id);
            }
        });
    }

    function removeItem(id) {
        stock.removeItem(id);
        stock = stock; // tell svelte to update the view
    }
</script>

<div class="has-text-centered">
    {#if stock.stockItems.length > 0}
        <StockList bind:stockItems={stock.stockItems} on:remove={confirmRemoveItem} allowRemoval={true} />
    {:else}
        <p>Der Bestand ist leer.</p>
    {/if}
    <a href="stock/fill" class="button is-primary mt-6">Bestand hinzufügen</a>
</div>
