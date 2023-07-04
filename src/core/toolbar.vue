<template>
	<div class="toolbar flex align-center justify-space-between">
		<div class="box-left box grow flex">
			<button @click="toggleSidebar" v-if="menuBurger !== 'right'" class="toggle-sidebar card-base card-shadow--small">
				<i class="mdi mdi-menu"></i>
			</button>
		</div>
		<div class="box-right flex align-center pl-10">
			<button class="fullscreen-button" @click="toggleFullscreen">
				<i class="mdi mdi-fullscreen" v-if="!fullscreen"></i>
				<i class="mdi mdi-fullscreen-exit" v-if="fullscreen"></i>
			</button>
			<el-popover ref="popover" placement="bottom" :width="popoverWidth" trigger="hover">
				<notification-box />
			</el-popover>
			<el-badge :is-dot="false" class="notification-icon-badge">
				<el-button v-popover:popover icon="mdi mdi-bell" class="notification-icon"></el-button>
			</el-badge>
			<span class="username"><a @click="go('/profile')">{{ user.name }} ({{ user.company }})</a></span>
			<el-dropdown trigger="hover" @command="onCommand">
				<span class="el-dropdown-link align-vertical-middle">
					<img src="../assets/images/user_default.png" class="avatar" alt="avatar">				
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-if="is_pic == true" command="/user-management"><i class="mdi mdi-account-settings-variant mr-10"></i> {{ $t("menu.usermanagement") }}</el-dropdown-item>
					<el-dropdown-item v-if="is_pic == true" command="/settings-management"><i class="mdi mdi-settings mr-10"></i> {{ $t("menu.options") }}</el-dropdown-item>
					<el-dropdown-item command="/profile"><i class="mdi mdi-account mr-10"></i> {{ $t("menu.profile") }}</el-dropdown-item>
					<!-- <el-dropdown-item v-if="is_pic == true" command="/activity"><i class="mdi mdi-history mr-10"></i> {{ $t("menu.activity") }}</el-dropdown-item> -->
					<el-dropdown-item command="#logout"><i class="mdi mdi-logout mr-10"></i> {{ $t("menu.logout") }}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

			<button @click="toggleSidebar" v-if="menuBurger === 'right'" class="toggle-sidebar toggle-sidebar__right card-base card-shadow--small">
				<i class="mdi mdi-menu"></i>
			</button>
		</div>
		<div>
			<el-form @submit.native.prevent="invite" :model="form" status-icon :rules="rulesForm" ref="form">
				<el-dialog title="Invite User" :visible.sync="dialogVisible" width="30%">
					<el-form-item label="Email" prop="email">
						<el-input type="text" v-model="form.email" placeholder="Email"/>
					</el-form-item>
					<span slot="footer" class="dialog-footer">
						<el-button @click="invite" type="primary" :loading="loadingReg">Invite</el-button>
						<el-button @click="dialogVisible = false">Cancel</el-button>
					</span>
				</el-dialog>
			</el-form>
		</div>
		<div>
			<el-dialog title="Warning" :visible.sync="sendInvite" width="30%">
				<span>User not registered. Send this user an email for registration?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="sendEmail" type="primary" :loading="loadingEmail">Send email</el-button>
					<el-button @click="sendInvite = false, dialogVisible = true">Cancel</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import NotificationBox from '@/components/NotificationBox'
import Search from '@/components/Search'
import store from '@/store'
import config from '@/config'
import api from '@/networkClient'
import 'mdi/scss/materialdesignicons.scss'

