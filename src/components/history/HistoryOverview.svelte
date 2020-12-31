<script>
    import { onMount } from 'svelte';
    import { mdiMagnify } from '@mdi/js';
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import Icon from '../common/Icon.svelte';
    import { moneyStyler } from '../../scripts/Helper';

    let purchaseList;
    onMount(async () => {
        purchaseList = await PurchaseApi.getPurchaseList();
    });
</script>

<style>
    .columns {
        border-bottom: solid 1px whitesmoke;
    }
</style>

{#if purchaseList !== undefined && purchaseList.purchases.length > 0}
    <div class="columns has-text-weight-bold is-mobile is-vcentered">
        <div class="column">Datum</div>
        <div class="column has-text-centered">Anzahl Artikel</div>
        <div class="column">Preis</div>
        <div class="column">Details</div>
    </div>
    {#each purchaseList.purchases.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)) as purchase}
        <div class="columns is-mobile">
            <div class="column">{(new Date(purchase.createdOn)).toLocaleString()}</div>
            <div class="column has-text-centered">{purchase.items.length}</div>
            <div class="column">{moneyStyler(purchase.totalPrice)}€</div>
            <div class="column">
                <a href="/history/{purchase.id}" class="button is-small is-primary">
                    <span class="icon">
                        <Icon icon={mdiMagnify} />
                    </span>
                    <span>Details</span>
                </a>
            </div>
        </div>
    {/each}
{:else}<span>Es wurden noch keine Einkäufe getätigt.</span>{/if}
