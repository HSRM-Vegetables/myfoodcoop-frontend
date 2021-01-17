<script>
    import Cookie from 'js-cookie';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { userName } from '../../stores/user';
    import CookieDefaults from '../../scripts/CookieDefaults';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
    $navBalance = 'show';

    function clearLocalData() {
        localStorage.clear();
    }

    function logout() {
        Cookie.remove(CookieDefaults.TOKEN);
    }
</script>

<h1 class="title">Hallo {$userName}!</h1>

<div class="container has-text-centered mt-3">
    <Button
        text="Achtung: Lokale Daten löschen"
        class="is-danger mb-3"
        on:click={clearLocalData}
        size="full-width"
    /><br />
    <Button text="Ausloggen" class="is-danger mb-3" on:click={logout} size="full-width" /><br />
    <Button goHome={true} size="full-width" />
</div>
