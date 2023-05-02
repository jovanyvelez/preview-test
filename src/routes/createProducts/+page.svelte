<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
	export let data;
    export let form;
	
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
	let labelClass = 'text-yellow-400 text-xl mr-6 my-2';
	let formClass = 'flex justify-evenly items-center lg:flex-wrap sm:flex-col mx-auto w-full';
</script>

<form
    method="post"
	action="?/add"
	enctype="multipart/form-data"
	use:enhance
    class={formClass}>
    
	<div class="flex flex-col">
		
		<label for="name" class={labelClass}>Nombre:</label>

		<input
			type="text"
			id="name"
			name="name"
			placeholder="product name"
			class="input input-warning {` ${form?.errors?.name ? 'border-error' : ''}`}"
		/>

		{#if form?.errors?.name}
			<span class="label-text-alt text-error">{form?.errors.name[0]}</span>
		{/if}

	</div>

	<div class="flex flex-col">
		<label for="description" class={labelClass}>Descripcion:</label>

		<input
			type="text"
			id="description"
			name="description"
			class="input input-warning {` ${form?.errors?.description ? 'border-error' : ''}`}"
			placeholder="description"
		/>

		{#if form?.errors?.description}
			<span class="label-text-alt text-error">{form?.errors.description[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="brand" class={labelClass}>Marca:</label>

		<input
			type="text"
			id="brand"
			name="brand"
			class="input input-warning {`${form?.errors?.brand ? 'border-error' : ''}`}"
			placeholder="type"
		/>

		{#if form?.errors?.brand}
			<span class="label-text-alt text-error">{form?.errors.brand[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="codigo" class={labelClass}>Codigo:</label>

		<input
			type="text"
			id="codigo"
			name="code"
			class="input input-warning {`${form?.errors?.code ? 'border-error' : ''}`}"
			placeholder="code"
		/>
		{#if form?.errors?.code}
			<span class="label-text-alt text-error">{form?.errors.code[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="codigoean" class={labelClass}>Codigo Ean:</label>

		<input
			type="text"
			id="codigoean"
			name="eancode"
			placeholder="Ean code"
			class="input input-warning {`${form?.errors?.eancode ? 'border-error' : ''}`}"
		/>
		{#if form?.errors?.eancode}
			<span class="label-text-alt text-error">{form?.errors.eancode[0]}</span>
		{/if}
	</div>

	<div class="flex flex-col">
		<label for="qty" class={labelClass}>Inventario:</label>
		<input
			type="number"
			id="qty"
			name="quantity"
			class="input input-warning {` ${form?.errors?.quantity ? 'border-error' : ''}`}"
		/>
		{#if form?.errors?.quantity}
			<span class="label-text-alt text-error">{form?.errors.quantity[0]}</span>
		{/if}
	</div>

    <input type="submit" class="btn btn-warning">

</form>