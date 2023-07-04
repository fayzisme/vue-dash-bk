<template>
	<div class="scrollable only-y" v-loading="loadingForm">
    <div class="page-header">
			<h1>{{ $t("whatsapp.whatsapp") }}</h1>
		</div>

    <el-card v-if="showAlertMessage" align="center">
      <h2>Start messaging your customers today</h2>
      <span v-html="$t('promote.desc.whatsapp')"></span>
      <br/><br/>
			<span><el-button @click="mailto()">Send us e-mail</el-button></span>
      <div v-if="customer_type==2 && businessId==undefined || businessId==''" style="margin: 0 0 20px;">
        <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px; margin-top: 20px;">Connect to Facebook</button>
      </div>
    </el-card>

    <el-card v-if="showAlertError" style="margin-bottom: 1em">
      <error-gope-siji />
		</el-card>

    <!-- <div style="margin-bottom: 10px;" v-if="showFormMessage && customer_type == 2">
      <el-card v-if="fillProductNotif.length > 0" style="background-color: #249393; color: white;" v-loading="quotaLoader">
				<el-row type="flex" justify="space-around">
					<el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <el-row>
               <el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                <div style="padding-top: 5px;">
                {{ $t("settings.profile.quota") }} :
                </div>
              </el-col>
              <el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                 <div style="padding-top: 5px;">
                <strong>{{quota}}</strong>
                 </div>
              </el-col>
            </el-row>
           
					</el-col>
					<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-row>
              <el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div style="padding-top: 5px;">
                  {{ $t("settings.profile.number") }} :
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-select size='small' v-model="selectNumber" @change="handleChangeQuota" :default-first-option="true">
                  <el-option
                    v-for="item in whatsappNumber"
                    :key="item"
                    :label="item"
                    :value="item" />
                </el-select>
              </el-col>
            </el-row>
						
					</el-col>
					<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-row>
              <el-col style="text-align:center;" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div style="padding-top: 5px;">
                  {{ $t("settings.profile.notification") }} :
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-select size='small' v-model="product_type" @change="handleChangeProduct" :default-first-option="true">
                  <el-option
                    v-for="(item,i) in fillProductNotif"
                    :key="i"
                    :label="item.product.alias"
                    :value="item.product._id" />
                </el-select>
              </el-col>
            </el-row>
						
					</el-col>
				</el-row>
			</el-card>
      <el-card v-else style="background-color: #249393; color: white;" v-loading="quotaCardLoader"></el-card>
    </div> -->
    

    <el-card v-if="showFormMessage">
      <el-steps :active="step" align-center>
        <el-step :title="$t('whatsapp.step_1')" :description="$t('whatsapp.step_1_description')"></el-step>
        <el-step :title="$t('whatsapp.step_2')" :description="$t('whatsapp.step_2_description')"></el-step>
        <el-step :title="$t('whatsapp.step_3')" :description="$t('whatsapp.step_3_description')"></el-step>
      </el-steps>

      <!-- STEP 1 -->
      <template v-if="step == 0">
        <el-form label-position="top" label-width="100px" :model="form">
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              <el-card v-if="waUserDetail.headerTemp && waUserDetail.templateHeaderFormat.toLowerCase()=='text'" shadow="never">
                <div>
                  <h5>Header format : <el-tag>{{waUserDetail.templateHeaderFormat}}</el-tag> Header text preview : <el-tag>{{parsingDataHeader(choose_template, waUserDetail.headerText)}}</el-tag></h5>
                </div>
                <div v-if="paramHeaderText == true" class="mt-10">
                  <el-input v-model="waUserDetail.headerText" type="text" placeholder="Insert header text parameter"></el-input>
                </div>
              </el-card>

              <el-card v-if="waUserDetail.headerTemp && waUserDetail.templateHeaderFormat.toLowerCase()=='image'" shadow="never">
                <div>
                  <h5>Header format : <el-tag>{{waUserDetail.templateHeaderFormat}}</el-tag></h5>
                </div>
                <template>
                  <el-select v-model="mediaSource" placeholder="Select image source">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
                <div class="mt-10">
                  <el-input v-if="mediaSource=='url'" v-model="waUserDetail.headerImage" type="text" placeholder="Insert image URL here"></el-input>
                  <div style="width: 1500px; min-width: 0; display: table-cell;">
                    <el-upload v-if="mediaSource=='local'" v-model="waUserDetail.headerImage"
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
                  </div>

                  <div>
                    <el-input v-if="mediaSource=='csv'" placeholder="Please input CSV header" v-model="waUserDetail.headerCSV">
                      <template slot="prepend">{{ waUserDetail.hashtag_csv }}</template>
                    </el-input>
                  </div>
                </div>
              </el-card>

              <el-card v-if="waUserDetail.headerTemp && waUserDetail.templateHeaderFormat.toLowerCase()=='document'" shadow="never">
                <div>
                  <h5>Header format : <el-tag>{{waUserDetail.templateHeaderFormat}}</el-tag></h5>
                </div>
                <template>
                  <el-select v-model="mediaSource" placeholder="Select document source">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
                <div class="mt-10">
                  <el-input v-if="mediaSource=='url'" v-model="waUserDetail.headerDocument" type="text" placeholder="Insert document URL here"></el-input>
                  <el-upload v-if="mediaSource=='local'" v-model="waUserDetail.headerDocument"
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
                  <div>
                    <el-input v-if="mediaSource=='csv'" placeholder="Please input CSV header" v-model="waUserDetail.headerCSV">
                      <template slot="prepend">{{ waUserDetail.hashtag_csv }}</template>
                    </el-input>
                  </div>
                </div>
              </el-card>

              <el-card v-if="waUserDetail.headerTemp && waUserDetail.templateHeaderFormat.toLowerCase()=='video'" shadow="never">
                <div>
                  <h5>Header format : <el-tag>{{waUserDetail.templateHeaderFormat}}</el-tag></h5>
                </div>
                <template>
                  <el-select v-model="mediaSource" placeholder="Select video source">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
                <div class="mt-10">
                  <el-input v-if="mediaSource=='url'" v-model="waUserDetail.headerVideo" type="text" placeholder="Insert video URL here"></el-input>
                  <el-upload v-if="mediaSource=='local'" v-model="waUserDetail.headerVideo"
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
                  <div>
                    <el-input v-if="mediaSource=='csv'" placeholder="Please input CSV header" v-model="waUserDetail.headerCSV">
                      <template slot="prepend">{{ waUserDetail.hashtag_csv }}</template>
                    </el-input>
                  </div>
                </div>
              </el-card>

              <div v-if="choose_template">
              <el-form-item class="mb-0" :label="'Param ' + i" v-for="i in paramCount" :key="i">
                <el-input type="text" v-model="param[i-1]"></el-input>
              </el-form-item>
              </div>
              <el-form-item class="mb-0" :label="'Filename'" v-if="sendCategory == 'document'">
                <el-input type="text" v-model="filename"></el-input>
              </el-form-item>
              <el-form-item class="mb-0" :label="$t('whatsapp.message')" v-if="['image','text'].indexOf(sendCategory) > -1">
                <el-input type="textarea" :value="parsingData(choose_template, param)" rows="8" v-if="choose_template" readonly=""></el-input>
                <p class="float-right m-0" v-if="choose_template">{{ parsingData(choose_template, param).length }} {{ $t('whatsapp.characters') }}</p>
                <el-input type="textarea" v-model="form.message" rows="8" v-if="!choose_template" readonly></el-input>
                <p class="float-right m-0" v-if="!choose_template">{{ form.message.length }} {{ $t('whatsapp.characters') }}</p>

                <!-- BUTTON -->
                <div v-if="template_button != '' && template_button != undefined">
                  <el-card v-for="(item, k) in buttonElement" :key="k" shadow="never" class="mt-50" >
                    <!-- <el-tag>This template include a button dynamic url</el-tag> -->
                    <el-form-item class="mb-0" :label="'Button Type'">
                      <el-input type="text" readonly v-model="item.type"></el-input>
                    </el-form-item>
                    <el-form-item class="mb-0" :label="'Button Text'">
                      <el-input type="text" readonly v-model="item.text"></el-input>
                    </el-form-item>
                    <el-form-item class="mb-0" :label="'Button Preview'">
                      <el-button disabled >{{ item.text }}</el-button>
                    </el-form-item>
                    <div v-if="paramCountUrl > 0">
                      <el-form-item  class="mb-20" :label="'Param ' + i" v-for="i in paramCountUrl" :key="i">
                        <el-input type="text" v-model="paramButton[i-1]"></el-input>
                      </el-form-item>
                    </div>
                    <el-input type="textarea" class="mt-15" :value="parsingDataButton(choose_template, paramButton)" :style="[parsingDataButton(choose_template, paramButton) == '' ? {'display': 'none'}:{'display':'inline-block'}]" rows="8"  readonly=""></el-input>
                  </el-card>
                </div>
              </el-form-item>
            </el-col>
            <el-col class="mt-10" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <el-form-item label="Template">
                <el-select filterable v-model="choose_template" @change="resetTemplate">
                  <el-option label="No Template" value=""></el-option>
                  <el-option v-for="item in waUserDetail.hsm" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <div class="font-size-14">
                <p class="mb-0">{{ $t('whatsapp.use') }} :</p>
                <ul class="mt-0">
                  <li>*text* {{ $t('whatsapp.to_get') }} <strong>text</strong></li>
                  <li>_text_ {{ $t('whatsapp.to_get') }} <i>text</i></li>
                  <li>~text~ {{ $t('whatsapp.to_get') }} <del>text</del></li>
                  <li>```code``` {{ $t('whatsapp.to_get') }} <span style="font-family:monospace">code</span></li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="footer">
          <el-button :disabled="disabledButtonNext" type="primary" @click="stepHandle(1)" class="mt-10 mb-20 float-right">{{ $t('generic.next') }} <i class="mdi mdi-arrow-right-bold-circle"/></el-button>
        </div>
      </template>

      <!-- STEP 2 -->
      <template v-if="step == 1">
        <el-form label-position="top" label-width="100px" :model="form">
          <h2>Sending Time</h2>
          <div>
            <el-radio v-if="allowMakerChecker.options_value == 'false' || allowMakerChecker.options_value == false" v-model="sendTime" label="now" border @change="resetSendDate()">Now</el-radio>
            <el-radio v-model="sendTime" label="later" border @change="resetSendDate()">Later</el-radio>
          </div>
          <div class="mt-10" v-if="sendTime == 'later'">
            <el-date-picker v-model="scheduleDate" type="date" placeholder="Pick a day" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :picker-options="{
                disabledDate: disabledDate
              }"></el-date-picker>
            <el-time-select placeholder="Select time" v-model="scheduleTime" class="ml-10" :disabled="scheduleDate ? false : true"
              :picker-options="{
                start: scheduleTimeStart,
                step: '01:00',
                end: '23:59'
              }"></el-time-select>
          </div>
          <h2>Sender</h2>
          <div>
            <el-radio v-for="item in waUserDetail.sender" @change="alternatifEmail = false, handleChangeQuota()" :key="item" v-model="sender" :label="item" border>{{item}}</el-radio>
            <!-- <br><br><el-checkbox @change="checkIfEmailIntegrate(), alternatifSms = false" v-if="sender != ''" v-model="alternatifEmail">Send with email if failed</el-checkbox> -->
            <!-- <el-checkbox @change="checkIfSmsIntegrate(), alternatifEmail = false" v-if="sender != ''" v-model="alternatifSms">Send with SMS if failed</el-checkbox> -->
          </div>
          <h2>Recipients</h2>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              <el-alert :closable="false" :title="countTo + ' Recipients'" class="mt-10"></el-alert>
              <div>
                <el-tag class="mt-10" :key="i.id" v-for="i in selectedRecipient.slice(0,10)" closable :disable-transitions="true" @close="handleCloseRecipient(i)">{{i.name}}</el-tag>
                <el-tag class="mt-10" v-if="selectedRecipient.length > 10">+{{ selectedRecipient.length - 10 }} more</el-tag>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <div class="mt-10">
                <el-button type="primary" class="full-button text-left" @click="openCsvDialog"><i class="mdi mdi-plus-circle"></i> Add from CSV</el-button>
              </div>
              <div class="mt-10">
                <el-button v-if="!alternatifEmail && !itHas && !itHasBtn && !alternatifSms" type="primary" class="full-button text-left" @click="openGroupDialog"><i class="mdi mdi-plus-circle"></i> Add from group</el-button>
              </div>
              <div class="mt-10">
                <el-button v-if="!alternatifEmail && !itHas && !itHasBtn && !alternatifSms" type="primary" class="full-button text-left" @click="openContactDialog"><i class="mdi mdi-plus-circle"></i> Add from contact</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="footer">
            <el-button @click="step = 0; resetTemplate(false, false);" class="mt-10 mb-20 float-left"><i class="mdi mdi-arrow-left-bold-circle"/> {{ $t('generic.back') }}</el-button>
            <el-button type="primary" @click="stepHandle(2)" class="mt-10 mb-20 float-right">{{ $t('generic.next') }} <i class="mdi mdi-arrow-right-bold-circle"/></el-button>
          </div>
        </el-form>
      </template>

      <!-- STEP 3 -->
      <template v-if="step == 2">
        <el-form label-position="top" label-width="100px" :model="form">
          <h2>Verify your message</h2>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              <el-form-item :label="labelName[sendCategory]" v-if="['audio', 'document'].indexOf(sendCategory) < 0">
                <el-input type="textarea" v-if="!choose_template" v-model="form.message" rows="5" readonly=""></el-input>
                <el-input type="textarea" v-if="choose_template" :value="parsingPreview()" rows="5" readonly=""></el-input>
              </el-form-item>
              <el-form-item v-if="waUserDetail.templateHeaderFormat" label="Header type">
                <el-input :value="waUserDetail.templateHeaderFormat" readonly=""></el-input>
              </el-form-item>
              <el-form-item v-if="waUserDetail.templateHeaderFormat.toLowerCase()=='image' && mediaSource!='csv'" label="Media URL">
                <el-input v-if="waUserDetail.templateHeaderFormat.toLowerCase()=='image'" :value="waUserDetail.headerImage" readonly=""></el-input>
                <el-input v-else-if="waUserDetail.templateHeaderFormat=='document'" :value="waUserDetail.headerDocument" readonly=""></el-input>
              </el-form-item>

              <el-form-item v-if="waUserDetail.templateHeaderFormat.toLowerCase()=='video' && mediaSource!='csv'" label="Media URL">
                <el-input v-if="waUserDetail.templateHeaderFormat.toLowerCase()=='video'" :value="waUserDetail.headerVideo" readonly=""></el-input>
                <!-- <el-input v-else-if="waUserDetail.templateHeaderFormat=='document'" :value="waUserDetail.headerDocument" readonly=""></el-input> -->
              </el-form-item>

              <el-form-item v-if="waUserDetail.templateHeaderFormat=='document' && mediaSource!='csv'" label="Media URL">
                <el-input v-if="waUserDetail.templateHeaderFormat.toLowerCase()=='image'" :value="waUserDetail.headerImage" readonly=""></el-input>
                <el-input v-else-if="waUserDetail.templateHeaderFormat=='document'" :value="waUserDetail.headerDocument" readonly=""></el-input>
              </el-form-item>
              <el-form-item v-if="waUserDetail.templateHeaderFormat && mediaSource=='csv'" label="Header CSV">
                <el-input :value="waUserDetail.hashtag_csv+waUserDetail.headerCSV" readonly=""></el-input>
              </el-form-item>
              <el-form-item v-if="waUserDetail.templateHeaderFormat=='text' && paramHeaderText == true" label="Text header parameter">
                <el-input :value="waUserDetail.headerText" readonly=""></el-input>
              </el-form-item>
              <el-form-item label="File name" v-if="['audio', 'document'].indexOf(sendCategory) >= 0">
                <el-input :value="filename+'.'+extensionFile" readonly=""></el-input>
              </el-form-item>
              <el-form-item :label="'Preview'" v-if="sendCategory == 'image'" class="image">
                <img :src="dataFile" width="268" />
              </el-form-item>
              <div v-for="(item, k) in buttonElement" :key="k">
                <el-form-item v-if="template_button != '' && template_button != undefined" label="Button Type">
                  <el-input type="text" v-if="choose_template" v-model="item.type" rows="5" readonly=""></el-input>
                  <!-- <el-input type="textarea" v-if="choose_template" :value="parsingPreviewButton()" rows="5" readonly=""></el-input> -->
                </el-form-item>
                <el-form-item v-if="template_button != '' && template_button != undefined" :class="[item.type == 'URL' ? 'mb-0' : 'mb-20']" :label="'Button Preview'">
                  <el-button disabled >{{ item.text }}</el-button>
                </el-form-item>
                <el-form-item class="mt-20" v-if="template_button != '' && template_button != undefined && item.type == 'URL'" label="Button URL">
                  <el-input type="text" v-if="!choose_template" v-model="form.buttonContents" rows="5" readonly=""></el-input>
                  <el-input type="text" v-if="choose_template" :value="parsingPreviewButton()" rows="5" readonly=""></el-input>
                </el-form-item>
              </div>

              <el-form-item label="Number of recipients">
                <el-input :value="countTo" readonly=""></el-input>
              </el-form-item>
              <el-form-item label="Sender">
                <el-input :value="sender" readonly=""></el-input>
              </el-form-item>
              <el-form-item label="Sending Time">
                <el-input :value="sendTime == 'later' ? actualSendTime : 'Now'" readonly=""></el-input>
              </el-form-item>
            </el-col>
            <el-col class="mt-10" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">

            </el-col>
          </el-row>
          <div class="footer">
            <el-button @click="step = 1" class="mt-10 mb-20 float-left"><i class="mdi mdi-arrow-left-bold-circle"/> {{ $t('generic.back') }}</el-button>
            <el-button type="primary" :loading="btnLoading" @click="sendMessage()" class="mt-10 mb-20 float-right" v-if="!choose_template && sendCategory == 'text'">{{ $t('submit') }}</el-button>
            <el-button type="primary" :loading="btnLoading" @click="sendHSM()" class="mt-10 mb-20 float-right" v-if="choose_template"><i class="mdi mdi-check-circle"/> {{ $t('submit') }}</el-button>

            <el-button type="primary" :loading="btnLoading" @click="sendAudio()" class="mt-10 mb-20 float-right" v-if="!choose_template && sendCategory == 'audio'">{{ $t('submit') }}</el-button>
            <el-button type="primary" :loading="btnLoading" @click="sendDocument()" class="mt-10 mb-20 float-right" v-if="!choose_template && sendCategory == 'document'">{{ $t('submit') }}</el-button>
            <el-button type="primary" :loading="btnLoading" @click="sendImage()" class="mt-10 mb-20 float-right" v-if="!choose_template && sendCategory == 'image'">{{ $t('submit') }}</el-button>
          </div>
        </el-form>
      </template>
    </el-card>

    <el-dialog title="Add From Group" :visible.sync="groupDialog.visible">
      <el-table :data="groups" style="width: 100%" @selection-change="handleGroupSelectionChange" ref="groupTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="group_name" label="Group Name"></el-table-column>
        <el-table-column prop="member" label="Number of Contact"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="groupDialog.visible = false">{{ $t("submit") }}</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Add From Contact" :visible.sync="contactDialog.visible">
      <div>
       <el-input
          class="search-contact"
          prefix-icon="el-icon-search"
          :placeholder="$t('contact.search')"
          clearable
          @keypress.native="doSearchContact"
          @clear="loadContactAll"
          @keyup.native.delete="doSearchContact"
          v-model="searchContact">
        </el-input>
      </div><br>
      <div class="clearfix">
        <el-pagination @current-change="nextContact" :current-page="currentPageContact" background layout="prev, pager, next" :total="contactsTotal"></el-pagination>
      </div><br>
      <el-table v-loading="loadingContact" :data="contacts" style="width: 100%" @select="handleContactSelectSingle" @select-all="handleContactSelect" ref="contactTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="phone_number" label="Phone Number"></el-table-column>
        <el-table-column prop="name" label="Fullname"></el-table-column>
        <template slot="empty" style="height: 200px">
          <p align="center" style="color: #909399">
            <img src="@/assets/images/no_contact@3x.png" width="100">
            <br/>Contact not found
          </p>
        </template>
      </el-table><br>
      <div class="clearfix">
        <el-pagination @current-change="nextContact" :current-page="currentPageContact" background layout="prev, pager, next" :total="contactsTotal"></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="selectAllContact" circle>All</el-button>
        <el-button type="primary" @click="contactDialog.visible = false">{{ $t("submit") }}</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Add From CSV" :visible.sync="csvDialog.visible">
      <el-form label-position="left" label-width="150px" element-loading-text="Please wait while we read your file...">
        <el-form-item label="File" class="mb-0">
          <div class="el-input">
            <input type="file" class="uploader el-input__inner" @change="onUploadCsv" accept=".csv" id="inputCsvFile">
          </div>
          <el-progress :percentage="uploadCsvProgress"></el-progress>
        </el-form-item>
        <el-form-item label="" class="tooltip" v-if="mandatoryHeader.length > 0">
          <p>{{ $t('whatsapp.csv_upload_info') }}:
            <ul v-for="(column, index) in mandatoryHeader" :key="index">
              <li>{{ column }}</li>
            </ul>
          </p>
        </el-form-item>
        <!-- <el-form-item label="File has header" class="mb-0">
          <el-switch v-model="csvHaveHeader"></el-switch>
        </el-form-item> -->
        <!-- <el-form-item label="" class="tooltip">
          <span v-if="csvHaveHeader" class="warning-text">Make sure you have data in column 'Phone Number'</span>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="readingCsv" :disabled="readingCsv == false ? false : true" @click="renderCsvData">{{ $t("submit") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import api from '@/networkClient'
import axios from 'axios'
import config from '@/config'
import moment from 'moment-timezone'
import _ from 'lodash'
const path = require('path')
var filesize = require('filesize');
const size = filesize.partial({standard: "iec"});
const fs = require("fs");
import store from '@/store'

export default {
  data() {
    return {
      customer_type: store.getters.customer_type,
      accessToken:"EAAUgLzR0jD0BAIuWaS2zHlR6tqdzeQWHHHajrRAmCHP5IelBMcGrI0LYzLghivOTOMSRDUFZBpgYI1gIyuUVhKXTKqjgEPYHZAFC1FpuMUPjDczkPZAx12mUn9yYQIqELz9LN7mE1wr6AhUgHKC5p5Ev5rv1PxZBRcIvMruvphlaJl5S67gZBT3RrZALZArtx5LBPw3nEyf0Utw7hJY6a0z",
      paramHeaderText: false,
      documentFileName: '',
      uploadCsvProgress: 0,
      showFormMessage: false,
      showAlertMessage: false,
      btnLoading: false,
      alternatifEmail: false,
      alternatifSms: false,
      step : 0,
      sampleParam: [],
      sampleParamUrl: [],
      form :{
        message : '',
        buttonContents: ''
      },
      labelName: {
        text: 'Preview Message',
        hsm: 'Preview Message',
        image: 'Caption',
        document: 'Filename'
      },
      groupDialog : {
        visible : false
      },
      csvDialog : {
        visible : false
      },
      contactDialog : {
        visible : false
      },
      groups : [],
      groupSelection: [],
      contacts : [],
      contactsTotal: 0,
      contactSelection : [],
      loadingContact: false,
      currentPageContact: 1,
      selectedRecipient : [],
      waUserDetail : {
        hsm : [],
        sender : {},
        headerTemp: '',
        templateHeaderType: '',
        templateHeaderFormat: '',
        templateHeaderText: '',
        urlButtonText: '',
        headerText: '',
        headerImage: '',
        headerDocument: '',
        headerVideo: '',
        hashtag_csv: '#csv_',
        headerCSV: '',
        csv_header: '',
        mediaExt: '',
        imageSource: '',
        footer: '',
        button: {}
      },
      handleListMedia: [],
      options: [
      {
        value: 'local',
        label: 'Local Computer'
      },
      {
        value: 'url',
        label: 'URL'
      }, {
        value: 'csv',
        label: 'CSV'
      }],
      mediaSource: '',
      fileList: [],
      sender : '',
      template : 'No Template',
      choose_template : '',
      paramCount : 0,
      paramCountUrl: 0,
      headerParamCount: 0,
      param: [],
      paramButton: [],
      buttonParam: [],
      buttonElement: [{
        text: '',
        type: '',
        url: ''
      }],
      bulkparam: [],
      mandatoryHeader: ['phone'],
      recipientDataSource: "",
      dataFile : '',
      acceptedFile : false,
      extensionFile : '',
      filename : '',
      csvHaveHeader : false,
      csvData : [],
      sendTime:'now',
      scheduleDate:'',
      scheduleTime:'',
      loadingForm: true,
      readingCsv: false,
      showAlertError: false,
      template_message: '',
      template_header: '',
      template_button: '',
      itHas: false,
      itHasBtn: false,
      timeout: null,
      searchContact: '',
      allowMakerChecker: true,
      quotaLoader: false,
      quotaCardLoader: false,
      totalBill: 0,
			quota: 0,
      whatsappNumber: [],
			whatsappBilling: [],
			fillProductNotif: [],
      billing_product_log: [],
			dataProduct: [],
			selectNumber: '',
			product_type: '',
      disabledButtonNext: false
    }
  },
  methods:{
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.waUserDetail.headerImage = ""
      this.waUserDetail.headerDocument = ""
      this.waUserDetail.headerVideo = ""
    },
    // handlePreview(file) {
    //   console.log(file);
    // },
    handleExceed(files, fileList) {
      // this.$message.warning('The limit is 3, you selected'+files.length+' files this time, add up to '+files.length + fileList.length'+ totally');
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(file.name+'?');
    },
    // async wa_billing(query = ""){
    //   this.quotaCardLoader = true
		// 	let apiOptions = {
    //             url: config.baseApi + "/user/billing",
    //             method: 'post',
    //             data:{
		// 			months: moment().format('YYYY-MM'),
		// 			with_date: true
		// 		},
		// 		timeout: 90000
		// 	}
		// 	this.totalBill = 0
		// 	await api(
		// 		apiOptions
		// 	).then(result => {
		// 		let tempNumber = new Array()
		// 		let tempBilling = new Array()
		// 		let i = 0
		// 		let date = ""
		// 		if (result.data.ec == 200){
		// 			// console.log("==result==",result)
		// 			this.dataProduct = result.data.data.billing
		// 			this.billing_product_log = result.data.data.update_log
		// 			let responseBilling = result.data.data.billing,
		// 					update_log = result.data.data.update_log
						
		// 				_.forEach(responseBilling, dt => {
		// 					tempNumber.push(dt.phone_number)
		// 					tempBilling[i] = new Array()
		// 					let tempTax = new Array()
		// 					let j = 0
		// 					_.forEach(dt.billing, billing => {
		// 						let dtpush = {
		// 							product: billing.product,
		// 							delivered: billing.delivered,
		// 							total: billing.billing,
		// 							detail: billing.detail
		// 						}

		// 						if(billing.serviceFee){
		// 							this.totalBill += parseFloat(billing.serviceFee)
		// 							tempTax.push({ product: { productName: "Service Fee", type: "" }, delivered: "", total: parseFloat(billing.serviceFee) })
		// 						} else {
		// 							let fee = 0
		// 							if(billing.detail) {
		// 								billing.detail.forEach(e => {
		// 									fee += parseFloat(e.serviceFee)
		// 								})
		// 								this.totalBill += parseFloat(fee)
		// 								tempTax.push({ product: { productName: "Service Fee", type: "" }, delivered: "", total: parseFloat(fee) })
		// 							}
		// 						}
		// 						// if(billing.serviceFeeTax){
		// 						// 	this.totalBill += parseFloat(billing.serviceFeeTax)
		// 						// 	tempTax.push({ product: { productName: "Service Fee Tax", type: "" }, delivered: "", total: parseFloat(billing.serviceFeeTax) })
		// 						// }
		// 						if(billing.billingTax){
		// 							this.totalBill += parseFloat(billing.billingTax)
		// 							tempTax.push({ product: { productName: billing.product.productName + " Tax", type: "" }, delivered: "", total: parseFloat(billing.billingTax) })
		// 						}

		// 						tempBilling[i].push(dtpush)
		// 						if(j+1 == dt.billing.length){
		// 							_.forEach(tempTax, tax => {
		// 								tempBilling[i].push(tax)
		// 							})
		// 						}
		// 						if(Array.isArray(billing.detail)) {
		// 							billing.detail.forEach(detail => {
		// 								this.totalBill += detail.total
		// 							})
		// 						} else {
		// 							this.totalBill += billing.billing
		// 						}
		// 						j++
		// 					})
		// 					i++;
		// 				})
		// 				this.whatsappNumber = tempNumber
		// 				this.whatsappBilling = tempBilling
		// 				// console.log("==tempNumber==",tempNumber)
		// 				// console.log("==tempbilling==",tempBilling)
		// 				this.selectNumber = this.whatsappNumber[0]
		// 				this.handleChangeQuota()	
		// 		} 
		// 		else{
		// 			this.dataProduct = []
		// 		}
    //     this.quotaCardLoader = false
		// 	}).catch(error => {
		// 		this.dataProduct = []
		// 		// console.log(error.message)
		// 		// this.$swal(this.$t('error'), this.$t('error_text'), "error")
		// 	})
		// },
    handleChangeQuota(){
			this.product_type = ''
			let selectedNumber = _.find(this.dataProduct, (v) => {
                return v.phone_number == this.selectNumber
            })

			if (selectedNumber && selectedNumber.billing.length > 0) {
				this.fillProductNotif = selectedNumber.billing.filter(el => {
					return el.product.productName.includes('Whatsapp Notification')
				})

				if (this.fillProductNotif.length > 0) {
					
					this.fillProductNotif.forEach(el => { el.product.alias = el.product.type.replace(/_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())})

					if (this.product_type == '') {
						this.product_type = this.fillProductNotif[0].product._id
					}

					this.handleChangeProduct()

				}
			}
		},
    handleChangeProduct(){
      this.quotaLoader = true
			let totalUse = 0
			let productQuota = _.find(this.fillProductNotif, (v) => {
				return v.product._id == this.product_type
			})

			let tempQuota = productQuota.product.count || 0
			tempQuota += productQuota.product.monthly_free_count || 0

			if (productQuota.detail && productQuota.detail > 0) {
				totalUse = productQuota.detail.filter(el => el.countryCode == '+62').reduce((accumulator, currentValue) => accumulator + currentValue.count, 0) || 0
			}
			else {
				totalUse = productQuota.delivered
			}

			this.quota = tempQuota - totalUse

			if (this.quota < 0) {
				this.quota = '-'
			}

      this.quotaLoader = false
		},
    doSearchContact(){
      clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
        if(this.searchContact.length >= 3){
          this.currentPageContact = this.currentPageGroupContact = this.currentPage = 1
          this.doGetSearchContact(this.searchContact)
        } else{
          this.loadContactAll()
        }
			}, 1000)
    },
    // async debugToken(){
		// 	await api({
		// 		method: 'get',
		// 		url: 'bussiness/checkBusinessId',
		// 	}).then(result => {
		// 		if(result.data.ec != 200 && result.data.message == "not_subscribe"){
		// 			this.showAlertMessage = true
		// 		} else {
		// 			this.businessId = result.data.dataString
		// 			console.log('bus id',this.businessId)
		// 		}
		// 	}).catch(error => {
		// 	})	
		// },
    async doGetSearchContact(query = "", page = 1){
      this.loadingContact = true
      await api({
        method: 'get',
        url: 'phonebook/search',
        params:{
          page: page,
          query: query,
          group_id: ""
        }
      }).then(result => {
        this.contacts = result.data.data.contact
        this.contactsTotal = result.data.rows
      }).catch(error => {
        this.showAlertError = true
      })

      this.loadingContact = false
      this.refreshCheckboxContact()
    },
    checkParamHasHastag(){
      // console.log('param', this.param);
      // console.log('paramBtn', this.paramButton);
      this.itHas = false
      this.itHasBtn = false
      let regHashtag = /(^|\s)(#[a-z\d-]+)/ig

      _.forEach(this.param, val => {
        let regReplace = /#(\S*)/g
        let isHashtag = regHashtag.test(val)
        if(isHashtag == true){
          this.itHas = true
          return
        }
      })

      _.forEach(this.paramButton, val => {
        let isHashtagBtn = regHashtag.test(val)
        if(isHashtagBtn == true){
          this.itHasBtn = true
          return
        }
      })
      // return this.itHas
    },
    async checkIfEmailIntegrate(){
      if(this.alternatifEmail == true){
        this.loadingForm = true
        await api({
          method: 'post',
          url: 'email/detail',
          data: {
            number: this.sender
          }
        })
        .then(res => {
          if(res.data.ec == 200){
            if(res.data.data.length == 0){
              this.$swal(this.$t('error'), this.$t('email.not_subscribe'), "warning")
            } else{
              this.$swal(this.$t('success'), this.$t('email.confirm_redirect'), "success")
              this.mandatoryHeader.push('email')
            }
          } else if(res.data.ec == 400 && res.data.message == "not_subscribe"){
            this.$swal(this.$t('error'), this.$t('email.not_subscribe'), "warning")
            this.alternatifEmail = false
          }
        })
        .catch(err => {
          this.alternatifEmail = false
        })
        this.loadingForm = false
      }
    },
    async checkIfSmsIntegrate(){
      if(this.alternatifSms == true){
        this.loadingForm = true
        await api({
          method: 'post',
          url: 'sms/detail',
          data: {
            number: this.sender
          }
        })
        .then(res => {
          if(res.data.ec == 200){
            if(res.data.data.length == 0){
              this.$swal(this.$t('error'), this.$t('sms.not_subscribe'), "warning")
            } else{
              this.$swal(this.$t('success'), this.$t('success'), "success")
              this.mandatoryHeader.pull('email')
            }
          } else if(res.data.ec == 400 && res.data.message == "not_subscribe"){
            this.$swal(this.$t('error'), this.$t('sms.not_subscribe'), "warning")
            this.alternatifEmail = false
          }
        })
        .catch(err => {
          this.alternatifEmail = false
        })
        this.loadingForm = false
      }
    },
    throwQuestion(cb) {
      this.$swal({
        title: 'Are you sure?',
        text: "This action will replace current selected recipients",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, overide it!'
      }).then((result) => {
        if (result) {
          this.resetRecipients()
          cb()
        }
        return false
      }).catch((cancel) =>{
        return false
      })
    },
    mailto(){
			location.href='mailto: business.solution@damcorp.id'
		},
    disabledDate(date) {
      if (moment(date).isBefore(moment(), 'date')) {
        return true
      }
      return false
    },
    resetSendDate(){
      this.scheduleDate = ''
      this.scheduleTime = ''
    },
    selectAllContact(){
      this.selectedRecipient = [{ contact: "*", id: 0, name: "All", type: "contact" }]
      this.contactDialog.visible = false
    },
    resetRecipients() {
      this.bulkparam = [];
      this.contactSelection = [];
      this.groupSelection = [];
      this.csvData = [];
      this.bulkParam = [];
      this.selectedRecipient = [];
      if (this.$refs.groupTable) {
        this.$refs.groupTable.clearSelection()
      }
      this.updateSelected();
      if(document.getElementById('inputCsvFile') != null){
        document.getElementById('inputCsvFile').value = ""
      }
    },
    resetTemplate(resetParam = true, resetRecipients = true){
      // console.log('template nya',this.choose_template)
      // console.log('this hsm nya',this.waUserDetail.hsm)
      if(resetParam){
        this.param = [];
        this.paramButton = [];
        this.paramCountUrl = 0
        this.buttonElement = [{
          text: '',
          type: '',
          url: ''
        }]
      }

      this.template_message = _.find(this.waUserDetail.hsm, (val) => {
        return val.name == this.choose_template
      }).message

      this.template_header =  _.find(this.waUserDetail.hsm, (val) => {
        return val.name == this.choose_template
      }).header

      this.template_button =  _.find(this.waUserDetail.hsm, (val) => {
        return val.name == this.choose_template
      }).buttons

      if(this.template_header == undefined){
        this.waUserDetail.headerTemp = "";
        this.waUserDetail.templateHeaderFormat = "";
      }

      this.waUserDetail.headerImage = ""
      this.waUserDetail.headerDocument = ""
      this.waUserDetail.headerVideo = ""

      if(resetRecipients) this.resetRecipients();
    },
    stepHandle(step){
      let current_step = step - 1

      switch(current_step){
        // Handle first step. Message should not empty.
        case 0:
          let findImage = _.indexOf(["jpg", "jpeg", "png"], this.extensionFile)
          var size = filesize(findImage);
          // console.log('File size : ',size)
          let findDoc = _.indexOf(["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"], this.extensionFile)
          let findAudio = _.indexOf(["aac", "m4a", "amr", "mp3", "ogg", "opus"], this.extensionFile)

          if(this.mediaSource == '' && ["image", "document"].indexOf(this.waUserDetail.templateHeaderFormat) !== -1){
              this.$swal(this.$t('error'), "Please choose media source", "warning")
              return
          }

          if(this.mediaSource == 'local' && this.waUserDetail.templateHeaderFormat.toLowerCase() == "image"){
            if(this.waUserDetail.headerImage == ""){
              this.$swal(this.$t('error'), "Please choose your image", "warning")
              return
            }
          }
          else if(this.mediaSource == 'csv' && this.waUserDetail.templateHeaderFormat.toLowerCase() == "image"){
            if(this.waUserDetail.headerCSV == ""){
              this.$swal(this.$t('error'), "Please input your image header of CSV", "warning")
              return
            }
          }
          else if(this.mediaSource == 'url' && this.waUserDetail.templateHeaderFormat.toLowerCase() == "image"){
            if(this.waUserDetail.headerImage == ""){
              this.$swal(this.$t('error'), "Please input your image url", "warning")
              return
            }
          }
          else if(this.mediaSource == 'local' && this.waUserDetail.templateHeaderFormat == "document"){
            if(this.waUserDetail.headerDocument == ""){
              this.$swal(this.$t('error'), "Please choose your document", "warning")
              return
            }
          }
          else if(this.mediaSource == 'url' && this.waUserDetail.templateHeaderFormat == "document"){
            if(this.waUserDetail.headerDocument == ""){
              this.$swal(this.$t('error'), "Please input your document url", "warning")
              return
            }
          }
          else if(this.mediaSource == 'csv' && this.waUserDetail.templateHeaderFormat == "document"){
            if(this.waUserDetail.headerCSV == ""){
              this.$swal(this.$t('error'), "Please input your document header of CSV", "warning")
              return
            }
          } else if(this.mediaSource == 'local' && this.waUserDetail.templateHeaderFormat == "video"){
            if(this.waUserDetail.headerVideo == ""){
              this.$swal(this.$t('error'), "Please choose your video", "warning")
              return
            }
          }
          else if(this.mediaSource == 'url' && this.waUserDetail.templateHeaderFormat == "video"){
            if(this.waUserDetail.headerVideo == ""){
              this.$swal(this.$t('error'), "Please input your video url", "warning")
              return
            }
          }
          else if(this.mediaSource == 'csv' && this.waUserDetail.templateHeaderFormat == "video"){
            if(this.waUserDetail.headerCSV == ""){
              this.$swal(this.$t('error'), "Please input your document header of CSV", "warning")
              return
            }
          }

          this.checkParamHasHastag()
          // If not send image, not send doc, not send audio
          // if(findImage == -1 && findDoc == -1 && findAudio == -1 && this.form.message == ""){
          var checkExtension = this.waUserDetail.mediaExt
          // console.log('checking media extension',checkExtension)

          if(this.choose_template != "" && this.param.length < this.paramCount){
            // console.log('choose template',this.choose_template)
            this.$swal(this.$t('error'), this.$t('whatsapp.hsm_param_empty'), "warning")
          } else if(this.choose_template == ""){
            // if(this.form.message == "" && this.choose_template != ""){
              // this.step = 1
            // }
            this.$swal(this.$t('error'), this.$t('whatsapp.hsm_not_choose'), "warning")
          } else if(this.choose_template != '' && this.paramButton.length < this.paramCountUrl){
            this.$swal(this.$t('error'), this.$t('whatsapp.hsm_param_empty'), "warning")
          } else{

            this.mandatoryHeader = ['phone']
            let validParameter = true
            let validParam = true
            _.forEach(this.param, val => {
              if (val.length < 1 || val.trim() == '') {
                  validParam = false
                  return false
              }
              else{
                validParam = true
              }
                let regHashtag = /(^|\s)(#[a-z\d-]+)/ig
                let regReplace = /#(\S+[a-zA-Z0-9])/ig
                let regex = /#(\S+[a-zA-Z0-9])/
                let isHashtag = regex.test(val)

                

                if(isHashtag == true){
                  let splitWords = val.split(" ")
                  let tempParam = []
                  // console.log("splitWords", splitWords)
                  _.forEach(splitWords, (word, key) => {
                    let regex = /#(\S+[a-zA-Z0-9])/
                    let testWord = regex.test(word)
                    if(testWord == true){
                      word = word.replace(regReplace, "$1")
                      let [source, column] = word.split("_").map(v => { return v.replace(/\*|\#|\`|\-|[^\w+\_+\w]/g, "") }).filter(v => { return v != "" })
                      if(typeof column == "undefined"){
                        validParameter = false
                      }
                      this.mandatoryHeader.push(column)
                    } else{
                    //  console.log("false regex:", word, testWord)
                    }
                  })
                  // console.log("has param hashtag", isHashtag, val, columnName)
                } else{
                  // console.log("no hastag", isHashtag)
                  this.itHas = false
                }
            })

            _.forEach(this.paramButton, val => {
              let regHashtag = /(^|\s)(#[a-z\d-]+)/ig
              let regReplace = /#(\S+[a-zA-Z0-9])/ig
              let regex = /#(\S+[a-zA-Z0-9])/
              let isHashtagBtn = regex.test(val)

              if(isHashtagBtn == true){
                let splitWords = val.split(" ")
                let tempParam = []
                // console.log("splitWords", splitWords)
                _.forEach(splitWords, (word, key) => {
                  let regex = /#(\S+[a-zA-Z0-9])/
                  let testWord = regex.test(word)
                  if(testWord == true){
                    word = word.replace(regReplace, "$1")
                    let [source, column] = word.split("_").map(v => { return v.replace(/\*|\#|\`|\-|[^\w+\_+\w]/g, "") }).filter(v => { return v != "" })
                    if(typeof column == "undefined"){
                      validParameter = false
                    }
                    this.mandatoryHeader.push(column)
                  } else{
                  //  console.log("false regex:", word, testWord)
                  }
                })
                // console.log("has param hashtag", isHashtag, val, columnName)
              } else{
                // console.log("no hastag", isHashtag)
                this.itHasBtn = false
              }
            })

            this.mandatoryHeader = _.uniq(this.mandatoryHeader)
            // console.log('manadatoryHeader', this.mandatoryHeader);
            if(this.mandatoryHeader.length > 1){
              this.itHas = true
              this.itHasBtn = true
              this.contactSelection = []
              this.selectedRecipient = []
            }
            if(validParameter == false){
              this.$swal(this.$t('error'), "Custom parameter should start with #csv_", "warning")
            } 
            else if (validParam == false){
              this.$swal(this.$t('error'), this.$t('whatsapp.hsm_param_empty'), "warning")
            }else{
              if(this.mediaSource == "csv"){
                this.itHas = true
                this.mandatoryHeader.push(this.waUserDetail.headerCSV)
              }
              this.step = 1
            }
          }
          // } else{
            // this.step = 1
          // }
        break;

        // Handle second step. Choose sender and recipients
        case 1:
          let flag = true
          if(this.to.length < 1){
            flag = false
            this.$swal(this.$t('error'), this.$t('whatsapp.empty_to'), "warning")
          }
          if(this.sender == ""){
            flag = false
            this.$swal(this.$t('error'), this.$t('whatsapp.empty_sender'), "warning")
          }
          if(this.sendTime == "later") {
            if (!this.scheduleDate || !this.scheduleTime) {
              flag = false
              this.$swal(this.$t('error'), this.$t('whatsapp.empty_sendTime'), "warning")
            } else {
              if(moment(this.actualSendTime).isBefore(moment())) {
                flag = false
                this.$swal(this.$t('error'), this.$t('whatsapp.sendTime_before_now'), "warning")
              }
            }
          }

          if(flag){
            this.step = 2
          }
        break;
      }
    },
    onUpload(event) {
      var input = event.target
      var fileTypes = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "jpg", "jpeg", "png", "aac", "m4a", "amr", "mp3", "ogg", "opus"]
      if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = (e) => {
          let dataFile = e.target.result;
          let filename = input.files[0].name.split('.')[0]

          let extensionFile = input.files[0].name.split('.').pop().toLowerCase()
          let acceptedFile = fileTypes.indexOf(extensionFile) != -1

          // console.log(fileTypes.indexOf(extensionFile));
          // console.log(acceptedFile);

          if (!acceptedFile) {
            document.getElementById('inputFile').value = ''
            this.$swal(this.$t('error'), 'File type not allowed', "error")
          } else {
            this.dataFile = dataFile
            this.filename = filename
            this.extensionFile = extensionFile
            this.acceptedFile = acceptedFile
          }
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    csvJSON(csv){
      let lines = csv.split("\n")
      let result = []
      let headers = lines[0].toLowerCase().split(",").map(item => {
        return item.trim()
      })

      let column = 0
      // if (this.csvHaveHeader) {
        // column = headers.indexOf('Phone Number')
      // }
      if (column < 0) {
        return []
      }
      lines.shift()

      lines.forEach(line => {
        let data = line.split(",")[column]
        if (data) {
          result.push(data)
        }
      });
      this.csvData = result

      if(this.mandatoryHeader.length > 1){
        this.bulkparam = new Array()
        _.forEach(this.mandatoryHeader, (val, index) => {
          if(index == 0){ } // skip first index bcause its already build as recipient
          else {
            lines.forEach((line, idx) => {
              let valIndex = headers.indexOf(val) // get index of header to get value
              let data = line.split(",")[valIndex]
              if(data){
                if(typeof this.bulkparam[idx] == "undefined"){
                  this.bulkparam[idx] = { [val] : data.trim() }
                } else{
                  // this.bulkparam[idx].push(data)
                  this.bulkparam[idx][val] = data.trim()
                }
              }
            });
          }
        })
      }

      result = _.uniq(result)
      return result
    },
    onUploadCsv(event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          let csv = e.target.result;
          var tipefile = input.files[0].type
          if(_.indexOf(["text/csv","application/vnd.ms-excel"], tipefile) == -1) {
            this.csvDialog.visible = false
            this.csvData = []
            document.getElementById('inputCsvFile').value = ''
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
    async renderCsvData(){
      this.readingCsv = true
      var input = document.getElementById('inputCsvFile')
      let formData = new FormData();
      formData.append('csv_file', input.files[0])
      formData.append('param', this.mandatoryHeader.join(","))
      var self = this
      axios.defaults.timeout = 60000 * 15
      await axios.post(config.baseApi + 'upload/csv_panel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (event) => {
          let p = parseInt(event.total / event.loaded)
          p = p > 100 ? 100 : p
          self.uploadCsvProgress = p > 1 ? 100 - p : 100
        }
      })
      .then(res => {
        // console.log('renderCSV', res);
        this.readingCsv = false
        // console.log(res.data)
        if(res.data.ec == 200){
          // JUST ONE CSV
          this.csvData[0] = res.data.data
          // IF WANT TO MULTIPLE CSV
          // this.csvData.push(res.data.data)

          // this.bulkparam = res.data.data.param
          if(this.itHas == true || this.itHasBtn == true) {
            this.sampleParam = res.data.data.sampleParam
            // this.sampleParamUrl = res.data.data.sampleParamUrl
            this.sampleParamUrl = res.data.data.sampleParam
          }
          else {
            this.sampleParam = this.param
            this.sampleParamUrl = this.paramButton
          }
          this.updateSelected()
        } else if(res.data.ec == 400){
          this.$swal(this.$t('info'), this.$t('whatsapp.missing_parameter') + ` Missing header: ${res.data.data.join(",")}`, "info")
        } else {
          this.$swal(this.$t('error'), this.$t('error_500'), "error")
        }
      })
      .catch(err => {
        console.log(err)
        this.readingCsv = false
        if(err.code == "ECONNABORTED" || err.code == "ETIMEDOUT"){
          this.$swal(this.$t('error'), this.$t('timeout'), "error")
        } else{
          this.$swal(this.$t('error'), this.$t('error_text'), "error")
        }
      })
      this.csvDialog.visible = false
    },

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
      // console.log(object)
      if(this.waUserDetail.templateHeaderFormat.toLowerCase() == 'image' && ["image/jpeg", "image/png"].indexOf(object.type)==-1){
        this.$swal(this.$t('error'), "Media extension not match", "warning")
        this.handleListMedia = []
        return false
      }else if(this.waUserDetail.templateHeaderFormat == 'document' && ["application/pdf"].indexOf(object.type)==-1){
        this.$swal(this.$t('error'), "Media extension not match", "warning")
        this.handleListMedia = []
        return false
      }
    },

    async renderMedia(object){
      let formData = new FormData();
      var input = document.getElementById('inputMedia')
      // if(this.waUserDetail.templateHeaderFormat == 'document'){
      this.documentFileName = object.file.name
      // }

      if(this.waUserDetail.templateHeaderFormat.toLowerCase()=='image' && this.mediaSource == 'local'){
          if(object.file.size >= 5242880){
            this.$swal(this.$t('error'), "Maximum file upload size is 5 MB", "warning")
            this.handleListMedia = []
            return
        }
      }
      else if(this.waUserDetail.templateHeaderFormat.toLowerCase()=='document' && this.mediaSource == 'local'){
          if(object.file.size >= 104857600){
            this.$swal(this.$t('error'), "Maximum file upload size is 100 MB", "warning")
            this.handleListMedia = []
            return
        }
      }
      else if(this.waUserDetail.templateHeaderFormat.toLowerCase()=='video' && this.mediaSource == 'local'){
          if(object.file.size >= 16777216){
            this.$swal(this.$t('error'), "Maximum file upload size is 16 MB", "warning")
            this.handleListMedia = []
            return
        }
      }

      formData.append('media', object.file)
      formData.append('template_name', this.choose_template)
      axios.defaults.timeout = 60000 * 15
      await axios.post(config.baseApi + 'upload/media', formData, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        // console.log("res",res.data);
        if(this.waUserDetail.templateHeaderFormat.toLowerCase() == 'image'){
          // console.log('image url',res.data.data.url)
          this.waUserDetail.headerImage = res.data.data.url
          this.waUserDetail.headerDocument = ""
          this.waUserDetail.headerVideo = ""
          // console.log('response :',Math.round(this.waUserDetail.headerImage.size/1024)+'MB')
          // console.log('file is size bytes',fileSizeInBytes)
        } else if(this.waUserDetail.templateHeaderFormat == 'document') {
          this.waUserDetail.headerDocument = res.data.data.url
          this.waUserDetail.headerImage = ""
          this.waUserDetail.headerVideo = ""
        } else if(this.waUserDetail.templateHeaderFormat == 'video') {
          this.waUserDetail.headerVideo = res.data.data.url
          this.waUserDetail.headerImage = ""
          this.waUserDetail.headerDocument = ""
        }
      }).catch(err => {
        console.log(err);
        // this.$swal(this.$t('error'), this.$t('error_text'), "error")
      })
      // }
    },

    parsingDataHeader(name, param){
      let message = ''
      // console.log(this.waUserDetail.templateHeaderFormat)
      // this.waUserDetail.hsm.forEach(element => {
      //   console.log(element.header.format)
        if(this.waUserDetail.templateHeaderFormat == 'text'){
          let slot = this.waUserDetail.templateHeaderText.match(/{{\s*[\w\.]+\s*}}/g)
          message = this.waUserDetail.templateHeaderText
          if(slot != null){
            this.paramHeaderText = true
            slot.forEach((el, i) => {
              if(param){
                message = message.replace(el, param)
              }
            });
          }
          else{
            this.paramHeaderText = false
          }
        }
      // });
      return message
    },
    parsingDataButton(name, paramButton ){
      let buttonContent = ''
      let found = this.waUserDetail.hsm.find(element =>
      element.name == name )
      this.waUserDetail.buttons = found.buttons
      let buttondata = found.buttons
      let subbuttondata = buttondata.buttons
      subbuttondata.forEach((elementOfbutton,i) => {
        if (elementOfbutton.type == "URL") {
          let slotUrl = elementOfbutton.url.match(/{{\s*[\w\.]+\s*}}/g)
          let countOnParamUrl = slotUrl != null ? slotUrl.length : 0
          this.paramCountUrl = countOnParamUrl
          buttonContent = elementOfbutton.url
          this.form.buttonContents = buttonContent
          this.buttonElement[i] = {text : elementOfbutton.text, type :elementOfbutton.type, url : buttonContent}
          if(slotUrl != null){
            slotUrl.forEach((el, i) => {
              if(paramButton[i]){
              // console.log('param button',paramButton)
              buttonContent = buttonContent.replace(el, paramButton)
              }
            });
          }
        }
        else {
          this.buttonElement[i] = {text : elementOfbutton.text, type :elementOfbutton.type}
        }

      });
      return buttonContent
    },
    parsingData(name, param){
      let message = ''
      this.waUserDetail.hsm.forEach(element => {
        if(element.name == name){
          let header = element.header
          let slot = element.message.match(/{{\s*[\w\.]+\s*}}/g)

          this.waUserDetail.headerTemp = header
          if(header != undefined){
            this.waUserDetail.templateHeaderType = header.type
            this.waUserDetail.templateHeaderFormat = header.format
            this.waUserDetail.templateHeaderText = header.text
          }

          this.paramCount = slot != null ? slot.length : 0
          message = element.message
          if(slot != null){
            slot.forEach((el, i) => {
              if(param[i]){
                message = message.replace(el, param[i])
              }
            });
          }
        }
      });
      if (message.length > 1024) {
        this.disabledButtonNext = true
        this.$swal(this.$t('error'), 'Character number of messages exceeds the limit (max 1024)', "error")
      }
      else {
        this.disabledButtonNext = false
      }
      return message
    },
    parsingPreview(){
      let name = this.choose_template
      let param = this.param
      let message = ""
      let sampleKeys = this.sampleParam
      this.waUserDetail.hsm.forEach(element => {
        if(element.name == name){
          let slot = element.message.match(/{{\s*[\w\.]+\s*}}/g)
          this.paramCount = slot != null ? slot.length : 0
          message = element.message
          if(slot != null){
            slot.forEach((el, i) => {
              if(param[i]){
                let splitWord = param[i].split(" ")
                let regex = /#(\S+[a-zA-Z0-9])/
                let regReplace = /#(\S+[a-zA-Z0-9])/ig
                let temp = []
                for(let word of splitWord){
                  let testWord = regex.test(word)
                  if(testWord == true){
                    let [source, column] = word.split("_")
                    temp.push(word.replace(regReplace, sampleKeys[column]))
                  } else{
                    temp.push(word)
                  }
                }
                message = message.replace(el, temp.join(" "))
              }
            });
          }
        }
      });
      return message
    },
    parsingPreviewButton(){
      let name = this.choose_template
      let paramButton = this.paramButton
      let buttonContent = ""
      let sampleKeys = this.sampleParamUrl
      // console.log('sampleKeys', this.sampleParamUrl);
      // console.log('previewButton',this.waUserDetail.hsm);
      this.waUserDetail.hsm.forEach(element => {
        if(element.name == name){
          this.waUserDetail.buttons = element.buttons
          let buttondata = element.buttons
          let subbuttondata = buttondata.buttons
          subbuttondata.forEach(elementOfbutton => {
            let slotUrl = elementOfbutton.url.match(/{{\s*[\w\.]+\s*}}/g)
            let paramCountUrl = slotUrl != null ? slotUrl.length : 0
            buttonContent = elementOfbutton.url
            if(slotUrl != null){
            slotUrl.forEach((el, i) => {
              if(paramButton[i]){
                let splitWord = paramButton[i].split(" ")
                let regex = /#(\S+[a-zA-Z0-9])/
                let regReplace = /#(\S+[a-zA-Z0-9])/ig
                let temp = []
                for(let word of splitWord){
                  let testWord = regex.test(word)
                  if(testWord == true){
                    let [source, column] = word.split("_")
                    temp.push(word.replace(regReplace, sampleKeys[column]))
                  } else{
                    temp.push(word)
                  }
                }
                buttonContent = buttonContent.replace(el, temp.join(" "))
              }
            });
            }
          });
        }
      });
      return buttonContent
    },
    handleParam(param) {
      this.form.message = this.form.message + param
    },
    handleCloseRecipient(data) {
      // console.log("data", data)
      if(data.type == 'group') {
        for (var key in this.groupSelection) {
          if (this.groupSelection.hasOwnProperty(key)) {
            if(this.groupSelection[key].group_id == data.id) {
              this.$refs.groupTable.toggleRowSelection(this.groupSelection[key]);
            }
          }
        }
      } else if(data.type == 'contact') {
        // console.log("data id", data)
        // Delete on selectedRecipient
        var index = _.findIndex(this.selectedRecipient, { id: data.id })
        // console.log("index", index)
        // console.log(this.selectedRecipient[index])
        if(index != -1) this.selectedRecipient.splice(index, 1)

        // Delete on contactSelection
        var indexContactSelection = _.findIndex(this.contactSelection, { phonebook_id: data.id })
        if(indexContactSelection != -1) this.contactSelection.splice(indexContactSelection, 1)

        // for (var key in this.contactSelection) {
        //   if (this.contactSelection.hasOwnProperty(key)) {
        //     console.log(this.contactSelection[key])
        //     if(this.contactSelection[key].phonebook_id == data.id) {
        //       this.$refs.contactTable.toggleRowSelection(this.contactSelection[key]);
        //     }
        //   }
        // }
      } else if(data.type == 'csv') {
        delete this.csvData[_.findIndex(this.csvData, { csv: data.id })]
        this.updateSelected()
      }
    },
    refreshCheckboxContact() {
      if (this.$refs.contactTable) {
        // console.log('clearing selection');
        this.$refs.contactTable.clearSelection();
        for (var key in this.contactSelection) {
          if (this.contactSelection.hasOwnProperty(key)) {
            var indexContact = _.findIndex(this.contacts, { phonebook_id: this.contactSelection[key].phonebook_id })
            if (indexContact != -1) {
              // console.log('activate selection on', this.contacts[indexContact]);
              this.$refs.contactTable.toggleRowSelection(this.contacts[indexContact], true);
            }
          }
        }
      }
    },
    handleGroupSelectionChange(val) {
      this.groupSelection = val;
      this.updateSelected()
    },
    handleContactSelectSingle(selection, row) {
      this.handleContactSelect(selection)
    },
    handleContactSelect(selection) {
      // console.log(selection);

      _.forEach(this.contacts, data => {

        var index = _.findIndex(this.contactSelection, { phonebook_id: data.phonebook_id })
        var index2 = _.findIndex(selection, { phonebook_id: data.phonebook_id })
        if(index2 == -1) {
          if (index != -1) {
            // console.log('delete', index);
            this.contactSelection.splice(index, 1)
          }
        } else {
          if (index == -1) {
            this.contactSelection.push(data)
          }
        }
      })
      this.updateSelected()
    },
    handleContactSelectionChange(val) {
      _.forEach(this.contacts, data => {
        var index = _.findIndex(this.contactSelection, { phonebook_id: data.phonebook_id })
        var index2 = _.findIndex(val, { phonebook_id: data.phonebook_id })
        if(index2 == -1) {
          if(index != -1) this.contactSelection.splice(index2, 1)
        } else {
          if (index == -1) {
            this.contactSelection.push(data)
          }
        }
      })
      this.updateSelected()
    },
    openGroupDialog() {
      if (this.selectedRecipient.length && !this.groupSelection.length) {
        this.throwQuestion(() => {
          this.groupDialog.visible = true
          if (this.groups.length == 0) {
            this.loadGroup()
          }
        })
      } else {
        this.groupDialog.visible = true
        if (this.groups.length == 0) {
          this.loadGroup()
        }
      }
    },
    openContactDialog() {
      if (this.selectedRecipient.length && !this.contactSelection.length) {
        this.throwQuestion(() => {
          this.contactDialog.visible = true
          if (this.contacts.length == 0) {
            this.loadContactAll()
          } else {
            this.refreshCheckboxContact()
          }
        })
      } else {
        this.contactDialog.visible = true
        if (this.contacts.length == 0) {
          this.loadContactAll()
        } else {
          this.refreshCheckboxContact()
        }
      }
    },
    openCsvDialog() {
      if (this.selectedRecipient.length && !this.csvData.length) {
        this.throwQuestion(() => {
          this.csvDialog.visible = true
        })
      } else {
        this.csvDialog.visible = true
      }
    },
    updateSelected() {
      let data = []
      this.groupSelection.forEach(el => {
        data.push({
          id: el.group_id,
          name: el.group_name + " (" + el.member + ")",
          contact: null,
          type: 'group',
          member: el.member
        })
      });
      this.contactSelection.forEach(el => {
        data.push({
          id: el.phonebook_id,
          name: el.name,
          contact: el.phone_number,
          type: 'contact'
        })
      });
      this.csvData.forEach((el,i) => {
        data.push({
          id: el.csv,
          name: el.filename + " (" + el.total + ")",
          contact: null,
          type: 'csv',
          member: el.total
        })
      });
      this.selectedRecipient = data
    },
    async sendHSM() {
      let header = {
        header : {
          type: this.waUserDetail.templateHeaderFormat.toLowerCase(),
          media: this.waUserDetail.headerImage
        }
      }

      let data = {
        to: this.to,
        name: this.choose_template,
        param: this.param,
        sender: this.sender,
        type: 'hsm',
        message: this.template_message,
      }

      // if(this.waUserDetail.hsm)

      if(this.waUserDetail.button!=''){
        data.buttons = {
          paramButton: this.paramButton,
          type: this.buttonElement.type,
          text: this.buttonElement.text,
          url: this.form.buttonContents
        }
      }

      if(this.waUserDetail.templateHeaderFormat.toLowerCase() == 'image'){
        data.header = {
          type: this.waUserDetail.templateHeaderFormat.toLowerCase(),
          media: this.mediaSource == 'csv' ? this.waUserDetail.hashtag_csv+this.waUserDetail.headerCSV : this.waUserDetail.headerImage,
          // filename: this.mediaSource == 'local' ? this.documentFileName : ''
        }
      }

      if(this.waUserDetail.templateHeaderFormat.toLowerCase() == 'document'){
        data.header = {
          type: this.waUserDetail.templateHeaderFormat.toLowerCase(),
          media: this.mediaSource == 'csv' ? this.waUserDetail.hashtag_csv+this.waUserDetail.headerCSV : this.waUserDetail.headerDocument,
          filename: this.mediaSource == 'local' ? this.documentFileName : ''
        }
      }

      if(this.waUserDetail.templateHeaderFormat.toLowerCase() == 'video'){
        data.header = {
          type: this.waUserDetail.templateHeaderFormat.toLowerCase(),
          media: this.mediaSource == 'csv' ? this.waUserDetail.hashtag_csv+this.waUserDetail.headerCSV : this.waUserDetail.headerVideo
        }
      }

      if(this.waUserDetail.templateHeaderFormat.toLowerCase() == 'text'){
        data.header = {
          type: this.waUserDetail.templateHeaderFormat.toLowerCase(),
          media: this.waUserDetail.headerText == '' ? '' : this.waUserDetail.headerText
        }
      }

      if(this.sendTime == 'later') data['schedule'] = this.actualSendTime
      if(this.mandatoryHeader.length > 1) data['bulkparam'] = this.bulkparam
      if(this.alternatifEmail == true) data['redirect_with'] = 'email'
      if(this.alternatifSms == true) data['redirect_with'] = 'sms'
      this.btnLoading = true

      // console.log("data",data);

      await api({
        method: 'post',
        url: 'wa/send_hsm',
        timeout: 300000,
        data: data
      }).then(result => {
        if (result.data.ec == 200) {
          this.$swal({
            title: this.$t('success'),
            text: '',
            type: 'success',
          }).then((ok) => {
            this.$router.push('/whatsapp#'+ Date.now())
          })
        } else if (result.data.ec == 400 && result.data.message == "credit_limit") {
          this.$swal(this.$t('error'), this.$t('whatsapp.credit_limit'), "error")
        } else {
          this.$swal(this.$t('error'), this.$t('error_text'), "error")
        }
        this.btnLoading = false
      }).catch(error => {
        this.btnLoading = false
        this.$swal(this.$t('error'), this.$t('error_text'), "error")
      })
    },
    async nextContact(page){
      this.currentPageContact = page
      this.loadContactAll(page)
    },
    async loadContactAll(page = 1) {
      this.loadingContact = true
      await api({
        method: 'get',
        url: 'phonebook',
        params:{
          page: page
        }
      }).then(result => {
        // console.log('loadContact', result);
        this.contacts = result.data.data.contact
        this.contactsTotal = result.data.data.rows
        // console.log("loadContactAll",result);
        // _.forEach(this.contacts, dt => {
        //   let index = _.findIndex(this.selectedRecipient, { id: dt.phonebook_id })
        //   let index2 = _.findIndex(this.contacts, { phonebook_id: dt.phonebook_id })
        //   // console.log(dt.phonebook_id, index, index2, this.contactSelection[index2])
        //   if(index != -1){
        //     console.log("toggle", index2, this.contactSelection[index2], this.$refs.contactTable)
        //     this.$refs.contactTable.toggleRowSelection(this.contactSelection[index2], true)
        //   }
        // })

      }).catch(error => {
        // console.log(error);
        this.showAlertError = true
      })

      this.loadingContact = false
      this.refreshCheckboxContact()
    },
    async loadGroup() {
      await api({
        method: 'get',
        url: 'group/all'
      }).then(result => {
        // console.log('loadGroup', result);
        this.groups = result.data.data
        // console.log("loadGroup", result);
        // this.groups = [{group_id:0, group_name: this.$t('contact.all')}]
        // result.data.data.forEach(element => {
        //   this.groups.push(element)
        // });
      }).catch(error => {
        // console.log(error);
        this.showAlertError = true
      })
    },
    async loadWA(view = false) {
      await api({
        method: 'post',
        url: 'user/detail',
        params: {
					view : view == true ? true : null
				},
        // number temporary hardcode
        // data:{
        //   number : '0215155295'
        // }
      }).then(result => {
        // console.log("loadWA",result);
        this.loadingForm = false
        if(result.data.ec == 200){
          this.showFormMessage = true
          let tempHsm = []
          let tempSender = []
          _.forEach(result.data.data, res => {
            _.forEach(res.hsm, hsm => {
              // console.log('this hsm',hsm)
              if(!_.isEmpty(hsm)) { tempHsm.push(hsm) }
            })
            tempSender.push(res.phoneNumber)
          })
          this.waUserDetail.hsm = _.uniqBy(tempHsm, 'name')

          this.waUserDetail.sender = _.uniq(tempSender)
        } else if(result.data.ec == 400 && result.data.message == "not_subscribe"){
          this.showAlertMessage = true
        } else {
          this.showAlertError = true
        }
      }).catch(error => {
        this.loadingForm = false
        this.showAlertError = true
      })
    },
    async loadPreferences() {
      this.loadingPage = true
      await api({
        method: 'get',
        url: config.baseApi +'auth/settings/'
      }).then(result => {
        // console.log("loadPreferences", result);
        this.allowMakerChecker = _.find(result.data.data, option => {
          return option.options_key == "makerChecker"
        })
        // console.log(this.allowMakerChecker.options_value)
        if(this.allowMakerChecker.options_value == "true" || this.allowMakerChecker.options_value == true){
          this.sendTime = "later"
        } else{
          this.sendTime = "now"
        }
        // this.isSubscribe = true
      }).catch(error => {
        // console.log(error);
      })
      this.loadingPage = false
    }
  },
  computed: {
    scheduleTimeStart() {
      if(moment(this.scheduleDate).isSame(moment(), 'date')) {
        return moment().add(1, 'h').format('HH') + ':00'
      }
      return '00:00'
    },
    countTo() {
      return this.to.reduce((acc, item) => item.member ? acc + item.member : acc + 1, 0)
    },
    to() {
      let data = []
      for(let key in this.selectedRecipient) {
        if (this.selectedRecipient.hasOwnProperty(key)) {
          let value = this.selectedRecipient[key]
          if (value.type == 'group') {
            // data = data.concat(value.contact)
            data.push({group_id: value.id, member: value.member})
          } else if (value.type == 'csv') {
            // data = data.concat(value.contact)
            data.push({csv: value.id, member: value.member})
          } else {
            data.push(value.contact)
          }
        }
      }
      return _.uniq(data)
    },
    sendCategory() {
      if (this.extensionFile) {
        if(["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"].indexOf(this.extensionFile) > -1) {
          return 'document'
        } else if(["jpg", "jpeg", "png"].indexOf(this.extensionFile) > -1) {
          return 'image'
        } else if(["aac", "m4a", "amr", "mp3", "ogg", "opus"].indexOf(this.extensionFile) > -1) {
          return 'audio'
        }
      } else {
        return 'text'
      }
    },
    actualSendTime() {
      return this.scheduleDate + ' ' + this.scheduleTime
    }
  },
  watch: {
    // sender(){
    //   if (this.sender != '') {
    //     this.selectNumber = this.sender
    //     this.handleChangeQuota()
    //   }
    // }
  },
  async mounted(){
    this.customer_type
    await this.loadContactAll()
    // this.wa_billing()
    this.loadGroup()
    this.loadWA(true)
    this.loadPreferences()
    
  },
  components: {

  }
}
</script>

<style lang="scss">
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
