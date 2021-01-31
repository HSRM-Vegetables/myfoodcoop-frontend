<script>
    import { createEventDispatcher } from 'svelte';

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
        <div class="columns is-mobile is-clickable" on:click={selectEvent('select', { id: user.id })}>
            <div class="column is-three-quarters item_name">{user.username}</div>
            <div class="column has-text-right">{user.balance}</div>
        </div>
    {/each}
{/if}
