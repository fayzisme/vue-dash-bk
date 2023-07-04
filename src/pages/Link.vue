<template>
  <div class="page-contacts scrollable only-y" id="page-contacts">
    <div class="page-header">
      <h1>{{ $t("menu.link") }}</h1>
    </div>

    <!-- Start if unassigned shorten url service and product -->
    <el-card v-if="showAlertSubscribe" align="center">
      <h2 align="center" style="float: none !important;">Start shorten your link today</h2>
      <p v-html="$t('promote.desc.wabalink')"></p>
      <br />
      <span>
        <el-button @click="mailto()">Send us e-mail</el-button>
      </span>
    </el-card>
    <!-- End if unassigned shorten url service and product -->

    <el-card class="mt-10" v-else>
      <el-card style="background-color: #249393; color: white;" v-loading="linkLoader">
        Wabalink limits :
        <strong>{{limits}}</strong>
      </el-card>
      <el-row :gutter="10" v-loading="linkLoader" v-if="!showAlertSubscribe">
        <el-col class="mt-10" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <el-card class="group-list scrollable only-x">
            <div class="mb-40">
              <h2
                class="mt-0"
                style="font-size: 16px;"
              >{{ totalLink }} {{ $t("wabalink.wabalink") }}</h2>
              <el-tooltip class="item" effect="dark" content="Reload" placement="bottom">
                <el-button
                  type="primary"
                  @click="doGetUrlList()"
                  size="mini"
                  class="add-contact mr-10 mb-10"
                >
                  <span class="mdi mdi-reload"></span>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Create Wabalink" placement="top">
                <el-button
                  v-if="totalLink==limits"
                  disabled="disabled"
                  type="primary"
                  @click="dialogFormAddLink=true"
                  size="mini"
                  class="add-contact mr-10 mb-10"
                >
                  <span class="mdi mdi-plus"></span>
                </el-button>
                <el-button
                  v-else
                  type="primary"
                  @click="dialogFormAddLink=true"
                  size="mini"
                  class="add-contact mr-10 mb-10"
                >
                  <span class="mdi mdi-plus"></span>
                </el-button>
              </el-tooltip>
              <el-alert
                v-if="totalLink==limits"
                title="Info"
                type="error"
                :closable="false"
                description="You cannot add more urls, because you have reached the limit, you can only change or delete"
                show-icon
              ></el-alert>
            </div>

            <template :style="{ height: '200px' }" v-if="dataLink.length == 0">
              <p align="center" style="color: #909399">
                <img src="@/assets/images/no_contact@3x.png" width="100" />
                <br />Data not found
              </p>
            </template>
            <div v-else style="height: 500px; overflow-y: scroll;">
              <div
                v-for="(data, key) in dataLink"
                :key="key"
                class="group-item contact"
                @click="selectedLink=dataLink[key]; linkTrx=selectedLink.transaction"
                :class="{'active' : selectedLink._id==data._id}"
              >
                <span style="float: right; font-size:12px;">
                  {{ data.clicked }}
                  <i class="mdi mdi-google-analytics"></i>
                </span>
                <div>
                  <span class="wabalink-created">{{ formatDate(data.createdAt)}}</span>
                </div>
                <div>
                  <span>{{data.linkName}}</span>
                </div>
                <div>
                  <i class="mdi mdi-link-variant"></i>&nbsp;
                  <a
                    target="_blank"
                    v-bind:href="data.shortUrl"
                    class="mr-10 wabalink-short-url"
                  >{{data.shortUrl}}</a>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col class="mt-10 pl-0" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <el-dialog title="Create WABALINK" :visible.sync="dialogFormAddLink">
            <el-form :model="form" class="pb-40">
              <el-form-item label="Title *">
                <el-input v-model="form.linkName" auto-complete="off" placeholder="URL Title"></el-input>
              </el-form-item>
              <el-form-item label="Original URL *">
                <el-input v-model="form.originalUrl" auto-complete="off" placeholder="Original URL"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="dialogFormAddLink = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="doAddShortUrl"
                :loading="buttonAddLinkLoader"
              >Confirm</el-button>
            </span>
          </el-dialog>
          <el-dialog
            :title="'Edit Wabalink : ' + linkName + ' #' + datas.urlCode"
            :visible.sync="dialogEditLink"
          >
            <el-form :model="form" class="pb-40">
              <el-form-item label="Title">
                <el-input placeholder="Optional" v-model="datas.title" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Customize Code *">
                <el-input v-model="datas.customCode" placeholder="example-new-code">
                  <template slot="prepend">{{ localBaseUrl }}</template>
                </el-input>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="dialogEditLink = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="doUpdateCode"
                :loading="buttonUpdateLinkLoader"
              >Confirm</el-button>
            </span>
          </el-dialog>
          <el-dialog
            style="width:50%; margin: 0 auto;"
            :title="'Are you sure to delete ' + linkName + ' ?'"
            :visible.sync="dialogDeleteLink"
          >
            <!-- <el-form :model="form" class="pb-40">
							<el-form-item label="Title">
								<el-input placeholder="Optional" v-model="selectedLink.linkName" auto-complete="off"></el-input>
							</el-form-item>
            </el-form>-->
            <!-- <span slot="footer"> -->
            <div style="float: right; margin: -27px 2px;">
              <el-button @click="dialogDeleteLink = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="doDeleteUrl"
                :loading="buttonDeleteLinkLoader"
              >Confirm</el-button>
            </div>
            <!-- </span> -->
          </el-dialog>

          <el-card>
            <el-row>
              <el-col :xs="24" :sm="24" class="mb-20">
                <template :style="{ height: '200px' }" v-if="dataLink.length == 0">
                  <p align="center" style="color: #909399">
                    <img src="@/assets/images/no_contact@3x.png" width="100" />
                    <br />Data not found
                  </p>
                </template>
                <div v-else>
                  <el-tooltip class="item" effect="dark" content="Delete" placement="top">
                    <el-button
                      style="float: right;"
                      type="danger"
                      size="mini"
                      @click="doShowDialogDeleteLink(selectedLink._id)"
                    >
                      <i class="mdi mdi-delete-forever"></i>
                    </el-button>
                  </el-tooltip>
                  <div class="wabalink-created">
                    Created At {{ formatDate(selectedLink.createdAt) }} |
                    <span
                      class="username"
                    >{{user.company}}</span>
                    <!-- {{selectedLink.transaction.click}} -->
                  </div>
                  <div>
                    <!-- <h3 :style="{color}">{{ selectedLink.linkName }}</h3> -->
                    <h3>{{ selectedLink.linkName }}</h3>
                  </div>
                  <div class="mb-10">
                    <a
                      target="_blank"
                      class="wabalink-original-url"
                      href
                    >{{ selectedLink.originalUrl }}</a>
                  </div>
                  <div>
                    <span>{{ selectedLink.urlCode }}</span>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      v-bind:href="selectedLink.shortUrl"
                      @click="doGetUrlList()"
                      class="mr-10 wabalink-short-url"
                    >{{ selectedLink.shortUrl }}</a>&nbsp;
                    <!-- <el-button type="primary" size="mini">Copy</el-button>
                    <el-button type="warning" size="mini">Share</el-button>-->
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="Edit Wabalink"
                      placement="bottom"
                    >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="doShowDialogEditLink(selectedLink._id)"
                      >
                        <span class="mdi mdi-pencil align-vertical-middle"></span>
                      </el-button>
                    </el-tooltip>
                  </div>
                  <hr class="hr-custom mt-25" />
                  <div class="mt-25 mb-30">
                    <span class="totaly">{{ selectedLink.clicked }}</span>&nbsp;
                    <i class="mdi mdi-google-analytics"></i>
                    <br />
                    <span class="total-clicks">TOTAL CLICKS</span>
                  </div>

                  <div v-if="selectedLink.clicked==0"></div>
                  <div v-else>
                    <div>
                      <p style="font-weight: bold; font-size: 12px;">Location</p>
                      <div
                        v-for="(d, k) in linkTrx"
                        :key="k"
                        :class="{'active' : selectedLink._id}"
                      >
                        <span v-if="d.country==null" style="font-size: 12px;">Unknown {{ d.click }}</span>
                        <span v-else style="font-size: 12px;">{{d.country}} {{ d.click }}</span>
                      </div>
                      <br />
                      <center>
                        <div
                          style="margin: 0 auto; position: absolute; width: 100%; font-size: 12px;"
                          class="pt-105"
                        >
                          {{selectedLink.clicked}}
                          <br />Total Clicks
                        </div>
                      </center>
                    </div>
                    <center>
                      <div style="display: block; margin:0 auto; position: relative;">
                        <component
                          :is="asyncComponent"
                          :type="'pie'"
                          :options="{ 'fill': ['#249393'], width: 250, height:250,  'innerRadius': 88, 'radius': 40 }"
                          :data="linkTrx.toString()"
                        />
                      </div>
                    </center>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>


