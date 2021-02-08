<script>
    import { goto } from '@sapper/app';
    import { mdiDeleteVariant } from '@mdi/js';
    import Stock from '../../scripts/stock/Stock';
    import { UnitType } from '../../scripts/stock/UnitType';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import TextField from '../common/TextField.svelte';

    /**
     * The item to be disposed of
     */
    export let item;

    let requestError;
    let disposeInProgress = false;
    let disposeQuantityInput;
    let disposeQuantityError = false;
    let errorHint;

    async function dispose() {
        disposeInProgress = true;
        const disposeQuantity = disposeQuantityInput.getValue();
        errorHint = undefined;
        disposeQuantityError = !isQuantityValid(disposeQuantity);

        if (!disposeQuantityError) {
            try {
                await Stock.disposeItem(item.id, disposeQuantity);
                goto(`/stock/item/${item.id}?message=Ware%20erfolgreich%20entsorgt`);
            } catch (error) {
                requestError = error;
            }
        }

        disposeInProgress = false;
    }

    function isQuantityValid(disposeQuantity) {
        // Quantity is negative
        if (disposeQuantity <= 0) {
            errorHint = 'Die Bestandsmenge darf nicht negativ sein!';
            return false;
        }

        // Quantity is not a number
        if (Number.isNaN(disposeQuantity)) {
            errorHint = 'Die Bestandsmenge muss eine Zahl sein!';
            return false;
        }

        // Fractional quantity with unitType PIECE
        if (item.unitType === UnitType.PIECE && parseFloat(disposeQuantity % 1) !== 0) {
            errorHint = 'Die Bestandsmenge muss eine ganze Zahle sein, wenn Stückpreis ausgewählt ist!';
            return false;
        }

        return true;
    }
</script>

<ErrorModal error={requestError} />

{#if item}
    <div class="is-size-3 has-text-weight-bold mb-3">{item.name}</div>
    <div class="columns is-mobile">
        <div class="column">Menge im Bestand</div>
        <div class="column has-text-right">{item.quantity} {item.unitType === UnitType.PIECE ? 'Stück' : 'kg'}</div>
    </div>
    {#if errorHint}
        <article class="message is-danger">
            <div class="message-body">{errorHint}</div>
        </article>
    {/if}
    <TextField
        type="number"
        placeholder="Menge verdorbener Ware"
        bind:this={disposeQuantityInput}
        isInErrorState={disposeQuantityError}
        label="Menge verdorbener Ware"
        decoration={item.unitType === UnitType.KILO ? 'kg' : 'Stück'}
        minimum="0"
        value="0"
        on:enter={dispose}
        disabled={disposeInProgress}
    />
    <div class="container has-text-centered">
        <Button
            text="entsorgen"
            on:click={dispose}
            isLoading={disposeInProgress}
            class="is-danger mt-5 mb-3"
            size="full-width"
            icon={mdiDeleteVariant}
        />
    </div>
{/if}
