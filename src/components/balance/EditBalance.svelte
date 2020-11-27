<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/Balance';
    import ShowBalance from './ShowBalance.svelte';
    
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


<div>
    <ShowBalance bind:currentBalance />
    
    <div class="field has-addons">
        <div class="control is-expanded">
            <input type="number" class="input" bind:this={changeMoneyInput}/>
        </div>
        <div class="control">
            <button type="submit" class="button is-primary" on:click={changeBalance}>Guthaben anpassen</button><br>
        </div>
    </div>
    
    <div class="field has-addons">
        <div class="control is-expanded">
            <input type="number" class="input" bind:this={addMoneyInput}/>
        </div>
        <div class="control">
            <button type="submit" class="button is-primary" on:click={addToBalance}>Guthaben hinzufügen</button><br>
        </div>
    </div>
</div>
