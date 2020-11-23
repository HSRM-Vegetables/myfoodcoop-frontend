<script>
    import { onMount } from 'svelte';
    import Balance from '../../scipts/Balance';
    
    let currentBalance = 0;
    let changeMoneyInput;
    let addMoneyInput;
    let balance;
    
    onMount(() => {
        balance = new Balance();
        currentBalance = balance.money;
    });
    
    function changeBalance() {
        // create new value for Balance
        balance.setBalance(changeMoneyInput.value);
        currentBalance = balance.money;
    }
    
    function addToBalance() {
        // add money to balance
        balance.setBalance(balance.calcBalance(addMoneyInput.value));
        currentBalance = balance.money;
        addMoneyInput.value = '';
    }
</script>
    <span> Guthaben: {currentBalance}€</span>
<div>
    <input type="number" class="input" bind:this={changeMoneyInput}/>
    <button type="submit" class="button is-primary" on:click={changeBalance}>Guthaben anpassen</button><br>
    
    <input type="number" class="input" bind:this={addMoneyInput}/>
    <button type="submit" class="button is-primary" on:click={addToBalance}>Guthaben hinzufügen</button><br>
    
    
</div>
