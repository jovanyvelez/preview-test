<script>
	// @ts-nocheck
	import { getContext } from 'svelte';
	import { cart } from '$lib/stores/stores';
    // Retrieve user store from context
    const user = getContext('user');
	import { onMount } from 'svelte';

	let address1;
	let address2;
	let address3;
	let address4;
	let directionNote;

	export let data;
	

	let departamento = '';
	let departamentos = [];
	let municipio = '';
	let municipios = [];
	$:direccion = address1+address2+address3+address4;

	async function handleSubmit(event) {
		const response = await fetch(`/api/ciudad?departamento=${departamento}`);
		const data = await response.json();
		municipios = data;
	}

	onMount(async () => {
		const response = await fetch('/api/department');
		const data = await response.json();
		departamentos = data;
	});
</script>

<form method="post">
	<h1 class="text-center">Direccion de Envío</h1>

	<div class="flex justify flex-col ml-5">
		<label class="font-bold text-yellow-400 text-xl mr-6 my-2 p-2" for="departamento"
			>Seleccione el Departamento</label
		>

		<select
			id="departamento"
			bind:value={departamento}
			class="select select-warning select-xs md:select-md w-11/12 mb-5"
			on:change={() => handleSubmit()}
		>
			{#each departamentos as departamento (departamento.c_digo_dane_del_departamento)}
				<option value={departamento.departamento}>
					{departamento.departamento}
				</option>
			{/each}
		</select>

		{#if municipios.length > 0}
			<label class="font-bold text-yellow-400 text-xl mr-6 my-2 p-2" for="departamento"
				>Seleccione Ciudad</label
			>

			<select
				bind:value={municipio}
				class="select select-warning select-xs md:select-md w-11/12 mb-5"
			>
				{#each municipios as municipio (municipio.c_digo_dane_del_municipio)}
					<option value={departamento.departamento}>
						{municipio.municipio}
					</option>
				{/each}
			</select>
		{/if}
		
		{#if municipio !== ''}
		<div class="flex flex-col">
				<h3 class="text-warning font-bold">Direccion</h3>
				<div class="flex flex-nowrap">
					<select bind:value={direccion} class="select select-warning select-xs w-3/12 ml-5 mr-2">
						<option value="Calle">Calle</option>
						<option value="Carrera">Carrera</option>
						<option value="Avenida">Avenida</option>
						<option value="Avenida">Circular</option>
						<option value="Circunvalar">Circunvalar</option>
						<option value="Diagonal">Diagonal</option>
						<option value="Manzana">Manzana</option>
						<option value="Transversal">Transversal</option>
						<option value="Via">Via</option>
					</select>

					<input type="text" class="input input-warning input-xs w-2/12 mr-1" />
					<span class="font-bold">#</span>
					<input type="text" class="input input-warning w-2/12 input-xs ml-1 mr-2" />
					<span class="font-bold">-</span>
					<input type="text" class="input input-warning w-2/12 input-xs ml-1 mr-2" />
				</div>

				<input
					type="text"
					class="input input-warning mx-5 w-10/12 input-md p-3 mt-5"
					placeholder="Notas: Barrio, edificio, casa apartamento, piso"
				/>
			</div>
			{/if}
			<button class="btn btn-warning btn-sm mr-5">Finalizar compra </button>
	</div>
</form>

