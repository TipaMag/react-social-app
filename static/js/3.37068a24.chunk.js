(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{317:function(e,n,t){e.exports={paggination:"Paggination_paggination__HSBs8",selectedPage:"Paggination_selectedPage__3Vi8A"}},318:function(e,n,t){e.exports={userPhoto:"User_userPhoto__2lX0M",userAvatar:"User_userAvatar__RlyvW",userInfo:"User_userInfo__2iDE0",userInfoTitle:"User_userInfoTitle__3FREk",followingBtn:"User_followingBtn__38nFv"}},319:function(e,n,t){"use strict";t.r(n);var r=t(37),o=t(38),a=t(40),l=t(39),u=t(41),s=t(0),i=t.n(s),c=t(12),f=t(143),g=t(48),p=t(317),m=t.n(p),d=function(e){for(var n=e.totalItemsCount,t=e.pageSize,r=e.currentPage,o=e.onPageChanged,a=e.portionSize,l=void 0===a?10:a,u=Math.ceil(n/t),c=[],f=1;f<=u;f++)c.push(f);var p=Math.ceil(u/l),d=Object(s.useState)(1),h=Object(g.a)(d,2),v=h[0],w=h[1],P=(v-1)*l+1,b=v*l,E=c.filter((function(e){return e>=P&&e<=b})).map((function(e){return i.a.createElement("span",{className:r===e?m.a.selectedPage:"",key:e,onClick:function(){o(e)}},e)}));return i.a.createElement("div",{className:m.a.paggination},i.a.createElement("button",{onClick:function(){w(v-1)},disabled:v<=1},"PREV"),E,i.a.createElement("button",{onClick:function(){w(v+1)},disabled:p<=v},"NEXT"))},h=t(35),v=t(318),w=t.n(v),P=t(11),b=t(119),E=t.n(b),y=t(77),_=t(36);function U(){var e=Object(h.a)(["\n   display: flex;\n   justify-content: space-between;\n   align-items: center;\n   padding: 5px;\n   border: 1px solid #ccc;\n"]);return U=function(){return e},e}var C=_.a.li(U()),j=function(e){var n=e.userId,t=e.smallPhoto,r=e.name,o=e.status,a=e.followed,l=e.followingInProgress,u=e.onUnfollow,s=e.onFollow;return i.a.createElement(C,{id:n},i.a.createElement("div",{className:w.a.userPhoto},i.a.createElement(P.b,{to:"/profile/"+n},i.a.createElement("img",{className:w.a.userAvatar,src:null!=t?t:E.a,alt:"avatar"}))),i.a.createElement("div",{className:w.a.userInfo},i.a.createElement("span",{className:w.a.userInfoName},r),i.a.createElement("span",{className:w.a.userInfoTitle},o)),i.a.createElement("div",{className:w.a.followingBtn},a?i.a.createElement(y.a,{disabled:l.some((function(e){return e===n})),onClick:function(){u(n)}},"unfollow"):i.a.createElement(y.a,{disabled:l.some((function(e){return e===n})),onClick:function(){s(n)}},"follow")))};function I(){var e=Object(h.a)(["\n   display: grid;\n   grid-gap: 5px;\n   margin: 0;\n   padding: 0;\n   list-style: none;\n"]);return I=function(){return e},e}function F(){var e=Object(h.a)(["\n\n"]);return F=function(){return e},e}function O(){var e=Object(h.a)(["\n    \n"]);return O=function(){return e},e}var k=_.a.div(O()),N=_.a.div(F()),S=_.a.ul(I()),A=function(e){var n=e.users,t=e.onFollow,r=e.onUnfollow,o=e.followingInProgress,a=e.totalUsersCount,l=e.pageSize,u=e.currentPage,s=e.onPageChanged;return i.a.createElement(k,null,i.a.createElement(N,null,i.a.createElement(d,{totalItemsCount:a,pageSize:l,currentPage:u,onPageChanged:s})),i.a.createElement(S,null,n.map((function(e){return i.a.createElement(j,{key:e.id,userId:e.id,name:e.name,smallPhoto:e.photos.small,followed:e.followed,status:e.status,onFollow:t,onUnfollow:r,followingInProgress:o})}))))},z=t(76),x=t(6);function B(e,n){return e===n}function M(e,n,t){if(null===n||null===t||n.length!==t.length)return!1;for(var r=n.length,o=0;o<r;o++)if(!e(n[o],t[o]))return!1;return!0}function R(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var t=n.map((function(e){return typeof e})).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+t+"]")}return n}var T=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var a=0,l=r.pop(),u=R(r),s=e.apply(void 0,[function(){return a++,l.apply(null,arguments)}].concat(t)),i=e((function(){for(var e=[],n=u.length,t=0;t<n;t++)e.push(u[t].apply(null,arguments));return s.apply(null,e)}));return i.resultFunc=l,i.dependencies=u,i.recomputations=function(){return a},i.resetRecomputations=function(){return a=0},i}}((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:B,t=null,r=null;return function(){return M(n,t,arguments)||(r=e.apply(null,arguments)),t=arguments,r}}));var q=T([function(e){return e.usersPage.users}],(function(e){return e.filter((function(e){return!0}))})),D=function(e){return e.usersPage.pageSize},J=function(e){return e.usersPage.totalUsersCount},V=function(e){return e.usersPage.currentPage},X=function(e){return e.usersPage.isFetching},H=function(e){return e.usersPage.followingInProgress},W=function(e){function n(){var e,t;Object(r.a)(this,n);for(var o=arguments.length,u=new Array(o),s=0;s<o;s++)u[s]=arguments[s];return(t=Object(a.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(u)))).onPageChanged=function(e){t.props.getNewPage(t.props.pageSize,e)},t.onFollow=function(e){t.props.setFollow(e)},t.onUnfollow=function(e){t.props.setUnfollow(e)},t}return Object(u.a)(n,e),Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.requestUsers(this.props.pageSize,this.props.currentPage)}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,this.props.isFetching?i.a.createElement(z.a,null):null,i.a.createElement(A,Object.assign({},this.props,{onPageChanged:this.onPageChanged,onFollow:this.onFollow,onUnfollow:this.onUnfollow})))}}]),n}(i.a.Component);n.default=Object(x.d)(Object(c.b)((function(e){return{users:q(e),pageSize:D(e),totalUsersCount:J(e),currentPage:V(e),isFetching:X(e),followingInProgress:H(e)}}),{requestUsers:f.c,getNewPage:f.b,setFollow:f.d,setUnfollow:f.e}))(W)}}]);
//# sourceMappingURL=3.37068a24.chunk.js.map