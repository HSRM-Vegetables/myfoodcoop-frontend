<script>
    import EditBalance from '../../components/balance/EditBalance.svelte';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import { title, navBalance } from '../../stores/page';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Guthaben bearbeiten';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'show';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <EditBalance />
</AuthorizeByRoles>
