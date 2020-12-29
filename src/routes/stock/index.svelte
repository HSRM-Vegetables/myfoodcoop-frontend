<script>
    import { goto } from '@sapper/app';
    import { onMount } from 'svelte';
    import StockList from '../../components/stock/StockList.svelte';
    import { title } from '../../stores/page';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../../components/common/Modal.svelte';

    let stockList = {
        items: [],
    };

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';

    let modalIsOpen = false;
    let stockItemIdToRemove;
    let isLoading = true;

    onMount(async () => {
        stockList = await Stock.getStockList();
        isLoading = false;
    });

    function confirmRemoveItem(event) {
        modalIsOpen = true;
        stockItemIdToRemove = event.detail.id;
    }

    function removeItem() {
        Stock.removeItem(stockItemIdToRemove);
        stockList = stockList; // tell svelte to update the view
        modalIsOpen = false;
    }

    function closeModal() {
        modalIsOpen = false;
    }

    function onEditItem(event) {
        goto(`/stock/item/${event.detail.id}`);
    }
</script>

<Modal title="Artikel löschen?" bind:open={modalIsOpen}>
    <div slot="body"><span>Willst Du den Artikel wirklich unwiderruflich löschen?</span></div>
    <div slot="footer">
        <button class="button is-danger" on:click={removeItem}>Löschen</button>
        <button class="button is-primary" on:click={closeModal}>Abbrechen</button>
    </div>
</Modal>

<div class="has-text-centered">
    <StockList
        bind:stockItems={stockList.items}
        bind:isLoading
        on:remove={confirmRemoveItem}
        allowRemoval={true}
        allowEdit={true}
        on:select={onEditItem}
        isClickable={true}
    />
    <a href="stock/item/new" class="button is-primary mt-6">Bestand hinzufügen</a>
</div>

<hr />

<div class="has-text-centered"><a href="/" class="button is-link container">Zur Hauptseite</a></div>
