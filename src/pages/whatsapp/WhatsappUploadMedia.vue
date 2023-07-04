<template>
	<div class="scrollable only-y" v-loading="loadingPage">
		<div class="page-header">
				<h1>List Media</h1>
		</div>
		<el-card v-if="showAlertMessage" align="center">
			<h2 align="center">Start messaging your customers today</h2>
			<p v-html="$t('promote.desc.whatsapp')"></p>
			<br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span>
		</el-card>
		<!-- <el-card v-if="showAlertError" style="margin-bottom: 1em">
			<error-gope />
		</el-card> -->
        <el-card v-else>
			<el-row :gutter="10" v-if="!showAlertMessage && !showAlertError" style="z-index: 0">
				<el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-button
					style="margin-bottom: 22px;"
					type="primary"
					@click="doShowDialogUploadMedia()"
					:loading="loadingTable"
					>Upload Media</el-button>
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
							<el-input size="mini" style="float: left !important; width: 300px;"
								class="search-contact"
								prefix-icon="el-icon-search"
								placeholder="Search by Id"
								clearable
								v-model="searchingData">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="mini" class="animated fadeInRight" @click="changeFilter">
								<i class="el-icon-search" />
							</el-button>
						</el-form-item>
					</el-form>
					<el-card shadow="card-shadow--small">
						<!-- <div slot="header" class="clearfix" align="center">
							<h2 style="font-weight: bold">Whatsapp Notification Report</h2>
						</div> -->
						<div class="group-list scrollable only-y" v-loading="loadingPage">
							<el-row :gutter="20">
								<el-col :span="20" :offset="2">
									<el-pagination
										background
										prev-text="Prev"
										next-text="Next"
										layout="prev, pager, next"
										:page-size="50"
										@current-change="paginateReport"
										:current-page="currentPage"
										:total="total"
										class="mb-10">
									</el-pagination>
									<template>
										<el-table height='500' :data="mediaData" style="width: 100%; color: #000 !important; border: 1px solid #EBEEF5" v-loading="loadingTable" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(246, 246, 245, 0.8)">
												<el-table-column fixed width="300" prop="dateTime" label="Date">
													<template slot-scope="props">
														{{ format(props.row.date, "DD/MM/YYYY, HH:mm") }}
													</template>
												</el-table-column>
												<el-table-column width="500" prop="id" label="Media ID"></el-table-column>
												<el-table-column prop="url" label="URL Source" width="500">
													<template slot-scope="props">
														 <a target="blank" :href="props.row.url">{{props.row.url}}</a>
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
								</el-col>
							</el-row>
						</div>
					</el-card>
				</el-col>
			</el-row>
        </el-card>

		<el-dialog @close='closeDialog' title="Upload Media" :visible.sync="uploadMedia.visible">
			<el-row :gutter="10">
				<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<h4>Media Type</h4>
				</el-col>
				<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
				<el-select v-model="media.type" placeholder="Select media type">
					<el-option
					v-for="item in optionsType"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
					<h4>Phone Number</h4>
					</el-col>
					<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
					<el-select :disabled="media.type != '-' ? false:true" v-model="phoneNumber" placeholder="Select Phone Number">
						<el-option
						v-for="item in waUserDetail.sender"
						:key="item"
						:label="item"
						:value="item">
						</el-option>
					</el-select>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
					<h4>Media Source</h4>
					</el-col>
					<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
					<el-select :disabled="phoneNumber != '' ? false:true" v-model="mediaSource" placeholder="Select media source">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
					</el-col>
				</el-row>
				<el-row v-if="mediaSource=='url'">
					<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
					<h4>Url</h4>
					</el-col>
					<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
						<el-input v-if="mediaSource=='url'" v-model="media.url" type="text" placeholder="Insert Media URL here"></el-input>
					</el-col>
				</el-row>
				<el-row v-if="mediaSource=='local'">
					<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
					<h4>File</h4>
					</el-col>
					<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
						<el-upload v-if="media.type=='image'" v-model="media.url"
							class="upload-demo"
							id="inputMedia"
							:http-request="renderMedia"
							action=""
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-upload="beforeUploadMedia"
							:before-remove="beforeRemove"
							:file-list="handleListMedia"
							drag
							list-type="picture"
							:limit="1"
							:on-exceed="handleExceed">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text" @click="renderMedia">Drop file here or <em>click to upload</em></div>
							<div class="el-upload__tip" slot="tip">
								<b>The maximum file upload size is 5 MB</b>
							</div>
						</el-upload>
						<el-upload v-if="media.type=='document'" v-model="media.url"
							class="upload-demo"
							id="inputMedia"
							:http-request="renderMedia"
							action=""
							:on-preview="handlePreview"
							:before-upload="beforeUploadMedia"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							drag
							list-type="text"
							:file-list="handleListMedia"
							:limit="1"
							:on-exceed="handleExceed">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text" @click="renderMedia">Drop file here or <em>click to upload</em></div>
							<div class="el-upload__tip" slot="tip">
							<b>The maximum file upload size is 100 MB</b>
							</div>
						</el-upload>
						<el-upload v-if="media.type=='video'" v-model="media.url"
							class="upload-demo"
							id="inputMedia"
							:http-request="renderMedia"
							action=""
							:on-preview="handlePreview"
							:before-upload="beforeUploadMedia"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							drag
							list-type="text"
							:file-list="handleListMedia"
							:limit="1"
							:on-exceed="handleExceed">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text" @click="renderMedia">Drop file here or <em>click to upload</em></div>
							<div class="el-upload__tip" slot="tip">
							<b>The maximum file upload size is 16 MB</b>
							</div>
						</el-upload>
						<el-progress :percentage="uploadMediaProgress"></el-progress>
					</el-col>
				</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" :loading="loadingUploadMedia" :disabled="loadingUploadMedia == false ? false : true" @click="submitUploadMedia">{{ $t("submit") }}</el-button>
			</span>
		</el-dialog>	
		
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

