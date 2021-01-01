<script context="module">
    let purchasId = -1;

    export async function preload({ params }) {
        purchasId = params.purchaseId;
    }
</script>

<script>
    import HistoryDetails from '../../components/history/HistoryDetails.svelte';
    import Button from '../../components/common/Button.svelte';
    import { title, navBalance } from '../../stores/page';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Einkaufshistorie';
    $navBalance = 'hidden';


</script>

<HistoryDetails purchaseID={purchasId} />

<div class="has-text-centered"><a href="/history" class="button is-primary">Zur Einkaufshistorie</a></div>

<div class="has-text-centered">
    <Button text="Zur Einkaufshistorie" href="/history" class="button is-primary" size="full-width" />
</div>
