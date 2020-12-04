<script>
	import ShoppingCart from '../components/shoppingCart/ShoppingCart.svelte';
	import { title } from '../stores/page';

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
$title = 'Warenkorb';
</script>

<svelte:head>
	<title>Warenkorb</title>
</svelte:head>

<ShoppingCart/>