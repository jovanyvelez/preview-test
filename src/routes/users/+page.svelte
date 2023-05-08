<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userSchema } from '$lib/zodSchemas/schemas.js';

    export let data;
</script>
<h2>{data.datos}</h2>