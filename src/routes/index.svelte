<script lang="ts">
    import { onMount } from "svelte";

    let rows = [],
        totalPages = [],
        currentPageRows = [],
        headers = [];
    let page = 0
    let itemsPerPage;
    let loading = true; // possible feature
    let sizes: number[] = [50, 100, 200];

    $: currentPageRows = totalPages.length > 0 ? totalPages[page] : [];
    $: console.log("Page is", page);

    const paginate = (items) => {
        const pages = Math.ceil(items.length / itemsPerPage);

        const paginatedItems = Array.from({ length: pages }, (_, index) => {
            const start = index * itemsPerPage;
            return items.slice(start, start + itemsPerPage);
        });

        console.log("paginatedItems are", paginatedItems);
        totalPages = [...paginatedItems];
    };

    const mountPlaceholder = async () => {
        const entities = await fetch("https://jsonplaceholder.typicode.com/photos");
        rows = await entities.json();
        headers = Object.keys(rows[0]);
        paginate(rows);
    }
    onMount(() => {
        mountPlaceholder()
    });

    const setPage = (p) => {
        if (p >= 0 && p < totalPages.length) {
            page = p;
        }
    }

    console.log("currentPageRows", currentPageRows);
</script>

<div class="table-wrapper" style="overflow-x: auto;">
    <table>
        <thead>
        <tr>
            {#each headers as header}
                <th>{header}</th>
            {/each}
            {#each headers as header}
                <th>{header}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each currentPageRows as row}
            <tr>
                {#each headers as header}
                    <td>{row[header]}</td>
                {/each}
                {#each headers as header}
                    <td>{row[header]}</td>
                {/each}
            </tr>
        {/each}

        </tbody>
    </table>
</div>
<select name="" id="" bind:value={itemsPerPage} on:change={() => mountPlaceholder()}>
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

        {#each totalPages as page, i}
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

    .table-wrapper {
        /*margin-bottom: 30px;*/
    }

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;

        contain: strict;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }

    header .search-container {
        float: right;
    }

    header input[type=text] {
        padding: 6px;
        margin-top: 8px;
        font-size: 17px;
        border: none;
    }

    header .search-container button {
        float: right;
        padding: 6px 10px;
        margin-top: 8px;
        margin-right: 16px;
        background: #ddd;
        font-size: 17px;
        border: none;
        cursor: pointer;
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
