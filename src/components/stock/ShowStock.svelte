<script>
    import { onMount } from 'svelte';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../common/Modal.svelte';
    import StockList from './StockList.svelte';
    
    let stock = {
        stockItems: [],
    };

    let modalIsOpen = false;
    let stockItemIdToRemove;

    onMount(() => {
        stock = new Stock();
    });
    
    function confirmRemoveItem(event) {
        modalIsOpen = true;
        stockItemIdToRemove = event.detail.id;
    }

    function removeItem() {
        stock.removeItem(stockItemIdToRemove);
        stock = stock; // tell svelte to update the view
        modalIsOpen = false;
    }

    function closeModal() {
        modalIsOpen = false;
    }
</script>

<Modal title="Artikel löschen?" bind:open={modalIsOpen}>
    <div slot="body">
        <span>Willst Du den Artikel wirklich unwiederrulich löschen?</span>
    </div>
    <div slot="footer">
        <button class="button is-danger" on:click={removeItem}>Löschen</button>
        <button class="button is-primary" on:click={closeModal}>Abbrechen</button>
    </div>
</Modal>

<div class="has-text-centered">
    {#if stock.stockItems.length > 0}
        <StockList bind:stockItems={stock.stockItems} on:remove={confirmRemoveItem} allowRemoval={true} />
    {:else}
        <p>Der Bestand ist leer.</p>
    {/if}
    <a href="stock/fill" class="button is-primary mt-6">Bestand hinzufügen</a>
</div>
