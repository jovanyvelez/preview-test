<script lang="ts">
	import '../app.css';
	import Menu from '$components/Menu.svelte';
</script>

<svelte:head>
	<title>Mi Tienda Virtual</title>
</svelte:head>

<Menu />

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
