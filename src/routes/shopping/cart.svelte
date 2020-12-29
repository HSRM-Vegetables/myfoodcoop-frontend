<script>
    import ShoppingCart from '../../components/shoppingCart/ShoppingCart.svelte';
    import { title, navBalance } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Warenkorb';
    $navBalance= 'show';

</script>

<svelte:head>
    <title>Warenkorb</title>
</svelte:head>

<ShoppingCart />

<hr />

<div class="has-text-centered mt-4"><a href="/" class="button is-link">Zur Hauptseite</a></div>
