<script>
    export let rows = [];

    let offsetHeight = 0;
    let resizingIndex = -1;
    let resizers = [];

    $: headers = rows.length ? Object.keys(rows[0]) : [];

    function resizable(col, resizer) {
        let x = 0;
        let w = 0;
        let i = 0;

        function mouseDownHandler (e) {
            x = e.clientX;

            const styles = window.getComputedStyle(col);
            w = parseInt(styles.width, 10);

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);

            resizingIndex = i;
        }

        function mouseUpHandler () {
            resizingIndex = -1;
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        function mouseMoveHandler(e) {
            const dx = e.clientX - x;
            col.style.width = `${w + dx}px`;
        };

        function update(_resizer) {
            destroy();
            resizer = _resizer;
            if (resizer) {
                i = resizers.indexOf(resizer);
                resizer.addEventListener('mousedown', mouseDownHandler);
            }
        }

        function destroy() {
            resizer && resizer.removeEventListener('mousedown', mouseDownHandler);
        }

        update(resizer);

        return {
            update,
            destroy,
        };
    }
</script>

<table bind:offsetHeight>
    <thead class="resizable">
    <tr>
        {#each headers as header, i}
            <th use:resizable={resizers[i]}>
                {header}
                <div
                        bind:this={resizers[i]}
                        style="height: {offsetHeight}px"
                        class="resizer"
                        class:resizing={i === resizingIndex}
                ></div>
            </th>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each rows as row}
        <tr>
            {#each headers as header}
                <td>{row[header]}</td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
    }
    table,
    table th,
    table td {
        border: 1px solid #ccc;
    }
    table th,
    table td {
        padding: 0.5rem;
    }
    table th {
        position: relative;
    }

    .resizer {
        position: absolute;
        top: 0;
        right: 0;
        width: 5px;
        cursor: col-resize;
        user-select: none;
    }
    .resizer:hover,
    .resizing {
        border-right: 2px solid blue;
    }

    .resizable {
        border: 1px solid gray;
        height: 100px;
        width: 100px;
        position: relative;
    }
</style>