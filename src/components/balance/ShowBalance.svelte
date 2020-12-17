<script>
    import { onMount, beforeUpdate } from 'svelte';
    import { moneyStyler } from '../../scripts/Helper';
    import Balance from '../../scripts/Balance';
    import ErrorModal from '../common/ErrorModal.svelte';

    export let currentBalance = 0;
    export let type = 'big'; // inline or big

    const balance = new Balance();
    let mounted = false;
    let balanceIsLoading = false;
    let requestError;

    async function loadBalance() {
        balanceIsLoading = true;
        try {
            currentBalance = await balance.getBalance();
        } catch (error) {
            requestError = error;
        } finally {
            balanceIsLoading = false;
        }
    }

    onMount(() => {
        mounted = true;

        loadBalance();
    });
    
    beforeUpdate(() => {
        if (!mounted) {
            return;
        }

        // Style the currentBalance when this component updates
        currentBalance = moneyStyler(currentBalance);
    });
</script>

<style>
    .inline-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
</style>

<div>
    {#if balanceIsLoading === true}
        <span>Guthaben wird geladen...</span>
    {:else}
        {#if type === 'inline'}
            <div class="inline-container">
                <span>Guthaben:</span>
                <span class:has-text-danger={currentBalance < 0}>{currentBalance}€</span>
            </div>
        {:else}
            <span class:has-text-danger={currentBalance < 0} class="is-size-1">{currentBalance}€</span>
        {/if}
    {/if}
    <ErrorModal error={requestError} />
</div>
