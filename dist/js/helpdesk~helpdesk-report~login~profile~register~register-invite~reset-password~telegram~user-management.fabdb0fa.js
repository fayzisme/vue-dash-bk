(window.webpackJsonp=window.webpackJsonp||[]).push([["helpdesk~helpdesk-report~login~profile~register~register-invite~reset-password~telegram~user-management"],{"1fb5":function(t,r,e){"use strict";r.byteLength=function(t){var r=c(t),t=r[0],r=r[1];return 3*(t+r)/4-r},r.toByteArray=function(t){var r,e,n=c(t),i=n[0],n=n[1],o=new a(function(t,r){return 3*(t+r)/4-r}(i,n)),f=0,u=0<n?i-4:i;for(e=0;e<u;e+=4)r=h[t.charCodeAt(e)]<<18|h[t.charCodeAt(e+1)]<<12|h[t.charCodeAt(e+2)]<<6|h[t.charCodeAt(e+3)],o[f++]=r>>16&255,o[f++]=r>>8&255,o[f++]=255&r;return 2===n&&(r=h[t.charCodeAt(e)]<<2|h[t.charCodeAt(e+1)]>>4,o[f++]=255&r),1===n&&(r=h[t.charCodeAt(e)]<<10|h[t.charCodeAt(e+1)]<<4|h[t.charCodeAt(e+2)]>>2,o[f++]=r>>8&255,o[f++]=255&r),o},r.fromByteArray=function(t){for(var r,e=t.length,n=e%3,i=[],o=16383,f=0,u=e-n;f<u;f+=o)i.push(function(t,r,e){for(var n,i=[],o=r;o<e;o+=3)n=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(255&t[o+2]),i.push(function(t){return s[t>>18&63]+s[t>>12&63]+s[t>>6&63]+s[63&t]}(n));return i.join("")}(t,f,u<f+o?u:f+o));return 1==n?(r=t[e-1],i.push(s[r>>2]+s[r<<4&63]+"==")):2==n&&(r=(t[e-2]<<8)+t[e-1],i.push(s[r>>10]+s[r>>4&63]+s[r<<2&63]+"=")),i.join("")};for(var s=[],h=[],a="undefined"!=typeof Uint8Array?Uint8Array:Array,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,o=n.length;i<o;++i)s[i]=n[i],h[n.charCodeAt(i)]=i;function c(t){var r=t.length;if(0<r%4)throw new Error("Invalid string. Length must be a multiple of 4");t=t.indexOf("=");return[t=-1===t?r:t,t===r?0:4-t%4]}h["-".charCodeAt(0)]=62,h["_".charCodeAt(0)]=63},2335:function(t,r){var e={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}},9152:function(t,r){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
r.read=function(t,r,e,n,i){var o,f,u=8*i-n-1,s=(1<<u)-1,h=s>>1,a=-7,c=e?i-1:0,l=e?-1:1,e=t[r+c];for(c+=l,o=e&(1<<-a)-1,e>>=-a,a+=u;0<a;o=256*o+t[r+c],c+=l,a-=8);for(f=o&(1<<-a)-1,o>>=-a,a+=n;0<a;f=256*f+t[r+c],c+=l,a-=8);if(0===o)o=1-h;else{if(o===s)return f?NaN:1/0*(e?-1:1);f+=Math.pow(2,n),o-=h}return(e?-1:1)*f*Math.pow(2,o-n)},r.write=function(t,r,e,n,i,o){var f,u,s=8*o-i-1,h=(1<<s)-1,a=h>>1,c=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,l=n?0:o-1,p=n?1:-1,o=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(u=isNaN(r)?1:0,f=h):(f=Math.floor(Math.log(r)/Math.LN2),r*(n=Math.pow(2,-f))<1&&(f--,n*=2),2<=(r+=1<=f+a?c/n:c*Math.pow(2,1-a))*n&&(f++,n/=2),h<=f+a?(u=0,f=h):1<=f+a?(u=(r*n-1)*Math.pow(2,i),f+=a):(u=r*Math.pow(2,a-1)*Math.pow(2,i),f=0));8<=i;t[e+l]=255&u,l+=p,u/=256,i-=8);for(f=f<<i|u,s+=i;0<s;t[e+l]=255&f,l+=p,f/=256,s-=8);t[e+l-p]|=128*o}},b639:function(t,C,O){"use strict";!function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var u=O("1fb5"),o=O("9152"),f=O("2335");function e(){return c.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(t,r){if(e()<r)throw new RangeError("Invalid typed array length");return c.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(r)).__proto__=c.prototype:(t=null===t?new c(r):t).length=r,t}function c(t,r,e){if(!(c.TYPED_ARRAY_SUPPORT||this instanceof c))return new c(t,r,e);if("number"!=typeof t)return n(this,t,r,e);if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return h(this,t)}function n(t,r,e,n){if("number"==typeof r)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&r instanceof ArrayBuffer?function(t,r,e,n){if(r.byteLength,e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");return r=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n),c.TYPED_ARRAY_SUPPORT?(t=r).__proto__=c.prototype:t=a(t,r),t}(t,r,e,n):"string"==typeof r?function(t,r,e){if(!c.isEncoding(e="string"!=typeof e||""===e?"utf8":e))throw new TypeError('"encoding" must be a valid string encoding');var n=0|p(r,e),e=(t=i(t,n)).write(r,e);return t=e!==n?t.slice(0,e):t}(t,r,e):function(t,r){if(c.isBuffer(r)){var e=0|l(r.length);return 0===(t=i(t,e)).length||r.copy(t,0,0,e),t}if(r){if("undefined"!=typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!=typeof r.length||function(t){return t!=t}(r.length)?i(t,0):a(t,r);if("Buffer"===r.type&&f(r.data))return a(t,r.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,r)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function h(t,r){if(s(r),t=i(t,r<0?0:0|l(r)),!c.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;++e)t[e]=0;return t}function a(t,r){var e=r.length<0?0:0|l(r.length);t=i(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function l(t){if(t>=e())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+e().toString(16)+" bytes");return 0|t}function p(t,r){if(c.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;var e=(t="string"!=typeof t?""+t:t).length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":case void 0:return S(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return Y(t).length;default:if(n)return S(t).length;r=(""+r).toLowerCase(),n=!0}}function r(t,r,e){var n,i,o,f=!1;if((r=void 0===r||r<0?0:r)>this.length)return"";if((e=void 0===e||e>this.length?this.length:e)<=0)return"";if((e>>>=0)<=(r>>>=0))return"";for(t=t||"utf8";;)switch(t){case"hex":return function(t,r,e){var n=t.length;(!e||e<0||n<e)&&(e=n);for(var i="",o=r=!r||r<0?0:r;o<e;++o)i+=function(t){return t<16?"0"+t.toString(16):t.toString(16)}(t[o]);return i}(this,r,e);case"utf8":case"utf-8":return A(this,r,e);case"ascii":return function(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}(this,r,e);case"latin1":case"binary":return function(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}(this,r,e);case"base64":return n=this,o=e,0===(i=r)&&o===n.length?u.fromByteArray(n):u.fromByteArray(n.slice(i,o));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}(this,r,e);default:if(f)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),f=!0}}function g(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function y(t,r,e,n,i){if(0===t.length)return-1;if("string"==typeof e?(n=e,e=0):2147483647<e?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,(e=(e=isNaN(e)?i?0:t.length-1:e)<0?t.length+e:e)>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof r&&(r=c.from(r,n)),c.isBuffer(r))return 0===r.length?-1:w(t,r,e,n,i);if("number"==typeof r)return r&=255,c.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?(i?Uint8Array.prototype.indexOf:Uint8Array.prototype.lastIndexOf).call(t,r,e):w(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function w(t,r,e,n,i){var o=1,f=t.length,u=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;f/=o=2,u/=2,e/=2}function s(t,r){return 1===o?t[r]:t.readUInt16BE(r*o)}if(i)for(var h=-1,a=e;a<f;a++)if(s(t,a)===s(r,-1===h?0:a-h)){if(a-(h=-1===h?a:h)+1===u)return h*o}else-1!==h&&(a-=a-h),h=-1;else for(a=e=f<e+u?f-u:e;0<=a;a--){for(var c=!0,l=0;l<u;l++)if(s(t,a+l)!==s(r,l)){c=!1;break}if(c)return a}return-1}function d(t,r,e,n){return I(function(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}(r),t,e,n)}function v(t,r,e,n){return I(function(t,r){for(var e,n,i=[],o=0;o<t.length&&!((r-=2)<0);++o)n=t.charCodeAt(o),e=n>>8,n=n%256,i.push(n),i.push(e);return i}(r,t.length-e),t,e,n)}function A(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o,f,u,s,h=t[i],a=null,c=239<h?4:223<h?3:191<h?2:1;if(i+c<=e)switch(c){case 1:h<128&&(a=h);break;case 2:128==(192&(o=t[i+1]))&&(127<(s=(31&h)<<6|63&o)&&(a=s));break;case 3:o=t[i+1],f=t[i+2],128==(192&o)&&128==(192&f)&&(2047<(s=(15&h)<<12|(63&o)<<6|63&f)&&(s<55296||57343<s)&&(a=s));break;case 4:o=t[i+1],f=t[i+2],u=t[i+3],128==(192&o)&&128==(192&f)&&128==(192&u)&&(65535<(s=(15&h)<<18|(63&o)<<12|(63&f)<<6|63&u)&&s<1114112&&(a=s))}null===a?(a=65533,c=1):65535<a&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),i+=c}return function(t){var r=t.length;if(r<=E)return String.fromCharCode.apply(String,t);var e="",n=0;for(;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=E));return e}(n)}C.Buffer=c,C.SlowBuffer=function(t){return c.alloc(+(t=+t!=t?0:t))},C.INSPECT_MAX_BYTES=50,c.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),C.kMaxLength=e(),c.poolSize=8192,c._augment=function(t){return t.__proto__=c.prototype,t},c.from=function(t,r,e){return n(null,t,r,e)},c.TYPED_ARRAY_SUPPORT&&(c.prototype.__proto__=Uint8Array.prototype,c.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&c[Symbol.species]===c&&Object.defineProperty(c,Symbol.species,{value:null,configurable:!0})),c.alloc=function(t,r,e){return n=null,r=r,e=e,s(t=t),!(t<=0)&&void 0!==r?"string"==typeof e?i(n,t).fill(r,e):i(n,t).fill(r):i(n,t);var n},c.allocUnsafe=function(t){return h(null,t)},c.allocUnsafeSlow=function(t){return h(null,t)},c.isBuffer=function(t){return!(null==t||!t._isBuffer)},c.compare=function(t,r){if(!c.isBuffer(t)||!c.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},c.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(t,r){if(!f(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return c.alloc(0);if(void 0===r)for(i=r=0;i<t.length;++i)r+=t[i].length;for(var e=c.allocUnsafe(r),n=0,i=0;i<t.length;++i){var o=t[i];if(!c.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(e,n),n+=o.length}return e},c.byteLength=p,c.prototype._isBuffer=!0,c.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)g(this,r,r+1);return this},c.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)g(this,r,r+3),g(this,r+1,r+2);return this},c.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)g(this,r,r+7),g(this,r+1,r+6),g(this,r+2,r+5),g(this,r+3,r+4);return this},c.prototype.toString=function(){var t=0|this.length;return 0==t?"":0===arguments.length?A(this,0,t):r.apply(this,arguments)},c.prototype.equals=function(t){if(!c.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===c.compare(this,t)},c.prototype.inspect=function(){var t="",r=C.INSPECT_MAX_BYTES;return 0<this.length&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},c.prototype.compare=function(t,r,e,n,i){if(!c.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),(r=void 0===r?0:r)<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(i<=n&&e<=r)return 0;if(i<=n)return-1;if(e<=r)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),f=(e>>>=0)-(r>>>=0),u=Math.min(o,f),s=this.slice(n,i),h=t.slice(r,e),a=0;a<u;++a)if(s[a]!==h[a]){o=s[a],f=h[a];break}return o<f?-1:f<o?1:0},c.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},c.prototype.indexOf=function(t,r,e){return y(this,t,r,e,!0)},c.prototype.lastIndexOf=function(t,r,e){return y(this,t,r,e,!1)},c.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r|=0,isFinite(e)?(e|=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||i<e)&&(e=i),0<t.length&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n=n||"utf8";for(var o,f,u,s=!1;;)switch(n){case"hex":return function(t,r,e,n){e=Number(e)||0;var i=t.length-e;if(n?i<(n=Number(n))&&(n=i):n=i,(i=r.length)%2!=0)throw new TypeError("Invalid hex string");i/2<n&&(n=i/2);for(var o=0;o<n;++o){var f=parseInt(r.substr(2*o,2),16);if(isNaN(f))return o;t[e+o]=f}return o}(this,t,r,e);case"utf8":case"utf-8":return f=r,u=e,I(S(t,(o=this).length-f),o,f,u);case"ascii":return d(this,t,r,e);case"latin1":case"binary":return d(this,t,r,e);case"base64":return o=this,f=r,u=e,I(Y(t),o,f,u);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return v(this,t,r,e);default:if(s)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),s=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var E=4096;function b(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(e<t+r)throw new RangeError("Trying to access beyond buffer length")}function R(t,r,e,n,i,o){if(!c.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(i<r||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function _(t,r,e,n){r<0&&(r=65535+r+1);for(var i=0,o=Math.min(t.length-e,2);i<o;++i)t[e+i]=(r&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function m(t,r,e,n){r<0&&(r=4294967295+r+1);for(var i=0,o=Math.min(t.length-e,4);i<o;++i)t[e+i]=r>>>8*(n?i:3-i)&255}function P(t,r,e,n){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function T(t,r,e,n,i){return i||P(t,0,e,4),o.write(t,r,e,n,23,4),e+4}function B(t,r,e,n,i){return i||P(t,0,e,8),o.write(t,r,e,n,52,8),e+8}c.prototype.slice=function(t,r){var e=this.length;if((t=~~t)<0?(t+=e)<0&&(t=0):e<t&&(t=e),(r=void 0===r?e:~~r)<0?(r+=e)<0&&(r=0):e<r&&(r=e),r<t&&(r=t),c.TYPED_ARRAY_SUPPORT)(i=this.subarray(t,r)).__proto__=c.prototype;else for(var n=r-t,i=new c(n,void 0),o=0;o<n;++o)i[o]=this[o+t];return i},c.prototype.readUIntLE=function(t,r,e){t|=0,r|=0,e||b(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},c.prototype.readUIntBE=function(t,r,e){t|=0,r|=0,e||b(t,r,this.length);for(var n=this[t+--r],i=1;0<r&&(i*=256);)n+=this[t+--r]*i;return n},c.prototype.readUInt8=function(t,r){return r||b(t,1,this.length),this[t]},c.prototype.readUInt16LE=function(t,r){return r||b(t,2,this.length),this[t]|this[t+1]<<8},c.prototype.readUInt16BE=function(t,r){return r||b(t,2,this.length),this[t]<<8|this[t+1]},c.prototype.readUInt32LE=function(t,r){return r||b(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},c.prototype.readUInt32BE=function(t,r){return r||b(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},c.prototype.readIntLE=function(t,r,e){t|=0,r|=0,e||b(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return(i*=128)<=n&&(n-=Math.pow(2,8*r)),n},c.prototype.readIntBE=function(t,r,e){t|=0,r|=0,e||b(t,r,this.length);for(var n=r,i=1,o=this[t+--n];0<n&&(i*=256);)o+=this[t+--n]*i;return(i*=128)<=o&&(o-=Math.pow(2,8*r)),o},c.prototype.readInt8=function(t,r){return r||b(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},c.prototype.readInt16LE=function(t,r){r||b(t,2,this.length);t=this[t]|this[t+1]<<8;return 32768&t?4294901760|t:t},c.prototype.readInt16BE=function(t,r){r||b(t,2,this.length);t=this[t+1]|this[t]<<8;return 32768&t?4294901760|t:t},c.prototype.readInt32LE=function(t,r){return r||b(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},c.prototype.readInt32BE=function(t,r){return r||b(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},c.prototype.readFloatLE=function(t,r){return r||b(t,4,this.length),o.read(this,t,!0,23,4)},c.prototype.readFloatBE=function(t,r){return r||b(t,4,this.length),o.read(this,t,!1,23,4)},c.prototype.readDoubleLE=function(t,r){return r||b(t,8,this.length),o.read(this,t,!0,52,8)},c.prototype.readDoubleBE=function(t,r){return r||b(t,8,this.length),o.read(this,t,!1,52,8)},c.prototype.writeUIntLE=function(t,r,e,n){t=+t,r|=0,e|=0,n||R(this,t,r,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},c.prototype.writeUIntBE=function(t,r,e,n){t=+t,r|=0,e|=0,n||R(this,t,r,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[r+i]=255&t;0<=--i&&(o*=256);)this[r+i]=t/o&255;return r+e},c.prototype.writeUInt8=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,1,255,0),c.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&t,r+1},c.prototype.writeUInt16LE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):_(this,t,r,!0),r+2},c.prototype.writeUInt16BE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):_(this,t,r,!1),r+2},c.prototype.writeUInt32LE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t):m(this,t,r,!0),r+4},c.prototype.writeUInt32BE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):m(this,t,r,!1),r+4},c.prototype.writeIntLE=function(t,r,e,n){t=+t,r|=0,n||R(this,t,r,e,(n=Math.pow(2,8*e-1))-1,-n);var i=0,o=1,f=0;for(this[r]=255&t;++i<e&&(o*=256);)t<0&&0===f&&0!==this[r+i-1]&&(f=1),this[r+i]=(t/o>>0)-f&255;return r+e},c.prototype.writeIntBE=function(t,r,e,n){t=+t,r|=0,n||R(this,t,r,e,(n=Math.pow(2,8*e-1))-1,-n);var i=e-1,o=1,f=0;for(this[r+i]=255&t;0<=--i&&(o*=256);)t<0&&0===f&&0!==this[r+i+1]&&(f=1),this[r+i]=(t/o>>0)-f&255;return r+e},c.prototype.writeInt8=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,1,127,-128),c.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&(t=t<0?255+t+1:t),r+1},c.prototype.writeInt16LE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):_(this,t,r,!0),r+2},c.prototype.writeInt16BE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):_(this,t,r,!1),r+2},c.prototype.writeInt32LE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,4,2147483647,-2147483648),c.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):m(this,t,r,!0),r+4},c.prototype.writeInt32BE=function(t,r,e){return t=+t,r|=0,e||R(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),c.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):m(this,t,r,!1),r+4},c.prototype.writeFloatLE=function(t,r,e){return T(this,t,r,!0,e)},c.prototype.writeFloatBE=function(t,r,e){return T(this,t,r,!1,e)},c.prototype.writeDoubleLE=function(t,r,e){return B(this,t,r,!0,e)},c.prototype.writeDoubleBE=function(t,r,e){return B(this,t,r,!1,e)},c.prototype.copy=function(t,r,e,n){if(e=e||0,n||0===n||(n=this.length),r>=t.length&&(r=t.length),(n=0<n&&n<e?e:n)===e)return 0;if(0===t.length||0===this.length)return 0;if((r=r||0)<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length);var i,o=(n=t.length-r<n-e?t.length-r+e:n)-e;if(this===t&&e<r&&r<n)for(i=o-1;0<=i;--i)t[i+r]=this[i+e];else if(o<1e3||!c.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+r]=this[i+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+o),r);return o},c.prototype.fill=function(t,r,e,n){if("string"==typeof t){var i;if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),1===t.length&&(i=t.charCodeAt(0))<256&&(t=i),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!c.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;if(r>>>=0,e=void 0===e?this.length:e>>>0,"number"==typeof(t=t||0))for(u=r;u<e;++u)this[u]=t;else for(var o=c.isBuffer(t)?t:S(new c(t,n).toString()),f=o.length,u=0;u<e-r;++u)this[u+r]=o[u%f];return this};var U=/[^+\/0-9A-Za-z-_]/g;function S(t,r){var e;r=r||1/0;for(var n=t.length,i=null,o=[],f=0;f<n;++f){if(55295<(e=t.charCodeAt(f))&&e<57344){if(!i){if(56319<e){-1<(r-=3)&&o.push(239,191,189);continue}if(f+1===n){-1<(r-=3)&&o.push(239,191,189);continue}i=e;continue}if(e<56320){-1<(r-=3)&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&-1<(r-=3)&&o.push(239,191,189);if(i=null,e<128){if(--r<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function Y(t){return u.toByteArray(function(t){if((t=((r=t).trim?r.trim():r.replace(/^\s+|\s+$/g,"")).replace(U,"")).length<2)return"";for(var r;t.length%4!=0;)t+="=";return t}(t))}function I(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}}.call(this,O("c8ba"))}}]);