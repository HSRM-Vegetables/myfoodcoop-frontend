<script>
    /**
     * The item to be disposed of
     */
    export let item;
</script>

{#if item}
    <div class=" is-size-3 has-text-weight-bold">{item.name}</div>
{/if}
