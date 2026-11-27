{
const {R,pick,shuffle}=BV.H;
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- mỗi lớp một kiểu học ---------- */
const GM={
1:{name:"Vườn ươm",color:"#2f9e44",nq:6,retry:true,speak:true,timer:0,combo:false,hint:false,inRate:0,exam:{n:10,min:0},
 places:["Hạt Mầm","Chồi Non","Luống Rau","Cây Cam","Vườn Hoa","Cây Cổ Thụ"],
 tag:"Bé gieo hạt và tưới cây bằng những câu trả lời đúng. Mỗi chặng xong là một cây ra hoa.",
 rules:["6 câu mỗi lượt","Sai được thử lại 1 lần","Cú Bông đọc câu hỏi","Nhiều câu có hình","Không tính giờ"]},
2:{name:"Đảo kho báu",color:"#1c7ed6",nq:8,retry:false,speak:true,timer:0,combo:false,hint:false,inRate:.35,exam:{n:10,min:0},
 places:["Bến Cảng","Bãi Cát Vàng","Rừng Dừa","Hang Đá","Thác Nước","Rương Báu"],
 tag:"Bé đi qua từng hòn đảo để tìm rương báu. Mỗi đảo vượt qua là mở được một rương.",
 rules:["8 câu mỗi lượt","Có câu tự điền và xếp câu","Xem đồng hồ","Có lời giải khi sai"]},
3:{name:"Đường đua tốc độ",color:"#e8590c",nq:10,retry:false,speak:false,timer:30,combo:true,hint:false,inRate:.4,exam:{n:10,min:15},
 places:["Vạch Xuất Phát","Khúc Cua","Đường Hầm","Dốc Cao","Cầu Vượt","Vạch Đích"],
 tag:"Bé chạy đua với đồng hồ. Trả lời đúng liên tiếp để có chuỗi thưởng.",
 rules:["10 câu mỗi lượt","30 giây mỗi câu","Đúng liền 3 câu được thêm sao","Có câu tự điền"]},
4:{name:"Phi thuyền nhiệm vụ",color:"#6741d9",nq:10,retry:false,speak:false,timer:0,combo:false,hint:true,inRate:.45,exam:{n:10,min:20},
 places:["Bệ Phóng","Mặt Trăng","Sao Hỏa","Vành Đai","Sao Mộc","Sao Thổ"],
 tag:"Mỗi nhiệm vụ đi từ dễ đến khó theo 3 mức. Bé có thể dùng sao để xin gợi ý.",
 rules:["Câu dễ trước, khó sau","Gợi ý 50/50 đổi 1 sao","Lời giải sau mỗi câu sai"]},
5:{name:"Phòng luyện thi",color:"#0c8599",nq:10,retry:false,speak:false,timer:0,combo:false,hint:true,inRate:.5,exam:{n:20,min:30},
 places:["Khởi Động","Nền Tảng","Tăng Tốc","Thử Thách","Bứt Phá","Về Đích"],
 tag:"Luyện theo chuyên đề, rồi làm đề thi thử 20 câu trong 30 phút như thi thật.",
 rules:["Luyện theo chuyên đề","Đề thi thử 20 câu, 30 phút","Chấm và chữa bài sau khi nộp","Gợi ý 50/50"]}};
const PASS=.6;

/* ---------- biểu tượng mỗi lớp ---------- */
function icon(g,st){const c=st===0?"#aab2cc":GM[g].color,w="#fff";
 if(g===1)return`<svg viewBox="0 0 64 64"><path d="M16 40h32l-4 18H20z" fill="${st===0?"#aab2cc":"#c8733a"}"/><rect x="13" y="36" width="38" height="7" rx="3" fill="${st===0?"#98a0ba":"#a85d2c"}"/>${st>0?`<path d="M32 36V18" stroke="#2f9e44" stroke-width="4"/><path d="M32 26c-8 0-12-5-12-10 7 0 12 4 12 10zM32 22c6 0 10-4 10-9-6 0-10 4-10 9z" fill="#51cf66"/>`:""}${st===2?`<g fill="#ff6b9a"><circle cx="32" cy="9" r="5"/><circle cx="26" cy="14" r="5"/><circle cx="38" cy="14" r="5"/></g><circle cx="32" cy="13" r="3.5" fill="#ffd23f"/>`:""}</svg>`;
 if(g===2)return`<svg viewBox="0 0 64 64">${st===2?`<path d="M10 28 L14 12 H50 L54 28Z" fill="#a85d2c"/><g fill="#ffd23f"><circle cx="24" cy="28" r="6"/><circle cx="34" cy="26" r="6"/><circle cx="43" cy="29" r="5"/></g>`:`<path d="M10 30 Q32 10 54 30Z" fill="${st===0?"#98a0ba":"#a85d2c"}"/>`}<rect x="10" y="30" width="44" height="24" rx="4" fill="${st===0?"#aab2cc":"#c8733a"}"/><rect x="10" y="36" width="44" height="5" fill="${st===0?"#98a0ba":"#ffd23f"}"/><rect x="28" y="33" width="8" height="11" rx="2" fill="${st===0?"#7d86a3":"#f5b301"}"/></svg>`;
 if(g===3)return`<svg viewBox="0 0 64 64"><path d="M16 6v54" stroke="${st===0?"#7d86a3":"#1d2a5c"}" stroke-width="4" stroke-linecap="round"/>${st===2?`<g><rect x="18" y="8" width="36" height="24" fill="#fff" stroke="#1d2a5c" stroke-width="2"/>${[0,1,2,3,4,5].map(i=>[0,1,2,3].map(j=>(i+j)%2?"":`<rect x="${18+i*6}" y="${8+j*6}" width="6" height="6" fill="#1d2a5c"/>`).join("")).join("")}</g>`:`<path d="M18 8h34l-8 12 8 12H18z" fill="${c}"/>`}</svg>`;
 if(g===4)return`<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="18" fill="${c}"/><path d="M14 30c10 4 26 4 36 0" stroke="${w}" stroke-opacity=".35" stroke-width="4" fill="none"/>${st>0?`<ellipse cx="32" cy="34" rx="29" ry="8" fill="none" stroke="#ffd23f" stroke-width="3" transform="rotate(-15 32 34)"/>`:""}${st===2?`<path d="M44 6l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#ffd23f"/>`:""}</svg>`;
 return`<svg viewBox="0 0 64 64"><rect x="14" y="6" width="36" height="46" rx="5" fill="${st===0?"#aab2cc":"#fff"}" stroke="${c}" stroke-width="3"/><path d="M21 18h22M21 26h22M21 34h14" stroke="${c}" stroke-width="3" stroke-linecap="round"/>${st===2?`<circle cx="44" cy="46" r="12" fill="#ffd23f" stroke="#e0a100" stroke-width="2"/><path d="M38 46l4 4 8-8" stroke="#1d2a5c" stroke-width="3" fill="none" stroke-linecap="round"/>`:""}</svg>`}

/* ---------- lưu trữ ---------- */
const KEY="bevuihoc_v2";
let S={cur:"",players:{},timer:true,sound:true,speak:true};
try{const r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}sync()};
const newP=g=>({grade:g||1,stars:0,earned:0,owned:[],best:{},st:{},lv:{},rv:[],tests:[]});
const P=()=>S.players[S.cur]||null;
const nmOf=k=>{const p=S.players[k];return p&&p.cls?p.cls.name:k};const nm=()=>nmOf(S.cur);
const bk=(g,s,sub)=>`${g}-${sub}-${s}`;
const best=(p,g,s,sub)=>p&&p.best[bk(g,s,sub)]!=null?p.best[bk(g,s,sub)]:-1;
const qlen=(g,sub)=>sub==="v"?Math.min(GM[g].nq,8):GM[g].nq;
const passN=(g,sub)=>Math.ceil(qlen(g,sub)*PASS);
const stageDone=(p,g,s)=>best(p,g,s,"t")>=passN(g,"t")&&best(p,g,s,"v")>=passN(g,"v");
const unlocked=(p,g,s)=>s===0||stageDone(p,g,s-1);
const add=(o,k,ok)=>{const v=o[k]||[0,0];v[1]++;if(ok)v[0]++;o[k]=v};

/* ---------- âm thanh, giọng đọc ---------- */
let ac=null;
function beep(ok){if(!S.sound)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();(ok?[660,880]:[300,220]).forEach((fr,i)=>{const o=ac.createOscillator(),gn=ac.createGain(),t=ac.currentTime+i*.12;o.frequency.value=fr;o.type="triangle";gn.gain.setValueAtTime(.16,t);gn.gain.exponentialRampToValueAtTime(.001,t+.25);o.connect(gn).connect(ac.destination);o.start(t);o.stop(t+.3)})}catch(e){}}
const canSpeak=!!(BV.voice&&BV.voice.available());
function speak(t){if(BV.voice)BV.voice.speak(t)}

/* ---------- hình minh hoạ ---------- */
const ITEM={
 apple:'<circle cx="0" cy="3" r="14" fill="#e8453c"/><path d="M0-10q1-8 8-9" stroke="#6b3e1e" stroke-width="2.5" fill="none"/><ellipse cx="7" cy="-12" rx="6" ry="3" fill="#2f9e44" transform="rotate(-25 7 -12)"/><ellipse cx="-6" cy="-2" rx="3" ry="5" fill="#fff" opacity=".45"/>',
 star:'<path d="M0-15l4.4 9 9.9 1.2-7.3 6.9 1.9 9.8L0 7.1-8.9 11.9-7 2.1l-7.3-6.9 9.9-1.2z" fill="#f5b301" stroke="#c98a00" stroke-width="1.5"/>',
 fish:'<path d="M10 0l12-9v18z" fill="#f08c00"/><ellipse cx="-2" cy="0" rx="15" ry="10" fill="#ff922b"/><circle cx="-9" cy="-2" r="2.5" fill="#1d2a5c"/>',
 flower:'<g fill="#ff6b9a"><circle cx="0" cy="-8" r="7"/><circle cx="8" cy="-1" r="7"/><circle cx="5" cy="8" r="7"/><circle cx="-5" cy="8" r="7"/><circle cx="-8" cy="-1" r="7"/></g><circle r="5" fill="#ffd23f"/>',
 balloon:'<path d="M0 12q-3 6 2 12" stroke="#53608f" stroke-width="1.5" fill="none"/><ellipse cx="0" cy="-2" rx="11" ry="14" fill="#4dabf7"/><path d="M-2 12h4l-2-3z" fill="#4dabf7"/><ellipse cx="-4" cy="-7" rx="3" ry="5" fill="#fff" opacity=".5"/>'};
const IN="#1d2a5c";
function grid(item,n,x0,y0,cols,cross=0){let s="";for(let i=0;i<n;i++){const x=x0+(i%cols)*44+22,y=y0+Math.floor(i/cols)*44+22;s+=`<g transform="translate(${x} ${y})">${ITEM[item]}${i>=n-cross?'<path d="M-15-15L15 15M15-15L-15 15" stroke="#e0473a" stroke-width="4" stroke-linecap="round"/>':""}</g>`}return s}
const T=(x,y,t,a="middle",sz=16)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${sz}" font-weight="800" font-family="Nunito,sans-serif" fill="currentColor">${esc(t)}</text>`;
function shapeSvg(k,cx,cy,r,col){
 if(k==="circle")return`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}"/>`;
 if(k==="square")return`<rect x="${cx-r}" y="${cy-r}" width="${2*r}" height="${2*r}" rx="3" fill="${col}"/>`;
 if(k==="rect")return`<rect x="${cx-r*1.4}" y="${cy-r*.75}" width="${2.8*r}" height="${1.5*r}" rx="3" fill="${col}"/>`;
 return`<path d="M${cx} ${cy-r}L${cx+r*1.1} ${cy+r*.8}H${cx-r*1.1}Z" fill="${col}"/>`}
