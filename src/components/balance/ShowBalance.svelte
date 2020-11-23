<script>
    import { onMount } from 'svelte';
    import LocalStorageKeys from '../../scipts/LocalStorageKeys';

    let currentBalance = NaN;

    onMount(() => {
        const currentBalanceString = window.localStorage.getItem(LocalStorageKeys.BALANCE);
        currentBalance = parseFloat(currentBalanceString);
        currentBalance = currentBalance.toFixed(2);
    });
</script>

<div>
    <span>Guthaben: {currentBalance}€</span>
</div>
