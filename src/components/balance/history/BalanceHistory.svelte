<script>
    import { DateTime } from 'luxon';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import Balance from '../../../scripts/balance/Balance';
    import ErrorModal from '../../common/ErrorModal.svelte';
    import Pagination from '../../pagination/Pagination.svelte';
    import ListItem from '../../common/ListItem.svelte';
    import { moneyStyler } from '../../../scripts/common/Helper';
    import { CalendarStyle } from '../../../scripts/CalendarStyle';

    /**
     * Unique of id of the user
     */
    export let userId;

    let requestError;

    let total = 0;
    let history = [];

    let fromDate;
    let toDate;
    // the selected start and end of the datepicker. Datepicker needs them as an array.
    // select the transactions from the last 3 months as the default
    const selectedDatePickerDates = [DateTime.local().minus({ months: 3 }), DateTime.local()];

    /**
     * Convert dates from Datepicker to dates from the api
     * @param from date the selection should start from
     * @param to date the selection should end
     */
    function convertDates(from, to) {
        fromDate = DateTime.fromJSDate(new Date(from)).toFormat('yyyy-MM-dd');
        toDate = DateTime.fromJSDate(new Date(to)).toFormat('yyyy-MM-dd');
    }

    async function updateHistory(e) {
        try {
            const response = await Balance.getHistory(userId, e.detail.offset, e.detail.limit, fromDate, toDate);
            total = response.pagination.total;

            history = response.balanceHistoryItems;
        } catch (error) {
            requestError = error;
        }
        return 10;
    }

    convertDates(selectedDatePickerDates[0], selectedDatePickerDates[1]);
</script>

<ErrorModal error={requestError} />

<div class="columns">
    <div class="column has-text-left"><span class="is-size-5 has-text-weight-bold">Guthaben-Historie:</span></div>
    <div class="column has-text-right">
        <DatePicker
            placeholder="Wähle einen Zeitraum"
            continueText="Bestätigen"
            format="DD.MM.YYYY"
            styling={new CalendarStyle()}
            range={true}
            end={new Date()}
            selected={selectedDatePickerDates}
            on:range-selected={(e) => convertDates(e.detail.from, e.detail.to)}
        />
    </div>
</div>
<Pagination limit={10} total={total} on:update={updateHistory}>
    {#each history as balanceEvent}
        <ListItem size="small">
            <div class="columns is-mobile">
                <div class="column has-text-left">
                    <span>{DateTime.fromISO(balanceEvent.createdOn).toFormat('dd.MM.yyyy HH:mm')}</span>
                </div>
                <div class="column has-text-centered"><span>{balanceEvent.balanceChangeType}</span></div>
                <div class="column has-text-right"><span>{moneyStyler(balanceEvent.amount)} €</span></div>
            </div>
        </ListItem>
    {/each}
</Pagination>
