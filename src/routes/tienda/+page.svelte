<script>
    import Category from '$lib/components/Category.svelte';
      export let data;

  </script>
     
  {#each data.datos as category}
    <div class="categories">
      <Category {category} />
    </div>
  {/each}

