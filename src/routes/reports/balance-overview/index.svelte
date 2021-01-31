<script>
    import { mdiArrowLeft } from '@mdi/js';
    import { goto } from '@sapper/app';
    import { title, navBalance } from '../../../stores/page';
    import Loader from '../../../components/common/Loader.svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import BalanceOverviewComp from '../../../components/reports/BalanceOverview.svelte';
    import BalanceOverview from '../../../scripts/reports/BalanceOverview';
    import Button from '../../../components/common/Button.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */

    $title = 'Guthaben-Übersicht';
    $navBalance = 'hidden';

    let userBalanceList;
    let requestError;
    let isLoading = true;

    async function loadBalances() {
        try {
            isLoading = true;
            userBalanceList = await BalanceOverview.getBalanceList();

            // reset the error to default value to display the results
            requestError = undefined;
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    }

    function userSelected(event) {
        goto(`users/${event.detail.id}`);
    }

    loadBalances();
</script>

<AuthorizeByRoles allowedRoles={[Roles.TREASURER]}>
    <h2 class="pt-4 is-size-5 has-text-weight-bold">Guthaben-Übersicht</h2>
    {#if isLoading}
        <Loader bind:isLoading />
    {:else if requestError !== undefined}
        <article class="message is-danger">
            <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
        </article>
    {:else if userBalanceList}
        <hr />
        <BalanceOverviewComp userBalanceList={userBalanceList} on:select={userSelected} />
    {/if}

    <ErrorModal error={requestError} />

    <hr />

    <div class="has-text-centered">
        <Button
            text="Zurück zu den Reports"
            href="/reports"
            class="button is-primary"
            size="full-width"
            icon={mdiArrowLeft}
        />
    </div>
</AuthorizeByRoles>
