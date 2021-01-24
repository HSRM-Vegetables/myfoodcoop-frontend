<script>
    import { createEventDispatcher } from 'svelte';
    import User from '../scripts/user/User';
    import Switch from './common/Switch.svelte';
    import ErrorModal from './common/ErrorModal.svelte';
    import { Roles } from '../scripts/roles/Roles';

    export let user;

    const onRoleUpdate = createEventDispatcher();
    let requestError;

    const buttons = [
        {
            name: 'Member',
            enum: Roles.MEMBER,
        },
        {
            name: 'Treasurer',
            enum: Roles.TREASURER,
        },
        {
            name: 'Admin',
            enum: Roles.ADMIN,
        },
        {
            name: 'Orderer',
            enum: Roles.ORDERER,
        },
    ];

    async function changeRoles(enumValue) {
        try {
            if (user.roles.includes(enumValue)) {
                await User.userDeleteRole(user.id, enumValue);
            } else {
                await User.userAddRole(user.id, enumValue);
            }

            onRoleUpdate('roleUpdate');
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
                checked={user.roles.includes(button.enum)}
                on:click={() => changeRoles(button.enum)}
            />
        </div>
    </div>
{/each}
