<script>
    import BalanceHistory from '../../components/balance/history/BalanceHistory.svelte';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import { title, navBalance } from '../../stores/page';
    import { userDetails } from '../../stores/userDetails';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Guthaben Historie';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'show';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    {#if $userDetails}
        <BalanceHistory userId={$userDetails.id} />
    {/if}
</AuthorizeByRoles>
