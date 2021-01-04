<script>
    import Button from '../../components/common/Button.svelte';
    import { title } from '../../stores/page';
    import { name } from '../../stores/user';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';

    function clearLocalData() {
        localStorage.clear();
    }
</script>

<h1 class="title">Hallo {$name}!</h1>

<div class="container has-text-centered mt-3">
    <Button text="Achtung: Lokale Daten löschen" class="is-danger mb-3" on:click={clearLocalData} size="full-width" /><br />
    <Button goHome={true} size="full-width" />
</div>
