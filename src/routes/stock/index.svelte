<script>
    import { goto } from '@sapper/app';
    import StockList from '../../components/stock/StockList.svelte';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { stockItems, areStockItemsUpdating } from '../../stores/stock';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand';
    $navBalance = 'hidden';

    function onSelectItem(event) {
        goto(`/stock/item/${event.detail.id}`);
    }

    function itemDetails(event) {
        goto(`/stock/item/${event.detail.id}`);
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <div class="has-text-centered">
        <StockList
            bind:stockItems={$stockItems}
            bind:isLoading={$areStockItemsUpdating}
            allowDetails={true}
            on:details={itemDetails}
            on:select={onSelectItem}
            isClickable={true}
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
