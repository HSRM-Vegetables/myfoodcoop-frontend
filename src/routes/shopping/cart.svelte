<script>
    import ShoppingCart from '../../components/shoppingCart/ShoppingCart.svelte';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Warenkorb';
    $navBalance = 'show';
</script>

<svelte:head>
    <title>Warenkorb</title>
</svelte:head>

<ShoppingCart />

<hr />

<div class="has-text-centered mt-4">
    <Button goHome={true} size="full-width" />
</div>
