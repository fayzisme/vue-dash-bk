(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["email-integration~sms-integration~d939e436"],{"7a7a":function(e,t,r){},"8f94":function(e,t,r){!function(t,n){e.exports=n(r("56b3"))}(0,(function(e){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=3)}([function(t,r){t.exports=e},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=function(e){return e&&e.__esModule?e:{default:e}}(n),a=window.CodeMirror||i.default;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(e),n=1;n<arguments.length;n++){var i=arguments[n];if(null!=i)for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(r[a]=i[a])}return r},writable:!0,configurable:!0}),t.default={name:"codemirror",data:function(){return{content:"",codemirror:null,cminstance:null}},props:{code:String,value:String,marker:Function,unseenLines:Array,name:{type:String,default:"codemirror"},placeholder:{type:String,default:""},merge:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}},events:{type:Array,default:function(){return[]}},globalOptions:{type:Object,default:function(){return{}}},globalEvents:{type:Array,default:function(){return[]}}},watch:{options:{deep:!0,handler:function(e){for(var t in e)this.cminstance.setOption(t,e[t])}},merge:function(){this.$nextTick(this.switchMerge)},code:function(e){this.handerCodeChange(e)},value:function(e){this.handerCodeChange(e)}},methods:{initialize:function(){var e=this,t=Object.assign({},this.globalOptions,this.options);this.merge?(this.codemirror=a.MergeView(this.$refs.mergeview,t),this.cminstance=this.codemirror.edit):(this.codemirror=a.fromTextArea(this.$refs.textarea,t),this.cminstance=this.codemirror,this.cminstance.setValue(this.code||this.value||this.content)),this.cminstance.on("change",(function(t){e.content=t.getValue(),e.$emit&&e.$emit("input",e.content)}));var r={};["scroll","changes","beforeChange","cursorActivity","keyHandled","inputRead","electricInput","beforeSelectionChange","viewportChange","swapDoc","gutterClick","gutterContextMenu","focus","blur","refresh","optionChange","scrollCursorIntoView","update"].concat(this.events).concat(this.globalEvents).filter((function(e){return!r[e]&&(r[e]=!0)})).forEach((function(t){e.cminstance.on(t,(function(){for(var r=arguments.length,n=Array(r),i=0;i<r;i++)n[i]=arguments[i];e.$emit.apply(e,[t].concat(n));var a=t.replace(/([A-Z])/g,"-$1").toLowerCase();a!==t&&e.$emit.apply(e,[a].concat(n))}))})),this.$emit("ready",this.codemirror),this.unseenLineMarkers(),this.refresh()},refresh:function(){var e=this;this.$nextTick((function(){e.cminstance.refresh()}))},destroy:function(){var e=this.cminstance.doc.cm.getWrapperElement();e&&e.remove&&e.remove()},handerCodeChange:function(e){if(e!==this.cminstance.getValue()){var t=this.cminstance.getScrollInfo();this.cminstance.setValue(e),this.content=e,this.cminstance.scrollTo(t.left,t.top)}this.unseenLineMarkers()},unseenLineMarkers:function(){var e=this;void 0!==this.unseenLines&&void 0!==this.marker&&this.unseenLines.forEach((function(t){var r=e.cminstance.lineInfo(t);e.cminstance.setGutterMarker(t,"breakpoints",r.gutterMarkers?null:e.marker())}))},switchMerge:function(){var e=this.cminstance.doc.history,t=this.cminstance.doc.cleanGeneration;this.options.value=this.cminstance.getValue(),this.destroy(),this.initialize(),this.cminstance.doc.history=e,this.cminstance.doc.cleanGeneration=t}},mounted:function(){this.initialize()},beforeDestroy:function(){this.destroy()}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),i=r.n(n);for(var a in n)["default","default"].indexOf(a)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(a);var o=r(5),c=r(4),s=c(i.a,o.a,!1,null,null,null);t.default=s.exports},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.install=t.codemirror=t.CodeMirror=void 0;var i=r(0),a=n(i),o=r(2),c=n(o),s=window.CodeMirror||a.default,u=function(e,t){t&&(t.options&&(c.default.props.globalOptions.default=function(){return t.options}),t.events&&(c.default.props.globalEvents.default=function(){return t.events})),e.component(c.default.name,c.default)},l={CodeMirror:s,codemirror:c.default,install:u};t.default=l,t.CodeMirror=s,t.codemirror=c.default,t.install=u},function(e,t){e.exports=function(e,t,r,n,i,a){var o,c=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(o=e,c=e.default);var u,l="function"==typeof c?c.options:c;if(t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId=i),a?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},l._ssrRegister=u):n&&(u=n),u){var f=l.functional,d=f?l.render:l.beforeCreate;f?(l._injectStyles=u,l.render=function(e,t){return u.call(t),d(e,t)}):l.beforeCreate=d?[].concat(d,u):[u]}return{esModule:o,exports:c,options:l}}},function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"vue-codemirror",class:{merge:e.merge}},[e.merge?r("div",{ref:"mergeview"}):r("textarea",{ref:"textarea",attrs:{name:e.name,placeholder:e.placeholder}})])},i=[],a={render:n,staticRenderFns:i};t.a=a}])}))},a7be:function(e,t,r){},f9d4:function(e,t,r){(function(e){e(r("56b3"))})((function(e){"use strict";e.defineMode("javascript",(function(t,r){var n,i,a=t.indentUnit,o=r.statementIndent,c=r.jsonld,s=r.json||c,u=!1!==r.trackScope,l=r.typescript,f=r.wordCharacters||/[\w$\xa1-\uffff]/,d=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),i=e("keyword d"),a=e("operator"),o={type:"atom",style:"atom"};return{if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:i,break:i,continue:i,new:e("new"),delete:n,void:n,throw:n,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:a,typeof:a,instanceof:a,true:o,false:o,null:o,undefined:o,NaN:o,Infinity:o,this:e("this"),class:e("class"),super:e("atom"),yield:n,export:e("export"),import:e("import"),extends:n,await:n}}(),p=/[+\-*&%=<>!?|~^@]/,m=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function v(e){var t,r=!1,n=!1;while(null!=(t=e.next())){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function h(e,t,r){return n=e,i=r,t}function y(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=k(r),t.tokenize(e,t);if("."==r&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return h("number","number");if("."==r&&e.match(".."))return h("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return h(r);if("="==r&&e.eat(">"))return h("=>","operator");if("0"==r&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return h("number","number");if(/\d/.test(r))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),h("number","number");if("/"==r)return e.eat("*")?(t.tokenize=w,w(e,t)):e.eat("/")?(e.skipToEnd(),h("comment","comment")):it(e,t,1)?(v(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),h("regexp","string-2")):(e.eat("="),h("operator","operator",e.current()));if("`"==r)return t.tokenize=b,b(e,t);if("#"==r&&"!"==e.peek())return e.skipToEnd(),h("meta","meta");if("#"==r&&e.eatWhile(f))return h("variable","property");if("<"==r&&e.match("!--")||"-"==r&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start)))return e.skipToEnd(),h("comment","comment");if(p.test(r))return">"==r&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=r&&"="!=r||e.eat("="):/[<>*+\-|&?]/.test(r)&&(e.eat(r),">"==r&&e.eat(r))),"?"==r&&e.eat(".")?h("."):h("operator","operator",e.current());if(f.test(r)){e.eatWhile(f);var n=e.current();if("."!=t.lastType){if(d.propertyIsEnumerable(n)){var i=d[n];return h(i.type,i.style,n)}if("async"==n&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return h("async","keyword",n)}return h("variable","variable",n)}}function k(e){return function(t,r){var n,i=!1;if(c&&"@"==t.peek()&&t.match(m))return r.tokenize=y,h("jsonld-keyword","meta");while(null!=(n=t.next())){if(n==e&&!i)break;i=!i&&"\\"==n}return i||(r.tokenize=y),h("string","string")}}function w(e,t){var r,n=!1;while(r=e.next()){if("/"==r&&n){t.tokenize=y;break}n="*"==r}return h("comment","comment")}function b(e,t){var r,n=!1;while(null!=(r=e.next())){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=y;break}n=!n&&"\\"==r}return h("quasi","string-2",e.current())}var g="([{}])";function x(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(l){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var i=0,a=!1,o=r-1;o>=0;--o){var c=e.string.charAt(o),s=g.indexOf(c);if(s>=0&&s<3){if(!i){++o;break}if(0==--i){"("==c&&(a=!0);break}}else if(s>=3&&s<6)++i;else if(f.test(c))a=!0;else if(/["'\/`]/.test(c))for(;;--o){if(0==o)return;var u=e.string.charAt(o-1);if(u==c&&"\\"!=e.string.charAt(o-2)){o--;break}}else if(a&&!i){++o;break}}a&&!i&&(t.fatArrowAt=o)}}var j={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function M(e,t,r,n,i,a){this.indented=e,this.column=t,this.type=r,this.prev=i,this.info=a,null!=n&&(this.align=n)}function _(e,t){if(!u)return!1;for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}function C(e,t,r,n,i){var a=e.cc;E.state=e,E.stream=i,E.marked=null,E.cc=a,E.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);while(1){var o=a.length?a.pop():s?B:G;if(o(r,n)){while(a.length&&a[a.length-1].lex)a.pop()();return E.marked?E.marked:"variable"==r&&_(e,n)?"variable-2":t}}}var E={state:null,column:null,marked:null,cc:null};function O(){for(var e=arguments.length-1;e>=0;e--)E.cc.push(arguments[e])}function V(){return O.apply(null,arguments),!0}function A(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function $(e){var t=E.state;if(E.marked="def",u){if(t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var n=T(e,t.context);if(null!=n)return void(t.context=n)}else if(!A(e,t.localVars))return void(t.localVars=new S(e,t.localVars));r.globalVars&&!A(e,t.globalVars)&&(t.globalVars=new S(e,t.globalVars))}}function T(e,t){if(t){if(t.block){var r=T(e,t.prev);return r?r==t.prev?t:new z(r,t.vars,!0):null}return A(e,t.vars)?t:new z(t.prev,new S(e,t.vars),!1)}return null}function I(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function z(e,t,r){this.prev=e,this.vars=t,this.block=r}function S(e,t){this.name=e,this.next=t}var P=new S("this",new S("arguments",null));function q(){E.state.context=new z(E.state.context,E.state.localVars,!1),E.state.localVars=P}function L(){E.state.context=new z(E.state.context,E.state.localVars,!0),E.state.localVars=null}function R(){E.state.localVars=E.state.context.vars,E.state.context=E.state.context.prev}function F(e,t){var r=function(){var r=E.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var i=r.lexical;i&&")"==i.type&&i.align;i=i.prev)n=i.indented;r.lexical=new M(n,E.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function N(){var e=E.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function U(e){function t(r){return r==e?V():";"==e||"}"==r||")"==r||"]"==r?O():V(t)}return t}function G(e,t){return"var"==e?V(F("vardef",t),Oe,U(";"),N):"keyword a"==e?V(F("form"),H,G,N):"keyword b"==e?V(F("form"),G,N):"keyword d"==e?E.stream.match(/^\s*$/,!1)?V():V(F("stat"),X,U(";"),N):"debugger"==e?V(U(";")):"{"==e?V(F("}"),L,de,N,R):";"==e?V():"if"==e?("else"==E.state.lexical.info&&E.state.cc[E.state.cc.length-1]==N&&E.state.cc.pop()(),V(F("form"),H,G,N,ze)):"function"==e?V(Le):"for"==e?V(F("form"),L,Se,G,R,N):"class"==e||l&&"interface"==t?(E.marked="keyword",V(F("form","class"==e?e:t),Ge,N)):"variable"==e?l&&"declare"==t?(E.marked="keyword",V(G)):l&&("module"==t||"enum"==t||"type"==t)&&E.stream.match(/^\s*\w/,!1)?(E.marked="keyword","enum"==t?V(tt):"type"==t?V(Fe,U("operator"),ye,U(";")):V(F("form"),Ve,U("{"),F("}"),de,N,N)):l&&"namespace"==t?(E.marked="keyword",V(F("form"),B,G,N)):l&&"abstract"==t?(E.marked="keyword",V(G)):V(F("stat"),ae):"switch"==e?V(F("form"),H,U("{"),F("}","switch"),L,de,N,N,R):"case"==e?V(B,U(":")):"default"==e?V(U(":")):"catch"==e?V(F("form"),q,W,G,N,R):"export"==e?V(F("stat"),He,N):"import"==e?V(F("stat"),Xe,N):"async"==e?V(G):"@"==t?V(B,G):O(F("stat"),B,U(";"),N)}function W(e){if("("==e)return V(Ne,U(")"))}function B(e,t){return J(e,t,!1)}function D(e,t){return J(e,t,!0)}function H(e){return"("!=e?O():V(F(")"),X,U(")"),N)}function J(e,t,r){if(E.state.fatArrowAt==E.stream.start){var n=r?te:ee;if("("==e)return V(q,F(")"),le(Ne,")"),N,U("=>"),n,R);if("variable"==e)return O(q,Ve,U("=>"),n,R)}var i=r?K:Z;return j.hasOwnProperty(e)?V(i):"function"==e?V(Le,i):"class"==e||l&&"interface"==t?(E.marked="keyword",V(F("form"),Ue,N)):"keyword c"==e||"async"==e?V(r?D:B):"("==e?V(F(")"),X,U(")"),N,i):"operator"==e||"spread"==e?V(r?D:B):"["==e?V(F("]"),et,N,i):"{"==e?fe(ce,"}",null,i):"quasi"==e?O(Q,i):"new"==e?V(re(r)):V()}function X(e){return e.match(/[;\}\)\],]/)?O():O(B)}function Z(e,t){return","==e?V(X):K(e,t,!1)}function K(e,t,r){var n=0==r?Z:K,i=0==r?B:D;return"=>"==e?V(q,r?te:ee,R):"operator"==e?/\+\+|--/.test(t)||l&&"!"==t?V(n):l&&"<"==t&&E.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1)?V(F(">"),le(ye,">"),N,n):"?"==t?V(B,U(":"),i):V(i):"quasi"==e?O(Q,n):";"!=e?"("==e?fe(D,")","call",n):"."==e?V(oe,n):"["==e?V(F("]"),X,U("]"),N,n):l&&"as"==t?(E.marked="keyword",V(ye,n)):"regexp"==e?(E.state.lastType=E.marked="operator",E.stream.backUp(E.stream.pos-E.stream.start-1),V(i)):void 0:void 0}function Q(e,t){return"quasi"!=e?O():"${"!=t.slice(t.length-2)?V(Q):V(B,Y)}function Y(e){if("}"==e)return E.marked="string-2",E.state.tokenize=b,V(Q)}function ee(e){return x(E.stream,E.state),O("{"==e?G:B)}function te(e){return x(E.stream,E.state),O("{"==e?G:D)}function re(e){return function(t){return"."==t?V(e?ie:ne):"variable"==t&&l?V(_e,e?K:Z):O(e?D:B)}}function ne(e,t){if("target"==t)return E.marked="keyword",V(Z)}function ie(e,t){if("target"==t)return E.marked="keyword",V(K)}function ae(e){return":"==e?V(N,G):O(Z,U(";"),N)}function oe(e){if("variable"==e)return E.marked="property",V()}function ce(e,t){return"async"==e?(E.marked="property",V(ce)):"variable"==e||"keyword"==E.style?(E.marked="property","get"==t||"set"==t?V(se):(l&&E.state.fatArrowAt==E.stream.start&&(r=E.stream.match(/^\s*:\s*/,!1))&&(E.state.fatArrowAt=E.stream.pos+r[0].length),V(ue))):"number"==e||"string"==e?(E.marked=c?"property":E.style+" property",V(ue)):"jsonld-keyword"==e?V(ue):l&&I(t)?(E.marked="keyword",V(ce)):"["==e?V(B,pe,U("]"),ue):"spread"==e?V(D,ue):"*"==t?(E.marked="keyword",V(ce)):":"==e?O(ue):void 0;var r}function se(e){return"variable"!=e?O(ue):(E.marked="property",V(Le))}function ue(e){return":"==e?V(D):"("==e?O(Le):void 0}function le(e,t,r){function n(i,a){if(r?r.indexOf(i)>-1:","==i){var o=E.state.lexical;return"call"==o.info&&(o.pos=(o.pos||0)+1),V((function(r,n){return r==t||n==t?O():O(e)}),n)}return i==t||a==t?V():r&&r.indexOf(";")>-1?O(e):V(U(t))}return function(r,i){return r==t||i==t?V():O(e,n)}}function fe(e,t,r){for(var n=3;n<arguments.length;n++)E.cc.push(arguments[n]);return V(F(t,r),le(e,t),N)}function de(e){return"}"==e?V():O(G,de)}function pe(e,t){if(l){if(":"==e)return V(ye);if("?"==t)return V(pe)}}function me(e,t){if(l&&(":"==e||"in"==t))return V(ye)}function ve(e){if(l&&":"==e)return E.stream.match(/^\s*\w+\s+is\b/,!1)?V(B,he,ye):V(ye)}function he(e,t){if("is"==t)return E.marked="keyword",V()}function ye(e,t){return"keyof"==t||"typeof"==t||"infer"==t||"readonly"==t?(E.marked="keyword",V("typeof"==t?D:ye)):"variable"==e||"void"==t?(E.marked="type",V(Me)):"|"==t||"&"==t?V(ye):"string"==e||"number"==e||"atom"==e?V(Me):"["==e?V(F("]"),le(ye,"]",","),N,Me):"{"==e?V(F("}"),we,N,Me):"("==e?V(le(je,")"),ke,Me):"<"==e?V(le(ye,">"),ye):"quasi"==e?O(ge,Me):void 0}function ke(e){if("=>"==e)return V(ye)}function we(e){return e.match(/[\}\)\]]/)?V():","==e||";"==e?V(we):O(be,we)}function be(e,t){return"variable"==e||"keyword"==E.style?(E.marked="property",V(be)):"?"==t||"number"==e||"string"==e?V(be):":"==e?V(ye):"["==e?V(U("variable"),me,U("]"),be):"("==e?O(Re,be):e.match(/[;\}\)\],]/)?void 0:V()}function ge(e,t){return"quasi"!=e?O():"${"!=t.slice(t.length-2)?V(ge):V(ye,xe)}function xe(e){if("}"==e)return E.marked="string-2",E.state.tokenize=b,V(ge)}function je(e,t){return"variable"==e&&E.stream.match(/^\s*[?:]/,!1)||"?"==t?V(je):":"==e?V(ye):"spread"==e?V(je):O(ye)}function Me(e,t){return"<"==t?V(F(">"),le(ye,">"),N,Me):"|"==t||"."==e||"&"==t?V(ye):"["==e?V(ye,U("]"),Me):"extends"==t||"implements"==t?(E.marked="keyword",V(ye)):"?"==t?V(ye,U(":"),ye):void 0}function _e(e,t){if("<"==t)return V(F(">"),le(ye,">"),N,Me)}function Ce(){return O(ye,Ee)}function Ee(e,t){if("="==t)return V(ye)}function Oe(e,t){return"enum"==t?(E.marked="keyword",V(tt)):O(Ve,pe,Te,Ie)}function Ve(e,t){return l&&I(t)?(E.marked="keyword",V(Ve)):"variable"==e?($(t),V()):"spread"==e?V(Ve):"["==e?fe($e,"]"):"{"==e?fe(Ae,"}"):void 0}function Ae(e,t){return"variable"!=e||E.stream.match(/^\s*:/,!1)?("variable"==e&&(E.marked="property"),"spread"==e?V(Ve):"}"==e?O():"["==e?V(B,U("]"),U(":"),Ae):V(U(":"),Ve,Te)):($(t),V(Te))}function $e(){return O(Ve,Te)}function Te(e,t){if("="==t)return V(D)}function Ie(e){if(","==e)return V(Oe)}function ze(e,t){if("keyword b"==e&&"else"==t)return V(F("form","else"),G,N)}function Se(e,t){return"await"==t?V(Se):"("==e?V(F(")"),Pe,N):void 0}function Pe(e){return"var"==e?V(Oe,qe):"variable"==e?V(qe):O(qe)}function qe(e,t){return")"==e?V():";"==e?V(qe):"in"==t||"of"==t?(E.marked="keyword",V(B,qe)):O(B,qe)}function Le(e,t){return"*"==t?(E.marked="keyword",V(Le)):"variable"==e?($(t),V(Le)):"("==e?V(q,F(")"),le(Ne,")"),N,ve,G,R):l&&"<"==t?V(F(">"),le(Ce,">"),N,Le):void 0}function Re(e,t){return"*"==t?(E.marked="keyword",V(Re)):"variable"==e?($(t),V(Re)):"("==e?V(q,F(")"),le(Ne,")"),N,ve,R):l&&"<"==t?V(F(">"),le(Ce,">"),N,Re):void 0}function Fe(e,t){return"keyword"==e||"variable"==e?(E.marked="type",V(Fe)):"<"==t?V(F(">"),le(Ce,">"),N):void 0}function Ne(e,t){return"@"==t&&V(B,Ne),"spread"==e?V(Ne):l&&I(t)?(E.marked="keyword",V(Ne)):l&&"this"==e?V(pe,Te):O(Ve,pe,Te)}function Ue(e,t){return"variable"==e?Ge(e,t):We(e,t)}function Ge(e,t){if("variable"==e)return $(t),V(We)}function We(e,t){return"<"==t?V(F(">"),le(Ce,">"),N,We):"extends"==t||"implements"==t||l&&","==e?("implements"==t&&(E.marked="keyword"),V(l?ye:B,We)):"{"==e?V(F("}"),Be,N):void 0}function Be(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||l&&I(t))&&E.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(E.marked="keyword",V(Be)):"variable"==e||"keyword"==E.style?(E.marked="property",V(De,Be)):"number"==e||"string"==e?V(De,Be):"["==e?V(B,pe,U("]"),De,Be):"*"==t?(E.marked="keyword",V(Be)):l&&"("==e?O(Re,Be):";"==e||","==e?V(Be):"}"==e?V():"@"==t?V(B,Be):void 0}function De(e,t){if("!"==t)return V(De);if("?"==t)return V(De);if(":"==e)return V(ye,Te);if("="==t)return V(D);var r=E.state.lexical.prev,n=r&&"interface"==r.info;return O(n?Re:Le)}function He(e,t){return"*"==t?(E.marked="keyword",V(Ye,U(";"))):"default"==t?(E.marked="keyword",V(B,U(";"))):"{"==e?V(le(Je,"}"),Ye,U(";")):O(G)}function Je(e,t){return"as"==t?(E.marked="keyword",V(U("variable"))):"variable"==e?O(D,Je):void 0}function Xe(e){return"string"==e?V():"("==e?O(B):"."==e?O(Z):O(Ze,Ke,Ye)}function Ze(e,t){return"{"==e?fe(Ze,"}"):("variable"==e&&$(t),"*"==t&&(E.marked="keyword"),V(Qe))}function Ke(e){if(","==e)return V(Ze,Ke)}function Qe(e,t){if("as"==t)return E.marked="keyword",V(Ze)}function Ye(e,t){if("from"==t)return E.marked="keyword",V(B)}function et(e){return"]"==e?V():O(le(D,"]"))}function tt(){return O(F("form"),Ve,U("{"),F("}"),le(rt,"}"),N,N)}function rt(){return O(Ve,Te)}function nt(e,t){return"operator"==e.lastType||","==e.lastType||p.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}function it(e,t,r){return t.tokenize==y&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return R.lex=!0,N.lex=!0,{startState:function(e){var t={tokenize:y,lastType:"sof",cc:[],lexical:new M((e||0)-a,0,"block",!1),localVars:r.localVars,context:r.localVars&&new z(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),x(e,t)),t.tokenize!=w&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==n?r:(t.lastType="operator"!=n||"++"!=i&&"--"!=i?n:"incdec",C(t,r,n,i,e))},indent:function(t,n){if(t.tokenize==w||t.tokenize==b)return e.Pass;if(t.tokenize!=y)return 0;var i,c=n&&n.charAt(0),s=t.lexical;if(!/^\s*else\b/.test(n))for(var u=t.cc.length-1;u>=0;--u){var l=t.cc[u];if(l==N)s=s.prev;else if(l!=ze&&l!=R)break}while(("stat"==s.type||"form"==s.type)&&("}"==c||(i=t.cc[t.cc.length-1])&&(i==Z||i==K)&&!/^[,\.=+\-*:?[\(]/.test(n)))s=s.prev;o&&")"==s.type&&"stat"==s.prev.type&&(s=s.prev);var f=s.type,d=c==f;return"vardef"==f?s.indented+("operator"==t.lastType||","==t.lastType?s.info.length+1:0):"form"==f&&"{"==c?s.indented:"form"==f?s.indented+a:"stat"==f?s.indented+(nt(t,n)?o||a:0):"switch"!=s.info||d||0==r.doubleIndentSwitch?s.align?s.column+(d?0:1):s.indented+(d?0:a):s.indented+(/^(?:case|default)\b/.test(n)?a:2*a)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:s?null:"/*",blockCommentEnd:s?null:"*/",blockCommentContinue:s?null:" * ",lineComment:s?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:s?"json":"javascript",jsonldMode:c,jsonMode:s,expressionAllowed:it,skipExpression:function(t){C(t,"atom","atom","true",new e.StringStream("",2,null))}}})),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/manifest+json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})}))}}]);