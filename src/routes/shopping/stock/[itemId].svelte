<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import ShoppingCartAddItem from '../../../components/shoppingCart/ShoppingCartAddItem.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Stock from '../../../scripts/stock/Stock';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Artikel Kaufen';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';

    const { page } = stores();
    const { itemId } = $page.params;

    let stockItem;

    onMount(async () => {
        stockItem = await Stock.getItem(itemId);
    });
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <ShoppingCartAddItem stockItem={stockItem} />
</AuthorizeByRoles>