export default {
	name: 'Toolbar',
	props: ['menuBurger'],
	data() {
		var validatorEmail = (rule, value, callback) => {
			value = this.form.email
			if (!value) {
				return callback(new Error(this.$t('register.invalid_parameter')));
			} else{
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				if(re.test(value) == false){
					return callback(new Error(this.$t('register.email_not_valid')));
				} else{
					callback()
				}
			}
		}
		return {
			popoverWidth: 300,
			fullscreen: false,
			lang: 'us',
			is_pic: store.getters.isPic,
			dialogVisible: false,
			sendInvite: false,
			loadingReg: false,
			loadingEmail: false,
			user: { 
				name: store.getters.userName,
				company: store.getters.companyName
			},
			form: {
				email: ""
			},
			rulesForm: {
                email: [ 
					{ validator: validatorEmail, trigger: 'blur' } 
				]
			}
		}
	},
	methods: {
		onCommandLang(lang) {
			if(lang.charAt(0) === '/')
				this.onCommand(lang)
			else
				this.lang = lang
		},
		onCommand(path) {
			if(path.charAt(0) === "/")
				this.$router.push(path)
			else if(path == "#showDialogInvite")
				this.dialogVisible = true
			else if(path == "#logout")
				this.logout()
		},
		async logout(){
			await api({
				method: 'post',
				url: config.baseApi + 'auth/logout',
				data: null
			}).then(response => {
				this.$store.commit('setLogout')
				this.$router.push("/logout")
			}).catch(error => {

			})
		},
		toggleSidebar() {
			this.$emit('toggle-sidebar')
		},
		resizePopoverWidth() {
			if(window.innerWidth <= 768) {
				this.popoverWidth = 250	
			} else {
				this.popoverWidth = 300	
			}
		},
		toggleFullscreen() {
			this.$fullscreen.toggle(document.querySelector('body'), {
				wrap: false,
				callback: () => {this.fullscreen = this.$fullscreen.getState()}
			})
		},
		go(url){
			this.$router.push(url)
		},
		async invite(){
			this.$refs["form"].validate(async (valid) => {
                if (valid) {
					this.loadingReg = true
					await api({
						method: 'post',
						url: config.baseApi + 'auth/invite-to-company',
						data: {
							pic_email: store.getters.email,
							invited_email: this.form.email,
							company: store.getters.customerID
						}
					}).then(response => {
						if(response.data.ec == 200){
							this.dialogVisible = false
							this.$swal({
								title: this.$t('success'),
								text: this.$t(`register.invite_success`),
								type: 'success',
							})
							this.form.email = ""
						} else if(response.data.ec == 400 && response.data.message == "user_not_register"){
							this.sendInvite = true
							this.dialogVisible = false
						} else if(response.data.ec == 500){
							this.$swal({
								title: this.$t('error'),
								text: this.$t(`error`),
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
							type: 'error',
						}).then(confirm => {
							// this.$router.push('login')
						})
					})
					this.loadingReg = false
				} else{
					return false;
				}
			})
		},
		async sendEmail(){
			this.loadingEmail = true
			await api({
				method: 'post',
				url: config.baseApi + 'auth/send-invite',
				data: {
					pic_email: store.getters.email,
					invited_email: this.form.email,
					company: store.getters.customerID
				}
			}).then(response => {
				if(response.data.ec == 200){
					this.dialogVisible = false
					this.sendInvite = false
                    this.$swal({
						title: this.$t('success'),
						text: this.$t(`register.invite_success`),
						type: 'success',
					})
					this.form.email = ""
				} else{
					this.sendInvite = false
					this.$swal({
						title: this.$t('error'),
						text: this.$t(`error_text`),
						type: 'warning',
					})
				}
			}).catch(error => {
				this.$swal({
					title: this.$t('error'),
					text: this.$t(`error_text`),
					type: 'error',
				}).then(confirm => {
					// this.$router.push('login')
				})
			})
			this.loadingEmail = false
		}
	},
	components: {
		NotificationBox,
		Search
	},
	mounted() {
		console.log('username',this.user.name)
		this.fullscreen = this.$fullscreen.getState()
		this.resizePopoverWidth();
		window.addEventListener('resize', this.resizePopoverWidth);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizePopoverWidth);
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';

.toolbar {
	width: 100%;
	height: 100%;
	padding: 10px 50px;
	box-sizing: border-box;
	background-color: $text-color;

	.username {
		margin-left: 20px;
		font-weight: bold;
		color: $background-color;
		// @include text-bordered-shadow();
		
		a {
			color: $background-color;
			text-decoration: none;

			&:hover {
				color: $text-color-accent;
			}
		}
	}

	.avatar {
		border-radius: 50%;
		width: 35px;
		height: 35px;
		// border: 1px solid #FFF;
		margin-left: 20px;
		box-sizing: border-box;
		display: block;
		cursor: pointer;
		box-shadow: 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08);
		transition: box-shadow .5s;

		&:hover {
			box-shadow: 0px 3px 10px 0 rgba(49, 49, 93, 0.08), 0px 2px 7px 0 rgba(0, 0, 0, 0.08);
		}
	}

	.notification-icon {
		font-size: 20px;
		outline: none;
		padding: 0;
		background: transparent;
		border: none;
		margin-left: 20px;
		//color: #aab7c5;
		// color: transparentize($background-color, 0.7);
		color: $background-color;
		// @include text-bordered-shadow();

		&:hover {
			color: $text-color-accent;
		}

		.is-dot {
			border: none;
		}
	}

	.toggle-sidebar {
		border: 1px solid transparent;
		height: 32px;
		min-height: 32px;
		line-height: 32px;
		width: 32px;
		min-width: 32px;
		max-width: 32px;
		box-sizing: border-box;
		text-align: center;
		margin: 0;
		outline: none;
		margin-right: 5px;
		font-size: 24px;
		padding: 0;
		cursor: pointer;
		display: inline-block;
		color: $text-color;
		background: white;
		display: none;
		opacity: 0;
		transition: all .5s;

		&__right {
			margin-right: 0px;
			margin-left: 5px;
		}

		&:hover, &:focus, &:active {
			color: $text-color-accent;
			border-color: $text-color-accent;
		}
	}

	.fullscreen-button {
		font-size: 24px;
		cursor: pointer;
		outline: none;
		padding: 0;
		background: transparent;
		border: none;
		margin-left: 20px;
		//color: #aab7c5;
		// color: transparentize($text-color, 0.7);
		color: $background-color;
		// @include text-bordered-shadow();

		&:hover {
			color: $text-color-accent;
		}
	}

	.el-dropdown {
		.flag-icon {
			box-shadow: 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08);
			cursor: pointer;
			border: 1px solid lighten($background-color, 20%);
			background-color: lighten($background-color, 20%);
		}
	}
}

@media (max-width: 650px) {
	.toolbar {
		.username {
			display: none;
		}
	}
}

@media (max-width: 768px) {
	.toolbar {
		padding: 0 10px;

		.toggle-sidebar {
			display: block;
			opacity: 1;
		}

		.fullscreen-button {
			display: none;
		}
	}
}
</style>


<style lang="scss">
sup.is-dot{
	border:none;
}
</style>
