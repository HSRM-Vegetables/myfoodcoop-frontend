<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import ErrorModal from '../../components/common/ErrorModal.svelte';
    import { title, navBalance } from '../../stores/page';
    import NoData from '../../components/common/NoData.svelte';
    import TextField from '../../components/common/TextField.svelte';
    import UserListItem from '../../components/user/UserListItem.svelte';
    import Loader from '../../components/common/Loader.svelte';
    import User from '../../scripts/user/User';
    import Button from '../../components/common/Button.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Benutzerliste';
    $navBalance = 'hidden';

    let requestError;
    let searchTerm;
    let searchTermElement;

    let allUsers = [];
    let notActivatedUsers = [];
    let activatedUsers = [];
    let isLoading = true;

    onMount(async () => {
        try {
            // allUsers = await UserList.getActivatedUsers();
            allUsers = await User.getAllUsers();
            allUsers = allUsers.users;

            notActivatedUsers = allUsers.filter((user) => user.roles.length === 0);
            activatedUsers = allUsers.filter((user) => user.roles.length > 0);
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    });

    function onSearchTermChange() {
        searchTerm = searchTermElement.getValue();
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.ADMIN, Roles.TREASURER]}>
    <ErrorModal error={requestError} />

    <div class="mb-4">
        <TextField
            bind:this={searchTermElement}
            label="Suchen (nach Benutzername oder Mitgliedsnummer):"
            placeholder="Suchen"
            on:input={onSearchTermChange}
        />
    </div>

    {#if isLoading}
        <Loader isLoading={isLoading} />
    {:else if !searchTerm}
        <!-- If no search term is given, display the users grouped by their activation status -->
        {#if notActivatedUsers.length > 0}
            <div class="mb-5">
                <div>Nicht aktivierte Benutzer:</div>
                {#each notActivatedUsers as user}
                    <UserListItem user={user} on:click={() => goto(`/users/${user.id}`)} />
                {/each}
            </div>
        {/if}

        <div>Aktivierte Benutzer:</div>
        {#each activatedUsers as user}
            <UserListItem user={user} on:click={() => goto(`/users/${user.id}`)} />
        {:else}
            <NoData text="Es wurden keine Benutzer gefunden!" />
        {/each}
    {:else}
        <!-- Display all users that match the search term -->
        {#each allUsers as user}
            {#if user.username
                .toLocaleUpperCase()
                .includes(searchTerm.toLocaleUpperCase()) || user.memberId.toString().includes(searchTerm)}
                <UserListItem user={user} on:click={() => goto(`/users/${user.id}`)} />
            {/if}
        {/each}
    {/if}

    <div class="container has-text-centered mt-6">
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
