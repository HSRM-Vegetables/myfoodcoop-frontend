<script>
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Loader from '../../../components/common/Loader.svelte';
    import NoData from '../../../components/common/NoData.svelte';
    import Button from '../../../components/common/Button.svelte';
    import SoldItemsComp from '../../../components/reports/SoldItems.svelte';
    import SoldItems from '../../../scripts/reports/SoldItems';
    import { dateToYYYYMMDD } from '../../../scripts/Helper';

    let requestError;
    let isLoading = true;
    let soldItems;
    let selectedPeriod = 'yesterday';
    const periods = calcPeriods();

    function calcPeriods() {
        const today = new Date();
        const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

        // lastWeek Dates
        const day = today.getDay();
        const lastSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (day === 0 ? 7 : day));
        const lastMonday = new Date(lastSunday.getFullYear(), lastSunday.getMonth(), lastSunday.getDate() - 6);

        // lastMonth Dates
        const lastMonthFirst = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthLast = new Date(today.getFullYear(), today.getMonth(), 0);

        return {
            yesterday: {
                fromDate: dateToYYYYMMDD(yesterday),
                toDate: dateToYYYYMMDD(yesterday),
            },
            lastWeek: {
                fromDate: dateToYYYYMMDD(lastMonday),
                toDate: dateToYYYYMMDD(lastSunday),
            },
            lastMonth: {
                fromDate: dateToYYYYMMDD(lastMonthFirst),
                toDate: dateToYYYYMMDD(lastMonthLast),
            },
        };
    }

    async function loadItems(period) {
        isLoading = true;
        selectedPeriod = period;
        try {
            soldItems = await SoldItems.getItems(periods[period].fromDate, periods[period].toDate);
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
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
    <SoldItemsComp soldItems={soldItems} />
{:else}
    <NoData text="Es wurden in dem gewählten Zeitraum keine Einkäufe getätigt." />
{/if}

<ErrorModal error={requestError} />

<hr />

<div class="has-text-centered">
    <Button text="Zurück" href="/reports" class="button is-primary" size="full-width" />
</div>
