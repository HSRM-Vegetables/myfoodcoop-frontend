<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import { mdiArrowLeft } from '@mdi/js';
    import ErrorModal from '../../../../components/common/ErrorModal.svelte';
    import StockFiller from '../../../../components/stock/StockFiller.svelte';
    import AuthorizeByRoles, { Roles } from '../../../../components/common/AuthorizeByRoles.svelte';
    import Stock from '../../../../scripts/stock/Stock';
    import { title, navBalance } from '../../../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand bearbeiten';
    $navBalance = 'hidden';

    const { page } = stores();
    const { itemId } = $page.params;
    let item;
    let requestError;

    onMount(async () => {
        try {
            item = await Stock.getItem(itemId);
        } catch (error) {
            requestError = error;
        }
    });
</script>

<AuthorizeByRoles allowedRoles={[Roles.ORDERER]}>
    <ErrorModal error={requestError} />
    {#if item}
        <StockFiller
            item={item}
            edit={true}
            linkBack="/stock/item/{item.id}"
            linkBackText="zurück"
            icon={mdiArrowLeft}
        />
    {/if}
</AuthorizeByRoles>