<script>
import api from "@/networkClient";
import config from "@/config";
import store from "@/store";
import _ from "lodash";
import moment from "moment-timezone";
import Chart from "vue-bulma-chartjs";
import V_Echarts from "../directives/echarts";
const randomColor = require("randomcolor"); // import the script
const color = randomColor();
// console.log(color)

export default {
  // components: {
  // 	'chart': Chart
  // },

  directives: {
    echarts: V_Echarts
  },

  data() {
    return {
      limits: "",
      color: color,
      asyncComponent: "peity",
      showAlertSubscribe: false,
      data: {
        labels: ["Sleeping", "Designing", "Coding", "Cycling"],
        datasets: [
          {
            data: [1, 2],
            backgroundColor: [
              "#1fc8db",
              "#fce473",
              "#42afe3",
              "#ed6c63",
              "#97cd76"
            ]
          }
        ]
      },
      options: {
        segmentShowStroke: false
      },
      checked: "",
      localBaseUrl: config.shortUrl,
      dialogFormAddLink: false,
      dataLink: [],
      dataLinkTrx: [],
      dataTrx: [],
      url: {
        country: ""
      },
      linkId: 0,
      totalLink: "",
      buttonAddLinkLoader: false,
      buttonUpdateLinkLoader: false,
      buttonDeleteLinkLoader: false,
      linkLoader: false,
      dialogEditLink: false,
      dialogDeleteLink: false,
      visible: false,
      selectedLinkToUpdate: "",
      selectedLinkToDelete: "",
      selectedLink: {},
      linkTrx: [],
      links: [{ link_id: 0 }],
      datas: {
        id: "",
        title: "",
        urlCode: "",
        customCode: "",
        shortLink: "",
        totalClick: 0,
        trxlength: ""
      },
      form: {
        linkName: "",
        originalUrl: ""
      },
      linkName: "",
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
      return moment(str).format("DD-MM-YYYY HH:mm:ss");
    },

    doShowDialogEditLink(key) {
      // console.log(this.dataLink);
      // this.selectedLinkToUpdate = this.dataLink[0]
      this.dialogEditLink = true;
      this.selectedLinkToUpdate = this.selectedLink._id;
      this.shortLink = this.selectedLink.shortUrl;
      this.linkName = this.selectedLink.linkName;
      this.datas.urlCode = this.selectedLink.urlCode;
      // console.log(this.datas.id);
    },

    doShowDialogDeleteLink(key) {
      this.dialogDeleteLink = true;
      this.selectedLinkToDelete = this.selectedLink._id;
      this.shortLink = this.selectedLink.shortUrl;
      this.linkName = this.selectedLink.linkName;
      this.datas.urlCode = this.selectedLink.urlCode;
    },

    async doGetUrlList() {
      var token = this.user.token;
      this.linkLoader = true;
      await api({
        method: "get",
        url: config.baseApi + "url/list",
        header: {
          "api-key": store.getters.token
        }
      })
        .then(result => {
          if (result.data.ec == 200) {
            this.showAlertSubscribe = false;
            this.dataLinkTrx = result.data.data;
            this.totalLink = result.data.data.length;
            this.dataLink = result.data.data;
            this.selectedLink = this.dataLink[0];
            this.linkTrx = this.selectedLink.transaction;
          } else if (
            result.data.ec == 400 &&
            result.data.message == "not_subscribe"
          ) {
            this.showAlertSubscribe = true;
          } else {
            this.showAlertSubscribe = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.linkLoader = false;
    },

    async doGetTransaction() {
      var token = this.user.token;
      this.linkLoader = true;
      await api({
        method: "get",
        url: config.baseApi + "url/transaction",
        header: {
          "api-key": store.getters.token
        }
      })
        .then(result => {
          this.datas.trxlength = result.data.data.length;
          this.dataTrx = result.data.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.linkLoader = false;
    },

    async doAddShortUrl() {
      if (this.form.linkName == "" || this.form.originalUrl == "") {
        this.$message({
          showClose: true,
          message: "Oops, all field is required",
          type: "error"
        });
      } else {
        if (this.totalLink == this.limits) {
          this.$message({
            showClose: true,
            message:
              "Oops, You have reached the limit, please delete data that You do not use",
            type: "error"
          });
        } else {
          this.buttonAddLinkLoader = true;
          await api({
            method: "post",
            url: config.baseApi + "url/add",
            data: {
              linkName: this.form.linkName,
              originalUrl: this.form.originalUrl
            }
          })
            .then(result => {
              if (result.data.ec == 200) {
                this.linkLoader = true;
                this.$message({
                  showClose: true,
                  message: "New short url has been saved",
                  type: "success"
                });
                this.clear();
                this.dialogFormAddLink = false;
                this.doGetUrlList();
              } else {
                this.$message({
                  showClose: true,
                  message: "Failed. Please check your URL",
                  type: "error"
                });
                // this.clear()
              }
            })
            .catch(error => {
              console.log(error);
            });
          this.buttonAddLinkLoader = false;
          this.linkLoader = false;
        }
      }
    },

    async doUpdateCode() {
      if (this.datas.customCode == "") {
        this.$message({
          showClose: true,
          message: "Oops, customize code cannot empty",
          type: "error"
        });
        // this.$swal({type: 'error', title: this.$t('error'), text: 'Code cannot empty',})
        // this.dialogEditLink = false
      } else {
        this.buttonUpdateLinkLoader = true;
        var id = this.selectedLinkToUpdate;
        await api({
          method: "post",
          url: config.baseApi + "url/update/" + id,
          data: {
            linkName: this.datas.title ? this.datas.title : this.linkName,
            customCode: this.datas.customCode
          }
        })
          .then(result => {
            this.linkLoader = true;
            // console.log(result.data.ec);
            if (result.data.ec != 200) {
              // this.$notify.error({
              // 	title: 'Error',
              // 	message: 'This wabalink is taken',
              // 	position: 'top-center'
              // });
              this.$message({
                showClose: true,
                message: "Oops, This wabalink is taken.",
                type: "error"
              });
              // this.$swal({type: 'error', title: this.$t('error'), text: 'This wabalink is taken.',})
              this.clear();
              // this.dialogEditLink = false
            } else {
              // this.$swal({type: 'success', title: this.$t('success'), text: '',})
              this.$message({
                showClose: true,
                message: "Customize code has been changed",
                type: "success"
              });
              this.clear();
              this.doGetUrlList();
              this.dialogEditLink = false;
            }
          })
          .catch(error => {
            console.log(error);
          });
        this.buttonUpdateLinkLoader = false;
        this.linkLoader = false;
      }
    },

    async doDeleteUrl() {
      this.buttonDeleteLinkLoader = true;
      var id = this.selectedLinkToDelete;
      // console.log(id)
      await api({
        method: "post",
        url: config.baseApi + "url/delete/" + id,
        data: {
          linkName: this.linkName
        }
      })
        .then(result => {
          // console.log(result.data.ec);
          if (result.data.ec != 200) {
            this.$swal({ type: "error", title: this.$t("error"), text: "" });
            this.clear();
            this.dialogDeleteLink = false;
          } else {
            this.linkLoader = true;
            this.$swal({
              type: "success",
              title: this.$t("success"),
              text: ""
            });
            this.clear();
            this.dialogDeleteLink = false;
            this.doGetUrlList();
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.buttonDeleteLinkLoader = false;
      this.linkLoader = false;
    },

    async getCountOfProductShorten() {
      this.linkLoader = true;
      var customer_id = this.user.customer_id;
      await api({
        method: "get",
        url: config.baseApi + "url/additional-service/" + customer_id,
        header: {
          "api-key": store.getters.token
        }
      })
        .then(result => {
          // console.log('result',result.data)
          this.limits = result.data.data.product[0].count;
          // console.log("Limit for "+customer_id+":"+this.limits);
        })
        .catch(error => {
          console.log(error);
        });
      this.linkLoader = false;
    },

    clear() {
      this.form.originalUrl = "";
      this.form.linkName = "";
      this.datas.title = "";
      this.datas.linkName = "";
      this.datas.customCode = "";
    },

    openLink(data) {
      this.linkId = data._id;
      this.dataLink = [];
      this.doGetUrlList();
    }
  },
  computed: {},
  async mounted() {
    await this.doGetUrlList();
    await this.getCountOfProductShorten();
    // await this.doGetTransaction()
    // await this.renderChart()
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";

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
  font-size: 12px;
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
</style>