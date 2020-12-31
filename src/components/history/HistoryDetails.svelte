<script>
    import { UnitType } from '../../scripts/UnitType';
    import { moneyStyler } from '../../scripts/Helper';

    /**
     * API-Response purchase-history-item
     */
    export let purchase;

</script>

<style>
    .shoppingElement {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        color: #000;
        display: block;
        padding: 1.25rem;
        margin-top: 20px;
    }

    .breakwords {
        word-break: break-all;
    }
</style>

{#each purchase.items as item}
    <div class="shoppingElement">
        <div class="columns is-mobile">
            <div class="column has-text-left has-text-weight-bold">
                <span class="breakwords">{item.name}</span>
            </div>
        </div>
        <div class="columns is-mobile is-vcentered">
            <div class="column has-text-left">
                {#if item.unitType === UnitType.PIECE}
                    <span>{item.pricePerUnit} € / Stück</span>
                {:else}<span>{item.pricePerUnit} € / kg</span>{/if}
            </div>

            <div class="column has-text-right">
                {#if item.unitType === UnitType.PIECE}
                    <span>{item.amount} Stück</span>
                {:else}<span>{item.amount} kg</span>{/if}
            </div>

            <div class="column has-text-right pr-5">{moneyStyler(item.pricePerUnit * item.amount)} €</div>
        </div>
    </div>
{/each}

<hr />

<span>Gesamtbetrag: {moneyStyler(purchase.totalPrice)} €</span>

<hr />