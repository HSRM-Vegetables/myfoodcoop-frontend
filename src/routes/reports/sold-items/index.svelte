<script>
    import ErrorModal from '../../../components/common/ErrorModal.svelte';

    let requestError;

    async function loadItems() {
        try {
            requestError = undefined;
        } catch (error) {
            requestError = error;
        }
    }

    loadItems();
</script>

<h1 class="title mb-5">Was wurde in den letzten x Tagen verkauft?</h1>

<ErrorModal error={requestError} />

<div class="has-text-centered"><a href="/reports/" class="button is-link container">Zurück</a></div>