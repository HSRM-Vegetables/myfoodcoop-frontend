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
        if (itemId) {
            try {
                item = await Stock.getItem(itemId);
            } catch (error) {
                requestError = error;
            }
        }
    });

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Bestand hinzufügen';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';
</script>

<AuthorizeByRoles allowedRoles={[Roles.ORDERER]}>
    <ErrorModal error={requestError} />
    {#if item}
        <StockFiller item={item} />
    {:else}
        <StockFiller />
    {/if}
</AuthorizeByRoles>
