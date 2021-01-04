<script>
    import ShowBalance from '../../components/balance/ShowBalance.svelte';
    import HistoryOverview from '../../components/history/HistoryOverview.svelte';
    import Button from '../../components/common/Button.svelte';
    import { title } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Einkaufshistorie';
</script>

<ShowBalance type="inline" />

<hr />

<HistoryOverview />

<hr />

<div class="has-text-centered">
    <Button goHome={true} size="full-width" />
</div>
