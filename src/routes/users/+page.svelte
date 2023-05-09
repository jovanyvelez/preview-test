<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userSchema } from '$lib/zodSchemas/schemas.js';

    export let data;
    
</script>

{#if data.user}
    <h2>Ingreso, creación de usuarios</h2>
{/if}
