<template>
  <div class="scrollable only-y" v-loading="tokenLoader">
    <div class="page-header">
      <h1>{{ $t("whatsapp.whatsapp") }} Numbers</h1>
    </div>
     <!-- <div v-if="customer_type==2 && businessId==undefined || businessId==''" style="margin: 0 0 20px;">
      <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Connect to Facebook</button>
    </div> -->
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

    <div v-if="customer_type==1" style="margin: 0 0 20px;">
      <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Connect to Facebook</button>
    </div>

    <el-card
      v-if="showFormMessage"
      v-loading="loadingCredential"
      style="margin-bottom: 1em"
      class="1024-card"
    >
      <el-row :gutter="30">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <h5>Phone Number</h5>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mt-10">
          <el-select
            v-model="selectedPhoneNumber"
            @change="changeFilter"
            :default-first-option="true"
          >
            <el-option v-for="item in whatsapp_number" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-if="!showAlertErrorLoadCredential" :gutter="30">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <h5>Your API Token</h5>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mt-10">
          <pre style="word-wrap: break-word; white-space: pre-wrap !important">{{ data.token }}</pre>
        </el-col>
      </el-row>
      <el-row v-if="!showAlertErrorLoadCredential" :gutter="30" class="mt-10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <h5>Your Webhook URL</h5>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mt-10">
          <el-input
            v-if="!data.helpdesk"
            type="text"
            placeholder="Webhook URL"
            v-model="data.webhook"
          ></el-input>
          <el-alert
            v-else
            type="primary"
            :title="undefined"
            description="This number currently connected to our Customer Service API"
            :closable="false"
          />
        </el-col>
      </el-row>
      <el-row v-if="!showAlertErrorLoadCredential" :gutter="30" class="mt-10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <h5>Receive Message Status</h5>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mt-10">
          <!-- <el-input
            v-if="!data.helpdesk"
            type="text"
            disabled
            placeholder="Webhook URL" 
            disabled
            v-model="data.sendStatus"
          ></el-input> -->
          <el-switch
            v-if="!data.helpdesk"
            style="display: block; margin-top: 10px"
            v-model="data.sendStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          ></el-switch>
          <el-alert
            v-else
            type="primary"
            :title="undefined"
            description="This number currently connected to our Customer Service API"
            :closable="false"
          />
        </el-col>
      </el-row>
      <el-row v-if="!showAlertErrorLoadCredential && !data.helpdesk" :gutter="30" class="mt-10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-button type="primary" :loading="loadingbtnUpdate" @click="updateCredential">
            <i class="mdi mdi-content-save" />
            {{ $t('generic.update') }}
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30" class="mb-20">
        <el-alert
          v-if="showAlertErrorLoadCredential"
          :title="$t('error')"
          :description="$t('alert_error_text')"
          type="error"
          :closable="false"
          show-icon
        ></el-alert>
      </el-row>
    </el-card>
    <el-card v-if="showAlertError" style="margin-bottom: 1em">
      <error-gope-siji />
    </el-card>
  </div>
</template>
<script>
import api from "@/networkClient";
import config from "@/config";
import store from '@/store'

export default {
  data() {
    return {
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
        sendStatus: false,
        helpdesk: true
      },
      options: [
        {
          value: "false",
          label: "False"
        },
        {
          value: "true",
          label: "True"
        }
      ]
    };
  },
  methods: {
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
              url: this.data.webhook,
              send_status: this.data.sendStatus
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
    async loadCredential() {
      this.loadingCredential = true;
      this.showAlertErrorLoadCredential = false;
      this.data = { webhook: "", token: "", helpdesk: true, sendStatus: false };
      await api({
        method: "post",
        url: "user/detail/credential",
        data: {
          number: this.selectedPhoneNumber
        }
      })
        .then(result => {
          if (result.data.ec == 200) {
            if(result.data.data.webhook.webhook[0]) {
              this.data.webhook = result.data.data.webhook.webhook[0].url
              this.data.sendStatus = result.data.data.webhook.webhook[0].send_status
            } else {
              this.data.webhook = ""
              this.data.sendStatus = false
            }
            this.data.token = result.data.data.token;
            this.data.helpdesk = result.data.data.helpdesk || false;
            this.showFormMessage = true;
          } else if (
            result.data.ec == 400 &&
            result.data.message == "not_subscribe"
          ) {
            this.showAlertErrorLoadCredential = true;
          } else if (result.data.ec == 500) {
            this.showAlertErrorLoadCredential = true;
          }
          this.loadingCredential = false;
        })
        .catch(error => {
          this.showAlertErrorLoadCredential = true;
          this.loadingCredential = false;
        });
    },
    async loadWa(view) {
      await api({
        method: "post",
        url: "user/detail/number",
        params: {
					view: view == true ? true : null
				},
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
    this.customer_type
    await this.loadWa(true);
    this.loadCredential();
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