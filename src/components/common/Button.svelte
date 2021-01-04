<script>
    /**
     * Text content that should be displayed in the button
     */
    export let text;

    /**
     * The size the button should have.
     * One of auto, medium, full-width.
     * Default: auto
     */
    export let size = 'auto';

    /**
     * true if a loading spinner should be shown.
     * Default: false
     */
    export let isLoading = false;

    /**
     * Disables the button when `isLoading` is set.
     * Default: true.
     * Important: Only works if `href` is not set
     */
    export let disableOnLoad = true;

    /**
     * Converts the button to an anchor element.
     * The Link a click on the button should redirect to.
     * Important: Does not work with `disableOnLoad`
     */
    // Necessary because a not assigned variable is an expected value in svelte. But this value is optional.
    // eslint-disable-next-line no-undef-init
    export let href = undefined;
        
    export let goHome = false;
</script>

<style>
    .medium {
        width: 230px;
    }

    .full-width {
        width: 100%;
    }
    @media (min-width: 920px) {
        .full-width {
               width: 50%;
        }
    }

</style>
{#if href}
    <a
        href={href}
        class="button {$$props.class}"
        class:is-loading={isLoading}
        class:medium={size === 'medium'}
        class:full-width={size === 'full-width'}
        on:click
    >{text}</a>
    <!-- Dom-Event forwarding: https://svelte.dev/tutorial/dom-event-forwarding -->
{:else}
    {#if goHome}
    <a href="/" class="button medium is-link {$$props.class}" class:full-width={size === 'full-width'}>Zur Hauptseite</a>
    {:else}    
    <button
        type="submit"
        class="button {$$props.class}"
        class:is-loading={isLoading}
        class:medium={size === 'medium'}
        class:full-width={size === 'full-width'}
        disabled={isLoading && disableOnLoad}
        on:click
    >{text}</button>
    {/if}
    <!-- Dom-Event forwarding: https://svelte.dev/tutorial/dom-event-forwarding -->
{/if}
