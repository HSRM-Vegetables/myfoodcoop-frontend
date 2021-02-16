<script>
    import Loader from './Loader.svelte';

    /**
     * Defines if the loading spinner should be displayed.
     * Default: false
     */
    export let isLoading = false;

    /**
     * Defines if a grey background should be displayd during loading.
     * Default: false
     */
    export let displayBackgroundWhileLoading = false;
</script>

<style>
    .centered-loader-wrapper {
        position: relative;
        min-height: 100px;
        border-radius: 5px;
    }

    .is-loading {
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }

    .display-background {
        background-color: rgba(0, 0, 0, 0.322);
    }

    .loader-wrapper {
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        position: absolute;
    }
</style>

<div
    class="centered-loader-wrapper"
    class:is-loading={isLoading}
    class:display-background={isLoading && displayBackgroundWhileLoading}
>
    {#if isLoading}
        <div class="loader-wrapper">
            <!-- display the loader -->
            <Loader isLoading={isLoading} size="big" />
        </div>
    {/if}

    <slot />
</div>
