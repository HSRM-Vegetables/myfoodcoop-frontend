<script>
   import { onMount } from 'svelte';
   import Balance from '../../scripts/Balance';
   import ShowBalance from './ShowBalance.svelte';
   
   let currentBalance = 0;
   let inputValue;
   let addMoneyInput;
   let balance;
   
   onMount(() => {
       balance = new Balance();
       currentBalance = balance.money;
   });
   
   function addToBalance() {
       // add money to balance
       balance.setBalance(balance.calcBalance(addMoneyInput.value));
       currentBalance = balance.money;
       addMoneyInput.value = '';
   }
   function updateInput() {
       inputValue = this.value;
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
      <div class="columns is-centered">
         <div class="column buttons pt-6">
            <button class="button is-rounded" value="20" on:click="{updateInput}">20 €</button>
            <button class="button is-rounded" value="50" on:click="{updateInput}">50 €</button>
            <button class="button is-rounded" value="100" on:click="{updateInput}">100 €</button>
         </div>
      </div>
      <input type="number" class="input" bind:this={addMoneyInput} value="{inputValue}" min="0"/>
      <button type="submit" class="button is-primary fix-button-width mt-3" on:click={addToBalance}>Guthaben hinzufügen</button><br>
      <a href="/adjust-balance" type="submit" class="button is-primary fix-button-width mt-3">Guthaben anpassen</a><br>
   </div>
</section>
<div class="container has-text-centered mt-6">
   <a href="/" type="submit" class="button is-primary ">Zur Hauptseite</a><br>
</div>
