<script>
    import { goto } from '@sapper/app';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../common/Modal.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import AuthorizeByRoles, { Roles } from '../common/AuthorizeByRoles.svelte';
    import { stockItems } from '../../stores/stock';
    import { moneyStyler } from '../../scripts/Helper';
    import Button from '../common/Button.svelte';

    /**
     * The stock item
     */
    export let item;

    let requestError;

    let modalIsOpen = false;
    let stockItemIdToRemove;

    function confirmRemoveItem(itemID) {
        modalIsOpen = true;
        stockItemIdToRemove = itemID;
    }

    async function removeItem() {
        try {
            modalIsOpen = false;

            await Stock.removeItem(stockItemIdToRemove);

            // as one item was removed, reload the stock list
            stockItems.forceUpdate();

            goto('/stock/');
        } catch (error) {
            requestError = error;
        }
    }

    function closeModal() {
        modalIsOpen = false;
    }
</script>

<ErrorModal error={requestError} />

<Modal title="Artikel löschen?" bind:open={modalIsOpen}>
    <div slot="body"><span>Willst Du den Artikel wirklich unwiderruflich löschen?</span></div>
    <div slot="footer">
        <button class="button is-danger" on:click={removeItem}>Löschen</button>
        <button class="button is-primary" on:click={closeModal}>Abbrechen</button>
    </div>
</Modal>

{#if item}
    <div class="columns is-mobile">
        <div class="column is-size-3 has-text-weight-bold">{item.name}</div>
    </div>

    {#if item.isDeleted}
        <article class="message is-danger">
            <div class="message-body">Artikel wurde gelöscht</div>
        </article>
    {/if}

    <div class="mb-1">Beschreibung:</div>
    <div class="box">{item.description}</div>

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

    <AuthorizeByRoles allowedRoles={[Roles.ORDERER]} displayPermissionNotAllowed={false}>
        {#if !item.isDeleted}
            <hr />
            <div class="container has-text-centered">
                <Button
                    text="Artikel bearbeiten"
                    size="full-width"
                    class="is-primary mb-3"
                    on:click={() => goto(`/stock/item/${item.id}/edit`)}
                />
                <Button
                    text="Artikel löschen"
                    size="full-width"
                    class="is-danger"
                    on:click={() => confirmRemoveItem(item.id)}
                />
            </div>
        {/if}
    </AuthorizeByRoles>
{/if}
