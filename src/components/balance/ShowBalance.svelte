<script>
    import { onMount } from 'svelte';
    import Balance from '../../scripts/Balance';

    export let currentBalance = 0;

    onMount(() => {
        const balance = new Balance();
        currentBalance = balance.money;
    });
</script>
<div>
    <span class="is-size-1">{currentBalance}€</span>
</div>
