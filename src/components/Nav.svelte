<script>
    import logo from 'images/logo_white.png';
    import { title } from '../stores/page.js'
</script>

<style>
    nav {
        border-radius: 0;
    }

    .navbar-item {
        vertical-align: middle;
    }

    .title-box {
        color: white;
        margin: auto;
    }

</style>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <img src={logo} alt="logo">
        </a>

        <div class="title-box">{$title}</div>
    </div>
</nav>
