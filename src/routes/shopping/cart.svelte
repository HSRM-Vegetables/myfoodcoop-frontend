<script>
    import ShoppingCart from '../../components/shoppingCart/ShoppingCart.svelte';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Warenkorb';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'show';
</script>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]}>
    <ShoppingCart />

    <hr />

    <div class="has-text-centered mt-4">
        <Button goHome={true} size="full-width" />
    </div>
</AuthorizeByRoles>
