<script>
    import { DateTime } from 'luxon';
    import { goto } from '@sapper/app';
    import { mdiDelete, mdiPencil } from '@mdi/js';
    import { UnitType } from '../../scripts/stock/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../common/Modal.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import AuthorizeByRoles, { Roles } from '../common/AuthorizeByRoles.svelte';
    import { stockItems } from '../../stores/stock';
    import { getLocalizedOriginCategory } from '../../scripts/OriginCategory';
    import { moneyStyler } from '../../scripts/common/Helper';
    import Button from '../common/Button.svelte';
    import { getLocalizedStockStatus } from '../../scripts/stock/StockStatus';

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

<style>
    .small {
        font-size: 17px;
    }
</style>

<ErrorModal error={requestError} />

<Modal title="Artikel löschen?" bind:open={modalIsOpen}>
    <div slot="body"><span>Willst Du den Artikel wirklich unwiderruflich löschen?</span></div>
    <div slot="footer">
        <button class="button is-danger" on:click={removeItem}>Löschen</button>
        <button class="button is-primary" on:click={closeModal}>Abbrechen</button>
    </div>
</Modal>
{#if item}
    <div class=" is-size-3 has-text-weight-bold">{item.name}</div>

    {#if item.sustainablyProduced}<span class="small">Dieser Artikel wurde Nachhaltig produziert</span>{/if}
    <hr />
    {#if item.isDeleted}
        <article class="message is-danger">
            <div class="message-body">Artikel wurde gelöscht</div>
        </article>
    {/if}
    <div class="columns is-mobile">
        <div class="column">Artikel Status</div>
        <div class="column has-text-right">{getLocalizedStockStatus(item.stockStatus)}</div>
    </div>

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
    <hr />
    <span>Information:</span>
    <div class="box">
        <div class="columns is-mobile">
            <div class="column">Herkunftskategorie:</div>
            <div class="column">{getLocalizedOriginCategory(item.originCategory)}</div>
        </div>
        {#if item.certificates !== []}
            <div class="columns is-mobile">
                <div class="column">Zertifikate:</div>
                <div class="column">{item.certificates.join(' | ')}</div>
            </div>
        {/if}
        <div class="columns is-mobile">
            <div class="column">Erzeuger:</div>
            <div class="column">{item.producer}</div>
        </div>
        <div class="columns is-mobile">
            <div class="column">Lieferant:</div>
            <div class="column">{item.supplier}</div>
        </div>
        <div class="columns is-mobile">
            <div class="column">Lieferdatum:</div>
            <div class="column">{DateTime.fromJSDate(new Date(item.orderDate)).toFormat('dd.MM.yyyy')}</div>
        </div>
        <div class="columns is-mobile">
            <div class="column">Bestelldatum:</div>
            <div class="column">{DateTime.fromJSDate(new Date(item.deliveryDate)).toFormat('dd.MM.yyyy')}</div>
        </div>

        {#if item.description}
            <div class="mb-1">Beschreibung:</div>
            <span>{item.description}</span>
        {/if}
    </div>

    <AuthorizeByRoles allowedRoles={[Roles.ORDERER]} displayPermissionNotAllowed={false}>
        {#if !item.isDeleted}
            <hr />
            <div class="container has-text-centered">
                <Button
                    text="Artikel neu bestellen"
                    size="full-width"
                    class="is-warning mb-3"
                    on:click={() => goto(`/stock/item/new?itemId=${item.id}`)}
                />
                <Button
                    text="Artikel bearbeiten"
                    size="full-width"
                    class="is-primary mb-3"
                    on:click={() => goto(`/stock/item/${item.id}/edit`)}
                    icon={mdiPencil}
                />
                <Button
                    text="Artikel löschen"
                    size="full-width"
                    class="is-danger"
                    on:click={() => confirmRemoveItem(item.id)}
                    icon={mdiDelete}
                />
            </div>
        {/if}
    </AuthorizeByRoles>
{/if}
