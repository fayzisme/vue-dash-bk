<template>
	<div class="scrollable only-y">
        <div class="page-header">
			<h1>Whatsapp Request Template</h1>
		</div>
        <!-- <el-card v-if="showAlertError" style="margin-bottom: 1em">
			<error-gope />
		</el-card> -->
        <el-card v-if="showAlertMessage" align="center" style="margin-bottom: 1em">
            <h2>Start messaging your customers today</h2>
            <span v-html="$t('promote.desc.whatsapp')"></span>
            <br/><br/>
            <span><el-button @click="mailto()">Send us e-mail</el-button></span>
        </el-card>
        <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane label="Request" name="request">
                <div style="margin-bottom: 1em; box-shadow: none;" class="mt-10">
                    <el-row v-loading="loadingPage" :gutter="30" class="mt-0">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-card class="mb-20" style="background-color:beige; border: none; box-shadow: none;">
                                <el-row :gutter="30" class="mt-0 mb-20">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <p class="font-size-12">
                                            <b>*Note: </b><br /><br />
                                            When creating a Message Template, you must have the following:
                                            <ol>
                                                <li>Message Template name — Can only contain lowercase alphanumeric characters and underscores ( _ ). No other characters or white space are allowed. </li>
                                                <li>Message Template in the correct format — Should be a string where the variables are replaced with <b v-html="'{{#}}'"></b> where the number represents the variable index. Note: Variables must begin at <b v-html="'{{1}}'"></b>.</li>
                                                <li>
                                                    If you use the <b>headers</b> or <b>footers</b> on your message templates, then you can only enter <b>1024 character</b> message templates (included with the message parameters).
                                                </li>
                                                <li>
                                                    The Footer field can't have more than <b>60 characters</b>.
                                                </li>
                                            </ol>
                                            Example: <br />
                                            <pre style="word-wrap: break-word; white-space: pre-wrap !important" class="font-size-12" v-html="'Your order {{1}} for a total of {{2}} is confirmed. The expected delivery is {{3}}.'" />
                                        </p>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-card style="box-shadow: none;">
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
                                        <el-input type="text" @paste.native="handlePaste" onkeypress="return ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 94 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32 || (event.charCode >= 48 && event.charCode <= 57));" onkeyup="this.value = this.value.toLowerCase();" @keydown.native.space.prevent v-model="data.template_name" placeholder="Lowercase letters, numbers, and underscores"></el-input>
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
                            <el-card class="mt-20" style="box-shadow: none;">
                                <template v-for="(o, i) in data.detail">
                                    <el-row :gutter="30" :key="i">
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
                                                <el-select v-model="data.detail[i].header.type" @change="handleCangeHeader(i)" placeholder="Header Type" style="width: 140px;" filterable>
                                                    <el-option
                                                        v-for="item in header_type"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <el-input :onkeydown="validateParamHeader(i)" :onkeypress="validateParamHeader(i)" :onkeyup="validateParamHeader(i)" v-if="data.detail[i].header.type=='text'" placeholder="Enter text header" class="mt-10" style="width:100%" v-model="data.detail[i].header.data"></el-input>
                                                <div v-else-if="data.detail[i].header.type=='media'" class="mt-10">
                                                    <el-radio-group v-model="data.detail[i].header.data">
                                                        <el-radio :label="1" border>Image</el-radio>
                                                        <el-radio :label="2" border>Document</el-radio>
                                                        <el-radio :label="3" border>Video</el-radio>
                                                    </el-radio-group>
                                                </div>
                                            </el-card>
                                            <el-card class="mt-10" shadow="never">
                                                <h3>Body</h3>
                                                <p style="font-size: 12px;">Enter the text for your message in the language you've selected.</p>

                                                <el-input :onkeydown="validateParam(i)" :onkeypress="validateParam(i)" :onkeyup="validateParam(i)" v-if="data.detail[i].header.type != 'none' || data.detail[i].footer != ''" type="textarea" :maxlength="data.max" rows="8" v-model="data.detail[i].messages" placeholder="Insert template message request"></el-input>

                                                <el-input :onkeydown="validateParam(i)" :onkeypress="validateParam(i)" :onkeyup="validateParam(i)" v-else type="textarea" :maxlength="data.max" rows="8" v-model="data.detail[i].messages" placeholder="Insert template message request"></el-input>

                                                <div v-if="data.detail[i].header.type != 'none' || data.detail[i].footer != ''" v-text="(data.max - data.detail[i].messages.length)"></div>

                                                <div v-else v-text="(data.max - data.detail[i].messages.length)"></div>
                                                <!-- <el-button @click="addParameter(i)" size="small" style="float: right; position: relative; bottom: 10px;">+ Parameter</el-button> -->
                                                <!-- <el-button @click="removeParameter(i)" size="small" style="float: right; position: relative; bottom: 10px;">- Parameter</el-button> -->
                                            </el-card>
                                            <el-card class="mt-10" shadow="never">
                                                <h3>Footer (Optional)</h3>
                                                <p style="font-size:12px;">Add a short line of text to the bottom of your message template.</p>
                                                <el-input placeholder="Enter text" :maxLength="60" v-model="data.detail[i].footer"></el-input><br>
                                                <span style="font-size: 12px; color: red;">*Only 60 characters</span>
                                            </el-card>
                                            <el-card class="mt-10" shadow="never">
                                                <h3>Buttons (Optional)</h3>
                                                <p style="font-size: 12px;" v-if="data.detail[i].buttons.type=='none'">Create buttons that let customers responds to your message or take action.</p>
                                                <p style="font-size: 12px;" v-if="data.detail[i].buttons.type=='call'">Create up to 2 buttons that let customers responds to your message or take action.</p>
                                                <p style="font-size: 12px;" v-if="data.detail[i].buttons.type=='quick'">Create up to 3 buttons that let customers responds to your message or take action.</p>
                                                <el-select v-model="data.detail[i].buttons.type" placeholder="Button Type" style="width: 140px;" filterable>
                                                    <el-option
                                                        v-for="item in buttons_type"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <!-- Call Button -->
                                                <div class="row mb-100 mt-10" v-if="data.detail[i].buttons.type=='call'">
                                                    <el-row>
                                                        <el-col style="padding: 5px 0;" v-for="(bt, k) in data.detail[i].action" :key="k">
                                                        <div class="col-lg-3 mr-5" style="float: left;">
                                                            <p style="font-size: 12px;">Type of Action</p>
                                                            <el-select v-if="k == 0" style="width: 170px;" size="small" v-model="data.detail[i].action[k].type" placeholder="Button Type" filterable>
                                                                <el-option
                                                                    v-for="item in action_type"
                                                                    :key="item.value"
                                                                    :label="item.label"
                                                                    :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                            <el-select v-else style="width: 170px;" size="small" v-model="data.detail[i].action[k].type" placeholder="Button Type" filterable>
                                                                <el-option
                                                                    v-for="item in actfillter"
                                                                    :key="item.value"
                                                                    :label="item.label"
                                                                    :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                        <div class="col-lg-3 mr-5" style="float: left;">
                                                            <p style="font-size: 12px;">Button Text</p>
                                                            <el-input style="width: 90px;" size="small" placeholder="Enter text" v-model="data.detail[i].action[k].text"></el-input>
                                                        </div>
                                                        <!-- <div class="col-lg-3 mr-5" style="float: left;"> -->
                                                        <div class="col-lg-3 mr-5" style="float: left;" v-if="data.detail[i].action[k].type=='call'">
                                                            <p style="font-size: 12px;">Country</p>
                                                            <el-select style="width: 80px;" size="small" v-model="data.detail[i].action[k].country" placeholder="Country code" filterable>
                                                                <el-option
                                                                    v-for="item in country_code"
                                                                    :key="item.value"
                                                                    :label="item.label"
                                                                    :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                        <div class="col-lg-3 mr-5" style="float: left;" v-if="data.detail[i].action[k].type=='visit'">
                                                            <p style="font-size: 12px;">URL Type</p>
                                                            <el-select style="width: 80px;" size="small" v-model="data.detail[i].url[0].type" placeholder="URL Type" filterable>
                                                                <el-option
                                                                    v-for="item in url_type"
                                                                    :key="item.value"
                                                                    :label="item.label"
                                                                    :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                        <!-- <div class="col-lg-3" style="float: left;"> -->
                                                        <div class="col-lg-3" style="float: left;" v-if="data.detail[i].action[k].type=='call'">
                                                            <p style="font-size: 12px;">Phone Number</p>
                                                            <el-input style="width: 155px;" size="small" placeholder="Enter phone number" v-model="data.detail[i].action[k].phone"></el-input>
                                                        </div>
                                                        <div class="col-lg-3 mb-20" style="float: left;" v-if="data.detail[i].action[k].type=='visit'">
                                                            <p style="font-size: 12px;">Website URL</p>
                                                            <el-input v-if="data.detail[i].url[0].type == 'static'" style="width: 140px;" class="mr-5" size="small" :onkeydown="validateParamBtn(i,k)" :onkeypress="validateParamBtn(i,k)" :onkeyup="validateParamBtn(i,k)" :placeholder="'https://www.example.com'" v-model="data.detail[i].action[k].url"></el-input>
                                                            <el-input v-else style="width: 140px;" class="mr-5" size="small" :onkeydown="validateParamBtn(i,k)" :onkeypress="validateParamBtn(i,k)" :onkeyup="validateParamBtn(i,k)" :placeholder="'https://www.example.com/{{1}}'" v-model="data.detail[i].action[k].url"></el-input>
                                                            <el-tooltip placement="bottom-end" v-if="data.detail[i].action[k].url == ''">
                                                                <div class="tooltip" style="font-size: 12px; line-height: 18px; width: 250px;" slot="content">{{data.detail[i].url[0].type == 'static' ? info_website_button_static : info_website_button_dinamic }}</div>
                                                                <i class="mdi mdi-information"></i>
                                                            </el-tooltip>
                                                        </div>
                                                        <span style="position: relative; top: 45px; left: 15px; cursor: pointer;" v-if="data.detail[i].action.length>1">
                                                            <i @click="data.detail[i].action.splice(k, 1)" class="mdi mdi-delete"></i>
                                                        </span>
                                                    </el-col>
                                                    <div class="col-md-12 mt-10" v-if="data.detail[i].buttons.type=='call'">
                                                        <el-button size="small mt-30" @click="addCallAnother(i)" :disabled="disabledAddCall(i)">+ Add Another Button</el-button>
                                                    </div>
                                                    </el-row>
                                                </div>

                                                <!-- Quick Reply Button -->
                                                <div class="row mt-10" v-if="data.detail[i].buttons.type=='quick'">
                                                    <div class="col-lg-12 mr-5" v-for="(a, index) in data.detail[i].quick" :key="index">
                                                        <p style="font-size: 12px;">Button Text</p>
                                                        <el-input style="width: 250px;" size="small" placeholder="Enter button text" v-model="data.detail[i].quick[index].text"></el-input><i @click="data.detail[i].quick.splice(index, 1)" v-if="data.detail[i].quick.length>1" class="mdi mdi-delete ml-10"></i>
                                                    </div>
                                                    <br/>
                                                    <div class="col-lg-12 mt-10">
                                                        <el-button size="small mt-10" :disabled="disabledAddQuick(i)" @click="addQuickAnother(i)">+ Add Another Button</el-button>
                                                    </div>
                                                </div>

                                                <!-- <el-input v-if="data.detail[i].buttons.type=='text'" placeholder="Enter text header" class="mt-10" style="width:100%" v-model="data.detail[i].header.data"></el-input>
                                                <div v-else-if="data.detail[i].header.type=='media'" class="mt-10">
                                                    <el-radio-group v-model="data.detail[i].header.data">
                                                        <el-radio :label="1" border>Image</el-radio>
                                                        <el-radio :label="2" border>Document</el-radio>
                                                        <el-radio :label="3" border>Video</el-radio>
                                                    </el-radio-group>
                                                </div> -->
                                            </el-card>
                                            <el-card shadow="never" class="mt-10">
                                                <el-button type="info" :disabled="cantAddExample(i)" @click="showModalAddSample(i)">Add Sample</el-button>
                                            </el-card>
                                        </el-col>
                                        <div class="mt-20 mb-120">
                                            <el-button v-if="data.detail.type=='null'" type="danger" style="display: none; float:right;" @click="data.detail.splice(i, 1)"><i class="mdi mdi-delete"/></el-button>
                                            <el-button v-else type="danger" style="float:right; margin-top: 10px; margin-right: 1%; margin-bottom: 20px;" @click="deleteDataTemp(i)"><i class="mdi mdi-delete"/></el-button>
                                        </div>
                                    </el-row>
                                </template>
                                <el-button type="primary" @click="clickAddLang"><i class="mdi mdi-plus"/> Add Language
                                </el-button>
                            </el-card>
                            <el-button type="success" class="mt-20" style="float:right;" @click="dialogSubmitTemplate = true" :loading="buttonLoading"><i class="mdi mdi-check-circle" v-if="buttonLoading == false"/> Submit</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-dialog title="Add Sample Content" :visible.sync="addSampleContentModal" :before-close="(done) => { selectedSample = {}; done() }">
                    <span>
                        To help us understand what kind of message you want to send, you have the option to provide specific content examples for your template. You can add a sample template for one or all languages you are submitting.<br><br>
                        Make sure not to include any actual user or customer information, and provide only sample content in your examples.
                    </span>

                    <div v-if="selectedSample.header && selectedSample.header.type == 'media'" class="mt-20">
                        <strong v-if="data.detail[selectedSample.index].header.data == 1">Header (image)</strong>
                        <strong v-else-if="data.detail[selectedSample.index].header.data == 2">Header (document)</strong>
                        <strong v-else-if="data.detail[selectedSample.index].header.data == 3">Header (video)</strong>
                        <div class="el-input">
                            <input type="file" @change="uploadMediaSample(selectedSample.index)" ref="sampleMedia" class="uploader el-input__inner" accept="image/*,video/*,.pdf" id="inputSampleMedia">
                        </div>
                        <el-progress :percentage="uploadCsvProgress"></el-progress>
                    </div>
                    <br/>
                    <div v-if="selectedSample.header && selectedSample.header.type == 'text'" class="mt-20">
                        <strong>Header</strong><br>
                        {{ parsingDataHeader(selectedSample, selectedSample.paramHT) }}
                        <br/>
                        <el-form class="mt-5">
                            <el-form-item class="mb-0" v-for="i in selectedSample.paramHTcount" :key="i">
                                <el-input :placeholder="'Enter content for {{' + i + '}}'" type="text" v-model="selectedSample.paramHT[i-1]"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <br/>
                    <div v-if="selectedSample.message" style="white-space: pre-line" class="mb-5">
                        <strong>Body</strong>
                        {{ parsingData(selectedSample, selectedSample.param) }}
                    </div>

                    <el-form v-if="selectedSample.paramCount > 0">
                        <el-form-item class="mb-0" v-for="i in selectedSample.paramCount" :key="i">
                            <el-input :placeholder="'Enter content for {{' + i + '}}'" type="text" v-model="selectedSample.param[i-1]"></el-input>
                        </el-form-item>
                    </el-form>
                    <br/>
                    <!-- BUTTONE -->
                    <div v-if="selectedSample.button && selectedSample.paramBTNcount > 0">
                        <strong>Buttons</strong><br>
                        {{ parsingDataButton(selectedSample, selectedSample.paramBTN) }}
                    </div>
                    <br/>
                    <el-form>
                        <el-form-item class="mb-0" v-for="i in selectedSample.paramBTNcount" :key="i">
                            <el-input :placeholder="'Enter content for {{' + i + '}}'" type="text" v-model="selectedSample.paramBTN[i-1]"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="closeModal(selectedSample)">Cancel</el-button>
                        <el-button :loading="sampleSubmitLoad" type="primary" @click="addSampleContentModal = false">Confirm</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                    title="Warning"
                    :visible.sync="dialogSubmitTemplate"
                    width="30%"
                    center>
                    <div style="text-align: center;">Make sure all data is filled in correctly.<br>Are you going to submit this template ?</div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogSubmitTemplate = false">No</el-button>
                        <el-button type="primary" @click="createTemplate">Yes</el-button>
                    </span>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="Template List" name="list">
                <el-card style="margin-bottom: 1em; box-shadow: none;">
                    <!-- <el-card v-if="showAlertError" style="margin-bottom: 1em">
                        <error-gope />
                    </el-card> -->
                    <div align="left">
                        <el-pagination
                            class="mb-20"
                            background
                            prev-text="Prev"
                            next-text="Next"
                            layout="prev, pager, next"
                            :page-size="10"
                            @current-change="paginateTemplate"
                            :current-page="currentPage"
                            :total="parseInt(totalTemp)">
                        </el-pagination>
                        <!-- <el-button type="text" v-if="aftercursor != null" @click="getBussinessTemplate(aftercursor)">See more</el-button> -->
                    </div>
                    <el-input class="mb-20" @keypress.native="doSearchTemplate" @keydown="doSearchTemplate" v-model="searchTemplateName" @keyup.native.delete="doSearchTemplate" @clear="doSearchTemplate" placeholder="Search template name" style="width: 400px;" clearable/>
                    <el-table :data="tempList" style="width: 100%; font-size: 12px; color: #000 !important" v-loading="loadingTable" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(246, 246, 245, 0.8)">
                        <!-- <template slot="header" slot-scope="scope"> -->
                        <el-input
                            v-model="searchTemplateName"
                            size="mini"
                            placeholder="Type to search"/>
                        <!-- </template> -->
                        <el-table-column fixed="left" prop="name" label="Template Name" width="300"/>
                        <el-table-column prop="category" label="Category" width="200"/>
                        <!-- <el-table-column prop="quality_score" label="Quality" width="200">
                            <template slot-scope="scope">
                                <span v-if="scope.row.quality_score=='GREEN'">
                                    <i style="color:green;" class="mdi mdi-brightness-1"></i> High
                                </span>
                                <span v-else-if="scope.row.quality_score=='YELLOW'">
                                    <el-tooltip placement="top">
                                        <div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 250px;">{{ scope.row.reason }} <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a></div>
                                        <i style="color:yellow;" class="mdi mdi-brightness-1"></i>
                                    </el-tooltip>
                                    Medium
                                </span>
                                <span v-else-if="scope.row.quality_score=='RED'">
                                    <el-tooltip placement="top">
                                        <div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 250px;">{{ scope.row.reason }} <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a></div>
                                        <i style="color:red;" class="mdi mdi-brightness-1"></i>
                                    </el-tooltip>
                                    Low
                                </span>
                                <span v-else>
                                    <i style="color:grey;" class="mdi mdi-brightness-1"></i> Ineligible
                                </span>
                            </template>
                        </el-table-column> -->
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
                                    <!-- <span v-else-if="scope.row.status[b]=='ERROR'">
                                        <div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 350px;">ERROR :
                                                <span v-if="scope.row.error_detail">
                                                    {{ scope.row.error_detail.error_msg }}
                                                </span> -->
                                                <!-- <span v-else-if="scope.row.rejected_reason[b]=='PROMOTIONAL'">
                                                    The message template(s) are considered promotional. <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a>
                                                </span>
                                                <span v-else-if="scope.row.rejected_reason[b]=='ABUSIVE_CONTENT'">
                                                    The message template(s) contain content that violates WhatsApp’s Business Policy. <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a>
                                                </span>
                                                <span v-else-if="scope.row.rejected_reason[b]=='TAG_CONTENT_MISMATCH'">
                                                    The message content have a tag mismatch, please check and try again. <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a>
                                                </span> -->
                                            <!-- </div>
                                    </span> -->
                                    <span v-else-if="scope.row.status[b]=='REJECTED'">
                                        <el-tooltip placement="top">
                                            <div slot="content">REJECTED</div>
                                            <!-- <div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 350px;">REJECTED : -->
                                                <!-- <span v-if="scope.row.rejected_reason[b]=='INVALID_FORMAT'">
                                                    Formatting is incorrect, please check your template components. <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a>
                                                </span>
                                                <span v-else-if="scope.row.rejected_reason[b]=='PROMOTIONAL'">
                                                    The message template(s) are considered promotional. <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a>
                                                </span>
                                                <span v-else-if="scope.row.rejected_reason[b]=='ABUSIVE_CONTENT'">
                                                    The message template(s) contain content that violates WhatsApp’s Business Policy. <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a>
                                                </span>
                                                <span v-else-if="scope.row.rejected_reason[b]=='TAG_CONTENT_MISMATCH'">
                                                    The message content have a tag mismatch, please check and try again. <a style="color:yellow;" href="https://developers.facebook.com/docs/whatsapp/message-templates/guidelines" target="_blank">See the Reference</a>
                                                </span> -->
                                            <!-- </div> -->
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
                        <!-- <el-table-column prop="numberBindinged" label="Number Binded" width="200">
                            <template>

                            </template>
                        </el-table-column> -->
                        <el-table-column label="Options" width="150" fixed="right">
                            <template slot-scope="scope">
                                <!-- <span v-if="scope.row.status.filter(v => { return v.includes('APPROVED') } )">yes</span>
                                <span v-else-if="scope.row.status.filter(v => { return v.includes('REJECTED') } )">no</span> -->
                                <el-button v-if="scope.row.status=='REJECTED' || scope.row.status=='ERROR' || scope.row.status=='PENDING'" type="primary" disabled size="small">Bind</el-button>
                                <el-button v-else type="primary" size="small" @click="bindingProccess(scope.row)">Bind</el-button>
                                <el-button type="danger" size="small" @click="deleteTemplate(scope.row.name)"><i class="mdi mdi-delete"></i></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div align="left">
                        <el-pagination
                            class="mt-20"
                            background
                            prev-text="Prev"
                            next-text="Next"
                            layout="prev, pager, next"
                            :page-size="10"
                            @current-change="paginateTemplate"
                            :current-page="currentPage"
                            :total="parseInt(totalTemp)">
                        </el-pagination>
                        <!-- <el-button type="text" @click="getBussinessTemplate(page)">See more</el-button> -->
                    </div>
                </el-card>

                <el-dialog :title="'Template Binding #'+selectedTemplate" :visible.sync="dialogBindingTemplate">
                    <template>
                        <p>Choose phone number for assigned <b>{{selectedTemplate}}</b> template</p>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Check all</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedNumbers" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="numb in numbers" :label="numb" :key="numb">{{numb}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <el-button type="primary" size="small" :loading="bindLoad" @click="submitBinding">Submit</el-button>
                    <!-- <el-button type="primary" :loading="bindLoad" @click="testLoading">Loading</el-button> -->

                    <el-button @click="dialogBindingTemplate=false" class="mt-40" type="danger" size="small">Cancel</el-button>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import api from '@/networkClient'
