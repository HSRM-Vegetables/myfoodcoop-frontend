<script>
    import { goto } from '@sapper/app';
    import { DateTime } from 'luxon';
    import { mdiPlusBoxMultiple, mdiDelete, mdiArrowLeft, mdiPencil } from '@mdi/js';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { slide } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing';
    import { CalendarStyle } from '../../scripts/CalendarStyle';
    import { OriginCategory, OriginCategoryWithDescription } from '../../scripts/OriginCategory';
    import { UnitType } from '../../scripts/stock/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import TextField from '../common/TextField.svelte';
    import Switch from '../common/Switch.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import Button from '../common/Button.svelte';
    import { StockStatus, StockStatusWithDescription } from '../../scripts/stock/StockStatus';
    import { stockItems } from '../../stores/stock';
    import ListItem from '../common/ListItem.svelte';

    /**
     * Optional: The item whose values the form is pre-filled with
     */
    // Necessary because a not assigned variable is an expected value in svelte. But this value is optional.
    // eslint-disable-next-line no-undef-init
    export let item = undefined;

    /**
     * If item is specified: Whether the form should edit the item (or,
     * otherwise, only use as a blueprint for creating a new item)
     */
    export let edit = false;

    /**
     * Link to go back
     */
    export let linkBack = '/stock/';

    /**
     * Text to be displayed on the back button
     */
    export let linkBackText = 'zum Bestand';

    let pricePerUnitTextField;
    let vatTextField;
    let quantityTextField;
    let articleTextField;
    let producerTextField;
    let supplierTextField;
    let descriptionElement;
    let unitType = UnitType.KILO;
    let unitTypeBoolean = false;
    let sustainablyProduced = true;
    let certificates = [];
    let originCategory = OriginCategory.UNKNOWN;
    let deliveryDate;
    let orderDate;
    let selectedStatus = StockStatus.ORDERED;

    let articleTextFieldError = false;
    let pricePerUnitTextFieldError = false;
    let vatTextFieldError = false;
    let quantityTextFieldError = false;
    let producerTextFieldError = false;
    let supplierTextFieldError = false;
    let errorHint;

    let requestError;
    let saveText;

    if (edit) {
        saveText = 'Änderungen speichern';
    } else if (item) {
        saveText = 'Artikel neu erstellen';
    } else {
        saveText = 'Artikel erstellen';
    }

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

    function areInputsValid() {
        errorHint = undefined;
        articleTextFieldError = false;
        pricePerUnitTextFieldError = false;
        quantityTextFieldError = false;
        producerTextFieldError = false;
        supplierTextFieldError = false;
        vatTextFieldError = false;

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

        // Vat is not a number, and in valid range
        if (Number.isNaN(vatTextField.getValue()) || vatTextField.getValue() <= 0 || vatTextField.getValue() > 100) {
            vatTextFieldError = true;
        }

        // Fractional quantity with unitType PIECE
        if (unitType === UnitType.PIECE && parseFloat(quantityTextField.getValue()) % 1 !== 0) {
            quantityTextFieldError = true;
            errorHint = 'Die Bestandsmenge muss eine ganze Zahle sein, wenn Stückpreis ausgewählt ist';
        }

        if (!producerTextField || !producerTextField.getValue() || producerTextField.getValue() < 0) {
            producerTextFieldError = true;
        }

        if (!supplierTextField || !supplierTextField.getValue()) {
            supplierTextFieldError = true;
        }
        if (
            articleTextFieldError ||
            pricePerUnitTextFieldError ||
            quantityTextFieldError ||
            producerTextFieldError ||
            supplierTextFieldError ||
            vatTextFieldError
        ) {
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

        certificates = item.certificates;
        sustainablyProduced = item.sustainablyProduced;
        originCategory = item.originCategory;
        deliveryDate = item.deliveryDate;
        orderDate = item.orderDate;
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
                    sustainablyProduced.valueOf(),
                    certificates,
                    originCategory,
                    producerTextField.getValue(),
                    supplierTextField.getValue(),
                    orderDate,
                    deliveryDate,
                    selectedStatus,
                    vatTextField.getValue() / 100
                );
            } else {
                await Stock.addItem(
                    articleTextField.getValue(),
                    unitType,
                    pricePerUnitTextField.getValue(),
                    quantityTextField.getValue(),
                    descriptionElement.value,
                    sustainablyProduced.valueOf(),
                    certificates,
                    originCategory,
                    producerTextField.getValue(),
                    supplierTextField.getValue(),
                    orderDate,
                    deliveryDate,
                    selectedStatus,
                    vatTextField.getValue() / 100
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
        pricePerUnitTextField.clear();
        producerTextField.clear();
        articleTextField.clear();
        originCategory = OriginCategory.UNKNOWN;
        certificates = [];
        vatTextField.clear();
    }
    /**
     * Certificates List
     */
    let inputCertificates = '';
    function addCertificates() {
        if (inputCertificates) certificates = [...certificates, inputCertificates];
        inputCertificates = '';
    }

    function removeCertificates(name) {
        const index = certificates.findIndex((certificate) => certificate === name);
        certificates.splice(index, 1);
        certificates = certificates;
    }

    function setOrderDate(date) {
        orderDate = DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd');
    }
    function setDeliveryDate(date) {
        deliveryDate = DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd');
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

    .dropdown {
        -moz-appearance: auto;
        -webkit-appearance: auto;
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
                bind:this={vatTextField}
                type="number"
                placeholder="Steuersatz"
                label="Steuersatz"
                decoration={'%'}
                minimum="0"
                isInErrorState={vatTextFieldError}
                value={item ? item.vat * 100 : ''}
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
        <hr />
        <div class="columns pt-4 is-mobile">
            <div class="column">nachhaltig Produziert</div>
            <div class="column has-text-right">
                <Switch bind:checked={sustainablyProduced} twoColor={true} />
            </div>
        </div>
        <div class="mb-2">
            <div class="has-text-left pb-2">Zertifikate</div>
            <form class="field has-addons has-text-centered" on:submit|preventDefault={addCertificates}>
                <div class="control" style="width: 100%;">
                    <input bind:value={inputCertificates} class="input" type="text" placeholder="Zertikat" />
                </div>
                <div class="control">
                    <Button text="Hinzufügen" class="button is-primary" icon={mdiPlusBoxMultiple} />
                </div>
            </form>
            {#each certificates as certificate}
                <div transition:slide={{ duration: 300, easing: elasticInOut }}>
                    <ListItem size="small">
                        <div class="columns" style="align-items: center">
                            <div class="is-pulled-left column">{certificate}</div>
                            <div class="column has-text-right">
                                <Button
                                    text="Löschen"
                                    class="button is-danger"
                                    icon={mdiDelete}
                                    on:click={() => removeCertificates(certificate)}
                                />
                            </div>
                        </div>
                    </ListItem>
                </div>
            {/each}
        </div>
        <div class="pt-4">
            <div class="has-text-left pb-2">Herkunftskategorie</div>
            <select class="input dropdown" bind:value={originCategory}>
                {#each OriginCategoryWithDescription as categorys}
                    <option value={categorys.identifier}>{categorys.descripton}</option>
                {/each}
            </select>
        </div>
        <hr />
        <div class="pt-1">
            <TextField
                bind:this={producerTextField}
                type="text"
                placeholder="Erzeuger"
                label="Erzeuger"
                isInErrorState={producerTextFieldError}
                charLimit="250"
                value={item ? item.producer : ''}
            />
        </div>
        <div class="pt-4">
            <TextField
                bind:this={supplierTextField}
                type="text"
                placeholder="Lieferant"
                label="Lieferant"
                isInErrorState={supplierTextFieldError}
                charLimit="250"
                value={item ? item.supplier : ''}
            />
        </div>
        <div class="pt-5 pb-2">
            <div class="columns has-text-centered">
                <div class="column">
                    <div class="pb-2">Lieferdatum</div>
                    <DatePicker
                        placeholder="Wähle einen Zeitraum"
                        continueText="Bestätigen"
                        format="DD.MM.YYYY"
                        styling={new CalendarStyle()}
                        on:date-selected={(e) => setOrderDate(e.detail.date)}
                        selected={item ? item.orderDate : ''}
                    />
                </div>
                <div class="column">
                    <div class="pb-2 ">Bestelldatum</div>
                    <DatePicker
                        placeholder="Wähle einen Zeitraum"
                        continueText="Bestätigen"
                        format="DD.MM.YYYY"
                        styling={new CalendarStyle()}
                        on:date-selected={(e) => setDeliveryDate(e.detail.date)}
                        selected={item ? item.deliveryDate : ''}
                    />
                </div>
            </div>
        </div>
        <div>
            <div class="pt-4">
                <div class="has-text-left pb-2">Artikel Status</div>
                <select class="input dropdown" bind:value={selectedStatus}>
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
                text={saveText}
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
