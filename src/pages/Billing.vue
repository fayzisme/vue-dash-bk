<template>
	<div class="page-invoice scrollable">
		 <div class="page-header">
			<h1>Billing</h1>
		</div>
		<el-card v-if="showAlertError" style="margin-bottom: 1em">
            <error-gope-siji />
        </el-card>
		<el-card v-if="!showFormMessage" align="center">
			<!-- <h2>Start messaging your customers today</h2>
			<span v-html="$t('promote.desc.whatsapp')"></span>
			<br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span> -->
			<p align="center" style="color: #909399">
				<img src="@/assets/images/no_billing@3x.png" width="100">
				<br/> Sorry, you do not have billing yet.
			</p>
		</el-card>
		<el-form :inline="true" v-if="showFormMessage && !showAlertError">
			<el-form-item>
				<el-select v-model="monthValue" placeholder="Select Month" @change="changeFilter">
					<el-option
					v-for="item in optionsMonths"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="animated fadeInRight" :loading="loadingTable" @click="wa_billing('download')"><i class="mdi mdi-download" /> Download</el-button>	
			</el-form-item>
		</el-form>

		<div class="invoice bg-white black-text" v-if="showFormMessage && !showAlertError" v-loading="loadingTable">
			<div class="invoice-top">
				<div class="logo">
					<img src="@/assets/images/logo-cropped.png" alt="logo">
				</div>
				<div class="info" :md="12" :xs="24">
					<h2>DAM Corp.</h2>
					<p>daisy@damcorp.id<br>(021) 30487010</p>
				</div><!--End Info-->
				<div class="title" :md="12" :xs="24">
					<h1>Invoice</h1>
					<p>Issued: {{ today }}</p>
				</div><!--End Title-->
			</div><!--End InvoiceTop-->

			<hr>

			<div class="invoice-bottom" v-loading="loadingTable">
				<!-- HEADER -->
				<el-row :gutter="0" style="margin-top: 20px">
					<el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
						<span class="header-text">Service Description</span>
					</el-col>
					<el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
						<span class="header-text">Type</span>
					</el-col>
					<el-col :xs="4" :sm="12" :md="4" :lg="4" :xl="4">
						<span class="header-text">Total Message</span>
					</el-col>
					<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
						<span class="header-text">Sub total</span>
					</el-col>
				</el-row>
				<hr />
				<!-- BODY -->
				<el-row :gutter="0" v-for="(data, key) in whatsappBilling" :key="key">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 20px">
						<span><b>Whatsapp Business ({{ whatsappNumber[key] }})</b></span>
					</el-col>
					<hr/>
					<el-row :gutter="0" v-for="(dt, k) in whatsappBilling[key]" :key="k" style="margin-bottom: 0px">
						<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="margin-bottom: 10px">
							&nbsp;
						</el-col>
						<el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" style="margin-bottom: 10px">
							{{ dt.product.productName }}
						</el-col>
						<el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5" style="margin-bottom: 10px">
							{{ capitalizeFirstLetter(dt.product.type) || '&nbsp;' }}
						</el-col>
						<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
							{{ dt.product.type.toLowerCase().indexOf('notification') != -1 && dt.detail.length > 0 ? '&nbsp;' : dt.delivered.toLocaleString('id') }}
						</el-col>
						<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
							{{ dt.product.type.toLowerCase().indexOf('notification') != -1 && dt.detail.length > 0 ? '&nbsp;' : "Rp " + dt.total.toLocaleString('id', { minimumFractionDigits: Number.isInteger(dt.total) == false ? 4 : undefined }) }}
						</el-col>
						<hr />
						<el-row :gutter="0" v-if="dt.product.type.toLowerCase().indexOf('notification') != -1 && dt.detail.length > 0" v-for="(dtl, indx) in dt.detail" :key="indx">
							<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" style="margin-bottom: 10px">
								&nbsp;
							</el-col>
							<el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" style="margin-bottom: 10px">
								{{ dtl.countryCode }}
							</el-col>
							<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
								{{ dtl.name }}
							</el-col>
							<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
								{{ dtl.count.toLocaleString('id') || '0' }}
							</el-col>
							<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
								Rp {{dtl.total.toLocaleString('id', { minimumFractionDigits: Number.isInteger(dtl.total) == false ? 4 : undefined }) }}
							</el-col>
							<hr />
						</el-row>
					</el-row>
				</el-row>
				<el-row :gutter="0" v-if="billing_product_log.length > 0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px">
						<span><b>Note</b></span>
					</el-col>
					<hr/>
					<el-row :gutter="0" style="margin-bottom: 0px" v-for="(data, index) in billing_product_log" :key="index">
						<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="margin-bottom: 10px">
							&nbsp;
						</el-col>
						<el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" style="margin-bottom: 10px">
							{{ formatDate(data.createdAt, "DD MMM YYYY, HH:mm") }}
						</el-col>
						<el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9" style="margin-bottom: 10px">
							{{ data.reff_note }}
						</el-col>
						<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
							&nbsp;
						</el-col>
						<hr/>
					</el-row>
				</el-row>
				<!-- FOOTER -->
				<el-row :gutter="0">
					<el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
						<h2 style="font-size: 24px">Total</h2>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
						<h2 style="font-size: 24px">Rp {{ totalBill.toLocaleString('id', { minimumFractionDigits: Number.isInteger(totalBill) == false ? 4 : undefined }) }}</h2>
					</el-col>
				</el-row>

			</div><!--End Invoice-->
		</div>
	</div>
