<script>
    import { mdiArrowLeft } from '@mdi/js';
    import TextField from '../common/TextField.svelte';
    import Balance from '../../scripts/balance/Balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import { currentBalance } from '../../stores/balance';
    import { userId } from '../../stores/user';
    import { toastText } from '../../stores/toast';

    let changeMoneyInput;
    let balanceUpdateInProgress = false;
    let requestError;

    async function changeBalance() {
        balanceUpdateInProgress = true;

        try {
            // Instead of assigning the result to the store we could also call `currentBalance.forceUpdate()`.
            // But this is not necessary as the response of the api-call is returning the actual balance,
            // so we can just assign it to the store. This change will take immediate affect on all other components
            // that are using this store.

            // This variable is used in other files
            // eslint-disable-next-line no-unused-vars
            $currentBalance = await Balance.setBalanceForUser($userId, parseFloat(changeMoneyInput.getValue()));

            // eslint-disable-next-line no-unused-vars
            $toastText = 'Guthaben erfolgreich aktualisiert';
        } catch (error) {
            requestError = error;
        } finally {
            balanceUpdateInProgress = false;
        }
    }
</script>

<ErrorModal error={requestError} />
<div class="has-text-centered mt-3">
    <TextField
        bind:this={changeMoneyInput}
        type="number"
        placeholder="0"
        decoration="€"
        label="Neues Guthaben"
        on:enter={changeBalance}
        disabled={balanceUpdateInProgress}
    />

    <Button
        text="Guthaben anpassen"
        class="is-primary mt-5"
        on:click={changeBalance}
        isLoading={balanceUpdateInProgress}
        size="full-width"
    />
    <br />
    <Button href="/balance" text="Abbruch" class="is-danger mt-3" size="full-width" icon={mdiArrowLeft} />
    <br />
    <Button goHome={true} size="full-width" class="mt-6" />
</div>
