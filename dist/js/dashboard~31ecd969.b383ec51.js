(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard~31ecd969"],{"7b33":function(t,e,a){t.exports=a.p+"img/api.76bd4a78.svg"},"7d56":function(t,e,a){"use strict";a("ff2e6")},8521:function(t,e){
/**
 * [chartjs-plugin-labels]{@link https://github.com/emn178/chartjs-plugin-labels}
 *
 * @version 1.1.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2017-2018
 * @license MIT
 */
(function(){"use strict";if("undefined"!==typeof Chart){"function"!=typeof Object.assign&&(Object.assign=function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var a=Object(t),i=1;i<arguments.length;i++){var n=arguments[i];if(null!=n)for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(a[o]=n[o])}return a});var t={};["pie","doughnut","polarArea","bar"].forEach((function(e){t[e]=!0})),e.prototype.setup=function(t,e){this.chart=t,this.ctx=t.ctx,this.args={},this.barTotal={};var a=t.config.options;this.options=Object.assign({position:"default",precision:0,fontSize:a.defaultFontSize,fontColor:a.defaultFontColor,fontStyle:a.defaultFontStyle,fontFamily:a.defaultFontFamily,shadowOffsetX:3,shadowOffsetY:3,shadowColor:"rgba(0,0,0,0.3)",shadowBlur:6,images:[],outsidePadding:2,textMargin:2,overlap:!0},e),"bar"===t.config.type&&(this.options.position="default",this.options.arc=!1,this.options.overlap=!0)},e.prototype.render=function(){this.labelBounds=[],this.chart.data.datasets.forEach(this.renderToDataset)},e.prototype.renderToDataset=function(t,e){this.totalPercentage=0,this.total=null;var a=this.args[e];a.meta.data.forEach(function(e,i){this.renderToElement(t,a,e,i)}.bind(this))},e.prototype.renderToElement=function(t,e,a,i){if(this.shouldRenderToElement(e.meta,a)){this.percentage=null;var n=this.getLabel(t,a,i);if(n){var o=this.ctx;o.save(),o.font=Chart.helpers.fontString(this.options.fontSize,this.options.fontStyle,this.options.fontFamily);var s=this.getRenderInfo(a,n);this.drawable(a,n,s)?(o.beginPath(),o.fillStyle=this.getFontColor(t,a,i),this.renderLabel(n,s),o.restore()):o.restore()}}},e.prototype.renderLabel=function(t,e){return this.options.arc?this.renderArcLabel(t,e):this.renderBaseLabel(t,e)},e.prototype.renderBaseLabel=function(t,e){var a=this.ctx;if("object"===typeof t)a.drawImage(t,e.x-t.width/2,e.y-t.height/2,t.width,t.height);else{a.save(),a.textBaseline="top",a.textAlign="center",this.options.textShadow&&(a.shadowOffsetX=this.options.shadowOffsetX,a.shadowOffsetY=this.options.shadowOffsetY,a.shadowColor=this.options.shadowColor,a.shadowBlur=this.options.shadowBlur);for(var i=t.split("\n"),n=0;n<i.length;n++){var o=e.y-this.options.fontSize/2*i.length+this.options.fontSize*n;a.fillText(i[n],e.x,o)}a.restore()}},e.prototype.renderArcLabel=function(t,e){var a=this.ctx,i=e.radius,n=e.view;if(a.save(),a.translate(n.x,n.y),"string"===typeof t){a.rotate(e.startAngle),a.textBaseline="middle",a.textAlign="left";var o=t.split("\n"),s=0,r=[],l=0;"border"===this.options.position&&(l=(o.length-1)*this.options.fontSize/2);for(var d=0;d<o.length;++d){var c=a.measureText(o[d]);c.width>s&&(s=c.width),r.push(c.width)}for(d=0;d<o.length;++d){var u=o[d],h=(o.length-1-d)*-this.options.fontSize+l;a.save();var g=(s-r[d])/2;a.rotate(g/i);for(var p=0;p<u.length;p++){var m=u.charAt(p);c=a.measureText(m),a.save(),a.translate(0,-1*i),a.fillText(m,0,h),a.restore(),a.rotate(c.width/i)}a.restore()}}else a.rotate((n.startAngle+Math.PI/2+e.endAngle)/2),a.translate(0,-1*i),this.renderLabel(t,{x:0,y:0});a.restore()},e.prototype.shouldRenderToElement=function(t,e){return!t.hidden&&!e.hidden&&(this.options.showZero||"polarArea"===this.chart.config.type?0!==e._view.outerRadius:0!==e._view.circumference)},e.prototype.getLabel=function(t,e,a){var i;if("function"===typeof this.options.render)i=this.options.render({label:this.chart.config.data.labels[a],value:t.data[a],percentage:this.getPercentage(t,e,a),dataset:t,index:a});else switch(this.options.render){case"value":i=t.data[a];break;case"label":i=this.chart.config.data.labels[a];break;case"image":i=this.options.images[a]?this.loadImage(this.options.images[a]):"";break;case"percentage":default:i=this.getPercentage(t,e,a)+"%";break}return"object"===typeof i?i=this.loadImage(i):null!==i&&void 0!==i&&(i=i.toString()),i},e.prototype.getFontColor=function(t,e,a){var i=this.options.fontColor;return"function"===typeof i?i=i({label:this.chart.config.data.labels[a],value:t.data[a],percentage:this.getPercentage(t,e,a),backgroundColor:t.backgroundColor[a],dataset:t,index:a}):"string"!==typeof i&&(i=i[a]||this.chart.config.options.defaultFontColor),i},e.prototype.getPercentage=function(t,e,a){if(null!==this.percentage)return this.percentage;var i;if("polarArea"===this.chart.config.type){if(null===this.total){this.total=0;for(var n=0;n<t.data.length;++n)this.total+=t.data[n]}i=t.data[a]/this.total*100}else if("bar"===this.chart.config.type){if(void 0===this.barTotal[a]){this.barTotal[a]=0;for(n=0;n<this.chart.data.datasets.length;++n)this.barTotal[a]+=this.chart.data.datasets[n].data[a]}i=t.data[a]/this.barTotal[a]*100}else i=e._view.circumference/this.chart.config.options.circumference*100;return i=parseFloat(i.toFixed(this.options.precision)),this.options.showActualPercentages||("bar"===this.chart.config.type&&(this.totalPercentage=this.barTotalPercentage[a]||0),this.totalPercentage+=i,this.totalPercentage>100&&(i-=this.totalPercentage-100,i=parseFloat(i.toFixed(this.options.precision))),"bar"===this.chart.config.type&&(this.barTotalPercentage[a]=this.totalPercentage)),this.percentage=i,i},e.prototype.getRenderInfo=function(t,e){return"bar"===this.chart.config.type?this.getBarRenderInfo(t,e):this.options.arc?this.getArcRenderInfo(t,e):this.getBaseRenderInfo(t,e)},e.prototype.getBaseRenderInfo=function(t,e){if("outside"===this.options.position||"border"===this.options.position){var a,i,n=t._view,o=n.startAngle+(n.endAngle-n.startAngle)/2,s=n.outerRadius/2;if("border"===this.options.position?i=(n.outerRadius-s)/2+s:"outside"===this.options.position&&(i=n.outerRadius-s+s+this.options.textMargin),a={x:n.x+Math.cos(o)*i,y:n.y+Math.sin(o)*i},"outside"===this.options.position){var r=this.options.textMargin+this.measureLabel(e).width/2;a.x+=a.x<n.x?-r:r}return a}return t.tooltipPosition()},e.prototype.getArcRenderInfo=function(t,e){var a,i=t._view;a="outside"===this.options.position?i.outerRadius+this.options.fontSize+this.options.textMargin:"border"===this.options.position?(i.outerRadius/2+i.outerRadius)/2:(i.innerRadius+i.outerRadius)/2;var n=i.startAngle,o=i.endAngle,s=o-n;n+=Math.PI/2,o+=Math.PI/2;var r=this.measureLabel(e);return n+=(o-(r.width/a+n))/2,{radius:a,startAngle:n,endAngle:o,totalAngle:s,view:i}},e.prototype.getBarRenderInfo=function(t,e){var a=t.tooltipPosition();return a.y-=this.measureLabel(e).height/2+this.options.textMargin,a},e.prototype.drawable=function(t,e,a){if(this.options.overlap)return!0;if(this.options.arc)return a.endAngle-a.startAngle<=a.totalAngle;var i=this.measureLabel(e),n=a.x-i.width/2,o=a.x+i.width/2,s=a.y-i.height/2,r=a.y+i.height/2;return"outside"===this.options.renderInfo?this.outsideInRange(n,o,s,r):t.inRange(n,s)&&t.inRange(n,r)&&t.inRange(o,s)&&t.inRange(o,r)},e.prototype.outsideInRange=function(t,e,a,i){for(var n=this.labelBounds,o=0;o<n.length;++o){for(var s=n[o],r=[[t,a],[t,i],[e,a],[e,i]],l=0;l<r.length;++l){var d=r[l][0],c=r[l][1];if(d>=s.left&&d<=s.right&&c>=s.top&&c<=s.bottom)return!1}r=[[s.left,s.top],[s.left,s.bottom],[s.right,s.top],[s.right,s.bottom]];for(l=0;l<r.length;++l){d=r[l][0],c=r[l][1];if(d>=t&&d<=e&&c>=a&&c<=i)return!1}}return n.push({left:t,right:e,top:a,bottom:i}),!0},e.prototype.measureLabel=function(t){if("object"===typeof t)return{width:t.width,height:t.height};for(var e=0,a=t.split("\n"),i=0;i<a.length;++i){var n=this.ctx.measureText(a[i]);n.width>e&&(e=n.width)}return{width:e,height:this.options.fontSize*a.length}},e.prototype.loadImage=function(t){var e=new Image;return e.src=t.src,e.width=t.width,e.height=t.height,e},Chart.plugins.register({id:"labels",beforeDatasetsUpdate:function(a,i){if(t[a.config.type]){Array.isArray(i)||(i=[i]);var n=i.length;a._labels&&n===a._labels.length||(a._labels=i.map((function(){return new e})));for(var o=!1,s=0,r=0;r<n;++r){var l=a._labels[r];if(l.setup(a,i[r]),"outside"===l.options.position){o=!0;var d=1.5*l.options.fontSize+l.options.outsidePadding;d>s&&(s=d)}}o&&(a.chartArea.top+=s,a.chartArea.bottom-=s)}},afterDatasetUpdate:function(e,a,i){t[e.config.type]&&e._labels.forEach((function(t){t.args[a.index]=a}))},beforeDraw:function(e){t[e.config.type]&&e._labels.forEach((function(t){t.barTotalPercentage={}}))},afterDatasetsDraw:function(e){t[e.config.type]&&e._labels.forEach((function(t){t.render()}))}})}else console.error("Can not find Chart object.");function e(){this.renderToDataset=this.renderToDataset.bind(this)}})()},bb00:function(t,e,a){},e44b:function(t,e,a){t.exports=a.p+"img/no_data@3x.c9f2b0ef.png"},ec95:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"scrollable only-y"},[t.showAlertMessage?i("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingData,expression:"loadingData"}],attrs:{align:"center"}},[i("h2",[t._v("Start messaging your customers today")]),i("span",{domProps:{innerHTML:t._s(t.$t("promote.desc.whatsapp"))}}),i("br"),i("br"),i("span",[i("el-button",{on:{click:function(e){return t.mailto()}}},[t._v("Send us e-mail")])],1)]):i("el-row",{attrs:{gutter:30}},[i("el-dialog",{attrs:{title:"Unique User Detail on "+t.monthOfTheSelected,visible:t.dialogDetailOutbound},on:{"update:visible":function(e){t.dialogDetailOutbound=e}}},[[""==t.outbondDetail?i("p",{attrs:{align:"center"}},[i("img",{attrs:{src:a("e44b"),width:"250px"}})]):i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingUniqueOutboundDetail,expression:"loadingUniqueOutboundDetail"}],staticStyle:{width:"100%"},attrs:{data:t.outbondDetail}},[i("el-table-column",{attrs:{prop:"to",label:"Number"}}),i("el-table-column",{attrs:{prop:"total",label:"Total"}})],1)]],2),i("el-col",{attrs:{xs:24,sm:24,md:24,lg:24,xl:24}},[i("div",{staticClass:"page-header header-accent card-base card-shadow--medium gradient-api"},[i("img",{staticClass:"float-image",attrs:{src:a("7b33"),width:"250px"}}),i("h2",{staticClass:"no-m white-text"},[t._v(t._s(t.$t("dashboard.documentation")))]),i("h4",{staticClass:"o-090"},[t._v(t._s(t.$t("dashboard.documentation_description")))]),i("el-button",{staticClass:"accent-text mt-20",attrs:{round:""},on:{click:function(e){return t.goToUrl(t.config.documentation)}}},[t._v(t._s(t.$t("dashboard.documentation_button")))])],1),t.showAlertError?i("error-gope-siji",{staticStyle:{"margin-bottom":"1em"}}):t._e(),t.showAlertError?t._e():i("div",{staticClass:"page-header card-base card-shadow--medium"},[i("h2",{staticClass:"no-m"},[t._v(t._s(t.$t("dashboard.setup")))]),i("el-row",{attrs:{gutter:30}},[i("el-col",{staticClass:"mt-30",attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.mostTemplate,expression:"loading.mostTemplate"}],staticClass:"card-base card-shadow--medium p-10"},[i("chart",{attrs:{type:t.donutDataTopHsm.type,data:t.donutHsmData,options:t.donutHsmOptions}})],1)]),i("el-col",{staticClass:"mt-30",attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.uniqueOutbound,expression:"loading.uniqueOutbound"}],staticClass:"card-base card-shadow--medium p-10"},[i("chart",{attrs:{type:t.uniqueOutboundDonuts.type,data:t.uniqueOutboundData,options:t.uniqueOutboundOptions}})],1)]),i("el-col",{staticClass:"mt-20",attrs:{xs:12,sm:12,md:12,lg:12,xl:4}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.ticket,expression:"loading.ticket"}],staticClass:"card-base card-shadow--medium mb-30 widget small-widget"},[i("div",{staticClass:"widget-header ph-20 pt-20"},[i("div",{staticClass:"flex justify-center align-center"},[i("div",{staticClass:"widget-icon-box mr-20 animated fadeInRight"},[i("i",{staticClass:"widget-icon mdi mdi-email-alert accent-text fs-30"}),i("div",{staticClass:"badge-box"})]),i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Open Ticket")])])]),i("div",{staticClass:"flex justify-center align-center mb-20"},[i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft mr-10"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Prev Month")]),i("h2",{staticClass:"m-0 text-truncate ml-40"},[t._v(t._s(t.ticketPrevMonth.open.toLocaleString("id",{minimumFractionDigits:0==Number.isInteger(t.ticketPrevMonth.open)?4:void 0})))])])])]),i(t.asyncComponent,{tag:"component",attrs:{type:"bar",options:{width:"100%",height:80,fill:["#129393"]},data:[3,5,2,3,4,7,2,8,4,5,4,6,9,8,10,6,5,10,7,4].toString()}})],1)]),i("el-col",{staticClass:"mt-20",attrs:{xs:12,sm:12,md:12,lg:12,xl:4}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.ticket,expression:"loading.ticket"}],staticClass:"card-base card-shadow--medium mb-30 widget small-widget"},[i("div",{staticClass:"widget-header ph-20 pt-20"},[i("div",{staticClass:"flex justify-center align-center"},[i("div",{staticClass:"widget-icon-box mr-20 animated fadeInRight"},[i("i",{staticClass:"widget-icon mdi mdi-email-alert accent-text fs-30"}),i("div",{staticClass:"badge-box"})]),i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Open Ticket")])])]),i("div",{staticClass:"flex justify-center align-center mb-20"},[i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft mr-10"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Current Month")]),i("h2",{staticClass:"m-0 text-truncate ml-40"},[t._v(t._s(t.ticketCurrMonth.open.toLocaleString("id",{minimumFractionDigits:0==Number.isInteger(t.ticketCurrMonth.open)?4:void 0})))])])])]),i(t.asyncComponent,{tag:"component",attrs:{type:"bar",options:{width:"100%",height:80,fill:["#000000"]},data:[3,5,2,3,4,7,2,8,4,5,4,6,9,8,10,6,5,10,7,4].toString()}})],1)]),i("el-col",{staticClass:"mt-20",attrs:{xs:12,sm:12,md:12,lg:12,xl:4}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.ticket,expression:"loading.ticket"}],staticClass:"card-base card-shadow--medium mb-30 widget small-widget"},[i("div",{staticClass:"widget-header ph-20 pt-20"},[i("div",{staticClass:"flex justify-center align-center"},[i("div",{staticClass:"widget-icon-box mr-20 animated fadeInRight"},[i("i",{staticClass:"widget-icon mdi mdi-email-open accent-text fs-30"}),i("div",{staticClass:"badge-box"})]),i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Process Ticket")])])]),i("div",{staticClass:"flex justify-center align-center mb-20"},[i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft mr-10"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Previous Month")]),i("h2",{staticClass:"m-0 text-truncate ml-40"},[t._v(t._s(t.ticketPrevMonth.process.toLocaleString("id",{minimumFractionDigits:0==Number.isInteger(t.ticketPrevMonth.process)?4:void 0})))])])])]),i(t.asyncComponent,{tag:"component",attrs:{type:"bar",options:{width:"100%",height:80,fill:["#129393"]},data:[3,5,2,3,4,7,2,8,4,5,4,6,9,8,10,6,5,10,7,4].toString()}})],1)]),i("el-col",{staticClass:"mt-20",attrs:{xs:12,sm:12,md:12,lg:12,xl:4}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.ticket,expression:"loading.ticket"}],staticClass:"card-base card-shadow--medium mb-30 widget small-widget"},[i("div",{staticClass:"widget-header ph-20 pt-20"},[i("div",{staticClass:"flex justify-center align-center"},[i("div",{staticClass:"widget-icon-box mr-20 animated fadeInRight"},[i("i",{staticClass:"widget-icon mdi mdi-email-open accent-text fs-30"}),i("div",{staticClass:"badge-box"})]),i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Process Ticket")])])]),i("div",{staticClass:"flex justify-center align-center mb-20"},[i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft mr-10"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Current Month")]),i("h2",{staticClass:"m-0 text-truncate ml-40"},[t._v(t._s(t.ticketCurrMonth.process.toLocaleString("id",{minimumFractionDigits:0==Number.isInteger(t.ticketCurrMonth.process)?4:void 0})))])])])]),i(t.asyncComponent,{tag:"component",attrs:{type:"bar",options:{width:"100%",height:80,fill:["#000000"]},data:[3,5,2,3,4,7,2,8,4,5,4,6,9,8,10,6,5,10,7,4].toString()}})],1)]),i("el-col",{staticClass:"mt-20",attrs:{xs:12,sm:12,md:12,lg:12,xl:4}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.ticket,expression:"loading.ticket"}],staticClass:"card-base card-shadow--medium mb-30 widget small-widget"},[i("div",{staticClass:"widget-header ph-20 pt-20"},[i("div",{staticClass:"flex justify-center align-center"},[i("div",{staticClass:"widget-icon-box mr-20 animated fadeInRight"},[i("i",{staticClass:"widget-icon mdi mdi-email-secure accent-text fs-30"}),i("div",{staticClass:"badge-box"})]),i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Closed Ticket")])])]),i("div",{staticClass:"flex justify-center align-center mb-20"},[i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft mr-10"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Previous Month")]),i("h2",{staticClass:"m-0 text-truncate ml-40"},[t._v(t._s(t.ticketPrevMonth.close.toLocaleString("id",{minimumFractionDigits:0==Number.isInteger(t.ticketPrevMonth.close)?4:void 0})))])])])]),i(t.asyncComponent,{tag:"component",attrs:{type:"bar",options:{width:"100%",height:80,fill:["#129393"]},data:[3,5,2,3,4,7,2,8,4,5,4,6,9,8,10,6,5,10,7,4].toString()}})],1)]),i("el-col",{staticClass:"mt-20",attrs:{xs:12,sm:12,md:12,lg:12,xl:4}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.ticket,expression:"loading.ticket"}],staticClass:"card-base card-shadow--medium mb-30 widget small-widget"},[i("div",{staticClass:"widget-header ph-20 pt-20"},[i("div",{staticClass:"flex justify-center align-center"},[i("div",{staticClass:"widget-icon-box mr-20 animated fadeInRight"},[i("i",{staticClass:"widget-icon mdi mdi-email-secure accent-text fs-30"}),i("div",{staticClass:"badge-box"})]),i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Closed Ticket")])])]),i("div",{staticClass:"flex justify-center align-center mb-20"},[i("div",{staticClass:"widget-info box grow text-truncate animated fadeInLeft mr-10"},[i("div",{staticClass:"o-050 widget-title text-truncate pt-5 pb-10"},[t._v("Current Month")]),i("h2",{staticClass:"m-0 text-truncate ml-40"},[t._v(t._s(t.ticketCurrMonth.close.toLocaleString("id",{minimumFractionDigits:0==Number.isInteger(t.ticketCurrMonth.close)?4:void 0})))])])])]),i(t.asyncComponent,{tag:"component",attrs:{type:"bar",options:{width:"100%",height:80,fill:["#000000"]},data:[3,5,2,3,4,7,2,8,4,5,4,6,9,8,10,6,5,10,7,4].toString()}})],1)]),i("el-col",{staticClass:"mt-10",attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.overview,expression:"loading.overview"}],staticClass:"card-base bg-accent card-shadow--medium p-10"},[i("h3",{staticClass:"mt-0 mb-40 white-text o-050 animated slideInUp"},[t._v("Total Notification")]),i("div",{directives:[{name:"echarts",rawName:"v-echarts",value:t.chartOptionNotification,expression:"chartOptionNotification"}],staticClass:"chart"})])]),i("el-col",{staticClass:"mt-10",attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.overview,expression:"loading.overview"}],staticClass:"card-base bg-accent card-shadow--medium p-10"},[i("h3",{staticClass:"mt-0 mb-40 white-text o-050 animated slideInUp"},[t._v("Total Outbond")]),i("div",{directives:[{name:"echarts",rawName:"v-echarts",value:t.chartOptionOutbond,expression:"chartOptionOutbond"}],staticClass:"chart"})])])],1)],1)],1)],1)],1)},n=[],o=(a("7f7f"),a("a481"),a("ac6a"),a("96cf"),a("1da1")),s=a("db49"),r=a("271f"),l=a("c1df"),d=a.n(l),c=a("2ef0"),u=a.n(c),h=a("f858"),g=a("b204"),p=a("8521"),m=a.n(p),f=a("c0d6"),b={name:"Dashboard",directives:{echarts:h["a"]},components:{Chart:g["a"],ChartLabel:m.a},data:function(){return{businessId:"",customer_type:f["a"].getters.customer_type,asyncComponent:"peity",monthOfTheSelected:"",dialogDetailOutbound:!1,loadingUniqueOutboundDetail:!1,user:f["a"].getters.userID,startDate:"",endDate:"",outbondDetail:[],resized:!1,config:s["a"],loadingWA:!0,loading:{ticket:!0,overview:!0,mostTemplate:!0,uniqueUser:!0,uniqueOutbound:!1},showAlertMessage:!1,showAlertError:!1,loadingTable:!0,isLoading:!0,totalWA:0,totalBill:0,loadingContact:!0,totalContact:0,selectedPhoneNumber:"",companyPhone:"",monthName:d()().format("MMMM"),prevMonth:d()().subtract(1,"months").format("YYYY-MM"),currentMonth:d()().format("YYYY-MM"),prevMonthTicket:"".concat(d()().subtract(1,"months").format("YYYY-MM"),"-01 00:00:00"),currentMonthTicket:"".concat(d()().format("YYYY-MM"),"-01 00:00:00"),ticketPrevMonth:{open:0,process:0,close:0},ticketCurrMonth:{open:0,process:0,close:0},thisMonth:{tanggal:[0],textTotal:[0],image:{total:[0]},hsm:{total:[0]},document:{total:[0]},audio:{total:[0]},outbond:{total:[0]}},previousMonth:{tanggal:[0],textTotal:[0],image:{total:[0]},hsm:{total:[0]},document:{total:[0]},audio:{total:[0]},outbond:{total:[0]}},chartOptionNotification:{areaColor:"#FFF",grid:{show:!1,left:"20px",right:"50px",bottom:"20px",top:"20px",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{show:!1,data:["line","bar"],textStyle:{color:"#ccc"}},xAxis:[{type:"category",boundaryGap:!1,data:[0],axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],series:[{name:"Total Notification Previous Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#fff"},itemStyle:{color:"#fff",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]},{name:"Total Notification This Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#f98643"},itemStyle:{color:"#f98643",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]}]},chartOptionOutbond:{areaColor:"#FFF",grid:{show:!1,left:"20px",right:"50px",bottom:"20px",top:"20px",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{show:!1,data:["line","bar"],textStyle:{color:"#ccc"}},xAxis:[{type:"category",boundaryGap:!1,data:[0],axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],series:[{name:"Total Outbond Previous Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#fff"},itemStyle:{color:"#fff",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]},{name:"Total Outbond This Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#f98643"},itemStyle:{color:"#f98643",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]}]},donutHsmData:{labels:[],datasets:[{data:[],backgroundColor:["#4aa0f1","#249393","#bb4c3f","#ed6c63","#97cd76","#ff8a65","#964af1","#5d4037","#00796b","#827717","#7986cb","#7f8c8d"]}]},donutHsmOptions:{segmentShowStroke:!1,responsive:!0,legend:{position:"left"},title:{display:!0,text:"Most Used Template This Month"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#ffff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}}},donutDataTopHsm:{labels:[],data:[],type:"pie"},donutUniqueData:{labels:[],datasets:[{data:[],backgroundColor:["#4aa0f1","#249393","#bb4c3f","#ed6c63","#97cd76","#ff8a65","#964af1","#5d4037","#00796b","#827717","#7986cb"]}]},donutUniqueOptions:{segmentShowStroke:!1,responsive:!0,legend:{position:"left",orient:"vertical",x:"left"},title:{display:!0,text:"Total Unique User"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#fff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}}},donutDataUnique:{labels:[],data:[],type:"pie",labelLine:{normal:{show:!0}},selectedMode:"single",radius:[0,"30%"]},uniqueOutboundDonuts:{labels:[],data:[],type:"pie",labelLine:{normal:{show:!0}},selectedMode:"single",radius:["50%","70%"]},uniqueOutboundData:{labels:[],datasets:[{data:[],backgroundColor:["#4aa0f2","#249393","#bb4c3f","#ed6c63","#97cd76","#ff8a65","#5d4037","#00796b","#827717","#7986cb","#964af1"]}]},uniqueOutboundOptions:{segmentShowStroke:!1,responsive:!0,legend:{onClick:function(t){},display:!0,position:"left",orient:"vertical",x:"left"},title:{display:!0,text:"Total Unique User"},animation:{animateScale:!0,animateRotate:!0,animationDelay:function(t){return 200*Math.random()}},plugins:{labels:{render:"value",fontSize:12,fontColor:"#fff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}}}}},computed:{smallWidget:function(){return this.dashboardWidth>=970&&this.dashboardWidth<=1412&&this.windowWidth>=1200}},methods:{dialogDetail:function(){this.dialogDetailOutbound=!0},checkBusinessId:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])({method:"get",url:"bussiness/checkBusinessId"}).then((function(t){200!=t.data.ec&&"not_subscribe"==t.data.message?e.showAlertMessage=!0:e.businessId=t.data.dataString})).catch((function(t){}));case 2:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}(),overview_contact:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])({method:"get",url:"phonebook/all"}).then((function(t){var a=t.data;e.totalContact=a.numRows})).catch((function(t){}));case 2:this.loadingContact=!1;case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),wa_detail:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])({method:"post",url:"user/detail/number",data:{channels:"whatsapp"}}).then((function(t){e.companyPhone=t.data.data,e.selectedPhoneNumber=e.companyPhone[0]})).catch((function(t){}));case 2:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}(),wa_billing_previous_month:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])({method:"post",url:"user/overview",data:{months:this.prevMonth,with_date:!0,number:this.selectedPhoneNumber}}).then((function(t){if(e.loadingData=!1,200==t.data.ec){e.showAlertError=!1;var a=t.data.data,i=new Array,n={total:new Array},o={total:new Array},s={total:new Array},r={total:new Array},l={total:new Array},c={total:new Array};new Array;u.a.forOwn(a,(function(t,e){var a=d()(e).format("YYYY-MM-DD");i.push(a);var u=t.text.delivered+t.text.read+t.text.sent,h=t.text.failed+t.text.invalid;n.total.push(u+h);var g=t.image.delivered+t.image.read+t.image.sent,p=t.image.failed+t.image.invalid;o.total.push(g+p);var m=t.hsm.delivered+t.hsm.read+t.hsm.sent,f=t.hsm.failed+t.hsm.invalid;s.total.push(m+f);var b=t.document.delivered+t.document.read+t.document.sent,v=t.document.failed+t.document.invalid;r.total.push(b+v);var w=t.audio.delivered+t.audio.read+t.audio.sent,x=t.audio.failed+t.audio.invalid;l.total.push(w+x);var y=u+g+b+w,C=h+p+v+x;c.total.push(y+C)})),e.previousMonth.tanggal=i,e.previousMonth.textTotal=n.total,e.previousMonth.image=o,e.previousMonth.hsm=s,e.previousMonth.document=r,e.previousMonth.audio=l,e.previousMonth.outbond=c}else 400==t.data.ec&&"not_subscribe"==t.data.message?e.showAlertMessage=!0:500==t.data.ec&&(e.showAlertError=!0)})).catch((function(t){e.loadingData=!1,e.showAlertError=!0}));case 2:this.isLoading=!1;case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),wa_billing_current_month:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])({method:"post",url:"user/overview",data:{months:this.currentMonth,with_date:!0,number:this.selectedPhoneNumber}}).then((function(t){if(e.loadingData=!1,200==t.data.ec){e.showAlertError=!1;var a=t.data.data,i=new Array,n={total:new Array},o={total:new Array},s={total:new Array},r={total:new Array},l={total:new Array},c={total:new Array};new Array;u.a.forOwn(a,(function(t,e){var a=d()(e).format("YYYY-MM-DD");i.push(a);var u=t.text.delivered+t.text.read+t.text.sent,h=t.text.failed+t.text.invalid;n.total.push(u+h);var g=t.image.delivered+t.image.read+t.image.sent,p=t.image.failed+t.image.invalid;o.total.push(g+p);var m=t.hsm.delivered+t.hsm.read+t.hsm.sent,f=t.hsm.failed+t.hsm.invalid;s.total.push(m+f);var b=t.document.delivered+t.document.read+t.document.sent,v=t.document.failed+t.document.invalid;r.total.push(b+v);var w=t.audio.delivered+t.audio.read+t.audio.sent,x=t.audio.failed+t.audio.invalid;l.total.push(w+x);var y=u+g+b+w,C=h+p+v+x;c.total.push(y+C)})),e.thisMonth.tanggal=i,e.thisMonth.textTotal=n.total,e.thisMonth.image=o,e.thisMonth.hsm=s,e.thisMonth.document=r,e.thisMonth.audio=l,e.thisMonth.outbond=c}else 400==t.data.ec&&"not_subscribe"==t.data.message?e.showAlertMessage=!0:500==t.data.ec&&(e.showAlertError=!0)})).catch((function(t){e.loadingData=!1,e.showAlertError=!0}));case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),renderChart:function(){var t=Object.assign({},this.chartOptionNotification),e=Object.assign({},this.chartOptionOutbond);t.xAxis[0].data=this.thisMonth.tanggal,t.series[0].data=this.previousMonth.hsm.total,t.series[1].data=this.thisMonth.hsm.total,e.xAxis[0].data=this.thisMonth.tanggal,e.series[0].data=this.previousMonth.outbond.total,e.series[1].data=this.thisMonth.outbond.total,this.chartOptionNotification=t,this.chartOptionOutbond=e,this.isLoading=!1},getTicketPreviousMonth:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])({method:"post",url:"user/ticket",data:{month:this.prevMonthTicket}}).then((function(t){var a=t.data.data;200==t.data.ec&&(e.ticketPrevMonth.open=a.open,e.ticketPrevMonth.process=a.onproccess,e.ticketPrevMonth.close=a.close)})).catch((function(t){}));case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getTicketCurrentMonth:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])({method:"post",url:"user/ticket",data:{month:this.currentMonthTicket}}).then((function(t){var a=t.data.data;200==t.data.ec&&(e.ticketCurrMonth.open=a.open,e.ticketCurrMonth.process=a.onproccess,e.ticketCurrMonth.close=a.close)})).catch((function(t){}));case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getTopHsm:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading.mostTemplate=!0,t.next=3,Object(r["a"])({method:"post",url:"user/top-hsm"}).then((function(t){var a=t.data.data,i=[],n=[];u.a.forEach(a,(function(t){i.push(t.name.replace("hsm:","").replace("hsm_group:","")),n.push(t.total)})),e.donutDataTopHsm.labels=i,e.donutDataTopHsm.data=n})).catch((function(t){}));case 3:this.renderDoughnutTopHsm(),this.loading.mostTemplate=!1;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),renderDoughnutTopHsm:function(){var t=Object.assign({},this.donutHsmData);t.labels=this.donutDataTopHsm.labels,t.datasets[0].data=this.donutDataTopHsm.data,this.donutHsmData=t,this.donutDataTopHsm.type="doughnut",this.isLoading=!1},getUniqueUser:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading.uniqueUser=!0,t.next=3,Object(r["a"])({method:"post",url:"user/unique-user"}).then((function(t){var a=t.data.data,i=[],n=[];u.a.forEach(a,(function(t){var e=d()(t.Month).format("MMMM");i.push(e),n.push(t.totalUnique)})),e.donutDataUnique.labels=i,e.donutDataUnique.data=n})).catch((function(t){}));case 3:this.renderDoughnutUniqueUser(),this.loading.uniqueUser=!1;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),renderDoughnutUniqueUser:function(){var t=Object.assign({},this.donutUniqueData);t.labels=this.donutDataUnique.labels,t.datasets[0].data=this.donutDataUnique.data,this.donutUniqueData=t,this.donutDataUnique.type="doughnut",this.isLoading=!1},renderDoughnutUniqueOutbound:function(){var t=this,e=Object.assign({},this.uniqueOutboundData);e.labels=this.uniqueOutboundDonuts.labels,e.datasets[0].data=this.uniqueOutboundDonuts.data,this.uniqueOutboundData=e,this.uniqueOutboundOptions.onClick=function(e,a){var i=a[0]._view.label,n=i.substring(0,3);t.monthOfTheSelected=i,n=d()().month(n).format("YYYY-MM-DD");var o=d()(n).startOf("month").format("YYYY-MM-DD"),s=d()(n).endOf("month").format("YYYY-MM-DD");t.uniqueOutboundDetail(o,s),t.dialogDetailOutbound=!0},this.uniqueOutboundDonuts.type="doughnut",this.isLoading=!1},goToUrl:function(t){var e=window.open(t,"_blank");e.focus()},fetchTicket:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading.ticket=!0,t.next=3,this.getTicketPreviousMonth();case 3:return t.next=5,this.getTicketCurrentMonth();case 5:this.loading.ticket=!1;case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),fetchOverview:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading.overview=!0,t.next=3,this.wa_billing_previous_month();case 3:return t.next=5,this.wa_billing_current_month();case 5:return t.next=7,this.renderChart();case 7:this.loading.overview=!1;case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),uniqueOutbound:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading.uniqueOutbound=!0,t.next=3,Object(r["a"])({method:"get",url:"uniqueOutbound"}).then((function(t){e.loadingData=!1,e.isLoading=!1;var a=t.data.data,i=[],n=[];u.a.forEach(a,(function(t){var e=d()(t.month).format("MMMM");i.push(e),n.push(t.total)})),e.uniqueOutboundDonuts.labels=i,e.uniqueOutboundDonuts.data=n})).catch((function(t){e.loadingData=!1,e.showAlertError=!0,e.showFormMessage=!1}));case 3:this.renderDoughnutUniqueOutbound(),this.loading.uniqueOutbound=!1;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),uniqueOutboundDetail:function(t,e){var a=this;this.loadingUniqueOutboundDetail=!0,Object(r["a"])({method:"get",url:"uniqueOutbound/detail",params:{user:this.user,startDate:t,endDate:e}}).then((function(t){a.outbondDetail=t.data.data.result.data,a.loadingUniqueOutboundDetail=!1})).catch((function(t){a.$message({showClose:!0,message:"Cannot get unique user detail",type:"error"})}))}},mounted:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.customer_type,this.checkBusinessId(),t.next=4,this.wa_detail();case 4:this.fetchOverview(),this.fetchTicket(),this.getTopHsm(),this.getUniqueUser(),this.uniqueOutbound();case 9:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},v=b,w=(a("fc0c"),a("7d56"),a("2877")),x=Object(w["a"])(v,i,n,!1,null,"0da84c2c",null);e["default"]=x.exports},fc0c:function(t,e,a){"use strict";a("bb00")},ff2e6:function(t,e,a){}}]);