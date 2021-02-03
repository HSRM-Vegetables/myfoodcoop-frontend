<script>
    import { DateTime } from 'luxon';
    import Balance from '../../../scripts/balance/Balance';
    import ErrorModal from '../../common/ErrorModal.svelte';
    import Pagination from '../../pagination/Pagination.svelte';
    import ListItem from '../../common/ListItem.svelte';
    import { moneyStyler } from '../../../scripts/common/Helper';

    /**
     * Unique of id of the user
     */
    export let userId;

    let requestError;

    let total = 0;
    let history = [];

    async function updateHistory(e) {
        try {
            const response = await Balance.getHistory(userId, e.detail.offset, e.detail.limit);
            total = response.pagination.total;

            history = response.balanceHistoryItems;
        } catch (error) {
            requestError = error;
        }
        return 10;
    }
</script>

<ErrorModal error={requestError} />

<span class="is-size-5 has-text-weight-bold">Guthaben-Historie</span>
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
