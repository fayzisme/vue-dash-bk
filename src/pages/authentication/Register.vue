<template>
	<div class="scrollable only-y register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<el-row :gutter="30" class="no-p no-m">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="tab-invert bg-primary p-30">
						<img class="image-logo" src="@/assets/images/logo.png" alt="logo"/>
						<template v-if="windowWidth>=992">
							<p class="text-center white-text pt-200">{{ $t("register.have_account") }}</p>
							<div class="text-center" style="padding-bottom: 720px;">
								<el-button round class="accent-text mt-20" @click="login">{{ $t("login.login") }}</el-button>
								<p class="text-center white-text">- or -</p>
								<el-button round class="accent-text" @click="toLanding">Visit Our Website</el-button>
							</div>
							<!-- <p class="text-center white-text">Or</p>
							<div style="text-align: center;">
								<el-button round class="accent-text mt-20" @click="toLanding">Visit Our Website</el-button>
							</div> -->
						</template>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="p-30">
						<h1 class="mt-0 mb-10">Register</h1>
						<p class="pb-30">{{ $t("register.request_field") }}</p>
						<form action="" @submit.prevent="register">
							<float-label class="styled">
								<input required type="text" v-model="form.name" placeholder="Your Name">
							</float-label>
							<float-label class="styled">
								<input required type="text" v-model="form.username" placeholder="Username">
							</float-label>
							<float-label class="styled">
								<input required type="email" v-model="form.email" placeholder="Business Office Email">
							</float-label>
							<float-label class="styled">
								<input required type="text" v-model="form.phone_number" placeholder="Phone Number">
							</float-label>
							<float-label class="styled">
								<input required type="password" v-model="form.password" placeholder="Password">
								<small>Password strength:</small><el-progress :show-text="false" :percentage="passwordStrength.value" :status="passwordStrength.color" />
							</float-label>
							<float-label class="styled">
								<input required type="password" v-model="form.password_confirm" placeholder="Password (confirm)">
							</float-label>
							<float-label class="styled">
								<input required type="text" v-model="form.company_name" placeholder="Company Name">
							</float-label>
							<float-label class="styled">
								<input type="text" v-model="form.job_title" placeholder="Job Title (Optional)">
							</float-label>
							<float-label class="styled">
								<input required type="text" v-model="form.company_url" placeholder="Company Website">
							</float-label>
							<float-label class="styled">
								<label style="font-size: 14px;">N° of Employees</label><br>
								<el-select v-model="form.total_employee" placeholder="N° of Employees" style="width: 100%;">
									<el-option
										v-for="item in options"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</float-label>
							<float-label class="styled">
								<label style="font-size: 14px;">Does your company have a Facebook Business Manager account?</label><br>
								<el-radio v-model="form.question1" label="1">Yes</el-radio>
								<el-radio v-model="form.question1" label="2">No</el-radio>
							</float-label>
							<float-label class="styled">
								<label style="font-size: 14px;">Does your company has used WhatsApp Business API services before?</label><br>
								<el-radio v-model="form.question2" label="1">Yes</el-radio>
								<el-radio v-model="form.question2" label="2">No</el-radio>
							</float-label>

							<div class="mt-10">
								<div class="mb-10" style="font-size: 14px;">
									Disclaimer : 
								</div>
								<div style="font-size: 14px;">
									<el-checkbox v-model="checked" required>
										I hereby solemnly affirm that the details mentioned in the form are true
									</el-checkbox>
									<br>
									<el-checkbox v-model="checked2" required>
										Required legal documents : SIUP, NIB, TDP, NPWP
									</el-checkbox>
								</div>
							</div>

							<div class="flex text-center center pt-30 pb-20">			
								<el-button round native-type="submit" :loading="loadingReg" class="signin-btn tada animated">
									{{ $t("register.register") }}
									<!-- Start Free Trial -->
								</el-button>
							</div>
						</form>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="tab-invert bg-primary p-30" v-if="windowWidth<992">
						<p class="text-center white-text no-m">{{ $t("register.have_account") }}</p>
						<div class="text-center">
							<el-button round class="accent-text mt-20" @click="login">{{ $t("login.login") }}</el-button>
							<p class="text-center white-text">- or -</p>
							<el-button round class="accent-text" @click="toLanding">Visit Our Website</el-button>
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
const VueCookies = require('vue-cookies')

