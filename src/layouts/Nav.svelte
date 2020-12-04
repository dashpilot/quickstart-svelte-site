
<script>
function goTo(e) {
	e.preventDefault()
	const href = e.target.href
	history.pushState(href, '', href)
}
</script>

<nav class="navbar navbar-expand navbar-dark bg-dark">

<div class="container">
  <a class="navbar-brand" href="#">Website</a>


  <nav>
    <ul class="navbar-nav ml-auto">
    <li class="nav-item active">
      <a class="nav-link" href="/" on:click={goTo}>Home</a>
    </li>
    <li class="nav-item active">
      <a class="nav-link" href="/about" on:click={goTo}>About</a>
    </li>
    <li class="nav-item active">
      <a class="nav-link" href="/404" on:click={goTo}>404</a>
    </li>
  </nav>



</div>
</nav>
