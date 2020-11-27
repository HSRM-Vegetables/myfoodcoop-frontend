<script>
	import BulmaGlobalStyles from '../components/BulmaGlobalStyles.svelte';
	import Nav from '../components/Nav.svelte';
</script>

<BulmaGlobalStyles></BulmaGlobalStyles>

<Nav />

<main>
	<slot></slot>
</main>