<template>
	<div class="notification-box" >
		<div class="notify" v-for="(n, i) in notifications" :key="i">
			<div class="flex" >
				<div class="n-title box grow"><strong>{{n.title}}</strong></div>
				<div class="n-date">{{dateToHumanize(n.created_at)}} <i class="mdi mdi-clock"></i></div>
			</div>
			<div class="n-desc" style="margin-bottom:20px">{{n.message}}</div>
		</div>
		<div class="see-all">
			<a  @click="go('/notification-inbox')" >See all notifications</a>
		</div>
	</div>
</template>

<script>
import config from '@/config'
import api from '@/networkClient'
import _ from 'lodash'
const moment = require('moment')
export default {
	name: 'NotificationBox',
	data() {
		return {
			whatsapp_number: [],
			selectedPhoneNumber: "",
			notifications: []
		}
	},
	methods: {
		 async loadWaNumber(){
            await api({
                method: 'post',
                url: 'user/detail/number'
            }).then(result => {
                if(result.data.ec == 200){
					this.whatsapp_number = result.data.data
                    this.selectedPhoneNumber = this.whatsapp_number[0]
                } else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
                    // console.log('Not Subscribe')
                } else if(result.data.ec == 500){
                    // console.log('internal_server_error') 
                }
            }).catch(error => {
                console.log(error)
            })
        },
		async loadNotif() {
			api({
				method: 'get',
				url: config.baseApi + 'user/notification',
				params: {
                    number: this.selectedPhoneNumber
                }
			}).then((result) => {
				// console.log(result.data)
				if(result.data.ec == 200){
					this.notifications = result.data.data
				}
			}).catch((err) => {
				console.log(err)
			});
		},
		go(url){
			this.$router.push(url)
		},
		dateToHumanize(val,format) {
			return moment.duration(moment().diff(moment(val))).humanize()
		}
	},
	async mounted() {
		// await this.loadWaNumber()
		await this.loadNotif() 
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/_variables';

.notification-box {
	color: $text-color;
	
	.notify {
		margin-bottom: 20px;
		max-height: 70px;
		overflow: hidden;
		position: relative;

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 20px;
			box-shadow: 0px -20px 20px -10px $background-color inset;
		}

		.n-title {
			text-align: left;
			padding-right: 10px;
		}
		.n-desc {
			color: transparentize($text-color, 0.5);
		}

		&:hover {
			color: $text-color-accent;

			.n-desc {
				color: transparentize($text-color-accent, 0.5);
			}
		}
	}

	.see-all {
		&:hover {
			color: $text-color-accent;
		}
	}
}
</style>

