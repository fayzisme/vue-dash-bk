<template>
	<vue-scroll class="forgot-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<el-row :gutter="30" class="no-p no-m">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="tab-invert bg-primary p-30">
						<img class="image-logo" src="@/assets/images/logo.png" alt="logo"/>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="p-30">
						<h1 class="mt-0 mb-10 text-center">{{ title }}</h1><br>
						<div class="pb-30 text-center" style="line-height: 24px;">
							<span>Thank you for registering.</span>
							<br>
							Our team will contact you immediately during office hour from Monday to Friday, at 9 AM - 5.30 PM.
							<br>
							<br>
							<span style="font-size: 20px; font-weight: bold;">Damcorp</span>
							<br>
							<span>Official WhatsApp Business Partner in Indonesia for WhatsApp Business API<br><br>
							<a href="https://damcorp.id">Damcorp.id</a></span>
						</div>
						<div class="flex text-center center pt-10 pb-20">			
							<el-button round @click="login" class="send-btn tada animated">
								{{ $t("verify.login_here") }}
							</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</vue-scroll>
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
            title: 'Register Success!',
            desc: ''
		}
	},
	methods: {
		login() {			
			this.$router.push('/login')
        },
        // async verify(){
        //     console.log(config.baseApi + 'auth/verify/' + this.$route.params.verify_code);            
        //     await api({
        //         method: 'get',
        //         url: config.baseApi + 'auth/verify/' + this.$route.params.verify_code,
        //     })
        //     .then(result => {                
        //         if(result.data.ec == 200){
        //             this.title = this.$t("verify.h_verify_success")
        //             this.desc = this.$t("verify.verify_success")
        //         } else{
        //             this.title = this.$t("verify.h_error")
        //             this.desc = this.$t("verify." + result.data.message)
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.title = this.$t("verify.h_error")
        //         this.desc = this.$t("verify." + result.data.message)
        //     })
        // }        
    },
    mounted(){
        // this.verify()
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
