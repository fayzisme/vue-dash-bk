<template>
	<div class="scrollable only-y" v-loading="loadingPage">
        <div class="page-header">
            <h1>{{ $t("whatsapp.inquiry") }}</h1>
        </div>
        <el-card v-if="showAlertMessage" align="center" style="margin-bottom: 1em">
            <h2>Start messaging your customers today</h2>
            <span v-html="$t('promote.desc.whatsapp')"></span>
            <br/><br/>
            <span><el-button @click="mailto()">Send us e-mail</el-button></span>
            <div v-if="customer_type==2 && businessId==undefined && businessId==''" style="margin: 0 0 20px;">
                <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Connect to Facebook</button>
            </div>
        </el-card>
        <el-card v-else v-loading="loadingPage" style="margin-bottom: 1em">
            <el-tabs v-model="activeName">
                <el-tab-pane label="Single" name="single">
                    <el-form :model="contactForm" label-width="120px" status-icon :rules="rulesForm" ref="checkContactForm" @submit.native.prevent="checkContactForm('single')">
                        <el-form-item label="Input Number" prop="phoneNumber">
                            <el-input @keypress.native="numberOnly"  @paste.native="paste" type="text" v-model="contactForm.phoneNumber" value="" placeholder="Input phone number"/>
                        </el-form-item>
                        <el-button type="primary" @click="checkContactForm('single')" :loading="loadingBtn"><i class="mdi mdi-check-circle"/> {{ $t("submit") }}</el-button>
                    </el-form>
                    <div v-if="showResult">
                        <el-row :gutter="30">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Phone Number</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-tag type="primary">{{ checkResult.contact }}</el-tag>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Status</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-tag :type="checkResult.status.toLowerCase() == 'valid' ? 'success' : 'danger'">{{ checkResult.status }}</el-tag>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="CSV" name="csv">
                    <el-row :gutter="30">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-upload
                                class="upload-demo"
                                drag
                                v-loading="loadingBtn"
                                :http-request="uploadFile"
                                :action="uploadUrl"
                                :headers="uploadHeaders"
                                :fileList="uploadedFileList"
                                :data="{ param: 'phone', type: 'csv' }"
                                name="csv_file">
                                <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                                    <div class="el-upload__tip" slot="tip">csv files with a size less than 500kb</div>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <el-button class="mt-10" type="primary" @click="checkContact('csv')" size="mini" :loading="loadingBtn">{{ $t("submit") }}</el-button>
                </el-tab-pane> -->
            </el-tabs>
        </el-card>
        <el-card v-if="showAlertError" style="margin-bottom: 1em">
            <error-gope-siji />
        </el-card>
    </div>
</template>
<script>
import api from '@/networkClient'
import axios from 'axios'
import _ from 'lodash'
import config from '@/config'
import store from '@/store'

