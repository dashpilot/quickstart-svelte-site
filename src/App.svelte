<script context="module">
	// router
  import url from './url'
  export function setSsrHref(v) {
    url.ssrSet(v)
    window.config.page = v;
  }
</script>

<script>
import  { onMount  } from "svelte";
import Header from "./layouts/Header.svelte";
import Nav from "./layouts/Nav.svelte";
import Post from "./layouts/Post.svelte";

let data = [];
data.entries = [];

onMount(async function() {

  const response = await fetch(window.config.dataPath + '?i=' + Date.now(), {
    method: 'get'
  });
  data = await response.json();

  console.log(data);

});

// this allows you to update the data afterwards
window.shareData = function(mydata){
  data = mydata;
}


$: updatePage($url.pathname);

function updatePage($url.pathname){
  window.config.page = $url.pathname.replace('/', '');
  console.log(window.config.page);
}



</script>

{#if data.entries.length > 0}

  <Header item={data.entries.filter(x => x.id == 'header')[0]} />

{/if}

<Nav />

<div class="container mt-5">

	{#if $url.pathname === '/'}

		{#each data.entries as item}
			{#if item.page == 'home'}
					<Post bind:item />
			{/if}
		{/each}

	{:else if $url.pathname === '/about'}

		{#each data.entries as item}
			{#if item.page == 'about'}
				<Post bind:item />
			{/if}
		{/each}

	{:else}

	  <h2>404</h2>

	{/if}
</div>
