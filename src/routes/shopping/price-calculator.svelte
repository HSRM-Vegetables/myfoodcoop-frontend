<script>
    import PriceCalculator from '../../components/PriceCalculator/PriceCalculator.svelte';
    import { title, navBalance } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Preisrechner';
    $navBalance= 'show';

</script>

<style>
</style>

<svelte:head>
    <title>Preisrechner</title>
</svelte:head>

<PriceCalculator />
