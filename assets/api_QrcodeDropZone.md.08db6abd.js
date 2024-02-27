import{_ as s,a,b as n,c as e,d as o}from"./chunks/safari_32x32.e02d9c5e.js";import{_ as l,c as p,o as t,V as r}from"./chunks/framework.336b8923.js";const A=JSON.parse('{"title":"QrcodeDropZone","description":"","frontmatter":{},"headers":[],"relativePath":"api/QrcodeDropZone.md","filePath":"api/QrcodeDropZone.md","lastUpdated":1606471834000}'),c={name:"api/QrcodeDropZone.md"},i=r('<h1 id="qrcodedropzone" tabindex="-1">QrcodeDropZone <a class="header-anchor" href="#qrcodedropzone" aria-label="Permalink to &quot;QrcodeDropZone&quot;">​</a></h1><h2 id="browser-support" tabindex="-1">Browser Support <a class="header-anchor" href="#browser-support" aria-label="Permalink to &quot;Browser Support&quot;">​</a></h2><p>The newest API this component depend on is the <a href="https://caniuse.com/#feat=filereader" target="_blank" rel="noreferrer">FileReader API</a>. Vue Native is not supported (see <a href="https://github.com/gruhn/vue-qrcode-reader/issues/206" target="_blank" rel="noreferrer">#206</a>).</p><table><thead><tr><th style="text-align:center;"><img src="'+s+'" alt="Internet Explorer"></th><th style="text-align:center;"><img src="'+a+'" alt="Edge"></th><th style="text-align:center;"><img src="'+n+'" alt="Firefox"></th><th style="text-align:center;"><img src="'+e+'" alt="Chrome"></th><th style="text-align:center;"><img src="'+o+`" alt="Safari"></th></tr></thead><tbody><tr><td style="text-align:center;">10+</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td><td style="text-align:center;">Yes</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><h3 id="decode" tabindex="-1"><code>decode</code> <a class="header-anchor" href="#decode" aria-label="Permalink to &quot;\`decode\`&quot;">​</a></h3><ul><li><strong>Payload Type:</strong> <code>String</code></li></ul><p>You can drag-and-drop image files from your desktop or images embedded into other web pages anywhere in the area the component occupies. The images are directly scanned and positive results are indicated by the <code>decode</code> event. You can also drop multiple images at the same time (still one event per image though).</p><p>However, if no QR code is pictured or an error occurs, <code>decode</code> silently fails.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@decode</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">onDecode</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#676E95;font-style:italic;">&lt;!-- ... --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">onDecode</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">decodedString</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="detect" tabindex="-1"><code>detect</code> <a class="header-anchor" href="#detect" aria-label="Permalink to &quot;\`detect\`&quot;">​</a></h3><ul><li><strong>Payload Type:</strong> <code>Promise&lt;Object&gt;</code></li></ul><p>The <code>detect</code> event is basically a verbose version of <code>decode</code>. <code>detect</code> is emitted as soon as you drop an image. It carries a Promise which resolves when scanning the dropped image has finished. The Promise rejects in case of errors. Additionally, <code>detect</code> gives you the unprocessed raw image data and the coordinates of the QR code in the image.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@detect</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">onDetect</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#676E95;font-style:italic;">&lt;!-- ... --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#FFCB6B;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">async</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">onDetect</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">promise</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">imageData</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">// raw image data of image/frame</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">content</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">      </span><span style="color:#676E95;font-style:italic;">// decoded String or null</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">location</span><span style="color:#F07178;">      </span><span style="color:#676E95;font-style:italic;">// QR code coordinates or null</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">promise</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">content</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// decoded nothing</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">catch</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">error</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">error</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">DropImageFetchError</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// drag-and-dropped URL (probably just an &lt;img&gt; element) from different</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// domain without CORS header caused same-origin-policy violation</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">error</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">DropImageDecodeError</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// drag-and-dropped file is not of type image and can&#39;t be decoded</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// idk, open an issue ¯\\_(ツ)_/¯</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="dragover" tabindex="-1"><code>dragover</code> <a class="header-anchor" href="#dragover" aria-label="Permalink to &quot;\`dragover\`&quot;">​</a></h3><ul><li><strong>Payload Type:</strong> <code>Boolean</code></li></ul><p>When the user is dragging something over the the component you might want to apply some emphasizing styling. Do that by reacting to the <code>dragover</code> event.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@dragover</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">onDragOver</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ highlight: draggingOver }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">&lt;!-- ... --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">data</span><span style="color:#A6ACCD;"> () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    draggingOver</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">onDragOver</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">draggingOver</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">draggingOver</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">draggingOver</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This is a custom event not to be confused with <a href="https://developer.mozilla.org/en-US/docs/Web/Events/dragover" target="_blank" rel="noreferrer">native <code>dragover</code></a>. If you really need to listen for the DOM event instead, use <a href="https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components" target="_blank" rel="noreferrer">Vues <code>native</code> event modifier</a>.</p></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><blockquote><p>no props</p></blockquote><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><h3 id="default" tabindex="-1">default <a class="header-anchor" href="#default" aria-label="Permalink to &quot;default&quot;">​</a></h3><p>This component merely renders a wrapper <code>div</code>. Its height is defined by the content inside so it will have zero height if you don&#39;t provide any content.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">put anything here</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">qrcode-drop-zone</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div>`,28),y=[i];function F(d,D,h,g,m,u){return t(),p("div",null,y)}const v=l(c,[["render",F]]);export{A as __pageData,v as default};