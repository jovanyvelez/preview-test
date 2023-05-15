<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	let departamento = '';
	let departamentos = [];
	let municipio = '';
	let municipios = [];
	let direccion = '';

	async function handleSubmit(event) {
		console.log(departamento);
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

<form on:submit>
	<select bind:value={departamento} on:change={() => handleSubmit()}>
		{#each departamentos as departamento (departamento.c_digo_dane_del_departamento)}
			<option value={departamento.departamento}>
				{departamento.departamento}
			</option>
		{/each}
	</select>

	{#if municipios.length > 0}
		<select bind:value={municipio}>
			{#each municipios as municipio (municipio.c_digo_dane_del_municipio)}
				<option value={departamento.departamento}>
					{municipio.municipio}
				</option>
			{/each}
		</select>

		<select bind:value={direccion}>
			<option value= Calle>Calle</option>
			<option value= Carrera>Carrera</option>
			<option value= Avenida>Avenida</option>
			<option value= Avenida>Circular</option>
			<option value= Circunvalar>Circunvalar</option>
			<option value= Diagonal>Diagonal</option>
			<option value= Manzana>Manzana</option>
			<option value= Transversal>Transversal</option>
			<option value= Via>Via</option>
		</select>
		<input type="text" class="input input-warning w-20 input-md">
		<label for="">#</label>
		<input type="text" class="input input-warning w-20 input-md">
		<label for="">-</label>
		<input type="text" class="input input-warning w-20 input-md">
		<input type="text" class="input input-warning w-20 input-md" placeholder="Barrio, apartamento">
	{/if}
</form>
