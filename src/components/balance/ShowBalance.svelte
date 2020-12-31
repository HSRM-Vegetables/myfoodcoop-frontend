<script>
    import { moneyStyler } from '../../scripts/Helper';
    import { currentBalance } from '../../stores/balance';

    export let type = 'big'; // inline or big
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
            <span class:has-text-danger={$currentBalance < 0}>{moneyStyler($currentBalance)}€</span>
        </div>
    {:else}
        <span class:has-text-danger={$currentBalance < 0} class="is-size-1">{moneyStyler($currentBalance)}€</span>
    {/if}
</div>
