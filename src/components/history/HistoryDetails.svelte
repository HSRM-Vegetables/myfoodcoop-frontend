<script>
    import { onMount } from 'svelte';
    import { UnitType } from '../../scripts/stock/UnitType';
    import { moneyStyler } from '../../scripts/common/Helper';
    import Loader from '../common/Loader.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import Purchase from '../../scripts/purchase/Purchase';
    import ListItem from '../common/ListItem.svelte';

    /**
     * the purchase ID to be displayed
     */
    export let purchaseID;

    let isLoading = true;
    let requestError;
    let purchase;

    onMount(async () => {
        try {
            purchase = await Purchase.getPurchase(purchaseID);
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    });
</script>

{#if isLoading}
    <Loader bind:isLoading />
{:else if requestError !== undefined}
    <article class="message is-danger">
        <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
    </article>
{:else}
    {#each purchase.items as item}
        <ListItem>
            <div class="columns is-mobile">
                <div class="column has-text-left has-text-weight-bold"><span class="break-all">{item.name}</span></div>
            </div>
            <div class="columns is-mobile is-vcentered">
                <div class="column has-text-left">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{moneyStyler(item.pricePerUnit)} € / Stück</span>
                    {:else}<span>{moneyStyler(item.pricePerUnit)} € / kg</span>{/if}
                </div>

                <div class="column has-text-right">
                    {#if item.unitType === UnitType.PIECE}
                        <span>{item.amount} Stück</span>
                    {:else}<span>{item.amount} kg</span>{/if}
                </div>

                <div class="column has-text-right pr-5">{moneyStyler(item.pricePerUnit * item.amount)} €</div>
            </div>
        </ListItem>
    {/each}

    <hr />

    <div class="columns is-mobile">
        <div class="column">Datum, Uhrzeit: {new Date(purchase.createdOn).toLocaleString()}</div>
        <div class="column has-text-right">
            <span>Gesamtbetrag: {moneyStyler(purchase.totalPrice)}&nbsp;€</span>
            <br />
            <span>davon Umsatzsteuersatz: {moneyStyler(purchase.totalVat)} €</span>
            {#each purchase.vatDetails as details}
                <br />
                <span class="is-size-7">davon {moneyStyler(details.vat * 100)} %: {moneyStyler(details.amount)} €</span>
            {/each}
        </div>
    </div>

    <hr />
{/if}

<ErrorModal error={requestError} />
