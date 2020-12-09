<script>
    import { goto } from '@sapper/app';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    
    let unitPriceElement;
    let quantityElement;
    let articleElement;
    let descriptionElement;
    let unitType = UnitType.PIECE;

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
    .balance-input-deco{
        position: absolute;
        font-size: 1rem;
        color: #ccc6c6;
        right: 30px;
        top: 8px;
    }
    input[type="radio"] {
        margin-right: 8px;
        margin-left: 20px;
    }
</style>
<div>
    <div class="form">
        <div class="pt-4">
            <div class="has-text-left pb-2 ">Artikel</div>
            <input
                class="input"
                type="text"
                placeholder="Artikel"
                bind:this={articleElement} />
        </div>
        <div class="form-row pt-4 has-text-centered">
            <input id="unitprice" checked type="radio"name="unit" on:change="{() => setUnitType(UnitType.PIECE)}"/><label for="unitprice"> Stückpreis</label>  
            <input id="unittype" type="radio" name="unit" on:change="{() => setUnitType(UnitType.KILO)}"/><label for="unittype"> Kilopreis</label>
        </div>
        <div class="pt-4">
            <div class="has-text-left pb-2">Warenpreis</div>
            <div class="form-row is-relative">
                <input
                    bind:this={unitPriceElement}
                    class="input"
                    type="number"
                    placeholder="Warenpreis" />
                <div class="auto-margin min-width">
                    {#if unitType === UnitType.KILO}
                    <span class="balance-input-deco">€ / kg</span>
                    {:else}<span class="balance-input-deco">€ / Stück</span>{/if}
                </div>
            </div>
        </div>
        <div class="pt-4">
            <div class="has-text-left pb-2">Bestands Menge</div>
            <div class="form-row is-relative">
                <input
                    bind:this={quantityElement}
                    class="input"
                    type="number"
                    placeholder="Bestands Menge" />
                <div class="auto-margin min-width">
                    {#if unitType === UnitType.KILO}
                    <span class="balance-input-deco">kg</span>
                    {:else}<span class="balance-input-deco">Stück</span>{/if}
                </div>
            </div>
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
