<script>
	import EditBalance from '../components/balance/EditBalance.svelte';
	import { title } from '../stores/page';

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
$title = 'Guthaben bearbeiten';
</script>

<svelte:head>
	<title>Guthaben</title>
</svelte:head>

<EditBalance/>

