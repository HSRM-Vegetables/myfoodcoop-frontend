<script>
    import { DateTime } from 'luxon';
    import { goto } from '@sapper/app';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Loader from '../../../components/common/Loader.svelte';
    import NoData from '../../../components/common/NoData.svelte';
    import Button from '../../../components/common/Button.svelte';
    import SoldItemsComp from '../../../components/reports/SoldItems.svelte';
    import SoldItems from '../../../scripts/reports/SoldItems';
    import { title, navBalance } from '../../../stores/page';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Was wurde gekauft';
    $navBalance = 'hidden';

    let requestError;
    let titleText = 'gestern';
    let isLoading = true;
    let soldItems;
    let selectedPeriod = 'yesterday';
    const cache = [];
    const periods = calcPeriods();

    function calcPeriods() {
        const today = DateTime.local();
        const yesterday = DateTime.local().plus({ days: -1 });
        const lastWeek = DateTime.local().plus({ days: -7 });
        const lastMonth = DateTime.local().plus({ months: -1 });

        return {
            yesterday: {
                fromDate: yesterday,
                toDate: yesterday,
            },
            lastWeek: {
                fromDate: lastWeek,
                toDate: today,
            },
            lastMonth: {
                fromDate: lastMonth,
                toDate: today,
            },
        };
    }

    async function loadItems(period, name) {
        selectedPeriod = period;
        if (name !== undefined) {
            titleText = name;
        }

        if (cache[period] !== undefined) {
            soldItems = cache[period];
            isLoading = false;
            return;
        }

        try {
            isLoading = true;
            soldItems = await SoldItems.getItems(
                periods[period].fromDate.toFormat('yyyy-MM-dd'),
                periods[period].toDate.toFormat('yyyy-MM-dd')
            );
            cache[period] = soldItems;
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    }

    function itemSelected(event) {
        goto(`stock/item/${event.detail.id}`);
    }

    loadItems(selectedPeriod);
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <div class="has-text-centered">
        <Button
            text="Gestern"
            class="my-2 is-rounded {selectedPeriod === 'yesterday' ? 'is-dark' : ''}"
            on:click={() => loadItems('yesterday', 'gestern')}
        />
        <Button
            text="Letzte Woche"
            class="my-2 mx-2 is-rounded {selectedPeriod === 'lastWeek' ? 'is-dark' : ''}"
            on:click={() => loadItems('lastWeek', 'letzte Woche')}
        />
        <Button
            class="my-2 is-rounded {selectedPeriod === 'lastMonth' ? 'is-dark' : ''}"
            text="Letzten Monat"
            on:click={() => loadItems('lastMonth', 'letzten Monat')}
        />
    </div>

    <h2 class="pt-4 is-size-5 has-text-weight-bold">Was wurde {titleText} verkauft?</h2>
    {#if isLoading}
        <Loader bind:isLoading />
    {:else if requestError !== undefined}
        <article class="message is-danger">
            <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
        </article>
    {:else if soldItems !== undefined && soldItems.length > 0}
        {#if selectedPeriod === 'yesterday'}
            Datum:
            {periods[selectedPeriod].fromDate.toFormat('dd.MM.yyyy')}
        {:else}
            Zeitraum:
            {periods[selectedPeriod].fromDate.toFormat('dd.MM.yyyy')}
            -
            {periods[selectedPeriod].toDate.toFormat('dd.MM.yyyy')}
        {/if}

        <hr />
        <SoldItemsComp soldItems={soldItems} on:select={itemSelected} />
    {:else}
        <NoData text="Es wurden in dem gewählten Zeitraum keine Einkäufe getätigt." />
    {/if}

    <ErrorModal error={requestError} />

    <hr />

    <div class="has-text-centered">
        <Button text="Zurück zur Reports" href="/reports" class="button is-primary" size="full-width" />
    </div>
</AuthorizeByRoles>
