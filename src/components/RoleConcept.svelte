<script>
    import User from '../scripts/user/User';

    export let user = {
        id: '',
        username: '',
        memberId: '',
        roles: [],
    };

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
    function changeRoles(enumValue) {
        if (user.roles.includes(enumValue)) {
            user = User.userDeleteRole(user.id, enumValue);
        } else {
            user = User.userAddRole(user.id, enumValue);
        }
        window.location.reload();
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
        class:active={user.roles.includes(button.enum)}
        class="button is-primary is-outlined mr-2"
        on:click={() => changeRoles(button.enum)}
    >
        {button.name}
    </button>
{/each}
