<script>
    import { goto } from '@sapper/app';
    import { onMount, onDestroy } from 'svelte';
    import { UnitType } from '../../scripts/UnitType';

    import StockItem from '../../scripts/stock/StockItem';

    let unitPriceElement;
    let quantityElement;
    let articleElement;
    let currentTotal = 0;
    let unitTypeBoolean;
    let unitType;

    $: untiTypeChanged(unitTypeBoolean);

    onMount(() => {
        calcTotalPrice();
    });

    onDestroy(() => {
        
    });

    function untiTypeChanged(value) {
        if (value === true) {
            unitType = UnitType.KILO;
        } else {
            unitType = UnitType.PIECE;
        }
    }
    function addItem() {
        const item = new StockItem();
     
        goto('/shopping-cart');
    }

    function clearInputs() {
        articleElement.value = '';
        unitPriceElement.value = '';
        quantityElement.value = '';
        currentTotal = 0;
    }
</script>

<div>
    <div class="form">

        <div>
            <span>Artikel</span>
            <input
                class="input"
                type="text"
                placeholder="Artikel"
                bind:this={articleElement} />
        </div> 

        <div class="form-row">
            <div class="auto-margin">Stückpreis</div>
           
            <div class="auto-margin">Kilopreis</div>
        </div>

        <div>
            <span>Warenpreis</span>
            <div class="form-row">
                <input
                    bind:this={unitPriceElement}
                    class="input"
                    type="number"
                    placeholder="Warenpreis" />
                <div class="auto-margin min-width">
                    {#if unitType === UnitType.KILO}
                        <span class="unit-text">€ / kg</span>
                    {:else}<span class="unit-text">€ / Stück</span>{/if}
                </div>
            </div>
        </div>

        <div>
            <span>Menge</span>
            <div class="form-row">
                <input
                    bind:this={quantityElement}
                    class="input"
                    type="number"
                    placeholder="Menge" />
                <div class="auto-margin min-width">
                    {#if unitType === UnitType.KILO}
                        <span class="unit-text">kg</span>
                    {:else}<span class="unit-text">Stück</span>{/if}
                </div>
            </div>
        </div>

        <hr />

        <div class="button-box">
            <button on:click={addItem} class="button is-medium is-primary mb-4">
                Bestand hinzufügen
            </button>
            <button
                on:click={clearInputs}
                class="button is-medium is-danger mb-4">
                Eingabe löschen
            </button>
            <button
                class="button is-link is-medium mb-4">
                Zurück zum Warenkorb
            </button>
        </div>
    </div>
</div>
