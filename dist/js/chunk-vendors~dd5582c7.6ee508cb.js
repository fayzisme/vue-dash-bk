(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors~dd5582c7"],{"098c":function(e,t,a){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.polarArea={scale:{type:"radialLinear",angleLines:{display:!1},gridLines:{circular:!0},pointLabels:{display:!1},ticks:{beginAtZero:!0}},animation:{animateRotate:!0,animateScale:!0},startAngle:-.5*Math.PI,aspectRatio:1,legendCallback:function(e){var t=[];t.push('<ul class="'+e.id+'-legend">');var a=e.data,o=a.datasets,r=a.labels;if(o.length)for(var n=0;n<o[0].data.length;++n)t.push('<li><span style="background-color:'+o[0].backgroundColor[n]+'"></span>'),r[n]&&t.push(r[n]),t.push("</li>");return t.push("</ul>"),t.join("")},legend:{labels:{generateLabels:function(e){var a=e.data;return a.labels.length&&a.datasets.length?a.labels.map((function(o,r){var n=e.getDatasetMeta(0),i=a.datasets[0],d=n.data[r],l=d.custom||{},s=t.getValueAtIndexOrDefault,u=e.options.elements.arc,c=l.backgroundColor?l.backgroundColor:s(i.backgroundColor,r,u.backgroundColor),h=l.borderColor?l.borderColor:s(i.borderColor,r,u.borderColor),g=l.borderWidth?l.borderWidth:s(i.borderWidth,r,u.borderWidth);return{text:o,fillStyle:c,strokeStyle:h,lineWidth:g,hidden:isNaN(i.data[r])||n.data[r].hidden,index:r}})):[]}},onClick:function(e,t){var a,o,r,n=t.index,i=this.chart;for(a=0,o=(i.data.datasets||[]).length;a<o;++a)r=i.getDatasetMeta(a),r.data[n].hidden=!r.data[n].hidden;i.update()}},tooltips:{callbacks:{title:function(){return""},label:function(e,t){return t.labels[e.index]+": "+e.yLabel}}}},e.controllers.polarArea=e.DatasetController.extend({dataElementType:e.elements.Arc,linkScales:t.noop,update:function(e){var a=this,o=a.chart,r=o.chartArea,n=a.getMeta(),i=o.options,d=i.elements.arc,l=Math.min(r.right-r.left,r.bottom-r.top);o.outerRadius=Math.max((l-d.borderWidth/2)/2,0),o.innerRadius=Math.max(i.cutoutPercentage?o.outerRadius/100*i.cutoutPercentage:1,0),o.radiusLength=(o.outerRadius-o.innerRadius)/o.getVisibleDatasetCount(),a.outerRadius=o.outerRadius-o.radiusLength*a.index,a.innerRadius=a.outerRadius-o.radiusLength,n.count=a.countVisibleElements(),t.each(n.data,(function(t,o){a.updateElement(t,o,e)}))},updateElement:function(e,a,o){for(var r=this,n=r.chart,i=r.getDataset(),d=n.options,l=d.animation,s=n.scale,u=t.getValueAtIndexOrDefault,c=n.data.labels,h=r.calculateCircumference(i.data[a]),g=s.xCenter,b=s.yCenter,p=0,f=r.getMeta(),x=0;x<a;++x)isNaN(i.data[x])||f.data[x].hidden||++p;var m=d.startAngle,v=e.hidden?0:s.getDistanceFromCenterForValue(i.data[a]),C=m+h*p,y=C+(e.hidden?0:h),I=l.animateScale?0:s.getDistanceFromCenterForValue(i.data[a]);t.extend(e,{_datasetIndex:r.index,_index:a,_scale:s,_model:{x:g,y:b,innerRadius:0,outerRadius:o?I:v,startAngle:o&&l.animateRotate?m:C,endAngle:o&&l.animateRotate?m:y,label:u(c,a,c[a])}}),r.removeHoverStyle(e),e.pivot()},removeHoverStyle:function(t){e.DatasetController.prototype.removeHoverStyle.call(this,t,this.chart.options.elements.arc)},countVisibleElements:function(){var e=this.getDataset(),a=this.getMeta(),o=0;return t.each(a.data,(function(t,a){isNaN(e.data[a])||t.hidden||o++})),o},calculateCircumference:function(e){var t=this.getMeta().count;return t>0&&!isNaN(e)?2*Math.PI/t:0}})}},"11e3":function(e,t,a){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(){return""},label:function(e,t){var a=t.datasets[e.datasetIndex].label||"",o=t.datasets[e.datasetIndex].data[e.index];return a+": ("+e.xLabel+", "+e.yLabel+", "+o.r+")"}}}},e.controllers.bubble=e.DatasetController.extend({dataElementType:e.elements.Point,update:function(e){var a=this,o=a.getMeta(),r=o.data;t.each(r,(function(t,o){a.updateElement(t,o,e)}))},updateElement:function(a,o,r){var n=this,i=n.getMeta(),d=n.getScaleForId(i.xAxisID),l=n.getScaleForId(i.yAxisID),s=a.custom||{},u=n.getDataset(),c=u.data[o],h=n.chart.options.elements.point,g=n.index;t.extend(a,{_xScale:d,_yScale:l,_datasetIndex:g,_index:o,_model:{x:r?d.getPixelForDecimal(.5):d.getPixelForValue("object"===typeof c?c:NaN,o,g,n.chart.isCombo),y:r?l.getBasePixel():l.getPixelForValue(c,o,g),radius:r?0:s.radius?s.radius:n.getRadius(c),hitRadius:s.hitRadius?s.hitRadius:t.getValueAtIndexOrDefault(u.hitRadius,o,h.hitRadius)}}),e.DatasetController.prototype.removeHoverStyle.call(n,a,h);var b=a._model;b.skip=s.skip?s.skip:isNaN(b.x)||isNaN(b.y),a.pivot()},getRadius:function(e){return e.r||this.chart.options.elements.point.radius},setHoverStyle:function(a){var o=this;e.DatasetController.prototype.setHoverStyle.call(o,a);var r=o.chart.data.datasets[a._datasetIndex],n=a._index,i=a.custom||{},d=a._model;d.radius=i.hoverRadius?i.hoverRadius:t.getValueAtIndexOrDefault(r.hoverRadius,n,o.chart.options.elements.point.hoverRadius)+o.getRadius(r.data[n])},removeHoverStyle:function(t){var a=this;e.DatasetController.prototype.removeHoverStyle.call(a,t,a.chart.options.elements.point);var o=a.chart.data.datasets[t._datasetIndex].data[t._index],r=t.custom||{},n=t._model;n.radius=r.radius?r.radius:a.getRadius(o)}})}},"160a":function(e,t,a){"use strict";e.exports=function(e){var t={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{callbacks:{title:function(){return""},label:function(e){return"("+e.xLabel+", "+e.yLabel+")"}}}};e.defaults.scatter=t,e.controllers.scatter=e.controllers.line,e.Scatter=function(t,a){return a.type="scatter",new e(t,a)}}},2261:function(e,t,a){"use strict";e.exports=function(e){e.Doughnut=function(t,a){return a.type="doughnut",new e(t,a)}}},"470b":function(e,t,a){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},e.controllers.bar=e.DatasetController.extend({dataElementType:e.elements.Rectangle,initialize:function(){var t,a=this;e.DatasetController.prototype.initialize.apply(a,arguments),t=a.getMeta(),t.stack=a.getDataset().stack,t.bar=!0},update:function(e){var t,a,o=this,r=o.getMeta().data;for(o._ruler=o.getRuler(),t=0,a=r.length;t<a;++t)o.updateElement(r[t],t,e)},updateElement:function(e,a,o){var r=this,n=r.chart,i=r.getMeta(),d=r.getDataset(),l=e.custom||{},s=n.options.elements.rectangle;e._xScale=r.getScaleForId(i.xAxisID),e._yScale=r.getScaleForId(i.yAxisID),e._datasetIndex=r.index,e._index=a,e._model={datasetLabel:d.label,label:n.data.labels[a],borderSkipped:l.borderSkipped?l.borderSkipped:s.borderSkipped,backgroundColor:l.backgroundColor?l.backgroundColor:t.getValueAtIndexOrDefault(d.backgroundColor,a,s.backgroundColor),borderColor:l.borderColor?l.borderColor:t.getValueAtIndexOrDefault(d.borderColor,a,s.borderColor),borderWidth:l.borderWidth?l.borderWidth:t.getValueAtIndexOrDefault(d.borderWidth,a,s.borderWidth)},r.updateElementGeometry(e,a,o),e.pivot()},updateElementGeometry:function(e,t,a){var o=this,r=e._model,n=o.getValueScale(),i=n.getBasePixel(),d=n.isHorizontal(),l=o._ruler||o.getRuler(),s=o.calculateBarValuePixels(o.index,t),u=o.calculateBarIndexPixels(o.index,t,l);r.horizontal=d,r.base=a?i:s.base,r.x=d?a?i:s.head:u.center,r.y=d?u.center:a?i:s.head,r.height=d?u.size:void 0,r.width=d?void 0:u.size},getValueScaleId:function(){return this.getMeta().yAxisID},getIndexScaleId:function(){return this.getMeta().xAxisID},getValueScale:function(){return this.getScaleForId(this.getValueScaleId())},getIndexScale:function(){return this.getScaleForId(this.getIndexScaleId())},getStackCount:function(e){var t,a,o=this,r=o.chart,n=o.getIndexScale(),i=n.options.stacked,d=void 0===e?r.data.datasets.length:e+1,l=[];for(t=0;t<d;++t)a=r.getDatasetMeta(t),a.bar&&r.isDatasetVisible(t)&&(!1===i||!0===i&&-1===l.indexOf(a.stack)||void 0===i&&(void 0===a.stack||-1===l.indexOf(a.stack)))&&l.push(a.stack);return l.length},getStackIndex:function(e){return this.getStackCount(e)-1},getRuler:function(){var e=this,a=e.getIndexScale(),o=a.options,r=e.getStackCount(),n=a.isHorizontal()?a.width:a.height,i=n/a.ticks.length,d=i*o.categoryPercentage,l=d/r,s=l*o.barPercentage;return s=Math.min(t.getValueOrDefault(o.barThickness,s),t.getValueOrDefault(o.maxBarThickness,1/0)),{stackCount:r,tickSize:i,categorySize:d,categorySpacing:i-d,fullBarSize:l,barSize:s,barSpacing:l-s,scale:a}},calculateBarValuePixels:function(e,t){var a,o,r,n,i,d,l=this,s=l.chart,u=l.getMeta(),c=l.getValueScale(),h=s.data.datasets,g=Number(h[e].data[t]),b=c.options.stacked,p=u.stack,f=0;if(b||void 0===b&&void 0!==p)for(a=0;a<e;++a)o=s.getDatasetMeta(a),o.bar&&o.stack===p&&o.controller.getValueScaleId()===c.id&&s.isDatasetVisible(a)&&(r=Number(h[a].data[t]),(g<0&&r<0||g>=0&&r>0)&&(f+=r));return n=c.getPixelForValue(f),i=c.getPixelForValue(f+g),d=(i-n)/2,{size:d,base:n,head:i,center:i+d/2}},calculateBarIndexPixels:function(e,t,a){var o=this,r=a.scale,n=o.chart.isCombo,i=o.getStackIndex(e),d=r.getPixelForValue(null,t,e,n),l=a.barSize;return d-=n?a.tickSize/2:0,d+=a.fullBarSize*i,d+=a.categorySpacing/2,d+=a.barSpacing/2,{size:l,base:d,head:d+l,center:d+l/2}},draw:function(){var e,a=this,o=a.chart,r=a.getMeta().data,n=a.getDataset(),i=r.length,d=0;for(t.canvas.clipArea(o.ctx,o.chartArea);d<i;++d)e=n.data[d],null===e||void 0===e||isNaN(e)||r[d].draw();t.canvas.unclipArea(o.ctx)},setHoverStyle:function(e){var a=this.chart.data.datasets[e._datasetIndex],o=e._index,r=e.custom||{},n=e._model;n.backgroundColor=r.hoverBackgroundColor?r.hoverBackgroundColor:t.getValueAtIndexOrDefault(a.hoverBackgroundColor,o,t.getHoverColor(n.backgroundColor)),n.borderColor=r.hoverBorderColor?r.hoverBorderColor:t.getValueAtIndexOrDefault(a.hoverBorderColor,o,t.getHoverColor(n.borderColor)),n.borderWidth=r.hoverBorderWidth?r.hoverBorderWidth:t.getValueAtIndexOrDefault(a.hoverBorderWidth,o,n.borderWidth)},removeHoverStyle:function(e){var a=this.chart.data.datasets[e._datasetIndex],o=e._index,r=e.custom||{},n=e._model,i=this.chart.options.elements.rectangle;n.backgroundColor=r.backgroundColor?r.backgroundColor:t.getValueAtIndexOrDefault(a.backgroundColor,o,i.backgroundColor),n.borderColor=r.borderColor?r.borderColor:t.getValueAtIndexOrDefault(a.borderColor,o,i.borderColor),n.borderWidth=r.borderWidth?r.borderWidth:t.getValueAtIndexOrDefault(a.borderWidth,o,i.borderWidth)}}),e.defaults.horizontalBar={hover:{mode:"label"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{callbacks:{title:function(e,t){var a="";return e.length>0&&(e[0].yLabel?a=e[0].yLabel:t.labels.length>0&&e[0].index<t.labels.length&&(a=t.labels[e[0].index])),a},label:function(e,t){var a=t.datasets[e.datasetIndex].label||"";return a+": "+e.xLabel}}}},e.controllers.horizontalBar=e.controllers.bar.extend({getValueScaleId:function(){return this.getMeta().xAxisID},getIndexScaleId:function(){return this.getMeta().yAxisID}})}},"58ca":function(e,t,a){"use strict";e.exports=function(e){e.Radar=function(t,a){return a.type="radar",new e(t,a)}}},"5c86":function(e,t,a){var o=a("aa15")();a("aae3")(o),a("28be")(o),a("3f3c")(o),a("1d3f")(o),a("59b2")(o),a("684a")(o),a("c93e")(o),a("7748")(o),a("4be2")(o),a("1422")(o),a("2c37")(o),a("fbc4")(o),a("6dbd")(o),a("8aeb")(o),a("7ac9")(o),a("67a4")(o),a("70ab")(o),a("a747")(o),a("3aae")(o),a("fd0f")(o),a("4bfa")(o),a("75a3")(o),a("c08a")(o),a("8fd1")(o),a("470b")(o),a("11e3")(o),a("b151")(o),a("ad3a")(o),a("098c")(o),a("f0f6")(o),a("cd31")(o),a("f3ae")(o),a("2261")(o),a("a4a1")(o),a("e7eb")(o),a("58ca")(o),a("160a")(o);var r=[];r.push(a("edd3")(o),a("314f")(o),a("a537")(o)),o.plugins.register(r),e.exports=o,"undefined"!==typeof window&&(window.Chart=o)},a4a1:function(e,t,a){"use strict";e.exports=function(e){e.Line=function(t,a){return a.type="line",new e(t,a)}}},ad3a:function(e,t,a){"use strict";e.exports=function(e){var t=e.helpers;function a(e,a){return t.getValueOrDefault(e.showLine,a.showLines)}e.defaults.line={showLines:!0,spanGaps:!1,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},e.controllers.line=e.DatasetController.extend({datasetElementType:e.elements.Line,dataElementType:e.elements.Point,update:function(e){var o,r,n,i=this,d=i.getMeta(),l=d.dataset,s=d.data||[],u=i.chart.options,c=u.elements.line,h=i.getScaleForId(d.yAxisID),g=i.getDataset(),b=a(g,u);for(b&&(n=l.custom||{},void 0!==g.tension&&void 0===g.lineTension&&(g.lineTension=g.tension),l._scale=h,l._datasetIndex=i.index,l._children=s,l._model={spanGaps:g.spanGaps?g.spanGaps:u.spanGaps,tension:n.tension?n.tension:t.getValueOrDefault(g.lineTension,c.tension),backgroundColor:n.backgroundColor?n.backgroundColor:g.backgroundColor||c.backgroundColor,borderWidth:n.borderWidth?n.borderWidth:g.borderWidth||c.borderWidth,borderColor:n.borderColor?n.borderColor:g.borderColor||c.borderColor,borderCapStyle:n.borderCapStyle?n.borderCapStyle:g.borderCapStyle||c.borderCapStyle,borderDash:n.borderDash?n.borderDash:g.borderDash||c.borderDash,borderDashOffset:n.borderDashOffset?n.borderDashOffset:g.borderDashOffset||c.borderDashOffset,borderJoinStyle:n.borderJoinStyle?n.borderJoinStyle:g.borderJoinStyle||c.borderJoinStyle,fill:n.fill?n.fill:void 0!==g.fill?g.fill:c.fill,steppedLine:n.steppedLine?n.steppedLine:t.getValueOrDefault(g.steppedLine,c.stepped),cubicInterpolationMode:n.cubicInterpolationMode?n.cubicInterpolationMode:t.getValueOrDefault(g.cubicInterpolationMode,c.cubicInterpolationMode)},l.pivot()),o=0,r=s.length;o<r;++o)i.updateElement(s[o],o,e);for(b&&0!==l._model.tension&&i.updateBezierControlPoints(),o=0,r=s.length;o<r;++o)s[o].pivot()},getPointBackgroundColor:function(e,a){var o=this.chart.options.elements.point.backgroundColor,r=this.getDataset(),n=e.custom||{};return n.backgroundColor?o=n.backgroundColor:r.pointBackgroundColor?o=t.getValueAtIndexOrDefault(r.pointBackgroundColor,a,o):r.backgroundColor&&(o=r.backgroundColor),o},getPointBorderColor:function(e,a){var o=this.chart.options.elements.point.borderColor,r=this.getDataset(),n=e.custom||{};return n.borderColor?o=n.borderColor:r.pointBorderColor?o=t.getValueAtIndexOrDefault(r.pointBorderColor,a,o):r.borderColor&&(o=r.borderColor),o},getPointBorderWidth:function(e,a){var o=this.chart.options.elements.point.borderWidth,r=this.getDataset(),n=e.custom||{};return isNaN(n.borderWidth)?isNaN(r.pointBorderWidth)?isNaN(r.borderWidth)||(o=r.borderWidth):o=t.getValueAtIndexOrDefault(r.pointBorderWidth,a,o):o=n.borderWidth,o},updateElement:function(e,a,o){var r,n,i=this,d=i.getMeta(),l=e.custom||{},s=i.getDataset(),u=i.index,c=s.data[a],h=i.getScaleForId(d.yAxisID),g=i.getScaleForId(d.xAxisID),b=i.chart.options.elements.point,p=i.chart.data.labels||[],f=1===p.length||1===s.data.length||i.chart.isCombo;void 0!==s.radius&&void 0===s.pointRadius&&(s.pointRadius=s.radius),void 0!==s.hitRadius&&void 0===s.pointHitRadius&&(s.pointHitRadius=s.hitRadius),r=g.getPixelForValue("object"===typeof c?c:NaN,a,u,f),n=o?h.getBasePixel():i.calculatePointY(c,a,u),e._xScale=g,e._yScale=h,e._datasetIndex=u,e._index=a,e._model={x:r,y:n,skip:l.skip||isNaN(r)||isNaN(n),radius:l.radius||t.getValueAtIndexOrDefault(s.pointRadius,a,b.radius),pointStyle:l.pointStyle||t.getValueAtIndexOrDefault(s.pointStyle,a,b.pointStyle),backgroundColor:i.getPointBackgroundColor(e,a),borderColor:i.getPointBorderColor(e,a),borderWidth:i.getPointBorderWidth(e,a),tension:d.dataset._model?d.dataset._model.tension:0,steppedLine:!!d.dataset._model&&d.dataset._model.steppedLine,hitRadius:l.hitRadius||t.getValueAtIndexOrDefault(s.pointHitRadius,a,b.hitRadius)}},calculatePointY:function(e,t,a){var o,r,n,i=this,d=i.chart,l=i.getMeta(),s=i.getScaleForId(l.yAxisID),u=0,c=0;if(s.options.stacked){for(o=0;o<a;o++)if(r=d.data.datasets[o],n=d.getDatasetMeta(o),"line"===n.type&&n.yAxisID===s.id&&d.isDatasetVisible(o)){var h=Number(s.getRightValue(r.data[t]));h<0?c+=h||0:u+=h||0}var g=Number(s.getRightValue(e));return g<0?s.getPixelForValue(c+g):s.getPixelForValue(u+g)}return s.getPixelForValue(e)},updateBezierControlPoints:function(){var e,a,o,r,n,i=this,d=i.getMeta(),l=i.chart.chartArea,s=d.data||[];function u(e,t,a){return Math.max(Math.min(e,a),t)}if(d.dataset._model.spanGaps&&(s=s.filter((function(e){return!e._model.skip}))),"monotone"===d.dataset._model.cubicInterpolationMode)t.splineCurveMonotone(s);else for(e=0,a=s.length;e<a;++e)o=s[e],r=o._model,n=t.splineCurve(t.previousItem(s,e)._model,r,t.nextItem(s,e)._model,d.dataset._model.tension),r.controlPointPreviousX=n.previous.x,r.controlPointPreviousY=n.previous.y,r.controlPointNextX=n.next.x,r.controlPointNextY=n.next.y;if(i.chart.options.elements.line.capBezierPoints)for(e=0,a=s.length;e<a;++e)r=s[e]._model,r.controlPointPreviousX=u(r.controlPointPreviousX,l.left,l.right),r.controlPointPreviousY=u(r.controlPointPreviousY,l.top,l.bottom),r.controlPointNextX=u(r.controlPointNextX,l.left,l.right),r.controlPointNextY=u(r.controlPointNextY,l.top,l.bottom)},draw:function(){var t=this,o=t.chart,r=t.getMeta(),n=r.data||[],i=o.chartArea,d=n.length,l=0;for(e.canvasHelpers.clipArea(o.ctx,i),a(t.getDataset(),o.options)&&r.dataset.draw(),e.canvasHelpers.unclipArea(o.ctx);l<d;++l)n[l].draw(i)},setHoverStyle:function(e){var a=this.chart.data.datasets[e._datasetIndex],o=e._index,r=e.custom||{},n=e._model;n.radius=r.hoverRadius||t.getValueAtIndexOrDefault(a.pointHoverRadius,o,this.chart.options.elements.point.hoverRadius),n.backgroundColor=r.hoverBackgroundColor||t.getValueAtIndexOrDefault(a.pointHoverBackgroundColor,o,t.getHoverColor(n.backgroundColor)),n.borderColor=r.hoverBorderColor||t.getValueAtIndexOrDefault(a.pointHoverBorderColor,o,t.getHoverColor(n.borderColor)),n.borderWidth=r.hoverBorderWidth||t.getValueAtIndexOrDefault(a.pointHoverBorderWidth,o,n.borderWidth)},removeHoverStyle:function(e){var a=this,o=a.chart.data.datasets[e._datasetIndex],r=e._index,n=e.custom||{},i=e._model;void 0!==o.radius&&void 0===o.pointRadius&&(o.pointRadius=o.radius),i.radius=n.radius||t.getValueAtIndexOrDefault(o.pointRadius,r,a.chart.options.elements.point.radius),i.backgroundColor=a.getPointBackgroundColor(e,r),i.borderColor=a.getPointBorderColor(e,r),i.borderWidth=a.getPointBorderWidth(e,r)}})}},b151:function(e,t,a){"use strict";e.exports=function(e){var t=e.helpers,a=e.defaults;a.doughnut={animation:{animateRotate:!0,animateScale:!1},aspectRatio:1,hover:{mode:"single"},legendCallback:function(e){var t=[];t.push('<ul class="'+e.id+'-legend">');var a=e.data,o=a.datasets,r=a.labels;if(o.length)for(var n=0;n<o[0].data.length;++n)t.push('<li><span style="background-color:'+o[0].backgroundColor[n]+'"></span>'),r[n]&&t.push(r[n]),t.push("</li>");return t.push("</ul>"),t.join("")},legend:{labels:{generateLabels:function(e){var a=e.data;return a.labels.length&&a.datasets.length?a.labels.map((function(o,r){var n=e.getDatasetMeta(0),i=a.datasets[0],d=n.data[r],l=d&&d.custom||{},s=t.getValueAtIndexOrDefault,u=e.options.elements.arc,c=l.backgroundColor?l.backgroundColor:s(i.backgroundColor,r,u.backgroundColor),h=l.borderColor?l.borderColor:s(i.borderColor,r,u.borderColor),g=l.borderWidth?l.borderWidth:s(i.borderWidth,r,u.borderWidth);return{text:o,fillStyle:c,strokeStyle:h,lineWidth:g,hidden:isNaN(i.data[r])||n.data[r].hidden,index:r}})):[]}},onClick:function(e,t){var a,o,r,n=t.index,i=this.chart;for(a=0,o=(i.data.datasets||[]).length;a<o;++a)r=i.getDatasetMeta(a),r.data[n]&&(r.data[n].hidden=!r.data[n].hidden);i.update()}},cutoutPercentage:50,rotation:-.5*Math.PI,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(e,a){var o=a.labels[e.index],r=": "+a.datasets[e.datasetIndex].data[e.index];return t.isArray(o)?(o=o.slice(),o[0]+=r):o+=r,o}}}},a.pie=t.clone(a.doughnut),t.extend(a.pie,{cutoutPercentage:0}),e.controllers.doughnut=e.controllers.pie=e.DatasetController.extend({dataElementType:e.elements.Arc,linkScales:t.noop,getRingIndex:function(e){for(var t=0,a=0;a<e;++a)this.chart.isDatasetVisible(a)&&++t;return t},update:function(e){var a=this,o=a.chart,r=o.chartArea,n=o.options,i=n.elements.arc,d=r.right-r.left-i.borderWidth,l=r.bottom-r.top-i.borderWidth,s=Math.min(d,l),u={x:0,y:0},c=a.getMeta(),h=n.cutoutPercentage,g=n.circumference;if(g<2*Math.PI){var b=n.rotation%(2*Math.PI);b+=2*Math.PI*(b>=Math.PI?-1:b<-Math.PI?1:0);var p=b+g,f={x:Math.cos(b),y:Math.sin(b)},x={x:Math.cos(p),y:Math.sin(p)},m=b<=0&&0<=p||b<=2*Math.PI&&2*Math.PI<=p,v=b<=.5*Math.PI&&.5*Math.PI<=p||b<=2.5*Math.PI&&2.5*Math.PI<=p,C=b<=-Math.PI&&-Math.PI<=p||b<=Math.PI&&Math.PI<=p,y=b<=.5*-Math.PI&&.5*-Math.PI<=p||b<=1.5*Math.PI&&1.5*Math.PI<=p,I=h/100,D={x:C?-1:Math.min(f.x*(f.x<0?1:I),x.x*(x.x<0?1:I)),y:y?-1:Math.min(f.y*(f.y<0?1:I),x.y*(x.y<0?1:I))},k={x:m?1:Math.max(f.x*(f.x>0?1:I),x.x*(x.x>0?1:I)),y:v?1:Math.max(f.y*(f.y>0?1:I),x.y*(x.y>0?1:I))},S={width:.5*(k.x-D.x),height:.5*(k.y-D.y)};s=Math.min(d/S.width,l/S.height),u={x:-.5*(k.x+D.x),y:-.5*(k.y+D.y)}}o.borderWidth=a.getMaxBorderWidth(c.data),o.outerRadius=Math.max((s-o.borderWidth)/2,0),o.innerRadius=Math.max(h?o.outerRadius/100*h:0,0),o.radiusLength=(o.outerRadius-o.innerRadius)/o.getVisibleDatasetCount(),o.offsetX=u.x*o.outerRadius,o.offsetY=u.y*o.outerRadius,c.total=a.calculateTotal(),a.outerRadius=o.outerRadius-o.radiusLength*a.getRingIndex(a.index),a.innerRadius=Math.max(a.outerRadius-o.radiusLength,0),t.each(c.data,(function(t,o){a.updateElement(t,o,e)}))},updateElement:function(e,a,o){var r=this,n=r.chart,i=n.chartArea,d=n.options,l=d.animation,s=(i.left+i.right)/2,u=(i.top+i.bottom)/2,c=d.rotation,h=d.rotation,g=r.getDataset(),b=o&&l.animateRotate||e.hidden?0:r.calculateCircumference(g.data[a])*(d.circumference/(2*Math.PI)),p=o&&l.animateScale?0:r.innerRadius,f=o&&l.animateScale?0:r.outerRadius,x=t.getValueAtIndexOrDefault;t.extend(e,{_datasetIndex:r.index,_index:a,_model:{x:s+n.offsetX,y:u+n.offsetY,startAngle:c,endAngle:h,circumference:b,outerRadius:f,innerRadius:p,label:x(g.label,a,n.data.labels[a])}});var m=e._model;this.removeHoverStyle(e),o&&l.animateRotate||(m.startAngle=0===a?d.rotation:r.getMeta().data[a-1]._model.endAngle,m.endAngle=m.startAngle+m.circumference),e.pivot()},removeHoverStyle:function(t){e.DatasetController.prototype.removeHoverStyle.call(this,t,this.chart.options.elements.arc)},calculateTotal:function(){var e,a=this.getDataset(),o=this.getMeta(),r=0;return t.each(o.data,(function(t,o){e=a.data[o],isNaN(e)||t.hidden||(r+=Math.abs(e))})),r},calculateCircumference:function(e){var t=this.getMeta().total;return t>0&&!isNaN(e)?2*Math.PI*(e/t):0},getMaxBorderWidth:function(e){for(var t,a,o=0,r=this.index,n=e.length,i=0;i<n;i++)t=e[i]._model?e[i]._model.borderWidth:0,a=e[i]._chart?e[i]._chart.config.data.datasets[r].hoverBorderWidth:0,o=t>o?t:o,o=a>o?a:o;return o}})}},cd31:function(e,t,a){"use strict";e.exports=function(e){e.Bar=function(t,a){return a.type="bar",new e(t,a)}}},e7eb:function(e,t,a){"use strict";e.exports=function(e){e.PolarArea=function(t,a){return a.type="polarArea",new e(t,a)}}},f0f6:function(e,t,a){"use strict";e.exports=function(e){var t=e.helpers;e.defaults.radar={aspectRatio:1,scale:{type:"radialLinear"},elements:{line:{tension:0}}},e.controllers.radar=e.DatasetController.extend({datasetElementType:e.elements.Line,dataElementType:e.elements.Point,linkScales:t.noop,update:function(e){var a=this,o=a.getMeta(),r=o.dataset,n=o.data,i=r.custom||{},d=a.getDataset(),l=a.chart.options.elements.line,s=a.chart.scale;void 0!==d.tension&&void 0===d.lineTension&&(d.lineTension=d.tension),t.extend(o.dataset,{_datasetIndex:a.index,_scale:s,_children:n,_loop:!0,_model:{tension:i.tension?i.tension:t.getValueOrDefault(d.lineTension,l.tension),backgroundColor:i.backgroundColor?i.backgroundColor:d.backgroundColor||l.backgroundColor,borderWidth:i.borderWidth?i.borderWidth:d.borderWidth||l.borderWidth,borderColor:i.borderColor?i.borderColor:d.borderColor||l.borderColor,fill:i.fill?i.fill:void 0!==d.fill?d.fill:l.fill,borderCapStyle:i.borderCapStyle?i.borderCapStyle:d.borderCapStyle||l.borderCapStyle,borderDash:i.borderDash?i.borderDash:d.borderDash||l.borderDash,borderDashOffset:i.borderDashOffset?i.borderDashOffset:d.borderDashOffset||l.borderDashOffset,borderJoinStyle:i.borderJoinStyle?i.borderJoinStyle:d.borderJoinStyle||l.borderJoinStyle}}),o.dataset.pivot(),t.each(n,(function(t,o){a.updateElement(t,o,e)}),a),a.updateBezierControlPoints()},updateElement:function(e,a,o){var r=this,n=e.custom||{},i=r.getDataset(),d=r.chart.scale,l=r.chart.options.elements.point,s=d.getPointPositionForValue(a,i.data[a]);void 0!==i.radius&&void 0===i.pointRadius&&(i.pointRadius=i.radius),void 0!==i.hitRadius&&void 0===i.pointHitRadius&&(i.pointHitRadius=i.hitRadius),t.extend(e,{_datasetIndex:r.index,_index:a,_scale:d,_model:{x:o?d.xCenter:s.x,y:o?d.yCenter:s.y,tension:n.tension?n.tension:t.getValueOrDefault(i.lineTension,r.chart.options.elements.line.tension),radius:n.radius?n.radius:t.getValueAtIndexOrDefault(i.pointRadius,a,l.radius),backgroundColor:n.backgroundColor?n.backgroundColor:t.getValueAtIndexOrDefault(i.pointBackgroundColor,a,l.backgroundColor),borderColor:n.borderColor?n.borderColor:t.getValueAtIndexOrDefault(i.pointBorderColor,a,l.borderColor),borderWidth:n.borderWidth?n.borderWidth:t.getValueAtIndexOrDefault(i.pointBorderWidth,a,l.borderWidth),pointStyle:n.pointStyle?n.pointStyle:t.getValueAtIndexOrDefault(i.pointStyle,a,l.pointStyle),hitRadius:n.hitRadius?n.hitRadius:t.getValueAtIndexOrDefault(i.pointHitRadius,a,l.hitRadius)}}),e._model.skip=n.skip?n.skip:isNaN(e._model.x)||isNaN(e._model.y)},updateBezierControlPoints:function(){var e=this.chart.chartArea,a=this.getMeta();t.each(a.data,(function(o,r){var n=o._model,i=t.splineCurve(t.previousItem(a.data,r,!0)._model,n,t.nextItem(a.data,r,!0)._model,n.tension);n.controlPointPreviousX=Math.max(Math.min(i.previous.x,e.right),e.left),n.controlPointPreviousY=Math.max(Math.min(i.previous.y,e.bottom),e.top),n.controlPointNextX=Math.max(Math.min(i.next.x,e.right),e.left),n.controlPointNextY=Math.max(Math.min(i.next.y,e.bottom),e.top),o.pivot()}))},setHoverStyle:function(e){var a=this.chart.data.datasets[e._datasetIndex],o=e.custom||{},r=e._index,n=e._model;n.radius=o.hoverRadius?o.hoverRadius:t.getValueAtIndexOrDefault(a.pointHoverRadius,r,this.chart.options.elements.point.hoverRadius),n.backgroundColor=o.hoverBackgroundColor?o.hoverBackgroundColor:t.getValueAtIndexOrDefault(a.pointHoverBackgroundColor,r,t.getHoverColor(n.backgroundColor)),n.borderColor=o.hoverBorderColor?o.hoverBorderColor:t.getValueAtIndexOrDefault(a.pointHoverBorderColor,r,t.getHoverColor(n.borderColor)),n.borderWidth=o.hoverBorderWidth?o.hoverBorderWidth:t.getValueAtIndexOrDefault(a.pointHoverBorderWidth,r,n.borderWidth)},removeHoverStyle:function(e){var a=this.chart.data.datasets[e._datasetIndex],o=e.custom||{},r=e._index,n=e._model,i=this.chart.options.elements.point;n.radius=o.radius?o.radius:t.getValueAtIndexOrDefault(a.pointRadius,r,i.radius),n.backgroundColor=o.backgroundColor?o.backgroundColor:t.getValueAtIndexOrDefault(a.pointBackgroundColor,r,i.backgroundColor),n.borderColor=o.borderColor?o.borderColor:t.getValueAtIndexOrDefault(a.pointBorderColor,r,i.borderColor),n.borderWidth=o.borderWidth?o.borderWidth:t.getValueAtIndexOrDefault(a.pointBorderWidth,r,i.borderWidth)}})}},f3ae:function(e,t,a){"use strict";e.exports=function(e){e.Bubble=function(t,a){return a.type="bubble",new e(t,a)}}}}]);