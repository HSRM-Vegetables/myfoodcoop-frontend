<script>
    /**
     * Define if the modal is opend or closed
     */
    export let open;

    /**
     * Text that shows in the title of the modal
     */
    export let title;

    function closeModal() {
        open = false;
    }
</script>

<div class="modal" class:is-active={open}>
    <!-- This is the light grey background -->
    <div class="modal-background" on:click={closeModal} />

    <div class="modal-card">
        <!-- The header of the card -->
        <header class="modal-card-head">
            <p class="modal-card-title">{title}</p>
            <button class="delete" aria-label="close" on:click={closeModal} />
        </header>

        <!-- Main Component, insert content as slot -->
        <section class="modal-card-body">
            <slot name="body" />
        </section>

        <!-- Footer, insert content as slot -->
        <footer class="modal-card-foot">
            <slot name="footer" />
        </footer>
    </div>
</div>
