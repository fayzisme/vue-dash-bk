<template>
    <div class="scrollable only-y" v-loading="loadingPage">
        <div class="page-header">
			<h1>{{ $t("helpdesk.preferences") }}</h1>
		</div>
        <el-card v-if="showAlertError" style="margin-bottom: 1em">
            <error-gope-siji />
        </el-card>
        <el-card v-if="showAlert" align="center">
            <h2 align="center">Start messaging your customers today</h2>
            <p v-html="$t('promote.desc.whatsapp')"></p>
            <br/><br/>
            <span><el-button @click="mailto()">Send us e-mail</el-button></span>
        </el-card>
        <el-card v-if="showCard && !showAlert && !showAlertError" v-loading="loadingDetail" style="margin-bottom: 1em">
            <el-row :gutter="10" v-if="showCard" style="z-index: 0">       
                <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="showCard">
                    <el-row :gutter="30" class="mb-20">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Phone Number</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-select  v-model="ruleForm.phone_number" @change="changeFilter" :default-first-option="true">
                                <el-option
                                v-for="item in phoneNumberList"
                                :key="item"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <!-- <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Bot Asking Name</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="greeting.askName">
                                    <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="ruleForm.greeting.askName" />
                                </el-form-item>
                            </el-col>
                        </el-row> -->
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Bot Asking Question</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="greeting.askQuestion">
                                    <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="ruleForm.greeting.askQuestion" />
                                </el-form-item>
                                <small style="font-size: 12px" v-html="note.askQuestion" />
                            </el-col>
                        </el-row>
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Bot Info Ticket</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="greeting.ticketAssign">
                                    <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="ruleForm.greeting.ticketAssign" />
                                </el-form-item>
                                <small style="font-size: 12px" v-html="note.ticketAssign" />
                            </el-col>
                        </el-row>
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Bot Close Ticket</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="greeting.ticketClose">
                                    <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="ruleForm.greeting.ticketClose" />
                                </el-form-item>
                                <small style="font-size: 12px" v-html="note.ticketClose" />
                            </el-col>
                        </el-row>
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Max Ticket Operator</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="max_load">
                                    <el-input type="number" id="max_load" placeholder="Maximal ticket handled by operator" v-model="ruleForm.max_load" />
                                </el-form-item>
                                <small style="font-size: 12px">Info: Maximal count of ticket allowed to handle per Customer Service</small>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Masking Customer Phone Number</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="masking_phone">
                                    <el-switch v-model="ruleForm.masking_phone" active-text="On" inactive-text="Off"></el-switch>
                                </el-form-item>
                                <small style="font-size: 12px">Info: Customer phone number will be masking like ********5155</small>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Show Ticket per CS Group</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="only_show_group_ticket">
                                    <el-switch v-model="ruleForm.only_show_group_ticket" active-text="On" inactive-text="Off"></el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                <h5>Generate Rating Ticket URL</h5>
                            </el-col>
                            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                                <el-form-item prop="ticket_rating_enabled">
                                    <el-switch v-model="ruleForm.ticket_rating_enabled" active-text="On" inactive-text="Off"></el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-button type="primary" :loading="loadingBtn" @click="updatePreferences('ruleForm')"><i class="mdi mdi-content-save"/> {{ $t('generic.update') }}</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row :gutter="30" class="mb-20" v-if="!isSubscribe">
                        <el-alert title="Info" type="info" show-icon description="This number is not connecting to Helpdesk service"></el-alert>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import ContactDialog from '@/components/ContactDialog'
import api from '@/networkClient'
const axios = require('axios')
import openSocket from 'socket.io-client';
import config from '@/config'
import store from '@/store'

