(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["link~31ecd969"],{"0a49":function(t,e,a){var i=a("9b43"),n=a("626a"),s=a("4bf8"),o=a("9def"),r=a("cd1c");t.exports=function(t,e){var a=1==t,l=2==t,c=3==t,d=4==t,u=6==t,m=5==t||u,p=e||r;return function(e,r,h){for(var f,k,g=s(e),b=n(g),v=i(r,h,3),x=o(b.length),L=0,_=a?p(e,x):l?p(e,0):void 0;x>L;L++)if((m||L in b)&&(f=b[L],k=v(f,L,g),t))if(a)_[L]=k;else if(k)switch(t){case 3:return!0;case 5:return f;case 6:return L;case 2:_.push(f)}else if(d)return!1;return u?-1:c||d?d:_}}},1169:function(t,e,a){var i=a("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},"12a4":function(t,e,a){},"426b":function(t,e,a){"use strict";a("12a4")},"49e4":function(t,e,a){"use strict";a("8847")},7514:function(t,e,a){"use strict";var i=a("5ca1"),n=a("0a49")(5),s="find",o=!0;s in[]&&Array(1)[s]((function(){o=!1})),i(i.P+i.F*o,"Array",{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(s)},8847:function(t,e,a){},ad17:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-contacts scrollable only-y",attrs:{id:"page-contacts"}},[i("div",{staticClass:"page-header"},[i("h1",[t._v(t._s(t.$t("menu.link")))])]),t.showAlertSubscribe?i("el-card",{attrs:{align:"center"}},[i("h2",{staticStyle:{float:"none !important"},attrs:{align:"center"}},[t._v("Start shorten your link today")]),i("p",{domProps:{innerHTML:t._s(t.$t("promote.desc.wabalink"))}}),i("br"),i("span",[i("el-button",{on:{click:function(e){return t.mailto()}}},[t._v("Send us e-mail")])],1)]):i("el-card",{staticClass:"mt-10"},[i("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.linkLoader,expression:"linkLoader"}],staticStyle:{"background-color":"#249393",color:"white"}},[t._v(" Wabalink limits : "),i("strong",[t._v(t._s(t.limits))])]),t.showAlertSubscribe?t._e():i("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.linkLoader,expression:"linkLoader"}],attrs:{gutter:10}},[i("el-col",{staticClass:"mt-10",attrs:{xs:24,sm:24,md:10,lg:10,xl:10}},[i("el-card",{staticClass:"group-list scrollable only-x"},[i("div",{staticClass:"mb-40"},[i("h2",{staticClass:"mt-0",staticStyle:{"font-size":"16px"}},[t._v(t._s(t.totalLink)+" "+t._s(t.$t("wabalink.wabalink")))]),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Reload",placement:"bottom"}},[i("el-button",{staticClass:"add-contact mr-10 mb-10",attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doGetUrlList()}}},[i("span",{staticClass:"mdi mdi-reload"})])],1),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Create Wabalink",placement:"top"}},[t.totalLink==t.limits?i("el-button",{staticClass:"add-contact mr-10 mb-10",attrs:{disabled:"disabled",type:"primary",size:"mini"},on:{click:function(e){t.dialogFormAddLink=!0}}},[i("span",{staticClass:"mdi mdi-plus"})]):i("el-button",{staticClass:"add-contact mr-10 mb-10",attrs:{type:"primary",size:"mini"},on:{click:function(e){t.dialogFormAddLink=!0}}},[i("span",{staticClass:"mdi mdi-plus"})])],1),t.totalLink==t.limits?i("el-alert",{attrs:{title:"Info",type:"error",closable:!1,description:"You cannot add more urls, because you have reached the limit, you can only change or delete","show-icon":""}}):t._e()],1),0==t.dataLink.length?[i("p",{staticStyle:{color:"#909399"},attrs:{align:"center"}},[i("img",{attrs:{src:a("e0aa"),width:"100"}}),i("br"),t._v("Data not found ")])]:i("div",{staticStyle:{height:"500px","overflow-y":"scroll"}},t._l(t.dataLink,(function(e,a){return i("div",{key:a,staticClass:"group-item contact",class:{active:t.selectedLink._id==e._id},on:{click:function(e){t.selectedLink=t.dataLink[a],t.linkTrx=t.selectedLink.transaction}}},[i("span",{staticStyle:{float:"right","font-size":"12px"}},[t._v(" "+t._s(e.clicked)+" "),i("i",{staticClass:"mdi mdi-google-analytics"})]),i("div",[i("span",{staticClass:"wabalink-created"},[t._v(t._s(t.formatDate(e.createdAt)))])]),i("div",[i("span",[t._v(t._s(e.linkName))])]),i("div",[i("i",{staticClass:"mdi mdi-link-variant"}),t._v("  "),i("a",{staticClass:"mr-10 wabalink-short-url",attrs:{target:"_blank",href:e.shortUrl}},[t._v(t._s(e.shortUrl))])])])})),0)],2)],1),i("el-col",{staticClass:"mt-10 pl-0",attrs:{xs:24,sm:24,md:14,lg:14,xl:14}},[i("el-dialog",{attrs:{title:"Create WABALINK",visible:t.dialogFormAddLink},on:{"update:visible":function(e){t.dialogFormAddLink=e}}},[i("el-form",{staticClass:"pb-40",attrs:{model:t.form}},[i("el-form-item",{attrs:{label:"Title *"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"URL Title"},model:{value:t.form.linkName,callback:function(e){t.$set(t.form,"linkName",e)},expression:"form.linkName"}})],1),i("el-form-item",{attrs:{label:"Original URL *"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"Original URL"},model:{value:t.form.originalUrl,callback:function(e){t.$set(t.form,"originalUrl",e)},expression:"form.originalUrl"}})],1)],1),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormAddLink=!1}}},[t._v("Cancel")]),i("el-button",{attrs:{type:"primary",loading:t.buttonAddLinkLoader},on:{click:t.doAddShortUrl}},[t._v("Confirm")])],1)],1),i("el-dialog",{attrs:{title:"Edit Wabalink : "+t.linkName+" #"+t.datas.urlCode,visible:t.dialogEditLink},on:{"update:visible":function(e){t.dialogEditLink=e}}},[i("el-form",{staticClass:"pb-40",attrs:{model:t.form}},[i("el-form-item",{attrs:{label:"Title"}},[i("el-input",{attrs:{placeholder:"Optional","auto-complete":"off"},model:{value:t.datas.title,callback:function(e){t.$set(t.datas,"title",e)},expression:"datas.title"}})],1),i("el-form-item",{attrs:{label:"Customize Code *"}},[i("el-input",{attrs:{placeholder:"example-new-code"},model:{value:t.datas.customCode,callback:function(e){t.$set(t.datas,"customCode",e)},expression:"datas.customCode"}},[i("template",{slot:"prepend"},[t._v(t._s(t.localBaseUrl))])],2)],1)],1),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogEditLink=!1}}},[t._v("Cancel")]),i("el-button",{attrs:{type:"primary",loading:t.buttonUpdateLinkLoader},on:{click:t.doUpdateCode}},[t._v("Confirm")])],1)],1),i("el-dialog",{staticStyle:{width:"50%",margin:"0 auto"},attrs:{title:"Are you sure to delete "+t.linkName+" ?",visible:t.dialogDeleteLink},on:{"update:visible":function(e){t.dialogDeleteLink=e}}},[i("div",{staticStyle:{float:"right",margin:"-27px 2px"}},[i("el-button",{on:{click:function(e){t.dialogDeleteLink=!1}}},[t._v("Cancel")]),i("el-button",{attrs:{type:"primary",loading:t.buttonDeleteLinkLoader},on:{click:t.doDeleteUrl}},[t._v("Confirm")])],1)]),i("el-card",[i("el-row",[i("el-col",{staticClass:"mb-20",attrs:{xs:24,sm:24}},[0==t.dataLink.length?[i("p",{staticStyle:{color:"#909399"},attrs:{align:"center"}},[i("img",{attrs:{src:a("e0aa"),width:"100"}}),i("br"),t._v("Data not found ")])]:i("div",[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Delete",placement:"top"}},[i("el-button",{staticStyle:{float:"right"},attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.doShowDialogDeleteLink(t.selectedLink._id)}}},[i("i",{staticClass:"mdi mdi-delete-forever"})])],1),i("div",{staticClass:"wabalink-created"},[t._v(" Created At "+t._s(t.formatDate(t.selectedLink.createdAt))+" | "),i("span",{staticClass:"username"},[t._v(t._s(t.user.company))])]),i("div",[i("h3",[t._v(t._s(t.selectedLink.linkName))])]),i("div",{staticClass:"mb-10"},[i("a",{staticClass:"wabalink-original-url",attrs:{target:"_blank",href:""}},[t._v(t._s(t.selectedLink.originalUrl))])]),i("div",[i("span",[t._v(t._s(t.selectedLink.urlCode))])]),i("div",[i("a",{staticClass:"mr-10 wabalink-short-url",attrs:{target:"_blank",href:t.selectedLink.shortUrl},on:{click:function(e){return t.doGetUrlList()}}},[t._v(t._s(t.selectedLink.shortUrl))]),t._v("  "),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Edit Wabalink",placement:"bottom"}},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doShowDialogEditLink(t.selectedLink._id)}}},[i("span",{staticClass:"mdi mdi-pencil align-vertical-middle"})])],1)],1),i("hr",{staticClass:"hr-custom mt-25"}),i("div",{staticClass:"mt-25 mb-30"},[i("span",{staticClass:"totaly"},[t._v(t._s(t.selectedLink.clicked))]),t._v("  "),i("i",{staticClass:"mdi mdi-google-analytics"}),i("br"),i("span",{staticClass:"total-clicks"},[t._v("TOTAL CLICKS")])]),0==t.selectedLink.clicked?i("div"):i("div",[i("div",[i("p",{staticStyle:{"font-weight":"bold","font-size":"12px"}},[t._v("Location")]),t._l(t.linkTrx,(function(e,a){return i("div",{key:a,class:{active:t.selectedLink._id}},[null==e.country?i("span",{staticStyle:{"font-size":"12px"}},[t._v("Unknown "+t._s(e.click))]):i("span",{staticStyle:{"font-size":"12px"}},[t._v(t._s(e.country)+" "+t._s(e.click))])])})),i("br"),i("center",[i("div",{staticClass:"pt-105",staticStyle:{margin:"0 auto",position:"absolute",width:"100%","font-size":"12px"}},[t._v(" "+t._s(t.selectedLink.clicked)+" "),i("br"),t._v("Total Clicks ")])])],2),i("center",[i("div",{staticStyle:{display:"block",margin:"0 auto",position:"relative"}},[i(t.asyncComponent,{tag:"component",attrs:{type:"pie",options:{fill:["#249393"],width:250,height:250,innerRadius:88,radius:40},data:t.linkTrx.toString()}})],1)])],1)],1)],2)],1)],1)],1)],1)],1)],1)},n=[],s=(a("96cf"),a("1da1")),o=a("271f"),r=a("db49"),l=a("c0d6"),c=(a("2ef0"),a("7f45")),d=a.n(c),u=(a("b204"),a("f858")),m=a("fd9b"),p=m(),h={directives:{echarts:u["a"]},data:function(){return{limits:"",color:p,asyncComponent:"peity",showAlertSubscribe:!1,data:{labels:["Sleeping","Designing","Coding","Cycling"],datasets:[{data:[1,2],backgroundColor:["#1fc8db","#fce473","#42afe3","#ed6c63","#97cd76"]}]},options:{segmentShowStroke:!1},checked:"",localBaseUrl:r["a"].shortUrl,dialogFormAddLink:!1,dataLink:[],dataLinkTrx:[],dataTrx:[],url:{country:""},linkId:0,totalLink:"",buttonAddLinkLoader:!1,buttonUpdateLinkLoader:!1,buttonDeleteLinkLoader:!1,linkLoader:!1,dialogEditLink:!1,dialogDeleteLink:!1,visible:!1,selectedLinkToUpdate:"",selectedLinkToDelete:"",selectedLink:{},linkTrx:[],links:[{link_id:0}],datas:{id:"",title:"",urlCode:"",customCode:"",shortLink:"",totalClick:0,trxlength:""},form:{linkName:"",originalUrl:""},linkName:"",user:{name:l["a"].getters.userName,company:l["a"].getters.companyName,token:l["a"].getters.token,customer_id:l["a"].getters.customerID}}},methods:{formatDate:function(t,e){return d()(t).format("DD-MM-YYYY HH:mm:ss")},doShowDialogEditLink:function(t){this.dialogEditLink=!0,this.selectedLinkToUpdate=this.selectedLink._id,this.shortLink=this.selectedLink.shortUrl,this.linkName=this.selectedLink.linkName,this.datas.urlCode=this.selectedLink.urlCode},doShowDialogDeleteLink:function(t){this.dialogDeleteLink=!0,this.selectedLinkToDelete=this.selectedLink._id,this.shortLink=this.selectedLink.shortUrl,this.linkName=this.selectedLink.linkName,this.datas.urlCode=this.selectedLink.urlCode},doGetUrlList:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.user.token,this.linkLoader=!0,t.next=4,Object(o["a"])({method:"get",url:r["a"].baseApi+"url/list",header:{"api-key":l["a"].getters.token}}).then((function(t){200==t.data.ec?(e.showAlertSubscribe=!1,e.dataLinkTrx=t.data.data,e.totalLink=t.data.data.length,e.dataLink=t.data.data,e.selectedLink=e.dataLink[0],e.linkTrx=e.selectedLink.transaction):400==t.data.ec&&"not_subscribe"==t.data.message?e.showAlertSubscribe=!0:e.showAlertSubscribe=!1})).catch((function(t){console.log(t)}));case 4:this.linkLoader=!1;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),doGetTransaction:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.user.token,this.linkLoader=!0,t.next=4,Object(o["a"])({method:"get",url:r["a"].baseApi+"url/transaction",header:{"api-key":l["a"].getters.token}}).then((function(t){e.datas.trxlength=t.data.data.length,e.dataTrx=t.data.data})).catch((function(t){console.log(t)}));case 4:this.linkLoader=!1;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),doAddShortUrl:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!=this.form.linkName&&""!=this.form.originalUrl){t.next=4;break}this.$message({showClose:!0,message:"Oops, all field is required",type:"error"}),t.next=13;break;case 4:if(this.totalLink!=this.limits){t.next=8;break}this.$message({showClose:!0,message:"Oops, You have reached the limit, please delete data that You do not use",type:"error"}),t.next=13;break;case 8:return this.buttonAddLinkLoader=!0,t.next=11,Object(o["a"])({method:"post",url:r["a"].baseApi+"url/add",data:{linkName:this.form.linkName,originalUrl:this.form.originalUrl}}).then((function(t){200==t.data.ec?(e.linkLoader=!0,e.$message({showClose:!0,message:"New short url has been saved",type:"success"}),e.clear(),e.dialogFormAddLink=!1,e.doGetUrlList()):e.$message({showClose:!0,message:"Failed. Please check your URL",type:"error"})})).catch((function(t){console.log(t)}));case 11:this.buttonAddLinkLoader=!1,this.linkLoader=!1;case 13:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),doUpdateCode:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!=this.datas.customCode){t.next=4;break}this.$message({showClose:!0,message:"Oops, customize code cannot empty",type:"error"}),t.next=10;break;case 4:return this.buttonUpdateLinkLoader=!0,e=this.selectedLinkToUpdate,t.next=8,Object(o["a"])({method:"post",url:r["a"].baseApi+"url/update/"+e,data:{linkName:this.datas.title?this.datas.title:this.linkName,customCode:this.datas.customCode}}).then((function(t){a.linkLoader=!0,200!=t.data.ec?(a.$message({showClose:!0,message:"Oops, This wabalink is taken.",type:"error"}),a.clear()):(a.$message({showClose:!0,message:"Customize code has been changed",type:"success"}),a.clear(),a.doGetUrlList(),a.dialogEditLink=!1)})).catch((function(t){console.log(t)}));case 8:this.buttonUpdateLinkLoader=!1,this.linkLoader=!1;case 10:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),doDeleteUrl:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.buttonDeleteLinkLoader=!0,e=this.selectedLinkToDelete,t.next=4,Object(o["a"])({method:"post",url:r["a"].baseApi+"url/delete/"+e,data:{linkName:this.linkName}}).then((function(t){200!=t.data.ec?(a.$swal({type:"error",title:a.$t("error"),text:""}),a.clear(),a.dialogDeleteLink=!1):(a.linkLoader=!0,a.$swal({type:"success",title:a.$t("success"),text:""}),a.clear(),a.dialogDeleteLink=!1,a.doGetUrlList())})).catch((function(t){console.log(t)}));case 4:this.buttonDeleteLinkLoader=!1,this.linkLoader=!1;case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getCountOfProductShorten:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.linkLoader=!0,e=this.user.customer_id,t.next=4,Object(o["a"])({method:"get",url:r["a"].baseApi+"url/additional-service/"+e,header:{"api-key":l["a"].getters.token}}).then((function(t){a.limits=t.data.data.product[0].count})).catch((function(t){console.log(t)}));case 4:this.linkLoader=!1;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),clear:function(){this.form.originalUrl="",this.form.linkName="",this.datas.title="",this.datas.linkName="",this.datas.customCode=""},openLink:function(t){this.linkId=t._id,this.dataLink=[],this.doGetUrlList()}},computed:{},mounted:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.doGetUrlList();case 2:return t.next=4,this.getCountOfProductShorten();case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),components:{}},f=h,k=(a("426b"),a("2877")),g=Object(k["a"])(f,i,n,!1,null,"0e192ce2",null);e["default"]=g.exports},cd1c:function(t,e,a){var i=a("e853");t.exports=function(t,e){return new(i(t))(e)}},e134:function(t,e,a){t.exports=a.p+"img/bot-mins.d710fa69.jpg"},e54f:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-invoice scrollable"},[t._m(0),t.showAlertError?i("el-card",{staticStyle:{"margin-bottom":"1em"}},[i("error-gope-siji")],1):t._e(),t.showAlertMessage?i("el-card",{attrs:{align:"center"}},[i("h2",[t._v("Start messaging your customers today")]),i("span",{domProps:{innerHTML:t._s(t.$t("promote.desc.telegram"))}}),i("br"),i("br"),i("span",[i("el-button",{on:{click:function(e){return t.mailto()}}},[t._v("Send us e-mail")])],1)]):i("div",[i("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingData,expression:"loadingData"}],staticStyle:{"min-height":"450px"},attrs:{shadow:"none"}},[i("div",{staticClass:"mb-20"},[1==t.disabledButton?i("el-button",{attrs:{disabled:"",type:"primary"}},[t._v("Create Account")]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.modalCreated=!0}}},[t._v("Create Account")])],1),i("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDelete,expression:"loadingDelete"}],attrs:{gutter:20}},[null==t.listAccount?i("div",{staticStyle:{padding:"70px 0","text-align":"center"}},[i("img",{attrs:{src:a("e0aa"),width:"100"}}),i("br"),t._v("Data not found ")]):t._l(t.listAccount,(function(e,n){return i("el-col",{key:n,attrs:{span:6}},[i("el-card",{attrs:{shadow:"none"}},[i("div",{staticStyle:{"text-align":"center","font-size":"1.2vw","font-weight":"700"}},[t._v(" "+t._s(e.number)+" ")]),i("div",{staticStyle:{"text-align":"center","margin-bottom":"0px",padding:"20px"}},[i("span",{staticClass:"align-vertical-middle card-shadow--small dot",style:"background-color:hsl("+360*Math.random()+","+(25+70*Math.random())+"%,"+(85+10*Math.random())+"%);"},[i("img",{staticStyle:{"mix-blend-mode":"multiply"},attrs:{src:a("e134"),width:"100%"}})])]),i("div",{staticStyle:{"text-align":"center"}},[i("el-button",{attrs:{type:"text",size:"medium"},on:{click:function(a){return t.detailAccount(e)}}},[t._v("View")]),i("el-button",{attrs:{type:"text",size:"medium"},on:{click:function(a){return t.deleteAccount(e)}}},[t._v("Delete")])],1)])],1)}))],2)],1)],1),i("el-dialog",{attrs:{title:"Create New Account",visible:t.modalCreated},on:{"update:visible":function(e){t.modalCreated=e}}},[i("el-form",{ref:"form",attrs:{"label-width":"120px","label-position":"top"}},[i("el-form-item",{attrs:{label:"Enter Your Bot Token"}},[i("el-input",{attrs:{type:"textarea",placeholder:"Example: xxxxxxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},model:{value:t.form.bot_token,callback:function(e){t.$set(t.form,"bot_token",e)},expression:"form.bot_token"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",loading:t.loadingCreate},on:{click:t.onSubmit}},[t._v("Submit")]),i("el-button",{on:{click:function(e){t.modalCreated=!1}}},[t._v("Cancel")])],1)],1)],1),i("el-dialog",{attrs:{title:"Detail "+t.selectedAccount.number,visible:t.modalDetail},on:{"update:visible":function(e){t.modalDetail=e}}},[i("el-form",{ref:"form",attrs:{"label-width":"120px","label-position":"top"}},[i("el-form-item",{attrs:{label:"ID"}},[i("el-input",{attrs:{readonly:""},model:{value:t.selectedBot.id,callback:function(e){t.$set(t.selectedBot,"id",e)},expression:"selectedBot.id"}})],1),i("el-form-item",{attrs:{label:"First Name"}},[i("el-input",{attrs:{readonly:""},model:{value:t.selectedBot.first_name,callback:function(e){t.$set(t.selectedBot,"first_name",e)},expression:"selectedBot.first_name"}})],1),i("el-form-item",{attrs:{label:"Username"}},[i("el-input",{attrs:{readonly:""},model:{value:t.selectedBot.username,callback:function(e){t.$set(t.selectedBot,"username",e)},expression:"selectedBot.username"}})],1),i("el-form-item",{attrs:{label:"Can Join Group"}},[i("el-input",{attrs:{readonly:""},model:{value:t.selectedBot.can_join_groups,callback:function(e){t.$set(t.selectedBot,"can_join_groups",e)},expression:"selectedBot.can_join_groups"}})],1),i("el-form-item",{attrs:{label:"Can Read All Group Message"}},[i("el-input",{attrs:{readonly:""},model:{value:t.selectedBot.can_read_all_group_messages,callback:function(e){t.$set(t.selectedBot,"can_read_all_group_messages",e)},expression:"selectedBot.can_read_all_group_messages"}})],1),i("el-form-item",{attrs:{label:"Supports Inline Queries"}},[i("el-input",{attrs:{readonly:""},model:{value:t.selectedBot.supports_inline_queries,callback:function(e){t.$set(t.selectedBot,"supports_inline_queries",e)},expression:"selectedBot.supports_inline_queries"}})],1)],1)],1)],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-header"},[a("h1",[t._v("Telegram Account")])])}],s=(a("7514"),a("96cf"),a("1da1")),o=a("271f"),r=a("db49"),l=(a("c1df"),a("2ef0")),c=a.n(l),d={name:"TelegramListAccount",data:function(){return{loadingData:!1,loadingCreate:!1,loadingDelete:!1,activeName:"bot",listAccount:[],listProduct:[],modalCreated:!1,modalDetail:!1,form:{bot_token:""},selectedDetail:{},selectedAccount:{},selectedBot:{},selectedGreeting:{},selectedQuickReply:{},showAlertError:!1,showAlertMessage:!1,disabledButton:!1}},methods:{getListAccount:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loadingData=!0,t.next=3,Object(o["a"])({method:"get",url:r["a"].baseApi+"telegram"}).then((function(t){400==t.data.ec?e.showAlertMessage=!0:(e.listAccount=t.data.data.list,e.listProduct=t.data.data.product,e.disabledButton=t.data.data.is_limit),e.loadingData=!1})).catch((function(t){}));case 3:this.loadingData=!1;case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onSubmit:function(){var t=this;""==this.form.bot_token?(this.$swal(this.$t("error"),"Plese enter your bot token!","error"),this.modalCreated=!1):(this.loadingCreate=!0,Object(o["a"])({method:"post",url:r["a"].baseApi+"telegram",data:{bot_token:this.form.bot_token}}).then((function(e){500==e.data.ec?(t.$swal(t.$t("error"),t.$t("error_text"),"error"),t.modalCreated=!1,t.form.bot_token="",t.loadingCreate=!1):400==e.data.ec?(t.$swal(t.$t("error"),"This account is already integrated","error"),t.modalCreated=!1,t.form.bot_token="",t.loadingCreate=!1):200==e.data.ec&&(t.$swal(t.$t("success"),"New account has been created","success"),t.modalCreated=!1,t.form.bot_token="",t.getListAccount(),t.loadingCreate=!1)})).catch((function(e){t.$swal(t.$t("error"),t.$t("error_text"),"error")})))},detailAccount:function(t){this.activeName="bot";var e=c.a.find(this.listAccount,(function(e){return e.number==t.number}));this.modalDetail=!0,this.selectedAccount=c.a.cloneDeep(e),this.selectedDetail=Object.assign({},t.detail),this.selectedBot=Object.assign({},t.detail.bot),this.selectedGreeting=Object.assign({},t.detail.greeting),this.selectedQuickReply=Object.assign({},t.detail.quickReply)},share:function(t){},deleteAccount:function(t){var e=this;this.$confirm("This will permanently delete the account. Continue?","Warning",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then((function(){e.loadingDelete=!0,Object(o["a"])({method:"delete",url:r["a"].baseApi+"telegram",data:{bot_id:t.detail.bot.id}}).then((function(t){200==t.data.ec?(e.$swal(e.$t("success"),"Account has been deleted","success"),e.getListAccount(),e.loadingDelete=!1):(e.$swal(e.$t("error"),e.$t("error_text"),"error"),e.loadingDelete=!1)})).catch((function(t){e.$swal(e.$t("error"),e.$t("error_text"),"error")}))})).catch((function(){e.$message({type:"info",message:"Delete canceled"})}))}},mounted:function(){this.getListAccount()}},u=d,m=(a("49e4"),a("2877")),p=Object(m["a"])(u,i,n,!1,null,"0c45c44e",null);e["default"]=p.exports},e853:function(t,e,a){var i=a("d3f4"),n=a("1169"),s=a("2b4c")("species");t.exports=function(t){var e;return n(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!n(e.prototype)||(e=void 0),i(e)&&(e=e[s],null===e&&(e=void 0))),void 0===e?Array:e}}}]);