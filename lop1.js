/* Lớp 1 – bám theo mạch bài của Toán 1 và Tiếng Việt 1 (Kết nối tri thức với cuộc sống).
   Toán: mỗi chặng có 3 hàm tạo câu theo 3 mức. Tiếng Việt: [mức, câu hỏi, đáp án đúng, sai, sai, sai]
   "i" = tự điền, "o" = xếp thẻ (các thẻ cách nhau bằng /), "=..." = lời giải, "@X" = đoạn đọc X. */
{const{R,pick,shuffle,f,num,mc,inp,cmp,name}=BV.H;
const U=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];
function doc2(n,full){const c=Math.floor(n/10),u=n%10;if(c===0)return full?(u?"linh "+U[u]:""):U[u];const h=c===1?"mười":U[c]+" mươi";if(!u)return h;let w=U[u];if(u===5)w="lăm";else if(u===1&&c>1)w="mốt";else if(u===4&&c>1)w="tư";return h+" "+w}
function doc(n){if(n<100)return doc2(n,false);const h=Math.floor(n/100),r=n%100;return U[h]+" trăm"+(r?" "+doc2(r,true):"")}
BV.H.doc=doc;
const IT=["apple","star","fish","flower","balloon"],IN={apple:"quả táo",star:"ngôi sao",fish:"con cá",flower:"bông hoa",balloon:"quả bóng bay"};
const SH={circle:"hình tròn",square:"hình vuông",triangle:"hình tam giác",rect:"hình chữ nhật"};
const cap=s=>s[0].toUpperCase()+s.slice(1);
const DAYS=["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
const noCarry=()=>{let a,b;do{a=R(11,88);b=R(11,98-a)}while(a%10+b%10>9);return[a,b]};
const noBorrow=()=>{let a,b;do{a=R(20,99);b=R(10,a)}while(b%10>a%10);return[a,b]};
BV.grade(1,{
toan:[
{n:"Các số từ 0 đến 10",g:[
 ()=>{const it=pick(IT),n=R(1,10);return num(`Có bao nhiêu ${IN[it]}?`,n,{pic:{k:"count",item:it,n},noIn:true})},
 ()=>{const k=R(0,2);if(k===0){const n=R(0,9);return num(`Số liền sau của ${n} là số nào?`,n+1)}if(k===1){const n=R(1,10);return num(`Số liền trước của ${n} là số nào?`,n-1)}const a=R(0,10);let b;do{b=R(0,10)}while(b===a);return cmp(`Điền dấu thích hợp: ${a} … ${b}`,a,b)},
 ()=>{if(Math.random()<.6){const xs=shuffle([...Array(11).keys()]).slice(0,4),big=Math.random()<.5,a=big?Math.max(...xs):Math.min(...xs);return mc(`Số ${big?"lớn":"bé"} nhất trong các số ${xs.join(", ")} là:`,a,xs.filter(x=>x!==a))}const a=R(0,8);return num(`Số nào đứng giữa ${a} và ${a+2}?`,a+1)}]},
{n:"Hình vuông, tròn, tam giác, chữ nhật",g:[
 ()=>{const s=pick(Object.keys(SH));return mc("Đây là hình gì?",cap(SH[s]),Object.values(SH).map(cap),{pic:{k:"shape",s}})},
 ()=>{const list=[...Array(R(4,6))].map(()=>pick(Object.keys(SH))),s=pick(list);return num(`Trong hình có bao nhiêu ${SH[s]}?`,list.filter(x=>x===s).length,{pic:{k:"shapes",list},noIn:true})},
 ()=>{const k=R(0,2);if(k===0)return mc("Hình nào có 3 cạnh?","Hình tam giác",["Hình vuông","Hình tròn","Hình chữ nhật"]);if(k===1)return mc("Hình nào không có cạnh?","Hình tròn",["Hình vuông","Hình tam giác","Hình chữ nhật"]);
  const list=[...Array(6)].map(()=>pick(Object.keys(SH)));const[a,b]=shuffle(Object.keys(SH));return num(`Có tất cả bao nhiêu ${SH[a]} và ${SH[b]}?`,list.filter(x=>x===a||x===b).length,{pic:{k:"shapes",list},noIn:true})}]},
{n:"Phép cộng, phép trừ trong phạm vi 10",g:[
 ()=>{const it=pick(IT);if(Math.random()<.5){const a=R(1,5),b=R(1,Math.min(5,10-a));return num(`${a} + ${b} = ?`,a+b,{pic:{k:"add",item:it,a,b},noIn:true})}const a=R(3,9),b=R(1,a-1);return num(`Có ${a} ${IN[it]}, gạch đi ${b}. ${a} − ${b} = ?`,a-b,{pic:{k:"sub",item:it,a,b},noIn:true})},
 ()=>{const k=R(0,2);if(k===0){const a=R(0,10),b=R(0,10-a);return num(`${a} + ${b} = ?`,a+b)}if(k===1){const a=R(1,10),b=R(0,a);return num(`${a} − ${b} = ?`,a-b)}const x=R(1,6),b=R(1,10-x);return num(`Số nào điền vào chỗ trống: … + ${b} = ${x+b}`,x,{ex:`${x+b} − ${b} = ${x}`})},
 ()=>{const k=R(0,3),n=name();if(k===0){const a=R(2,7),b=R(1,10-a);return num(`Trên cành có ${a} con chim, thêm ${b} con bay đến. Hỏi trên cành có tất cả mấy con chim?`,a+b,{ex:`${a} + ${b} = ${a+b}`})}
  if(k===1){const a=R(5,10),b=R(1,a-1);return num(`Mẹ có ${a} quả cam, mẹ cho bé ${b} quả. Hỏi mẹ còn lại mấy quả cam?`,a-b,{ex:`${a} − ${b} = ${a-b}`})}
  if(k===2){const a=R(2,6),b=R(1,10-a);return num(`${n} có ${a} viên bi, bạn cho thêm ${b} viên. Hỏi ${n} có tất cả mấy viên bi?`,a+b,{ex:`${a} + ${b} = ${a+b}`})}
  const a=R(2,6),b=R(1,10-a),c=R(1,a+b);return num(`${a} + ${b} − ${c} = ?`,a+b-c,{ex:`${a} + ${b} = ${a+b}; ${a+b} − ${c} = ${a+b-c}`})}]},
{n:"Các số đến 100",g:[
 ()=>{const c=R(1,9),u=R(0,9),n=c*10+u;if(Math.random()<.5)return num(`Số gồm ${c} chục và ${u} đơn vị là:`,n,{noIn:true});const r=u?c+u*10:n+10;return mc(`Số ${n} đọc là:`,doc(n),[doc(r>99?n-1:r),U[c]+" "+(u?U[u]:"mươi"),doc(n<99?n+1:n-2),U[c]+" mươi "+U[u]])},
 ()=>{if(Math.random()<.5){const a=R(10,99);let b;do{b=R(10,99)}while(b===a);return cmp(`Điền dấu thích hợp: ${a} … ${b}`,a,b)}const c=R(1,9),u=R(1,9);return mc(`Số ${c*10+u} gồm:`,`${c} chục và ${u} đơn vị`,[`${u} chục và ${c} đơn vị`,`${c*10} chục và ${u} đơn vị`,`${c} chục và ${u*10} đơn vị`].filter(x=>x!==`${c} chục và ${u} đơn vị`))},
 ()=>{if(Math.random()<.5){const xs=[];while(xs.length<4){const v=R(10,99);if(!xs.includes(v))xs.push(v)}const big=Math.random()<.5,a=big?Math.max(...xs):Math.min(...xs);return mc(`Số ${big?"lớn":"bé"} nhất trong các số ${xs.join(", ")} là:`,a,xs.filter(x=>x!==a))}
  let a=R(1,9),b;do{b=R(1,9)}while(b===a);const big=Math.random()<.5,v=big?Math.max(a,b)*10+Math.min(a,b):Math.min(a,b)*10+Math.max(a,b);return num(`Dùng hai chữ số ${a} và ${b}, viết được số có hai chữ số ${big?"lớn":"bé"} nhất là:`,v,{ex:`Chữ số ${big?"lớn":"bé"} hơn đặt ở hàng chục: ${v}`})}]},
{n:"Cộng, trừ (không nhớ) trong phạm vi 100",g:[
 ()=>{if(Math.random()<.5){const a=R(1,9)*10,b=R(1,9-a/10)*10;return num(`${a} + ${b} = ?`,a+b)}let a,b;do{a=R(11,95);b=R(1,9)}while(a%10+b>9);return num(`${a} + ${b} = ?`,a+b)},
 ()=>{if(Math.random()<.5){const[a,b]=noCarry();return num(`${a} + ${b} = ?`,a+b,{ex:`Cộng đơn vị: ${a%10} + ${b%10} = ${(a+b)%10}; cộng chục: ${Math.floor(a/10)} + ${Math.floor(b/10)} = ${Math.floor((a+b)/10)}`})}const[a,b]=noBorrow();return num(`${a} − ${b} = ?`,a-b)},
 ()=>{const k=R(0,2),n=name();if(k===0){const[a,b]=noCarry();return num(`Lớp 1A có ${a} quyển truyện, lớp 1B có ${b} quyển truyện. Hỏi cả hai lớp có bao nhiêu quyển truyện?`,a+b,{ex:`${a} + ${b} = ${a+b}`})}
  if(k===1){const[a,b]=noBorrow();return num(`${n} có ${a} cái nhãn vở, ${n} đã dùng ${b} cái. Hỏi ${n} còn lại bao nhiêu cái nhãn vở?`,a-b,{ex:`${a} − ${b} = ${a-b}`})}
  const[a,b]=noCarry();return num(`Số nào điền vào chỗ trống: … − ${b} = ${a}`,a+b,{ex:`${a} + ${b} = ${a+b}`})}]},
{n:"Độ dài, giờ và ngày trong tuần",g:[
 ()=>{if(Math.random()<.6){const h=R(1,12);return mc("Đồng hồ chỉ mấy giờ?",`${h} giờ`,[`${h%12+1} giờ`,`${(h+10)%12+1} giờ`,`${12-h||6} giờ`,`${(h+5)%12+1} giờ`],{pic:{k:"clock",h,m:0}})}return mc("Một tuần lễ có mấy ngày?","7 ngày",["5 ngày","6 ngày","10 ngày"])},
 ()=>{if(Math.random()<.5){const d=R(0,6);return mc(`Hôm nay là ${DAYS[d]}. Ngày mai là thứ mấy?`,DAYS[(d+1)%7],DAYS.filter((_,i)=>i!==(d+1)%7).slice(0,6).sort(()=>Math.random()-.5))}const a=R(3,9),b=R(2,9);return num(`Đoạn thẳng AB dài ${a} cm, đoạn thẳng BC dài ${b} cm. Cả hai đoạn dài bao nhiêu xăng-ti-mét?`,a+b,{ex:`${a} + ${b} = ${a+b} (cm)`})},
 ()=>{if(Math.random()<.5){const d=R(0,6),k=R(2,5);return mc(`Hôm nay là ${DAYS[d]}. ${k} ngày nữa là thứ mấy?`,DAYS[(d+k)%7],shuffle(DAYS.filter((_,i)=>i!==(d+k)%7)),{ex:`Đếm tiếp ${k} ngày từ ${DAYS[d]}.`})}const h=R(1,12);return mc(`Kim ngắn chỉ số ${h}, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?`,`${h} giờ`,[`12 giờ`,`${h%12+1} giờ`,`${(h+10)%12+1} giờ`].filter(x=>x!==`${h} giờ`))}]}],
tv:[
{n:"Âm và chữ cái",b:[
 [1,"Tiếng “bà” bắt đầu bằng chữ cái nào?","b","d","p","đ"],
 [1,"Tiếng “mẹ” bắt đầu bằng chữ cái nào?","m","n","h","e"],
 [1,"Tiếng “cá” bắt đầu bằng âm nào?","c","k","q","a"],
 [1,"Chữ cái đứng ngay sau chữ “a” trong bảng chữ cái là:","ă","â","b","c"],
 [1,"Từ “ô tô” có mấy tiếng?","2","1","3","4"],
 [2,"Tiếng nào có âm “nh”?","nhà","na","ngà","hà"],
 [2,"Tiếng nào có âm “ph”?","phố","bố","tố","cố"],
 [2,"Tiếng “ghế” bắt đầu bằng âm nào?","gh","g","h","ng"],
 [2,"Tiếng “khế” bắt đầu bằng âm nào?","kh","k","h","c"],
 [3,"Từ nào có cả hai tiếng đều bắt đầu bằng âm “l”?","lá lốt","lá sen","lọ hoa","quả lê"],
 [3,"Tiếng nào có âm “tr”?","trâu","châu","sâu","râu"]]},
{n:"Dấu thanh",b:[
 [1,"Tiếng nào có dấu sắc?","lá","là","lả","lạ"],
 [1,"Tiếng nào có dấu nặng?","mạ","má","mà","mả"],
 [1,"Tiếng “cỏ” có dấu thanh gì?","dấu hỏi","dấu ngã","dấu sắc","dấu huyền"],
 [1,"Tiếng nào có dấu ngã?","võ","vó","vò","vọ"],
 [2,"Thêm dấu huyền vào tiếng “ga” ta được tiếng nào?","gà","gá","gạ","gả"],
 [2,"Con vật nào có tên mang dấu ngã?","con ngỗng","con mèo","con gà","con bò"],
 [2,"Đổi dấu sắc trong tiếng “bé” thành dấu hỏi, ta được tiếng nào?","bẻ","bè","bẽ","bẹ"],
 [3,"Câu “Bé đi nhà trẻ.” có mấy tiếng mang dấu thanh?","3","2","4","1","=Bé (dấu sắc), nhà (dấu huyền), trẻ (dấu hỏi)."],
 [3,"Từ nào có cả dấu hỏi và dấu ngã?","sửa chữa","sửa xe","chữa bệnh","lá cờ"]]},
{n:"Vần",b:[
 [1,"Tiếng “bàn” có vần gì?","an","ang","am","ăn"],
 [1,"Tiếng “mèo” có vần gì?","eo","ao","êu","oe"],
 [1,"Tiếng nào có vần “ong”?","bóng","bánh","bên","bung"],
 [2,"Tiếng nào có vần “anh”?","chanh","chăn","chang","chênh"],
 [2,"Tiếng nào có vần “uôi”?","chuối","chối","chui","chơi"],
 [2,"Tiếng “ếch” có vần gì?","êch","ach","ich","ech"],
 [2,"Tiếng nào có vần “ươn”?","vườn","vòng","vui","buồn"],
 [3,"Từ nào có hai tiếng cùng vần?","lon ton","bàn ghế","sách vở","mũ áo"],
 [3,"Tiếng nào khác vần với các tiếng còn lại: lan, can, nam, đan?","nam","lan","can","đan"]]},
{n:"Chính tả c/k, g/gh, ng/ngh",b:[
 [1,"Từ nào viết đúng?","con kiến","con ciến","kon kiến","con qiến"],
 [1,"Điền vào chỗ trống: cái …ế (để ngồi)","gh","g","ng","ngh"],
 [1,"Từ nào viết đúng?","con gà","con ghà","kon gà","con gha"],
 [1,"Từ nào viết đúng?","quả cam","quả kam","quả qam","quã cam"],
 [2,"Từ nào viết đúng?","nghỉ hè","ngỉ hè","nghĩ hè","nghỉ hẹ"],
 [2,"Điền vào chỗ trống: bé …ủ say","ng","ngh","g","gh"],
 [2,"Từ nào viết đúng?","cái kéo","cái céo","kái kéo","cái qéo"],
 [3,"Chữ “k” chỉ đứng trước các chữ cái nào?","e, ê, i","a, o, u","ă, â, ơ","o, ô, ơ","=Viết k trước e, ê, i; viết c trước các chữ còn lại."],
 [3,"Từ nào viết SAI chính tả?","con ghà","con gà","ghi nhớ","gồ ghề","=Viết gh trước e, ê, i nên phải viết “con gà”."],
 [3,"Điền vào chỗ trống: …ệ sĩ (người biểu diễn)","ngh","ng","gh","g"]]},
{n:"Từ ngữ quanh em",b:[
 [1,"Từ nào chỉ con vật?","con chó","cái bàn","quả cam","bông hoa"],
 [1,"Từ nào chỉ đồ dùng học tập?","quyển vở","cái nồi","cái chổi","con dao"],
 [1,"Từ nào chỉ loại quả?","quả xoài","cái mũ","con mèo","đôi dép"],
 [2,"Từ nào không cùng nhóm: bút, thước, vở, chạy?","chạy","bút","thước","vở"],
 [2,"Từ nào chỉ người trong gia đình?","ông bà","cô giáo","bác sĩ","bạn bè"],
 [2,"Con gì kêu “meo meo”?","con mèo","con chó","con gà","con vịt"],
 [3,"Chọn từ điền vào chỗ trống: Mẹ đi chợ mua … về nấu canh.","rau","bút","ghế","mũ"],
 [3,"Chọn từ điền vào chỗ trống: Bé … bài rất chăm.","học","ăn","ngủ","chạy"],
 [3,"Từ nào trái nghĩa với “to”?","nhỏ","cao","dài","béo"]]},
{n:"Đọc hiểu câu, đoạn ngắn",p:{
 A:"Nhà bé Na có một khu vườn nhỏ. Trong vườn có cây cam, cây bưởi và một luống rau cải. Sáng nào Na cũng cùng mẹ ra vườn tưới rau. Rau lớn nhanh, xanh mướt.",
 B:"Chú gà trống nhà em có bộ lông đỏ rực, cái mào đỏ chót. Sáng sớm, chú gáy “Ò ó o…” thật to để đánh thức cả nhà."},b:[
 [1,"@A","Nhà bé Na có gì?","một khu vườn nhỏ","một cái ao","một chuồng gà","một con mèo"],
 [1,"@A","Trong vườn có những cây gì?","cây cam, cây bưởi","cây xoài, cây mít","cây chuối, cây dừa","cây ổi, cây na"],
 [2,"@A","Sáng nào Na cũng làm gì?","cùng mẹ tưới rau","đi học một mình","đi chợ với bố","chơi với bạn"],
 [2,"@A","Rau trong vườn như thế nào?","xanh mướt","vàng úa","héo khô","bé tí"],
 [3,"@A","Vì sao rau lớn nhanh?","Vì Na và mẹ tưới rau mỗi sáng","Vì trời mưa nhiều","Vì rau ở trong nhà","Vì Na hái rau"],
 [1,"@B","Gà trống có bộ lông màu gì?","đỏ rực","trắng tinh","đen nhánh","vàng óng"],
 [1,"@B","Chú gà trống gáy vào lúc nào?","sáng sớm","buổi trưa","buổi chiều","ban đêm"],
 [2,"@B","Chú gà gáy thật to để làm gì?","đánh thức cả nhà","gọi bạn đi chơi","đòi ăn thóc","đuổi con mèo"],
 ["o",2,"Xếp các thẻ thành câu đúng:","Bé/đi/học"],
 ["o",3,"Xếp các thẻ thành câu đúng:","Mẹ/cho bé/đi/công viên"]]}]});
}
