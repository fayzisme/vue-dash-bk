<template>
	<div class="page-report scrollable only-y" v-loading="loadingPage">
		<div class="page-header">
			<h1>{{ $t("helpdesk.helpdesk") }} Report</h1>
		</div>
		<el-card v-if="pageNotAllowed" align="center">
			<h2 align="center">Start messaging your customers today</h2>
			<!-- <br/><br/> -->
			<p v-html="$t('promote.desc.whatsapp')"></p>
			<br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span>
		</el-card>
		<el-form :inline="true" v-if="!pageNotAllowed && !showAlertError">
			<el-form-item>
				<el-date-picker v-model="startEndDate" type="daterange" format="yyyy/MM/dd" @change="getReport()" />
			</el-form-item>
			<el-form-item>
				<el-button class="animated fadeInRight" type="primary" @click="download"><i class="mdi mdi-download"></i> Download</el-button>	
			</el-form-item>
		</el-form>
        <el-card class="invoice" v-loading="loadingPage" v-if="!pageNotAllowed && !showAlertError">
			<div class="invoice-top">
				<div class="title" align="center">
					<h2>Report</h2>
                    <p style="font-weight: bold; font-size: 14px">"CS - Customer Service" (Platform by DAMCorp)<br>Whatsapp Business API</p>
				</div>
			</div>
            <div>
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
				<el-table :data="ticketList" style="width: 100%; color: #000 !important" v-loading="loadingPage" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(246, 246, 245, 0.8)">
					<el-table-column fixed prop="ticketCode" label="Ticket" min-width="120"></el-table-column>
					<el-table-column prop="dateCreate" label="Start Time" min-width="180">
						<template slot-scope="scope">
							{{formatDate(scope.row.dateCreate, "YYYY-MM-DD, HH:mm")}}
						</template>
					</el-table-column>
					<el-table-column prop="dateClose" label="End Time" min-width="180">
						<template slot-scope="scope">
							{{ scope.row.dateClose == "-" ? "-" : formatDate(scope.row.dateClose, "YYYY-MM-DD, HH:mm")}}
						</template>
					</el-table-column>
					<el-table-column prop="chatDuration" label="Duration" min-width="250"></el-table-column>
					<el-table-column prop="customerNumber" label="Customer Contact" min-width="300"></el-table-column>
					<el-table-column prop="customerName" label="Customer Name" min-width="200"></el-table-column>
					<el-table-column prop="channel" label="Channel" min-width="150"></el-table-column>
					<el-table-column prop="operatorName" label="Operator Name" min-width="200"></el-table-column>
					<el-table-column prop="firstOperatorResponse" label="First Response Date" min-width="200">
						<template slot-scope="scope">
							{{ scope.row.firstOperatorResponse ? formatDate(scope.row.firstOperatorResponse, "YYYY-MM-DD, HH:mm") : "-" }}
						</template>
					</el-table-column>
					<el-table-column prop="firstResponseTime" label="First Response Time" min-width="250"></el-table-column>
					<el-table-column prop="rating" label="Rating" min-width="150">
						<template slot-scope="scope">
							{{ scope.row.rating || "-" }}
						</template>
					</el-table-column>
					<el-table-column prop="totalResponse" label="Respond Count" width="150"></el-table-column>
					<el-table-column prop="totalOutbond" label="Outbond Count" width="150"></el-table-column>
					<template slot="empty" style="height: 500px">
						<p>
							<img src="@/assets/images/no_report@3x.png" width="100">
							<br/>No Report
						</p>
					</template>
				</el-table>
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
            </div>
        </el-card>
		<el-card v-if="showAlertError" style="margin-bottom: 1em">
            <error-gope-siji />
        </el-card>
    </div>
</template>
        
<script>
import _ from 'lodash'
import api from '@/networkClient'
const axios = require('axios')
import config from '@/config'
import store from '@/store'
import moment from 'moment-timezone'
import Push from 'push.js'
import download from 'downloadjs';

