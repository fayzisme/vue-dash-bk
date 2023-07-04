<template>
  <el-menu
    :default-active.sync="activeLink"
    :mode="mode"
    @select="goto"
    :collapse="isCollapse"
    :unique-opened="true"
    background-color="transparent"
    class="main-navigation-menu"
    :class="{'nav-collapsed':isCollapse}"
  >
    <div class="el-menu-item-group__title" style="padding-top: 4px;">
      <span>{{ $t("menu.menu") }}</span>
    </div>
    <el-menu-item index="/dashboard">
      <span class="icon icon-ic_home"></span>
      <span slot="title">{{ $t("menu.dashboard") }}</span>
    </el-menu-item>
    <el-submenu index="whatsapp" v-if="inRole('whatsapp')" popper-class="main-navigation-submenu">
      <template slot="title">
        <i class="mdi mdi-whatsapp"></i>
        <span>{{ $t("menu.whatsapp") }}</span>
      </template>
      <el-menu-item index="/whatsapp">
        <span slot="title">Notification</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/media">
        <span slot="title">Media</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/api">
        <span slot="title">Numbers</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/status">
        <span slot="title">Status</span>
      </el-menu-item>
      <el-menu-item v-if="$store.getters.isPic == true" index="/whatsapp/profile">
        <span slot="title">Profile</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/overview">
        <span slot="title">Overview</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/schedule">
        <span slot="title">Schedule</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/inquiry">
        <span slot="title">Inquiry</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/report">
        <span slot="title">Report</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/request_template">
        <span slot="title">Request Template</span>
      </el-menu-item>
      <el-menu-item index="/whatsapp/generate_qr">
        <span slot="title">Generate QR Code</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/telegram">
      <span class="mdi mdi-telegram"></span>
      <span slot="title">{{ $t("menu.telegram") }}</span>
    </el-menu-item>
    <el-menu-item index="/link">
      <span class="mdi mdi-link"></span>
      <span slot="title">{{ $t("menu.link") }}</span>
    </el-menu-item>
    <!-- <el-menu-item index="/email-integration" v-if="inRole('email-integration')">
			<span class="mdi mdi-email-outline"></span>
			<span slot="title">{{ $t("menu.email") }}</span>
    </el-menu-item>-->
    <!-- <el-menu-item index="/helpdesk/chat/whatsapp" v-if="inRole('helpdesk') && $store.getters.isPic == false">
      <span class="mdi mdi-headset"></span>
      <span slot="title">{{ $t("menu.helpdesk") }}</span>
    </el-menu-item> -->
    <el-submenu
      index="helpdesk"
      v-if="inRole('helpdesk') && $store.getters.isPic == false"
      popper-class="main-navigation-submenu"
    >
      <template slot="title">
        <span class="mdi mdi-headset"></span>
        <span slot="title">{{ $t("menu.helpdesk") }}</span>
      </template>
      <el-submenu index="#chat">
        <span slot="title">Chat</span>
          <el-menu-item index="/helpdesk/chat/whatsapp">
            <i class="mdi mdi-whatsapp"></i>
            <span slot="title">WhatsApp</span>
          </el-menu-item>
          <el-menu-item index="/helpdesk/chat/telegram">
            <i class="mdi mdi-telegram"></i>
            <span slot="title">Telegram</span>
          </el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu
      index="helpdesk"
      v-if="inRole('helpdesk') && $store.getters.isPic == true"
      popper-class="main-navigation-submenu"
    >
      <template slot="title">
        <span class="mdi mdi-headset"></span>
        <span slot="title">{{ $t("menu.helpdesk") }}</span>
      </template>
      <el-submenu index="#chat">
        <span slot="title">Chat</span>
          <el-menu-item index="/helpdesk/chat/whatsapp">
            <i class="mdi mdi-whatsapp"></i>
            <span slot="title">WhatsApp</span>
          </el-menu-item>
          <el-menu-item index="/helpdesk/chat/telegram">
            <i class="mdi mdi-telegram"></i>
            <span slot="title">Telegram</span>
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="/helpdesk/report">
        <span slot="title">Report</span>
      </el-menu-item>
      <el-submenu index="#">
        <span slot="title">Configuration</span>
        <el-menu-item index="/helpdesk/preferences">
          <span slot="title">General</span>
        </el-menu-item>
        <el-menu-item index="/helpdesk/preferences/integration">
          <span slot="title">Integration</span>
        </el-menu-item>
        <el-menu-item index="/helpdesk/preferences/auto-responder">
          <span slot="title">Auto Responder</span>
        </el-menu-item>
        <el-menu-item index="/helpdesk/preferences/quick-reply">
          <span slot="title">Quick Reply</span>
        </el-menu-item>
      </el-submenu>
    </el-submenu>

    <!-- <el-menu-item index="/sms" v-if="inRole('sms')">
			<span class="icon icon-ic_sms"></span>
			<span slot="title">{{ $t("menu.sms") }}</span>
    </el-menu-item>-->
    <!-- <el-submenu index="h2h" popper-class="main-navigation-submenu" v-if="inRole('papaya') || inRole('billler') || inRole('ecash')">
			<template slot="title">
				<i class="mdi mdi-wallet-membership"></i><span>{{ $t("menu.h2h.h2h") }}</span>
			</template>
			<el-menu-item index="/h2h/papaya" v-if="inRole('papaya')">
				<span slot="title">{{ $t("menu.h2h.papaya") }}</span>
			</el-menu-item>
			<el-menu-item index="/h2h/biller" v-if="inRole('biller')">
				<span slot="title">{{ $t("menu.h2h.biller") }}</span>
			</el-menu-item>
			<el-menu-item index="/h2h/ecash" v-if="inRole('ecash')">
				<span slot="title">{{ $t("menu.h2h.ecash") }}</span>
			</el-menu-item>
    </el-submenu>-->
    <el-menu-item index="/billing" v-if="inRole('billing')">
      <span class="mdi mdi-cash-usd"></span>
      <span slot="title">{{ $t("menu.billing") }}</span>
    </el-menu-item>
    <el-menu-item index="/contacts" v-if="inRole('contact')">
      <span class="icon icon-ic_contact"></span>
      <span slot="title">{{ $t("menu.contacts") }}</span>
    </el-menu-item>
    <el-menu-item :index="config.documentation">
      <span class="icon icon-ic_developer"></span>
      <span slot="title">{{ $t("menu.integration") }}</span>
    </el-menu-item>
    <!-- <el-menu-item index="/user-management">
			<span class="mdi mdi-account-multiple-outline"></span>
			<span slot="title">{{ $t("menu.usermanagement") }}</span>
    </el-menu-item>-->
  </el-menu>
