<script>
    import { onMount, beforeUpdate } from 'svelte';
    import { moneyStyler } from '../../scripts/Helper';
    import Balance from '../../scripts/Balance';

    export let currentBalance = 0;
    export let type = 'big'; // inline or big

    const balance = new Balance();
    let mounted = false;

    async function loadBalance() {
        currentBalance = await balance.getBalance();
    }

    onMount(() => {
        mounted = true;

        loadBalance();
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
