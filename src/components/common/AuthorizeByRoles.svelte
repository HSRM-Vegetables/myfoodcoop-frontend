<script context="module">
    import { Roles as internalRoles } from '../../scripts/roles/Roles';

    /**
     * export the roles from this component, as they are frequently used with this component
     */
    export const Roles = internalRoles;

    /**
     * Check if one of the roles of the user is subset of allowed roles.
     * Export this method, because it's sometimes necessary to use it from outside
     * @param {string[]} userRoles current roles of the user
     * @param {string[]} allowedRoles roles that should be able interact with this component
     */
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
    import { userRoles } from '../../stores/user';
    import Button from './Button.svelte';

    /**
     * roles that should be able interact with this component
     */
    export let allowedRoles = [];

    /**
     * Display a message that the permission to visit this component is not allowed.
     * Default: true
     */
    export let displayPermissionNotAllowed = true;

    // internal flag if the access is allowed
    let isAuthorized = false;

    // check the access as soon as the userRoles update
    $: {
        if ($userRoles) {
            isAuthorized = isAccessAllowed($userRoles, allowedRoles);
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
    <!-- Shows user that he is not allowed to access this component -->
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
    <!-- Shows the content which is wrapped into the AuthorizeByRoles Tag -->
    <slot />
{/if}
