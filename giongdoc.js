/* Giọng cô giáo: chuẩn hoá cách đọc tiếng Việt + chọn giọng đọc.
   Thứ tự ưu tiên: giọng Google Cloud (nếu đã cấu hình trong giongdoc-config.js) → giọng nữ tiếng Việt tốt nhất có trên máy. */
{
const U=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];
function read3(n,full){const h=Math.floor(n/100),t=Math.floor(n%100/10),u=n%10,s=[];
 if(h>0||full)s.push(U[h]+" trăm");
 if(t===0){if(u>0){if(h>0||full)s.push("linh");s.push(U[u])}}
 else if(t===1){s.push("mười");if(u===5)s.push("lăm");else if(u>0)s.push(U[u])}
 else{s.push(U[t]+" mươi");if(u===1)s.push("mốt");else if(u===4)s.push("tư");else if(u===5)s.push("lăm");else if(u>0)s.push(U[u])}
 return s.join(" ")}
function readInt(str){str=String(str).replace(/^0+(?=\d)/,"");if(str.length>12)return str.split("").map(d=>U[+d]).join(" ");let n=+str;if(n===0)return"không";
 const G=["","nghìn","triệu","tỉ"],parts=[];let k=0;while(n>0){parts.push(n%1000);n=Math.floor(n/1000);k++}
 const out=[];for(let i=parts.length-1;i>=0;i--){const v=parts[i];if(v===0)continue;const full=i<parts.length-1;out.push(read3(v,full)+(G[i]?" "+G[i]:""))}return out.join(" ")}
