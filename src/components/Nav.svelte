<script>
    import logo from 'images/logo_white.png';
    import { mdiBasket } from '@mdi/js';
    import ShowBalance from './balance/ShowBalance.svelte';
    import { name } from '../stores/user';
</script>

<style>
    .nav-element {
        color: white;
        background: #375a7f;
        position: relative;
        padding: 20px;
    }
    .nav-element img {
        height: 40px;
    }
    .name-title {
        position: absolute;
        padding-left: 15px;
        top: 23px;
    }
    .nav-element svg {
        height: 40px;
        width: auto;
        float: right;
        color: white;
    }
    a.balance {
        padding: 50px 0;
        color: white;
    }
    .blue-background {
        height: 30px;
        background: #375a7f;
    }
</style>

<div class="nav-element">
    <a href="/"><img src={logo} alt="Logo" /></a>
    <span class="is-size-4 name-title"> {$name} </span>
    <a href="/shopping/cart">
        <svg viewbox="0 0 24 24">
            <path fill="currentColor" d={mdiBasket} />
        </svg>
    </a><br />
    <a href="/balance" class="balance has-text-centered has-text-weight-bold">
        <ShowBalance />
    </a>
</div>
<div class="blue-background" />
