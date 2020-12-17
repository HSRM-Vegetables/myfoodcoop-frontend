<script>
    /**
     * Used in order to set the default placeholder of an input field
     */
    export let placeholder = '';

    /**
     * If set, this text will be displayed on the right side of the input field
     */
    export let decoration = '';

    /**
     * Will be displayed above the input field
     */
    export let label = '';

    /**
     * Default html type of an input field
     */
    export let type = '';

    /**
     * Default input element minimum value
     */
    export let minimum = '';

    /**
     * Event handler for keydown event
     */
    export let onKeyDown = () => {};

    /**
    * Event handler for change event
    */
    export let onChange = () => {};

    /**
    * Event handler for input event
    */
    export let onInput = () => {};

    /**
     * Value to display
     */
    export let value = '';

    /**
     * Disables the input field
     */
    export let disabled = false;

    let inputElement; // References the input field
    let isInErrorState = false; // true, if the current input is not valid.

    export function clear() {
        inputElement.value = '';
    }

    export function isValid() {
        onChange();

        if (
            inputElement.value === ''
            || (!Number.isNaN(inputElement.value) && inputElement.value < 0)
        ) {
            isInErrorState = true;
            return false;
        }

        isInErrorState = false;
        return true;
    }

    export function getValue() {
        return inputElement.value;
    }
</script>

<style>
    .balance-input-deco {
        position: absolute;
        font-size: 1rem;
        color: #ccc6c6;
        right: 30px;
        top: 8px;
    }

    .error {
        box-shadow: inset 0 0.0625em 0.125em #f14668;
        border-color: #f14668;
    }
</style>

<div class="has-text-left pb-2">
    <span>{label}</span>
</div>
<div class="is-relative">
    <input
        bind:this={inputElement}
        class:error={isInErrorState}
        class="input"
        {type}
        {placeholder}
        min={minimum}
        on:change={isValid}
        on:input={onInput}
        on:keydown={onKeyDown}
        disabled={disabled}
        {value}
    />
    {#if decoration}
        <span class="balance-input-deco">{decoration}</span>
    {/if}
</div>