function readDec(s){const[a,b]=s.split(",");if(b==null)return readInt(a);const z=b.match(/^0*/)[0].length,rest=b.slice(z);return readInt(a)+" phẩy "+[...Array(z)].map(()=>"không").join(" ")+(rest?(z?" ":"")+readInt(rest):"")}
function denom(d){return d==="4"?"tư":readInt(d)}
const AM={b:"bờ",c:"cờ",d:"dờ",đ:"đờ",g:"gờ",h:"hờ",k:"ca",l:"lờ",m:"mờ",n:"nờ",p:"pờ",q:"quy",r:"rờ",s:"sờ",t:"tờ",v:"vờ",x:"xờ",ch:"chờ",gh:"gờ kép",gi:"di",kh:"khờ",ng:"ngờ",ngh:"ngờ kép",nh:"nhờ",ph:"phờ",qu:"quờ",th:"thờ",tr:"trờ",ă:"á",â:"ớ",y:"i dài"};
const ROMAN={I:"i",V:"vê",X:"ích",L:"e lờ",C:"xê",D:"đê",M:"em mờ"};
const romanVal=s=>{const v={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};let t=0;for(let i=0;i<s.length;i++){const a=v[s[i]],b=v[s[i+1]]||0;t+=a<b?-a:a}return t};
const UNITS=[["km/giờ","ki lô mét trên giờ"],["cm²","xăng ti mét vuông"],["dm²","đề xi mét vuông"],["mm²","mi li mét vuông"],["m²","mét vuông"],["cm³","xăng ti mét khối"],["dm³","đề xi mét khối"],["m³","mét khối"],["°C","độ xê"],["km","ki lô mét"],["cm","xăng ti mét"],["dm","đề xi mét"],["mm","mi li mét"],["kg","ki lô gam"],["ml","mi li lít"]];
const SHORT=[["m","mét"],["g","gam"],["l","lít"]];
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
function normalize(text,dict){let t=" "+String(text)+" ";
 const D=Object.assign({},BV.voice&&BV.voice.dict||{},dict||{});
 for(const k of Object.keys(D).sort((a,b)=>b.length-a.length)){if(!k)continue;t=t.replace(new RegExp(esc(k),"gi"),D[k])}
 t=t.replace(/\((\.|\?|!|,|:)\)/g,"");
 t=t.replace(/“([^”]{1,4})”/g,(m,x)=>{const l=x.toLowerCase();return AM[l]&&!/\s/.test(x)?" "+AM[l]+" ":" "+x+" "});
 t=t.replace(/“([^”]+)”/g,(m,x)=>", "+x.replace(/[.!?:;,]+$/,"")+", ");
 t=t.replace(/[“”"«»]/g," ");
 const laMa=/La Mã/i.test(t);
 t=t.replace(/\b(thế kỉ|thế kỷ)\s+([IVXLCDM]+)\b/g,(m,a,r)=>a+" "+readInt(String(romanVal(r))));
 t=t.replace(/(^|[\s,.;:])([IVXLCDM]{1,6})(?=[\s,.;:?!]|$)/g,(m,p,r)=>{if(!laMa&&r.length<2)return m;return p+r.split("").map(c=>ROMAN[c]).join(" ")});
 t=t.replace(/(\d{1,3})(?:\.(\d{3}))+(?!\d|,)/g,m=>m.replace(/\./g,""));
 t=t.replace(/\d{1,3}(?:[   ]\d{3})+(?![\d])/g,m=>m.replace(/[   ]/g,""));
 t=t.replace(/(\d)([A-ZĐa-zđ])/g,(m,a,b)=>a+" "+b);
 t=t.replace(/°(?!C)/g," độ ");
 for(const[u,w]of UNITS)t=t.replace(new RegExp(esc(u)+"(?![a-zA-Zà-ỹ²³])","g")," "+w+" ");
 for(const[u,w]of SHORT)t=t.replace(new RegExp("(\\d|…|\\?)\\s*"+u+"(?![a-zA-Zà-ỹ²³])","g"),"$1 "+w+" ");
 t=t.replace(/(\d+)\s+(\d+)\/(\d+)/g,(m,a,b,c)=>readInt(a)+" và "+readInt(b)+" phần "+denom(c));
 t=t.replace(/(\d+)\/(\d+)/g,(m,a,b)=>readInt(a)+" phần "+denom(b));
 t=t.replace(/(\d+(?:,\d+)?)\s*%/g,(m,a)=>readDec(a)+" phần trăm");
 t=t.replace(/(\d)\s*×\s*(?=[\d…?(])/g,"$1 nhân ").replace(/\s×\s/g," nhân ");
 t=t.replace(/([\d…?)])\s+:\s+(?=[\d…?(])/g,"$1 chia ");
 t=t.replace(/\s[−-]\s/g," trừ ").replace(/(\d)\s*−\s*(\d)/g,"$1 trừ $2");
 t=t.replace(/\s\+\s/g," cộng ");
 t=t.replace(/\s=\s/g," bằng ");
 t=t.replace(/\s>\s/g," lớn hơn ").replace(/\s<\s/g," bé hơn ");
 t=t.replace(/(^|\s)>(\s|$)/g," lớn hơn ").replace(/(^|\s)<(\s|$)/g," bé hơn ").replace(/(^|\s)=(\s|$)/g," bằng ");
 t=t.replace(/(^|\s)\?(?=\s+(bằng|cộng|trừ|nhân|chia|\d))/g," bao nhiêu").replace(/(bằng|cộng|trừ|nhân|chia)\s+\?/g,"$1 bao nhiêu");
 t=t.replace(/([a-zà-ỹđ])(…|\.{3})(?=[\s,.:;!?]|$)/gi,"$1, ");
 t=t.replace(/…(?=[a-zà-ỹđ])/gi," chỗ trống, ").replace(/…|\.{3}/g," chỗ trống ").replace(/□/g," ô trống ");
 t=t.replace(/(\d+,\d+)/g,m=>readDec(m)).replace(/\d+/g,m=>readInt(m));
 t=t.replace(/([a-zà-ỹđ])\/([a-zà-ỹđ])/gi,"$1, $2");
 t=t.replace(/\s[–—]\s/g,", ").replace(/\s\/\s/g,", ").replace(/[·•]/g,", ").replace(/[→←↻▶✓]/g," ");
 t=t.replace(/([a-zà-ỹđ])-([a-zà-ỹđ])/gi,"$1 $2").replace(/([a-zà-ỹđ])-([a-zà-ỹđ])/gi,"$1 $2");
 t=t.replace(/\s+([,.;:?!])/g,"$1").replace(/,\s*([,.;:?!])/g,"$1").replace(/([:;])\s*,/g,"$1").replace(/[,\s]+$/,"").replace(/^[,\s]+/,"").replace(/\s{2,}/g," ").trim();
 return t}

/* ---------- giọng trên máy ---------- */
const store={get(){try{return JSON.parse(localStorage.getItem("bevuihoc_voice")||"{}")}catch(e){return{}}},set(v){try{localStorage.setItem("bevuihoc_voice",JSON.stringify(v))}catch(e){}}};
const cfg=Object.assign({rate:.9,engine:"auto",voice:"",dict:{}},store.get());
const has="speechSynthesis" in window;
const FEMALE=/hoaimy|hoài my|linh|lan|my|chi|mai|nữ|female|google tiếng việt|vi-vn-standard-a|vi-vn-wavenet-a/i,MALE=/namminh|nam minh|an\b|male|nam\b/i;
function scoreVoice(v){let s=0;const n=v.name;if(/^vi/i.test(v.lang))s+=100;else return-1;if(/hoaimy/i.test(n))s+=60;if(/natural|online|neural|enhanced|premium/i.test(n))s+=30;if(/google/i.test(n))s+=20;if(/linh/i.test(n))s+=15;if(FEMALE.test(n))s+=10;if(MALE.test(n))s-=40;return s}
function viVoices(){if(!has)return[];return speechSynthesis.getVoices().filter(v=>/^vi/i.test(v.lang)).sort((a,b)=>scoreVoice(b)-scoreVoice(a))}
function pickVoice(){const vs=viVoices();return vs.find(v=>v.name===cfg.voice)||vs[0]||null}
if(has)try{speechSynthesis.onvoiceschanged=()=>{BV.voice&&BV.voice.onchange&&BV.voice.onchange()}}catch(e){}
function splitText(t){const out=[];let cur="";for(const part of t.split(/(?<=[.!?;:])\s+/)){if((cur+" "+part).length>180&&cur){out.push(cur);cur=part}else cur=cur?cur+" "+part:part}if(cur)out.push(cur);return out}
function speakLocal(t,rate){return new Promise(res=>{if(!has)return res(false);try{speechSynthesis.cancel();const v=pickVoice();const parts=splitText(t);let i=0;const next=()=>{if(i>=parts.length)return res(true);const u=new SpeechSynthesisUtterance(parts[i++]);u.lang="vi-VN";if(v)u.voice=v;u.rate=rate;u.pitch=1.05;u.onend=next;u.onerror=()=>res(false);speechSynthesis.speak(u)};next()}catch(e){res(false)}})}

/* ---------- giọng Google Cloud (tuỳ chọn) ---------- */
const TTS=()=>window.BV_TTS&&window.BV_TTS.apiKey?window.BV_TTS:null;
let audio=null,cloudVoices=null,mem=new Map(),seq=0;
const h32=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(36)+s.length.toString(36)};
async function listCloud(){if(cloudVoices)return cloudVoices;const c=TTS();try{const r=JSON.parse(localStorage.getItem("bevuihoc_cvoices")||"null");if(r&&r.t>Date.now()-7*864e5){cloudVoices=r.v;return cloudVoices}}catch(e){}
 const res=await fetch(`https://texttospeech.googleapis.com/v1/voices?languageCode=vi-VN&key=${encodeURIComponent(c.apiKey)}`);if(!res.ok)throw new Error("voices "+res.status);const j=await res.json();
 cloudVoices=(j.voices||[]).filter(v=>v.languageCodes.some(l=>/^vi/i.test(l))).map(v=>({name:v.name,g:v.ssmlGender}));try{localStorage.setItem("bevuihoc_cvoices",JSON.stringify({t:Date.now(),v:cloudVoices}))}catch(e){}return cloudVoices}
function rankCloud(vs){const tier=n=>/Chirp3-HD/i.test(n)?4:/Chirp/i.test(n)?3.5:/Neural2/i.test(n)?3:/Wavenet/i.test(n)?2:1;return vs.slice().sort((a,b)=>(tier(b.name)+(b.g==="FEMALE"?1:0))-(tier(a.name)+(a.g==="FEMALE"?1:0)))}
async function cloudVoiceName(){const c=TTS();if(cfg.cvoice)return cfg.cvoice;if(c.voice)return c.voice;const vs=rankCloud(await listCloud());const f=vs.find(v=>v.g==="FEMALE")||vs[0];return f&&f.name}
async function synth(text,rate){const c=TTS(),name=await cloudVoiceName();const key=h32(name+"|"+rate+"|"+text);
 if(mem.has(key))return mem.get(key);
 let b64=null;try{const cache=await caches.open("bevuihoc-tts");const hit=await cache.match("/tts/"+key);if(hit){b64=await hit.text()}}catch(e){}
 if(!b64&&window.CL&&CL.ready){try{const d=await CL.db.get("tts/"+key);if(d&&d.a)b64=d.a}catch(e){}}
 if(!b64){const body={input:{text},voice:{languageCode:"vi-VN",name},audioConfig:{audioEncoding:"MP3",speakingRate:rate}};
  let res=await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(c.apiKey)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  if(res.status===400){delete body.audioConfig.speakingRate;res=await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(c.apiKey)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})}
  if(!res.ok)throw new Error("Google TTS "+res.status);b64=(await res.json()).audioContent;
  try{const cache=await caches.open("bevuihoc-tts");await cache.put("/tts/"+key,new Response(b64))}catch(e){}
  if(window.CL&&CL.ready&&b64.length<700000){CL.db.create("tts/"+key,{a:b64,v:name,t:Date.now()}).catch(()=>{})}}
 mem.set(key,b64);if(mem.size>80)mem.delete(mem.keys().next().value);return b64}
