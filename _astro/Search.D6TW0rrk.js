import{r as l}from"./index.DLkBFFtG.js";var d={exports:{}},u={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m;function j(){if(m)return u;m=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(i,t,s){var r=null;if(s!==void 0&&(r=""+s),t.key!==void 0&&(r=""+t.key),"key"in t){s={};for(var c in t)c!=="key"&&(s[c]=t[c])}else s=t;return t=s.ref,{$$typeof:a,type:i,key:r,ref:t!==void 0?t:null,props:s}}return u.Fragment=e,u.jsx=n,u.jsxs=n,u}var h;function R(){return h||(h=1,d.exports=j()),d.exports}var o=R();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),p=(...a)=>a.filter((e,n,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=l.forwardRef(({color:a="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:t="",children:s,iconNode:r,...c},x)=>l.createElement("svg",{ref:x,...E,width:e,height:e,stroke:a,strokeWidth:i?Number(n)*24/Number(e):n,className:p("lucide",t),...c},[...r.map(([f,v])=>l.createElement(f,v)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(a,e)=>{const n=l.forwardRef(({className:i,...t},s)=>l.createElement(w,{ref:s,iconNode:e,className:p(`lucide-${k(a)}`,i),...t}));return n.displayName=`${a}`,n};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=C("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);function g({tools:a}){const[e,n]=l.useState(""),i=l.useId(),t=r=>r.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),s=e.trim()?a.filter(r=>t(`${r.name} ${r.description}`).includes(t(e.trim()))):[];return o.jsxs("div",{className:"search-wrap",children:[o.jsx("label",{className:"sr-only",htmlFor:i,children:"Buscar calculadoras"}),o.jsxs("div",{className:"search-field",children:[o.jsx($,{size:21,"aria-hidden":"true"}),o.jsx("input",{id:i,type:"search",placeholder:"¿Qué quieres calcular?",value:e,onChange:r=>n(r.target.value),autoComplete:"off"}),o.jsx("span",{className:"search-label",children:"Buscar"})]}),e.trim()&&o.jsx("div",{className:"search-results","aria-live":"polite",children:s.length?s.map(r=>o.jsxs("a",{href:`/herramientas/${r.slug}/`,children:[o.jsx("strong",{children:r.name}),o.jsx("span",{children:r.description})]},r.slug)):o.jsxs("p",{children:["No hemos encontrado herramientas para «",e,"»."]})})]})}export{g as default};
