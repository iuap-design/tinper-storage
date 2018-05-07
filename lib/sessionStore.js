/*!
 * 
 *             description:  结合Localstorage和SessionStorage的数据缓存方案
 *             author: Yonyou FED Team
 *             date: 2018-05-07
 *             version: V0.0.2
 *             file: sessionStore.js
 *         
 */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={version:"0.0.1",session:window.sessionStorage},r={set:function(e,t){return this.session.setItem(e,t)},get:function(e){return this.session.getItem(e)},has:function(e){return void 0!==this.get(e)},remove:function(e){return this.session.removeItem(e)},clear:function(){this.session.clear()},getAll:function(){if(this.disabled)return null;var e={};return this.forEach(function(t,n){e[t]=n}),e},each:function(e){for(var t=this.session.length-1;t>=0;t--){var n=this.session.key(t);fn(read(n),n)}}};Object.assign(o,r);try{o.session||alert("浏览器不支持sessionStorage")}catch(e){store.disabled=!0,"QuotaExceededError"==e.name&&console.log("超出本地存储限额！")}window.sessionStore=o,t.default=o}])});