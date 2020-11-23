<script>
    import { onMount } from 'svelte';
    import LocalStorageKeys from '../../scipts/LocalStorageKeys';

    let currentBalance = NaN;
    
    onMount(() => {
        const currentBalanceString = window.localStorage.getItem(LocalStorageKeys.BALANCE);
        if(currentBalanceString == null || currentBalanceString == "NaN"){
            currentBalance=0;
            window.localStorage.setItem(LocalStorageKeys.BALANCE, 0);
        } else {
            currentBalance = parseFloat(currentBalanceString);
            currentBalance = currentBalance.toFixed(2);               
        }
    });
    function changeBalance() {
        //get new Balance
        let money = document.getElementById("changeMoney").value;
        money= money.replace(",",".");
        money = parseFloat(money);
        money = money.toFixed(2);
        window.localStorage.setItem(LocalStorageKeys.BALANCE, money);
        currentBalance = money;
    }
    function addToBalance() {
        //get new Balance
        let money = document.getElementById("addMoney").value;
        money= money.replace(",",".");
        let addTo = window.localStorage.getItem(LocalStorageKeys.BALANCE);
        money = parseFloat(money);
        money = money.toFixed(2);
        let sum = +money+ +addTo;
        sum = sum.toFixed(2);


        window.localStorage.setItem(LocalStorageKeys.BALANCE, sum);
        currentBalance = sum;
        document.getElementById("addMoney").value ="";
    }
</script>

<div>
    <span> Guthaben: {currentBalance}€</span><br>
    <input type="text" id="changeMoney"/>
    <button type="submit" on:click={changeBalance}>Guthaben anpassen</button><br>
    
    
    <input type="text" id="addMoney"/>
    <button type="submit" on:click={addToBalance}>Guthaben hinzufügen</button><br>
    
    
</div>
