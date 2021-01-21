<script>
    import logo from 'images/logo_white.png';
    import ShowBalance from './balance/ShowBalance.svelte';
    import { title, navBalance } from '../stores/page';
    import AuthorizeByRoles from './common/AuthorizeByRoles.svelte';
    import { Roles } from '../scripts/roles/Roles';

    export let isLoggedIn;
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
    .inline-balance {
        position: absolute;
        right: 15px;
        top: 25px;
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
        {:else if isLoggedIn && $navBalance === 'inline'}
            <div class="inline-balance">
                <ShowBalance />
            </div>
        {/if}
    </AuthorizeByRoles>
</div>
<div class="blue-background is-hidden-desktop" />
