<script>
    import { DateTime } from 'luxon';
    import { goto } from '@sapper/app'
    import Balance from '../../../scripts/balance/Balance';
    import ErrorModal from '../../common/ErrorModal.svelte';
    import Pagination from '../../pagination/Pagination.svelte';
    import ListItem from '../../common/ListItem.svelte';
    import { moneyStyler } from '../../../scripts/common/Helper';
    import CenteredLoader from '../../common/CenteredLoader.svelte';
    import AuthorizeByRoles, { Roles } from '../../common/AuthorizeByRoles.svelte';
    import MobileReloadButton from '../../common/MobileReloadButton.svelte';
    import Button from '../../common/Button.svelte';

    /**
     * Unique of id of the user
     */
    export let userId;

    let error;

    let currentPageIndex = 0;
    const pageSize = 10;
    let pageCount;

    let balanceHistoryItems = [];
    let isLoading = false;

    const periods = calcPeriods();
    let currentPeriod = periods.today;

    let { fromDate, toDate } = { ...currentPeriod };

    updateBalanceHistoryItems(fromDate, toDate);

    function calcPeriods() {
        const today = DateTime.local();

        const yesterday = today.minus({ days: 1 });

        const lastWeekSunday = today.minus({ days: today.weekday });
        const lastWeekMonday = lastWeekSunday.minus({ days: 6 });

        const lastMonthFirstDay = DateTime.local(today.year, today.month, 1).minus({ month: 1 });
        const lastMonthLastDay = lastMonthFirstDay.plus({ month: 1, days: -1 });

        return {
            today: {
                text: 'Heute',
                fromDate: today,
                toDate: today,
            },
            yesterday: {
                text: 'Gestern',
                fromDate: yesterday,
                toDate: yesterday,
            },
            lastWeek: {
                text: 'Letzte Woche',
                fromDate: lastWeekMonday,
                toDate: lastWeekSunday,
            },
            lastMonth: {
                text: 'Letzten Monat',
                fromDate: lastMonthFirstDay,
                toDate: lastMonthLastDay,
            },
        };
    }

    /**
     * Update the pagination details provided by the pagination component
     */
    function updatePaginationDetails(event) {
        currentPageIndex = event.detail.newPageIndex;

        updateBalanceHistoryItems(fromDate, toDate);
    }

    /**
     * Set a new period and load the respective items
     */
    function setPeriod(newPeriod) {
        currentPeriod = newPeriod;

        fromDate = currentPeriod.fromDate;
        toDate = currentPeriod.toDate;

        updateBalanceHistoryItems(fromDate, toDate);
    }

    /**
     * Show the balance history items for an arbitrary day range [fromDate, toDate]
     */
    async function updateBalanceHistoryItems(newFromDate, newToDate) {
        try {
            // Start loading indicator
            isLoading = true;

            // Calc offset and limit pagination params from current page index and page size
            const offset = currentPageIndex * pageSize;
            const limit = pageSize;

            // Query backend for balance history items within currently selected date range
            const response = await Balance.getHistory(userId, newFromDate, newToDate, offset, limit);

            // No error thrown -> Hide error message
            error = null;

            // Save balance history items
            balanceHistoryItems = response.balanceHistoryItems;

            // Calc and save total page count
            const totalItems = response.pagination.total;
            pageCount = Math.ceil(totalItems / pageSize);

            // Keep currently selected page, except when new data result in less pages, then switch to last page
            currentPageIndex = Math.min(currentPageIndex, pageCount);
        } catch (err) {
            // Show error message
            error = err;
        } finally {
            // Stop loading indicator
            isLoading = false;
        }
    }

    function sign(balanceChangeType) {
        if (balanceChangeType === 'TOPUP') {
            return '+';
        }

        if (balanceChangeType === 'SET') {
            return '';
        }

        return '-';
    }

    /**
     * Handle fromDate input change -> Save fromDate and load data if toDate is also set
     */
    async function onFromDateChanged(event) {
        fromDate = DateTime.fromJSDate(new Date(event.target.value));

        // Unset period badge when chosing arbitrary date range
        currentPeriod = null;

        // toDate missing-> Do nothing
        if (!toDate) {
            return;
        }

        // Both dates set -> Load data
        updateBalanceHistoryItems(fromDate, toDate);
    }

    /**
     * Handle toDate input change -> Save toDate and load data if fromDate is also set
     */
    async function onToDateChanged(event) {
        toDate = DateTime.fromJSDate(new Date(event.target.value));

        // Unset period badge when chosing arbitrary date range
        currentPeriod = null;

        // fromDate missing -> Do nothing
        if (!fromDate) {
            return;
        }

        // Both dates set -> Load data
        updateBalanceHistoryItems(fromDate, toDate);
    }

    async function handleListItemClick(balanceHistoryItem) {
        if (balanceHistoryItem.balanceChangeType !== 'PURCHASE') {
            return;
        }

        await goto(`history/${balanceHistoryItem.purchase.id}`)
    }
</script>

{#if error}
    <ErrorModal error={error} />
{/if}

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <!-- Reload Button in the upper right -->
    <MobileReloadButton on:click={() => updateBalanceHistoryItems(fromDate, toDate)} />

    <!-- Period buttons -->
    <div class="is-flex is-justify-content-center">
        {#each Object.values(periods) as period}
            <Button
                class="my-2 mx-2 is-rounded {period === currentPeriod ? 'is-dark' : ''}"
                text={period.text}
                on:click={() => setPeriod(period)}
            />
        {/each}
    </div>

    <!-- Date pickers -->
    <div class="columns py-4">
        <div class="column">
            <input
                type="date"
                class="input"
                value={fromDate.toFormat('yyyy-MM-dd')}
                max={DateTime.local().toFormat('yyyy-MM-dd')}
                on:change={(event) => onFromDateChanged(event)}
            />
        </div>
        <div class="column">
            <input
                type="date"
                class="input"
                value={toDate.toFormat('yyyy-MM-dd')}
                min={fromDate.toFormat('yyyy-MM-dd')}
                max={DateTime.local().toFormat('yyyy-MM-dd')}
                on:change={(event) => onToDateChanged(event)}
            />
        </div>
    </div>

    <CenteredLoader isLoading={isLoading} displayBackgroundWhileLoading={balanceHistoryItems.length > 0}>
        {#each balanceHistoryItems as balanceHistoryItem}
            <ListItem size="small" isClickable={balanceHistoryItem.balanceChangeType === 'PURCHASE'} on:click={() => handleListItemClick(balanceHistoryItem)}>
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

    <Pagination currentPageIndex={currentPageIndex} pageCount={pageCount} on:update={updatePaginationDetails} />
</AuthorizeByRoles>
