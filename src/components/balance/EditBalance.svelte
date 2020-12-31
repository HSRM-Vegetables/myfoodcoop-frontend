<script>
    import Balance from '../../scripts/Balance';
    import { currentBalance } from '../../stores/balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import TextField from '../common/TextField.svelte';
    import ShowBalance from './ShowBalance.svelte';

    let addMoneyInput;
    let valueHint = '';
    let inputValue;
    let requestError;

    let balanceUpdateInProgress = false;

    async function addToBalance() {
        const additionalAmount = addMoneyInput.getValue();

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
            $currentBalance = await Balance.topupBalance(parseFloat(additionalAmount));

            inputValue = undefined;
        } catch (error) {
            requestError = error;
        } finally {
            balanceUpdateInProgress = false;
        }
    }

    function updateInput() {
        inputValue = this.value;
    }

    function onEnterPress(event) {
        if (event.key === 'Enter') {
            addToBalance();
        }
    }
</script>

<style>
    .help {
        color: #f14668;
    }
</style>

<section class="section">
    <div class="container has-text-centered">
        <ShowBalance />
        <div class="columns is-centered">
            <div class="column buttons pt-6">
                <button class="button is-rounded" value="20" on:click={updateInput}>20 €</button>
                <button class="button is-rounded" value="50" on:click={updateInput}>50 €</button>
                <button class="button is-rounded" value="100" on:click={updateInput}>100 €</button>
            </div>
        </div>
        <div class="mt-6">
            <div class=" is-relative">
                <TextField
                    label="Guthaben"
                    decoration="€"
                    bind:this={addMoneyInput}
                    type="number"
                    placeholder="0"
                    minimum="0"
                    on:keydown={onEnterPress}
                    value={inputValue}
                    disabled={balanceUpdateInProgress}
                />
                <span class="help has-text-left">{valueHint}</span>
            </div>
        </div>

        <Button
            text="Guthaben hinzufügen"
            class="is-primary mt-3"
            size="medium"
            on:click={addToBalance}
            isLoading={balanceUpdateInProgress}
        />
        <br />
        <Button href="/adjust-balance" text="Guthaben anpassen" class="is-primary mt-3" size="medium" />
        <br />
    </div>

    <ErrorModal error={requestError} />
</section>

<div class="container has-text-centered mt-6">
    <Button href="/" text="Zur Hauptseite" class="is-link" size="medium" />
</div>
