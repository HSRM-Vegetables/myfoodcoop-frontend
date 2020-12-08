<script>
	import ShowStock from '../components/stock/ShowStock.svelte';
	import { title } from '../stores/page';

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
$title = 'Bestand';
</script>

<svelte:head>
	<title>Bestand</title>
</svelte:head>

<ShowStock/>
