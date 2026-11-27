/* Kết nối Firebase cho mục "Lớp chung" và hệ thống key.
   - Key gốc: chỉ chủ trang giữ. Mở quyền quản trị: tạo lớp, tạo/mở đề, cấp key học sinh.
   - Key học sinh (8 số): mở Lớp chung và các đề kiểm tra đã được mở.
   Quyền được kiểm tra trên máy chủ bằng firestore.rules, không chỉ trên trang. */
{
const hash=s=>{let h1=0xdeadbeef,h2=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)};
async function sha(s){const c=window.crypto&&crypto.subtle;if(!c)throw new Error("Trình duyệt không hỗ trợ mã hoá. Hãy mở trang bằng https.");const b=await c.digest("SHA-256",new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
const loadJs=src=>new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=()=>no(new Error("Không tải được "+src));document.head.appendChild(s)});
const deny=e=>/permission|insufficient|PERMISSION_DENIED|denied/i.test(String(e&&(e.code||e.message)||e));

function fbAdapter(db){const FV=firebase.firestore.FieldValue,ref=p=>db.doc(p),col=p=>db.collection(p);return{
 uid:()=>firebase.auth().currentUser&&firebase.auth().currentUser.uid,
 async get(p){const s=await ref(p).get();return s.exists?s.data():null},
 async set(p,d){await ref(p).set(d,{merge:true})},
 async put(p,d){await ref(p).set(d)},
 async del(p){await ref(p).delete()},
 async inc(p,incs,extra={}){const u=Object.assign({},extra);for(const k in incs)u[k]=FV.increment(incs[k]);await ref(p).set(u,{merge:true})},
 async add(p,d){return(await col(p).add(d)).id},
 async create(p,d){await db.runTransaction(async t=>{const s=await t.get(ref(p));if(s.exists)throw new Error("exists");t.set(ref(p),d)})},
 async list(p,o={}){let q=col(p);if(o.order)q=q.orderBy(o.order,o.desc?"desc":"asc");if(o.limit)q=q.limit(o.limit);const s=await q.get();return s.docs.map(d=>Object.assign({id:d.id},d.data()))}}}

/* Bộ nhớ giả để chạy thử không cần mạng (có thể gắn bộ giả lập luật BV_MEMRULES) */
function memAdapter(){const M=window.BV_MEMSTORE||new Map();const cp=x=>x==null?x:JSON.parse(JSON.stringify(x));const uid=window.BV_MEMUID||("u"+Math.random().toString(36).slice(2,8));
 const chk=(op,p,d)=>{if(window.BV_MEMRULES&&!window.BV_MEMRULES(op,p,d,uid,M)){const e=new Error("Missing or insufficient permissions.");e.code="permission-denied";throw e}};
 return{M,uid:()=>uid,
 async get(p){chk("get",p);return M.has(p)?cp(M.get(p)):null},
 async set(p,d){const n=Object.assign({},M.get(p)||{},cp(d));chk(M.has(p)?"update":"create",p,n);M.set(p,n)},
 async put(p,d){chk(M.has(p)?"update":"create",p,cp(d));M.set(p,cp(d))},
 async del(p){chk("delete",p);M.delete(p)},
 async inc(p,incs,extra={}){const o=Object.assign({},M.get(p)||{},cp(extra));for(const k in incs)o[k]=(o[k]||0)+incs[k];chk(M.has(p)?"update":"create",p,o);M.set(p,o)},
 async add(p,d){const n=(M.get("__n")||0)+1;const id="id"+n;chk("create",p+"/"+id,cp(d));M.set("__n",n);M.set(p+"/"+id,cp(d));return id},
 async create(p,d){chk("get",p);if(M.has(p))throw new Error("exists");chk("create",p,cp(d));M.set(p,cp(d))},
 async list(p,o={}){chk("list",p);const depth=p.split("/").length+1;let r=[...M.entries()].filter(([k])=>k.startsWith(p+"/")&&k.split("/").length===depth).map(([k,v])=>Object.assign({id:k.split("/").pop()},cp(v)));if(o.order)r.sort((a,b)=>(a[o.order]>b[o.order]?1:-1)*(o.desc?-1:1));if(o.limit)r=r.slice(0,o.limit);return r}}}

