<template>
  <div class="page-contacts scrollable only-y" id="page-contacts">
    <div class="page-header">
      <h1>{{ $t("whatsapp.generate_qr.generate_qr") }}</h1>
    </div>

    <el-card v-if="showAlertMessage" align="center">
      <div style="text-align: center; width: 100%;" align="center">
        <h2 style="text-align: center; width: 100%;" align="center">Start messaging your customers today</h2>
      </div>
      <br />
      <br />
      <div>
      <p v-html="$t('promote.desc.whatsapp')"></p>
      </div>
      <br />
      <br />
      <span>
        <el-button @click="mailto()">Send us e-mail</el-button>
      </span>
      <div v-if="customer_type==2 && businessId==undefined && businessId==''" style="margin: 0 0 20px;">
          <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Connect to Facebook</button>
      </div>
    </el-card>

    <div class="mt-10" v-else>
      <el-card style="background-color: #249393; color: white;" v-loading="linkLoader">
        Phone Number Available :
        <strong>{{phoneNumbers.length}}</strong>
      </el-card>
      <el-card :body-style="{ padding: '0'}">
        <el-row :gutter="10" v-loading="linkLoader" v-if="!showAlertMessage">
          <el-col
            class="mt-0"
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
            style="background-color: #F8F8F8;"
          >
            <!-- <el-card class="group-list scrollable only-x" style="background-color: transparent;"> -->
            <div class="group-list scrollable only-x">
              <h2 class="ml-25" style="font-size: 16px;">
                <strong>QR Code List</strong>
              </h2>
              <el-tooltip class="item" effect="dark" content="Reload" placement="bottom">
                <el-button
                  type="primary"
                  @click="doGetQrCodeList()"
                  size="mini"
                  class="add-contact mt-10 mr-25 mb-10"
                >
                  <span class="mdi mdi-reload"></span>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Create QR Code" placement="top">
                <el-button
                  type="primary"
                  @click="dialogFormAddQrCode=true"
                  size="mini"
                  class="add-contact mt-10 mr-10 mb-10"
                >
                  <span class="mdi mdi-plus"></span>
                  <!-- Create QR Code -->
                </el-button>
              </el-tooltip>
            </div>

            <template :style="{ height: '200px' }" v-if="dataQr.length == 0">
              <p align="center" style="color: #909399">
                <img src="@/assets/images/no_contact@3x.png" width="100" />
                <br />Data not found
              </p>
            </template>
            <div v-loading="linkLoader" style="height: 500px; overflow-y: scroll;">
              <div
                v-for="(data, key) in dataIdFormName"
                :key="key"
                class="group-item contact"
                @click="selectedId = data.id"
                :class="{'active' : selectedId == data.id}"
              >
                <span class="mt-5" style="float: right; font-size:12px;">
                  <span v-if="data.quality_rating=='GREEN'" type="default" size="small">
                    <i style="color:green;" class="mdi mdi-brightness-1"></i> High
                  </span>
                  <span v-else-if="data.quality_rating=='RED'" type="default" size="small">
                    <i style="color:red;" class="mdi mdi-brightness-1"></i> Low
                  </span>
                  <span v-else-if="data.quality_rating=='YELLOW'" type="default" size="small">
                    <i style="color:yellow;" class="mdi mdi-brightness-1"></i> Medium
                  </span>
                  <span v-else type="default" size="small">
                    <i style="color:grey;" class="mdi mdi-brightness-1"></i> Unavailable
                  </span>
                </span>
                <div>
                  <span>{{data.verified_name}}</span>
                </div>
                <div>
                  <span class="mr-10 qr-number-phone">
                    <i class="mdi mdi-account-box"></i>
                    {{data.display_phone_number}}
                  </span>
                </div>
              </div>
            </div>
            <!-- </el-card> -->
          </el-col>

          <el-col class="mt-0 pl-0" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-dialog title="Create New Qr Code" :visible.sync="dialogFormAddQrCode">
              <el-form class="pb-40">
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Name</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-select v-model="idFormName" placeholder="Select One">
                      <el-option
                        v-for="(item, i) in namePhoneNumbers"
                        :key="i"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Phone Number</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input
                      type="text"
                      :value="form.dataPhoneNumber[0].display_phone_number"
                      readonly
                      disabled
                    />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Message</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input
                      type="textarea"
                      :maxlength="160"
                      rows="8"
                      v-model="form.prefilled_message"
                      placeholder="Insert message"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Image Format</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-select v-model="form.formatImg" placeholder="Select One">
                      <el-option
                        v-for="item in formatsImg"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer">
                <el-button @click="dialogFormAddQrCode = false">Cancel</el-button>
                <el-button type="primary" @click="doCreateQr" :loading="buttonCreateLoader">Create</el-button>
              </span>
            </el-dialog>

            <el-dialog title="Detail Qr Code" :visible.sync="dialogDetailQrCode">
              <el-form class="pb-40">
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Code</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input type="text" :value="detailQr.code" readonly disabled />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Link</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input type="text" :value="detailQr.deep_link_url" readonly />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Message</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-input
                      type="textarea"
                      :maxlength="100"
                      rows="8"
                      v-model="detailQr.prefilled_message"
                      placeholder="Insert message"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Image Code</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <a @click="dialogImgCode = true">
                      <img :src="detailQr.qr_image_url" style="width: 100px; height: 100px" />
                    </a>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <h4>Image Format</h4>
                  </el-col>
                  <el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <el-select v-model="detailQr.formatImg" placeholder="Select One">
                      <el-option
                        v-for="item in formatsImg"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer">
                <el-button type="primary" @click="doUpdateQr" :loading="buttonUpdateLoader">Update</el-button>
                <el-button type="danger" @click="doDeleteQr" :loading="buttonDeleteLoader">Delete</el-button>
                <el-button @click="dialogDetailQrCode = false">Cancel</el-button>
              </span>
            </el-dialog>

            <el-dialog title="Image Code" :visible.sync="dialogImgCode">
              <el-form class="pb-40">
                <el-row>
                  <el-col style="text-align: center">
                    <img :src="detailQr.qr_image_url" style="width: 70%; height: 70%;" />
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer">
                <el-button @click="dialogImgCode = false">Close</el-button>
              </span>
            </el-dialog>

            <!-- <el-card > -->
            <el-row v-loading="codeLoader">
              <template :style="{ height: '200px' }" v-if="dataQrId.length == 0">
                <p align="center" style="color: #909399">
                  <img src="@/assets/images/no_contact@3x.png" width="100" />
                  <br />Data not found
                </p>
              </template>
              <el-col
                :md="24"
                :sm="24"
                :xs="24"
                :span="8"
                v-for="(data, i) in dataQrId"
                :key="i"
                style="border: none; box-shadow: 0;"
              >
                <el-card
                  :body-style="{ padding: '15px 100px'}"
                  style="border: none; box-shadow: none"
                >
                  <div style="margin-bottom: 10px;">
                    <time class="time date">
                      <i class="el-icon-date"></i>
                      &nbsp;{{ formatDate(data.updatedAt) }}
                    </time>
                    <time class="time clock">
                      <i class="el-icon-time"></i>
                      &nbsp;{{ formatTime(data.updatedAt) }}
                    </time>
                  </div>
                  <!-- <br> -->
                  <img :src="data.qr_image_url" class="image" alt="code image" />
                  <div class="mt-10">
                    <div style="float: left">
                      <span style="font-size: 14px;">{{data.code}}</span>
                    </div>
                    <div style="float: right">
                      <span>
                        <a
                          style="font-size: 14px;"
                          target="_blank"
                          v-bind:href="data.deep_link_url"
                          class="mr-10 wabalink-short-url"
                        >{{data.prefilled_message}}</a>
                      </span>
                    </div>
                  </div>
                  <div class="bottom clearfix">
                    <div class="button-view">
                      <el-button
                        class="btn-view"
                        @click="showDialogDetail(data)"
                        type="primary"
                      >View</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <br />
            <el-pagination
              v-if="dataQrIdAll.length != 0"
              background
              prev-text="Prev"
              next-text="Next"
              layout="prev, pager, next"
              @current-change="paginateQr"
              :current-page="current_page"
              :total="total_page"
            />
            <!-- </el-card> -->
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>


