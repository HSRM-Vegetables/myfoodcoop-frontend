<script>
    import { goto } from '@sapper/app';
    import { mdiPlusBox, mdiDelete, mdiArrowLeft, mdiPencil, mdiPlusBoxMultiple } from '@mdi/js';
    import { slide } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing';
    import { CertificateLogos } from '../../scripts/stock/CertificateLogos';
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
    import { toastText } from '../../stores/toast';
    import { onMount } from 'svelte';

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
    let unitType = UnitType.PIECE;
    let unitTypeBoolean = true;
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
    let itemDetailsError = false;
    let deliveryDetailsError = false;
    let errorHint;
    let areMandatoryFieldsFilled = false;

    let requestError;
    let saveText;

    let currentTabName = 'article';

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

    onMount(() => {
        if (item || edit) {
            areInputsValid();
        }
    });

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
        itemDetailsError =
            articleTextFieldError || pricePerUnitTextFieldError || quantityTextFieldError || vatTextFieldError;
        deliveryDetailsError = producerTextFieldError || supplierTextFieldError;

        if (itemDetailsError || deliveryDetailsError) {
            areMandatoryFieldsFilled = false;
            return false;
        }
        areMandatoryFieldsFilled = true;
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

        unitTypeBoolean = stockItem.unitType === UnitType.KILO;
        // force update of unit type
        untiTypeChanged(unitTypeBoolean);

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
    async function addOrUpadteItem(saveAndNew) {
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

                // eslint-disable-next-line no-unused-vars
                $toastText = 'Artikel erfolgreich aktualisiert';
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

                // eslint-disable-next-line no-unused-vars
                $toastText = 'Artikel erfolgreich hinzugefügt';
            }

            // as one item was added or modified, reload the stock list
            stockItems.forceUpdate();
        } catch (error) {
            requestError = error;
            return;
        }
        if (saveAndNew) {
            clearInputs();
            item = undefined;
            goto('/stock/item/new');
        } else {
            goto(linkBack);
        }
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
        supplierTextField.clear();
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
        orderDate = date.target.value;
    }
    function setDeliveryDate(date) {
        deliveryDate = date.target.value;
    }
    function tabClick(value) {
        currentTabName = value;
    }

    function addToCertificateLogos(certificate) {
        if (!certificates.includes(certificate)) certificates = [...certificates, certificate];
        else removeCertificates(certificate);
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
    .tabs {
        display: flex;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    }
    .tab {
        display: inline;
        cursor: pointer;
        padding: 10px 10px;
        width: 100%;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: 2px solid whitesmoke;
    }
    .tab.is-active {
        color: #1d72aa;
        font-weight: bold;
        border: 2px solid whitesmoke;
        border-bottom: 0;
    }
    .logo-images {
        max-width: 90px;
        min-width: 90px;
        filter: grayscale(100%);
        cursor: pointer;
    }
    .logo-images:hover {
        filter: grayscale(80%);
    }
    .logo-images.is-active {
        filter: grayscale(0);
    }
    .item-block {
        display: none;
    }
    .item-block.is-active {
        display: block;
    }
    .is-error {
        color: #f14668;
    }
    .certificates-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        align-content: center;
    }
</style>

<ErrorModal error={requestError} />