function pic(p){if(!p)return"";const k=p.k;if(BV.PK&&BV.PK[k])return BV.PK[k](p);
 if(k==="count"){const cols=Math.min(p.n,5),rows=Math.ceil(p.n/cols);return`<svg viewBox="0 0 ${cols*44+8} ${rows*44+8}">${grid(p.item,p.n,4,4,cols)}</svg>`}
 if(k==="add"){const ca=Math.min(p.a,5)||1,cb=Math.min(p.b,5)||1,ra=Math.ceil(p.a/ca),rb=Math.ceil(p.b/cb),h=Math.max(ra,rb,1)*44+8,w=ca*44+cb*44+60;
  return`<svg viewBox="0 0 ${w} ${h}">${grid(p.item,p.a,4,4,ca)}${T(ca*44+30,h/2+10,"+","middle",34)}${grid(p.item,p.b,ca*44+56,4,cb)}</svg>`}
 if(k==="sub"){const cols=Math.min(p.a,5),rows=Math.ceil(p.a/cols);return`<svg viewBox="0 0 ${cols*44+8} ${rows*44+8}">${grid(p.item,p.a,4,4,cols,p.b)}</svg>`}
 if(k==="shape")return`<svg viewBox="0 0 200 150">${shapeSvg(p.s,100,75,52,"#4dabf7")}</svg>`;
 if(k==="shapes"){const cols=["#ff6b5b","#4dabf7","#51cf66","#fcc419","#cc5de8"];return`<svg viewBox="0 0 ${p.list.length*70+10} 90">${p.list.map((s,i)=>shapeSvg(s,40+i*70,45,24,cols[i%5])).join("")}</svg>`}
 if(k==="clock"){const ha=((p.h%12)+p.m/60)*30,ma=p.m*6,hand=(a,l,w,c)=>`<line x1="100" y1="100" x2="${100+l*Math.sin(a*Math.PI/180)}" y2="${100-l*Math.cos(a*Math.PI/180)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  return`<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="#fff" stroke="${IN}" stroke-width="6"/>${[...Array(60)].map((_,i)=>{const a=i*6*Math.PI/180,r1=i%5?82:76;return`<line x1="${100+r1*Math.sin(a)}" y1="${100-r1*Math.cos(a)}" x2="${100+86*Math.sin(a)}" y2="${100-86*Math.cos(a)}" stroke="${IN}" stroke-width="${i%5?1:3}"/>`}).join("")}${[...Array(12)].map((_,i)=>{const a=(i+1)*30*Math.PI/180;return`<text x="${100+64*Math.sin(a)}" y="${100-64*Math.cos(a)+7}" text-anchor="middle" font-size="19" font-weight="800" font-family="Nunito" fill="${IN}">${i+1}</text>`}).join("")}${hand(ha,44,7,IN)}${hand(ma,66,4,"#e8590c")}<circle cx="100" cy="100" r="6" fill="${IN}"/></svg>`}
 if(k==="rect"){const sc=Math.min(200/p.w,110/p.h),w=p.w*sc,h=p.h*sc,x=(300-w)/2,y=20;return`<svg viewBox="0 0 300 ${h+70}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#d0ebff" stroke="${IN}" stroke-width="3"/>${T(x+w/2,y+h+26,p.w+" "+p.u)}${p.sq?"":T(x+w+10,y+h/2+6,p.h+" "+p.u,"start")}</svg>`}
 if(k==="tri"){const sc=Math.min(220/p.b,110/p.h),w=p.b*sc,h=p.h*sc,x=(300-w)/2,y=16,tx=x+w*.35;return`<svg viewBox="0 0 300 ${h+60}"><path d="M${x} ${y+h}H${x+w}L${tx} ${y}Z" fill="#d3f9d8" stroke="${IN}" stroke-width="3"/><line x1="${tx}" y1="${y}" x2="${tx}" y2="${y+h}" stroke="#e8590c" stroke-width="2.5" stroke-dasharray="6 5"/>${T(x+w/2,y+h+24,"đáy "+p.b+" "+p.u)}${T(tx+8,y+h/2+6,"cao "+p.h+" "+p.u,"start",14)}</svg>`}
 if(k==="trap"){const sc=Math.min(220/p.a,100/p.h),A=p.a*sc,B=p.b*sc,h=p.h*sc,x=(300-A)/2,y=30;return`<svg viewBox="0 0 300 ${h+80}"><path d="M${x} ${y+h}H${x+A}L${x+A*.15+B} ${y}H${x+A*.15}Z" fill="#fff3bf" stroke="${IN}" stroke-width="3"/><line x1="${x+A*.15+8}" y1="${y}" x2="${x+A*.15+8}" y2="${y+h}" stroke="#e8590c" stroke-width="2.5" stroke-dasharray="6 5"/>${T(x+A*.15+B/2,y-8,p.b+" "+p.u)}${T(x+A/2,y+h+24,p.a+" "+p.u)}${T(x+A*.15+14,y+h/2+6,"cao "+p.h+" "+p.u,"start",14)}</svg>`}
 if(k==="circ")return`<svg viewBox="0 0 300 200"><circle cx="150" cy="100" r="80" fill="#e5dbff" stroke="${IN}" stroke-width="3"/><line x1="150" y1="100" x2="230" y2="100" stroke="#e8590c" stroke-width="3"/><circle cx="150" cy="100" r="4" fill="${IN}"/>${T(190,92,(p.d?"d = ":"r = ")+p.r+" "+p.u,"middle",15)}</svg>`;
 if(k==="box"){const a=p.a,b=p.b,c=p.c,sc=Math.min(150/(a+b*.5),110/(c+b*.5)),A=a*sc,B=b*sc*.5,C=c*sc,x=40,y=20+B;return`<svg viewBox="0 0 300 ${C+B+70}"><path d="M${x} ${y}h${A}v${C}h${-A}z" fill="#d0ebff" stroke="${IN}" stroke-width="2.5"/><path d="M${x} ${y}l${B} ${-B}h${A}l${-B} ${B}z" fill="#a5d8ff" stroke="${IN}" stroke-width="2.5"/><path d="M${x+A} ${y}l${B} ${-B}v${C}l${-B} ${B}z" fill="#74c0fc" stroke="${IN}" stroke-width="2.5"/>${T(x+A/2,y+C+24,a+" "+p.u)}${T(x+A+B+8,y+C/2-B/2+6,c+" "+p.u,"start")}${T(x+A+B/2+6,y+C+B/2+12-B,b+" "+p.u,"start",14)}</svg>`}
 if(k==="angle"){const a=p.d*Math.PI/180,L=110,x=60,y=150;return`<svg viewBox="0 0 300 180"><line x1="${x}" y1="${y}" x2="${x+L*1.6}" y2="${y}" stroke="${IN}" stroke-width="4" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${x+L*Math.cos(a)}" y2="${y-L*Math.sin(a)}" stroke="${IN}" stroke-width="4" stroke-linecap="round"/>${p.d===90?`<path d="M${x+22} ${y}V${y-22}H${x}" fill="none" stroke="#e8590c" stroke-width="3"/>`:`<path d="M${x+30} ${y}A30 30 0 0 0 ${x+30*Math.cos(a)} ${y-30*Math.sin(a)}" fill="none" stroke="#e8590c" stroke-width="3"/>`}<circle cx="${x}" cy="${y}" r="5" fill="${IN}"/></svg>`}
 if(k==="frac"){const d=p.d,r=70,cx=100,cy=85;let s="";for(let i=0;i<d;i++){const a1=i/d*2*Math.PI-Math.PI/2,a2=(i+1)/d*2*Math.PI-Math.PI/2;s+=d===1?`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${i<p.n?"#ff922b":"#fff"}" stroke="${IN}" stroke-width="3"/>`:`<path d="M${cx} ${cy}L${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)}A${r} ${r} 0 ${a2-a1>Math.PI?1:0} 1 ${cx+r*Math.cos(a2)} ${cy+r*Math.sin(a2)}Z" fill="${i<p.n?"#ff922b":"#fff"}" stroke="${IN}" stroke-width="3"/>`}return`<svg viewBox="0 0 200 170">${s}</svg>`}
 if(k==="bars"){const mx=Math.max(...p.v),W=300,bw=Math.min(50,220/p.v.length);return`<svg viewBox="0 0 ${W} 200"><line x1="30" y1="160" x2="${W-10}" y2="160" stroke="${IN}" stroke-width="2"/>${p.v.map((v,i)=>{const h=v/mx*120,x=40+i*(bw+14);return`<rect x="${x}" y="${160-h}" width="${bw}" height="${h}" rx="4" fill="#4dabf7"/>${T(x+bw/2,152-h,v,"middle",14)}${T(x+bw/2,180,p.l[i],"middle",13)}`}).join("")}</svg>`}
 return""}

/* ---------- tạo đề ---------- */
function parseTV(it,st){let k="mcq",m,rest;if(it[0]==="i"||it[0]==="o"){k=it[0];m=it[1];rest=it.slice(2)}else{m=it[0];rest=it.slice(1)}
 let ex,p;rest=rest.filter(x=>{if(typeof x==="string"&&x[0]==="="){ex=x.slice(1);return false}if(typeof x==="string"&&x[0]==="@"){p=st.p&&st.p[x.slice(1)];return false}return true});
 const o={m,ex,p};if(k==="i"){const al=String(rest[1]).split("|");return Object.assign({t:"in",q:rest[0],a:al[0],alt:al.slice(1)},o)}
 if(k==="o"){const ch=rest[1].split("/");return Object.assign({t:"ord",q:rest[0],a:ch.join(" "),words:ch},o)}
 return Object.assign({t:"mcq",q:rest[0],a:rest[1],opts:shuffle(rest.slice(1))},o)}
const sig=q=>q.q+"|"+q.a+"|"+JSON.stringify(q.pic||"")+"|"+(q.p||"");
function genMath(g,s,m){const st=BV.G[g].toan[s];const fns=st.g;const fn=fns[m-1]||fns[fns.length-1];const q=fn();q.m=fns[m-1]?m:fns.length;q.s=s;q.sub="t";return q}
function tvPool(g,s){const st=BV.G[g].tv[s];return st.b.map(it=>Object.assign(parseTV(it,st),{s,sub:"v"}))}
function levelsFor(n){const a=Math.round(n*.4),c=Math.max(1,Math.round(n*.2));return[...Array(a).fill(1),...Array(n-a-c).fill(2),...Array(c).fill(3)]}
function examLevels(n){const a=Math.round(n*.5),c=Math.round(n*.2);return[...Array(a).fill(1),...Array(n-a-c).fill(2),...Array(c).fill(3)]}
function build(g,sub,stages,lv){const out=[],seen=new Set();
 if(sub==="t"){for(const m of lv){let q,k=0;do{q=genMath(g,pick(stages),m)}while(seen.has(sig(q))&&++k<40);seen.add(sig(q));out.push(q)}}
 else{const pool=shuffle(stages.flatMap(s=>tvPool(g,s)));
  for(const m of lv){let i=pool.findIndex(q=>q.m===m&&!seen.has(sig(q)));if(i<0)i=pool.findIndex(q=>!seen.has(sig(q)));if(i<0)break;seen.add(sig(pool[i]));out.push(pool[i])}}
 return out.map(q=>prep(g,q))}
function prep(g,q){q=Object.assign({},q);if(q.t==="mcq"&&q.num&&!q.noIn&&Math.random()<GM[g].inRate)q.t="in";return q}
const norm=s=>String(s).toLowerCase().replace(/[\s ]+/g," ").trim().replace(/[.!?]+$/,"").replace(/\s*,\s*/g,",");
const normN=s=>String(s).replace(/[\s ]/g,"").replace(/\./g,",").replace(/^0+(?=\d)/,"");
function same(q,v){if(q.num){const a=q.a.includes(",")?normN(q.a):normN(q.a).replace(/,/g,"");const b=q.a.includes(",")?normN(v):String(v).replace(/[\s .,]/g,"").replace(/^0+(?=\d)/,"");return a===b}return[q.a,...(q.alt||[])].some(x=>norm(v)===norm(x))}

/* ---------- màn hình ---------- */
function header(){const p=P();$("starCount").textContent=p?p.stars:0;const g=p?p.grade:1;$("navGrade").href="#lop-"+g;$("navGrade").textContent="Lớp "+g}
function home(){const p=P();
 $("hello").textContent=p?`Chào ${nm()}! Bé đang học lớp ${p.grade} và có ${p.stars} sao.${p.cls?` Bé đang ở lớp chung ${p.cls.code}.`:""}`:"Bé tên là gì nhỉ?";
 const names=Object.keys(S.players);
 $("players").innerHTML=names.length?`<span class="note" style="margin:0">Bạn chơi:</span>`+names.map(n=>`<button type="button" data-p="${esc(n)}" aria-pressed="${n===S.cur}">${esc(nmOf(n))}${S.players[n].cls?" · "+esc(S.players[n].cls.code):""}</button>`).join(""):"";
 $("grades").innerHTML=[1,2,3,4,5].map(g=>`<button class="gcard${p&&p.grade===g?" cur":""}" data-grade="${g}" style="--g:${GM[g].color}">${icon(g,2)}<span><b>Lớp ${g}</b>${GM[g].name}<small>${GM[g].rules.slice(0,2).join(" · ")}</small></span></button>`).join("");
 $("styles").innerHTML=[1,2,3,4,5].map(g=>`<div class="card" style="--g:${GM[g].color};border-top:6px solid var(--g)"><h3 style="color:var(--g)">Lớp ${g} · ${GM[g].name}</h3><p>${GM[g].tag}</p><p class="note">${GM[g].rules.join(" · ")}</p></div>`).join("")}
function gradeView(g){const p=P(),G=BV.G[g],M=GM[g];let done=0;
 const stops=G.toan.map((t,s)=>{const open=!p||unlocked(p,g,s),ok=p&&stageDone(p,g,s);if(ok)done++;
  const b=sub=>{const v=best(p,g,s,sub);return v<0?"":`<small>${v}/${qlen(g,sub)}</small>`};
  return`<article class="stop ${ok?"done":open?"":"lock"}"><div class="ic">${icon(g,ok?2:open?1:0)}</div><div class="card"><h3><small>Chặng ${s+1}</small>${M.places[s]}</h3><p>Toán: ${t.n} · Tiếng Việt: ${G.tv[s].n}</p>
  ${open?`<div class="acts"><a class="btn coral" href="#bai-${g}-${s}">▶ Vào học</a><button class="btn alt" data-learn="${g}|${s}|t">Toán ${b("t")}</button><button class="btn alt" data-learn="${g}|${s}|v">Tiếng Việt ${b("v")}</button></div>`:`<div class="locknote">Vượt qua chặng ${s} để mở</div>`}</div></article>`}).join("");
 const nr=p?p.rv.filter(r=>r.g===g&&r.due<=Date.now()).length:0;
 const ex=(sub,lab)=>`<div class="acts"><button class="btn g" data-exam="${g}|${sub}|3">${lab} giữa năm</button><button class="btn alt" data-exam="${g}|${sub}|6">${lab} cuối năm</button></div>`;
 $("v-grade").innerHTML=`<div class="band gband" style="--g:${M.color}"><div class="wrap"><svg class="em" viewBox="0 0 64 64">${icon(g,2).replace(/^<svg[^>]*>|<\/svg>$/g,"")}</svg><div><h2>Lớp ${g} · ${M.name}</h2><p>${M.tag}</p><div class="rules">${M.rules.map(r=>`<span>${r}</span>`).join("")}</div></div></div></div>
 <div class="band" style="--g:${M.color}"><div class="wrap cols"><div>
  <h2>Bản đồ 6 chặng</h2><div class="prog"><i style="width:${done/6*100}%"></i></div>
  <p class="note">${p?`${esc(nm())} đã qua ${done}/6 chặng. Cần đúng từ 60% số câu trở lên ở cả hai trạm để mở chặng sau.`:"Nhập tên ở trang chủ để lưu tiến trình nhé."}</p>
  <div class="trail">${stops}</div></div>
  <aside style="display:grid;gap:16px">
   <div class="card exam"><h3>Kiểm tra theo 3 mức</h3><p>Đề ${M.exam.n} câu, trộn khoảng 50% câu nhận biết, 30% kết nối, 20% vận dụng${M.exam.min?`, làm trong ${M.exam.min} phút`:""}. Chấm và chữa bài sau khi nộp.</p>
    <p class="note" style="margin-top:12px">Giữa năm: chặng 1–3 · Cuối năm: cả 6 chặng</p>${ex("t","Toán")}${ex("v","Tiếng Việt")}</div>
   <div class="card"><h3>Ôn câu sai</h3><p>${nr?`Có ${nr} câu đang chờ bé ôn lại.`:"Chưa có câu nào cần ôn. Giỏi lắm!"}</p>${nr?`<a class="btn g" href="#on-tap">Ôn ngay</a>`:""}</div>
   <div class="card"><h3>Cha mẹ xem nhanh</h3><p>Xem bé mạnh, yếu ở chủ đề nào trong mục Báo cáo.</p><a class="btn alt" href="#bao-cao">Xem báo cáo</a></div>
  </aside></div></div>`}

/* ---------- làm bài ---------- */
let Q=null,tick=null;
function needName(){if(P())return false;location.hash="#home";setTimeout(()=>$("nameIn").focus(),60);return true}
function startLearn(g,s,sub){if(needName())return;const M=GM[g];let qs=build(g,sub,[s],levelsFor(qlen(g,sub)));if(sub==="v")qs=qs.sort((a,b)=>a.m-b.m);
 Q={mode:"learn",g,s,sub,qs,i:0,score:0,res:[],ans:[],streak:0,gain:0,tries:0};show("play");drawQ()}
function startExam(g,sub,k){if(needName())return;const M=GM[g];const qs=shuffle(build(g,sub,[...Array(k).keys()],examLevels(M.exam.n)));
 Q={mode:"exam",g,sub,k,qs,i:0,score:0,res:[],ans:[],gain:0,end:M.exam.min?Date.now()+M.exam.min*60000:0};show("play");drawQ();if(Q.end)runClock()}
function startReview(){const p=P();if(!p)return;const due=p.rv.filter(r=>r.due<=Date.now()).slice(0,10);if(!due.length)return;
 Q={mode:"review",g:p.grade,qs:due.map(r=>Object.assign({},r.q,{rid:r.id})),i:0,score:0,res:[],ans:[],gain:0};show("play");drawQ()}
function runClock(){clearInterval(tick);tick=setInterval(()=>{if(!Q){clearInterval(tick);return}const el=$("clk");const left=Q.end-Date.now();if(left<=0){clearInterval(tick);finish();return}if(el){el.textContent=mmss(left);el.classList.toggle("low",left<60000)}},500)}
const mmss=ms=>{const s=Math.ceil(ms/1000);return`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`};
const LV=["","Nhận biết","Kết nối","Vận dụng"];
function drawQ(){const q=Q.qs[Q.i],M=GM[Q.g];Q.done=false;Q.tries=0;Q.hint=false;Q.ord=[];
 if(Q.mode!=="exam")clearInterval(tick);
 const title=Q.shared?esc(Q.shared.title):Q.mode==="les"?`Lớp ${Q.g} · ${M.places[Q.s]} · Bài tập có hình`:Q.mode==="learn"?`Lớp ${Q.g} · ${M.places[Q.s]} · ${Q.sub==="t"?"Toán":"Tiếng Việt"}`:Q.mode==="exam"?`Kiểm tra ${Q.sub==="t"?"Toán":"Tiếng Việt"} lớp ${Q.g}`:"Ôn câu sai";
 const right=Q.mode==="exam"?(Q.end?`<span class="clock" id="clk">${mmss(Q.end-Date.now())}</span>`:""):`<span>Đúng ${Q.score}${M.combo&&Q.streak>=2?` · <span class="streak">Chuỗi ${Q.streak}</span>`:""}</span>`;
 const perT=Q.mode==="learn"&&M.timer&&S.timer;
 $("play").style.setProperty("--g",M.color);
 $("play").innerHTML=`<div class="qhead"><span>${title}</span><span>Câu ${Q.i+1}/${Q.qs.length}</span>${right}</div>
 <div class="dots">${Q.qs.map((_,i)=>`<i class="${Q.mode==="exam"?(Q.ans[i]!=null?"ans":i===Q.i?"cur":""):(Q.res[i]===true?"ok":Q.res[i]===false?"no":i===Q.i?"cur":"")}"></i>`).join("")}</div>
 ${perT?`<div class="timer" id="tm"><i id="tmb"></i></div>`:""}
 <div class="qcard pop">${q.p?`<div class="passage" id="psg"></div>`:""}<div class="qtop"><svg class="owl" aria-hidden="true"><use href="#owl"/></svg><div>
  <span class="lvl">Mức ${q.m} · ${LV[q.m]}</span><p class="qtext" id="qt"></p>
  ${canSpeak?`<button class="speak" id="spk" type="button"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>Nghe</button>`:""}
 </div></div>${q.pic?`<div class="pic">${pic(q.pic)}</div>`:""}<div id="ans"></div></div>
 ${Q.mode==="learn"&&M.hint&&q.t==="mcq"&&q.opts.length>3?`<div class="tools"><button class="btn alt" id="hint" ${P().stars<1?"disabled":""}>Gợi ý 50/50 (1 sao)</button></div>`:""}
 <div class="fb" id="fb">${Q.mode==="exam"?`<span class="note">Chọn đáp án rồi bấm Câu tiếp. Bấm Câu trước nếu muốn sửa lại.</span><span class="acts">${Q.i>0?`<button class="btn alt" id="prev">Câu trước</button>`:""}<button class="btn g" id="next">${Q.i<Q.qs.length-1?"Câu tiếp":"Nộp bài"}</button></span>`:""}</div>`;
 $("qt").textContent=q.q;if(q.p)$("psg").textContent=q.p;
 drawAns(q);
 if(perT){const t0=Date.now();tick=setInterval(()=>{const left=M.timer-(Date.now()-t0)/1000,b=$("tmb");if(!b||Q.done){clearInterval(tick);return}b.style.width=Math.max(0,left/M.timer*100)+"%";$("tm").classList.toggle("low",left<8);if(left<=0){clearInterval(tick);judge(null)}},200)}
 if(Q.mode!=="exam"&&M.speak&&S.speak)setTimeout(()=>speak((q.p?q.p+". ":"")+q.q),250);
 window.scrollTo({top:0})}
function drawAns(q){const box=$("ans"),prev=Q.mode==="exam"?Q.ans[Q.i]:null;
 if(q.t==="pmc"){box.innerHTML=`<div class="opts popts">${q.opts.map((o,i)=>`<button class="opt pim${prev===o?" pick":""}" data-o="${i}" aria-label="${i+1}"><b>${i+1}</b>${BV.picImg(o)}</button>`).join("")}</div>`}
 else if(q.t==="mcq"){const one=q.opts.some(o=>String(o).length>16);box.innerHTML=`<div class="opts${one?" one":""}">${q.opts.map((o,i)=>`<button class="opt${prev===o?" pick":""}" data-o="${i}"><b>${i+1}</b><span></span></button>`).join("")}</div>`;[...box.querySelectorAll(".opt span")].forEach((s,i)=>s.textContent=q.opts[i])}
 else if(q.t==="in"){box.innerHTML=`<div class="inrow"><input id="inp" ${q.num?'inputmode="decimal"':""} autocomplete="off" aria-label="Câu trả lời" placeholder="${q.num?"Nhập số":"Nhập câu trả lời"}"><button class="btn g" id="sub">${Q.mode==="exam"?"Lưu":"Kiểm tra"}</button></div>${q.num?`<div class="pad">${["1","2","3","4","5","6","7","8","9","0",",","Xoá"].map(k=>`<button type="button" data-k="${k}">${k}</button>`).join("")}</div>`:""}`;if(prev!=null)$("inp").value=prev;setTimeout(()=>{try{$("inp").focus({preventScroll:true})}catch(e){}},50)}
 else{const pool=shuffle(q.words.map((w,i)=>i));if(pool.every((v,i)=>v===i)&&pool.length>1)pool.reverse();Q.pool=pool;if(prev)Q.ord=[];box.innerHTML=`<div class="order" id="ord"><div class="line" id="line"></div><div class="pool" id="pool"></div><div class="acts" style="margin-top:12px"><button class="btn alt" id="oclr">Làm lại</button><button class="btn g" id="ochk">${Q.mode==="exam"?"Lưu":"Kiểm tra"}</button></div></div>`;drawOrd()}}
function drawOrd(){const q=Q.qs[Q.i];$("line").innerHTML=Q.ord.map(i=>`<button class="chip" data-out="${i}"></button>`).join("");$("pool").innerHTML=Q.pool.filter(i=>!Q.ord.includes(i)).map(i=>`<button class="chip" data-in="${i}"></button>`).join("");
 document.querySelectorAll("#ord .chip").forEach(c=>c.textContent=q.words[c.dataset.out??c.dataset.in])}
function judge(val,btn){if(!Q||Q.done)return;const q=Q.qs[Q.i],M=GM[Q.g],p=P();
 if(Q.mode==="exam"){Q.ans[Q.i]=val;if(q.t==="mcq"||q.t==="pmc")document.querySelectorAll(".opt").forEach(b=>b.classList.toggle("pick",q.opts[+b.dataset.o]===val));return}
 const ok=val!=null&&same(q,val);
 if(!ok&&val!=null&&M.retry&&Q.tries===0&&(Q.mode==="learn"||Q.mode==="les")){Q.tries=1;beep(false);if(btn){btn.disabled=true;btn.classList.add("no")}if(q.t==="in"){$("inp").value="";$("inp").focus()}if(q.t==="ord"){Q.ord=[];drawOrd()}
  $("fb").innerHTML=`<span class="n">Chưa đúng rồi, bé thử lại một lần nữa nhé!</span>`;return}
 Q.done=true;clearInterval(tick);Q.res[Q.i]=ok;Q.ans[Q.i]=val;
 if(q.t==="mcq"||q.t==="pmc")document.querySelectorAll(".opt").forEach(b=>{b.disabled=true;const v=q.opts[+b.dataset.o];if(v===q.a)b.classList.add("ok");else if(b===btn)b.classList.add("no")});
 if(q.t==="in"){$("inp").disabled=true;$("inp").classList.add(ok?"ok":"no");document.querySelectorAll(".pad button,#sub").forEach(b=>b.disabled=true)}
 if(q.t==="ord"){$("ord").classList.add(ok?"ok":"no");document.querySelectorAll("#ord button").forEach(b=>b.disabled=true)}
 if(ok){Q.score++;Q.streak=(Q.streak||0)+1;let gn=1;if((Q.mode==="learn"||Q.mode==="les")&&Q.g===1&&Q.tries===0)gn=2;if(M.combo&&Q.streak>=3)gn++;Q.gain+=gn}else Q.streak=0;
 beep(ok);track(q,ok);
 const praise=pick(["Giỏi quá!","Chính xác!","Tuyệt vời!","Bé làm đúng rồi!","Xuất sắc!"]);
 $("fb").innerHTML=`<span><span class="${ok?"y":"n"}" id="fbt"></span><span class="ex" id="fbx"></span></span><button class="btn g" id="next">${Q.i<Q.qs.length-1?"Câu tiếp theo":"Xem kết quả"}</button>`;
 $("fbt").textContent=ok?praise+(M.combo&&Q.streak>=3?` Chuỗi ${Q.streak} câu!`:""):(val==null?"Hết giờ rồi! ":"Chưa đúng. ")+`Đáp án: ${lab(q,q.a)}`;
 $("fbx").textContent=!ok&&q.ex?q.ex:"";$("next").focus({preventScroll:true})}
function track(q,ok){const p=P();if(!p)return;const g=Q.g;
 if(Q.mode!=="review"){add(p.st,`${g}-${q.sub}-${q.s}`,ok);add(p.lv,`${g}-${q.sub}-${q.m}`,ok)}
 const id=sig(q),i=p.rv.findIndex(r=>r.id===id),DAY=864e5;
 if(!ok){const clean=Object.assign({},q);delete clean.rid;const r={id,g,q:clean,due:Date.now(),step:0};if(i>=0)p.rv[i]=r;else p.rv.push(r);if(p.rv.length>200)p.rv.shift()}
 else if(i>=0&&Q.mode==="review"){const r=p.rv[i];r.step++;if(r.step>3)p.rv.splice(i,1);else r.due=Date.now()+[0,1,3,7][r.step]*DAY}
 save()}
function next(){if(Q.mode==="exam"){const q=Q.qs[Q.i];if(q.t==="in"&&$("inp"))Q.ans[Q.i]=$("inp").value.trim()||null;if(q.t==="ord"&&Q.ord.length)Q.ans[Q.i]=Q.ord.map(i=>q.words[i]).join(" ")}
 if(Q.i<Q.qs.length-1){Q.i++;drawQ()}else finish()}
function finish(){clearInterval(tick);const p=P(),M=GM[Q.g];let html="";
 if(Q.mode==="exam"){const lv={1:[0,0],2:[0,0],3:[0,0]};Q.qs.forEach((q,i)=>{const ok=Q.ans[i]!=null&&same(q,Q.ans[i]);Q.res[i]=ok;lv[q.m][1]++;if(ok){lv[q.m][0]++;Q.score++}track(q,ok)});
  const n=Q.qs.length,d10=Math.round(Q.score/n*20)/2;Q.gain=Q.score;p.tests.unshift({g:Q.g,sub:Q.sub,k:Q.k,sc:Q.score,n,d:Date.now(),lv});p.tests=p.tests.slice(0,30);
  const msg=d10>=9?"Hoàn thành tốt, bé nắm chắc kiến thức.":d10>=7?"Bé làm khá tốt, ôn thêm vài chỗ là chắc.":d10>=5?"Bé đạt yêu cầu. Hãy ôn lại các câu sai nhé.":"Bé cần ôn lại các chặng trước khi làm lại đề.";
  html=`<div class="top1"><h2>Kết quả kiểm tra ${Q.sub==="t"?"Toán":"Tiếng Việt"} lớp ${Q.g}</h2><div class="big pop">${String(d10).replace(".",",")} điểm</div><p style="font-weight:700">Đúng ${Q.score}/${n} câu. ${msg}</p></div>
  <div class="card" style="margin-top:18px;--g:${M.color}"><h3>Theo mức độ</h3>${[1,2,3].map(m=>{const[c,t]=lv[m];return`<div class="lvrow"><span>Mức ${m}</span><div class="bar"><i style="width:${t?c/t*100:0}%"></i></div><span>${c}/${t}</span></div>`}).join("")}
  <p class="note">Mức 1 nhận biết, nhắc lại · Mức 2 kết nối, sắp xếp · Mức 3 vận dụng giải quyết vấn đề mới</p></div>
  <h3 style="margin-top:22px">Chữa bài</h3><ol class="rv" id="rvl"></ol>`}
 else{const n=Q.qs.length;if(Q.score===n&&n>=5)Q.gain+=2;
  html=`<div class="top1"><svg class="pop" style="width:110px;height:110px" aria-hidden="true"><use href="#owl"/></svg><h2 id="rh"></h2><div class="big pop">${Q.score}/${n}</div>
  <div class="stars">${[0,1,2,3,4].map(i=>`<svg><use href="#${i<Math.round(Q.score/n*5)?"star":"star0"}"/></svg>`).join("")}</div></div>`}
 p.stars+=Q.gain;p.earned+=Q.gain;
 if(p.cls){const ev={name:p.cls.name,type:Q.mode,g:Q.g,sub:Q.sub||"",score:Q.score,n:Q.qs.length,gain:Q.gain,ex:Q.shared?Q.shared.title:""};CL.init().then(ok=>ok&&CL.record(p.cls.code,p.cls.sid,ev)).catch(()=>{});
  if(Q.shared){const r={name:p.cls.name,score:Q.score,n:Q.qs.length,d10:Math.round(Q.score/Q.qs.length*20)/2,ms:Date.now()-Q.t0};CL.submit(Q.shared.code,Q.shared.id,p.cls.sid,r).catch(()=>{})}}
 let extra="",acts="";
 if(Q.mode==="learn"){const k=bk(Q.g,Q.s,Q.sub),old=best(p,Q.g,Q.s,Q.sub),was=Q.s<5&&unlocked(p,Q.g,Q.s+1);if(Q.score>old)p.best[k]=Q.score;
  const pass=Q.score>=passN(Q.g,Q.sub),now=Q.s<5&&unlocked(p,Q.g,Q.s+1),other=Q.sub==="t"?"v":"t",od=best(p,Q.g,Q.s,other)>=passN(Q.g,other);
  extra=`<p style="font-size:19px;font-weight:700;text-align:center">${Q.score===Q.qs.length?"Hoàn hảo! Bé đúng tất cả.":pass?"Bé đã vượt qua trạm này!":`Cố lên! Cần đúng ít nhất ${passN(Q.g,Q.sub)} câu để qua trạm.`}<br>Bé nhận được ${Q.gain} sao.</p>${!was&&now?`<p class="card" style="font-weight:800;color:var(--ok);text-align:center">Đã mở chặng ${Q.s+2}: ${M.places[Q.s+1]}!</p>`:""}`;
  acts=`<button class="btn alt" data-learn="${Q.g}|${Q.s}|${Q.sub}">Làm lượt mới</button>${!od?`<button class="btn coral" data-learn="${Q.g}|${Q.s}|${other}">Sang trạm ${other==="t"?"Toán":"Tiếng Việt"}</button>`:now?`<button class="btn coral" data-learn="${Q.g}|${Q.s+1}|t">Đi chặng ${Q.s+2}</button>`:""}<a class="btn" href="#lop-${Q.g}">Về bản đồ</a>`}
 else if(Q.mode==="les"){const st=lesP(p,Q.g,Q.s),old=st.e||0;if(Q.score>old)st.e=Q.score;extra=`<p style="font-size:19px;font-weight:700;text-align:center">${Q.score===Q.qs.length?"Hoàn hảo! Bé đúng tất cả.":Q.score>=Math.ceil(Q.qs.length*.6)?"Bé làm tốt lắm!":"Bé làm lại để đúng nhiều hơn nhé."}<br>Bé nhận được ${Q.gain} sao.</p>`;acts=`<button class="btn alt" data-les="${Q.g}|${Q.s}">Làm lượt mới</button><button class="btn coral" data-learn="${Q.g}|${Q.s}|t">Sang Bước 3: Luyện Toán</button><a class="btn" href="#bai-${Q.g}-${Q.s}">Về các bước</a>`}
 else if(Q.shared)acts=`<a class="btn coral" href="#lop-chung">Xem bảng điểm của lớp</a><a class="btn alt" href="#bao-cao">Xem báo cáo</a>`;
 else if(Q.mode==="exam")acts=`<button class="btn alt" data-exam="${Q.g}|${Q.sub}|${Q.k}">Làm đề khác</button><a class="btn" href="#lop-${Q.g}">Về lớp ${Q.g}</a><a class="btn alt" href="#bao-cao">Xem báo cáo</a>`;
 else{extra=`<p style="text-align:center;font-weight:700">Bé ôn đúng ${Q.score} câu, nhận ${Q.gain} sao. Câu đúng sẽ quay lại sau vài ngày để bé nhớ lâu hơn.</p>`;acts=`<a class="btn" href="#on-tap">Ôn tiếp</a><a class="btn alt" href="#lop-${Q.g}">Về lớp ${Q.g}</a>`}
 save();header();
 $("result").style.setProperty("--g",M.color);
 $("result").innerHTML=html+extra+`<div class="acts">${acts}</div>`;
 if($("rh"))$("rh").textContent=(Q.mode==="review"||Q.score>=passN(Q.g,Q.sub||"t")?"Hoan hô, ":"Thử lại nhé, ")+nm()+"!";
 if($("rvl")){$("rvl").innerHTML=Q.qs.map((q,i)=>`<li class="${Q.res[i]?"":"no"}"><div class="m">Câu ${i+1} · Mức ${q.m} · ${Q.res[i]?"Đúng":"Sai"}</div><div data-t="q"></div><div data-t="a"></div><div class="note" data-t="x"></div></li>`).join("");
  [...$("rvl").children].forEach((li,i)=>{const q=Q.qs[i];li.querySelector('[data-t=q]').textContent=(q.p?"(Đọc đoạn văn) ":"")+q.q+(q.pic?" (có hình)":"");li.querySelector('[data-t=a]').textContent=`Bé trả lời: ${lab(q,Q.ans[i])} · Đáp án: ${lab(q,q.a)}`;li.querySelector('[data-t=x]').textContent=q.ex||""})}
 Q=null;show("result")}

/* ---------- ôn tập, báo cáo, quà, xếp hạng ---------- */
function review(){const p=P();if(!p){$("review").innerHTML=`<h2>Ôn câu sai</h2><p>Nhập tên ở trang chủ để bắt đầu.</p>`;return}
 const now=Date.now(),due=p.rv.filter(r=>r.due<=now),later=p.rv.length-due.length;
 $("review").innerHTML=`<h2>Ôn câu sai</h2><p>Câu bé làm sai sẽ được giữ lại ở đây. Làm đúng thì câu quay lại sau 1 ngày, 3 ngày rồi 7 ngày, sau đó sẽ không cần ôn nữa.</p>
 <div class="card" style="margin-top:16px"><h3>${due.length?`${due.length} câu cần ôn hôm nay`:"Hôm nay không có câu nào cần ôn"}</h3><p class="note">${later?`${later} câu khác sẽ quay lại vào những ngày tới.`:""}</p>${due.length?`<button class="btn coral" id="goRv" style="margin-top:10px">Ôn ${Math.min(10,due.length)} câu</button>`:""}</div>
 ${due.length?`<ol class="rv">${due.slice(0,10).map(r=>`<li class="no"><div class="m">Lớp ${r.g} · ${r.q.sub==="t"?"Toán":"Tiếng Việt"} · Mức ${r.q.m}</div><div>${esc(r.q.q)}</div></li>`).join("")}</ol>`:""}`}
let repG=null;
function report(){const p=P();if(!p){$("report").innerHTML=`<h2>Báo cáo học tập</h2><p>Nhập tên ở trang chủ để bắt đầu.</p>`;return}
 const g=repG||p.grade,G=BV.G[g],M=GM[g];const acc=v=>v&&v[1]?Math.round(v[0]/v[1]*100):null;
 const cell=v=>{const a=acc(v);return a==null?`<span class="note" style="margin:0">Chưa làm</span>`:`<div class="mini"><div class="bar"><i style="width:${a}%"></i></div><b>${a}%</b></div>`};
 const weak=[];G.toan.forEach((t,s)=>{["t","v"].forEach(sub=>{const v=p.st[`${g}-${sub}-${s}`];if(v&&v[1]>=4&&v[0]/v[1]<.7)weak.push({n:`${sub==="t"?"Toán":"Tiếng Việt"}: ${sub==="t"?t.n:G.tv[s].n}`,a:acc(v)})})});weak.sort((a,b)=>a.a-b.a);
 const tests=p.tests.filter(t=>t.g===g).slice(0,8);
 $("report").style.setProperty("--g",M.color);
 $("report").innerHTML=`<h2>Báo cáo học tập của <span id="repN"></span></h2>
 <div class="tabs">${[1,2,3,4,5].map(k=>`<button data-rep="${k}" aria-pressed="${k===g}">Lớp ${k}</button>`).join("")}</div>
 <div class="grid2"><div class="card"><h3>Theo mức độ</h3>${["t","v"].map(sub=>`<p style="font-weight:800;margin-top:10px">${sub==="t"?"Toán":"Tiếng Việt"}</p>${[1,2,3].map(m=>{const v=p.lv[`${g}-${sub}-${m}`];const a=acc(v);return`<div class="lvrow"><span>Mức ${m}</span><div class="bar"><i style="width:${a||0}%"></i></div><span>${a==null?"–":a+"%"}</span></div>`}).join("")}`).join("")}</div>
 <div class="card"><h3>Cần luyện thêm</h3>${weak.length?`<div class="weak">${weak.slice(0,4).map(w=>`<div>${w.n} · ${w.a}%</div>`).join("")}</div>`:`<p>Chưa thấy chủ đề nào dưới 70% (tính các chủ đề đã làm từ 4 câu trở lên).</p>`}
  <p class="note">Câu sai đang chờ ôn: ${p.rv.filter(r=>r.g===g).length}</p><div class="acts" style="margin-top:12px"><a class="btn g" href="#on-tap">Ôn câu sai</a><button class="btn alt" id="copyRep">Sao chép báo cáo</button></div><p class="note" id="copyMsg"></p></div></div>
 <h3 style="margin-top:24px">Theo chủ đề trong sách</h3>
 <table><thead><tr><th>Chặng</th><th>Toán</th><th>Tiếng Việt</th></tr></thead><tbody>${G.toan.map((t,s)=>`<tr><td><b>${s+1}. ${M.places[s]}</b><div class="note" style="margin:0">${t.n} · ${G.tv[s].n}</div></td><td>${cell(p.st[`${g}-t-${s}`])}</td><td>${cell(p.st[`${g}-v-${s}`])}</td></tr>`).join("")}</tbody></table>
 <h3 style="margin-top:24px">Bài kiểm tra gần đây</h3>
 ${tests.length?`<table><thead><tr><th>Ngày</th><th>Môn</th><th>Phạm vi</th><th class="n">Điểm</th></tr></thead><tbody>${tests.map(t=>`<tr><td>${new Date(t.d).toLocaleDateString("vi-VN")}</td><td>${t.sub==="t"?"Toán":"Tiếng Việt"}</td><td>${t.k===3?"Giữa năm":"Cuối năm"}</td><td class="n"><b>${String(Math.round(t.sc/t.n*20)/2).replace(".",",")}</b> (${t.sc}/${t.n})</td></tr>`).join("")}</tbody></table>`:`<p>Bé chưa làm bài kiểm tra nào ở lớp ${g}.</p>`}`;
 $("repN").textContent=nm();
 Q_rep={g,weak,tests,p}}
let Q_rep=null;
function reportText(){const {g,weak,tests,p}=Q_rep,G=BV.G[g];const acc=v=>v&&v[1]?Math.round(v[0]/v[1]*100)+"%":"chưa làm";
 return[`Báo cáo học tập – ${nm()} – Lớp ${g}`,...G.toan.map((t,s)=>`Chặng ${s+1}: Toán (${t.n}) ${acc(p.st[`${g}-t-${s}`])}; Tiếng Việt (${G.tv[s].n}) ${acc(p.st[`${g}-v-${s}`])}`),
  "Theo mức (Toán / Tiếng Việt): "+[1,2,3].map(m=>`Mức ${m}: ${acc(p.lv[`${g}-t-${m}`])} / ${acc(p.lv[`${g}-v-${m}`])}`).join("; "),
  weak.length?"Cần luyện thêm: "+weak.map(w=>`${w.n} (${w.a}%)`).join("; "):"Chưa có chủ đề nào dưới 70%.",
  ...tests.map(t=>`${new Date(t.d).toLocaleDateString("vi-VN")} – Kiểm tra ${t.sub==="t"?"Toán":"Tiếng Việt"} ${t.k===3?"giữa năm":"cuối năm"}: ${t.sc}/${t.n} câu`)].join("\n")}
const STK=[
 {id:"sun",name:"Ông Mặt Trời",p:8,svg:'<circle cx="50" cy="50" r="22" fill="#ffd23f"/><g stroke="#f5a300" stroke-width="6" stroke-linecap="round"><path d="M50 8v12M50 80v12M8 50h12M80 50h12M20 20l9 9M71 71l9 9M80 20l-9 9M29 71l-9 9"/></g><circle cx="42" cy="47" r="3" fill="#1d2a5c"/><circle cx="58" cy="47" r="3" fill="#1d2a5c"/><path d="M42 57q8 7 16 0" stroke="#1d2a5c" stroke-width="3" fill="none" stroke-linecap="round"/>'},
 {id:"heart",name:"Trái Tim",p:12,svg:'<path d="M50 86C20 64 10 48 14 34c4-14 22-18 36-4 14-14 32-10 36 4 4 14-6 30-36 52z" fill="#ff6b5b"/>'},
 {id:"fish",name:"Cá Vàng",p:18,svg:'<path d="M70 50 L94 32 V68Z" fill="#f07d2e"/><ellipse cx="46" cy="50" rx="32" ry="22" fill="#ff9f43"/><circle cx="28" cy="46" r="5" fill="#fff"/><circle cx="27" cy="46" r="2.5" fill="#1d2a5c"/>'},
 {id:"flower",name:"Bông Hoa",p:24,svg:'<path d="M50 60v32" stroke="#2f9e44" stroke-width="6"/><g fill="#ff8fc7"><circle cx="50" cy="24" r="14"/><circle cx="74" cy="42" r="14"/><circle cx="64" cy="68" r="14"/><circle cx="36" cy="68" r="14"/><circle cx="26" cy="42" r="14"/></g><circle cx="50" cy="48" r="12" fill="#ffd23f"/>'},
 {id:"rocket",name:"Tên Lửa",p:35,svg:'<path d="M50 6c18 14 22 40 14 62H36C28 46 32 20 50 6z" fill="#e8edf7"/><path d="M36 68l-12 14 4-22zM64 68l12 14-4-22z" fill="#ff6b5b"/><circle cx="50" cy="38" r="9" fill="#2457d6" stroke="#fff" stroke-width="3"/><path d="M42 70q8 26 16 0z" fill="#ffd23f"/>'},
 {id:"rainbow",name:"Cầu Vồng",p:45,svg:'<g fill="none" stroke-width="8"><path d="M10 74a40 40 0 0 1 80 0" stroke="#ff6b5b"/><path d="M18 74a32 32 0 0 1 64 0" stroke="#ffd23f"/><path d="M26 74a24 24 0 0 1 48 0" stroke="#2f9e44"/><path d="M34 74a16 16 0 0 1 32 0" stroke="#2457d6"/></g>'},
 {id:"crown",name:"Vương Miện",p:60,svg:'<path d="M14 72L20 30l18 20 12-30 12 30 18-20 6 42z" fill="#ffd23f" stroke="#e0a100" stroke-width="3" stroke-linejoin="round"/><rect x="14" y="72" width="72" height="12" rx="4" fill="#f5b301"/><circle cx="50" cy="60" r="6" fill="#ff6b5b"/>'},
 {id:"trophy",name:"Cúp Vàng",p:90,svg:'<path d="M30 14h40v20a20 20 0 0 1-40 0z" fill="#ffd23f" stroke="#e0a100" stroke-width="3"/><path d="M30 20H16q0 18 16 20M70 20h14q0 18-16 20" stroke="#e0a100" stroke-width="5" fill="none"/><rect x="45" y="54" width="10" height="16" fill="#e0a100"/><rect x="30" y="70" width="40" height="14" rx="4" fill="#2457d6"/>'}];
function shop(){const p=P();$("shop").innerHTML=STK.map(s=>{const own=p&&p.owned.includes(s.id);return`<div class="card item"><svg viewBox="0 0 100 100" aria-hidden="true">${s.svg}</svg><h3>${s.name}</h3>${own?`<div class="own">Đã có trong bộ sưu tập</div>`:`<button class="btn" data-buy="${s.id}" ${!p||p.stars<s.p?"disabled":""}>Đổi ${s.p} sao</button>`}</div>`}).join("")}
function rank(){const rows=Object.entries(S.players).map(([n,p])=>({n,g:p.grade,e:p.earned,d:[1,2,3,4,5].reduce((a,g)=>a+BV.G[g].toan.filter((_,s)=>stageDone(p,g,s)).length,0),t:p.tests.length})).sort((a,b)=>b.e-a.e);
 $("rank").innerHTML=rows.length?`<table><thead><tr><th>Hạng</th><th>Tên</th><th>Lớp</th><th class="n">Sao</th><th class="n">Chặng</th><th class="n">Bài KT</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td><span class="medal">${i+1}</span></td><td><b>${esc(nmOf(r.n))}</b></td><td>${r.g}</td><td class="n">${r.e}</td><td class="n">${r.d}</td><td class="n">${r.t}</td></tr>`).join("")}</tbody></table>`:`<div class="card" style="margin-top:16px">Chưa có bạn nào chơi. Hãy là người đầu tiên!</div>`}

/* ---------- bài học có hình theo từng chặng ---------- */
const lab=(q,v)=>v==null?"bỏ trống":q.t==="pmc"&&BV.P[v]?BV.P[v].n:v;
const lesKey=(g,s)=>`${g}-${s}`;
const lesP=(p,g,s)=>{p.les=p.les||{};return p.les[lesKey(g,s)]=p.les[lesKey(g,s)]||{}};
const LZ={g:1,s:0,view:"home",ci:0,flip:false};
function lesExercises(g,s){const L=BV.LES[g][s],out=[],seen=new Set();let k=0;for(const fn of L.ex){let q,t=0;do{q=fn()}while(seen.has(sig(q))&&++t<25);seen.add(sig(q));q=Object.assign({sub:"p",s},q);q.m=q.m||1;out.push(prep(g,q))}return out}
function startLes(g,s){if(needName())return;const qs=lesExercises(g,s);Q={mode:"les",g,s,sub:"p",qs,i:0,score:0,res:[],ans:[],streak:0,gain:0,tries:0};show("play");drawQ()}
const STEPC=["#2f9e44","#1c7ed6","#e8590c","#d6336c","#7048e8"];
function lesScene(ids,bg){return`<svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice"><rect width="300" height="170" fill="${bg}"/><circle cx="250" cy="34" r="22" fill="#fff" opacity=".35"/><path d="M0 140q75-30 150 0t150 0v30H0z" fill="#fff" opacity=".35"/>${ids.slice(0,3).map((id,i)=>BV.B.img(id,[18,105,192][i],[52,30,52][i],[90,100,90][i])).join("")}</svg>`}
function lessonView(g,s){LZ.g=g;LZ.s=s;const L=BV.LES[g]&&BV.LES[g][s];const box=$("v-lesson");if(!L){box.innerHTML="<div class='band'><p>Chưa có bài học.</p></div>";return}
 const p=P(),M=GM[g],st=p?lesP(p,g,s):{};const bt=sub=>{const v=best(p,g,s,sub);return v<0?null:v};
 if(LZ.view==="cards")return cardsView(g,s);if(LZ.view==="game")return gameView(g,s);
 const steps=[
  {k:"cards",t:"Bước 1 · Xem trước",n:"Thẻ học",ids:(L.cards.filter(c=>typeof c==="string").concat(L.hero)).slice(0,3),done:!!st.c,act:`data-lv="cards"`},
  {k:"ex",t:`Bước 2 · ${L.ex.length} câu có tranh`,n:"Bài tập có hình",ids:L.hero.slice().reverse(),done:(st.e||0)>=Math.ceil(L.ex.length*.6),sc:st.e!=null?`${st.e}/${L.ex.length}`:"",act:`data-les="${g}|${s}"`},
  {k:"t",t:`Bước 3 · ${BV.G[g].toan[s].n}`,n:"Luyện Toán",ids:["tao","cam","sao"],done:bt("t")>=passN(g,"t"),sc:bt("t")!=null?`${bt("t")}/${qlen(g,"t")}`:"",act:`data-learn="${g}|${s}|t"`},
  {k:"v",t:`Bước 4 · ${BV.G[g].tv[s].n}`,n:"Luyện Tiếng Việt",ids:["sach","vo","butchi"],done:bt("v")>=passN(g,"v"),sc:bt("v")!=null?`${bt("v")}/${qlen(g,"v")}`:"",act:`data-learn="${g}|${s}|v"`},
  {k:"game",t:"Trò chơi · thêm",n:"Lật hình tìm cặp",ids:["bong","dieu","trong"],done:!!st.gm,act:`data-lv="game"`}];
 const next=steps.find(x=>!x.done)||steps[1];
 box.innerHTML=`<div class="band lesband" style="--g:${M.color}"><div class="wrap">
  <div class="lestop"><a class="btn alt" href="#lop-${g}">← Bản đồ</a><div><div class="note" style="margin:0">Lớp ${g} · ${M.name} · Chặng ${s+1}</div><h2>${M.places[s]}</h2></div></div>
  <div class="lesgrid"><div class="card leshero"><div class="lsc">${lesScene(L.hero,"#e7f5ff")}</div><h3>Hôm nay con học</h3><p class="lintro" id="lintro"></p>${canSpeak?`<button class="speak" data-lspeak="1" type="button"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>Nghe</button>`:""}
   <div class="lprog"><i style="width:${steps.filter(x=>x.done).length/steps.length*100}%"></i></div><p class="note" style="margin:4px 0 12px">Đã xong ${steps.filter(x=>x.done).length}/${steps.length} bước</p>
   <button class="btn g lgo" ${next.act}>▶ Bắt đầu: ${next.n}</button>
   <p class="ptip"><b>Ba mẹ đồng hành:</b> ngồi cùng con ở Bước 1, đọc to các thẻ và khen con khi làm xong mỗi bước. Không ép, không so sánh con với bạn.</p></div>
  <div class="steps2">${steps.map((x,i)=>`<button class="stepc${x.done?" done":""}" ${x.act} style="--c:${STEPC[i]}"><div class="sp">${lesScene(x.ids,["#d3f9d8","#d0ebff","#fff4e6","#ffdeeb","#e5dbff"][i])}${x.done?`<span class="ok">✓ Xong</span>`:""}</div><div class="sl"><small>${esc(x.t)}</small><b>${x.n}</b>${x.sc?`<em>${x.sc}</em>`:""}</div></button>`).join("")}</div></div></div></div>`;
 $("lintro").textContent=L.intro}
