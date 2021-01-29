<script>
    import { stores, goto } from '@sapper/app';
    import { onMount } from 'svelte';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import Button from '../../../components/common/Button.svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Loader from '../../../components/common/Loader.svelte';
    import RoleConcept from '../../../components/RoleConcept.svelte';
    import UserDetails from '../../../components/user/UserDetails.svelte';
    import User from '../../../scripts/user/User';
    import { title, navBalance } from '../../../stores/page';
    import { userId as loggedInUserId, refreshToken } from '../../../stores/user';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Benutzerdetails';
    $navBalance = 'hidden';

    const { page } = stores();
    const { userId } = $page.params;

    let isLoading = true;
    let requestError;
    let user;

    onMount(async () => {
        try {
            await updateUser();
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    });

    async function onRoleUpdate(e) {
        const { role } = e.detail;

        try {
            if (user.roles.includes(role)) {
                await User.userDeleteRole(user.id, role);
            } else {
                await User.userAddRole(user.id, role);
            }

            if ($loggedInUserId === user.id) {
                // update the token if the logged in user is the same as the user that is currently being eddited
                const response = await User.refreshToken($refreshToken);
                User.handleTokens(response.token, response.refreshToken);
            }
        } catch (error) {
            requestError = error;
        } finally {
            // refresh the user in every case, to stay up to date on its roles
            await updateUser();
        }
    }

    async function updateUser() {
        user = await User.getUserById(userId);
    }

    async function deleteMember() {
        try {
            await User.deleteUserById(userId);
            goto('/users');
        } catch (error) {
            requestError = error;
        } finally {
            // refresh the user in every case, to stay up to date on its roles
            await updateUser();
        }
    }
</script>

<AuthorizeByRoles allowedRoles={[Roles.ADMIN, Roles.TREASURER]}>
    <ErrorModal error={requestError} />

    {#if isLoading}
        <Loader isLoading={isLoading} />
    {:else}
        <UserDetails user={user} />

        <AuthorizeByRoles allowedRoles={[Roles.ADMIN]}>
            <hr />
            <RoleConcept user={user} on:roleUpdate={onRoleUpdate} />

            <div class="container has-text-centered mt-6">
                {#if user.roles.length === 0}
                    <Button
                        text="Mitglied aktivieren"
                        class="is-primary mb-3"
                        size="full-width"
                        on:click={() => onRoleUpdate({ detail: { role: Roles.MEMBER } })}
                    />
                {/if}

                <Button text="Mitglied löschen" class="is-danger" size="full-width" on:click={deleteMember} />
            </div>
        </AuthorizeByRoles>

        <hr />

        <div class="container has-text-centered mt-6">
            <Button href="/users" text="Zur Benutzerliste" class="is-primary mb-3" size="full-width" /><br />
            <Button goHome={true} size="full-width" />
        </div>
    {/if}
</AuthorizeByRoles>
