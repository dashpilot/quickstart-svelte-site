<script>
export let item;
</script>

<section class="editable" data-fields="title=txt&amp;body=rte" id="{item.id}">
<h2>{item.title}</h2>
<p>{@html item.body}</p>
<!--
{#if item.images[0]}
  {#each item.images as img, i}
  <img src="{img.filename}" alt="image {i}" />
  {/each}
{:else}
<img src="assets/img/placeholder.jpg" alt="placeholder" />
{/if}
-->
</section>
