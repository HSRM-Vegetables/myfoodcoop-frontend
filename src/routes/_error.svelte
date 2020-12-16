<script>
import robo from 'images/robo.gif';

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
    <img src="{robo}" alt="Robo der Error Roboter" />
  <h1>{status}: Uups, du hast das Internt kaputt gemacht</h1>
  <p class="mt-4 mb-2">War nur ein Spaß. Aber es scheint, dass Robo, Ihr persönlicher Roboter, die Seite, nach der Sie suchen, nicht finden kann. Bitte stellen Sie sicher, dass Sie die richtige Adresse eingegeben haben, oder gehen Sie mit Hilfe des Button zurück.</p>
  <a href="/" class="button is-primary mb-4">Zurück zur Hauptseite</a><br />
</div>

{#if dev && error.stack}
    <pre>{error.message}</pre>
	<pre>{error.stack}</pre>
{/if}
