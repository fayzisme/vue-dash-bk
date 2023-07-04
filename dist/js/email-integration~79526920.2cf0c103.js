(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["email-integration~79526920"],{"4ee4":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingPage,expression:"loadingPage"}],staticClass:"scrollable only-y"},[r("div",{staticClass:"page-header"},[r("h1",[e._v(e._s(e.$t("email.title")))])]),e.showForm?r("el-card",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingPage,expression:"loadingPage"}],staticStyle:{"margin-bottom":"1em"}},[r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[e._v("Phone Number")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("el-select",{attrs:{"default-first-option":!0},on:{change:e.changeFilter},model:{value:e.form.phone_number,callback:function(t){e.$set(e.form,"phone_number",t)},expression:"form.phone_number"}},e._l(e.phoneNumberList,(function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[e._v("Your Integration URL")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("el-input",{attrs:{type:"text",resize:"none",value:e.form.service_fields.url},model:{value:e.form.service_fields.url,callback:function(t){e.$set(e.form.service_fields,"url",t)},expression:"form.service_fields.url"}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[e._v("Headers (optional)")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("codemirror",{ref:"myCm",attrs:{value:e.jsonToString(e.form.service_fields.headers),options:e.cmOptions},on:{ready:e.onCmReady,focus:e.onCmFocus,input:e.onCodeHeaderChange}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[e._v("Request Body (JSON)")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("codemirror",{ref:"myCm",attrs:{value:e.jsonToString(e.form.service_fields.body),options:e.cmOptions},on:{ready:e.onCmReady,focus:e.onCmFocus,input:e.onCodeBodyChange}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:4,sm:4,md:4,lg:4,xl:4}},[r("h5",[e._v("Response Body (JSON)")])]),r("el-col",{staticClass:"mt-10",attrs:{xs:20,sm:20,md:20,lg:20,xl:20}},[r("codemirror",{ref:"myCm",attrs:{value:e.jsonToString(e.form.service_fields.response),options:e.cmOptions},on:{ready:e.onCmReady,focus:e.onCmFocus,input:e.onCodeResponseChange}})],1)],1),r("el-row",{staticClass:"mb-20",attrs:{gutter:30}},[r("el-col",{attrs:{xs:24,sm:24,md:24,lg:24,xl:24}},[r("el-button",{attrs:{type:"primary",loading:e.loadingBtn},on:{click:e.doSaveUpdate}},[e._v(e._s(e.btnText))]),"success"==e.status?r("el-button",{attrs:{type:"danger"},on:{click:e.confirmDelete}},[e._v("Delete Integration")]):e._e()],1)],1)],1):e._e(),e.showAlertError?r("el-card",{staticStyle:{"margin-bottom":"1em"}},[r("error-gope-siji")],1):e._e(),r("el-dialog",{attrs:{title:"Delete Integration",visible:e.dialogDelete,"close-on-click-modal":e.loadingDelete,"close-on-press-escape":e.loadingDelete},on:{"update:visible":function(t){e.dialogDelete=t}}},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingDelete,expression:"loadingDelete"}],attrs:{"label-position":"left","label-width":"150px","element-loading-text":"Please wait while we delete your integration configuration..."}},[r("p",[e._v("Are you sure want to delete email configuration for phone number "),r("b",[e._v(e._s(e.selectedDelete))]),e._v("?")])]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",disabled:e.loadingDelete},on:{click:e.deleteIntegration}},[e._v(e._s(e.$t("submit")))])],1)],1)],1)},s=[],a=(r("96cf"),r("1da1")),o=(r("a481"),r("53ca")),i=r("271f"),l=r("db49"),c=r("2ef0"),u=r.n(c),d=r("8f94"),m=(r("a7be"),r("7a7a"),r("f9d4"),{name:"Email_Integration",components:{codemirror:d["codemirror"]},data:function(){return{loadingPage:!0,loadingBtn:!1,showForm:!1,showAlertError:!1,email_data:[],code:"",form:{},options:{selectOnLineNumbers:!1,cursorStyle:null},btnText:"Save Integration",cmCode:"const a = 10",cmOptions:{tabSize:4,mode:{name:"javascript",json:!0},theme:"monokai",lineNumbers:!0,line:!0},editor:null,phoneNumberList:[],status:"",errorFields:[],dialogDelete:!1,loadingDelete:!1,selectedDelete:""}},methods:{jsonToString:function(e){return"object"==Object(o["a"])(e)?JSON.stringify(e,null,2):e},parseToJson:function(e){return new Promise((function(t,r){try{var n=JSON.parse(e.replace(/\r|\n|\r\n|\n\r/g,""));t(n)}catch(s){r(s.message)}}))},confirmDelete:function(){this.dialogDelete=!0,this.selectedDelete=this.form.phone_number},deleteIntegration:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loadingDelete=!0,e.next=3,Object(i["a"])({method:"delete",url:"email",data:{number:this.selectedDelete}}).then((function(e){200==e.data.ec?(t.dialogDelete=!1,t.$swal(t.$t("success"),t.$t("success"),"success").then((function(e){t.emailIntegrationDetail()}))):t.$swal(t.$t("error"),t.$t("error_text"),"warning")})).catch((function(e){t.$swal(t.$t("error"),t.$t("error_text"),"error")}));case 3:this.loadingDelete=!1;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),changeFilter:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.emailIntegrationDetail();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),doSaveUpdate:function(){"not_subscribe"==this.status?this.newIntegrationDetail():this.updateIntegrationDetail()},emailIntegrationDetail:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loadingPage=!0,e.next=3,Object(i["a"])({method:"post",url:"email/detail",data:{number:this.form.phone_number}}).then((function(e){200==e.data.ec?(t.email_data=e.data.data,t.form=t.email_data[0],t.showForm=!0,t.status=e.data.message,t.btnText="Update Integration"):400==e.data.ec&&"not_subscribe"==e.data.message?(t.showForm=!0,t.email_data=null,t.form.service_fields={url:"",headers:"",body:"",response:""},t.status=e.data.message,t.btnText="Create Integration"):500==e.data.ec&&(t.showAlertError=!0,t.status=e.data.message),t.loadingPage=!1})).catch((function(e){t.showAlertError=!0,t.loadingPage=!1}));case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),updateIntegrationDetail:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!=this.errorFields.length){e.next=7;break}return this.loadingBtn=!0,e.next=4,Object(i["a"])({method:"patch",url:"email/detail/update",data:this.form}).then((function(e){200==e.data.ec?t.$swal(t.$t("success"),t.$t("success"),"success").then((function(e){t.emailIntegrationDetail()})):t.$swal(t.$t("error"),t.$t("error_text"),"warning")})).catch((function(e){t.$swal(t.$t("error"),t.$t("error_text"),"error")}));case 4:this.loadingBtn=!1,e.next=8;break;case 7:this.$swal(this.$t("error"),"You input wrong JSON format, please re-check your input. Fields: "+this.errorFields.join(", "),"warning");case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),newIntegrationDetail:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!=this.errorFields.length){e.next=7;break}return this.loadingBtn=!0,e.next=4,Object(i["a"])({method:"post",url:"email/assign-email",data:{url:this.form.service_fields.url,headers:this.form.service_fields.headers,body:this.form.service_fields.body,response:this.form.service_fields.response,phone:this.form.phone_number}}).then((function(e){200==e.data.ec?t.$swal(t.$t("success"),t.$t("success"),"success").then((function(e){t.emailIntegrationDetail()})):t.$swal(t.$t("error"),t.$t("error_text"),"warning")})).catch((function(e){t.$swal(t.$t("error"),t.$t("error_text"),"error")}));case 4:this.loadingBtn=!1,e.next=8;break;case 7:this.$swal(this.$t("error"),"You input wrong JSON format, please re-check your input. Fields: "+this.errorFields.join(", "),"warning");case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),loadWA:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["a"])({method:"post",url:l["a"].baseApi+"/user/detail/number"}).then((function(e){200==e.data.ec?(t.phoneNumberList=e.data.data,t.form.phone_number=t.phoneNumberList[0]):400==e.data.ec&&"not_subscribe"==e.data.message?t.showAlertMessage=!0:t.showAlertError=!0})).catch((function(e){t.showAlertError=!0}));case 2:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),onMounted:function(e){this.editor=e},onCodeHeaderChange:function(e){var t=this;""!=e?this.parseToJson(e).then((function(e){t.form.service_fields.headers=e,u.a.remove(t.errorFields,(function(e){return"headers"==e}))})).catch((function(e){t.errorFields.push("headers"),t.errorFields=u.a.uniq(t.errorFields)})):this.form.service_fields.headers=""},onCodeBodyChange:function(e){var t=this;""!=e?this.parseToJson(e).then((function(e){t.form.service_fields.body=e,u.a.remove(t.errorFields,(function(e){return"body"==e}))})).catch((function(e){t.errorFields.push("body"),t.errorFields=u.a.uniq(t.errorFields)})):this.form.service_fields.body=""},onCodeResponseChange:function(e){var t=this;""!=e?this.parseToJson(e).then((function(e){t.form.service_fields.response=e,u.a.remove(t.errorFields,(function(e){return"response"==e}))})).catch((function(e){t.errorFields.push("response"),t.errorFields=u.a.uniq(t.errorFields)})):this.form.service_fields.response=""},onCmReady:function(e){},onCmFocus:function(e){},onCmCodeChange:function(e){this.code=e}},mounted:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadWA();case 2:this.emailIntegrationDetail();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),filters:{pretty:function(e){return"object"==Object(o["a"])(e)?JSON.stringify(e,null,2):JSON.stringify(JSON.parse(e),null,2)}}}),h=m,f=(r("820c"),r("2877")),g=Object(f["a"])(h,n,s,!1,null,null,null);t["default"]=g.exports},"820c":function(e,t,r){"use strict";r("941f")},"941f":function(e,t,r){}}]);