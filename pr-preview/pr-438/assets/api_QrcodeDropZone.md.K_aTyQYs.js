import{_ as n,a as l,b as r,c as h,d as p}from"./chunks/safari_32x32.yJUh4Fxj.js";import{_ as o,D as d,c as k,k as s,a as e,I as t,R as a,o as c}from"./chunks/framework.rBy9wODq.js";const N=JSON.parse('{"title":"QrcodeDropZone","description":"","frontmatter":{},"headers":[],"relativePath":"api/QrcodeDropZone.md","filePath":"api/QrcodeDropZone.md","lastUpdated":1703524587000}'),g={name:"api/QrcodeDropZone.md"},E=a('<h1 id="qrcodedropzone" tabindex="-1">QrcodeDropZone <a class="header-anchor" href="#qrcodedropzone" aria-label="Permalink to &quot;QrcodeDropZone&quot;">​</a></h1><h2 id="browser-support" tabindex="-1">Browser Support <a class="header-anchor" href="#browser-support" aria-label="Permalink to &quot;Browser Support&quot;">​</a></h2><p>The newest API this component depend on is the <a href="https://caniuse.com/#feat=filereader" target="_blank" rel="noreferrer">FileReader API</a>. Vue Native is not supported (see <a href="https://github.com/gruhn/vue-qrcode-reader/issues/206" target="_blank" rel="noreferrer">#206</a>).</p><table><thead><tr><th style="text-align:center;"><img src="'+n+'" alt="Internet Explorer"></th><th style="text-align:center;"><img src="'+l+'" alt="Edge"></th><th style="text-align:center;"><img src="'+r+'" alt="Firefox"></th><th style="text-align:center;"><img src="'+h+'" alt="Chrome"></th><th style="text-align:center;"><img src="'+p+'" alt="Safari"></th></tr></thead><tbody><tr><td style="text-align:center;">10+</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><h3 id="detect" tabindex="-1"><code>detect</code> <a class="header-anchor" href="#detect" aria-label="Permalink to &quot;`detect`&quot;">​</a></h3><ul><li><strong>Payload Type:</strong> <code>DetectedBarcode[]</code></li></ul><p>You can drag-and-drop image files from your desktop or images embedded into other web pages anywhere in the area the component occupies. The images are directly scanned and positive results are indicated by the <code>detect</code> event. You can also drop multiple images at the same time (still one event per image though). If no QR code can be recognized an empty array is emitted.</p><p>The structure of the event payload is the same as for the <code>detect</code> event on <code>QrcodeStream</code>.</p>',9),y={id:"error",tabindex:"-1"},u=s("code",null,"error",-1),m=s("a",{class:"header-anchor",href:"#error","aria-label":'Permalink to "`error` <Badge text="new in v5.0.0" type="info" />"'},"​",-1),_=a(`<p>Error events are emitted when a dropped url can&#39;t be fetched due to CORS or a dropped file has an unsupported file type.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> @detect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;onDetect&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- ... --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">methods</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  onError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (error) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (error.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;DropImageFetchError&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // drag-and-dropped URL (probably just an &lt;img&gt; element) from different</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // domain without CORS header caused same-origin-policy violation</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (error.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;DropImageDecodeError&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // drag-and-dropped file is not of type image and can&#39;t be decoded</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // idk, open an issue ¯\\_(ツ)_/¯</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,3),v={id:"formats",tabindex:"-1"},b=s("code",null,"formats",-1),f=s("a",{class:"header-anchor",href:"#formats","aria-label":'Permalink to "`formats` <Badge text="since v5.3.0" type="info" />"'},"​",-1),D=a(`<ul><li><strong>Payload Type:</strong> <code>BarcodeDetectorOptions[&#39;formats&#39;]</code></li><li><strong>Default:</strong> <code>[&#39;qr_code&#39;]</code></li></ul><p>The <code>formats</code> prop defines which barcode formats are detected. <a href="https://github.com/Sec-ant/barcode-detector?tab=readme-ov-file#barcode-detector" target="_blank" rel="noreferrer">Supported Formats</a>.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :formats</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[&#39;qr_code&#39;, &#39;code_128&#39;]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="dragover" tabindex="-1"><code>dragover</code> <a class="header-anchor" href="#dragover" aria-label="Permalink to &quot;\`dragover\`&quot;">​</a></h3><ul><li><strong>Payload Type:</strong> <code>Boolean</code></li></ul><p>When the user is dragging something over the the component you might want to apply some emphasizing styling. Do that by reacting to the <code>dragover</code> event.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> @dragover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;onDragOver&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{ highlight: draggingOver }&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    &lt;!-- ... --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    draggingOver: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">methods</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  onDragOver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (draggingOver) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.draggingOver </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> draggingOver</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This is a custom event not to be confused with <a href="https://developer.mozilla.org/en-US/docs/Web/Events/dragover" target="_blank" rel="noreferrer">native <code>dragover</code></a>. If you really need to listen for the DOM event instead, use <a href="https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components" target="_blank" rel="noreferrer">Vues <code>native</code> event modifier</a>.</p></div>`,9),F={id:"decode",tabindex:"-1"},A=s("code",null,"decode",-1),C=s("a",{class:"header-anchor",href:"#decode","aria-label":'Permalink to "`decode` <Badge text="removed in v5.0.0" type="danger" />"'},"​",-1),q=a(`<p>Use <code>detect</code> instead.</p><p><a href="https://github.com/gruhn/vue-qrcode-reader/blob/781484fccd186e8e30c6191f85beec3bd174ef59/docs/api/QrcodeStream.md" target="_blank" rel="noreferrer">docs for v4.0.0</a></p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><blockquote><p>no props</p></blockquote><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><h3 id="default" tabindex="-1">default <a class="header-anchor" href="#default" aria-label="Permalink to &quot;default&quot;">​</a></h3><p>This component merely renders a wrapper <code>div</code>. Its height is defined by the content inside so it will have zero height if you don&#39;t provide any content.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;put anything here&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-drop-zone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div>`,8);function T(x,B,P,S,I,w){const i=d("Badge");return c(),k("div",null,[E,s("h3",y,[u,e(),t(i,{text:"new in v5.0.0",type:"info"}),e(),m]),_,s("h3",v,[b,e(),t(i,{text:"since v5.3.0",type:"info"}),e(),f]),D,s("h3",F,[A,e(),t(i,{text:"removed in v5.0.0",type:"danger"}),e(),C]),q])}const O=o(g,[["render",T]]);export{N as __pageData,O as default};
