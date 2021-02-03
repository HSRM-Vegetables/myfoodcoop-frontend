<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/balance/Balance';
    import { moneyStyler } from '../../scripts/common/Helper';
    import ErrorModal from '../common/ErrorModal.svelte';

    /**
     * The ID of the user whose current balance is to be displayed
     */
    export let userId;

    let balance;
    let isLoading;
    let requestError;

    onMount(async () => {
        try {
            isLoading = true;
            balance = await Balance.getBalanceForUser(userId);
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    });
</script>

<div class="columns is-mobile">
    <div class="column is-size-5 has-text-weight-bold">Aktuelles Guthaben:</div>
    <div class="column has-text-right">
        {#if isLoading}Wird geladen...{:else if balance !== undefined}{moneyStyler(balance)} €{/if}
    </div>
</div>

<ErrorModal error={requestError} />
