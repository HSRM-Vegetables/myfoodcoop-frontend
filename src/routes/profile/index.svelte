<script>
    import { title, navBalance } from '../../stores/page';
    import { name } from '../../stores/user';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
    $navBalance= 'show';
</script>

<h1 class="title">Hallo {$name}!</h1>

<div class="container has-text-centered mt-3">
    <a href="/" class="button is-primary is-link">Zur Hauptseite</a><br />
</div>
