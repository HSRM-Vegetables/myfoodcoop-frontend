<script>
    import HistoryOverview from '../../components/history/HistoryOverview.svelte';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { Roles } from '../../scripts/roles/Roles';
    import AuthorizeByRoles from '../../components/common/AuthorizeByRoles.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Einkaufshistorie';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <HistoryOverview />
    <hr />

    <div class="has-text-centered">
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
