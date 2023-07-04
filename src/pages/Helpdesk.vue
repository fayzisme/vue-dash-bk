<template>
  <div class="scrollable only-y" v-loading="loadingPage">
    <div class="page-header">
      <h1>{{ $t("menu.helpdesk_wa") }}</h1>
    </div>
    <el-card v-if="showAlertError" style="margin-bottom: 1em">
      <error-gope-siji />
    </el-card>
    <el-card v-if="showAlertTicket" align="center">
      <h2 align="center">Start messaging your customers today</h2>
      <!-- <br/><br/> -->
      <p v-html="$t('promote.desc.whatsapp')"></p>
      <br />
      <br />
      <span>
        <el-button @click="mailto()">Send us e-mail</el-button>
      </span>
    </el-card>
    <!-- DIALOG REACH CONSUMEN -->
    <div v-if="showTicket">
      <el-dialog
        title="Reach Consumen"
        :visible.sync="showDialogReachCons"
        :before-close="resetHsm"
        width="60%"
      >
        <div v-loading="loadingDialogReach">
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>To</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input type="text" v-model="dataSendHsm.to" readonly disabled />
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Template</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-select v-model="choose_template" @change="resetTemplate">
                <el-option label="No Template" value></el-option>
                <el-option
                  v-for="item in hsmList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="choose_template" v-for="i in paramCount" :key="i">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Param {{ i }}</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input type="text" v-model="param[i-1]"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Message</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input
                type="textarea"
                :value="parsingData(choose_template, param)"
                rows="8"
                readonly
              ></el-input>
              <p
                class="float-right m-0"
                v-if="choose_template"
              >{{ parsingData(choose_template, param).length }} {{ $t('whatsapp.characters') }}</p>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="loadingBtnReach" @click="sendHsm">Send</el-button>
          <el-button @click="showDialogReachCons = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- DIALOG CREATE NEW GROUP WHATSAPP -->
    <div v-if="showTicket">
      <el-dialog
        title="Create Whatsapp Group"
        :visible.sync="showDialogGroup"
        :before-close="resetHsm"
        width="50%"
      >
        <div v-loading="loadingBtnCreateGroup">
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Participants</h4>
            </el-col>
            <el-col class="mt-20" :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
              <el-input
                type="text"
                v-model="wagroup.participant"
                placeholder="Participants number"
              />
              <small>Separate with commas. Ex: 081234567890, 08123123123</small>
            </el-col>
            <el-col class="mt-25" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <el-button type="primary" size="mini" @click="openContactDialog">
                <span class="icon icon-ic_contact" />
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Group Name</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input type="text" v-model="wagroup.subject" placeholder="Group name" />
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Template</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-select v-model="choose_template" @change="resetTemplate">
                <el-option label="No Template" value></el-option>
                <el-option
                  v-for="item in hsmList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="choose_template" v-for="i in paramCount" :key="i">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Param {{ i }}</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input type="text" v-model="param[i-1]"></el-input>
              <small>Use #invite_link to auto replace with Whatsapp Group URL</small>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Message</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input
                type="textarea"
                :value="parsingData(choose_template, param)"
                rows="8"
                readonly
              ></el-input>
              <p
                class="float-right m-0"
                v-if="choose_template"
              >{{ parsingData(choose_template, param).length }} {{ $t('whatsapp.characters') }}</p>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loadingBtnCreateGroup"
            @click="createGroupWhatsapp"
          >Create</el-button>
          <el-button @click="showDialogGroup = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- DIALOG DETAIL GROUP WHATSAPP -->
    <div v-if="showTicket">
      <el-dialog
        title="Detail Whatsapp Group"
        :visible.sync="showDialogGroupDetail"
        width="50%"
        style="z-index: 1050"
      >
        <div v-loading="loadingBtnCreateGroup">
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Participants</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-tag
                v-for="(p,i) in groupdetail.participant.split(',')"
                :key="i"
                :closable="p.trim().replace('62', '0') != sender && p.trim() != sendTo"
                style="margin-right: 8px; margin-top: 8px"
                @close="kickParticipants(p.trim())"
              >
                {{ p }}
                <span v-if="groupdetail.admins.indexOf(p.trim()) != -1">(Group Admin)</span>
              </el-tag>
              <el-button
                size="mini"
                type="primary"
                style="margin: 8px 8px 0 0"
                @click="fshowDialogGroupAdd"
              >
                <i class="mdi mdi-plus" />Add more
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Group Name</h4>
            </el-col>
            <el-col class="mt-20" :xs="15" :sm="15" :md="15" :lg="15" :xl="15">
              <el-input
                ref="detailSubject"
                type="text"
                v-model="groupdetail.subject"
                maxlength="25"
                show-word-limit
                placeholder="Group name"
                :readonly="disable.groupSubject"
              ></el-input>
              <span style="float: right; font-size: 10px">{{ groupdetail.subject.length }}/25</span>
            </el-col>
            <el-col class="mt-30" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
              <a
                @click="disable.groupSubject = false; $refs.detailSubject.focus();"
                v-if="disable.groupSubject && !loadingUpdateSubject"
              >
                <i class="mdi mdi-pencil" />
              </a>
              <a
                @click="disable.groupSubject = true; updateGroupSubject()"
                v-if="!disable.groupSubject && !loadingUpdateSubject"
              >
                <i class="mdi mdi-check" />
              </a>&nbsp;&nbsp;
              <a
                @click="disable.groupSubject = true"
                v-if="!disable.groupSubject && !loadingUpdateSubject"
              >
                <i class="mdi mdi-close" />
              </a>
              <a v-if="loadingUpdateSubject">
                <i class="mdi mdi-spin mdi-loading" />
              </a>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button type="primary" :loading="loadingBtnCreateGroup" @click="console.log('ok')">Update</el-button> -->
          <el-button @click="showDialogGroupDetail = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- DIALOG ADD PARTICIPANT TO CURRENT GROUP -->
    <div v-if="showTicket">
      <el-dialog
        :title="'Add Group Participant to ' + groupdetail.subject"
        :visible.sync="showDialogGroupAdd"
        :before-close="resetHsm"
        width="50%"
      >
        <div v-loading="loadingBtnAddParticipant">
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Participants</h4>
            </el-col>
            <el-col class="mt-20" :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
              <el-input
                type="text"
                v-model="wagroupadd.participants"
                placeholder="Participants number"
              />
              <small>Separate with commas. Ex: 081234567890, 08123123123</small>
            </el-col>
            <el-col class="mt-25" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <el-button type="primary" size="mini" @click="openContactDialog">
                <span class="icon icon-ic_contact" />
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Template</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-select v-model="choose_template" @change="resetTemplate">
                <el-option label="No Template" value></el-option>
                <el-option
                  v-for="item in hsmList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="choose_template" v-for="i in paramCount" :key="i">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Param {{ i }}</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input type="text" v-model="param[i-1]"></el-input>
              <small>Use #invite_link to auto replace with Whatsapp Group URL</small>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <h4>Message</h4>
            </el-col>
            <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-input
                type="textarea"
                :value="parsingData(choose_template, param)"
                rows="8"
                readonly
              ></el-input>
              <p
                class="float-right m-0"
                v-if="choose_template"
              >{{ parsingData(choose_template, param).length }} {{ $t('whatsapp.characters') }}</p>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loadingBtnAddParticipant"
            @click="addParticipantGroupWhatsapp"
          >Invite</el-button>
          <el-button @click="showDialogGroupAdd = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- DIALOG CONTACT -->
    <el-dialog
      title="Add From Contact"
      :visible.sync="contactDialog.visible"
      :before-close="(done) => { tempSelectedRecipient = currentSelectedRecipient; done() }"
    >
      <el-row :gutter="30">
        <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-input
            prefix-icon="el-icon-search"
            :placeholder="$t('contact.search')"
            clearable
            @keypress.native="doSearchContact"
            @clear="loadContactAll"
            @keyup.native.delete="doSearchContact"
            v-model="searchContact"
          ></el-input>
        </el-col>
        <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-pagination
            @current-change="nextContact"
            :current-page="currentPageContact"
            background
            layout="prev, pager, next"
            :total="contactsTotal"
          ></el-pagination>
        </el-col>
      </el-row>
      <el-table
        v-loading="loadingContact"
        :data="contacts"
        style="width: 100%"
        @select="handleContactSelectSingle"
        @select-all="handleContactSelect"
        ref="contactTable"
        @row-click="tableContactRowClick"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="phone_number" label="Phone Number"></el-table-column>
        <el-table-column prop="name" label="Fullname"></el-table-column>
        <template slot="empty" style="height: 200px">
          <p align="center" style="color: #909399">
            <img src="@/assets/images/no_contact@3x.png" width="100" />
            <br />Contact not found
          </p>
        </template>
      </el-table>
      <br />
      <div class="clearfix">
        <el-pagination
          @current-change="nextContact"
          :current-page="currentPageContact"
          background
          layout="prev, pager, next"
          :total="contactsTotal"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="contactDialog.visible = false; buildRecipientGroupWhatsapp()"
        >{{ $t("submit") }}</el-button>
      </span>
    </el-dialog>
    <!-- TABLE DATA TICKET -->
    <el-row :gutter="10" v-if="showTicket" style="z-index: 0">
      <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="showTicket">
        <el-card shadow="card-shadow--small">
          <div slot="header" class="clearfix">
            <el-row :gutter="10">
              <el-col class="mt-10" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                <span class="mt-0 mr-10" style="font-size: 24px">
                  <b>{{ $t("ticket.ticket") }}</b>
                </span>
              </el-col>
              <el-col class="mt-10" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                <el-form :inline="true" style="float: right">
                  <el-form-item>
                    <el-tooltip class="item" effect="dark" :content="`${mute ? 'Mute Sound Notif':'Unmute Sound Notif'}`" placement="top">

                      <el-button @click="mute = !mute" style="position: relative; bottom: 2px;" :type="`${mute ? 'primary': 'danger'}`" size="mini" plain circle><i v-if="mute" class="mdi mdi-18px mdi-bell-ring"></i><i v-else class="mdi mdi-18px mdi-bell-off"></i></el-button>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item>
                    <el-radio-group
                      v-model="filter.btnStatus"
                      size="small"
                      class="fl-right mr-10"
                      @change=" ticketLoader = true; loadTicket()"
                    >
                      <el-radio-button :title="label.open" label="0" v-model="filter.btnStatus">
                        <i class="mdi mdi-email-alert" />
                        {{totalTicket.open}} {{ label.open }}
                      </el-radio-button>
                      <el-radio-button
                        :title="label.onproccess"
                        label="1"
                        v-model="filter.btnStatus"
                      >
                        <i class="mdi mdi-email-open" />
                        {{totalTicket.onproccess}} {{ label.onproccess }}
                      </el-radio-button>
                      <el-radio-button :title="label.close" label="2" v-model="filter.btnStatus">
                        <i class="mdi mdi-email-secure" />
                        {{totalTicket.close}} {{ label.close }}
                      </el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <div>
              <el-alert
                v-if="totalTicket.waiting > 0"
                title="Warning"
                :description="'There is ' + totalTicket.waiting + ' ticket(s) wait for available Customer Service.'"
                type="warning"
                :closable="false"
                show-icon
                effect="dark"
              ></el-alert>
            </div>
          </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
              <el-form :inline="true">
                <el-form-item>
                  <el-switch
                    v-model="operatorStatus"
                    @change="setOperatorStatus"
                    inactive-color="#ff4949"
                    active-text="Available"
                    inactive-text="Not available"
                  />
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
              <el-form :inline="true">
                <el-form-item>
                  <el-switch
                    v-model="newMessages"
                    @change="filterNewMessages"
                    inactive-color="#9e9e9e"
                    active-text="Unread"
                    inactive-text="All"
                  />
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="8" :xl="8">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="13" :md="13" :lg="13" :xl="13" class="mt-10">
                  <el-input
                    style="float: left !important"
                    class="search-contact"
                    prefix-icon="el-icon-search"
                    :placeholder="$t('helpdesk.searchTicket')"
                    clearable
                    @keypress.native="doSearchTicket"
                    @clear="loadTicket"
                    @keyup.native.delete="doSearchTicket"
                    v-model="searchTicket"
                  ></el-input>
                </el-col>
                <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11" class="mt-10">
                  <el-select @change="doSearchTicket('select')" v-model="searchBy">
                    <el-option
                      v-for="by in searchByList"
                      :key="by.by"
                      :value="by.by"
                      :label="by.name"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="4" :xl="4" class="mt-10" style="padding: 0;">
              <el-form :inline="true" style="float: right;" @submit.native.prevent="doSearchTicket">
                <el-form-item>
                  <el-radio-group
                    v-model="filter.operator"
                    class="fl-right"
                    @change=" ticketLoader = true; loadTicket()"
                  >
                    <el-radio-button label v-model="filter.operator">{{label.allLabel}}</el-radio-button>
                    <el-radio-button
                      :label="operatorId"
                      v-model="filter.operator"
                    >{{label.yourLabel}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <div class="group-list scrollable only-y" v-loading="ticketLoader">
            <el-pagination
              background
              prev-text="Prev"
              next-text="Next"
              layout="prev, pager, next"
              @current-change="paginateTicket"
              :current-page="currentPage"
              :page-size="10"
              :total="parseInt(totalTicket[ticketStatusName[filter.btnStatus]])"
            ></el-pagination>
            <br />
            <template>
              <el-table
                ref="ticketTable"
                @sort-change="sortBy"
                :data="ticket"
                v-loading="loadingTable"
                @row-click="openConversation"
                style="width: 100%;"
                :row-class-name="stylingRow"
              >
                <el-table-column fixed sortable="custom" prop="code" label="Ticket" width="100px" />
                <el-table-column width="300px" prop="lastMessages" label="Last Messages">
                  <template slot-scope="scope">{{ readMore(scope.row.lastMessages) }}</template>
                </el-table-column>
                <el-table-column
                  width="190px"
                  sortable="custom"
                  prop="lastMessagesTime"
                  label="Last Messages Time"
                >
                  <template
                    slot-scope="scope"
                  >{{ formatDate(scope.row.lastMessagesTime, 'YYYY-MM-DD HH:mm:ss') }}</template>
                </el-table-column>
                <el-table-column width="200px" prop="custName" label="Name">
                  <template slot-scope="scope">{{ readMoreC(scope.row.custName, 20) }}</template>
                </el-table-column>
                <el-table-column width="250px" prop="custName" label="Phone Number ">
                  <template slot-scope="scope">{{ maskingNumber(scope.row.custPhone) }}</template>
                </el-table-column>
                <el-table-column width="175px" prop="operatorName" label="Handle By" />
                <el-table-column prop="problem" width="450px" label="Problem">
                  <template slot-scope="scope">
                    <el-tooltip>
                      <div class="tooltip" slot="content">{{ scope.row.problem }}</div>
                      <p
                        style="font-weight:bold; font-size: 14px;"
                      >{{ readMore(scope.row.problem) }}</p>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column width="300px" prop="chat_duration" label="Duration"/>
                <el-table-column prop="tag" width="200px" label="Tag">
                  <template slot-scope="scope">
                    <span v-if="scope.row.tag == '' || scope.row.tag == null">-</span>
                    <span v-else>{{scope.row.tag}}</span>
                  </template>
                </el-table-column>
                <template slot="empty" style="height: 500px">
                  <p>
                    <img src="@/assets/images/no_data@3x.png" width="100" />
                    <br />No Data
                  </p>
                </template>
              </el-table>
            </template>
            <br />
            <el-pagination
              background
              prev-text="Prev"
              next-text="Next"
              layout="prev, pager, next"
              @current-change="paginateTicket"
              :current-page="currentPage"
              :page-size="10"
              :total="parseInt(totalTicket[ticketStatusName[filter.btnStatus]])"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <el-dialog
        :title="capitalizeFirstLetter(checkFileType(clickedImage))"
        :visible.sync="dialogImage"
        :width="checkFileType(clickedImage) == 'image' ? '30%' : '65%'"
        align="center"
        :before-close="(done) => { clickedImage = ''; done() }"
      >
        <img
          v-if="checkFileType(clickedImage) == 'image'"
          v-lazy="clickedImage"
          style="max-width: 100%; min-width: 100%"
        />
        <div v-if="checkFileType(clickedImage) == 'pdf'" v-loading="loadingPdf" align="center">
          <a v-if="!loadingPdf" :href="clickedImage" target="_blank">
            <i class="mdi mdi-download" /> Download
          </a>
          <br />
          <b>Total {{ pdfNumPages }} page(s)</b>
          <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <pdf v-if="!loadingPdf" :src="pdfSrc" v-for="i in pdfNumPages" :key="i" :page="i" />
            </el-col>
          </el-row>
        </div>
        <div v-if="checkFileType(clickedImage) == 'video'" class="iwrapper">
          <video height="340" controls style="width:70%;">
            <source :src="clickedImage">
            Your browser does not support the video tag.
          </video>
          <!-- <video :src="clickedImage" /> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogImage = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
    <template>
      <div>
        <beautiful-chat
          v-if="showTicket"
          :showGroupButton="false"
          :title="titleChat"
          :participants="participants"
          :titleImageUrl="titleImageUrl"
          :onMessageWasSent="onMessageWasSent"
          :messageList="messageList"
          :newMessagesCount="newMessagesCount"
          :isOpen="isChatOpen"
          :close="closeChat"
          :open="openChat"
          :messageStyling="true"
          :showEmoji="true"
          :showFile="true"
          :showTypingIndicator="showTypingIndicator"
          :colors="colors"
          :showInput="showInput"
          :onMessageButton="comingSoon"
          :showButtonReach="showButtonReach"
          :loadingMessage="loadingMessage"
          :onClickButtonReach="showDialogReach"
          :showButtonClose="showBtnClose"
          :onGroupButton="dialogGroup"
          :onClickButtonClose="doCloseConversation"
          :loadingButtonClose="loadingButtonClose"
          :ticketDetail="currentTicket"
          :quickReplyList="quickReply"
          :alwaysScrollToBottom="true"
          :channel="'whatsapp'"
        >
        </beautiful-chat>
        
        <!-- :showGroupButton="showGroupButton" -->
      </div>
      
    </template>
  </div>
</template>


<script>
import ContactDialog from "@/components/ContactDialog";
import api from "@/networkClient";
const axios = require("axios");
import openSocket from "socket.io-client";
import config from "@/config";
import store from "@/store";
import human from "humanize-duration"
const socket = openSocket(config.socketUrl, {
  transports: ["websocket"],
  upgrade: false
});
import moment from "moment-timezone";
import Push from "push.js";
import bgWhatsapp from "@/assets/images/chat-bg.png";
import _ from "lodash";
import pdf from "pdfvuer";
import notifSfx from '@/assets/audio/notif-bell.wav'

// import * as Tone from 'tone'
// const synth = new Tone.PolySynth().toDestination()



export default {
  data() {
    return {
      sc_parent: [],
      mute: store.getters.bellTone,
      intervalDuration: null,
      showGroupButton: false,
      showDialogGroup: false,
      showDialogGroupDetail: false,
      showDialogGroupAdd: false,
      contactDialog: {
        visible: false
      },
      currentPageContact: 1,
      showAlertError: false,
      showButtonReach: false,
      showBtnClose: false,
      loadingButtonClose: false,
      showDialogReachCons: false,
      loadingDialogReach: false,
      loadingBtnReach: false,
      loadingBtnCreateGroup: false,
      loadingUpdateSubject: false,
      loadingBtnAddParticipant: false,
      loadingContact: false,
      disable: {
        groupSubject: true
      },
      searchBy: "number",
      searchByList: [
        { by: "number", name: "Client Number" },
        { by: "code", name: "Ticket" },
        { by: "problem", name: "Issue" },
        { by: "tag", name: "Tag" }
      ],
      choose_template: "",
      searchTicket: "",
      timeoutTyping: null,
      timeoutTicket: null,
      contacts: [],
      contactsTotal: 0,
      searchContact: "",
      dataSendHsm: {
        to: "",
        param: new Array(),
        sender: ""
      },
      wagroup: {
        participant: "",
        subject: ""
      },
      wagroupadd: {
        participants: "",
        subject: ""
      },
      groupdetail: {
        participant: "",
        subject: "",
        admins: []
      },
      currentTicket: {
        code: ""
      },
      hsmList: [],
      param: [],
      paramCount: 0,
      template_message: "",
      showInput: true,
      loadingMessage: false,
      loadingTable: false,
      operatorNumber: "",
      titleChat: "chat",
      inUserList: false,
      typeText: "text",
      ticketCode: "",
      notifTag: "",
      operatorStatus: true,
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: [],
      participants: [],
      loadingPage: true,
      filter: {
        btnStatus: "0",
        operator: this.operatorId,
        sortBy: {
          column: "lastMessagesTime",
          type: "descending"
        }
      },
      ticketStatusName: {
        0: "open",
        1: "onproccess",
        2: "close"
      },
      newMessages: false,
      currentPage: 1,
      operatorId: "",
      showTicket: false,
      showAlertTicket: false,
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#1e1e1e",
          text: "#ffffff"
        },
        launcher: {
          bg: "#249393"
        },
        messageList: {
          bg: "#e5ddd5",
          bgImage: `url('${bgWhatsapp}')`
        },
        sentMessage: {
          bg: "#dcf8c6",
          text: "#2e2e2e"
        },
        receivedMessage: {
          bg: "#ffffff",
          text: "#262626"
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867"
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true,
      isConnected: false,
      socketMessage: "",
      sendTo: "",
      to: "",
      messages: "",
      sender: "",
      chat: [],
      activeChat: {},
      chatConversationId: "",
      ticket: [],
      totalTicket: {
        close: "",
        onproccess: "",
        open: "",
        all: ""
      },
      dialogImage: false,
      clickedImage: "",
      botId: "",
      btnLoading: false,
      messageArea: "",
      labelPosition: "all",
      labelStatus: "open",
      lbl: "All",
      label: {
        allLabel: "All",
        yourLabel: "Your",
        waiting: "Waiting",
        open: "Open",
        onproccess: "On Proccess",
        close: "Close"
      },
      checked: {},
      list: [],
      groups: [],
      menu: [],
      searchContact: "",
      windowIsBlur: false,
      ticketLoader: true,
      chatLoader: false,
      searchGroup: "",
      buttonGroupDialogLoader: false,
      groupDialog: {
        visible: false,
        data: {},
        type: "detail"
      },
      imSendingMessage: false,
      buttonAddToGroupDialogLoader: false,
      addToGroupDialog: {
        visible: false,
        data: {},
        type: "detail"
      },
      formLabelWidth: "120px",
      logData: "",
      addType: "single",
      csvData: [],
      status: "",
      temp: "",
      lastSentMessage: "",
      tempSelectedContact: [],
      tempSelectedRecipient: [],
      currentSelectedRecipient: [],
      currentSelectedContact: [],
      quickReply: [],
      pdfSrc: undefined,
      pdfNumPages: undefined,
      loadingPdf: false,
      doMasking: true,
      operatorName: ""
    };
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      // console.log("connected")
      this.isConnected = true;
      if (this.showTicket == true) {
        this.emit("enter conversation", this.operatorId);
      }
    },
    reconnect() {
      // console.log("reconnecting...")
    },
    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "listenChat" channel.
    listenChat(data) {
      // console.log('data from socket',data)
      this.socketMessage = data;
      // synth.triggerAttackRelease("C4", "8n");
    }
  },
  methods: {
    checkDuration() {
      this.ticket = this.ticket.map(v => {
        v.chat_duration = human(moment().diff(v.dateCreate), { largest: 3 })
        return v
      })
    },
    formatDate(str, format) {
      return moment(str).format(format);
    },
    doRenderPdf() {
      this.loadingPdf = true;
      let pdfSource = this.clickedImage;
      if (pdfSource.substring(0, 4) == "http") {
        pdfSource = config.chatApi + "fileReader/?url=" + this.clickedImage;
      }
      // this.pdfSrc = pdf.createLoadingTask(pdfSource);
      this.pdfSrc = pdfSource

      // this.pdfSrc.then(pdf => {
      //   this.pdfNumPages = pdf.numPages;
      //   this.loadingPdf = false;
      // });

      this.loadingPdf = false;
    },
    checkFileType(data) {
      if (data.substring(0, 4) == "http") {
        let reverseStr = this.reverse(data);
        let fileType = this.reverse(
          reverseStr.substring(0, reverseStr.indexOf("."))
        );
        if (["jpg", "png", "gif", "jpeg", "svg"].indexOf(fileType) !== -1) {
          return "image";
        } else if (fileType == "pdf") {
          return "pdf";
        } else if (["mp4", "mkv", "mov"].indexOf(fileType) !== -1) {
          return "video";
        } else {
          return "file";
        }
      } else {
        let s = data.substring("data:".length, data.indexOf(";base64"));
        if (s != "") {
          let [type, file] = s.split("/");
          if (type == "image") {
            return type;
          } else {
            return file;
          }
        }
        return s;
      }
    },
    reverse(string) {
      return string
        .split("")
        .reverse()
        .join("");
    },
    capitalizeFirstLetter(string) {
      if (string.split("_").length > 0) {
        let title = [];
        _.map(string.split("_"), str => {
          title.push(str.charAt(0).toUpperCase() + str.slice(1));
        });
        return title.join(" ");
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async loadPreferences() {
      this.loadingDetail = true;
      await api({
        method: "get",
        url: config.chatApi + "auth/preferences/" + this.operatorNumber
      })
        .then(result => {
          if (result.data.ec == 200) {
            this.quickReply = result.data.data.quickReply || [];
            this.doMasking =
              result.data.data.masking_phone == undefined
                ? true
                : result.data.data.masking_phone;
          }
        })
        .catch(error => {
          // this.showAlertError = true
        });
      this.loadingDetail = false;
    },
    async openContactDialog() {
      this.contactDialog.visible = true;
      this.tempSelectedRecipient = _.map(this.currentSelectedRecipient, v => {
        return v;
      });
      this.tempSelectedContact = await _.map(this.currentSelectedContact, v => {
        return v;
      });
      this.loadContactAll(this.currentPageContact);
    },
    tableContactRowClick(selection, column, event) {
      this.$refs.contactTable.toggleRowSelection(selection);
      this.handleContactSelect(this.$refs.contactTable.selection);
    },
    doSearchContact(ev) {
      clearTimeout(this.timeoutTyping);
      this.timeoutTyping = setTimeout(() => {
        if (this.searchContact.length >= 3) {
          this.currentPageContact = this.currentPageGroupContact = this.currentPage = 1;
          this.loadContactAll();
        } else {
          this.loadContactAll();
        }
      }, 1000);
    },
    async loadContactAll(page = 1) {
      this.loadingContact = true;
      await api({
        method: "get",
        url: this.searchContact == "" ? "phonebook" : "phonebook/search",
        params: {
          page: page,
          query:
            this.searchContact == "" || this.searchContact.length < 3
              ? undefined
              : this.searchContact
        }
      })
        .then(result => {
          this.contacts = result.data.data.contact;
          this.contactsTotal = result.data.data.rows;
        })
        .catch(err => {});
      this.loadingContact = false;

      _.forEach(this.contacts, (c, i) => {
        let contactIndex = _.findIndex(this.tempSelectedContact, tc => {
          return tc.phonebook_id == c.phonebook_id;
        });

        if (contactIndex != -1) {
          this.$refs.contactTable.toggleRowSelection(c);
        }
      });
    },
    async nextContact(page) {
      this.currentPageContact = page;
      this.loadContactAll(page);
    },
    handleContactSelectSingle(selection, row) {
      this.handleContactSelect(selection);
    },
    handleContactSelect(selection) {
      _.forEach(this.contacts, data => {
        var index = _.findIndex(this.tempSelectedContact, {
          phonebook_id: data.phonebook_id
        });
        var index2 = _.findIndex(selection, {
          phonebook_id: data.phonebook_id
        });
        if (index2 == -1) {
          if (index != -1) {
            this.tempSelectedContact.splice(index, 1);
          }
        } else {
          if (index == -1) {
            this.tempSelectedContact.push(data);
          }
        }
      });
      this.updateSelected();
    },
    buildRecipientGroupWhatsapp() {
      let contactRecipients = _.map(this.tempSelectedRecipient, v => {
        return v.contact;
      });
      if (this.currentTicket.group == "" || this.currentTicket.group == null) {
        this.wagroup.participant = this.wagroup.participants =
          this.sendTo + ", " + contactRecipients.join(", ");
        if (contactRecipients.length == 0) {
          this.wagroup.participant = this.sendTo;
        }
      } else {
        let currentInput = this.wagroupadd.participant || null;
        this.wagroupadd.participant = this.wagroupadd.participants =
          (currentInput == null ? "" : currentInput + ", ") +
          contactRecipients.join(", ");
        if (contactRecipients.length == 0) {
          this.wagroupadd.participant = null;
        }
      }
      this.currentSelectedContact = _.map(this.tempSelectedContact, v => {
        return v;
      });
      this.currentSelectedRecipient = _.map(this.tempSelectedRecipient, v => {
        return v;
      });
    },
    updateSelected() {
      let data = [];
      this.tempSelectedContact.forEach(el => {
        data.push({
          id: el.phonebook_id,
          name: el.name,
          contact: el.phone_number,
          type: "contact"
        });
      });
      this.tempSelectedRecipient = data;
    },
    async fshowDialogGroupAdd() {
      this.showDialogGroupAdd = true;
      this.loadingBtnAddParticipant = true;
      await this.loadWa();
      this.loadingBtnAddParticipant = false;
    },
    async addParticipantGroupWhatsapp() {
      this.loadingBtnAddParticipant = true;
      await axios({
        method: "put",
        url: config.chatApi + "whatsapp-conversation/group/invite",
        headers: {
          "api-key": store.getters.accessToken
        },
        data: {
          conversation: this.chatConversationId,
          code: this.currentTicket.code,
          sender: this.sender,
          participant: this.wagroupadd.participants,
          template: this.choose_template,
          template_message: this.parsingData(this.choose_template, this.param),
          param: this.param,
          id: this.currentTicket.id
        }
      })
        .then(resp => {
          if (resp.data.ec == 200) {
            this.$message.success({
              showClose: true,
              duration: 5000,
              message: this.$t("success")
            });
            this.showDialogGroupAdd = false;
            this.detailGroupWhatsapp();
            this.resetHsm();
          } else {
            this.$message.warning({
              showClose: true,
              duration: 5000,
              message: this.$t("error_text")
            });
          }
        })
        .catch(err => {
          console.log("error add", err);
          this.$message.error({
            showClose: true,
            duration: 5000,
            message: this.$t("error_text")
          });
        });
      this.loadingBtnAddParticipant = false;
    },
    async kickParticipants(number) {
      this.$swal({
        title: this.$t("helpdesk.confirm_kick.title"),
        text: this.$t("helpdesk.confirm_kick.text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios({
            method: "delete",
            url: config.chatApi + "whatsapp-conversation/group/kick",
            headers: {
              "api-key": store.getters.accessToken
            },
            data: {
              group: this.currentTicket.group,
              id: this.currentTicket.id,
              sender: this.sender,
              kick: number
            }
          })
            .then(resp => {
              return resp;
            })
            .catch(err => {
              this.$message.error({
                showClose: true,
                duration: 5000,
                message: this.$t("error_text")
              });
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
        .then(resp => {
          if (resp.data.ec == 200) {
            this.$message.success({
              showClose: true,
              duration: 5000,
              message: this.$t("success")
            });
            this.detailGroupWhatsapp();
          } else {
            this.$message.warning({
              showClose: true,
              duration: 5000,
              message: this.$t("error_text")
            });
          }
        })
        .catch(cancel => {
          console.log("cancel");
        });
    },
    resetHsm(done) {
      this.param = [];
      this.choose_template = this.template_message = "";
      this.wagroupadd.participants = "";
      this.tempSelectedRecipient = this.tempSelectedContact = this.currentSelectedRecipient = this.currentSelectedContact = [];
      if (done) done();
    },
    async dialogAddMore() {
      if (this.currentTicket.group != "" || this.currentTicket.group != null) {
        this.showDialogGroup = true;
        this.loadingBtnCreateGroup = true;
        await this.loadWa();
        this.loadingBtnCreateGroup = false;
      }
    },
    async dialogGroup() {
      if (this.currentTicket.group == "" || this.currentTicket.group == null) {
        this.wagroup = {
          participant: this.sendTo,
          subject: "Escalation Ticket #" + this.currentTicket.code,
          conversation: this.chatConversationId,
          code: this.currentTicket.code,
          sender: this.sender,
          operator: this.operatorId
        };
        this.showDialogGroup = true;
        this.loadingBtnCreateGroup = true;
        await this.loadWa();
        this.loadingBtnCreateGroup = false;
      } else {
        this.showDialogGroupDetail = true;
        this.detailGroupWhatsapp();
      }
    },
    async detailGroupWhatsapp() {
      this.loadingBtnCreateGroup = true;
      await axios({
        url: config.chatApi + "whatsapp-conversation/group/detail",
        method: "POST",
        headers: {
          "api-key": store.getters.accessToken
        },
        data: {
          id: this.currentTicket.id,
          sender: this.sender,
          group: this.currentTicket.group
        }
      })
        .then(response => {
          if (response.data.ec == 200) {
            this.groupdetail.participant = response.data.data.group.participants.join(
              ", "
            );
            this.groupdetail.subject = response.data.data.group.subject;
            this.groupdetail.admins = response.data.data.group.admins;
          } else {
            this.$message.warning({
              showClose: true,
              duration: 5000,
              message: this.$t("error_text")
            });
          }
        })
        .catch(err => {
          console.log("error detail", err);
        });
      this.loadingBtnCreateGroup = false;
    },
    async updateGroupSubject() {
      this.loadingUpdateSubject = true;
      await axios({
        url: config.chatApi + "whatsapp-conversation/group/subject",
        method: "put",
        headers: {
          "api-key": store.getters.accessToken
        },
        data: {
          subject: this.groupdetail.subject,
          group: this.currentTicket.group,
          id: this.currentTicket.id,
          sender: this.sender
        }
      })
        .then(response => {
          if (response.data.ec == 200) {
            this.$message.success({
              showClose: true,
              duration: 5000,
              message: this.$t("success")
            });
            this.showDialogGroup = false;
          } else {
            this.$message.warning({
              showClose: true,
              duration: 5000,
              message: this.$t("error_text")
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.loadingUpdateSubject = false;
    },
    async createGroupWhatsapp() {
      let checkWord = this.param.map(v => {
        return /\#invite_link/gi.test(v);
      });
      if (
        this.choose_template != "" &&
        this.dataSendHsm.param.length < this.paramCount
      ) {
        this.$message.warning({
          showClose: true,
          duration: 5000,
          message: this.$t("whatsapp.hsm_param_empty")
        });
      } else if (this.choose_template == "") {
        this.$message.warning({
          showClose: true,
          duration: 5000,
          message: this.$t("whatsapp.hsm_not_choose")
        });
      } else if (checkWord.find(v => v == true) == undefined) {
        this.$message.warning({
          showClose: true,
          duration: 10000,
          message: "At least one of param should have word #invite_link"
        });
      } else {
        this.loadingBtnCreateGroup = true;
        await axios({
          url: config.chatApi + "whatsapp-conversation/group/create",
          method: "POST",
          headers: {
            "api-key": store.getters.accessToken
          },
          data: {
            participant: this.wagroup.participant,
            subject: this.wagroup.subject,
            conversation: this.wagroup.conversation,
            code: this.wagroup.code,
            sender: this.wagroup.sender,
            operator: this.wagroup.operator,
            template: this.choose_template,
            template_message: this.parsingData(
              this.choose_template,
              this.param
            ),
            param: this.param
          }
        })
          .then(response => {
            if (response.data.ec == 200) {
              this.$message.success({
                showClose: true,
                duration: 5000,
                message: this.$t("success")
              });
              this.showDialogGroup = false;
              this.loadTicket();
            } else {
              this.$message.warning({
                showClose: true,
                duration: 5000,
                message: this.$t("error_text")
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.loadingBtnCreateGroup = false;
      }
    },
    comingSoon() {
      this.$message.warning({
        showClose: true,
        duration: 5000,
        message:
          "Coming soon! We're currently working on creating something fantastic!"
      });
    },
    readMoreC(text, length) {
      if (text) {
        if (text.length > 0 && text.length > length) {
          return text.substring(0, length) + "...";
        } else {
          return text;
        }
      }
      return "-";
    },
    doSearchTicket(from = null) {
      if (from == "select") {
        if (this.searchTicket != "") {
          this.loadTicket();
        }
      } else {
        clearTimeout(this.timeoutTicket);
        this.timeoutTicket = setTimeout(() => {
          this.currentPage = 1;
          this.loadTicket();
        }, 1000);
      }
    },
    async doCloseConversation() {
      this.$swal({
        title: this.$t("helpdesk.confirm_close.title"),
        text: this.$t("helpdesk.confirm_close.text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(async confirm => {
        // this.$message.success('yeay')
        this.loadingButtonClose = true;
        await this.sendMessage({
          type: "text",
          data: {
            text: "#close"
          }
        });
        this.showButtonReach = false;
        this.showBtnClose = false;
        this.loadingButtonClose = false;
        this.showInput = false;
        // Push.create("Close Ticket #" + data.ticket.code, {
        //   body: "Ticket #" + data.ticket.code + "has been close.",
        //   icon: "/logo-cropped.png",
        //   timeout: 6000,
        //   onClick: function() {
        //     window.focus();
        //   }
        // });
      });
    },
    showDialogReach() {
      this.showDialogReachCons = true;
      let to = this.sendTo;
      let checkNumber = to.substring(0, 2);
      // if(checkNumber == "62"){
      // 	to = "0" + to.slice(2, to.length)
      // }
      this.dataSendHsm.to = to;
      this.dataSendHsm.sender = this.sender;
      this.loadWa();
    },
    async sendHsm() {
      if (
        this.choose_template != "" &&
        this.dataSendHsm.param.length < this.paramCount
      ) {
        this.$message.warning({
          showClose: true,
          duration: 5000,
          message: this.$t("whatsapp.hsm_param_empty")
        });
      } else if (this.choose_template == "") {
        this.$message.warning({
          showClose: true,
          duration: 5000,
          message: this.$t("whatsapp.hsm_not_choose")
        });
      } else {
        this.loadingBtnReach = true;
        let messageText = this.parsingData(
          this.choose_template,
          this.dataSendHsm.param
        );
        await api({
          method: "post",
          url: config.chatApi + "whatsapp-conversation/send-hsm",
          data: {
            to: this.dataSendHsm.to,
            param: this.dataSendHsm.param,
            sender: this.dataSendHsm.sender,
            template: this.choose_template,
            message: this.template_message,
            messageText: messageText,
            messageType: "text",
            conversationId: this.chatConversationId,
            ticketCode: this.ticketCode,
            operator: this.operatorId
          }
        })
          .then(resp => {
            if (resp.data.ec == 200) {
              let message = {
                data: {
                  meta: "System - " + moment().format("YYYY-MM-DD HH:mm:ss"),
                  text: messageText
                },
                name: _.filter(this.participants, {
                  id: this.dataSendHsm.sender
                }).name,
                type: "system"
              };
              this.messageList = [...this.messageList, message];
              this.showDialogReachCons = false;
              this.loadTicket();
              this.resetTemplate();
              this.choose_template = "";
            } else {
              this.$message.error({
                showClose: true,
                duration: 5000,
                message: this.$t("whatsapp.hsm_failed")
              });
            }
          })
          .catch(err => {
            this.$message.error({
              showClose: true,
              duration: 5000,
              message: this.$t("whatsapp.hsm_failed")
            });
          });
        this.loadingBtnReach = false;
      }
    },
    async loadWa() {
      this.loadingDialogReach = true;
      this.hsmList = [];
      await api({
        method: "post",
        url: config.chatApi + "user/detail",
        data: {
          number: this.sender
        }
      })
        .then(result => {
          if (result.data.ec == 200) {
            let tempHsm = [];
            // _.forEach(result.data.data, res => {
            _.forEach(result.data.data.hsm, hsm => {
              tempHsm.push(hsm);
            });
            // })
            this.hsmList = _.uniqBy(tempHsm, "name");
            this.hsmList = _.remove(this.hsmList, v => {
              return _.isEmpty(v) == false;
            }); // remove empty object
          } else if (
            result.data.ec == 400 &&
            result.data.message == "not_subscribe"
          ) {
            // this.showAlertMessage = true
          } else {
            // this.showAlertError = true
          }
        })
        .catch(error => {
          // this.showAlertError = true
        });
      this.loadingDialogReach = false;
    },
    parsingData(name, param) {
      let message = "";
      this.hsmList.forEach(element => {
        if (element.name == name) {
          let slot = element.message.match(/{{\s*[\w\.]+\s*}}/g);
          this.paramCount = slot != null ? slot.length : 0;
          message = element.message;
          if (slot != null) {
            slot.forEach((el, i) => {
              if (param[i]) {
                message = message.replace(el, param[i]);
              }
            });
          }
        }
      });
      this.dataSendHsm.param = param;
      return message;
    },
    resetTemplate() {
      this.param = [];
      this.template_message = _.find(this.hsmList, val => {
        return val.name == this.choose_template;
      }).message;
    },
    readMore(text) {
      if (text !== "" && text != null) {
        return text.length > 32 ? text.substr(0, 32) + "..." : text;
      }
      return text;
    },
    filterNewMessages() {
      this.loadTicket(1);
    },
    sortBy(column) {
      this.filter.sortBy.column = column.prop;
      this.filter.sortBy.type = column.order;
      // console.log("sort change", column.prop, column.order)
      this.loadTicket(1);
    },
    stylingRow(row) {
      if (row.row.lastMessageId === row.row.lastIncomingMessageId) {
        return 'warning-row';
      } else {
        return '';
      }
    },
    async paginateTicket(page) {
      this.currentPage = page;
      await this.loadTicket(this.currentPage);
    },
    async setOperatorStatus(val) {
      // console.log("value: ", val)
      await axios({
        url: config.chatApi + "set-operator-status",
        method: "POST",
        data: {
          operator: this.operatorId,
          isAvailable: val == true ? "available" : "not_available"
        },
        headers: {
          "api-key": store.getters.accessToken
        }
      })
        .then(async response => {
          this.loadTicket();
        })
        .catch(err => {});
    },
    async openConversation(val) {
      this.activeChat = val
      await this.loadByConversation(val.conversationId, val.code);
    },
    pushNotif(userName, message, tag) {
      setTimeout(() => {
        var pushNotif = Push.create(userName, {
        body: message,
        icon: "/logo-cropped.png",
        timeout: 6000,
        tag: tag,
        onClick: this.notifOnClick
      });
      }, 2000);
      // this.notifBell()
    },
    notifOnClick(data) {
      let notif = data.currentTarget;
      var [convId, code] = notif.tag.split("#");
      this.loadByConversation(convId, code);
      window.focus();
      data.currentTarget.close();
    },
    async authUser(view = false) {
      this.loadingPage = true;
      await axios({
        url: config.chatApi + "auth/login",
        method: "POST",
        data: {
          email: store.getters.email,
          channels: "whatsapp"
        },
        params: {
          view : !view ? null : true
        },
        headers: {
          "api-key": store.getters.accessToken
        }
      })
        .then(async response => {
          if (response.data.ec == 200) {
            this.operatorStatus =
              response.data.data.operator.status == "available" ? true : false;
            this.operatorId = response.data.data.operator.id;
            this.operatorNumber = response.data.data.operator.number;
            this.operatorName = response.data.data.operator.name;
            this.filter.operator = response.data.data.operator.id;
            await this.loadTicket();
            this.loadPreferences();
            this.showTicket = true;
          } else {
            this.showAlertTicket = true;
          }
          this.loadingPage = false;
        })
        .catch(error => {
          this.loadingPage = false;
          this.showAlertError = true;
          // console.log("Error",error)
        });
    },
    toggleUserList() {
      this.inUserList = !this.inUserList;
      this.$emit("userList", this.inUserList);
    },
    async readFile(message) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = async e => {
          this.temp = e.target.result;
          // console.log("temp: ", this.temp)
          resolve(e.target.result);
        };
        reader.onerror = async e => {
          reject(null);
        };

        reader.readAsDataURL(message.data.file);
      });
    },
    async onMessageWasSent(message) {
      if (this.imSendingMessage) {
        this.$message.warning(
            "Please wait",
            { duration: 1000 }
          );
        return
      }
      // called when the user sends a message
      if (message.type == "text" || message.type == "emoji") {
        message.caption = "";
        this.sendMessage(message);
      } else {
        let base64 = await this.readFile(message);
        let allowedFile = ["png", "jpg", "jpeg", "pdf", "mp4"];
        let base64Type = message.data.file.type.split("/")[1];
        if (allowedFile.indexOf(base64Type) == -1) {
          this.$message.warning(
            "File type not allowed. Allowed: " + allowedFile.join(", "),
            { duration: 5000 }
          );
        } else {
          message.data.encodedFile = base64;
          if (["png", "jpg", "jpeg"].indexOf(base64Type) !== -1) {
            message.type = "image";
            message.caption = message.data.text ? message.data.text : "";
          } 
          else if(["mp4"].indexOf(base64Type) !== -1){
             message.type = "video";
             message.caption = message.data.text ? message.data.text : "";
            //  message.caption = message.data.file.name || "";
          } 
          else {
            message.type = "pdf";
            message.caption = message.data.file.name || "";
          }
          // console.log(base64Type, message)
          this.sendMessage(message);
        }
      }
      // console.log('Message',message)
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      // this.chatConversationId = ""
      this.isChatOpen = false;
    },
    async sendMessage(message) {
      var self = this;
      this.imSendingMessage = true;
      let messageData = "";
      var caption = "";
      let messageLoadingIndex = 0;
      if (message.type == "text") {
        messageData = message.data.text;
        if (messageData.charAt(0) != "#") {
          this.messageList = await [
            ...this.messageList,
            {
              author: "me",
              type: "text",
              data: {
                text: messageData,
                proccessUpload: true,
                meta: moment().format("YYYY-MM-DD HH:mm:ss")
              }
            }
          ];
          messageLoadingIndex = this.messageList.length - 1;
        }
      } else if (message.type == "emoji") {
        messageData = message.data.emoji;
        this.messageList = await [
          ...this.messageList,
          {
            author: "me",
            type: "text",
            data: {
              text: messageData,
              proccessUpload: true,
              meta: moment().format("YYYY-MM-DD HH:mm:ss")
            }
          }
        ];
        messageLoadingIndex = this.messageList.length - 1;
      } else if (["image", "pdf", "video"].indexOf(message.type) !== -1) {
        messageData = message.data.encodedFile;
        caption = message.caption;
        this.messageList = await [
          ...this.messageList,
          {
            author: "me",
            type: "file",
            data: {
              text: caption,
              file: {
                src: message.data.encodedFile,
                type: message.type,
                time: "now....",
                onclick: e => {
                  // console.log("type", message.data.encodedFile)
                  // console.log("clicked", e.path[0].currentSrc)
                  this.clickedImage = message.data.encodedFile;
                  if (this.checkFileType(message.data.encodedFile) == "pdf") {
                    this.doRenderPdf();
                  }
                  this.dialogImage = true;
                }
              },
              proccessUpload: true,
              meta: moment().format("YYYY-MM-DD HH:mm:ss")
            }
          }
        ];
        messageLoadingIndex = this.messageList.length - 1;
      }
      if (["image", "pdf","video"].indexOf(message.type) == -1) {
        this.lastSentMessage = messageData.trim();
      }
      await axios({
        url: config.chatApi + "whatsapp-conversation/send-message",
        method: "POST",
        data: {
          to: this.sendTo,
          sender: this.sender,
          message: messageData,
          messageType: message.type,
          conversationId: this.chatConversationId,
          ticketCode: this.ticketCode,
          operator: this.operatorId,
          caption: message.caption,
          timestamp: moment().format("x")
        },
        headers: {
          "api-key": store.getters.accessToken
        }
      })
        .then(response => {
          if (response.data.ec == 200) {
            if (response.data.message == "success") {
              // this.loadTicket()
              let chatPush = response.data.data;
              this.chat.push(chatPush);
              this.messageAre = "";

              if (message.type != "image") {
                // if(messageData.trim() != "#close"){
                // 	message.data.meta = moment().format('YYYY-MM-DD HH:mm:ss')
                // 	this.messageList = [ ...this.messageList, message ]
                // }
                this.messageList[
                  messageLoadingIndex
                ].data.proccessUpload = false;
              } else {
                this.messageList[
                  messageLoadingIndex
                ].data.proccessUpload = false;
              }
              this.renderContext([this.chat[this.chat.length - 1]])
              this.loadTicket(this.currentPage, false);
              
            } else {
              if (response.data.message == "name_changed") {
                this.$message.success({
                  showClose: true,
                  duration: 5000,
                  message: this.$t(`success`)
                });
                this.titleChat = `#${
                  this.ticketCode
                } (${message.data.text.replace("#name ", "")})`;
                this.loadTicket(this.currentPage);
              } else {
                this.loadTicket(this.currentPage);
              }
            }
          } else {
            this.messageList.splice(messageLoadingIndex, 1);
            this.$message.error({
              showClose: true,
              duration: 10000,
              message: this.$t(`conversation.${response.data.message}`)
            });
          }

          this.imSendingMessage = false;
        })
        .catch(error => {
          this.imSendingMessage = false;
          this.messageList.splice(messageLoadingIndex, 1);
          this.$message.error({
            showClose: true,
            duration: 10000,
            message: this.$t(`conversation.fatal_error`)
          });
        });
    },
    async loadTicket(page = 1, load= true) {
      if (load != false) {
          this.loadingTable = true;
      }
      var self = this;
      await axios({
        url: config.chatApi + "whatsapp-conversation",
        method: "POST",
        data: {
          status: this.filter.btnStatus,
          operator: this.filter.operator,
          current: this.operatorId
        },
        params: {
          page: page,
          sort: this.filter.sortBy.column,
          type: this.filter.sortBy.type,
          filter: this.newMessages == true ? "new_messages" : "",
          query: this.searchTicket ? this.searchTicket : "",
          queryBy: this.searchBy
        },
        headers: {
          "api-key": store.getters.accessToken
        }
      })
        .then(response => {
          // console.log('load ticket', response);
          this.ticket = response.data.data.ticket.map(v => {
            v.chat_duration = human(moment().diff(v.dateCreate), { largest: 3 })
            if (v.lastMessages) {
              v.lastMessages =
                v.lastMessages.length > 50
                  ? v.lastMessages.slice(0, 50) + "..."
                  : v.lastMessages;
              if (v.lastMessagesType == "image") {
                v.lastMessages = "(Image)";
              } else if (v.lastMessagesType == "pdf") {
                v.lastMessages = "(File)";
              } else if (v.lastMessagesType == "video") {
                v.lastMessages = "(Video)";
              }
            }
            v.custName = v.customer.name;
            v.custPhone = v.customer.number;
            return v
          });
          this.botId = response.data.data.userIdBot;
          this.totalTicket = response.data.data.totalTicket;
          // console.log("Total ticket",this.totalTicket.close)
          var customerDetail = new Array();
          // let it = 0;
          // _.forEach(this.ticket, value => {
          //   // var [name, phone] = value.customerDetail.split(",")
          //   this.problem = value.problem.length;
          //   if (value.lastMessages) {
          //     this.ticket[it].lastMessages =
          //       value.lastMessages.length > 50
          //         ? value.lastMessages.slice(0, 50) + "..."
          //         : value.lastMessages;
          //     if (this.ticket[it].lastMessagesType == "image") {
          //       this.ticket[it].lastMessages = "(Image)";
          //     } else if (this.ticket[it].lastMessagesType == "pdf") {
          //       this.ticket[it].lastMessages = "(File)";
          //     } else if (this.ticket[it].lastMessagesType == "video") {
          //       this.ticket[it].lastMessages = "(Video)";
          //     }
          //   }
          //   this.ticket[it].custName = value.customer.name;
          //   this.ticket[it].custPhone = value.customer.number;
          //   it++;
          // });
          // console.log(this.ticket)
          this.ticketLoader = false;
        })
        .catch(error => {
          // console.log("Error",error)
        });
      this.loadingTable = false;
    },

    maskingNumber(number) {
      if (this.doMasking == true) {
        //start masking number
        // let number = value.customer.number
        let masked_number = [];
        for (let i = 0; i < number.length - 4; i++) {
          masked_number[i] = "*";
        }
        masked_number = _.join(masked_number, "");
        let selected_number = number.substring(0, number.length - 4);
        let selected_masked_number = _.replace(
          number,
          selected_number,
          masked_number
        );
        //end masking number
        return selected_masked_number;
      } else {
        return number;
      }
    },

    async loadByConversation(conversationId, ticketCode) {
      var self = this;
      this.showButtonReach = false;
      this.showBtnClose = false;
      this.loadingMessage = true;
      this.chatLoader = true;
      // this.isChatOpen = true;
      this.openChat()
      this.chatConversationId = conversationId;
      this.ticketCode = ticketCode;
      this.messageList = [];
      this.participants = [];
      await axios({
        url: config.chatApi + "whatsapp-conversation-detail/" + conversationId,
        method: "POST",
        headers: {
          "api-key": store.getters.accessToken
        },
        data: {
          number: this.operatorNumber
        }
      })
        .then(response => {
          // console.log('loadConverSattion', response);
          if(response.data.ec != 200){
            this.isChatOpen = false;
            this.chatLoader = false;
            this.loadingMessage = false;
            this.$message.error({
              showClose: true,
              duration: 3000,
              message: this.$t(`${response.data.message}!`)
            });

          }
          this.chat = response.data.data.chat;
          this.sendTo = response.data.data.sendTo;
          this.sender = response.data.data.customerNumber[0];
          let tempUser = new Array();
          let tempMessage = new Array();
          // console.log(this.sendTo)
          _.forEach(this.chat, value => {
            if (value.type == "USER_ANSWER" || value.type == "CS_ANSWER") {
              value.lastMessagesTime = moment(value.lastMessagesTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              let message = {
                type: value.messageType,
                name: value.senderName,
                author: value.number == this.sender ? "me" : value.number
              };
              if (["text", "contacts", "location"].includes(value.messageType)) {
                message.data = {
                  text: value.body,
                  meta:
                    value.type == "CS_ANSWER"
                      ? value.lastMessagesTime
                      : value.senderName + " - " + value.lastMessagesTime
                };
              } else if (value.messageType == "emoji") {
                message.data = {
                  emoji: value.body,
                  meta: value.lastMessagesTime
                };
              } else if (
                ["image", "pdf", "video"].indexOf(value.messageType) !== -1
              ) {
                message.type = "file";
                message.data = {
                  text: value.caption,
                  file: {
                    // url: value.body,
                    src: value.body,
                    type: "image",
                    time: "now....",
                    onclick: e => {
                      // console.log("clicked", e.path[0].currentSrc)
                      this.clickedImage =
                        this.checkFileType(value.body) == "image"
                          ? e.path[0].currentSrc
                          : value.body;
                      if (this.checkFileType(value.body) == "pdf") {
                        this.doRenderPdf();
                      } else if (this.checkFileType(value.body) == "video") {
                        // console.log("clicked")
                      }
                      this.dialogImage = true;
                    }
                  },
                  meta:
                    value.type == "CS_ANSWER"
                      ? value.lastMessagesTime
                      : value.senderName + " - " + value.lastMessagesTime
                };
              }
              tempMessage.push(message);
              tempUser.push({ id: value.number, name: value.senderName });
            } else {
              value.lastMessagesTime = moment(value.lastMessagesTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              tempMessage.push({
                type: "system",
                name: value.senderName,
                data: {
                  text: value.body,
                  meta:
                    value.number == this.sender
                      ? "System - " + value.lastMessagesTime
                      : value.senderName + " " + value.lastMessagesTime
                }
              });
              tempUser.push({ id: value.number, name: value.senderName });
            }
          });
          this.participants = _.map(response.data.data.participant, v => {
            v.id = v.number;

            //start masking number
            let selected_masked_number = this.maskingNumber(v.number);
            //end masking number

            if (v.number == this.sender) {
              if (response.data.data.ticket.operator) {
                v.name = response.data.data.ticket.operator.name;
                if (
                  response.data.data.ticket.operator.operator == this.operatorId
                ) {
                  v.name += " (You)";
                }
              } else {
                v.name = this.operatorName + " (You)";
              }
            } else {
              v.name += ` (${selected_masked_number})`;
            }
            v.imageUrl =
              360 * Math.random() +
              "," +
              (25 + 70 * Math.random()) +
              "%," +
              (85 + 10 * Math.random()) +
              "%";
            return v;
          });
          this.messageList = tempMessage;
          this.showButtonReach = !response.data.data.canReply;
          this.showBtnClose = !response.data.data.canReply;
          this.showInput = response.data.data.canReply;

          if (response.data.data.ticket) {
            this.currentTicket = response.data.data.ticket;
            if (
              response.data.data.ticket.status != 2 &&
              response.data.data.ticket != "2"
            ) {
              if (
                response.data.data.ticket.group == null ||
                response.data.data.ticket.group == ""
              ) {
                this.showGroupButton = true;
              } else {
                this.showGroupButton = true;
              }
            } else {
              this.showGroupButton = this.showButtonReach = this.showBtnClose = this.showInput = false;
            }
          } else {
            this.showGroupButton = true;
          }
          this.titleChat = `#${ticketCode} (${_.find(this.participants, o => {
            return o.number == this.sendTo;
          })
            .name.replace(`(${this.maskingNumber(this.sendTo)})`, "")
            .trim()})`;

          this.chatLoader = false;
          this.loadingMessage = false;

          setTimeout(() => {
            this.renderContext(this.chat)
          }, 500);
          
        })
        .catch(error => {
          console.log(error);
        });
    },

    renderContext(chats){
      let parent = document.getElementsByClassName("sc-message"), parent1, parent2, kid, cheklist

      let shouldSkip = false;

            chats.every((el,i) => {
              // console.log(el);
              cheklist = document.createElement("span");
              
              cheklist.classList.add("mdi","check-list");
              // cheklist.innerHTML = "Checklist"
              switch (el.type) {
                case "USER_ANSWER":
                  cheklist.classList.add("mdi-check-all")
                  cheklist.style.right = '2em';
                  if (chats.length > 1 ) {
                    parent[i].childNodes[0].appendChild(cheklist)
                  }
                  else{
                    parent[parent.length-2].childNodes[0].appendChild(cheklist)
                  }
                  break;
                case "CS_ANSWER":
                  cheklist.style.right = '0.5em';
                  cheklist.setAttribute("id", `chatId-${el.id || el.chatId}`);
                  if (chats.length > 1 ) {
                    cheklist.classList.add("mdi-check-all", "check-list-sent");
                    if (this.activeChat.lastIncomingMessageId == this.activeChat.lastMessageId || this.activeChat.lastIncomingMessageId != this.activeChat.lastMessageId && this.activeChat.read == '2') {
                        cheklist.style.color = '#249393'
                    }
                  }
                  else{
                    if (el.status_chat) {
                      if (el.status_chat == '1') {
                        cheklist = document.getElementById(`chatId-${el.id || el.chatId}`)
                        // cheklist.remove("mdi-check");
                        cheklist.classList.add("mdi-check-all");
                        return false
                      }
                      else if (el.status_chat == '2') {
                        // cheklist = document.getElementById(`chatId-${el.id|| el.chatId}`)
                        setTimeout(() => {
                          cheklist = document.getElementsByClassName("check-list-sent")
                          for (let idx=0, length=cheklist.length|0; idx<length; idx=idx+1|0) {
                                cheklist[idx].classList.add("mdi-check-all");
                              cheklist[idx].style.color = '#249393'
                          }
                        }, 1000);
                        
                        return false
                      }
                      else {
                        return false
                      }
                    }
                    else {
                      cheklist.classList.add("mdi-check", "check-list-sent");
                    }
                    parent[parent.length - 2].childNodes[0].insertBefore(cheklist, parent[parent.length - 2].childNodes[0].firstChild)
                    return false
                  }
                  
                  parent[i].childNodes[0].insertBefore(cheklist, parent[i].childNodes[0].firstChild)
                  break;
              }
              if (el.context != null) {
                if (chats.length > 1) {
                  parent1 = parent[i].childNodes[0].childNodes[2]
                }
                else {
                  parent1 = parent[this.chat.length - 1].childNodes[0].childNodes[2]
                }
                
                this.chat.forEach((v, index) => {
                  if (v.messageId == el.context && ["USER_ANSWER","CS_ANSWER"].includes(v.type)) {
                    let idxChild = v.type == "USER_ANSWER" ? 2 : 3;
                    if (v.messageType != 'text') {
                      parent2 = parent[index].childNodes[0].childNodes[idxChild]
                      kid = parent2.cloneNode(true);
                      kid.childNodes.forEach(e =>{
                        e.classList.add("bg-context-msg");
                        if (e.childNodes.length > 1) {
                          e.childNodes[e.childNodes.length - 1].classList.add("bg-context-msg")
                        }
                      })
                      kid.classList.add("context-msg");
                      parent[index].setAttribute("id", `chatId-${index}`);
                      kid.setAttribute("id", `${index}`);
                      if (v.context != null) {
                        kid.removeChild(kid.childNodes[0]);
                      }
                      kid.addEventListener("click", this.clickContext);
                      // kid.removeChild(kid.lastElementChild);
                      parent1.insertBefore(kid, parent1.firstChild)
                    }
                    else {
                      parent2 = parent[index].childNodes[0].childNodes[idxChild]
                      kid = parent2.cloneNode(true);
                      kid.classList.add("context-msg");
                      parent[index].setAttribute("id", `chatId-${index}`);
                      kid.setAttribute("id", `${index}`);
                      if (v.context != null && kid.childNodes.length > 2) {
                        kid.removeChild(kid.childNodes[0]);
                      }
                      kid.addEventListener("click", this.clickContext);
                      // kid.removeChild(kid.lastElementChild);
                      parent1.insertBefore(kid, parent1.firstChild)
                    }
                  }
                })
                
              }
              return true
            })
    },
    clickContext(evt){
      let getId = evt.path.filter(el => /\d/.test(el.id))
      let target = document.getElementById(`chatId-${getId[0].id}`);
      target.scrollIntoView();
    },

    // checkService(){
    //   console.log('navigator',navigator);
    //   if (!('serviceWorker' in navigator)) {
    //     throw new Error('No Service Worker support!')
    //   }
    //   if (!('PushManager' in window)) {
    //     throw new Error('No Push API Support!')
    //   }
    // },
    notifBell(){
       // console.log('masuk', this.mute);
      if (this.mute == true) {
        let audio = new Audio(notifSfx);
        audio.load();
        audio.volume = 0.2;
        audio.play();
      }
      else{
        let audio = new Audio();
        audio.load();
      }
    }
  },
  watch:{
    mute(){
      this.$store.commit("setBellNotif", this.mute);
      }
  },
  
  async mounted() {
    // synth.triggerAttackRelease("A4", "200n");
    // synth.triggerAttackRelease("C6", "2000n");
    // synth.volume.value = -6;
    // console.log('cek',synth.get());
    // await this.checkService()
    Push.Permission.GRANTED;
    window.onblur = function() {
      this.windowIsBlur = true;
    };
    window.onfocus = function() {
      this.windowIsBlur = false;
    };
    await this.authUser(true);
    socket.connect();
    socket.on("connect", () => {
      // synth.triggerAttackRelease("C4", "8n");
      if (this.operatorId != "")
        socket.emit("enter conversation", this.operatorId);
    });
    // console.log("b: ", this.botId)
    if (this.showTicket == true) {
      // synth.triggerAttackRelease("C4", "8n");
      socket.emit("enter conversation", this.operatorId);
      socket.on("listenTicket", data => {
        // synth.triggerAttackRelease("C6", "2000n");
        // synth.volume = 10;
        // console.log("new ticket coming...", data)
        setTimeout(() => {
            Push.create("New ticket #" + data.ticket.code, {
            body: "New ticket #" + data.ticket.code,
            icon: "/logo-cropped.png",
            timeout: 6000,
            onClick: function() {
              window.focus();
            }
          }); 
        }, 3000);
        
        this.notifBell()
        // synth.triggerAttackRelease("C4", "8n");
        this.loadTicket(1, false);
      });
      socket.on("listenChat", async data => {
        // synth.triggerAttackRelease("C6", "2000n");
        // console.log("socket coming: ", data.data);
        if( data.data.type != "CS_ANSWER"){
          this.notifBell()

        if (
        data.conversationId == this.chatConversationId &&
        this.isChatOpen == false
        ){
          this.newMessagesCount += 1
        }

        if (
          data.conversationId == this.chatConversationId
        ) {
            let dataMessage = {};
            let pushDt = {
              type:
                ["image", "pdf", "video"].indexOf(data.data.messageType) !== -1
                  ? "file"
                  : "text",
              name: data.data.senderName,
              author: data.data.number == this.sender ? "me" : data.data.number,
              data: dataMessage
            };

            if (
            this.imSendingMessage == false &&
            data.data.senderId != this.botId
          ) {
            // console.log("jangan notif")
            // synth.triggerAttackRelease("C6", "2000n");
            this.showInput = true;
            this.showButtonReach = false;
            this.showBtnClose = false;
            // let dataMessage = {};
            // let pushDt = {
            //   type:
            //     ["image", "pdf", "video"].indexOf(data.data.messageType) !== -1
            //       ? "file"
            //       : "text",
            //   name: data.data.senderName,
            //   author: data.data.number == this.sender ? "me" : data.data.number,
            //   data: dataMessage
            // };
            if (
              ["image", "pdf", "video"].indexOf(data.data.messageType) !== -1
            ) {
              // console.log("data type..")
              dataMessage = {
                file: {
                  src:
                    data.data.senderId == this.botId
                      ? data.data.body
                      : data.data.body,
                  type:
                    ["image", "video"].indexOf(data.data.messageType) !== -1
                      ? data.data.messageType
                      : "file",
                  onclick: e => {
                    this.clickedImage =
                      data.data.messageType == "image"
                        ? e.path[0].currentSrc
                        : data.data.body;
                    if (data.data.messageType == "pdf") {
                      this.doRenderPdf();
                    } else if (this.checkFileType(value.body) == "video") {
                      // console.log("clicked")
                    }
                    this.dialogImage = true;
                  }
                },
                text: data.data.caption || undefined,
                meta: this.formatDate(
                  data.data.lastMessagesTime,
                  "YYYY-MM-DD HH:mm:ss"
                )
              };
              pushDt.data = dataMessage;
              this.messageList.push(pushDt);
              this.chat.push(data.data);
            } else {
              dataMessage = {
                text: data.data.body,
                meta:
                  data.data.number == this.sendTo
                    ? data.data.senderName +
                      " - " +
                      this.formatDate(
                        data.data.lastMessagesTime,
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : this.formatDate(
                        data.data.lastMessagesTime,
                        "YYYY-MM-DD HH:mm:ss"
                      )
              };

              if (
                this.lastSentMessage == "#close" ||
                data.data.incomingType == "system"
              ) {
                pushDt.author = "system";
                if (this.lastSentMessage == "#close") this.showInput = false;
              }
              pushDt.data = dataMessage;
              pushDt.type = data.data.incomingType == "system" ? "system" : "text";
              await this.messageList.push(pushDt);
              await this.chat.push(data.data);
              setTimeout(async () => {
                await this.renderContext([this.chat[this.chat.length - 1]])
              }, 500);
              
            }
          } else {
            // console.log("this user not sending..", this.lastSentMessage)
            dataMessage = {
                text: data.data.body,
                meta:
                  data.data.number == this.sendTo
                    ? data.data.senderName +
                      " - " +
                      this.formatDate(
                        data.data.lastMessagesTime,
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : this.formatDate(
                        data.data.lastMessagesTime,
                        "YYYY-MM-DD HH:mm:ss"
                      )
              };
            if (
              this.lastSentMessage == "#close" ||
              data.data.incomingType == "system"
            ) {
              // let pushDt = {
              //   name: data.data.senderName,
              //   type: "system",
              //   data: {
              //     text: data.data.body,
              //     meta:
              //       "System - " +
              //       this.formatDate(
              //         data.data.lastMessagesTime,
              //         "YYYY-MM-DD HH:mm:ss"
              //       )
              //   }
              // };
              pushDt.author = "system";
              pushDt.data = dataMessage;
              pushDt.type = data.data.incomingType == "system" ? "system" : "text";
              if (this.lastSentMessage == "#close") this.showInput = false;
              this.messageList.push(pushDt);
            }
            this.imSendingMessage = false;
          }
          
          this.loadTicket(1,false);
          
          
        } else {
          if (data.data.senderId != this.botId) {
            if (data.data.type != "CS_ANSWER") {
              this.pushNotif(
              data.data.senderName,
              ["text", "pdf"].indexOf(data.data.messageType) != -1
                ? data.data.body
                : `(${this.capitalizeFirstLetter(data.data.messageType)})`,
              `${data.conversationId}#${data.code}`
            );
            } 
            
          }
          this.loadTicket(1,false);
        }
        }
        else {
          if (
          data.conversationId == this.chatConversationId &&
          this.isChatOpen == true
        ) {
          if (this.chat[this.chat.length - 1].messageId == null || typeof this.chat[this.chat.length - 1].messageId == 'undefined') {
            setTimeout(() => {
              this.chat[this.chat.length - 1].messageId = data.data.messageId || null 
            }, 500);
          }
          if (data.data.status_chat) {
            setTimeout(async ()=> {
              await this.renderContext([data.data])
            }, 1000); 
            if (data.data.status_chat == '2') {
              this.loadTicket(1, false);
            }
          }
          }
        }
      });
    }
  },
  beforeDestroy() {
    socket.disconnect();
  },
  components: {
    pdf
  }
};
</script>
<style>
.iwrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.iwrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.check-list {
  align-self: center;
  position: relative;
}

.context-msg{
  color: rgb(38, 38, 38);
  background-color: #F6F6F6 !important;
  margin: 15px;
  border-left: 5px solid #249393;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: 0;
  width: 100% !important;
  cursor: pointer;
}

.bg-context-msg{
   background-color: #F6F6F6 !important;
}

.sc-message--system {
  background-color: rgba(225, 245, 254, 0.92) !important;
  opacity: 1 !important;
  width: 88%;
  word-wrap: break-word;
}
.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
  width: 70%;
}
.sc-message--content.system {
  justify-content: center !important;
}
a.chatLink.chatLink-url {
  color: #039be5 !important;
  word-wrap: break-word;
}
.el-collapse-item__header {
  font-weight: bold;
  color: #249393;
}
.el-table__empty-block {
  height: 200px !important;
}
.swal2-container {
  z-index: 10000 !important;
}
.el-table .warning-row {
  font-weight: bold; color: #249393 !important;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<style lang="scss" scoped>
@import "../assets/scss/_variables";



.sc-chat-window.opened {
  z-index: 9999 !important;
}

.sc-user-input {
  display: none;
}

.full-button {
  width: 100%;
}

.page-header {
  margin-bottom: 20px;
}

// h2 {
//   float: left;
// }

.add-group,
.add-contact {
  float: right;
}

.search-contact {
  float: right;
  width: 200px;
}

.search-group {
  width: 100%;
}

.contact-list,
.group-list {
  width: 100%;
}

.group-list {
  width: 100%;
  cursor: pointer;
}

.contact-list {
  height: 650px;
}

.group-item,
.contact-item {
  &:hover,
  &.active {
    // background-color: #dddddd;
    border-radius: 5px;
  }
}

.group-left-item {
  &:hover,
  &.active {
    background-color: #dddddd;
    border-radius: 5px;
    cursor: pointer;
  }
}

.group-item {
  cursor: pointer;
}

.divider {
  width: 100%;
  background-color: #000000;
  margin: 2px 2px;
}

.contact {
  margin: 10px 0;
  padding: 5px;
  box-sizing: border-box;
  // cursor: pointer;
  transition: all 0.5s 0.25s;

  .avatar {
    width: 60px;
    transition: all 0.5s 0.25s;

    img,
    span {
      box-sizing: border-box;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      transition: all 0.5s 0.25s;
      font-size: 20px;
      padding-top: 12px;
      text-align: center;
      text-transform: uppercase;
    }
  }
}

.el-card__body {
  overflow-y: scroll;
}

.menu {
  font-size: 18px;
}

.fs-12 {
  font-size: 12px;
}

.fs-14 {
  font-size: 14px;
}

.fc-soft {
  color: #999999;
}

.fl-right {
  float: right;
}

.fl-left {
  float: left;
}

.border-btm {
  border-bottom: 1px solid #ebeff5;
}

.inbound {
  background-color: #ffffcc;
}

.outbound {
  background-color: #f5ffff;
}

.align-justify {
  text-align: justify;
}

.main-alert {
  width: calc(100%-18px);
  padding: 18px;
  line-height: 0;
  text-align: right;
  color: #67c23a;
  border-radius: 4px;
  opacity: 1;
  background-color: #f0f9eb;
  font-size: 12px;
  position: relative;
}

.alert-new {
  width: 100%;
  text-align: left;
  font-weight: bold;
  line-height: 0;
  font-size: 10px;
  align-items: left;
  -webkit-font-smoothing: antialiased;
}

.alert {
  width: 100%;
  text-align: right;
  font-weight: 400;
  line-height: 0;
  // color: #67c23a;
  font-size: 10px;
  align-items: right;
  -webkit-font-smoothing: antialiased;
}

* {
  font-family: "Gotham", sans-serif;
}

@media (max-width: 1280px) {
  .search-contact {
    float: right;
    width: 157px;
  }
}

@media (max-width: 1024px) {
  .margin-right-10,
  .mr-10 {
    margin-right: 9px;
  }
  // .search-contact {
  // 	float: right;
  // 	width: 157px;
  // }
}

@media screen and (max-width: 450px) {
  .avatar {
    display: none;
  }
}
</style>
