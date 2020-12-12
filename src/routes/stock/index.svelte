<script>
	import ShowStock from '../../components/stock/ShowStock.svelte';
	import { title } from '../../stores/page';

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
$title = 'Bestand';
</script>

<ShowStock/>

<hr>

<div class="has-text-centered">
    <a href="/" class="button is-link container">Zur Hauptseite</a>
</div>