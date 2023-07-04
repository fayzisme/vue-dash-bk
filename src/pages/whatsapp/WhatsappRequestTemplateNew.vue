<template>
	<div class="scrollable only-y" v-loading="loadingPage">
        <div class="page-header">
			<h1>Whatsapp Request Template</h1>
		</div>
        <el-card v-if="showAlertError" style="margin-bottom: 1em">
			<error-gope />
		</el-card>
        <el-card v-if="showAlertMessage" align="center" style="margin-bottom: 1em">
            <h2>Start messaging your customers today</h2>
            <span v-html="$t('promote.desc.whatsapp')"></span>
            <br/><br/>
            <span><el-button @click="mailto()">Send us e-mail</el-button></span>
        </el-card>
        <el-card v-if="showFormMessage && !showAlertError" style="margin-bottom: 1em" class="mt-10">
            <el-row :gutter="30" class="mt-0">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-card class="mb-20" style="background-color:beige">
                        <el-row :gutter="30" class="mt-0 mb-20">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <p class="font-size-12">
                                    <b>*Note: </b><br /><br />
                                    When creating a Message Template, you must have the following:
                                    <ol>
                                        <li>Message Template name — Can only contain lowercase alphanumeric characters and underscores ( _ ). No other characters or white space are allowed. </li>
                                        <li>Message Template in the correct format — Should be a string where the variables are replaced with <b v-html="'{{#}}'"></b> where the number represents the variable index. Note: Variables must begin at <b v-html="'{{1}}'"></b>.</li>
                                    </ol>
                                    Example: <br />
                                    <pre style="word-wrap: break-word; white-space: pre-wrap !important" class="font-size-12" v-html="'Your order {{1}} for a total of {{2}} is confirmed. The expected delivery is {{3}}.'" />
                                </p>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-card>
                        <el-row :gutter="30">
                            <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                                <h5>Company Name</h5>
                            </el-col>
                            <el-col :xs="16" :sm="16" :md="16" :lg="20" :xl="20" class="mt-10">
                                <el-input type="text" disabled="disabled" v-model="data.company" placeholder="Insert your company name"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                                <h5>Template Name</h5>
                            </el-col>
                            <el-col :xs="16" :sm="16" :md="16" :lg="20" :xl="20" class="mt-10">
                                <el-input type="text" onkeypress="return ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 94 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32 || (event.charCode >= 48 && event.charCode <= 57));" onkeyup="this.value = this.value.toLowerCase();" @keydown.native.space.prevent v-model="data.template_name" placeholder="Lowercase letters, numbers, and underscores"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                                <h5>Category</h5>
                            </el-col>
                            <el-col :xs="16" :sm="16" :md="16" :lg="20" :xl="20" class="mt-10">
                                <template>
                                    <el-select v-model="data.template_category" placeholder="Select Message Type" style="width: 100%;" filterable>
                                        <el-option
                                        v-for="item in options_of_category"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card class="mt-20">
                        <template v-for="(o, i) in data.detail">
                            <el-row :gutter="30">
                                <el-col :xs="10" :sm="10" :md="10" :lg="7" :xl="7">
                                    <el-card shadow="never">
                                        <h5>Language</h5>
                                        <el-select v-model="data.detail[i].language" placeholder="Select Language" style="width: 100%;" filterable>
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-card>
                                </el-col>
                                <el-col :xs="14" :sm="14" :md="14" :lg="17" :xl="17">
                                    <el-card shadow="never">
                                        <h3>Header (Optional)</h3>
                                        <p style="font-size: 12px;">Add the title or choose which type of media you'll use for this header.</p>
                                        <el-select v-model="data.detail[i].header.type" placeholder="Header Type" style="width: 140px;" filterable>
                                            <el-option
                                                v-for="item in header_type"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-input v-if="data.detail[i].header.type=='text'" placeholder="Enter text header" class="mt-10" style="width:100%" v-model="data.detail[i].header.data"></el-input>
                                        <div v-else-if="data.detail[i].header.type=='media'" class="mt-10">
                                            <el-radio-group v-model="data.detail[i].header.data">
                                                <el-radio :label="1" border>Image</el-radio>
                                                <el-radio :label="2" border>Document</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </el-card>
                                    <el-card class="mt-10" shadow="never">
                                        <h3>Body</h3>
                                        <p style="font-size: 12px;">Enter the text for your message in the language you've selected.</p>
                                        
                                        <el-input v-if="data.detail[i].header.type != 'none' || data.detail[i].footer != ''" type="textarea" :maxlength="data.max2" rows="8" v-model="data.detail[i].messages" placeholder="Insert template message request"></el-input>

                                        <el-input v-else type="textarea" :maxlength="data.max" rows="8" v-model="data.detail[i].messages" placeholder="Insert template message request"></el-input>

                                        <div v-if="data.detail[i].header.type != 'none' || data.detail[i].footer != ''" v-text="(data.max2 - data.detail[i].messages.length)"></div>

                                        <div v-else v-text="(data.max - data.detail[i].messages.length)"></div>
                                        <el-button @click="addParameter(i)" size="small" style="float: right; position: relative; bottom: 10px;">+ Parameter</el-button>
                                        <!-- <el-button @click="decParameter(i)" size="small" style="float: right; position: relative; bottom: 10px;">-</el-button> -->
                                    </el-card>
                                    <el-card class="mt-10" shadow="never">
                                        <h3>Footer (Optional)</h3>
                                        <p style="font-size:12px;">Add a short line of text to the bottom of your message template.</p>
                                        <el-input placeholder="Enter text" v-model="data.detail[i].footer"></el-input>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <div class="mt-20 mb-120">
                                <el-button v-if="data.detail.type=='null'" type="danger" style="display: none; float:right;" @click="data.detail.splice(i, 1)"><i class="mdi mdi-delete"/></el-button>
                                <el-button v-else type="danger" style="float:right;" @click="data.detail.splice(i, 1)"><i class="mdi mdi-delete"/></el-button>
                            </div>
                        </template>
                        <el-button type="primary" @click="clickAddLang"><i class="mdi mdi-plus"/> Add Language
                        </el-button>
                    </el-card>
                    <el-button type="success" class="mt-20" style="float:right;" @click="createTemplate" :loading="buttonLoading"><i class="mdi mdi-check-circle"/> Submit</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card v-if="showFormMessage && !showAlertError" style="margin-bottom: 1em">
            <el-card v-if="showAlertError" style="margin-bottom: 1em">
                <error-gope />
            </el-card>
            <el-table v-if="showAlertError == false" :data="tempList" style="width: 100%; font-size: 12px; color: #000 !important" v-loading="loadingTable" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(246, 246, 245, 0.8)">
                <el-table-column prop="name" label="Template Name" width="300"/>
                <el-table-column prop="category" label="Category" width="200"/>
                <el-table-column label="Language" width="200">
                    <template slot-scope="scope">
                        <el-tag class="mr-5 ml-5" v-for="(a, b) in scope.row.language" :key="b" :type="scope.row.status[b]=='APPROVED'?'success':scope.row.status[b]=='PENDING'?'warning':'danger'">
                            <span v-if="scope.row.status[b]=='APPROVED'">
                                <el-tooltip placement="top">
                                    <div slot="content">APPROVED</div>
                                    <i style="color:green;" class="mdi mdi-brightness-1"></i>
                                </el-tooltip>
                                {{a}}
                            </span>
                            <span v-else-if="scope.row.status[b]=='REJECTED'">
                                <el-tooltip placement="top">
                                    <div slot="content">REJECTED</div>
                                    <i style="color:red;" class="mdi mdi-brightness-1"></i>
                                </el-tooltip>
                                {{a}}
                            </span>
                            <span v-else>
                                <el-tooltip placement="top">
                                    <div slot="content">PENDING</div>
                                    <i style="color:orange;" class="mdi mdi-brightness-1"></i>
                                </el-tooltip>
                                {{a}}
                            </span>
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Preview" width="370">
                    <template slot-scope="scope">
                        <el-tooltip>
                            <div class="tooltip" style="font-size: 12px; line-height: 18px; width: 250px;" slot="content">{{ scope.row.message }}</div>
                            <p style="font-size:12px;">{{ scope.row.message.substring(0, 40) }}...</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="Operations" width="120">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" @click="deleteTemplate(scope.row.name)"><i class="mdi mdi-delete"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div align="center">
                <el-button type="text" v-if="aftercursor != null" @click="getBussinessTemplate(aftercursor)">See more</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
