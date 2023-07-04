<template>
    <el-row :gutter="10" class="scrollable only-y" v-loading="loadingData">
		<div class="page-header">
			<h1>{{ $t("whatsapp.whatsapp") }} Overview</h1>
		</div>

		<el-card v-loading="loadingData" v-if="showAlertMessage" align="center">
			<h2>Start messaging your customers today</h2>
			<span v-html="$t('promote.desc.whatsapp')"></span>
			<br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span>
			<div v-if="customer_type==2 && businessId==undefined || businessId==''" style="margin: 0 0 20px;">
				<button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px; margin-top: 20px;">Connect to Facebook</button>
			</div>
		</el-card>
		<el-card v-if="!showAlertMessage">
			<el-select v-model="currentMonth" placeholder="Select Month" style="width:150px">
				<el-option
				v-for="item in optionsMonths"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
			&nbsp;
			<el-select v-model="selectedPhoneNumber" placeholder="Select Phone Number" :default-first-option="true" style="width:200px">
				<el-option
				v-for="item in companyPhone"
				:key="item"
				:label="item"
				:value="item">
				</el-option>
			</el-select>
			&nbsp;
			<el-button @click="changeFilter" type="primary" :loading="isLoading"><i class="mdi mdi-filter"/> Filter</el-button>
			<br/><br/>
			<error-gope-siji v-if="showAlertError" style="margin-bottom: 1em" />
			<el-col v-if="showFormMessage" class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<!-- <el-card>
						<h2 class="mt-0">{{ $t("overview.whatsapp") }}</h2>
						<div class="chart" v-echarts="chartOption"></div>
				</el-card> -->
					<!-- <div class="card-base bg-accent p-10" style="height: 50px;">
						<h2 class="white-text mv-0 mt-5 animated fadeInDown">Whatsapp Overview</h2>
					</div> -->
					<div class="card-base bg-accent card-shadow--medium p-10" v-loading="isLoading">
						<h2 class="white-text mv-0 mt-5 animated fadeInDown">Whatsapp Overview</h2>
						<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Total Sent Message</h3>
						<div class="chart" v-echarts="chartOption"></div>
					</div>
					<br>
					<div class="card-base bg-accent card-shadow--medium p-10" v-loading="isLoading">
						<h2 class="white-text mv-0 mt-5 animated fadeInDown">Whatsapp Overview</h2>
						<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Delivered Message</h3>
						<div class="chart" v-echarts="chartOption1"></div>
					</div>
					<br>
					<div class="card-base bg-accent card-shadow--medium p-10" v-loading="isLoading">
						<h2 class="white-text mv-0 mt-5 animated fadeInDown">Whatsapp Overview</h2>
						<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Failed Message</h3>
						<div class="chart" v-echarts="chartOption2"></div>
					</div>
			</el-col>
		</el-card>
    </el-row>
</template>

<script>
import api from '@/networkClient'
import config from '@/config'
import moment from 'moment'
import _ from 'lodash'
import V_Echarts from '../../directives/echarts';
import store from '@/store'

