<script>
    import Balance from '../../scripts/Balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import TextField from '../common/TextField.svelte';
    import ShowBalance from './ShowBalance.svelte';

    let addMoneyInput;
    let valueHint = '';
    let inputValue;
    let requestError;

    const balance = new Balance();
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
            balance.currentBalance = await balance.topupBalance(parseFloat(additionalAmount));

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
        <ShowBalance bind:currentBalance={balance.currentBalance} />
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
