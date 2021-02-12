<script>
    import { DateTime } from 'luxon';
    import Balance from '../../../scripts/balance/Balance';
    import ErrorModal from '../../common/ErrorModal.svelte';
    import Pagination from '../../pagination/Pagination.svelte';
    import ListItem from '../../common/ListItem.svelte';
    import { moneyStyler } from '../../../scripts/common/Helper';
    import CenteredLoader from '../../common/CenteredLoader.svelte';

    /**
     * Unique of id of the user
     */
    export let userId;

    let requestError;

    let currentPageIndex = 0;
    const pageSize = 10;
    let pageCount;

    let balanceHistoryItems = [];
    let isLoading = false;

    let fromDate;
    let toDate;

    // the selected start and end of the datepicker. Datepicker needs them as an array.
    // select the balance history items from the last 3 months as the default
    const selectedDatePickerDates = [DateTime.local().minus({ months: 3 }), DateTime.local()];

    /**
     * Convert dates from Datepicker to dates from the api
     * @param from date the selection should start from
     * @param to date the selection should end
     */
    function convertDates(from, to) {
        fromDate = DateTime.fromJSDate(new Date(from)).toFormat('yyyy-MM-dd');
        toDate = DateTime.fromJSDate(new Date(to)).toFormat('yyyy-MM-dd');

        updateHistory();
    }

    /**
     * Update the pagination details provided by the pagination component
     * @param e the event
     */
    function updatePaginationDetails(e) {
        offset = e.detail.newPageIndex * pageSize;

        updateHistory();
    }

    /**
     * Updates the history items, given the userId, offset, limit, from and to date
     */
    async function updateHistory() {
        try {
            isLoading = true;

            const offset = currentPageIndex * pageSize;
            const limit = pageSize;

            const response = await Balance.getHistory(userId, fromDate, toDate, offset, limit);

            balanceHistoryItems = response.balanceHistoryItems;
            const totalItems = response.pagination.total;

            pageCount = totalItems / pageSize;
            currentPageIndex = Math.min(currentPageIndex, pageCount);

        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    }

    // load the dates and convert them for api calls
    convertDates(selectedDatePickerDates[0], selectedDatePickerDates[1]);

    function sign(balanceChangeType) {
        if (balanceChangeType === 'TOPUP') {
            return '+';
        }

        if (balanceChangeType === 'SET') {
            return '';
        }

        return '-';
    }

async function datePicker(dateInfo, text) {
    if (text === 'start') {
        localFrom = DateTime.fromJSDate(new Date(dateInfo.target.value));
    }

    if (text === 'end') {
        localTo = DateTime.fromJSDate(new Date(dateInfo.target.value));
    }

    if (!localFrom || !localTo) {
        return;
    }

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
</script>

<ErrorModal error={requestError} />

<div class="columns">
    <div class="column has-text-center">

        <div class="pt-4 pb-4 columns">
            <div class="column">
                <input
                    type="date"
                    class="input"
                />
            </div>
            <div class="column">
                <input
                    type="date"
                    class="input"
                />
            </div>
        </div>
        
    </div>
</div>

<CenteredLoader isLoading={isLoading} displayBackgroundWhileLoading={balanceHistoryItems.length > 0}>
    {#each balanceHistoryItems as balanceHistoryItem}
        <ListItem size="small">
            <div class="columns is-mobile">
                <div class="column has-text-left">
                    <span>{DateTime.fromISO(balanceHistoryItem.createdOn).toFormat('dd.MM.yyyy HH:mm')}</span>
                </div>
                <div class="column has-text-centered"><span>{balanceHistoryItem.balanceChangeType}</span></div>
                <div class="column has-text-right">
                    <span>
                        {sign(balanceHistoryItem.balanceChangeType)}
                        {moneyStyler(balanceHistoryItem.amount)}
                        €
                    </span>
                </div>
            </div>
        </ListItem>
    {/each}
</CenteredLoader>

<Pagination currentPageIndex={currentPageIndex} pageCount={pageCount} isLoading={isLoading} on:update={updatePaginationDetails} />
