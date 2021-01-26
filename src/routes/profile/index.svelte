<script>
    import Cookie from 'js-cookie';
    import { mdiLogout } from '@mdi/js';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { userName } from '../../stores/user';
    import { userDetails } from '../../stores/userDetails';
    import CookieDefaults from '../../scripts/CookieDefaults';
    import RoleConcept from '../../components/RoleConcept.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
    $navBalance = 'show';

    function clearLocalData() {
        localStorage.clear();
    }

    function logout() {
        Cookie.remove(CookieDefaults.TOKEN);
        window.location.reload();
    }
</script>

<div class="is-size-3 has-text-weight-bold pb-5">{$userName}</div>

{#if $userDetails}
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">Mitgliedsnummer:</div>
        <div class="column has-text-right">{$userDetails.memberId}</div>
    </div>
    {#if $userDetails.email !== undefined}
        <div class="columns">
            <div class="column is-size-5 has-text-weight-bold">Email:</div>
            <div class="column has-text-right">{$userDetails.email}</div>
        </div>
    {/if}

    <RoleConcept />

    <div class="container has-text-centered mt-6">
        <Button text="Ausloggen" class="is-danger mb-3" on:click={logout} size="full-width" icon={mdiLogout} /><br />
        <Button goHome={true} size="full-width" />
    </div>
{/if}
