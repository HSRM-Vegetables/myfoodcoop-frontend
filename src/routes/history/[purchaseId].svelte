<script context="module">
    let purchasId = -1;

    export async function preload({ params }) {
        purchasId = params.purchaseId;
    }
</script>

<script>
    import { onMount } from 'svelte';
    import HistoryDetails from '../../components/history/HistoryDetails.svelte';
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import Button from '../../components/common/Button.svelte';
    import { title, navBalance } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Einkaufshistorie';
    $navBalance = 'hidden';

    let purchase;
    onMount(async () => {
        purchase = await PurchaseApi.getPurchase(purchasId);
    });
</script>

{#if purchase !== undefined}
    <HistoryDetails purchase={purchase} />

    <div class="has-text-centered">
        <Button text="Zur Einkaufshistorie" href="/history" class="button is-primary" size="full-width" />
    </div>
{:else}<span>Loading...</span>{/if}
