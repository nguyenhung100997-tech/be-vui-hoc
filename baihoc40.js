/* Bài học có hình cho 40 chặng mỗi lớp: lời giới thiệu, thẻ học và 12 bài tập có tranh.
   Bài tập lấy từ các kỹ năng Toán, chủ đề Tiếng Việt và truyện đọc của chặng. */
{
const P=BV.P,H=BV.H,{pick,shuffle}=H;
const XS=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* tìm tranh có tên xuất hiện trong câu hỏi */
const CLS=/^(con|quả|cái|quyển|bông|chiếc|ngôi|đám|cơn|dòng|ngọn|mặt|bắp|củ|chùm|lá|bút|xe|ô)\s+/;
const NAMES=Object.keys(P).flatMap(k=>{const n=P[k].n.toLowerCase(),sh=n.replace(CLS,"");const out=[[n,k]];if(sh!==n&&sh.length>=3&&!["chì","cờ","tô","gà trống"].includes(sh))out.push([sh,k]);if(k==="ga")out.push(["gà",k]);return out}).sort((a,b)=>b[0].length-a[0].length);
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const ALIAS={luagao:["lúa"],thaygiao:["thầy"],nongdan:["nông dân"],cuuhoa:["lính cứu hoả","cứu hoả"],tauhoa:["tàu hỏa"],huou:["hươu"],caheo:["cá heo"],gacon:["gà con"],embe:["em bé"],bo2:["cha"],sutu:["sư tử"],cavoi:["cá voi"],canhcut:["chim cánh cụt","cánh cụt"],maybay:["máy bay"],xebuyt:["xe buýt"],traidat:["Trái Đất"],cauvong:["cầu vồng"],hoahong:["hoa hồng"],sen:["hoa sen"],huongduong:["hướng dương"],xuongrong:["xương rồng"],thong:["cây thông"],banhmi:["bánh mì"],banhkem:["bánh sinh nhật","bánh kem"],gaubong:["gấu bông"],bongbay:["bóng bay"],dan:["đàn ghi-ta"],tivi:["ti vi"],maytinh:["máy tính"],banchai:["bàn chải"],xaphong:["xà phòng"],dua2:["dứa"],dua3:["dừa"],dau:["dâu tây"],anhdao:["anh đào"],khoai:["khoai tây"],cai:["bắp cải"],cachua:["cà chua"],khunglong:["khủng long"],bachtuoc:["bạch tuộc"],chimcong:["chim công"],cu:["cú mèo"],le:["quả lê"],dao:["quả đào"]};
for(const k in ALIAS)if(P[k])ALIAS[k].forEach(n=>NAMES.push([n.toLowerCase(),k]));NAMES.sort((a,b)=>b[0].length-a[0].length);
const NEG={ongnoi:"(?!\\s+(mặt|trăng|sao|bụt|tiên|vua))",ba:"(?!\\s+con)",ao:"(?!\\s)"};
const RX=NAMES.filter(([n])=>n.length>=2).map(([n,k])=>[new RegExp(`(^|[^\\p{L}])${esc(n)}(?=$|[^\\p{L}])${NEG[k]||""}`,"iu"),k]);
BV.findPics=(text,max=3)=>{const t=String(text||""),out=[];for(const[r,k]of RX){if(out.length>=max)break;if(!out.includes(k)&&r.test(t))out.push(k)}return out};
/* hình đặt tính và bảng phấn */
const IN="#1d2a5c";
BV.PK.col=p=>{const a=String(p.a),b=String(p.b),w=Math.max(a.length,b.length)+1,cw=26,W=w*cw+60,x=W-20;
 const row=(s,y)=>[...s].map((ch,i)=>`<text x="${x-(s.length-1-i)*cw}" y="${y}" text-anchor="end" font-size="34" font-weight="800" font-family="Nunito,sans-serif" fill="${IN}">${XS(ch)}</text>`).join("");
 return`<svg viewBox="0 0 ${W} 170"><rect x="4" y="4" width="${W-8}" height="162" rx="14" fill="#fff9db" stroke="#fcc419" stroke-width="3"/>${row(a,52)}<text x="22" y="76" font-size="34" font-weight="800" fill="#e8590c" font-family="Nunito,sans-serif">${XS(p.op)}</text>${row(b,96)}<line x1="40" y1="110" x2="${W-14}" y2="110" stroke="${IN}" stroke-width="3"/><text x="${x}" y="148" text-anchor="end" font-size="34" font-weight="800" fill="#e8590c" font-family="Nunito,sans-serif">${p.r!=null?XS(p.r):"?"}</text></svg>`};
BV.PK.board=p=>{const t=String(p.t).slice(0,34),fs=t.length>22?22:t.length>14?28:34;return`<svg viewBox="0 0 320 150"><rect x="6" y="6" width="308" height="122" rx="10" fill="#2b8a3e" stroke="#a0522d" stroke-width="8"/><text x="160" y="${74+fs/3}" text-anchor="middle" font-size="${fs}" font-weight="800" font-family="Nunito,sans-serif" fill="#fff">${XS(t)}</text><rect x="120" y="128" width="80" height="10" rx="4" fill="#a0522d"/><circle cx="276" cy="112" r="0"/></svg>`};
const COLRX=/^(\d[\d ]*(?:,\d+)?) ([+−×]) (\d[\d ]*(?:,\d+)?) = \?$/;
const FORM=/(\d[\d ,]*\s*[+−×:]\s*\d[\d ,]*(?:\s*[+−×:]\s*\d[\d ,]*)*)/;
function decorate(q,ids,math){if(!q)return q;if(q.m>3)q=Object.assign({},q,{m:3});if(q.pic||q.t==="pmc")return q;q=Object.assign({},q);const t=q.q||"";
 const m=math&&t.match(COLRX);if(m&&m[1].replace(/\D/g,"").length<=6&&m[3].replace(/\D/g,"").length<=6){q.pic={k:"col",a:m[1].replace(/ /g,""),op:m[2],b:m[3].replace(/ /g,"")};q.noIn=q.noIn||false;return q}
 const f=BV.findPics(t+" "+(math?"":(q.a||"")),3);if(f.length){q.pic=f.length===1?{k:"img",id:f[0]}:{k:"row",ids:f};return q}
 if(!math){const qm=t.match(/“([^”]{1,22})”/);if(qm&&!q.p){q.pic={k:"board",t:qm[1]};return q}}
 if(math){const e=t.match(FORM);q.pic={k:"board",t:e?e[1].trim()+(t.includes("= ?")?" = ?":""):"Bé tính nhé!"};return q}
 q.pic=ids&&ids.length?(ids.length===1?{k:"img",id:ids[0]}:{k:"row",ids:ids.slice(0,3)}):{k:"row",ids:["sach","butchi","vo"]};return q}
BV.decorate=decorate;
const firstSent=t=>{const m=String(t).match(/^.{20,170}?[.!?](\s|$)/);return m?m[0].trim():String(t).slice(0,150)+"…"};
const call=f=>{try{return typeof f==="function"?f():f}catch(e){return null}};
/* thẻ học tự động từ một câu hỏi mẫu */
function cardFromQ(q,math){if(!q)return null;const d=decorate(q,[],math);const ans=d.t==="ord"?d.words.join(" "):d.a;if(d.pic&&d.pic.k==="col")d.pic=Object.assign({},d.pic,{r:String(ans).replace(/ /g,"")});
 return{pic:d.pic,f:d.t==="ord"?ans:String(d.q).replace(/\s*(=\s*)?\?\s*$/,m=>m.includes("=")?` = ${ans}`:"").replace("…",ans)+(String(d.q).includes("?")&&!String(d.q).includes("= ?")?` → ${ans}`:""),b:d.ex?d.ex:`Đáp án: ${ans}.`}}
function parseItem(it,st){return BV.app_parseTV?BV.app_parseTV(it,st):null}
/* biến câu Tiếng Việt dạng mảng thành câu hỏi (giống parseTV trong app.js) */
function tvQ(it,st){let k="mcq",m,rest;if(it[0]==="i"||it[0]==="o"){k=it[0];m=it[1];rest=it.slice(2)}else{m=it[0];rest=it.slice(1)}let ex,p;
 rest=rest.filter(x=>{if(typeof x==="string"&&x[0]==="="){ex=x.slice(1);return false}if(typeof x==="string"&&x[0]==="@"){p=st&&st.p&&st.p[x.slice(1)];return false}return true});
 const o={m,ex,p};if(k==="i"){const al=String(rest[1]).split("|");return Object.assign({t:"in",q:rest[0],a:al[0],alt:al.slice(1)},o)}
 if(k==="o"){const ch=rest[1].split("/");return Object.assign({t:"ord",q:rest[0],a:ch.join(" "),words:ch},o)}
 return Object.assign({t:"mcq",q:rest[0],a:rest[1],opts:shuffle(rest.slice(1))},o)}
BV.tvQ=tvQ;
function build(g,s){const G=BV.G[g],M=G.meta[s],C=G.C,SK=C.SK,TV=C.TV;const story=M.story>=0?C.ST[M.story]:null;
 const skills=M.k==="w"?M.skills:shuffle(M.skills).slice(0,4),topics=M.k==="w"?M.topics:shuffle(M.topics).slice(0,3);
 const ids=[...(story?story.ids:[]),...skills.flatMap(k=>SK[k].ids||[]),...topics.flatMap(t=>TV[t].ids||[])].filter(k=>P[k]);
 const hero=[...new Set([...ids,"sach","butchi","vo"])].slice(0,3);
 const stTV=G.tv[s];
 const intro=M.k==="w"?`Tuần ${M.w}. Toán: ${M.tn}. Tiếng Việt: ${M.vn}.${story?` Truyện đọc: “${story.t}”.`:""}`:M.k==="final"?`Thử thách cuối năm: tổng hợp kiến thức cả năm, bài toán nâng cao và truyện đọc dài${story?` “${story.t}”`:""}.`:`${M.title}: ôn lại các bài từ tuần ${M.cover[0]} đến tuần ${M.cover[1]}.`;
 /* thẻ học */
 const cards=[];
 skills.slice(0,2).forEach(k=>{const sk=SK[k];const c=sk.card?call(sk.card):cardFromQ(call(sk.g[0]),true);if(c)cards.push(c)});
 topics.slice(0,2).forEach(t=>{const tv=TV[t];if(tv.card){cards.push(call(tv.card));return}const it=tv.b.find(x=>x[0]===1||x[0]==="i")||tv.b[0];if(!it)return;const q=decorate(tvQ(it,stTV),hero,false);cards.push({pic:q.pic,f:q.t==="ord"?q.words.join(" "):q.q,b:`Đáp án: ${q.t==="ord"?q.words.join(" "):q.a}.${q.ex?" "+q.ex:""}`})});
 if(story)cards.push({pic:{k:"row",ids:story.ids.slice(0,3).length?story.ids.slice(0,3):hero},f:`Truyện: ${story.t}`,b:firstSent(story.p)});
 [...new Set([...ids.filter(k=>!hero.includes(k)),...hero])].slice(0,2).forEach(k=>cards.push(k));
 /* 12 bài tập: 6 Toán + 6 Tiếng Việt */
 const ex=[];
 const mathPics=skills.flatMap(k=>{const sk=SK[k];const own=(sk.pic||[]).map(f=>()=>decorate(f(),ids,true));const auto=[0,1,2].map(i=>()=>decorate((sk.g[i]||sk.g[0])(),ids,true));return own.length?[...own,auto[1],auto[2]]:auto});
 const mp=mathPics.length>6?shuffle(mathPics):mathPics;for(let i=0;i<6;i++)ex.push(mp[i%mp.length]);
 const tvPics=topics.flatMap(t=>(TV[t].pic||[]).map(f=>()=>decorate(f(),hero,false)));
 const sq=story?story.q.filter(q=>q[0]!=="i"):[];
 const stQ=sq.map(q=>()=>{const it=[q[0],"@S",...q.slice(1)];const o=tvQ(it,{p:{S:story.p}});o.pic={k:"row",ids:story.ids.slice(0,3).length?story.ids.slice(0,3):hero};return o});
 const topItems=topics.flatMap(t=>{const own=new Set(stTV.b);return TV[t].b.filter(x=>own.has(x)&&!(typeof x[1]==="string"&&x[1][0]==="@"))});
 const tvAuto=topItems.map(it=>()=>decorate(tvQ(it,stTV),hero,false));
 const tvAll=[...stQ.slice(0,3),...tvPics.slice(0,2),...shuffle(tvAuto)];
 const pool=tvAll.length?tvAll:[()=>decorate(tvQ(stTV.b[0],stTV),hero,false)];
 for(let i=0;i<6;i++)ex.push(pool[i%pool.length]);
 return{intro,hero,cards,ex}}
BV.LES={};
for(let g=1;g<=5;g++){const G=BV.G[g];if(!G||!G.meta)continue;BV.LES[g]=[];
 G.meta.forEach((_,s)=>{let L=null;Object.defineProperty(BV.LES[g],s,{get(){return L||(L=build(g,s))},enumerable:true,configurable:true})})}
}