function cardsView(g,s){const L=BV.LES[g][s],cs=L.cards.map(c=>BV.cardOf(g,c)),i=LZ.ci,c=cs[i];
 $("v-lesson").innerHTML=`<div class="band lesband" style="--g:${GM[g].color}"><div class="wrap" style="max-width:760px"><div class="lestop"><button class="btn alt" data-lv="home">← Các bước của chặng</button><div><div class="note" style="margin:0">Bước 1 · Xem trước</div><h2>Thẻ học</h2></div></div>
  <div class="card" style="text-align:center"><div class="dots" style="max-width:260px;margin:0 auto 12px">${cs.map((_,k)=>`<i class="${k<i?"ok":k===i?"cur":""}"></i>`).join("")}</div>
  <button class="fcard${LZ.flip?" flip":""}" data-lflip="1" aria-label="Lật thẻ"><div class="fin"><div class="ff"><div class="fpic">${pic(c.pic)}</div><b id="cf"></b><small>Chạm để lật thẻ ↻</small></div><div class="fb2"><b id="cf2"></b><p id="cb"></p><small>Chạm để lật lại ↻</small></div></div></button>
  <div class="acts" style="justify-content:center;margin-top:16px"><button class="btn alt" data-lcard="-1" ${i===0?"disabled":""}>← Trước</button><b style="align-self:center">Thẻ ${i+1}/${cs.length}</b>${i<cs.length-1?`<button class="btn g" data-lcard="1">Thẻ tiếp →</button>`:`<button class="btn coral" data-lcard="done">Xong, sang Bước 2 →</button>`}</div></div></div></div>`;
 $("cf").textContent=c.f;$("cf2").textContent=c.f;$("cb").textContent=c.b;
 if(GM[g].speak&&S.speak&&!LZ.flip)setTimeout(()=>speak(c.f),200)}
