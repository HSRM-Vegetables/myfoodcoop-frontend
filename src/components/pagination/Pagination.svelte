<script>
    import { createEventDispatcher, onMount } from 'svelte';

    /**
     * Offset the request should start
     */
    export let offset = 0;

    /**
     * Limit of items for the current page
     */
    export let limit = 10;

    /**
     * The total amount of responses available
     */
    export let total;

    const eventDispatcher = createEventDispatcher();

    let pages = [];
    let currentPage = 1;
    const initialOffset = offset;

    // eslint-disable-next-line no-unused-expressions, no-sequences
    $: offset, total, updatePages();

    onMount(() => {
        updateData(initialOffset);
    });

    function updateData(newOffset) {
        currentPage = newOffset / limit + 1;
        updatePages();

        eventDispatcher('update', {
            offset: newOffset,
            limit,
        });
    }

    function updatePages() {
        // clear old pages
        let newPages = [];

        // get the (float) number of pages needet
        const pagesNeeded = total / limit;
        // round the float to the next int
        const pageCount = Math.ceil(pagesNeeded);

        // currentPage = Math.floor(total / (offset + limit));
        currentPage = offset / limit + 1;

        // create a page object for each page
        for (let pageNumber = 0; pageNumber < pageCount; pageNumber += 1) {
            newPages.push({
                pageNumber: pageNumber + 1,
                offset: initialOffset + limit * pageNumber,
                isEllipsis: false,
            });
        }

        if (newPages.length > 7) {
            // const centerPage = Math.round(newPages.length / 2);

            let displayedPages = [];
            const ellipsis = { isEllipsis: true };

            if (currentPage === 1 || currentPage === pages.length) {
                displayedPages = [
                    newPages[0],
                    newPages[1],
                    newPages[2],
                    ellipsis,
                    newPages[6],
                    newPages[7],
                    newPages[8],
                ];
            } else {
                const pageIndex = currentPage - 1;
                displayedPages = [
                    newPages[0],
                    ellipsis,
                    newPages[pageIndex - 1],
                    newPages[pageIndex],
                    newPages[pageIndex - 1],
                    ellipsis,
                    newPages[pages.length - 1],
                ];
            }

            newPages = displayedPages;
        }

        // tell svelte to update the view
        pages = newPages;
    }
</script>

<!-- Only display paging if there is too much content for one page -->
{#if pages.length > 1}
    <nav class="pagination is-centered mt-3" role="navigation">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            class="pagination-previous has-text-weight-bold"
            disabled={currentPage === 1 ? true : undefined}
            on:click={updateData(offset)}
        >&lt;</a>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            class="pagination-next has-text-weight-bold"
            disabled={currentPage === pages.length ? true : undefined}
            on:click={updateData(offset + limit)}
        >&gt;</a>

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
                            class:is-current={currentPage === page.pageNumber}
                            on:click={() => updateData(page.offset)}
                        >{page.pageNumber}</a>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
{/if}
