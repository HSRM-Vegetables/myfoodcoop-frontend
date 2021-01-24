<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import StockFiller from '../../../components/stock/StockFiller.svelte';
    import { Roles } from '../../../scripts/roles/Roles';
    import AuthorizeByRoles from '../../../components/common/AuthorizeByRoles.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Stock from '../../../scripts/stock/Stock';

    const { page } = stores();
    const { itemId } = $page.query;
    let item;
    let requestError;

    onMount(async () => {
        try {
            item = await Stock.getItem(itemId);
        } catch (error) {
            requestError = error;
        }
    });

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand hinzufügen';
    $navBalance = 'hidden';
</script>

<AuthorizeByRoles allowedRoles={[Roles.ORDERER]}>
    <ErrorModal error={requestError} />
    {#if item}
        <StockFiller item={item} edit={false} linkBack="/stock/item/{item.id}" linkBackText="zurück" />
    {/if}
</AuthorizeByRoles>
