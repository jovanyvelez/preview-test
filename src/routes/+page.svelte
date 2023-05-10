<script>
  	import { enhance } from '$app/forms';
    export let data;

</script>

<h1 class="text-center text-3xl font-bold my-2">Visita Nuestra tienda</h1>

<div class="flex items-center flex-col">
  {#each data.main as category }
    <h1>{category.name}</h1>
  {/each}
</div>
<div>

  <div>
    <form use:enhance method="post">
      <input type="submit" class="btn-primary" value="Sign out" />
    </form>
  </div>
</div>
