<script>
    import { createEventDispatcher } from 'svelte';
    import ListItem from '../common/ListItem.svelte';
    import { moneyStyler } from '../../scripts/common/Helper';
    import Pagination from '../pagination/Pagination.svelte';

    /**
     * A list of users and their balances
     */
    export let userBalanceList;

    const selectEvent = createEventDispatcher();

    let currentPage = 0;
    const pageSize = 10;
    let pageCount;
    let offset;

    // Update page count when item list changes
    // Also, currentPage might be forced to last page (but at least page 0) if item list shrinks
    $: {
        userBalanceList;
        pageCount = Math.ceil(userBalanceList.length / pageSize);
        currentPage = Math.min(currentPage, Math.max(pageCount - 1, 0));
        offset = currentPage * pageSize;
    }

    /**
     * Called when user selected new page in pagination bar
     */
    function onPageChanged(event) {
        currentPage = event.detail.newPageIndex;
        offset = currentPage * pageSize;
    }
</script>

{#if userBalanceList}
    <div class="columns is-mobile">
        <div class="column has-text-weight-bold">Benutzername</div>
        <div class="column has-text-weight-bold has-text-right">aktuelles Guthaben</div>
    </div>
    {#each userBalanceList.sort((a, b) => a.balance - b.balance).slice(offset, offset + pageSize) as user}
        <ListItem
            isClickable={true}
            highlight={user.balance < 0}
            on:click={() => selectEvent('select', { id: user.id })}
        >
            <div class="columns is-mobile is-clickable">
                <div class="column is-three-quarters item_name">{user.username}</div>
                <div class="column has-text-right">{moneyStyler(user.balance)} €</div>
            </div>
        </ListItem>
    {/each}

    <Pagination currentPageIndex={currentPage} pageCount={pageCount} on:update={onPageChanged} />
{/if}
