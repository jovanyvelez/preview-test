<script lang="ts">
	import '../app.css';
	import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
	import Menu from '$components/Menu.svelte';
	export let data;

	const testUser = writable();
	$: testUser.set(data.user);
	setContext('user',testUser)
</script>

<svelte:head>
	<title>Mi Tienda Virtual</title>
</svelte:head>

{#if data.user}
		<Menu />
{/if}

<main class="overflow-auto">
	<slot />
</main>

<style lang="postcss">
	:global(h1) {
		@apply text-3xl font-semibold w-full mb-8;
	}
	:global(h2) {
		@apply text-2xl font-semibold w-full mb-2;
	}
</style>

