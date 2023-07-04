<template>
	<div class="not-found">
		<div class="msg-box">
			<h1 class="animated fadeInDown">{{ $t("not_found.title") }}</h1>
			<h2 class="animated fadeInUp">
				{{ $t("not_found.description_1") }}<br>{{ $t("not_found.description_2") }}
			</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound'
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';

.msg-box {
	max-width: 500px;
	margin: 50px auto;

	h1 {
		@include text-bordered-shadow();
	}
}
</style>