function gameView(g,s){const L=BV.LES[g][s];let G=LZ.gm;
 if(!G||G.g!==g||G.s!==s){const ids=[...new Set([...L.cards.filter(c=>typeof c==="string"),...L.hero,...Object.keys(BV.P).filter(k=>BV.P[k].cat==="con vật")])].slice(0,6);const tiles=shuffle([...ids.map(id=>({id,k:"p"})),...ids.map(id=>({id,k:"w"}))]);G=LZ.gm={g,s,tiles,open:[],done:[],moves:0}}
 $("v-lesson").innerHTML=`<div class="band lesband" style="--g:${GM[g].color}"><div class="wrap" style="max-width:820px"><div class="lestop"><button class="btn alt" data-lv="home">← Các bước của chặng</button><div><div class="note" style="margin:0">Trò chơi</div><h2>Lật hình tìm cặp</h2></div></div>
  <p>Lật hai thẻ: một thẻ <b>tranh</b> và một thẻ <b>chữ</b> cùng tên là một cặp. Tìm hết 6 cặp nhé!</p><p class="note">Số lượt lật: ${G.moves} · Đã tìm: ${G.done.length/2}/6</p>
  <div class="mgrid">${G.tiles.map((t,i)=>{const up=G.open.includes(i)||G.done.includes(i);return`<button class="mt${up?" up":""}${G.done.includes(i)?" got":""}" data-mt="${i}" aria-label="Thẻ ${i+1}">${up?(t.k==="p"?BV.picImg(t.id):`<span>${esc(BV.P[t.id].n)}</span>`):`<svg viewBox="0 0 64 64"><use href="#owl"/></svg>`}</button>`}).join("")}</div>
  ${G.done.length===G.tiles.length?`<div class="card" style="margin-top:16px;text-align:center"><h3>Giỏi quá! Bé tìm đủ 6 cặp sau ${G.moves} lượt.</h3><div class="acts" style="justify-content:center;margin-top:10px"><button class="btn alt" data-lv="regame">Chơi lại</button><button class="btn g" data-lv="home">Về các bước</button></div></div>`:""}</div></div>`}
