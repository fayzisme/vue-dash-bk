<template>
	<div class="scrollable only-y register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<el-row :gutter="30" class="no-p no-m">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="tab-invert bg-primary p-30">
						<img class="image-logo" src="@/assets/images/logo.png" alt="logo"/>
						<template v-if="windowWidth>=992">
							<p class="text-center white-text pt-200">{{ $t("register.have_account") }}</p>
							<div class="text-center pb-200">
								<el-button round class="accent-text mt-20" @click="login">{{ $t("login.login") }}</el-button>
							</div>
						</template>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="p-30">
						<h1 class="mt-0 mb-10">{{ $t("register.register") }}</h1>
						<p class="pb-30">{{ $t("register.request_field") }}</p>
						<form action="" @submit.prevent="register">
							<float-label class="styled">
								<input required type="text" v-model="form.name" placeholder="Your Name">
							</float-label>
							<float-label class="styled">
								<input required type="text" v-model="form.username" placeholder="Username">
							</float-label>
							<float-label class="styled">
								<input required type="email" readonly v-model="form.email" placeholder="E-mail">
							</float-label>
							<float-label class="styled">
								<input required type="password" v-model="form.password" placeholder="Password">
								<small>Password strength:</small><el-progress :show-text="false" :percentage="passwordStrength.value" :status="passwordStrength.color" />
							</float-label>
							<float-label class="styled">
								<input required type="password" v-model="form.password_confirm" placeholder="Password (confirm)">
							</float-label>

							<div class="flex text-center center pt-30 pb-20">			
								<el-button round native-type="submit" :loading="loadingReg" class="signin-btn tada animated">
									{{ $t("register.register") }}
								</el-button>
							</div>
						</form>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="tab-invert bg-primary p-30" v-if="windowWidth<992">
						<p class="text-center white-text no-m">{{ $t("register.have_account") }}</p>
						<div class="text-center">
							<el-button round class="accent-text mt-20" @click="login">{{ $t("login.login") }}</el-button>
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
const NodeRSA = require('node-rsa')
const key = new NodeRSA({b:512});
const pub = key.importKey(config.privateKey, 'pkcs1-public-pem');

export default {
	name: 'Register',
	data() {
		return {
			form: {
				name: '',
				username: '',
				email: '',
				password: '',
				password_confirm: ''
			},
			passwordStrength: {
				value: 0,
				color: 'exception'
			},
            customer: '',
			loadingReg: false,
			windowWidth:window.innerWidth
		}
	},
	methods: {
		emailValid(email){
			const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
			return emailRegex.test(email);
		},
		login() {
			this.$store.commit('setLogout')
			this.$router.push('/login')
        },
        async invitedData(){
            await api({
				method: 'get',
				url: config.baseApi + 'auth/invite/' + this.$route.params.code,
			}).then(response => {
				if(response.data.ec == 200){
                    this.form.email = response.data.data.detail.invited_email
				} else if(response.data.ec == 500){
                    this.$swal({
						title: this.$t('error'),
						text: this.$t(`error_text`),
						type: 'warning',
					})
                } else{
					this.$swal({
						title: this.$t('error'),
						text: this.$t(`register.${response.data.message}`),
						type: 'warning',
					})
				}				
			}).catch(error => {
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`error_text`),
					type: 'danger',
				})
			})
			this.loadingReg = false
        },
		async register() {
			var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])))(?=.{6,})");

			if(this.form.password.length < 8 || mediumRegex.test(this.form.password) == false ){
				this.$swal({
					title: this.$t('error'),
					text: this.form.password.length < 8 ? this.$t(`register.invalid_length`) : this.$t(`register.not_strong`),
					type: 'warning',
				})
				return
			}

			if(this.form.password != this.form.password_confirm){
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`register.password_not_match`),
					type: 'warning',
				})
				return
			}

			if(this.emailValid(this.form.email) == false){
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`register.email_not_valid`),
					type: 'warning',
				})
				return
			}

			this.loadingReg = true
			await api({
				method: 'post',
				url: config.baseApi + 'auth/invite/' + this.$route.params.code,
				data: { 
					name: this.form.name,
					username: this.form.username,
					email: this.form.email,
					password: pub.encrypt(this.form.password, 'base64')
				}
			}).then(response => {
				if(response.data.ec == 200){					
					this.$swal({
						title: this.$t('success'),
						text: this.$t(`register.${response.data.message}`),
						type: 'success',						
					}).then(confirm => {
						this.$store.commit('setLogout')
						this.$router.push('/login')
					})
				} else if(response.data.ec == 500){
                    this.$swal({
						title: this.$t('error'),
						text: this.$t(`error_text`),
						type: 'warning',
					})
                } else{
					this.$swal({
						title: this.$t('error'),
						text: this.$t(`register.${response.data.message}`),
						type: 'warning',
					})
				}				
			}).catch(error => {
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`error_text`),
					type: 'danger',
				})
			})
			this.loadingReg = false
		}
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth
			});
			this.invitedData()
		})
	},
	computed: {
		watchPasword(){
			return this.form.password
		}
	},
	watch: {
		watchPasword: function(){
			var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
			var mediumStrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
			var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])))(?=.{6,})");

			if(strongRegex.test(this.form.password)){
				this.passwordStrength.value = 100
				this.passwordStrength.color = 'success'
			} else if(mediumStrongRegex.test(this.form.password)){
				this.passwordStrength.value = 80
				this.passwordStrength.color = 'success'
			} else if(mediumRegex.test(this.form.password)){
				this.passwordStrength.value = 60
				this.passwordStrength.color = 'warning'
			} else {
				this.passwordStrength.value = this.form.password.length <= 4 ? this.form.password.length * 10 : 40
				this.passwordStrength.color = 'exception'
			}
		},
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';

.register-page {
	background: rgb(74,197,197);
	background: linear-gradient(53deg, rgba(74,197,197,1) 0%, rgba(36,147,147,1) 100%);
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}
	
	.form-box {
		width: 100%;
		max-width: 800px;
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

		.signin-btn {
			width: 160px;
			background-color: $text-color-accent;
			color: white;

			&:hover {
				opacity: .9;
			}
		}

		.login-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.register-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}

@media (max-width: 992px) {
	.form-box {
		max-width: 400px !important;
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
