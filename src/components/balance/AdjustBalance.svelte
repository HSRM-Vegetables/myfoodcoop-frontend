<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/Balance';
    import ShowBalance from './ShowBalance.svelte';
    
    let changeMoneyInput;
    let balance = {
        money: 0,
    };
    onMount(() => {
        balance = new Balance();
    });
    
    function changeBalance() {
        // create new value for Balance
        balance.setBalance(changeMoneyInput.value);
    }
    
    function onEnterPress(event) {
        if (event.key === 'Enter') {
            changeBalance();
            window.location.href = '/balance';
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
</style>
<section class="section">
    <div class="has-text-centered">
        <ShowBalance bind:currentBalance="{balance.money}" />
        <div class="mt-6">
            <div class="has-text-left pb-2">Neues Guthaben</div>
            <div class=" is-relative">
                <input type="number" class="input balance-input" bind:this={changeMoneyInput} placeholder="0" on:keydown="{onEnterPress}" />  
                <span class="balance-input-deco">€</span>
            </div>
        </div>
        <a href="/balance"  type="submit" class="button is-primary fix-button-width mt-3" on:click={changeBalance}>Guthaben anpassen</a><br>
        <a href="/balance" type="submit" class="button is-danger fix-button-width mt-3">Abbruch</a><br>
    </div>
</section>
<div class="container has-text-centered mt-6">
    <a href="/" type="submit" class="button is-primary">Zur Hauptseite</a><br>
</div>
