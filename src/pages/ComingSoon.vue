<template>

	<div class="scrollable only-y">
		<div class="page-header header-accent card-base card-shadow--medium gradient-api">
			<h2 class="no-m white-text">Coming Soon</h2>
			<h4 class="o-090">We're currently working on creating something fantastic</h4>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Coming Soon'
}
</script>

<style lang="scss" scoped>
.float-image {
	float:right;
	z-index: 1;
	bottom: 10px;
	left: 10px;
}
.gradient-api {
	background:#249393;
	background: linear-gradient(260deg, #4ac5c5, #249393);
}
.white-text {
	color: white;
}
.page-header {
	margin-bottom: 30px;
}
</style>