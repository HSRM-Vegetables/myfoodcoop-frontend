<script>
	import PriceCalculator from '../components/PriceCalculator/PriceCalculator.svelte';
	import { title } from '../stores/page';

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
$title = 'Preisrechner';
</script>

<style>

</style>

<svelte:head>
	<title>Preisrechner</title>
</svelte:head>

<PriceCalculator/>

