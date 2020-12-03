<script>
    import ShowBalance from '../../components/balance/ShowBalance.svelte';
    import { titleWithSuffix } from '../../stores/page';
    import HistoryOverview from '../../components/history/HistoryOverview.svelte';
</script>

<svelte:head>
    <title>{$titleWithSuffix}Einkaufshistorie</title>
</svelte:head>

<ShowBalance />

<hr>

<HistoryOverview />

<hr>

<div class="has-text-centered">
    <a href="/" class="button is-primary container">Zur Hauptseite</a>
</div>