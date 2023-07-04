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
        <div>
			<el-dialog title="New Quick Reply" :visible.sync="dialogNew" width="40%">
                <el-form ref="form" :model="newForm" label-width="120px">
                    <el-form-item label="Quick Reply">
                        <el-input type="text" autofocus="true" placeholder="Greeting" max="50" v-model="newForm.title"></el-input>
                        <span style="float: right; font-size: 10px">{{ newForm.title.length }}/50 character(s)</span>
                    </el-form-item>
                    <el-form-item label="Quick Reply">
                        <el-input type="textarea" autofocus="true" rows="6" max="1000" placeholder="Hello, this is new quick reply!" v-model="newForm.quickReply"></el-input>
                        <span style="float: right; font-size: 10px">{{ newForm.quickReply.length }}/1000 character(s)</span>
                    </el-form-item>
                </el-form>
				<span slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="loadingBtn" @click="quickReplyAdd">Add</el-button>
					<el-button @click="dialogNew = false">Close</el-button>
				</span>
			</el-dialog>
		</div>
        <div>
			<el-dialog title="Edit Quick Reply" :visible.sync="dialogEdit" width="40%">
                <el-form ref="form" :model="editForm" label-width="120px">
                    <el-form-item label="Quick Reply">
                        <el-input type="text" autofocus="true" placeholder="Greeting" max="50" v-model="editForm.title"></el-input>
                        <span style="float: right; font-size: 10px">{{ editForm.title.length }}/50 character(s)</span>
                    </el-form-item>
                    <el-form-item label="Quick Reply">
                        <el-input type="textarea" autofocus="true" max="1000" rows="6" placeholder="Hello, this is new quick reply!" v-model="editForm.quickReply"></el-input>
                        <span style="float: right; font-size: 10px">{{ editForm.quickReply.length }}/1000 character(s)</span>
                    </el-form-item>
                </el-form>
				<span slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="loadingBtn" @click="quickReplyUpdate"><i class="mdi mdi-content-save"/> {{ $t('generic.update') }}</el-button>
					<el-button @click="dialogEdit = false">Close</el-button>
				</span>
			</el-dialog>
		</div>
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
                            <h5>Quick Reply</h5>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mt-10">
                            <el-button class="button-new-tag" @click="newQuickClicked">+ New Quick Reply</el-button>
                            <el-table :data="quickReply" style="width: 100%">
                                <el-table-column prop="title" label="Title" ></el-table-column>
                                <el-table-column prop="quickReply" label="Text" >
                                    <template slot-scope="sc">
                                        <el-tooltip class="item" effect="dark" :open-delay="3000" :content="sc.row.quickReply" placement="top">
                                            <span>{{ concatText(sc.row.quickReply) }}</span>  
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="quickReply" label="#" width="200">
                                    <template slot-scope="sc">
                                        <el-button type="primary" icon="el-icon-edit" circle @click="editQuickReply(sc.$index)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteQuickReply(sc.$index)"></el-button>
                                    </template>
                                </el-table-column>
                                <template slot="empty" style="height: 400px">
                                    <p align="center" style="color: #909399">
                                        <img src="@/assets/images/no_data@3x.png" width="100">
                                        <br/>You do not have any quick reply
                                    </p>
                                </template>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-20" v-if="isSubscribe">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <!-- <el-button type="primary" :loading="loadingBtn" @click="updatePreferences">Update</el-button> -->
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
            loadingBtn: false,
            loadingDetail: false,
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
            selectedDay: [],
            quickReply: [],
            newForm: {
                title: "",
                quickReply: ""
            },
            dialogNew: false,
            editForm: {
                title: "",
                quickReply: ""
            },
            dialogEdit: false
        }
    },
    methods: {
        concatText(string){
            return string.length > 50 ? string.substring(0, 50) + "..." : string
        },
        newQuickClicked(){
            this.dialogNew = true
        },
        async quickReplyAdd(){
            let findTitle = _.find(this.quickReply, (v) => {
                return v.title == this.newForm.title
            })
            if(findTitle){
                this.$message.warning({
                    showClose: true,
                    duration: 5000,
                    message: this.$t('helpdesk.quickReply.exist')
                })
            } else{
                let temp = Object.assign({}, this.newForm)
                this.quickReply.push(temp)
                let index = this.quickReply.length - 1
                this.newForm = {
                    title: "",
                    quickReply: ""
                }
                await this.updatePreferences('', index)
                this.dialogNew = false
            }
        },
        async quickReplyUpdate(){
            let findTitle = _.find(this.quickReply, (v) => {
                return v.title == this.editForm.title
            })
            let findIndex = _.findIndex(this.quickReply, (v) => {
                return v.title == this.editForm.title
            })
            if(findTitle && this.editForm.index != findIndex){
                this.$message.warning({
                    showClose: true,
                    duration: 5000,
                    message: this.$t('helpdesk.quickReply.exist')
                })
            } else{
                let temp = Object.assign({}, this.editForm)
                let index = this.editForm.index
                this.quickReply[index] = {
                    title: temp.title,
                    quickReply: temp.quickReply
                }
                let tempQuick = Object.assign([], this.quickReply)
                this.quickReply = []
                this.quickReply = tempQuick
                this.editForm = {
                    title: "",
                    quickReply: ""
                }
                await this.updatePreferences('update', index)
                this.dialogEdit = false
            }
        },
        editQuickReply(index){
            this.editForm = Object.assign({}, this.quickReply[index])
            this.editForm.index = index
            this.dialogEdit = true
        },
        deleteQuickReply(index){
            this.$swal({
                title: this.$t('delete_confirmation'),
                text: "Delete this quick reply?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.$t('delete_confirmation_button'),
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    this.quickReply.splice(index, 1)
                    return api({
                        method: 'patch',
                        url: config.chatApi +'auth/preferences/' + this.form.phone_number,
                        data: {
                            quickReply: this.quickReply,
                            index: index,
                            delete: true
                        }
                    }).then(result => {
                        return result
                    })
                }
            }).then((result) => {
                if(result.data.ec == 200){
                    this.$swal(this.$t('success'), this.$t('success'), "success").then(confirm => {
                    })
                    this.loadPreferences()
                } else{
                    this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                }
                this.loadingBtn = false
            })
        },
        changeFilter(){
            this.loadPreferences()
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
                    this.quickReply = result.data.data.quickReply || []
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
        async updatePreferences(query, index){
            this.loadingBtn = true
            let preferenceData = {
                quickReply: this.quickReply
            }

            if (query == 'update') {
                preferenceData.update = true
            }

            preferenceData.index = index

			await api({
				method: 'patch',
                url: config.chatApi +'auth/preferences/' + this.form.phone_number,
                data: preferenceData
			}).then(result => {
                this.dialogNew = false
				if(result.data.ec == 200){
                    this.$swal(this.$t('success'), this.$t('success'), "success").then(confirm => {
                    })
                        // this.loadPreferences()
                } else{
                    this.$swal(this.$t('error'), this.$t('error_text'), "warning")
                }
			}).catch(error => {
                this.dialogNew = false
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
<style>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-bottom: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .el-table__empty-block {
        height: 200px !important
    }
</style>