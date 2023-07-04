(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["whatsapp-overview~67bae727"],{"6af9":function(e,t,a){},b7196:function(e,t,a){"use strict";a("6af9")},e790:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingData,expression:"loadingData"}],staticClass:"scrollable only-y",attrs:{gutter:10}},[a("div",{staticClass:"page-header"},[a("h1",[e._v(e._s(e.$t("whatsapp.whatsapp"))+" Overview")])]),e.showAlertMessage?a("el-card",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingData,expression:"loadingData"}],attrs:{align:"center"}},[a("h2",[e._v("Start messaging your customers today")]),a("span",{domProps:{innerHTML:e._s(e.$t("promote.desc.whatsapp"))}}),a("br"),a("br"),a("span",[a("el-button",{on:{click:function(t){return e.mailto()}}},[e._v("Send us e-mail")])],1),2==e.customer_type&&void 0==e.businessId||""==e.businessId?a("div",{staticStyle:{margin:"0 0 20px"}},[a("button",{staticStyle:{"background-color":"#1877f2",border:"0","border-radius":"23px",color:"#fff",cursor:"pointer","font-family":"Helvetica, Arial, sans-serif","font-size":"14px","font-weight":"bold",height:"40px",padding:"0 24px","margin-top":"20px"},attrs:{onclick:"launchWhatsAppSignup()"}},[e._v("Connect to Facebook")])]):e._e()]):e._e(),e.showAlertMessage?e._e():a("el-card",[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"Select Month"},model:{value:e.currentMonth,callback:function(t){e.currentMonth=t},expression:"currentMonth"}},e._l(e.optionsMonths,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v("   "),a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"Select Phone Number","default-first-option":!0},model:{value:e.selectedPhoneNumber,callback:function(t){e.selectedPhoneNumber=t},expression:"selectedPhoneNumber"}},e._l(e.companyPhone,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1),e._v("   "),a("el-button",{attrs:{type:"primary",loading:e.isLoading},on:{click:e.changeFilter}},[a("i",{staticClass:"mdi mdi-filter"}),e._v(" Filter")]),a("br"),a("br"),e.showAlertError?a("error-gope-siji",{staticStyle:{"margin-bottom":"1em"}}):e._e(),e.showFormMessage?a("el-col",{staticClass:"mt-10",attrs:{xs:24,sm:24,md:24,lg:24,xl:24}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticClass:"card-base bg-accent card-shadow--medium p-10"},[a("h2",{staticClass:"white-text mv-0 mt-5 animated fadeInDown"},[e._v("Whatsapp Overview")]),a("h3",{staticClass:"mt-0 mb-40 white-text o-050 animated slideInUp"},[e._v("Total Sent Message")]),a("div",{directives:[{name:"echarts",rawName:"v-echarts",value:e.chartOption,expression:"chartOption"}],staticClass:"chart"})]),a("br"),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticClass:"card-base bg-accent card-shadow--medium p-10"},[a("h2",{staticClass:"white-text mv-0 mt-5 animated fadeInDown"},[e._v("Whatsapp Overview")]),a("h3",{staticClass:"mt-0 mb-40 white-text o-050 animated slideInUp"},[e._v("Delivered Message")]),a("div",{directives:[{name:"echarts",rawName:"v-echarts",value:e.chartOption1,expression:"chartOption1"}],staticClass:"chart"})]),a("br"),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticClass:"card-base bg-accent card-shadow--medium p-10"},[a("h2",{staticClass:"white-text mv-0 mt-5 animated fadeInDown"},[e._v("Whatsapp Overview")]),a("h3",{staticClass:"mt-0 mb-40 white-text o-050 animated slideInUp"},[e._v("Failed Message")]),a("div",{directives:[{name:"echarts",rawName:"v-echarts",value:e.chartOption2,expression:"chartOption2"}],staticClass:"chart"})])]):e._e()],1)],1)},s=[],r=(a("96cf"),a("1da1")),o=a("271f"),n=(a("db49"),a("c1df")),l=a.n(n),c=a("2ef0"),d=a.n(c),u=a("f858"),h=a("c0d6"),m={name:"Overview",component:{},directives:{echarts:u["a"]},data:function(){return{businessId:"",customer_type:h["a"].getters.customer_type,optionsMonths:[],selectedPhoneNumber:"",loadingData:!0,clientName:"",companyName:"",companyPhone:"",totalWA:0,showFormMessage:!1,showAlertMessage:!1,showAlertError:!1,today:l()().format("DD MMM YYYY"),tanggal:[0],textSuccess:[0],textFail:[0],textTotal:[0],image:{success:[0],fail:[0],total:[0]},hsm:{success:[0],fail:[0],total:[0]},document:{success:[0],fail:[0],total:[0]},audio:{success:[0],fail:[0],total:[0]},outbond:{success:[0],fail:[0],total:[0]},billWhatsapp:{},isLoading:!0,waServAlias:{text:"Whatsapp Regular Text",hsm:"Whatsapp Template Text",image:"Whatsapp Image",document:"Whatsapp Document",audio:"Whatsapp Audio"},totalBill:0,loadingTable:!0,currentMonth:l()().format("YYYY-MM"),chartOption:{areaColor:"#FFF",grid:{show:!1,left:"20px",right:"50px",bottom:"20px",top:"20px",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{show:!1,data:["line","bar"],textStyle:{color:"#ccc"}},xAxis:[{type:"category",boundaryGap:!1,data:[0],axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],series:[{name:"Total Outbond Message",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#fff"},itemStyle:{color:"#fff",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]},{name:"Total Notification Message",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#f98643"},itemStyle:{color:"#f98643",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]}]},chartOption1:{areaColor:"#FFF",grid:{show:!1,left:"20px",right:"50px",bottom:"20px",top:"20px",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{show:!1,data:["line","bar"],textStyle:{color:"#ccc"}},xAxis:[{type:"category",boundaryGap:!1,data:[0],axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],series:[{name:"Delivered Outbond Message",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#fff"},itemStyle:{color:"#fff",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]},{name:"Delivered Notification Message",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#f98643"},itemStyle:{color:"#f98643",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]}]},chartOption2:{areaColor:"#FFF",grid:{show:!1,left:"20px",right:"50px",bottom:"20px",top:"20px",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{show:!1,data:["line","bar"],textStyle:{color:"#ccc"}},xAxis:[{type:"category",boundaryGap:!1,data:[0],axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],series:[{name:"Failed Outbond Message",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#fff"},itemStyle:{color:"#fff",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]},{name:"Failed Notification Message",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#f98643"},itemStyle:{color:"#f98643",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]}]}}},methods:{changeFilter:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.wa_billing();case 2:this.renderChart();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),mailto:function(){location.href="mailto: business.solution@damcorp.id"},print:function(){window.print()},wa_billing:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.isLoading=!0,e.next=3,Object(o["a"])({method:"post",url:"user/overview",data:{months:this.currentMonth,with_date:!0,number:this.selectedPhoneNumber}}).then((function(e){if(t.loadingData=!1,t.isLoading=!1,200==e.data.ec){t.showAlertError=!1,t.showFormMessage=!0;var a=e.data.data,i=new Array,s={success:new Array,fail:new Array,total:new Array},r={success:new Array,fail:new Array,total:new Array},o={success:new Array,fail:new Array,total:new Array},n={success:new Array,fail:new Array,total:new Array},c={success:new Array,fail:new Array,total:new Array},u={success:new Array,fail:new Array,total:new Array};new Array;d.a.forOwn(a,(function(e,t){var a=l()(t).format("YYYY-MM-DD");i.push(a);var d=e.text.delivered+e.text.read+e.text.sent,h=e.text.failed+e.text.invalid;s.success.push(d),s.total.push(d+h),s.fail.push(h);var m=e.image.delivered+e.image.read+e.image.sent,p=e.image.failed+e.image.invalid;r.success.push(m),r.fail.push(p),r.total.push(m+p);var f=e.hsm.delivered+e.hsm.read+e.hsm.sent,g=e.hsm.failed+e.hsm.invalid;o.success.push(f),o.fail.push(g),o.total.push(f+g);var b=e.document.delivered+e.document.read+e.document.sent,y=e.document.failed+e.document.invalid;n.success.push(b),n.fail.push(y),n.total.push(b+y);var w=e.audio.delivered+e.audio.read+e.audio.sent,v=e.audio.failed+e.audio.invalid;c.success.push(w),c.fail.push(v),c.total.push(w+v);var x=d+m+b+w,S=h+p+y+v;u.success.push(x),u.fail.push(S),u.total.push(x+S)})),t.tanggal=i,t.textSuccess=s.success,t.textFail=s.fail,t.textTotal=s.total,t.image=r,t.hsm=o,t.document=n,t.audio=c,t.outbond=u}else 400==e.data.ec&&"not_subscribe"==e.data.message?(t.showAlertMessage=!0,t.showFormMessage=!1):500==e.data.ec&&(t.showAlertError=!0,t.showFormMessage=!1)})).catch((function(e){t.loadingData=!1,t.showAlertError=!0,t.showFormMessage=!1}));case 3:this.isLoading=!1;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),wa_detail:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["a"])({method:"post",url:"user/detail/number",data:{channels:"whatsapp"}}).then((function(e){t.companyPhone=e.data.data,t.selectedPhoneNumber=t.companyPhone[0]})).catch((function(e){}));case 2:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),renderChart:function(){var e=Object.assign({},this.chartOption),t=Object.assign({},this.chartOption1),a=Object.assign({},this.chartOption2);e.xAxis[0].data=this.tanggal,e.series[0].data=this.outbond.total,e.series[1].data=this.hsm.total,t.xAxis[0].data=this.tanggal,t.series[0].data=this.outbond.success,t.series[1].data=this.hsm.success,a.xAxis[0].data=this.tanggal,a.series[0].data=this.outbond.fail,a.series[1].data=this.hsm.fail,this.chartOption=e,this.chartOption1=t,this.chartOption2=a}},beforeMount:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(this.loadingTable=!1,t=6;t>=0;t--)this.optionsMonths.push({value:l()().subtract(t,"month").format("YYYY-MM"),label:l()().subtract(t,"month").format("MMM YYYY")});case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),mounted:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.wa_detail();case 2:return e.next=4,this.wa_billing();case 4:return e.next=6,this.renderChart();case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},p=m,f=(a("b7196"),a("2877")),g=Object(f["a"])(p,i,s,!1,null,null,null);t["default"]=g.exports}}]);