<script>
    import Balance from '../../scripts/Balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import ShowBalance from './ShowBalance.svelte';
    
    let addMoneyInput;
    let valueHint = '';
    let requestError;

    const balance = new Balance();
    let blanceUpdateInProgress = false;

    async function addToBalance() {
        if (addMoneyInput.value < 0) {
            addMoneyInput.value = null;
            valueHint = 'Bitte geben Sie ein positven Wert ein';
        } else {
            valueHint = '';

            blanceUpdateInProgress = true;
            try {
                balance.currentBalance = await balance.topupBalance(addMoneyInput.value);

                addMoneyInput.value = null;
            } catch (error) {
                requestError = error;
            } finally {
                blanceUpdateInProgress = false;
            }
        }
    }
    
    function updateInput() {
        addMoneyInput.value = this.value;
    }
    
    function onEnterPress(event) {
        if (event.key === 'Enter') {
            addToBalance();
        }
    }
</script>

<style>
    .balance-input-deco{
        position: absolute;
        font-size: 1rem;
        color: #ccc6c6;
        right: 30px;
        top: 8px;
    }
    .help{
        color: #f14668;
    }
</style>

<section class="section">
    <div class="container has-text-centered">
        <ShowBalance bind:currentBalance={balance.currentBalance} />
        <div class="columns is-centered">
            <div class="column buttons pt-6">
                <button class="button is-rounded" value="20" on:click="{updateInput}">20 €</button>
                <button class="button is-rounded" value="50" on:click="{updateInput}">50 €</button>
                <button class="button is-rounded" value="100" on:click="{updateInput}">100 €</button>
            </div>
        </div>
        <div class="mt-6">
            <div class="has-text-left pb-2">Guthaben</div>
            <div class=" is-relative">
                <input type="number" class="input balance-input" bind:this={addMoneyInput} placeholder="0" min="0" on:keydown="{onEnterPress}" />  
                <span class="balance-input-deco">€</span>
                <span class="help has-text-left">{valueHint}</span>
            </div>
        </div>

        <Button text="Guthaben hinzufügen" class="is-primary mt-3" size="medium" on:click={addToBalance} isLoading={blanceUpdateInProgress} />
        <br />
        <Button href="/adjust-balance" text="Guthaben anpassen" class="is-primary mt-3" size="medium" />
        <br />
    </div>

    <ErrorModal error={requestError} />
</section>

<div class="container has-text-centered mt-6">
    <Button href="/" text="Zur Hauptseite" class="is-link" size="medium" />
</div>
