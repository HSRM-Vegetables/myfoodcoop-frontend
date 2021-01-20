<script>
    import { goto } from '@sapper/app';
    import StockList from '../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../stores/page';
    import Modal from '../../components/common/Modal.svelte';
    import Button from '../../components/common/Button.svelte';
    import { stockItems, areStockItemsUpdating } from '../../stores/stock';
    import Stock from '../../scripts/stock/Stock';
    import AuthorizeByRoles, { Roles, isAccessAllowed } from '../../components/common/AuthorizeByRoles.svelte';
    import { userDetails } from '../../stores/userDetails';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';
    $navBalance = 'hidden';

    let modalIsOpen = false;
    let stockItemIdToRemove;

    // flag for role ODERER
    let isOrderer = false;

    // if user-roles contains ORDERE set flag
    $: {
        if ($userDetails) {
            isOrderer = isAccessAllowed($userDetails.roles, [Roles.ORDERER]);
        }
    }

    function confirmRemoveItem(event) {
        modalIsOpen = true;
        stockItemIdToRemove = event.detail.id;
    }

    async function removeItem() {
        await Stock.removeItem(stockItemIdToRemove);

        // as one item was removed, reload the stock list
        stockItems.forceUpdate();

        modalIsOpen = false;
    }

    function closeModal() {
        modalIsOpen = false;
    }

    function onEditItem(event) {
        goto(`/stock/item/${event.detail.id}`);
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <Modal title="Artikel löschen?" bind:open={modalIsOpen}>
        <div slot="body"><span>Willst Du den Artikel wirklich unwiderruflich löschen?</span></div>
        <div slot="footer">
            <button class="button is-danger" on:click={removeItem}>Löschen</button>
            <button class="button is-primary" on:click={closeModal}>Abbrechen</button>
        </div>
    </Modal>

    <div class="has-text-centered">
        <StockList
            bind:stockItems={$stockItems}
            bind:isLoading={$areStockItemsUpdating}
            on:remove={isOrderer ? confirmRemoveItem : () => {}}
            allowRemoval={isOrderer}
            allowEdit={isOrderer}
            on:select={isOrderer ? onEditItem : () => {}}
            isClickable={isOrderer}
        />

        <AuthorizeByRoles allowedRoles={[Roles.ORDERER]} displayPermissionNotAllowed={false}>
            <Button text="Bestand hinzufügen" class="button is-primary mt-6" href="/stock/item/new" size="full-width" />
        </AuthorizeByRoles>
    </div>

    <hr />

    <div class="has-text-centered">
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
