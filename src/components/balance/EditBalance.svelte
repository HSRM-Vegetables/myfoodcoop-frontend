<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/Balance';
    import TextField from '../common/TextField.svelte';
    import ShowBalance from './ShowBalance.svelte';
    
    let inputValue;
    let addMoneyInput;
    let error = '';
    
    let balance = {
        money: 0,
    };
    
    onMount(() => {
        balance = new Balance();
    });
    
    function addToBalance() {
        const additionalAmount = addMoneyInput.getValue();

        if (additionalAmount <= 0) {
            inputValue = 0;
            error = 'Bitte geben Sie ein positven Wert ein';
        } else {
            error = '';
            balance.setBalance(balance.calcBalance(additionalAmount));
            balance = balance;
            inputValue = 0;
        }
        addMoneyInput.clear();
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
    .fix-button-width{
        width: 230px;
    }

    .help{
        color: #f14668;
    }
</style>
<section class="section">
    <div class="container has-text-centered">
        <ShowBalance bind:currentBalance="{balance.money}" />
        <div class="columns is-centered">
            <div class="column buttons pt-6">
                <button class="button is-rounded" value="20" on:click="{updateInput}">20 €</button>
                <button class="button is-rounded" value="50" on:click="{updateInput}">50 €</button>
                <button class="button is-rounded" value="100" on:click="{updateInput}">100 €</button>
            </div>
        </div>
        <div class="mt-6">
            <div class=" is-relative">
                <TextField label="Guthaben" decoration="€" bind:this={addMoneyInput} type="number" placeholder="0" minimum="0" onKeyDown={onEnterPress} value={inputValue} />
                <span class="help has-text-left">{error}</span>
            </div>
        </div>
        <button type="submit" class="button is-primary fix-button-width mt-3" on:click="{addToBalance}">Guthaben hinzufügen</button><br>
        <a href="/adjust-balance" type="submit" class="button is-primary fix-button-width mt-3">Guthaben anpassen</a><br>
    </div>
</section>
<div class="container has-text-centered mt-6">
    <a href="/" type="submit" class="button is-primary is-link">Zur Hauptseite</a><br>
</div>
