<script>
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Button from '../../../components/common/Button.svelte';
    import SoldItemsComp from '../../../components/reports/SoldItems.svelte';
    import SoldItems from '../../../scripts/reports/SoldItems';
    import { dateToYYYYMMDD } from '../../../scripts/Helper';

    let requestError;
    let soldItems;
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
            'yesterday': {
                'fromDate': dateToYYYYMMDD(yesterday),
                'toDate': dateToYYYYMMDD(yesterday)
            },
            'lastWeek': {
                'fromDate': dateToYYYYMMDD(lastMonday),
                'toDate': dateToYYYYMMDD(lastSunday)
            },
            'lastMonth': {
                'fromDate': dateToYYYYMMDD(lastMonthFirst),
                'toDate': dateToYYYYMMDD(lastMonthLast)
            }
        }
    }

    async function loadItems(period) {
        try {
            soldItems = await SoldItems.getItems(periods[period].fromDate, periods[period].toDate);
        } catch (error) {
            requestError = error;
        }
    }

    loadItems('yesterday');
</script>

<h1 class="title mb-5">Was wurde in den letzten x Tagen verkauft?</h1>

<div class="has-text-centered">
    <Button text="Gestern" on:click={() => loadItems('yesterday')}/>
    <Button class="mx-2" text="Letzte Woche" on:click={() => loadItems('lastWeek')}/>
    <Button text="Letzter Monat" on:click={() => loadItems('lastMonth')}/>
</div>

{#if requestError !== undefined}
    <article class="message is-danger">
        <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
    </article>
{:else}
    <SoldItemsComp soldItems={soldItems}/>
{/if}

<ErrorModal error={requestError} />

<div class="has-text-centered"><a href="/reports/" class="button is-link container">Zurück</a></div>