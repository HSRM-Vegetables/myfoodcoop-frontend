<script>
    import { mdiDelete, mdiPencil } from '@mdi/js';
    import { goto } from '@sapper/app';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../common/Modal.svelte';
    import Icon from '../common/Icon.svelte';
    import { stockItems } from '../../stores/stock';
    import { moneyStyler } from '../../scripts/Helper';

    /**
     * The stock item
     */
    export let item;

    let modalIsOpen = false;
    let stockItemIdToRemove;

    function confirmRemoveItem(itemID) {
        modalIsOpen = true;
        stockItemIdToRemove = itemID;
    }

    async function removeItem() {
        await Stock.removeItem(stockItemIdToRemove);

        // as one item was removed, reload the stock list
        stockItems.forceUpdate();

        goto('/stock/');
    }

    function closeModal() {
        modalIsOpen = false;
    }
</script>

<Modal title="Artikel löschen?" bind:open={modalIsOpen}>
    <div slot="body"><span>Willst Du den Artikel wirklich unwiderruflich löschen?</span></div>
    <div slot="footer">
        <button class="button is-danger" on:click={removeItem}>Löschen</button>
        <button class="button is-primary" on:click={closeModal}>Abbrechen</button>
    </div>
</Modal>

{#if item}
    <div class="columns is-mobile">
        <div class="column is-size-4">{item.name}</div>
        <div class="column is-narrow has-text-right">
            <button class="button is-white" on:click={() => goto(`/stock/item/${item.id}/edit`)}>
                <span class="icon">
                    <Icon icon={mdiPencil} />
                </span>
            </button>
            <button class="button is-white" on:click={() => confirmRemoveItem(item.id)}>
                <span class="icon">
                    <Icon icon={mdiDelete} />
                </span>
            </button>
        </div>
    </div>

    {#if item.isDeleted}
        <article class="message is-danger">
            <div class="message-body">Artikel wurde gelöscht</div>
        </article>
    {/if}

    {#if item.description}
        <div class="box">{item.description}</div>
    {/if}

    <div class="columns is-mobile">
        <div class="column">Warenpreis</div>
        <div class="column has-text-right">
            {#if item.unitType === UnitType.PIECE}
                <span>{moneyStyler(item.pricePerUnit)} € / Stück</span>
            {:else}<span>{moneyStyler(item.pricePerUnit)} € / kg</span>{/if}
        </div>
    </div>

    <div class="columns is-mobile">
        <div class="column">Menge im Bestand</div>
        <div class="column has-text-right">{item.quantity} {item.unitType === UnitType.PIECE ? 'Stück' : 'kg'}</div>
    </div>
{/if}
