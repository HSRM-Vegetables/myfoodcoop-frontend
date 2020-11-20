<script>
	import BulmaGlobalStyles from '../components/BulmaGlobalStyles.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<BulmaGlobalStyles></BulmaGlobalStyles>
<Nav />

<main>
	<slot></slot>
</main>