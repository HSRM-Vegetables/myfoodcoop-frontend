<script>
    import { onMount } from 'svelte';
    import { mdiMagnify } from '@mdi/js';
    import Purchase from '../../scripts/purchase/Purchase';
    import Icon from '../common/Icon.svelte';
    import { moneyStyler } from '../../scripts/common/Helper';
    import ErrorModal from '../common/ErrorModal.svelte';
    import Loader from '../common/Loader.svelte';
    import NoData from '../common/NoData.svelte';

    let requestError;
    let isLoading = true;

    let purchaseList;
    onMount(async () => {
        try {
            purchaseList = await Purchase.getPurchaseList();
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    });
</script>

<style>
    .columns {
        border-bottom: solid 1px whitesmoke;
    }
</style>

{#if isLoading}
    <Loader bind:isLoading />
{:else if requestError !== undefined}
    <article class="message is-danger">
        <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
    </article>
{:else if purchaseList !== undefined && purchaseList.purchases.length > 0}
    <div class="columns has-text-weight-bold is-mobile is-vcentered">
        <div class="column">Datum</div>
        <div class="column has-text-centered">Anzahl Artikel</div>
        <div class="column">Preis</div>
        <div class="column">Details</div>
    </div>
    {#each purchaseList.purchases.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)) as purchase}
        <div class="columns is-mobile">
            <div class="column">{new Date(purchase.createdOn).toLocaleString()}</div>
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
{:else}
    <NoData text="Es wurden noch keine Einkäufe getätigt." />
{/if}

<ErrorModal error={requestError} />
