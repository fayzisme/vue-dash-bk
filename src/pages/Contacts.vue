<template>
  <div class="page-contacts scrollable only-y" id="page-contacts">
    <div class="page-header">
      <h1>{{ $t("contact.contact") }}</h1>
    </div>

    <el-row :gutter="10">
      <el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="8" :xl="6">
        <el-card>
          <h2 class="mt-0">{{ $t("group.group") }}</h2>
          <el-button class="add-group ml-10" @click="openGroupDialog({}, 'add')">
            <span class="mdi mdi-plus"></span>
            {{ $t("group.add") }}
          </el-button>
          <el-input
            class="search-group"
            prefix-icon="el-icon-search"
            :placeholder="$t('group.search')"
            clearable
            v-model="searchGroup"
          ></el-input>

          <div class="group-list scrollable only-y" v-loading="groupLoader">
            <div
              v-for="c in groupFiltered"
              :key="c.group_id"
              class="group-item flex contact"
              :class="{'active' : c.group_id == groupId}"
            >
              <div class="info box grow flex">
                <div class="name box grow flex column p-10" @click="openGroup(c)">
                  <div class="fullname fs-18">
                    <span class="mdi mdi-folder-outline"></span>
                    {{c.group_name }}
                    <template
                      v-if="c.group_id != 0"
                    >({{ c.member }})</template>
                  </div>
                </div>

                <div class="menu align-vertical p-10" v-if="c.group_id != 0">
                  <!-- <el-tooltip class="item" effect="dark" :content="$t('group.detail')" placement="top">
                    <a href="" @click.prevent="openGroupDialog(c, 'detail')"><span class="mdi mdi-eye align-vertical-middle"></span></a>
                  </el-tooltip>&nbsp;-->
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('group.edit')"
                    placement="top"
                  >
                    <a href @click.prevent="openGroupDialog(c, 'edit')">
                      <span class="mdi mdi-pencil align-vertical-middle"></span>
                    </a>
                  </el-tooltip>&nbsp;
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('group.delete')"
                    placement="top"
                  >
                    <a href @click.prevent="openGroupDialog(c, 'remove')">
                      <span class="mdi mdi-delete align-vertical-middle"></span>
                    </a>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col class="mt-10 pl-0" :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
        <el-card>
          <div slot="header" class="clearfix">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <h2 class="mt-0">{{ groupName }}</h2>
              </el-col>
              <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                <el-input
                  class="search-contact"
                  prefix-icon="el-icon-search"
                  :placeholder="$t('contact.search')"
                  clearable
                  @keypress.native="doSearchContact"
                  @clear="loadContact"
                  @keyup.native.delete="doSearchContact"
                  v-model="searchContact"
                ></el-input>
              </el-col>
            </el-row>
          </div>
          <el-row style="float: right">
            <el-col
              :xs="24"
              :sm="24"
              :md="checkedContact.length > 0 ? 8 : 24"
              :lg="checkedContact.length > 0 ? 8 : 24"
              :xl="checkedContact.length > 0 ? 8 : 24"
            >
              <el-button class="add-contact mr-10 mb-10" @click="openDialog({}, 'add')">
                <span class="mdi mdi-plus"></span>
                {{ $t("contact.add") }}
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-button
                class="add-contact mb-10"
                @click="removeContactBulk()"
                v-if="checkedContact.length > 0"
              >
                <span class="mdi mdi-delete"></span>
                {{ $t("contact.delete") }}
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-button
                class="add-contact mb-10"
                @click="openAddToGroup()"
                v-if="checkedContact.length > 0"
              >
                <span class="mdi mdi-folder-outline"></span>
                {{ $t("contact.add_to_group") }}
              </el-button>
            </el-col>
          </el-row>
          <div class="contact-list scrollable only-y" v-loading="contactLoader">
            <div class="clearfix">
              <el-pagination
                @current-change="nextContact"
                :page-size="10"
                :current-page="currentPage"
                background
                layout="prev, pager, next"
                :total="contactsTotal"
              ></el-pagination>
            </div>
            <br />
            <div v-for="c in list" :key="c.phonebook_id" class="contact-item flex contact">
              <el-checkbox :key="true" class="mt-23 ml-10" v-model="checked[c.phonebook_id]"></el-checkbox>
              <div class="avatar align-vertical ml-20">
                <span
                  class="align-vertical-middle card-shadow--small"
                  :style="'background-color:hsl(' + (360 * Math.random()) + ',' + (25 + 70 * Math.random()) + '%,' +  (85 + 10 * Math.random()) + '%)'"
                >{{(c.name || '').split(" ").map((n)=>n[0]).join("").slice(0,2)}}</span>
              </div>
              <div class="info box grow flex">
                <div class="name box grow flex column p-10">
                  <div class="fullname fs-18">{{c.title}} {{c.name}}</div>
                  <div class="address fs-14 secondary-text">{{c.phone_number}}</div>
                </div>
                <div class="menu align-vertical p-10 flex">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('contact.remove_from_group')"
                    placement="top"
                    v-if="groupId != 0"
                  >
                    <a href @click.prevent="openDialog(c, 'removeFromGroup')">
                      <span class="mdi mdi-logout align-vertical-middle"></span>
                    </a>
                  </el-tooltip>&nbsp;
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('contact.detail')"
                    placement="top"
                  >
                    <a href @click.prevent="openDialog(c, 'detail')">
                      <span class="mdi mdi-eye align-vertical-middle"></span>
                    </a>
                  </el-tooltip>&nbsp;
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('contact.edit')"
                    placement="top"
                  >
                    <a href @click.prevent="openDialog(c, 'edit')">
                      <span class="mdi mdi-pencil align-vertical-middle"></span>
                    </a>
                  </el-tooltip>&nbsp;
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('contact.delete')"
                    placement="top"
                  >
                    <a href @click.prevent="openDialog(c, 'remove')">
                      <span class="mdi mdi-delete align-vertical-middle"></span>
                    </a>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <template :style="{ height: '200px' }" v-if="list.length == 0">
              <p align="center" style="color: #909399" v-if="!contactLoader">
                <img src="@/assets/images/no_contact@3x.png" width="100" />
                <br />Contact not found
              </p>
            </template>
            <br />
            <div class="clearfix">
              <el-pagination
                @current-change="nextContact"
                :page-size="10"
                :current-page="currentPage"
                background
                layout="prev, pager, next"
                :total="contactsTotal"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <contact-dialog :dialogvisible.sync="contactDialog.visible" :userdata="contactDialog.data" :type="contactDialog.type" :color="contactDialog.color"></contact-dialog> -->

    <el-form
      :model="contactDialog.data"
      status-icon
      :rules="rulesForm"
      ref="contactDialog"
      @submit.native.prevent="doSubmitContact(contactDialog.type)"
    >
      <el-dialog :title="contactDialogTitle" :visible.sync="contactDialog.visible">
        <template v-if="contactDialog.type != 'add'">
          <el-form-item :label="$t('contact.field.title')" :label-width="formLabelWidth">
            <el-input
              :placeholder="$t('contact.field.title')"
              v-model="contactDialog.data.title"
              :readonly="contactDialogReadonly"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('contact.field.fullname')" :label-width="formLabelWidth">
            <el-input
              :placeholder="$t('contact.field.fullname')"
              v-model="contactDialog.data.name"
              :readonly="contactDialogReadonly"
              required
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('contact.field.phone')" :label-width="formLabelWidth">
            <el-input
              @keypress.native="numberOnly"
              @paste.native="paste"
              :placeholder="$t('contact.field.phone')"
              v-model="contactDialog.data.phone_number"
              :readonly="contactDialogReadonly"
              required
            ></el-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('contact.field.param_1')" :label-width="formLabelWidth">
            <el-input :placeholder="$t('contact.field.param_1')" v-model="contactDialog.data.param_1" :readonly="contactDialogReadonly"></el-input>
          </el-form-item>
          <el-form-item :label="$t('contact.field.param_2')" :label-width="formLabelWidth">
            <el-input :placeholder="$t('contact.field.param_2')" v-model="contactDialog.data.param_2" :readonly="contactDialogReadonly"></el-input>
          </el-form-item>-->
        </template>
        <el-tabs value="single" @tab-click="handleTab" v-if="contactDialog.type == 'add'">
          <el-tab-pane :label="$t('contact.single')" name="single">
            <el-form-item :label="$t('contact.field.title')" :label-width="formLabelWidth">
              <el-input
                :placeholder="$t('contact.field.title')"
                v-model="contactDialog.data.title"
                :readonly="contactDialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('contact.field.fullname')"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input
                :placeholder="$t('contact.field.fullname')"
                v-model="contactDialog.data.name"
                :readonly="contactDialogReadonly"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('contact.field.phone')"
              :label-width="formLabelWidth"
              prop="phone_number"
            >
              <el-input
                @keypress.native="numberOnly"
                @paste.native="paste"
                :placeholder="$t('contact.field.phone')"
                v-model="contactDialog.data.phone_number"
                :readonly="contactDialogReadonly"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('contact.field.param_1')" :label-width="formLabelWidth">
              <el-input :placeholder="$t('contact.field.param_1')" v-model="contactDialog.data.param_1" :readonly="contactDialogReadonly"></el-input>
            </el-form-item>-->
            <!-- <el-form-item :label="$t('contact.field.param_2')" :label-width="formLabelWidth">
              <el-input :placeholder="$t('contact.field.param_2')" v-model="contactDialog.data.param_2" :readonly="contactDialogReadonly"></el-input>
            </el-form-item>-->
          </el-tab-pane>
          <el-tab-pane :label="$t('contact.from_csv')" name="csv">
            <p>{{ $t('contact.csv_template_description') }}:</p>
            <ol>
              <li>{{ $t('contact.field.title') }}</li>
              <li>{{ $t('contact.field.fullname') }}</li>
              <li>{{ $t('contact.field.phone') }}</li>
              <!-- <li>{{ $t('contact.field.param_1') }}</li> -->
              <!-- <li>{{ $t('contact.field.param_2') }}</li> -->
            </ol>
            <p>{{ $t('contact.csv_has_header') }}</p>
            <el-form-item :label="$t('contact.file')" class="mb-0">
              <div class="el-input">
                <input
                  type="file"
                  class="uploader el-input__inner"
                  @change="onUploadCsv"
                  accept=".csv"
                  id="inputCsvFile"
                />
              </div>
            </el-form-item>
            <p v-if="csvData.length">{{ $t('contact.sample_data') }}:</p>
            <el-table :data="csvData.slice(0, 5)" style="width: 100%" v-if="csvData.length">
              <el-table-column prop="title" :label="$t('contact.field.title')" width="180"></el-table-column>
              <el-table-column prop="name" :label="$t('contact.field.fullname')" width="180"></el-table-column>
              <el-table-column prop="phoneNumber" :label="$t('contact.field.phone')"></el-table-column>
              <!-- <el-table-column prop="param_1" :label="$t('contact.field.param_1')"></el-table-column> -->
              <!-- <el-table-column prop="param_2" :label="$t('contact.field.param_2')"></el-table-column> -->
            </el-table>
          </el-tab-pane>
        </el-tabs>

        <span slot="footer" class="dialog-footer" v-if="!contactDialogReadonly">
          <el-button @click="cancelAddContact">{{ $t("cancel") }}</el-button>
          <el-button
            type="primary"
            native-type="submit"
            :loading="buttonContactDialogLoader"
            :disabled="buttonContactDialogLoader || !formRequiredIsFilled && contactDialog.type == 'add'"
          >{{ $t("submit") }}</el-button>
        </span>
      </el-dialog>
    </el-form>

    <el-form :model="groupDialog.data" @submit.native.prevent="doSubmitGroup(groupDialog.type)">
      <el-dialog :title="groupDialogTitle" :visible.sync="groupDialog.visible">
        <el-form-item :label="$t('group.field.name')" :label-width="formLabelWidth">
          <el-input
            :placeholder="$t('group.field.name')"
            v-model="groupDialog.data.group_name"
            :readonly="groupDialogReadonly"
            required
          ></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer" v-if="!groupDialogReadonly">
          <el-button @click="groupDialog.visible = false">{{ $t("cancel") }}</el-button>
          <el-button
            type="primary"
            native-type="submit"
            :loading="buttonGroupDialogLoader"
            :disabled="buttonGroupDialogLoader"
          >{{ $t("submit") }}</el-button>
        </span>
      </el-dialog>
    </el-form>

    <el-form :model="addToGroupDialog.data" @submit.native.prevent="doAddContactToGroup()">
      <el-dialog :title="$t('contact.add_to_group')" :visible.sync="addToGroupDialog.visible">
        <el-form-item :label="$t('group.field.name')" :label-width="formLabelWidth">
          <el-select
            v-model="selectedGroupId"
            multiple
            default-first-option
            :placeholder="$t('group.choose')"
            style="width:100%; cursor: pointer;"
            ref="selectGroup"
            @change="$refs.selectGroup.blur()"
          >
            <el-option
              v-for="item in groups"
              :key="item.group_id"
              :label="item.group_name"
              :value="item.group_id"
              v-if="item.group_id != 0"
            ></el-option>
          </el-select>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addToGroupDialog.visible = false">{{ $t("cancel") }}</el-button>
          <el-button
            type="primary"
            native-type="submit"
            :loading="buttonAddToGroupDialogLoader"
            :disabled="buttonAddToGroupDialogLoader"
          >{{ $t("submit") }}</el-button>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>


