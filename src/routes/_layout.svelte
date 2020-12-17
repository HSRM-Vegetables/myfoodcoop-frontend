<script>
	import BulmaGlobalStyles from '../components/BulmaGlobalStyles.svelte';
import EnsureLogin from '../components/common/EnsureLogin.svelte';
	import Nav from '../components/Nav.svelte';
</script>

<BulmaGlobalStyles />
<EnsureLogin />

<Nav />

<main>
	<slot></slot>
</main>