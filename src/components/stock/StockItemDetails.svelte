<script>
    import { goto } from '@sapper/app';
    import { mdiDelete, mdiPencil } from '@mdi/js';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import Modal from '../common/Modal.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import AuthorizeByRoles, { Roles } from '../common/AuthorizeByRoles.svelte';
    import { stockItems } from '../../stores/stock';
    import { OriginCategoryWithDescription } from '../../scripts/OriginCategory';
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
    {#if item.sustainablyProduced}
        <div class="mb-1">Dieser Artikel wurde Nachhaltig produziert</div>
    {/if}

    <div class="mb-1">
        Herkunftskategorie:
        {#each OriginCategoryWithDescription as categorys}
            {#if item.originCategory === categorys.identifier}{categorys.descripton}{/if}
        {/each}
    </div>
    {#if item.certificates !== []}
        <div class="mb-1">
            Zertifikate:
            {#each item.certificates as i}| {i} |{/each}
        </div>
    {/if}
    <div class="mb-1">Erzeuger: {item.producer}</div>

    <div class="mb-1">Lieferant: {item.supplier}</div>

    <div class="mb-1">Lieferdatum: {item.orderDate}</div>

    <div class="mb-1">Bestelldatum: {item.deliveryDate}</div>

    <div class="box">
        <div class="mb-1">Beschreibung:</div>
        {item.description}
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
