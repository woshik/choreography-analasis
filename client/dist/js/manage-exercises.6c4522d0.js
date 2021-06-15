(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["manage-exercises"],{2092:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n("d4ec"),a=n("bee2"),i=n("262e"),o=n("2caf"),c=(n("99af"),n("b775")),s=n("3a78"),u=function(t){Object(i["a"])(n,t);var e=Object(o["a"])(n);function n(){Object(r["a"])(this,n);var t="exercise";return e.call(this,t)}return Object(a["a"])(n,[{key:"getAutomaticExercise",value:function(t){return Object(c["a"])({url:"".concat(this.apiURL,"/automatic/").concat(t),method:"get"}).then((function(t){return t}))}},{key:"assignAutomaticExercise",value:function(t,e){return Object(c["a"])({url:"".concat(this.apiURL,"/assign/").concat(t),method:"post",data:e}).then((function(t){return t}))}}]),n}(s["a"])},2909:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t){if(Array.isArray(t))return r(t)}n.d(e,"a",(function(){return s}));n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");function i(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n("fb6a"),n("b0c0");function o(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return a(t)||i(t)||o(t)||c()}},"4df4":function(t,e,n){"use strict";var r=n("0366"),a=n("7b0b"),i=n("9bdd"),o=n("e95a"),c=n("50c4"),s=n("8418"),u=n("35a1");t.exports=function(t){var e,n,l,d,f,b,v=a(t),m="function"==typeof this?this:Array,h=arguments.length,p=h>1?arguments[1]:void 0,x=void 0!==p,w=u(v),y=0;if(x&&(p=r(p,h>2?arguments[2]:void 0,2)),void 0==w||m==Array&&o(w))for(e=c(v.length),n=new m(e);e>y;y++)b=x?p(v[y],y):v[y],s(n,y,b);else for(d=w.call(v),f=d.next,n=new m;!(l=f.call(d)).done;y++)b=x?i(d,p,[l.value,y],!0):l.value,s(n,y,b);return n.length=y,n}},"9bdd":function(t,e,n){var r=n("825a"),a=n("2a62");t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(o){throw a(t),o}}},a15b:function(t,e,n){"use strict";var r=n("23e7"),a=n("44ad"),i=n("fc6a"),o=n("a640"),c=[].join,s=a!=Object,u=o("join",",");r({target:"Array",proto:!0,forced:s||!u},{join:function(t){return c.call(i(this),void 0===t?",":t)}})},a630:function(t,e,n){var r=n("23e7"),a=n("4df4"),i=n("1c7e"),o=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:a})},b0c0:function(t,e,n){var r=n("83ab"),a=n("9bf2").f,i=Function.prototype,o=i.toString,c=/^\s*function ([^ (]*)/,s="name";r&&!(s in i)&&a(i,s,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},e002:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"outer-w3-agile col-xl mt-3"},[n("button",{staticClass:"btn btn-primary mb-3 float-right",on:{click:t.addExercise}},[t._v(" Add Exercise ")]),n("vue-table",{ref:"vuetable",attrs:{fields:t.tableFields,"table-data":t.tabeleData,"total-row":t.totalRow},on:{"edit-row":t.editRow,"delete-row":t.deleteRow,"api-call":t.callToAPi},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.rowData;return[n("button",{staticClass:"btn btn-info btn-sm m-1",on:{click:function(e){return t.assign(r)}}},[n("font-awesome-icon",{attrs:{icon:"sign-in-alt"}}),t._v(" Assign Automatic Exercise ")],1)]}}])})],1),t.showModal?n("modal-window",{on:{open:t.handleModal},scopedSlots:t._u([{key:"title",fn:function(){return[t._v(" Delete Exercise ")]},proxy:!0},{key:"footer",fn:function(){return[n("button",{staticClass:"btn btn-danger",on:{click:function(e){return t.deleteRow(null)}}},[t._v("Delete")])]},proxy:!0}],null,!1,1129243616)},[t._v(" You want to really delete this Exercise? ")]):t._e()],1)},a=[],i=n("1da1"),o=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("a15b"),n("2092")),c=n("0748"),s=n("9fa3"),u={components:{VueTable:c["a"],ModalWindow:function(){return n.e("chunk-2d0d5ffe").then(n.bind(null,"714b"))}},data:function(){return{index:1,exerciseService:new o["a"],tableFields:[{name:s["a"],title:"No."},{name:"name",title:"Exercise Name"},{name:"duration",title:"Exercise Duration"},{name:"breakPoints",title:"Break Points",formatter:function(t){return t.join(", ")}},{name:"actions",title:"Actions",width:"30%"}],tabeleData:[],totalRow:0,showModal:!1,selectedId:""}},methods:{callToAPi:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.exerciseService.get(t);case 3:r=n.sent,e.tabeleData=r.data,e.totalRow=r.total,e.$nextTick((function(){e.$refs.vuetable.updateTable()})),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](0),console.log(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()},addExercise:function(){this.$router.push({name:"AddExercise"})},editRow:function(t){this.$router.push({name:"EditExercise",params:{id:t}})},deleteRow:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t){n.next=4;break}return e.selectedId=t,e.handleModal(!0),n.abrupt("return");case 4:return n.prev=4,n.next=7,e.exerciseService.delete({id:e.selectedId});case 7:e.callToAPi(),e.handleModal(!1),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](4),console.log(n.t0);case 14:case"end":return n.stop()}}),n,null,[[4,11]])})))()},assign:function(t){this.$router.push({name:"AutomaticExercise",params:{id:t._id}})},handleModal:function(t){this.showModal=t}}},l=u,d=n("2877"),f=Object(d["a"])(l,r,a,!1,null,null,null);e["default"]=f.exports},f5dfa:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("active-exercise")},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"outer-w3-agile col-xl mt-3"},[n("h4",{staticClass:"tittle-w3-agileits mb-4"},[t._v("Active Exercise List")]),n("div",{staticClass:"table-responsive"},[n("table",{staticClass:"table table-striped table-bordered table-hover"},[t._m(0),n("tbody",t._l(t.exerciseData,(function(e,r){return n("tr",{key:e.index},[n("th",{attrs:{scope:"row"}},[t._v(t._s(r+1))]),n("td",[t._v(t._s(e.trainingName))]),n("td",[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.exercise.duration)+" sec")]),n("td",[t._v(t._s(e.mode))]),t.enableAction?n("td",[n("button",{staticClass:"btn btn-sm btn-primary mr-2",attrs:{type:"button"},on:{click:function(e){return t.automaticExercise(r)}}},[t._v(" Automatic Exercise ")]),n("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button"},on:{click:function(e){return t.manualExercise(r)}}},[t._v(" Manual Exercise ")])]):t._e()])})),0)])])])])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{scope:"col"}},[t._v("#")]),n("th",{attrs:{scope:"col"}},[t._v("Training Name")]),n("th",{attrs:{scope:"col"}},[t._v("Exercise Name")]),n("th",{attrs:{scope:"col"}},[t._v("Duration")]),n("th",{attrs:{scope:"col"}},[t._v("Mode")]),n("th",{attrs:{scope:"col"}},[t._v("Action")])])])}],c=n("2909"),s=n("1da1"),u=(n("96cf"),n("c287")),l={data:function(){return{traineeService:new u["a"],exerciseData:[]}},props:{enableAction:{type:Boolean,default:!0}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.traineeService.getActiveExerciseList();case 3:n=e.sent,t.exerciseData=Object(c["a"])(n),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},methods:{manualExercise:function(t){this.$router.push({name:"ManualExercise",params:{id:this.exerciseData[t].index}})},automaticExercise:function(t){this.$router.push({name:"AutomaticExercise",params:{id:this.exerciseData[t].index}})}}},d=l,f=n("2877"),b=Object(f["a"])(d,i,o,!1,null,null,null),v=b.exports,m={components:{ActiveExercise:v}},h=m,p=Object(f["a"])(h,r,a,!1,null,null,null);e["default"]=p.exports},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("861d"),i=n("e8b5"),o=n("23cb"),c=n("50c4"),s=n("fc6a"),u=n("8418"),l=n("b622"),d=n("1dde"),f=d("slice"),b=l("species"),v=[].slice,m=Math.max;r({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var n,r,l,d=s(this),f=c(d.length),h=o(t,f),p=o(void 0===e?f:e,f);if(i(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?a(n)&&(n=n[b],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return v.call(d,h,p);for(r=new(void 0===n?Array:n)(m(p-h,0)),l=0;h<p;h++,l++)h in d&&u(r,l,d[h]);return r.length=l,r}})}}]);
//# sourceMappingURL=manage-exercises.6c4522d0.js.map