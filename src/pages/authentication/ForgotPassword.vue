<template>
	<div class="scrollable only-y forgot-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<el-row :gutter="30" class="no-p no-m">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="tab-invert bg-primary p-30">
						<img class="image-logo" src="@/assets/images/logo.png" alt="logo"/>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="p-30">
						<h1 class="mt-0 mb-10">{{ $t("forgot_password.forgot_password") }}</h1>
						<p class="pb-30">{{ $t("forgot_password.request_email") }}</p>
						<float-label class="styled">
							<input required type="email" v-model="form.email" placeholder="E-mail">
						</float-label>

						<div class="flex text-center center pt-30 pb-20">
							<el-button :loading="btnLoading" round @click="sendLink" class="send-btn tada animated">
								{{ $t("forgot_password.send_link") }}
							</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/networkClient'
import config from '@/config'
export default {
	name: 'ForgotPassword',
	data() {
		return {
			form: {
				email: '',
				password: '',
			},
			btnLoading: false
		}
	},
	methods: {
		emailValid(email){
			const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
			return emailRegex.test(email);
		},
		reset() {

		},
		async sendLink() {
			if(this.form.email == null || this.form.email == ""){
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`forgot_password.request_email`),
					type: 'warning',
				})
				return
			}

			if(this.emailValid(this.form.email) == false){
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`forgot_password.email_not_vaild`),
					type: 'warning',
				})
				return
			}

			this.btnLoading = true
			await api({
				method: 'post',
				url: config.baseApi + 'auth/forgot-password',
				data: { email: this.form.email }
			})
			.then(result => {
				this.$swal({
					title: result.data.ec == 200 ? this.$t('success') : this.$t('error'),
					text: this.$t(`forgot_password.${result.data.message}`),
					type: result.data.ec == 200 ? 'success' : 'warning',
				})
				.then(confirm => {
					if(result.data.ec == 200) this.$router.push('/login')
				})
			})
			.catch(error => {
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`error_text`),
					type: 'warning',
				})
			})
			this.btnLoading = false
		}
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';

.forgot-password-page {
	background: rgb(74,197,197);
	background: linear-gradient(53deg, rgba(74,197,197,1) 0%, rgba(36,147,147,1) 100%);
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}

	.form-box {
		width: 100%;
		max-width: 400px;
		// padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 200px;
			// margin: 0px auto;
			// margin-bottom: 30px;
			display: block;
		}

		.send-btn {
			width: 200px;
			background-color: $text-color-accent;
			color: white;

			&:hover {
				opacity: .9;
			}
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.forgot-password-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>

<style lang="scss" scoped>
.el-col {
	padding-left: 30px !important;
	padding-right: 30px !important;
}
.tab-invert{
	height: 100%;
}
.white-text {
	color: white;
}
</style>
