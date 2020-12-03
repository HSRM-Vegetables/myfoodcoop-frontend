<script>
	import AdjustBalance from '../components/balance/AdjustBalance.svelte';
	import { title } from '../stores/page.js'

    $title = 'Guthaben anpassen'
</script>

<svelte:head>
	<title>Guthaben anpassen</title>
</svelte:head>

<AdjustBalance/>

