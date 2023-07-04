<template>
    <div class="scrollable only-y" v-loading="loadingPage">
        <div class="page-header">
			<h1>{{ $t("sms.title") }}</h1>
		</div>
        <el-card v-if="showForm" v-loading="loadingPage" style="margin-bottom: 1em">
            <el-row :gutter="30" class="mb-20">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <h5>Phone Number</h5>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                    <el-select  v-model="form.phone_number" @change="changeFilter" :default-first-option="true">
                        <el-option
                        v-for="item in phoneNumberList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="mb-20">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <h5>Your Integration URL</h5>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                    <el-input type="text" v-model="form.service_fields.url" resize="none" :value="form.service_fields.url" />
                </el-col>
            </el-row>
            <el-row :gutter="30" class="mb-20">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <h5>Headers (optional)</h5>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                    <codemirror ref="myCm"
                        :value="jsonToString(form.service_fields.headers)" 
                        :options="cmOptions"
                        @ready="onCmReady"
                        @focus="onCmFocus"
                        @input="onCodeHeaderChange">
                    </codemirror>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="mb-20">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <h5>Request Body (JSON)</h5>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                    <codemirror ref="myCm"
                        :value="jsonToString(form.service_fields.body)" 
                        :options="cmOptions"
                        @ready="onCmReady"
                        @focus="onCmFocus"
                        @input="onCodeBodyChange">
                    </codemirror>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="mb-20">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <h5>Response Body (JSON)</h5>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                    <codemirror ref="myCm"
                        :value="jsonToString(form.service_fields.response)" 
                        :options="cmOptions"
                        @ready="onCmReady"
                        @focus="onCmFocus"
                        @input="onCodeResponseChange">
                    </codemirror>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="mb-20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-button type="primary" :loading="loadingBtn" @click="doSaveUpdate">{{ btnText }}</el-button>
                    <el-button type="danger" v-if="status == 'success'" @click="confirmDelete">Delete Integration</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card v-if="showAlertError" style="margin-bottom: 1em">
            <error-gope-siji />
        </el-card>
        <el-dialog title="Delete Integration" :visible.sync="dialogDelete" :close-on-click-modal="loadingDelete" :close-on-press-escape="loadingDelete">
            <el-form label-position="left" label-width="150px" v-loading="loadingDelete" element-loading-text="Please wait while we delete your integration configuration...">
                <p>Are you sure want to delete sms configuration for phone number <b>{{ selectedDelete }}</b>?</p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="loadingDelete" @click="deleteIntegration">{{ $t("submit") }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import _ from 'lodash'
import api from '@/networkClient'
import config from '@/config'

// require component
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript.js'

export default {
    name: "Sms_Integration",
    components: {
        codemirror
    },
    data() {
        return {
            loadingPage: true,
            loadingBtn: false,
            showForm: false,
            showAlertError: false,
            sms_data: [],
            code: '',
            form: {},
            options: {
                selectOnLineNumbers: false,
                cursorStyle: null
            },
            btnText: "Save Integration",
            cmCode: 'const a = 10',
            cmOptions: {
                // codemirror options
                tabSize: 4,
                mode: {
                    name: 'javascript',
                    json: true
                },
                theme: 'monokai',
                lineNumbers: true,
                line: true,
            },
            editor: null,
            phoneNumberList: [],
            status: '',
            errorFields: [],
            dialogDelete: false,
            loadingDelete: false,
            selectedDelete: ''
        }
    },
    methods: {
        jsonToString(obj){
            if(typeof obj == "object"){
                return JSON.stringify(obj, null, 2)
            } else{
                return obj
            }
        },
        parseToJson(string){
            return new Promise((resolve, reject) => {
                try {
                    let json = JSON.parse(string.replace(/\r|\n|\r\n|\n\r/g, ""))
                    resolve(json)
                } catch(err){
                    reject(err.message)
                }
            })
        },
        confirmDelete(){
            this.dialogDelete = true
            this.selectedDelete = this.form.phone_number
        },
        async deleteIntegration(){
            this.loadingDelete = true
            await api({
                method: 'delete',
                url: 'sms',
                data:{
                    number: this.selectedDelete
                }
            })
            .then(result => {
                if(result.data.ec == 200){
                    this.dialogDelete = false
                    this.$swal(this.$t('success'), this.$t('success'), "success").then(confirm => {
                        this.smsIntegrationDetail()
                    })
                } else{
                    this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                }
            })
            .catch(err => {
                this.$swal(this.$t('error'), this.$t('error_text'), "error")
            })
            this.loadingDelete = false
        },
        async changeFilter(){
            await this.smsIntegrationDetail()
        },
        doSaveUpdate(){
            if(this.status == "not_subscribe"){
                this.newIntegrationDetail()
            } else{
                this.updateIntegrationDetail()
            }
        },
        async smsIntegrationDetail(){
            this.loadingPage = true
            await api({
                method: 'post',
                url: 'sms/detail',
                data: {
                    number: this.form.phone_number
                }
            }).then(result => {
                if(result.data.ec == 200){
                    this.sms_data = result.data.data
                    this.form = this.sms_data[0]
                    this.showForm = true
                    this.status = result.data.message
                    this.btnText = "Update Integration"
                } else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
                    // this.showForm = false
                    this.showForm = true
                    this.sms_data = null
                    this.form.service_fields = {
                        url: "",
                        headers: "",
                        body: "",
                        response: ""
                    }
                    this.status = result.data.message
                    this.btnText = "Create Integration"
                } else if(result.data.ec == 500){
                    this.showAlertError = true
                    this.status = result.data.message
                }
                this.loadingPage = false
            }).catch(error => {
                this.showAlertError = true
                this.loadingPage = false
            })
        },
        async updateIntegrationDetail(){
            if(this.errorFields.length == 0){
                this.loadingBtn = true
                await api({
                    method: 'patch',
                    url: 'sms/detail/update',
                    data: this.form
                })
                .then(result => {
                    if(result.data.ec == 200){
                        this.$swal(this.$t('success'), this.$t('success'), "success").then(confirm => {
                            this.smsIntegrationDetail()
                        })
                    } else{
                        this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                    }
                })
                .catch(error => {
                    this.$swal(this.$t('error'), this.$t('error_text'), "error")
                })
                this.loadingBtn = false
            } else {
                this.$swal(this.$t('error'), "You input wrong JSON format, please re-check your input. Fields: " + this.errorFields.join(", ") , "warning")
            }
        },
        async newIntegrationDetail(){
            if(this.errorFields.length == 0){
                this.loadingBtn = true
                await api({
                    method: 'post',
                    url: 'sms/assign-sms',
                    data: {
                        url: this.form.service_fields.url,
                        headers: this.form.service_fields.headers,
                        body: this.form.service_fields.body,
                        response: this.form.service_fields.response,
                        phone: this.form.phone_number
                    }
                })
                .then(result => {
                    if(result.data.ec == 200){
                        this.$swal(this.$t('success'), this.$t('success'), "success").then(confirm => {
                            this.smsIntegrationDetail()
                        })
                    } else{
                        this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                    }
                })
                .catch(error => {
                    this.$swal(this.$t('error'), this.$t('error_text'), "error")
                })
                this.loadingBtn = false
            } else{
                this.$swal(this.$t('error'), "You input wrong JSON format, please re-check your input. Fields: " + this.errorFields.join(", ") , "warning")
            }
        },
        async loadWA() {
			await api({
				method: 'post',
				url: config.baseApi +'/user/detail/number'
			}).then(result => {
				// this.loadingPage = false
				if(result.data.ec == 200){
                    this.phoneNumberList = result.data.data
                    this.form.phone_number = this.phoneNumberList[0]
				} else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
				} else {
					this.showAlertError = true
				}
			}).catch(error => {
				this.showAlertError = true
			})
		},
        onMounted(editor) {
            this.editor = editor;
        },
        onCodeHeaderChange(newCode) {
            if(newCode != ""){
                this.parseToJson(newCode).then(res => {
                    // console.log("resp", res)
                    this.form.service_fields.headers = res
                    _.remove(this.errorFields, (js) => { return js == "headers" })
                }).catch(err => {
                    // console.log("err", err)
                    this.errorFields.push("headers")
                    this.errorFields = _.uniq(this.errorFields)    
                })
            } else {
                this.form.service_fields.headers = ""
            }
        },
        onCodeBodyChange(newCode) {
            if(newCode != ""){
                this.parseToJson(newCode).then(res => {
                    // console.log("resp", res)
                    this.form.service_fields.body = res
                    _.remove(this.errorFields, (js) => { return js == "body" })
                }).catch(err => {
                    // console.log("err", err)
                    this.errorFields.push("body")
                    this.errorFields = _.uniq(this.errorFields)    
                })
            } else {
                this.form.service_fields.body = ""
            }
        },
        onCodeResponseChange(newCode) {
            if(newCode != ""){
                this.parseToJson(newCode).then(res => {
                    // console.log("resp", res)
                    this.form.service_fields.response = res
                    _.remove(this.errorFields, (js) => { return js == "response" })
                }).catch(err => {
                    // console.log("err", err)
                    this.errorFields.push("response")
                    this.errorFields = _.uniq(this.errorFields)    
                })
            } else {
                this.form.service_fields.response = ""
            }
        },
        onCmReady(cm) {
            // console.log('the editor is readied!', cm)
        },
        onCmFocus(cm) {
            // console.log('the editor is focus!', cm)
        },
        onCmCodeChange(newCode) {
            // console.log('this is new code', newCode)
            this.code = newCode
        }
    },
    async mounted(){
        await this.loadWA()
        this.smsIntegrationDetail()
    },
    filters: {
        pretty: function(value) {
            if(typeof value == "object"){
                return JSON.stringify(value, null, 2);
            } else {
                return JSON.stringify(JSON.parse(value), null, 2);
            }
        }
    }
}
</script>
<style>
@media (max-width: 1024px){
    .el-col-md-4 {
        width: 30%;
    }

    .el-col-md-20 {
        width: 70%;
    }
}
</style>