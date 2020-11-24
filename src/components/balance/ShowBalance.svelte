<script>
    import { onMount } from 'svelte';
    import Balance from '../../scipts/Balance';

    export let currentBalance = 0;

    onMount(() => {
        const balance = new Balance();
        currentBalance = balance.money;
    });
</script>

<div>
    <span> Guthaben: {currentBalance}€</span>
</div>
