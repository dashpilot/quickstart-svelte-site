<script>
export let item;
</script>

<section class="editable" data-fields="title=txt&amp;body=rte&amp;delete=del" id="{item.id}">
<h2>{item.title}</h2>

{#if item.body}
  <p>{@html item.body}</p>
  {:else}
  <p>Lorem ipsum dolor site amet</p>
{/if}
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
