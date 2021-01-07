<script>
    import Button from '../../components/common/Button.svelte';
</script>

<h1 class="title mb-5">Reports</h1>

<Button href="/reports/sold-items" class="is-link" text="Was wurde in den letzten x Tagen verkauft?" />

<hr />

<div class="has-text-centered">
    <Button goHome={true} size="full-width" />
</div>
