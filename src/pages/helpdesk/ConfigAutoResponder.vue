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
                            <h5>Always Online</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20">
                            <el-switch v-model="alwaysOnline" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false"></el-switch>
                            <el-row :gutter="30" class="mt-20" v-if="!alwaysOnline" v-for="i in [1,2,3,4,5,6,7]" :key="i">
                                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="mt-10">
                                    <h5>{{ $t('day.' + i) }}</h5>
                                </el-col>
                                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20">
                                    <el-time-picker
                                        is-range
                                        start="08:00"
                                        end="17:00"
                                        @change="timePickerChange(onlineTime[i-1], i)"
                                        v-model="onlineTime[i-1]"
                                        format="HH:mm"
                                        step="00:30"
                                        range-separator="To"
                                        :disabled="timePickerDisabled[i-1]"
                                        start-placeholder="Start time"
                                        end-placeholder="End time">
                                    </el-time-picker>
                                    &nbsp;  <el-switch @change="setTimeAlways(timePickerDisabled[i-1], i)" v-model="timePickerDisabled[i-1]" active-text="24 Hours" :active-value="true" inactive-text="" :inactive-value="false"></el-switch>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe && alwaysOnline == false">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <h5>Bot Auto Responder Message</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-20">
                            <el-input :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" placeholder="Message your customer service currently available at some time" v-model="greeting.autoResponder"/>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-button type="primary" :loading="loadingBtn" @click="updatePreferences"><i class="mdi mdi-content-save"/> {{ $t('generic.update') }}</el-button>
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

