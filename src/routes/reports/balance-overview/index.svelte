<script>
    import { onMount } from 'svelte';
    import { mdiArrowLeft, mdiFileDownload } from '@mdi/js';
    import { goto } from '@sapper/app';
    import { ExportToCsv } from 'export-to-csv';
    import { title, navBalance } from '../../../stores/page';
    import Loader from '../../../components/common/Loader.svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import BalanceOverviewComp from '../../../components/reports/BalanceOverview.svelte';
    import BalanceOverview from '../../../scripts/reports/BalanceOverview';
    import Button from '../../../components/common/Button.svelte';
    import Icon from '../../../components/common/Icon.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */

    $title = 'Guthaben-Übersicht';
    $navBalance = 'hidden';

    let userBalanceList;
    let requestError;
    let isLoading = true;

    function csvExport(data) {
        const options = {
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalSeparator: ',',
            filename: `Balance-Overview_${new Date().toLocaleDateString()}`,
            showLabels: true,
            useBom: true,
            useKeysAsHeaders: true,
        };
        // change order
        let newData = data.map((item) =>
            JSON.parse(JSON.stringify(item, ['username', 'memberId', 'balance', 'isDeleted'], 1))
        );
        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(newData);
    }

    onMount(async () => {
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
    });

    function userSelected(event) {
        goto(`users/${event.detail.id}`);
    }
</script>

<style>
    button.background-none {
        background: none;
        border: 0;
    }
</style>

<AuthorizeByRoles allowedRoles={[Roles.TREASURER]}>
    <div class="columns">
        <div class="column">
            <h2 class="pt-4 is-size-5 has-text-weight-bold">Guthaben-Übersicht</h2>
        </div>
        {#if userBalanceList}
            <div class="column is-narrow">
                <button
                    text="CSV Export"
                    class="is-primary is-pulled-right has-text-black background-none is-hidden-touch pt-3 is-clickable"
                    on:click={() => csvExport(userBalanceList)}
                >
                    <Icon icon={mdiFileDownload} appbar={true} />
                </button>
            </div>
        {/if}
    </div>
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
            text="CSV Download"
            class="button is-primary is-hidden-desktop mb-3"
            size="full-width"
            on:click={() => csvExport(userBalanceList)}
        />
        <Button
            text="Zurück zu den Reports"
            href="/reports"
            class="button is-primary"
            size="full-width"
            icon={mdiArrowLeft}
        />
    </div>
</AuthorizeByRoles>
