<script>
    import { stores } from '@sapper/app';
    import StockFiller from '../../../components/stock/StockFiller.svelte';
    import { Roles } from '../../../scripts/roles/Roles';
    import AuthorizeByRoles from '../../../components/common/AuthorizeByRoles.svelte';
    import { title, navBalance } from '../../../stores/page';

    const { page } = stores();
    const { id } = $page.query;

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand hinzufügen';
    $navBalance = 'hidden';
</script>

<AuthorizeByRoles allowedRoles={[Roles.ORDERER]}>
    <StockFiller id={id}/>
</AuthorizeByRoles>
