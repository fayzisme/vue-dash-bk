<template>
	<div class="scrollable only-y" v-loading="loadingPage">
		<div class="page-header">
				<h1>Whatsapp Notification Report</h1>
		</div>
		<el-card v-if="showAlertMessage" align="center">
			<h2 align="center">Start messaging your customers today</h2>
			<p v-html="$t('promote.desc.whatsapp')"></p>
			<br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span>
			<div v-if="customer_type==2 && businessId==undefined && businessId==''" style="margin: 0 0 20px;">
                <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Connect to Facebook</button>
            </div>
		</el-card>
		<!-- <el-card v-if="showAlertError" style="margin-bottom: 1em">
			<error-gope />
		</el-card> -->
		<span v-else>
			<!-- <el-card v-if="showFormMessage && customer_type == 2 && fillProductNotif.length > 0" style="background-color: #249393; color: white; margin-bottom: 10px;" v-loading="quotaLoader">
				<el-row type="flex" justify="space-around">
					<el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
					<el-row>
					<el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
						<div style="padding-top: 5px;">
						{{ $t("settings.profile.quota") }} :
						</div>
					</el-col>
					<el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
						<div style="padding-top: 5px;">
						<strong>{{quota}}</strong>
						</div>
					</el-col>
					</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
					<el-row>
					<el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<div style="padding-top: 5px;">
						{{ $t("settings.profile.number") }} :
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<el-select size='small' v-model="selectNumber" @change="handleChangeQuota" :default-first-option="true">
						<el-option
							v-for="item in whatsappNumber"
							:key="item"
							:label="item"
							:value="item" />
						</el-select>
					</el-col>
					</el-row>
								
							</el-col>
							<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
					<el-row>
					<el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<div style="padding-top: 5px;">
						{{ $t("settings.profile.notification") }} :
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<el-select size='small' v-model="product_type" @change="handleChangeProduct" :default-first-option="true">
						<el-option
							v-for="(item,i) in fillProductNotif"
							:key="i"
							:label="item.product.alias"
							:value="item.product._id" />
						</el-select>
					</el-col>
					</el-row>	
							</el-col>
				</el-row>
			</el-card>
			<el-card v-else style="background-color: #249393; color: white; margin-bottom: 10px;" v-loading="quotaCardLoader">
			</el-card> -->
		<el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
			<el-tab-pane label="Report" name="report">
				<el-form :inline="true" class="demo-form-inline" v-if="!showAlertMessage && !showAlertError">
					<el-form-item>
						<el-date-picker size="mini" style="width: 275px;" v-model="selectedStartDate" :picker-options="pickerOptions" :unlink-panels="true" :editable="false" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date"/>
					</el-form-item>
					<el-form-item>
						<el-select v-model="sender" size="mini" placeholder="Select Phone Number" :default-first-option="true" style="width:150px">
							<el-option style="width: 150px;"
							v-for="item in waUserDetail.sender"
							:key="item"
							:label="item"
							:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-select placeholder="Filter by" v-model="valueFilter" size="mini" style="float: left; width: 150px;">
							<el-option v-for="by in optionsFilter" :key="by.value" :value="by.value" :label="by.label" />
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input size="mini" style="float: left !important; width: 150px;"
							class="search-contact"
							prefix-icon="el-icon-search"
							placeholder="Search data"
							clearable
							v-model="searchingData">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="mini" class="animated fadeInRight" @click="changeFilter">
							<i class="el-icon-search" />
						</el-button>
					</el-form-item>
					<el-form-item>
						<!-- <el-button type="primary" plain :loading="loadingExport" class="animated fadeInRight" @click="getReport(1, 'download')">
							<i class="mdi mdi-download" /> Download
						</el-button> -->
						<el-button type="primary" size="mini" class="animated fadeInRight" @click="downloadExcel">
							<i class="mdi mdi-download"/>
						</el-button>
					</el-form-item>
				</el-form>
				
				<el-dialog title="Message status history" :visible.sync="modalInvalid" style="text-align: left;">
					<vue-json-pretty
						:path="'res'"
						:data="selectedRows">
					</vue-json-pretty>
					<!-- <pre>{{selectedRows}}</pre> -->
				</el-dialog>
				<el-row :gutter="10" v-if="!showAlertMessage && !showAlertError" style="z-index: 0">
					<el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-card shadow="card-shadow--small">
							<!-- <div slot="header" class="clearfix" align="center">
								<h2 style="font-weight: bold">Whatsapp Notification Report</h2>
							</div> -->
							<div class="group-list scrollable only-y" v-loading="loadingPage">
								<el-row class="mb-20" style="font-size:14px;">
									<el-col :span="4" :md="4" :sm="4" :xs="4" justify="end" v-loading="loadingReportTable">
										<el-card style="background-color:#249393; font-size:12px; color:#ffffff; font-weight:bold;" class="mb-10">
											<span style="font-size:14px;">Total</span><br>
											<span style="font-size:16px;" v-if="sender">
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											{{ resData.status.all }}</span>
											<span style="font-size:16px;" v-else>
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											-</span>
										</el-card>
									</el-col>
									<el-col :span="4" :md="4" :sm="4" :xs="4" justify="end" v-loading="loadingReportTable">
										<el-card style="background-color:#1d808a; font-size:12px; color:#ffffff; font-weight:bold;" class="mb-10">
											<span style="font-size:14px;">Sent</span><br>
											<span style="font-size:16px;" v-if="sender">
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											{{ resData.status.sent }}</span>
											<span style="font-size:16px;" v-else>
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											-</span>
										</el-card>
									</el-col>
									<el-col :span="4" :md="4" :sm="4" :xs="4" justify="end" v-loading="loadingReportTable">
										<el-card style="background-color:#166d81; font-size:12px; color:#ffffff; font-weight:bold;" class="mb-10">
											<span style="font-size:14px;">Delivered</span><br>
											<span style="font-size:16px;" v-if="sender">
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											{{ resData.status.delivered }}</span>
											<span style="font-size:16px;" v-else>
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											-</span>
										</el-card>
									</el-col>
									<el-col :span="4" :md="4" :sm="4" :xs="4" justify="end" v-loading="loadingReportTable">
										<el-card style="background-color:#0e5978; font-size:12px; color:#ffffff; font-weight:bold;" class="mb-10">
											<span style="font-size:14px;">Read</span><br>
											<span style="font-size:16px;" v-if="sender">
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											{{ resData.status.read }}</span>
											<span style="font-size:16px;" v-else>
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											-</span>
										</el-card>
									</el-col>
									<el-col :span="4" :md="4" :sm="4" :xs="4" justify="end" v-loading="loadingReportTable">
										<el-card style="background-color:#07466f; font-size:12px; color:#ffffff; font-weight:bold;" class="mb-10">
											<span style="font-size:14px;">Failed</span><br>
											<span style="font-size:16px;" v-if="sender">
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											{{ resData.status.failed }}</span>
											<span style="font-size:16px;" v-else>
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											-</span>
										</el-card>
									</el-col>
									<el-col :span="4" :md="4" :sm="4" :xs="4" justify="end" v-loading="loadingReportTable">
										<el-card style="background-color:#003366; font-size:12px; color:#ffffff; font-weight:bold;" class="mb-10">
											<span style="font-size:14px;">Invalid</span><br>
											<span style="font-size:16px;" v-if="sender">
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											{{ resData.status.invalid }}</span>
											<span style="font-size:16px;" v-else>
												<!-- <i class="mdi mdi-message-text-outline fl-l"></i>  -->
											-</span>
										</el-card>
									</el-col>
								</el-row>
								<el-pagination
									background
									prev-text="Prev"
									next-text="Next"
									layout="prev, pager, next"
									:page-size="50"
									@current-change="paginateReport"
									:current-page="currentPage"
									:total="total">
								</el-pagination>
								<template>
									<el-table :data="messages" style="width: 100%; color: #000 !important" v-loading="loadingTable" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(246, 246, 245, 0.8)">
										<el-table-column width="170" prop="dateTime" label="Date">
											<template slot-scope="props">
												{{ format(props.row.created_date, "DD/MM/YYYY, HH:mm") }}
											</template>
										</el-table-column>
										<el-table-column width="150" prop="sender" label="From"></el-table-column>
										<el-table-column width="150" prop="to" label="To"></el-table-column>
										<el-table-column prop="type" label="Type" width="250"></el-table-column>
										<el-table-column prop="msg_id" label="Message ID" width="300"></el-table-column>
										<el-table-column prop="status" label="Status" align="center" width="100">
											<template slot-scope="props">
												<p v-if="props.row.status == 'processing'">
													<el-tooltip class="item" effect="dark" content="On process" placement="top">
														<span class="mdi mdi-clock"></span>
													</el-tooltip>
												</p>
												<p v-else-if="props.row.status == 'sent'">
													<el-tooltip class="item" effect="dark" content="Message was sent" placement="top">
														<span class="mdi mdi-check"></span>
													</el-tooltip>
												</p>
												<p v-else-if="props.row.status == 'delivered'">
													<el-tooltip class="item" effect="dark" content="Message was delivered" placement="top">
														<span class="mdi mdi-check-all"></span>
													</el-tooltip>
												</p>
												<p v-else-if="props.row.status == 'read'">
													<el-tooltip class="item" effect="dark" content="Message was read" placement="top">
														<span style="color: #249393; font-weight:bold;" class="mdi mdi-check-all"></span>
													</el-tooltip>
												</p>
												<p v-else-if="props.row.status == 'fail' || props.row.status == 'failed'">
													<el-tooltip placement="top">
														<div style="max-width: 250px;" class="tooltip" slot="content">{{errorMessage(props.row)}}</div>
														<!-- <span style="color: red; font-weight:bold;" class="mdi mdi-close-circle-outline" @click="modalInvalid=true; selectedRows=props.row.transaction_status"></span> -->
														<span style="color: red; font-weight:bold;" class="mdi mdi-close-circle-outline"></span>
													</el-tooltip>
												</p>
												<p v-else-if="props.row.status == 'invalid'">
													<el-tooltip class="item" effect="dark" :content="'Invalid'" placement="top">
													<span @click="modalInvalid=true; selectedRows=props.row.transaction_status" style="color: red; font-weight:bold;" class="mdi mdi-close-circle-outline"></span>
													</el-tooltip>													
													
												</p>
												<p v-else-if="props.row.status == 'scheduled'">
													<el-tooltip class="item" effect="dark" content="Scheduled" placement="top">
														<span class="mdi mdi-calendar-clock"></span>
													</el-tooltip>
												</p>
											</template>
										</el-table-column>
										<el-table-column prop="latest_status_dt" label="Update Status Date" width="180">
											<template slot-scope="props">
												{{ format(props.row.latest_status_dt, "DD/MM/YYYY, HH:mm") }}
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
									:page-size="50"
									@current-change="paginateReport"
									:current-page="currentPage"
									:total="total"
									class="mt-10">
								</el-pagination>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="Download" name="download">
				<div class="scrollable only-y" v-loading="reportTabLoading">
					<el-row :gutter="30">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-card style="border: 1px solid #ebeef5" class="page-header box-card card-base" v-for="(list, index) of lists" :key="index">
								<el-row :gutter="30">
									<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
										<div>
											<i class="mdi mdi-file" style="font-size: 24px; line-height: 100px"/>
										</div>
									</el-col>
									<el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
										<span>
											<h2 class="no-m accent-text">{{ list.title }}</h2>
											<p style="font-size: 14px" class="no-m">
												Report filter detail:
												<ul>
													<li>Start date: {{ list.parameter.startDate }}</li>
													<li>End date: {{ list.parameter.endDate }}</li>
													<li>Phone number: {{ list.parameter.number }}</li>
												</ul><br/>
												Request at: {{ format(list.createdAt, "DD MMM YYYY, HH:mm") }}
											</p><br/>
											<a v-if="list.status == 'done'" class="el-button el-button--primary el-button--mini" target="_blank" :href="list.downloadUrl">
												<i class="mdi mdi-download"/> Download
											</a>

											<el-button disabled v-else-if="list.status == 'waiting'" size="mini" type="warning">
												<i class="mdi mdi-history"/> Processing
											</el-button>

											<el-button disabled v-else-if="list.status == 'failed'" size="mini" type="danger">
												<i class="mdi mdi-history"/> Failed
											</el-button>
										</span>
									</el-col>
									<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
										<el-button @click="deleteFile(list.session)" v-if="list.status == 'done' || list.status == 'failed' || list.status == 'waiting'" size="mini" type="text">
											<i class="mdi mdi-delete text-danger" style="font-size: 24px; line-height: 100px; color: red !important;"/>
										</el-button>
									</el-col>
								</el-row>
							</el-card>

							<el-card v-if="lists.length < 1" style="border: 1px solid #ebeef5" class="page-header box-card card-base">
								<p class="text item" align="center">
									<img src="@/assets/images/no_report@3x.png" width="120px"/><br/>
									Files you download will appear here
								</p>
							</el-card>
						</el-col>
					</el-row>
				</div>
			</el-tab-pane>
			<el-tab-pane label="HSM Rate" name="hsmRate">
				<el-form :inline="true" class="demo-form-inline" v-if="!showAlertMessage && !showAlertError">
					<el-form-item>
						<el-date-picker size="mini" style="width: 275px;" v-model="selectedStartDateRate" :picker-options="pickerOptions" :unlink-panels="true" :editable="false" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date"/>
					</el-form-item>
					<el-form-item>
						<el-select v-model="sender" size="mini" placeholder="Select Phone Number" :default-first-option="true" style="width:150px">
							<el-option style="width: 150px;"
							v-for="item in waUserDetail.sender"
							:key="item"
							:label="item"
							:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<!-- <el-form-item>
						<el-select placeholder="Filter by" v-model="valueFilter" size="mini" style="float: left; width: 150px;">
							<el-option v-for="by in optionsFilter" :key="by.value" :value="by.value" :label="by.label" />
						</el-select>
					</el-form-item> -->
					<!-- <el-form-item>
						<el-input size="mini" style="float: left !important; width: 150px;"
							class="search-contact"
							prefix-icon="el-icon-search"
							placeholder="Search data"
							clearable
							v-model="searchingData">
						</el-input>
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" size="mini" class="animated fadeInRight" @click="changeFilterRate">
							<i class="el-icon-search" />
						</el-button>
					</el-form-item>
					<!-- <el-form-item> -->
						<!-- <el-button type="primary" plain :loading="loadingExport" class="animated fadeInRight" @click="getReport(1, 'download')">
							<i class="mdi mdi-download" /> Download
						</el-button> -->
						<!-- <el-button type="primary" size="mini" class="animated fadeInRight" @click="downloadExcel">
							<i class="mdi mdi-download"/>
						</el-button>
					</el-form-item> -->
				</el-form>
				
				<!-- <el-dialog title="Message status history" :visible.sync="modalInvalid" style="text-align: left;">
					<vue-json-pretty
						:path="'res'"
						:data="selectedRows">
					</vue-json-pretty>
				</el-dialog> -->
				<el-row :gutter="10" v-if="!showAlertMessage && !showAlertError" style="z-index: 0">
					<el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-card shadow="card-shadow--small">
							<!-- <div slot="header" class="clearfix" align="center">
								<h2 style="font-weight: bold">Whatsapp Notification Report</h2>
							</div> -->
							<div class="group-list scrollable only-y" v-loading="loadingPage">
								<!-- <el-pagination
									background
									prev-text="Prev"
									next-text="Next"
									layout="prev, pager, next"
									:page-size="50"
									@current-change="paginateReport"
									:current-page="currentPage"
									:total="total">
								</el-pagination> -->
								<template>
									<el-table :data="hsmRateData" style="width: 100%; color: #000 !important" v-loading="loadingHsmRate" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(246, 246, 245, 0.8)">
										<el-table-column width="350" prop="name" label="Template Name" fixed></el-table-column>
										<el-table-column prop="total" label="Total" width="100">
											<template slot-scope="props">
												<span v-if="!props.row.total">-</span>
												<span v-else>{{ props.row.total }}</span>
											</template>
										</el-table-column>
										<el-table-column prop="sent" label="Total Sent Message" width="160">
											<template slot-scope="props">
												<span v-if="!props.row.delivered && !props.row.sent && !props.row.read">-</span>
												<span v-else>{{ (!props.row.delivered ? 0 : props.row.delivered) + (!props.row.sent ? 0 : props.row.sent) + (!props.row.read ? 0 : props.row.read) }}</span>
											</template>
										</el-table-column>
										<el-table-column width="200" prop="delivered" label="Total Delivered Message">
											<template slot-scope="props">
												<span v-if="!props.row.delivered">-</span>
												<span v-else>{{ props.row.delivered }}</span>
											</template>
										</el-table-column>
										<el-table-column prop="read" label="Total Read Message" width="180">
											<template slot-scope="props">
												<span v-if="!props.row.read">-</span>
												<span v-else>{{ props.row.read }}</span>
											</template>
										</el-table-column>
										<el-table-column prop="read_rate" label="Success Rate" width="140">
											<template slot-scope="props">
												<span v-if="!props.row.delivered && !props.row.sent && !props.row.read">-</span>
												<span v-else>
													{{ (((!props.row.delivered ? 0 : props.row.delivered) + (!props.row.sent ? 0 : props.row.sent) + (!props.row.read ? 0 : props.row.read))/(!props.row.total ? 0 : props.row.total)*100).toFixed(2)+" %" }}
												</span>
											</template>
										</el-table-column>
										<el-table-column prop="read_rate" label="Reading Rate" width="150">
											<template slot-scope="props">
												<span v-if="!props.row.read_rate">-</span>
												<span v-else>{{ props.row.read_rate }} %</span>
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
								<!-- <el-pagination
									background
									prev-text="Prev"
									next-text="Next"
									layout="prev, pager, next"
									:page-size="50"
									@current-change="paginateReport"
									:current-page="currentPage"
									:total="total"
									class="mt-10">
								</el-pagination> -->
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
		</span>
		
    </div>
