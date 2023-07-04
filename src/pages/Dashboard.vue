<template>
	<div class="scrollable only-y">
		<!-- <div v-if="customer_type==2 && businessId==undefined && businessId==''" style="margin: 0 0 20px;">
					<button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Connect to Facebook</button>
				</div> -->
		<el-card v-loading="loadingData" v-if="showAlertMessage" align="center">
			<h2>Start messaging your customers today</h2>
			<span v-html="$t('promote.desc.whatsapp')"></span>
			<br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span>
		</el-card>
		<el-row v-else :gutter="30">
			<el-dialog :title="'Unique User Detail on '+monthOfTheSelected" :visible.sync="dialogDetailOutbound">
				 <template>
					<p align="center" v-if="outbondDetail==''">
						<img src="../assets/images/no_data@3x.png" width="250px">
					</p>
					<el-table v-else
					:data="outbondDetail"
					style="width: 100%" v-loading="loadingUniqueOutboundDetail">
					<el-table-column
						prop="to"
						label="Number">
					</el-table-column>
					<el-table-column
						prop="total"
						label="Total">
					</el-table-column>
					</el-table>
				</template>
			</el-dialog>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="page-header header-accent card-base card-shadow--medium gradient-api">
					<img class="float-image" src="../assets/images/api.svg" width="250px">
					<h2 class="no-m white-text">{{ $t("dashboard.documentation") }}</h2>
					<h4 class="o-090">{{ $t("dashboard.documentation_description") }}</h4>
					<el-button round class="accent-text mt-20" @click="goToUrl(config.documentation)">{{ $t("dashboard.documentation_button") }}</el-button>
				</div>
				<!-- <el-card v-loading="loadingData" v-if="showAlertMessage" align="center">
					<h2>Start messaging your customers today</h2>
					<span v-html="$t('promote.desc.whatsapp')"></span>
					<br/><br/>
					<span><el-button @click="mailto()">Send us e-mail</el-button></span>
				</el-card> -->
				<!-- <el-card v-if="!showAlertMessage"> -->
				<!-- <div v-if="customer_type==2 && businessId==undefined && businessId==''" style="margin: 0 0 20px;">
					<button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Connect to Facebook</button>
				</div> -->
				<error-gope-siji v-if="showAlertError" style="margin-bottom: 1em" />
				<div v-if="!showAlertError" class="page-header card-base card-shadow--medium">
					<h2 class="no-m">{{ $t("dashboard.setup") }}</h2>
					<el-row :gutter="30">
						<el-col class="mt-30" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<div class="card-base card-shadow--medium p-10" v-loading="loading.mostTemplate">
								<chart :type="donutDataTopHsm.type" :data="donutHsmData" :options="donutHsmOptions"></chart>
							</div>
						</el-col>

						<el-col class="mt-30" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<!-- <div class="card-base card-shadow--medium p-10" v-loading="loading.uniqueOutbound" @click="dialogDetail()"> -->
							<div class="card-base card-shadow--medium p-10" v-loading="loading.uniqueOutbound">
								<!-- <el-button type="primary" @click="dialogDetail()"> -->
								<chart :type="uniqueOutboundDonuts.type" :data="uniqueOutboundData" :options="uniqueOutboundOptions"></chart>
								<!-- </el-button> -->
							</div>
						</el-col>

						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="4" class="mt-20">
							<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="loading.ticket">
								<div class="widget-header ph-20 pt-20">
									<div class="flex justify-center align-center">
										<div class="widget-icon-box mr-20 animated fadeInRight">
											<i class="widget-icon mdi mdi-email-alert accent-text fs-30"></i>
											<div class="badge-box">
											</div>
										</div>
										<div class="widget-info box grow text-truncate animated fadeInLeft">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Open Ticket</div>
										</div>
									</div>
									<div class="flex justify-center align-center mb-20">
										<div class="widget-info box grow text-truncate animated fadeInLeft mr-10">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Prev Month</div>
											<h2 class="m-0 text-truncate ml-40">{{ ticketPrevMonth.open.toLocaleString('id', { minimumFractionDigits: Number.isInteger(ticketPrevMonth.open) == false ? 4 : undefined }) }}</h2>
										</div>
									</div>
								</div>
								<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#129393"] }' :data="[3, 5, 2, 3, 4, 7, 2, 8, 4, 5, 4, 6, 9, 8, 10, 6, 5, 10, 7, 4].toString()"/>
							</div>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="4" class="mt-20">
							<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="loading.ticket">
								<div class="widget-header ph-20 pt-20">
									<div class="flex justify-center align-center">
										<div class="widget-icon-box mr-20 animated fadeInRight">
											<i class="widget-icon mdi mdi-email-alert accent-text fs-30"></i>
											<div class="badge-box">
											</div>
										</div>
										<div class="widget-info box grow text-truncate animated fadeInLeft">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Open Ticket</div>
										</div>
									</div>
									<div class="flex justify-center align-center mb-20">
										<div class="widget-info box grow text-truncate animated fadeInLeft mr-10">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Current Month</div>
											<h2 class="m-0 text-truncate ml-40">{{ ticketCurrMonth.open.toLocaleString('id', { minimumFractionDigits: Number.isInteger(ticketCurrMonth.open) == false ? 4 : undefined }) }}</h2>
										</div>
									</div>
								</div>
								<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#000000"] }' :data="[3, 5, 2, 3, 4, 7, 2, 8, 4, 5, 4, 6, 9, 8, 10, 6, 5, 10, 7, 4].toString()"/>
							</div>
						</el-col>

						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="4" class="mt-20">
							<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="loading.ticket">
								<div class="widget-header ph-20 pt-20">
									<div class="flex justify-center align-center">
										<div class="widget-icon-box mr-20 animated fadeInRight">
											<i class="widget-icon mdi mdi-email-open accent-text fs-30"></i>
											<div class="badge-box">
											</div>
										</div>
										<div class="widget-info box grow text-truncate animated fadeInLeft">
										<div class="o-050 widget-title text-truncate pt-5 pb-10">Process Ticket</div>
										</div>
									</div>
									<div class="flex justify-center align-center mb-20">
										<div class="widget-info box grow text-truncate animated fadeInLeft mr-10">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Previous Month</div>
											<h2 class="m-0 text-truncate ml-40">{{ ticketPrevMonth.process.toLocaleString('id', { minimumFractionDigits: Number.isInteger(ticketPrevMonth.process) == false ? 4 : undefined }) }}</h2>
										</div>
									</div>
								</div>
								<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#129393"] }' :data="[3, 5, 2, 3, 4, 7, 2, 8, 4, 5, 4, 6, 9, 8, 10, 6, 5, 10, 7, 4].toString()"/>
							</div>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="4" class="mt-20">
							<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="loading.ticket">
								<div class="widget-header ph-20 pt-20">
									<div class="flex justify-center align-center">
										<div class="widget-icon-box mr-20 animated fadeInRight">
											<i class="widget-icon mdi mdi-email-open accent-text fs-30"></i>
											<div class="badge-box">
											</div>
										</div>
										<div class="widget-info box grow text-truncate animated fadeInLeft">
										<div class="o-050 widget-title text-truncate pt-5 pb-10">Process Ticket</div>
										</div>
									</div>
									<div class="flex justify-center align-center mb-20">
										<div class="widget-info box grow text-truncate animated fadeInLeft mr-10">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Current Month</div>
											<h2 class="m-0 text-truncate ml-40">{{ ticketCurrMonth.process.toLocaleString('id', { minimumFractionDigits: Number.isInteger(ticketCurrMonth.process) == false ? 4 : undefined }) }}</h2>
										</div>
									</div>
								</div>
								<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#000000"] }' :data="[3, 5, 2, 3, 4, 7, 2, 8, 4, 5, 4, 6, 9, 8, 10, 6, 5, 10, 7, 4].toString()"/>
							</div>
						</el-col>

						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="4" class="mt-20">
							<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="loading.ticket">
								<div class="widget-header ph-20 pt-20">
									<div class="flex justify-center align-center">
										<div class="widget-icon-box mr-20 animated fadeInRight">
											<i class="widget-icon mdi mdi-email-secure accent-text fs-30"></i>
											<div class="badge-box">
											</div>
										</div>
										<div class="widget-info box grow text-truncate animated fadeInLeft">
										<div class="o-050 widget-title text-truncate pt-5 pb-10">Closed Ticket</div>
										</div>
									</div>
									<div class="flex justify-center align-center mb-20">
										<div class="widget-info box grow text-truncate animated fadeInLeft mr-10">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Previous Month</div>
											<h2 class="m-0 text-truncate ml-40">{{ ticketPrevMonth.close.toLocaleString('id', { minimumFractionDigits: Number.isInteger(ticketPrevMonth.close) == false ? 4 : undefined }) }}</h2>
										</div>
									</div>
								</div>
								<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#129393"] }' :data="[3, 5, 2, 3, 4, 7, 2, 8, 4, 5, 4, 6, 9, 8, 10, 6, 5, 10, 7, 4].toString()"/>
							</div>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="4" class="mt-20">
							<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="loading.ticket">
								<div class="widget-header ph-20 pt-20">
									<div class="flex justify-center align-center">
										<div class="widget-icon-box mr-20 animated fadeInRight">
											<i class="widget-icon mdi mdi-email-secure accent-text fs-30"></i>
											<div class="badge-box">
											</div>
										</div>
										<div class="widget-info box grow text-truncate animated fadeInLeft">
										<div class="o-050 widget-title text-truncate pt-5 pb-10">Closed Ticket</div>
										</div>
									</div>
									<div class="flex justify-center align-center mb-20">
										<div class="widget-info box grow text-truncate animated fadeInLeft mr-10">
											<div class="o-050 widget-title text-truncate pt-5 pb-10">Current Month</div>
											<h2 class="m-0 text-truncate ml-40">{{ ticketCurrMonth.close.toLocaleString('id', { minimumFractionDigits: Number.isInteger(ticketCurrMonth.close) == false ? 4 : undefined }) }}</h2>
										</div>
									</div>
								</div>
								<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#000000"] }' :data="[3, 5, 2, 3, 4, 7, 2, 8, 4, 5, 4, 6, 9, 8, 10, 6, 5, 10, 7, 4].toString()"/>
							</div>
						</el-col>

						<el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<div class="card-base bg-accent card-shadow--medium p-10" v-loading="loading.overview">
									<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Total Notification</h3>
									<div class="chart" v-echarts="chartOptionNotification"></div>
								</div>
						</el-col>
						<el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<div class="card-base bg-accent card-shadow--medium p-10" v-loading="loading.overview">
									<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Total Outbond</h3>
									<div class="chart" v-echarts="chartOptionOutbond"></div>
								</div>
						</el-col>
					</el-row>
				</div>
				<!-- </el-card> -->
			</el-col>
		</el-row>
	</div>
