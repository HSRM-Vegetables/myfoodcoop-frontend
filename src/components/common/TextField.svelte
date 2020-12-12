<script>
    /**
     * Used in order to set the default placeholder of an input field
     */
    export let placeholder;

    /**
     * If set, this text will be displayed on the right side of the input field
     */
    export let decoration = '';

    /**
     * Will be displayed above the input field
     */
    export let label;

    /**
     * Default html type of an input field
     */
    export let type;

    /**
     * Default input element minimum value
     */
    export let minimum = '';

    let inputElement; // References the input field
    let isInErrorState = false; // true, if the current input is not valid. 

    export function clear() {
        inputElement.value = '';
    }

    export function isValid() {
        if (inputElement.value === '' || (!Number.isNaN(inputElement.value) && inputElement.value < 0)) {
            isInErrorState = true;
            return false;
        } else {
            isInErrorState = false;
            return true;
        }
    }

    export function getValue() {
        return inputElement.value;
    }
</script>

<style>
    .balance-input-deco{
        position: absolute;
        font-size: 1rem;
        color: #ccc6c6;
        right: 30px;
        top: 8px;
    }
    .error{
        box-shadow: inset 0 0.0625em 0.125em #f14668;
        border-color: #f14668;
    }
</style>

<div class="has-text-left pb-2">
    <span>{label}</span>
</div>
<div class="form-row is-relative">
    <input bind:this={inputElement} class:error={isInErrorState} class="input" type="{type}" placeholder="{placeholder}" min={minimum}  on:change={isValid} />
    {#if decoration}
        <span class="balance-input-deco">{decoration}</span>
    {/if}
</div>
