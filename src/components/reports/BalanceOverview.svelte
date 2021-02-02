<script>
    import { createEventDispatcher } from 'svelte';
    import ListItem from '../common/ListItem.svelte';
    import { moneyStyler } from '../../scripts/common/Helper';

    /**
     * A list of users and their balances
     */
    export let userBalanceList;

    const selectEvent = createEventDispatcher();
</script>

{#if userBalanceList}
    <div class="columns is-mobile">
        <div class="column has-text-weight-bold">Benutzername</div>
        <div class="column has-text-weight-bold has-text-right">aktuelles Guthaben</div>
    </div>
    {#each userBalanceList.sort((a, b) => a.balance - b.balance) as user}
        <ListItem isClickable={true} highlight={user.balance < 0} on:click={selectEvent('select', { id: user.id })}>
            <div class="columns is-mobile is-clickable">
                <div class="column is-three-quarters item_name">{user.username}</div>
                <div class="column has-text-right">{moneyStyler(user.balance)} €</div>
            </div>
        </ListItem>
    {/each}
{/if}
