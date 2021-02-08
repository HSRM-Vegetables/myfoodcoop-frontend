<script>
    import { Duration } from 'luxon';
    import { fade } from 'svelte/transition';
    import { mdiCheck } from '@mdi/js';
    import Icon from './Icon.svelte';
    import { toastText } from '../../stores/toast';

    /**
     * Seconds the toast should be displayed
     */
    export let seconds = 15;

    /**
     * Defines if the item is currently displayed
     */
    export let display = false;

    /**
     * Icon to be displayed besides the text
     */
    export let icon = mdiCheck;

    $: {
        if ($toastText) {
            display = true;

            // do not show the component anymore, after the time expired
            setTimeout(() => {
                display = false;
            }, Duration.fromObject({ seconds }));
        }
    }
</script>

<style>
    .toast {
        background-color: #00d1b2;
        box-shadow: 0 1em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        position: fixed;
        padding: 10px;
        border-radius: 5px;
        color: white;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-around;

        text-align: center;
        vertical-align: center;
    }

    @media (min-width: 1024px) {
        .toast {
            bottom: 30px;
            right: 30px;
        }
    }

    @media (max-width: 1024px) {
        .toast {
            bottom: 90px;
            right: 30px;
        }
    }

    @media (max-width: 600px) {
        .toast {
            left: 1em;
            right: 1em;
        }
    }
</style>

{#if display}
    <div class="toast" transition:fade>
        <Icon icon={icon} appbar={true} />
        {$toastText}
    </div>
{/if}
