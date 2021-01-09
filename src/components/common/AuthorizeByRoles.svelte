<script context="module">
    import { Roles as internalRoles } from '../../scripts/roles/Roles';

    export const Roles = internalRoles;
</script>

<script>
    import { mdiMinusCircleOutline } from '@mdi/js';
    import Icon from './Icon.svelte';

    export let allowedRoles = [];

    let isAuthorized = false;

    function checkAccess() {
        if (allowedRoles.includes(Roles.ALL)) {
            isAuthorized = true;
        }
    }

    checkAccess();
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

{#if !isAuthorized}
    <div class="container">
        <div class="iconContainer">
            <Icon icon={mdiMinusCircleOutline} />
        </div>
        <h3>Zugriff nicht gestattet!</h3>
    </div>
{:else}
    <slot />
{/if}
