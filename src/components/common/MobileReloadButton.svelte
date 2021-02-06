<script>
    import { mdiReload } from '@mdi/js';
    import Portal from 'svelte-portal/src/Portal.svelte';
    import Icon from './Icon.svelte';
</script>

<style>
    .reload-button {
        position: absolute;
        right: 25px;
        top: 21px;
        height: 25px;
        width: 25px;
        cursor: pointer;
    }
</style>

<Portal target=".nav-element">
    <div class="reload-button is-hidden-desktop" on:click>
        <Icon icon={mdiReload} />
    </div>
</Portal>
