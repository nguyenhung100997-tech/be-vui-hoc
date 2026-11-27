/* Kết nối Firebase cho mục "Lớp chung".
   Cấu hình nằm ở firebase-config.js. Nếu chưa cấu hình, trang vẫn chạy bình thường, chỉ ẩn phần lớp chung. */
{
const hash=s=>{let h1=0xdeadbeef,h2=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)};
const loadJs=src=>new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=()=>no(new Error("Không tải được "+src));document.head.appendChild(s)});

function fbAdapter(db){const FV=firebase.firestore.FieldValue,ref=p=>db.doc(p),col=p=>db.collection(p);return{
 async get(p){const s=await ref(p).get();return s.exists?s.data():null},
 async set(p,d){await ref(p).set(d,{merge:true})},
 async inc(p,incs,extra={}){const u=Object.assign({},extra);for(const k in incs)u[k]=FV.increment(incs[k]);await ref(p).set(u,{merge:true})},
 async add(p,d){return(await col(p).add(d)).id},
 async create(p,d){await db.runTransaction(async t=>{const s=await t.get(ref(p));if(s.exists)throw new Error("exists");t.set(ref(p),d)})},
 async list(p,o={}){let q=col(p);if(o.order)q=q.orderBy(o.order,o.desc?"desc":"asc");if(o.limit)q=q.limit(o.limit);const s=await q.get();return s.docs.map(d=>Object.assign({id:d.id},d.data()))}}}

/* Bộ nhớ giả để chạy thử không cần mạng */
function memAdapter(){const M=window.BV_MEMSTORE||new Map();const cp=x=>JSON.parse(JSON.stringify(x));return{M,
 async get(p){return M.has(p)?cp(M.get(p)):null},
 async set(p,d){M.set(p,Object.assign(M.get(p)||{},cp(d)))},
 async inc(p,incs,extra={}){const o=Object.assign(M.get(p)||{},cp(extra));for(const k in incs)o[k]=(o[k]||0)+incs[k];M.set(p,o)},
 async add(p,d){const n=(M.get("__n")||0)+1;M.set("__n",n);const id="id"+n;M.set(p+"/"+id,cp(d));return id},
 async create(p,d){if(M.has(p))throw new Error("exists");M.set(p,cp(d))},
 async list(p,o={}){const depth=p.split("/").length+1;let r=[...M.entries()].filter(([k])=>k.startsWith(p+"/")&&k.split("/").length===depth).map(([k,v])=>Object.assign({id:k.split("/").pop()},cp(v)));if(o.order)r.sort((a,b)=>(a[o.order]>b[o.order]?1:-1)*(o.desc?-1:1));if(o.limit)r=r.slice(0,o.limit);return r}}}

