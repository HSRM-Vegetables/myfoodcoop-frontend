<script>
   import { onMount } from 'svelte';
   import Balance from '../../scripts/Balance';
   
   export let currentBalance = 0;
   export let type = 'big'; // inline or big
   let textCssClasses = '';
   let bigTextCssClasses = 'is-size-1';

   onMount(() => {
       const balance = new Balance();
       currentBalance = balance.money;
       if (currentBalance < 0) {
           textCssClasses += ' has-text-danger';
           bigTextCssClasses += ' has-text-danger';
       }
   });
</script>

<style>
   .inline-container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
   }
</style>

<div>

   {#if type === 'inline'}
      <div class="inline-container">
         <span>Guthaben:</span>
         <span class={textCssClasses}>{currentBalance}€</span>
      </div>
   {:else}
      <span class={bigTextCssClasses}>{currentBalance}€</span>
   {/if}

</div>
