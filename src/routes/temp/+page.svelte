<script lang="ts">
	export let data;

	interface StoreSections {
		id: string;
		name: string;
		hijos: StoreSections[];
	}

	let allSections: StoreSections[] = data.categories;
	let sections: StoreSections[] = [];
	let sections1: StoreSections[] = [];
	let sections2 = [];
	let selected: StoreSections;
	let selected1: StoreSections;
	let selected2: StoreSections | undefined;

    const change = () => {
		sections = selected.hijos;
		sections1 = [];
        selected2 = undefined
		//product.hijos = selected.name;
	};
</script>

<div class="grid gap-6 mb-6 md:grid-cols-2">
	<div>
		<select bind:value={selected} on:change={change}>
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
				sections1 = selected1.hijos;
				sections2 = [];
                selected2 = undefined;
			}}
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

<pre>{JSON.stringify(selected2, null, 2)}</pre>
<pre>{JSON.stringify(data.categories, null, 2)}</pre>
