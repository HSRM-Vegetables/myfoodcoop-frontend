<script>
    import { createEventDispatcher } from 'svelte';
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
        onRoleUpdate('roleUpdate', {
            role: enumValue,
        });
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
