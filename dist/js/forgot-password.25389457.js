(window.webpackJsonp=window.webpackJsonp||[]).push([["forgot-password"],{"06cc":function(t,a,e){"use strict";e("efc7")},"5c70":function(t,a,e){},8011:function(t,a,e){"use strict";e.r(a);var s,r=(e("96cf"),e("3b8d")),i=e("271f"),o=e("db49"),n={name:"ForgotPassword",data:function(){return{form:{email:"",password:""},btnLoading:!1}},methods:{emailValid:function(t){return/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(t)},reset:function(){},sendLink:(s=Object(r.a)(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(null==this.form.email||""==this.form.email)return this.$swal({title:this.$t("error"),text:this.$t("forgot_password.request_email"),type:"warning"}),t.abrupt("return");t.next=3;break;case 3:if(0==this.emailValid(this.form.email))return this.$swal({title:this.$t("error"),text:this.$t("forgot_password.email_not_vaild"),type:"warning"}),t.abrupt("return");t.next=6;break;case 6:return this.btnLoading=!0,t.next=9,Object(i.a)({method:"post",url:o.a.baseApi+"auth/forgot-password",data:{email:this.form.email}}).then(function(a){e.$swal({title:200==a.data.ec?e.$t("success"):e.$t("error"),text:e.$t("forgot_password.".concat(a.data.message)),type:200==a.data.ec?"success":"warning"}).then(function(t){200==a.data.ec&&e.$router.push("/login")})}).catch(function(t){e.$swal({title:e.$t("error"),text:e.$t("error_text"),type:"warning"})});case 9:this.btnLoading=!1;case 10:case"end":return t.stop()}},t,this)})),function(){return s.apply(this,arguments)})}},r=(e("e860"),e("06cc"),e("2877")),n=Object(r.a)(n,function(){var a=this,t=a.$createElement,t=a._self._c||t;return t("div",{staticClass:"scrollable only-y forgot-password-page align-vertical"},[t("div",{staticClass:"form-wrapper align-vertical-middle"},[t("div",{staticClass:"form-box card-base card-shadow--extraLarge"},[t("el-row",{staticClass:"no-p no-m",attrs:{gutter:30}},[t("el-col",{staticClass:"tab-invert bg-primary p-30",attrs:{xs:24,sm:24,md:24,lg:24,xl:24}},[t("img",{staticClass:"image-logo",attrs:{src:e("9d64"),alt:"logo"}})]),t("el-col",{staticClass:"p-30",attrs:{xs:24,sm:24,md:24,lg:24,xl:24}},[t("h1",{staticClass:"mt-0 mb-10"},[a._v(a._s(a.$t("forgot_password.forgot_password")))]),t("p",{staticClass:"pb-30"},[a._v(a._s(a.$t("forgot_password.request_email")))]),t("float-label",{staticClass:"styled"},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.form.email,expression:"form.email"}],attrs:{required:"",type:"email",placeholder:"E-mail"},domProps:{value:a.form.email},on:{input:function(t){t.target.composing||a.$set(a.form,"email",t.target.value)}}})]),t("div",{staticClass:"flex text-center center pt-30 pb-20"},[t("el-button",{staticClass:"send-btn tada animated",attrs:{loading:a.btnLoading,round:""},on:{click:a.sendLink}},[a._v(" "+a._s(a.$t("forgot_password.send_link"))+" ")])],1)],1)],1)],1)])])},[],!1,null,"ab6b0c94",null);a.default=n.exports},e860:function(t,a,e){"use strict";e("5c70")},efc7:function(t,a,e){}}]);