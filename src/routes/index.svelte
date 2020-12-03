<script>
	import logo from 'images/logo_black.png';
	import ShowBalance from '../components/balance/ShowBalance.svelte';
	import { title } from '../stores/page.js'

    $title = 'Stadtgemüse e.V.'
</script>

<style>
	h1, figure {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 24px;
	}
</style>

<ShowBalance/>
<figure>
	<img alt="Stadtgemüse Logo" src="{logo}">
</figure>
<h1>Willkommen!</h1>


