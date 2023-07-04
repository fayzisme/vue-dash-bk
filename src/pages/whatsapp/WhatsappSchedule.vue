<template>
	<div class="scrollable only-y" v-loading="tokenLoader">
    <div class="page-header">
			<h1>{{ $t("whatsapp.whatsapp") }} Schedule</h1>
		</div>
		<el-card v-if="showAlertMessage" align="center">
			<h2>Start messaging your customers today</h2>
			<span v-html="$t('promote.desc.whatsapp')"></span>
			<br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span>
			<div v-if="customer_type==2 && businessId==undefined || businessId==''" style="margin: 0 0 20px;">
				<button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px; margin-top: 20px;">Connect to Facebook</button>
			</div>
		</el-card>
		<el-select v-if="!showAlertMessage && !showAlertError" @change="filterScheduleStatus" v-model="filterStatus" placeholder="Select">
			<el-option
				v-for="st in scheduleStatus"
				:key="st.status"
				:label="st.desc"
				:value="st.status">
			</el-option>
		</el-select>
		<br/><br/>
		<!-- <div ref="calendar" id="cal" v-show="showFormMessage" v-if="ifShowFormMessage" class="calendar-wrap card-base card-shadow--medium"></div> -->
		<full-calendar v-if="!showAlertMessage && !showAlertError" ref="calendar" :config="options" :event-sources="options.eventSources" :events="options.events" class="calendar-wrap card-base card-shadow--medium" />

		<el-dialog title="Schedule Detail" :visible.sync="dialogFormVisible">
			<el-form :model="form" ref="form" label-position="top" v-if="dialogFormVisible" v-loading="dialogLoader">
				<el-form-item label="Type">
					<el-input value="Notification" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Template">
					<el-input :value="dialogData.template" readonly=""></el-input>
				</el-form-item>
				<!-- <div v-if="dialogData.previewHeader">
					<el-form-item label="Header Type">
						<el-input :value="dialogData.previewHeader.type" readonly=""></el-input>
					</el-form-item>
					<el-form-item label="Header Data">
						<el-input :value="dialogData.previewHeader.data" readonly=""></el-input>
					</el-form-item>
				</div> -->
				<!-- <el-form-item label="Header Type">
					<el-input :value="dialogData.previewHeader.type" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Header Data">
					<el-input :value="dialogData.previewHeader.data" readonly=""></el-input>
				</el-form-item> -->
				<el-form-item label="Parameter">
					<el-input :value="dialogData.param.replace(/\|\|/g, ', ')" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Preview Message">
					<el-input :value="parsingData(dialogData.template_msg, dialogData.previewParam)" type="textarea" readonly=""></el-input>
				</el-form-item>
				<!-- <el-form-item label="Number of recipients">
					<el-input :value="dialogData.countRecipient" readonly=""></el-input>
				</el-form-item> -->
				<el-form-item label="Request By">
					<el-input :value="dialogData.email" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Request Date">
					<el-input :value="formatDate(dialogData.request_date, 'YYYY-MM-DD, HH:mm')" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Sending Time">
					<el-input :value="formatDate(dialogData.schedule_at, 'YYYY-MM-DD, HH:mm')" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Status">
					<el-tag v-if="dialogData.is_approved == 0 && dialogData.isExpired == false" type="warning">{{ $t('schedule.status.waiting') }}</el-tag>
					<el-tag v-else-if="dialogData.is_approved == 1" type="success">{{ $t('schedule.status.approved') }}</el-tag>
					<el-tag v-else-if="dialogData.is_approved == 2" type="danger">{{ $t('schedule.status.rejected') }}</el-tag>
					<el-tag v-else-if="dialogData.is_approved == 0 && dialogData.isExpired == true" type="info">{{ $t('schedule.status.expired') }}</el-tag>
				</el-form-item>
				<el-form-item label="Executed Status">
					<el-tag v-if="dialogData.is_approved == 1 && dialogData.is_done == 0" type="danger">Waiting</el-tag>
					<el-tag v-else-if="dialogData.is_approved == 1 && dialogData.is_done == 1" type="success">Done</el-tag>
					<!-- <el-tag v-else-if="dialogData.is_approved == 2" type="danger">{{ $t('schedule.status.rejected') }}</el-tag>
					<el-tag v-else-if="dialogData.is_approved == 0 && dialogData.isExpired == true" type="info">{{ $t('schedule.status.expired') }}</el-tag> -->
				</el-form-item>
				<el-form-item label="Approved By" v-if="dialogData.is_approved == 1">
					<el-input :value="dialogData.approver" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Approved Date" v-if="dialogData.is_approved == 1">
					<el-input :value="formatDate(dialogData.date_approved, 'YYYY-MM-DD, HH:mm')" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Rejected By" v-if="dialogData.is_approved == 2">
					<el-input :value="dialogData.rejecter" readonly=""></el-input>
				</el-form-item>
				<el-form-item label="Rejected Date" v-if="dialogData.is_approved == 2">
					<el-input :value="formatDate(dialogData.date_rejected, 'YYYY-MM-DD, HH:mm')" readonly=""></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-row :gutter="20">
					<el-col :span="12" class="text-left">
						<el-button type="primary" @click="approveData()" v-if="$store.getters.isChecker && dialogData.is_approved == 0 && dialogData.isExpired == false" :loading="approveLoader"><i class="mdi mdi-check"/> {{ $t('schedule.approveConfirmBtn') }}</el-button>
						<el-button type="info" @click="rejectData()" v-if="$store.getters.isChecker && dialogData.is_approved == 0 && dialogData.isExpired == false" :loading="rejectLoader"><i class="mdi mdi-close"/> {{ $t('schedule.rejectConfirmBtn') }}</el-button>
						&nbsp;
					</el-col>
					<el-col :span="$store.getters.isChecker && dialogData.isExpired == false ? 12 : 24">
						<el-button type="danger" v-if="dialogData.isExpired == false" @click="deleteData()" :loading="deleteLoader"><i class="mdi mdi-delete"/> Delete</el-button>
						<el-button @click="closeEventDialog">Close</el-button>
					</el-col>
				</el-row>
			</span>
		</el-dialog>

		<el-card v-if="showAlertError" style="margin-bottom: 1em">
			<error-gope-siji />
		</el-card>
	</div>

