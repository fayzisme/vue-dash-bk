import Vue from 'vue'
import Router from 'vue-router'

const NotFound = () => import(/* webpackChunkName: "not-found" */'../pages/NotFound.vue')
const ComingSoon = () => import(/* webpackChunkName: "coming-soon" */ '../pages/ComingSoon.vue')
import layouts from '../layout'
import store from '../store'

Vue.use(Router)

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import(/* webpackChunkName: "dashboard" */ `../pages/Dashboard.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['dashboard']
			}
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/Contacts.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['contact', 'group']
			}
		},
		{
			path: '/whatsapp',
			name: 'whatsapp',
			component: () => import(/* webpackChunkName: "whatsapp" */ `../pages/whatsapp/Whatsapp.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp']
			}
		},
		{
			path: '/telegram',
			name: 'telegram',
			component: () => import(/* webpackChunkName: "link" */ `../pages/telegram/TeleListAccount.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['telegram', 'message']
			}
		},
		{
			path: '/link',
			name: 'link',
			component: () => import(/* webpackChunkName: "link" */ `../pages/Link.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['url', 'link']
			}
		},
		{
			path: '/whatsapp/api',
			name: 'whatsapp api',
			component: () => import(/* webpackChunkName: "whatsapp-api" */ `../pages/whatsapp/WhatsappApi.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp', 'api']
			}
		},
		{
			path: '/whatsapp/status',
			name: 'whatsapp status',
			component: () => import(/* webpackChunkName: "whatsapp-api" */ `../pages/whatsapp/WhatsappStatus.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp', 'status']
			}
		},
		{
			path: '/whatsapp/profile',
			name: 'whatsapp profile',
			component: () => import(/* webpackChunkName: "whatsapp-api" */ `../pages/whatsapp/WhatsappProfile.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp', 'profile']
			}
		},
		{
			path: '/whatsapp/overview',
			name: 'whatsapp overview',
			component: () => import(/* webpackChunkName: "whatsapp-overview" */ `../pages/whatsapp/WhatsappOverview.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp', 'overview']
			}
		},
		{
			path: '/whatsapp/schedule',
			name: 'whatsapp schedule',
			component: () => import(/* webpackChunkName: "whatsapp-schedule" */ `../pages/whatsapp/WhatsappSchedule.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp', 'schedule']
			}
		},
		{
			path: '/whatsapp/report',
			name: 'whatsapp report',
			component: () => import(/* webpackChunkName: "whatsapp-report" */ `../pages/whatsapp/WhatsappReport.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/whatsapp/media',
			name: 'whatsapp media',
			component: () => import(/* webpackChunkName: "whatsapp-report" */ `../pages/whatsapp/WhatsappUploadMedia.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp', 'media']
			}
		},
		{
			path: '/whatsapp/inquiry',
			name: 'whatsapp inquiry',
			component: () => import(/* webpackChunkName: "whatsapp" */ `../pages/whatsapp/WhatsappInquiry.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp']
			}
		},
		{
			path: '/whatsapp/request_template',
			name: 'whatsapp request template',
			component: () => import(/* webpackChunkName: "whatsapp-report" */ `../pages/whatsapp/WhatsappRequestTemplate.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/whatsapp/generate_qr',
			name: 'whatsapp generate qr code',
			component: () => import(`../pages/whatsapp/WhatsappGenerateQr.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['message', 'whatsapp', 'qr', 'code']
			}
		},
		{
			path: '/email-integration',
			name: 'email integration',
			component: () => import(/* webpackChunkName: "email-integration" */ `../pages/EmailIntegration.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/sms',
			name: 'sms integration',
			component: () => import(/* webpackChunkName: "sms-integration" */ `../pages/SmsIntegration.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/helpdesk/chat/whatsapp',
			name: 'helpdesk',
			component: () => import(/* webpackChunkName: "helpdesk" */ `../pages/Helpdesk.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/helpdesk/chat/telegram',
			name: 'telegram',
			component: () => import(/* webpackChunkName: "telegram" */ `../pages/Telegram.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/helpdesk/report',
			name: 'helpdesk report',
			component: () => import(/* webpackChunkName: "helpdesk-report" */ `../pages/HelpdeskReport.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/helpdesk/preferences',
			name: 'helpdesk preferences',
			component: () => import(/* webpackChunkName: "helpdesk-report" */ `../pages/helpdesk/ConfigBot.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/helpdesk/preferences/integration',
			name: 'helpdesk preferences integration',
			component: () => import(/* webpackChunkName: "helpdesk-report" */ `../pages/helpdesk/ConfigIntegration.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/helpdesk/preferences/auto-responder',
			name: 'helpdesk preferences auto responder',
			component: () => import(/* webpackChunkName: "helpdesk-report" */ `../pages/helpdesk/ConfigAutoResponder.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/helpdesk/preferences/quick-reply',
			name: 'helpdesk preferences quick reply',
			component: () => import(/* webpackChunkName: "helpdesk-report" */ `../pages/helpdesk/ConfigQuickReply.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		// {
		// 	path: '/sms',
		// 	name: 'sms',
		// 	component: ComingSoon,
		// 	meta: {
		// 		auth: true,
		// 		layout: layouts.navLeft,
		// 	}
		// },
		{
			path: '/h2h/papaya',
			name: 'h2h papaya',
			component: ComingSoon,
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/h2h/biller',
			name: 'h2h biller',
			component: ComingSoon,
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/h2h/ecash',
			name: 'h2h ecash',
			component: ComingSoon,
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/billing',
			name: 'billing',
			component: () => import(/* webpackChunkName: "billing" */ `../pages/Billing.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/user-management',
			name: 'user management',
			component: () => import(/* webpackChunkName: "user-management" */ `../pages/UserManagement.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['user', 'management', 'admin']
			}
		},
		{
			path: '/settings-management',
			name: 'settings management',
			component: () => import(/* webpackChunkName: "user-management" */ `../pages/SettingsManagement.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['user', 'management', 'admin']
			}
		},
		{
			path: '/',
			alias: '/login',
			name: 'login',
			component: () => import(/* webpackChunkName: "login" */ `../pages/authentication/Login.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: () => import(/* webpackChunkName: "register" */ `../pages/authentication/Register.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/auth/register',
			name: 'auth-register',
			component: () => import(/* webpackChunkName: "register" */ `../pages/authentication/AuthRegister.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: () => import(/* webpackChunkName: "forgot-password" */ `../pages/authentication/ForgotPassword.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/success-registration',
			name: 'success-registration',
			component: () => import(/* webpackChunkName: "verify" */ `../pages/authentication/LandingRegisterSuccess.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/verify/:verify_code',
			name: 'verify',
			component: () => import(/* webpackChunkName: "verify" */ `../pages/authentication/Verify.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/reset-password/:verify_code',
			name: 'reset-password',
			component: () => import(/* webpackChunkName: "reset-password" */ `../pages/authentication/ResetPassword.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/invite/:code',
			name: 'register-invite',
			component: () => import(/* webpackChunkName: "register-invite" */ `../pages/authentication/RegisterInvite.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import(/* webpackChunkName: "profile" */ `../pages/Profile.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/activity',
			name: 'activity',
			component: () => import(/* webpackChunkName: "profile" */ `../pages/Activity.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/upgrade-account',
			name: 'upgrade-account',
			component: () => import(/* webpackChunkName: "upgrade-account" */ `../pages/UpgradeAccount.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{
			path: '/notification-inbox',
			name: 'notification-inbox',
			component: () => import(/* webpackChunkName: "profile" */ `../pages/Inbox.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: auth.loggedIn() ? layouts.navLeft : layouts.contenOnly
			}
		}
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true
	store.commit('isLoadingPage', true)
	// console.log("to", to.name);
	// console.log("from", from.name);
	// console.log("islogin", auth.loggedIn());
	// console.log("requireauth", authrequired);

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				// next({path:'/dashboard'})
				window.location.href = '/dashboard'
				return false
			} else {
				next()
			}
		} else {
			if(to.name !== 'login'){
				// next({path:'/login'})
				window.location.href = '/login'
				return false
			}
			else {
				next()
			}
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			// next({path:'/dashboard'})
			window.location.href = '/dashboard'
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	store.commit('isLoadingPage', false)
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router