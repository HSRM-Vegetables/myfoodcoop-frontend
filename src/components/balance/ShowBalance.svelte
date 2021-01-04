<script>
    import { moneyStyler } from '../../scripts/Helper';
    import { currentBalance } from '../../stores/balance';

    export let type = 'big'; // inline or big
</script>

<div>
    {#if type === 'inline'}
        <span>Guthaben:</span>
        <span class:has-text-danger={$currentBalance < 0}>{moneyStyler($currentBalance)}€</span>
    {:else}<span class:has-text-danger={$currentBalance < 0}>{moneyStyler($currentBalance)}€</span>{/if}
</div>
