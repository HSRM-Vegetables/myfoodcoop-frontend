<script>
    export let value = ''; // Get Value
    export let placeholder; // Set placeholder
    export let deco = ''; // Set Deco for input field
    export let title; // Set Lable
    export let type = ''; // Set input Type
    export let isError = ''; // Set Error class
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
    {title}
</div>
<div class="form-row is-relative">
    <input bind:this={value} class="input" type="{type}" placeholder="{placeholder}" class:error={isError}/>
    {#if deco}
        <span class="balance-input-deco">{deco}</span>
    {/if}
</div>
