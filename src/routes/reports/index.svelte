<script>
    import { mdiCashMultiple, mdiAccountCash } from '@mdi/js';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import Button from '../../components/common/Button.svelte';
    import { title, navBalance } from '../../stores/page';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Reports';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <h1 class="title mb-5">Reports</h1>
    <div class="has-text-centered">
        <Button
            href="/reports/sold-items"
            class="is-link"
            text="Was wurde gekauft?"
            size="full-width"
            icon={mdiCashMultiple}
        />

        <AuthorizeByRoles allowedRoles={[Roles.TREASURER]} displayPermissionNotAllowed={false}>
            <Button
                href="/reports/balance-overview"
                class="is-link mt-3"
                text="Guthaben-Übersicht"
                size="full-width"
                icon={mdiAccountCash}
            />
        </AuthorizeByRoles>
    </div>
    <hr />

    <div class="has-text-centered">
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
