<script>
    import ShowBalance from '../../components/balance/ShowBalance.svelte';
    import HistoryOverview from '../../components/history/HistoryOverview.svelte';
    import { title } from '../../stores/page';

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
$title = 'Vergangene Einkäufe';
</script>

<ShowBalance />

<hr>

<HistoryOverview />

<hr>

<div class="has-text-centered">
    <a href="/" class="button is-link container">Zur Hauptseite</a>
</div>