</template>

<script>
import config from '../config'
import api from '@/networkClient'
import moment from 'moment'
import _ from 'lodash'
import V_Echarts from '../directives/echarts';
import Chart from 'vue-bulma-chartjs'
import ChartLabel from 'chartjs-plugin-labels'
import store from '@/store'

export default {
	name: 'Dashboard',
	directives: {
        'echarts': V_Echarts
	},
	components: {
		Chart,
		ChartLabel
  	},
	data () {
		return {
			businessId: '',
			customer_type: store.getters.customer_type,
			asyncComponent: 'peity',
			monthOfTheSelected: '',
			dialogDetailOutbound: false,
			loadingUniqueOutboundDetail: false,
			user: store.getters.userID,
			startDate: '',
			endDate: '',
			outbondDetail: [],
			resized: false,
			config:config,
			loadingWA: true,
			loading: {
				// billing: true,
				ticket: true,
				overview: true,
				mostTemplate: true,
				uniqueUser: true,
				uniqueOutbound: false
			},
			showAlertMessage: false,
			showAlertError: false,
			loadingTable: true,
			isLoading: true,
			totalWA: 0,
			totalBill: 0,
			loadingContact: true,
			totalContact: 0,
			selectedPhoneNumber: '',
            companyPhone: '',
            monthName: moment().format('MMMM'),
			prevMonth: moment().subtract(1, 'months').format("YYYY-MM"),
			currentMonth: moment().format("YYYY-MM"),
			prevMonthTicket: `${moment().subtract(1, 'months').format('YYYY-MM')}-01 00:00:00`,
			currentMonthTicket: `${moment().format('YYYY-MM')}-01 00:00:00`,
			ticketPrevMonth: {
				open: 0,
				process: 0,
				close: 0
			},
			ticketCurrMonth: {
				open: 0,
				process: 0,
				close: 0
			},
			thisMonth: {
				tanggal: [0],
				textTotal: [0],
				image: {
					total: [0]
				},
				hsm: {
					total: [0]
				},
				document: {
					total: [0]
				},
				audio: {
					total: [0]
				},
				outbond: {
					total: [0]
				}
			},
			previousMonth: {
				tanggal: [0],	
				textTotal: [0],
				image: {
					total: [0]
				},
				hsm: {
					total: [0]
				},
				document: {
					total: [0]
				},
				audio: {
					total: [0]
				},
				outbond: {
					total: [0]
				}
			},
			chartOptionNotification: {
                // backgroundColor: "#FFF",
                areaColor: "#FFF",
                grid: {
					show: false,
					left: '20px',
					right: '50px',
					bottom: '20px',
					top: '20px',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					show: false,
					data: ['line', 'bar'],
					textStyle: {
						color: '#ccc'
					}
				},
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : [0],
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
						type: 'value',
                        splitLine: {show: false},
						axisLine: {
							lineStyle: {
								color: 'rgba(255,255,255,0.5)'
							}
						}
                    }
                ],
                series : [
                    {
                        name:'Total Notification Previous Month',
						type:'line',						
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff', 
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					},
					{
                        name:'Total Notification This Month',
						type:'line',						
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#f98643'
						},
						itemStyle: {
							color: '#f98643', 
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					}
                ]
			},
			chartOptionOutbond: {
                // backgroundColor: "#FFF",
                areaColor: "#FFF",
                grid: {
					show: false,
					left: '20px',
					right: '50px',
					bottom: '20px',
					top: '20px',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					show: false,
					data: ['line', 'bar'],
					textStyle: {
						color: '#ccc'
					}
				},
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : [0],
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
						type: 'value',
                        splitLine: {show: false},
						axisLine: {
							lineStyle: {
								color: 'rgba(255,255,255,0.5)'
							}
						}
                    }
                ],
                series : [
                    {
                        name:'Total Outbond Previous Month',
						type:'line',						
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff', 
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					},
					{
                        name:'Total Outbond This Month',
						type:'line',						
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#f98643'
						},
						itemStyle: {
							color: '#f98643', 
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					}
                ]
			},
			donutHsmData: {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: [
						'#4aa0f1',
						'#249393',
						'#bb4c3f',
						'#ed6c63',
						'#97cd76',
						'#ff8a65',
						'#964af1',
						'#5d4037',
						'#00796b',
						'#827717',
						'#7986cb',
						'#7f8c8d' 
					]
				}]
				
			},
			donutHsmOptions: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					position: 'left',
				},
				title: {
					display: true,
					text: 'Most Used Template This Month'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',
				
						// font size, default is defaultFontSize
						fontSize: 12,
				
						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#ffff',
				
						// font style, default is defaultFontStyle
						fontStyle: 'normal',
				
						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				
						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				}
			},
			donutDataTopHsm: {
				labels: [],
				data: [],
				type: 'pie'
			},
			donutUniqueData: {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: [
						'#4aa0f1',
						'#249393',
						'#bb4c3f',
						'#ed6c63',
						'#97cd76',
						'#ff8a65',
						'#964af1',
						'#5d4037',
						'#00796b',
						'#827717',
						'#7986cb'
					]
				}]
				
			},
			donutUniqueOptions: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					position: 'left',
					orient: 'vertical',
                    x: 'left'
				},
				title: {
					display: true,
					text: 'Total Unique User'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',
				
						// font size, default is defaultFontSize
						fontSize: 12,
				
						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#fff',
				
						// font style, default is defaultFontStyle
						fontStyle: 'normal',
				
						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				
						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				}
			},
			donutDataUnique: {
				labels: [],
				data: [],
				type: 'pie',
				labelLine: {
					normal: {
						show: true
					}
				},
				selectedMode: 'single',
				radius: [0, '30%'],
			},
			uniqueOutboundDonuts: {
				labels: [],
				data: [],
				type: 'pie',
				labelLine: {
					normal: {
						show: true
					}
				},
				selectedMode: 'single',
				// radius: [0, '30%']
				radius: ['50%', '70%'],
			},
			uniqueOutboundData: {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: [
						'#4aa0f2',
						'#249393',
						'#bb4c3f',
						'#ed6c63',
						'#97cd76',
						'#ff8a65',
						'#5d4037',
						'#00796b',
						'#827717',
						'#7986cb',
						'#964af1'
					]
				}],
			},
			uniqueOutboundOptions: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					onClick: function(event){
						// console.log(event)
					},
					display: true,
					// onClick:function(event, item){
					// 	console.log(this.dialogDetailOutbound)
					// },
					position: 'left',
					orient: 'vertical',
                    x: 'left'
				},
				title: {
					display: true,
					text: 'Total Unique User',
				},
				animation: {
					// onClick:function(event, item){
					// 	console.log(this.dialogDetailOutbound)
					// },
					animateScale: true,
					animateRotate: true,
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',
				
						// font size, default is defaultFontSize
						fontSize: 12,
				
						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#fff',
				
						// font style, default is defaultFontStyle
						fontStyle: 'normal',
				
						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				
						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				}
			}
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	methods: {
		dialogDetail(){
            this.dialogDetailOutbound = true
		},
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
		async overview_contact(){
			await api({
				method: 'get',
				url: 'phonebook/all',
			}).then(result => {								
				let datas = result.data				
				this.totalContact =datas.numRows
			}).catch(error => {
				// this.tokenLoader = false
			})
			this.loadingContact = false			
		},
		async wa_detail(){
			await api({
				method: 'post',
				url: 'user/detail/number',
				data: {
					channels: "whatsapp"
				}
			}).then(result => {
				this.companyPhone = result.data.data
				this.selectedPhoneNumber = this.companyPhone[0]
			}).catch(error => {
				// this.tokenLoader = false
			})
			// this.loadingData = false
		},
		async wa_billing_previous_month() {
			await api({
				method: 'post',
				url: 'user/overview',
				data: {
					months: this.prevMonth,
					with_date: true,
					number: this.selectedPhoneNumber
				}
			}).then(result => {
				this.loadingData =  false
				if(result.data.ec == 200){
					this.showAlertError = false
					let datas = result.data.data

					let tempTanggalPrev = new Array()
					let tempTextPrev = {total: new Array()}
					let tempImagePrev = {total: new Array()}
					let tempHSMPrev = {total: new Array()}
					let tempDocPrev = {total: new Array()}
					let tempAudioPrev = {total: new Array()}
					let tempOutbondPrev = {total: new Array()}
					let priceWhatsappPrev = new Array()
					
					_.forOwn(datas, (value, key) => {
						let tgl = moment(key).format("YYYY-MM-DD")
						tempTanggalPrev.push(tgl)
						// Text
						let dt = value.text.delivered + value.text.read + value.text.sent
						let ft = value.text.failed + value.text.invalid
						tempTextPrev.total.push(dt+ft)

						// Image
						let di = value.image.delivered + value.image.read + value.image.sent
						let fi = value.image.failed + value.image.invalid
						tempImagePrev.total.push(di+fi)

						// HSM
						let dh = value.hsm.delivered + value.hsm.read + value.hsm.sent
						let fh = value.hsm.failed + value.hsm.invalid
						tempHSMPrev.total.push(dh+fh)

						// Document
						let dd = value.document.delivered + value.document.read + value.document.sent
						let fd = value.document.failed + value.document.invalid
						tempDocPrev.total.push(dd+fd)

						// Audio
						let da = value.audio.delivered + value.audio.read + value.audio.sent
						let fa = value.audio.failed + value.audio.invalid
						tempAudioPrev.total.push(da+fa)

						let dout = dt + di + dd + da
						let fout = ft + fi + fd + fa
						tempOutbondPrev.total.push(dout + fout)
					})							
					this.previousMonth.tanggal = tempTanggalPrev
					this.previousMonth.textTotal = tempTextPrev.total
					
					this.previousMonth.image = tempImagePrev
					this.previousMonth.hsm = tempHSMPrev
					this.previousMonth.document = tempDocPrev
					this.previousMonth.audio = tempAudioPrev
					this.previousMonth.outbond = tempOutbondPrev
				} else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
				} else if(result.data.ec == 500){
					this.showAlertError = true
				}
				
			}).catch(error => {
				this.loadingData =  false
				this.showAlertError = true
			})
				this.isLoading = false
		},
		async wa_billing_current_month(){
			await api({
				method: 'post',
				url: 'user/overview',
				data: {
					months: this.currentMonth,
					with_date: true,
					number: this.selectedPhoneNumber
				}
			}).then(result => {
				this.loadingData =  false
				if(result.data.ec == 200){
					this.showAlertError = false
					let datas = result.data.data
					// console.log(datas);

					let tempTanggal = new Array()
					let tempText = {total: new Array()}
					let tempImage = {total: new Array()}
					let tempHSM = {total: new Array()}
					let tempDoc = {total: new Array()}
					let tempAudio = {total: new Array()}
					let tempOutbond = {total: new Array()}
					let priceWhatsapp = new Array()
					
					_.forOwn(datas, (value, key) => {
						let tgl = moment(key).format("YYYY-MM-DD")
						tempTanggal.push(tgl)
						// Text
						let dt = value.text.delivered + value.text.read + value.text.sent
						let ft = value.text.failed + value.text.invalid
						tempText.total.push(dt+ft)

						// Image
						let di = value.image.delivered + value.image.read + value.image.sent
						let fi = value.image.failed + value.image.invalid
						tempImage.total.push(di+fi)

						// HSM
						let dh = value.hsm.delivered + value.hsm.read + value.hsm.sent
						let fh = value.hsm.failed + value.hsm.invalid
						tempHSM.total.push(dh+fh)

						// Document
						let dd = value.document.delivered + value.document.read + value.document.sent
						let fd = value.document.failed + value.document.invalid
						tempDoc.total.push(dd+fd)

						// Audio
						let da = value.audio.delivered + value.audio.read + value.audio.sent
						let fa = value.audio.failed + value.audio.invalid
						tempAudio.total.push(da+fa)

						let dout = dt + di + dd + da
						let fout = ft + fi + fd + fa
						tempOutbond.total.push(dout + fout)
					})							
					this.thisMonth.tanggal = tempTanggal
					this.thisMonth.textTotal = tempText.total
					
					this.thisMonth.image = tempImage
					this.thisMonth.hsm = tempHSM
					this.thisMonth.document = tempDoc
					this.thisMonth.audio = tempAudio
					this.thisMonth.outbond = tempOutbond
				} else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
				} else if(result.data.ec == 500){
					this.showAlertError = true
				}
				
			}).catch(error => {
				this.loadingData =  false
				// this.tokenLoader = false
				this.showAlertError = true
			})

		},
		renderChart(){
			// creat a fresh object with properties from the original object
			var newChartOptionNotification = Object.assign({}, this.chartOptionNotification);
			var newChartOptionOutbond = Object.assign({}, this.chartOptionOutbond);
			// modify properties of the new object
			newChartOptionNotification.xAxis[0].data = this.thisMonth.tanggal
			newChartOptionNotification.series[0].data = this.previousMonth.hsm.total
			newChartOptionNotification.series[1].data = this.thisMonth.hsm.total

			newChartOptionOutbond.xAxis[0].data = this.thisMonth.tanggal
			newChartOptionOutbond.series[0].data = this.previousMonth.outbond.total
			newChartOptionOutbond.series[1].data = this.thisMonth.outbond.total

			this.chartOptionNotification = newChartOptionNotification;
			this.chartOptionOutbond = newChartOptionOutbond;

			this.isLoading = false
		},

		async getTicketPreviousMonth(){
			await api({
				method: 'post',
				url: 'user/ticket',
				data: {
					month: this.prevMonthTicket
				}
			})
			.then(result => {
				let ticket = result.data.data
				// console.log('result',result.data.ec)
				if(result.data.ec == 200) {
					this.ticketPrevMonth.open = ticket.open,
					this.ticketPrevMonth.process = ticket.onproccess,
					this.ticketPrevMonth.close = ticket.close		
				}
				
			})
			.catch(error => {
				// console.log(error)
			})			
		},

		async getTicketCurrentMonth(){
			await api({
				method: 'post',
				url: 'user/ticket',
				data: {
					month: this.currentMonthTicket
				}
			})
			.then(result => {
				let ticket = result.data.data
				if(result.data.ec == 200) {
					this.ticketCurrMonth.open = ticket.open,
					this.ticketCurrMonth.process = ticket.onproccess,
					this.ticketCurrMonth.close = ticket.close		
				}
			})
			.catch(error => {
				// console.log(error)
			})			
		},

		async getTopHsm(){
			this.loading.mostTemplate = true
			await api({
				method: 'post',
				url: 'user/top-hsm'
			})
			.then(result => {
				let data = result.data.data
				
				let labelsArr = []
				let dataArr = []

				_.forEach(data, d => {
					labelsArr.push(d.name.replace("hsm:", "").replace("hsm_group:", ""))
					dataArr.push(d.total)
				})

				this.donutDataTopHsm.labels = labelsArr
				this.donutDataTopHsm.data = dataArr

			})
			.catch(error => {
				// console.log(error)
			})
			this.renderDoughnutTopHsm()
			this.loading.mostTemplate = false
		},

		renderDoughnutTopHsm() {

			var donutHsmData = Object.assign({}, this.donutHsmData)
			donutHsmData.labels = this.donutDataTopHsm.labels
			donutHsmData.datasets[0].data = this.donutDataTopHsm.data
			this.donutHsmData = donutHsmData

			this.donutDataTopHsm.type = 'doughnut'
			this.isLoading = false
		},
		
		async getUniqueUser(){
			this.loading.uniqueUser = true
			await api({
				method: 'post',
				url: 'user/unique-user'
			})
			.then(result => {
				let data = result.data.data

				let labelsArr = []
				let dataArr = []

				_.forEach(data, d => {
					// console.log(d.totalUnique)
					let month = moment(d.Month).format('MMMM')
					// console.log(month)
					labelsArr.push(month)	
					dataArr.push(d.totalUnique)
				})

				this.donutDataUnique.labels = labelsArr
				this.donutDataUnique.data = dataArr

			})
			.catch(error => {
				// console.log(error)
			})
			this.renderDoughnutUniqueUser()
			this.loading.uniqueUser = false
		},

		renderDoughnutUniqueUser() {

			var donutUniqueData = Object.assign({}, this.donutUniqueData)
			donutUniqueData.labels = this.donutDataUnique.labels
			donutUniqueData.datasets[0].data = this.donutDataUnique.data
			this.donutUniqueData = donutUniqueData

			this.donutDataUnique.type = 'doughnut'
			this.isLoading = false
		},

		renderDoughnutUniqueOutbound() {
			var self = this
			var uniqueOutboundData = Object.assign({}, this.uniqueOutboundData)
			uniqueOutboundData.labels = this.uniqueOutboundDonuts.labels
			uniqueOutboundData.datasets[0].data = this.uniqueOutboundDonuts.data
			this.uniqueOutboundData = uniqueOutboundData
			this.uniqueOutboundOptions.onClick = function(event, item){
				let month = item[0]._view.label
				let sd = month.substring(0,3)
				// console.log(month)
				self.monthOfTheSelected = month
				sd = moment().month(sd).format("YYYY-MM-DD")
				let csd = moment(sd).startOf('month').format('YYYY-MM-DD')
				let ced = moment(sd).endOf('month').format('YYYY-MM-DD')

				self.uniqueOutboundDetail(csd,ced)

				self.dialogDetailOutbound = true
			}

			this.uniqueOutboundDonuts.type = 'doughnut'
			this.isLoading = false
		},
		
		goToUrl(url) {
			let win = window.open(url, '_blank');
			win.focus();
			
		},

		async fetchTicket(){
			this.loading.ticket = true
			await this.getTicketPreviousMonth()
			await this.getTicketCurrentMonth()
			this.loading.ticket = false
		},

		async fetchOverview(){
			this.loading.overview = true
			await this.wa_billing_previous_month()
			await this.wa_billing_current_month()
			await this.renderChart()
			this.loading.overview = false
		},

		async uniqueOutbound(){
			this.loading.uniqueOutbound = true
			await api({
				method: 'get',
				url: 'uniqueOutbound'
			}).then(result => {
				this.loadingData =  false
				this.isLoading = false

				let data = result.data.data
				let labelsArr = []
				let dataArr = []

				_.forEach(data, d => {
					let month = moment(d.month).format('MMMM')
					labelsArr.push(month)
					dataArr.push(d.total)
				})

				this.uniqueOutboundDonuts.labels = labelsArr
				this.uniqueOutboundDonuts.data = dataArr
			}).catch(error => {
				this.loadingData =  false
				this.showAlertError = true
				this.showFormMessage = false
			})
			this.renderDoughnutUniqueOutbound()
			this.loading.uniqueOutbound = false
		},

		uniqueOutboundDetail(csd,ced){
			this.loadingUniqueOutboundDetail = true
			api({
				method: 'get',
				url: 'uniqueOutbound/detail',
				params: {
					user: this.user,
					startDate: csd,
					endDate: ced
				}
			}).then(result => {
				this.outbondDetail = result.data.data.result.data
				this.loadingUniqueOutboundDetail = false
				// console.log(this.outbondDetail)
			}).catch(error => {
				this.$message({
					showClose: true,
					message: 'Cannot get unique user detail',
					type: 'error'
				});
			})
		},
	},
	async mounted(){
		// this.overview_wa()
		this.customer_type
		this.checkBusinessId()
		await this.wa_detail()
		this.fetchOverview()
		this.fetchTicket()
		this.getTopHsm()
		this.getUniqueUser()
		this.uniqueOutbound()
	}
}
</script>

<style lang="scss" scoped>
.chart {
     width: 100%;
     height: 400px;
 }
.float-image {
	float:right;
	z-index: 1;
	bottom: 10px;
	left: 10px;
}
.gradient-api {
	background:#249393;
	background: linear-gradient(260deg, #4ac5c5, #249393);
	}
.no-shadow {
	text-shadow: none;
}
.white-text {
	color: white;
}
.page-header {
	margin-bottom: 30px;
}
</style>

<style lang="scss">

.page-dashboard {
	.widget {
		.peity {
			position: absolute;
			bottom: -1px;
			left: 0;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	table.styled {
		.peity {
			margin-right: 10px;
		}
	}

	.vb-content {
		padding: 0 20px;
		box-sizing: border-box !important;
		margin-top: -5px;
		margin-left: -20px;
		margin-right: -20px;
		height: calc(100% + 15px) !important;
		width: calc(100% + 40px) !important;
	}
}

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
}
</style>


