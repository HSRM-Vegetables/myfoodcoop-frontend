<script>
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { name } from '../../stores/user';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
    $navBalance = 'show';

    function clearLocalData() {
        localStorage.clear();
    }
</script>

<h1 class="title">Hallo {$name}!</h1>

<div class="container has-text-centered mt-3">
    <Button text="Achtung: Lokale Daten löschen" class="is-danger mb-3" on:click={clearLocalData} /><br />
    <a href="/" class="button is-primary is-link">Zur Hauptseite</a><br />
</div>
