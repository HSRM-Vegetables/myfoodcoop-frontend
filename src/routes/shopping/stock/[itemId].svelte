<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import PriceCalculator from '../../../components/priceCalculator/PriceCalculator.svelte';
    import { title, navBalance } from '../../../stores/page';
    import Stock from '../../../scripts/stock/Stock';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Preisrechner';
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
    <PriceCalculator stockItem={stockItem} />
</AuthorizeByRoles>
