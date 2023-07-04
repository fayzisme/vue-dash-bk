<template>
  <div class="scrollable only-y" v-loading="tokenLoader">
    <div class="page-header">
      <h1>Number Status</h1>
    </div>

    <el-card v-if="showAlertMessage" align="center" style="margin-bottom: 1em">
      <h2>Start messaging your customers today</h2>
      <span v-html="$t('promote.desc.whatsapp')"></span>
      <br />
      <br />
      <span>
        <el-button @click="mailto()">Send us e-mail</el-button>
      </span>
      <div v-if="customer_type==2 && businessId==undefined || businessId==''" style="margin: 0 0 20px;">
        <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px; margin-top: 20px;">Connect to Facebook</button>
      </div>
    </el-card>

    <el-card
      v-if="showFormMessage"
      v-loading="loadingCredential"
      style="margin-bottom: 1em"
      class="1024-card"
    >
      <el-table
        :data="phoneNumbers"
        style="width: 100%; color: #000 !important"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(246, 246, 245, 0.8)"
      >
        <el-table-column prop="verified_name" label="Name" />
        <!-- <el-table-column prop="quality_score" label="Quality Score">
          <template slot-scope="scope">
            <span v-for="item in scope.row.quality_score" :key="item">
              <span v-if="item=='GREEN'" type="default" size="small">
                <i style="color:green;" class="mdi mdi-brightness-1"></i> High
              </span>
              <span v-else-if="item=='RED'" type="default" size="small">
                <i style="color:red;" class="mdi mdi-brightness-1"></i> Low 
                <el-tooltip placement="top">
                  <div slot="content">{{ item.reason }}</div>
                  <i class="mdi mdi-alert"></i>
                </el-tooltip>
              </span>
              <span v-else-if="item=='YELLOW'" type="default" size="small">
                <i style="color:yellow;" class="mdi mdi-brightness-1"></i> Medium 
                <el-tooltip placement="top">
                  <div slot="content">{{ item.reason }}</div>
                  <i class="mdi mdi-alert"></i>
                </el-tooltip>
              </span>
              <span v-if="phoneNumbers.find(v => v.quality_score == '')" type="default" size="small">
                <i style="color:grey;" class="mdi mdi-brightness-1"></i> Unavailable
              </span>
            </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="quality_rating" label="Quality Rating">
          <template slot-scope="scope">
            <span v-if="scope.row.quality_rating=='GREEN'" type="default" size="small">
              <el-tag type="success">
                <span v-if="scope.row.quality_score.score == 'GREEN'">
                  <i style="color:green;" class="mdi mdi-brightness-1"></i> High
                </span>
              </el-tag>
            </span>
            <span v-else-if="scope.row.quality_rating=='YELLOW'" type="default" size="small">
              <el-tag type="success">
                <span v-if="scope.row.quality_score.score == 'YELLOW'">
                  <el-tooltip placement="top">
                    <div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 250px;">{{ scope.row.quality_score.reason }}</div>
                    <i style="color:yellow;" class="mdi mdi-brightness-1"></i>
                  </el-tooltip>
                  Medium
                </span>
              </el-tag>
            </span>
            <span v-else-if="scope.row.quality_rating=='RED'" type="default" size="small">
              <el-tag type="success">
                <span v-if="scope.row.quality_score.score == 'RED'">
                  <el-tooltip placement="top">
                    <div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 250px;">{{ scope.row.quality_score.reason }}</div>
                    <i style="color:red;" class="mdi mdi-brightness-1"></i>
                  </el-tooltip>
                  Low
                </span>
              </el-tag>
            </span>
            <span v-else type="default" size="small">
              <el-tag type="info">
                <i style="color:grey;" class="mdi mdi-brightness-1"></i> Unavailable
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="display_phone_number" label="Phone Number" />
      </el-table>
    </el-card>
    <el-card v-if="showAlertError" style="margin-bottom: 1em">
      <error-gope-siji />
    </el-card>
  </div>