function gameClick(i){const G=LZ.gm;if(!G||G.open.includes(i)||G.done.includes(i)||G.open.length>=2)return;G.open.push(i);if(G.open.length===2){G.moves++;const[a,b]=G.open.map(k=>G.tiles[k]);if(a.id===b.id&&a.k!==b.k){G.done.push(...G.open);G.open=[];beep(true);if(G.done.length===G.tiles.length){const p=P();if(p){const st=lesP(p,G.g,G.s);if(!st.gm){st.gm=1;p.stars+=3;p.earned+=3;if(p.cls)CL.init().then(ok=>ok&&CL.record(p.cls.code,p.cls.sid,{name:p.cls.name,type:"learn",g:G.g,sub:"",score:6,n:6,gain:3,ex:"Trò chơi lật hình"})).catch(()=>{})}save();header()}}}else{gameView(G.g,G.s);setTimeout(()=>{G.open=[];if($("v-lesson").classList.contains("on")&&LZ.view==="game")gameView(G.g,G.s)},900);return}}gameView(G.g,G.s)}
document.addEventListener("click",e=>{const t=e.target;
 const ls=t.closest("[data-les]");if(ls){const[g,s]=ls.dataset.les.split("|");startLes(+g,+s);return}
 const lv=t.closest("[data-lv]");if(lv){const v=lv.dataset.lv;if(v==="regame"){LZ.gm=null;LZ.view="game"}else{LZ.view=v;LZ.ci=0;LZ.flip=false}lessonView(LZ.g,LZ.s);window.scrollTo({top:0});return}
 if(t.closest("[data-lflip]")){LZ.flip=!LZ.flip;const L=BV.LES[LZ.g][LZ.s],c=BV.cardOf(LZ.g,L.cards[LZ.ci]);cardsView(LZ.g,LZ.s);if(LZ.flip)speak(c.f+". "+c.b);return}
 const lc=t.closest("[data-lcard]");if(lc){const v=lc.dataset.lcard;if(v==="done"){const p=P();if(p){const st=lesP(p,LZ.g,LZ.s);if(!st.c){st.c=1;p.stars+=2;p.earned+=2}save();header()}startLes(LZ.g,LZ.s);return}LZ.ci+=+v;LZ.flip=false;cardsView(LZ.g,LZ.s);return}
 const mt=t.closest("[data-mt]");if(mt){gameClick(+mt.dataset.mt);return}
 if(t.closest("[data-lspeak]")){speak(BV.LES[LZ.g][LZ.s].intro);return}});
