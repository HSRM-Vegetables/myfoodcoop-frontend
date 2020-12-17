<script>
    import { onMount } from 'svelte';
    import StockList from '../../components/stock/StockList.svelte';
    import { title } from '../../stores/page';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../../components/common/Modal.svelte';

    let stock = {
        stockItems: [],
    };

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';

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
        <span>Willst Du den Artikel wirklich unwiderruflich löschen?</span>
    </div>
    <div slot="footer">
        <button class="button is-danger" on:click={removeItem}>Löschen</button>
        <button class="button is-primary" on:click={closeModal}>Abbrechen</button>
    </div>
</Modal>

<div class="has-text-centered">
    <StockList bind:stockItems={stock.stockItems} on:remove={confirmRemoveItem} allowRemoval={true} />
    <a href="stock/fill" class="button is-primary mt-6">Bestand hinzufügen</a>
</div>

<hr />

<div class="has-text-centered">
    <a href="/" class="button is-link container">Zur Hauptseite</a>
</div>
