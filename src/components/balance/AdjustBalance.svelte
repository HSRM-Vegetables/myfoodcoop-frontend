<script>
    import { onMount } from 'svelte';
    import TextField from '../common/TextField.svelte';
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
        balance.setBalance(changeMoneyInput.getValue());
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
</style>
<section class="section">
    <div class="has-text-centered">
        <ShowBalance bind:currentBalance="{balance.money}" />
        <TextField bind:this={changeMoneyInput} type="number" placeholder="0" decoration="€" label="Neues Guthaben" onKeyDown={onEnterPress}/>
        <a href="/balance"  type="submit" class="button is-primary fix-button-width mt-3" on:click={changeBalance}>Guthaben anpassen</a><br>
        <a href="/balance" type="submit" class="button is-danger fix-button-width mt-3">Abbruch</a><br>
    </div>
</section>
<div class="container has-text-centered mt-6">
    <a href="/" type="submit" class="button is-primary">Zur Hauptseite</a><br>
</div>
