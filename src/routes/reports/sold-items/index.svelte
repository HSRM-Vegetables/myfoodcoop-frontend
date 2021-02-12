<script>
    import { DateTime } from 'luxon';
    import { goto } from '@sapper/app';
    import { ExportToCsv } from 'export-to-csv';
    import { mdiFileDownload, mdiArrowLeft } from '@mdi/js';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Loader from '../../../components/common/Loader.svelte';
    import NoData from '../../../components/common/NoData.svelte';
    import Button from '../../../components/common/Button.svelte';
    import Icon from '../../../components/common/Icon.svelte';
    import SoldItemsComp from '../../../components/reports/SoldItems.svelte';
    import SoldItems from '../../../scripts/reports/SoldItems';
    import { title, navBalance } from '../../../stores/page';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import MobileReloadButton from '../../../components/common/MobileReloadButton.svelte';
    import { moneyStyler } from '../../../scripts/common/Helper';

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
        const lastLastWeek = DateTime.local().plus({ days: -today.weekday });
        const lastFirstWeek = lastLastWeek.plus({ days: -6 });
        const lastFirstMonth = DateTime.local(today.year, today.month - 1, 1);
        const lastLastMonth = lastFirstMonth.plus({ month: 1, days: -1 });
        return {
            yesterday: {
                fromDate: yesterday,
                toDate: yesterday,
            },
            lastWeek: {
                fromDate: lastFirstWeek,
                toDate: lastLastWeek,
            },
            lastMonth: {
                fromDate: lastFirstMonth,
                toDate: lastLastMonth,
            },
        };
    }

    async function loadItems(period, name, forceUpdate = false) {
        localFrom = periods[period].fromDate;
        localTo = undefined;
        if (name !== 'yesterday') {
            localTo = periods[period].toDate;
        }

        selectedPeriod = period;
        if (name !== undefined) {
            titleText = name;
        }

        if (!forceUpdate && cache[period] !== undefined) {
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

        const newData = data.items.map(({ fromDate, toDate, ...item }) => item);
        const empty = {
            id: '',
            name: '',
            quantitySold: '',
            unitType: '',
            vat: '',
            totalVat: '',
            grossAmount: '',
        };
        newData.push(
            {
                ...empty,
            },
            {
                ...empty,
                totalVat: 'Netto',
                grossAmount: `${soldItems.grossAmount - soldItems.totalVat} €`,
            },
            {
                ...empty,
                totalVat: 'MwSt. Gesamt',
                grossAmount: `${soldItems.totalVat} €`,
            }
        );

        soldItems.vatDetails.forEach((vat) => {
            newData.push({
                ...empty,
                vat: `${Math.floor(vat.vat * 100)}%`,
                grossAmount: `${vat.amount} €`,
            });
        });
        newData.push({
            ...empty,
            totalVat: 'Brutto',
            grossAmount: `${soldItems.grossAmount} €`,
        });
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(newData);
    }

    async function datePicker(dateInfo, text) {
        selectedPeriod = 'datepicker';
        if (text === 'start') localFrom = DateTime.fromJSDate(new Date(dateInfo.target.value));
        if (text === 'end') localTo = DateTime.fromJSDate(new Date(dateInfo.target.value));

        if (!localFrom || !localTo) return;
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

    .vat-container {
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
    }
    .small-table {
        float: right;
    }
    .small-table td:first-child {
        padding-right: 10px;
    }
    .small-table td {
        padding: 0;
        margin: 0;
    }
</style>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <MobileReloadButton on:click={() => loadItems(selectedPeriod, titleText, true)} />

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
        <div class="pt-4 pb-4 columns">
            <div class="column">
                <input
                    type="date"
                    class="input"
                    value={localFrom.toFormat('yyyy-MM-dd')}
                    max={DateTime.local().toFormat('yyyy-MM-dd')}
                    on:change={(e) => datePicker(e, 'start')}
                />
            </div>
            <div class="column">
                <input
                    type="date"
                    class="input"
                    value={localTo.toFormat('yyyy-MM-dd')}
                    min={localFrom.toFormat('yyyy-MM-dd')}
                    max={DateTime.local().toFormat('yyyy-MM-dd')}
                    on:change={(e) => datePicker(e, 'end')}
                />
            </div>
        </div>
    </div>

    <h2 class="pt-4 is-size-5 has-text-weight-bold">Was wurde {titleText} verkauft?</h2>
    {#if isLoading}
        <Loader bind:isLoading />
    {:else if requestError !== undefined}
        <article class="message is-danger">
            <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
        </article>
    {:else if soldItems.items !== undefined && soldItems.items.length > 0}
        <div class="columns">
            <div class="column">
                {#if selectedPeriod === 'yesterday'}
                    Datum:
                    {localFrom.toFormat('dd.MM.yyyy')}
                {:else}Zeitraum: {localFrom.toFormat('dd.MM.yyyy')} - {localTo.toFormat('dd.MM.yyyy')}{/if}
            </div>

            <br />

            <button
                text="CSV Export"
                class="is-primary is-pulled-right has-text-black background-none is-hidden-touch is-clickable"
                on:click={() => csvExport(soldItems)}
            >
                <Icon icon={mdiFileDownload} appbar={true} />
            </button>
        </div>

        <hr />

        <SoldItemsComp soldItems={soldItems.items} on:select={itemSelected} />

        <hr />
        <div class="vat-container">
            <table class="table">
                <tbody>
                    <tr>
                        <td>Netto</td>
                        <td class="has-text-weight-bold	has-text-right">
                            {moneyStyler(soldItems.grossAmount - soldItems.totalVat)}
                            €
                        </td>
                    </tr>
                    <tr>
                        <td>MwSt. Gesamt</td>
                        <td class="has-text-right">
                            <span class="has-text-weight-bold">{moneyStyler(soldItems.totalVat)} €</span>
                            <br />
                            <table class="small-table">
                                {#each soldItems.vatDetails as vat}
                                    <tr class="is-size-7">
                                        <td>{Math.floor(vat.vat * 100)}%</td>
                                        <td>{moneyStyler(vat.amount)}€</td>
                                    </tr>
                                {/each}
                            </table>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Brutto</td>
                        <td class="has-text-right has-text-weight-bold">{moneyStyler(soldItems.grossAmount)} €</td>
                    </tr>
                </tfoot>
            </table>
        </div>
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
            class="button is-link"
            size="full-width"
            icon={mdiArrowLeft}
        />
    </div>
</AuthorizeByRoles>