export default {
    name: "WhatsappProfile",
    data() {
        var checkHasValue = (rule, value, callback) => {
            if (!value) {
                return callback(new Error(this.$t('contact.warning.phone_number')));
            } else{
                callback()
            }
        }
        return {
            businessId: '',
			customer_type: store.getters.customer_type,
            // Loading
            loadingPage: false,
            loadingBtn: false,
            // Show/hide
            showAlertError: false,
            showAlertMessage: false,
            showFormMessage: true,
            showAlertErrorLoadCredential: false,
            showResult: false,
            // Data
            whatsapp_number: [],
            selectedPhoneNumber: "",
            activeName: "single",
            contactForm: {
                phoneNumber: "",
            },
            checkResult: {
                contact: "",
                status: ""
            },
            uploadUrl: config.baseApi + 'wa/check_contact',
            uploadHeaders: {
                'api-key': this.$store.getters.accessToken,
            },
            uploadedFileList: [],
            rulesForm: {
                phoneNumber: [
                    { validator: checkHasValue, trigger: 'blur' }
                ]
            },
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
					console.log('bus id',this.businessId)
				}
			}).catch(error => {
			})	
		},
        numberOnly(e) {
            var key = window.event ? e.keyCode : e.which;

            let isNumber = _.indexOf([8, 9, 27, 13, 190, 43], e.keyCode)
            if ( isNumber !== -1 ||
                // Allow: Ctrl+C, Command+C
                (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: Ctrl+R, Command+R
                (e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode > 42 && e.keyCode <= 49 && _.indexOf([44,45,46,47], e.keyCode) == -1)) {
                // let it happen, don't do anything
                return
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode > 96 || e.keyCode < 200)) {
                e.preventDefault();
            }
        },
        paste(event) {
            event.preventDefault()
            var totalCharacterCount = window.event.clipboardData.getData('Text');// || window.clipboardData.getData('Text');
            var strValidChars = "+0123456789";
            var strChar;
            var FilteredChars = "";
            for (var i = 0; i < totalCharacterCount.length; i++) {
                strChar = totalCharacterCount.charAt(i);
                if (strValidChars.indexOf(strChar) != -1) {
                    FilteredChars = FilteredChars + strChar;
                }
            }
            this.contactForm.phoneNumber = FilteredChars;
        },
        uploadFile(object){
            let maxSizeAllowed = 500 * 1000 // bytes * 1000
            if(object.file.size > maxSizeAllowed){
                this.$swal(this.$t('warning'), this.$t(`upload_max_size`), "warning")
            } else if(['text/csv', 'application/vnd.ms-excel'].indexOf(object.file.type) == -1) {
                this.$swal(this.$t('warning'), this.$t(`file_not_allowed`) + ' csv', "warning")
            } else{
                this.checkContact('csv', object.file)
            }
        },
        async loadWa(){
            await api({
                method: 'post',
                url: 'user/detail/number',
                data: {
                    channels: "whatsapp"
                }
            }).then(result => {
                if(result.data.ec == 200){
                    this.whatsapp_number = result.data.data
                    this.selectedPhoneNumber = this.whatsapp_number[0]
                    this.showFormMessage = true
                } else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
                    this.showAlertMessage = true
                } else if(result.data.ec == 500){
                    this.showAlertError = true  
                }
                this.loadingPage = false
            }).catch(error => {
                this.showAlertError = true
                this.loadingPage = false
            })
        },
        checkContactForm(type){
            this.$refs['checkContactForm'].validate(async (valid) => {
                if(valid){
                    this.checkContact(type)
                } else{
                    return
                }
            })
        },
        async checkContact(type = '', file = null){
            this.loadingBtn = true
            this.showResult = false
            let formData = new FormData();
            let apiOptions = {
                timeout: 60000 * 5,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            if(type == 'csv'){
                // var input = document.getElementById('inputCsvFile')
                formData.append('csv_file',file)
                apiOptions.responseType = "arraybuffer"
            } else{
                formData.append('phone', this.contactForm.phoneNumber)
            }
            formData.append('type', type)
            
            await axios.post(config.baseApi + 'wa/check_contact', formData, apiOptions).then(resp => {
                if(type == 'single'){
                    this.showResult = true
                    this.checkResult.contact = resp.data.data.contact
                    this.checkResult.status = resp.data.data.status.toUpperCase()
                } else{
                    this.uploadedFileList.push({
                        "status":"success",
                        "name":file.name,
                        "size": file.size,
                        "percentage":100,
                        "uid": file.uid
                    })
                    const url = window.URL.createObjectURL(new Blob([resp.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Whatsapp Inquiry Check Contact.xlsx'); //or any other extension
                    link.click();
                }
            }).catch(err => {
                 if(type == 'single'){
                    this.showResult = true
                    this.checkResult.contact = this.contactForm.phoneNumber
                    this.checkResult.status = "FAILED_CHECK"
                } else{
                    this.$swal(this.$t('error'), this.$t(`error_text`), "error")
                }
            })

            this.loadingBtn = false
        }
    },
    async mounted(){
		this.customer_type
		this.checkBusinessId()
        await this.loadWa()
    }
}
</script>