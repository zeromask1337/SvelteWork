<script>
    export let headers = []
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

<style>
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
</style>