</template>


<script>
import { detect } from "detect-browser";
import config from "../config";
import store from "@/store";
const browser = detect();

export default {
  name: "Nav",
  props: ["mode", "isCollapse"],
  data() {
    return {
      isIe: true,
      isEdge: true,
      activeLink: null,
      config: config,
      allowedRole: store.getters.allowedRole
    };
  },
  methods: {
    goto(index, indexPath) {
      if (index.charAt(0) === "/") {
        this.$router.push(index);
        this.$emit("push-page", { page: index });
      } else {
        window.open(index, "_blank");
      }
    },
    setLink(path) {
      this.activeLink = path;
    },
    inRole(val) {
      if (_.indexOf(this.allowedRole, val) !== -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if (browser.name !== "ie") this.isIe = false;
    if (browser.name !== "edge") this.isEdge = false;

    this.setLink(this.$router.currentRoute.path);
    this.$router.afterEach((to, from) => {
      this.setLink(this.$router.currentRoute.path);
      //console.log('afterEach', to, from)
    });
    //console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
  },
  mounted() {
    //console.log('nav component mounted')
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";

.el-menu {
  border: none;
}
.el-menu::before,
.el-menu::after {
  display: none;
}
.el-submenu,
.el-menu-item {
  .mdi {
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }
}
</style>

<style lang="scss">
@import "../assets/scss/_variables";

.main-navigation-menu {
  transition: width 0.5s;

  &:not(.el-menu--collapse) {
    .el-submenu__title,
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      background-color: transparent !important;
    }

    &:not(.el-menu--horizontal) {
      .el-menu-item,
      .el-submenu {
        position: relative;

        &::before {
          content: "";
          display: block;
          width: 0px;
          height: 1px;
          position: absolute;
          bottom: 10px;
          left: 30px;
          background: $text-color;
          z-index: 1;
          opacity: 0;
          transition: all 0.7s cubic-bezier(0.55, 0, 0.1, 1);
        }
        &:hover {
          &::before {
            width: 100px;
            opacity: 1;
            //left: 50px;
            transform: translate(20px, 0);
          }
        }

        &.is-active {
          &::before {
            background: $text-color-accent;
          }
        }
      }
    }

    .el-submenu.is-opened {
      //background: /#edf1f6 !important;
      //background: rgba(223, 228, 234, 0.38) !important;
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 2px;
        position: absolute;
        top: 40px;
        bottom: 10px;
        left: 31px;
        background: $text-color;
        z-index: 1;
      }

      &::before {
        display: none;
      }

      .el-menu-item,
      .el-submenu {
        &::before,
        &::after {
          display: none;
        }
      }
    }

    .el-menu-item-group__title {
      padding: 15px 0 0px 20px;
      color: transparentize($text-color, 0.65);
    }
  }

  .el-submenu__title,
  .el-menu-item:not(.is-active) {
    color: $text-color;

    i {
      color: $text-color;
    }
  }

  &.el-menu--collapse {
    .el-menu-item-group__title {
      padding: 15px 0 0px 0px;
      width: 100%;
      text-align: center;
    }

    .el-submenu__title:hover,
    .el-menu-item:hover {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
  }

  &.el-menu--horizontal {
    white-space: nowrap;
    /*width: fit-content;
		width: max-content;*/
    overflow: hidden;
    display: table;

    & > * {
      float: inherit !important;
    }
  }

  &.nav-collapsed {
    .el-menu-item,
    .el-submenu__title {
      & > span {
        display: none;
      }
    }
  }
}

.main-navigation-submenu {
  .el-menu {
    background: #fff !important;

    .el-menu-item:not(.is-active) {
      color: $text-color;
    }
    .el-menu-item:hover {
      background-color: transparentize($background-color, 0.3) !important;
    }
  }
}
</style>
