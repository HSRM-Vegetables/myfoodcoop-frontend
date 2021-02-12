<script>
    import { createEventDispatcher } from 'svelte';

    /**
     * The total number of pages for pagination
     */
    export let pageCount;

    /**
     * Number of currently shown page
     */
    export let currentPageIndex = 0;

    const eventDispatcher = createEventDispatcher();

    let pages = [];

    // eslint-disable-next-line no-unused-expressions, no-sequences
    $: pageCount, updatePages();

    function updateData(newPageIndex) {
        currentPageIndex = newPageIndex;

        updatePages();
        eventDispatcher('update', { newPageIndex: newPageIndex });
    }

    function updatePages() {
        // clear old pages
        const newPages = [];

        // create a page object for each page
        for (let i = 0; i < pageCount; i += 1) {
            newPages.push({
                pageIndex: i,
                isEllipsis: false,
            });
        }

        let displayedPages = [];

        if (newPages.length > 7) {
            const ellipsis = { isEllipsis: true };

            if (currentPageIndex <= 1 || currentPageIndex >= newPages.length - 2) {
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
                    newPages[currentPageIndex - 1],
                    newPages[currentPageIndex],
                    newPages[currentPageIndex + 1],
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
            disabled={currentPageIndex === 0 ? true : undefined}
            on:click={updateData(currentPageIndex - 1)}
        >
            &lt;
        </a>

        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            class="pagination-next has-text-weight-bold"
            disabled={currentPageIndex === pageCount - 1 ? true : undefined}
            on:click={updateData(currentPageIndex + 1)}
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
                            class:is-current={page.pageIndex === currentPageIndex}
                            on:click={() => updateData(page.pageIndex)}
                        >
                            {page.pageIndex + 1}
                        </a>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
{/if}
