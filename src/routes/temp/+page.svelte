<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
	const { form, errors, enhance, tainted } = superForm(data.form, { taintedMessage: null });

	interface StoreSections {
		id: string;
		name: string;
		hijos: StoreSections[];
	}

	let categoria: string | undefined;
	
	let allSections: StoreSections[] = data.categories;
	let sections: StoreSections[] = [];
	let sections1: StoreSections[] | undefined = [];
	let sections2 = [];
	let selected: StoreSections;
	let selected1: StoreSections | undefined;
	let selected2: StoreSections | undefined;

	const change = () => {
		sections = selected.hijos;
		sections1 = [];
		selected1 = undefined;
		selected2 = undefined;
		categoria = selected.id;
		//product.hijos = selected.name;
	};

	let inputClass = 'border-2 border-yellow-400 rounded-lg py-2 px-4 w-full max-w-xs text-xl';
	let labelClass = 'text-yellow-400 text-xl mr-6 my-2';
	let formClass = 'flex justify-evenly items-center lg:flex-wrap sm:flex-col mx-auto w-full';
</script>

<form method="post" action="?/create" enctype="multipart/form-data" class={formClass}>
	<div class="flex flex-col">
		<label for="name" class={labelClass}>Nombre:</label>

		<input
			type="text"
			id="name"
			name="name"
			placeholder="product name"
			bind:value={$form.name}
			class={`${inputClass} ${$errors?.name ? 'border-error' : ''}`}
		/>

		{#if $errors?.name}
			<span class="label-text-alt text-error">{$errors.name[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="description" class={labelClass}>Descripcion:</label>

		<input
			type="text"
			id="description"
			name="description"
			bind:value={$form.description}
			class={`${inputClass} ${$errors?.description ? 'border-error' : ''}`}
			placeholder="description"
		/>

		{#if $errors?.description}
			<span class="label-text-alt text-error">{$errors.description[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="brand" class={labelClass}>Marca:</label>

		<input
			type="text"
			id="brand"
			name="brand"
			bind:value={$form.brand}
			class={`${inputClass} ${$errors?.brand ? 'border-error' : ''}`}
			placeholder="type"
		/>
		{#if $errors?.brand}
			<span class="label-text-alt text-error">{$errors.brand[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="codigo" class={labelClass}>Codigo:</label>

		<input
			type="text"
			id="codigo"
			name="code"
			bind:value={$form.code}
			class={`${inputClass} ${$errors?.code ? 'border-error' : ''}`}
			placeholder="code"
		/>
		{#if $errors?.code}
			<span class="label-text-alt text-error">{$errors.code[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="codigoean" class={labelClass}>Codigo Ean:</label>

		<input
			type="text"
			id="codigoean"
			name="eancode"
			placeholder="Ean code"
			bind:value={$form.eancode}
			class={`${inputClass} ${$errors?.eancode ? 'border-error' : ''}`}
		/>
		{#if $errors?.eancode}
			<span class="label-text-alt text-error">{$errors.eancode[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="qty" class={labelClass}>Inventario:</label>
		<input
			type="number"
			id="qty"
			name="quantity"
			bind:value={$form.quantity}
			class={`${inputClass} ${$errors?.quantity ? 'border-error' : ''}`}
		/>
		{#if $errors?.quantity}
			<span class="label-text-alt text-error">{$errors.quantity[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="precio1" class={labelClass}>Precio lista1:</label>
		<input
			type="number"
			name="price1"
			id="precio1"
			bind:value={$form.price1}
			class={`${inputClass} ${$errors?.price1 ? 'border-error' : ''}`}
		/>
		{#if $errors?.price1}
			<span class="label-text-alt text-error">{$errors.price1[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="precio2" class={labelClass}>Precio lista2 :</label>
		<input type="number" id="precio2" name="price2" bind:value={$form.price2} class={inputClass} />
		{#if $errors?.price2}
			<span class="label-text-alt text-error">{$errors.price2[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="precio3" class={labelClass}>Precio lista3:</label>

		<input
			type="number"
			id="precio3"
			name="price3"
			bind:value={$form.price3}
			class={`${inputClass} ${$errors?.price3 ? 'border-error' : ''}`}
		/>
		{#if $errors?.price3}
			<span class="label-text-alt text-error">{$errors.price3[0]}</span>
		{/if}
	</div>
	-
	<div class="px-4 pt-8 flex flex-col w-full place-items-center">
		<div class="grid gap-6 mb-6 md:grid-cols-2">
			<div>
				<select bind:value={selected} on:change={change} class="select select-warning select-lg">
					{#each allSections as section}
						{#if section.name !== ''}
							<option value={section} on:click={change}>
								{section.name}
							</option>
						{/if}
					{/each}
				</select>
			</div>

			<div>
				<select
					bind:value={selected1}
					on:change={() => {
						sections1 = selected1?.hijos;
						sections2 = [];
						selected2 = undefined;
						categoria = selected1?.id;
					}}
					class="select select-warning select-md"
				>
					{#each sections as section}
						<option value={section}>
							{section.name}
						</option>
					{/each}
				</select>
			</div>

			{#if sections1}
				<div>
					<select
						bind:value={selected2}
						on:change={() => (categoria = selected2?.id)}
						class="select select-warning select-sm w-full max-w-xs"
					>
						{#each sections1 as section}
							<option value={section}>
								{section.name}
							</option> <label for="floating_filled" />
						{/each}
					</select>
				</div>
			{/if}
		</div>
	</div>

	<label for="floating_filled" class={labelClass}>Subir archivo</label>
	<input
		type="file"
		name="imagen"
		id="floating_filled"
		accept=".jpg, .jpeg, .png"
		class="text-yellow-400"
		placeholder=" "
	/>
	<input type="submit" class="border-2 mt-4 p-2 rounded-md text-yellow-400" />
</form>

<pre>{JSON.stringify(categoria, null, 2)}</pre>
<SuperDebug data = {$form}/> 