export default {
    data() {
			return {
				documentFileName: '',
				loadingUploadMedia: false,
				uploadMediaProgress: 0,
				handleListMedia: [],
				mediaSource: '',
				media: {
					url: '',
					type: '-'
				},
				uploadMedia: {
					visible: false
				},
				optionsType: [
				{
					value: 'image',
					label: 'Image'
				},
				{
					value: 'video',
					label: 'Video'
				}, {
					value: 'document',
					label: 'Document'
				}],
				options: [
				{
					value: 'local',
					label: 'Local Computer'
				},
				{
					value: 'url',
					label: 'URL'
				}],
				mediaSource: '',
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
				loadingTable: false,
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
				mediaData:[],
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
				value: moment().format('M'),
				optionsYear: [],
				year: "2019",
				waUserDetail : {
					sender : []
				},
				sender: '',
				phoneNumber : '',
				currentPage: 1,
				total:0,
				dateRange: [
					new Date(),
					new Date(),
				]
			}
    },
    methods: {
		closeDialog(){
			this.uploadMedia.visible = false
			this.handleRemove()
		},
		handleExceed(files, fileList) {
		// this.$message.warning('The limit is 3, you selected'+files.length+' files this time, add up to '+files.length + fileList.length'+ totally');
		},
		beforeRemove(file, fileList) {
			// return this.$confirm(file.name+'?');
		},
		handlePreview(file) {
			// console.log(file);
		},
		handleRemove(file, fileList) {
		// console.log(file, fileList);
			this.media.url = ""
			this.uploadMediaProgress = 0
			this.handleListMedia = []
		},
		doShowDialogUploadMedia(){
			this.uploadMedia.visible = true
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
			this.getAllMedia()
		},
        print() {
			window.print()
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
			await this.getAllMedia(1)
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
    	async getAllMedia(page = 1, query = ""){
			this.showAlertError = false
			this.loadingTable = true
			// await this.loadWA()
			var self = this
			let apiOptions = {
				url: config.baseApi + "/upload_media/all?page=" + page,
				method: 'post',
				data:{
					number:this.sender,
					startDate: moment(this.selectedStartDate[0]).format("YYYY-MM-DD"),
					endDate: moment(this.selectedStartDate[1]).format("YYYY-MM-DD"),
				}
			}
			if(query != ""){
				apiOptions.url = `${config.baseApi}/upload_media/${query}`
			}
            await api(apiOptions)
            .then(res => {
				// console.log('allMedia',res);
				let endDate = moment([this.year, this.value-1]).endOf('month').format("DD MMM YYYY")
				let date = ""
				if(this.value == moment().month()+1 && this.year == moment().year()){
					date = moment().format('DD MMM YYYY')
				}
				else{
					date = endDate
				}
				if(res.data.ec == 200){
					this.mediaData = res.data.data.media
					// console.log(this.mediaData);
					// this.resData = res.data.data
					// this.messages = res.data.data.messages
					// // console.log('messages response',this.messages)
					// // console.log('this messages',this.messages)
					// // this.messages = _.orderBy(this.messages, function(o) { return new moment(o.dateTimeIso); }, ['desc'])
					// this.month = this.value
					this.total = this.mediaData.length
				}
				else if(res.data.ec >= 400){
					this.$swal(this.$t('info'), "Not Found", "info")
				}
				else{
					this.$swal(this.$t('error'), this.$t('error_text'), "error")
				}
				this.loadingTable = false
				// console.log("content-type", res.headers['content-type'])
            })
            .catch(err => {
				this.loadingTable = false
				this.$swal(this.$t('error'), this.$t('error_text'), "error")
            })
			
			// this.tabLoading = false
		},

		async paginateReport(page){
			this.currentPage = page
			await this.getAllMedia(this.currentPage)
		},
		// async deleteFile(session){
		// 	try {
		// 		await this.$confirm(`You will permanently delete this file. Are you sure?`, 'Confirm', {
		// 			confirmButtonText: 'Sure',
		// 			cancelButtonText: 'Cancel',
		// 			dangerouslyUseHTMLString: true,
		// 			type: 'warning',
		// 			center: true
		// 		})
		// 		this.reportTabLoading = true
		// 		await api({
		// 			method: "delete",
		// 			url: "report/" + session
		// 		}).then(response => {
		// 			if(response.data.ec == 200){
		// 				this.$swal(this.$t('success'), "", "success")
		// 			} else{
		// 				this.$swal(this.$t('error'), "Sorry, delete file failed. Please try again", "error")
		// 			}
		// 		}).catch(err => {
		// 			this.$swal(this.$t('error'), this.$t('error_text'), "error")				
		// 		})
		// 		this.reportTabLoading = false
		// 		this.loadData()
		// 	} catch(err){

		// 	}
		// },
		onUploadMedia(event) {
		var input = event.target
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = (e) => {
			let media = e.target.result;
			// console.log(media)
			var tipefile = input.files[0].type
			if(_.indexOf(["data/*"], tipefile) == -1) {
				document.getElementById('inputMedia').value = ''
				this.$swal(this.$t('error'), 'File type not allowed', "error")
			} else {
				// this.csvData = this.csvJSON(csv)
				// this.csvJSON(csv)
				// this.readingCsv = true

			}
			}
			reader.readAsText(input.files[0]);
		}
		},

		beforeUploadMedia(object){
			if(this.media.type.toLowerCase() == 'image' && ["image/jpeg", "image/png"].indexOf(object.type)==-1){
				this.closeDialog()
				this.$swal(this.$t('error'), "Media extension not match (.jpeg / .png)", "warning")
				return false
			}else if(this.media.type.toLowerCase() == 'document' && ["application/pdf"].indexOf(object.type)==-1){
				this.closeDialog()
				this.$swal(this.$t('error'), "Media extension not match (.pdf)", "warning")
				return false
			}
			else if(this.media.type.toLowerCase() == 'video' && ["video/mp4","video/avi","video/x-matroska"].indexOf(object.type)==-1){
				this.closeDialog()
				this.$swal(this.$t('error'), "Media extension not match (.mp4 / .avi / .mkv)", "warning")
				return false
			}
		},

		async renderMedia(object){
			let formData = new FormData();
			var input = document.getElementById('inputMedia')
			this.documentFileName = object.file.name

			if(this.media.type.toLowerCase()=='image' && this.mediaSource == 'local'){
				if(object.file.size >= 5242880){
					this.closeDialog()
					this.$swal(this.$t('error'), "Maximum file upload size is 5 MB", "warning")
					return
				}
			}
			else if(this.media.type.toLowerCase()=='document' && this.mediaSource == 'local'){
				if(object.file.size >= 104857600){
					this.closeDialog()
					this.$swal(this.$t('error'), "Maximum file upload size is 100 MB", "warning")
					return
				}
			}
			else if(this.media.type.toLowerCase()=='video' && this.mediaSource == 'local'){
				if(object.file.size >= 16777216){
					this.closeDialog()
					this.$swal(this.$t('error'), "Maximum file upload size is 16 MB", "warning")
					return
				}
			}

			this.loadingUploadMedia = true
			formData.append('media', object.file)
			formData.append('type', "upload_media")
			axios.defaults.timeout = 60000 * 15
			await axios.post(config.baseApi + 'upload/media', formData, {
				maxContentLength: Infinity,
				maxBodyLength: Infinity,
				headers: {
				'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (event) => {
				let p = parseInt(event.total / event.loaded)
				p = p > 100 ? 100 : p
				this.uploadMediaProgress = p > 1 ? 90 - p : 90
				}
			}).then(res => {
				// console.log('renderMedia', res);
				if (res.data.ec == 200) {
					this.media.url = res.data.data.url
					this.uploadMediaProgress = 100
				}
				else {
					this.closeDialog()
					this.$swal(this.$t('error'), 'render media error', "error")
				}
				this.loadingUploadMedia = false
			}).catch(err => {
				console.log(err);
				this.closeDialog()
				this.$swal(this.$t('error'), 'render media error', "error")
				this.loadingUploadMedia = false
			})
		},
		async submitUploadMedia(){
			this.loadingUploadMedia = true

			if (this.mediaSource == 'url') {
				let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
				'(\\#[-a-z\\d_]*)?$','i'); // fragment locator

				if (!pattern.test(this.media.url.toLowerCase())) {
					this.loadingUploadMedia = false
					this.closeDialog()
					this.$swal(this.$t('error'), `Make sure your media url is valid!`, "warning")
					return
				}
				else{
					let allowedFiles = []
					switch (this.media.type) {
						case 'image':
							allowedFiles = [".jpeg", ".jpg", ".png"]
							break;
						case 'document':
							allowedFiles = [".doc", ".docx", ".pdf"]
							break;
						case 'video':
							allowedFiles = [".mp4", ".avi", ".mkv"]
							break;
						
					}
					let regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");

					if (!regex.test(this.media.url.toLowerCase())) {
						this.loadingUploadMedia = false
						this.closeDialog()
						this.$swal(this.$t('error'), `Media extension not match (${allowedFiles.join()})`, "warning")
						return
					}
				}
				

			}

			let data = {
				url: this.media.url,
				number: this.phoneNumber,
				type: this.media.type
			}
			await api({
				method: 'post',
				url: config.baseApi + 'upload_media',
				timeout: 300000,
				data: data
			})
			.then(res => {
				// console.log('submitUploadMedia',res.data)
				if(res.data.ec == 200){
					this.$swal({
						title: this.$t('success'),
						text: '',
						type: 'success',
					})
					.then(oke=> {
						if (oke) {
							this.getAllMedia()
						}
					})
				} else if(res.data.ec == 400){
					this.$swal(this.$t('info'), this.$t('whatsapp.missing_parameter'), "info")
				} else {
					this.$swal(this.$t('error'), this.$t('error_500'), "error")
				}
				this.loadingUploadMedia = false
				this.uploadMedia.visible = false
				// this.getMedia()
			})
			.catch(err => {
				console.log(err)
				if (err.message) {
					this.$swal(this.$t('error'), `${err.message}`, "error")
				}
				else{
					this.$swal(this.$t('error'), this.$t('error_text'), "error")
				}
				this.loadingUploadMedia = false
				this.uploadMedia.visible = false
			})
		},
    },
	
    computed: {
    },
    async mounted(){
		let year = []
		let i = 0
		let yearNow = new Date().getFullYear()
		let yearStart = new Date().getFullYear() - 2
		for(i = yearNow; i >= yearStart; i--){
			year.push({ value: i, label: i })
		}
		this.optionsYear = year
		await this.loadWA()
		if(this.showAlertError == false && this.showAlertMessage == false){
			this.getAllMedia()
		}
		else{
			this.loadingPage = false
		}
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

.upload-demo .el-upload .el-upload-dragger{
  display: table-cell;
  width: 1500px;
}
.el-table__empty-block {
	height: 200px
}
.el-upload.el-upload--text .el-upload-dragger {
    max-width: 100%;
    width: 1500px;
    display: table-cell;
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
<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.profile-gallery {
	/*.images-list {
		margin: 0 -10px;
		margin-top: -10px;

		img {
			cursor: pointer;
			width: calc(50% - 20px);
			border-radius: 10px;
			max-width: 278px;
			float: left;
			box-sizing: border-box;
			margin: 10px;
			border: 5px solid #fff;
			box-shadow: 0px 7px 20px -7px rgba(0, 0, 0, 0.55);
			transition: all .5s;

			&:hover {
				box-shadow: none;
				transform: translateY(3px);
			}
		}
	}*/

	.images-list {
		overflow: hidden;
		margin: -1%;
		&.box-margins {
			margin: 1%;
		}

		img {
			cursor: pointer;
			width: 18%;
			border-radius: 10px;
			//max-width: 278px;
			float: left;
			box-sizing: border-box;
			margin: 1%;
			border: 5px solid #fff;
			box-shadow: 0px 7px 20px -7px rgba(0, 0, 0, 0.55);
			transition: all .5s;

			&:hover {
				box-shadow: none;
				transform: translateY(3px);
			}
		}
	}
}
.el-form-item.tooltip{
  line-height: 10px;

  .el-form-item__content {
    line-height: 10px !important;
  }
}

.full-button, .el-dropdown {
  width: 100%;
}

.el-tag {
  margin-right: 10px;
}

.page-header {
  margin-bottom: 30px;
}

.el-step {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.float-right {
  float: right;
}

.float-left {
  float: left;
}

.footer {
  padding-top: 10px;
  margin-top: 20px;
  border-top: 1px solid #ebeef5;
}

.uploader {
  line-height: 20px;
  padding-top: 8px;
  height: 40px;
}

.el-select {
  width: 100%;
}

// START CUSTOMIZE ON 1024px
@media (max-width: 1024px) {
  .el-col-md-18 {
      width: 60%;
  }

  .el-col-md-6 {
      width: 40%;
  }
}
// FINISH

@media (max-width: 768px) {
	.profile-gallery {
		.images-list {
			margin: -1.5%;
			&.box-margins {
				margin: 1.5%;
			}


			img {
				width: 30.3%;
				margin: 1.5%;
			}
		}
	}
}
@media (max-width: 480px) {
	.profile-gallery {
		.images-list {
			margin: -2%;
			&.box-margins {
				margin: 2%;
			}

			img {
				width: 46%;
				margin: 2%;
			}
		}
	}
}
@media (max-width: 360px) {
	.profile-gallery {
		.images-list {
			margin: -2%;
			&.box-margins {
				margin: 2%;
			}

			img {
				width: 96%;
				margin: 2%;
			}
		}
	}
}
</style>