</template>
        
<script>
import ContactDialog from '@/components/ContactDialog'
import api from '@/networkClient'
const axios = require('axios')
import config from '@/config'
import store from '@/store'
import moment from 'moment-timezone'
import Push from 'push.js'
import download from 'downloadjs';
import _ from 'lodash'
import VueJsonPretty from 'vue-json-pretty'

export default {
	components: {
		VueJsonPretty
	},
    data() {
			return {
				businessId: '',
				customer_type: store.getters.customer_type,
				optionsFilter: [
					{
						value: 'to',
						label: 'Recipient'
					}, {
						value: 'msg_id',
						label: 'Message ID'
					}, {
						value: 'type',
						label: 'Template Name'
					}
				],
				valueFilter: 'to',
				searchingData: '',
				timeoutReport: null,
				selectedRows: {},
				modalInvalid: false,
				activeTab: 'report',
				lists:[],
				hsmRateData: [],
				loadingHsmRate: false,
				bodyStyle: {
					padding: "20px"
				},
				loadingReportTable: false,
				loadingExport: false,
				selectedStartDate: [
					moment().format("YYYY-MM-DD"),
					moment().format("YYYY-MM-DD")
				],
				selectedStartDateRate: [
					moment().format("YYYY-MM-DD"),
					moment().format("YYYY-MM-DD")
				],
				selectedYear: moment().format("YYYY"),
				selectedMonth: moment().format("M"),
				loadingPage: true,
				loading: false,
				tabLoading: false,
				reportTabLoading: false,
				loadingTable: true,
				reportData: [],
				dateRange: [
					new Date(),
					new Date(),
				],
				pickerOptions: {
					disabledDate: time => {
						var today = moment(), diff = today.diff(moment(time), 'd')
						if(diff > 90 || diff < 0){
							return true
						} else {
							if(diff == 0){
								if(today.isSame(moment(time), 'd') == false){
									return true
								} else {
									return false
								}
							}
							return false
						}
					}
				},
				loadingExport: false,
				pageSize:'2',
				onPage:'1',
				totalCount: 100000,
				resData:[],
				messages:[],
				startDate: new Date(),
				endDate: new Date(),
				excelFields: {
					"Date": "dateTimeIso",
					"Time": "dateTimeIso",
					"From": "from",
					"To": "to",
					"Delivered": "delivered"
				},
				excelData: [],
				excelFilename: `Report Notification (Platform by DAMCorp).xls`,
				pageNotAllowed: false,
				showAlertError: false,
				showAlertMessage: false,
				showFormMessage: false,
				options: [
					{
						value: '1',
						label: 'Januari'
					}, {
						value: '2',
						label: 'Februari'
					}, {
						value: '3',
						label: 'Maret'
					}, {
						value: '4',
						label: 'April'
					}, {
						value: '5',
						label: 'Mei'
					}, {
						value: '6',
						label: 'Juni'
					}, {
						value: '7',
						label: 'Juli'
					}, {
						value: '8',
						label: 'Agustus'
					}, {
						value: '9',
						label: 'September'
					}, {
						value: '10',
						label: 'Oktober'
					}, {
						value: '11',
						label: 'November'
					}, {
						value: '12',
						label: 'Desember'
					}
				],
				value: moment().format('M'),
				optionsYear: [],
				year: "2019",
				waUserDetail : {
					hsm : [],
					sender : []
				},
				sender : '',
				currentPage: 1,
				total:0,
				dateRange: [
					new Date(),
					new Date(),
				],
				quotaLoader: false,
				quotaCardLoader: false,
      			totalBill: 0,
				quota: 0,
				whatsappNumber: [],
				whatsappBilling: [],
				fillProductNotif: [],
				billing_product_log: [],
				dataProduct: [],
				selectNumber: '',
				product_type: '',
			}
    },
    methods: {
		async checkBusinessId(){
			await api({
				method: 'get',
				url: 'bussiness/checkBusinessId',
			}).then(result => {
				if(result.data.ec != 200 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
				} else {
					this.businessId = result.data.dataString
					// console.log('bus id',this.businessId)
				}
			}).catch(error => {
			})	
		},
			doSearch(from = null){
			if(from == 'select'){
				if(this.searchingData != ''){
					this.getReport()
				}
			} else{
				clearTimeout(this.timeoutReport)
				this.timeoutReport = setTimeout(() => {
					this.currentPage = 1
					this.getReport()
				}, 1000)
			}
		},
		errorMessage(row){
			if(row.status == "failed" || row.status == "fail"){
				if(row.latest_error_message){
					return "Failed. " + row.latest_error_message
				}
			}
			return row.status.charAt(0).toUpperCase() + row.status.slice(1)
		},
		callback: function(page) {
			this.onPage = page
			this.getReport()
		},
        print() {
			window.print()
		},
		download(){
			this.getReport("download")
		},
		monthName(val){
			let month = _.find(this.options, 'value')
			return month.label
		},
        format(val, format){
            return moment(val).format(format)
		},
		async changeFilter(){
			this.currentPage = 1
			await this.getReport(1)
		},
		async changeFilterRate(){
			// this.currentPage = 1
			await this.hsmRate()
		},
		async loadWA() {
			await api({
				method: 'post',
				url: config.baseApi +'user/detail/number',
				data: {
					channels: "whatsapp"
				}
			}).then(result => {
				// this.loadingPage = false
				if(result.data.ec == 200){
				this.showFormMessage = true
				this.waUserDetail.sender = _.uniq(result.data.data)
				this.sender = this.waUserDetail.sender[0]
				// console.log('sender',this.waUserDetail.sender)
				} else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
				} else {
					this.showAlertError = true
				}
			}).catch(error => {
				this.showAlertError = true
			})
			this.loadingPage = false
		},
    async getReport(page = 1, query = "", view = false){
			if(query == "download"){
				let action = ""
				await this.$confirm(`Report will be sent to <b>${this.$store.getters.email}</b><br/>Continue to generate your report?`, 'Confirm', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					dangerouslyUseHTMLString: true,
					type: 'warning',
					center: true
				}).then(() => {
				}).catch(() => {
					action = "cancel"
				});
				if(action == "cancel") return
			}
			this.showAlertError = false
			this.loadingTable = true
			// await this.loadWA()
			var self = this
			let apiOptions = {
				url: config.baseApi + "user/report/notification?page=" + page,
				method: 'post',
				params: {
					view : view == true ? true : null
				},
				data:{
					"year":this.year.toString(),
					"month":this.value,
					"number":this.sender,
					startDate: moment(this.selectedStartDate[0]).format("YYYY-MM-DD"),
					endDate: moment(this.selectedStartDate[1]).format("YYYY-MM-DD"),
				}
			}
			if(query == "download"){
				apiOptions.url += "&download"
				// apiOptions.responseType = 'blob'
			}

				if(this.searchingData){
					apiOptions.data.search_type = this.valueFilter
					apiOptions.data.search = this.searchingData
				}
            await api(apiOptions)
            .then(res => {
				let endDate = moment([this.year, this.value-1]).endOf('month').format("DD MMM YYYY")
				let date = ""
				if(this.value == moment().month()+1 && this.year == moment().year()){
					date = moment().format('DD MMM YYYY')
				}
				else{
					date = endDate
				}
				if(res.data.ec == 200 && query != "download"){
					this.resData = res.data.data
					this.messages = res.data.data.messages
					// console.log('messages response',this.messages)
					// console.log('this messages',this.messages)
					// this.messages = _.orderBy(this.messages, function(o) { return new moment(o.dateTimeIso); }, ['desc'])
					this.month = this.value
					this.total = res.data.data.total
				} else{
					this.$swal(this.$t('success'), "We will process your request. Please wait for a while. Thank you!", "success")
				}
				// console.log("content-type", res.headers['content-type'])
				if(res.headers['content-type'].indexOf('application/json') == -1){
					try {
						const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
						const link = document.createElement('a');
						link.href = url;
						link.setAttribute('download', 'Report Notification (Platform by DAMCorp) ('+date+').xls'); //or any other extension
						link.click();
					} catch(err){
						// console.log(err.message)
					}
				} else{
					if(res.data.ec != 200){
						if(res.data.message == "waiting"){
							this.$swal(this.$t('error'),"Please wait until you first request done and you can resubmit request for report download", "error")
						} else{
							this.$swal(this.$t('error'), this.$t(`error_text`), "error")
						}
					}
				}
            })
            .catch(err => {
				// console.log(err.message)
				if(query == "download") this.showAlertError = true
            })
			this.loadingTable = false
			// this.tabLoading = false
		},

		async exportExcel(){
			this.loadingExport = true
			var self = this
			let apiOptions = {
                url: config.baseApi + "user/report/notification?export",
                method: 'post',
                data:{
					"year":this.year.toString(),
					"month":this.value,
					startDate: moment(this.dateRange[0]).format("YYYY-MM-DD"),
					endDate: moment(this.dateRange[1]).format("YYYY-MM-DD"),
					"number":this.sender
                }
			}
            await api(apiOptions)
            .then(res => {
				if(res.data.ec == 200){
					let messages = res.data.data.messages
					messages = _.orderBy(messages, function(o) { return new moment(o.dateTimeIso); }, ['desc']);
					var data = messages
					var i = 0;
					var csvData = ''
					csvData += "\t\t\tReport Notification\t\t\n"
					csvData += "\t\t\tPlatform by DAMCorp.\t\t\n"
					csvData +="No\t"+"Date\t"+"Time\t"+"From\t"+"To\t"+"Type\t"+"Status\n";
					
					data.forEach(item => {
						i++
						csvData += i + '' + '\t'
						csvData += moment(item.dateTimeIso).local().format('YYYY-MM-DD')+'\t'
						csvData += moment(item.dateTimeIso).local().format('HH:mm')+'\t'
						csvData += item.from+'\t'
						csvData += item.to+ '\t'
						csvData += item.type+'\t'
						csvData += item.status+ '\t'
						csvData += '\r\n'
					});
					
					let base64 = window.btoa(window.unescape(encodeURIComponent(csvData)))
					let bstr   = atob(base64)
					let n      = bstr.length
					let u8arr  = new Uint8ClampedArray(n)
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n)
					}
					
					let filename = "Report_Notification.xls"
					let mime = "application/vnd.ms-excel"
					let blob =  new Blob([u8arr], { type: mime })
					download(blob, filename, mime)
					// this.isLoading=false
				}
            })
            .catch(err => {
				// console.log(err.message)
				// this.showAlertError = true
				this.$swal(this.$t('error'), this.$t('download_failed_text'), "warning")
            })
            this.loadingExport = false
		},

		async paginateReport(page){
			this.currentPage = page
			await this.getReport(this.currentPage)
		},

		async hsmRate(){
			this.loadingHsmRate = true
			await api({
				method: "post",
				url: config.baseApi+"user/report/hsmRate",
                data:{
					// "number": "0215155295",
					// "startDate": "2021-01-01",
					// "endDate": "2021-03-10"
					// "year":this.selectedYear.toString(),
					"number":this.sender,
                    "startDate":moment(this.selectedStartDateRate[0]).format("YYYY-MM-DD"),
                    "endDate":moment(this.selectedStartDateRate[1]).format("YYYY-MM-DD"),
                }
			}).then(response => {
				var data = response.data
				// console.log('list data hsm rate',data)
				if(data.ec == 200){
					this.hsmRateData = response.data.data.rank
				}
				// 	this.lists = data.data.map(v => {
				// 		// console.log('v',v)
				// 		v.title = "Report " + v.customerName
				// 		v.downloadUrl = v.url ? v.url.secure_url : null
				// 		return v
				// 	})
				// } else {
				// }
			})
			this.loadingHsmRate = false
		},

		async loadData(){
			this.reportTabLoading = true
			await api({
				method: "get",
				url: "report/list"
			}).then(response => {
				var data = response.data
				// console.log('list data',data)
				if(data.ec == 200){
					this.lists = data.data.map(v => {
						// console.log('v',v)
						v.title = "Report " + v.customerName
						v.downloadUrl = v.url ? v.url.secure_url : null
						return v
					})
				} else {
				}
			})
			this.reportTabLoading = false
		},
		async deleteFile(session){
			try {
				await this.$confirm(`You will permanently delete this file. Are you sure?`, 'Confirm', {
					confirmButtonText: 'Sure',
					cancelButtonText: 'Cancel',
					dangerouslyUseHTMLString: true,
					type: 'warning',
					center: true
				})
				this.reportTabLoading = true
				await api({
					method: "delete",
					url: "report/" + session
				}).then(response => {
					if(response.data.ec == 200){
						this.$swal(this.$t('success'), "", "success")
					} else{
						this.$swal(this.$t('error'), "Sorry, delete file failed. Please try again", "error")
					}
				}).catch(err => {
					this.$swal(this.$t('error'), this.$t('error_text'), "error")				
				})
				this.reportTabLoading = false
				this.loadData()
			} catch(err){

			}
		},
		async loadReport(page = 1, query){
            if(query == "download"){
				let action = ""
				await this.$confirm(`You will request notification report.<br/><b>You may not request any report until this process is finish.</b> Continue request report?`, 'Confirm', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					dangerouslyUseHTMLString: true,
					type: 'warning',
					center: true
				}).then(() => {
				}).catch(() => {
					action = "cancel"
				});
				if(action == "cancel") return
			}
			var self = this
			let custId = this.$store.getters.customerID
			let apiOptions = {
                url: config.baseApi+ "user/"+custId+"/report/notification?page="+page,
                method: 'post',
                data:{
					"year":this.selectedYear.toString(),
                    "startDate":moment(this.selectedStartDate[0]).format("YYYY-MM-DD"),
                    "endDate":moment(this.selectedStartDate[1]).format("YYYY-MM-DD"),
					"number":this.sender
                }
            }

            if(query == "download"){
				apiOptions.url = config.baseApi + `user/${custId}/report/notification/download`
                apiOptions.method = "get"
                apiOptions.params = apiOptions.data
                delete apiOptions.data
			}

            await api(apiOptions)
            .then(res => {
                if(query == "download"){
                    // console.log(res.headers['content-type'].indexOf('application/json'))
                    if(res.data.ec == 200){
						this.$swal(this.$t('success'), "We will process your request. Please wait for a while. Thank you!", "success")
						this.activeTab = 'report'
						this.reportTabLoading = true
						this.loadData()
                    } else {
                        if(res.data.message == "waiting"){
                            this.$swal(this.$t('warning'), "You may not request any report for this company until last request was finished", "warning")
                        } else {
                            this.$swal(this.$t('error'), this.$t('error_text'), "error")
                        }
                    }
                } else{
                    var dt
                    if(res.data.ec == 200){
						this.resData = res.data.data
						// console.log('res data',this.resData)
                        this.dataMessages = res.data.data.messages
                        // this.dataMessages = _.orderBy(this.dataMessages, function(o) { return new moment(o.dateTimeIso); }, ['desc'])
                        this.month = res.data.data.month
                        this.totalMessages = parseInt(res.data.data.total)
                        this.status = res.data.data.status
                        // this.status.processing = res.data.data.status.processing
                        // this.status.success = res.data.data.status.sent
                        // this.status.failed = res.data.data.status.failed
                        // console.log("DATA PROC",this.status.success)
					}
                    dt = this.resData
                }
            })
            .catch(err => {
				// console.log(err.message)
				this.showAlertError = true
			})
			this.reportTabLoading = false
		},
		async downloadExcel(){
            this.loadingExport = true
            await this.loadReport(1, 'download')
            this.loadingExport = false
		},
		async wa_billing(query = ""){
			this.quotaCardLoader = true
			let apiOptions = {
                url: config.baseApi + "/user/billing",
                method: 'post',
                data:{
					months: moment().format('YYYY-MM'),
					with_date: true
				},
				timeout: 90000
			}
			this.totalBill = 0
			await api(
				apiOptions
			).then(result => {
				let tempNumber = new Array()
				let tempBilling = new Array()
				let i = 0
				let date = ""
				if (result.data.ec == 200){
					// console.log("==result==",result)
					this.dataProduct = result.data.data.billing
					this.billing_product_log = result.data.data.update_log
					let responseBilling = result.data.data.billing,
							update_log = result.data.data.update_log
						
						_.forEach(responseBilling, dt => {
							tempNumber.push(dt.phone_number)
							tempBilling[i] = new Array()
							let tempTax = new Array()
							let j = 0
							_.forEach(dt.billing, billing => {
								let dtpush = {
									product: billing.product,
									delivered: billing.delivered,
									total: billing.billing,
									detail: billing.detail
								}

								if(billing.serviceFee){
									this.totalBill += parseFloat(billing.serviceFee)
									tempTax.push({ product: { productName: "Service Fee", type: "" }, delivered: "", total: parseFloat(billing.serviceFee) })
								} else {
									let fee = 0
									if(billing.detail) {
										billing.detail.forEach(e => {
											fee += parseFloat(e.serviceFee)
										})
										this.totalBill += parseFloat(fee)
										tempTax.push({ product: { productName: "Service Fee", type: "" }, delivered: "", total: parseFloat(fee) })
									}
								}
								// if(billing.serviceFeeTax){
								// 	this.totalBill += parseFloat(billing.serviceFeeTax)
								// 	tempTax.push({ product: { productName: "Service Fee Tax", type: "" }, delivered: "", total: parseFloat(billing.serviceFeeTax) })
								// }
								if(billing.billingTax){
									this.totalBill += parseFloat(billing.billingTax)
									tempTax.push({ product: { productName: billing.product.productName + " Tax", type: "" }, delivered: "", total: parseFloat(billing.billingTax) })
								}

								tempBilling[i].push(dtpush)
								if(j+1 == dt.billing.length){
									_.forEach(tempTax, tax => {
										tempBilling[i].push(tax)
									})
								}
								if(Array.isArray(billing.detail)) {
									billing.detail.forEach(detail => {
										this.totalBill += detail.total
									})
								} else {
									this.totalBill += billing.billing
								}
								j++
							})
							i++;
						})
						this.whatsappNumber = tempNumber
						this.whatsappBilling = tempBilling
						// console.log("==tempNumber==",tempNumber)
						// console.log("==tempbilling==",tempBilling)
						this.selectNumber = this.whatsappNumber[0]
						this.handleChangeQuota()	
				} 
				else{
					this.dataProduct = []
				}
				this.quotaCardLoader = false
			}).catch(error => {
				this.dataProduct = []
				// console.log(error.message)
				// this.$swal(this.$t('error'), this.$t('error_text'), "error")
			})
		},
    handleChangeQuota(){
			this.product_type = ''
			let selectedNumber = _.find(this.dataProduct, (v) => {
                return v.phone_number == this.selectNumber
            })

			if (selectedNumber && selectedNumber.billing.length > 0) {
				this.fillProductNotif = selectedNumber.billing.filter(el => {
					return el.product.productName.includes('Whatsapp Notification')
				})

				if (this.fillProductNotif.length > 0) {
					
					this.fillProductNotif.forEach(el => { el.product.alias = el.product.type.replace(/_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())})

					if (this.product_type == '') {
						this.product_type = this.fillProductNotif[0].product._id
					}

					this.handleChangeProduct()

				}
			}
		},
    handleChangeProduct(){
      this.quotaLoader = true
			let totalUse = 0
			let productQuota = _.find(this.fillProductNotif, (v) => {
				return v.product._id == this.product_type
			})

			let tempQuota = productQuota.product.count || 0
			tempQuota += productQuota.product.monthly_free_count || 0

			if (productQuota.detail && productQuota.detail > 0) {
				totalUse = productQuota.detail.filter(el => el.countryCode == '+62').reduce((accumulator, currentValue) => accumulator + currentValue.count, 0) || 0
			}
			else {
				totalUse = productQuota.delivered
			}
			// console.log('productQuota', productQuota);
			// console.log('tempQuota', tempQuota);
			// console.log('totalUse', totalUse);

			this.quota = tempQuota - totalUse

			if (this.quota < 0) {
				this.quota = '-'
			}

      this.quotaLoader = false
		},
		tabClick(target){
			if(target.name=='download'){
				this.getReport()
			}else if(target.name=='hsmRate'){
				this.hsmRate()
			}
			else{
				this.loadData()
			}
		}
    },
	
    computed: {
    },
    async mounted(){
		this.checkBusinessId()
		this.customer_type
		this.loadData()
		let year = []
		let i = 0
		let yearNow = new Date().getFullYear()
		let yearStart = new Date().getFullYear() - 2
		for(i = yearNow; i >= yearStart; i--){
			year.push({ value: i, label: i })
		}
		this.optionsYear = year
		await this.loadWA()
		this.wa_billing()
		this.hsmRate()
		// this.waUserDetail.sender = ["0215155295", "081234567890"]
		// this.sender = "0215155295"
		if(this.showAlertError == false && this.showAlertMessage == false) await this.getReport(this.currentPage,"",true)
		else this.loadingPage = false
		this.monthName(1)
    }
}