{#if errorHint}
    <article class="message is-danger">
        <div class="message-body">{errorHint}</div>
    </article>
{/if}
<div class="tabs m-0">
    <div class="tab" class:is-active={currentTabName === 'article'} on:click={() => tabClick('article')}>
        <span class:is-error={itemDetailsError}>Artikeldetails</span>
    </div>
    <div
        class="tab"
        class:is-active={currentTabName === 'deliveryDetails'}
        on:click={() => tabClick('deliveryDetails')}
    >
        <span class:is-error={deliveryDetailsError}>Lieferdetails</span>
    </div>
    <div class="tab" class:is-active={currentTabName === 'certificate'} on:click={() => tabClick('certificate')}>
        <span>Zertifikate</span>
    </div>
</div>
<div>
    <div class="form">
        <div class="item-block" class:is-active={currentTabName === 'article'}>
            <div class="pt-4">
                <div class="has-text-left pb-2">Artikel Status</div>
                <select class="input dropdown" bind:value={selectedStatus}>
                    {#each StockStatusWithDescription as status}
                        <option value={status.identifier}>{status.descripton}</option>
                    {/each}
                </select>
            </div>
            <div class="pt-4">
                <TextField
                    bind:this={articleTextField}
                    type="text"
                    placeholder="Artikel"
                    label="Artikel *"
                    isInErrorState={articleTextFieldError}
                    charLimit="250"
                    value={item ? item.name : ''}
                    on:change={areInputsValid}
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
                    label="Warenpreis *"
                    decoration={unitType === UnitType.KILO ? '€ / kg' : '€ / Stück'}
                    minimum="0"
                    isInErrorState={pricePerUnitTextFieldError}
                    value={item ? item.pricePerUnit : ''}
                    on:change={areInputsValid}
                />
            </div>
            <div class="pt-4">
                <TextField
                    bind:this={vatTextField}
                    type="number"
                    placeholder="Umsatzsteuersatz"
                    label="Umsatzsteuersatz *"
                    decoration={'%'}
                    minimum="0"
                    isInErrorState={vatTextFieldError}
                    value={item ? Math.floor(item.vat * 100) : 7}
                    on:change={areInputsValid}
                />
            </div>
            <div class="pt-4">
                <TextField
                    bind:this={quantityTextField}
                    type="number"
                    placeholder="Bestands Menge"
                    label="Bestands Menge *"
                    decoration={unitType === UnitType.KILO ? 'kg' : 'Stück'}
                    minimum="0"
                    isInErrorState={quantityTextFieldError}
                    value={item ? item.quantity : ''}
                    on:change={areInputsValid}
                />
            </div>
            <div class="pt-4">
                <div class="has-text-left pb-2">Beschreibung</div>
                <div class="form-row is-relative">
                    <textarea
                        class="textarea"
                        placeholder="Beschreibung"
                        bind:this={descriptionElement}
                        on:change={areInputsValid}
                    >
                        {item ? item.description : ''}
                    </textarea>
                </div>
            </div>
        </div>
        <div class="item-block" class:is-active={currentTabName === 'deliveryDetails'}>
            <div class="pt-4">
                <div class="has-text-left pb-2">Herkunftskategorie</div>
                <select class="input dropdown" bind:value={originCategory}>
                    {#each OriginCategoryWithDescription as categorys}
                        <option value={categorys.identifier}>{categorys.descripton}</option>
                    {/each}
                </select>
            </div>
            <div class="pt-1">
                <TextField
                    bind:this={producerTextField}
                    type="text"
                    placeholder="Erzeuger"
                    label="Erzeuger *"
                    isInErrorState={producerTextFieldError}
                    charLimit="250"
                    value={item ? item.producer : ''}
                    on:change={areInputsValid}
                />
            </div>
            <div class="pt-4">
                <TextField
                    bind:this={supplierTextField}
                    type="text"
                    placeholder="Lieferant"
                    label="Lieferant *"
                    isInErrorState={supplierTextFieldError}
                    charLimit="250"
                    value={item ? item.supplier : ''}
                    on:change={areInputsValid}
                />
            </div>
            <div class="pt-5 pb-2">
                <div class="columns has-text-centered">
                    <div class="column">
                        <div class="pb-2 ">Bestelldatum</div>
                        <input
                            type="date"
                            class="input"
                            value={item ? item.deliveryDate : ''}
                            on:change={(i) => setDeliveryDate(i)}
                        />
                    </div>
                    <div class="column">
                        <div class="pb-2">Lieferdatum</div>
                        <input
                            type="date"
                            class="input"
                            value={item ? item.orderDate : ''}
                            on:change={(i) => setOrderDate(i)}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="item-block" class:is-active={currentTabName === 'certificate'}>
            <div class="columns pt-4 is-mobile">
                <div class="column">nachhaltig Produziert</div>
                <div class="column has-text-right">
                    <Switch bind:checked={sustainablyProduced} twoColor={true} />
                </div>
            </div>
            <div class="mb-2">
                <div class="has-text-left pb-2">Zertifikate</div>
                <div class="certificates-row">
                    {#each CertificateLogos as logo}
                        <div
                            class="logo-images"
                            class:is-active={certificates.includes(logo.name)}
                            on:click={() => addToCertificateLogos(logo.name)}
                        >
                            <img src={logo.image} alt="{logo.name}_Logo" />
                        </div>
                    {/each}
                </div>

                <form class="field has-addons has-text-centered mt-2" on:submit|preventDefault={addCertificates}>
                    <div class="control" style="width: 100%;">
                        <input bind:value={inputCertificates} class="input" type="text" placeholder="Zertikat" />
                    </div>
                    <div class="control">
                        <Button text="Hinzufügen" class="button is-primary" icon={mdiPlusBox} />
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
        </div>
        <hr />
        <div class="container has-text-centered">
            {#if !areMandatoryFieldsFilled}
                <div class="has-text-danger mb-4">Bitte überprüfe deine Eingabedaten</div>
            {/if}
            <Button
                text={saveText}
                on:click={() => addOrUpadteItem(false)}
                class="button is-primary mb-4"
                icon={item ? mdiPencil : mdiPlusBox}
                size="full-width"
                disabled={!areMandatoryFieldsFilled}
            />
            <br />
            {#if !item}
                <Button
                    text="Hinzufügen und neuen Artikel erstellen"
                    on:click={() => addOrUpadteItem(true)}
                    class="button is-primary mb-4"
                    icon={mdiPlusBoxMultiple}
                    size="full-width"
                    supplierTextField
                    disabled={!areMandatoryFieldsFilled}
                    />
                <br />
            {/if}

            {#if !edit}
                <Button
                    text="Eingabe löschen"
                    on:click={clearInputs}
                    class="button is-danger mb-4"
                    icon={mdiDelete}
                    size="full-width"
                />
                <br />
            {/if}

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
