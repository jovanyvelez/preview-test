<script lang="ts">

    import Item from '$lib/components/Item.svelte';
	//import { products } from '$lib/stores/stores.js';
    export let data;
	
    let pags: number[] = [...Array(data.pages).keys()];
</script>


{#if data.products.length > 0}
<div class="flex flex-wrap justify-center">
    {#each data.products as product (product.id) }
		<Item {product} nombre={data.cliente[0].nombre} />
    {/each}
</div>
{:else}
	<h1 class="text-xl sm:text-7xl ">Ups, no hay productos aquí</h1>
{/if}

{#if pags.length > 1}
	<div class="flex justify-center pagination">
		{#each pags as pag, i}
			<a
				class="mx-1 {i + 1 === data.page ? 'active' : ''}"
				href={`/tienda/${JSON.stringify({ param: data.query.param, page: 1 + i })}`}
			>
				{i + 1}
			</a>
		{/each}
	</div>
{/if}


<style>
	.pagination a {
		padding: 1rem;
		margin: 0.5rem;
		border-radius: 0.5rem;
		border: 0.1rem #a4a4a4 solid;
		font-size: 1.6rem;
		font-family: Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.pagination a.active {
		font-weight: bold;
		color: red;
	}
</style>
