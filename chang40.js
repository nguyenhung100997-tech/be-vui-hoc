/* Bộ máy 40 chặng mỗi lớp: 35 tuần học theo sách Kết nối tri thức với cuộc sống + 5 chặng ôn tập.
   Mỗi tệp lopN-40.js gọi BV.def40(N,{...}) để khai báo nội dung của lớp N. */
{
const H=BV.H,{R,pick,shuffle,f,num,mc}=H;
/* vị trí 40 chặng: tuần 1–9, ôn giữa kì 1, tuần 10–18, ôn cuối kì 1, tuần 19–27, ôn giữa kì 2, tuần 28–35, ôn cuối năm, thử thách cuối năm */
const LAYOUT=[];{let w=1;const push=(k,n,cover)=>LAYOUT.push({k,w:k==="w"?w++:0,n,cover});
 for(let i=0;i<9;i++)push("w");push("on","Ôn tập giữa học kì 1",[1,9]);
 for(let i=0;i<9;i++)push("w");push("on","Ôn tập cuối học kì 1",[1,18]);
 for(let i=0;i<9;i++)push("w");push("on","Ôn tập giữa học kì 2",[19,27]);
 for(let i=0;i<8;i++)push("w");push("on","Ôn tập cuối năm",[1,35]);push("final","Thử thách cuối năm",[1,35])}
BV.LAYOUT=LAYOUT;
const ZONES=[{n:"Học kì 1 · Phần đầu",a:0,b:9},{n:"Học kì 1 · Phần cuối",a:10,b:19},{n:"Học kì 2 · Phần đầu",a:20,b:29},{n:"Học kì 2 · Về đích",a:30,b:39}];
BV.ZONES=ZONES;
/* chặng nào thuộc đề giữa năm (học kì 1) và cuối năm */
BV.examStages=k=>k===3?[...Array(20).keys()]:[...Array(40).keys()];

/* đọc một truyện viết gọn: "Tên|id1,id2" , "đoạn văn", "m|câu hỏi|đáp án|sai|sai|sai", ... */
/* tìm nhân vật người trong truyện để thêm hình người */
const PPL=[["bà","ba",/^\s+con/],["ông","ongnoi",/^\s+(mặt|trăng|sao|bụt|tiên|lão|vua)/],["mẹ","me"],["bố","bo2"],["cha","bo2"],["cô giáo","cogiao"],["thầy","thaygiao"],["bác sĩ","bacsi"],["nông dân","nongdan"],["em bé","embe"],["cứu hoả","cuuhoa"],["phi công","phicong"],["thợ xây","thoxay"]];
const GIRL=["Lan","Hoa","Mai","Na","Hà","Linh","Thảo","Vy","Ngân","Hằng","Bống","Phương","Mỷ","Nga","Hương","Y Lan","Amina"],BOY=["Nam","Minh","Bình","Tú","Hùng","Khôi","Tuấn","Bin","Bon","Quân","Khoa","Tùng","Dũng","Hải","Tí","Bi","Hưng","Quang","Ken","Tâm"];
const isL=c=>!!c&&c.toLowerCase()!==c.toUpperCase();
function findWord(text,w,cs){const T=cs?text:text.toLowerCase(),W=cs?w:w.toLowerCase();let i=-1;while((i=T.indexOf(W,i+1))>=0){if(isL(T[i-1])||isL(T[i+W.length]))continue;return i}return -1}
function people(t,text){const all=t+". "+text,hits=[];
 for(const[w,id,neg]of PPL){let i=-1,T=all.toLowerCase();while((i=T.indexOf(w,i+1))>=0){if(isL(T[i-1])||isL(T[i+w.length]))continue;if(neg&&neg.test(T.slice(i+w.length)))continue;hits.push([i,id]);break}}
 for(const n of GIRL){const i=findWord(all,n,true);if(i>=0&&!/^ Nội/.test(all.slice(i+n.length)))hits.push([i,"begai"])}
 for(const n of BOY){const i=findWord(all,n,true);if(i>=0&&!/(Việt|miền|phương|phía) $/.test(all.slice(Math.max(0,i-8),i)))hits.push([i,"betrai"])}
 hits.sort((a,b)=>a[0]-b[0]);return[...new Set(hits.map(h=>h[1]))]}
BV.story=(head,text,...qs)=>{const[t,idsS]=head.split("|");let ids=(idsS||"").split(",").filter(Boolean);const pp=people(t,text);if(pp.length){const k=ids.length>=3?1:2;ids=[...new Set([...pp.slice(0,k),...ids])].slice(0,3)}
 return{t,ids,p:text,q:qs.map(s=>{const a=s.split("|");if(a[0]==="i")return["i",+a[1],a[2],a[3]];return[+a[0],...a.slice(1)]})}};

BV.def40=(g,C)=>{
 const OLD=BV.G[g];const SK=C.SK,TV=C.TV,ST=C.ST||[],rows=C.rows;
 if(rows.length!==35)throw new Error(`Lớp ${g}: cần 35 tuần, đang có ${rows.length}`);
 /* chia ngân hàng câu của mỗi chủ đề Tiếng Việt cho các tuần dùng chủ đề đó */
 const occ={};rows.forEach((r,i)=>r[3].forEach(t=>{if(!TV[t])throw new Error(`Lớp ${g}: thiếu chủ đề TV ${t}`);(occ[t]=occ[t]||[]).push(i)}));
 rows.forEach(r=>r[1].forEach(k=>{if(!SK[k])throw new Error(`Lớp ${g}: thiếu kỹ năng toán ${k}`)}));
 const slice=(t,wi)=>{const b=TV[t].b,n=occ[t].length,j=occ[t].indexOf(wi),L=b.length;if(n===1||L<=8)return b.slice();const per=Math.max(8,Math.ceil(L/n)),st=Math.floor(j*L/n),out=[];for(let i=0;i<per&&i<L;i++)out.push(b[(st+i)%L]);return out};
 const toan=[],tv=[],meta=[];
 /* bảo đảm mỗi chặng đủ câu ở cả 3 mức: thiếu thì lấy thêm từ cùng chủ đề, rồi câu nâng cao */
 const lvOf=it=>it[0]==="i"||it[0]==="o"?it[1]:it[0];
 const fill=(b,topics,w)=>{const has=new Set(b);const need={1:3,2:3,3:2};const cnt=l=>b.filter(it=>lvOf(it)===l).length;
  for(const l of[1,2,3]){const src=[...topics.flatMap(t=>TV[t].b),...(l===3?(C.NCV||[]).filter(x=>x.w<=w).sort((a,b)=>b.w-a.w).map(x=>x.it):[]),...Object.keys(TV).flatMap(t=>TV[t].b)];
   for(const it of src){if(cnt(l)>=need[l])break;if(lvOf(it)===l&&!has.has(it)&&!(typeof it[1]==="string"&&it[1][0]==="@")){b.push(it);has.add(it)}}}
  const all=[...topics.flatMap(t=>TV[t].b),...Object.keys(TV).flatMap(t=>TV[t].b)];for(const it of all){if(b.length>=12)break;if(!has.has(it)&&!(typeof it[1]==="string"&&it[1][0]==="@")){b.push(it);has.add(it)}}
  return b};
 const mathFns=(skills,ms,w)=>[1,2,3].map(m=>()=>{const myMS=(C.MS||[]).filter(x=>w>=x.w[0]&&w<=x.w[1]);
  if(m>1&&myMS.length&&Math.random()<(m===2?.18:.35)){const q=pick(myMS).f();q.m=m;return q}
  const sk=SK[pick(skills)];const fn=sk.g[m-1]||sk.g[sk.g.length-1];return fn()});
 let extraI=35;
 LAYOUT.forEach((L,s)=>{
  if(L.k==="w"){const r=rows[L.w-1];const[tn,skills,vn,topics]=r;const si=L.w-1,story=ST[si];
   const p={},b=[];if(story){p["S"+si]=story.p;story.q.forEach(q=>b.push(q[0]==="i"?["i",q[1],q[2],q[3],"@S"+si]:[q[0],"@S"+si,...q.slice(1)]))}
   topics.forEach(t=>b.push(...slice(t,si)));fill(b,topics,L.w);
   toan.push({n:tn,g:mathFns(skills,C.MS,L.w)});tv.push({n:vn,p,b});
   meta.push({k:"w",w:L.w,hk:L.w<=18?1:2,place:C.places[s],tn,vn,skills,topics,story:story?si:-1,extra:r[4]||{}})}
  else{const[a,bw]=L.cover;const ws=rows.slice(a-1,bw);const skills=[...new Set(ws.flatMap(r=>r[1]))],topics=[...new Set(ws.flatMap(r=>r[3]))];
   const p={},b=[];for(let w=a;w<=bw;w++){const si=w-1,story=ST[si];if(!story)continue;
    /* ôn tập: lấy câu suy luận của các truyện trong phạm vi */
    p["S"+si]=story.p;story.q.filter(q=>q[0]!=="i"&&(L.k==="final"?q[0]>=2:true)).forEach(q=>b.push([q[0],"@S"+si,...q.slice(1)]))}
   /* truyện riêng: chặng cuối dùng truyện cuối cùng, chặng ôn tập dùng các truyện thêm (nếu có) */
   const own=L.k==="final"?(ST.length>35?ST.length-1:-1):(ST.length>36&&extraI<ST.length-1?extraI++:-1);
   if(own>=0){const fs=ST[own],key="S"+own;p[key]=fs.p;fs.q.forEach(q=>b.push(q[0]==="i"?["i",q[1],q[2],q[3],"@"+key]:[q[0],"@"+key,...q.slice(1)]))}
   topics.forEach(t=>b.push(...TV[t].b.filter((_,i)=>i%3===s%3)));fill(b,topics,bw);
   const tn=L.k==="final"?"Tổng hợp cả năm và bài nâng cao":"Ôn tập: "+[...new Set(ws.map(r=>r[0].replace(/^(Ôn tập|Luyện tập chung)\s*/i,"")).filter(Boolean))].slice(0,3).map(x=>x.charAt(0).toLowerCase()+x.slice(1)).join("; ")+(ws.length>3?"…":"");
   const vn=L.k==="final"?"Đọc hiểu truyện dài và câu nâng cao":"Ôn tập: đọc hiểu và luyện từ và câu";
   const fin=L.k==="final";
   toan.push({n:tn,g:fin?[1,2,3].map(m=>()=>{if(m===3&&Math.random()<.5){const ok=(C.NC||[]);const x=pick(ok).f();x.m=3;return x}return mathFns(skills,C.MS,35)[m-1]()}):mathFns(skills,C.MS,bw)});
   tv.push({n:vn,p,b});
   meta.push({k:L.k,w:bw,hk:bw<=18?1:2,place:C.places[s],tn:L.n,vn,skills,topics,story:own,cover:L.cover,title:L.n})}});
 BV.G[g]={toan,tv,meta,old:OLD,
  /* thử thách tư duy của chặng s: toán nâng cao + toán đọc hiểu + Tiếng Việt nâng cao */
  nc(s){const M=meta[s],w=M.w;const nc=(C.NC||[]).filter(x=>x.w<=w);const near=nc.filter(x=>x.w>=w-10);const pool=near.length>=3?near:nc;
   const out=[];const used=new Set();for(let i=0;i<3&&pool.length;i++){let x,k=0;do{x=pick(pool)}while(used.has(x)&&++k<10);used.add(x);const q=x.f();q.m=3;q.sub="t";q.s=s;out.push(q)}
   const ms=(C.MS||[]).filter(x=>w>=x.w[0]&&w<=x.w[1]);if(ms.length){const q=pick(ms).f();q.m=3;q.sub="t";q.s=s;out.push(q)}
   const v=[];const st=tv[s];const deep=st.b.filter(it=>it[0]===3&&String(it[1]).startsWith("@"));if(deep.length)v.push(pick(deep));
   const ncv=(C.NCV||[]).filter(x=>x.w<=w);const nv=ncv.filter(x=>x.w>=w-12);const vp=shuffle(nv.length>=2?nv:ncv).slice(0,2);vp.forEach(x=>v.push(x.it));
   return{t:out,v:v.map(it=>({it,st}))}},
  C};
 BV.G[g].oldMap=C.oldMap||[];
};
}
