<script>
        export let value;
        export let placeholder;
        export let deco;
        export let title;
        export let type;
</script>
<style>
    .balance-input-deco{
        position: absolute;
        font-size: 1rem;
        color: #ccc6c6;
        right: 30px;
        top: 8px;
    }
</style>

<div class="has-text-left pb-2">{title}</div>
<div class="form-row is-relative">
    <input bind:this={value} class="input" type="{type}" placeholder="{placeholder}" />
    {#if deco}
        <span class="balance-input-deco">{deco}</span>
    {/if}
</div>
