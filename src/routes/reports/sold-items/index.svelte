<script>
    import { DateTime } from 'luxon';
    import { goto } from '@sapper/app';
    import { ExportToCsv } from 'export-to-csv';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { mdiFileDownload, mdiArrowLeft } from '@mdi/js';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Loader from '../../../components/common/Loader.svelte';
    import NoData from '../../../components/common/NoData.svelte';
    import Button from '../../../components/common/Button.svelte';
    import Icon from '../../../components/common/Icon.svelte';
    import SoldItemsComp from '../../../components/reports/SoldItems.svelte';
    import SoldItems from '../../../scripts/reports/SoldItems';
    import { CalendarStyle } from '../../../scripts/CalendarStyle';
    import { title, navBalance } from '../../../stores/page';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Was wurde gekauft';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';

    let requestError;
    let titleText = 'gestern';
    let isLoading = true;
    let soldItems;
    let selectedPeriod = 'yesterday';
    const cache = [];
    const periods = calcPeriods();
    let localFrom;
    let localTo;

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
        localFrom = periods[period].fromDate;
        localTo = undefined;
        if (name !== 'yesterday') {
            localTo = periods[period].toDate;
        }

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
            soldItems = await SoldItems.getItems(localFrom.toFormat('yyyy-MM-dd'), localTo.toFormat('yyyy-MM-dd'));
            cache[period] = soldItems;

            // reset the error to default value to display the results
            requestError = undefined;
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    }

    function itemSelected(event) {
        goto(`stock/item/${event.detail.id}`);
    }

    function csvExport(data) {
        let csvTitle;
        if (selectedPeriod === 'yesterday') {
            csvTitle = localFrom.toFormat('dd.MM.yyyy');
        } else {
            csvTitle = `${localFrom.toFormat('dd.MM.yyyy')} - ${localTo.toFormat('dd.MM.yyyy')}`;
        }

        const options = {
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalSeparator: ',',
            showLabels: true,
            showTitle: true,
            title: `Zeitraum: ${csvTitle}`,
            filename: csvTitle.replace(' - ', '-'),
            useBom: true,
            useKeysAsHeaders: true,
        };
        const newData = data.map(({ fromDate, toDate, ...item }) => item);
        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(newData);
    }

    async function datePicker(dateInfo) {
        selectedPeriod = 'datepicker';
        localFrom = DateTime.fromJSDate(new Date(dateInfo.from));
        localTo = DateTime.fromJSDate(new Date(dateInfo.to));

        try {
            isLoading = true;

            soldItems = await SoldItems.getItems(localFrom.toFormat('yyyy-MM-dd'), localTo.toFormat('yyyy-MM-dd'));

            // reset the error to default value to display the results
            requestError = undefined;
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    }

    loadItems(selectedPeriod);
</script>

<style>
    button.background-none {
        background: none;
        border: 0;
    }
</style>

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
        /><br />
        <div class="pt-4 pb-4">
            <DatePicker
                placeholder="Wähle einen Zeitraum"
                continueText="Bestätigen"
                format="DD.MM.YYYY"
                range={true}
                styling={new CalendarStyle()}
                on:range-selected={(e) => datePicker(e.detail)}
                end={DateTime.local().toJSDate()}
            />
        </div>
    </div>

    <h2 class="pt-4 is-size-5 has-text-weight-bold">Was wurde {titleText} verkauft?</h2>
    {#if isLoading}
        <Loader bind:isLoading />
    {:else if requestError !== undefined}
        <article class="message is-danger">
            <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
        </article>
    {:else if soldItems !== undefined && soldItems.length > 0}
        <div class="columns">
            <div class="column">
                {#if selectedPeriod === 'yesterday'}
                    Datum:
                    {localFrom.toFormat('dd.MM.yyyy')}
                {:else}Zeitraum: {localFrom.toFormat('dd.MM.yyyy')} - {localTo.toFormat('dd.MM.yyyy')}{/if}
            </div>
            <div class="column">
                <button
                    text="CSV Export"
                    class="is-primary is-pulled-right has-text-black background-none is-hidden-touch"
                    on:click={() => csvExport(soldItems)}
                >
                    <Icon icon={mdiFileDownload} appbar={true} />
                </button>
            </div>
        </div>
        <hr />
        <SoldItemsComp soldItems={soldItems} on:select={itemSelected} />
    {:else}
        <NoData text="Es wurden in dem gewählten Zeitraum keine Einkäufe getätigt." />
    {/if}

    <ErrorModal error={requestError} />

    <hr />

    <div class="has-text-centered">
        <Button
            text="CSV Download"
            class="button is-primary is-hidden-desktop mb-3"
            size="full-width"
            icon={mdiFileDownload}
            on:click={() => csvExport(soldItems)}
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