</template>

<script>
import api from '@/networkClient'
import config from '@/config'
import moment from 'moment'
import _ from 'lodash'

export default {
    name: 'Invoice',
    data() {
        return {
            clientName: '',
            companyName: '',
            companyPhone: '',
            totalWA: 0,
			monthValue: moment().format('YYYY-MM'),
			optionsMonths: [],
			today: moment().format('DD MMM YYYY'),
			getMonth: moment().month()+1,
			getYear: moment().year(),
			billWhatsapp: {},
			waServAlias: {
				text: "Whatsapp Regular Text",
				hsm: "Whatsapp Template Text",
				image: "Whatsapp Image",
				document: "Whatsapp Document",
				audio: "Whatsapp Audio"
			},
			whatsappNumber: [],
			whatsappBilling: [],
			totalBill: 0,
			loadingTable: true,
			showFormMessage: true,
			currentMonth: moment().format('YYYY-MM'),
			showAlertError: false,
			loadingExport: false,
			billing_product_log: []
        }
    },
	methods: {
		capitalizeFirstLetter(string) {
			if(string.split("_").length > 0){
				let title = []
				_.map(string.split("_"), (str) => {
					title.push(str.charAt(0).toUpperCase() + str.slice(1))
				})
				return title.join(" ")
			}
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		print() {
			window.print()
		},
		changeFilter(){
			this.currentMonth = this.monthValue
			this.loadingTable = true
			this.wa_billing()
		},
		formatDate(str, format = "YYYY-MM-DD"){
			return moment(str).format(format)
		},
		async wa_billing(query = ""){
			this.loadingTable = true
			this.loadingExport = false
			let apiOptions = {
                url: config.baseApi + "/user/billing",
                method: 'post',
                data:{
					months: this.currentMonth,
					with_date: true
				},
				timeout: 90000
			}
			if(query == "download"){
				apiOptions.url += "?download"
				apiOptions.responseType = 'blob'
			} else {
				this.totalBill = 0
			}
			await api(
				apiOptions
			).then(result => {
				let tempNumber = new Array()
				let tempBilling = new Array()
				let i = 0
				let date = ""
				if (result.data.ec == 200 || query == "download"){
					// console.log("==result==",result)
					if(result.headers['content-type'].indexOf('application/json') == -1){
						try {
							if(moment(this.currentMonth).format("M") == this.getMonth){
								date = this.today
							}
							else{
								date = moment(this.currentMonth).endOf('month').format("DD MMM YYYY")
							}
							const url = window.URL.createObjectURL(new Blob([result.data], { type: result.headers['content-type'] }));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Billing (Platform by DAMCorp)('+date+').xls'); //or any other extension
							link.click();
						} catch(err){
							// console.log(err.message)
						}
					}
					else{
						let responseBilling = result.data.data.billing,
							update_log = result.data.data.update_log
						this.billing_product_log = update_log
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
						// console.log("==tempbilling==",tempBilling)
					}
				
				} 
				else{
					this.showFormMessage = false
				}
			}).catch(error => {
				this.tokenLoader = false
				this.showAlertError = true
				// console.log(error.message)
				// this.$swal(this.$t('error'), this.$t('error_text'), "error")
			})
			this.loadingTable = false
		},
		async wa_detail(){
			await api({
				method: 'post',
				url: 'user/detail'
			}).then(result => {
				this.clientName = result.data.data.user.pic
				this.companyName = result.data.data.user.name
				this.companyPhone = result.data.data.user.phone
				this.totalWA = result.data.data.sendCount
			}).catch(error => {
				this.showAlertError = true
				// this.tokenLoader = false
			})
		}
    },
    async beforeMount(){
		for(let i = 6; i >= 0; i--){
			// console.log("a", moment().subtract(i, 'month').format("MM YYYY"))
			this.optionsMonths.push({
				value: moment().subtract(i, 'month').format("YYYY-MM"),
				label: moment().subtract(i, 'month').format("MMM YYYY")
			}) 
		}
		await this.wa_billing()
		// await this.wa_detail()
		this.loadingTable = false
    }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';
.header-text{
	font-weight: 700;
	color: #000;
	opacity: 0.7;
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
		max-width: 100%;
		min-height: 1123px;
		margin: 0 ;
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
			overflow: auto;
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
				.Rate{
					font-size: 24px;
				}
				.payment{
					font-size: 24px;
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
			font-size: 10pt;
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
				.Rate{
					font-size: 15pt !important;
				}
				.payment{
					font-size: 15pt !important;
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