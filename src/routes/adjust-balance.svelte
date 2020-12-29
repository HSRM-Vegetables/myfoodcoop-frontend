<script>
    import AdjustBalance from '../components/balance/AdjustBalance.svelte';
    import { title, navBalance } from '../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Guthaben anpassen';
    $navBalance = 'hidden';
</script>

<svelte:head>
    <title>Guthaben anpassen</title>
</svelte:head>

<AdjustBalance />
