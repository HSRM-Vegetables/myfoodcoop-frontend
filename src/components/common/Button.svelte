<script>
    import { mdiHome } from '@mdi/js';
    import Icon from './Icon.svelte';

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
     * Disables the button
     * Default: false.
     * Important: Only works if `href` is not set
     */
    export let disabled = false;

    /**
     * Converts the button to an anchor element.
     * The Link a click on the button should redirect to.
     * Important: Does not work with `disableOnLoad`
     */
    // Necessary because a not assigned variable is an expected value in svelte. But this value is optional.
    // eslint-disable-next-line no-undef-init
    export let href = undefined;

    export let goHome = false;

    /**
     * Material Design Icon to display beside the text
     */
    // Necessary because a not assigned variable is an expected value in svelte. But this value is optional.
    // eslint-disable-next-line no-undef-init
    export let icon = undefined;

    // of this is a go home button, set some defaults
    if (goHome) {
        href = '/';
        icon = mdiHome;
        text = 'Zur Hauptseite';
    }
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
        class="button {$$props.class} {goHome ? 'is-link' : ''}"
        class:is-loading={isLoading}
        class:medium={size === 'medium'}
        class:full-width={size === 'full-width'}
        on:click
    >
        {#if icon}
            <span class="icon">
                <Icon icon={icon} />
            </span>
        {/if}
        <span>{text}</span>
    </a>
    <!-- Dom-Event forwarding: https://svelte.dev/tutorial/dom-event-forwarding -->
{:else}
    <button
        type="submit"
        class="button {$$props.class} {goHome ? 'is-link' : ''}"
        class:is-loading={isLoading}
        class:medium={size === 'medium'}
        class:full-width={size === 'full-width'}
        disabled={disabled || (isLoading && disableOnLoad)}
        on:click
    >
        {#if icon}
            <span class="icon">
                <Icon icon={icon} />
            </span>
        {/if}
        <span>{text}</span>
    </button>
    <!-- Dom-Event forwarding: https://svelte.dev/tutorial/dom-event-forwarding -->
{/if}
