<script>
    import User from '../scripts/user/User';
    import { refreshToken, userId, userRoles } from '../stores/user';
    import ErrorModal from './common/ErrorModal.svelte';

    let requestError;

    const buttons = [
        {
            name: 'Mitglied',
            enum: 'MEMBER',
        },
        {
            name: 'Kassenwart',
            enum: 'TREASURER',
        },
        {
            name: 'Vorstand',
            enum: 'CHAIRMAN',
        },
        {
            name: 'Besteller/Verwalter',
            enum: 'ORDERER',
        },
    ];

    async function changeRoles(enumValue) {
        try {
            if ($userRoles.includes(enumValue)) {
                await User.userDeleteRole($userId, enumValue);
            } else {
                await User.userAddRole($userId, enumValue);
            }

            // The user roles are stored in the jwt token.
            // As we have now changed the roles, we need to update the token.
            const response = await User.refreshToken($refreshToken);
            User.handleTokens(response.token, response.refreshToken);
        } catch (error) {
            requestError = error;
        }
    }
</script>

<style>
    .active {
        background: #00d1b2 !important;
        color: white !important;
        font-weight: bold;
    }
</style>

<ErrorModal error={requestError} />

<h2 class="pt-4 is-size-5 has-text-weight-bold">Rollen:</h2>
{#each buttons as button}
    <button
        class:active={$userRoles.includes(button.enum)}
        class="button is-outlined mr-2"
        on:click={() => changeRoles(button.enum)}
    >
        {button.name}
    </button>
{/each}