const pad=n=>String(n).padStart(2,"0");
const CRED="bevuihoc_cred";
const getCred=()=>{try{return JSON.parse(localStorage.getItem(CRED)||"null")}catch(e){return null}};
const setCred=c=>{try{c?localStorage.setItem(CRED,JSON.stringify(c)):localStorage.removeItem(CRED)}catch(e){}};
const CL={ready:false,err:null,hash,sha,deny,
 acc:{admin:false,member:false,open:{},checked:false},
 wk(d=new Date()){const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const y=t.getUTCFullYear();return`w${y}_${pad(Math.ceil(((t-Date.UTC(y,0,1))/864e5+1)/7))}`},
 mk(d=new Date()){return`m${d.getFullYear()}_${pad(d.getMonth()+1)}`},
 _p:null,
 init(){if(this._p)return this._p;this._p=(async()=>{
  if(window.BV_MEMDB){this.db=memAdapter();this.ready=true;return true}
  const cfg=window.BV_FIREBASE;if(!cfg||!cfg.apiKey){this.err="nocfg";return false}
  try{const V="10.12.2",B=`https://www.gstatic.com/firebasejs/${V}/`;await loadJs(B+"firebase-app-compat.js");await loadJs(B+"firebase-auth-compat.js");await loadJs(B+"firebase-firestore-compat.js");
   firebase.initializeApp(cfg);await firebase.auth().signInAnonymously();this.db=fbAdapter(firebase.firestore());this.ready=true;return true}
  catch(e){this.err=String(e&&e.message||e);this._p=null;return false}})();return this._p},
 /* ---------- quyền truy cập ---------- */
 async access(){const a={admin:false,member:false,open:{},checked:true};if(!(await this.init())){this.acc=a;return a}const uid=this.db.uid();
  try{const ad=await this.db.get(`admins/${uid}`);if(ad){await this.db.list("keys",{limit:1});a.admin=true}}catch(e){a.admin=false}
  try{let m=await this.db.get(`members/${uid}`);if(!m){const c=getCred();if(c){try{await this.db.put(`members/${uid}`,Object.assign({t:Date.now()},c));m=c}catch(e){}}}
   if(m){if(m.via==="key"){const k=await this.db.get(`keys/${m.kh}`);a.member=!!(k&&k.active&&(!k.exp||k.exp>Date.now()))}else if(m.via==="pin"){a.member=!!(await this.db.get(`pins/${m.pk}`))}}}catch(e){a.member=false}
  try{a.open=(await this.db.get("config/open"))||{}}catch(e){a.open={}}
  this.acc=a;return a},
 async redeemKey(key){key=String(key).replace(/\D/g,"");if(key.length!==8)throw new Error("Key học sinh gồm 8 chữ số.");if(!(await this.init()))throw new Error("Chưa kết nối được máy chủ.");
  const kh=await sha("bvh-key:"+key);let k=null;try{k=await this.db.get(`keys/${kh}`)}catch(e){}
  if(!k)throw new Error("Key chưa đúng. Bé kiểm tra lại 8 số nhé.");if(!k.active)throw new Error("Key này đã bị thu hồi. Hãy hỏi thầy cô key mới.");if(k.exp&&k.exp<Date.now())throw new Error("Key này đã hết hạn. Hãy hỏi thầy cô key mới.");
  const c={via:"key",kh};try{await this.db.put(`members/${this.db.uid()}`,Object.assign({t:Date.now()},c))}catch(e){if(deny(e))throw new Error("Key này không còn hiệu lực (đã hết hạn hoặc bị thu hồi). Hãy hỏi thầy cô key mới.");throw e}setCred(c);return this.access()},
 async redeemPin(code,pin){const pk=code+"_"+hash(code+":"+pin);const p=await this.db.get(`pins/${pk}`);if(!p)return null;const c={via:"pin",pk};await this.db.put(`members/${this.db.uid()}`,Object.assign({t:Date.now()},c));setCred(c);await this.access();return p.sid},
 forget(){setCred(null)},
 /* ---------- quản trị bằng key gốc ---------- */
 async adminSetup(master){if(String(master).length<8)throw new Error("Key gốc cần ít nhất 8 kí tự.");if(!(await this.init()))throw new Error("Chưa kết nối được máy chủ.");const h=await sha("bvh-master:"+master);
  /* ghi thẳng (không đọc trước vì luật cấm đọc key gốc); máy chủ chỉ cho tạo khi chưa có */
  try{await this.db.put("config/master",{h,t:Date.now()})}catch(e){if(String(e.message)==="exists")throw new Error("Key gốc đã được tạo từ trước. Hãy dùng ô Đăng nhập.");if(deny(e))throw new Error("Máy chủ từ chối tạo key gốc. Có thể key gốc đã có, hoặc luật bảo mật mới (tệp firestore.rules) chưa được dán vào Firebase → Firestore → Rules.");throw e}return this.adminLogin(master)},
 async adminLogin(master){if(!(await this.init()))throw new Error("Chưa kết nối được máy chủ.");const h=await sha("bvh-master:"+master);
  try{await this.db.put(`admins/${this.db.uid()}`,{h,t:Date.now()})}catch(e){if(deny(e))throw new Error("Key gốc chưa đúng.");throw e}
  const a=await this.access();if(!a.admin)throw new Error("Key gốc chưa đúng.");return a},
 async adminLogout(){try{await this.db.del(`admins/${this.db.uid()}`)}catch(e){}return this.access()},
 async changeMaster(newMaster){if(String(newMaster).length<8)throw new Error("Key gốc cần ít nhất 8 kí tự.");const h=await sha("bvh-master:"+newMaster);await this.db.put("config/master",{h,t:Date.now()});return this.adminLogin(newMaster)},
 async makeKeys(n,label,days){const out=[];for(let i=0;i<n;i++){let key,kh,t=0;do{key=String(10000000+Math.floor(Math.random()*90000000));kh=await sha("bvh-key:"+key)}while((await this.db.get(`keys/${kh}`))&&++t<20);
  const d={k:key,label:label||"",active:true,created:Date.now()};if(days)d.exp=Date.now()+days*864e5;await this.db.put(`keys/${kh}`,d);out.push(Object.assign({id:kh},d))}return out},
 listKeys(){return this.db.list("keys",{order:"created",desc:true})},
 setKey(kh,patch){return this.db.set(`keys/${kh}`,patch)},
 listMembers(){return this.db.list("members")},
 setOpen(map){return this.db.put("config/open",map)},
 listClasses(){return this.db.list("classes",{order:"created",desc:true})},
 async getDict(){try{return(await this.db.get("config/dict"))||{}}catch(e){return{}}},
 setDict(d){return this.db.put("config/dict",d)},
 /* ---------- lớp chung ---------- */
 newCode(){const A="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<6;i++)s+=A[Math.floor(Math.random()*A.length)];return s},
 async createClass(name,grade){for(let k=0;k<5;k++){const code=this.newCode();try{await this.db.create(`classes/${code}`,{name,grade,tH:hash(code+":"+Math.random()),created:Date.now()});return code}catch(e){if(String(e.message)!=="exists")throw e}}throw new Error("Không tạo được mã lớp, hãy thử lại.")},
 getClass(code){return this.db.get(`classes/${code}`)},
 async students(code){return(await this.db.list(`classes/${code}/students`)).filter(s=>!s.hidden)},
 _pk(code,pin){return code+"_"+hash(code+":"+pin)},
 async _setPin(code,sid,oldH,pin){const h=hash(code+":"+pin);if(oldH)try{await this.db.del(`pins/${code}_${oldH}`)}catch(e){}await this.db.set(`classes/${code}/students/${sid}`,{pinH:h});await this.db.put(`pins/${code}_${h}`,{sid,code})},
 async addStudent(code,name,pin,grade){const all=await this.students(code);if(all.length>=40)throw new Error("Lớp đã đủ 40 bạn.");if(all.some(s=>s.name.toLowerCase()===name.toLowerCase()))throw new Error("Tên này đã có trong lớp. Hãy chọn tên của bé trong danh sách.");if(all.some(s=>s.pinH===hash(code+":"+pin)))throw new Error("Mã PIN này đã có bạn dùng. Bé hãy chọn mã khác.");
  const id=await this.db.add(`classes/${code}/students`,{name,pinH:hash(code+":"+pin),grade,stars:0,earned:0,created:Date.now()});await this.db.put(`pins/${code}_${hash(code+":"+pin)}`,{sid:id,code});return id},
 async login(code,sid,pin){const s=await this.db.get(`classes/${code}/students/${sid}`);if(!s||s.hidden)return null;if(!s.pinH){await this._setPin(code,sid,null,pin);return s}return s.pinH===hash(code+":"+pin)?s:null},
 async loginByPin(code,pin){let sid=null;try{sid=await this.redeemPin(code,pin)}catch(e){sid=null}if(!sid)return null;const s=await this.db.get(`classes/${code}/students/${sid}`);return s&&!s.hidden?Object.assign({id:sid},s):null},
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
 _pin(used,code){let pin,h;do{pin=String(100000+Math.floor(Math.random()*900000));h=hash(code+":"+pin)}while(used.has(h));used.add(h);return pin},
 async bulkAdd(code,names,grade){const all=await this.students(code),used=new Set(all.map(x=>x.pinH)),out=[],skip=[];
  for(const n of names){const low=n.toLowerCase();if(all.length+out.length>=40){skip.push(n+" (lớp đã đủ 40 bạn)");continue}if(all.some(x=>x.name.toLowerCase()===low)||out.some(o=>o.name.toLowerCase()===low)){skip.push(n+" (trùng tên)");continue}
   const pin=this._pin(used,code),h=hash(code+":"+pin);const id=await this.db.add(`classes/${code}/students`,{name:n,pinH:h,grade,stars:0,earned:0,created:Date.now()});await this.db.put(`pins/${code}_${h}`,{sid:id,code});out.push({id,name:n,pin})}return{out,skip}},
 async newPins(code,sids){const all=await this.students(code),used=new Set(all.map(x=>x.pinH)),out=[];for(const sid of sids){const st=all.find(x=>x.id===sid);if(!st)continue;const pin=this._pin(used,code);await this._setPin(code,sid,st.pinH,pin);out.push({id:sid,name:st.name,pin})}return out},
 async resetPin(code,sid){const s=await this.db.get(`classes/${code}/students/${sid}`);if(s&&s.pinH)try{await this.db.del(`pins/${code}_${s.pinH}`)}catch(e){}return this.db.set(`classes/${code}/students/${sid}`,{pinH:null})},
 async hide(code,sid){const s=await this.db.get(`classes/${code}/students/${sid}`);if(s&&s.pinH)try{await this.db.del(`pins/${code}_${s.pinH}`)}catch(e){}return this.db.set(`classes/${code}/students/${sid}`,{hidden:true})}};
window.CL=CL;
}