import api from '@/networkClient'
import config from '@/config'
import store from '@/store'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
    data() {
        return {
            counter: 1,
            showAlertError: false,
            showFormMessage: false,
            showAlertMessage: false,
            buttonLoading: false,
            dialogFormVisible: false,
            loadingLoadBussinessTemplate: false,
            loadingBtnDeleteBussinessTemplate: false,
            loadingPage: false,
            loadingTable: false,
            data: {
                max: 1024,
                max2: 160,
                action: 'insert',
                company: store.getters.companyName,
                company_id: store.getters.customerID,
                category: '',
                template_name: '',
                template_type: 'BODY',
                template_category: '',
                detail: [{
                    language: '',
                    messages: '',
                    header: {
                        type: "none",
                        data: null
                    },
                    footer: ""
                }],
                choose_header_type: '',
                text: '',
                media: 1,
                header: '',
                footer: '',
                template_message: '',
                template_language: '',
                status: 'PENDING'
            },
            choose_header_type: '',
            header_type: [{
                value: 'none',
                label: 'None'
            },{
                value: 'media',
                label: 'Media'
            },{
                value: 'text',
                label: 'Text'
            }],
            media: 1,
            operations: {
                templateDialogDeleted: false,
                template_selected_to_delete: ''
            },
            aftercursor: null,
            bussinessTemplate: [{ bussinessTemplate: [] }],
            requestTemplateList: [],
            bussinessTemplateList: [],
            tempList: [],
            options: [{ value: 'af', label: 'Afrikaans' }, { value: 'sq', label: 'Albanian' }, { value: 'ar', label: 'Arabic' }, { value: 'az', label: 'Azerbaijani' }, { value: 'bn', label: 'Bengali' }, { value: 'bg', label: 'Bulgarian' },{ value: 'ca', label: 'Catalan' }, { value: 'zh_CN', label: 'Chinese (CHN)' }, { value: 'zh_HK', label: 'Chinese (HKG)' }, { value: 'zh_TW', label: 'Chinese (TAI)' }, { value: 'hr', label: 'Croatian' }, { value: 'cs', label: 'Czech' }, { value: 'da', label: 'Danish' }, { value: 'nl', label: 'Dutch' }, { value: 'en', label: 'English' }, { value: 'en_GB', label: 'English (UK)' }, { value: 'en_US', label: 'English (US)' }, { value: 'et', label: 'Estonian' }, { value: 'fil', label: 'Filipino' },{ value: 'fi', label: 'Finnish' }, { value: 'fr', label: 'French' }, { value: 'de', label: 'German' }, { value: 'el', label: 'Greek' }, { value: 'gu', label: 'Gujarati' },{ value: 'he', label: 'Hebrew' }, { value: 'hi', label: 'Hindi' }, { value: 'hu', label: 'Hungarian' }, { value: 'id', label: 'Indonesian' }, { value: 'ga', label: 'Irish' }, { value: 'it', label: 'Italian' }, { value: 'ja', label: 'Japanese' }, { value: 'kn', label: 'Kannada' }, { value: 'kk', label: 'Kazakh' }, { value: 'ko', label: 'Korean' }, { value: 'lo', label: 'Lao' }, { value: 'lv', label: 'Latvian' }, { value: 'lt', label: 'Lithuanian' }, { value: 'mk', label: 'Macedonian' }, { value: 'ms', label: 'Malay' },{ value: 'mr', label: 'Marathi' }, { value: 'nb', label: 'Norwegian' }, { value: 'fa', label: 'Persian' }, { value: 'pl', label: 'Polish' }, { value: 'pt_BR', label: 'Portuguese (BR)' }, { value: 'pt_PT', label: 'Portugues (POR)' }, { value: 'pa', label: 'Punjabi' }, { value: 'ro', label: 'Romanian' }, { value: 'ru', label: 'Russian' }, { value: 'sr', label: 'Serbian' }, { value: 'sk', label: 'Slovak' }, { value: 'sl', label: 'Slovenian' }, { value: 'es', label: 'Spanish' }, { value: 'es_AR', label: 'Spanish (ARG)' }, { value: 'es_ES', label: 'Spanish (SPA)' }, { value: 'es_MX', label: 'Spanish (MEX)' }, { value: 'sw', label: 'Swahili' }, { value: 'sv', label: 'Swedish' }, { value: 'ta', label: 'Tamil' }, { value: 'te', label: 'Telugu' }, { value: 'th', label: 'Thai' }, { value: 'tr', label: 'Turkish' }, { value: 'uk', label: 'Ukrainian' }, { value: 'ur', label: 'Urdu' }, { value: 'uz', label: 'Uzbek' }, { value: 'vi', label: 'Vietnamese' }],
            options_of_type: [{
                value: 'HEADER',
                label: 'HEADER'
            }, {
                value: 'BODY',
                label: 'BODY'
            }, {
                value: 'FOOTER',
                label: 'FOOTER'
            }, {
                value: 'BUTTONS',
                label: 'BUTTONS'
            }],
            options_of_category: [{
                value: 'ACCOUNT_UPDATE',
                label: 'ACCOUNT_UPDATE'
            }, {
                value: 'PAYMENT_UPDATE',
                label: 'PAYMENT_UPDATE'
            }, {
                value: 'PERSONAL_FINANCE_UPDATE',
                label: 'PERSONAL_FINANCE_UPDATE'
            }, {
                value: 'SHIPPING_UPDATE',
                label: 'SHIPPING_UPDATE'
            }, {
                value: 'RESERVATION_UPDATE',
                label: 'RESERVATION_UPDATE'
            }, {
                value: 'ISSUE_RESOLUTION',
                label: 'ISSUE_RESOLUTION'
            }, {
                value: 'APPOINTMENT_UPDATE',
                label: 'APPOINTMENT_UPDATE'
            }, {
                value: 'TRANSPORTATION_UPDATE',
                label: 'TRANSPORTATION_UPDATE'
            }, {
                value: 'TICKET_UPDATE',
                label: 'TICKET_UPDATE'
            }, {
                value: 'ALERT_UPDATE',
                label: 'ALERT_UPDATE'
            }],
        }
    },
    methods: {
        addParameter(i){
            var paramet = this.counter++;
            this.data.detail[i].messages += '{{'+paramet+'}}'
            // console.log(paramet)
        },
        // decParameter(i){
        //     var paramet = this.counter--;
        //     this.data.detail[i].messages -= '{{'+paramet+'}}'
        //     console.log(paramet)
        // },
        clickAddLang(){
            this.data.detail.push({
                    language: '',
                    messages: '',
                    header: {
                        type: "none",
                        data: null
                    },
                    footer: null
                })
        },
        formatDate(val, format){
            return moment(val).format(format)
        },

        templateDialogDeleted(key){
            this.operations.templateDialogDeleted = true
            this.template_selected_to_delete = this.bussinessTemplateList[0].name
        },
        
        async getBussinessTemplate(after = null){
            this.loadingTable = this.loadingPage = true
            await api({
                method: 'get',
                url: 'bussiness/message-template',
                params: {
                    after: after != null ? after : undefined
                }
            }).then(result => {
                if(result.data.ec == 200){
                    let data = result.data.data.data
                    if(data.length > 0){
                       let temp = _.chain(result.data.data.data).groupBy("name").map(function(v, i) {
                            return {
                                name: i,
                                language: _.map(v, 'language'),
                                status: _.map(v, 'status'),
                                category: v[0].category,
                                message: v[0].components.find(t => t.type.toLowerCase() == "body").text
                            }
                        }).value();
                        _.forEach(temp, val => {
                            this.tempList.push(val)
                            // console.log('val',val)
                        })
                        this.aftercursor = result.data.data.paging.cursors.after
                    } else {
                        this.aftercursor = null
                    }
                } else{
                    this.showAlertError = true
                }
            }).catch(error => {
                // console.log(error)
                this.showAlertError = true
            })
            this.loadingTable = this.loadingPage = false
        },

        async createTemplate(){
            if(_.isEmpty(this.data.template_name) || _.isEmpty(this.data.detail[0].language) || _.isEmpty(this.data.template_category)){
                this.$message.error({
                    showClose: false,
                    message: 'All field is required'
                });
                return
            }

            this.buttonLoading = true
            await api({
                method: 'post',
                url: 'bussiness/message-template/create',
                data: {
                    companyName: this.data.company,
                    category: this.data.template_category,
                    name: this.data.template_name,
                    type: this.data.template_type,
                    detail: this.data.detail
                }
            }).then(result => {
                // console.log(result.data)
                var res = result.data.data
                if(res.length > 0){
                    this.$swal(this.$t('error'), 'Content in This Language Already Exists', "error")
                } else {
                    this.$swal(this.$t('success'), this.$t('whatsapp.createTemplate.success'), "success").then(() => {
                        this.clear()
                        this.getBussinessTemplate()
                    })
                }
                // res.forEach(element => {
                //     console.log('this element',element)
                //     if(element.language){
                //         this.$swal(this.$t('error'), 'Content in This Language Already Exists', "error")
                //     } else {
                //         this.$swal(this.$t('success'), this.$t('whatsapp.createTemplate.success'), "success").then(() => {
                //             this.clear()
                //             this.getBussinessTemplate()
                //         })
                //     }
                // });
                
                // res.forEach(element => {
                //     console.log(element.reason)
                //     if(element.reason == 'general error'){
                //         this.$swal(this.$t('error'), 'Content in This Language Already Exists', "error")
                //     } else {
                //         this.$swal(this.$t('success'), this.$t('whatsapp.createTemplate.success'), "success").then(() => {
                //             this.clear()
                //             this.getBussinessTemplate()
                //         })
                //     }  
                // });
                // if(result.data.ec == 200){
                //     this.$swal(this.$t('success'), this.$t('whatsapp.createTemplate.success'), "success").then(() => {
                //         this.clear()
                //         this.getBussinessTemplate()
                //     })
                // } else {
                //     this.$swal(this.$t('error'), this.$t('whatsapp.createTemplate.failed'), "error")
                // }
            }).catch(error => {
                this.$swal(this.$t('error'), this.$t('error_text'), "error")
                // console.log(error)
            })
            this.buttonLoading = false
        },

        async getTemplateRequest(){
            this.loadingTable = true
            await api({
                method: 'post',
                url: 'whatsapp/get-request-template',
            }).then(result => {
                // console.log(result)
                if(result.data.ec == 200){
                    this.requestTemplateList = _.sortBy(result.data.data.template, (t) => {
                        return t.Timestamp
                    }).reverse()
                } else{
                    this.showAlertError = true
                }
            }).catch(error => {
                // console.log(error)
                this.showAlertError = true
            })
            this.loadingTable = false
        },

        async sendRequestTemplate(){
            if(_.isEmpty(this.data.template_name) || _.isEmpty(this.data.template_message)){
                this.$message.error({
                    showClose: false,
                    message: 'All field is required'
                });
                return
            }
            this.buttonLoading = true
            await api({
                method: 'post',
                url: 'whatsapp/request-template',
                data: {
                    template_name: this.data.template_name,
                    template_message: this.data.template_message
                }
            }).then(result => {
                // console.log(result.data.message)
                if(result.data.ec == 200){
                    this.$swal(this.$t('success'), this.$t('whatsapp.requestTemplate.success'), "success").then(() => {
                        this.clear()
                        this.getTemplateRequest()
                    })
                } else {
                    this.$swal(this.$t('error'), this.$t('whatsapp.requestTemplate.failed'), "error").then()
                }
            }).catch(error => {
                this.$swal(this.$t('error'), this.$t('error_text'), "error").then()
                // console.log(error)
            })
            this.buttonLoading = false
        },

        clear(){
            this.data.template_name = ''
            this.data.template_category = ''
            this.data.detail = [{
                language: '',
                messages: '',
                header: {
                    type: "none",
                    data: null
                },
                footer: null
            }]
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
                    this.showFormMessage = true
                } else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
                    this.showAlertMessage = true
                } else if(result.data.ec == 500){
                    this.showAlertError = true  
                }
                // this.loadingPage = false
            }).catch(error => {
                this.showAlertError = true
                this.loadingPage = false
            })
        },

        async deleteTemplate(name){
			this.loadingBtnDeleteBussinessTemplate = true
			this.$confirm('This will permanently delete the template. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
			}).then(() => {
                this.loadingTable = true
                this.loadingLoadBussinessTemplate = true
				this.loadingBtnDeleteBussinessTemplate = true
				api({
					url: config.baseApi + 'bussiness/message-template/delete',
					method: 'post',
					data:{
						name: name
					}
				}).then(res => {
					if(res.data.ec != 200){
                        this.$message({
                            type: 'error',
                            message: 'Error'
                        });
					} else {
						// 
						this.$message({
							type: 'success',
							message: 'Delete completed'
						});
                        this.clear()
                        this.loadingTable = false
						this.dialogFormVisible = false
						this.getBussinessTemplate()
					}
				}).catch(err => {
					// console.log("Error",err)
				})
				this.loadingBtnDeleteBussinessTemplate = false
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Delete canceled'
				});
			});
			
			this.loadingBtnDelete = false
			this.loadingProduct = false
		}
    },
    async mounted(){
        // this.getTemplateRequest()
        await this.loadWa()
        if(this.showFormMessage){
            this.loadingPage = true
            await this.getBussinessTemplate()
            this.loadingPage = false
            // this.getTemplateRequest()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.tooltip{
    font-size: 14px;
    width: 200px;
}

@media (max-width: 1024px){
    .el-col-md-8 {
        width: 27%;
    }

    .el-col-md-16 {
        width: 73%;
    }

    .el-col-md-12 {
        width: 100%;
    }
}

</style>