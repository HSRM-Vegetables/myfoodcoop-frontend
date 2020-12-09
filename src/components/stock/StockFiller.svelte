<script>
    import { goto } from '@sapper/app';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import TextField from '../elements/TextField.svelte'
    import Switch from '../elements/Switch.svelte';
    
    let unitPriceElement;
    let quantityElement;
    let articleElement;
    let descriptionElement;
    let unitType;
    let unitTypeBoolean;
    
    $: untiTypeChanged(unitTypeBoolean);
    
     function untiTypeChanged(value) {
            if (value === true) {
                unitType = UnitType.KILO;
            } else {
                unitType = UnitType.PIECE;
            }
        }

    function addItem() {
        const item = new Stock();
        item.addItem(
            articleElement.value,
            unitType,
            unitPriceElement.value,
            quantityElement.value,
            descriptionElement.value
        );
        goto('/stock');
    }
    
    function setUnitType(value) {
        unitType = value;
    }
    
    function clearInputs() {
        articleElement.value = '';
        unitPriceElement.value = '';
        quantityElement.value = '';
        descriptionElement.value = '';
    }
</script>
<style>
    .fix-button-width{
        width: 230px;
    }
</style>
<div>
    <div class="form">
        <div class="pt-4">
            <TextField bind:value="{articleElement}" placeholder="Artikel" title="Artikel" />
        </div>
        <div class="form-row pt-4 has-text-centered">
             <div class="form-row">
                        <div class="auto-margin">Stückpreis</div>
                        <div class="auto-margin">
                            <Switch bind:checked={unitTypeBoolean} />
                        </div>
                        <div class="auto-margin">Kilopreis</div>
                    </div>
        </div>
        <div class="pt-4">

        {#if unitType === UnitType.KILO}
            <TextField bind:value="{unitPriceElement}" type="number" placeholder="Warenpreis" title="Warenpreis" deco="€ / kg"/>
        {:else}
            <TextField bind:value="{unitPriceElement}" type="number" placeholder="Warenpreis" title="Warenpreis" deco="€ / Stück"/>
        {/if}
            
        </div>
        <div class="pt-4">
        {#if unitType === UnitType.KILO}
            <TextField bind:value="{quantityElement}" type="number" placeholder="Bestands Menge" title="Bestands Menge" deco="kg"/>
        {:else}
            <TextField bind:value="{quantityElement}" type="number" placeholder="Bestands Menge" title="Bestands Menge" deco="Stück"/>
        {/if}
        
        </div>
        <div class="pt-4">
            <div class="has-text-left pb-2">Beschreibung</div>
            <div class="form-row is-relative">
               <textarea class="textarea" placeholder="Beschreibung" bind:this="{descriptionElement}"></textarea>
            </div>
        </div>
        <hr />
        <div class="button-box has-text-centered">
            <button on:click={addItem} class="button is-medium is-primary mb-4 fix-button-width">
            Bestand hinzufügen
            </button><br>
            <button
                on:click={clearInputs}
                class="button is-medium is-danger mb-4 fix-button-width">
            Eingabe löschen
            </button><br>
            <div class="container has-text-centered mt-6">
                <a href="/stock" type="submit" class="is-medium button is-primary is-link fix-button-width">Zurück</a><br>
            </div>
        </div>
    </div>
</div>
