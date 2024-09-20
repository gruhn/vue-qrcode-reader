import{d as X,h as i,y as u,j as Y,A as Z,g as O,o as ee,c as te,k as g,O as ae,a4 as oe,a7 as ne,r as se}from"./framework.BwCxet3-.js";import{s as p,b as n,c as ie,d as re,k as ce}from"./camera.Y0ohPhsl.js";const ue=X({__name:"QrcodeStream",props:{constraints:{type:Object,default(){return{facingMode:"environment"}}},formats:{type:Array,default:()=>["qr_code"]},paused:{type:Boolean,default:!1},torch:{type:Boolean,default:!1},track:{type:Function}},emits:["detect","camera-on","camera-off","error"],setup(N,{emit:j}){const o=N,h=j,_=i(o.constraints),w=i(o.formats);u(()=>o.constraints,(t,e)=>{JSON.stringify(t)!==JSON.stringify(e)&&(_.value=t)},{deep:!0}),u(()=>o.formats,(t,e)=>{JSON.stringify(t)!==JSON.stringify(e)&&(w.value=t)},{deep:!0});const f=i(),v=i(),l=i(),m=i(!1),y=i(!1);Y(()=>{y.value=!0}),Z(()=>{p()});const M=O(()=>({torch:o.torch,constraints:_.value,shouldStream:y.value&&!o.paused}));u(M,async t=>{const e=l.value;n(e!==void 0,"cameraSettings watcher should never be triggered when component is not mounted. Thus video element should always be defined.");const a=f.value;n(a!==void 0,"cameraSettings watcher should never be triggered when component is not mounted. Thus canvas should always be defined.");const d=a.getContext("2d");if(n(d!==null,"if cavnas is defined, canvas 2d context should also be non-null"),t.shouldStream){p(),m.value=!1;try{const r=await ie(e,t);y.value?(m.value=!0,h("camera-on",r)):await p()}catch(r){h("error",r)}}else a.width=e.videoWidth,a.height=e.videoHeight,d.drawImage(e,0,0,e.videoWidth,e.videoHeight),p(),m.value=!1,h("camera-off")},{deep:!0}),u(w,async t=>{y.value&&await re(t)});const S=O(()=>M.value.shouldStream&&m.value);u(S,t=>{if(t){n(f.value!==void 0,"shouldScan watcher should only be triggered when component is mounted. Thus pause frame canvas is defined"),x(f.value),n(v.value!==void 0,"shouldScan watcher should only be triggered when component is mounted. Thus tracking canvas is defined"),x(v.value);const e=()=>o.track===void 0?500:40;n(l.value!==void 0,"shouldScan watcher should only be triggered when component is mounted. Thus video element is defined"),ce(l.value,{detectHandler:a=>h("detect",a),formats:w.value,locateHandler:J,minDelay:e()})}});const x=t=>{const e=t.getContext("2d");n(e!==null,"canvas 2d context should always be non-null"),e.clearRect(0,0,t.width,t.height)},J=t=>{const e=v.value;n(e!==void 0,"onLocate handler should only be called when component is mounted. Thus tracking canvas is always defined.");const a=l.value;if(n(a!==void 0,"onLocate handler should only be called when component is mounted. Thus video element is always defined."),t.length===0||o.track===void 0)x(e);else{const d=a.offsetWidth,r=a.offsetHeight,k=a.videoWidth,R=a.videoHeight,B=Math.max(d/k,r/R),T=k*B,C=R*B,D=T/k,E=C/R,F=(d-T)/2,z=(r-C)/2,H=({x:c,y:s})=>({x:Math.floor(c*D),y:Math.floor(s*E)}),L=({x:c,y:s})=>({x:Math.floor(c+F),y:Math.floor(s+z)}),I=t.map(c=>{const{boundingBox:s,cornerPoints:Q}=c,{x:U,y:V}=L(H({x:s.x,y:s.y})),{x:$,y:G}=H({x:s.width,y:s.height});return{...c,cornerPoints:Q.map(K=>L(H(K))),boundingBox:DOMRectReadOnly.fromRect({x:U,y:V,width:$,height:G})}});e.width=a.offsetWidth,e.height=a.offsetHeight;const P=e.getContext("2d");o.track(I,P)}},q={width:"100%",height:"100%",position:"relative","z-index":"0"},W={width:"100%",height:"100%",position:"absolute",top:"0",left:"0"},b={width:"100%",height:"100%","object-fit":"cover"},A=O(()=>S.value?b:{...b,visibility:"hidden",position:"absolute"});return(t,e)=>(ee(),te("div",{style:q},[g("video",{ref_key:"videoRef",ref:l,style:ae(A.value),autoplay:"",muted:"",playsinline:""},null,4),oe(g("canvas",{id:"qrcode-stream-pause-frame",ref_key:"pauseFrameRef",ref:f,style:b},null,512),[[ne,!S.value]]),g("canvas",{id:"qrcode-stream-tracking-layer",ref_key:"trackingLayerRef",ref:v,style:W},null,512),g("div",{style:W},[se(t.$slots,"default")])]))}});export{ue as _};
