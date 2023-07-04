import 'es6-promise/auto'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuebar from 'vuebar'
import Fullscreen from 'vue-fullscreen'
import VueLazyload from 'vue-lazyload'
import vClickOutside from 'v-click-outside'
import VirtualList from 'vue-virtual-scroll-list'
import VueResize from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'
import VueGoodTable from 'vue-good-table'
import VirtualCollection from 'vue-virtual-collection'
import VueFloatLabel from 'vue-float-label'
import V2Table from 'v2-table'
import Peity from 'vue-peity'
import VuePapaParse from 'vue-papa-parse'
Vue.use(VuePapaParse)
import 'v2-table/dist/index.css'
import VuePerfectScrollbar from './components/vue-ps'
import './assets/scss/global.scss'
import 'flex.box'
import 'animate.css'
import Affix from './directives/affix'
import App from './App.vue'
import router from './router/' 
import store from './store' 
import i18n_messages from './i18n' 
import VueSweetAlert from 'vue-sweetalert'
import Chat from 'vue-beautiful-chat'
import error500 from './pages/errors/500.vue'
import error501 from './pages/errors/501.vue'
Vue.use(Chat)
import JsonExcel from 'vue-json-excel'
import {imgNoConnection} from '@/assets/images/no_connection@3x.png'
Vue.component('downloadExcel', JsonExcel)
import Chart from 'vue-bulma-chartjs'

import VueProgressBar from 'vue-progressbar'
const options = {
	color: '#249393',
	failedColor: '#874b4b',
	thickness: '5px',
	transition: {
	  speed: '0.2s',
	  opacity: '0.6s',
	  termination: 300
	},
	autoRevert: true,
	location: 'top',
	inverse: false
}
Vue.use(VueProgressBar, options)

Vue.config.productionTip = false

Vue.use(VueSweetAlert)
Vue.use(Chart)
Vue.component('Peity', Peity)
Vue.component('ErrorGope', error500)
Vue.component('ErrorGopeSiji', error501)
Vue.use(VueFloatLabel)
Vue.use(VirtualCollection)
Vue.use(VueResize)
Vue.use(Fullscreen)
Vue.use(VueI18n)
Vue.use(Element, {locale})
Vue.use(vClickOutside)
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: imgNoConnection,
	loading: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwcHgiICBoZWlnaHQ9IjEwMHB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJsZHMtcmlwcGxlIiBzdHlsZT0iYmFja2dyb3VuZDogbm9uZTsiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjI4LjY2ODUiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMX19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjNGE1OTZhIiBzdHJva2Utd2lkdGg9IjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDszMCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgYmVnaW49Ii0xcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49Ii0xcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48L2NpcmNsZT48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNS45ODI4IiBmaWxsPSJub25lIiBuZy1hdHRyLXN0cm9rZT0ie3tjb25maWcuYzJ9fSIgbmctYXR0ci1zdHJva2Utd2lkdGg9Int7Y29uZmlnLndpZHRofX0iIHN0cm9rZT0iIzg5YWRlOCIgc3Ryb2tlLXdpZHRoPSIyIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMiIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPjwvc3ZnPg==',
	attempt: 1
})
Vue.directive('affix', Affix)
Vue.use(Vuebar)
Vue.use(VueGoodTable)
Vue.use(V2Table)
Vue.component('vue-scroll', VuePerfectScrollbar)
Vue.component('vue-virtual-list', VirtualList)
const i18n = new VueI18n({ locale: 'us', messages:i18n_messages })

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
