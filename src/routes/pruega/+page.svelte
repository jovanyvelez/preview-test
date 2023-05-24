<script>
	import { goto } from '$app/navigation';
	import { busqueda } from '$lib/stores/stores';

	/*console.log(search)
	 */
	let texto = '';
	$busqueda = [];

	const handleClick = async () => {
		const textos = `'/api/queries?searchTerm='${texto}'`;
		//alert(textos)
		const response = await fetch(`/api/queries?searchTerm=${texto}`);
		//const response = await fetch('http://localhost:5173/api/queries?searchTerm=Pan')
		$busqueda = await response.json();
		goto('/tienda/busqueda');
	};
</script>


<button on:click={() => handleClick()}> Click me </button>
<input type="text" bind:value={texto} class="input input-warning" />

<div class="input-group">
	<input type="text" placeholder="Buscar…" class="input input-bordered" bind:value={texto} />
	<button class="btn btn-square" on:click={() => handleClick()}>
		<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		><path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/></svg
		>
	</button>
</div>
