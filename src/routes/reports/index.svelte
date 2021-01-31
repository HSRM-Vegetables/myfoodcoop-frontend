<script>
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import Button from '../../components/common/Button.svelte';
    import { title, navBalance } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Reports';
    $navBalance = 'hidden';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <h1 class="title mb-5">Reports</h1>

    <Button href="/reports/sold-items" class="is-link" text="Was wurde gekauft?" />

    <AuthorizeByRoles allowedRoles={[Roles.TREASURER]} displayPermissionNotAllowed={false}>
        <Button href="/reports/balance-overview" class="is-link" text="Guthaben-Übersicht" />
    </AuthorizeByRoles>

    <hr />

    <div class="has-text-centered">
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
