<script>
	import ShoppingCart from '../components/shoppingCart/ShoppingCart.svelte';
	import { title } from '../stores/page.js'

    $title = 'Warenkorb'
</script>

<svelte:head>
	<title>Warenkorb</title>
</svelte:head>

<ShoppingCart/>