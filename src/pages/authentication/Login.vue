<template>
  <div class="scrollable only-y login-page align-vertical">
    <div class="form-wrapper align-vertical-middle">
      <div class="form-box card-base card-shadow--extraLarge">
        <el-row :gutter="30" class="no-p no-m">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="tab-invert bg-primary p-30">
            <img class="image-logo" src="@/assets/images/logo.png" alt="logo" />
            <template v-if="windowWidth>=992">
              <p class="text-center white-text pt-120">{{ $t("login.not_have_account") }}</p>
              <div class="text-center pb-160">
                <el-button
                  round
                  class="accent-text mt-20"
                  @click="register"
                >{{ $t("register.register") }}</el-button>
              </div>
            </template>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="p-30">
            <h1 class="mt-0 mb-10">{{ $t("login.login") }}</h1>
            <p class="pb-30">{{ $t("login.request_field") }}</p>
            <p class="pb-30">
              <el-alert
                v-if="errorLogin"
                title="Failed"
                type="error"
                description="more text description"
                show-icon
              ></el-alert>
            </p>
            <form action @submit.prevent="login" :rules="rules" ref="loginForm">
              <float-label class="styled">
                <input
                  type="text"
                  required
                  v-model="form.email"
                  id="form-email"
                  placeholder="Username / E-mail"
                />
              </float-label>
              <float-label class="styled">
                <input
                  type="password"
                  required
                  v-model="form.password"
                  id="form-password"
                  placeholder="Password"
                />
              </float-label>

              <div class="flex">
                <div class="box grow text-right">
                  <router-link to="/forgot-password">{{ $t("forgot_password.forgot_password") }}</router-link>
                </div>
              </div>

              <div class="flex text-center center pt-30 pb-10">
                <g-recaptcha
                  :data-sitekey="sitekey"
                  :data-validate="validate"
                  :data-callback="callback"
                  :data-btn-class="'el-button is-round login-btn tada animated' + (loadingLogin ? ' is-loading' : '')"
                >
                  <i class="el-icon-loading" v-if="loadingLogin"></i>
                  {{ $t("login.login") }}
                </g-recaptcha>
                <!-- <el-button :loading="loadingLogin" round native-type="submit" class="login-btn tada animated" id="submit-form">
									{{ $t("login.login") }}
                </el-button>-->
              </div>
            </form>
            <!-- <div style="text-align: center;">
              <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 23px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; height: 40px; padding: 0 24px;">Login with Facebook</button>
            </div> -->
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
            class="tab-invert bg-primary p-30"
            v-if="windowWidth<992"
          >
            <p class="text-center white-text no-m">{{ $t("login.not_have_account") }}</p>
            <div class="text-center">
              <el-button
                round
                class="accent-text mt-20"
                @click="register"
              >{{ $t("register.register") }}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import gRecaptcha from "@finpo/vue2-recaptcha-invisible";
import api from "@/networkClient";
import config from "@/config";
import Axios from 'axios';
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });
const pub = key.importKey(config.privateKey, "pkcs1-public-pem");
const ipify = require('ipify2');

export default {
  name: "Login",
  components: {
    gRecaptcha
  },
  data() {
    return {
      ip_pub_client: '',
      sitekey: config.recaptcha.sitekey,
      form: {
        email: "",
        password: ""
      },
      errorLogin: false,
      loadingLogin: false,
      windowWidth: window.innerWidth,
      rules: {
        email: [
          {
            required: true,
            message: "Please input email or username",
            trigger: "blur"
          },
          { min: 5, message: "Character length too short", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async login(token) {
      this.loadingLogin = true;
      await api({
        method: "post",
        url: config.baseApi + "auth/login",
        data: {
          email: this.form.email,
          password: pub.encrypt(this.form.password, "base64"),
          token: token,
          ip_pub : this.ip_pub_client
        },
        timeout: 10 * 1000
      })
        .then(response => {
          if (response.data.ec == 200) {
            let userData = response.data.data
            userData.ip_pub = this.ip_pub_client
            this.$store.commit("setLogin", userData);
            // console.log("masuk", response);
            this.$router.push("/dashboard");
            // console.log("masuk", response);
          } else {
            this.$message.error({
              showClose: false,
              message: this.$t(`login.${response.data.message}`)
            });
          }
        })
        .catch(error => {
          this.$message.error({
            showClose: false,
            message: this.$t(`error_text`),
            type: "error"
          });
        });
      this.loadingLogin = false;
      // this.$router.push('dashboard')
    },
    async getIpUser(){
      // fetch('https://api64.ipify.org?format=json')
      // .then(x => x.json())
     let ip = await ipify.ipv4()
      if (ip) {
          this.ip_pub_client = ip
        //  console.log('ip pub:', ip);
      }
      else {
        let ip2 = await ipify.ipv64()
        if(ip2){
          this.ip_pub_client = ip2
        }
        else {
          this.callback()
        }
      }
    },
    register() {
      this.$router.push("register");
    },
    validate() {
      // validate your form , if you don't have validate prop , default validate pass .
      this.loadingLogin = true;
      if (_.isEmpty(this.form.email) && _.isEmpty(this.form.password)) {
        this.$message.error({
          showClose: false,
          message: this.$t(`login.invalid_parameter`)
        });
        this.loadingLogin = false;
        return false;
      } else {
        return true;
      }
    },
    async callback(token) {
      // google recaptcha token , then you can pass to backend with your form data .
      // console.log(token)
      if (token) {
        this.login(token);
        // alert(token);
      } else {
        // if you use data-size show reCAPTCHA , maybe you will get empty token.
        alert("Please check you are not robot");
      }
    }
  },
  async mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
    this.ip_pub_client = ''
    await this.getIpUser()
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/_variables";

.login-page {
  background: rgb(74, 197, 197);
  background: linear-gradient(
    53deg,
    rgba(74, 197, 197, 1) 0%,
    rgba(36, 147, 147, 1) 100%
  );
  margin-left: -30px;
  margin-right: -30px;

  .form-wrapper {
    width: 100%;
  }

  .form-box {
    width: 100%;
    max-width: 800px;
    // padding: 30px;
    box-sizing: border-box;
    margin: 20px auto;

    a {
      font-size: 14px;
      color: $text-color-accent;
      text-decoration: none;
      font-weight: 500;
    }

    .image-logo {
      width: 200px;
      // margin: 0px auto;
      // margin-bottom: 30px;
      display: block;
    }

    .login-btn {
      width: 160px;
      background-color: $text-color-accent;
      color: white;

      &:hover {
        opacity: 0.9;
      }
    }

    .signin-box {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .layout-container .container .view.login-page {
    margin-left: -5px;
    margin-right: -5px;
    max-width: calc(100% + 10px);
  }
}

@media (max-width: 992px) {
  .form-box {
    max-width: 400px !important;
  }
}
</style>


<style lang="scss" scoped>
.el-col {
  padding-left: 30px !important;
  padding-right: 30px !important;
}
.tab-invert {
  height: 100%;
}
.white-text {
  color: white;
}
</style>
