<script>
   import { onMount } from 'svelte';
   import Balance from '../../scripts/Balance';
   
   export let currentBalance = 0;
   export let type = 'big'; // inline or big

   onMount(() => {
       const balance = new Balance();
       currentBalance = balance.money;
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

   {#if type === "inline"}
      <div class="inline-container">
         <span>Guthaben:</span>
         <span>{currentBalance}€</span>
      </div>
   {:else}
      <span class="is-size-1">{currentBalance}€</span>
   {/if}

</div>
