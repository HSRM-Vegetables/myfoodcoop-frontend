<script>
    import HistoryOverview from '../../components/history/HistoryOverview.svelte';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { Roles } from '../../scripts/roles/Roles';
    import AuthorizeByRoles from '../../components/common/AuthorizeByRoles.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Einkaufshistorie';
    $navBalance = 'hidden';

    let currentRole = {
        text: 'you are a TREASURER',
        access: [Roles.TREASURER],
    };
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER, Roles.TREASURER]}>
    <HistoryOverview />
</AuthorizeByRoles>

<hr />

<!-- TODO: Purchase history View purchases (any UserName/without time limit) -->
<AuthorizeByRoles allowedRoles={currentRole.access}>
    <div><span class="pl-4 has-text-weight-bold">{currentRole.text}</span></div>
</AuthorizeByRoles>

<div class="has-text-centered">
    <Button goHome={true} size="full-width" />
</div>