export default {
	name: 'Overview',
	component: {
		
	},
    directives: {
        'echarts': V_Echarts
    },
    data() {
        return {
			businessId: '',
			customer_type: store.getters.customer_type,
			optionsMonths: [],
			selectedPhoneNumber: '',
			loadingData: true,
            clientName: '',
            companyName: '',
            companyPhone: '',
			totalWA: 0,
			showFormMessage: false,
			showAlertMessage: false,
			showAlertError: false,
			today: moment().format('DD MMM YYYY'),
			tanggal: [0],
			textSuccess: [0],
			textFail: [0],
			textTotal: [0],
			image: {
				success: [0],
				fail: [0],
				total: [0]
			},
			hsm: {
				success: [0],
				fail: [0],
				total: [0]
			},
			document: {
				success: [0],
				fail: [0],
				total: [0]
			},
			audio: {
				success: [0],
				fail: [0],
				total: [0]
			},
			outbond: {
				success: [0],
				fail: [0],
				total: [0]
			},
			billWhatsapp: {},
			isLoading: true,
			waServAlias: {
				text: "Whatsapp Regular Text",
				hsm: "Whatsapp Template Text",
				image: "Whatsapp Image",
				document: "Whatsapp Document",
				audio: "Whatsapp Audio"
			},
			totalBill: 0,
			loadingTable: true,
			currentMonth: moment().format("YYYY-MM"),
            chartOption: {
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
                        name:'Total Outbond Message',
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
                        name:'Total Notification Message',
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
			chartOption1: {
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
                        name:'Delivered Outbond Message',
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
                        name:'Delivered Notification Message',
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
			chartOption2: {
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
                        name:'Failed Outbond Message',
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
                        name:'Failed Notification Message',
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
			}		
        }
    },
	methods: {
		async changeFilter(){
			await this.wa_billing()
			// console.log("this tanggal: ", this.selectedPhoneNumber)
			this.renderChart()
		},
		mailto(){
			location.href='mailto: business.solution@damcorp.id'
		},
		print() {
			window.print()
		},
		async wa_billing(){
			this.isLoading = true
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
				this.isLoading = false
				if(result.data.ec == 200){
					this.showAlertError = false
					this.showFormMessage = true
					let datas = result.data.data
					// console.log(datas);

					let tempTanggal = new Array()
					let tempText = {success: new Array(), fail: new Array(), total: new Array()}
					let tempImage = {success: new Array(), fail: new Array(), total: new Array()}
					let tempHSM = {success: new Array(), fail: new Array(), total: new Array()}
					let tempDoc = {success: new Array(), fail: new Array(), total: new Array()}
					let tempAudio = {success: new Array(), fail: new Array(), total: new Array()}
					let tempOutbond = {success: new Array(), fail: new Array(), total: new Array()}
					let priceWhatsapp = new Array()
					
					_.forOwn(datas, (value, key) => {
						let tgl = moment(key).format("YYYY-MM-DD")
						tempTanggal.push(tgl)
						// Text
						let dt = value.text.delivered + value.text.read + value.text.sent
						let ft = value.text.failed + value.text.invalid
						tempText.success.push(dt)
						tempText.total.push(dt+ft)
						tempText.fail.push(ft)

						// Image
						let di = value.image.delivered + value.image.read + value.image.sent
						let fi = value.image.failed + value.image.invalid
						tempImage.success.push(di)
						tempImage.fail.push(fi)
						tempImage.total.push(di+fi)

						// HSM
						let dh = value.hsm.delivered + value.hsm.read + value.hsm.sent
						let fh = value.hsm.failed + value.hsm.invalid
						tempHSM.success.push(dh)
						tempHSM.fail.push(fh)
						tempHSM.total.push(dh+fh)

						// Document
						let dd = value.document.delivered + value.document.read + value.document.sent
						let fd = value.document.failed + value.document.invalid
						tempDoc.success.push(dd)
						tempDoc.fail.push(fd)
						tempDoc.total.push(dd+fd)

						// Audio
						let da = value.audio.delivered + value.audio.read + value.audio.sent
						let fa = value.audio.failed + value.audio.invalid
						tempAudio.success.push(da)
						tempAudio.fail.push(fa)
						tempAudio.total.push(da+fa)

						let dout = dt + di + dd + da
						let fout = ft + fi + fd + fa
						tempOutbond.success.push(dout)
						tempOutbond.fail.push(fout)
						tempOutbond.total.push(dout + fout)
					})							
					this.tanggal = tempTanggal
					this.textSuccess = tempText.success
					this.textFail = tempText.fail
					this.textTotal = tempText.total
					
					this.image = tempImage
					this.hsm = tempHSM
					this.document = tempDoc
					this.audio = tempAudio
					this.outbond = tempOutbond
				} else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
					this.showFormMessage = false
				} else if(result.data.ec == 500){
					this.showAlertError = true
					this.showFormMessage = false
				}
				
			}).catch(error => {
				this.loadingData =  false
				// this.tokenLoader = false
				this.showAlertError = true
				this.showFormMessage = false
			})
			this.isLoading = false
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
		renderChart(){
			// var this = this;
			// console.log("this tanggal: ", this.tanggal)
			// creat a fresh object with properties from the original object
			var newChartOption = Object.assign({}, this.chartOption);
			var newChartOption1 = Object.assign({}, this.chartOption1);
			var newChartOption2 = Object.assign({}, this.chartOption2);

			// modify properties of the new object
			newChartOption.xAxis[0].data = this.tanggal
			newChartOption.series[0].data = this.outbond.total
			newChartOption.series[1].data = this.hsm.total

			newChartOption1.xAxis[0].data = this.tanggal
			newChartOption1.series[0].data = this.outbond.success
			// newChartOption1.series[1].data = this.image.success
			newChartOption1.series[1].data = this.hsm.success
			// newChartOption1.series[3].data = this.document.success
			// newChartOption1.series[4].data = this.audio.success

			newChartOption2.xAxis[0].data = this.tanggal
			newChartOption2.series[0].data = this.outbond.fail
			// newChartOption2.series[1].data = this.image.fail
			newChartOption2.series[1].data = this.hsm.fail
			// newChartOption2.series[3].data = this.document.fail
			// newChartOption2.series[4].data = this.audio.fail

			this.chartOption = newChartOption;
			this.chartOption1 = newChartOption1
			this.chartOption2 = newChartOption2;
		}
	},
    async beforeMount(){		
		this.loadingTable = false
		for(let i = 6; i >= 0; i--){
			// console.log("a", moment().subtract(i, 'month').format("MM YYYY"))
			this.optionsMonths.push({
				value: moment().subtract(i, 'month').format("YYYY-MM"),
				label: moment().subtract(i, 'month').format("MMM YYYY")
			}) 
		}
    },
    async mounted(){
		await this.wa_detail()
		await this.wa_billing()
		await this.renderChart()
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';
.chart {
     width: 100%;
     height: 400px;
 }
.page-invoice {
	.toolbar {
		max-width: 794px;
		margin: 0 auto;
		text-align: right;
		margin-bottom: 20px;
	}

	.invoice {
		background: white;
		width: 100%;
		max-width: 794px;
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
				float:left;
				margin-left: 20px;
				margin-top: 5px;

				& > * {
					margin: 0;
				}
			}
			.title {
				float: right;

				& > * {
					margin: 0;
				}

				p {
					text-align: right;
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
					text-align: right;
					padding: 20px;
					padding-bottom: 5px;
					opacity: .7;
					
					&:first-child {
						text-align: left;
						padding-left: 0px;
						// width: 100%
					}
					&:last-child {
						padding-right: 0px;
					}
				}

				td {
					text-align: right;
					padding: 20px;
					padding-bottom: 5px;
					border-bottom: 1px solid #EEE;

					&:first-child {
						text-align: left;
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

		h1 { font-size: 1.5em; color: #222; }
		h2 { font-size: .9em; }
		h3 { font-size: 1.2em; font-weight: 300; line-height: 2em; }
		p  { font-size: .7em; color: #666; line-height: 1.2em; }
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

	.page-invoice {
		.toolbar {
			display: none;
		}

		.invoice {
			box-shadow: none;
			max-width: 100%;
			padding: 0;
		}
	}
}
</style>

