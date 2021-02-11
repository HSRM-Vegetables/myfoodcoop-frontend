<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import { mdiFormatListText, mdiCartArrowDown } from '@mdi/js';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import StockItemDetails from '../../../components/stock/StockItemDetails.svelte';
    import Stock from '../../../scripts/stock/Stock';
    import Button from '../../../components/common/Button.svelte';
    import { title, navBalance } from '../../../stores/page';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Artikel';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';

    const { page } = stores();
    const { itemId } = $page.params;
    const { comesFrom } = $page.query;

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
    <StockItemDetails item={item} showButtons={true} />

    <hr />

    <div class="has-text-centered">
        {#if comesFrom === 'home'}
            <Button goHome={true} size="full-width" />
        {:else if comesFrom === 'shopping'}
            <Button
                text="Zur Artikelauswahl"
                href="/shopping/stock/"
                class="button is-link mt-1"
                icon={mdiCartArrowDown}
                size="full-width"
            />
        {:else}
            <Button
                text="Zum Bestand"
                href="/stock/"
                class="button is-link mt-1"
                icon={mdiFormatListText}
                size="full-width"
            />
        {/if}
    </div>
</AuthorizeByRoles>
