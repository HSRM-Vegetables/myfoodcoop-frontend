<script>
    import { goto } from '@sapper/app';
    import uuid from 'uuid';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import TextField from '../common/TextField.svelte';
    import Switch from '../common/Switch.svelte';

    /**
     * Stock item the form should be prefilled with, if undefined no values are prefilled
     */
    export let item;

    let unitPriceTextField;
    let quantityTextField;
    let articleTextField;
    let descriptionElement;
    let unitType = UnitType.KILO;
    let unitTypeBoolean = false;

    // call the method as soon as the value of unitTypeBoolean changes
    $: untiTypeChanged(unitTypeBoolean);

    // call the method as soon as the value of item changes
    $: itemChanged(item);

    /**
     * Update the unit type which should be displayed
     * @param {boolean} value current state of unit type
     */
    function untiTypeChanged(value) {
        if (value === true) {
            unitType = UnitType.KILO;
        } else {
            unitType = UnitType.PIECE;
        }
    }

    /**
     * called if the value of item changes
     * @param stockItem stock item
     */
    function itemChanged(stockItem) {
        if (!stockItem) {
            return;
        }

        if (stockItem.unitType === UnitType.KILO) {
            unitTypeBoolean = true;

            // force update of unit type
            untiTypeChanged(unitTypeBoolean);
        }
    }

    /**
     * Add or Update an existing stock item
     */
    function addOrUpadteItem() {
        if (!item && articleTextField.isValid() && unitPriceTextField.isValid() && quantityTextField.isValid()) {
            const stock = new Stock();

            stock.addItem(
                uuid(),
                articleTextField.getValue(),
                unitType,
                unitPriceTextField.getValue(),
                quantityTextField.getValue(),
                descriptionElement.value
            );
            goto('/stock/');
        } else if (item && articleTextField.isValid() && unitPriceTextField.isValid() && quantityTextField.isValid()) {
            const stock = new Stock();
            stock.updateItem(
                item.id,
                articleTextField.getValue(),
                unitType,
                unitPriceTextField.getValue(),
                quantityTextField.getValue(),
                descriptionElement.value
            );
            goto('/stock/');
        }
    }

    /**
     * clear the inputs of all fields
     */
    function clearInputs() {
        articleTextField.clear();
        unitPriceTextField.clear();
        quantityTextField.clear();
        descriptionElement.value = '';
    }
</script>

<style>
    .fix-button-width {
        width: 230px;
    }

    .form-row {
        display: flex;
        flex-flow: row nowrap;
    }

    .auto-margin {
        margin: auto;
    }
</style>

<div>
    <div class="form">
        <div class="pt-4">
            <TextField
                bind:this={articleTextField}
                type="text"
                placeholder="Artikel"
                label="Artikel"
                value={item ? item.name : ''}
            />
        </div>
        <div class="form-row pt-4">
            <div class="auto-margin">Stückpreis</div>
            <div class="auto-margin">
                <Switch bind:checked={unitTypeBoolean} />
            </div>
            <div class="auto-margin">Kilopreis</div>
        </div>
        <div class="pt-4">
            <TextField
                bind:this={unitPriceTextField}
                type="number"
                placeholder="Warenpreis"
                label="Warenpreis"
                decoration={unitType === UnitType.KILO ? '€ / kg' : '€ / Stück'}
                minimum="0"
                value={item ? item.unitPrice : ''}
            />
        </div>
        <div class="pt-4">
            <TextField
                bind:this={quantityTextField}
                type="number"
                placeholder="Bestands Menge"
                label="Bestands Menge"
                decoration={unitType === UnitType.KILO ? 'kg' : 'Stück'}
                minimum="0"
                value={item ? item.quantity : ''}
            />
        </div>
        <div class="pt-4">
            <div class="has-text-left pb-2">Beschreibung</div>
            <div class="form-row is-relative">
                <textarea
                    class="textarea"
                    placeholder="Beschreibung"
                    bind:this={descriptionElement}
                >{item ? item.description : ''}</textarea>
            </div>
        </div>
        <hr />
        <div class="button-box has-text-centered">
            <button on:click={addOrUpadteItem} class="button is-primary mb-4 fix-button-width">Bestand
                {item ? 'aktualisieren' : 'hinzufügen'}
            </button><br />
            <button on:click={clearInputs} class="button is-danger mb-4 fix-button-width">Eingabe löschen</button><br />
            <div class="container has-text-centered mt-6">
                <a href="/stock/" type="submit" class="button is-primary is-link fix-button-width">Zurück</a><br />
            </div>
        </div>
    </div>
</div>
