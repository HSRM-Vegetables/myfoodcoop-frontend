<script>
    import AdjustBalance from '../components/balance/AdjustBalance.svelte';
    import { title } from '../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Guthaben anpassen';
</script>

<svelte:head>
    <title>Guthaben anpassen</title>
</svelte:head>

<AdjustBalance />
