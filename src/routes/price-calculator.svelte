<script>
	import PriceCalculator from '../components/PriceCalculator/PriceCalculator.svelte';
	import { title } from '../stores/page.js'

    $title = 'Preisrechner'
</script>

<style>

</style>

<svelte:head>
	<title>Preisrechner</title>
</svelte:head>

<PriceCalculator/>

