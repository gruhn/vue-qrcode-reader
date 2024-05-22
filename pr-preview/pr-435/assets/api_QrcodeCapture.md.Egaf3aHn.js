import{_ as n,a as l,b as o,c as r,d as h}from"./chunks/safari_32x32.yJUh4Fxj.js";import{_ as p,D as d,c,k as e,a as t,I as a,R as i,o as k}from"./chunks/framework.2GglNXtw.js";const I=JSON.parse('{"title":"QrcodeCapture","description":"","frontmatter":{},"headers":[],"relativePath":"api/QrcodeCapture.md","filePath":"api/QrcodeCapture.md","lastUpdated":1708022193000}'),u={name:"api/QrcodeCapture.md"},g=i('<h1 id="qrcodecapture" tabindex="-1">QrcodeCapture <a class="header-anchor" href="#qrcodecapture" aria-label="Permalink to &quot;QrcodeCapture&quot;">​</a></h1><h2 id="browser-support" tabindex="-1">Browser Support <a class="header-anchor" href="#browser-support" aria-label="Permalink to &quot;Browser Support&quot;">​</a></h2><p>The newest API this component depend on is the <a href="https://caniuse.com/#feat=filereader" target="_blank" rel="noreferrer">FileReader API</a>. Vue Native is not supported (see <a href="https://github.com/gruhn/vue-qrcode-reader/issues/206" target="_blank" rel="noreferrer">#206</a>).</p><table><thead><tr><th style="text-align:center;"><img src="'+n+'" alt="Internet Explorer"></th><th style="text-align:center;"><img src="'+l+'" alt="Edge"></th><th style="text-align:center;"><img src="'+o+'" alt="Firefox"></th><th style="text-align:center;"><img src="'+r+'" alt="Chrome"></th><th style="text-align:center;"><img src="'+h+'" alt="Safari"></th></tr></thead><tbody><tr><td style="text-align:center;">10+</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes¹</td></tr></tbody></table><ol><li>It doesn&#39;t work in web apps added to home screen (PWA mode) on iOS prior to 11.3 (see <a href="https://stackoverflow.com/questions/46228218/how-to-access-camera-on-ios11-home-screen-web-app" target="_blank" rel="noreferrer">this StackOverflow question</a>)</li></ol><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><h3 id="detect" tabindex="-1"><code>detect</code> <a class="header-anchor" href="#detect" aria-label="Permalink to &quot;`detect`&quot;">​</a></h3><ul><li><strong>Payload Type:</strong> <code>DetectedBarcode[]</code></li></ul><p>The component renders to a simple file picker <code>input</code> element. Clicking opens a file dialog. On supporting mobile devices the camera is started to take a picture. The selected images are directly scanned and positive results are indicated by the <code>detect</code> event. You can also select multiple images at the same time (still one event per image though). If no QR code can be recognized an empty array is emitted.</p><p>The structure of the event payload is the same as for the <code>detect</code> event on <code>QrcodeStream</code>.</p>',10),m={id:"decode",tabindex:"-1"},E=e("code",null,"decode",-1),y=e("a",{class:"header-anchor",href:"#decode","aria-label":'Permalink to "`decode` <Badge text="removed in v5.0.0" type="danger" />"'},"​",-1),_=e("p",null,[t("Use "),e("code",null,"detect"),t(" instead. TODO: link old docs.")],-1),b=e("h2",{id:"props",tabindex:"-1"},[t("Props "),e("a",{class:"header-anchor",href:"#props","aria-label":'Permalink to "Props"'},"​")],-1),f={id:"formats",tabindex:"-1"},v=e("code",null,"formats",-1),F=e("a",{class:"header-anchor",href:"#formats","aria-label":'Permalink to "`formats` <Badge text="since v5.3.0" type="info" />"'},"​",-1),C=i(`<ul><li><strong>Payload Type:</strong> <code>BarcodeDetectorOptions[&#39;formats&#39;]</code></li><li><strong>Default:</strong> <code>[&#39;qr_code&#39;]</code></li></ul><p>The <code>formats</code> prop defines which barcode formats are detected. <a href="https://github.com/Sec-ant/barcode-detector?tab=readme-ov-file#barcode-detector" target="_blank" rel="noreferrer">Supported Formats</a>.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-capture</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :formats</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[&#39;qr_code&#39;, &#39;code_128&#39;]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-capture</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="disabled-capture-multiple" tabindex="-1"><code>disabled</code>, <code>capture</code>, <code>multiple</code>, ... <a class="header-anchor" href="#disabled-capture-multiple" aria-label="Permalink to &quot;\`disabled\`, \`capture\`, \`multiple\`, ...&quot;">​</a></h3><p>Technically, <code>QrcodeCapture</code> does not explicitly define any other props. But checkout the components template:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">input</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @change</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;onChangeInput&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;image&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    accept</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;image/*&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    capture</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;environment&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    multiple</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>Because the <code>input</code> element is the root element of the component and because Vue components accept <a href="https://vuejs.org/guide/components/attrs.html#fallthrough-attributes" target="_blank" rel="noreferrer">fallthrough attributes</a> you can make use of any valid <code>input</code> attribute:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-capture</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div><p>You can also override attributes. To remove attributes, set them to <code>null</code>:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qrcode-capture</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :capture</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;null&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><blockquote><p>no slots</p></blockquote>`,12);function q(x,B,T,P,S,A){const s=d("Badge");return k(),c("div",null,[g,e("h3",m,[E,t(),a(s,{text:"removed in v5.0.0",type:"danger"}),t(),y]),_,b,e("h3",f,[v,t(),a(s,{text:"since v5.3.0",type:"info"}),t(),F]),C])}const Q=p(u,[["render",q]]);export{I as __pageData,Q as default};
