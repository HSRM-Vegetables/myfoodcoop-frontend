<script context="module">
    import { Roles as internalRoles } from '../../scripts/roles/Roles';

    export const Roles = internalRoles;

    export function isAccessAllowed(userRoles, allowedRoles) {
        let allowAccess = false;
        allowedRoles.forEach((role) => {
            if (userRoles.includes(role)) {
                allowAccess = true;
            }
        });
        return allowAccess;
    }
</script>

<script>
    import { mdiMinusCircleOutline } from '@mdi/js';
    import Icon from './Icon.svelte';
    import { userDetails } from '../../stores/userDetails';
    import Button from './Button.svelte';

    /**
     * doc here
     */
    export let allowedRoles = [];

    /**
     * doc here
     */
    export let displayPermissionNotAllowed = true;

    let isAuthorized = false;

    // if user-roles contains ORDERE set flag
    $: {
        if ($userDetails) {
            isAuthorized = isAccessAllowed($userDetails.roles, allowedRoles);
        }
    }
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

{#if !isAuthorized && displayPermissionNotAllowed}
    <div class="container">
        <div class="iconContainer">
            <Icon icon={mdiMinusCircleOutline} />
        </div>
        <h3>Zugriff nicht gestattet!</h3>
    </div>
    <br />
    <div class="has-text-centered">
        <Button goHome={true} size="full-width" />
    </div>
{:else if isAuthorized}
    <slot />
{/if}
