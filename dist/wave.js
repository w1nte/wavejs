var wave=function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){this.defaultConfig=t,this.userConfig=e,this.config=this.extend({},t,e)}return t.prototype.getConfig=function(){return this.config},t.prototype.get=function(t,e){var n=this.config[t];return n||(e||!1)},t.prototype.extend=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];for(var i=1;i<e.length;i++)for(var r in e[i])e[i].hasOwnProperty(r)&&(t.is_dictionary(e[i][r])?e[0][r]=this.extend(e[0][r],e[i][r]):e[0][r]=e[i][r]);return e[0]},t.is_dictionary=function(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date)},t}();e.Config=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(4),o=n(0);e.DEBUG=!1;var s=function(){function t(e,n){this.waves=Array(),this.renderer=new i.Renderer(e),this.renderer.start(),this.config=new o.Config(t.defaultConfig,n),this.setup(),this.addEventListeners()}return t.prototype.setup=function(){this.renderer.flushRenderObjects();var t=this.config.get("waves");if(t)for(var e=0,n=t;e<n.length;e++){var i=n[e],o=new r.Controller(this.renderer,i);this.waves.push(o),this.renderer.addRenderObject(o)}},t.prototype.addEventListeners=function(){var t=this;window.addEventListener("resize",function(){t.renderer.updateCanvasSize(),t.setup()})},t.defaultConfig={},t}();e.wave=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ease=function(t,e,n,i){return(t/=i/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(2),h=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.render=function(t,e){o.DEBUG&&(e.beginPath(),e.arc(this.x,this.y,3,0,2*Math.PI,!1),e.fillStyle="red",e.fill())},t.prototype.update=function(t,e){},t}();e.Point=h;var a=function(t){function e(e,n){var i=t.call(this,e,n)||this;return i.initial_y=n,i.drift=Math.round(10*Math.random())+40,i.tk=Math.round(100*Math.random()),i}return r(e,t),e.prototype.update=function(t,e){this.tk+=1;var n=0;n=this.tk<=100?s.ease(this.tk,0,1,100):1-s.ease(this.tk-100,0,1,100),this.y=this.initial_y+this.drift*n,this.tk>200&&(this.tk=0)},e}(h);e.PointDefault=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),r=n(0),o=function(){function t(e,n){this.points=Array(),this.renderer=e,this.config=new r.Config(t.defaultConfig,n),this.generate()}return t.prototype.render=function(t,e){e.beginPath();var n=this.points.length;e.moveTo(this.points[0].x,this.points[0].y);for(var i=0;i<n-1;i++){var r=(this.points[i].x+this.points[i+1].x)/2,o=(this.points[i].y+this.points[i+1].y)/2;e.quadraticCurveTo(this.points[i].x,this.points[i].y,r,o)}this.logic(t,e),e.lineTo(this.points[n-1].x,this.points[n-1].y);var s=t.height+2*this.config.get("strokeWidth",1);this.config.get("upsidedown")&&(s=2*-this.config.get("strokeWidth",1)),e.lineTo(this.points[n-1].x,s),e.lineTo(this.points[0].x,s),e.closePath(),this.config.get("backgroundColor")&&(e.fillStyle=this.config.get("backgroundColor"),e.fill()),this.config.get("strokeColor")&&(e.strokeStyle=this.config.get("strokeColor"),this.config.get("strokeWidth")&&(e.lineWidth=this.config.get("strokeWidth")),e.stroke());for(var h=0,a=this.points;h<a.length;h++){a[h].render(t,e)}},t.prototype.logic=function(t,e){for(var n=this.config.get("speed",0),i=0,r=this.points;i<r.length;i++){var o=r[i];o.update(t,e),o.x+=n}var s=this.points[this.points.length-1],h=this.points[0];n>0?this.points[this.points.length-2].x>t.width+this.config.get("distance")&&(s.x=Math.round(2*-this.config.get("distance")+this.threshold),this.points.unshift(this.points.pop())):n<0&&this.points[1].x<-this.config.get("distance")&&(h.x=Math.round(t.width+2*this.config.get("distance")-this.threshold),this.points.push(this.points.shift()))},t.prototype.generate=function(){var t=Math.floor(this.renderer.canvas.width/this.config.get("distance"));this.threshold=this.renderer.canvas.width-t*this.config.get("distance");for(var e=-2;e<t+2;e++){var n=new i.PointDefault(this.config.get("distance")*e,this.renderer.canvas.height/2);n.drift=this.config.get("drift",10),this.points.push(n)}},t.defaultConfig={speed:0,distance:500,type:"default",drift:10,upsidedown:!1},t}();e.Controller=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){this.is_running=!1,this.renderObjects=[],this.canvas=document.getElementById(t),this.context=this.canvas.getContext("2d"),this.updateCanvasSize()}return t.prototype.updateCanvasSize=function(){this.canvas.width=this.canvas.offsetWidth,this.canvas.height=this.canvas.offsetHeight},t.prototype.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.start=function(){this.is_running=!0,this.loop()},t.prototype.stop=function(){this.is_running=!1},t.prototype.addRenderObject=function(t){this.renderObjects.push(t)},t.prototype.flushRenderObjects=function(){this.renderObjects=Array()},t.prototype.getRenderObjects=function(){return this.renderObjects},t.prototype.loop=function(){this.clear();for(var e=0,n=this.renderObjects;e<n.length;e++){n[e].render(this.canvas,this.context)}this.is_running&&t.requestAnimFrame()(this.loop.bind(this))},t.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}},t}();e.Renderer=i}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93YXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dhdmUvLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovL3dhdmUvLi9zcmMvd2F2ZS50cyIsIndlYnBhY2s6Ly93YXZlLy4vc3JjL2Vhc2luZy50cyIsIndlYnBhY2s6Ly93YXZlLy4vc3JjL3BvaW50cy50cyIsIndlYnBhY2s6Ly93YXZlLy4vc3JjL2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vd2F2ZS8uL3NyYy9yZW5kZXJlci50cyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIkNvbmZpZyIsImRlZmF1bHRDb25maWciLCJ1c2VyQ29uZmlnIiwidGhpcyIsImNvbmZpZyIsImV4dGVuZCIsImdldENvbmZpZyIsImRlZmF1bHRWYWx1ZSIsInJlc3VsdCIsImFyZ3MiLCJfaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImlzX2RpY3Rpb25hcnkiLCJ2YXJpYWJsZSIsIkFycmF5IiwiRGF0ZSIsInJlbmRlcmVyXzEiLCJjb250cm9sbGVyXzEiLCJjb25maWdfMSIsIkRFQlVHIiwid2F2ZSIsImNhbnZhc19pZCIsIndhdmVzIiwicmVuZGVyZXIiLCJSZW5kZXJlciIsInN0YXJ0Iiwic2V0dXAiLCJhZGRFdmVudExpc3RlbmVycyIsImZsdXNoUmVuZGVyT2JqZWN0cyIsIndhdmVzXzEiLCJuZXdfd2F2ZSIsIkNvbnRyb2xsZXIiLCJwdXNoIiwiYWRkUmVuZGVyT2JqZWN0IiwiX3RoaXMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwidXBkYXRlQ2FudmFzU2l6ZSIsImVhc2UiLCJiIiwid2F2ZV8xIiwiZWFzaW5nXzEiLCJQb2ludCIsIngiLCJ5IiwicmVuZGVyIiwiY2FudmFzIiwiY29udGV4dCIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImZpbGxTdHlsZSIsImZpbGwiLCJ1cGRhdGUiLCJQb2ludERlZmF1bHQiLCJfc3VwZXIiLCJpbml0aWFsX3kiLCJkcmlmdCIsInJvdW5kIiwicmFuZG9tIiwidGsiLCJfX2V4dGVuZHMiLCJlIiwicG9pbnRzXzEiLCJwb2ludHMiLCJnZW5lcmF0ZSIsInBvaW50c19jb3VudCIsIm1vdmVUbyIsInF1YWRyYXRpY0N1cnZlVG8iLCJsb2dpYyIsImxpbmVUbyIsImZoIiwiaGVpZ2h0IiwiY2xvc2VQYXRoIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJzdHJva2UiLCJfYSIsInNwZWVkIiwibGFzdF9wIiwiZmlyc3RfcCIsIndpZHRoIiwidGhyZXNob2xkIiwidW5zaGlmdCIsInBvcCIsInNoaWZ0IiwibnVtYmVyIiwiZmxvb3IiLCJwb2ludCIsImRpc3RhbmNlIiwidHlwZSIsInVwc2lkZWRvd24iLCJpc19ydW5uaW5nIiwicmVuZGVyT2JqZWN0cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJjbGVhciIsImNsZWFyUmVjdCIsImxvb3AiLCJzdG9wIiwicmVuZGVyT2JqZWN0IiwiZ2V0UmVuZGVyT2JqZWN0cyIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6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bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIlxuXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcblxuICAgIHByaXZhdGUgZGVmYXVsdENvbmZpZzogb2JqZWN0O1xuXG4gICAgcHJpdmF0ZSB1c2VyQ29uZmlnOiBvYmplY3Q7XG5cbiAgICBwcml2YXRlIGNvbmZpZzogb2JqZWN0O1xuXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdENvbmZpZzogb2JqZWN0LCB1c2VyQ29uZmlnPzogb2JqZWN0KSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IGRlZmF1bHRDb25maWc7XG4gICAgICAgIHRoaXMudXNlckNvbmZpZyA9IHVzZXJDb25maWc7XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5leHRlbmQoe30sIGRlZmF1bHRDb25maWcsIHVzZXJDb25maWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb25maWcoKTogb2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSk6IGFueSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNvbmZpZ1trZXldO1xuXG4gICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlID8gZGVmYXVsdFZhbHVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleHRlbmQoLi4uYXJnczogT2JqZWN0W10pOiBhbnkge1xuICAgICAgICBmb3IobGV0IGk9MTsgaTxhcmdzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gYXJnc1tpXSlcbiAgICAgICAgICAgICAgICBpZihhcmdzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENvbmZpZy5pc19kaWN0aW9uYXJ5KGFyZ3NbaV1ba2V5XSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzWzBdW2tleV0gPSB0aGlzLmV4dGVuZChhcmdzWzBdW2tleV0sIGFyZ3NbaV1ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbMF1ba2V5XSA9IGFyZ3NbaV1ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNfZGljdGlvbmFyeSh2YXJpYWJsZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT09ICdvYmplY3QnICYmIHZhcmlhYmxlIT09bnVsbCAmJiAhKHZhcmlhYmxlIGluc3RhbmNlb2YgQXJyYXkpICYmICEodmFyaWFibGUgaW5zdGFuY2VvZiBEYXRlKVxuICAgIH1cblxufSIsIi8qKlxuICogdzFudGUgKGMpXG4gKiA1LzI1LzIwMThcbiAqL1xuXG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tIFwiLi9yZW5kZXJlclwiO1xuaW1wb3J0IHtDb250cm9sbGVyfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmV4cG9ydCBjb25zdCBERUJVRzpib29sZWFuID0gZmFsc2U7XG5cbi8qKlxuICogQ29yZSBjbGFzc1xuICovXG5leHBvcnQgY2xhc3Mgd2F2ZSB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0Q29uZmlnOiBvYmplY3QgPSB7XG5cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXI7XG5cbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xuXG4gICAgcHJpdmF0ZSB3YXZlczogQXJyYXk8Q29udHJvbGxlcj4gPSBBcnJheSgpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNhbnZhc19pZDogc3RyaW5nLCBjb25maWc/OiBvYmplY3QpIHtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGNhbnZhc19pZCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcod2F2ZS5kZWZhdWx0Q29uZmlnLCBjb25maWcpO1xuXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldHVwKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmZsdXNoUmVuZGVyT2JqZWN0cygpO1xuXG4gICAgICAgIGxldCB3YXZlcyA9IHRoaXMuY29uZmlnLmdldCgnd2F2ZXMnKTtcblxuICAgICAgICBpZiAod2F2ZXMpXG4gICAgICAgICAgICBmb3IgKGxldCBjb25maWcgb2Ygd2F2ZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3X3dhdmUgPSBuZXcgQ29udHJvbGxlcih0aGlzLnJlbmRlcmVyLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHRoaXMud2F2ZXMucHVzaChuZXdfd2F2ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRSZW5kZXJPYmplY3QobmV3X3dhdmUpO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci51cGRhdGVDYW52YXNTaXplKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwKCk7IC8vZmx1c2ggYW5kIHJ1biBhZ2FpblxuICAgICAgICB9KVxuICAgIH1cblxufSIsIlxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZSh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0Lz1kLzIpIDwgMSkgcmV0dXJuIGMvMip0KnQgKyBiO1xuICAgIHJldHVybiAtYy8yICogKCgtLXQpKih0LTIpIC0gMSkgKyBiO1xufSIsImltcG9ydCB7REVCVUd9IGZyb20gXCIuL3dhdmVcIjtcbmltcG9ydCB7ZWFzZX0gZnJvbSBcIi4vZWFzaW5nXCI7XG5pbXBvcnQge1JlbmRlck9iamVjdEludGVyZmFjZX0gZnJvbSBcIi4vcmVuZGVyZXJcIjtcblxuXG5leHBvcnQgY2xhc3MgUG9pbnQgaW1wbGVtZW50cyBSZW5kZXJPYmplY3RJbnRlcmZhY2Uge1xuICAgIHB1YmxpYyB4OiBudW1iZXI7XG4gICAgcHVibGljIHk6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoY2FudmFzLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChERUJVRykge1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHRoaXMueCwgdGhpcy55LCAzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShjYW52YXMsIGNvbnRleHQpIHt9XG59XG5cblxuZXhwb3J0IGNsYXNzIFBvaW50RGVmYXVsdCBleHRlbmRzIFBvaW50IGltcGxlbWVudHMgUmVuZGVyT2JqZWN0SW50ZXJmYWNlIHtcbiAgICBwdWJsaWMgaW5pdGlhbF95O1xuICAgIHB1YmxpYyBkcmlmdDtcbiAgICBwdWJsaWMgdGs7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsX3kgPSB5O1xuICAgICAgICB0aGlzLmRyaWZ0ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwKSArIDQwO1xuICAgICAgICB0aGlzLnRrID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShjYW52YXMsIGNvbnRleHQpIHtcblxuICAgICAgICB0aGlzLnRrKz0xO1xuXG4gICAgICAgIGxldCBlID0gMDtcblxuICAgICAgICBpZiAodGhpcy50ayA8PSAxMDApXG4gICAgICAgICAgICBlID0gZWFzZSh0aGlzLnRrLCAwLCAxLCAxMDApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlID0gMSAtIGVhc2UodGhpcy50ayAtIDEwMCwgMCwgMSwgMTAwKTtcblxuICAgICAgICB0aGlzLnkgPSB0aGlzLmluaXRpYWxfeSArIHRoaXMuZHJpZnQgKiBlO1xuXG4gICAgICAgIGlmICh0aGlzLnRrID4gMjAwKVxuICAgICAgICAgICAgdGhpcy50ayA9IDA7XG4gICAgfVxufSIsImltcG9ydCB7REVCVUd9IGZyb20gXCIuL3dhdmVcIjtcbmltcG9ydCB7UmVuZGVyZXIsIFJlbmRlck9iamVjdEludGVyZmFjZX0gZnJvbSBcIi4vcmVuZGVyZXJcIjtcbmltcG9ydCB7UG9pbnREZWZhdWx0LCBQb2ludH0gZnJvbSBcIi4vcG9pbnRzXCI7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XG5cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIgaW1wbGVtZW50cyBSZW5kZXJPYmplY3RJbnRlcmZhY2Uge1xuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdENvbmZpZzogb2JqZWN0ID0ge1xuICAgICAgICAvL2JhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgLy9zdHJva2VDb2xvcjogZmFsc2UsXG4gICAgICAgIHNwZWVkOiAwLFxuICAgICAgICBkaXN0YW5jZTogNTAwLFxuICAgICAgICB0eXBlOiAnZGVmYXVsdCcsXG4gICAgICAgIGRyaWZ0OiAxMCxcbiAgICAgICAgdXBzaWRlZG93bjogZmFsc2VcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbmZpZzogQ29uZmlnO1xuXG4gICAgcHJpdmF0ZSBwb2ludHM6IEFycmF5PFBvaW50PiA9IEFycmF5KCk7XG5cbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcblxuXG4gICAgcHJpdmF0ZSB0aHJlc2hvbGQ7XG5cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihyZW5kZXJlcjogUmVuZGVyZXIsIGNvbmZpZzogb2JqZWN0KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlnKENvbnRyb2xsZXIuZGVmYXVsdENvbmZpZywgY29uZmlnKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY29uZmlnLmdldENvbmZpZygpKTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcihjYW52YXMsIGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgbGV0IHBvaW50c19jb3VudCA9IHRoaXMucG9pbnRzLmxlbmd0aDtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8odGhpcy5wb2ludHNbMF0ueCwgdGhpcy5wb2ludHNbMF0ueSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHNfY291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gKHRoaXMucG9pbnRzW2ldLnggKyB0aGlzLnBvaW50c1tpICsgMV0ueCkgLyAyO1xuICAgICAgICAgICAgbGV0IGQgPSAodGhpcy5wb2ludHNbaV0ueSArIHRoaXMucG9pbnRzW2kgKyAxXS55KSAvIDI7XG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8odGhpcy5wb2ludHNbaV0ueCwgdGhpcy5wb2ludHNbaV0ueSwgYywgZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ2ljKGNhbnZhcywgY29udGV4dCk7XG5cbiAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy5wb2ludHNbcG9pbnRzX2NvdW50IC0gMV0ueCwgdGhpcy5wb2ludHNbcG9pbnRzX2NvdW50IC0gMV0ueSk7XG5cbiAgICAgICAgbGV0IGZoID0gY2FudmFzLmhlaWdodCArIHRoaXMuY29uZmlnLmdldCgnc3Ryb2tlV2lkdGgnLCAxKSAqIDI7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5nZXQoJ3Vwc2lkZWRvd24nKSlcbiAgICAgICAgICAgIGZoID0gLSB0aGlzLmNvbmZpZy5nZXQoJ3N0cm9rZVdpZHRoJywgMSkgKiAyO1xuXG4gICAgICAgIGNvbnRleHQubGluZVRvKHRoaXMucG9pbnRzW3BvaW50c19jb3VudCAtIDFdLngsIGZoKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy5wb2ludHNbMF0ueCwgZmgpO1xuXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmdldCgnYmFja2dyb3VuZENvbG9yJykpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb25maWcuZ2V0KCdiYWNrZ3JvdW5kQ29sb3InKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmdldCgnc3Ryb2tlQ29sb3InKSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuY29uZmlnLmdldCgnc3Ryb2tlQ29sb3InKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5nZXQoJ3N0cm9rZVdpZHRoJykpXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSB0aGlzLmNvbmZpZy5nZXQoJ3N0cm9rZVdpZHRoJyk7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgcG9pbnQgb2YgdGhpcy5wb2ludHMpIHtcbiAgICAgICAgICAgIHBvaW50LnJlbmRlcihjYW52YXMsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvZ2ljKGNhbnZhcywgY29udGV4dCkge1xuICAgICAgICBsZXQgc3BlZWQgPSB0aGlzLmNvbmZpZy5nZXQoJ3NwZWVkJywgMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlICYgbW92ZSBwb2ludHNcbiAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLnBvaW50cykge1xuICAgICAgICAgICAgcC51cGRhdGUoY2FudmFzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIHAueCArPSBzcGVlZFxuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgbGFzdF9wID0gdGhpcy5wb2ludHNbdGhpcy5wb2ludHMubGVuZ3RoLTFdLFxuICAgICAgICAgICAgZmlyc3RfcCA9IHRoaXMucG9pbnRzWzBdO1xuXG4gICAgICAgIGlmIChzcGVlZCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvaW50c1t0aGlzLnBvaW50cy5sZW5ndGgtMl0ueCA+IGNhbnZhcy53aWR0aCArIHRoaXMuY29uZmlnLmdldCgnZGlzdGFuY2UnKSkge1xuICAgICAgICAgICAgICAgIGxhc3RfcC54ID0gTWF0aC5yb3VuZCgtdGhpcy5jb25maWcuZ2V0KCdkaXN0YW5jZScpICogMiArIHRoaXMudGhyZXNob2xkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy51bnNoaWZ0KHRoaXMucG9pbnRzLnBvcCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzcGVlZCA8IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvaW50c1sxXS54IDwgLSB0aGlzLmNvbmZpZy5nZXQoJ2Rpc3RhbmNlJykpIHtcbiAgICAgICAgICAgICAgICBmaXJzdF9wLnggPSBNYXRoLnJvdW5kKGNhbnZhcy53aWR0aCArIHRoaXMuY29uZmlnLmdldCgnZGlzdGFuY2UnKSAqIDIgLSB0aGlzLnRocmVzaG9sZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMucHVzaCh0aGlzLnBvaW50cy5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZW5lcmF0ZSgpIHtcbiAgICAgICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5yZW5kZXJlci5jYW52YXMud2lkdGggLyB0aGlzLmNvbmZpZy5nZXQoJ2Rpc3RhbmNlJykpO1xuICAgICAgICB0aGlzLnRocmVzaG9sZCA9ICh0aGlzLnJlbmRlcmVyLmNhbnZhcy53aWR0aCAtIChudW1iZXIgKiB0aGlzLmNvbmZpZy5nZXQoJ2Rpc3RhbmNlJykpKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gLTI7IGkgPCBudW1iZXIgKyAyOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwb2ludCA9IG5ldyBQb2ludERlZmF1bHQodGhpcy5jb25maWcuZ2V0KCdkaXN0YW5jZScpICogaSwgdGhpcy5yZW5kZXJlci5jYW52YXMuaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBwb2ludC5kcmlmdCA9IHRoaXMuY29uZmlnLmdldCgnZHJpZnQnLCAxMCk7XG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgaW50ZXJmYWNlIFJlbmRlck9iamVjdEludGVyZmFjZSB7XG4gICAgcmVuZGVyKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG59XG5cbi8qKlxuICogUmVuZGVyaW5nIGNsYXNzXG4gKiBDb250cm9scyB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuIHlvdSBjYW4gZWFzaWx5IGFkZCwgZmx1c2ggcmVuZGVyIG9iamVjdHMuIERvbid0IGZvcmdldCB0byBzdGFydCB0aGUgcmVuZGVyZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XG4gICAgcHVibGljIHN0YXRpYyByZXF1ZXN0QW5pbUZyYW1lOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGEsIDFFMyAvIDYwKVxuICAgICAgICAgICAgICAgfVxuICAgIH07XG5cbiAgICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIHB1YmxpYyBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBwcml2YXRlIGlzX3J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcmVuZGVyT2JqZWN0czogQXJyYXk8UmVuZGVyT2JqZWN0SW50ZXJmYWNlPiA9IFtdO1xuXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY2FudmFzX2lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzX2lkKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD50aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNTaXplKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNhbnZhc1NpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5jYW52YXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLm9mZnNldEhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzX3J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc19ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6IFJlbmRlck9iamVjdEludGVyZmFjZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlck9iamVjdHMucHVzaChyZW5kZXJPYmplY3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmbHVzaFJlbmRlck9iamVjdHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyT2JqZWN0cyA9IEFycmF5KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJlbmRlck9iamVjdHMoKTogQXJyYXk8UmVuZGVyT2JqZWN0SW50ZXJmYWNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck9iamVjdHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb29wKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgZm9yIChsZXQgb2JqIG9mIHRoaXMucmVuZGVyT2JqZWN0cykge1xuICAgICAgICAgICAgb2JqLnJlbmRlcih0aGlzLmNhbnZhcywgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzX3J1bm5pbmcpXG4gICAgICAgICAgICBSZW5kZXJlci5yZXF1ZXN0QW5pbUZyYW1lKCkodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9