(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard~link~whatsapp-overview~23c76db4"],{"004f":function(e,t,i){var n=i("6d8b"),a=i("72b6"),o=i("2306"),r=i("a15a"),s=r.createSymbol,l=i("f934"),h=i("cbb0"),u=a.extend({type:"visualMap.piecewise",doRender:function(){var e=this.group;e.removeAll();var t=this.visualMapModel,i=t.get("textGap"),a=t.textStyleModel,r=a.getFont(),s=a.getTextColor(),h=this._getItemAlign(),u=t.itemSize,c=this._getViewData(),d=c.endsText,p=n.retrieve(t.get("showLabel",!0),!d);function g(a){var l=a.piece,c=new o.Group;c.onclick=n.bind(this._onItemClick,this,l),this._enableHoverLink(c,a.indexInModelPieceList);var d=t.getRepresentValue(l);if(this._createItemSymbol(c,d,[0,0,u[0],u[1]]),p){var g=this.visualMapModel.getValueState(d);c.add(new o.Text({style:{x:"right"===h?-i:u[0]+i,y:u[1]/2,text:l.text,textVerticalAlign:"middle",textAlign:h,textFont:r,textFill:s,opacity:"outOfRange"===g?.5:1}}))}e.add(c)}d&&this._renderEndsText(e,d[0],u,p,h),n.each(c.viewPieceList,g,this),d&&this._renderEndsText(e,d[1],u,p,h),l.box(t.get("orient"),e,t.get("itemGap")),this.renderBackground(e),this.positionGroup(e)},_enableHoverLink:function(e,t){function i(e){var i=this.visualMapModel;i.option.hoverLink&&this.api.dispatchAction({type:e,batch:h.makeHighDownBatch(i.findTargetDataIndices(t),i)})}e.on("mouseover",n.bind(i,this,"highlight")).on("mouseout",n.bind(i,this,"downplay"))},_getItemAlign:function(){var e=this.visualMapModel,t=e.option;if("vertical"===t.orient)return h.getItemAlign(e,this.api,e.itemSize);var i=t.align;return i&&"auto"!==i||(i="left"),i},_renderEndsText:function(e,t,i,n,a){if(t){var r=new o.Group,s=this.visualMapModel.textStyleModel;r.add(new o.Text({style:{x:n?"right"===a?i[0]:0:i[0]/2,y:i[1]/2,textVerticalAlign:"middle",textAlign:n?a:"center",text:t,textFont:s.getFont(),textFill:s.getTextColor()}})),e.add(r)}},_getViewData:function(){var e=this.visualMapModel,t=n.map(e.getPieceList(),(function(e,t){return{piece:e,indexInModelPieceList:t}})),i=e.get("text"),a=e.get("orient"),o=e.get("inverse");return("horizontal"===a?o:!o)?t.reverse():i&&(i=i.slice().reverse()),{viewPieceList:t,endsText:i}},_createItemSymbol:function(e,t,i){e.add(s(this.getControllerVisual(t,"symbol"),i[0],i[1],i[2],i[3],this.getControllerVisual(t,"color")))},_onItemClick:function(e){var t=this.visualMapModel,i=t.option,a=n.clone(i.selected),o=t.getSelectedMapKey(e);"single"===i.selectedMode?(a[o]=!0,n.each(a,(function(e,t){a[t]=t===o}))):a[o]=!a[o],this.api.dispatchAction({type:"selectDataRange",from:this.uid,visualMapId:this.visualMapModel.id,selected:a})}}),c=u;e.exports=c},"06ea":function(e,t,i){var n=i("4e08"),a=(n.__DEV__,i("6d8b")),o=i("eaea"),r=i("5f14"),s=i("60e3"),l=i("3842"),h=l.reformIntervals,u=o.extend({type:"visualMap.piecewise",defaultOption:{selected:null,minOpen:!1,maxOpen:!1,align:"auto",itemWidth:20,itemHeight:14,itemSymbol:"roundRect",pieceList:null,categories:null,splitNumber:5,selectedMode:"multiple",itemGap:10,hoverLink:!0,showLabel:null},optionUpdated:function(e,t){u.superApply(this,"optionUpdated",arguments),this._pieceList=[],this.resetExtent();var i=this._mode=this._determineMode();c[this._mode].call(this),this._resetSelected(e,t);var n=this.option.categories;this.resetVisual((function(e,t){"categories"===i?(e.mappingMethod="category",e.categories=a.clone(n)):(e.dataExtent=this.getExtent(),e.mappingMethod="piecewise",e.pieceList=a.map(this._pieceList,(function(e){e=a.clone(e);return"inRange"!==t&&(e.visual=null),e})))}))},completeVisualOption:function(){var e=this.option,t={},i=r.listVisualTypes(),n=this.isCategory();function l(e,t,i){return e&&e[t]&&(a.isObject(e[t])?e[t].hasOwnProperty(i):e[t]===i)}a.each(e.pieces,(function(e){a.each(i,(function(i){e.hasOwnProperty(i)&&(t[i]=1)}))})),a.each(t,(function(t,i){var o=0;a.each(this.stateList,(function(t){o|=l(e,t,i)||l(e.target,t,i)}),this),!o&&a.each(this.stateList,(function(t){(e[t]||(e[t]={}))[i]=s.get(i,"inRange"===t?"active":"inactive",n)}))}),this),o.prototype.completeVisualOption.apply(this,arguments)},_resetSelected:function(e,t){var i=this.option,n=this._pieceList,o=(t?i:e).selected||{};if(i.selected=o,a.each(n,(function(e,t){var i=this.getSelectedMapKey(e);o.hasOwnProperty(i)||(o[i]=!0)}),this),"single"===i.selectedMode){var r=!1;a.each(n,(function(e,t){var i=this.getSelectedMapKey(e);o[i]&&(r?o[i]=!1:r=!0)}),this)}},getSelectedMapKey:function(e){return"categories"===this._mode?e.value+"":e.index+""},getPieceList:function(){return this._pieceList},_determineMode:function(){var e=this.option;return e.pieces&&e.pieces.length>0?"pieces":this.option.categories?"categories":"splitNumber"},setSelected:function(e){this.option.selected=a.clone(e)},getValueState:function(e){var t=r.findPieceIndex(e,this._pieceList);return null!=t&&this.option.selected[this.getSelectedMapKey(this._pieceList[t])]?"inRange":"outOfRange"},findTargetDataIndices:function(e){var t=[];return this.eachTargetSeries((function(i){var n=[],a=i.getData();a.each(this.getDataDimension(a),(function(t,i){var a=r.findPieceIndex(t,this._pieceList);a===e&&n.push(i)}),this),t.push({seriesId:i.id,dataIndex:n})}),this),t},getRepresentValue:function(e){var t;if(this.isCategory())t=e.value;else if(null!=e.value)t=e.value;else{var i=e.interval||[];t=i[0]===-1/0&&i[1]===1/0?0:(i[0]+i[1])/2}return t},getVisualMeta:function(e){if(!this.isCategory()){var t=[],i=[],n=this,o=this._pieceList.slice();if(o.length){var r=o[0].interval[0];r!==-1/0&&o.unshift({interval:[-1/0,r]}),r=o[o.length-1].interval[1],r!==1/0&&o.push({interval:[r,1/0]})}else o.push({interval:[-1/0,1/0]});var s=-1/0;return a.each(o,(function(e){var t=e.interval;t&&(t[0]>s&&l([s,t[0]],"outOfRange"),l(t.slice()),s=t[1])}),this),{stops:t,outerColors:i}}function l(a,o){var r=n.getRepresentValue({interval:a});o||(o=n.getValueState(r));var s=e(r,o);a[0]===-1/0?i[0]=s:a[1]===1/0?i[1]=s:t.push({value:a[0],color:s},{value:a[1],color:s})}}}),c={splitNumber:function(){var e=this.option,t=this._pieceList,i=Math.min(e.precision,20),n=this.getExtent(),o=e.splitNumber;o=Math.max(parseInt(o,10),1),e.splitNumber=o;var r=(n[1]-n[0])/o;while(+r.toFixed(i)!==r&&i<5)i++;e.precision=i,r=+r.toFixed(i),e.minOpen&&t.push({interval:[-1/0,n[0]],close:[0,0]});for(var s=0,l=n[0];s<o;l+=r,s++){var u=s===o-1?n[1]:l+r;t.push({interval:[l,u],close:[1,1]})}e.maxOpen&&t.push({interval:[n[1],1/0],close:[0,0]}),h(t),a.each(t,(function(e,t){e.index=t,e.text=this.formatValueText(e.interval)}),this)},categories:function(){var e=this.option;a.each(e.categories,(function(e){this._pieceList.push({text:this.formatValueText(e,!0),value:e})}),this),d(e,this._pieceList)},pieces:function(){var e=this.option,t=this._pieceList;a.each(e.pieces,(function(e,i){a.isObject(e)||(e={value:e});var n={text:"",index:i};if(null!=e.label&&(n.text=e.label),e.hasOwnProperty("value")){var o=n.value=e.value;n.interval=[o,o],n.close=[1,1]}else{for(var s=n.interval=[],l=n.close=[0,0],h=[1,0,1],u=[-1/0,1/0],c=[],d=0;d<2;d++){for(var p=[["gte","gt","min"],["lte","lt","max"]][d],g=0;g<3&&null==s[d];g++)s[d]=e[p[g]],l[d]=h[g],c[d]=2===g;null==s[d]&&(s[d]=u[d])}c[0]&&s[1]===1/0&&(l[0]=0),c[1]&&s[0]===-1/0&&(l[1]=0),s[0]===s[1]&&l[0]&&l[1]&&(n.value=s[0])}n.visual=r.retrieveVisuals(e),t.push(n)}),this),d(e,t),h(t),a.each(t,(function(e){var t=e.close,i=[["<","≤"][t[1]],[">","≥"][t[0]]];e.text=e.text||this.formatValueText(null!=e.value?e.value:e.interval,!1,i)}),this)}};function d(e,t){var i=e.inverse;("vertical"===e.orient?!i:i)&&t.reverse()}var p=u;e.exports=p},"29a9":function(e,t,i){var n=i("3eba"),a=i("b336");i("bc5f"),i("ab05"),i("06ea"),i("004f"),i("d6ef"),n.registerPreprocessor(a)},"307a":function(e,t,i){var n=i("6d8b"),a=i("eaea"),o=i("3842"),r=[20,140],s=a.extend({type:"visualMap.continuous",defaultOption:{align:"auto",calculable:!1,range:null,realtime:!0,itemHeight:null,itemWidth:null,hoverLink:!0,hoverLinkDataSize:null,hoverLinkOnHandle:null},optionUpdated:function(e,t){s.superApply(this,"optionUpdated",arguments),this.resetExtent(),this.resetVisual((function(e){e.mappingMethod="linear",e.dataExtent=this.getExtent()})),this._resetRange()},resetItemSize:function(){s.superApply(this,"resetItemSize",arguments);var e=this.itemSize;"horizontal"===this._orient&&e.reverse(),(null==e[0]||isNaN(e[0]))&&(e[0]=r[0]),(null==e[1]||isNaN(e[1]))&&(e[1]=r[1])},_resetRange:function(){var e=this.getExtent(),t=this.option.range;!t||t.auto?(e.auto=1,this.option.range=e):n.isArray(t)&&(t[0]>t[1]&&t.reverse(),t[0]=Math.max(t[0],e[0]),t[1]=Math.min(t[1],e[1]))},completeVisualOption:function(){a.prototype.completeVisualOption.apply(this,arguments),n.each(this.stateList,(function(e){var t=this.option.controller[e].symbolSize;t&&t[0]!==t[1]&&(t[0]=0)}),this)},setSelected:function(e){this.option.range=e.slice(),this._resetRange()},getSelected:function(){var e=this.getExtent(),t=o.asc((this.get("range")||[]).slice());return t[0]>e[1]&&(t[0]=e[1]),t[1]>e[1]&&(t[1]=e[1]),t[0]<e[0]&&(t[0]=e[0]),t[1]<e[0]&&(t[1]=e[0]),t},getValueState:function(e){var t=this.option.range,i=this.getExtent();return(t[0]<=i[0]||t[0]<=e)&&(t[1]>=i[1]||e<=t[1])?"inRange":"outOfRange"},findTargetDataIndices:function(e){var t=[];return this.eachTargetSeries((function(i){var n=[],a=i.getData();a.each(this.getDataDimension(a),(function(t,i){e[0]<=t&&t<=e[1]&&n.push(i)}),this),t.push({seriesId:i.id,dataIndex:n})}),this),t},getVisualMeta:function(e){var t=l(this,"outOfRange",this.getExtent()),i=l(this,"inRange",this.option.range.slice()),n=[];function a(t,i){n.push({value:t,color:e(t,i)})}for(var o=0,r=0,s=i.length,h=t.length;r<h&&(!i.length||t[r]<=i[0]);r++)t[r]<i[o]&&a(t[r],"outOfRange");for(var u=1;o<s;o++,u=0)u&&n.length&&a(i[o],"outOfRange"),a(i[o],"inRange");for(u=1;r<h;r++)(!i.length||i[i.length-1]<t[r])&&(u&&(n.length&&a(n[n.length-1].value,"outOfRange"),u=0),a(t[r],"outOfRange"));var c=n.length;return{stops:n,outerColors:[c?n[0].color:"transparent",c?n[c-1].color:"transparent"]}}});function l(e,t,i){if(i[0]===i[1])return i.slice();for(var n=200,a=(i[1]-i[0])/n,o=i[0],r=[],s=0;s<=n&&o<i[1];s++)r.push(o),o+=a;return r.push(i[1]),r}var h=s;e.exports=h},"3cd6":function(e,t,i){var n=i("6d8b"),a=i("48a9"),o=i("607d"),r=i("72b6"),s=i("2306"),l=i("3842"),h=i("ef6a"),u=i("cbb0"),c=i("e0d3"),d=l.linearMap,p=n.each,g=Math.min,v=Math.max,f=12,m=6,_=r.extend({type:"visualMap.continuous",init:function(){_.superApply(this,"init",arguments),this._shapes={},this._dataInterval=[],this._handleEnds=[],this._orient,this._useHandle,this._hoverLinkDataIndices=[],this._dragging,this._hovering},doRender:function(e,t,i,n){n&&"selectDataRange"===n.type&&n.from===this.uid||this._buildView()},_buildView:function(){this.group.removeAll();var e=this.visualMapModel,t=this.group;this._orient=e.get("orient"),this._useHandle=e.get("calculable"),this._resetInterval(),this._renderBar(t);var i=e.get("text");this._renderEndsText(t,i,0),this._renderEndsText(t,i,1),this._updateView(!0),this.renderBackground(t),this._updateView(),this._enableHoverLinkToSeries(),this._enableHoverLinkFromSeries(),this.positionGroup(t)},_renderEndsText:function(e,t,i){if(t){var n=t[1-i];n=null!=n?n+"":"";var a=this.visualMapModel,o=a.get("textGap"),r=a.itemSize,l=this._shapes.barGroup,h=this._applyTransform([r[0]/2,0===i?-o:r[1]+o],l),u=this._applyTransform(0===i?"bottom":"top",l),c=this._orient,d=this.visualMapModel.textStyleModel;this.group.add(new s.Text({style:{x:h[0],y:h[1],textVerticalAlign:"horizontal"===c?"middle":u,textAlign:"horizontal"===c?u:"center",text:n,textFont:d.getFont(),textFill:d.getTextColor()}}))}},_renderBar:function(e){var t=this.visualMapModel,i=this._shapes,a=t.itemSize,o=this._orient,r=this._useHandle,s=u.getItemAlign(t,this.api,a),l=i.barGroup=this._createBarGroup(s);l.add(i.outOfRange=x()),l.add(i.inRange=x(null,r?L(this._orient):null,n.bind(this._dragHandle,this,"all",!1),n.bind(this._dragHandle,this,"all",!0)));var h=t.textStyleModel.getTextRect("国"),c=v(h.width,h.height);r&&(i.handleThumbs=[],i.handleLabels=[],i.handleLabelPoints=[],this._createHandle(l,0,a,c,o,s),this._createHandle(l,1,a,c,o,s)),this._createIndicator(l,a,c,o),e.add(l)},_createHandle:function(e,t,i,a,r){var l=n.bind(this._dragHandle,this,t,!1),h=n.bind(this._dragHandle,this,t,!0),u=x(b(t,a),L(this._orient),l,h);u.position[0]=i[0],e.add(u);var c=this.visualMapModel.textStyleModel,d=new s.Text({draggable:!0,drift:l,onmousemove:function(e){o.stop(e.event)},ondragend:h,style:{x:0,y:0,text:"",textFont:c.getFont(),textFill:c.getTextColor()}});this.group.add(d);var p=["horizontal"===r?a/2:1.5*a,"horizontal"===r?0===t?-1.5*a:1.5*a:0===t?-a/2:a/2],g=this._shapes;g.handleThumbs[t]=u,g.handleLabelPoints[t]=p,g.handleLabels[t]=d},_createIndicator:function(e,t,i,n){var a=x([[0,0]],"move");a.position[0]=t[0],a.attr({invisible:!0,silent:!0}),e.add(a);var o=this.visualMapModel.textStyleModel,r=new s.Text({silent:!0,invisible:!0,style:{x:0,y:0,text:"",textFont:o.getFont(),textFill:o.getTextColor()}});this.group.add(r);var l=["horizontal"===n?i/2:m+3,0],h=this._shapes;h.indicator=a,h.indicatorLabel=r,h.indicatorLabelPoint=l},_dragHandle:function(e,t,i,n){if(this._useHandle){if(this._dragging=!t,!t){var a=this._applyTransform([i,n],this._shapes.barGroup,!0);this._updateInterval(e,a[1]),this._updateView()}t===!this.visualMapModel.get("realtime")&&this.api.dispatchAction({type:"selectDataRange",from:this.uid,visualMapId:this.visualMapModel.id,selected:this._dataInterval.slice()}),t?!this._hovering&&this._clearHoverLinkToSeries():S(this.visualMapModel)&&this._doHoverLinkToSeries(this._handleEnds[e],!1)}},_resetInterval:function(){var e=this.visualMapModel,t=this._dataInterval=e.getSelected(),i=e.getExtent(),n=[0,e.itemSize[1]];this._handleEnds=[d(t[0],i,n,!0),d(t[1],i,n,!0)]},_updateInterval:function(e,t){t=t||0;var i=this.visualMapModel,n=this._handleEnds,a=[0,i.itemSize[1]];h(t,n,a,e,0);var o=i.getExtent();this._dataInterval=[d(n[0],a,o,!0),d(n[1],a,o,!0)]},_updateView:function(e){var t=this.visualMapModel,i=t.getExtent(),n=this._shapes,a=[0,t.itemSize[1]],o=e?a:this._handleEnds,r=this._createBarVisual(this._dataInterval,i,o,"inRange"),s=this._createBarVisual(i,i,a,"outOfRange");n.inRange.setStyle({fill:r.barColor,opacity:r.opacity}).setShape("points",r.barPoints),n.outOfRange.setStyle({fill:s.barColor,opacity:s.opacity}).setShape("points",s.barPoints),this._updateHandle(o,r)},_createBarVisual:function(e,t,i,n){var o={forceState:n,convertOpacityToAlpha:!0},r=this._makeColorGradient(e,o),s=[this.getControllerVisual(e[0],"symbolSize",o),this.getControllerVisual(e[1],"symbolSize",o)],l=this._createBarPoints(i,s);return{barColor:new a(0,0,0,1,r),barPoints:l,handlesColor:[r[0].color,r[r.length-1].color]}},_makeColorGradient:function(e,t){var i=100,n=[],a=(e[1]-e[0])/i;n.push({color:this.getControllerVisual(e[0],"color",t),offset:0});for(var o=1;o<i;o++){var r=e[0]+a*o;if(r>e[1])break;n.push({color:this.getControllerVisual(r,"color",t),offset:o/i})}return n.push({color:this.getControllerVisual(e[1],"color",t),offset:1}),n},_createBarPoints:function(e,t){var i=this.visualMapModel.itemSize;return[[i[0]-t[0],e[0]],[i[0],e[0]],[i[0],e[1]],[i[0]-t[1],e[1]]]},_createBarGroup:function(e){var t=this._orient,i=this.visualMapModel.get("inverse");return new s.Group("horizontal"!==t||i?"horizontal"===t&&i?{scale:"bottom"===e?[-1,1]:[1,1],rotation:-Math.PI/2}:"vertical"!==t||i?{scale:"left"===e?[1,1]:[-1,1]}:{scale:"left"===e?[1,-1]:[-1,-1]}:{scale:"bottom"===e?[1,1]:[-1,1],rotation:Math.PI/2})},_updateHandle:function(e,t){if(this._useHandle){var i=this._shapes,n=this.visualMapModel,a=i.handleThumbs,o=i.handleLabels;p([0,1],(function(r){var l=a[r];l.setStyle("fill",t.handlesColor[r]),l.position[1]=e[r];var h=s.applyTransform(i.handleLabelPoints[r],s.getTransform(l,this.group));o[r].setStyle({x:h[0],y:h[1],text:n.formatValueText(this._dataInterval[r]),textVerticalAlign:"middle",textAlign:this._applyTransform("horizontal"===this._orient?0===r?"bottom":"top":"left",i.barGroup)})}),this)}},_showIndicator:function(e,t,i,n){var a=this.visualMapModel,o=a.getExtent(),r=a.itemSize,l=[0,r[1]],h=d(e,o,l,!0),u=this._shapes,c=u.indicator;if(c){c.position[1]=h,c.attr("invisible",!1),c.setShape("points",y(!!i,n,h,r[1]));var p={convertOpacityToAlpha:!0},g=this.getControllerVisual(e,"color",p);c.setStyle("fill",g);var v=s.applyTransform(u.indicatorLabelPoint,s.getTransform(c,this.group)),f=u.indicatorLabel;f.attr("invisible",!1);var m=this._applyTransform("left",u.barGroup),_=this._orient;f.setStyle({text:(i||"")+a.formatValueText(t),textVerticalAlign:"horizontal"===_?m:"middle",textAlign:"horizontal"===_?"center":m,x:v[0],y:v[1]})}},_enableHoverLinkToSeries:function(){var e=this;this._shapes.barGroup.on("mousemove",(function(t){if(e._hovering=!0,!e._dragging){var i=e.visualMapModel.itemSize,n=e._applyTransform([t.offsetX,t.offsetY],e._shapes.barGroup,!0,!0);n[1]=g(v(0,n[1]),i[1]),e._doHoverLinkToSeries(n[1],0<=n[0]&&n[0]<=i[0])}})).on("mouseout",(function(){e._hovering=!1,!e._dragging&&e._clearHoverLinkToSeries()}))},_enableHoverLinkFromSeries:function(){var e=this.api.getZr();this.visualMapModel.option.hoverLink?(e.on("mouseover",this._hoverLinkFromSeriesMouseOver,this),e.on("mouseout",this._hideIndicator,this)):this._clearHoverLinkFromSeries()},_doHoverLinkToSeries:function(e,t){var i=this.visualMapModel,n=i.itemSize;if(i.option.hoverLink){var a=[0,n[1]],o=i.getExtent();e=g(v(a[0],e),a[1]);var r=M(i,o,a),s=[e-r,e+r],l=d(e,a,o,!0),h=[d(s[0],a,o,!0),d(s[1],a,o,!0)];s[0]<a[0]&&(h[0]=-1/0),s[1]>a[1]&&(h[1]=1/0),t&&(h[0]===-1/0?this._showIndicator(l,h[1],"< ",r):h[1]===1/0?this._showIndicator(l,h[0],"> ",r):this._showIndicator(l,l,"≈ ",r));var p=this._hoverLinkDataIndices,f=[];(t||S(i))&&(f=this._hoverLinkDataIndices=i.findTargetDataIndices(h));var m=c.compressBatches(p,f);this._dispatchHighDown("downplay",u.makeHighDownBatch(m[0],i)),this._dispatchHighDown("highlight",u.makeHighDownBatch(m[1],i))}},_hoverLinkFromSeriesMouseOver:function(e){var t=e.target,i=this.visualMapModel;if(t&&null!=t.dataIndex){var n=this.ecModel.getSeriesByIndex(t.seriesIndex);if(i.isTargetSeries(n)){var a=n.getData(t.dataType),o=a.get(i.getDataDimension(a),t.dataIndex,!0);isNaN(o)||this._showIndicator(o,o)}}},_hideIndicator:function(){var e=this._shapes;e.indicator&&e.indicator.attr("invisible",!0),e.indicatorLabel&&e.indicatorLabel.attr("invisible",!0)},_clearHoverLinkToSeries:function(){this._hideIndicator();var e=this._hoverLinkDataIndices;this._dispatchHighDown("downplay",u.makeHighDownBatch(e,this.visualMapModel)),e.length=0},_clearHoverLinkFromSeries:function(){this._hideIndicator();var e=this.api.getZr();e.off("mouseover",this._hoverLinkFromSeriesMouseOver),e.off("mouseout",this._hideIndicator)},_applyTransform:function(e,t,i,a){var o=s.getTransform(t,a?null:this.group);return s[n.isArray(e)?"applyTransform":"transformDirection"](e,o,i)},_dispatchHighDown:function(e,t){t&&t.length&&this.api.dispatchAction({type:e,batch:t})},dispose:function(){this._clearHoverLinkFromSeries(),this._clearHoverLinkToSeries()},remove:function(){this._clearHoverLinkFromSeries(),this._clearHoverLinkToSeries()}});function x(e,t,i,n){return new s.Polygon({shape:{points:e},draggable:!!i,cursor:t,drift:i,onmousemove:function(e){o.stop(e.event)},ondragend:n})}function b(e,t){return 0===e?[[0,0],[t,0],[t,-t]]:[[0,0],[t,0],[t,t]]}function y(e,t,i,n){return e?[[0,-g(t,v(i,0))],[m,0],[0,g(t,v(n-i,0))]]:[[0,0],[5,-5],[5,5]]}function M(e,t,i){var n=f/2,a=e.get("hoverLinkDataSize");return a&&(n=d(a,t,i,!0)/2),n}function S(e){var t=e.get("hoverLinkOnHandle");return!!(null==t?e.get("realtime"):t)}function L(e){return"vertical"===e?"ns-resize":"ew-resize"}var V=_;e.exports=V},5450:function(e,t,i){i("7419"),i("29a9")},"72b6":function(e,t,i){var n=i("3eba"),a=i("6d8b"),o=i("2306"),r=i("eda2"),s=i("f934"),l=i("5f14"),h=n.extendComponentView({type:"visualMap",autoPositionValues:{left:1,right:1,top:1,bottom:1},init:function(e,t){this.ecModel=e,this.api=t,this.visualMapModel},render:function(e,t,i,n){this.visualMapModel=e,!1!==e.get("show")?this.doRender.apply(this,arguments):this.group.removeAll()},renderBackground:function(e){var t=this.visualMapModel,i=r.normalizeCssArray(t.get("padding")||0),n=e.getBoundingRect();e.add(new o.Rect({z2:-1,silent:!0,shape:{x:n.x-i[3],y:n.y-i[0],width:n.width+i[3]+i[1],height:n.height+i[0]+i[2]},style:{fill:t.get("backgroundColor"),stroke:t.get("borderColor"),lineWidth:t.get("borderWidth")}}))},getControllerVisual:function(e,t,i){i=i||{};var n=i.forceState,o=this.visualMapModel,r={};if("symbol"===t&&(r.symbol=o.get("itemSymbol")),"color"===t){var s=o.get("contentColor");r.color=s}function h(e){return r[e]}function u(e,t){r[e]=t}var c=o.controllerVisuals[n||o.getValueState(e)],d=l.prepareVisualTypes(c);return a.each(d,(function(n){var a=c[n];i.convertOpacityToAlpha&&"opacity"===n&&(n="colorAlpha",a=c.__alphaForOpacity),l.dependsOn(n,t)&&a&&a.applyVisual(e,h,u)})),r[t]},positionGroup:function(e){var t=this.visualMapModel,i=this.api;s.positionElement(e,t.getBoxLayoutParams(),{width:i.getWidth(),height:i.getHeight()})},doRender:a.noop});e.exports=h},7419:function(e,t,i){var n=i("3eba"),a=i("b336");i("bc5f"),i("ab05"),i("307a"),i("3cd6"),i("d6ef"),n.registerPreprocessor(a)},ab05:function(e,t,i){var n=i("3eba"),a=i("6d8b"),o=i("2b8c"),r=i("5f14"),s=n.PRIORITY.VISUAL.COMPONENT;function l(e,t,i,n){for(var a=t.targetVisuals[n],o=r.prepareVisualTypes(a),s={color:e.getData().getVisual("color")},l=0,h=o.length;l<h;l++){var u=o[l],c=a["opacity"===u?"__alphaForOpacity":u];c&&c.applyVisual(i,d,p)}return s.color;function d(e){return s[e]}function p(e,t){s[e]=t}}n.registerVisual(s,{createOnAllSeries:!0,reset:function(e,t){var i=[];return t.eachComponent("visualMap",(function(t){var n=e.pipelineContext;!t.isTargetSeries(e)||n&&n.large||i.push(o.incrementalApplyVisual(t.stateList,t.targetVisuals,a.bind(t.getValueState,t),t.getDataDimension(e.getData())))})),i}}),n.registerVisual(s,{createOnAllSeries:!0,reset:function(e,t){var i=e.getData(),n=[];t.eachComponent("visualMap",(function(t){if(t.isTargetSeries(e)){var o=t.getVisualMeta(a.bind(l,null,e,t))||{stops:[],outerColors:[]},r=t.getDataDimension(i),s=i.getDimensionInfo(r);null!=s&&(o.dimension=s.index,n.push(o))}})),e.getData().setVisual("visualMeta",n)}})},b336:function(e,t,i){var n=i("6d8b"),a=n.each;function o(e){var t=e&&e.visualMap;n.isArray(t)||(t=t?[t]:[]),a(t,(function(e){if(e){r(e,"splitList")&&!r(e,"pieces")&&(e.pieces=e.splitList,delete e.splitList);var t=e.pieces;t&&n.isArray(t)&&a(t,(function(e){n.isObject(e)&&(r(e,"start")&&!r(e,"min")&&(e.min=e.start),r(e,"end")&&!r(e,"max")&&(e.max=e.end))}))}}))}function r(e,t){return e&&e.hasOwnProperty&&e.hasOwnProperty(t)}e.exports=o},bc5f:function(e,t,i){var n=i("6cb7");n.registerSubTypeDefaulter("visualMap",(function(e){return e.categories||(e.pieces?e.pieces.length>0:e.splitNumber>0)&&!e.calculable?"piecewise":"continuous"}))},cbb0:function(e,t,i){var n=i("6d8b"),a=i("f934"),o=a.getLayoutRect;function r(e,t,i){var n=e.option,a=n.align;if(null!=a&&"auto"!==a)return a;for(var r={width:t.getWidth(),height:t.getHeight()},s="horizontal"===n.orient?1:0,l=[["left","right","width"],["top","bottom","height"]],h=l[s],u=[0,null,10],c={},d=0;d<3;d++)c[l[1-s][d]]=u[d],c[h[d]]=2===d?i[0]:n[h[d]];var p=[["x","width",3],["y","height",0]][s],g=o(c,r,n.padding);return h[(g.margin[p[2]]||0)+g[p[0]]+.5*g[p[1]]<.5*r[p[1]]?0:1]}function s(e,t){return n.each(e||[],(function(e){null!=e.dataIndex&&(e.dataIndexInside=e.dataIndex,e.dataIndex=null),e.highlightKey="visualMap"+(t?t.componentIndex:"")})),e}t.getItemAlign=r,t.makeHighDownBatch=s},d6ef:function(e,t,i){var n=i("3eba"),a={type:"selectDataRange",event:"dataRangeSelected",update:"update"};n.registerAction(a,(function(e,t){t.eachComponent({mainType:"visualMap",query:e},(function(t){t.setSelected(e.selected)}))}))},eaea:function(e,t,i){var n=i("3eba"),a=i("6d8b"),o=i("22d1"),r=i("60e3"),s=i("5f14"),l=i("2b8c"),h=i("e0d3"),u=i("3842"),c=s.mapVisual,d=s.eachVisual,p=a.isArray,g=a.each,v=u.asc,f=u.linearMap,m=a.noop,_=n.extendComponentModel({type:"visualMap",dependencies:["series"],stateList:["inRange","outOfRange"],replacableOptionKeys:["inRange","outOfRange","target","controller","color"],dataBound:[-1/0,1/0],layoutMode:{type:"box",ignoreSize:!0},defaultOption:{show:!0,zlevel:0,z:4,seriesIndex:"all",min:0,max:200,dimension:null,inRange:null,outOfRange:null,left:0,right:null,top:null,bottom:0,itemWidth:null,itemHeight:null,inverse:!1,orient:"vertical",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",contentColor:"#5793f3",inactiveColor:"#aaa",borderWidth:0,padding:5,textGap:10,precision:0,color:null,formatter:null,text:null,textStyle:{color:"#333"}},init:function(e,t,i){this._dataExtent,this.targetVisuals={},this.controllerVisuals={},this.textStyleModel,this.itemSize,this.mergeDefaultAndTheme(e,i)},optionUpdated:function(e,t){var i=this.option;o.canvasSupported||(i.realtime=!1),!t&&l.replaceVisualOption(i,e,this.replacableOptionKeys),this.textStyleModel=this.getModel("textStyle"),this.resetItemSize(),this.completeVisualOption()},resetVisual:function(e){var t=this.stateList;e=a.bind(e,this),this.controllerVisuals=l.createVisualMappings(this.option.controller,t,e),this.targetVisuals=l.createVisualMappings(this.option.target,t,e)},getTargetSeriesIndices:function(){var e=this.option.seriesIndex,t=[];return null==e||"all"===e?this.ecModel.eachSeries((function(e,i){t.push(i)})):t=h.normalizeToArray(e),t},eachTargetSeries:function(e,t){a.each(this.getTargetSeriesIndices(),(function(i){e.call(t,this.ecModel.getSeriesByIndex(i))}),this)},isTargetSeries:function(e){var t=!1;return this.eachTargetSeries((function(i){i===e&&(t=!0)})),t},formatValueText:function(e,t,i){var n,o,r=this.option,s=r.precision,l=this.dataBound,h=r.formatter;return i=i||["<",">"],a.isArray(e)&&(e=e.slice(),n=!0),o=t?e:n?[u(e[0]),u(e[1])]:u(e),a.isString(h)?h.replace("{value}",n?o[0]:o).replace("{value2}",n?o[1]:o):a.isFunction(h)?n?h(e[0],e[1]):h(e):n?e[0]===l[0]?i[0]+" "+o[1]:e[1]===l[1]?i[1]+" "+o[0]:o[0]+" - "+o[1]:o;function u(e){return e===l[0]?"min":e===l[1]?"max":(+e).toFixed(Math.min(s,20))}},resetExtent:function(){var e=this.option,t=v([e.min,e.max]);this._dataExtent=t},getDataDimension:function(e){var t=this.option.dimension,i=e.dimensions;if(null!=t||i.length){if(null!=t)return e.getDimension(t);for(var n=e.dimensions,a=n.length-1;a>=0;a--){var o=n[a],r=e.getDimensionInfo(o);if(!r.isCalculationCoord)return o}}},getExtent:function(){return this._dataExtent.slice()},completeVisualOption:function(){var e=this.ecModel,t=this.option,i={inRange:t.inRange,outOfRange:t.outOfRange},n=t.target||(t.target={}),o=t.controller||(t.controller={});a.merge(n,i),a.merge(o,i);var l=this.isCategory();function h(i){p(t.color)&&!i.inRange&&(i.inRange={color:t.color.slice().reverse()}),i.inRange=i.inRange||{color:e.get("gradientColor")},g(this.stateList,(function(e){var t=i[e];if(a.isString(t)){var n=r.get(t,"active",l);n?(i[e]={},i[e][t]=n):delete i[e]}}),this)}function u(e,t,i){var n=e[t],a=e[i];n&&!a&&(a=e[i]={},g(n,(function(e,t){if(s.isValidType(t)){var i=r.get(t,"inactive",l);null!=i&&(a[t]=i,"color"!==t||a.hasOwnProperty("opacity")||a.hasOwnProperty("colorAlpha")||(a.opacity=[0,0]))}})))}function v(e){var t=(e.inRange||{}).symbol||(e.outOfRange||{}).symbol,i=(e.inRange||{}).symbolSize||(e.outOfRange||{}).symbolSize,n=this.get("inactiveColor");g(this.stateList,(function(o){var r=this.itemSize,s=e[o];s||(s=e[o]={color:l?n:[n]}),null==s.symbol&&(s.symbol=t&&a.clone(t)||(l?"roundRect":["roundRect"])),null==s.symbolSize&&(s.symbolSize=i&&a.clone(i)||(l?r[0]:[r[0],r[0]])),s.symbol=c(s.symbol,(function(e){return"none"===e||"square"===e?"roundRect":e}));var h=s.symbolSize;if(null!=h){var u=-1/0;d(h,(function(e){e>u&&(u=e)})),s.symbolSize=c(h,(function(e){return f(e,[0,u],[0,r[0]],!0)}))}}),this)}h.call(this,n),h.call(this,o),u.call(this,n,"inRange","outOfRange"),v.call(this,o)},resetItemSize:function(){this.itemSize=[parseFloat(this.get("itemWidth")),parseFloat(this.get("itemHeight"))]},isCategory:function(){return!!this.option.categories},setSelected:m,getValueState:m,getVisualMeta:m}),x=_;e.exports=x}}]);