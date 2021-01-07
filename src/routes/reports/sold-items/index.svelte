<script>
    import { DateTime } from 'luxon';
    import { goto } from '@sapper/app';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Loader from '../../../components/common/Loader.svelte';
    import NoData from '../../../components/common/NoData.svelte';
    import Button from '../../../components/common/Button.svelte';
    import SoldItemsComp from '../../../components/reports/SoldItems.svelte';
    import SoldItems from '../../../scripts/reports/SoldItems';

    let requestError;
    let isLoading = true;
    let soldItems;
    let selectedPeriod = 'yesterday';
    const cache = [];
    const periods = calcPeriods();

    function calcPeriods() {
        const yesterday = DateTime.local().plus({ days: -1 });
        const lastMonday = DateTime.local().plus({ days: -7 }).startOf('week');
        const lastSunday = DateTime.local().plus({ days: -7 }).endOf('week');
        const lastMonthFirst = DateTime.local().plus({ months: -1 }).startOf('month');
        const lastMonthLast = DateTime.local().plus({ months: -1 }).endOf('month');

        return {
            yesterday: {
                fromDate: yesterday.toFormat('yyyy-MM-dd'),
                toDate: yesterday.toFormat('yyyy-MM-dd'),
            },
            lastWeek: {
                fromDate: lastMonday.toFormat('yyyy-MM-dd'),
                toDate: lastSunday.toFormat('yyyy-MM-dd'),
            },
            lastMonth: {
                fromDate: lastMonthFirst.toFormat('yyyy-MM-dd'),
                toDate: lastMonthLast.toFormat('yyyy-MM-dd'),
            },
        };
    }

    async function loadItems(period) {
        selectedPeriod = period;

        if (cache[period] !== undefined) {
            soldItems = cache[period];
            isLoading = false;
            return;
        }

        try {
            isLoading = true;
            soldItems = await SoldItems.getItems(periods[period].fromDate, periods[period].toDate);
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

<h1 class="title mb-5 has-text-centered">Was wurde in den letzten x Tagen verkauft?</h1>

<div class="has-text-centered">
    <Button
        text="Gestern"
        class="my-2 is-rounded {selectedPeriod === 'yesterday' ? 'is-dark' : ''}"
        on:click={() => loadItems('yesterday')}
    />
    <Button
        text="Letzte Woche"
        class="my-2 mx-2 is-rounded {selectedPeriod === 'lastWeek' ? 'is-dark' : ''}"
        on:click={() => loadItems('lastWeek')}
    />
    <Button
        class="my-2 is-rounded {selectedPeriod === 'lastMonth' ? 'is-dark' : ''}"
        text="Letzter Monat"
        on:click={() => loadItems('lastMonth')}
    />
</div>

{#if isLoading}
    <Loader bind:isLoading />
{:else if requestError !== undefined}
    <article class="message is-danger">
        <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
    </article>
{:else if soldItems !== undefined && soldItems.length > 0}
    <div class="mt-4 mb-5 is-size-5">
        {#if selectedPeriod === 'yesterday'}
            Datum:
            {new Date(periods[selectedPeriod].fromDate).toLocaleDateString()}
        {:else}
            Zeitraum:
            {new Date(periods[selectedPeriod].fromDate).toLocaleDateString()}
            -
            {new Date(periods[selectedPeriod].toDate).toLocaleDateString()}
        {/if}
    </div>
    <hr />
    <SoldItemsComp soldItems={soldItems} on:select={itemSelected} />
{:else}
    <NoData text="Es wurden in dem gewählten Zeitraum keine Einkäufe getätigt." />
{/if}

<ErrorModal error={requestError} />

<hr />

<div class="has-text-centered">
    <Button text="Zurück" href="/reports" class="button is-primary" size="full-width" />
</div>
