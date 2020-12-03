<script>
	import EditBalance from '../components/balance/EditBalance.svelte';
	import { title } from '../stores/page.js'

    $title = 'Guthaben bearbeiten'
</script>

<svelte:head>
	<title>Guthaben</title>
</svelte:head>

<EditBalance/>

