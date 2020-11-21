<script>
	import logo from 'images/logo.png';
	import { titleWithSuffix } from '../stores/page';
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

<svelte:head>
	<title>{$titleWithSuffix}Homepage asd</title>
</svelte:head>


<figure>
	<img alt="Stagemüse Logo" src="{logo}">
</figure>
<h1>Willkommen!</h1>

<input type="text" class="input is-round">

