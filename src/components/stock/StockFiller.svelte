<script>
    import { goto } from '@sapper/app';
    import { mdiPlusBoxMultiple, mdiDelete, mdiArrowLeft, mdiPencil } from '@mdi/js';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import TextField from '../common/TextField.svelte';
    import Switch from '../common/Switch.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import Button from '../common/Button.svelte';
    import { StockStatus, StockStatusWithDescription } from '../../scripts/stock/StockStatus';
    import { stockItems } from '../../stores/stock';

    /**
     * Optional: The item whose values the form is pre-filled with
     */
    export let item;

    /**
     * If item is specified: Whether the form should edit the item (or,
     * otherwise, only use as a blueprint for creating a new item)
     */
    export let edit;

    /**
     * Link to go back
     */
    export let linkBack = '/stock/';

    /**
     * Text to be displayed on the back button
     */
    export let linkBackText = 'zum Bestand';

    let pricePerUnitTextField;
    let quantityTextField;
    let articleTextField;
    let descriptionElement;
    let unitType = UnitType.KILO;
    let unitTypeBoolean = false;
    let selectedStatus = StockStatus.ORDERED;

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

        selectedStatus = stockItem.stockStatus;
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
            if (item && edit) {
                await Stock.updateItem(
                    item.id,
                    articleTextField.getValue(),
                    unitType,
                    pricePerUnitTextField.getValue(),
                    quantityTextField.getValue(),
                    descriptionElement.value,
                    selectedStatus
                );
            } else {
                await Stock.addItem(
                    articleTextField.getValue(),
                    unitType,
                    pricePerUnitTextField.getValue(),
                    quantityTextField.getValue(),
                    descriptionElement.value,
                    selectedStatus
                );
            }

            // as one item was added or modified, reload the stock list
            stockItems.forceUpdate();
        } catch (error) {
            requestError = error;
            return;
        }

        goto(linkBack);
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
                charLimit="250"
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
        <div>
            <div class="pt-4">
                <div class="has-text-left pb-2">Artikel Status</div>
                <select class="input select" bind:value={selectedStatus}>
                    {#each StockStatusWithDescription as status}
                        <option value={status.identifier}>{status.descripton}</option>
                    {/each}
                </select>
            </div>
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
                text={edit ? 'Änderung speichern' : 'Artikel neu bestellen'}
                on:click={addOrUpadteItem}
                class="button is-primary mb-4"
                icon={item ? mdiPencil : mdiPlusBoxMultiple}
                size="full-width"
            />
            <br />
            <Button
                text="Eingabe löschen"
                on:click={clearInputs}
                class="button is-danger mb-4"
                icon={mdiDelete}
                size="full-width"
            />

            <br />

            <Button
                text={linkBackText}
                href={linkBack}
                on:click={clearInputs}
                icon={mdiArrowLeft}
                class="button is-link mt-5"
                size="full-width"
            />
        </div>
    </div>
</div>
