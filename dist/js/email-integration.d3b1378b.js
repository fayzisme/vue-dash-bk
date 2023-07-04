(window.webpackJsonp=window.webpackJsonp||[]).push([["email-integration"],{"4ee4":function(e,t,r){"use strict";r.r(t);var n,s,o,a,i,l,c,u=(r("96cf"),r("3b8d")),d=(r("a481"),r("7618")),m=r("271f"),h=r("db49"),f=r("2ef0"),g=r.n(f),f=r("8f94"),u=(r("a7be"),r("7a7a"),r("f9d4"),{name:"Email_Integration",components:{codemirror:f.codemirror},data:function(){return{loadingPage:!0,loadingBtn:!1,showForm:!1,showAlertError:!1,email_data:[],code:"",form:{},options:{selectOnLineNumbers:!1,cursorStyle:null},btnText:"Save Integration",cmCode:"const a = 10",cmOptions:{tabSize:4,mode:{name:"javascript",json:!0},theme:"monokai",lineNumbers:!0,line:!0},editor:null,phoneNumberList:[],status:"",errorFields:[],dialogDelete:!1,loadingDelete:!1,selectedDelete:""}},methods:{jsonToString:function(e){return"object"==Object(d.a)(e)?JSON.stringify(e,null,2):e},parseToJson:function(r){return new Promise(function(e,t){try{e(JSON.parse(r.replace(/\r|\n|\r\n|\n\r/g,"")))}catch(e){t(e.message)}})},confirmDelete:function(){this.dialogDelete=!0,this.selectedDelete=this.form.phone_number},deleteIntegration:(c=Object(u.a)(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.loadingDelete=!0,e.next=3,Object(m.a)({method:"delete",url:"email",data:{number:this.selectedDelete}}).then(function(e){200==e.data.ec?(t.dialogDelete=!1,t.$swal(t.$t("success"),t.$t("success"),"success").then(function(e){t.emailIntegrationDetail()})):t.$swal(t.$t("error"),t.$t("error_text"),"warning")}).catch(function(e){t.$swal(t.$t("error"),t.$t("error_text"),"error")});case 3:this.loadingDelete=!1;case 4:case"end":return e.stop()}},e,this)})),function(){return c.apply(this,arguments)}),changeFilter:(l=Object(u.a)(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.emailIntegrationDetail();case 2:case"end":return e.stop()}},e,this)})),function(){return l.apply(this,arguments)}),doSaveUpdate:function(){"not_subscribe"==this.status?this.newIntegrationDetail():this.updateIntegrationDetail()},emailIntegrationDetail:(i=Object(u.a)(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.loadingPage=!0,e.next=3,Object(m.a)({method:"post",url:"email/detail",data:{number:this.form.phone_number}}).then(function(e){200==e.data.ec?(t.email_data=e.data.data,t.form=t.email_data[0],t.showForm=!0,t.status=e.data.message,t.btnText="Update Integration"):400==e.data.ec&&"not_subscribe"==e.data.message?(t.showForm=!0,t.email_data=null,t.form.service_fields={url:"",headers:"",body:"",response:""},t.status=e.data.message,t.btnText="Create Integration"):500==e.data.ec&&(t.showAlertError=!0,t.status=e.data.message),t.loadingPage=!1}).catch(function(e){t.showAlertError=!0,t.loadingPage=!1});case 3:case"end":return e.stop()}},e,this)})),function(){return i.apply(this,arguments)}),updateIntegrationDetail:(a=Object(u.a)(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0==this.errorFields.length)return this.loadingBtn=!0,e.next=4,Object(m.a)({method:"patch",url:"email/detail/update",data:this.form}).then(function(e){200==e.data.ec?t.$swal(t.$t("success"),t.$t("success"),"success").then(function(e){t.emailIntegrationDetail()}):t.$swal(t.$t("error"),t.$t("error_text"),"warning")}).catch(function(e){t.$swal(t.$t("error"),t.$t("error_text"),"error")});e.next=7;break;case 4:this.loadingBtn=!1,e.next=8;break;case 7:this.$swal(this.$t("error"),"You input wrong JSON format, please re-check your input. Fields: "+this.errorFields.join(", "),"warning");case 8:case"end":return e.stop()}},e,this)})),function(){return a.apply(this,arguments)}),newIntegrationDetail:(o=Object(u.a)(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0==this.errorFields.length)return this.loadingBtn=!0,e.next=4,Object(m.a)({method:"post",url:"email/assign-email",data:{url:this.form.service_fields.url,headers:this.form.service_fields.headers,body:this.form.service_fields.body,response:this.form.service_fields.response,phone:this.form.phone_number}}).then(function(e){200==e.data.ec?t.$swal(t.$t("success"),t.$t("success"),"success").then(function(e){t.emailIntegrationDetail()}):t.$swal(t.$t("error"),t.$t("error_text"),"warning")}).catch(function(e){t.$swal(t.$t("error"),t.$t("error_text"),"error")});e.next=7;break;case 4:this.loadingBtn=!1,e.next=8;break;case 7:this.$swal(this.$t("error"),"You input wrong JSON format, please re-check your input. Fields: "+this.errorFields.join(", "),"warning");case 8:case"end":return e.stop()}},e,this)})),function(){return o.apply(this,arguments)}),loadWA:(s=Object(u.a)(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.a)({method:"post",url:h.a.baseApi+"/user/detail/number"}).then(function(e){200==e.data.ec?(t.phoneNumberList=e.data.data,t.form.phone_number=t.phoneNumberList[0]):400==e.data.ec&&"not_subscribe"==e.data.message?t.showAlertMessage=!0:t.showAlertError=!0}).catch(function(e){t.showAlertError=!0});case 2:case"end":return e.stop()}},e)})),function(){return s.apply(this,arguments)}),onMounted:function(e){this.editor=e},onCodeHeaderChange:function(e){var t=this;""!=e?this.parseToJson(e).then(function(e){t.form.service_fields.headers=e,g.a.remove(t.errorFields,function(e){return"headers"==e})}).catch(function(e){t.errorFields.push("headers"),t.errorFields=g.a.uniq(t.errorFields)}):this.form.service_fields.headers=""},onCodeBodyChange:function(e){var t=this;""!=e?this.parseToJson(e).then(function(e){t.form.service_fields.body=e,g.a.remove(t.errorFields,function(e){return"body"==e})}).catch(function(e){t.errorFields.push("body"),t.errorFields=g.a.uniq(t.errorFields)}):this.form.service_fields.body=""},onCodeResponseChange:function(e){var t=this;""!=e?this.parseToJson(e).then(function(e){t.form.service_fields.response=e,g.a.remove(t.errorFields,function(e){return"response"==e})}).catch(function(e){t.errorFields.push("response"),t.errorFields=g.a.uniq(t.errorFields)}):this.form.service_fields.response=""},onCmReady:function(e){},onCmFocus:function(e){},onCmCodeChange:function(e){this.code=e}},mounted:(n=Object(u.a)(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadWA();case 2:this.emailIntegrationDetail();case 3:case"end":return e.stop()}},e,this)})),function(){return n.apply(this,arguments)}),filters:{pretty:function(e){return"object"==Object(d.a)(e)?JSON.stringify(e,null,2):JSON.stringify(JSON.parse(e),null,2)}}}),r=(r("820c"),r("2877")),u=Object(r.a)(u,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingPage,expression:"loadingPage"}],staticClass:"scrollable only-y"},[r("div",{staticClass:"page-header"},[r("h1",[t._v(t._s(t.$t("email.title")))])]),t.showForm?r("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingPage,expression:"loadingPage"}],staticStyle:{"margin-bottom":"1em"}},[r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[t._v("Phone Number")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("el-select",{attrs:{"default-first-option":!0},on:{change:t.changeFilter},model:{value:t.form.phone_number,callback:function(e){t.$set(t.form,"phone_number",e)},expression:"form.phone_number"}},t._l(t.phoneNumberList,function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})}),1)],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[t._v("Your Integration URL")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("el-input",{attrs:{type:"text",resize:"none",value:t.form.service_fields.url},model:{value:t.form.service_fields.url,callback:function(e){t.$set(t.form.service_fields,"url",e)},expression:"form.service_fields.url"}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[t._v("Headers (optional)")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("codemirror",{ref:"myCm",attrs:{value:t.jsonToString(t.form.service_fields.headers),options:t.cmOptions},on:{ready:t.onCmReady,focus:t.onCmFocus,input:t.onCodeHeaderChange}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[t._v("Request Body (JSON)")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("codemirror",{ref:"myCm",attrs:{value:t.jsonToString(t.form.service_fields.body),options:t.cmOptions},on:{ready:t.onCmReady,focus:t.onCmFocus,input:t.onCodeBodyChange}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[t._v("Response Body (JSON)")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("codemirror",{ref:"myCm",attrs:{value:t.jsonToString(t.form.service_fields.response),options:t.cmOptions},on:{ready:t.onCmReady,focus:t.onCmFocus,input:t.onCodeResponseChange}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:24,sm:24,md:24,lg:24,xl:24}},[r("el-button",{attrs:{type:"primary",loading:t.loadingBtn},on:{click:t.doSaveUpdate}},[t._v(t._s(t.btnText))]),"success"==t.status?r("el-button",{attrs:{type:"danger"},on:{click:t.confirmDelete}},[t._v("Delete Integration")]):t._e()],1)],1)],1):t._e(),t.showAlertError?r("el-card",{staticStyle:{"margin-bottom":"1em"}},[r("error-gope-siji")],1):t._e(),r("el-dialog",{attrs:{title:"Delete Integration",visible:t.dialogDelete,"close-on-click-modal":t.loadingDelete,"close-on-press-escape":t.loadingDelete},on:{"update:visible":function(e){t.dialogDelete=e}}},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDelete,expression:"loadingDelete"}],attrs:{"label-position":"left","label-width":"150px","element-loading-text":"Please wait while we delete your integration configuration..."}},[r("p",[t._v("Are you sure want to delete email configuration for phone number "),r("b",[t._v(t._s(t.selectedDelete))]),t._v("?")])]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",disabled:t.loadingDelete},on:{click:t.deleteIntegration}},[t._v(t._s(t.$t("submit")))])],1)],1)],1)},[],!1,null,null,null);t.default=u.exports},"820c":function(e,t,r){"use strict";r("941f")},"941f":function(e,t,r){}}]);