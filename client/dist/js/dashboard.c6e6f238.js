(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{2092:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r("d4ec"),a=r("262e"),c=r("2caf"),i=r("3a78"),o=function(t){Object(a["a"])(r,t);var e=Object(c["a"])(r);function r(){Object(n["a"])(this,r);var t="exercise";return e.call(this,t)}return r}(i["a"])},2909:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function a(t){if(Array.isArray(t))return n(t)}r.d(e,"a",(function(){return s}));r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),r("a630");function c(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}r("fb6a"),r("b0c0");function i(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return a(t)||c(t)||i(t)||o()}},"43cb":function(t,e,r){},"4df4":function(t,e,r){"use strict";var n=r("0366"),a=r("7b0b"),c=r("9bdd"),i=r("e95a"),o=r("50c4"),s=r("8418"),u=r("35a1");t.exports=function(t){var e,r,l,d,f,v,h=a(t),p="function"==typeof this?this:Array,b=arguments.length,m=b>1?arguments[1]:void 0,x=void 0!==m,y=u(h),g=0;if(x&&(m=n(m,b>2?arguments[2]:void 0,2)),void 0==y||p==Array&&i(y))for(e=o(h.length),r=new p(e);e>g;g++)v=x?m(h[g],g):h[g],s(r,g,v);else for(d=y.call(h),f=d.next,r=new p;!(l=f.call(d)).done;g++)v=x?c(d,m,[l.value,g],!0):l.value,s(r,g,v);return r.length=g,r}},"69cf":function(t,e,r){"use strict";r("43cb")},7277:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(t.dynamicLoad,{tag:"component"})},a=[],c=r("5530"),i=r("2f62"),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-xl-6 pl-xl-2"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[r("div",{staticClass:"card card_border border-primary-top p-4"},[r("font-awesome-icon",{attrs:{icon:"walking"}}),r("h3",{staticClass:"text-success number"},[t._v(t._s(t.exerciseCount))]),r("p",{staticClass:"stat-text"},[t._v("Total Exercise")])],1)])])]),r("div",{staticClass:"col-xl-6 pr-xl-2"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[r("div",{staticClass:"card card_border border-primary-top p-4"},[r("font-awesome-icon",{attrs:{icon:"user"}}),r("h3",{staticClass:"text-primary number"},[t._v(t._s(t.traineeCount))]),r("p",{staticClass:"stat-text"},[t._v("Total Trainee")])],1)])])])])},s=[],u=(r("d3b7"),r("820e"),r("3ca3"),r("ddb0"),r("159b"),r("b0c0"),r("2092")),l=r("c287"),d={name:"Dashboard",data:function(){return{traineeService:new l["a"],exerciseService:new u["a"],traineeCount:0,exerciseCount:0}},mounted:function(){var t=this;Promise.allSettled([new Promise((function(e,r){t.traineeService.getTotalCount().then((function(t){var r;return e({result:null!==(r=null===t||void 0===t?void 0:t.count)&&void 0!==r?r:0,name:"traineeCount"})})).catch((function(t){return r(t)}))})),new Promise((function(e,r){t.exerciseService.getTotalCount().then((function(t){var r;return e({result:null!==(r=null===t||void 0===t?void 0:t.count)&&void 0!==r?r:0,name:"exerciseCount"})})).catch((function(t){return r(t)}))}))]).then((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach((function(e){"fulfilled"===e.status&&(t[e.value.name]=e.value.result)}))}))}},f=d,v=(r("69cf"),r("2877")),h=Object(v["a"])(f,o,s,!1,null,"590777ea",null),p=h.exports,b=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"outer-w3-agile col-xl mt-3"},[r("h4",{staticClass:"tittle-w3-agileits mb-4"},[t._v("Active Exercise")]),r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table table-striped table-bordered table-hover"},[t._m(0),r("tbody",t._l(t.exerciseData,(function(e,n){return r("tr",{key:e.index},[r("th",{attrs:{scope:"row"}},[t._v(t._s(n+1))]),r("td",[t._v(t._s(e.trainingName))]),r("td",[t._v(t._s(e.name))]),r("td",[t._v(t._s(e.exercise.duration)+" sec")]),r("td",[t._v(t._s(e.mode))]),r("td",[r("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button"},on:{click:function(e){return t.startExercise(n)}}},[t._v(" Start ")])])])})),0)])])])])},m=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[t._v("#")]),r("th",{attrs:{scope:"col"}},[t._v("Training Name")]),r("th",{attrs:{scope:"col"}},[t._v("Exercise Name")]),r("th",{attrs:{scope:"col"}},[t._v("Duration")]),r("th",{attrs:{scope:"col"}},[t._v("Mode")]),r("th",{attrs:{scope:"col"}},[t._v("Action")])])])}],x=r("2909"),y=r("1da1"),g=(r("96cf"),{data:function(){return{traineeService:new l["a"],exerciseData:[]}},mounted:function(){var t=this;return Object(y["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.traineeService.getActiveExerciseList();case 3:r=e.sent,t.exerciseData=Object(x["a"])(r),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},methods:{startExercise:function(t){this.$router.push({name:"traineeExercise",params:{id:this.exerciseData[t].index}})}}}),_=g,w=Object(v["a"])(_,b,m,!1,null,null,null),j=w.exports,C={name:"Dashboard",computed:Object(c["a"])({dynamicLoad:function(){return this.isTrainer?p:j}},Object(i["b"])("user",["isTrainer"]))},O=C,A=Object(v["a"])(O,n,a,!1,null,null,null);e["default"]=A.exports},"820e":function(t,e,r){"use strict";var n=r("23e7"),a=r("1c0b"),c=r("f069"),i=r("e667"),o=r("2266");n({target:"Promise",stat:!0},{allSettled:function(t){var e=this,r=c.f(e),n=r.resolve,s=r.reject,u=i((function(){var r=a(e.resolve),c=[],i=0,s=1;o(t,(function(t){var a=i++,o=!1;c.push(void 0),s++,r.call(e,t).then((function(t){o||(o=!0,c[a]={status:"fulfilled",value:t},--s||n(c))}),(function(t){o||(o=!0,c[a]={status:"rejected",reason:t},--s||n(c))}))})),--s||n(c)}));return u.error&&s(u.value),r.promise}})},"9bdd":function(t,e,r){var n=r("825a"),a=r("2a62");t.exports=function(t,e,r,c){try{return c?e(n(r)[0],r[1]):e(r)}catch(i){throw a(t),i}}},a630:function(t,e,r){var n=r("23e7"),a=r("4df4"),c=r("1c7e"),i=!c((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:i},{from:a})},b0c0:function(t,e,r){var n=r("83ab"),a=r("9bf2").f,c=Function.prototype,i=c.toString,o=/^\s*function ([^ (]*)/,s="name";n&&!(s in c)&&a(c,s,{configurable:!0,get:function(){try{return i.call(this).match(o)[1]}catch(t){return""}}})},c287:function(t,e,r){"use strict";r.d(e,"a",(function(){return u}));var n=r("d4ec"),a=r("bee2"),c=r("262e"),i=r("2caf"),o=(r("99af"),r("b775")),s=r("3a78"),u=function(t){Object(c["a"])(r,t);var e=Object(i["a"])(r);function r(){Object(n["a"])(this,r);var t="trainee";return e.call(this,t)}return Object(a["a"])(r,[{key:"resetPassword",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/reset"),method:"patch",data:t}).then((function(t){return t}))}},{key:"profileUpdate",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/update"),method:"patch",data:t}).then((function(t){return t}))}},{key:"passwordUpdate",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/password"),method:"patch",data:t}).then((function(t){return t}))}},{key:"assignExercise",value:function(t,e){return Object(o["a"])({url:"".concat(this.apiURL,"/assign/").concat(t),method:"post",data:e}).then((function(t){return t}))}},{key:"getActiveExerciseList",value:function(){return Object(o["a"])({url:"".concat(this.apiURL,"/active-exercise"),method:"get"}).then((function(t){return t}))}},{key:"getExerciseData",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/active-exercise/").concat(t),method:"get"}).then((function(t){return t}))}},{key:"exercisePerformed",value:function(t,e){return Object(o["a"])({url:"".concat(this.apiURL,"/performed/").concat(t),method:"post",data:e}).then((function(t){return t}))}},{key:"getCompleteExerciseList",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/complete-exercise/").concat(t),method:"get"}).then((function(t){return t}))}},{key:"getExerciseReport",value:function(t,e){return Object(o["a"])({url:"".concat(this.apiURL,"/complete-exercise/").concat(t,"/").concat(e),method:"get"}).then((function(t){return t}))}},{key:"login",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/login"),method:"post",data:t}).then((function(t){return t}))}}]),r}(s["a"])},fb6a:function(t,e,r){"use strict";var n=r("23e7"),a=r("861d"),c=r("e8b5"),i=r("23cb"),o=r("50c4"),s=r("fc6a"),u=r("8418"),l=r("b622"),d=r("1dde"),f=d("slice"),v=l("species"),h=[].slice,p=Math.max;n({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var r,n,l,d=s(this),f=o(d.length),b=i(t,f),m=i(void 0===e?f:e,f);if(c(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!c(r.prototype)?a(r)&&(r=r[v],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return h.call(d,b,m);for(n=new(void 0===r?Array:r)(p(m-b,0)),l=0;b<m;b++,l++)b in d&&u(n,l,d[b]);return n.length=l,n}})}}]);
//# sourceMappingURL=dashboard.c6e6f238.js.map