import moment from 'moment-timezone'
import Push from 'push.js'
export default {
    data() {
        return {
            showAlert: false,
            showAlertError: false,
            showCard: true,
            loadingPage: false,
            loadingBtn: false,
            loadingDetail: false,
            ruleForm: {
                phone_number: "",
                greeting: {
                    askName: "",
                    askQuestion: "",
                    ticketAssign: "",
                    ticketClose: ""
                },
                max_load: 5,
                masking_phone: true,
                only_show_group_ticket: false,
                ticket_rating_enabled: false
            },
            
            rules: {
                "greeting.askName": [
                    { required: true, message: 'Please input Bot Asking Name', trigger: 'blur' },
                ],
                "greeting.askQuestion": [
                    { required: true, message: 'Please input Bot Asking Question', trigger: 'blur' }
                ],
                "greeting.ticketAssign": [
                    { required: true, message: 'Please input Bot Info Ticket', trigger: 'blur' }
                ],
                "greeting.ticketClose": [
                    { required: true, message: 'Please input Bot Close Ticket', trigger: 'blur' }
                ],
                max_load: [
                    { required: true, message: 'Please input Max Ticket Operator', trigger: 'blur' }
                ],
            },
            note: {
                askQuestion: "Note: Use {{name}} for specifying name.",
                ticketAssign: "Note: Use {{name}} for specifying name and {{ticketNumber}} for specifying ticket number.",
                ticketClose: "Note: Use {{ticketNumber}} for specifying ticket number. Use {{ticketRating}} for generated link for user give rating to his/her ticket, make sure you have enabled option Rate Ticket on the below"
            },
            isSubscribe: false,
            autoClose: false,
            api_key: "",
            phoneNumberList: [],
            loadingBtnGenerate: false,
            showAlertError: false,
            alwaysOnline: true,
            onlineAt: [
                [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()],
                [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()],
                [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()],
                [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()],
                [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()],
                [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()],
                [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()]
            ],
            onlineTime: [moment().set({ hour: 8, minute: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0 }).toLocaleString()],
            selectedDay: []
        }
    },
    methods: {
        changeFilter(){
            this.loadPreferences()
        },
        copyToClipboard(){
            let apiKey = document.querySelector('#api_key')
            apiKey.select()
            try {
                var successful = document.execCommand('copy');
                this.$message.success({
                    showClose: true,
                    duration: 3000,
                    message: "Copied to clipboard"
                });
            } catch(err){
                // console.log(err)
            }
            window.getSelection().removeAllRanges()
        },
        async generateKey(){
            // console.log('generate key...')
            this.loadingBtnGenerate = true
			await api({
				method: 'get',
				url: config.chatApi +'auth/preferences/generate-key/' + this.ruleForm.phone_number
			}).then(result => {
				if(result.data.ec == 200){
                    this.api_key = result.data.data.key
				} else {
                    // this.showAlertError = true
                    this.$message.error({
                        showClose: true,
                        duration: 3000,
                        message: "Failed generate key"
                    });
				}
			}).catch(error => {
                // this.showAlertError = true
                this.$message.error({
                    showClose: true,
                    duration: 3000,
                    message: "Failed generate key"
                });
            })
            this.loadingBtnGenerate = false
        },
        async loadWA() {
            this.loadingPage = true
			await api({
				method: 'post',
				url: config.baseApi +'user/detail/number'
			}).then(result => {
				if(result.data.ec == 200){
                    this.phoneNumberList = result.data.data
                    this.ruleForm.phone_number = this.phoneNumberList[0]
				} else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
					this.showAlert = true
				} else {
					this.showAlertError = true
				}
			}).catch(error => {
				this.showAlertError = true
            })
            this.loadingPage = false
        },
        async loadPreferences() {
            this.loadingDetail = true
			await api({
				method: 'get',
				url: config.chatApi +'auth/preferences/' + this.ruleForm.phone_number
			}).then(result => {
				if(result.data.ec == 200){
                    this.ruleForm.greeting = result.data.data.greeting
                    this.autoClose = result.data.data.autoClose ? "on" : "off"
                    this.api_key = result.data.data.api_key
                    this.alwaysOnline = result.data.data.alwaysOnline
                    this.isSubscribe = true
                    this.ruleForm.max_load = result.data.data.max_load
                    this.ruleForm.masking_phone = result.data.data.masking_phone == undefined ? true : result.data.data.masking_phone
                    this.ruleForm.only_show_group_ticket = result.data.data.only_show_group_ticket == undefined ? false : result.data.data.only_show_group_ticket
                    this.ruleForm.ticket_rating_enabled = result.data.data.ticket_rating_enabled == undefined ? false : result.data.data.ticket_rating_enabled
                } else{
                    if(result.data.message == 'not_subscribe'){
                        this.isSubscribe = false
                    }
                }
			}).catch(error => {
				// this.showAlertError = true
            })
            this.loadingDetail = false
        },
        updatePreferences(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.loadingBtn = true
                    let preferenceData = {
                        greeting: this.ruleForm.greeting,
                        autoClose: this.autoClose,
                        max_load: this.ruleForm.max_load,
                        masking_phone: this.ruleForm.masking_phone,
                        only_show_group_ticket: this.ruleForm.only_show_group_ticket,
                        ticket_rating_enabled: this.ruleForm.ticket_rating_enabled
                    }
                    await api({
                        method: 'patch',
                        url: config.chatApi +'auth/preferences/' + this.ruleForm.phone_number,
                        data: preferenceData
                    }).then(result => {
                        if(result.data.ec == 200){
                            this.$swal(this.$t('success'), this.$t('success'), "success").then(confirm => {
                                this.loadPreferences()
                            })
                        } else{
                            this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                        }
                    }).catch(error => {
                        // this.showAlertError = true
                        this.$swal(this.$t('error'), this.$t('error_text'), "error")
                    })
                    this.loadingBtn = false
                } else {
                    return false
                }
            })
            
        }
    },
    async mounted() {
        await this.loadWA()
        this.loadPreferences()
    }
}
</script>