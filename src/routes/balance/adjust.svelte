<script>
    import AdjustBalance from '../../components/balance/AdjustBalance.svelte';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import { title, navBalance } from '../../stores/page';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Guthaben anpassen';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'show';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <AdjustBalance />
</AuthorizeByRoles>
