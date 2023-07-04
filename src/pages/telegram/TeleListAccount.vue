<template>
    <div class="page-invoice scrollable">
        <div class="page-header">
			<h1>Telegram Account</h1>
		</div>
        <el-card v-if="showAlertError" style="margin-bottom: 1em">
            <error-gope-siji />
        </el-card>
        <el-card v-if="showAlertMessage" align="center">
            <h2>Start messaging your customers today</h2>
            <span v-html="$t('promote.desc.telegram')"></span>
            <br/><br/>
            <span><el-button @click="mailto()">Send us e-mail</el-button></span>
        </el-card>
        <div v-else>
            <el-card shadow="none" style="min-height: 450px;" v-loading="loadingData">
                <div class="mb-20">
                    <el-button v-if="disabledButton==true" disabled type="primary">Create Account</el-button>
                    <el-button v-else @click="modalCreated=true" type="primary">Create Account</el-button>
                </div>
                <!-- <div class="mb-20">
                    <el-pagination :page-size="10"
                        background
                        layout="prev, pager, next"></el-pagination>
                </div> -->
                <el-row :gutter="20" v-loading="loadingDelete">
                    <div v-if="listAccount==null" style="padding: 70px 0;text-align: center;">
                        <img src="@/assets/images/no_contact@3x.png" width="100" />
                        <br />Data not found
                    </div>
                    <el-col v-else v-for="(list, key) in listAccount" :key="key" :span="6">
                        <el-card shadow="none">
                            <div style="text-align: center; font-size:1.2vw; font-weight: 700">
                                {{ list.number }}
                            </div>
                            <div style="text-align: center; margin-bottom: 0px; padding: 20px;">
                                <span
                                    class="align-vertical-middle card-shadow--small dot"
                                    :style="'background-color:hsl(' + (360 * Math.random()) + ',' + (25 + 70 * Math.random()) + '%,' +  (85 + 10 * Math.random()) + '%);'"
                                    >
                                        <img src="../../assets/images/bot-mins.jpg" width="100%" style="mix-blend-mode: multiply;
">
                                </span>
                            </div>
                            <div style="text-align: center;">
                                <el-button type="text" size="medium" @click="detailAccount(list)">View</el-button>
                                <!-- <el-button type="text" size="medium"><i class="mdi mdi-pencil"></i></el-button> -->
                                <el-button type="text" size="medium" @click="deleteAccount(list)">Delete</el-button>
                                <!-- <el-button type="text" size="medium" @click="share(list)"><i class="mdi mdi-share"></i></el-button> -->
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-card>
            <!-- <template>
                <el-table
                    :data="listAccount" style="width: 100%">
                    <el-table-column
                        fixed
                        prop="bot"
                        label="Date"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="Name"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="State"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        label="City"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="Address"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="zip"
                        label="Zip"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="Operations"
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleClick" type="text" size="small">Detail</el-button>
                        <el-button type="text" size="small">Edit</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template> -->
        </div>
        <el-dialog :title="'Create New Account'" :visible.sync="modalCreated">
            <el-form ref="form" label-width="120px" label-position="top">
                <el-form-item label="Enter Your Bot Token">
                    <el-input type="textarea" v-model="form.bot_token" placeholder="Example: xxxxxxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="loadingCreate">Submit</el-button>
                    <el-button @click="modalCreated=false">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :title="'Detail '+selectedAccount.number" :visible.sync="modalDetail">
            <!-- <el-tabs tab-position="top" v-model="activeName">
                <el-tab-pane label="Bot" name="bot"> -->
                    <el-form ref="form" label-width="120px" label-position="top">
                        <el-form-item label="ID">
                            <el-input readonly v-model="selectedBot.id"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="Is Bot">
                            <el-input v-model="selectedBot.is_bot"></el-input>
                        </el-form-item> -->
                        <el-form-item label="First Name">
                            <el-input readonly v-model="selectedBot.first_name"></el-input>
                        </el-form-item>
                        <el-form-item label="Username">
                            <el-input readonly v-model="selectedBot.username"></el-input>
                        </el-form-item>
                        <el-form-item label="Can Join Group">
                            <el-input readonly v-model="selectedBot.can_join_groups"></el-input>
                        </el-form-item>
                        <el-form-item label="Can Read All Group Message">
                            <el-input readonly v-model="selectedBot.can_read_all_group_messages"></el-input>
                        </el-form-item>
                        <el-form-item label="Supports Inline Queries">
                            <el-input readonly v-model="selectedBot.supports_inline_queries"></el-input>
                        </el-form-item>
                    </el-form>
                <!-- </el-tab-pane> -->
                <!-- <el-tab-pane label="Greeting" name="greeting">
                    <el-form ref="form" label-width="120px" label-position="top">
                        <el-form-item label="Ask Name">
                            <el-input readonly v-model="selectedGreeting.askName" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="Ask Question">
                            <el-input readonly v-model="selectedGreeting.askQuestion" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="Ticket Assign">
                            <el-input readonly v-model="selectedGreeting.ticketAssign" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="Ticket Close">
                            <el-input readonly v-model="selectedGreeting.ticketClose" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Configuration" name="config">
                    <el-form ref="form" label-width="120px" label-position="top">
                        <el-form-item label="Phone Number">
                            <el-input readonly v-model="selectedDetail.phone_number"></el-input>
                        </el-form-item>
                        <el-form-item label="Masking Phone">
                            <el-input readonly v-model="selectedDetail.masking_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="Max Load">
                            <el-input readonly v-model="selectedDetail.max_load"></el-input>
                        </el-form-item>
                        <el-form-item label="Token">
                            <el-input readonly v-model="selectedDetail.token" type="textarea" :rows="5"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane> -->
            <!-- </el-tabs> -->
        </el-dialog>
    </div>
