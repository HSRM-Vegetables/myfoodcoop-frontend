<script>
   import { onMount, beforeUpdate } from 'svelte';
   import Balance from '../../scripts/Balance';
   import { moneyStyler } from '../../scripts/Helper';
   
   export let currentBalance; // if not externally bound, component uses localStorage value
   export let type = 'big'; // inline or big

   let mounted = false;

   onMount(() => {
       mounted = true;

       // don't override externally bound value
       if (currentBalance === null || currentBalance === undefined) {
           const balance = new Balance();
           currentBalance = balance.money;
       }
   });
   
   beforeUpdate(() => {
       if (!mounted) {
           return;
       }

       // Style the currentBalance when this component updates
       currentBalance = moneyStyler(currentBalance);
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
         <span class:has-text-danger={currentBalance < 0}>{currentBalance}€</span>
      </div>
   {:else}
      <span class:has-text-danger={currentBalance < 0} class="is-size-1">{currentBalance}€</span>
   {/if}

</div>
