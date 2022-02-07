import { asyncable, syncable } from 'svelte-asyncable';

export const photosAsync = asyncable(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    return	res.json();
});

export default syncable(photosAsync, []);