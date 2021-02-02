<script>
    import robby from 'images/robby.gif';
    import { title, navBalance } from '../stores/page';
    import Button from '../components/common/Button.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Uups';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';

    export let status;
    export let error;
    const dev = process.env.NODE_ENV === 'development';
</script>

<style>
    img {
        height: 280px;
    }
    h1 {
        font-size: 2em;
        font-weight: bold;
    }
    p {
        font-size: 18px;
        line-height: 30px;
    }
</style>

<div class="container has-text-centered">
    <img src={robby} alt="Robby der Error Roboter" />
    <h1>{status}: Uups, du hast das Internet kaputt gemacht</h1>
    <p class="mt-4 mb-2">
        War nur ein Spaß. Aber es scheint, dass Robby dein persönlicher Roboter, die Seite nach der du suchst, nicht
        finden kann. Bitte stelle sicher, dass du die richtige Adresse eingegeben hast, oder gehe mit Hilfe des Buttons
        zurück zur Hauptseite.
    </p>

    <Button goHome={true} size="full-width" class="mt-4" />
    <br />
</div>

{#if dev && error.stack}
    <pre>{error.message}</pre>
    <pre>{error.stack}</pre>
{/if}
