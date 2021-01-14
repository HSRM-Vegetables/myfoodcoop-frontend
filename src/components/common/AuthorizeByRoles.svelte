<script context="module">
    import { Roles as internalRoles } from '../../scripts/roles/Roles';

    export const Roles = internalRoles;
</script>

<script>
    import { mdiMinusCircleOutline } from '@mdi/js';
    import Icon from './Icon.svelte';

    export let allowedRoles = [];

    // export let displayAllowdByRole = true;

    let isAuthorized = false;

    // check here in future from BE if roles fits current user
    function checkAccess() {
        if (allowedRoles.includes(Roles.MEMBER)) {
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
    <!-- Why false here? Review needed -->
    <!--{#if displayAllowdByRole = false}  -->
    <div class="container">
        <div class="iconContainer">
            <Icon icon={mdiMinusCircleOutline} />
        </div>
        <h3>Zugriff nicht gestattet!</h3>
    </div>
    <!--{/if}-->
{:else}
    <slot />
{/if}
