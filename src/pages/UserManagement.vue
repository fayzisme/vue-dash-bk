<template>
  <div class="scrollable only-y">
    <div class="page-header">
      <h1>{{ $t("usermanagement.usermanagement") }}</h1>
    </div>
    <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClicked">
      <el-tab-pane label="User" name="user">
        <el-card v-if="showAlertError || showAlert" style="margin-bottom: 1em">
          <error-gope-siji v-if="showAlertError" />
          <el-alert
            v-if="showAlert"
            :title="$t('error')"
            description="You are not allowed to see this page."
            type="error"
            :closable="false"
            show-icon
          ></el-alert>
        </el-card>
        <el-card v-loading="loadingTable" v-if="!showAlertError && !showAlert">
          <div>
            <p>
              <el-button type="primary" @click="dialogVisible = true">
                <i class="mdi mdi-email"></i> Invite user
              </el-button>
            </p>
          </div>
          <div>
            <el-table :data="listUser" style="width: 100%">
              <el-table-column prop="email" label="Email" width="350"></el-table-column>
              <el-table-column prop="name" label="Name" width="250"></el-table-column>
              <el-table-column label="Action" min-width="700">
                <template slot-scope="scope">
                  <el-button
                    type="default"
                    @click.native.prevent="dialogDetail = true; selectedRows = scope.row"
                    size="mini"
                    class="mt-10"
                  >
                    <i class="mdi mdi-account-card-details" /> Detail
                  </el-button>

                  <el-button
                    v-if="scope.row.email != userEmail"
                    type="danger"
                    @click.native.prevent="remove(scope.row.email); selectedRows = scope.row"
                    size="mini"
                    class="mt-10"
                  >
                    <i class="mdi mdi-account-remove" /> Remove
                  </el-button>
                  <el-button
                    v-if="scope.row.oa == null || scope.row.oa.length !== availableChannel.length"
                    type="primary"
                    @click.native.prevent="dialogAssignCS = true; selectedRows = scope.row"
                    size="mini"
                    class="mt-10"
                  >
                    <i class="mdi mdi-headset" /> Assign as Customer Service
                  </el-button>
                  <el-button
                    v-if="scope.row.oa !== null && scope.row.oa.length > 0"
                    type="warning"
                    @click.native.prevent="dialogRemoveCS = true; selectedRows = scope.row"
                    size="mini"
                    class="mt-10"
                  >
                    <i class="mdi mdi-headset" /> Unassign Customer Service
                  </el-button>
                  <!--
								<el-button v-if="(allowMakerChecker.options_value == 'true' || allowMakerChecker.options_value == true) && scope.row.is_checker == 0" type="primary" @click.native.prevent="dialogAssignChecker = true; selectedRows = scope.row" size="mini" class="mt-10"><i class="mdi mdi-account-check" /> Assign as Checker</el-button>
								<el-button v-if="(allowMakerChecker.options_value == 'true' || allowMakerChecker.options_value == true) && scope.row.is_checker == 1" type="primary" @click.native.prevent="dialogRemoveChecker = true; selectedRows = scope.row" size="mini" class="mt-10"><i class="mdi mdi-account-check" /> Unassign Checker</el-button>
                  -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <div v-if="!showAlertError && !showAlert">
          <el-form
            @submit.native.prevent="invite"
            :model="form"
            status-icon
            :rules="rulesForm"
            ref="form"
          >
            <el-dialog title="Invite User" :visible.sync="dialogVisible" width="30%">
              <el-form-item label="Email" prop="email">
                <el-input type="text" v-model="form.email" placeholder="Email" />
              </el-form-item>
              <span slot="footer" class="dialog-footer">
                <el-button @click="invite" type="primary" :loading="loadingReg">Invite</el-button>
                <el-button @click="dialogVisible = false">Cancel</el-button>
              </span>
            </el-dialog>
          </el-form>
        </div>
        <div v-if="!showAlertError && !showAlert">
          <el-dialog title="Warning" :visible.sync="sendInvite" width="30%">
            <span>User not registered. Send this user an email for registration?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="sendEmail" type="primary" :loading="loadingEmail">Send email</el-button>
              <el-button @click="sendInvite = false, dialogVisible = true">Cancel</el-button>
            </span>
          </el-dialog>
        </div>
        <div v-if="!showAlertError && !showAlert">
          <el-form :model="formRemove" status-icon :rules="rulesFormRemove" ref="formRemove">
            <el-dialog
              title="Warning"
              @submit.native.prevent="removeAccount"
              :visible.sync="visibleRemove"
              width="30%"
              :before-close="() => { loadingRemove = false; visibleRemove = false; $refs['formRemove'].resetFields(); selectedEmail = ''; selectedRows = null }"
            >
              <span>
                This account (
                <b>{{ selectedEmail }}</b>) will be remove from system and your company. Remove this account?
              </span>
              <br />
              <br />
              <span>For security, please input your password</span>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="formRemove.password"
                  placeholder="Your password"
                />
              </el-form-item>
              <span slot="footer" class="dialog-footer">
                <el-button @click="removeAccount" type="danger" :loading="loadingRemove">Remove</el-button>
                <el-button @click="visibleRemove = false; $refs['formRemove'].resetFields()">Cancel</el-button>
              </span>
            </el-dialog>
          </el-form>
        </div>
        <div v-if="!showAlertError && !showAlert">
          <el-dialog
            title="Assign as Customer Service"
            :visible.sync="dialogAssignCS"
            width="40%"
            :before-close="(done) => { selectedEmail = ''; selectedRows = null; done() }"
          >
            <span>Please fill all fields below to assign this user as Customer Service</span>
            <br />
            <br />
            <el-form label-width="150px" label-position="left">
              <el-form-item label="Channel" required="true">
                <el-select @change="detailWa()" v-model="formAssignCs.channels" placeholder="Select channel">
                  <el-option :key="item.k" v-for="item in availableChannel" :disabled="selectedRows && selectedRows.oa && selectedRows.oa.find(v => v.channels == item.k) ? true : false" :value="item.k" :label="item.v"/>
                </el-select>
              </el-form-item>
              <el-form-item label="Channel Account" required="true">
                <el-select :loading="tokenLoader" :disabled="formAssignCs.channels ? false : true" placeholder="Select channel account" v-model="formAssignCs.number">
                  <el-option :key="item" v-for="item in wanumber" :value="item" :label="item"/>
                </el-select>
              </el-form-item>
              <el-form-item label="CS Group">
                <el-select placeholder="Select CS Group (Optional)" allow-create filterable v-model="formAssignCs.group">
                  <el-option
                    v-for="item in listGroupCS"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :value-key="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="assignCs" type="primary" :loading="loadingAssign">Confirm</el-button>
              <el-button @click="dialogAssignCS = false">Cancel</el-button>
            </span>
          </el-dialog>
        </div>
        <div v-if="!showAlertError && !showAlert">
          <el-dialog
            title="Unassign Customer Service"
            :visible.sync="dialogRemoveCS"
            width="30%"
            :before-close="(done) => { selectedEmail = ''; selectedRows = null; done() }"
          >
            <span>Unassign user (<b>{{ selectedRows ? selectedRows.email : "" }}</b>) from Customer Service?</span><br/><br/>
            <el-form label-width="150px" label-position="left">
              <el-form-item label="Channel Account" :required="true" v-if="selectedRows">
                <el-select placeholder="Select channel account" v-model="formRemoveCS.channels">
                  <el-option :key="item" v-for="item in selectedRows.oa.map(v => v.operator.channels)" :value="item" :label="upperFirst(item)"/>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="removeCs()" type="primary" :loading="loadingRemoveCs">Confirm</el-button>
              <el-button @click="dialogRemoveCS = false">Cancel</el-button>
            </span>
          </el-dialog>
        </div>
        <div v-if="!showAlertError && !showAlert">
          <el-dialog
            title="Confirm"
            :visible.sync="dialogAssignChecker"
            width="30%"
            :before-close="(done) => { selectedEmail = ''; selectedRows = null; done() }"
          >
            <span>Assign this user as Checker?</span>
            <br />
            <br />
            <span slot="footer" class="dialog-footer">
              <el-button
                @click="assignChecker()"
                type="primary"
                :loading="loadingAssignChecker"
              >Confirm</el-button>
              <el-button @click="dialogAssignChecker = false">Cancel</el-button>
            </span>
          </el-dialog>
        </div>
        <div v-if="!showAlertError && !showAlert">
          <el-dialog
            title="Confirm"
            :visible.sync="dialogRemoveChecker"
            width="30%"
            :before-close="(done) => { selectedEmail = ''; selectedRows = null; done() }"
          >
            <span>Remove this user from Checker?</span>
            <br />
            <br />
            <span slot="footer" class="dialog-footer">
              <el-button
                @click="removeChecker()"
                type="primary"
                :loading="loadingAssignChecker"
              >Confirm</el-button>
              <el-button @click="dialogRemoveChecker = false">Cancel</el-button>
            </span>
          </el-dialog>
        </div>
        <div v-if="!showAlertError && !showAlert">
          <el-dialog
            title="Info"
            :visible.sync="dialogDetail"
            width="40%"
            :before-close="(done) => { selectedEmail = ''; selectedRows = null; done() }"
          >
            <div v-if="selectedRows != null" v-loading="loadingDialogDetail">
              <el-row :gutter="10">
                <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  <h4>Date Register</h4>
                </el-col>
                <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-tag
                    type="primary"
                  >{{ formatDate(selectedRows.created_at, 'dddd, DD MMM YYYY HH:mm') }}</el-tag>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  <h4>Email</h4>
                </el-col>
                <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-input type="text" :value="selectedRows.email" readonly disabled />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  <h4>Name</h4>
                </el-col>
                <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-input type="text" :value="selectedRows.name" readonly disabled />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  <h4>Username</h4>
                </el-col>
                <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-input type="text" :value="selectedRows.username" readonly disabled />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  <h4>PIC</h4>
                </el-col>
                <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-switch
                    v-if="userEmail !== selectedRows.email"
                    v-model="selectedRows.is_pic"
                    :value="selectedRows.is_pic"
                    active-text="Yes"
                    :active-value="1"
                    inactive-text="No"
                    :inactive-value="0"
                  ></el-switch>
                  <el-tag
                    v-if="userEmail === selectedRows.email"
                    type="success"
                  >{{ selectedRows.is_pic == 1 ? "Yes" : "No" }}</el-tag>
                </el-col>
              </el-row>
              <el-row
                :gutter="10"
                v-if="allowMakerChecker.options_value == 'true' || allowMakerChecker.options_value == true"
              >
                <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  <h4>Checker</h4>
                </el-col>
                <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-switch
                    v-model="selectedRows.is_checker"
                    :value="selectedRows.is_checker"
                    active-text="Yes"
                    :active-value="1"
                    inactive-text="No"
                    :inactive-value="0"
                  ></el-switch>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  <h4>Max Blast</h4>
                </el-col>
                <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-input
                    @keypress.native="numberOnly"
                    @paste.native="paste"
                    type="text"
                    v-model="selectedRows.max_blast"
                    :value="selectedRows.max_blast"
                    placeholder="Max blast for this user. Leave empty for unlimited"
                  />
                </el-col>
              </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" :loading="loadingDialogDetail" @click="updateUser">
                <i class="mdi mdi-content-save" />
                {{ $t('generic.update') }}
              </el-button>
              <el-button @click="dialogDetail = false">Close</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Division" name="division">
        <el-row :gutter="10" class="mb-20">
          <el-card>
            <el-button
              type="primary"
              @click="doShowDialogNewDivision()"
              :loading="loadingAddTemplate"
            >Create New Division</el-button>
          </el-card>
        </el-row>
        <!-- <el-alert title="Info" type="info" :closable="false" description="No Data" show-icon v-if="division.data.length == 0"></el-alert> -->
        <div>
          <el-card>
            <div class="group-list scrollable only-y">
              <template>
                <el-table
                  :data="division.data"
                  v-loading="loadingTableDivision"
                  style="width: 100%"
                >
                  <el-table-column prop="createdAt" label="Created At" width="250">
                    <template slot-scope="props">
                      <p
                        style="font-weight:bold;"
                      >{{ formatDate(props.row.createdAt,'dddd, DD MMM YYYY HH:mm') }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column prop="divisionName" label="Division Name" width="250">
                    <template slot-scope="props">
                      <p style="font-weight:bold;">{{ props.row.divisionName }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column prop="picName" label="PIC Name" width="150">
                    <template slot-scope="props">
                      <p style="font-weight:bold;">{{ props.row.picName }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column prop="totalAssignedTemplate" label="Total Template" width="150">
                    <template slot-scope="props">
                      <p style="font-weight:bold;">{{ props.row.totalAssignedTemplate }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column label="Operations" width="450">
                    <template slot-scope="props">
                      <el-button
                        @click="handleClickViewDivision(props.row.divisionName)"
                        :loading="division.buttonLoadingViewDivision"
                        type="default"
                        size="small"
                      >
                        <i class="mdi mdi-plus" /> Assign Template
                      </el-button>
                      <el-button
                        @click="handleClickUpdateDivision(props.row.divisionName,props.row.picName)"
                        :loading="division.buttonLoadingUpdateDivision"
                        type="primary"
                        size="small"
                      >
                        <i class="mdi mdi-border-color" /> Edit Division
                      </el-button>
                      <el-button
                        @click="handleClickDeleteDivision(props.row.divisionName)"
                        :loading="division.buttonLoadingDeleteDivision"
                        type="danger"
                        size="small"
                      >
                        <i class="mdi mdi-delete" /> Delete Division
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
            <el-pagination
              background
              prev-text="Prev"
              next-text="Next"
              layout="prev, pager, next"
              :page-size="10"
              @current-change="paginateDivision"
              :current-page="divisionCurrentPage"
              :total="totalDivision"
            ></el-pagination>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Customer Service" name="customer_service">
        <el-card v-if="showAlertError || showAlert" style="margin-bottom: 1em">
          <error-gope v-if="showAlertError" />
          <el-alert
            v-if="showAlert"
            :title="$t('error')"
            description="You are not allowed to see this page."
            type="error"
            :closable="false"
            show-icon
          ></el-alert>
        </el-card>
        <el-card v-loading="customer_service.loadingTable" v-if="!showAlertError && !showAlert">
          <el-pagination
            background
            prev-text="Prev"
            next-text="Next"
            layout="prev, pager, next"
            @current-change="paginateCs"
            :current-page="customer_service.current_page"
            :page-size="customer_service.limit"
            :total="customer_service.total"
          />
          <el-table :data="customer_service.list" style="width: 100%">
            <el-table-column prop="name" label="Name" width="200"></el-table-column>
            <el-table-column label="Group" width="150">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.groupName"
                  type="primary"
                  size="mini"
                  class="mt-10"
                >{{scope.row.groupName}}</el-tag>
                <el-tag v-else size="mini">-</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="channels" label="Channels" width="150">
              <template slot-scope="scope">
                {{ upperFirst(scope.row.channels) }}
              </template>
            </el-table-column>
            <el-table-column label="Status" width="150">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.status == 'available'"
                  type="primary"
                  size="mini"
                  class="mt-10"
                >
                  <i class="mdi mdi-headset" /> Available
                </el-tag>
                <el-tag v-else type="danger" size="mini" class="mt-10">
                  <i class="mdi mdi-headset-off" /> Not Available
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="currentOpen" label="Open Ticket" min-width="150" />
            <el-table-column prop="waiting" label="Waiting Ticket" min-width="150" />
            <el-table-column prop="currentProcess" label="Processing Ticket" min-width="150" />
            <el-table-column label="Action" width="150">
              <template slot-scope="scope">
                <el-button
                  type="warning"
                  @click.native.prevent="customer_service.dialogEdit.visible = true; customer_service.selected = scope.row"
                  size="mini"
                  class="mt-10"
                >
                  <i class="mdi mdi-account-edit" /> Edit
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            prev-text="Prev"
            next-text="Next"
            layout="prev, pager, next"
            @current-change="paginateCs"
            :current-page="customer_service.current_page"
            :page-size="customer_service.limit"
            :total="customer_service.total"
          />

          <div v-if="!showAlertError && !showAlert">
            <el-dialog
              title="Edit Customer Service"
              :visible.sync="customer_service.dialogEdit.visible"
              width="40%"
              :before-close="(done) => { customer_service.selected = {}; done() }"
            >
              <div v-loading="customer_service.dialogEdit.loading">
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Name</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input v-model="customer_service.selected.name" />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Max Handle</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input-number
                      v-model="customer_service.selected.maxLoad"
                      :min="0"
                      :max="999999"
                    />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Status</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-switch
                      v-model="customer_service.selected.status"
                      :value="customer_service.selected.status"
                      active-text="Available"
                      :active-value="'available'"
                      inactive-text="Not Available"
                      :inactive-value="'not_available'"
                    ></el-switch>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Group</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-select clearable filterable v-model="customer_service.selected.group">
                      <el-option
                        v-for="(item, k) in listGroupCS"
                        :key="k"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button
                  type="primary"
                  :loading="customer_service.dialogEdit.loading"
                  @click="updateCs"
                >
                  <i class="mdi mdi-content-save" />
                  {{ $t('generic.update') }}
                </el-button>
                <el-button @click="customer_service.dialogEdit.visible = false">Close</el-button>
              </span>
            </el-dialog>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="CS Group" name="cs_group">
        <el-row :gutter="10" class="mb-20">
          <el-card>
            <el-button
              type="primary"
              @click="doShowDialogNewCsGroup()"
              :loading="loadingAddTemplate"
            >Create New CS Group</el-button>
          </el-card>
        </el-row>
        <!-- <el-alert title="Info" type="info" :closable="false" description="No Data" show-icon v-if="division.data.length == 0"></el-alert> -->
        <div>
          <el-card>
            <div class="group-list scrollable only-y">
              <template>
                <el-table :data="listGroupCS" v-loading="loadingTableCsGroup" style="width: 100%">
                  <el-table-column prop="dateCreate" label="Created At" width="250">
                    <template slot-scope="props">
                      <p
                        style="font-weight:bold;"
                      >{{ formatDate(props.row.dateCreate,'dddd, DD MMM YYYY HH:mm') }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column prop="name" label="Group Name" width="250">
                    <template slot-scope="props">
                      <p style="font-weight:bold;">{{ props.row.name }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column label="Operations" width="450">
                    <template slot-scope="props">
                      <el-button
                        type="default"
                        @click="handleClickDetailCsGroup(props.row.name)"
                        size="small"
                        class="mt-10"
                      >
                        <i class="mdi mdi-account-card-details" /> Detail
                      </el-button>
                      <el-button
                        @click="handleClickUpdateCsGroup(props.row.id, props.row.name)"
                        type="primary"
                        size="small"
                      >
                        <i class="mdi mdi-border-color" /> Edit
                      </el-button>
                      <el-button
                        v-if="props.row.isDisabled == false"
                        @click="deleteCsGroup(props.row.id, props.row.name)"
                        type="danger"
                        size="small"
                      >
                        <i class="mdi mdi-delete" /> Delete
                      </el-button>
                      <el-button v-else type="danger" size="small" :disabled="true">
                        <i class="mdi mdi-delete" /> Delete
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="Create New Division" :visible.sync="dialogNewDivision">
      <el-form>
        <el-form-item label="Division Name">
          <el-input type="text" placeholder="Division name" v-model="division.divisionName"></el-input>
        </el-form-item>
        <el-form-item label="PIC Name">
          <el-input type="text" placeholder="PIC of division" v-model="division.picName"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          @click="createDivision"
          :loading="division.buttonLoadingCreate"
        >Save</el-button>
        <el-button
          type="danger"
          @click="dialogNewDivision=false;division.divisionName = '';division.picName = ''"
        >Close</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :title="selectedDivision" :visible.sync="dialogViewDivision">
      <el-form>
        <el-form-item>
          <el-row :gutter="10" v-if="!showAlert" v-loading="loadingTableDivision">
            <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-card shadow="card-shadow--small">
                <div class="group-list scrollable only-y">
                  <template>
                    <el-table
                      :data="division.dataSelected"
                      style="color: #000 !important"
                      v-loading="loadingTableDetailDivision"
                      element-loading-text="Loading..."
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(246, 246, 245, 0.8)"
                    >
                      <el-table-column prop="templateName" label="Template Name" />
                      <el-table-column prop="templateId" label="#">
                        <template slot-scope="props">
                          <el-button
                            size="small"
                            type="danger"
                            @click="deleteAssignedTemplate(props.row.templateId)"
                            :loading="buttonloadingremove"
                          >
                            <i class="mdi mdi-delete" /> Remove template
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
                <br />
                <el-pagination
                  background
                  prev-text="Prev"
                  next-text="Next"
                  layout="prev, pager, next"
                  :page-size="10"
                  @current-change="paginateDivisionTemplate"
                  :current-page="divisionTemplateCurrentPage"
                  :total="division.dataSelectedLength"
                  style="margin-top: 10px"
                ></el-pagination>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClickAssignTemplate(selectedDivision)" type="primary">Add</el-button>
          <el-button class="mt-10" type="danger" @click="dialogViewDivision=false">Close</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="'Edit Division ' + selectedDivision" :visible.sync="dialogUpdateDivision">
      <el-form>
        <el-form-item label="Insert a new Division Name">
          <el-input type="text" v-model="selectedDivision"></el-input>
        </el-form-item>
        <el-form-item label="PIC Name">
          <el-input type="text" v-model="selectedDivisionPic"></el-input>
        </el-form-item>
        <el-button type="primary" @click="updateDivision" :loading="division.buttonLoadingEdit">Save</el-button>
        <el-button type="danger" @click="dialogUpdateDivision=false">Close</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="Assign Template" :visible.sync="dialogAssignTemplate">
      <el-form label-width="80px">
        <!-- <el-form-item label="Number" >
                    <el-select
                        filterable
                        v-model="selectedPhoneNumber" @change="filterNumberChange" placeholder="Select number" style="width: 100%">
                        <el-option
                            v-for="(data, key) in waUserDetail.sender" :key="key"
                            :label="data"
                            :value="data">
                        </el-option>
                    </el-select>
        </el-form-item>-->
        <el-form-item label="Template">
          <el-select
            filterable
            v-model="selectedHsm"
            @change="showSelectedHsm"
            placeholder="Select template to assigned"
            :loading="loadingListHsm"
            style="width: 100%"
          >
            <el-option
              v-for="item in hsmList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
              :disabled="hsmAssigned(item.id) ? true : false"
            ></el-option>
            <!-- <el-option
                            v-for="(template, key) in waUserDetail.hsm" :key="key"
                            :label="template.name"
                            :value="template.id">
            </el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="createAssignTemplate"
            :loading="assignTemplate.buttonLoading"
          >Save</el-button>
          <el-button type="danger" @click="closeAssignTemplate">Close</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="Create New CS Group" :visible.sync="dialogNewCsGroup">
      <el-form>
        <el-form-item label="Group Name">
          <el-input type="text" placeholder="Insert Group name" v-model="cs_group.name"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          @click="createCsGroup"
          :loading="cs_group.buttonLoadingCreate"
        >Save</el-button>
        <el-button type="danger" @click="dialogNewCsGroup=false;cs_group.name = '';">Close</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :title="'Edit CS Group '" :visible.sync="dialogUpdateCsGroup">
      <el-form>
        <el-form-item label="Insert a new CS Group name">
          <el-input type="text" v-model="selectedCsGroup[0].name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="updateCsGroup" :loading="cs_group.buttonLoadingEdit">Save</el-button>
        <el-button type="danger" @click="handleClickCloseCsGroup">Close</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="Member Group" :visible.sync="dialogTableDetailCsVisible">
      <el-table :data="checkTotalCsGroup" v-loading="removeMemberLoading">
        <el-table-column property="name" label="Name" width="250"></el-table-column>
        <el-table-column property="groupName" label="Group" width="250"></el-table-column>
        <el-table-column property="name" width="100">
          <template slot-scope="props">
            <el-button
              @click="removeMemberGroup(props.row.name)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableDetailCsVisible = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import _ from "lodash";
import api from "@/networkClient";
import config from "@/config";
import store from "@/store";
import { upperFirst } from 'lodash'
const moment = require("moment");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });
const pub = key.importKey(config.privateKey, "pkcs1-public-pem");

export default {
  data() {
    var validatorEmail = (rule, value, callback) => {
      value = this.form.email;
      if (!value) {
        return callback(new Error(this.$t("register.invalid_parameter")));
      } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value) == false) {
          return callback(new Error(this.$t("register.email_not_valid")));
        } else {
          callback();
        }
      }
    };
    var validatorNotEmpty = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("register.invalid_parameter")));
      } else {
        callback();
      }
    };
    return {
      availableChannel: [{ v: 'WhatsApp', k: 'whatsapp' }, { v: 'Telegram', k: 'telegram' }],
      currentPage: 1,
      currentPage: 1,
      totalDivision: 0,
      totalDivisionTemplate: 1,
      divisionCurrentPage: 1,
      divisionTemplateCurrentPage: 1,
      activeTab: "user",
      listUser: new Array(),
      wanumber: new Array(),
      dialogVisible: false,
      dialogDetail: false,
      sendInvite: false,
      loadingReg: false,
      loadingEmail: false,
      loadingDialogDetail: false,
      loadingTable: true,
      loadingAssign: false,
      loadingRemoveCs: false,
      loadingAssignChecker: false,
      loadingDivision: false,
      loadingDivisionTemplate: false,
      loadingListHsm: false,
      visibleRemove: false,
      loadingRemove: false,
      loadingAddTemplate: false,
      selectedEmail: "",
      selectedNumber: "",
      selectedRows: null,
      userEmail: store.getters.email,
      dialogAssignCS: false,
      dialogRemoveCS: false,
      dialogAssignChecker: false,
      dialogRemoveChecker: false,
      dialogNewDivision: false,
      dialogNewCsGroup: false,
      dialogViewDivision: false,
      dialogUpdateDivision: false,
      dialogUpdateCsGroup: false,
      dialogAssignTemplate: false,
      showAlertError: false,
      showAlert: false,
      alertErrorMessage: this.$t("error_text"),
      allowMakerChecker: false,
      totalDivision: 0,
      selectedGroupCS: "",
      listGroupCS: [],
      division: {
        dataSelected: [],
        dataSelectedLength: 0,
        data: [],
        divisionName: "",
        picName: "",
        loading: false,
        buttonLoadingCreate: false,
        buttonLoadingEdit: false,
        buttonLoadingDelete: false,
        buttonLoadingAssignTemplate: false,
        buttonLoadingViewDivision: false,
        buttonLoadingUpdateDivision: false,
        buttonLoadingDeleteDivision: false
      },
      customer_service: {
        list: [],
        loadingTable: false,
        total: 0,
        current_page: 1,
        limit: 10,
        selected: {},
        dialogEdit: {
          visible: false,
          loading: false
        }
      },
      cs_group: {
        id: "",
        name: "",
        buttonLoadingCreate: false,
        buttonLoadingEdit: false
      },
      checkTotalCsGroup: [],
      dialogTableDetailCsVisible: false,
      buttonloadingremove: false,
      removeMemberLoading: false,
      selectedCsGroup: [
        {
          name: ""
        }
      ],
      selectedDivision: "",
      selectedDivisionPic: "",
      selectedHsm: "",
      assignTemplate: {
        data: [],
        loading: false,
        buttonLoading: false
      },
      assignedHsmDivision: [],
      hsmList: [],
      loadingTableDivision: false,
      loadingTableDetailDivision: false,
      loadingTableCsGroup: false,
      form: {
        email: ""
      },
      formAssignCs: {
        channels: "",
        number: "",
        group: null,
      },
      formRemoveCS: {
        number: "",
        channels: ""
      },
      formRemove: {
        password: ""
      },
      rulesForm: {
        email: [{ validator: validatorEmail, trigger: "blur" }]
      },
      rulesFormRemove: {
        password: [{ validator: validatorNotEmpty, trigger: "blur" }]
      },
      errors: [],
      waUserDetail: {
        hsm: [],
        sender: {}
      },
      loadingForm: false,
      tokenLoader: false
    };
  },
  methods: {
    upperFirst(...any) {
      return upperFirst(...any)
    },
    paginateCs(page) {
      this.customer_service.current_page = page;
      this.getCsList(page);
    },
    async tabClicked(tab) {
      var name = tab.paneName;
      if (name == "division") {
        this.getDivision();
      } else if (name == "user") {
        this.getListUser();
      } else if (name == "customer_service") {
        this.getCsList();
      } else if (name == "cs_group") {
        await this.getCsList();
        this.getCsGroup();
      }
    },
    formatString(string) {
      return (string[0].toUpperCase() + string.slice(1)).replace(/_/g, " ");
    },
    hsmAssigned(id) {
      return _.find(this.assignedHsmDivision, v => {
        return v.templateId == id;
      });
    },
    paginateDivision(page) {
      this.divisionCurrentPage = page;
      this.getDivision(page);
    },
    paginateDivisionTemplate(page) {
      this.divisionTemplateCurrentPage = page;
      this.getDivisionDetail(page);
    },
    numberOnly(e) {
      var key = window.event ? e.keyCode : e.which;

      let isNumber = _.indexOf([8, 9, 27, 13, 190, 43], e.keyCode);
      if (
        isNumber !== -1 ||
        // Allow: Ctrl+C, Command+C
        (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl+R, Command+R
        (e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode > 42 &&
          e.keyCode <= 49 &&
          _.indexOf([44, 45, 46, 47], e.keyCode) == -1)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode > 96 || e.keyCode < 200)
      ) {
        e.preventDefault();
      }
    },
    paste(event) {
      event.preventDefault();
      var totalCharacterCount = window.event.clipboardData.getData("Text"); // || window.clipboardData.getData('Text');
      var strValidChars = "+0123456789";
      var strChar;
      var FilteredChars = "";
      for (var i = 0; i < totalCharacterCount.length; i++) {
        strChar = totalCharacterCount.charAt(i);
        if (strValidChars.indexOf(strChar) != -1) {
          FilteredChars = FilteredChars + strChar;
        }
      }
      this.contactDialog.data.phone_number = FilteredChars;
    },
    formatDate(time, format) {
      return moment(time).format(format);
    },
    showSelectedHsm() {
      // console.log(this.selectedHsm)
    },
    // hsmAssigned(id) {
    //   return this.waUserDetail.hsm
    //     .filter(v => {
    //       return this.division.data.find(d => {
    //         return d.template.find(l => {
    //           return l.templateId == v._id;
    //         });
    //       });
    //     })
    //     .find(v => v._id == id);
    // },
    doShowDialogNewDivision() {
      this.dialogNewDivision = true;
    },
    doShowDialogNewCsGroup() {
      this.dialogNewCsGroup = true;
    },
    handleClickAssignTemplate(division) {
      this.selectedDivision = division;
      this.dialogAssignTemplate = true;
    },
    closeAssignTemplate() {
      this.selectedPhoneNumber = "";
      this.selectedHsm = "";
      this.division.dataSelected = [];
      this.dialogAssignTemplate = false;
      this.getDivisionDetail();
    },
    handleClickViewDivision(division) {
      // console.log(this.assignedHsmDivision)
      this.division.buttonLoadingViewDivision = true;
      this.selectedDivision = division;
      this.getDivisionDetail();
      this.getAllHSM();
      this.division.buttonLoadingViewDivision = false;
      this.dialogViewDivision = true;
    },
    handleClickUpdateDivision(division, pic) {
      this.division.buttonLoadingUpdateDivision = true;
      this.selectedOldDivision = division;
      this.selectedDivision = division;
      this.selectedDivisionPic = pic;
      this.getDivisionDetail();
      this.division.buttonLoadingUpdateDivision = false;
      this.dialogUpdateDivision = true;
    },
    async handleClickDeleteDivision(division) {
      this.$confirm(
        `Are you sure want to delete division <b>${division}</b> ?`,
        "Confirm",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
          center: true,
          dangerouslyUseHTMLString: true
        }
      )
        .then(async () => {
          this.division.buttonLoadingDeleteDivision = true;
          this.selectedDivision = division;
          await api({
            url: config.baseApi + "/division/remove/",
            method: "POST",
            data: {
              divisionName: this.selectedDivision
            }
          })
            .then(response => {
              if (response.data.ec != 200) {
                this.$swal(this.$t("error"), this.$t("error_text"), "error");
              } else {
                // this.$swal(this.$t('success'), this.$t('success_text'), "success")
                this.$message({
                  showClose: true,
                  message: "Division successfully deleted",
                  type: "success"
                });
                this.getDivision();
              }
              this.division.buttonLoadingDeleteDivision = false;
            })
            .catch(error => {
              this.division.buttonLoadingDeleteDivision = false;
            });
        })
        .catch(cancel => {
          this.division.buttonLoadingDeleteDivision = false;
        });
    },
    async getDivision(page = 1) {
      this.loadingTableDivision = true;
      await api({
        methods: "get",
        url: config.baseApi + "division/list?page=" + page
      })
        .then(response => {
          this.division.data = response.data.data;
          let templateAssigned = [];
          _.forEach(response.data.data, tempPerDiv => {
            _.forEach(tempPerDiv.template, temp => {
              templateAssigned.push(temp);
            });
          });
          // console.log(templateAssigned)
          this.assignedHsmDivision = templateAssigned;
          this.totalDivision = parseInt(response.data.total);
          // console.log("==============>")
          // console.log(this.assignedHsmDivision)
          // console.log("==============>")
        })
        .catch(error => {
          console.log(error);
        });
      this.loadingTableDivision = false;
    },
    async getDivisionDetail(page = 1) {
      let divName = this.selectedDivision;
      await api({
        methods: "get",
        url: `${config.baseApi}division/list/${divName}?page=${page}`
      })
        .then(response => {
          this.division.dataSelected = response.data.data.template;
          this.division.dataSelectedLength = parseInt(response.data.total);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async createDivision() {
      if (this.division.divisionName == "" || this.division.picName == "") {
        this.$message.error({
          showClose: false,
          message: "All field is required"
        });
        return;
      } else {
        this.division.buttonLoadingCreate = true;
        await api({
          method: "post",
          url: config.baseApi + "division/create",
          data: {
            divisionName: this.division.divisionName,
            picName: this.division.picName,
            template: [
              {
                templateName: "",
                templateId: ""
              }
            ]
          }
        })
          .then(res => {
            if (res.data.ec != 200) {
              // this.$swal(this.$t('error'), "Create division failed.", "error").then(() => {})
              this.$message({
                showClose: true,
                message: "Create division failed",
                type: "error"
              });
            } else {
              // this.$swal(this.$t('success'), this.$t('success'), "success").then(() => {})
              this.$message({
                showClose: true,
                message: "Division was successfully created",
                type: "success"
              });
              this.dialogNewDivision = false;
              this.division.divisionName = "";
              this.division.picName = "";
              this.getDivision();
            }
            this.division.buttonLoadingCreate = false;
          })
          .catch(err => {
            console.log("error", err.message);
          });
      }
    },
    async updateDivision() {
      if (this.selectedDivision == "" || this.selectedDivisionPic == "") {
        this.$message.error({
          showClose: false,
          message: "All field is required"
        });
        return;
      } else {
        await api({
          method: "POST",
          url:
            config.baseApi +
            "division/update/" +
            this.selectedOldDivision +
            "/" +
            this.selectedDivisionPic,
          data: {
            divisionName: this.selectedDivision,
            picName: this.selectedDivisionPic
          }
        })
          .then(res => {
            if (res.data.ec != 200) {
              // this.$swal(this.$t('error'), "Update division failed.", "error").then(() => {})
              this.$message({
                showClose: true,
                message: "Update division failed",
                type: "error"
              });
            } else {
              // this.$swal(this.$t('success'), this.$t('success'), "success").then(() => {})
              this.$message({
                showClose: true,
                message: "Updated success",
                type: "success"
              });
              this.dialogUpdateDivision = false;
              this.selectedDivision = "";
              this.selectedDivisionPic = "";
              this.getDivision();
            }
          })
          .catch(err => {
            console.log("error", err.message);
          });
      }
    },

    async getCsGroup() {
      await api({
        methods: "get",
        url: config.chatApi + "csgroup"
      })
        .then(response => {
          this.listGroupCS = response.data.data.group;
          this.listGroupCS.forEach(el => {
            if (el.name == "" || el.name == null) {
              el.name = "-";
            }
          });
          this.listGroupCS.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });

          this.forEnableDisable();

          let groupname = this.customer_service.list;
          groupname.forEach((el, i) => {
            if (el.groupName == null || el.groupName == "") {
              groupname[i].groupName = "-";
            }
          });

          /*Configure button del disable */
          for (let i = 0; i < groupname.length; i++) {
            this.listGroupCS.forEach(el => {
              if (el.name == groupname[i].groupName) {
                el.isDisabled = true;
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    async createCsGroup() {
      if (
        this.cs_group.name == "" ||
        this.cs_group.name.trim() == "" ||
        this.cs_group.name.trim() == " " ||
        this.cs_group.name.trim() == "-"
      ) {
        this.$message.error({
          showClose: false,
          message: "Group Name field is required"
        });
        return;
      } else {
        this.cs_group.buttonLoadingCreate = true;
        this.loadingTableCsGroup = true;
        await api({
          method: "post",
          url: config.chatApi + "csgroup",
          data: {
            name: this.cs_group.name
          }
        })
          .then(async res => {
            if (res.data.ec != 200 && res.data.code != 400) {
              // this.$swal(this.$t('error'), "Create division failed.", "error").then(() => {})
              this.$message({
                showClose: true,
                message: "Create CS Group failed",
                type: "error"
              });
            } else if (res.data.code == 400) {
              this.$message.error({
                showClose: false,
                message: "Group name " + res.data.message
              });
            } else {
              // this.$swal(this.$t('success'), this.$t('success'), "success").then(() => {})
              this.$message({
                showClose: true,
                message: "CS Group was successfully created",
                type: "success"
              });
              this.dialogNewDivision = false;
              this.cs_group.name = "";
              this.dialogNewCsGroup = false;
              await this.getCsList();
              await this.getCsGroup();
            }
            this.cs_group.buttonLoadingCreate = false;
            this.loadingTableCsGroup = false;
          })
          .catch(err => {
            console.log("error", err.message);
            this.$swal(this.$t("error"), this.$t("error_text"), "error");
            this.loadingTableCsGroup = false;
          });
      }
    },

    async updateCsGroup() {
      let checkSpace = this.selectedCsGroup[0].name.trim();

      if (
        this.selectedCsGroup[0].name == "" ||
        checkSpace == "" ||
        checkSpace == " " ||
        checkSpace == "-"
      ) {
        this.$message.error({
          showClose: false,
          message: "All field is required"
        });
        return;
      } else {
        this.cs_group.buttonLoadingEdit = true;
        this.loadingTableCsGroup = true;
        await api({
          method: "PATCH",
          url: config.chatApi + "csgroup/" + this.cs_group.id,
          data: {
            name: this.selectedCsGroup[0].name
          }
        })
          .then(async res => {
            if (res.data.ec != 200 && res.data.code != 400) {
              // this.$swal(this.$t('error'), "Update division failed.", "error").then(() => {})
              this.$message({
                showClose: true,
                message: "Update CS Group failed",
                type: "error"
              });
              this.cs_group.buttonLoadingEdit = false;
            } else if (res.data.code == 400) {
              this.$message.error({
                showClose: false,
                message: "Group name " + res.data.message
              });
              this.cs_group.buttonLoadingEdit = false;
            } else {
              this.$message({
                showClose: true,
                message: "Updated success",
                type: "success"
              });
              this.cs_group.buttonLoadingEdit = false;
              this.dialogUpdateCsGroup = false;
              this.selectedCsGroup[0].name = "";
              this.cs_group.name = "";
              await this.getCsList();
              await this.getCsGroup();
            }
            this.loadingTableCsGroup = false;
          })
          .catch(err => {
            console.log("error", err.message);
            this.$swal(this.$t("error"), this.$t("error_text"), "error");
            this.loadingTableCsGroup = false;
          });
      }
    },

    handleClickDetailCsGroup(csname) {
      this.checkTotalCsGroup = this.customer_service.list.filter(el =>
        el.groupName == csname ? true : false
      );
      this.dialogTableDetailCsVisible = true;
    },

    removeMemberGroup(csname) {
      this.$confirm(
        `Are you sure want to delete <b>${csname}</b> from group ?`,
        "Confirm",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
          center: true,
          dangerouslyUseHTMLString: true
        }
      )
        .then(res => {
          this.removeMemberLoading = true;
          this.checkTotalCsGroup.forEach(async (el, i) => {
            if (el.name == csname) {
              await api({
                method: "patch",
                url: "company/customer-service",
                data: {
                  id: el.id,
                  name: el.name,
                  email: el.email,
                  group: null
                }
              })
                .then(response => {
                  if (response.data.ec == 200) {
                    this.checkTotalCsGroup.splice(i, 1);
                    this.getCsList();
                  } else {
                    this.$message({
                      showClose: true,
                      message: "Update CS failed",
                      type: "error"
                    });
                  }
                })
                .catch(err => {
                  this.$message({
                    showClose: true,
                    message: "Update CS failed",
                    type: "error"
                  });
                  console.log(err);
                });
            }
            this.removeMemberLoading = false;
          });
        })
        .catch(cancel => {});
    },

    deleteCsGroup(param, name) {
      this.$confirm(
        `Are you sure want to delete group <b>${name}</b> ?`,
        "Confirm",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
          center: true,
          dangerouslyUseHTMLString: true
        }
      )
        .then(async () => {
          await api({
            url: config.chatApi + "csgroup/" + param,
            method: "DELETE"
          })
            .then(async response => {
              if (response.data.ec != 200 && response.data.code !== 400) {
                this.$swal(this.$t("error"), this.$t("error_text"), "error");
              } else if (response.data.code == 400) {
                this.$swal({
                  title: "Warning",
                  text:
                    response.data.message == "Current Ticket is Still Open"
                      ? "Member Ticket is Open"
                      : this.$t("error_text"),
                  type: "warning"
                });
              } else {
                this.$swal({
                  title: this.$t("success"),
                  text: "",
                  type: "success"
                });
              }
              await this.getCsList();
              this.loadingTableCsGroup = true;
              await this.getCsGroup();
              this.loadingTableCsGroup = false;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(cancel => {});
    },

    handleClickUpdateCsGroup(csid, csname) {
      this.cs_group.id = csid;
      this.listGroupCS.forEach(el => {
        if (el.name == csname) {
          this.selectedCsGroup[0].name = el.name;
        }
      });
      this.dialogUpdateCsGroup = true;
    },

    handleClickCloseCsGroup() {
      this.cs_group.name = "";
      this.selectedCsGroup = [{ name: "" }];
      this.dialogUpdateCsGroup = false;
    },

    async getAllHSM(after = null) {
      this.loadingListHsm = true;
      await api({
        method: "get",
        url: 'bussiness/message-template',
        // header: {
        //   "api-key": store.getters.token
        // },
        params: {
          after: after != null ? after : undefined
        }
      })
        .then(response => {
          console.log("response",response)
          if (response.data.ec != 200) {
            this.$swal(this.$t("error"), this.$t("error_text"), "error");
          } else {
            this.hsmList = response.data.data.data;
          }
          this.loadingListHsm = false;
        })
        .catch(error => {
          this.loadingListHsm = false;
        });
    },
    async createAssignTemplate() {
      this.assignTemplate.buttonLoading = true;
      let templateName = _.find(this.hsmList, hsm => {
        return hsm.id == this.selectedHsm;
      }).name;
      await api({
        method: "post",
        url: config.baseApi + "division/assign_template",
        data: {
          divisionName: this.selectedDivision,
          template: [
            {
              templateName: templateName,
              templateId: this.selectedHsm
            }
          ]
        }
      })
        .then(res => {
          if (res.data.ec != 200) {
            // this.$swal(this.$t('error'), "Assign Template failed.", "error")
            this.$message({
              showClose: true,
              message: "This template is already assigned",
              type: "error"
            });
            // this.dialogAssignTemplate = false
          } else {
            // this.$swal(this.$t('success'), this.$t('success'), "success")
            this.$message({
              showClose: true,
              message: "The template was successfully assigned",
              type: "success"
            });
            this.dialogAssignTemplate = false;
            this.selectedHsm = "";
            this.getDivisionDetail();
            // this.$swal(this.$t('success'), this.$t('success'), "success")
            // this.dialogAssignTemplate = false
            // // this.selectedPhoneNumber = ''
            // this.selectedHsm = ''
            // this.getDivisionDetail()
            this.getDivision();
          }
        })
        .catch(err => {
          console.log("error", err.message);
        });
      this.assignTemplate.buttonLoading = false;
    },
    async deleteAssignedTemplate(templateId) {
      let templateName = _.find(this.hsmList, hsm => {
        return hsm.id == templateId;
      }).name;
      this.$confirm(
        `Are you sure want to unassigned <b>${templateName}</b> from this division?`,
        "Confirm",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
          center: true,
          dangerouslyUseHTMLString: true
        }
      )
        .then(async () => {
          this.buttonloadingremove = true;
          await api({
            url: config.baseApi + "division/unassign_template",
            method: "POST",
            data: {
              divisionName: this.selectedDivision,
              template: [
                {
                  templateName: templateName,
                  templateId: templateId
                }
              ]
            }
          })
            .then(response => {
              if (response.data.ec != 200) {
                // this.$swal(this.$t('error'), this.$t('error_text'), "error")
                this.$message({
                  showClose: true,
                  message: "The template was not deleted",
                  type: "success"
                });
                // this.dialogViewDivision = false
              } else {
                // this.$swal(this.$t('success'), this.$t('success_text'), "success")
                this.$message({
                  showClose: true,
                  message: "Template successfully deleted",
                  type: "success"
                });
                // this.dialogViewDivision = false
                this.selectedHsm = "";
                this.getDivisionDetail();
                this.getDivision();
              }
            })
            .catch(error => {});
          this.buttonloadingremove = false;
        })
        .catch(cancel => {});
    },
    async updateUser() {
      this.loadingDialogDetail = true;
      await api({
        method: "post",
        url: "company/update-user/" + this.selectedRows.user,
        data: {
          is_checker: this.selectedRows.is_checker,
          max_blast:
            this.selectedRows.max_blast == null
              ? null
              : this.selectedRows.max_blast,
          is_pic: this.selectedRows.is_pic,
          email: this.selectedRows.email
        }
      })
        .then(response => {
          if (response.data.ec == 200) {
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            });
            this.dialogDetail = false;
            this.selectedRows = null;
            this.getListUser();
          } else {
            this.dialogDetail = false;
            this.$swal({
              title: "Warning",
              text:
                response.data.message == "not_allowed"
                  ? this.$t(`usermanagement.not_allowed`)
                  : this.$t(`error_text`),
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.dialogDetail = false;
          this.$swal({
            title: "Error",
            text:
              this.$t(`error_text`) +
              ". Kindly plese check your internet connection.",
            type: "warning"
          });
        });
      this.loadingDialogDetail = false;
    },
    remove(email) {
      this.selectedEmail = email;
      this.visibleRemove = true;
    },
    async detailWa() {
      this.tokenLoader = true
      await api({
        method: "post",
        url: "user/detail/number",
        data: {
          channels: this.formAssignCs.channels
        }
      })
      .then(result => {
        this.wanumber = []
        if (result.data.ec == 200) {
          this.wanumber = []
          _.forEach(result.data.data, value => {
            this.wanumber.push(value);
          });
          this.showFormMessage = true;
        } else if (
          result.data.ec == 400 &&
          result.data.message == "not_subscribe"
        ) {
          this.showAlertMessage = true;
        }
        this.tokenLoader = false;
      })
      .catch(error => {
        this.tokenLoader = false;
      });
    },
    async getCsList(page = 1) {
      this.customer_service.loadingTable = true;
      this.showAlertError = false;
      await api({
        method: "get",
        url: "company/customer-service",
        params: {
          page: page
        }
      })
        .then(response => {
          if (response.data.ec == 200) {
            this.customer_service.list = response.data.data.list;
            this.customer_service.total = response.data.data.total;
          } else {
            this.showAlertMessage = true;
          }
        })
        .catch(err => {
          this.showAlertError = true;
        });
      this.customer_service.loadingTable = false;
    },
    async updateCs() {
      this.customer_service.dialogEdit.loading = true;
      let selected = this.customer_service.selected;
      await api({
        method: "patch",
        url: "company/customer-service",
        data: {
          id: selected.id,
          name: selected.name,
          status: selected.status,
          email: selected.email,
          maxLoad: selected.maxLoad,
          group: selected.group
        }
      })
        .then(response => {
          if (response.data.ec == 200) {
            this.customer_service.dialogEdit.visible = false;
            this.$swal(this.$t("success"), "", "success");
            this.getCsList();
            this.customer_service.dialogEdit.loading = false;
          } else {
            this.$swal({
              title: this.$t("error"),
              text: "Failed update data",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$swal({
            title: this.$t("error"),
            text: this.$t("error_text"),
            type: "error"
          });
        });
      this.customer_service.dialogEdit.loading = false;
    },
    async assignCs() {
      this.loadingAssign = true;
      await api({
        method: "post",
        url: config.chatApi + "auth/",
        data: {
          email: this.selectedRows.email,
          name: this.selectedRows.name,
          origin: "dashboard",
          companyNumber: this.formAssignCs.number,
          channels: this.formAssignCs.channels,
          group: this.formAssignCs.group ? this.formAssignCs.group : undefined,
          isNewGroup: this.listGroupCS.find(v => v.id == this.formAssignCs.group)
            ? false
            : true
        }
      })
        .then(res => {
          if (res.data.ec == 200) {
            this.dialogAssignCS = false;
            this.selectedGroupCS = "";
            this.selectedNumber = "";
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            }).then(ok => this.getListUser());
          } else {
            this.dialogAssignCS = false;
            this.$swal({
              title: this.$t("error"),
              text: this.$t(`assigncs.${res.data.message}`),
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$swal({
            title: this.$t("error"),
            text: this.$t("error_text"),
            type: "warning"
          });
        });
      this.loadingAssign = false;
    },
    async removeCs(operator = "", number = "") {
      this.$confirm(`This user will be unassign from ${this.upperFirst(this.formRemoveCS.channels)}?`, 'Confirmation', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        let oprData = this.selectedRows.oa.find(v => v.operator.channels == this.formRemoveCS.channels)
        // console.log('oprData', oprData);
        this.loadingRemoveCs = true;
        await api({
          method: "delete",
          url: config.chatApi + "auth/",
          data: { operatorId: oprData.operator.id, number: oprData.operator.number, email:oprData.email}
        }).then(res => {
          this.dialogRemoveCS = false;
          if (res.data.ec == 200) {
            this.formRemoveCS = {
              number: "",
              channels: ""
            }
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            }).then(ok => this.getListUser());
          } else {
            this.$swal({
              title: this.$t("error"),
              text:
                res.data.message == "fatal_error"
                  ? this.$t("error_text")
                  : this.$t(`assigncs.${res.data.message}`),
              type: "warning"
            });
          }
        }).catch(err => {
          this.dialogRemoveCS = false;
          this.$swal({
            title: this.$t("error"),
            text: this.$t("error_text"),
            type: "warning"
          });
        });
        this.loadingRemoveCs = false;
      }).catch(() => {
        this.loadingRemoveCs = false;
      });
    },
    async removeAccount() {
      this.$refs["formRemove"].validate(async valid => {
        if (valid) {
          this.loadingRemove = true;
          let csdata = {
            operatorId: this.selectedRows.operatorId,
            number: this.selectedRows.operatorNumber
          };
          // console.log("remove acc: ", this.selectedEmail)
          await api({
            method: "delete",
            url: config.baseApi + "company/user-company",
            data: {
              email: this.selectedEmail,
              password: pub.encrypt(this.formRemove.password, "base64")
            }
          })
            .then(res => {
              if (res.data.ec == 200) {
                // console.log(csdata)
                if (
                  typeof csdata.operatorId != "undefined" &&
                  csdata.operatorId != "" &&
                  typeof csdata.number != "undefined" &&
                  csdata.number != "" &&
                  csdata.number != null &&
                  csdata.operatorId != null
                ) {
                  this.removeCs(csdata.operatorId, csdata.number);
                }
                this.visibleRemove = false;
                this.$swal({
                  title: this.$t("success"),
                  text: "",
                  type: "success"
                }).then(ok => {
                  this.getListUser();
                });
              } else {
                this.$message.error({
                  showClose: false,
                  message: this.$t(`usermanagement.${res.data.message}`),
                  type: "error",
                  timeout: 5000
                });
              }
            })
            .catch(err => {
              this.$message.error({
                showClose: false,
                message: this.$t(`error_text`),
                type: "error"
              });
            });
          this.loadingRemove = false;
        } else {
          return false;
        }
      });
    },
    async getListUser(view) {
      this.loadingTable = true;
      await api({
        method: "get",
        url: config.baseApi + "company/user-company",
        timeout: 60 * 1000,
        params: {
					view: view == true ? true : null
				},
        data: null
      })
        .then(res => {
          this.showAlertError = false;
          if (res.data.ec == 200) {
            // console.log(res.data.data.company.user);
            this.listUser = res.data.data.company.user;
            this.getCsGroup();
          } else if (res.data.ec == 400) {
            if (res.data.message == "not_allowed") {
              this.showAlertError = true;
              this.alertErrorMessage = "You are not allowed to see this page.";
            }
          }
        })
        .catch(err => {
          // console.log(err.message)
          this.showAlertError = true;
          this.$message.error({
            showClose: false,
            message: this.$t(`error_text`),
            type: "error"
          });
        });
      this.loadingTable = false;
    },
    async invite() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          this.loadingReg = true;
          await api({
            method: "post",
            url: config.baseApi + "company/invite",
            data: {
              pic_email: store.getters.email,
              invited_email: this.form.email,
              company: store.getters.customerID
            }
          })
            .then(response => {
              if (response.data.ec == 200) {
                this.dialogVisible = false;
                this.$swal({
                  title: this.$t("success"),
                  text: this.$t(`usermanagement.invite_success`),
                  type: "success"
                });
                this.form.email = "";
                this.getListUser();
              } else if (
                response.data.ec == 400 &&
                response.data.message == "user_not_register"
              ) {
                this.sendInvite = true;
                this.dialogVisible = false;
              } else if (response.data.ec == 500) {
                this.$swal({
                  title: this.$t("error"),
                  text: this.$t(`error_text`),
                  type: "warning"
                });
              } else {
                this.dialogVisible = false;
                this.$swal({
                  title: this.$t("error"),
                  text: this.$t(`usermanagement.${response.data.message}`),
                  type: "warning"
                });
              }
            })
            .catch(error => {
              this.$swal({
                title: this.$t("error"),
                text: this.$t(`error_text`),
                type: "error"
              }).then(confirm => {
                // this.$router.push('login')
              });
            });
          this.loadingReg = false;
        } else {
          return false;
        }
      });
    },
    async sendEmail() {
      this.loadingEmail = true;
      await api({
        method: "post",
        url: config.baseApi + "company/send-invite-email",
        data: {
          pic_email: store.getters.email,
          invited_email: this.form.email,
          company: store.getters.customerID
        }
      })
        .then(response => {
          if (response.data.ec == 200) {
            this.dialogVisible = false;
            this.sendInvite = false;
            this.$swal({
              title: this.$t("success"),
              text: this.$t(`register.invite_success`),
              type: "success"
            });
            this.form.email = "";
          } else {
            this.sendInvite = false;
            this.$swal({
              title: this.$t("error"),
              text: this.$t(`error_text`),
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.$swal({
            title: this.$t("error"),
            text: this.$t(`error_text`),
            type: "error"
          }).then(confirm => {
            // this.$router.push('login')
          });
        });
      this.loadingEmail = false;
    },
    async loadPreferences() {
      await api({
        method: "get",
        url: config.baseApi + "auth/settings/"
      })
        .then(result => {
          if (result.data.ec == 200) {
            this.allowMakerChecker = _.find(result.data.data, option => {
              return option.options_key == "makerChecker";
            });
            // this.isSubscribe = true
          } else {
          }
        })
        .catch(error => {
          // this.showAlertError = true
        });
    },
    async assignChecker() {
      this.loadingAssignChecker = true;
      await api({
        method: "post",
        url: config.baseApi + "auth/management/assign-checker",
        data: {
          email: this.selectedRows.email,
          username: this.selectedRows.username
        }
      })
        .then(result => {
          this.dialogAssignChecker = false;
          if (result.data.ec == 200) {
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            });
            this.getListUser();
          } else {
            this.$swal({
              title: "Warning",
              text:
                result.data.message == "not_allowed"
                  ? this.$t(`usermanagement.not_allowed`)
                  : this.$t(`error_text`),
              type: "warning"
            });
          }
        })
        .catch(error => {
          // this.showAlertError = true
          this.dialogAssignChecker = false;
          this.$swal({
            title: this.$t("error"),
            text: this.$t(`error_text`),
            type: "error"
          });
        });
      this.loadingAssignChecker = false;
    },
    async removeChecker() {
      this.loadingAssignChecker = true;
      await api({
        method: "post",
        url: config.baseApi + "auth/management/unassign-checker",
        data: {
          email: this.selectedRows.email,
          username: this.selectedRows.username
        }
      })
        .then(result => {
          this.dialogRemoveChecker = false;
          if (result.data.ec == 200) {
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            });
            this.getListUser();
          } else {
            this.$swal({
              title: "Warning",
              text:
                result.data.message == "not_allowed"
                  ? this.$t(`usermanagement.not_allowed`)
                  : this.$t(`error_text`),
              type: "warning"
            });
          }
        })
        .catch(error => {
          // this.showAlertError = true
          this.dialogAssignChecker = false;
          this.$swal({
            title: this.$t("error"),
            text: this.$t(`error_text`),
            type: "error"
          });
        });
      this.loadingAssignChecker = false;
    },
    async loadWA() {
      await api({
        method: "post",
        url: "user/detail",
        // number temporary hardcode
        // data:{
        //   number : '0215155295'
        // }
      })
        .then(result => {
          this.loadingForm = false;
          if (result.data.ec == 200) {
            this.showFormMessage = true;
            let tempHsm = [];
            let tempSender = [];
            _.forEach(result.data.data, res => {
              _.forEach(res.hsm, hsm => {
                if (!_.isEmpty(hsm)) {
                  tempHsm.push(hsm);
                }
              });
              tempSender.push(res.phoneNumber);
            });
            this.waUserDetail.hsm = _.uniqBy(tempHsm, "name");
            // this.waUserDetail.hsm = tempHsm
            // console.log('temp',tempHsm)
            this.waUserDetail.sender = _.uniq(tempSender);
          } else if (
            result.data.ec == 400 &&
            result.data.message == "not_subscribe"
          ) {
            this.showAlertMessage = true;
          } else {
            this.showAlertError = true;
          }
        })
        .catch(error => {
          this.loadingForm = false;
          this.showAlertError = true;
        });
    },

    forEnableDisable() {
      this.listGroupCS.forEach(el => {
        el.isDisabled = false;
      });
    }
  },
  watch: {
    dialogTableDetailCsVisible: async function() {
      if (this.dialogTableDetailCsVisible == false) {
        await this.getCsList();
        this.getCsGroup();
        this.checkTotalCsGroup = [];
      }
    }
  },
  async mounted() {
    if (this.$store.getters.isPic) {
      // await this.detailWa();
      await this.getCsList();
      await this.getListUser(true);
      this.loadPreferences();
    } else {
      this.showAlert = true;
    }
    this.loadingTableDivision = true;
    this.getDivision();
    this.loadWA();
  },
  components: {}
};
</script>

<style>
.swal2-container {
  z-index: 10000 !important;
}
</style>

<style lang="scss" scoped>
@import "../assets/scss/_variables";
.el-form-item.tooltip {
  line-height: 10px;

  .el-form-item__content {
    line-height: 10px !important;
  }
}

.full-button,
.el-dropdown {
  width: 100%;
}

.el-tag {
  margin-right: 10px;
}

.page-header {
  margin-bottom: 30px;
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

.el-select {
  width: 100%;
}
</style>