function play(b64){return new Promise(res=>{try{if(audio){audio.pause()}audio=new Audio("data:audio/mp3;base64,"+b64);audio.onended=()=>res(true);audio.onerror=()=>res(false);const p=audio.play();if(p&&p.catch)p.catch(()=>res(false))}catch(e){res(false)}})}

/* ---------- API dùng trong trang ---------- */
const V={cfg,normalize,readInt,readDec,dict:cfg.dict||{},classDict:{},lastEngine:"",
 save(){cfg.dict=V.localDict();store.set(cfg)},
 localDict(){return cfg.dict||{}},
 get dictAll(){return Object.assign({},V.classDict,cfg.dict||{})},
 voices:viVoices,current:()=>{const v=pickVoice();return v?v.name:""},
 cloudOn:()=>!!TTS()&&cfg.engine!=="local",
 listCloud:async()=>rankCloud(await listCloud()),
 stop(){seq++;try{speechSynthesis.cancel()}catch(e){}if(audio)try{audio.pause()}catch(e){}},
 async speak(text,opt={}){const my=++seq;V.dict=V.dictAll;const t=normalize(text);if(!t)return;const rate=opt.rate||cfg.rate;
  if(V.cloudOn()){try{V.stop();seq=my;const parts=splitText(t);for(const p of parts){if(seq!==my)return;const b=await synth(p,rate);if(seq!==my)return;await play(b)}V.lastEngine="cloud";return}catch(e){V.lastError=String(e.message||e)}}
  if(seq!==my)return;V.lastEngine="local";await speakLocal(t,rate)},
 available:()=>has||!!TTS()};
BV.voice=V;
}
