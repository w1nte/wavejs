var Wave=function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ease=function(t,e,n,i){return(t/=i/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){this.is_running=!1,this.renderObjects=[],this.canvas=document.getElementById(t),this.context=this.canvas.getContext("2d"),this.updateCanvasSize()}return t.prototype.updateCanvasSize=function(){this.canvas.width=this.canvas.offsetWidth,this.canvas.height=this.canvas.offsetHeight},t.prototype.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.start=function(){this.is_running=!0,this.loop()},t.prototype.stop=function(){this.is_running=!1},t.prototype.addRenderObject=function(t){this.renderObjects.push(t)},t.prototype.flushRenderObjects=function(){this.renderObjects=Array()},t.prototype.getRenderObjects=function(){return this.renderObjects},t.prototype.loop=function(){this.clear();for(var e=0,n=this.renderObjects;e<n.length;e++){n[e].render(this.canvas,this.context)}this.is_running&&t.requestAnimFrame()(this.loop.bind(this))},t.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}},t}();e.Renderer=i},function(t,e,n){"use strict";var i,o=this&&this.__extends||(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),s=n(0);e.DEBUG=!1;var h=function(){function t(t,e){this.defaultConfig={waves:[{backgroundColor:"white",strokeColor:!1,speed:2,distance:200},{backgroundColor:!1,strokeColor:"white",strokeWidth:5,speed:2,distance:200},{backgroundColor:"rgba(255, 255, 255, 0.2)",strokeColor:!1,speed:2,distance:200}]},this.waves=Array(),this.renderer=new r.Renderer(t),this.renderer.start(),this.config=this.defaultConfig,this.setup(),this.addEventListeners()}return t.prototype.setup=function(){this.renderer.flushRenderObjects();for(var t=0,e=this.config.waves;t<e.length;t++){var n=e[t],i=new c(this,this.renderer,n);this.waves.push(i),this.renderer.addRenderObject(i)}},t.prototype.addEventListeners=function(){var t=this;window.addEventListener("resize",function(){t.renderer.updateCanvasSize(),t.setup()})},t}();e.Wave=h;var a=function(t){function e(e,n){var i=t.call(this,e,n)||this;return i.initial_y=n,i.drift=Math.round(10*Math.random())+40,i.tk=Math.round(100*Math.random()),i}return o(e,t),e.prototype.update=function(t,e){this.tk+=1;var n=0;n=this.tk<=100?s.ease(this.tk,0,1,100):1-s.ease(this.tk-100,0,1,100),this.y=this.initial_y+this.drift*n,this.tk>200&&(this.tk=0)},e}(function(){function t(t,e){this.x=t,this.y=e}return t.prototype.update=function(t,e){},t}()),c=function(){function t(t,e,n){this.points=Array(),this.wave=t,this.renderer=e,this.config=n;var i=Math.floor(e.canvas.width/this.config.distance),o=e.canvas.width-i*this.config.distance;this.threshold=o,console.log(this.threshold);for(var r=-2;r<i+2;r++)this.points.push(new a(this.config.distance*r,e.canvas.height/2))}return t.prototype.render=function(t,n){n.beginPath();var i=this.points.length;n.moveTo(this.points[0].x,this.points[0].y);for(var o=0;o<i-1;o++){var r=(this.points[o].x+this.points[o+1].x)/2,s=(this.points[o].y+this.points[o+1].y)/2;n.quadraticCurveTo(this.points[o].x,this.points[o].y,r,s)}if(this.logic(t,n),n.lineTo(this.points[i-1].x,this.points[i-1].y),n.lineTo(this.points[i-1].x,t.height+100),n.lineTo(this.points[0].x,t.height+100),n.closePath(),this.config.backgroundColor&&(n.fillStyle=this.config.backgroundColor,n.fill()),this.config.strokeColor&&(n.strokeStyle=this.config.strokeColor,this.config.strokeWidth&&(n.lineWidth=this.config.strokeWidth),n.stroke()),e.DEBUG)for(var h=0,a=this.points;h<a.length;h++){var c=a[h];n.beginPath(),n.arc(c.x,c.y,3,0,2*Math.PI,!1),n.fillStyle="red",n.fill()}},t.prototype.logic=function(t,e){for(var n=0,i=this.points;n<i.length;n++){var o=i[n];o.update(t,e),o.x+=this.config.speed}var r=this.points[this.points.length-1];this.points[this.points.length-2].x>t.width+this.config.distance&&(r.x=Math.round(2*-this.config.distance+this.threshold),this.points.unshift(this.points.pop()))},t}();e.default=h}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XYXZlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1dhdmUvLi9zcmMvZWFzaW5nLnRzIiwid2VicGFjazovL1dhdmUvLi9zcmMvcmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vV2F2ZS8uL3NyYy93YXZlLnRzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZWFzZSIsImIiLCJSZW5kZXJlciIsImNhbnZhc19pZCIsInRoaXMiLCJpc19ydW5uaW5nIiwicmVuZGVyT2JqZWN0cyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInVwZGF0ZUNhbnZhc1NpemUiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiY2xlYXIiLCJjbGVhclJlY3QiLCJzdGFydCIsImxvb3AiLCJzdG9wIiwiYWRkUmVuZGVyT2JqZWN0IiwicmVuZGVyT2JqZWN0IiwicHVzaCIsImZsdXNoUmVuZGVyT2JqZWN0cyIsIkFycmF5IiwiZ2V0UmVuZGVyT2JqZWN0cyIsIl9pIiwiX2EiLCJsZW5ndGgiLCJyZW5kZXIiLCJyZXF1ZXN0QW5pbUZyYW1lIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYSIsInNldFRpbWVvdXQiLCJyZW5kZXJlcl8xIiwiZWFzaW5nXzEiLCJERUJVRyIsIldhdmUiLCJjb25maWciLCJkZWZhdWx0Q29uZmlnIiwid2F2ZXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdHJva2VDb2xvciIsInNwZWVkIiwiZGlzdGFuY2UiLCJzdHJva2VXaWR0aCIsInJlbmRlcmVyIiwic2V0dXAiLCJhZGRFdmVudExpc3RlbmVycyIsIndhdmVfY29uZmlnIiwibmV3X3dhdmUiLCJXYXZlQ29udHJvbGxlciIsIl90aGlzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIldhdmVQb2ludCIsIl9zdXBlciIsIngiLCJ5IiwiaW5pdGlhbF95IiwiZHJpZnQiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJ0ayIsIl9fZXh0ZW5kcyIsInVwZGF0ZSIsImUiLCJQb2ludCIsIndhdmUiLCJwb2ludHMiLCJudW1iZXIiLCJmbG9vciIsInRocmVzaG9sZCIsImNvbnNvbGUiLCJsb2ciLCJiZWdpblBhdGgiLCJwb2ludHNfY291bnQiLCJtb3ZlVG8iLCJxdWFkcmF0aWNDdXJ2ZVRvIiwibG9naWMiLCJsaW5lVG8iLCJjbG9zZVBhdGgiLCJmaWxsU3R5bGUiLCJmaWxsIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJzdHJva2UiLCJwb2ludCIsImFyYyIsIlBJIiwibGFzdF9wIiwidW5zaGlmdCIsInBvcCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFDQSxJQUFBQSxLQUdBLFNBQUFDLEVBQUFDLEdBR0EsR0FBQUYsRUFBQUUsR0FDQSxPQUFBRixFQUFBRSxHQUFBQyxRQUdBLElBQUFDLEVBQUFKLEVBQUFFLElBQ0FHLEVBQUFILEVBQ0FJLEdBQUEsRUFDQUgsWUFVQSxPQU5BSSxFQUFBTCxHQUFBTSxLQUFBSixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBRixHQUdBRyxFQUFBRSxHQUFBLEVBR0FGLEVBQUFELFFBMERBLE9BckRBRixFQUFBUSxFQUFBRixFQUdBTixFQUFB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R0FtRkF6RixFQUFBbUksUUFBZXhEIiwiZmlsZSI6IndhdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG4iLCJcblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2UodCwgYiwgYywgZCkge1xuICAgIGlmICgodC89ZC8yKSA8IDEpIHJldHVybiBjLzIqdCp0ICsgYjtcbiAgICByZXR1cm4gLWMvMiAqICgoLS10KSoodC0yKSAtIDEpICsgYjtcbn0iLCJleHBvcnQgaW50ZXJmYWNlIFJlbmRlck9iamVjdCB7XG4gICAgcmVuZGVyKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG59XG5cbi8qKlxuICogUmVuZGVyaW5nIGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XG4gICAgcHVibGljIHN0YXRpYyByZXF1ZXN0QW5pbUZyYW1lOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGEsIDFFMyAvIDYwKVxuICAgICAgICAgICAgICAgfVxuICAgIH07XG5cbiAgICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwdWJsaWMgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgcHVibGljIGlzX3J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcmVuZGVyT2JqZWN0czogQXJyYXk8UmVuZGVyT2JqZWN0PiA9IFtdO1xuXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY2FudmFzX2lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzX2lkKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD50aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNTaXplKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNhbnZhc1NpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5jYW52YXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLm9mZnNldEhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzX3J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc19ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6IFJlbmRlck9iamVjdCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlck9iamVjdHMucHVzaChyZW5kZXJPYmplY3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmbHVzaFJlbmRlck9iamVjdHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyT2JqZWN0cyA9IEFycmF5KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJlbmRlck9iamVjdHMoKTogQXJyYXk8UmVuZGVyT2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck9iamVjdHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb29wKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgZm9yIChsZXQgb2JqIG9mIHRoaXMucmVuZGVyT2JqZWN0cykge1xuICAgICAgICAgICAgb2JqLnJlbmRlcih0aGlzLmNhbnZhcywgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzX3J1bm5pbmcpXG4gICAgICAgICAgICBSZW5kZXJlci5yZXF1ZXN0QW5pbUZyYW1lKCkodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgIH1cbn0iLCIvKipcbiAqIHcxbnRlIChjKVxuICogNS8yNS8yMDE4XG4gKi9cblxuaW1wb3J0IHtSZW5kZXJlciwgUmVuZGVyT2JqZWN0fSBmcm9tIFwiLi9yZW5kZXJlclwiO1xuaW1wb3J0IHtlYXNlfSBmcm9tIFwiLi9lYXNpbmdcIjtcblxuZXhwb3J0IGNvbnN0IERFQlVHOmJvb2xlYW4gPSBmYWxzZTtcblxuLyoqXG4gKiBDb3JlIGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBXYXZlIHtcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcblxuICAgIHByaXZhdGUgZGVmYXVsdENvbmZpZzogb2JqZWN0ID0ge1xuICAgICAgICB3YXZlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDIsXG4gICAgICAgICAgICAgICAgZGlzdGFuY2U6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiA1LFxuICAgICAgICAgICAgICAgIHNwZWVkOiAyLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyxcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDIsXG4gICAgICAgICAgICAgICAgZGlzdGFuY2U6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBwcml2YXRlIGNvbmZpZzogb2JqZWN0O1xuXG4gICAgcHJpdmF0ZSB3YXZlczogQXJyYXk8V2F2ZUNvbnRyb2xsZXI+ID0gQXJyYXkoKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihjYW52YXNfaWQ6IHN0cmluZywgY29uZmlnPzogb2JqZWN0KSB7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcihjYW52YXNfaWQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLmRlZmF1bHRDb25maWc7IC8vIFRPRE86IGNvbmZpZyBhc3NpZ25cblxuICAgICAgICB0aGlzLnNldHVwKCk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXR1cCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5mbHVzaFJlbmRlck9iamVjdHMoKTtcblxuICAgICAgICBmb3IgKGxldCB3YXZlX2NvbmZpZyBvZiB0aGlzLmNvbmZpZ1snd2F2ZXMnXSkge1xuICAgICAgICAgICAgbGV0IG5ld193YXZlID0gbmV3IFdhdmVDb250cm9sbGVyKHRoaXMsIHRoaXMucmVuZGVyZXIsIHdhdmVfY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMud2F2ZXMucHVzaChuZXdfd2F2ZSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZFJlbmRlck9iamVjdChuZXdfd2F2ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIudXBkYXRlQ2FudmFzU2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cCgpOyAvL2ZsdXNoIGFuZCBydW4gYWdhaW5cbiAgICAgICAgfSlcbiAgICB9XG5cbn1cblxuY2xhc3MgUG9pbnQge1xuICAgIHB1YmxpYyB4OiBudW1iZXI7XG4gICAgcHVibGljIHk6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoY2FudmFzLCBjb250ZXh0KSB7fVxufVxuXG5cbmNsYXNzIFdhdmVQb2ludCBleHRlbmRzIFBvaW50IHtcbiAgICBwdWJsaWMgaW5pdGlhbF95O1xuICAgIHB1YmxpYyBkcmlmdDtcbiAgICBwdWJsaWMgdGs7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsX3kgPSB5O1xuICAgICAgICB0aGlzLmRyaWZ0ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwKSArIDQwO1xuICAgICAgICB0aGlzLnRrID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShjYW52YXMsIGNvbnRleHQpIHtcblxuICAgICAgICB0aGlzLnRrKz0xO1xuXG4gICAgICAgIGxldCBlID0gMDtcblxuICAgICAgICBpZiAodGhpcy50ayA8PSAxMDApXG4gICAgICAgICAgICBlID0gZWFzZSh0aGlzLnRrLCAwLCAxLCAxMDApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlID0gMSAtIGVhc2UodGhpcy50ayAtIDEwMCwgMCwgMSwgMTAwKTtcblxuICAgICAgICB0aGlzLnkgPSB0aGlzLmluaXRpYWxfeSArIHRoaXMuZHJpZnQgKiBlO1xuXG4gICAgICAgIGlmICh0aGlzLnRrID4gMjAwKVxuICAgICAgICAgICAgdGhpcy50ayA9IDA7XG4gICAgfVxufVxuXG5cbmNsYXNzIFdhdmVDb250cm9sbGVyIGltcGxlbWVudHMgUmVuZGVyT2JqZWN0IHtcblxuICAgIHB1YmxpYyBjb25maWc6b2JqZWN0O1xuXG4gICAgcHJpdmF0ZSBwb2ludHM6IEFycmF5PFBvaW50PiA9IEFycmF5KCk7XG5cbiAgICBwcml2YXRlIHdhdmU6IFdhdmU7XG5cbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcblxuXG4gICAgcHJpdmF0ZSB0aHJlc2hvbGQ7XG5cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih3YXZlOiBXYXZlLCByZW5kZXJlcjogUmVuZGVyZXIsIGNvbmZpZzogb2JqZWN0KSB7XG4gICAgICAgIHRoaXMud2F2ZSA9IHdhdmU7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IocmVuZGVyZXIuY2FudmFzLndpZHRoIC8gdGhpcy5jb25maWdbJ2Rpc3RhbmNlJ10pO1xuICAgICAgICBsZXQgdGhyZXNob2xkID0gKHJlbmRlcmVyLmNhbnZhcy53aWR0aCAtIChudW1iZXIgKiB0aGlzLmNvbmZpZ1snZGlzdGFuY2UnXSkpO1xuXG4gICAgICAgIHRoaXMudGhyZXNob2xkID0gdGhyZXNob2xkO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGhyZXNob2xkKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gLTI7IGkgPCBudW1iZXIgKyAyOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2gobmV3IFdhdmVQb2ludCh0aGlzLmNvbmZpZ1snZGlzdGFuY2UnXSAqIGksIHJlbmRlcmVyLmNhbnZhcy5oZWlnaHQgLyAyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKGNhbnZhcywgY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBsZXQgcG9pbnRzX2NvdW50ID0gdGhpcy5wb2ludHMubGVuZ3RoO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyh0aGlzLnBvaW50c1swXS54LCB0aGlzLnBvaW50c1swXS55KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50c19jb3VudCAtIDE7IGkrKykge1xuICAgICAgICAgICAgbGV0IGMgPSAodGhpcy5wb2ludHNbaV0ueCArIHRoaXMucG9pbnRzW2kgKyAxXS54KSAvIDI7XG4gICAgICAgICAgICBsZXQgZCA9ICh0aGlzLnBvaW50c1tpXS55ICsgdGhpcy5wb2ludHNbaSArIDFdLnkpIC8gMjtcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyh0aGlzLnBvaW50c1tpXS54LCB0aGlzLnBvaW50c1tpXS55LCBjLCBkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9naWMoY2FudmFzLCBjb250ZXh0KTtcblxuICAgICAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnBvaW50c1twb2ludHNfY291bnQgLSAxXS54LCB0aGlzLnBvaW50c1twb2ludHNfY291bnQgLSAxXS55KTtcbiAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy5wb2ludHNbcG9pbnRzX2NvdW50IC0gMV0ueCwgY2FudmFzLmhlaWdodCArIDEwMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHRoaXMucG9pbnRzWzBdLngsIGNhbnZhcy5oZWlnaHQgKyAxMDApO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBpZiAodGhpcy5jb25maWdbJ2JhY2tncm91bmRDb2xvciddKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29uZmlnWydiYWNrZ3JvdW5kQ29sb3InXTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ1snc3Ryb2tlQ29sb3InXSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuY29uZmlnWydzdHJva2VDb2xvciddO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnWydzdHJva2VXaWR0aCddKVxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gdGhpcy5jb25maWdbJ3N0cm9rZVdpZHRoJ107XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKERFQlVHKVxuICAgICAgICAgICAgZm9yIChsZXQgcG9pbnQgb2YgdGhpcy5wb2ludHMpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKHBvaW50LngsIHBvaW50LnksIDMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbG9naWMoY2FudmFzLCBjb250ZXh0KSB7XG4gICAgICAgIGZvciAobGV0IHAgb2YgdGhpcy5wb2ludHMpIHtcbiAgICAgICAgICAgIHAudXBkYXRlKGNhbnZhcywgY29udGV4dCk7XG4gICAgICAgICAgICBwLnggKz0gdGhpcy5jb25maWdbJ3NwZWVkJ107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGFzdF9wID0gdGhpcy5wb2ludHNbdGhpcy5wb2ludHMubGVuZ3RoLTFdO1xuXG4gICAgICAgIGlmICh0aGlzLnBvaW50c1t0aGlzLnBvaW50cy5sZW5ndGgtMl0ueCA+IGNhbnZhcy53aWR0aCArIHRoaXMuY29uZmlnWydkaXN0YW5jZSddKSB7XG4gICAgICAgICAgICBsYXN0X3AueCA9IE1hdGgucm91bmQoLXRoaXMuY29uZmlnWydkaXN0YW5jZSddICogMiArdGhpcy50aHJlc2hvbGQpO1xuICAgICAgICAgICAgdGhpcy5wb2ludHMudW5zaGlmdCh0aGlzLnBvaW50cy5wb3AoKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhdmU7Il0sInNvdXJjZVJvb3QiOiIifQ==