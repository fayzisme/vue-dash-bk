(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["helpdesk~helpdesk-report~telegram~whatsapp-report~31ecd969"],{"0a49":function(t,i,n){var e=n("9b43"),o=n("626a"),r=n("4bf8"),s=n("9def"),a=n("cd1c");t.exports=function(t,i){var n=1==t,c=2==t,u=3==t,l=4==t,f=6==t,h=5==t||f,d=i||a;return function(i,a,v){for(var p,_,w=r(i),y=o(w),k=e(a,v,3),g=s(y.length),m=0,b=n?d(i,g):c?d(i,0):void 0;g>m;m++)if((h||m in y)&&(p=y[m],_=k(p,m,w),t))if(n)b[m]=_;else if(_)switch(t){case 3:return!0;case 5:return p;case 6:return m;case 2:b.push(p)}else if(l)return!1;return f?-1:u||l?l:b}}},1169:function(t,i,n){var e=n("2d95");t.exports=Array.isArray||function(t){return"Array"==e(t)}},7514:function(t,i,n){"use strict";var e=n("5ca1"),o=n("0a49")(5),r="find",s=!0;r in[]&&Array(1)[r]((function(){s=!1})),e(e.P+e.F*s,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(r)},"935a":function(t,i,n){"use strict";n("c52f")},b730:function(t,i,n){(function(i){
/**
 * @license
 *
 * Push v1.0.9
 * =========
 * A compact, cross-browser solution for the JavaScript Notifications API
 *
 * Credits
 * -------
 * Tsvetan Tsvetkov (ttsvetko)
 * Alex Gibson (alexgibson)
 *
 * License
 * -------
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-2017 Tyler Nickerson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
!function(i,n){t.exports=n()}(0,(function(){"use strict";var t={errors:{incompatible:"".concat("PushError:"," Push.js is incompatible with browser."),invalid_plugin:"".concat("PushError:"," plugin class missing from plugin manifest (invalid plugin). Please check the documentation."),invalid_title:"".concat("PushError:"," title of notification must be a string"),permission_denied:"".concat("PushError:"," permission request declined"),sw_notification_error:"".concat("PushError:"," could not show a ServiceWorker notification due to the following reason: "),sw_registration_error:"".concat("PushError:"," could not register the ServiceWorker due to the following reason: "),unknown_interface:"".concat("PushError:"," unable to create notification: unknown interface")}};function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function e(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function o(t,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function r(t,i,n){return i&&o(t.prototype,i),n&&o(t,n),t}function s(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),i&&c(t,i)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,i){return(c=Object.setPrototypeOf||function(t,i){return t.__proto__=i,t})(t,i)}function u(t,i){return!i||"object"!=typeof i&&"function"!=typeof i?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):i}var l=function(){function t(i){e(this,t),this._win=i,this.GRANTED="granted",this.DEFAULT="default",this.DENIED="denied",this._permissions=[this.GRANTED,this.DEFAULT,this.DENIED]}return r(t,[{key:"request",value:function(t,i){return arguments.length>0?this._requestWithCallback.apply(this,arguments):this._requestAsPromise()}},{key:"_requestWithCallback",value:function(t,i){var n,e=this,o=this.get(),r=!1,s=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e._win.Notification.permission;r||(r=!0,void 0===n&&e._win.webkitNotifications&&(n=e._win.webkitNotifications.checkPermission()),n===e.GRANTED||0===n?t&&t():i&&i())};o!==this.DEFAULT?s(o):this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._win.webkitNotifications.requestPermission(s):this._win.Notification&&this._win.Notification.requestPermission?(n=this._win.Notification.requestPermission(s))&&n.then&&n.then(s).catch((function(){i&&i()})):t&&t()}},{key:"_requestAsPromise",value:function(){var t=this,i=this.get(),n=i!==this.DEFAULT,e=this._win.Notification&&this._win.Notification.requestPermission,o=this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission;return new Promise((function(r,s){var a,c=!1,u=function(i){c||(c=!0,function(i){return i===t.GRANTED||0===i}(i)?r():s())};n?u(i):o?t._win.webkitNotifications.requestPermission((function(t){u(t)})):e?(a=t._win.Notification.requestPermission(u))&&a.then&&a.then(u).catch(s):r()}))}},{key:"has",value:function(){return this.get()===this.GRANTED}},{key:"get",value:function(){return this._win.Notification&&this._win.Notification.permission?this._win.Notification.permission:this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._permissions[this._win.webkitNotifications.checkPermission()]:navigator.mozNotification?this.GRANTED:this._win.external&&this._win.external.msIsSiteMode?this._win.external.msIsSiteMode()?this.GRANTED:this.DEFAULT:this.GRANTED}}]),t}(),f=function(){function t(){e(this,t)}return r(t,null,[{key:"isUndefined",value:function(t){return void 0===t}},{key:"isNull",value:function(t){return null===obj}},{key:"isString",value:function(t){return"string"==typeof t}},{key:"isFunction",value:function(t){return t&&"[object Function]"==={}.toString.call(t)}},{key:"isObject",value:function(t){return"object"===n(t)}},{key:"objectMerge",value:function(t,i){for(var n in i)t.hasOwnProperty(n)&&this.isObject(t[n])&&this.isObject(i[n])?this.objectMerge(t[n],i[n]):t[n]=i[n]}}]),t}(),h=function t(i){e(this,t),this._win=i},d=function(t){function i(){return e(this,i),u(this,a(i).apply(this,arguments))}return s(i,h),r(i,[{key:"isSupported",value:function(){return void 0!==this._win.Notification}},{key:"create",value:function(t,i){return new this._win.Notification(t,{icon:f.isString(i.icon)||f.isUndefined(i.icon)||f.isNull(i.icon)?i.icon:i.icon.x32,body:i.body,tag:i.tag,requireInteraction:i.requireInteraction})}},{key:"close",value:function(t){t.close()}}]),i}(),v=function(i){function n(){return e(this,n),u(this,a(n).apply(this,arguments))}return s(n,h),r(n,[{key:"isSupported",value:function(){return void 0!==this._win.navigator&&void 0!==this._win.navigator.serviceWorker}},{key:"getFunctionBody",value:function(t){var i=t.toString().match(/function[^{]+{([\s\S]*)}$/);return null!=i&&i.length>1?i[1]:null}},{key:"create",value:function(i,n,e,o,r){var s=this;this._win.navigator.serviceWorker.register(o),this._win.navigator.serviceWorker.ready.then((function(o){var a={id:i,link:e.link,origin:document.location.href,onClick:f.isFunction(e.onClick)?s.getFunctionBody(e.onClick):"",onClose:f.isFunction(e.onClose)?s.getFunctionBody(e.onClose):""};void 0!==e.data&&null!==e.data&&(a=Object.assign(a,e.data)),o.showNotification(n,{icon:e.icon,body:e.body,vibrate:e.vibrate,tag:e.tag,data:a,requireInteraction:e.requireInteraction,silent:e.silent}).then((function(){o.getNotifications().then((function(t){o.active.postMessage(""),r(t)}))})).catch((function(i){throw new Error(t.errors.sw_notification_error+i.message)}))})).catch((function(i){throw new Error(t.errors.sw_registration_error+i.message)}))}},{key:"close",value:function(){}}]),n}(),p=function(t){function i(){return e(this,i),u(this,a(i).apply(this,arguments))}return s(i,h),r(i,[{key:"isSupported",value:function(){return void 0!==this._win.navigator.mozNotification}},{key:"create",value:function(t,i){var n=this._win.navigator.mozNotification.createNotification(t,i.body,i.icon);return n.show(),n}}]),i}(),_=function(t){function i(){return e(this,i),u(this,a(i).apply(this,arguments))}return s(i,h),r(i,[{key:"isSupported",value:function(){return void 0!==this._win.external&&void 0!==this._win.external.msIsSiteMode}},{key:"create",value:function(t,i){return this._win.external.msSiteModeClearIconOverlay(),this._win.external.msSiteModeSetIconOverlay(f.isString(i.icon)||f.isUndefined(i.icon)?i.icon:i.icon.x16,t),this._win.external.msSiteModeActivate(),null}},{key:"close",value:function(){this._win.external.msSiteModeClearIconOverlay()}}]),i}(),w=function(t){function i(){return e(this,i),u(this,a(i).apply(this,arguments))}return s(i,h),r(i,[{key:"isSupported",value:function(){return void 0!==this._win.webkitNotifications}},{key:"create",value:function(t,i){var n=this._win.webkitNotifications.createNotification(i.icon,t,i.body);return n.show(),n}},{key:"close",value:function(t){t.cancel()}}]),i}();return new(function(){function i(t){e(this,i),this._currentId=0,this._notifications={},this._win=t,this.Permission=new l(t),this._agents={desktop:new d(t),chrome:new v(t),firefox:new p(t),ms:new _(t),webkit:new w(t)},this._configuration={serviceWorker:"/serviceWorker.min.js",fallback:function(t){}}}return r(i,[{key:"_closeNotification",value:function(i){var n=!0,e=this._notifications[i];if(void 0!==e){if(n=this._removeNotification(i),this._agents.desktop.isSupported())this._agents.desktop.close(e);else if(this._agents.webkit.isSupported())this._agents.webkit.close(e);else{if(!this._agents.ms.isSupported())throw n=!1,new Error(t.errors.unknown_interface);this._agents.ms.close()}return n}return!1}},{key:"_addNotification",value:function(t){var i=this._currentId;return this._notifications[i]=t,this._currentId++,i}},{key:"_removeNotification",value:function(t){var i=!1;return this._notifications.hasOwnProperty(t)&&(delete this._notifications[t],i=!0),i}},{key:"_prepareNotification",value:function(t,i){var n,e=this;return n={get:function(){return e._notifications[t]},close:function(){e._closeNotification(t)}},i.timeout&&setTimeout((function(){n.close()}),i.timeout),n}},{key:"_serviceWorkerCallback",value:function(t,i,n){var e=this,o=this._addNotification(t[t.length-1]);navigator&&navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",(function(t){var i=JSON.parse(t.data);"close"===i.action&&Number.isInteger(i.id)&&e._removeNotification(i.id)})),n(this._prepareNotification(o,i))),n(null)}},{key:"_createCallback",value:function(t,i,n){var e,o=this,r=null;if(i=i||{},e=function(t){o._removeNotification(t),f.isFunction(i.onClose)&&i.onClose.call(o,r)},this._agents.desktop.isSupported())try{r=this._agents.desktop.create(t,i)}catch(e){var s=this._currentId,a=this.config().serviceWorker;this._agents.chrome.isSupported()&&this._agents.chrome.create(s,t,i,a,(function(t){return o._serviceWorkerCallback(t,i,n)}))}else this._agents.webkit.isSupported()?r=this._agents.webkit.create(t,i):this._agents.firefox.isSupported()?this._agents.firefox.create(t,i):this._agents.ms.isSupported()?r=this._agents.ms.create(t,i):(i.title=t,this.config().fallback(i));if(null!==r){var c=this._addNotification(r),u=this._prepareNotification(c,i);f.isFunction(i.onShow)&&r.addEventListener("show",i.onShow),f.isFunction(i.onError)&&r.addEventListener("error",i.onError),f.isFunction(i.onClick)&&r.addEventListener("click",i.onClick),r.addEventListener("close",(function(){e(c)})),r.addEventListener("cancel",(function(){e(c)})),n(u)}n(null)}},{key:"create",value:function(i,n){var e,o=this;if(!f.isString(i))throw new Error(t.errors.invalid_title);return e=this.Permission.has()?function(t,e){try{o._createCallback(i,n,t)}catch(t){e(t)}}:function(e,r){o.Permission.request().then((function(){o._createCallback(i,n,e)})).catch((function(){r(t.errors.permission_denied)}))},new Promise(e)}},{key:"count",value:function(){var t,i=0;for(t in this._notifications)this._notifications.hasOwnProperty(t)&&i++;return i}},{key:"close",value:function(t){var i;for(i in this._notifications)if(this._notifications.hasOwnProperty(i)&&this._notifications[i].tag===t)return this._closeNotification(i)}},{key:"clear",value:function(){var t,i=!0;for(t in this._notifications)this._notifications.hasOwnProperty(t)&&(i=i&&this._closeNotification(t));return i}},{key:"supported",value:function(){var t=!1;for(var i in this._agents)this._agents.hasOwnProperty(i)&&(t=t||this._agents[i].isSupported());return t}},{key:"config",value:function(t){return(void 0!==t||null!==t&&f.isObject(t))&&f.objectMerge(this._configuration,t),this._configuration}},{key:"extend",value:function(i){var n,e={}.hasOwnProperty;if(!e.call(i,"plugin"))throw new Error(t.errors.invalid_plugin);for(var o in e.call(i,"config")&&f.isObject(i.config)&&null!==i.config&&this.config(i.config),n=new(0,i.plugin)(this.config()))e.call(n,o)&&f.isFunction(n[o])&&(this[o]=n[o])}}]),i}())("undefined"!=typeof window?window:i)}))}).call(this,n("c8ba"))},bce9:function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("el-dialog",{attrs:{"show-close":!0,"custom-class":"user-dialog",visible:t.dialogvisible},on:{close:function(i){return t.$emit("update:dialogvisible",!1)}}},[n("div",{staticClass:"avatar-box"},[n("span",{staticClass:"align-vertical-middle card-shadow--small",style:"background-color:hsl("+360*Math.random()+","+(25+70*Math.random())+"%,"+(85+10*Math.random())+"%)"},[t._v(" "+t._s((t.userdata.name||"").split(" ").map((function(t){return t[0]})).join("").slice(0,2))+" ")])]),n("div",{staticClass:"form-box"},[n("el-input",{attrs:{placeholder:"Title",readonly:t.readonly},model:{value:t.userdata.title,callback:function(i){t.$set(t.userdata,"title",i)},expression:"userdata.title"}}),n("el-input",{attrs:{placeholder:"Fullname",readonly:t.readonly},model:{value:t.userdata.name,callback:function(i){t.$set(t.userdata,"name",i)},expression:"userdata.name"}}),n("el-input",{attrs:{placeholder:"Phone",readonly:t.readonly},model:{value:t.userdata.phone_number,callback:function(i){t.$set(t.userdata,"phone_number",i)},expression:"userdata.phone_number"}}),n("el-input",{attrs:{placeholder:"Address",readonly:t.readonly},model:{value:t.userdata.address,callback:function(i){t.$set(t.userdata,"address",i)},expression:"userdata.address"}})],1)])},o=[],r={name:"ContactDialog",props:["userdata","dialogvisible","type","color"],computed:{readonly:function(){return"detail"==this.type}}},s=r,a=(n("935a"),n("2877")),c=Object(a["a"])(s,e,o,!1,null,null,null);i["a"]=c.exports},c52f:function(t,i,n){},cd1c:function(t,i,n){var e=n("e853");t.exports=function(t,i){return new(e(t))(i)}},e853:function(t,i,n){var e=n("d3f4"),o=n("1169"),r=n("2b4c")("species");t.exports=function(t){var i;return o(t)&&(i=t.constructor,"function"!=typeof i||i!==Array&&!o(i.prototype)||(i=void 0),e(i)&&(i=i[r],null===i&&(i=void 0))),void 0===i?Array:i}}}]);