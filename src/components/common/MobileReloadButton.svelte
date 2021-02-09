<script>
    import { mdiReload } from '@mdi/js';
    import Portal from 'svelte-portal/src/Portal.svelte';
    import Icon from './Icon.svelte';
</script>

<style>
    .reload-button {
        position: absolute;
        right: 75px;
        top: 20px;
        height: 40px;
        width: 40px;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        .reload-button {
            right: 15px;
        }
    }
</style>

<Portal target=".nav-element">
    <div class="reload-button is-hidden-desktop" on:click>
        <Icon icon={mdiReload} />
    </div>
</Portal>