<script>
import api from "@/networkClient";
import config from "@/config";
import store from "@/store";
import _ from "lodash";
import moment from "moment-timezone";
// import Chart from "vue-bulma-chartjs";
// import V_Echarts from "../../directives/echarts";
const randomColor = require("randomcolor"); // import the script
const color = randomColor();
// console.log(color);

export default {
  // components: {
  // 	'chart': Chart
  // },

  // directives: {
  //   echarts: V_Echarts
  // },

  data() {
    return {
      currentDate: new Date(),
      phoneNumbers: [],
      color: color,
      showAlertMessage: false,
      dialogFormAddQrCode: false,
      dialogDetailQrCode: false,
      buttonCreateLoader: false,
      buttonUpdateLoader: false,
      buttonDeleteLoader: false,
      dataQr: [],
      linkLoader: false,
      codeLoader: false,
      dialogImgCode: false,
      visible: false,
      current_page: 1,
      total_page: 10,
      form: {
        dataPhoneNumber: [
          {
            display_phone_number: ""
          }
        ],
        prefilled_message: "",
        formatImg: "svg"
      },
      detailQr: {
        code: "",
        deep_link_url: "",
        prefilled_message: "",
        phoneNumberId: "",
        qr_image_url: "",
        formatImg: ""
      },
      namePhoneNumbers: [],
      idFormName: "",
      dataIdFormName: [],
      dataQrId: [],
      dataQrIdAll: [],
      selectedId: "",
      formatsImg: [
        {
          value: "svg",
          label: "SVG"
        },
        {
          value: "png",
          label: "PNG"
        }
      ],
      user: {
        name: store.getters.userName,
        company: store.getters.companyName,
        token: store.getters.token,
        customer_id: store.getters.customerID
      }
    };
  },
  methods: {
    formatDate(str, format) {
      return moment(str).format("DD-MM-YYYY");
    },

    formatTime(str, format) {
      return moment(str).format("HH:mm:ss");
    },

    async paginateQr(page = 1) {
      this.codeLoader = true;
      this.current_page = page;
      this.dataQrId = [];
      for (let index = 1 * page - 1; index < page * 1; index++) {
        this.dataQrId.push(this.dataQrIdAll[index]);
      }
      await this.getDataQrByCode();
      this.codeLoader = false;
    },

    showDialogDetail(param) {
      this.detailQr = param;
      this.dialogDetailQrCode = true;
    },

    async getDataQrByCode() {
      if (
        this.dataQrId[0].format_img == undefined ||
        this.dataQrId[0].format_img == null
      ) {
        this.dataQrId[0].format_img = "svg";
      }

      await api({
        method: "post",
        url: config.baseApi + "bussiness/get-qrcode/",
        data: {
          id: this.selectedId,
          code: this.dataQrId[0].code,
          formatImg: this.dataQrId[0].format_img
        }
      })
        .then(async result => {
          if (result.data.ec == 200) {
            this.dataQrId.splice(0, 1, result.data.data);
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: "Something wrong",
            type: "error"
          });
          this.codeLoader = false;
        });
    },

    async getDataQrById() {
      this.codeLoader = true;
      await api({
        method: "get",
        url: config.baseApi + "bussiness/get-qrcode/" + this.selectedId
      })
        .then(async result => {
          if (result.data.ec == 200) {
            // this.dataQrId = result.data.data;
            this.total_page = 10;
            this.dataQrIdAll = result.data.data;

            if (this.dataQrIdAll.length > 1) {
              this.total_page = 10 * this.dataQrIdAll.length;
            }
            await this.paginateQr();
            this.codeLoader = false;
          }
        })
        .catch(error => {
          this.codeLoader = false;
        });
    },

    async doGetQrCodeList() {
      this.linkLoader = true;
      this.codeLoader = true;
      this.dataIdFormName = [];
      await api({
        method: "get",
        url: config.baseApi + "bussiness/getAll-qrcode/"
      })
        .then(result => {
          if (result.data.ec == 200) {
            this.showAlertMessage = false;
            this.dataQr = result.data.data.map(el => el.phoneNumberId);
            this.dataQr = [...new Set(this.dataQr)];
            for (let i = 0; i < this.dataQr.length; i++) {
              this.phoneNumbers.forEach(el => {
                if (el.id == this.dataQr[i]) {
                  this.dataIdFormName.push(el);
                }
              });
            }
            if (this.dataIdFormName.length == 0) {
              this.dataQrId = [];
              this.dataQrIdAll = [];
            }
            this.selectedId = this.dataIdFormName[0].id;
            this.getDataQrById();
            this.linkLoader = false;
            this.codeLoader = false;
          } else if (
            result.data.ec == 400 &&
            result.data.message == "not_subscribe"
          ) {
            this.showAlertMessage = true;
            this.linkLoader = false;
            this.codeLoader = false;
          } else {
            this.showAlertMessage = false;
            this.linkLoader = false;
            this.codeLoader = false;
          }
        })
        .catch(error => {
          this.linkLoader = false;
          this.codeLoader = false;
        });
    },

    async doCreateQr() {
      if (
        this.idFormName == "" ||
        this.form.prefilled_message == "" ||
        this.form.prefilled_message.trim() == " "
      ) {
        this.$message({
          showClose: true,
          message: "Oops, all field is required",
          type: "error"
        });
      } else {
        this.buttonCreateLoader = true;
        await api({
          method: "post",
          url: config.baseApi + "bussiness/generate-qrcode/" + this.idFormName,
          data: {
            prefilled_message: this.form.prefilled_message,
            formatImg: this.form.formatImg
          }
        })
          .then(async result => {
            if (result.data.ec == 200) {
              this.$swal({
                title: this.$t("success"),
                text: "",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "Failed",
                type: "error"
              });
              // this.clear()
            }
            this.linkLoader = true;
            this.clear();
            this.dialogFormAddQrCode = false;
            await this.getPhoneNumber();
            await this.doGetQrCodeList();
            this.linkLoader = false;
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: "Failed",
              type: "error"
            });
            this.dialogFormAddQrCode = false;
          });
        this.buttonCreateLoader = false;
        this.linkLoader = false;
      }
    },

    async doUpdateQr() {
      if (
        this.detailQr.formatImg == "" ||
        this.detailQr.formatImg == undefined
      ) {
        this.$message({
          showClose: true,
          message: "Oops, format image cannot empty",
          type: "error"
        });
      } else if (
        this.detailQr.prefilled_message == "" ||
        this.detailQr.prefilled_message.trim() == " "
      ) {
        this.$message({
          showClose: true,
          message: "Oops, message cannot empty",
          type: "error"
        });
      } else {
        this.buttonUpdateLoader = true;
        await api({
          method: "post",
          url:
            config.baseApi +
            "bussiness/update-qrcode/" +
            this.detailQr.phoneNumberId,
          data: {
            code: this.detailQr.code,
            prefilled_message: this.detailQr.prefilled_message,
            formatImg: this.detailQr.formatImg
          }
        })
          .then(async result => {
            this.linkLoader = true;
            if (result.data.ec != 200) {
              this.$swal({
                type: "error",
                title: this.$t("error"),
                text: "Something wrong"
              });
            } else {
              this.dialogDetailQrCode = false;
              this.$swal({
                type: "success",
                title: this.$t("success"),
                text: ""
              });
              this.clear();
              await this.getPhoneNumber();
              await this.doGetQrCodeList();
            }
          })
          .catch(error => {
            // console.log(error);
          });
        this.buttonUpdateLoader = false;
        this.linkLoader = false;
      }
    },

    async doDeleteQr() {
      this.$confirm(
        `Are you sure want to delete QR Code <b>${this.detailQr.code}</b> ?`,
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
          this.buttonDeleteLoader = true;
          await api({
            method: "post",
            url:
              config.baseApi +
              "bussiness/delete-qrcode/" +
              this.detailQr.phoneNumberId,
            data: {
              code: this.detailQr.code
            }
          })
            .then(async result => {
              // console.log(result.data.ec);
              if (result.data.ec != 200) {
                this.$swal({
                  type: "error",
                  title: this.$t("error"),
                  text: ""
                });
                this.dialogDetailQrCode = false;
              } else {
                this.dialogDetailQrCode = false;
                this.linkLoader = true;
                this.$swal({
                  type: "success",
                  title: this.$t("success"),
                  text: ""
                });
                this.clear();
                await this.getPhoneNumber();
                await this.doGetQrCodeList();
              }
            })
            .catch(error => {
              // console.log(error);
            });
          this.buttonDeleteLoader = false;
          this.linkLoader = false;
        })
        .catch(cancel => {});
    },

    async getPhoneNumber() {
      this.linkLoader = true;
      await api({
        method: "get",
        url: "bussiness/phone-number"
      })
        .then(result => {
          if (result.data.ec == 200) {
            this.phoneNumbers = result.data.data.data;
            this.namePhoneNumbers = this.phoneNumbers.map(el => {
              return {
                name: el.verified_name,
                id: el.id
              };
            });
          } else if (result.data.ec == 400) {
            this.showAlertMessage = true;
          }

          this.linkLoader = false;
        })
        .catch(error => {
          this.showAlertMessage = true;
          this.linkLoader = false;
          // console.log(error);
        });
    },

    clear() {
      this.form.prefilled_message = "";
      this.form.formatImg = "svg";
      this.form.dataPhoneNumber[0].display_phone_number = "";
      this.idFormName = "";
    }
  },
  computed: {},
  watch: {
    dialogFormAddQrCode: function() {
      if (this.dialogFormAddQrCode == false) {
        this.clear();
      }
    },

    idFormName: function() {
      if (this.idFormName != "") {
        this.form.dataPhoneNumber = this.phoneNumbers.filter(el =>
          this.idFormName == el.id ? true : false
        );
      }
    },

    selectedId: async function() {
      await this.getDataQrById();
    }
  },
  async mounted() {
    await this.getPhoneNumber();
    await this.doGetQrCodeList();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables";

.wabalink-created {
  color: #999999;
  font-size: 12px;
}

.wabalink-original-url {
  color: #999999;
  font-size: 12px;
  width: 20px;
}

.wabalink-short-url {
  text-align: center;
  font-size: 9.5px;
}

.qr-number-phone {
  font-size: 12px;
  color: #249393;

  .mdi-account-box {
    color: black;
  }
}

.hr-custom {
  border: 0.5px solid silver;
}

.totaly {
  font-size: 24px;
}

.total-clicks {
  color: #999999;
  font-size: 12px;
}

.formOriginal {
  width: 100%;
}

.username {
  color: $text-color-accent;
}

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

.group-list {
  padding: 10px 0;
  border-bottom: 2px solid #d9d9d9;
}

.contact-list {
  // height: 650px;
  height: auto;
}

.group-item,
.contact-item {
  &:hover,
  &.active {
    background-color: #eef2f3;
    border-radius: 5px;
  }
}

.group-item {
  cursor: pointer;
}

.contact {
  padding: 15px 20px;
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
@media (max-width: 1024px) {
  .el-col-md-10 {
    width: 100%;
  }

  .el-col-md-14 {
    width: 100%;
  }
}
@media screen and (max-width: 450px) {
  .avatar {
    display: none;
  }
}

// style dummies

.time {
  font-size: 13px;
  color: black;
}

.clock {
  float: right;
}

.date {
  float: left;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  text-align: center;
}

.button-view {
  font-size: 15px;
  text-align: center;
  margin-top: 30px;
}

.btn-view {
  padding: 12px 43%;
}

.image {
  width: 100%;
  display: block;
  padding: 10px 0 0 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>