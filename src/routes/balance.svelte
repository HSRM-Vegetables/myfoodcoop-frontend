<script>
	import logo from 'images/logo.png';
	import ShowBalance from '../components/balance/ShowBalance.svelte';
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
	<title>{$titleWithSuffix}Guthaben</title>
</svelte:head>

<h1><ShowBalance></ShowBalance></h1>

