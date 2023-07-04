<template>
	<div class="page-profile scrollable only-y" id="affix-container" v-loading="loadingProfile">
		<div v-if="!showAlertError" class="card-base card-shadow--medium identity" id="boundary">
			<div class="cover"></div>
			<!--<div class="username" v-affix="{parentid: 'affix-container', boundaryid: '', delay:600, offset:0, enable:() => affixEnabled}">-->
			<div class="username">
				<div class="cover-small"></div>
				<div class="avatar-small"><img src="@/assets/images/user_default.png" alt="avatar"></div>
				<span>{{username}}</span>
				<div class="colors-box">
					<div v-for="i in 5" :key="i" :class="{'color':true, 'active':colorActive}" :style="{'background':color}"></div>
				</div>
			</div>
			<div class="avatar"><img src="@/assets/images/user_default.png" alt="avatar"></div>
			<img src="@/assets/images/DAmcorp_background-1.jpg" id="color-thief" class="color-thief" alt="profile cover">
		</div>
		<div v-if="!showAlertError" class="card-base card-shadow--medium info bg-white black-text">
			<el-tabs style="margin-top: 10px;" v-model="activeTab">
				<!-- TAB PROFILE -->
				<el-tab-pane :label="$t('profile')" name="info">
					<div class="page-profile-edit">
						<el-form ref="form" label-width="120px" label-position="right">
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('profileColumn.name')">
										<el-input readonly v-model="userprofile.name"/>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('profileColumn.email')">
										<el-input readonly v-model="userprofile.email" type="email"/>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('profileColumn.username')">
										<el-tag size="medium">{{ userprofile.username }}</el-tag>
									</el-form-item>
								</el-col>	
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('profileColumn.register_at')">
										<el-tag size="medium">{{ userprofile.register_at }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('profileColumn.active_at')">
										<el-tag size="medium">{{ userprofile.activated_at }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('profileColumn.last_update')">
										<el-tag size="medium">{{ userprofile.last_update }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('profileColumn.type')">
										<el-tag size="medium">{{ $t(`${userprofile.type_name}`) }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<!--
							<el-col class="col-p">
								<el-form-item>
									<el-button type="primary">Save</el-button>
									<el-button>Cancel</el-button>
								</el-form-item>
							</el-col>
							-->
						</el-form>
					</div>
				</el-tab-pane>
				<!-- TAB COMPANY -->
                <el-tab-pane :label="$t('company')" name="company">
					<div class="page-profile-edit">
						<el-form v-if="userprofile.customer_type == 2" label-width="120px" label-position="top">
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.name')">
										<el-tag size="medium">{{ companyprofile.customer_name }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item label="Business Id">
										<el-tag size="medium">{{ bussinessId }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.phone')">
										<el-tag size="medium">{{ companyprofile.customer_phone }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.brand')">
										<el-tag size="medium">{{ companyprofile.customer_brand }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.npwp')">
										<el-tag size="medium">{{ companyprofile.customer_npwp }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.pks')">
										<el-tag size="medium">{{ companyprofile.customer_pks_number }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.skdp')">
										<el-tag size="medium">{{ companyprofile.customer_skdp }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.siup')">
										<el-tag size="medium">{{ companyprofile.customer_siup }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.address')">
										<el-tag size="medium">{{ companyprofile.customer_address }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.tdp')">
										<el-tag size="medium">{{ companyprofile.customer_tdp }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
						 	<hr/>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.pic_name')">
										<el-tag size="medium">{{ companyprofile.customer_pic_name }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.pic_phone')">
										<el-tag size="medium">{{ companyprofile.customer_pic_phone }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.pic_email')">
										<el-tag size="medium">{{ companyprofile.customer_pic_email }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
							<hr/>
							<el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.tech_name')">
										<el-tag size="medium">{{ companyprofile.customer_tech_pic_name }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.tech_phone')">
										<el-tag size="medium">{{ companyprofile.customer_tech_pic_phone }}</el-tag>
									</el-form-item>
								</el-col>
								<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
									<el-form-item :label="$t('companyColumn.tech_email')">
										<el-tag size="medium">{{ companyprofile.customer_tech_pic_email }}</el-tag>
									</el-form-item>
								</el-col>
							</el-col>
						</el-form>
						<el-col v-if="userprofile.customer_type == 1">
							<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p" v-if="companyprofile.status_upgrade == 0">
								<el-button @click="go('/upgrade-account')" round type="primary" class="mt-20">{{ $t("upgradeaccount") }}</el-button>
							</el-col>
							<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p" v-if="companyprofile.status_upgrade == 1">
								<el-alert :closable="false" type="warning" v-html="$t('upgradeacc.pending')"></el-alert>
							</el-col>
							<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p" v-if="companyprofile.status_upgrade == 3">
								<el-button @click="go('/upgrade-account')" round type="danger" class="mt-20">{{ $t("upgradeaccount") }}</el-button>
							</el-col>
						</el-col>
					</div>
				</el-tab-pane>
				<!-- TAB CHANGE PASSWORD -->
				<el-tab-pane :label="$t('menu.change_password')" name="change-password">
					<el-form label-position="left" :inline="true" status-icon :rules="rulesForm" ref="form" label-width="200px" :model="form">
						<el-col>
							<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
								<el-form-item :label="$t('change_password.label.old_password')" prop="old_password">
									<el-input type="password" required v-model="form.old_password" :placeholder="$t('change_password.placeholder.old_password')"/>
								</el-form-item>
							</el-col>
							<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
								<el-form-item :label="$t('change_password.label.new_password')" prop="new_password">
									<el-input type="password" required v-model="form.new_password" :placeholder="$t('change_password.placeholder.new_password')"/>
									<small>Password strength:</small><el-progress :show-text="false" :percentage="passwordStrength.value" :status="passwordStrength.color" />
								</el-form-item>
							</el-col>
							<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
								<el-form-item :label="$t('change_password.label.re_password')" prop="re_password">
									<el-input type="password" required v-model="form.re_password" :placeholder="$t('change_password.placeholder.re_password')"/>
								</el-form-item>
							</el-col>
							<el-col class="col-p">
								<el-form-item>
									<el-button type="primary" :loading="loadingBtnPassword" @click="changePassword">Save</el-button>
									<el-button>Cancel</el-button>
								</el-form-item>
							</el-col>
						</el-col>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>
		<el-card v-if="showAlertError">
			<error-gope-siji v-if="showAlertError" />
		</el-card>
	</div>
</template>

<script>
import ColorThief from 'color-thief-browser'
import Affix from '@/components/Affix'
import ProfileEdit from '@/components/Profile/ProfileEdit'
import config from '../config'
import api from '@/networkClient'
import store from '@/store'
import moment from 'moment'
import _ from 'lodash'

const NodeRSA = require('node-rsa')
const key = new NodeRSA({b:512});
const pub = key.importKey(config.privateKey, 'pkcs1-public-pem');

export default {
	name: 'Profile',
	data() {
		var checkHasValue = (rule, value, callback) => {
			var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])))(?=.{6,})");

            if (!value) {
                return callback(new Error(this.$t('change_password.warning.null_'+rule.field)));
            } else if(value && value.length < 8 && rule.field != 'old_password') {
				return callback(new Error(this.$t('change_password.warning.min_'+rule.field)));
			} else if(mediumRegex.test(this.form.new_password) == false && rule.field == "new_password") {
				return callback(new Error(this.$t(`change_password.warning.not_strong`)))
			} else{
                callback()
            }
		}
		var validateRepassword = (rule, value, callback) => {
			if(value != this.form.new_password){
				return callback(new Error(this.$t('change_password.warning.not_match')));
			} else{
				callback()
			}
		}
		var validateOldNew = (rule, value, callback) => {
			if(this.form.old_password == this.form.new_password){
				return callback(new Error(this.$t('change_password.warning.same_with_old')));
			} else{
				callback()
			}
		}

		return {
			username: 'Aurora Shenton',
			colorActive: false,
			color: 'white',
			activeTab: 'info',
            affixEnabled: true,
            userprofile: {},
            companyprofile: {},
			loadingProfile: true,
			loadingBtnPassword: false,
			quotaLoader: false,
			bussinessId: store.getters.bussinessId,
			form: {
				old_password: "",
				new_password: "",
				re_password: ""
			},
			passwordStrength: {
				value: 0,
				color: 'exception'
			},
			rulesForm: {
				old_password:[
					{ validator: checkHasValue, trigger: 'blur' }
				],
				new_password:[
					{ validator: checkHasValue, trigger: 'blur' },
					{ validator: validateRepassword, trigger: 'blur' },
					{ validator: validateOldNew, trigger: 'blur' }
				],
				re_password:[
					{ validator: checkHasValue, trigger: 'blur' },
					{ validator: validateRepassword, trigger: 'blur' }
				]
			},
			showAlertError: false
		}
	},
	methods: {
		resizeAffixEnabled() {
			if(window.innerWidth <= 768) {
				this.affixEnabled = false	
			} else {
				this.affixEnabled = true	
			}
		},
		async addWebsite(){
			return ''
		},
		async changePassword(){	
			this.$refs['form'].validate(async (valid) => {
                if (valid) {
					this.loadingBtnPassword = true
					await api({
						method: 'post',
						url: config.baseApi + 'auth/change-password',
						timeout: 60 * 1000,
						data: {
							old_password: pub.encrypt(this.form.old_password, 'base64'),
							password: pub.encrypt(this.form.new_password, 'base64'),
							re_password: pub.encrypt(this.form.re_password, 'base64')
						}
					}).then(response => {
						// console.log(response.data.ec)
						this.loadingBtnPassword = false
						if(response.data.ec == 200){
							this.$swal(this.$t('success'), this.$t('change_password.warning.' + response.data.message), "success")
							this.form = {
								old_password: "",
								new_password: "",
								re_password: ""
							}
							this.$refs.form.clearValidate()
						} else{
							this.$swal(this.$t('error'), this.$t('change_password.warning.' + response.data.message), "warning")
						}
					}).catch(error => {
						this.loadingBtnPassword = false
						this.$swal(this.$t('error'), this.$t('error_text'), "warning")
					})
				} else{
					return false
				}
			})
		},
        async profile(view){
			this.loadingProfile = true
			await api({
				method: 'get',
				url: config.baseApi + 'auth/profile',
				params: {
					view: view == true ? true : null
				},
				timeout: 10 * 1000
			}).then(async response => {
				this.userprofile = response.data.data.user_profile
				this.username = this.userprofile.name
                if(this.userprofile.customer_type == 2){
                    this.companyprofile = response.data.data.company_profile
                } else{
					this.companyprofile.customer_type = this.userprofile.customer_type
					this.companyprofile.status_upgrade = this.userprofile.status_upgrade
                }
			}).catch(error => {
				this.loadingProfile = false
				this.showAlertError = true
				// this.$swal(this.$t('error'), this.$t('error_text'), "warning")
			})
		},
		go(url){
			this.$router.push(url);
		}
    },
    async beforeMount(){
        await this.profile()
		this.loadingProfile = false
    },
	mounted() {
		var colorThief = new ColorThief();
		setTimeout(()=>{
			let rgb = colorThief.getColor(document.getElementById('color-thief'))
			//console.log('Profile mounted', rgb)
			this.colorActive = true
			this.color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
		}, 1000)

		this.resizeAffixEnabled();
        window.addEventListener('resize', this.resizeAffixEnabled);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeAffixEnabled);
	},
	components: {
		Affix,
        ProfileEdit,
	},
	computed: {
		watchPasword(){
			return this.form.new_password
		}
	},
	watch: {
		watchPasword: function(){
			var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
			var mediumStrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
			var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])))(?=.{6,})");

			if(strongRegex.test(this.form.new_password)){
				this.passwordStrength.value = 100
				this.passwordStrength.color = 'success'
			} else if(mediumStrongRegex.test(this.form.new_password)){
				this.passwordStrength.value = 80
				this.passwordStrength.color = 'success'
			} else if(mediumRegex.test(this.form.new_password)){
				this.passwordStrength.value = 60
				this.passwordStrength.color = 'warning'
			} else {
				this.passwordStrength.value = this.form.new_password.length <= 4 ? this.form.new_password.length * 10 : 40
				this.passwordStrength.color = 'exception'
			}
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
.tip{padding:8px 16px;background-color:#ecf8ff;border-radius:4px;border-left:5px solid #50bfff;margin:20px 0}
.page-profile {
	overflow: auto;

	.identity {
		margin-bottom: 20px;
		position: relative;
		width: 100%;
		height: 370px;

		.cover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('../assets/images/DAmcorp_background-1.jpg');
			background-position: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
		}
		.username {
			color: #32325d;
			position: absolute;
			width: 100%;
			height: 50px;
			bottom: 75px;
			left: 0;
			right: 0;
			background: #fff;
			line-height: 50px;
			box-sizing: border-box;
			padding-left: 250px;
			font-size: 25px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

			.cover-small {
				width: 220px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -220px;
				position: relative;
				left: -250px;
				border-radius: 9px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				background-image: url('../assets/images/DAmcorp_background-1.jpg');
				background-position: 50%;
				background-size: cover;
				background-repeat: no-repeat;
				-webkit-transition: all .5s;
				transition: all .5s;
			}
			.avatar-small {
				width: 50px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -50px;
				position: relative;
				left: -100px;
				border-radius: 50%;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				transform: rotate(-50deg);
				transition: all .5s;
			}
			.avatar-small img {
				width: 100%;
			}

			&.affix {
				z-index: 99;
				border-radius: 5px;

				.cover-small {
					opacity: 1;
				}

				.avatar-small {
					opacity: 1;
					left: -60px;
					transform: rotate(0deg);
				}
			}

			.colors-box {
				height: 50px;
				background: white; //091c2d
				float: right;

				.color {
					width: 50px;
					height: 50px;
					background: white; //091c2d
					float: right;
					transform: skew(-45deg);
					box-shadow: 1px 0px 1px 0px transparent;
					position: relative;
					right: -25px;
					margin-right: -50px;
					transition: margin-right .75s;

					&.active {
						margin-right: 0;
					}

					&:nth-child(2) { opacity: .8; }
					&:nth-child(3) { opacity: .6; }
					&:nth-child(4) { opacity: .4; }
					&:nth-child(5) { opacity: .2; }
				}
			}
		}
		.avatar {
			border: 6px solid #fff;
			position: absolute;
			bottom: 10px;
			left: 50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border-radius: 50%;
			box-sizing: border-box;
			box-shadow: 0px 20px 15px -15px rgba(0, 0, 0, 0.15);

			img {
				width: 100%;
			}
		}

		.color-thief {
			display: block;
			width: 100px;
			visibility: hidden;
			z-index: -999999;
			position: absolute;
		}
	}

	.info {
		padding: 24px 32px;
	}
}

@media (max-width: 768px) {
	.page-profile {
		.identity {
			height: auto;

			.avatar {
				bottom: inherit;
				top: 10px;
				left: 50%;
				width: 100px;
				margin-left: -50px;
				height: 100px;
				border-width: 3px;
			}

			.username {
				position: inherit;
				padding: 10px ;
				margin: 0;
				top: inherit;
				left: inherit;
				z-index: 1;
				right: inherit;
				text-align: center;
				bottom: inherit;
				white-space: inherit;
				line-height: inherit;
				height: auto;
				margin-top: 120px;
				width: 90%;
				margin-left: 5%;
				margin-bottom: 10px;
				border-radius: 50px;

				.colors-box {
					display: none;
				}

				.avatar-small {
					display: none;
				}

				.cover-small {
					display: none;
				}
			}
		}

		.info {
			padding: 8px 16px;
		}
	}
}
</style>

<style lang="scss">
.page-profile {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
