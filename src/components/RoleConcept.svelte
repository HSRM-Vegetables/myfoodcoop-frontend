<script>
    import User from '../scripts/user/User';
    import { refreshToken, userId, userRoles } from '../stores/user';
    import Switch from './common/Switch.svelte';
    import ErrorModal from './common/ErrorModal.svelte';

    let requestError;

    const buttons = [
        {
            name: 'Member',
            enum: 'MEMBER',
        },
        {
            name: 'Treasurer',
            enum: 'TREASURER',
        },
        {
            name: 'Admin',
            enum: 'ADMIN',
        },
        {
            name: 'Orderer',
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

<ErrorModal error={requestError} />

<h2 class="pt-4 pb-4 is-size-5 has-text-weight-bold">Rollen:</h2>
{#each buttons as button}
    <div class="columns is-mobile">
        <div class="column">{button.name}</div>
        <div class="column has-text-right">
            <Switch
                twoColor={true}
                checked={$userRoles.includes(button.enum)}
                on:click={() => changeRoles(button.enum)}
            />
        </div>
    </div>
{/each}
