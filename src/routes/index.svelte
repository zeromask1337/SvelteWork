<script>
    import ResizableTable from '../components/ResizableTable.svelte';
    import photos, { photosAsync } from '../stores/photos.js';

    const sizes = [ 50, 100, 200, 5000 ];

    let page = 0
    let perPage = sizes[0];

    let pages = [];
    $: {
        const length = Math.ceil($photos.length / perPage);
        pages = Array.from({ length }, (_, index) => {
            const start = index * perPage;
            return $photos.slice(start, start + perPage);
        });
    }
    $: currentPagePhotos = pages.length > 0 ? pages[page] : [];

    function setPage(p) {
        if (p >= 0 && p < pages.length) {
            page = p;
        }
    }
</script>

<div class="table-wrapper" style="overflow-x: auto;">
    {#await $photosAsync}
        <mark>Loading...</mark>
    {:then _}
        <ResizableTable rows={currentPagePhotos} />
    {/await}
</div>
<select bind:value={perPage}>
    {#each sizes as size}
        <option value={size}>{size}</option>
    {/each}
</select>
<nav class="pagination">
    <ul>
        <li>
            <button
                    type="button"
                    class="btn-next-prev"
                    on:click={() => setPage(page - 1)}
            >
                PREV
            </button>
        </li>

        {#each pages as page, i}
            <li>
                <button
                        type="button"
                        class="btn-page-number"
                        on:click={() => setPage(i)}
                >
                    {i + 1}
                </button>
            </li>
        {/each}

        <li>
            <button
                    type="button"
                    class="btn-next-prev"
                    on:click={() => setPage(page + 1)}
            >
                NEXT
            </button>
        </li>
    </ul>
</nav>

<style>
    :global(body) {
        min-height: 100vh;
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    img {
        width: 25px;
        height: 25px;
    }

    .pagination {
        width: 100%;
        margin: 30px 0;

        display: flex;
        flex-flow: row;
        justify-content: center;
        /*align-items: center;*/
    }

    .pagination ul {
        list-style-type: none;
        padding: 0;
        width: 80vw;

        display: flex;
        flex-wrap: wrap;
    }

    .pagination ul li {
        margin: 2px;
    }

    .pagination ul li button {
        padding: 5px;
    }
</style>
