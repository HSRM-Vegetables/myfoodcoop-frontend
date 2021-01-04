<script>
    import ErrorModal from '../../../components/common/ErrorModal.svelte';
    import SoldItemsComp from '../../../components/reports/SoldItems.svelte';
    import SoldItems from '../../../scripts/reports/SoldItems';

    let requestError;
    let soldItems;

    async function loadItems() {
        try {
            soldItems = await SoldItems.getItems();
        } catch (error) {
            requestError = error;
        }
    }

    loadItems();
</script>

<h1 class="title mb-5">Was wurde in den letzten x Tagen verkauft?</h1>

{#if requestError !== undefined}
    <article class="message is-danger">
        <div class="message-body">Leider ist beim Abrufen der Daten etwas schief gelaufen.</div>
    </article>
{:else}
    <SoldItemsComp soldItems={soldItems}/>
{/if}

<ErrorModal error={requestError} />

<div class="has-text-centered"><a href="/reports/" class="button is-link container">Zurück</a></div>