export default {
    data() {
        return {
            loadingPage: false,
			reportData: [],
			dateRange: [
				new Date(),
				new Date(),
			],
			startDate: new Date(),
			endDate: new Date(),
			startEndDate: [new Date(), new Date()],
			excelFields: {
				"Date": "dateCreate",
				"Time start": "timeStart",
				"Time end": "timeEnd",
				"Handphone Number": "customerPhone",
				"Number of Reponds": "totalResponse",
				"CS Name": "operatorName"
			},
			excelData: [],
			excelFilename: `Report CS (Platform by DAMCorp).xlsx`,
			pageNotAllowed: false,
			ticketList: [],
			currentPage: 1,
			total: 0,
			showAlertError: false
        }
    },
    methods: {
        print() {
			window.print()
		},
		download(){
			this.getReport("download")
		},
        formatDate(val, format){
            return moment(val).format(format)
		},
		paginateReport(page){
			this.currentPage = page
			this.getReport()
		},
        async getReport(query = "", view = false){
			this.loadingPage = true
			let apiOptions = {
                url: config.chatApi + "report/helpdesk/?" + query,
				method: 'post',
				params: {
					page: this.currentPage,
					view : view == true ? true : null
				},
                data:{
                    startDate: moment(this.startEndDate[0]).format("YYYY-MM-DD"),
                    endDate: moment(this.startEndDate[1]).format("YYYY-MM-DD")
                }
			}
			if(query == "download"){
				apiOptions.responseType = "arraybuffer"
			}
            await api(apiOptions)
            .then(res => {
				if(res.data.ec == 200 || query == "download"){
					if(query == "download"){
						if(res.headers['content-type'].indexOf('application/json') == -1){
							try {
								const url = window.URL.createObjectURL(new Blob([res.data]));
								const link = document.createElement('a');
								link.href = url;
								link.setAttribute('download', 'Report CS (Platform by DAMCorp).xlsx'); //or any other extension
								link.click();
							} catch(err){
								// console.log(err.message)
							}
						} else{
							this.$swal(this.$t('error'), this.$t(`helpdesk.${res.data.message}`), "error")
						}
					} else{
						this.ticketList = []
						this.excelData = []
						var tempTicket = res.data.data.ticket
						var tempNumber = res.data.data.companyNumber

						this.excelFilename = `Report CS ${[this.formatDate(this.startDate, "YYYY-MM-DD"), this.formatDate(this.endDate, "YYYY-MM-DD")].join(" to ")} (Platform by DAMCorp).xls`
						this.reportData = _(tempTicket).groupBy(x => x.operatorNumber).map((value, key) => ({ number: key, ticket: value })).value();
						_.forEach(this.reportData, v => {
							_.forEach(v.ticket, t => {
								this.ticketList.push(t)
							})
						})
						_.forEach(res.data.data.ticket, val => {
							this.excelData.push({
								dateCreate: this.formatDate(val.dateCreate, "YYYY-MM-DD"),
								timeStart: this.formatDate(val.dateCreate, "HH:mm"),
								timeEnd: val.dateClose == "-" ? "-" : this.formatDate(val.dateClose, "HH:mm"),
								customerPhone: val.customerNumber,
								totalResponse: val.totalResponse,
								operatorName: val.operatorName
							})
						})
						this.total = res.data.data.total
					}
				} else{
					if(res.data.message != "not_subscribe"){
						this.$swal(this.$t('error'), this.$t(`helpdesk.${res.data.message}`), "error")
					} else{
						this.pageNotAllowed = true
					}
				}
            })
            .catch(err => {
				console.log(err)
				this.showAlertError = true
            })
            this.loadingPage = false
		},
		async exportExcel(){
			let apiOptions = {
                url: config.chatApi + "report/helpdesk",
                method: 'post',
                data:{
                    startDate: moment(this.startDate).format("YYYY-MM-DD"),
                    endDate: moment(this.endDate).format("YYYY-MM-DD")
                }
			}
            await api(apiOptions)
            .then(res => {
				if(res.data.ec == 200){
					var csvData = ''
					this.resData = res.data.data
					this.ticket = res.data.data.ticket
					console.log('this ticket',this.ticket)
					this.ticket = _.orderBy(this.ticket, function(o) { return new moment(o.dateTimeIso); }, ['desc']);
					// csvData += '"Report"\n'
					// csvData += '"Notification Report"\n'
					// csvData += '"(Platform by DAMCorp) Whatsapp Business API"\n\n'

					csvData +="No"+"\t"+"Date"+"\t"+"Ticket"+"\t"+"Time Start"+"\t"+"Time End"+"Phone Number"+"Number of Responds"+"CS Name"+"\n";
					var data = res.data.data.ticket
					var i = 0;
					
					data.forEach(item => {
						i++
						csvData += i + '' + '\t'
						csvData +=  moment(item.dateTime).tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss')+'\t'
						csvData +=  item.ticket+'\t'
						csvData +=  '="'+item.timeStart+ '"\t'
						csvData +=  '="'+item.timeEnd+ '"\t'
						csvData +=  '="'+item.customerPhone+ '"\t'
						csvData +=  '="'+item.operatorNumber+ '"\t'
						csvData +=  '="'+item.operatorName+ '"\t'
						csvData += '\r\n'
					});
					
					let base64 = window.btoa(window.unescape(encodeURIComponent(csvData)))
					let bstr   = atob(base64)
					let n      = bstr.length
					let u8arr  = new Uint8ClampedArray(n)
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n)
					}
					
					let filename = "Report_Notification.xlsx"
					let mime = "application/vnd.ms-excel"
					let blob =  new Blob([u8arr], { type: mime })
					download(blob, filename, mime)
					// this.isLoading=false
				}
            })
            .catch(err => {
				console.log(err.message)
				this.showAlertError = true
            })
		},
    },
    computed: {

    },
    async mounted(){
        await this.getReport("",true)
    }
}

</script>

<style lang="scss">
@import '../assets/scss/_variables';
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
