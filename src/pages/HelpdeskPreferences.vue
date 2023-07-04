<template>
    <div class="scrollable only-y">
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
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Bot Asking Name</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="greeting.askName" />
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Bot Asking Question</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="greeting.askQuestion" />
                            <small style="font-size: 12px" v-html="note.askQuestion" />
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Bot Info Ticket</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="greeting.ticketAssign" />
                            <small style="font-size: 12px" v-html="note.ticketAssign" />
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Bot Close Ticket</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" v-model="greeting.ticketClose" />
                            <small style="font-size: 12px" v-html="note.ticketClose" />
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Auto Close Ticket</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20">
                            <el-switch v-model="autoClose" active-text="On" active-value="on" inactive-text="Off" inactive-value="off"></el-switch>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Always Online</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20">
                            <el-switch v-model="alwaysOnline" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false"></el-switch>
                            <el-row :gutter="30" class="mt-20" v-if="!alwaysOnline">
                                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="mt-10">
                                    <h5>Set Time</h5>
                                </el-col>
                                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20">
                                    <el-time-picker
                                        is-range
                                        start="08:00"
                                        end="17:00"
                                        v-model="onlineTime"
                                        format="HH:mm"
                                        step="00:30"
                                        range-separator="To"
                                        start-placeholder="Start time"
                                        end-placeholder="End time">
                                    </el-time-picker>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30" v-if="!alwaysOnline">
                                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                    <h5>Pick Day</h5>
                                </el-col>
                                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20">
                                    <el-checkbox-group v-model="selectedDay" v-for="i in [0,1,2,3,4,5,6]" :key="i">
                                        <el-checkbox :value="i" :label="i" class="mt-10" size="small">{{ $t('day.' + (i+1)) }}</el-checkbox>
                                    </el-checkbox-group>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Max Ticket Operator</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-input type="number" id="max_load" placeholder="Maximal ticket handled by operator" v-model="max_load" />
                            <small style="font-size: 12px">Info: Maximal count of ticket allowed to handle per Customer Service</small>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>API Key</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-input type="text" id="api_key" placeholder="Your API's key" readonly v-model="api_key">
                                <el-button slot="append" @click="copyToClipboard"><i class="mdi mdi-content-copy" /></el-button>
                                <el-button :loading="loadingBtnGenerate" slot="append" @click="generateKey"><i class="mdi mdi-key-variant" /> Generate</el-button>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-button type="primary" :loading="loadingBtn" @click="updatePreferences">Update</el-button>
                        </el-col>
                    </el-row>
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

import Push from 'push.js'
export default {
    data() {
        return {
            showAlert: false,
            showAlertError: false,
            showCard: true,
            loadingPage: false,
            loadingBtn: false,
            loadingDetail: true,
            form: {
                phone_number: ""
            },
            greeting: {
                askName: "",
                askQuestion: "",
                ticketAssign: "",
                ticketClose: ""
            },
            note: {
                askQuestion: "Note: Use {{name}} for specifying name",
                ticketAssign: "Note: Use {{name}} for specifying name and {{ticketNumber}} for specifying ticket number",
                ticketClose: "Note: Use {{ticketNumber}} for specifying ticket number"
            },
            max_load: 5,
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
                console.log(err)
            }
            window.getSelection().removeAllRanges()
        },
        async generateKey(){
            // console.log('generate key...')
            this.loadingBtnGenerate = true
			await api({
				method: 'get',
				url: config.chatApi +'auth/preferences/generate-key/' + this.form.phone_number
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
                    this.form.phone_number = this.phoneNumberList[0]
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
				url: config.chatApi +'auth/preferences/' + this.form.phone_number
			}).then(result => {
				if(result.data.ec == 200){
                    this.greeting = result.data.data.greeting
                    this.autoClose = result.data.data.autoClose ? "on" : "off"
                    this.api_key = result.data.data.api_key
                    this.alwaysOnline = result.data.data.alwaysOnline
                    this.isSubscribe = true
                    this.max_load = result.data.data.max_load || 5
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
        async updatePreferences(){
            this.loadingBtn = true
            let preferenceData = {
                greeting: this.greeting,
                autoClose: this.autoClose,
                api_key: this.api_key,
                alwaysOnline: this.alwaysOnline,
                max_load: parseInt(this.max_load)
            }

            if(this.alwaysOnline == false){
                preferenceData.onlineSchedule = this.onlineAt
            }

			await api({
				method: 'patch',
                url: config.chatApi +'auth/preferences/' + this.form.phone_number,
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
        }
    },
    async mounted() {
        await this.loadWA()
        this.loadPreferences()
    }
}
</script>

