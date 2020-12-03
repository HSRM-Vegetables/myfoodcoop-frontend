<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/Balance';

    export let currentBalance = 0;

    onMount(() => {
        const balance = new Balance();
        currentBalance = balance.money;
    });
</script>
<style>
    .balance{
        font-size: 3em;
    }
</style>
<div>
    <span class="balance">{currentBalance}€</span>
</div>
