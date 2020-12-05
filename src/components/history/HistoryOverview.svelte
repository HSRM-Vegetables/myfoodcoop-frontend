<script>
    import { onMount } from 'svelte';
    import { mdiMagnify } from '@mdi/js';
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import Icon from '../common/Icon.svelte';

    let purchaseApi;
    onMount(() => {
        purchaseApi = new PurchaseApi();
    });
</script>

{#if purchaseApi !== undefined && purchaseApi.purchases.length > 0}
    <table class="table is-fullwidth is-hoverable">
        <thead>
            <tr>
                <td>Datum</td>
                <td>Anzahl Artikel</td>
                <td>Preis</td>
                <td>Details</td>
            </tr>
        </thead>
        <tbody>
            {#each purchaseApi.purchases.sort((a, b) => b.createdOn - a.createdOn) as purchase}
                <tr>
                    <td>{purchase.createdOn.toLocaleString()}</td>
                    <td>{purchase.cartItems.length}</td>
                    <td>{purchase.totalPrice().toFixed(2)}€</td>
                    <td>
                        <a href="/history/{purchase.id}" class="button is-small is-primary">
                            <span class="icon">
                                <Icon icon={mdiMagnify}/>
                            </span>
                            <span>Details</span>
                        </a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <span>Es wurden noch keine Einkäufe getätigt.</span>
{/if}