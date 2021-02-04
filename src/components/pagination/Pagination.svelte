<script>
    import { createEventDispatcher, onMount } from 'svelte';

    export let offset = 0;
    export let limit = 10;
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
        // currentPage = Math.floor(total / (offset));
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

        // if we have more then 7 pages, only display the first, the 3 in the middle and the last page
        if (newPages.length > 7) {
            const centerPage = Math.round(newPages.length / 2);

            const displayedPages = [
                newPages[0],
                { isEllipsis: true },
                newPages[centerPage - 1],
                newPages[centerPage],
                newPages[centerPage + 1],
                { isEllipsis: true },
                newPages[newPages.length - 1],
            ];

            newPages = displayedPages;
        }

        // tell svelte to update the view
        pages = newPages;
    }
</script>

<slot />

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
