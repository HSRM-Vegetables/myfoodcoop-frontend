<script>
    export let isClickable = false;
</script>

<style>
    .list-item {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        color: #000;
        display: block;
        padding: 1.25rem;
        margin-top: 20px;
    }

    .is-clickable {
        cursor: pointer;
    }
</style>

<div class="list-item" class:is-clickable={isClickable} on:click>
    <slot />
</div>
