<script>
    import StockFiller from '../../../components/stock/StockFiller.svelte';
    import { title, navBalance } from '../../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Bestand hinzufügen';
    $navBalance= 'hidden';
</script>

<StockFiller />
