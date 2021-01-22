<script>
    import Cookie from 'js-cookie';
    import { mdiLogout } from '@mdi/js';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { userName } from '../../stores/user';
    import { userDetails } from '../../stores/userDetails';
    import CookieDefaults from '../../scripts/CookieDefaults';
    import UserDetails from '../../components/user/UserDetails.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
    $navBalance = 'show';

    function logout() {
        Cookie.remove(CookieDefaults.TOKEN);
        Cookie.remove(CookieDefaults.REFRESH_TOKEN);
        window.location.reload();
    }
</script>

<div class="is-size-3 has-text-weight-bold pb-5">{$userName}</div>

{#if $userDetails}
    <UserDetails user={$userDetails} showRoles={true} />

    <div class="container has-text-centered mt-6">
        <Button text="Ausloggen" class="is-danger mb-3" on:click={logout} size="full-width" icon={mdiLogout} /><br />
        <Button goHome={true} size="full-width" />
    </div>
{/if}