</template>

<script>
import moment from 'moment-timezone'
import $ from 'jquery'
// import 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.css'
import {FullCalendar} from 'vue-full-calendar'
import api from '@/networkClient'
import config from '@/config'
import _ from 'lodash'
import store from '@/store'

export default {
	name: 'Calendar',
	components: {
		FullCalendar
	},
	data() {
		const __Y = moment().format('YYYY')
		const __M = moment().format('MM')

		return {
			businessId: '',
			customer_type: store.getters.customer_type,
			deleteLoader:false,
			approveLoader: false,
			dialogLoader: false,
			rejectLoader: false,
			loader:false,
			cal: null,
			dialogFormVisible: false,
			dialogData:{},
			tokenLoader: true,
			hsm: [],
			filterStatus: 'all',
			showFormMessage: false,
			showAlertMessage: false,
			showAlertError: false,
			ifShowFormMessage: true,
			eventColor:  '#249393',
			labelName: {
				message: 'Message',
				hsm: 'Message',
				image: 'Caption',
				document: 'Filename',
			},
			scheduleStatus: [
				{
					status: "all",
					desc: "All"
				},
				{
					status: 0,
					desc: this.$t('schedule.status.waiting')
				},
				{
					status: 1,
					desc: this.$t('schedule.status.approved')
				},
				{

					status: 2,
					desc: this.$t('schedule.status.rejected')
				}
			],
			form: {
				title: '',
				description: '',
				allDay: false,
				startDate: '',
				startTime: '',
				endDate: '',
				endTime: '',
				color: '#4a596a'
			},
			options: {
				eventColor: '#249393',
				lang: 'en',
				header: {
					left:   'prev,next today',
					center: 'title',
					right:  'month,agendaWeek,agendaDay,listWeek addEvent'
				},
				height: 800,
				firstDay: 1,
				allDaySlot: true,
				slotEventOverlap: false,
				selectable: false,
				selectHelper: false,
				defaultView: 'month',
				timeFormat: 'HH:mm',
				navLinks: true, // can click day/week names to navigate views
				editable: false,
				dropable: false,
				eventLimit: true, // allow "more" link when too many events
				events: [],
				eventSources: [{
					events(start, end, timezone, callback) {
						this.tokenLoader = false
						api({
							method: 'get',
							params: {
								start: start.format("YYYY-MM-DD"),
								end: end.format("YYYY-MM-DD")
							},
							url: 'wa/schedule'
						}).then(result => {
							this.tokenLoader = false
							if (result.data.ec == 200) {
								let datas = []
								result.data.data.forEach(function(event) {
									let data = {
										originalData: event
									}
									data['id'] = event.schedule_id
									data['title'] = event.template
									data['start'] = moment(event.schedule_at)
									data['end'] = moment(event.schedule_at).add(1, 'hour')
									switch(event.is_approved){
										case 0:
											var currentTime = moment();
											var scheduleTime = moment(event.schedule_at);
											var diff = currentTime.diff(scheduleTime, 'm');
											if(event.isExpired == false){
												data['color'] = '#f7ba2a'
											} else{
												data['color'] = "#9e9e9e"
											}
											break;
										case 1:
											data['color'] = "#13ce66"
											break;
										case 2:
											data['color'] = "#ec205f"
											break;
									}
									datas.push(data)
								});
								this.tokenLoader = false
								callback(datas)
							}
						})
					}
				}],
				eventRender: (event, element) => {
					// console.log(this.filterStatus, event.originalData)
					// console.log(event.originalData.is_approved, element)
					if(this.filterStatus !== 'all'){
						return event.originalData.is_approved == this.filterStatus
					} else {
						return true
					}
					// this.$refs.calendar.fireMethod('rerenderEvents');
				},
				dayClick: this.dayClick,
				eventClick: this.eventClick,
				select: this.select,
				eventFilter: (evt, el) => {
					// console.log(this.filterStatus)
					if(this.filterStatus){
						return evt.originalData.is_approved == 0
					} else {
						return true
					}
				}
			},
			optionsMakerChecker: false
		}
	},
	computed: {
		showDeleteButton: function() {
			if(this.optionsMakerChecker == true || this.optionsMakerChecker == "true"){
				if((this.checkTime(this.dialogData.schedule_at) <= 60 && this.dialogData.is_approved == 0) || (this.$store.getters.isChecker && this.dialogData.is_approved != 0)){
					return true
				} else {
					return false
				}
			} else{
				if(this.checkTime(this.dialogData.schedule_at) <= 60){
					return true
				} else {
					return false
				}
			}
		}
	},
	methods: {
		filterScheduleStatus(param){
			this.$refs.calendar.$emit('refetch-events')
		},
		async loadPreferences() {
            this.loadingPage = true
			await api({
				method: 'get',
				url: config.baseApi +'auth/settings/'
			}).then(result => {
				if(result.data.ec == 200){
					// console.log(result.data.data)
                    this.optionsMakerChecker = _.find(result.data.data, { 'options_key': "makerChecker" }).options_value
                    // this.isSubscribe = true
                } else{
                    if(result.data.message == 'not_allowed'){
                        this.showAlert = true
                    }
                }
			}).catch(error => {
				// this.showAlertError = true
            })
            this.loadingPage = false
        },
		formatDate(dt, format){
			return moment(dt).format(format)
		},
		checkTime(time) {
			var currentTime = moment();
			var scheduleTime = moment(time);
			return currentTime.diff(scheduleTime, 'm');
		},
		mailto(){
			location.href='mailto: business.solution@damcorp.id'
		},
		parsingData(template_msg, param){
			let message = template_msg
			let slot = template_msg.match(/{{\s*[\w\.]+\s*}}/g)
			if(slot != null){
				slot.forEach((el, i) => {
					if(param[i]){
						message = message.replace(el, param[i])
					}
				});
			}
      		return message
    	},
		async loadWA() {
			await api({
				method: 'post',
				url: 'user/detail/number',
				data: {
					channels: "whatsapp"
				}
			}).then(result => {
				if(result.data.ec == 200){
					this.showFormMessage = true
					this.hsm = result.data.data.hsm
				} else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
					this.ifShowFormMessage = false
				} else if(result.data.ec == 500){
					this.showAlertError = true
				}
			}).catch(error => {
				this.showAlertError = true
			})
		},
		async approveData(){
			this.$swal({
				title: this.$t('schedule.approveConfirmTitle'),
				text: this.$t('schedule.approveConfirmText'),
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: this.$t('schedule.approveConfirmBtn')
			}).then(async (confirm) => {
				if(confirm){
					this.dialogLoader = true
					await api({
						url: 'wa/schedule/approve-reject',
						method: "post",
						data: {
							schedule: this.dialogData.schedule_id,
							action: 'approve'
						}
					}).then(result => {
						if(result.data.ec == 200){
							this.$swal({
								type: 'success',
								title: this.$t('success'),
								text: '',
							}).then((ok) => {
								this.closeEventDialog()
								this.$refs.calendar.$emit('refetch-events')
							})
						} else{
							if(result.data.message == 'not_allowed'){
								this.$swal(this.$t('warning'), this.$t('usermanagement.not_allowed'), "warning")
							} else{
								this.$swal(this.$t('error'), this.$t('error_text'), "warning")
							}
						}
					}).catch(err => {
						this.dialogFormVisible = false
						this.$swal(this.$t('error'), this.$t('error_text'), "error")
					})
					this.dialogLoader = false
				} else {
					this.dialogFormVisible = false
					this.dialogLoader = false
				}
			}).catch((err) => {
				// this.dialogFormVisible = false
				// this.$swal(this.$t('error'), this.$t('error_text'), "error")
			})
		},
		async rejectData(){
			this.$swal({
				title: this.$t('schedule.rejectConfirmTitle'),
				text: this.$t('schedule.rejectConfirmText'),
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: this.$t('schedule.rejectConfirmBtn')
			}).then(async (confirm) => {
				if(confirm){
					this.dialogLoader = true
					await api({
						url: 'wa/schedule/approve-reject',
						method: "post",
						data: {
							schedule: this.dialogData.schedule_id,
							action: 'reject'
						}
					}).then(result => {
						if(result.data.ec == 200){
							this.$swal({
								type: 'success',
								title: this.$t('success'),
								text: '',
							}).then((ok) => {
								this.closeEventDialog()
								this.$refs.calendar.$emit('refetch-events')
							})
						} else{
							if(result.data.message == 'not_allowed'){
								this.$swal(this.$t('warning'), this.$t('usermanagement.not_allowed'), "warning")
							} else{
								this.$swal(this.$t('error'), this.$t('error_text'), "warning")
							}
						}
					}).catch(err => {
						this.dialogFormVisible = false
						this.$swal(this.$t('error'), this.$t('error_text'), "error")
					})
					this.dialogLoader = false
				} else {
					this.dialogFormVisible = false
					this.dialogLoader = false
				}
			}).catch((err) => {
				// this.dialogFormVisible = false
				// this.$swal(this.$t('error'), this.$t('error_text'), "error")
			})
		},
		closeEventDialog() {
			this.$refs.form.resetFields()
			this.dialogFormVisible = false
			this.dialogData = {}
			// this.form = {
			// 	title: '',
			// 	description: '',
			// 	allDay: false,
			// 	startDate: '',
			// 	startTime: '',
			// 	endDate: '',
			// 	endTime: '',
			// 	color: '#4a596a'
			// }
		},
		setEvent() {
			this.$refs.form.validate((valid) => {
				if (valid) {

					let start = moment(this.form.startDate)
					if(this.form.startTime) {
						start.add(moment(this.form.startTime).format('HH'), 'hours')
						start.add(moment(this.form.startTime).format('mm'), 'minutes')
					}


					let event = {
						id: new Date().getTime(),
						title: this.form.title,
						description: this.form.description,
						start:  start,
						allDay: this.form.allDay
					}

					if(this.form.color) event.color = this.form.color
					if(this.form.endDate) {
						let end = moment(this.form.endDate)
						if(this.form.endTime) {
							end.add(moment(this.form.endTime).format('HH'), 'hours')
							end.add(moment(this.form.endTime).format('mm'), 'minutes')
						} else {
							end.add(24, 'hours')
						}

						event.end = end
					}

					this.$refs.calendar.$emit('refetch-events')
					this.closeEventDialog()
				} else {
					return false;
				}
			});
		},
		addEventDialog() {
			// this.dialogFormVisible = true
		},
		dayClick(date, event, view) {
			// this.form.startDate = date
			// this.dialogFormVisible = true
		},
		eventClick(calEvent, jsEvent, view) {
			// console.log(calEvent.originalData);
			this.dialogData = calEvent.originalData
			this.dialogData.title = calEvent.title

			// this.form = {
			// 	title: calEvent.title,
			// 	description: calEvent.description,
			// 	allDay: calEvent.allDay,
			// 	startDate: calEvent.start,
			// 	startTime: calEvent.start,
			// 	endDate: calEvent.end,
			// 	endTime: calEvent.end,
			// 	color: calEvent.color || '#4a596a'
			// }
			this.dialogFormVisible = true
		},
		select(start, end) {
			// this.form.startDate = start
			// this.form.endDate = end
			// this.dialogFormVisible = true
		},
		deleteData() {
			this.$swal({
				title: this.$t('delete_confirmation'),
				text: this.$t('delete_confirmation_text'),
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: this.$t('delete_confirmation_button')
			}).then(async (confirm) => {
				this.deleteLoader = true
				await api({
					method: 'delete',
					url: 'wa/schedule/' + this.dialogData.schedule_id
				}).then(result => {
					this.deleteLoader = false
					if (result.data.ec == 200) {
						this.$swal({
							type: 'success',
							title: this.$t('success'),
							text: '',
						}).then((ok) => {
							this.closeEventDialog()
							this.$refs.calendar.$emit('refetch-events')
						})
					} else if (result.data.ec == 400) {
						this.errorMessage = result.data.message
					} else {
						this.$swal(this.$t('error'), this.$t('error_text'), "error")
					}
				}).catch(error => {
					this.dialogFormVisible = false
					this.$swal(this.$t('error'), this.$t('error_text'), "error")
				})
				this.deleteLoader = false
			})
		}
	},
	async mounted() {
		await this.loadWA()
		await this.loadPreferences()
		this.tokenLoader = false
		// this.cal = $(window.document.getElementById('cal'))
		// this.$refs.cal(this.options)
	},
	watch: {
		eventFilter() {
			// When an event filtering is requested by parent component
			this.$refs.calendar.fireMethod('rerenderEvents');
		}
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';

.page-calendar {
	.calendar-wrap {
		background: white;
	}
}

.swal2-container {
	z-index: 3000 !important;	
}

.fc {
	.fc-month-view {
		.fc-more-popover {
			.fc-widget-header {
				overflow: auto;
				max-height: 150px;
			}
		}
	}
}
</style>

