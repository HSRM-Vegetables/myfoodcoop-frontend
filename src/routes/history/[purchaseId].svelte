<script context="module">
    let purchasId = -1;

    export async function preload({ params }) {
        purchasId = params.purchaseId;
    }
</script>

<script>
    import { mdiShoppingSearch } from '@mdi/js';
    import HistoryDetails from '../../components/history/HistoryDetails.svelte';
    import Button from '../../components/common/Button.svelte';
    import { title, navBalance } from '../../stores/page';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Einkaufshistorie';
    $navBalance = 'hidden';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <HistoryDetails purchaseID={purchasId} />

    <div class="has-text-centered">
        <div>
            <Button
                href="/history"
                text="Zur Einkaufshistorie"
                class="is-primary mt6"
                size="full-width"
                icon={mdiShoppingSearch}
            />
        </div>
    </div>
</AuthorizeByRoles>
