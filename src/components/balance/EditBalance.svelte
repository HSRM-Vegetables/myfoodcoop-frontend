<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/Balance';
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
        if (addMoneyInput.value < 0) {
            inputValue = null;
            error = 'Bitte geben Sie ein positven Wert ein';
        } else {
            error = '';
            balance.setBalance(balance.calcBalance(addMoneyInput.value));
            balance = balance;
            inputValue = null;
    
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
    .fix-button-width{
    width: 230px;
    }
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
        <ShowBalance bind:currentBalance="{balance.money}" />
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
                <input type="number" class="input balance-input" bind:this={addMoneyInput} value="{inputValue}" placeholder="0" min="0" on:keydown="{onEnterPress}" />  
                <span class="balance-input-deco">€</span>
                <span class="help has-text-left">{error}</span>
            </div>
        </div>
        <button type="submit" class="button is-primary fix-button-width mt-3" on:click="{addToBalance}">Guthaben hinzufügen</button><br>
        <a href="/adjust-balance" type="submit" class="button is-primary fix-button-width mt-3">Guthaben anpassen</a><br>
    </div>
</section>
<div class="container has-text-centered mt-6">
    <a href="/" type="submit" class="button is-primary ">Zur Hauptseite</a><br>
</div>
