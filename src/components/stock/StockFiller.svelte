<script>
    import { goto } from '@sapper/app';
    import { DateTime } from 'luxon';
    import { mdiPlusBoxMultiple, mdiDelete, mdiArrowLeft, mdiPencil } from '@mdi/js';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { slide } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing';
    import { UnitType } from '../../scripts/UnitType';
    import { CalendarStyle } from '../../scripts/CalendarStyle';
    import { OriginCategory } from '../../scripts/OriginCategory';
    import Stock from '../../scripts/stock/Stock';
    import TextField from '../common/TextField.svelte';
    import Switch from '../common/Switch.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import Button from '../common/Button.svelte';
    import { stockItems } from '../../stores/stock';

    /**
     * Stock item the form should be prefilled with, if undefined no values are prefilled
     */
    export let item;

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
    let producerTextField;
    let supplierTextField;
    let descriptionElement;
    let unitType = UnitType.PIECE;
    let unitTypeBoolean = true;
    let sustainablyProduced = true;
    let certificates = [];
    let originCategory = OriginCategory.UNKNOWN;
    let deliveryDate;
    let orderDate;

    let articleTextFieldError = false;
    let pricePerUnitTextFieldError = false;
    let quantityTextFieldError = false;
    let producerTextFieldError = false;
    let supplierTextFieldError = false;
    let errorHint;

    const originCategorys = [
        { name: 'Lokal', category: OriginCategory.LOCAL },
        { name: 'Regional', category: OriginCategory.REGIONAL },
        { name: 'Überregional', category: OriginCategory.SUPRAREGIONAL },
        { name: 'Unbekannt', category: OriginCategory.UNKNOWN },
    ];

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
        producerTextFieldError = false;
        supplierTextFieldError = false;

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
            supplierTextFieldError
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
                    descriptionElement.value,
                    sustainablyProduced.valueOf(),
                    certificates,
                    originCategory,
                    producerTextField.getValue(),
                    supplierTextField.getValue(),
                    orderDate,
                    deliveryDate
                );
            } else {
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
                    deliveryDate
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
    li.list-item {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        color: #000;
        display: block;
        padding: 1.25rem;
        margin-top: 20px;
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
            <div class="column">Nachhaltig Produziert</div>
            <div class="column has-text-right">
                <Switch bind:checked={sustainablyProduced} twoColor={true} />
            </div>
        </div>
        <div>
            <div class="has-text-left pb-2">Zertifikate</div>
            <form class="field has-addons has-text-centered" on:submit|preventDefault={addCertificates}>
                <div class="control" style="width: 100%;">
                    <input bind:value={inputCertificates} class="input" type="text" placeholder="Zertikat" />
                </div>
                <div class="control">
                    <Button text="Hinzufügen" class="button is-primary" icon={mdiPlusBoxMultiple} />
                </div>
            </form><br />
            <ul class:list={certificates.length > 0}>
                {#each certificates as certificate}
                    <li class="list-item" transition:slide={{ duration: 300, easing: elasticInOut }}>
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
                    </li>
                {/each}
            </ul>
        </div>
        <div class="pt-4">
            <div class="has-text-left pb-2">Herkunftskategorie</div>
            <select class="input dropdown" bind:value={originCategory}>
                {#each originCategorys as categorys}
                    <option value={categorys.category}>{categorys.name}</option>
                {/each}
            </select>
        </div>
        <hr />
        <div class="pt-4">
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
        <div class="pt-4">
            <div class="columns is-mobile">
                <div class="column">
                    <div class="has-text-left pb-2">Lieferdatum</div>
                    <DatePicker
                        placeholder="Wähle einen Zeitraum"
                        format="DD.MM.YYYY"
                        styling={new CalendarStyle()}
                        on:date-selected={(e) => setOrderDate(e.detail.date)}
                        selected={item ? item.orderDate : ''}
                    />
                </div>
                <div class="column">
                    <div class="has-text-left pb-2 ">Bestelldatum</div>
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
        <div class="pt-4">
            <div class="has-text-left pb-2">Beschreibung</div>
            <div class="form-row is-relative">
                <textarea
                    class="textarea"
                    placeholder="Beschreibung"
                    continueText="Bestätigen"
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
