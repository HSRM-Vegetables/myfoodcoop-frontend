<script>
    import { goto } from '@sapper/app';
    import { onMount, onDestroy } from 'svelte';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';

    let unitPriceElement;
    let quantityElement;
    let articleElement;
    let unitTypeBoolean;
    let unitType = UnitType.PIECE;

    onMount(() => {
    });

    function addItem() {
        const item = new Stock();
        item.addItem(articleElement.value,unitType,unitPriceElement.value,quantityElement.value);
        //goto('/stock');
    }

    function clearInputs() {
        articleElement.value = '';
        unitPriceElement.value = '';
        inElement.value = '';
    }
</script>
<div>
    <div class="form">
        <div>
            <div class="has-text-left pt-4">Artikel</div>
            <input
                class="input"
                type="text"
                placeholder="Artikel"
                bind:this={articleElement} />
        </div> 

        <div class="form-row pt-4">
                 <input id="unitprice" checked type="radio"name="unit" on:change="{() => unitType = UnitType.PIECE}"/><label for="unitprice"> Stückpreis</label>  
                 <input id="unittype" type="radio" name="unit" on:change="{() => unitType = UnitType.KILO}"/><label for="unittype"> Kilopreis</label>
        </div>

        <div>
            <div class="has-text-left pt-4">Warenpreis</div>
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
            <div class="has-text-left pt-4">Bestands Menge</div>
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