export default {
	name: 'Register',
	components: {
		VueCookies
	},
	data() {
		return {
			source_register: this.$route.query.source_register,
			sourceAds: this.$route,
			checked: false,
			checked2: false,
			radio: '1',
			radio2: '1',
			options: [{
				value: '1-10',
				label: '1-10'
				}, {
				value: '11-50',
				label: '11-50'
				}, {
				value: '51-250',
				label: '51-250'
				}, {
				value: '251-1K',
				label: '251-1K'
				}, {
				value: '1K-5K',
				label: '1K-5K'
				}, {
				value: '5K-10K',
				label: '5K-10K'
				}, {
				value: '10K-50K',
				label: '10K-50K'
				}, {
				value: '50K-100K',
				label: '50K-100K'
				}, {
				value: '100K+',
				label: '100K+'
				}
			],
			optionsQuestion: [{
				value: 'Yes',
				label: 'Yes'
				}, {
				value: 'No',
				label: 'No'
				}
			],
			form: {
				name: '',
				username: '',
				email: '',
				company_name: '',
				phone_number: '',
				job_title: '',
				company_url: '',
				total_employee: '',
				password: '',
				password_confirm: '',
				question1: '',
				question2: ''
			},
			passwordStrength: {
				value: 0,
				color: 'exception'
			},
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
			this.$router.push('login')
		},
		toLanding(){
			window.open('https://damcorp.id')
		},
		async register() {
			var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])))(?=.{6,})");
			var lowerCaseLetters = /[a-z]/g;
			var upperCaseLetters = /[A-Z]/g;
			var numbers = /[0-9]/g;
			var specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
			let check = ''

			if(this.form.password.length < 8 || mediumRegex.test(this.form.password) == false || this.passwordStrength.value < 80 ){
				if (this.passwordStrength.value >= 60) {
					if(!this.form.password.match(upperCaseLetters)) {  
						check += '<li>A capital (uppercase) letter</li>'
					}
					if(!this.form.password.match(lowerCaseLetters)) {  
						check += '<li>A lowercase letter</li>'
					}
					if(!this.form.password.match(numbers)) {  
						check += '<li>A number</li>'
					}
					if(!this.form.password.match(specialChar)) {  
						check += '<li>A special character (symbol)</li>'
					}

					this.$swal({
						title: this.$t('error'),
						html:  `Your password is not strong enough.<br>Password must contain the following:<ul>${check}</ul>`,
						type: 'warning',
					})
				}
				else {
					this.$swal({
					title: this.$t('error'),
					text: this.form.password.length < 8 ? this.$t(`register.invalid_length`) : this.$t(`register.not_strong`),
					type: 'warning',
					})
				}
				
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
					text: this.$t(`register.email_not_vaild`),
					type: 'warning',
				})
				return
			}

			this.loadingReg = true
			if(this.source_register == '' || this.source_register == undefined || !source_register){
				this.source_register == 'Dashboard Panel'
			} else if(this.source_register == 'landing_page'){
				this.source_register == 'Landing Page'
			} else {
				this.source_register == 'Ads'
			}
			await api({
				method: 'post',
				url: config.baseApi + 'auth/register',
				data: { 
					source_register: !this.source_register ? '' : this.source_register,
					name: this.form.name,
					username: this.form.username,
					phone_number: this.form.phone_number,
					job_title: this.form.job_title == '' ? '' : this.form.job_title,
					email: this.form.email,
					company_name: this.form.company_name,
					company_url: this.form.company_url,
					password: pub.encrypt(this.form.password, 'base64'),
					total_employee: this.form.total_employee,
					question1: this.form.question1 == '1' ? 'Yes' : 'No',
					question2: this.form.question2 == '1' ? 'Yes' : 'No'
				}
			}).then(response => {
				if(response.data.ec == 200){
					this.$swal({
						title: this.$t('success'),
						text: this.$t(`register.${response.data.message}`),
						type: 'success',						
					}).then(confirm => {
						$cookies.remove('source_register')
						this.$router.push('/login')
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
					title: this.$t('success'),
					text: this.$t(`register.register_success`),
					type: 'success',						
				}).then(confirm => {
					this.$router.push('/login')
				})
			})
			this.loadingReg = false
		}
	},
	mounted() {
		if(!this.source_register!=''){
			$cookies.remove('source_register')
		}
		// console.log('source ads',this.sourceAds)
		this.$nextTick(() => {
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth
			});
		})
	},
	computed: {
		watchPasword(){
			this.form.password = this.form.password.replace(/\s/g, "")
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
		max-width: 1125px;
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
// .tab-invert{
// 	// height: 1280px;
// }
.white-text {
	color: white;
}
</style>