</script>

<style lang="scss">
@import '../../assets/scss/_variables';

h1 { font-size: 1.6em; color: #222	; }
h2 { font-size: 1.2em; }
h3 { font-size: 1.2em; font-weight: 300; line-height: 2em; }
// p  { font-size: .7em; color: #666; line-height: 1.2em; }

.el-table__empty-block {
	height: 200px
}
.page-report {
	.toolbar {
		margin: 0 auto;
		text-align: right;
		margin-bottom: 20px;
	}

	.invoice {
		background: white;
		width: 100%;
		min-height: 1123px;
		margin: 0 auto;
		padding: 2em;
		box-sizing: border-box;
		box-shadow: 0px 8px 8px -8px rgba(0, 0, 0, 0.3);

		hr {
			border: 1px solid rgba(0, 0, 0, 0.05);
		}

		.invoice-top {
			overflow: hidden;
			margin-bottom: 30px;

			.logo {
				float: left;
				height: 60px;
				width: 60px;
				box-sizing: border-box;
				border-radius: 50%;
				overflow: hidden;
				background: rgba(0, 0, 0, 0.07);
				text-align: center;

				img {
					height: 80%;
					margin-top: 10%;
				}
			}
			.info {
				display: block;
				// float:left;
				margin-left: 20px;
				margin-top: 5px;

				& > * {
					margin: 0;
				}
			}
			.title {
				// float: center;

				& > * {
					margin: 0;
				}

				p {
					text-align: center;
				}
			}
		}

		.invoice-middle {
			overflow: hidden;
			margin-top: 30px;
			margin-bottom: 30px;

			.clientlogo {
				float: left;
				height: 60px;
				width: 60px;
				box-sizing: border-box;
				border-radius: 50%;
				overflow: hidden;
				background: grey;

				img {
					width: 100%;
				}
			}

			.info {
				display: block;
				float:left;
				margin-left: 20px;
				margin-top: 5px;

				& > * {
					margin: 0;
				}
			}

			.project {
				margin-left: 52%;

				& > * {
					margin: 0;
				}
			}
		}

		.invoice-bottom {
			table {
				width: 100%;
				border-collapse: collapse;

				th {
					text-align: center;
					padding: 20px;
					padding-bottom: 5px;
					opacity: .7;

					&:first-child {
						text-align: center;
						padding-left: 0px;
						// width: 100%
					}
					&:last-child {
						padding-right: 0px;
					}
				}

				td {
					text-align: center;
					padding: 20px;
					padding-bottom: 5px;
					border-bottom: 1px solid #EEE;

					&:first-child {
						text-align: center;
						padding-left: 0px;
						// width: 100%;
					}
					&:last-child {
						padding-right: 0px;
					}
				}

				tfoot td {
					border: none;
					padding-top: 5px;
				}
			}
		}

		
	}

}


@media screen and (max-width: 768px) {
	.page-invoice {
		.invoice {
			.invoice-middle {
				.project {
					display: block;
					width: 100%;
					clear: both;
					padding: 10px 0;
					margin: 0;
				}
			}
			.invoice-bottom {
				table {
					th {
						padding: 5px;
					}

					td {
						padding: 5px;
					}
				}
			}
		}
	}
}

@media print{
	.layout-container .container .footer ,
	.layout-container .container .header ,
	.layout-container .container .horizontal-nav ,
	.layout-container .footer ,
	.layout-container .layout-picker ,
	.layout-container .vertical-nav ,
	.layout-container .header {
		display:none;
	}

	.page-report {
		.toolbar {
			display: none;
		}

		.invoice {
			box-shadow: none;
			max-width: 100%;
            max-height: 100%;
			padding: 0;
		}
	}
}
</style>
