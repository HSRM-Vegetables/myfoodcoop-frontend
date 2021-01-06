<script>
    import { goto } from '@sapper/app';
    import { onMount } from 'svelte';
    import StockList from '../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../stores/page';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../../components/common/Modal.svelte';
    import Button from '../../components/common/Button.svelte';

    let stockList = {
        items: [],
    };

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';
    $navBalance = 'hidden';

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

    async function removeItem() {
        isLoading = true;
        await Stock.removeItem(stockItemIdToRemove);
        stockList = await Stock.getStockList(); // reload list
        modalIsOpen = false;
        isLoading = false;
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
    <Button text="Bestand hinzufügen" class="button is-primary mt-6" href="/stock/item/new" size="full-width" />
</div>

<hr />

<div class="has-text-centered">
    <Button goHome={true} size="full-width" />
</div>