</template>

<script>
import api from '@/networkClient'
import config from '@/config'
import moment from 'moment'
import _ from 'lodash'

export default {
    name: "TelegramListAccount",
    data() {
        return {
            loadingData: false,
            loadingCreate: false,
            loadingDelete: false,
            activeName: 'bot',
            listAccount: [],
            listProduct: [],
            modalCreated: false,
            modalDetail: false,
            form: {
                bot_token: ''
            },
            selectedDetail: {},
            selectedAccount: {},
            selectedBot: {},
            selectedGreeting: {},
            selectedQuickReply: {},
            showAlertError: false,
            showAlertMessage: false,
            disabledButton: false
        }
    },
    methods: {
        async getListAccount(){
            this.loadingData = true
            await api({
                method: 'get',
                url: config.baseApi+'telegram'
            }).then(response => {
                if(response.data.ec == 400){
                    this.showAlertMessage = true
                } else {
                    this.listAccount = response.data.data.list
                    this.listProduct = response.data.data.product
                    this.disabledButton = response.data.data.is_limit
                }
                this.loadingData = false
            }).catch(error => {
                // console.log('error get list account',error)
            })
            this.loadingData = false
        },

        onSubmit(){
            if(this.form.bot_token == ''){
                this.$swal(this.$t("error"), "Plese enter your bot token!", "error");
                this.modalCreated = false
            } else {
                this.loadingCreate = true
                api({
                    method: 'post',
                    url: config.baseApi+'telegram',
                    data: {
                        bot_token: this.form.bot_token
                    }
                }).then(response => {
                    if(response.data.ec == 500){
                        this.$swal(this.$t("error"), this.$t("error_text"), "error");
                        this.modalCreated = false
                        this.form.bot_token = ''
                        this.loadingCreate = false
                    } else if(response.data.ec == 400) {
                        this.$swal(this.$t("error"), "This account is already integrated", "error");
                        this.modalCreated = false
                        this.form.bot_token = ''
                        this.loadingCreate = false
                    } else if(response.data.ec == 200) {
                        this.$swal(this.$t("success"), "New account has been created", "success");
                        this.modalCreated = false
                        this.form.bot_token = ''
                        this.getListAccount()
                        this.loadingCreate = false
                    }
                }).catch(error => {
                    this.$swal(this.$t("error"), this.$t("error_text"), "error");
                    // console.log('error create account',error)
                })
                // this.loadingCreate = false
            }
        },

        detailAccount(key){
            this.activeName = 'bot'
            let selected = _.find(this.listAccount, (v) => {
                return v.number == key.number
            })
            this.modalDetail = true
            this.selectedAccount = _.cloneDeep(selected)
            this.selectedDetail = Object.assign({}, key.detail)
            this.selectedBot = Object.assign({}, key.detail.bot)
            this.selectedGreeting = Object.assign({}, key.detail.greeting)
            this.selectedQuickReply = Object.assign({}, key.detail.quickReply)
        },

        share(key){
            // https://t.me/share/url?url={url}&text={text}
        },

        deleteAccount(key){
            this.$confirm('This will permanently delete the account. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    this.loadingDelete = true
                    api({
                        method: 'delete',
                        url: config.baseApi+'telegram',
                        data: {
                            bot_id: key.detail.bot.id
                        }
                    }).then(response => {
                        if(response.data.ec == 200) {
                            this.$swal(this.$t("success"), "Account has been deleted", "success");
                            this.getListAccount()
                            this.loadingDelete = false
                        } else {
                            this.$swal(this.$t("error"), this.$t("error_text"), "error");
                            this.loadingDelete = false
                        }
                    }).catch(error => {
                        this.$swal(this.$t("error"), this.$t("error_text"), "error");
                        // console.log('error delete account',error)
                    })
                    // this.$message({
                    //     type: 'success',
                    //     message: 'Delete completed'
                    // });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });          
            });
        }
    },
    mounted(){
        this.getListAccount()
    }
}
</script>

<style scoped>
.dot {
  height: 100px;
  width: 100px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>