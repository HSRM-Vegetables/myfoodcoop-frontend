<script>
    import EditBalance from '../components/balance/EditBalance.svelte';
    import AuthorizeByRoles, { Roles } from '../components/common/AuthorizeByRoles.svelte';
    import { title, navBalance } from '../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Guthaben bearbeiten';
    $navBalance = 'show';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <EditBalance />
</AuthorizeByRoles>

<!-- TODO: view global balance transactions (date/user name/balance/without time limit) -->
<AuthorizeByRoles allowedRoles={[Roles.TREASURER]}>
    <!--  <ShowAllBalance />-->
</AuthorizeByRoles>
