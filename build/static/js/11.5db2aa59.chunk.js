(this["webpackJsonpgoit-react-hw-04-movies"]=this["webpackJsonpgoit-react-hw-04-movies"]||[]).push([[11],{119:function(e,t,n){"use strict";n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return v})),n.d(t,"c",(function(){return m}));var r=n(120),o=n.n(r),c=n(121),i="https://api.themoviedb.org/3",a="d66f8875c56322c0e6582f80570eea14";function u(){return s.apply(this,arguments)}function s(){return(s=Object(c.a)(o.a.mark((function e(){var t,n,r=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",e.next=3,fetch(t);case 3:if(!(n=e.sent).ok){e.next=10;break}return e.next=7,n.json();case 7:e.t0=e.sent,e.next=11;break;case 10:e.t0=Promise.reject(new Error("Not found"));case 11:return e.abrupt("return",e.t0);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(){return u("".concat(i,"/trending/all/day?api_key=").concat(a))}var d=function(e,t){return u("".concat(i,"/search/movie?api_key=").concat(a,"&query=").concat(e,"&page=").concat(t))};function f(e){return u("".concat(i,"/movie/").concat(e,"?api_key=").concat(a))}function v(e){return u("".concat(i,"/movie/").concat(e,"/credits?api_key=").concat(a))}function m(e){return u("".concat(i,"/movie/").concat(e,"/reviews?api_key=").concat(a))}},124:function(e,t,n){e.exports={title:"HomeView_title__35BlT",list:"HomeView_list__1sizy",item:"HomeView_item__A1DJP",name:"HomeView_name__1dDaR",deleteBtn:"HomeView_deleteBtn__2flHo"}},134:function(e,t,n){},135:function(e,t,n){"use strict";var r=n(45),o=n(46);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=o(n(2)),i=(0,r(n(47)).default)(c.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.default=i},154:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(33),c=n(2),i=function(e,t,n,r,o){if(e.exists){var c=e.data(t);return o&&(c=o(c)),n&&(c[n]=e.id),r&&(c[r]=e.ref),c}},a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},u=function(e){return{loading:void 0===e||null===e,value:e}},s=function(e){var t=e?e():void 0,n=Object(c.useReducer)((function(e,t){switch(t.type){case"error":return a({},e,{error:t.error,loading:!1,value:void 0});case"reset":return u(t.defaultValue);case"value":return a({},e,{error:void 0,loading:!1,value:t.value});default:return e}}),u(t)),r=n[0],o=n[1],i=function(){var t=e?e():void 0;o({type:"reset",defaultValue:t})},s=function(e){o({type:"error",error:e})},l=function(e){o({type:"value",value:e})};return Object(c.useMemo)((function(){return{error:r.error,loading:r.loading,reset:i,setError:s,setValue:l,value:r.value}}),[r.error,r.loading,i,s,l,r.value])},l=function(e,t){var n=!e&&!t,r=!!e&&!!t&&e.isEqual(t);return n||r},d=function(e,t){return function(e,t,n){var r=Object(c.useRef)(e);return Object(c.useEffect)((function(){t(e,r.current)||(r.current=e,n&&n())})),r}(e,l,t)},f=function(e,t,n){var r=s(),o=r.error,i=r.loading,a=r.reset,u=r.setError,l=r.setValue,f=r.value,v=d(t,a);Object(c.useEffect)((function(){if(v.current){if(e){var t=n&&n.snapshotListenOptions?v.current.onSnapshot(n.snapshotListenOptions,l,u):v.current.onSnapshot(l,u);return function(){t()}}v.current.get(n?n.getOptions:void 0).then(l).catch(u)}else l(void 0)}),[v.current]);var m=[f,i,o];return Object(c.useMemo)((function(){return m}),m)},v=function(e,t,n){var r=n?n.idField:void 0,o=n?n.refField:void 0,a=n?n.snapshotOptions:void 0,u=n?n.transform:void 0,s=f(e,t,n),l=s[0],d=s[1],v=s[2],m=[Object(c.useMemo)((function(){return l?l.docs.map((function(e){return i(e,a,r,o,u)})):void 0}),[l,a,r,o,u]),d,v];return Object(c.useMemo)((function(){return m}),m)},m=n(16),h=n(24),j=n(40),p=n(135),b=n.n(p),O=n(150),g=n(3),y=n(7),x=(n(15),n(8)),_=n(14),w=c.forwardRef((function(e,t){var n=e.classes,r=e.className,o=Object(y.a)(e,["classes","className"]);return c.createElement("div",Object(g.a)({className:Object(x.a)(n.root,r),ref:t},o))}));w.muiName="ListItemSecondaryAction";var k=Object(_.a)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(w),N=n(113),V=n(149),E=n(68),M=n(119),H=n(124),F=n.n(H),I=n(134),L=n.n(I);t.default=function(){var e,t=Object(c.useContext)(E.FirebaseContext),n=t.firestore,i=t.auth,a=Object(c.useState)([]),u=Object(o.a)(a,2),s=u[0],l=u[1],d=Object(m.h)(),f=Object(j.a)(i),p=Object(o.a)(f,1)[0],g=(e=null===n||void 0===n?void 0:n.collection("".concat(null===p||void 0===p?void 0:p.displayName)),v(!0,e,{snapshotListenOptions:{includeMetadataChanges:!0}})),y=Object(o.a)(g,3),x=y[0],_=y[1],w=y[2],H=function(e,t){var o,c=t.find((function(t){return"".concat(t.id)===e.movieId}));return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(O.a,{children:[Object(r.jsx)(h.b,{to:{pathname:"/movies/".concat(null===c||void 0===c?void 0:c.id),state:{from:d}},className:F.a.name,children:null!==(o=null===c||void 0===c?void 0:c.name)&&void 0!==o?o:null===c||void 0===c?void 0:c.title}),Object(r.jsx)(k,{children:Object(r.jsx)(N.a,{"aria-label":"delete",onClick:function(){return t=e.movieId,void(null===n||void 0===n||n.collection("".concat(null===p||void 0===p?void 0:p.displayName)).doc("movieId".concat(t)).delete().then((function(){console.log("Document successfully deleted!")})).catch((function(e){console.error("Error removing document: ",e)})));var t},children:Object(r.jsx)(b.a,{fontSize:"small"})})})]},e.movieId),Object(r.jsx)("hr",{})]})};return Object(c.useEffect)((function(){M.e().then((function(e){var t=e.results;l(t)})).catch((function(e){console.log(e)}))}),[]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h1",{className:F.a.title,children:"Favorites"}),(null===x||void 0===x?void 0:x.length)?Object(r.jsxs)(V.a,{children:[_&&Object(r.jsx)("div",{children:"Loading"}),w&&Object(r.jsx)("div",{children:w}),!_&&(null===x||void 0===x?void 0:x.map((function(e){return H(e,s)})))]}):Object(r.jsx)("h2",{className:"".concat(L.a.title),children:"No one movie"})]})}}}]);
//# sourceMappingURL=11.5db2aa59.chunk.js.map