</template>
<script>
import api from "@/networkClient";
import config from "@/config";
import store from "@/store"

export default {
  data() {
    return {
      businessId: '',
      customer_type: store.getters.customer_type,
      loadingbtnUpdate: false,
      loadingCredential: false,
      token: "",
      selectedPhoneNumber: "",
      whatsapp_number: [],
      tokenLoader: true,
      dataTable: [],
      showFormMessage: false,
      showAlertMessage: false,
      showAlertError: false,
      showAlertErrorLoadCredential: false,
      data: {
        phoneNumber: "",
        token: "",
        webhook: "",
        helpdesk: true
      },
      phoneNumbers: []
    };
  },
  methods: {
    async checkBusinessId(){
			await api({
				method: 'get',
				url: 'bussiness/checkBusinessId',
			}).then(result => {
				if(result.data.ec != 200 && result.data.message == "not_subscribe"){
					this.showAlertMessage = true
				} else {
					this.businessId = result.data.dataString
					console.log('bus id',this.businessId)
				}
			}).catch(error => {
			})	
		},

    async getPhoneNumber(view) {
      this.loadingCredential = true;
      this.showAlertErrorLoadCredential = false;
      await api({
        method: "get",
        url: "bussiness/phone-number",
        params: {
					view: view == true ? true : null
				},
      })
        .then(result => {
          if (result.data.ec == 200) {
            this.phoneNumbers = result.data.data.data;
          } else if (result.data.ec == 400) {
            this.showAlertErrorLoadCredential = true;
          }
          this.loadingCredential = false;
        })
        .catch(error => {
          this.showAlertErrorLoadCredential = true;
          this.loadingCredential = false;
        });
    },

    async updateCredential() {
      this.$confirm("Are you sure want to update your webhook?", "Confirm", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
        center: true
      })
        .then(async () => {
          this.loadingbtnUpdate = true;
          await api({
            method: "patch",
            url: "user/detail/credential",
            data: {
              number: this.selectedPhoneNumber,
              url: this.data.webhook
            }
          })
            .then(resp => {
              if (resp.data.ec == 200) {
                this.$swal(this.$t("success"), undefined, "success").then(
                  () => {
                    this.loadCredential();
                  }
                );
              } else {
                this.$swal(
                  this.$t("error"),
                  this.$t(`generic.failed_update`),
                  "warning"
                );
              }
            })
            .catch(err => {
              this.$swal(this.$t("error"), this.$t(`error_text`), "error");
            });
          this.loadingbtnUpdate = false;
        })
        .catch(cancel => {});
    },
    mailto() {
      location.href = "mailto: business.solution@damcorp.id";
    },
    changeFilter() {
      this.loadCredential();
    },
    async loadWa() {
      await api({
        method: "post",
        url: "user/detail/number",
        data: {
          channels: "whatsapp"
        }
      })
        .then(result => {
          if (result.data.ec == 200) {
            this.whatsapp_number = result.data.data;
            this.selectedPhoneNumber = this.whatsapp_number[0];
            this.showFormMessage = true;
          } else if (
            result.data.ec == 400 &&
            result.data.message == "not_subscribe"
          ) {
            this.showAlertMessage = true;
          } else if (result.data.ec == 500) {
            this.showAlertError = true;
          }
          this.tokenLoader = false;
        })
        .catch(error => {
          this.showAlertError = true;
          this.tokenLoader = false;
        });
    }
  },
  async mounted() {
    await this.checkBusinessId()
    this.customer_type
    await this.loadWa();
    await this.getPhoneNumber(true);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables";

// CUSTOMIZE ON 1024px
@media (max-width: 1024px) {
  .el-col-md-4 {
    width: 23%;
  }

  .el-col-md-20 {
    width: 77%;
  }
  h5 {
    width: 140px;
  }
}
// FINISH
</style>