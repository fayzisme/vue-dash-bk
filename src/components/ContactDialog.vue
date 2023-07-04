<template>
	<el-dialog :show-close="true" :custom-class="'user-dialog'" :visible="dialogvisible" @close="$emit('update:dialogvisible', false)">
		<div class="avatar-box">
			<span class="align-vertical-middle card-shadow--small" :style="'background-color:hsl(' + (360 * Math.random()) + ',' + (25 + 70 * Math.random()) + '%,' +  (85 + 10 * Math.random()) + '%)'">
				{{(userdata.name || '').split(" ").map((n)=>n[0]).join("").slice(0,2)}}
			</span>
		</div>
		<div class="form-box">
			<el-input placeholder="Title" v-model="userdata.title" :readonly="readonly"></el-input>
			<el-input placeholder="Fullname" v-model="userdata.name" :readonly="readonly"></el-input>
			<el-input placeholder="Phone" v-model="userdata.phone_number" :readonly="readonly"></el-input>
			<el-input placeholder="Address" v-model="userdata.address" :readonly="readonly"></el-input>
		</div>
	</el-dialog>
</template>

<script>
export default {
	name: 'ContactDialog',
	props: ['userdata', 'dialogvisible', 'type', 'color'],
	computed: {
		readonly() {
			if (this.type == 'detail') {
				return true
			}
			return false
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.el-dialog.user-dialog {
	max-width: 400px;

	.el-dialog__header {
		padding: 0;

		.el-dialog__headerbtn {
			z-index: 1;
			background: rgba(0, 0, 0, 0.05);
			min-width: 18px;
			min-height: 18px;
			border-radius: 4px;
			
			.el-dialog__close {
				color: $background-color;
			}
		}
	}
	.el-dialog__body {
		padding: 0;
	}

	.avatar-box {
		background: $text-color-accent;
		margin-bottom: 50px;
		position: relative;

		img, span {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			position: relative;
			bottom: -50px;
			display: block;
			margin: 0 auto;
			background: white;
			border: 2px solid $text-color-accent;
			box-sizing: border-box;
			font-size: 40px;
			padding-top: 20px;
			text-align: center;
			text-transform: uppercase;
		}
	}

	.form-box {
		padding: 20px;
		box-sizing: border-box;

		& > * {
			margin: 10px 0;
		}
	}
}
</style>
