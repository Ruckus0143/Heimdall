var H=(u,p)=>()=>(p||u((p={exports:{}}).exports,p),p.exports);var q=H((K,b)=>{(function(u,p){typeof define=="function"&&define.amd?define("ev-emitter/ev-emitter",p):typeof b=="object"&&b.exports?b.exports=p():u.EvEmitter=p()})(typeof window<"u"?window:globalThis,function(){function u(){}var p=u.prototype;return p.on=function(f,d){if(f&&d){var r=this._events=this._events||{},m=r[f]=r[f]||[];return m.indexOf(d)==-1&&m.push(d),this}},p.once=function(f,d){if(f&&d){this.on(f,d);var r=this._onceEvents=this._onceEvents||{},m=r[f]=r[f]||{};return m[d]=!0,this}},p.off=function(f,d){var r=this._events&&this._events[f];if(r&&r.length){var m=r.indexOf(d);return m!=-1&&r.splice(m,1),this}},p.emitEvent=function(f,d){var r=this._events&&this._events[f];if(r&&r.length){var m=0,i=r[m];d=d||[];for(var s=this._onceEvents&&this._onceEvents[f];i;){var E=s&&s[i];E&&(this.off(f,i),delete s[i]),i.apply(this,d),m+=E?0:1,i=r[m]}return this}},u}),function(u,p){typeof define=="function"&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(f){return p(u,f)}):typeof b=="object"&&b.exports?b.exports=p(u,require("ev-emitter")):u.Unipointer=p(u,u.EvEmitter)}(window,function(u,p){function f(){}function d(){}var r=d.prototype=Object.create(p.prototype);r.bindStartEvent=function(i){this._bindStartEvent(i,!0)},r.unbindStartEvent=function(i){this._bindStartEvent(i,!1)},r._bindStartEvent=function(i,s){s=s===void 0||!!s;var E=s?"addEventListener":"removeEventListener";u.navigator.pointerEnabled?i[E]("pointerdown",this):u.navigator.msPointerEnabled?i[E]("MSPointerDown",this):(i[E]("mousedown",this),i[E]("touchstart",this))},r.handleEvent=function(i){var s="on"+i.type;this[s]&&this[s](i)},r.getTouch=function(i){for(var s=0;s<i.length;s++){var E=i[s];if(E.identifier==this.pointerIdentifier)return E}},r.onmousedown=function(i){var s=i.button;s&&s!==0&&s!==1||this._pointerDown(i,i)},r.ontouchstart=function(i){this._pointerDown(i,i.changedTouches[0])},r.onMSPointerDown=r.onpointerdown=function(i){this._pointerDown(i,i)},r._pointerDown=function(i,s){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=s.pointerId!==void 0?s.pointerId:s.identifier,this.pointerDown(i,s))},r.pointerDown=function(i,s){this._bindPostStartEvents(i),this.emitEvent("pointerDown",[i,s])};var m={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};return r._bindPostStartEvents=function(i){if(i){var s=m[i.type];s.forEach(function(E){u.addEventListener(E,this)},this),this._boundPointerEvents=s}},r._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(i){u.removeEventListener(i,this)},this),delete this._boundPointerEvents)},r.onmousemove=function(i){this._pointerMove(i,i)},r.onMSPointerMove=r.onpointermove=function(i){i.pointerId==this.pointerIdentifier&&this._pointerMove(i,i)},r.ontouchmove=function(i){var s=this.getTouch(i.changedTouches);s&&this._pointerMove(i,s)},r._pointerMove=function(i,s){this.pointerMove(i,s)},r.pointerMove=function(i,s){this.emitEvent("pointerMove",[i,s])},r.onmouseup=function(i){this._pointerUp(i,i)},r.onMSPointerUp=r.onpointerup=function(i){i.pointerId==this.pointerIdentifier&&this._pointerUp(i,i)},r.ontouchend=function(i){var s=this.getTouch(i.changedTouches);s&&this._pointerUp(i,s)},r._pointerUp=function(i,s){this._pointerDone(),this.pointerUp(i,s)},r.pointerUp=function(i,s){this.emitEvent("pointerUp",[i,s])},r._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},r.pointerDone=f,r.onMSPointerCancel=r.onpointercancel=function(i){i.pointerId==this.pointerIdentifier&&this._pointerCancel(i,i)},r.ontouchcancel=function(i){var s=this.getTouch(i.changedTouches);s&&this._pointerCancel(i,s)},r._pointerCancel=function(i,s){this._pointerDone(),this.pointerCancel(i,s)},r.pointerCancel=function(i,s){this.emitEvent("pointerCancel",[i,s])},d.getPointerPoint=function(i){return{x:i.pageX,y:i.pageY}},d}),function(u,p){typeof define=="function"&&define.amd?define(["ev-emitter/ev-emitter","unipointer/unipointer"],function(f,d){return p(u,f,d)}):typeof b=="object"&&b.exports?b.exports=p(u,require("ev-emitter"),require("unipointer")):u.Huebee=p(u,u.EvEmitter,u.Unipointer)}(window,function(u,p,f){function d(t,e){if(t=s(t),!t)throw"Bad element for Huebee: "+t;this.anchor=t,this.options={},this.option(d.defaults),this.option(e),this.create()}function r(){for(var t=document.querySelectorAll("[data-huebee]"),e=0;e<t.length;e++){var n,o=t[e],h=o.getAttribute("data-huebee");try{n=h&&JSON.parse(h)}catch(a){T&&T.error("Error parsing data-huebee on "+o.className+": "+a);continue}new d(o,n)}}function m(t){w.clearRect(0,0,1,1),w.fillStyle="#010203",w.fillStyle=t,w.fillRect(0,0,1,1);var e=w.getImageData(0,0,1,1).data;if(e=[e[0],e[1],e[2],e[3]],e.join(",")!="1,2,3,255"){var n=U.apply(this,e);return{color:t.trim(),hue:n[0],sat:n[1],lum:n[2]}}}function i(t,e){for(var n in e)t[n]=e[n];return t}function s(t){return typeof t=="string"&&(t=document.querySelector(t)),t}function E(t,e,n){var o=N(t,e,n);return B(o)}function N(t,e,n){var o,h,a=(1-Math.abs(2*n-1))*e,v=t/60,l=a*(1-Math.abs(v%2-1));switch(Math.floor(v)){case 0:o=[a,l,0];break;case 1:o=[l,a,0];break;case 2:o=[0,a,l];break;case 3:o=[0,l,a];break;case 4:o=[l,0,a];break;case 5:o=[a,0,l];break;default:o=[0,0,0]}return h=n-a/2,o=o.map(function(g){return g+h})}function U(t,e,n){t/=255,e/=255,n/=255;var o,h=Math.max(t,e,n),a=Math.min(t,e,n),v=h-a,l=.5*(h+a),g=v===0?0:v/(1-Math.abs(2*l-1));v===0?o=0:h===t?o=(e-n)/v%6:h===e?o=(n-t)/v+2:h===n&&(o=(t-e)/v+4);var C=60*o;return[C,parseFloat(g),parseFloat(l)]}function B(t){var e=t.map(function(n){n=Math.round(255*n);var o=n.toString(16).toUpperCase();return o=o.length<2?"0"+o:o});return"#"+e.join("")}function A(t){return"#"+t[1]+t[3]+t[5]}d.defaults={hues:12,hue0:0,shades:5,saturations:3,notation:"shortHex",setText:!0,setBGColor:!0};var c=d.prototype=Object.create(p.prototype);c.option=function(t){this.options=i(this.options,t)};var k=0,P={};c.create=function(){function t(g){g.target==o&&g.preventDefault()}var e=this.guid=++k;this.anchor.huebeeGUID=e,P[e]=this,this.setBGElems=this.getSetElems(this.options.setBGColor),this.setTextElems=this.getSetElems(this.options.setText),this.outsideCloseIt=this.outsideClose.bind(this),this.onDocKeydown=this.docKeydown.bind(this),this.closeIt=this.close.bind(this),this.openIt=this.open.bind(this),this.onElemTransitionend=this.elemTransitionend.bind(this),this.isInputAnchor=this.anchor.nodeName=="INPUT",this.options.staticOpen||(this.anchor.addEventListener("click",this.openIt),this.anchor.addEventListener("focus",this.openIt)),this.isInputAnchor&&this.anchor.addEventListener("input",this.inputInput.bind(this));var n=this.element=document.createElement("div");n.className="huebee ",n.className+=this.options.staticOpen?"is-static-open ":"is-hidden ",n.className+=this.options.className||"";var o=this.container=document.createElement("div");if(o.className="huebee__container",o.addEventListener("mousedown",t),o.addEventListener("touchstart",t),this.createCanvas(),this.cursor=document.createElement("div"),this.cursor.className="huebee__cursor is-hidden",o.appendChild(this.cursor),this.createCloseButton(),n.appendChild(o),!this.options.staticOpen){var h=getComputedStyle(this.anchor.parentNode);h.position!="relative"&&h.position!="absolute"&&(this.anchor.parentNode.style.position="relative")}var a=this.options.hues,v=this.options.customColors,l=v&&v.length;this.satY=l?Math.ceil(l/a)+1:0,this.updateColors(),this.setAnchorColor(),this.options.staticOpen&&this.open()},c.getSetElems=function(t){return t===!0?[this.anchor]:typeof t=="string"?document.querySelectorAll(t):void 0},c.createCanvas=function(){var t=this.canvas=document.createElement("canvas");t.className="huebee__canvas",this.ctx=t.getContext("2d");var e=this.canvasPointer=new f;e._bindStartEvent(t),e.on("pointerDown",this.canvasPointerDown.bind(this)),e.on("pointerMove",this.canvasPointerMove.bind(this)),this.container.appendChild(t)};var I="http://www.w3.org/2000/svg";c.createCloseButton=function(){if(!this.options.staticOpen){var t=document.createElementNS(I,"svg");t.setAttribute("class","huebee__close-button"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","24"),t.setAttribute("height","24");var e=document.createElementNS(I,"path");e.setAttribute("d","M 7,7 L 17,17 M 17,7 L 7,17"),e.setAttribute("class","huebee__close-button__x"),t.appendChild(e),t.addEventListener("click",this.closeIt),this.container.appendChild(t)}},c.updateColors=function(){this.swatches={},this.colorGrid={},this.updateColorModer();var t=this.options.shades,e=this.options.saturations,n=this.options.hues,o=this.options.customColors;if(o&&o.length){var h=0;o.forEach(function(M){var x=h%n,j=Math.floor(h/n),L=m(M);L&&(this.addSwatch(L,x,j),h++)}.bind(this))}for(var a=0;a<e;a++){var v=1-a/e,l=t*a+this.satY;this.updateSaturationGrid(a,v,l)}for(a=0;a<t+2;a++){var g=1-a/(t+1),C=this.colorModer(0,0,g),_=m(C);this.addSwatch(_,n+1,a)}},c.updateSaturationGrid=function(t,e,n){for(var o=this.options.shades,h=this.options.hues,a=this.options.hue0,v=0;v<o;v++)for(var l=0;l<h;l++){var g=Math.round(360*l/h+a)%360,C=1-(v+1)/(o+1),_=this.colorModer(g,e,C),M=m(_),x=v+n;this.addSwatch(M,l,x)}},c.addSwatch=function(t,e,n){this.swatches[e+","+n]=t,this.colorGrid[t.color.toUpperCase()]={x:e,y:n}};var D={hsl:function(t,e,n){return e=Math.round(100*e),n=Math.round(100*n),"hsl("+t+", "+e+"%, "+n+"%)"},hex:E,shortHex:function(t,e,n){var o=E(t,e,n);return A(o)}};c.updateColorModer=function(){this.colorModer=D[this.options.notation]||D.shortHex},c.renderColors=function(){var t=2*this.gridSize;for(var e in this.swatches){var n=this.swatches[e],o=e.split(","),h=o[0],a=o[1];this.ctx.fillStyle=n.color,this.ctx.fillRect(h*t,a*t,t,t)}},c.setAnchorColor=function(){this.isInputAnchor&&this.setColor(this.anchor.value)};var S=document.documentElement;c.open=function(){if(!this.isOpen){var t=this.anchor,e=this.element;this.options.staticOpen||(e.style.left=t.offsetLeft+"px",e.style.top=t.offsetTop+t.offsetHeight+"px"),this.bindOpenEvents(!0),e.removeEventListener("transitionend",this.onElemTransitionend),t.parentNode.insertBefore(e,t.nextSibling);var n=getComputedStyle(e).transitionDuration;this.hasTransition=n&&n!="none"&&parseFloat(n),this.isOpen=!0,this.updateSizes(),this.renderColors(),this.setAnchorColor(),e.offsetHeight,e.classList.remove("is-hidden")}},c.bindOpenEvents=function(t){if(!this.options.staticOpen){var e=(t?"add":"remove")+"EventListener";S[e]("mousedown",this.outsideCloseIt),S[e]("touchstart",this.outsideCloseIt),document[e]("focusin",this.outsideCloseIt),document[e]("keydown",this.onDocKeydown),this.anchor[e]("blur",this.closeIt)}},c.updateSizes=function(){var t=this.options.hues,e=this.options.shades,n=this.options.saturations;this.cursorBorder=parseInt(getComputedStyle(this.cursor).borderTopWidth,10),this.gridSize=Math.round(this.cursor.offsetWidth-2*this.cursorBorder),this.canvasOffset={x:this.canvas.offsetLeft,y:this.canvas.offsetTop};var o=Math.max(e*n+this.satY,e+2),h=this.gridSize*(t+2);this.canvas.width=2*h,this.canvas.style.width=h+"px",this.canvas.height=this.gridSize*o*2},c.outsideClose=function(t){var e=this.anchor.contains(t.target),n=this.element.contains(t.target);e||n||this.close()};var G={13:!0,27:!0};c.docKeydown=function(t){G[t.keyCode]&&this.close()};var z=typeof S.style.transform=="string";c.close=function(){this.isOpen&&(z&&this.hasTransition?this.element.addEventListener("transitionend",this.onElemTransitionend):this.remove(),this.element.classList.add("is-hidden"),this.bindOpenEvents(!1),this.isOpen=!1)},c.remove=function(){var t=this.element.parentNode;t.contains(this.element)&&t.removeChild(this.element)},c.elemTransitionend=function(t){t.target==this.element&&(this.element.removeEventListener("transitionend",this.onElemTransitionend),this.remove())},c.inputInput=function(){this.setColor(this.anchor.value)},c.canvasPointerDown=function(t,e){t.preventDefault(),this.updateOffset(),this.canvasPointerChange(e)},c.updateOffset=function(){var t=this.canvas.getBoundingClientRect();this.offset={x:t.left+u.pageXOffset,y:t.top+u.pageYOffset}},c.canvasPointerMove=function(t,e){this.canvasPointerChange(e)},c.canvasPointerChange=function(t){var e=Math.round(t.pageX-this.offset.x),n=Math.round(t.pageY-this.offset.y),o=this.gridSize,h=Math.floor(e/o),a=Math.floor(n/o),v=this.swatches[h+","+a];this.setSwatch(v)},c.setColor=function(t){var e=m(t);this.setSwatch(e)},c.setSwatch=function(t){var e=t&&t.color;if(t){var n=e==this.color;this.color=e,this.hue=t.hue,this.sat=t.sat,this.lum=t.lum;var o=this.lum-.15*Math.cos((this.hue+70)/180*Math.PI);this.isLight=o>.5;var h=this.colorGrid[e.toUpperCase()];this.updateCursor(h),this.setTexts(),this.setBackgrounds(),n||this.emitEvent("change",[e,t.hue,t.sat,t.lum])}},c.setTexts=function(){if(this.setTextElems)for(var t=0;t<this.setTextElems.length;t++){var e=this.setTextElems[t],n=e.nodeName=="INPUT"?"value":"textContent";e[n]=this.color}},c.setBackgrounds=function(){if(this.setBGElems)for(var t=this.isLight?"#222":"white",e=0;e<this.setBGElems.length;e++){var n=this.setBGElems[e];n.style.backgroundColor=this.color,n.style.color=t}},c.updateCursor=function(t){if(this.isOpen){var e=t?"remove":"add";if(this.cursor.classList[e]("is-hidden"),t){var n=this.gridSize,o=this.canvasOffset,h=this.cursorBorder;this.cursor.style.left=t.x*n+o.x-h+"px",this.cursor.style.top=t.y*n+o.y-h+"px"}}};var T=u.console,O=document.readyState;O=="complete"||O=="interactive"?r():document.addEventListener("DOMContentLoaded",r),d.data=function(t){t=s(t);var e=t&&t.huebeeGUID;return e&&P[e]};var y=document.createElement("canvas");y.width=y.height=1;var w=y.getContext("2d");return d})});export default q();