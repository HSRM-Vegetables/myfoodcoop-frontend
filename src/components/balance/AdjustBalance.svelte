<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/Balance';
    import ShowBalance from './ShowBalance.svelte';
    
    let currentBalance = 0;
    let changeMoneyInput;
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
</script>

<style>
    .fix-button-width{
        width: 230px;
    }
</style>
  <section class="section">
    <div class="container has-text-centered">
         <ShowBalance bind:currentBalance />
         <!-- Add Mony buttons-->

         <input type="number" class="input mt-6" bind:this={changeMoneyInput}/>
         
        <a href="/balance"  type="submit" class="button is-primary fix-button-width mt-3" on:click={changeBalance}>Guthaben anpassen</a><br>
        <a href="/balance" type="submit" class="button is-danger fix-button-width mt-3">Abbruch</a><br>

    </div>
  </section>  
<div class="container has-text-centered mt-6">
    <a href="/" type="submit" class="button is-primary">Zur Hauptseite</a><br>
</div>
