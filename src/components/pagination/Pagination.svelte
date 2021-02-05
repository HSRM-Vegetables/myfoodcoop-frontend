<script>
    import { createEventDispatcher } from 'svelte';

    /**
     * Number of currently shown page
     */
    export let pageNumber = 0;

    /**
     * The total number of pages for pagination
     */
    export let totalPages;

    const eventDispatcher = createEventDispatcher();

    let pages = [];

    // eslint-disable-next-line no-unused-expressions, no-sequences
    $: totalPages, updatePages();

    function updateData(newPageNumber) {
        pageNumber = newPageNumber;

        updatePages();
        eventDispatcher('update', { pageNumber });
    }

    function updatePages() {
        // clear old pages
        const newPages = [];

        // create a page object for each page
        for (let i = 0; i < totalPages; i += 1) {
            newPages.push({
                pageNumber: i,
                isEllipsis: false,
            });
        }

        let displayedPages = [];

        if (newPages.length > 7) {
            const ellipsis = { isEllipsis: true };

            if (pageNumber <= 1 || pageNumber >= newPages.length - 2) {
                displayedPages = [
                    newPages[0],
                    newPages[1],
                    newPages[2],
                    ellipsis,
                    newPages[newPages.length - 3],
                    newPages[newPages.length - 2],
                    newPages[newPages.length - 1],
                ];
            } else {
                displayedPages = [
                    newPages[0],
                    ellipsis,
                    newPages[pageNumber - 1],
                    newPages[pageNumber],
                    newPages[pageNumber + 1],
                    ellipsis,
                    newPages[newPages.length - 1],
                ];
            }
        } else {
            displayedPages = newPages;
        }

        // tell svelte to update the view
        pages = displayedPages;
    }
</script>

<!-- Only display paging if there is too much content for one page -->
{#if pages.length > 1}
    <nav class="pagination is-centered mt-3" role="navigation">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            class="pagination-previous has-text-weight-bold"
            disabled={pageNumber === 0 ? true : undefined}
            on:click={updateData(pageNumber - 1)}
        >
            &lt;
        </a>

        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            class="pagination-next has-text-weight-bold"
            disabled={pageNumber === pages.length - 1 ? true : undefined}
            on:click={updateData(pageNumber + 1)}
        >
            &gt;
        </a>

        <ul class="pagination-list is-hidden-mobile">
            {#each pages as page}
                <li>
                    {#if page.isEllipsis}
                        <!-- show 3 dots to indicate that there are more pages -->
                        <span class="pagination-ellipsis">&hellip;</span>
                    {:else}
                        <!-- display a page number -->
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                            class="pagination-link is-button"
                            class:is-current={page.pageNumber === pageNumber}
                            on:click={() => updateData(page.pageNumber)}
                        >
                            {page.pageNumber + 1}
                        </a>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
{/if}
