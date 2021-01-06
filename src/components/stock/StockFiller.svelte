<script>
    import { goto } from '@sapper/app';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import TextField from '../common/TextField.svelte';
    import Switch from '../common/Switch.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import Button from '../common/Button.svelte';

    /**
     * Stock item the form should be prefilled with, if undefined no values are prefilled
     */
    export let item;

    let pricePerUnitTextField;
    let quantityTextField;
    let articleTextField;
    let descriptionElement;
    let unitType = UnitType.KILO;
    let unitTypeBoolean = false;

    let articleTextFieldError = false;
    let pricePerUnitTextFieldError = false;
    let quantityTextFieldError = false;
    let errorHint;

    // call the method as soon as the value of unitTypeBoolean changes
    $: untiTypeChanged(unitTypeBoolean);

    // call the method as soon as the value of item changes
    $: itemChanged(item);

    let requestError;

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

    function areInputsValid() {
        errorHint = undefined;
        articleTextFieldError = false;
        pricePerUnitTextFieldError = false;
        quantityTextFieldError = false;

        // No name set
        if (!articleTextField || !articleTextField.getValue()) {
            articleTextFieldError = true;
        }

        // No price or price is negative
        if (!pricePerUnitTextField || !pricePerUnitTextField.getValue() || pricePerUnitTextField.getValue() < 0) {
            pricePerUnitTextFieldError = true;
        }

        // no quantity or quantity is negative
        if (!quantityTextField || !quantityTextField.getValue() || quantityTextField.getValue() < 0) {
            quantityTextFieldError = true;
        }

        // Quantity is not a number
        if (Number.isNaN(quantityTextField.getValue())) {
            quantityTextFieldError = true;
        }

        // Price is not a number
        if (Number.isNaN(pricePerUnitTextField.getValue())) {
            pricePerUnitTextFieldError = true;
        }

        // Fractional quantity with unitType PIECE
        if (unitType === UnitType.PIECE && parseFloat(quantityTextField.getValue()) % 1 !== 0) {
            quantityTextFieldError = true;
            errorHint = 'Die Bestandsmenge muss eine ganze Zahle sein, wenn Stückpreis ausgewählt ist';
        }

        if (articleTextFieldError || pricePerUnitTextFieldError || quantityTextFieldError) {
            return false;
        }

        return true;
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
    async function addOrUpadteItem() {
        requestError = undefined;
        if (!areInputsValid()) {
            return;
        }

        try {
            if (!item) {
                await Stock.addItem(
                    articleTextField.getValue(),
                    unitType,
                    pricePerUnitTextField.getValue(),
                    quantityTextField.getValue(),
                    descriptionElement.value
                );
            } else {
                await Stock.updateItem(
                    item.id,
                    articleTextField.getValue(),
                    unitType,
                    pricePerUnitTextField.getValue(),
                    quantityTextField.getValue(),
                    descriptionElement.value
                );
            }
        } catch (error) {
            requestError = error;
            return;
        }

        goto('/stock/');
    }

    /**
     * clear the inputs of all fields
     */
    function clearInputs() {
        articleTextField.clear();
        pricePerUnitTextField.clear();
        quantityTextField.clear();
        descriptionElement.value = '';
    }
</script>

<style>
    .form-row {
        display: flex;
        flex-flow: row nowrap;
    }

    .auto-margin {
        margin: auto;
    }
</style>

<ErrorModal error={requestError} />

{#if errorHint}
    <article class="message is-danger">
        <div class="message-body">{errorHint}</div>
    </article>
{/if}

<div>
    <div class="form">
        <div class="pt-4">
            <TextField
                bind:this={articleTextField}
                type="text"
                placeholder="Artikel"
                label="Artikel"
                isInErrorState={articleTextFieldError}
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
                bind:this={pricePerUnitTextField}
                type="number"
                placeholder="Warenpreis"
                label="Warenpreis"
                decoration={unitType === UnitType.KILO ? '€ / kg' : '€ / Stück'}
                minimum="0"
                isInErrorState={pricePerUnitTextFieldError}
                value={item ? item.pricePerUnit : ''}
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
                isInErrorState={quantityTextFieldError}
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
        <div class="container has-text-centered">
            <Button
                text="Bestand {item ? 'aktualisieren' : 'hinzufügen'}"
                on:click={addOrUpadteItem}
                class="button is-primary mb-4"
                size="full-width"
            />
            <br />
            <Button text="Eingabe löschen" on:click={clearInputs} class="button is-danger mb-4" size="full-width" />

            <br />

            <Button
                text="zum Bestand"
                href="/stock/"
                on:click={clearInputs}
                class="button is-link mt-5"
                size="full-width"
            />
        </div>
    </div>
</div>
