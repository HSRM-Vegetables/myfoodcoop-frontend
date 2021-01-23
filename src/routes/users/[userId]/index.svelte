<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import AuthorizeByRoles, { Roles } from '../../../components/common/AuthorizeByRoles.svelte';
    import Button from '../../../components/common/Button.svelte';
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import Loader from '../../../components/common/Loader.svelte';
    import RoleConcept from '../../../components/RoleConcept.svelte';
    import UserDetails from '../../../components/user/UserDetails.svelte';
    import User from '../../../scripts/user/User';
    import { title, navBalance } from '../../../stores/page';

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
            // user = User.getUserById(userId)
            user = await User.getUser();
        } catch (error) {
            requestError = error;
        } finally {
            isLoading = false;
        }
    })
</script>

<AuthorizeByRoles allowedRoles={[Roles.ADMIN, Roles.TREASURER]}>
    <ErrorModal error={requestError} />

    {#if isLoading}
        <Loader isLoading={isLoading} />
    {:else}
        <UserDetails user={user} />
        <RoleConcept user={user} />

        <div class="container has-text-centered mt-6">
            <Button href="/users" text="Zur Benutzerliste" class="is-primary mb-3" size="full-width" /><br />
            <Button goHome={true} size="full-width" />
        </div>
    {/if}
</AuthorizeByRoles>