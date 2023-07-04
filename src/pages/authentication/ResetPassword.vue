<template>
	<div class="scrollable only-y reset-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<el-row :gutter="30" class="no-p no-m">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="tab-invert bg-primary p-30">
						<img class="image-logo" src="@/assets/images/logo.png" alt="logo"/>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="p-30">
						<h1 class="mt-0 mb-10">{{ $t("reset_password.reset_password") }}</h1>
						<p class="pb-30">{{ $t("reset_password.desc") }}</p>
						<float-label class="styled">
							<input type="password" v-model="form.password" placeholder="New Password">
							<small>Password strength:</small><el-progress :show-text="false" :percentage="passwordStrength.value" :status="passwordStrength.color" />
						</float-label>
                        <float-label class="styled">
							<input type="password" v-model="form.conf_password" placeholder="Confirm Password">
						</float-label>

						<div class="flex text-center center pt-30 pb-20">			
							<el-button :loading="btnLoading" round @click="update_password" class="send-btn tada animated">
								{{ $t("reset_password.update_password") }}
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
const NodeRSA = require('node-rsa')
const key = new NodeRSA({b:512});
const pub = key.importKey(config.privateKey, 'pkcs1-public-pem');

export default {
	name: 'ResetPassword',
	data() {
		return {
			form: {
				conf_password: '',
				password: '',
			},
			passwordStrength: {
				value: 0,
				color: 'exception'
			},
			btnLoading: false
		}
	},
	methods: {
		reset() {			
			
		},
		async update_password() {			
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

            this.btnLoading = true
            if(this.form.conf_password != "" && this.form.password != ""){
                if(this.form.conf_password == this.form.password){
                    await api({
                        method: 'post',
                        url: config.baseApi + 'auth/reset-password/' + this.$route.params.verify_code,
                        data: { password: pub.encrypt(this.form.password, 'base64'), conf_password: pub.encrypt(this.form.conf_password, 'base64') }
                    })
                    .then(result => {
						if(result.data.ec == 200){
							this.$swal({
								title: this.$t('success'),
								text: this.$t(`reset_password.${result.data.message}`),
								type: 'success',
							})
							.then(confirm => {
								this.$router.push('/login')
							})
						} else{
							this.$swal({
								title: this.$t('error'),
								text: this.$t(`error_text`),
								type: 'warning',
							})
						}
                    })
                    .catch(error => {				
                        this.$swal({
                            title: this.$t('error'),
                            text: this.$t(`error_text`),
                            type: 'warning',
                        })
                    })
                } else{
                    this.$swal({
                        title: this.$t('error'),
                        text: this.$t(`reset_password.password_not_match`),
                        type: 'warning',
                    })
                }
                
            } else{
                this.$swal({
                    title: this.$t('error'),
                    text: this.$t(`reset_password.invalid_parameter`),
                    type: 'warning',
                })
            }			
			this.btnLoading = false
        },
        async check_code(){
            await api({
                method: 'get',
                url: config.baseApi + 'auth/check-reset-token/' + this.$route.params.verify_code,                
            })
            .then(result => {                
                if(result.data.ec == 200){

                } else {
                    this.$router.push('/forgot-password')
                }                
            })
            .catch(error => {
                this.$router.push('/forgot-password')
            })
        }
    },
    async beforeMount(){
        this.check_code()
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

.reset-password-page {
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
	.layout-container .container .view.reset-password-page {
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
