<script>
    import { onMount } from 'svelte';
    import Cookie from 'js-cookie';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { userName } from '../../stores/user';
    import CookieDefaults from '../../scripts/CookieDefaults';
    import RoleConcept from '../../components/RoleConcept.svelte';
    import User from '../../scripts/user/User';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
    $navBalance = 'show';

    let requestError;

    let user = {
        id: '',
        username: '',
        memberId: '',
        roles: [],
    };

    onMount(async () => {
        try {
            user = await User.getUser();
        } catch (error) {
            requestError = error;
        }
    });
    function clearLocalData() {
        localStorage.clear();
    }

    function logout() {
        Cookie.remove(CookieDefaults.TOKEN);
        window.location.reload();
    }
</script>

<h1 class="title">Hallo {$userName}!</h1>
<p>Mitgliedsnummer: {user.memberId}</p>
<p>
    {#if user.email !== undefined}Email: {user.email}{/if}
</p>
<RoleConcept user={user} />

<div class="container has-text-centered mt-6">
    <Button
        text="Achtung: Lokale Daten löschen"
        class="is-danger mb-3"
        on:click={clearLocalData}
        size="full-width"
    /><br />
    <Button text="Ausloggen" class="is-danger mb-3" on:click={logout} size="full-width" /><br />
    <Button goHome={true} size="full-width" />
</div>
