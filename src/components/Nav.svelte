<script>
    import logo from 'images/logo_white.png';
    import { mdiShopping, mdiLogout } from '@mdi/js';
    import Icon from './common/Icon.svelte';
    import ShowBalance from './balance/ShowBalance.svelte';
    import User from '../scripts/user/User';
    import { title, navBalance } from '../stores/page';
    import AuthorizeByRoles from './common/AuthorizeByRoles.svelte';
    import { Roles } from '../scripts/roles/Roles';
    import { cartItemsCount } from '../stores/shoppingCart';

    export let isLoggedIn;

    async function logout() {
        try {
            await User.logout();
        } catch (error) {
            // catch errors, but do not show it to the user
        }
    }
</script>

<style>
    .nav-element {
        color: white;
        background: #375a7f;
        position: relative;
        padding: 20px;
    }
    .nav-element img {
        height: 30px;
    }
    .page-title {
        position: absolute;
        left: 65px;
        top: 20px;
        color: white;
        font-weight: bold;
    }
    a.balance {
        color: white;
    }

    .blue-background {
        height: 30px;
        background: #375a7f;
    }
    span.nav-text {
        position: absolute;
        left: 25px;
        top: 70px;
    }
    a.cartIcon {
        color: white;
        position: absolute;
        right: 80px;
        top: 20px;
    }
    .cardCount {
        background: #f14668;
        color: white;
        font-weight: bold;
        position: absolute;
        padding: 5px 10px;
        border-radius: 50%;
        font-size: 12px;
        top: 14px;
        z-index: 20;
        right: 70px;
    }
    div.logoutIcon {
        color: white;
        position: absolute;
        right: 25px;
        top: 20px;
        cursor: pointer;
    }
</style>

<svelte:head>
    <title>{$title}</title>
</svelte:head>
<div class="nav-element">
    <a href="/">
        {#if $navBalance === 'show' && isLoggedIn}
            <img class="mb-5" src={logo} alt="Logo" />
        {:else}<img src={logo} alt="Logo" />{/if}
    </a>

    <span class="page-title is-size-5">{$title}</span>
    <AuthorizeByRoles allowedRoles={[Roles.MEMBER]} displayPermissionNotAllowed={false}>
        {#if isLoggedIn && $navBalance === 'show'}
            <span class="nav-text is-hidden-desktop"> Guthaben: </span>
            <a href="/balance" class="balance is-size-2 has-text-centered has-text-weight-bold">
                <div class="is-hidden-touch">
                    <ShowBalance type="inline" />
                </div>
                <div class="is-hidden-desktop">
                    <ShowBalance />
                </div>
            </a>
        {/if}
        <div on:click={logout} class="logoutIcon is-hidden-mobile">
            <Icon icon={mdiLogout} appbar={true} />
        </div>
        <div class="is-hidden-touch">
            {#if $cartItemsCount !== 0}<a href="/shopping/cart" class="cardCount">{$cartItemsCount}</a>{/if}
            <a href="/shopping/cart" class="cartIcon">
                <Icon icon={mdiShopping} appbar={true} />
            </a>
        </div>
    </AuthorizeByRoles>
</div>
<div class="blue-background is-hidden-desktop" />