/* ---------- bảng cài đặt giọng cô giáo ---------- */
const SAMPLE="Chào các con! Hôm nay cô cùng các con học bài nhé. 25 + 17 = 42. Tiếng “nghé” bắt đầu bằng âm “ngh”. Quả cam nặng 2,5 kg. 3/4 cái bánh.";
async function voiceView(){const box=$("voiceBox");if(!box)return;const V=BV.voice,vs=V.voices(),cloud=!!(window.BV_TTS&&BV_TTS.apiKey);let cv=[];if(cloud){try{cv=await V.listCloud()}catch(e){cv=[]}}
 const cur=V.cloudOn()&&cv.length?"Giọng Google Cloud: "+(V.cfg.cvoice||(BV_TTS.voice)||cv.find(v=>v.g==="FEMALE")?.name||cv[0]?.name):vs.length?"Giọng trên máy: "+V.current():"Máy này chưa có giọng tiếng Việt";
 const myCode=Object.keys(S.teach||{})[0]||null;const dict=V.cfg.dict||{},cdict=V.classDict||{};
 box.innerHTML=`<h3>Giọng cô giáo</h3><p class="note" style="margin-top:2px">Đang dùng: <b id="vcur"></b></p>
 ${!vs.length&&!cloud?`<div class="weak"><div>Máy chưa có giọng đọc tiếng Việt. Xem cách cài ở cuối khung này.</div></div>`:""}
 <div style="display:grid;gap:10px;margin-top:10px">
 ${cloud&&cv.length?`<label class="vrow">Giọng Google<select id="vcloud">${cv.map(v=>`<option value="${esc(v.name)}" ${v.name===(V.cfg.cvoice||BV_TTS.voice)?"selected":""}>${esc(v.name.replace("vi-VN-",""))} · ${v.g==="FEMALE"?"nữ":"nam"}</option>`).join("")}</select></label>
  <label class="vrow">Nguồn giọng<select id="veng"><option value="auto" ${V.cfg.engine!=="local"?"selected":""}>Google Cloud (chuẩn nhất)</option><option value="local" ${V.cfg.engine==="local"?"selected":""}>Giọng trên máy</option></select></label>`:""}
 ${vs.length?`<label class="vrow">Giọng trên máy<select id="vlocal">${vs.map(v=>`<option value="${esc(v.name)}" ${v.name===V.current()?"selected":""}>${esc(v.name)}</option>`).join("")}</select></label>`:""}
 <label class="vrow">Tốc độ đọc<input type="range" id="vrate" min="0.6" max="1.1" step="0.05" value="${V.cfg.rate}"><span id="vrv">${Math.round(V.cfg.rate*100)}%</span></label>
 <div class="acts"><button class="btn g" id="vtest">Nghe thử giọng cô</button><button class="btn alt" id="vstop">Dừng</button></div>
 <label style="font-weight:700">Gõ câu bất kì để nghe thử
 <textarea id="vtxt" rows="2" style="width:100%;font:inherit;padding:10px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--ink);margin-top:4px">${esc(SAMPLE)}</textarea></label>
 <p class="note" style="margin:0">Máy sẽ đọc là: <i id="vprev"></i></p>
 <div class="acts"><button class="btn alt" id="vsay">Đọc câu này</button></div>
 <h3 style="margin-top:10px">Sửa cách đọc</h3><p class="note" style="margin:0">Nếu nghe thấy từ nào đọc chưa chuẩn, ghi cách viết và cách đọc đúng. Trang sẽ đọc theo cách bạn sửa.</p>
 <div class="namebox" style="margin-top:6px"><input id="dw" placeholder="Chữ viết, VD: km/giờ" aria-label="Chữ viết"><input id="dr" placeholder="Đọc là, VD: ki lô mét trên giờ" aria-label="Đọc là"><button class="btn" id="dadd">Thêm</button></div>
 <div id="dlist"></div>
 ${myCode?`<div class="acts"><button class="btn coral" id="dclass">Áp dụng bảng sửa cho cả lớp ${esc(myCode)}</button></div><p class="note" id="dmsg" style="margin:0"></p>`:""}
 <details style="margin-top:6px"><summary style="font-weight:800;cursor:pointer">Cách có giọng tiếng Việt hay trên máy</summary><ul>
  <li><b>Máy tính Windows:</b> mở trang bằng trình duyệt <b>Microsoft Edge</b> để có giọng nữ “HoaiMy (Natural)” rất tự nhiên.</li>
  <li><b>Điện thoại Android:</b> Cài đặt → Hệ thống → Ngôn ngữ → Chuyển văn bản thành giọng nói → chọn “Dịch vụ lời nói của Google”, tải gói tiếng Việt.</li>
  <li><b>iPhone, iPad:</b> Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Việt → tải giọng “Linh” (bản nâng cao).</li>
  <li><b>Chuẩn nhất trên mọi máy:</b> bật giọng Google Cloud theo tệp HƯỚNG DẪN (phần “Giọng cô giáo”).</li></ul></details></div>`;
 $("vcur").textContent=cur;const prev=()=>{$("vprev").textContent=V.normalize($("vtxt").value)};prev();
 const dl=Object.entries(Object.assign({},cdict,dict));$("dlist").innerHTML=dl.length?`<table><tbody>${dl.map(([k,v])=>`<tr><td data-k></td><td data-v></td><td>${dict[k]!=null?`<button class="btn alt" data-ddel="${esc(k)}" style="min-height:34px;padding:4px 10px">Xoá</button>`:`<span class="note">của lớp</span>`}</td></tr>`).join("")}</tbody></table>`:"";
 [...$("dlist").querySelectorAll("tr")].forEach((tr,i)=>{tr.querySelector("[data-k]").textContent=dl[i][0];tr.querySelector("[data-v]").textContent="→ "+dl[i][1]});
 $("vtxt").addEventListener("input",prev);
 $("vrate").addEventListener("input",e=>{V.cfg.rate=+e.target.value;$("vrv").textContent=Math.round(V.cfg.rate*100)+"%";V.save()});
 if($("vlocal"))$("vlocal").addEventListener("change",e=>{V.cfg.voice=e.target.value;V.save();voiceView()});
 if($("vcloud"))$("vcloud").addEventListener("change",e=>{V.cfg.cvoice=e.target.value;V.save();voiceView()});
 if($("veng"))$("veng").addEventListener("change",e=>{V.cfg.engine=e.target.value;V.save();voiceView()});
 $("vtest").onclick=()=>V.speak(SAMPLE);$("vstop").onclick=()=>V.stop();$("vsay").onclick=()=>V.speak($("vtxt").value);
 $("dadd").onclick=()=>{const k=$("dw").value.trim(),v=$("dr").value.trim();if(!k||!v)return;V.cfg.dict=Object.assign({},V.cfg.dict,{[k]:v});V.save();voiceView()};
 $("dlist").onclick=e=>{const b=e.target.closest("[data-ddel]");if(!b)return;const d=Object.assign({},V.cfg.dict);delete d[b.dataset.ddel];V.cfg.dict=d;V.save();voiceView()};
 if($("dclass"))$("dclass").onclick=async()=>{try{const ok=await CL.init();if(!ok)throw new Error("Chưa kết nối lớp chung");const d=Object.assign({},V.classDict,V.cfg.dict);await CL.db.set(`classes/${myCode}`,{dict:d});V.classDict=d;$("dmsg").textContent="Đã áp dụng cho cả lớp. Máy các bé sẽ nhận bảng sửa khi mở trang."}catch(err){$("dmsg").textContent="Chưa lưu được: "+err.message}}}
