<script>
    import HistoryOverview from '../../components/history/HistoryOverview.svelte';
    import { title, navBalance } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Vergangene Einkäufe';
    $navBalance = 'hidden';
</script>

<HistoryOverview />

<hr />

<div class="has-text-centered"><a href="/" class="button is-link container">Zur Hauptseite</a></div>
