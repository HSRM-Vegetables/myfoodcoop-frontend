<script>
    import User from '../scripts/user/User';
    import { userDetails } from '../stores/userDetails';

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
        if ($userDetails.roles.includes(enumValue)) {
            await User.userDeleteRole($userDetails.id, enumValue);
        } else {
            await User.userAddRole($userDetails.id, enumValue);
        }

        userDetails.forceUpdate();
    }
</script>

<style>
    .active {
        background: #00d1b2 !important;
        color: white !important;
        font-weight: bold;
    }
</style>

<h2 class="pt-4 is-size-5 has-text-weight-bold">Rollen:</h2>
{#each buttons as button}
    <button
        class:active={$userDetails.roles.includes(button.enum)}
        class="button is-outlined mr-2"
        on:click={() => changeRoles(button.enum)}
    >
        {button.name}
    </button>
{/each}
