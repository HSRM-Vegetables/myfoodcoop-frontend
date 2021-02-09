<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import { mdiArrowLeft } from '@mdi/js';
    import ErrorModal from '../../../../components/common/ErrorModal.svelte';
    import AuthorizeByRoles, { Roles } from '../../../../components/common/AuthorizeByRoles.svelte';
    import Stock from '../../../../scripts/stock/Stock';
    import { title, navBalance } from '../../../../stores/page';
    import Button from '../../../../components/common/Button.svelte';
    import StockDisposer from '../../../../components/stock/StockDisposer.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Verdorbene Ware entsorgen';
    // eslint-disable-next-line prefer-const, no-unused-vars
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

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <ErrorModal error={requestError} />
    {#if item}
        <StockDisposer item={item} />
    {/if}

    <div class="container has-text-centered">
        <Button href="/stock/item/{itemId}" text="Zurück" class="is-primary" size="full-width" icon={mdiArrowLeft} />
    </div>
</AuthorizeByRoles>
