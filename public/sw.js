if(!self.define){let e,s={};const t=(t,c)=>(t=new URL(t+".js",c).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let n={};const r=e=>t(e,a),f={module:{uri:a},exports:n,require:r};s[a]=Promise.all(c.map((e=>f[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-f52fd911"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"cc1b79f7493cc3c47f5c92d65708b1a7"},{url:"/_next/static/chunks/399-db10800ddcfc8a40.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/4bd1b696-704dc55da575ac8d.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/684-1810388b7cc1df67.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/864.a2b3384b3bfd0c4e.js",revision:"a2b3384b3bfd0c4e"},{url:"/_next/static/chunks/874-935bcbc5a3fa0090.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/app/%5Bowner%5D/%5Blistid%5D/page-bd2d7012eef375eb.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/app/%5Bowner%5D/page-7bbfb0ab3a84af1d.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/app/_not-found/page-d77a8343bf60c330.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/app/layout-cc3f9abcd99a8d3d.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/app/page-171ecd5ddfc00128.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/bc9e92e6-889196f7cc354185.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/framework-859199dea06580b0.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/main-8c8e52da08d11695.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/main-app-d76b0a434beacb0b.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/pages/_app-da15c11dea942c36.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/pages/_error-cc3f077a18ea1793.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-21b9f87c396e14e6.js",revision:"r7XfTX7RtlRsj2b7I99Ll"},{url:"/_next/static/css/5d3318377b42b372.css",revision:"5d3318377b42b372"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/_next/static/r7XfTX7RtlRsj2b7I99Ll/_buildManifest.js",revision:"56313a2fa41efe17a9286c47ac6aacba"},{url:"/_next/static/r7XfTX7RtlRsj2b7I99Ll/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/icon-192.png",revision:"d8c4d169469a22e11d8b35ae9367bd54"},{url:"/icons/icon-512.png",revision:"1ad27c711863c0ec79ccfc14e222594d"},{url:"/manifest.json",revision:"029e32a55b1dc8878a25f96047456ab3"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/firestore\.googleapis\.com\/.*/i,new e.NetworkFirst({cacheName:"firebase-firestore",plugins:[new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/^\/.*/i,new e.NetworkFirst({cacheName:"default-cache",plugins:[new e.ExpirationPlugin({maxEntries:200,maxAgeSeconds:604800})]}),"GET")}));
