<script>
    import { goto } from '@sapper/app';
    import { UnitType } from '../../scripts/UnitType';
    import Stock from '../../scripts/stock/Stock';
    import TextField from '../common/TextField.svelte';
    import Switch from '../common/Switch.svelte';

    let unitPriceElement;
    let quantityElement;
    let articleElement;
    let descriptionElement;
    let unitType = UnitType.KILO;

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
        const error = errorHandler(
            articleElement,
            unitPriceElement,
            quantityElement
        );

        if (error) {
            item.addItem(
                articleElement.value,
                unitType,
                unitPriceElement.value,
                quantityElement.value,
                descriptionElement.value
            );
            goto('/stock/');
        }
    }

    function errorHandler(...elements) {
        let result = true;
        elements.forEach((element) => {
            if (element.value === '') {
                result = false;
                element.classList.add('error');
            } else {
                element.classList.remove('error');
            }
        });
        return result;
    }

    function clearInputs() {
        articleElement.value = '';
        unitPriceElement.value = '';
        quantityElement.value = '';
        descriptionElement.value = '';
    }
</script>

<style>
    .fix-button-width {
        width: 230px;
    }
</style>

<div>
    <div class="form">
        <div class="pt-4">
            <TextField bind:value={articleElement} placeholder="Artikel" title="Artikel" />
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
            <TextField bind:value={unitPriceElement} type="number" placeholder="Warenpreis" title="Warenpreis" deco={unitType === UnitType.KILO ? '€ / kg' : '€ / Stück'} />
        </div>
        <div class="pt-4">
            <TextField bind:value={quantityElement} type="number" placeholder="Bestands Menge" title="Bestands Menge" deco={unitType === UnitType.KILO ? 'kg' : 'Stück'} />
        </div>
        <div class="pt-4">
            <div class="has-text-left pb-2">Beschreibung</div>
            <div class="form-row is-relative">
                <textarea class="textarea" placeholder="Beschreibung" bind:this={descriptionElement} />
            </div>
        </div>
        <hr />
        <div class="button-box has-text-centered">
            <button on:click={addItem} class="button is-primary mb-4 fix-button-width"> Bestand hinzufügen
            </button><br />
            <button on:click={clearInputs} class="button is-danger mb-4 fix-button-width"> Eingabe löschen
            </button><br />
            <div class="container has-text-centered mt-6">
                <a href="/stock/" type="submit" class="button is-primary is-link fix-button-width">Zurück</a><br />
            </div>
        </div>
    </div>
</div>