if(BV.voice)BV.voice.onchange=()=>{if($("v-guide")&&$("v-guide").classList.contains("on"))voiceView()};
async function loadClassDict(){const p=P();const code=p&&p.cls?p.cls.code:Object.keys(S.teach||{})[0];if(!code||!window.BV_FIREBASE)return;try{if(!(await CL.init()))return;const c=await CL.getClass(code);BV.voice.classDict=(c&&c.dict)||{}}catch(e){}}
/* ---------- lớp chung (nhiều máy, lưu trên Firebase) ---------- */
const progOf=p=>({best:p.best,st:p.st,lv:p.lv,owned:p.owned,tests:p.tests.slice(0,20),rv:p.rv.slice(-120)});
let syncT=null;
function sync(){const p=S.players&&S.players[S.cur];if(!p||!p.cls||!window.CL||!CL.ready)return;clearTimeout(syncT);const c=p.cls,pr=progOf(p),g=p.grade;syncT=setTimeout(()=>CL.saveProg(c.code,c.sid,pr,g).catch(()=>{}),1200)}
function seeded(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function startShared(code,ex){const r=Math.random;let qs;Math.random=seeded(ex.seed);try{qs=shuffle(build(ex.g,ex.sub,[...Array(ex.k).keys()],examLevels(ex.n)))}finally{Math.random=r}
 Q={mode:"exam",g:ex.g,sub:ex.sub,k:ex.k,qs,i:0,score:0,res:[],ans:[],gain:0,end:ex.min?Date.now()+ex.min*60000:0,shared:{code,id:ex.id,title:ex.title},t0:Date.now()};show("play");drawQ();if(Q.end)runClock()}
const CV={code:null,tab:"rank",rt:"w",step:null,sel:null,msg:""};
const cbox=()=>$("cls");
const subN=s=>s==="t"?"Toán":"Tiếng Việt";
const fmtT=t=>{const d=new Date(t);return`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")} ${d.getDate()}/${d.getMonth()+1}`};
const msLabel=ms=>{const s=Math.round(ms/1000);return`${Math.floor(s/60)} phút ${s%60} giây`};
function cErr(e){CV.msg=String(e&&e.message||e);classView()}
async function classView(){const box=cbox();const p=P();
 box.innerHTML=`<h2>Lớp chung</h2><p>Đang kết nối…</p>`;
 const ok=await CL.init();
 if(!ok){box.innerHTML=`<h2>Lớp chung</h2><div class="card" style="margin-top:16px"><h3>${CL.err==="nocfg"?"Lớp chung chưa được cài đặt":"Chưa kết nối được"}</h3>
  <p>${CL.err==="nocfg"?"Mục này cần một nơi lưu dữ liệu chung (Firebase) để các bé ở nhiều máy vào cùng một lớp, thi chung và xem bảng xếp hạng tuần, tháng. Thầy cô hoặc phụ huynh làm theo tệp HƯỚNG DẪN đi kèm trang (khoảng 15 phút) để bật mục này.":"Máy đang không vào được mạng hoặc cấu hình Firebase chưa đúng. Hãy kiểm tra mạng rồi thử lại."}</p>
  ${CL.err!=="nocfg"?`<p class="note" id="cerr"></p><button class="btn" data-c="retry">Thử lại</button>`:""}<p class="note">Trong lúc chờ, các bé vẫn học và làm bài bình thường trên máy này.</p></div>`;if($("cerr"))$("cerr").textContent=CL.err;return}
 const code=p&&p.cls?p.cls.code:CV.code;
 if(!code)return joinView();
 let c;try{c=await CL.getClass(code)}catch(e){box.textContent="Lỗi: "+e.message;return}
 if(!c){CV.code=null;CV.msg="Không tìm thấy lớp có mã này.";return joinView()}
 CV.code=code;const teach=!!(S.teach&&S.teach[code]),me=p&&p.cls&&p.cls.code===code?p.cls:null;
 const tabs=[["rank","Xếp hạng"],["exam","Thi chung"],["act","Hoạt động"],...(teach?[["teach","Giáo viên"]]:[])];
 box.innerHTML=`<div class="gband card" style="--g:${GM[c.grade]?GM[c.grade].color:"#2457d6"};background:var(--g);color:#fff;border:0"><h2 id="cname"></h2><p>Mã lớp: <b style="font-size:24px;letter-spacing:3px">${esc(code)}</b> · Khối ${esc(c.grade)} · ${me?`Bé đang là <b id="cme"></b>`:teach?"Bạn đang ở chế độ giáo viên":""}</p><div class="acts"><button class="btn alt" data-c="leave">${me?"Thoát lớp trên máy này":"Rời khỏi lớp"}</button></div></div>
 <div class="tabs">${tabs.map(([k,l])=>`<button data-ctab="${k}" aria-pressed="${CV.tab===k}">${l}</button>`).join("")}</div><p class="note" id="cmsg"></p><div id="cbody"><p>Đang tải…</p></div>`;
 $("cname").textContent=c.name;if(me)$("cme").textContent=me.name;$("cmsg").textContent=CV.msg;CV.msg="";
 if(CV.tab==="teach"&&!teach)CV.tab="rank";
 try{await({rank:rankTab,exam:examTab,act:actTab,teach:teachTab})[CV.tab](code,c,me)}catch(e){$("cbody").textContent="Lỗi tải dữ liệu: "+e.message}}
function joinView(){const box=cbox();const st=CV.step;
 let inner="";
 if(st&&st.kind==="pick"){inner=`<div class="card"><h3>Lớp: <span id="pcn"></span> (mã ${esc(st.code)})</h3><p>Bé chọn tên của mình:</p><div class="chips" id="snames">${st.list.map(s=>`<button data-c="pick" data-sid="${esc(s.id)}">${esc(s.name)}</button>`).join("")}</div>
  ${st.sel?`<form class="namebox" id="pinForm"><input id="pinIn" type="password" inputmode="numeric" maxlength="6" placeholder="Mã PIN của ${esc(st.sel.name)}" aria-label="Mã PIN" autocomplete="off"><button class="btn coral">Vào lớp</button></form><p class="note">${st.sel.pinH?"Nhập mã PIN bé đã đặt.":"Bé chưa có mã PIN (hoặc thầy cô vừa đặt lại). Hãy đặt mã PIN mới gồm 4 đến 6 chữ số."}</p>`:""}
  <h3 style="margin-top:18px">Bé chưa có tên trong lớp?</h3><form class="namebox" id="newForm"><input id="newName" maxlength="24" placeholder="Họ tên của bé" aria-label="Họ tên"><input id="newPin" type="password" inputmode="numeric" maxlength="6" placeholder="Đặt mã PIN 4–6 số" aria-label="Mã PIN mới"><button class="btn">Thêm tên</button></form>
  <button class="btn alt" data-c="back" style="margin-top:12px">Nhập mã lớp khác</button></div>`}
 else inner=`<div class="grid2"><div class="card"><h3>Bé vào lớp</h3><p>Nhập mã lớp thầy cô gửi (6 kí tự).</p><form class="namebox" id="codeForm"><input id="codeIn" maxlength="6" placeholder="VD: K7M2QP" aria-label="Mã lớp" autocomplete="off" style="text-transform:uppercase"><button class="btn coral">Tiếp</button></form></div>
  <div class="card"><h3>Thầy cô tạo lớp mới</h3><form id="mkForm" style="display:grid;gap:10px"><div class="namebox" style="margin:0"><input id="mkName" maxlength="40" placeholder="Tên lớp, VD: Lớp 3A – Trường Kim Đồng" aria-label="Tên lớp"></div>
   <div class="namebox" style="margin:0"><select id="mkGrade" aria-label="Khối lớp" style="font-size:18px;padding:12px;border-radius:16px;border:3px solid var(--line);background:var(--card);color:var(--ink);min-height:52px">${[1,2,3,4,5].map(g=>`<option value="${g}">Khối ${g}</option>`).join("")}</select><input id="mkPin" type="password" inputmode="numeric" maxlength="6" placeholder="Mã PIN giáo viên 4–6 số" aria-label="Mã PIN giáo viên"></div><button class="btn">Tạo lớp</button></form>
   <h3 style="margin-top:18px">Thầy cô vào lớp đã có</h3><form class="namebox" id="tForm"><input id="tCode" maxlength="6" placeholder="Mã lớp" aria-label="Mã lớp" style="text-transform:uppercase"><input id="tPin" type="password" inputmode="numeric" maxlength="6" placeholder="PIN giáo viên" aria-label="PIN giáo viên"><button class="btn alt">Vào</button></form></div></div>`;
 box.innerHTML=`<h2>Lớp chung</h2><p>Các bé ở nhiều máy cùng vào một lớp để làm bài thi chung, tích sao và xem bảng xếp hạng theo tuần, tháng.</p><p class="note" id="cmsg"></p>${inner}`;
 $("cmsg").textContent=CV.msg;CV.msg="";if(st&&st.kind==="pick")$("pcn").textContent=st.name;
 const pinF=$("pinForm");if(pinF)setTimeout(()=>{const el=$("pinIn");if(el)el.focus()},50)}
async function rankTab(code,c,me){const list=await CL.students(code);const k=CV.rt==="w"?CL.wk():CV.rt==="m"?CL.mk():"earned";
 const rows=list.map(s=>({id:s.id,name:s.name,v:s[k]||0,g:s.grade})).sort((a,b)=>b.v-a.v||a.name.localeCompare(b.name));
 $("cbody").innerHTML=`<div class="tabs">${[["w","Tuần này"],["m","Tháng này"],["a","Từ trước đến nay"]].map(([x,l])=>`<button data-crt="${x}" aria-pressed="${CV.rt===x}">${l}</button>`).join("")}</div>
 ${rows.length?`<table><thead><tr><th>Hạng</th><th>Tên</th><th class="n">Sao ${CV.rt==="w"?"tuần này":CV.rt==="m"?"tháng này":"tổng"}</th></tr></thead><tbody id="rk"></tbody></table>`:`<p>Lớp chưa có bạn nào. Các bé nhập mã lớp để vào nhé.</p>`}
 <p class="note">Sao được tính từ mọi bài bé làm khi đang ở trong lớp: luyện chặng, kiểm tra, thi chung và ôn câu sai. Tuần tính từ thứ Hai.</p>`;
 if(rows.length){$("rk").innerHTML=rows.map((r,i)=>`<tr${me&&me.sid===r.id?' style="background:var(--tint)"':""}><td><span class="medal">${i+1}</span></td><td><b></b></td><td class="n">${r.v}</td></tr>`).join("");[...$("rk").children].forEach((tr,i)=>tr.querySelector("b").textContent=rows[i].name)}}
async function examTab(code,c,me){const ex=await CL.exams(code);const teach=S.teach&&S.teach[code];
 const mine=me?await Promise.all(ex.map(e=>CL.myResult(code,e.id,me.sid))):[];
 $("cbody").innerHTML=ex.length?`<div style="display:grid;gap:14px;margin-top:14px">${ex.map((e,i)=>`<div class="card"><h3 data-t="t${i}"></h3><p>${subN(e.sub)} lớp ${esc(e.g)} · ${e.k===3?"chặng 1–3":"cả 6 chặng"} · ${esc(e.n)} câu${e.min?` · ${esc(e.min)} phút`:""} · ${e.open?"<b style='color:var(--ok)'>Đang mở</b>":"Đã đóng"}</p>
  <div class="acts">${me?(mine[i]?`<span class="pill">Bé đã nộp: ${String(mine[i].d10).replace(".",",")} điểm (${mine[i].score}/${mine[i].n})</span>`:e.open?`<button class="btn coral" data-c="take" data-x="${esc(e.id)}">Làm bài</button>`:""):""}<button class="btn alt" data-c="res" data-x="${esc(e.id)}">Bảng điểm</button>${teach?`<button class="btn alt" data-c="toggle" data-x="${esc(e.id)}" data-o="${e.open?1:0}">${e.open?"Đóng đề":"Mở lại đề"}</button>`:""}</div><div id="res-${esc(e.id)}"></div></div>`).join("")}</div>`:`<p style="margin-top:14px">Chưa có đề thi chung nào.${teach?" Thầy cô vào thẻ Giáo viên để tạo đề.":" Khi thầy cô tạo đề, đề sẽ hiện ở đây."}</p>`;
 ex.forEach((e,i)=>{const h=document.querySelector(`[data-t="t${i}"]`);if(h)h.textContent=e.title});CV.ex=ex}
async function showResults(code,id){const el=$("res-"+id);if(!el)return;el.innerHTML="<p>Đang tải…</p>";const rs=(await CL.results(code,id)).sort((a,b)=>b.score-a.score||a.ms-b.ms);
 el.innerHTML=rs.length?`<table><thead><tr><th>Hạng</th><th>Tên</th><th class="n">Điểm</th><th class="n">Thời gian</th></tr></thead><tbody>${rs.map((r,i)=>`<tr><td><span class="medal">${i+1}</span></td><td><b data-n="${i}"></b></td><td class="n">${String(r.d10).replace(".",",")} (${r.score}/${r.n})</td><td class="n">${msLabel(r.ms)}</td></tr>`).join("")}</tbody></table>`:"<p>Chưa có bạn nào nộp bài.</p>";
 el.querySelectorAll("[data-n]").forEach(b=>b.textContent=rs[+b.dataset.n].name)}
async function actTab(code){const ev=await CL.events(code,20);
 $("cbody").innerHTML=ev.length?`<ol class="rv" id="evl">${ev.map(()=>"<li></li>").join("")}</ol>`:"<p style='margin-top:14px'>Chưa có hoạt động nào.</p>";
 if(ev.length)[...$("evl").children].forEach((li,i)=>{const e=ev[i];li.textContent=`${fmtT(e.ts)} · ${e.name} ${e.type==="learn"?"luyện":e.type==="review"?"ôn câu sai":"làm bài kiểm tra"} ${e.sub?subN(e.sub):""} lớp ${e.g||""}${e.ex?` (${e.ex})`:""}: đúng ${e.score}/${e.n}, nhận ${e.gain} sao`})}
const baseUrl=()=>location.origin+location.pathname;
const linkFor=(code,pin)=>`${baseUrl()}?lop=${code}${pin?`&ma=${pin}`:""}`;
function copyText(txt,el){const done=m=>{if(el)el.textContent=m};try{navigator.clipboard.writeText(txt).then(()=>done("Đã sao chép"),()=>fallback())}catch(e){fallback()}
 function fallback(){const ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");done("Đã sao chép")}catch(e){done("Hãy bôi đen và sao chép tay")}ta.remove()}}
const issuedText=(code,list)=>list.map(x=>`${x.name}: mã ${x.pin} – ${linkFor(code,x.pin)}`).join("\n");
function qrSvg(t){try{const q=qrcode(0,"M");q.addData(t);q.make();return q.createSvgTag({cellSize:4,margin:2,scalable:true})}catch(e){return""}}
function printCards(code,cname,list){const area=$("printArea");
 area.innerHTML=`<div class="pcards">${list.map((x,i)=>`<div class="pcard"><div class="pq">${qrSvg(linkFor(code,x.pin))}</div><div><div class="pn" data-i="${i}"></div><div class="pl" data-l="${i}"></div><div class="pm">Mã của bé: <b>${esc(x.pin)}</b></div><div class="ps">Quét mã QR hoặc mở trang, bấm “Nhập mã của bé”.</div></div></div>`).join("")}</div>`;
 area.querySelectorAll("[data-i]").forEach(d=>d.textContent=list[+d.dataset.i].name);area.querySelectorAll("[data-l]").forEach(d=>d.textContent=cname);
 document.body.classList.add("printing");setTimeout(()=>{try{window.print()}catch(e){}},300)}
window.addEventListener("afterprint",()=>document.body.classList.remove("printing"));
async function teachTab(code,c){const list=await CL.students(code);const iss=CV.issued&&CV.issued.code===code?CV.issued.list:[];
 $("cbody").innerHTML=`<div class="grid2">
 <div class="card"><h3>Đường link vào lớp</h3><p>Gửi link này vào nhóm Zalo của lớp. Bé mở link, bấm <b>Nhập mã của bé</b>, gõ 6 số là vào học.</p><div class="linkbox" id="clink"></div><div class="acts" style="margin-top:10px"><button class="btn coral" data-c="copy" data-v="class">Sao chép link lớp</button></div></div>
 <div class="card"><h3>Thêm học sinh và cấp mã</h3><p class="note">Mỗi dòng một tên. Trang tự cấp cho mỗi bé một mã 6 số và một link riêng (mở là vào ngay).</p><form id="bulkForm"><textarea id="bulkIn" rows="5" placeholder="Nguyễn Văn An&#10;Trần Thị Bình&#10;Lê Minh Châu" aria-label="Danh sách tên" style="width:100%;font:inherit;font-size:17px;padding:10px;border-radius:14px;border:2px solid var(--line);background:var(--card);color:var(--ink)"></textarea><button class="btn" style="margin-top:8px">Thêm và cấp mã</button></form></div></div>
 ${iss.length?`<div class="card" style="margin-top:18px;border-color:var(--ok)"><h3>Mã vừa cấp (${iss.length} bạn)</h3><p class="note">Hãy sao chép hoặc in ngay. Để bảo vệ các bé, mã chỉ hiện lúc vừa cấp. Bé quên mã thì bấm “Cấp mã mới”.</p>
  <table><thead><tr><th>Tên</th><th>Mã</th><th>Link riêng</th></tr></thead><tbody id="isl"></tbody></table>
  <div class="acts" style="margin-top:12px"><button class="btn coral" data-c="copy" data-v="issued">Sao chép tất cả</button><button class="btn" data-c="print">In thẻ đăng nhập có mã QR</button></div></div>`:""}
 <div class="card" style="margin-top:18px"><h3>Tạo đề thi chung</h3><p class="note">Mọi bạn trong lớp nhận cùng một đề, cùng thứ tự câu. Mỗi bạn được nộp một lần.</p>
  <form id="exForm" style="display:grid;gap:10px;margin-top:8px;max-width:560px"><input id="exTitle" maxlength="60" placeholder="Tên đề, VD: Thi thử Toán tuần 12" style="font-size:17px;padding:12px;border-radius:14px;border:2px solid var(--line);background:var(--card);color:var(--ink)" aria-label="Tên đề">
  ${[["exSub","Môn",[["t","Toán"],["v","Tiếng Việt"]]],["exG","Khối",[1,2,3,4,5].map(g=>[g,"Lớp "+g])],["exK","Phạm vi",[[3,"Giữa năm (chặng 1–3)"],[6,"Cuối năm (cả 6 chặng)"]]],["exN","Số câu",[[10,"10 câu"],[15,"15 câu"],[20,"20 câu"]]],["exMin","Thời gian",[[0,"Không giới hạn"],[15,"15 phút"],[20,"20 phút"],[30,"30 phút"],[40,"40 phút"]]]].map(([id,l,o])=>`<label style="display:grid;grid-template-columns:6em 1fr;align-items:center;gap:8px;font-weight:700">${l}<select id="${id}" style="font-size:17px;padding:10px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--ink);min-height:44px">${o.map(([v,t])=>`<option value="${v}"${id==="exG"&&+v===+c.grade?" selected":""}${id==="exMin"&&v===20?" selected":""}>${t}</option>`).join("")}</select></label>`).join("")}
  <button class="btn coral">Tạo đề</button></form></div>
 <div class="card" style="margin-top:18px"><h3>Học sinh (${list.length})</h3>${list.length?`<table><thead><tr><th>Tên</th><th class="n">Sao</th><th></th></tr></thead><tbody id="stl"></tbody></table><div class="acts" style="margin-top:12px"><button class="btn alt" data-c="allpins">Cấp mã mới cho cả lớp</button></div>`:"<p>Chưa có bạn nào. Thêm tên ở ô bên trên.</p>"}
  <p class="note">Cấp mã mới khi bé quên mã: mã và link cũ của bé sẽ không dùng được nữa. Ẩn tên khi tạo nhầm.</p></div>`;
 $("clink").textContent=linkFor(code);
 if(iss.length){$("isl").innerHTML=iss.map(()=>`<tr><td><b></b></td><td><b class="pinv"></b></td><td class="linkcell"></td></tr>`).join("");[...$("isl").children].forEach((tr,i)=>{const x=iss[i];tr.querySelector("b").textContent=x.name;tr.querySelector(".pinv").textContent=x.pin;tr.querySelector(".linkcell").textContent=linkFor(code,x.pin)})}
 if(list.length){$("stl").innerHTML=list.map(s=>`<tr><td><b></b><div class="note" style="margin:0">Lớp ${esc(s.grade)}${s.last?` · học gần nhất ${fmtT(s.last)}`:""}</div></td><td class="n">${s.earned||0}</td><td><div class="acts"><button class="btn alt" data-c="rpin" data-sid="${esc(s.id)}" style="padding:6px 10px;min-height:36px">Cấp mã mới</button><button class="btn alt" data-c="hide" data-sid="${esc(s.id)}" style="padding:6px 10px;min-height:36px">Ẩn</button></div></td></tr>`).join("");[...$("stl").children].forEach((tr,i)=>tr.querySelector("b").textContent=list[i].name)}}
function loginAs(code,s,dest){const key=`${s.name} · ${code}`;let pr={};try{pr=s.prog?JSON.parse(s.prog):{}}catch(e){}
 const p=Object.assign(newP(s.grade||1),pr,{grade:s.grade||1,stars:s.stars||0,earned:s.earned||0,cls:{code,sid:s.id,name:s.name}});
 S.players[key]=p;S.cur=key;CV.step=null;CV.code=code;save();header();loadClassDict();
 if(dest){location.hash=dest}else{location.hash="#lop-chung";classView()}}
/* ---------- màn chào mừng: đăng nhập nhanh bằng link ---------- */
const W={open:false};
function wClose(){W.open=false;$("welcome").innerHTML="";document.body.classList.remove("wopen")}
function wRender(){const el=$("welcome");W.open=true;document.body.classList.add("wopen");
 const rem=W.code?Object.keys(S.players).filter(k=>S.players[k].cls&&S.players[k].cls.code===W.code):[];
 let body="";
 if(W.state==="load")body=`<p class="wsub">Đang mở lớp học…</p>`;
 else if(W.state==="err")body=`<p class="wsub" id="wmsg"></p><button class="wbig coral" data-w="close"><span>Vào trang học</span><small>Bé vẫn học được trên máy này</small></button>`;
 else if(W.state==="hi")body=`<p class="wsub">Chào <b id="whi"></b>! Mình vào học thôi.</p>`;
 else{body=`<p class="wsub">Học Toán và Tiếng Việt cùng cú Bông</p><p class="wmsg" id="wmsg"></p>
  ${rem.map(k=>`<button class="wbig green" data-w="cont" data-k="${esc(k)}"><span>Tiếp tục học</span><small data-wn="${esc(k)}"></small></button>`).join("")}
  ${W.state==="pin"?`<div class="wboxes" aria-live="polite">${[0,1,2,3,4,5].map(i=>`<i class="${i<W.pin.length?"f":""}">${W.pin[i]?"●":""}</i>`).join("")}</div>
   <div class="wpad">${["1","2","3","4","5","6","7","8","9","Xoá","0","Vào"].map(k=>`<button data-wk="${k}" class="${k==="Vào"?"go":""}">${k}</button>`).join("")}</div>`
   :`<button class="wbig coral" data-w="pin"><span>Nhập mã của bé</span><small>Mã 6 số thầy cô gửi</small></button>`}
  <p class="wnote">Chưa có mã? Ba mẹ nhắn thầy cô để lấy mã nhé.</p><div class="wlinks"><button data-w="names">Bé tự đặt mã? Chọn tên</button><button data-w="close">Để sau</button></div>`}
 el.innerHTML=`<div class="wel" role="dialog" aria-modal="true" aria-labelledby="wt"><div class="wbox pop"><svg class="wowl" aria-hidden="true"><use href="#owl"/></svg>${W.c?`<span class="wchip" id="wcn"></span>`:""}<h2 id="wt">Chào mừng bé đến lớp!</h2>${body}</div></div>`;
 if($("wcn"))$("wcn").textContent="Lớp chung · "+W.c.name;if($("wmsg"))$("wmsg").textContent=W.msg||"";if($("whi"))$("whi").textContent=W.hi||"";
 el.querySelectorAll("[data-wn]").forEach(s=>s.textContent="Bé "+nmOf(s.dataset.wn))}
async function quickStart(code,pin){code=String(code).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);try{history.replaceState(null,"",location.pathname+location.hash)}catch(e){}
 Object.assign(W,{code,c:null,state:"load",pin:"",msg:""});wRender();
 const ok=await CL.init();if(!ok){W.state="err";W.msg=CL.err==="nocfg"?"Trang này chưa bật Lớp chung.":"Chưa kết nối được. Hãy kiểm tra mạng rồi mở lại link.";return wRender()}
 try{W.c=await CL.getClass(code)}catch(e){W.c=null}
 if(!W.c){W.state="err";W.msg="Không tìm thấy lớp trong đường link. Ba mẹ hỏi lại thầy cô link mới nhé.";return wRender()}
 W.state="home";if(pin&&/^\d{4,6}$/.test(pin)){const s=await CL.loginByPin(code,pin);if(s)return wGo(code,s);W.msg="Mã trong đường link đã cũ. Bé nhập mã mới thầy cô gửi nhé."}
 wRender()}
function wGo(code,s){W.state="hi";W.hi=s.name;wRender();setTimeout(()=>{wClose();loginAs(code,s,"#lop-"+(s.grade||1))},900)}
async function wSubmit(){const pin=W.pin;if(pin.length<4){W.msg="Mã gồm 6 số nhé.";return wRender()}
 const s=await CL.loginByPin(W.code,pin);if(s)return wGo(W.code,s);beep(false);W.pin="";W.msg="Mã chưa đúng rồi, bé thử lại nhé!";wRender()}
document.addEventListener("click",e=>{if(!W.open)return;const t=e.target;
 const k=t.closest("[data-wk]");if(k){const v=k.dataset.wk;if(v==="Xoá")W.pin=W.pin.slice(0,-1);else if(v==="Vào")return wSubmit();else if(W.pin.length<6)W.pin+=v;W.msg="";wRender();if(W.pin.length===6)wSubmit();return}
 const b=t.closest("[data-w]");if(!b)return;const a=b.dataset.w;
 if(a==="pin"){W.state="pin";W.pin="";wRender()}
 else if(a==="cont"){S.cur=b.dataset.k;save();header();wClose();location.hash="#lop-"+P().grade}
 else if(a==="names"){const code=W.code;wClose();CV.code=null;location.hash="#lop-chung";CL.getClass(code).then(async c=>{CV.step={kind:"pick",code,name:c.name,grade:c.grade,list:await CL.students(code),sel:null};joinView()}).catch(()=>{})}
 else if(a==="close")wClose()});
document.addEventListener("keydown",e=>{if(!W.open||W.state!=="pin")return;if(/^\d$/.test(e.key)&&W.pin.length<6){W.pin+=e.key;W.msg="";wRender();if(W.pin.length===6)wSubmit()}else if(e.key==="Backspace"){W.pin=W.pin.slice(0,-1);wRender()}else if(e.key==="Enter")wSubmit();else if(e.key==="Escape")wClose()});
document.addEventListener("submit",async e=>{const f=e.target;if(!["codeForm","pinForm","newForm","mkForm","tForm","exForm","bulkForm"].includes(f.id))return;e.preventDefault();
 try{
 if(f.id==="codeForm"){const code=$("codeIn").value.trim().toUpperCase();if(code.length<6){CV.msg="Mã lớp gồm 6 kí tự.";return joinView()}const c=await CL.getClass(code);if(!c){CV.msg="Không tìm thấy lớp có mã này.";return joinView()}
  CV.step={kind:"pick",code,name:c.name,grade:c.grade,list:await CL.students(code),sel:null};return joinView()}
 if(f.id==="pinForm"){const st=CV.step,pin=$("pinIn").value.trim();if(!/^\d{4,6}$/.test(pin)){CV.msg="Mã PIN gồm 4 đến 6 chữ số.";return joinView()}const s=await CL.login(st.code,st.sel.id,pin);if(!s){CV.msg="Mã PIN chưa đúng. Bé thử lại hoặc nhờ thầy cô đặt lại PIN.";return joinView()}
  return loginAs(st.code,Object.assign({id:st.sel.id},s))}
 if(f.id==="newForm"){const st=CV.step,n=$("newName").value.trim().replace(/\s+/g," "),pin=$("newPin").value.trim();if(n.length<2){CV.msg="Hãy nhập họ tên của bé.";return joinView()}if(!/^\d{4,6}$/.test(pin)){CV.msg="Mã PIN gồm 4 đến 6 chữ số.";return joinView()}
  const id=await CL.addStudent(st.code,n,pin,st.grade);return loginAs(st.code,{id,name:n,grade:st.grade,stars:0,earned:0})}
 if(f.id==="mkForm"){const n=$("mkName").value.trim(),g=+$("mkGrade").value,pin=$("mkPin").value.trim();if(n.length<2){CV.msg="Hãy nhập tên lớp.";return joinView()}if(!/^\d{4,6}$/.test(pin)){CV.msg="PIN giáo viên gồm 4 đến 6 chữ số. Hãy ghi nhớ PIN này.";return joinView()}
  const code=await CL.createClass(n,g,pin);S.teach=S.teach||{};S.teach[code]=true;CV.code=code;CV.tab="teach";CV.msg=`Đã tạo lớp. Gửi mã ${code} cho phụ huynh để các bé vào lớp.`;save();return classView()}
 if(f.id==="tForm"){const code=$("tCode").value.trim().toUpperCase(),pin=$("tPin").value.trim();if(!(await CL.teacherOk(code,pin))){CV.msg="Mã lớp hoặc PIN giáo viên chưa đúng.";return joinView()}S.teach=S.teach||{};S.teach[code]=true;CV.code=code;CV.tab="teach";save();return classView()}
 if(f.id==="bulkForm"){const names=$("bulkIn").value.split(/\n/).map(x=>x.trim().replace(/\s+/g," ")).filter(x=>x.length>1);if(!names.length){CV.msg="Hãy nhập ít nhất một tên.";return classView()}
  const c=await CL.getClass(CV.code);const r=await CL.bulkAdd(CV.code,names,c.grade);CV.issued={code:CV.code,list:r.out};CV.msg=`Đã thêm ${r.out.length} bạn.`+(r.skip.length?` Bỏ qua: ${r.skip.join(", ")}.`:"");return classView()}
 if(f.id==="exForm"){const code=CV.code,t=$("exTitle").value.trim()||`Thi thử ${subN($("exSub").value)} lớp ${$("exG").value}`;
  await CL.createExam(code,{title:t,sub:$("exSub").value,g:+$("exG").value,k:+$("exK").value,n:+$("exN").value,min:+$("exMin").value});CV.tab="exam";CV.msg="Đã tạo đề. Các bé vào thẻ Thi chung để làm bài.";return classView()}
 }catch(err){cErr(err)}});
document.addEventListener("click",async e=>{const t=e.target;const ct=t.closest("[data-ctab]");if(ct){CV.tab=ct.dataset.ctab;return classView()}
 const rt=t.closest("[data-crt]");if(rt){CV.rt=rt.dataset.crt;return classView()}
 const b=t.closest("[data-c]");if(!b)return;const a=b.dataset.c,code=CV.code;
 try{
 if(a==="retry"){CL._p=null;return classView()}
 if(a==="back"){CV.step=null;return joinView()}
 if(a==="pick"){CV.step.sel=CV.step.list.find(s=>s.id===b.dataset.sid);return joinView()}
 if(a==="leave"){const p=P();if(p&&p.cls&&p.cls.code===code){delete S.players[S.cur];S.cur=Object.keys(S.players).find(k=>!S.players[k].cls)||""}if(S.teach)delete S.teach[code];CV.code=null;CV.tab="rank";save();header();return classView()}
 if(a==="take"){const ex=CV.ex.find(x=>x.id===b.dataset.x),p=P();if(!ex||!p||!p.cls)return;if(await CL.myResult(code,ex.id,p.cls.sid)){CV.msg="Bé đã nộp bài này rồi.";return classView()}return startShared(code,ex)}
 if(a==="res")return showResults(code,b.dataset.x);
 if(a==="toggle"){await CL.setExam(code,b.dataset.x,{open:b.dataset.o!=="1"});return classView()}
 if(a==="rpin"){const r=await CL.newPins(code,[b.dataset.sid]);CV.issued={code,list:r};CV.msg="Đã cấp mã mới. Mã cũ không dùng được nữa.";return classView()}
 if(a==="allpins"){if(b.dataset.sure!=="1"){b.dataset.sure="1";b.textContent="Bấm lần nữa: mã cũ của cả lớp sẽ hết hiệu lực";return}const r=await CL.newPins(code,(await CL.students(code)).map(x=>x.id));CV.issued={code,list:r};CV.msg="Đã cấp mã mới cho cả lớp.";return classView()}
 if(a==="copy"){const txt=b.dataset.v==="class"?linkFor(code):issuedText(code,CV.issued.list);return copyText(txt,b)}
 if(a==="print"){const c=await CL.getClass(code);return printCards(code,c.name,CV.issued.list)}
 if(a==="hide"){if(b.dataset.sure!=="1"){b.dataset.sure="1";b.textContent="Bấm lần nữa để ẩn";return}await CL.hide(code,b.dataset.sid);return classView()}
 }catch(err){cErr(err)}});

/* ---------- điều hướng ---------- */
function show(v){document.querySelectorAll(".view").forEach(e=>e.classList.toggle("on",e.id==="v-"+v));header()}
function route(){clearInterval(tick);Q=null;try{BV.voice.stop()}catch(e){}
 const h=location.hash.slice(1),p=P();let v="home";
 document.querySelectorAll("nav a").forEach(a=>a.removeAttribute("aria-current"));
 const mark=sel=>{const a=document.querySelector(`nav a[href="#${sel}"]`);if(a)a.setAttribute("aria-current","page")};
 const m=h.match(/^lop-([1-5])$/);
 if(m||h==="lop"){const g=m?+m[1]:(p?p.grade:1);if(p&&p.grade!==g){p.grade=g;save()}gradeView(g);v="grade";header();$("navGrade").setAttribute("aria-current","page")}
 else if(h==="on-tap"){review();v="review";mark(h)}else if(h==="bao-cao"){repG=null;report();v="report";mark(h)}
 else if(h==="shop"){shop();v="shop";mark(h)}else if(h==="rank"){rank();v="rank";mark(h)}else if(h==="guide"){v="guide";mark(h);voiceView()}else if(h==="lop-chung"){classView();v="class";mark(h)}
 else if(/^bai-[1-5]-[0-5]$/.test(h)){const[,g,st]=h.split("-");if(p&&p.grade!==+g){p.grade=+g;save()}LZ.view="home";lessonView(+g,+st);v="lesson";$("navGrade").setAttribute("aria-current","page")}
 else{home();mark("home")}
 show(v);window.scrollTo({top:0})}
window.addEventListener("hashchange",route);

document.addEventListener("click",e=>{const t=e.target;
 const L=t.closest("[data-learn]");if(L){const[g,s,sub]=L.dataset.learn.split("|");startLearn(+g,+s,sub);return}
 const X=t.closest("[data-exam]");if(X){const[g,sub,k]=X.dataset.exam.split("|");startExam(+g,sub,+k);return}
 const gr=t.closest("[data-grade]");if(gr){const g=+gr.dataset.grade;if(!P()){$("nameIn").focus();$("hello").textContent=`Nhập tên của bé để vào lớp ${g} nhé.`;S.pending=g;return}location.hash="#lop-"+g;return}
 const o=t.closest(".opt");if(o&&Q){const q=Q.qs[Q.i];judge(q.opts[+o.dataset.o],o);return}
 if(t.closest("#sub")){judge($("inp").value.trim()||null);return}
 const k=t.closest("[data-k]");if(k&&$("inp")){const i=$("inp");i.value=k.dataset.k==="Xoá"?i.value.slice(0,-1):i.value+k.dataset.k;return}
 const ci=t.closest("[data-in]");if(ci){Q.ord.push(+ci.dataset.in);drawOrd();return}
 const co=t.closest("[data-out]");if(co&&!Q.done){Q.ord=Q.ord.filter(x=>x!==+co.dataset.out);drawOrd();return}
 if(t.closest("#oclr")){Q.ord=[];drawOrd();return}
 if(t.closest("#ochk")){const q=Q.qs[Q.i];if(Q.ord.length<q.words.length){$("fb").innerHTML=Q.mode==="exam"?$("fb").innerHTML:`<span class="n">Bé hãy xếp hết các thẻ nhé.</span>`;return}judge(Q.ord.map(i=>q.words[i]).join(" "));return}
 if(t.closest("#hint")){const p=P(),q=Q.qs[Q.i];if(Q.hint||Q.done||p.stars<1)return;p.stars--;Q.hint=true;save();header();const wr=shuffle(q.opts.filter(x=>x!==q.a)).slice(0,2);document.querySelectorAll(".opt").forEach(b=>{if(wr.includes(q.opts[+b.dataset.o])){b.disabled=true;b.classList.add("gone")}});t.closest("#hint").disabled=true;return}
 if(t.closest("#next")){next();return}
 if(t.closest("#prev")){const q=Q.qs[Q.i];if(q.t==="in"&&$("inp"))Q.ans[Q.i]=$("inp").value.trim()||null;Q.i--;drawQ();return}
 if(t.closest("#spk")&&Q){const q=Q.qs[Q.i];speak((q.p?q.p+". ":"")+q.q+(q.t==="mcq"?". "+q.opts.map((x,i)=>`Ý ${i+1}: ${x}`).join(". ")+".":""));return}
 if(t.closest("#goRv")){startReview();return}
 const rp=t.closest("[data-rep]");if(rp){repG=+rp.dataset.rep;report();return}
 if(t.closest("#copyRep")){const txt=reportText();try{navigator.clipboard.writeText(txt).then(()=>{$("copyMsg").textContent="Đã sao chép. Bé hoặc cha mẹ có thể dán vào tin nhắn gửi thầy cô."},()=>{$("copyMsg").textContent="Trình duyệt không cho sao chép tự động."})}catch(err){$("copyMsg").textContent="Trình duyệt không cho sao chép tự động."}return}
 const pl=t.closest("[data-p]");if(pl){S.cur=pl.dataset.p;save();home();header();return}
 const by=t.closest("[data-buy]");if(by){const p=P(),s=STK.find(x=>x.id===by.dataset.buy);if(p&&s&&p.stars>=s.p&&!p.owned.includes(s.id)){p.stars-=s.p;p.owned.push(s.id);save();if(p.cls)CL.spend(p.cls.code,p.cls.sid,s.p).catch(()=>{});beep(true);shop();header()}}});
document.addEventListener("keydown",e=>{if(!Q||!$("v-play").classList.contains("on"))return;const q=Q.qs[Q.i];
 if(e.key==="Enter"){if(e.target.id==="inp"){e.preventDefault();if(Q.mode==="exam"){Q.ans[Q.i]=e.target.value.trim()||null;next()}else if(!Q.done)judge(e.target.value.trim()||null);else next();return}if(Q.done&&$("next")&&e.target.tagName!=="BUTTON"){next();return}}
 if((q.t==="mcq"||q.t==="pmc")&&/^[1-4]$/.test(e.key)&&e.target.tagName!=="INPUT"&&!Q.done){const b=document.querySelector(`.opt[data-o="${+e.key-1}"]`);if(b&&!b.disabled)judge(q.opts[+e.key-1],b)}});
document.addEventListener("input",e=>{if(e.target.id==="inp"&&Q&&Q.mode==="exam")Q.ans[Q.i]=e.target.value.trim()||null});
$("nameForm").addEventListener("submit",e=>{e.preventDefault();const n=$("nameIn").value.trim().replace(/\s+/g," ");if(!n){$("nameIn").focus();return}
 if(!S.players[n])S.players[n]=newP(S.pending||1);S.cur=n;if(S.pending){S.players[n].grade=S.pending;delete S.pending}save();$("nameIn").value="";location.hash="#lop-"+S.players[n].grade});
[["setTimer","timer"],["setSound","sound"],["setSpeak","speak"]].forEach(([id,k])=>{$(id).checked=S[k];$(id).addEventListener("change",e=>{S[k]=e.target.checked;save()})});
loadClassDict();
window.BVapp={build,same,GM,parseTV,Q:()=>Q,quickStart,LZ};
route();
{const u=new URLSearchParams(location.search);if(u.get("lop"))quickStart(u.get("lop"),u.get("ma"))}
}