import config from '@/config'
import store from '@/store'
import moment from 'moment-timezone'
import _ from 'lodash'
const axios = require('axios')
const templateLang = require('@/components/language')
const headertype = require('@/components/headertype')
const buttonstype = require('@/components/buttons_type')
const actiontype = require('@/components/action_type')
const countrycode = require('@/components/country_code')
const urltype = require('@/components/url_type')
const categoryoptions = require('@/components/categoryoptions')
const typeoptions = require('@/components/typeoptions')

export default {
    data() {
        return {
            currentPage: 1,
            totalTemp: 0,
            dialogSubmitTemplate: false,
            sampleSubmitLoad: false,
            acceptFormat: '',
            exampleHeader: false,
            activeTab: 'request',
            exampleBody: false,
            info_website_button_dinamic: 'Adding a variable creates a personalized link for the customer to view their info. Only one variable can be added to the end of a URL. For example : https://www.example.com/{{1}}',
            info_website_button_static: 'Adding a variable creates a personalized link for the customer to view their info. Only one variable can be added to the end of a URL. For example : https://www.example.com',
            counter: [1],
            counterHeader: [1],
            counterBtn: [1],
            bindLoad: false,
            searchTemplateName: null,
            bindingLoading: false,
            checkAll: false,
            isIndeterminate: true,
            checkedNumbers: [],
            showAlertError: false,
            showFormMessage: false,
            showAlertMessage: false,
            buttonLoading: false,
            addSampleContentModal: false,
            dialogFormVisible: false,
            dialogBindingTemplate: false,
            dialogParamHeader: false,
            dialogParamBody: false,
            loadingLoadBussinessTemplate: false,
            loadingBtnDeleteBussinessTemplate: false,
            loadingPage: false,
            loadingTable: false,
            waUserDetail : {
                hsm : [],
                sender : {}
            },
            numbers: [],
            nonGroupList: [],
            selectedNumber: [],
            selectedTemplate: '',
            selectedLang: [],
            dataSubmit: [],
            selectedMessage: '',
            selectedId: '',
            message:'',
            checkParam: [[]],
            checkParamHeader: [[]],
            checkParamBtn:[[]],
            paramHeader:[],
            paramBody:[],
            paramBtn:[],
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
                    body_text: [],
                    header: {
                        type: "none",
                        data: null,
                        // example: {
                        //     header_text: []
                        // }
                    },
                    footer: "",
                    buttons: {
                        type:"none"
                    },
                    action: [{
                        type: 'call',
                        text: '',
                        country: '',
                        phone: '',
                        url: ''
                    }],
                    quick: [{
                        text: '',
                    }],
                    url: [{
                        type: 'static',
                        link: ''
                    }]
                }],
                detailButton: {
                    buttons: {
                        type: "none",
                        data: null
                    },
                    action: [{
                        type: 'call',
                        text: '',
                        country: '',
                        phone: ''
                    }],
                    quick: [{
                        text: '',
                    }],
                    url: [{
                        type: 'static',
                        link: ''
                    }]
                },
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
            choose_buttons_type: '',
            header_type: headertype,
            buttons_type: buttonstype,
            action_type: actiontype,
            actfillter: [],
            country_code: countrycode,
            url_type: urltype,
            media: 1,
            urlMedia: [],
            operations: {
                templateDialogDeleted: false,
                template_selected_to_delete: ''
            },
            aftercursor: null,
            bussinessTemplate: [{ bussinessTemplate: [] }],
            requestTemplateList: [],
            bussinessTemplateList: [],
            tempList: [],
            options: templateLang,
            options_of_type: typeoptions,
            options_of_category: categoryoptions,
            timeout: null,
            sampleData: [],
            selectedSample: {},
            urlButton: [],
            uploadCsvProgress: 0,
        }
    },
    methods: {
        async paginateTemplate(page = 1){
			this.currentPage = page
			await this.getBussinessTemplate(this.currentPage, this.searchTemplateName)
		},
        deleteDataTemp(i){
            this.data.detail.splice(i, 1)
            this.checkParam.splice(i, 1)
            this.checkParamBtn.splice(i,1)
            this.checkParamHeader.splice(i,1)
            this.counter.splice(i,1)
            this.counterHeader.splice(i,1)
            this.counterBtn.splice(i,1)
        },
        validateParamHeader(i) {
            if(this.data.detail[i].header.data != ''){
                 if(this.data.detail[i].header.data.includes('{{') && this.data.detail[i].header.data.includes('}}') && this.data.detail[i].header.data.lastIndexOf('}}') == this.data.detail[i].header.data.length - 2){
                    if(this.counterHeader[i] == 1 && this.data.detail[i].header.data.includes(`{{${this.counterHeader[i]}}}`) == false){
                        this.data.detail[i].header.data = this.data.detail[i].header.data.split(' ')
                        this.data.detail[i].header.data.splice(this.data.detail[i].header.data.length - 1, 1)
                        this.data.detail[i].header.data = this.data.detail[i].header.data.join(' ')
                        this.$message.error({
                            showClose: false,
                            message: `First parameters must be {{1}}`
                        });
                    }
                    if(this.data.detail[i].header.data.includes(`{{${this.counterHeader[i]}}}`) && this.checkParamHeader[i].join(' ').includes(`{{${this.counterHeader[i]}}}`) == false){
                        this.checkParamHeader[i].push(`{{${this.counterHeader[i]}}}`)
                        this.counterHeader[i]++
                    }
                    else {
                        if(Number(this.data.detail[i].header.data.charAt(this.data.detail[i].header.data.length - 3)) > this.counterHeader[i])
                        {
                            this.$message.error({
                                showClose: false,
                                message: `Next parameters must be {{${this.counterHeader[i]}}}`
                            });
                            this.data.detail[i].header.data = this.data.detail[i].header.data.split(' ')
                            this.data.detail[i].header.data.splice(this.data.detail[i].header.data.length - 1, 1)
                            this.data.detail[i].header.data = this.data.detail[i].header.data.join(' ')
                        }
                        else{
                            if(this.checkParamHeader[i].length > 0) {
                                this.checkParamHeader[i].forEach( (e, ie) => {
                                    let regex = new RegExp(e.replace(/\{/g, "\\{").replace(/\}/g, "\\}"), 'ig')
                                    let slot = this.data.detail[i].header.data.match(regex)
                                    if(slot && slot.length > 1){
                                        let msg = this.data.detail[i].header.data.split(' ')
                                        // let index = msg.lastIndexOf(e)
                                        // console.log(index, this.data.detail[i].header.data.length - 1)
                                        // if(index == this.data.detail[i].header.data.length - 1){
                                            this.$message.error({
                                                showClose: false,
                                                message: `Parameters cannot be the same!`
                                            });
                                            msg.splice(msg.length - 1, 1)
                                            this.checkParamHeader[i].splice(this.checkParamHeader[i].length - 1, 1)
                                            this.counterHeader[i]--
                                        // }
                                        this.data.detail[i].header.data = msg.join(' ')
                                    }
                                })
                            }
                        }
                    }
                }
                else{
                    if(this.counterHeader[i] != 0 && this.data.detail[i].header.data.includes(`{{${this.counterHeader[i]}}}`) && this.checkParamHeader[i].join(' ').includes(`{{${this.counterHeader[i]}}}`) == false){
                        this.checkParamHeader[i].push(`{{${this.counterHeader[i]}}}`)
                        this.counterHeader[i]++
                    }
                    if(this.counterHeader[i] == 2 && this.checkParamHeader[i].length == 1 && this.data.detail[i].header.data.includes(`{{1}}`) == false){
                        this.checkParamHeader[i] = []
                        this.counterHeader[i] = 1
                    }
                }
            // if(this.data.detail[i].header.data.includes("{{1}}")){
            //     this.exampleHeader = true
            // }
            // else {
            //     this.exampleHeader = false
            // }
            }

        },
        validateParam(i) {
            // console.log('messages length', this.data.detail[i].messages);
            // console.log('checkParam', this.checkParam[i]);
            if(this.data.detail[i].messages != ''){
                if(this.data.detail[i].messages.includes('{{') && this.data.detail[i].messages.includes('}}') && this.data.detail[i].messages.lastIndexOf('}}') == this.data.detail[i].messages.length - 2){
                    if(this.counter[i] == 1 && this.data.detail[i].messages.includes(`{{${this.counter[i]}}}`) == false){
                        this.data.detail[i].messages = this.data.detail[i].messages.split(' ')
                        this.data.detail[i].messages.splice(this.data.detail[i].messages.length - 1, 1)
                        this.data.detail[i].messages = this.data.detail[i].messages.join(' ')
                        this.$message.error({
                            showClose: false,
                            message: `First parameters must be {{1}}`
                        });
                    }
                    if(this.data.detail[i].messages.includes(`{{${this.counter[i]}}}`) && this.checkParam[i].join(' ').includes(`{{${this.counter[i]}}}`) == false){
                        this.checkParam[i].push(`{{${this.counter[i]}}}`)
                        this.counter[i]++
                    }
                    else {
                        if(Number(this.data.detail[i].messages.charAt(this.data.detail[i].messages.length - 3)) > this.counter[i])
                        {
                            this.$message.error({
                                showClose: false,
                                message: `Next parameters must be {{${this.counter[i]}}}`
                            });
                            this.data.detail[i].messages = this.data.detail[i].messages.split(' ')
                            this.data.detail[i].messages.splice(this.data.detail[i].messages.length - 1, 1)
                            this.data.detail[i].messages = this.data.detail[i].messages.join(' ')
                        }
                        else{
                            if(this.checkParam[i].length > 0) {
                                this.checkParam[i].forEach( (e, ie) => {
                                    let regex = new RegExp(e.replace(/\{/g, "\\{").replace(/\}/g, "\\}"), 'ig')
                                    let slot = this.data.detail[i].messages.match(regex)
                                    if(slot && slot.length > 1){
                                        let msg = this.data.detail[i].messages.split(' ')
                                        // let index = msg.lastIndexOf(e)
                                        // console.log(index, this.data.detail[i].messages.length - 1)
                                        // if(index == this.data.detail[i].messages.length - 1){
                                            this.$message.error({
                                                showClose: false,
                                                message: `Parameters cannot be the same!`
                                            });
                                            msg.splice(msg.length - 1, 1)
                                            this.checkParam[i].splice(this.checkParam[i].length - 1, 1)
                                            this.counter[i]--
                                        // }
                                        this.data.detail[i].messages = msg.join(' ')
                                    }
                                })
                            }
                        }
                    }
                }
                else{
                    if(this.counter[i] != 0 && this.data.detail[i].messages.includes(`{{${this.counter[i]}}}`) && this.checkParam[i].join(' ').includes(`{{${this.counter[i]}}}`) == false){
                        this.checkParam[i].push(`{{${this.counter[i]}}}`)
                        this.counter[i]++
                    }
                    if(this.counter[i] == 2 && this.checkParam[i].length == 1 && this.data.detail[i].messages.includes(`{{1}}`) == false){
                        this.checkParam[i] = []
                        this.counter[i] = 1
                    }
                }
            }
        },
        validateParamBtn(i,k) {
            if (this.data.detail[i].action[k].url != '') {
                if(this.data.detail[i].action[k].url.includes('{{') && this.data.detail[i].action[k].url.includes('}}') && this.data.detail[i].action[k].url.lastIndexOf('}}') == this.data.detail[i].action[k].url.length - 2){
                    if (this.data.detail[i].url[0].type == 'static') {
                        this.data.detail[i].action[k].url = this.data.detail[i].action[k].url.split(' ')
                        this.data.detail[i].action[k].url.splice(this.data.detail[i].action[k].url.length - 1, 1)
                        this.data.detail[i].action[k].url = this.data.detail[i].action[k].url.join(' ')
                        this.$message.error({
                            showClose: false,
                            message: `Can't use parameter ini url static !`
                        });
                        return
                    }

                    if(this.counterBtn[i] == 1 && this.data.detail[i].action[k].url.includes(`{{${this.counterBtn[i]}}}`) == false){
                        this.data.detail[i].action[k].url = this.data.detail[i].action[k].url.split(' ')
                        this.data.detail[i].action[k].url.splice(this.data.detail[i].action[k].url.length - 1, 1)
                        this.data.detail[i].action[k].url = this.data.detail[i].action[k].url.join(' ')
                        this.$message.error({
                            showClose: false,
                            message: `First parameters must be {{1}}`
                        });
                    }
                    if(this.data.detail[i].action[k].url.includes(`{{${this.counterBtn[i]}}}`) && this.checkParamBtn[i].join(' ').includes(`{{${this.counterBtn[i]}}}`) == false){
                        this.checkParamBtn[i].push(`{{${this.counterBtn[i]}}}`)
                        this.counterBtn[i]++
                    }
                    else {
                        if(Number(this.data.detail[i].action[k].url.charAt(this.data.detail[i].action[k].url.length - 3)) > this.counterBtn[i])
                        {
                            this.$message.error({
                                showClose: false,
                                message: `Next parameters must be {{${this.counterBtn[i]}}}`
                            });
                            this.data.detail[i].action[k].url = this.data.detail[i].action[k].url.split(' ')
                            this.data.detail[i].action[k].url.splice(this.data.detail[i].action[k].url.length - 1, 1)
                            this.data.detail[i].action[k].url = this.data.detail[i].action[k].url.join(' ')
                        }
                        else{
                            if(this.checkParamBtn[i].length > 0) {
                                this.checkParamBtn[i].forEach( (e, ie) => {
                                    let regex = new RegExp(e.replace(/\{/g, "\\{").replace(/\}/g, "\\}"), 'ig')
                                    let slot = this.data.detail[i].action[k].url.match(regex)
                                    if(slot && slot.length > 1){
                                        let msg = this.data.detail[i].action[k].url.split(' ')
                                        // let index = msg.lastIndexOf(e)
                                        // console.log(index, this.data.detail[i].messages.length - 1)
                                        // if(index == this.data.detail[i].messages.length - 1){
                                            this.$message.error({
                                                showClose: false,
                                                message: `Parameters cannot be the same!`
                                            });
                                            msg.splice(msg.length - 1, 1)
                                            this.checkParamBtn[i].splice(this.checkParamBtn[i].length - 1, 1)
                                            this.counterBtn[i]--
                                        // }
                                        this.data.detail[i].action[k].url = msg.join(' ')
                                    }
                                })
                            }
                        }
                    }
                }
                else{
                    if(this.counterBtn[i] != 0 && this.data.detail[i].action[k].url.includes(`{{${this.counterBtn[i]}}}`) && this.checkParamBtn[i].join(' ').includes(`{{${this.counterBtn[i]}}}`) == false){
                        this.checkParamBtn[i].push(`{{${this.counterBtn[i]}}}`)
                        this.counterBtn[i]++
                    }
                    if(this.counterBtn[i] == 2 && this.checkParamBtn[i].length == 1 && this.data.detail[i].action[k].url.includes(`{{1}}`) == false){
                        this.checkParamBtn[i] = []
                        this.counterBtn[i] = 1
                    }
                }
            }
        },
        closeModal(key){
            this.selectedSample = {}
            this.uploadCsvProgress = 0
            if (this.$refs.sampleMedia != undefined) {
                this.$refs.sampleMedia.value = null;
            }
            this.urlMedia = []
            this.addSampleContentModal = false
        },
        showModalAddSample(i) {
            let slot = this.data.detail[i].messages.match(/{{\s*[\w\.]+\s*}}/g)
            let ht_slot = this.data.detail[i].header.type == 'media' || this.data.detail[i].header.type == 'none' ? null : this.data.detail[i].header.data.match(/{{\s*[\w\.]+\s*}}/g),
                btn_visit = this.data.detail[i].action.find(v => v.type == "visit")
            let btn_slot = btn_visit ? btn_visit.url.match(/{{\s*[\w\.]+\s*}}/g) : ''

            this.sampleData[i] = {
                    message: this.data.detail[i].messages,
                    param: [],
                    paramHT: [],
                    paramBTN: [],
                    header_sample: [],
                    header: this.data.detail[i].header,
                    button: this.data.detail[i].buttons.type == "call" ? this.data.detail[i].action : null,
                    footer: this.data.detail[i].footer,
                    paramCount: slot? slot.length : 0,
                    paramHTcount: ht_slot? ht_slot.length : 0,
                    paramBTNcount: btn_slot? btn_slot.length : 0
                }

            if (this.sampleData.length > 0 && this.urlMedia.length > 0){
                this.sampleData[i].header_sample[i] = this.urlMedia[i]
            }

            if(this.selectedSample.index == i){
                this.sampleData[i].param = this.selectedSample.param
                this.sampleData[i].paramHT = this.selectedSample.paramHT
                this.sampleData[i].paramBTN = this.selectedSample.paramBTN
            }

            this.selectedSample = this.sampleData[i]
            this.selectedSample.index = i
            this.addSampleContentModal = true
        },
        countParam(i) {
            if(this.data.detail[i].messages) {
                let slot = this.data.detail[i].messages.match(/{{\s*[\w\.]+\s*}}/g)
                return slot? slot.length : 0
            }
            return 0
        },
        countParamHeaderText(i){
            if(this.data.detail[i].header.data) {
                let ht_slot = this.data.detail[i].header.data.match(/{{\s*[\w\.]+\s*}}/g)
                // console.log('slot header text',ht_slot)
                return ht_slot? ht_slot.length : 0
            }
            return 0
        },
        countParamButtonUrl(i){
            let btn_slot = this.data.detail[i].action.find(v => v.type == "visit")
            if(btn_slot) {
                if (this.data.detail[i].url[0].type == 'dinamic') {
                    let slot = btn_slot.url.match(/{{\s*[\w\.]+\s*}}/g)
                    return slot ? slot.length : 0
                }
            }
            return 0
        },
        cantAddExample(i) {
            if(this.data.detail[i].messages) {
                if(this.countParam(i) < 1) {
                    let find_type_visit = this.data.detail[i].action.find(v => v.type == "visit")
                    if(this.data.detail[i].header.type == 'media'){
                        return false
                    }
                    else if(this.data.detail[i].header.type == 'text' && this.data.detail[i].header.data == ''){
                        let find_type_visit = this.data.detail[i].action.find(v => v.type == "visit")
                        if((this.countParamHeaderText(i) < 1 || this.countParamHeaderText(i) == null || this.countParamHeaderText(i) == '') && !find_type_visit){
                            return false
                        }
                        if(find_type_visit) {
                            if(this.countParamButtonUrl(i) < 1){
                                return false
                            }
                        }
                        return true
                    }
                    else if(this.data.detail[i].header.type == 'text' && this.data.detail[i].header.data != ''){
                        if (this.countParamHeaderText(i) > 0) {
                            return false
                        }
                    }
                    else if(find_type_visit) {
                        if(this.countParamButtonUrl(i) > 0){
                            return false
                        }
                    }
                    return true
                }
                return false
            } else {
                if(this.data.detail[i].header.type == 'none') {
                    return true
                } else if(this.data.detail[i].header.type == 'media') {
                    if(this.data.detail[i].header.data == ''){
                        return true
                    }
                    else {
                        return false
                    }
                } else if(this.data.detail[i].header.type == 'text') {
                     if(this.countParamHeaderText(i) < 1){
                        return true
                     }
                     else {
                         return false
                     }
                }
            }
             return true
        },
        async uploadMediaSample(index) {
            // this.readingCsv = true
            var input = document.getElementById('inputSampleMedia')
            let base64Type = input.files[0].type.split("/")[1];
            let allowedFile = [];
            switch (this.data.detail[index].header.data) {
                case 1:
                    allowedFile = ["jpg", "jpeg"]
                    break;
                case 2:
                    allowedFile = ["pdf"]
                    break;
                case 3:
                    allowedFile = ["mp4", "mkv", "mov"]
                    break;

            }

            if (allowedFile.indexOf(base64Type) == -1) {
                // this.csvDialog.visible = false
                this.$refs.sampleMedia.value = null;
                this.$message.error({
                    showClose: false,
                    message: `Media format types are not allowed, must be ( ${allowedFile} ) !`
                });
                return
            }
            else {
                let formData = new FormData();
                // console.log('media',input.files[0]);
                formData.append('media', input.files[0])
                formData.append('type', "sample_notif")
                var self = this
                self.sampleSubmitLoad = true
                axios.defaults.timeout = 60000 * 15
                await axios.post(config.baseApi + 'upload/fbcdn', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'api-key': this.$store.getters.accessToken
                    },
                    onUploadProgress: (event) => {
                        let p = parseInt(event.total / event.loaded)
                        p = p > 100 ? 100 : p
                        self.uploadCsvProgress = p > 1 ? 80 - p : 80
                    }
                })
                .then(({ data }) => {
                    // console.log('upload', data);
                    if(data.ec == 200) {
                        // console.log('data url',data)
                        this.urlMedia[index] = data.data.data.h
                        this.sampleData[index].header_sample[index] = data.data.data.h
                        self.uploadCsvProgress = 100
                        self.sampleSubmitLoad = false
                    }
                    else{
                        this.uploadMediaSampleAlternate(index)
                        // self.uploadCsvProgress = 0
                        // this.$refs.sampleMedia.value = null;
                        // this.$message.error({
                        //     showClose: false,
                        //     message: `Upload file failed. Something wrong with facebook cdn.`
                        // });
                    }
                    // self.sampleSubmitLoad = false
                })
                .catch(err => {
                    this.addSampleContentModal = false
                    // this.readingCsv = false
                    if(err.code == "ECONNABORTED" || err.code == "ETIMEDOUT"){
                        this.$swal(this.$t('error'), this.$t('timeout'), "error")
                    } else{
                        this.$swal(this.$t('error'), this.$t('error_text'), "error")
                    }
                    self.uploadCsvProgress = 0
                    self.sampleSubmitLoad = false

                })
            }


            // this.csvDialog.visible = false
        },
        async uploadMediaSampleAlternate(index){
            var input = document.getElementById('inputSampleMedia')
            let formData = new FormData();
            formData.append('media', input.files[0])
			formData.append('type', "upload_media")
            var self = this
            self.sampleSubmitLoad = true
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
				self.uploadCsvProgress = p > 1 ? 90 - p : 90
				}
			}).then(res => {
				// console.log('renderMedia', res);
				if (res.data.ec == 200) {
                    this.urlMedia[index] = res.data.data.url
                    this.sampleData[index].header_sample[index] = res.data.data.url
					self.uploadCsvProgress = 100
				}
				else {
                    self.uploadCsvProgress = 0
                    this.$refs.sampleMedia.value = null;
                    this.$message.error({
                        showClose: false,
                        message: `Upload file failed.`
                    });
					// this.closeDialog()
					// this.$swal(this.$t('error'), 'render media error', "error")
				}
				self.sampleSubmitLoad = false
			}).catch(err => {
				console.log(err);
                this.addSampleContentModal = false
				if(err.code == "ECONNABORTED" || err.code == "ETIMEDOUT"){
                        this.$swal(this.$t('error'), this.$t('timeout'), "error")
                    } else{
                        this.$swal(this.$t('error'), this.$t('error_text'), "error")
                    }
                    self.uploadCsvProgress = 0
                    self.sampleSubmitLoad = false
			})
        },
        parsingDataHeader(element, paramHT){
            let header_tx = ''
            let slot = element.header.data.match(/{{\s*[\w\.]+\s*}}/g)

            header_tx = element.header.data
            if(slot != null){
                slot.forEach((el, i) => {
                    if(paramHT[i]){
                        header_tx = header_tx.replace(el, paramHT[i])
                    }
                })
            }
            return header_tx
        },
        parsingData(element, param){
            let message = ''
            let slot = element.message.match(/{{\s*[\w\.]+\s*}}/g)

            message = element.message
            if(slot != null){
                slot.forEach((el, i) => {
                    if(param[i]){
                        message = message.replace(el, param[i])
                    }
                })
            }
            return message
        },
        parsingDataButton(element, paramBTN){
            let btn_dt = ''
            var data_btn = element.button.find(v => v.type == "visit")
            let btn_slot = data_btn.url.match(/{{\s*[\w\.]+\s*}}/g)

            btn_dt = data_btn.url
            if(btn_slot != null){
                btn_slot.forEach((el, i) => {
                    if(paramBTN[i]){
                        btn_dt = btn_dt.replace(el, paramBTN[i])
                    }
                })
            }
            return btn_dt
        },
        tabClick(target){
			if(target.name=='list'){
                this.tempList = []
				this.getBussinessTemplate(1,undefined)
			}
            this.getBussinessTemplate()
		},
        doSearchTemplate(){
            clearTimeout(this.timeout)
            var self = this
            this.timeout = setTimeout(function(){
                self.tempList = []
                self.getBussinessTemplate(1, self.searchTemplateName)
            }, 1500)
        },
        addExampleHeader(){
            this.dialogParamHeader = false
        },
        addExampleBody(){
            this.dialogParamBody = false
        },
        addCallAnother(index){
            var self = this
            let type = '';
            if(self.data.detail[index].action[index].type == 'call'){
                type = 'visit'
                self.data.detail[index].action.push({
                    type: type,
                    text: '',
                    url: ''
                })
            }
            else {
                type = 'call'
                self.data.detail[index].action.push({
                type: type,
                phone: '',
                country: '',
                text: '',
                url: ''
            })
            }
            const filVal = [...self.action_type].filter(el => el.value == type);
            self.actfillter.splice(0,1,filVal[0]);
        },
        disabledAddCall(index) {
            if(this.data.detail[index].action.length < 2) {
                let is_empty = this.data.detail[index].action.find(v => {
                    if(v.type == "visit") {
                        return (_.isEmpty(v.text) || _.isEmpty(v.url))
                    } else {
                        return (_.isEmpty(v.text) || _.isEmpty(v.country) || _.isEmpty(v.phone))
                    }
                })
                if(is_empty) {
                    return true
                }
                return false
            }
            return true
        },
        disabledAddQuick(index) {
            if(this.data.detail[index].quick.length < 3) {
                let is_empty = this.data.detail[index].quick.find(v => _.isEmpty(v.text))
                if(is_empty) {
                    return true
                }
                return false
            }
            return true
        },
        addQuickAnother(index){
            var self = this
            self.data.detail[index].quick.push({
                text: ''
            })
        },
        bindingProccess(val){
            // console.log(val)
            this.dialogBindingTemplate = true
            var selected = this.nonGroupList.filter(v => {
                return v.name == val.name && v.status.toLocaleLowerCase() == "approved"
            })
            this.selectedTemplate = selected[0].name
            this.dataSubmit = selected.map(v => {
                return {
                    language: v.language,
                    body: v.components.find(v => v.type.toLowerCase() == "body").text,
                    header: v.components.find(v => v.type.toLowerCase() == 'header'),
                    footer: v.components.find(v => v.type.toLowerCase() == 'footer') ? v.components.find(v => v.type.toLowerCase() == 'footer').text : null,
                    buttons: v.components.find(v => v.type.toLocaleLowerCase() == 'buttons'),
                    id: v.id
                }
            })
        },

        submitBinding(){
            var submitingBinding = {
                template_name: this.selectedTemplate,
                list: this.dataSubmit,
                selected_phone: this.checkedNumbers,
            }
            if(this.checkedNumbers == ''){
                this.$message.error({
                    showClose: false,
                    message: 'Please choose the numbers'
                });
                return
            }
            this.bindLoad = true
            // console.log(this.bindLoad)
            api({
                method: 'post',
                url: 'bussiness/binding-template',
                data: submitingBinding
            })
            .then(response => {
                // console.log('success response',response.data)
                this.$swal(this.$t('success'), 'The template success to bind', "success")
                this.checkedNumbers = []
                this.dialogBindingTemplate = false
								this.tempList = []
                this.getBussinessTemplate()
                this.bindLoad = false
            })
            .catch(error => {
                // console.log('error response',error)
                this.$swal(this.$t('error'), 'Something when wrong', "error")
                this.checkedNumbers = []
                this.dialogBindingTemplate = false
            })
            // this.bindLoad = false
            // this.bindingLoading = false
        },

        handleCheckAllChange(val) {
            this.checkedNumbers = val ? this.numbers: [];
            this.isIndeterminate = false;
        },

        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.numbers.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.numbers.length;
        },

        handlePaste(event){
            event.preventDefault()
            let pastedtext = window.event.clipboardData.getData('Text')
            this.data.template_name = this.data.template_name + pastedtext.replace(/\s/g, "_")
        },
        handleCangeHeader(i){
            this.data.detail[i].header.data = ''
        },
        clickAddLang(){
            this.data.detail.push({
                    language: '',
                    messages: '',
                    body_text: [],
                    header: {
                        type: "none",
                        data: null,
                        // example: {
                        //     header_text: []
                        // }
                    },
                    footer: "",
                    buttons: {
                        type:"none"
                    },
                    action: [{
                        type: 'call',
                        text: '',
                        country: '',
                        phone: '',
                        url: ''
                    }],
                    quick: [{
                        text: '',
                    }],
                    url: [{
                        type: 'static',
                        link: ''
                    }]
                })

            this.checkParam.push([])
            this.checkParamHeader.push([])
            this.checkParamBtn.push([])
            this.counter.push(1)
            this.counterHeader.push(1)
            this.counterBtn.push(1)
        },
        formatDate(val, format){
            return moment(val).format(format)
        },

        templateDialogDeleted(key){
            this.operations.templateDialogDeleted = true
            this.template_selected_to_delete = this.bussinessTemplateList[0].name
        },
        
        async getBussinessTemplate(page = 1, search = undefined){
            this.loadingTable = this.loadingPage = true
            this.currentPage = page
            await api({
                method: 'get',
                url: 'bussiness/message-template?page='+page,
                params: {
                //     after: after != null ? after : undefined,
                //     view: view == true ? true : null,
                    search: this.searchTemplateName
                }
            }).then(result => {
                if(result.data.ec == 200){
                    let data = result.data.data.result
                    this.totalTemp = parseInt(result.data.data.total)
                    // this.totalTemp = result.data.data.count
                    if(this.nonGroupList.length > 0){
                        this.nonGroupList = this.nonGroupList.concat(data)
                    }
                    else{
                        this.nonGroupList = data
                        this.totalTemp = parseInt(result.data.data.total)
                        // console.log('length',result.data.data.length)
                    }
                    if(data.length > 0){
                       let temp = _.chain(result.data.data.result).groupBy("name").map(function(v, i) {
                            return {
                                id: _.map(v, 'id'),
                                name: i,
                                language: _.map(v, 'language'),
                                status: _.map(v, 'status'),
                                category: v[0].category,
                                message: v[0].components.find(t => t.type.toLowerCase() == "body").text,
                                // quality_score: v[0].quality_score ? v[0].quality_score.score : undefined,
                                // reason: v[0].quality_score ? v[0].quality_score.reason : undefined,
                                // rejected_reason: _.map(v, 'rejected_reason')
                            }
                        }).value();

                        // console.log('temp',temp);

                        // this.tempList = temp
                        // console.log('templist',this.tempList)
                        _.forEach(temp, val => {
                            // this.tempList.push(val)
                            this.tempList = temp
                        });

                        // this.currentPage = 1

                        // this.aftercursor = result.data.data.paging.cursors.after

                    } else {
                        // this.aftercursor = null
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
            this.dialogSubmitTemplate = false
            const dataDetail = this.data.detail;
            const detailReq = Object.assign([],dataDetail);

            let checkAllField = false
            _.forEach(dataDetail, (val,index)=> {
                if(_.isEmpty(this.data.template_name) || _.isEmpty(this.data.detail[index].language) || _.isEmpty(this.data.template_category)){
                    this.$message.error({
                        showClose: false,
                        message: 'All field is required'
                    });
                    checkAllField = true
                    return
                }
            })

            if (checkAllField == true) {
                return
            }

            //Check Sample
            if(this.sampleData.length == 0){
                if(this.countParam(0) > 0 || this.countParamHeaderText(0) > 0 || this.countParamButtonUrl(0) > 0){
                    this.$message.error({
                        showClose: false,
                        message: 'Sample field is required'
                    });
                    return
                }
            }
            else if (this.sampleData.length > 0){
                // console.log(this.sampleData);

                let checkField = false

                for (let indexSample = 0; indexSample < this.sampleData.length; indexSample++) {
                    if(this.sampleData[indexSample].header.type == 'media'){
                        // console.log('masuk1',this.sampleData[indexSample].header_sample);
                        if (this.sampleData[indexSample].header_sample.length == 0) {
                            this.$message.error({
                            showClose: false,
                            message: 'All Sample field is required'
                            });
                            checkField = true
                            break
                        }
                    }

                    if(this.sampleData[indexSample].paramCount > 0){
                        // console.log('masuk2',this.sampleData[indexSample].param.length);
                        if(this.sampleData[indexSample].param.length != this.sampleData[indexSample].paramCount){
                            this.$message.error({
                            showClose: false,
                            message: 'All Sample field is required'
                            });
                            checkField = true
                            break
                        }

                    }
                    if(this.sampleData[indexSample].paramHTcount > 0){
                        // console.log('masuk3',this.sampleData[indexSample].paramHT.length);
                        if(this.sampleData[indexSample].paramHT.length != this.sampleData[indexSample].paramHTcount){
                            this.$message.error({
                            showClose: false,
                            message: 'All Sample field is required'
                            });
                            checkField = true
                            break
                        }

                    }
                    if(this.sampleData[indexSample].paramBTNcount > 0){
                        // console.log('masuk4',this.sampleData[indexSample].paramBTN.length);
                        if(this.sampleData[indexSample].paramBTN.length != this.sampleData[indexSample].paramBTNcount){
                            this.$message.error({
                                showClose: false,
                                message: 'All Sample field is required'
                            });
                            checkField = true
                            break
                        }
                    }

                }

                if (checkField == true) {
                    return
                }

            }

            let checkBtnField = false;


            for (let indexData = 0; indexData < dataDetail.length; indexData++) {
                 if(dataDetail[indexData].header.type == "none"){
                    detailReq[indexData].header.data = null;
                }

                if(dataDetail[indexData].buttons.type){
                    if(dataDetail[indexData].buttons.type == "none"){
                        detailReq[indexData].buttons.type = "none";
                    }
                    else if (dataDetail[indexData].buttons.type == "call"){
                        _.forEach(dataDetail[indexData].action, (el) => {
                            if(el.type == "visit"){
                                if(_.isEmpty(el.text) || _.isEmpty(el.url)){
                                    this.$message.error({
                                        showClose: false,
                                        message: 'All field is required'
                                    });
                                    checkBtnField = true;
                                    return false
                                }
                            }
                            else{
                                if(_.isEmpty(el.phone) || _.isEmpty(el.text) || _.isEmpty(el.country)){
                                    this.$message.error({
                                        showClose: false,
                                        message: 'All field is required'
                                    });
                                    checkBtnField = true;
                                    return false
                                }
                            }
                        })
                    }
                    else {
                        _.forEach(dataDetail[indexData].quick,(el) => {
                            if(_.isEmpty(el.text)){
                                this.$message.error({
                                    showClose: false,
                                    message: 'All field is required'
                                });
                                checkBtnField = true;
                                return false
                            }
                        })
                    }
                }

                if(dataDetail[indexData].action){

                    _.forEach(dataDetail[indexData].action, (el,i) => {
                        if(dataDetail[indexData].action[i].type == 'visit'){
                            delete detailReq[indexData].action[i].phone;
                            delete detailReq[indexData].action[i].country;
                        }
                        else{
                            delete detailReq[indexData].action[i].url;
                        }
                    })

                }

            }


            if (checkBtnField == true) {
                return
            }

            this.buttonLoading = true

            await api({
                method: 'post',
                url: 'bussiness/message-template/create',
                data: {
                    companyName: this.data.company,
                    category: this.data.template_category,
                    name: this.data.template_name.toLowerCase(),
                    type: this.data.template_type,
                    detail: detailReq,
                    sample: this.sampleData
                }
            }).then(result => {
                var data = result.data.data
                if(result.data.ec != 200){
                    this.$swal({
                        type: 'error',
                        title: this.$t('error'),
                        text: `${result.data.message}`
                    })
                }
                if(data.length > 0){
                    var error_data = data.filter(v => {
                        if(v.status && v.status.toLowerCase() == "error"){
                            return v
                        }
                    })
                    if(error_data.length != 0){
                        let error_str = ''
                        error_data.forEach(v => {
                            error_str = v.error_user_msg
                        })

                        if(error_str == undefined || error_str == null){
                            this.$swal({
                                type: 'error',
                                title: this.$t('error'),
                                text: 'Something went wrong!'+'\n'+'Make sure you have filled in the fields correctly.'
                            })
                        }
                        else{
                            this.$swal({
                                type: 'error',
                                title: this.$t('error'),
                                text: `${error_str}`
                            })
                        }
                    } else {
                        this.$swal(this.$t('success'), this.$t('whatsapp.createTemplate.success'), "success").then(() => {
                            this.clear()
                            this.tempList = []
                            this.getBussinessTemplate()
                            this.activeTab = 'list'
                            this.sampleData = []
                            this.selectedSample = {}
                        })
                    }
                } else {
                    this.$swal(this.$t('success'), this.$t('whatsapp.createTemplate.success'), "success").then(() => {
                        this.clear()
                        this.tempList = []
                        this.getBussinessTemplate()
                        this.activeTab = 'list'
                        this.sampleData = []
                        this.selectedSample = {}
                    })
                }
            }).catch(error => {
                // console.log(error);
                this.$swal(this.$t('error'), this.$t('error_text'), "error")
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

        clear(){
            this.nonGroupList = []
            this.data.template_name = ''
            this.data.template_category = ''
            this.data.detail = [{
                language: '',
                messages: '',
                header: {
                    type: "none",
                    data: null
                },
                footer: "",
                buttons: {
                    type: "none"
                },
                action: [{
                    type: 'call',
                    text: '',
                    country: '',
                    phone: '',
                    url: ''
                }],
                quick: [{
                    text: '',
                }],
                url: [{
                    type: 'static',
                    link: ''
                }]
            }]
            this.message = ''
            this.counter = [1]
            this.counterHeader = [1]
            this.counterBtn = [1]
            this.checkParam = [[]]
            this.checkParamHeader = [[]]
            this.checkParamBtn = [[]]
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
                    this.numbers = result.data.data
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
                        this.tempList = []
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
    watch: {
        // activeTab(){
        //     console.log(this.activeTab);
        // }
        // message : function(){
        //     if(this.message.includes("{{1}}")){
        //         this.exampleBody = true
        //     }
        //     else {
        //         this.exampleBody = false
        //     }

        //     if(this.message.includes('{{') && this.message.includes('}}') && this.message.lastIndexOf('}}') == this.message.length - 2){
        //         if(this.counter == 1 && this.message.includes(`{{${this.counter}}}`) == false){
        //             this.message = this.message.split(' ')
        //             this.message.splice(this.message.length - 1, 1)
        //             this.message = this.message.join(' ')
        //             this.$message.error({
        //                 showClose: false,
        //                 message: `First parameters must be {{1}}`
        //             });
        //          }
        //          if(this.message.includes(`{{${this.counter}}}`) && this.checkParam.join(' ').includes(`{{${this.counter}}}`) == false){
        //             this.checkParam.push(`{{${this.counter}}}`)
        //             this.counter++
        //          }
        //          else {
        //              if(Number(this.message.charAt(this.message.length - 3)) > this.counter)
        //              {
        //                 this.$message.error({
        //                     showClose: false,
        //                     message: `Next parameters must be {{${this.counter}}}`

        //                 });
        //                 this.message = this.message.split(' ')
        //                 this.message.splice(this.message.length - 1, 1)
        //                 this.message = this.message.join(' ')
        //             }
        //             else{
        //                 this.checkParam.forEach( (e,i) => {
        //                     if(this.message.includes(e)){
        //                         this.message = this.message.split(' ')
        //                         let index = this.message.lastIndexOf(e)
        //                         if(index == this.message.length - 1){
        //                             this.$message.error({
        //                             showClose: false,
        //                             message: `Parameters cannot be the same!`
        //                             });
        //                             this.message.splice(this.message.length - 1, 1)
        //                             this.checkParam.splice(this.checkParam.length - 1, 1)
        //                             this.counter--
        //                         }
        //                         this.message = this.message.join(' ')
        //                     }
        //                 })
        //             }
        //          }
        //     }
        //     else{
        //         if(this.counter != 0 && this.message.includes(`{{${this.counter}}}`) && this.checkParam.join(' ').includes(`{{${this.counter}}}`) == false){
        //             this.checkParam.push(`{{${this.counter}}}`)
        //             this.counter++
        //         }
        //         if(this.counter == 2 && this.checkParam.length == 1 && this.message.includes(`{{1}}`) == false){
        //             this.checkParam = []
        //             this.counter = 1
        //         }
        //     }
        // },
        // headerText(){
        //     if(this.data.detail[0].header.data != '' && this.data.detail[0].header.data != null){
        //         if(Number.isInteger(this.data.detail[0].header.data)){
        //             this.exampleHeader = true
        //         }
        //         else{
        //                 if(this.data.detail[0].header.data.includes(`{{1}}`)){
        //                     this.exampleHeader = true
        //                 }
        //                 else{
        //                     this.exampleHeader = false
        //                 }

        //                 if(this.data.detail[0].header.data.includes('{{') && this.data.detail[0].header.data.includes('}}') && this.data.detail[0].header.data.lastIndexOf('}}') == this.data.detail[0].header.data.length - 2){
        //                     if(this.counterHeader == 1 && this.data.detail[0].header.data.includes(`{{${this.counterHeader}}}`) == false){
        //                         this.data.detail[0].header.data = this.data.detail[0].header.data.split(' ')
        //                         this.data.detail[0].header.data.splice(this.data.detail[0].header.data.length - 1, 1)
        //                         this.data.detail[0].header.data = this.data.detail[0].header.data.join(' ')
        //                         this.$message.error({
        //                             showClose: false,
        //                             message: `First parameters must be {{1}}`
        //                         });
        //                     }
        //                     if(this.data.detail[0].header.data.includes(`{{${this.counterHeader}}}`) && this.checkParamHeader.join(' ').includes(`{{${this.counterHeader}}}`) == false){
        //                         this.checkParamHeader.push(`{{${this.counterHeader}}}`)
        //                         this.counterHeader++
        //                     }
        //                     else {
        //                         if(Number(this.data.detail[0].header.data.charAt(this.data.detail[0].header.data.length - 3)) > this.counterHeader)
        //                         {
        //                             this.$message.error({
        //                                 showClose: false,
        //                                 message: `Next parameters must be {{${this.counterHeader}}}`

        //                             });
        //                              this.data.detail[0].header.data =  this.data.detail[0].header.data.split(' ')
        //                              this.data.detail[0].header.data.splice(this.data.detail[0].header.data.length - 1, 1)
        //                              this.data.detail[0].header.data =  this.data.detail[0].header.data.join(' ')
        //                         }
        //                         else{
        //                             this.checkParamHeader.forEach( (e,i) => {
        //                                 if(this.data.detail[0].header.data.includes(e)){
        //                                      this.data.detail[0].header.data =  this.data.detail[0].header.data.split(' ')
        //                                     let index =  this.data.detail[0].header.data.lastIndexOf(e)
        //                                     if(index ==  this.data.detail[0].header.data.length - 1){
        //                                         this.$message.error({
        //                                         showClose: false,
        //                                         message: `Parameters cannot be the same!`
        //                                         });
        //                                         this.data.detail[0].header.data.splice( this.data.detail[0].header.data.length - 1, 1)
        //                                         this.checkParamHeader.splice(this.checkParamHeader.length - 1, 1)
        //                                         this.counterHeader--
        //                                     }
        //                                      this.data.detail[0].header.data =  this.data.detail[0].header.data.join(' ')
        //                                 }
        //                             })
        //                         }
        //                     }
        //                 }
        //                 else{
        //                     if(this.counterHeader != 0 && this.data.detail[0].header.data.includes(`{{${this.counterHeader}}}`) && this.checkParamHeader.join(' ').includes(`{{${this.counterHeader}}}`) == false){
        //                         this.checkParamHeader.push(`{{${this.counterHeader}}}`)
        //                         this.counterHeader++
        //                     }
        //                     if(this.counterHeader == 2 && this.checkParamHeader.length == 1 && this.data.detail[0].header.data.includes(`{{1}}`) == false){
        //                         this.checkParamHeader = []
        //                         this.counterHeader = 1
        //                     }
        //                 }
        //         }

        //     }
        //     else{
        //         this.exampleHeader = false
        //     }
        // }
    },
    computed:{
    },
    async mounted(){
        // this.getTemplateRequest()
        await this.loadWa()
        if(this.showFormMessage){
            this.loadingPage = true
            // console.log(this.activeTab);
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
