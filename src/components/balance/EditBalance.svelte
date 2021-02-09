<script>
    import Balance from '../../scripts/balance/Balance';
    import { currentBalance } from '../../stores/balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import TextField from '../common/TextField.svelte';
    import { userId } from '../../stores/user';
    import { toastText } from '../../stores/toast';

    let addMoneyInput;
    let valueHint = '';
    let inputValue;
    let requestError;

    let balanceUpdateInProgress = false;

    async function addToBalance() {
        const additionalAmount = addMoneyInput.getValue();
        if (additionalAmount === '') {
            valueHint = 'Bitte geben Sie ein Wert ein';
            return;
        }
        if (additionalAmount < 0) {
            valueHint = 'Bitte geben Sie ein positven Wert ein';
            return;
        }

        valueHint = '';
        balanceUpdateInProgress = true;
        try {
            // Instead of assigning the result to the store we could also call `currentBalance.forceUpdate()`.
            // But this is not necessary as the response of the api-call is returning the actual balance,
            // so we can just assign it to the store. This change will take immediate affect on all other components
            // that are using this store.

            // This variable is used in other files
            // eslint-disable-next-line no-unused-vars
            $currentBalance = await Balance.topupBalanceForUser($userId, parseFloat(additionalAmount));

            // eslint-disable-next-line no-unused-vars
            $toastText = 'Guthaben erfolgreich aktualisiert';

            inputValue = undefined;
            addMoneyInput.clear();
        } catch (error) {
            requestError = error;
        } finally {
            balanceUpdateInProgress = false;
        }
    }

    function updateInput() {
        inputValue = this.value;
    }
</script>

<style>
    .help {
        color: #f14668;
    }
</style>

<div class="container has-text-centered">
    <div class="columns is-centered">
        <div class="column buttons pt-6">
            <button class="button is-rounded" value="20" on:click={updateInput}>20 €</button>
            <button class="button is-rounded" value="50" on:click={updateInput}>50 €</button>
            <button class="button is-rounded" value="100" on:click={updateInput}>100 €</button>
        </div>
    </div>
    <div class=" is-relative">
        <TextField
            label="Guthaben hinzufügen"
            decoration="€"
            bind:this={addMoneyInput}
            type="number"
            placeholder="0"
            minimum="0"
            on:enter={addToBalance}
            value={inputValue}
            disabled={balanceUpdateInProgress}
        />
        <span class="help has-text-left">{valueHint}</span>
    </div>

    <Button
        text="Guthaben hinzufügen"
        class="is-primary mt-3"
        size="full-width"
        on:click={addToBalance}
        isLoading={balanceUpdateInProgress}
    />
    <hr />
    <Button href="/balance/adjust" text="Guthaben anpassen" class="is-link mt-5" size="full-width" />
    <Button goHome={true} size="full-width" class="mt-3" />
</div>

<ErrorModal error={requestError} />
