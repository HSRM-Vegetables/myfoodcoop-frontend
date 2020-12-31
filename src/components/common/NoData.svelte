<script>
    import { mdiHelpCircle } from '@mdi/js';
    import Icon from './Icon.svelte';

    export let icon = mdiHelpCircle;

    export let text = 'Wir konnten leider keine Daten finden';
</script>

<style>
    .container {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    .iconContainer {
        color: #375a7f;
        max-width: 10em;
    }

    h3 {
        font-size: large;
    }
</style>

<div class="container">
    <div class="iconContainer">
        <Icon icon={icon} />
    </div>
    <h3>{text}</h3>
</div>