const pad=n=>String(n).padStart(2,"0");
const CL={ready:false,err:null,hash,
 wk(d=new Date()){const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const y=t.getUTCFullYear();return`w${y}_${pad(Math.ceil(((t-Date.UTC(y,0,1))/864e5+1)/7))}`},
 mk(d=new Date()){return`m${d.getFullYear()}_${pad(d.getMonth()+1)}`},
 _p:null,
 init(){if(this._p)return this._p;this._p=(async()=>{
  if(window.BV_MEMDB){this.db=memAdapter();this.ready=true;return true}
  const cfg=window.BV_FIREBASE;if(!cfg||!cfg.apiKey){this.err="nocfg";return false}
  try{const V="10.12.2",B=`https://www.gstatic.com/firebasejs/${V}/`;await loadJs(B+"firebase-app-compat.js");await loadJs(B+"firebase-auth-compat.js");await loadJs(B+"firebase-firestore-compat.js");
   firebase.initializeApp(cfg);await firebase.auth().signInAnonymously();this.db=fbAdapter(firebase.firestore());this.ready=true;return true}
  catch(e){this.err=String(e&&e.message||e);this._p=null;return false}})();return this._p},
 newCode(){const A="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<6;i++)s+=A[Math.floor(Math.random()*A.length)];return s},
 async createClass(name,grade,pin){for(let k=0;k<5;k++){const code=this.newCode();try{await this.db.create(`classes/${code}`,{name,grade,tH:hash(code+":"+pin),created:Date.now()});return code}catch(e){if(String(e.message)!=="exists")throw e}}throw new Error("Không tạo được mã lớp, hãy thử lại.")},
 getClass(code){return this.db.get(`classes/${code}`)},
 async teacherOk(code,pin){const c=await this.getClass(code);return!!c&&c.tH===hash(code+":"+pin)},
 async students(code){return(await this.db.list(`classes/${code}/students`)).filter(s=>!s.hidden)},
 async addStudent(code,name,pin,grade){const all=await this.students(code);if(all.length>=40)throw new Error("Lớp đã đủ 40 bạn.");if(all.some(s=>s.name.toLowerCase()===name.toLowerCase()))throw new Error("Tên này đã có trong lớp. Hãy chọn tên của bé trong danh sách.");if(all.some(s=>s.pinH===hash(code+":"+pin)))throw new Error("Mã PIN này đã có bạn dùng. Bé hãy chọn mã khác.");
  return this.db.add(`classes/${code}/students`,{name,pinH:hash(code+":"+pin),grade,stars:0,earned:0,created:Date.now()})},
 async login(code,sid,pin){const s=await this.db.get(`classes/${code}/students/${sid}`);if(!s||s.hidden)return null;if(!s.pinH){await this.db.set(`classes/${code}/students/${sid}`,{pinH:hash(code+":"+pin)});return s}return s.pinH===hash(code+":"+pin)?s:null},
 async record(code,sid,ev){const t=Date.now(),d=new Date(t);ev=Object.assign({sid,ts:t},ev);await this.db.add(`classes/${code}/events`,ev);
  if(ev.gain)await this.db.inc(`classes/${code}/students/${sid}`,{stars:ev.gain,earned:ev.gain,[this.wk(d)]:ev.gain,[this.mk(d)]:ev.gain},{last:t})},
 spend(code,sid,cost){return this.db.inc(`classes/${code}/students/${sid}`,{stars:-cost})},
 saveProg(code,sid,prog,grade){return this.db.set(`classes/${code}/students/${sid}`,{prog:JSON.stringify(prog),grade,updated:Date.now()})},
 events(code,n=15){return this.db.list(`classes/${code}/events`,{order:"ts",desc:true,limit:n})},
 exams(code){return this.db.list(`classes/${code}/exams`,{order:"created",desc:true})},
 createExam(code,ex){return this.db.add(`classes/${code}/exams`,Object.assign({created:Date.now(),open:true,seed:Math.floor(Math.random()*2**31)},ex))},
 setExam(code,id,patch){return this.db.set(`classes/${code}/exams/${id}`,patch)},
 myResult(code,id,sid){return this.db.get(`classes/${code}/exams/${id}/results/${sid}`)},
 submit(code,id,sid,r){return this.db.create(`classes/${code}/exams/${id}/results/${sid}`,Object.assign({ts:Date.now()},r))},
 results(code,id){return this.db.list(`classes/${code}/exams/${id}/results`)},
 async loginByPin(code,pin){const h=hash(code+":"+pin);return(await this.students(code)).find(x=>x.pinH===h)||null},
 _pin(used,code){let pin,h;do{pin=String(100000+Math.floor(Math.random()*900000));h=hash(code+":"+pin)}while(used.has(h));used.add(h);return pin},
 async bulkAdd(code,names,grade){const all=await this.students(code),used=new Set(all.map(x=>x.pinH)),out=[],skip=[];
  for(const n of names){const low=n.toLowerCase();if(all.length+out.length>=40){skip.push(n+" (lớp đã đủ 40 bạn)");continue}if(all.some(x=>x.name.toLowerCase()===low)||out.some(o=>o.name.toLowerCase()===low)){skip.push(n+" (trùng tên)");continue}
   const pin=this._pin(used,code);const id=await this.db.add(`classes/${code}/students`,{name:n,pinH:hash(code+":"+pin),grade,stars:0,earned:0,created:Date.now()});out.push({id,name:n,pin})}return{out,skip}},
 async newPins(code,sids){const all=await this.students(code),used=new Set(all.map(x=>x.pinH)),out=[];for(const sid of sids){const st=all.find(x=>x.id===sid);if(!st)continue;const pin=this._pin(used,code);await this.db.set(`classes/${code}/students/${sid}`,{pinH:hash(code+":"+pin)});out.push({id:sid,name:st.name,pin})}return out},
 resetPin(code,sid){return this.db.set(`classes/${code}/students/${sid}`,{pinH:null})},
 hide(code,sid){return this.db.set(`classes/${code}/students/${sid}`,{hidden:true})}};
window.CL=CL;
}
