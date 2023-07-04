<template>
	<div class="scrollable only-y">
		<div class="page-header">
            <h1>Whatsapp Notification Inbox</h1>
        </div>
		<el-dialog title="Notification Detail" :visible.sync="dialogShowFormVisible">
			
			<el-form ref="form" :model="detailsNotifications" label-width="120px">
				<el-form-item label="Title" :label-width="formLabelWidth">
					<el-input v-model="detailsNotifications.title" :disabled="disabled == 0"></el-input>
				</el-form-item>
				<el-form-item label="Message" :label-width="formLabelWidth">
					<el-input rows="8" type="textarea" v-model="detailsNotifications.message" :disabled="disabled == 0"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-card v-if="showAlertError" style="margin-bottom: 1em">
			<error-gope-siji />
		</el-card>
        <el-row :gutter="10" v-if="!showAlertError" style="z-index: 0">
			<el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-card shadow="card-shadow--small">
					<div slot="header" class="clearfix" align="center">
						<h2 style="font-weight: bold">Whatsapp Notification Inbox</h2>
					</div>
					<div class="group-list scrollable only-y" v-loading="loadingPage">
						<el-pagination
							background
							prev-text="Prev"
							next-text="Next"
							layout="prev, pager, next"
							:page-size="10"
							@current-change="paginateNotification"
							:current-page="currentPage"
							:total="total">
						</el-pagination>
						<template>
							<el-table :data="resData" style="width: 100%; color: #000 !important" v-loading="loadingPage" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(246, 246, 245, 0.8)">
								<el-table-column width="175" prop="dateTime" label="Date">
									<template slot-scope="props">
										{{ formatDate(props.row.created_at, "DD/MM/YYYY, HH:mm") }}
									</template>
								</el-table-column>
								<el-table-column width="180" prop="title" label="Title"></el-table-column>
								  <el-table-column prop="message" label="Message" >
									<template slot-scope="props">
										<el-tooltip placement="">
											<div class="tooltip" slot="content">{{ props.row.message }}</div>
											<p style="font-size:14px;color:black">{{ props.row.message.substring(0, 50) }} {{props.row.message.length > 50 ? '...' : ''}}</p>
										</el-tooltip>
									</template>
								</el-table-column>
								<el-table-column fixed="right" label="#" width="250">
									<template slot-scope="props">
										<el-button @click="detailNotification(props.row.id)" type="primary" size="small">
											<i class="mdi mdi-eye"></i>
										</el-button>
									</template>
								</el-table-column>
								<template slot="empty" style="height: 500px">
									<p>
										<img src="@/assets/images/no_report@3x.png" width="100">
										<br/>No data
									</p>
								</template>
							</el-table>
						</template>
						<el-pagination
							background
							prev-text="Prev"
							next-text="Next"
							layout="prev, pager, next"
							:page-size="10"
							@current-change="paginateNotification"
							:current-page="currentPage"
							:total="total"
							class="mt-10">
						</el-pagination>
					</div>
				</el-card>
			</el-col>
        </el-row>
    </div>
</template>
        
<script>
import api from '@/networkClient'
const axios = require('axios')
import config from '@/config'
import store from '@/store'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
    data() {
        return {
            loadingPage: true,
			pageSize:'2',
			onPage:'1',
			resData:[],
			showAlertError: false,
            whatsapp_number: '',
            selectedPhoneNumber: '',
			currentPage: 1,
			total:0,
			disabled: 0,
			value: '',			
			dialogShowFormVisible: false,
			detailsNotifications: {
				id: "",
				title: "",
				message: ""
			},
			formLabelWidth: '200px',
        }
    },
    methods: {
		callback: function(page) {
			this.onPage = page
			this.getNotification()
		},
        formatDate(val, format){
            return moment(val).format(format)
        },
        async getNotification(page=1,query = ""){
			this.showAlertError = false
			this.loadingPage = true
			var self = this
			let apiOptions = {
                url: config.baseApi + 'user/all-notification?page=' + page,
				params: {
                    number: this.selectedPhoneNumber
                }
			}
            await api(apiOptions)
            .then(res => {
				if(res.data.ec == 200){
                    this.total = res.data.data.length
					this.resData = res.data.data
                }
            })
            .catch(err => {
				this.showAlertError = true
            })
            this.loadingPage = false
		},
		async detailNotification(notificationId){
			this.dialogShowFormVisible = true
			await api ({
				url: config.baseApi + "user/detail/notification/" + notificationId,
				method: 'get'
			})
			.then(res => {
				this.detailsNotifications = res.data.data
			
			})
			.catch(err => {
				console.log("Error",err)
			})
		},
		async paginateNotification(page){
			this.currentPage = page
			await this.getNotification(this.currentPage)
		},
    },
    computed: {
		
    },
    async mounted(){
		await this.getNotification()
	}
}

</script>

<style lang="scss">
@import '../assets/scss/_variables';

h1 { font-size: 1.6em; color: #222	; }
h2 { font-size: 1.2em; }
h3 { font-size: 1.2em; font-weight: 300; line-height: 2em; }
// p  { font-size: .7em; color: #666; line-height: 1.2em; }

.tooltip {
	width: 300px;
}
.el-table__empty-block {
	height: 200px !important
}
</style>