<script>
import ContactDialog from "@/components/ContactDialog";
import api from "@/networkClient";
import config from "@/config";
import store from "@/store";
import _ from "lodash";
export default {
  data() {
    var checkHasValue = (rule, value, callback) => {
      if (this.addType == "single") {
        if (!value) {
          return callback(new Error(this.$t("contact.warning." + rule.field)));
        } else {
          callback();
        }
      }
    };
    return {
      selectedGroupId: [],
      checked: {},
      groupName: this.$t("contact.all"),
      groupId: 0,
      list: [],
      groups: [{ group_id: 0, group_name: this.$t("contact.all") }],
      menu: [],
      contactLoader: true,
      currentPage: 1,
      currentPageContact: 1,
      currentPageGroupContact: 1,
      contactsTotal: 0,
      searchContact: "",
      buttonContactDialogLoader: false,
      contactDialog: {
        visible: false,
        data: {
          title: '',
          name: '',
          phone_number: ""
        },
        type: "detail"
      },
      rulesForm: {
        name: [{ validator: checkHasValue, trigger: "blur" }],
        phone_number: [{ validator: checkHasValue, trigger: "blur" }]
      },
      groupLoader: true,
      searchGroup: "",
      buttonGroupDialogLoader: false,
      groupDialog: {
        visible: false,
        // data: {},
        data: {group_name: ''},
        type: "detail"
      },
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
      btnAddtogroup: false,
      timeout: null
    };
  },
  methods: {
    removeContactBulk() {
      this.$swal({
        title: this.$t("delete_confirmation"),
        text: this.$t("delete_confirmation_text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("delete_confirmation_button"),
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return api({
            method: "delete",
            url: "phonebook/bulk",
            data: this.checkedContact
          }).then(async result => {
            return result;
          });
        }
      }).then(result => {
        if (result.data.ec == 200) {
          this.loadGroup();
          this.$swal({
            type: "success",
            title: this.$t("success"),
            text: ""
          }).then(async ok => {
            for (var key in this.checked) {
              if (this.checked.hasOwnProperty(key)) {
                this.checked[key] = false;
              }
            }
            this.list = [];
            this.contactLoader = true;
            this.loadContact();
          });
        } else if (result.data.ec == 400) {
          this.errorMessage = result.data.message;
        } else {
          this.$swal(this.$t("error"), this.$t("error_text"), "error");
        }
      });
    },
    resetContactForm() {
      this.contactDialog.data.title = "";
      this.contactDialog.data.name = "";
      this.contactDialog.data.phone_number = "";
      this.contactDialog.data.param_1 = "";
      this.contactDialog.data.param_2 = "";
      // document.getElementById("inputCsvFile").value = "";
      if (this.contactDialog.type == 'add') {
        document.getElementById("inputCsvFile").value = "";
      }

      this.csvData = [];
    },
   onUploadCsv(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        const doStuff  = (data) => {
            //Data is usable here
            if (
            input.files[0].name.indexOf('.csv') == -1
            ) {
              this.contactDialog.visible = false;
              this.resetContactForm();
              this.$swal(this.$t("error"), "File type not allowed", "error");
            } else {
              this.csvData = this.csvJSON(data);
            }
        }

       const parseData = (url, callBack) => {
            this.$papa.parse(url, {
                download: true,
                dynamicTyping: true,
                complete: function(results) {
                    callBack(results.data);
                }
            });
        }
        parseData(input.files[0], doStuff);

        // var reader = new FileReader();
        // reader.onload = e => {
        //   let csv = e.target.result;
        //   var tipefile = input.files[0].name;
        //   // console.log("tipe file", tipefile)
        //   // console.log("if", tipefile != "application/vnd.ms-excel")
        //   // console.log("iff", (tipefile != 'text/csv' || tipefile != "application/vnd.ms-excel"))
        //   if (
        //    tipefile.indexOf('.csv') == -1
        //   ) {
        //     this.contactDialog.visible = false;
        //     this.resetContactForm();
        //     this.$swal(this.$t("error"), "File type not allowed", "error");
        //   } else {
        //     this.csvData = this.csvJSON(csv);
        //     console.log(this.csvData);
        //   }
        // };
        // reader.readAsText(input.files[0]);
      } else {
        this.resetContactForm();
      }
    },
    csvJSON(csv) {
      let lines = csv;
      let result = [];
      let headers = lines[0];
      lines.shift();
      lines.forEach(line => {
        let data = line;
        if (data[1] && data[2]) {
          result.push({
            title: data[0],
            name: data[1],
            phoneNumber: data[2],
            param_1: data[3] || "",
            param_2: data[4] || "",
            customerId: store.getters.customerID
          });
        }
      });
      return result;
    },

    cancelAddContact() {
      this.contactDialog.visible = false;
      this.resetContactForm();
    },
    handleTab(tab, event) {
      // console.log(tab.name, event);
      this.addType = tab.name;
      this.resetContactForm();
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
    openDialog(data, type) {
      this.contactDialog.data.phonebook_id = data.phonebook_id;
      this.contactDialog.data.name = data.name;
      this.contactDialog.data.title = data.title;
      this.contactDialog.data.param_1 = data.param_1;
      this.contactDialog.data.param_2 = data.param_2;
      this.contactDialog.data.phone_number = data.phone_number;

      if (type == "remove") {
        this.doRemoveContact();
      } else if (type == "removeFromGroup") {
        this.doRemoveContactFromGroup();
      } else {
        this.contactDialog.visible = true;
        this.contactDialog.type = type;
      }
    },
    doSubmitContact(type) {
      this.buttonContactDialogLoader = true;
      if (type == "edit") {
        this.doEditContact();
      } else if (type == "add") {
        this.doAddContact();
      }
    },
    doAddContact() {
      if (this.addType == "single") {
        this.$refs["contactDialog"].validate(async valid => {
          // console.log("valid: ",this.$refs['contactDialog'])
          if (this.groupId != 0) {
            this.contactDialog.data.groupId = this.groupId;
          }
          if (valid) {
            this.contactDialog.data.customer_id = store.getters.customerID;
            api({
              method: "post",
              url: "phonebook",
              data: this.contactDialog.data
            })
              .then(result => {
                this.buttonContactDialogLoader = false;
                this.contactDialog.visible = false;
                if (result.data.ec == 200) {
                  this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.list = [];
                    this.contactLoader = true;
                    this.loadContact();
                    if (this.groupId != 0) {
                      this.loadGroup();
                    }
                    this.resetContactForm();
                  });
                } else if (result.data.ec == 400) {
                  this.$swal({
                    title: this.$t("error"),
                    text: result.data.message,
                    type: "error"
                  });
                } else {
                  this.$swal(this.$t("error"), this.$t("error_text"), "error");
                }
              })
              .catch(error => {
                this.buttonContactDialogLoader = false;
                this.contactDialog.visible = false;
                this.$swal(this.$t("error"), this.$t("error_text"), "error");
              });
          } else {
            this.buttonContactDialogLoader = false;
          }
        });
      } else if (this.addType == "csv") {
        this.$refs["contactDialog"].resetFields(e => {});
        // console.log(JSON.stringify( this.csvData))
        let sentData = {
          phonebook: this.csvData
        };
        if (this.groupId != 0) {
          sentData.groupId = this.groupId;
        }
        api({
          method: "post",
          url: "phonebook/bulk",
          timeout: 300000,
          data: sentData
        })
          .then(result => {
            this.buttonContactDialogLoader = false;
            this.contactDialog.visible = false;
            if (result.data.ec == 200) {
              this.$swal({
                title: this.$t("success"),
                text: "Please wait while we save your contact.",
                type: "success"
              }).then(ok => {
                this.list = [];
                this.contactLoader = true;
                this.loadContact();
                this.resetContactForm();
                if (this.groupId != 0) {
                  this.loadGroup();
                }
              });
            } else if (result.data.ec == 400) {
              this.$swal({
                title: this.$t("error"),
                text: result.data.message,
                type: "error"
              });
            } else {
              this.$swal(this.$t("error"), this.$t("error_text"), "error");
            }
          })
          .catch(error => {
            this.buttonContactDialogLoader = false;
            this.contactDialog.visible = false;
            this.$swal(this.$t("error"), this.$t("error_text"), "error");
          });
      }
    },
    doEditContact() {
      api({
        method: "patch",
        url: "phonebook/" + this.contactDialog.data.phonebook_id,
        data: this.contactDialog.data
      })
        .then(result => {
          this.buttonContactDialogLoader = false;
          if (result.data.ec == 200) {
            this.contactDialog.visible = false;
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            }).then(ok => {
              this.list = [];
              this.contactLoader = true;
              this.loadContact();
            });
          } else if (result.data.ec == 400) {
            let message = this.$t(`contact.${result.data.message}`);
            if (result.data.message == "duplicate_number") {
              message += `(Duplicated with: ${result.data.data.name})`;
            }
            this.$message.error({
              showClose: false,
              timeout: 5000,
              message: message
            });
          } else {
            this.$message.error({
              showClose: false,
              message: result.data.message
            });
          }
        })
        .catch(error => {
          // console.log(error.message);
          this.buttonContactDialogLoader = false;
          this.contactDialog.visible = false;
          this.$message.error({
            showClose: false,
            message: this.$t(`login.invalid_parameter`)
          });
        });
    },
    doRemoveContact() {
      this.$swal({
        title: this.$t("delete_confirmation"),
        text: this.$t("delete_confirmation_text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("delete_confirmation_button"),
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return api({
            method: "delete",
            url: "phonebook/" + this.contactDialog.data.phonebook_id
          }).then(async result => {
            return result;
          });
        }
      }).then(result => {
        if (result.data.ec == 200) {
          this.loadGroup();
          this.$swal({
            type: "success",
            title: this.$t("success"),
            text: ""
          }).then(async ok => {
            this.list = [];
            this.contactLoader = true;
            this.loadContact();
          });
        } else if (result.data.ec == 400) {
          this.errorMessage = result.data.message;
        } else {
          this.$swal(this.$t("error"), this.$t("error_text"), "error");
        }
      });
    },
    openAddToGroup() {
      this.selectedGroupId = [];
      this.addToGroupDialog.visible = true;
    },
    async doAddContactToGroup() {
      this.buttonAddToGroupDialogLoader = true;
      let customer_id = store.getters.customerID;
      let flag = 1;
      let message = "";
      let phoneExist = [];
      for (let iterator in this.selectedGroupId) {
        let groupId = this.selectedGroupId[iterator];
        let data = {
          customer_id: customer_id,
          phonebook_id: this.checkedContact,
          group_id: groupId
        };
        await api({
          method: "post",
          url: "group/add_to",
          data: data
        }).then(result => {
          if (result.data.ec != 200) {
            flag = 0;
            if (result.data.ec == 400) {
              message = this.$t("contact." + result.data.message);
            } else {
              message = this.$t("error_text");
            }
            phoneExist.push(this.checkedContact);
          }
        });
      }
      this.addToGroupDialog.visible = false;
      if (flag == 1) {
        this.$swal({
          type: "success",
          title: this.$t("success"),
          text: ""
        })
          .then(async ok => {
            for (var key in this.checked) {
              if (this.checked.hasOwnProperty(key)) {
                this.checked[key] = false;
              }
            }
            this.selectedGroupId = [];
            this.contactLoader = true;
            await this.loadContact();
            await this.loadGroup();
          })
          .catch(err => {
            this.buttonAddToGroupDialogLoader = true;
          });
      } else {
        this.$swal(this.$t("error"), message, "error");
      }
      this.buttonAddToGroupDialogLoader = false;
    },
    doRemoveContactFromGroup() {
      let customer_id = store.getters.customerID;
      let data = {
        customer_id: customer_id,
        phonebook_id: this.contactDialog.data.phonebook_id,
        group_id: this.groupId
      };
      this.$swal({
        title: this.$t("delete_confirmation"),
        text: this.$t("delete_confirmation_text"),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("delete_confirmation_button"),
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return api({
            method: "post",
            url: "group/delete_from",
            data: data
          }).then(result => {
            return result;
          });
        }
      }).then(result => {
        if (result.data.ec == 200) {
          this.$swal({
            type: "success",
            title: this.$t("success"),
            text: ""
          }).then(ok => {
            this.list = [];
            this.checked = [];
            this.contactLoader = true;
            this.loadContact();
            if (this.groupId != 0) {
              this.loadGroup();
            }
          });
        } else if (result.data.ec == 400) {
          this.errorMessage = result.data.message;
        } else {
          this.$swal(this.$t("error"), this.$t("error_text"), "error");
        }
      });
    },
    openGroupDialog(data, type) {
      this.groupDialog.data.group_id = data.group_id;
      this.groupDialog.data.group_name = data.group_name;

      if (type == "remove") {
        this.doRemoveGroup();
      } else {
        this.groupDialog.visible = true;
        this.groupDialog.type = type;
      }
    },
    doSubmitGroup(type) {
      this.buttonGroupDialogLoader = true;
      if (type == "edit") {
        this.doEditGroup();
      } else if (type == "add") {
        this.doAddGroup();
      }
    },
    doAddGroup() {
      this.groupDialog.data.customer_id = store.getters.customerID;
      api({
        method: "post",
        url: "group",
        data: this.groupDialog.data
      })
        .then(result => {
          this.buttonGroupDialogLoader = false;
          this.groupDialog.visible = false;
          if (result.data.ec == 200) {
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            }).then(ok => {
              setTimeout(() => {
                this.groupLoader = true;
                this.loadGroup();
              }, 500);
            });
          } else if (result.data.ec == 400) {
            this.$swal({
              title: this.$t("error"),
              text: result.data.message,
              type: "error"
            });
          } else {
            this.$swal(this.$t("error"), this.$t("error_text"), "error");
          }
        })
        .catch(error => {
          this.buttonGroupDialogLoader = false;
          this.groupDialog.visible = false;
          this.$swal(this.$t("error"), this.$t("error_text"), "error");
        });
    },
    doEditGroup() {
      api({
        method: "patch",
        url: "group/" + this.groupDialog.data.group_id,
        data: this.groupDialog.data
      })
        .then(result => {
          this.buttonGroupDialogLoader = false;
          this.groupDialog.visible = false;
          if (result.data.ec == 200) {
            this.$swal({
              title: this.$t("success"),
              text: "",
              type: "success"
            }).then(ok => {
              setTimeout(() => {
                this.groupLoader = true;
                this.loadGroup();
              }, 500);
            });
          } else if (result.data.ec == 400) {
            this.$swal({
              title: this.$t("error"),
              text: result.data.message,
              type: "error"
            });
          } else {
            this.$swal(this.$t("error"), this.$t("error_text"), "error");
          }
        })
        .catch(error => {
          this.buttonGroupDialogLoader = false;
          this.groupDialog.visible = false;
          this.$swal(this.$t("error"), this.$t("error_text"), "error");
        });
    },
    doRemoveGroup() {
      this.$swal({
        title: this.$t("delete_confirmation"),
        text: this.$t("delete_confirmation_text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("delete_confirmation_button")
      }).then(confirm => {
        api({
          method: "delete",
          url: "group/" + this.groupDialog.data.group_id
        })
          .then(result => {
            if (result.data.ec == 200) {
              this.$swal({
                type: "success",
                title: this.$t("success"),
                text: ""
              }).then(ok => {
                setTimeout(() => {
                  this.groupLoader = true;
                  this.loadGroup();
                }, 500);
              });
            } else if (result.data.ec == 400) {
              this.errorMessage = result.data.message;
            } else {
              this.$swal(this.$t("error"), this.$t("error_text"), "error");
            }
          })
          .catch(error => {
            this.buttonGroupDialogLoader = false;
            this.$swal(this.$t("error"), this.$t("error_text"), "error");
          });
      });
    },
    openGroup(data) {
      this.groupName = data.group_name;
      this.groupId = data.group_id;

      this.list = [];
      this.contactLoader = true;
      this.loadContact();
    },
    async loadContact(view) {
      if (this.groupId != 0) {
        await this.loadContactByGroup();
      } else {
        await this.loadContactAll(this.currentPage, view);
      }
    },
    async loadContactByGroup(page = 1) {
      this.contactLoader = true;
      this.currentPage = this.currentPageGroupContact;
      this.currentPageContact = 1;
      await api({
        method: "get",
        url: "group/" + this.groupId,
        params: {
          page: this.currentPage
        }
      })
        .then(result => {
          this.list = result.data.data.contact;
          this.contactLoader = false;
          this.contactsTotal = result.data.data.group.total;
        })
        .catch(error => {
          console.error("Failed : " + error);
          this.contactLoader = false;
        });
    },
    async nextContact(page) {
      // console.log("page", page, this.groupId)
      if (this.searchContact != "") {
        this.currentPageContact = page;
        this.currentPage = this.currentPageContact;
        this.doGetSearchContact(this.searchContact);
      } else {
        if (this.groupId != 0) {
          this.currentPageGroupContact = page;
          this.currentPage = this.currentPageGroupContact;
          this.loadContactByGroup(page);
        } else {
          this.currentPageContact = page;
          this.currentPage = this.currentPageContact;
          this.loadContactAll(page);
        }
      }
    },
    doSearchContact(ev) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.searchContact.length >= 3) {
          this.currentPageContact = this.currentPageGroupContact = this.currentPage = 1;
          this.doGetSearchContact(this.searchContact);
        } else {
          this.loadContactAll();
        }
      }, 1000);
    },
    async doGetSearchContact(query = "", page = 1) {
      this.contactLoader = true;
      await api({
        method: "get",
        url: "phonebook/search",
        params: {
          page: this.currentPage,
          query: query,
          group_id: this.groupId != 0 ? this.groupId : ""
        }
      })
        .then(result => {
          this.list = result.data.data.contact;
          this.contactsTotal = result.data.data.rows;
          this.contactLoader = false;
        })
        .catch(error => {
          console.error("Failed : " + error);
          this.contactLoader = false;
        });
    },
    async loadContactAll(page,view) {
      this.contactLoader = true;
      this.currentPage = this.currentPageContact;
      this.currentPageGroupContact = 1;
      await api({
        method: "get",
        url: "phonebook",
        params: {
          page: this.currentPage,
          view : view == true ? true : null
        }
      })
        .then(result => {
          this.list = result.data.data.contact;
          this.contactsTotal = result.data.data.rows;
          this.contactLoader = false;
        })
        .catch(error => {
          console.error("Failed : " + error);
          this.contactLoader = false;
        });
    },
    async loadGroup() {
      await api({
        method: "get",
        url: "group/all"
      })
        .then(result => {
          this.groups = [];
          this.groups = [{ group_id: 0, group_name: this.$t("contact.all") }];
          result.data.data.forEach(element => {
            this.groups.push(element);
          });
          this.groupLoader = false;
        })
        .catch(error => {
          console.error("Failed : " + error);
          this.groupLoader = false;
        });
    }
  },
  computed: {
    formRequiredIsFilled() {
      if (this.addType == "csv") {
        if (this.csvData.length) {
          return true;
        }
      } else if (this.addType == "single") {
        // if (this.contactDialog.data.phone_number && this.contactDialog.data.name) {
        return true;
        // }
      }
      return false;
    },
    // contactsFiltered() {
    //   // return this.list.filter(({name, address, phone_number}) => (name+address+phone_number).toString().toLowerCase().indexOf(this.searchContact.toString().toLowerCase()) !== -1)
    //   var q = this.searchContact.toString().toLowerCase()
    //   if(q.length > 3){
    //     console.log("????")
    //     this.doSearchContact(q)
    //     return this.list
    //   }
    //   return this.list
    // },
    groupFiltered() {
      return this.groups.filter(
        ({ group_name }) =>
          group_name
            .toString()
            .toLowerCase()
            .indexOf(this.searchGroup.toString().toLowerCase()) !== -1
      );
    },
    contactDialogReadonly() {
      return this.contactDialog.type == "detail";
    },
    contactDialogTitle() {
      return this.$t("contact." + this.contactDialog.type);
    },
    groupDialogReadonly() {
      return this.groupDialog.type == "detail";
    },
    groupDialogTitle() {
      return this.$t("group." + this.groupDialog.type);
    },
    checkedContact() {
      let data = [];
      for (var key in this.checked) {
        if (this.checked.hasOwnProperty(key)) {
          var value = this.checked[key];
          if (value) {
            data.push(key);
          }
        }
      }
      return data;
    }
  },
  async mounted() {
    this.loadContact(true);
    this.loadGroup();
  },
  components: {
    ContactDialog
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";

.full-button {
  width: 100%;
}

.page-header {
  margin-bottom: 20px;
}

h2 {
  float: left;
}

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

.contact-list {
  // height: 650px;
  height: auto;
}

.group-item,
.contact-item {
  &:hover,
  &.active {
    background-color: #dddddd;
    border-radius: 5px;
  }
}

.group-item {
  cursor: pointer;
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
@media screen and (max-width: 450px) {
  .avatar {
    display: none;
  }
}
</style>