import moment from 'moment-timezone'
import Push from 'push.js'
export default {
    data() {
        return {
            showAlert: false,
            showAlertError: false,
            showCard: true,
            loadingPage: false,
            loadingDetail: false,
            loadingBtn: false,
            form: {
                phone_number: ""
            },
            greeting: {
                askName: "",
                askQuestion: "",
                ticketAssign: "",
                ticketClose: "",
                autoResponder: "Sorry, we are currently offline. Please contact us again at 08:00 tommorow. Thank you!"
            },
            note: {
                askQuestion: "Note: Use {{name}} for specifying name",
                ticketAssign: "Note: Use {{name}} for specifying name and {{ticketNumber}} for specifying ticket number",
                ticketClose: "Note: Use {{ticketNumber}} for specifying ticket number"
            },
            isSubscribe: false,
            autoClose: false,
            api_key: "",
            phoneNumberList: [],
            loadingBtnGenerate: false,
            showAlertError: false,
            alwaysOnline: true,
            onlineTime: [],
            tempOnlineTime: [moment().set({ hour: 8, minute: 0, second: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0, second: 0 }).toLocaleString()],
            selectedDay: [],
            currentCheck: [],
            checkedDay: [],
            savedSchedule: [],
            currentSchedule: [],
            timePickerDisabled: [],
            availableDay: [1,2,3,4,5,6,7]
        }
    },
    methods: {
        removeDay(key, group){
            let selected = this.currentSchedule[group]
            let objKey = Object.keys(selected[key])

            this.availableDay.push(parseInt(objKey))
            this.checkedDay = _.remove(this.checkedDay, (v) => { return parseInt(v) != parseInt(objKey) })
            this.currentSchedule[group].splice(key, 1)
        },
        getKeys(obj){
            return Object.keys(obj)
        },
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
                    for(let greet in result.data.data.greeting){
                        if(typeof result.data.data.greeting[greet] != 'undefined'){
                            this.greeting[greet] = result.data.data.greeting[greet]
                        }
                    }
                    this.autoClose = result.data.data.autoClose ? "on" : "off"
                    this.api_key = result.data.data.api_key
                    this.alwaysOnline = typeof result.data.data.alwaysOnline != 'undefined' ? result.data.data.alwaysOnline : true
                    if(result.data.data.onlineSchedule){
                        if(result.data.data.onlineSchedule.length > 0){
                            this.selectedDay = result.data.data.onlineSchedule
                            for(let d in this.selectedDay){
                                let dt = this.selectedDay[d]
                                if(dt!= null){
                                    this.onlineTime[d] = [
                                        moment(dt[Object.keys(dt)].time[0]).toLocaleString(),
                                        moment(dt[Object.keys(dt)].time[1]).toLocaleString()
                                    ]
                                } else{
                                    this.onlineTime[i] = [moment().set({ hour: 8, minute: 0, second: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0, second: 0 }).toLocaleString()]
                                }
                                if(dt[Object.keys(dt)].readable == "00:00|23:59"){
                                    this.timePickerDisabled[d] = true
                                }
                            }
                        } else {
                            for(let i in [1,2,3,4,5,6,7]){
                                this.onlineTime[i] = [moment().set({ hour: 8, minute: 0, second: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0, second: 0 }).toLocaleString()]
                                this.timePickerDisabled[i] = false
                                this.selectedDay[i] = {
                                    [parseInt(i)+1]: {
                                        readable: moment(this.onlineTime[i][0]).format("HH:mm") + "|" + moment(this.onlineTime[i][1]).format("HH:mm"),
                                        time: [
                                            moment(this.onlineTime[i][0]).format(),
                                            moment(this.onlineTime[i][1]).format()
                                        ]
                                    }
                                }
                            }
                        }
                    } else{
                        for(let i in [1,2,3,4,5,6,7]){
                            this.onlineTime[i] = [moment().set({ hour: 8, minute: 0, second: 0 }).toLocaleString(), moment().set({ hour: 17, minute: 0, second: 0 }).toLocaleString()]
                            this.timePickerDisabled[i] = false
                            this.selectedDay[i] = {
                                [parseInt(i)+1]: {
                                    readable: moment(this.onlineTime[i][0]).format("HH:mm") + "|" + moment(this.onlineTime[i][1]).format("HH:mm"),
                                    time: [
                                        moment(this.onlineTime[i][0]).format(),
                                        moment(this.onlineTime[i][1]).format()
                                    ]
                                }
                            }
                        }
                    }
                    this.isSubscribe = true
                } else{
                    if(result.data.message == 'not_subscribe'){
                        this.isSubscribe = false
                    }
                }
			}).catch(error => {
                // console.log(error)
				// this.showAlertError = true
            })
            this.loadingDetail = false
        },
        async updatePreferences(){
            let preferenceData = {
                alwaysOnline: this.alwaysOnline,
                greeting: this.greeting
            }

            if(this.alwaysOnline == false){
                let t1 = moment().set({ hour: 0, minute: 0, second: 0 })
                let t2 = moment().set({ hour: 23, minute: 59, second: 0 })
                this.timePickerDisabled.forEach((el,i) => {
                    if(el === true){
                        this.selectedDay[i] = {
                            [i+1]: {
                                readable: t1.format("HH:mm") + "|" + t2.format("HH:mm"),
                                time: [
                                    t1.format(),
                                    t2.format()
                                ]
                            }
                        }
                    }
                })
                preferenceData.onlineSchedule = this.selectedDay
                if (this.greeting.autoResponder == ''|| this.greeting.autoResponder.trim() == '' || this.selectedDay.length != 7){
                    this.$message.error({
                        showClose: false,
                    message: 'All field is required'
                    });
                    return
                }
            } else{
                preferenceData.onlineSchedule = []
            }
            this.loadingBtn = true
            // console.log(preferenceData)
            
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
                this.loadingBtn = false
                this.$swal(this.$t('error'), this.$t('error_text'), "error")
            })
            
            this.loadingBtn = false
            
        },
        async setTimeAlways(value, i){
            if(value == true){
                let t1 = moment().set({ hour: 0, minute: 0, second: 0 })
                let t2 = moment().set({ hour: 23, minute: 59, second: 0 })
                this.onlineTime[i-1] = [ t1.toLocaleString(), t2.toLocaleString()]
                this.selectedDay[i-1] = {
                    [i]: {
                        readable: t1.format("HH:mm") + "|" + t2.format("HH:mm"),
                        time: [
                            t1.format(),
                            t2.format()
                        ]
                    }
                }
            } else {
                let t1 = moment().set({ hour: 8, minute: 0, second: 0 })
                let t2 = moment().set({ hour: 17, minute: 0, second: 0 })
                this.onlineTime[i-1] = [ t1.toLocaleString(), t2.toLocaleString()]
                this.selectedDay[i-1] = {
                    [i]: {
                        readable: t1.format("HH:mm") + "|" + t2.format("HH:mm"),
                        time: [
                            t1.format(),
                            t2.format()
                        ]
                    }
                }
            }
        },
        checkIfDis(i){
            return this.availableDay.indexOf(i) == -1
        },
        checkIfNull(sch){
            if(sch.length > 0) return true
            else return false
        },
        checkedChange(checked, input){
            let current = this.selectedDay
            let selectedTime = [ moment(this.onlineTime[0]).format("HH:mm"), moment(this.onlineTime[1]).format("HH:mm") ]
            let keyTime = selectedTime.join("|")
            let day = input.target.value
            let checkKey = Object.keys(this.selectedDay).indexOf(keyTime)
            if(checkKey != -1){
                let idx = _.findIndex(this.selectedDay[keyTime], (s) => { return Object.keys(s).toString() == day.toString() })
                if(idx == -1){
                    this.selectedDay[keyTime].push({ [day]: { time: [ moment(this.onlineTime[0]), moment(this.onlineTime[1]) ], readable: keyTime } })
                    this.selectedDay[keyTime] = _.sortBy(this.selectedDay[keyTime], (s) => { return Object.keys(s) })
                } else{
                    if(checked == false){
                        let deleteIndex = idx
                        this.selectedDay[keyTime].splice(deleteIndex, 1)
                        this.selectedDay[keyTime] = _.sortBy(this.selectedDay[keyTime], (s) => { return Object.keys(s) })
                    }
                }
            } else{
                if(typeof this.selectedDay[keyTime] == "undefined"){
                    this.selectedDay[keyTime] = []
                }
                this.selectedDay[keyTime].push({
                    [day]: { time: [ moment(this.onlineTime[0]), moment(this.onlineTime[1]) ], readable: keyTime }
                })
                this.selectedDay[keyTime].sort()
            }
        },
        timePickerChange(value, i){
            this.selectedDay[i-1] = {
                [i]: {
                    readable: moment(value[0]).format("HH:mm") + "|" + moment(value[1]).format("HH:mm"),
                    time: [
                        moment(value[0]).format(),
                        moment(value[1]).format()
                    ]
                }
            }
        }
    },
    watch: {
        onlineTime : function(){
            this.onlineTime.forEach(el => {
                if(el == null || el == undefined){
                    this.$message.error({
                    showClose: false,
                    message: 'All field is required'
                    });
                }
            });
        },
    },
    async mounted() {
        await this.loadWA()
        this.loadPreferences()
    }
}
</script>