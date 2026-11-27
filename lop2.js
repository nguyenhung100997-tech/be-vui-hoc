/* Lớp 2 – theo mạch bài Toán 2 và Tiếng Việt 2 (Kết nối tri thức với cuộc sống). */
{const{R,pick,shuffle,f,num,mc,inp,cmp,name,doc}=BV.H;
const nc=(lo,hi)=>{let a,b;do{a=R(lo,hi);b=R(lo,hi)}while(a%10+b%10>9||a+b>99);return[a,b]};
const carry=()=>{let a,b;do{a=R(15,85);b=R(6,99-a)}while(a%10+b%10<10);return[a,b]};
const borrow=()=>{let a,b;do{a=R(21,99);b=R(6,a-5)}while(b%10<=a%10);return[a,b]};
const t20=()=>{const a=R(2,9),b=R(11-a,9);return[a,b]};
const clockTxt=(h,m)=>m?`${h} giờ ${m} phút`:`${h} giờ`;
BV.grade(2,{
toan:[
{n:"Ôn tập: số hạng, tổng, số bị trừ, hiệu",g:[
 ()=>{const[a,b]=nc(10,80);return Math.random()<.5?num(`Tổng của ${a} và ${b} là:`,a+b,{ex:`${a} + ${b} = ${a+b}`}):num(`Hiệu của ${a+b} và ${b} là:`,a,{ex:`${a+b} − ${b} = ${a}`})},
 ()=>{const[a,b]=nc(10,80);return Math.random()<.5?num(`Tìm số hạng chưa biết: … + ${b} = ${a+b}`,a,{ex:`Lấy tổng trừ số hạng đã biết: ${a+b} − ${b} = ${a}`}):num(`Tìm số bị trừ: … − ${b} = ${a}`,a+b,{ex:`Lấy hiệu cộng số trừ: ${a} + ${b} = ${a+b}`})},
 ()=>{const n=name();let m;do{m=name()}while(m===n);const[a,b]=nc(10,60);return Math.random()<.5?num(`${n} có ${a} cái bút chì màu, ${m} có nhiều hơn ${n} ${b} cái. Hỏi ${m} có bao nhiêu cái bút chì màu?`,a+b,{ex:`Nhiều hơn thì làm phép cộng: ${a} + ${b} = ${a+b}`}):num(`Thùng thứ nhất có ${a+b} quả bưởi, thùng thứ hai có ít hơn thùng thứ nhất ${b} quả. Hỏi thùng thứ hai có bao nhiêu quả bưởi?`,a,{ex:`Ít hơn thì làm phép trừ: ${a+b} − ${b} = ${a}`})}]},
{n:"Phép cộng, phép trừ (qua 10) trong phạm vi 20",g:[
 ()=>{const[a,b]=t20();return Math.random()<.5?num(`${a} + ${b} = ?`,a+b,{ex:`Tách để được 10: ${a} + ${10-a} = 10, 10 + ${b-(10-a)} = ${a+b}`}):num(`${a+b} − ${b} = ?`,a)},
 ()=>{const[a,b]=t20(),k=R(0,2);if(k===0)return num(`Số nào điền vào chỗ trống: … + ${b} = ${a+b}`,a);if(k===1)return num(`Số nào điền vào chỗ trống: ${a+b} − … = ${a}`,b);const c=R(2,a+b-1);return num(`${a} + ${b} − ${c} = ?`,a+b-c,{ex:`${a} + ${b} = ${a+b}; ${a+b} − ${c} = ${a+b-c}`})},
 ()=>{const[a,b]=t20();return Math.random()<.5?num(`Đàn vịt có ${a+b} con, đàn gà ít hơn đàn vịt ${b} con. Hỏi đàn gà có bao nhiêu con?`,a,{ex:`${a+b} − ${b} = ${a}`}):num(`Lan gấp được ${a} ngôi sao, Hà gấp được nhiều hơn Lan ${b} ngôi sao. Hỏi Hà gấp được bao nhiêu ngôi sao?`,a+b,{ex:`${a} + ${b} = ${a+b}`})}]},
{n:"Ki-lô-gam và lít",g:[
 ()=>{if(Math.random()<.4)return mc("Đơn vị nào dùng để đo khối lượng (độ nặng)?","ki-lô-gam (kg)",["lít (l)","xăng-ti-mét (cm)","giờ"]);const a=R(2,40),b=R(2,40),u=pick(["kg","l"]);return num(`${a} ${u} + ${b} ${u} = … ${u}`,a+b)},
 ()=>{const a=R(12,40),b=R(3,a-4);return Math.random()<.5?num(`Can to đựng ${a} l nước, can bé đựng ít hơn can to ${b} l. Hỏi can bé đựng bao nhiêu lít nước?`,a-b,{ex:`${a} − ${b} = ${a-b} (l)`}):num(`Bao gạo nặng ${a} kg, bao ngô nặng hơn bao gạo ${b} kg. Hỏi bao ngô nặng bao nhiêu ki-lô-gam?`,a+b,{ex:`${a} + ${b} = ${a+b} (kg)`})},
 ()=>{const x=R(2,9),c=R(1,5);return Math.random()<.5?num(`Cân thăng bằng: đĩa bên trái có quả bí và quả cân ${c} kg, đĩa bên phải có quả cân ${x+c} kg. Quả bí nặng bao nhiêu ki-lô-gam?`,x,{ex:`${x+c} − ${c} = ${x} (kg)`}):num(`Mẹ rót đầy ${x} chai nước, mỗi chai 1 l, rồi rót thêm ${c} l nữa vào bình. Mẹ đã rót tất cả bao nhiêu lít nước?`,x+c,{ex:`${x} + ${c} = ${x+c} (l)`})}]},
{n:"Phép cộng, phép trừ (có nhớ) trong phạm vi 100",g:[
 ()=>{if(Math.random()<.5){const[a,b]=carry();return num(`${a} + ${b} = ?`,a+b,{ex:`${a%10} + ${b%10} = ${a%10+b%10}, viết ${(a+b)%10} nhớ 1`})}const[a,b]=borrow();return num(`${a} − ${b} = ?`,a-b,{ex:`${a%10} không trừ được ${b%10}, lấy ${a%10+10} − ${b%10} = ${(a%10+10)-b%10}, nhớ 1`})},
 ()=>{const[a,b]=carry();if(Math.random()<.5)return num(`Tìm số hạng chưa biết: ${a} + … = ${a+b}`,b);const c=R(10,99);return cmp(`Điền dấu thích hợp: ${a} + ${b} … ${c}`,a+b,c,{ex:`${a} + ${b} = ${a+b}`})},
 ()=>{const k=R(0,2);if(k===0){const[a,b]=carry();return num(`Trường em có ${a} bạn tham gia đồng diễn, sau đó có thêm ${b} bạn. Hỏi có tất cả bao nhiêu bạn tham gia?`,a+b,{ex:`${a} + ${b} = ${a+b}`})}
  if(k===1){const[a,b]=borrow();return num(`Một sợi dây dài ${a} cm, cắt đi ${b} cm. Hỏi sợi dây còn lại dài bao nhiêu xăng-ti-mét?`,a-b,{ex:`${a} − ${b} = ${a-b} (cm)`})}
  const[a,b]=carry(),c=R(5,a+b-5);return num(`${a} + ${b} − ${c} = ?`,a+b-c,{ex:`${a} + ${b} = ${a+b}; ${a+b} − ${c} = ${a+b-c}`})}]},
{n:"Phép nhân, phép chia (bảng 2, bảng 5)",g:[
 ()=>{const a=pick([2,5]),b=R(1,10);if(Math.random()<.35){const n=R(3,5);return mc(`Tổng ${Array(n).fill(a).join(" + ")} viết thành phép nhân là:`,`${a} × ${n}`,[`${a} + ${n}`,`${a} × ${n+1}`,`${a} × ${n-1}`])}return num(`${a} × ${b} = ?`,a*b)},
 ()=>{const a=pick([2,5]),b=R(1,10),k=R(0,2);if(k===0)return num(`${a*b} : ${a} = ?`,b,{ex:`Vì ${a} × ${b} = ${a*b} nên ${a*b} : ${a} = ${b}`});if(k===1)return num(`Tích của ${a} và ${b} là:`,a*b);return num(`${a} được lấy ${b} lần bằng bao nhiêu?`,a*b,{ex:`${a} × ${b} = ${a*b}`})},
 ()=>{const k=R(0,2),b=R(2,10);if(k===0)return num(`Mỗi con gà có 2 chân. Hỏi ${b} con gà có bao nhiêu chân?`,2*b,{ex:`2 × ${b} = ${2*b}`});if(k===1)return num(`Có ${5*b} cái kẹo chia đều cho 5 bạn. Hỏi mỗi bạn được mấy cái kẹo?`,b,{ex:`${5*b} : 5 = ${b}`});return num(`Mỗi bàn có 2 bạn ngồi. Lớp có ${2*b} bạn thì cần bao nhiêu bàn?`,b,{ex:`${2*b} : 2 = ${b}`})}]},
{n:"Số đến 1000, giờ và ngày tháng",g:[
 ()=>{const k=R(0,2);if(k===0){const h=R(1,9),c=R(0,9),u=R(0,9);return num(`Số gồm ${h} trăm, ${c} chục và ${u} đơn vị là:`,h*100+c*10+u,{noIn:true})}
  if(k===1){const n=R(101,999);return mc(`Số ${n} đọc là:`,doc(n),[doc(n+10>999?n-10:n+10),doc(Math.floor(n/100)*100+(n%10)*10+Math.floor(n/10)%10),doc(n+1>999?n-2:n+1)])}
  const h=R(1,12),m=pick([0,15,30]);return mc("Đồng hồ chỉ mấy giờ?",clockTxt(h,m),[clockTxt(h,(m+15)%45),clockTxt(h%12+1,m),clockTxt((h+10)%12+1,m),clockTxt(h,m?0:30)],{pic:{k:"clock",h,m}})},
 ()=>{if(Math.random()<.5){const a=R(100,999);let b=Math.random()<.15?a:R(100,999);return cmp(`Điền dấu thích hợp: ${a} … ${b}`,a,b)}let a,b;do{a=R(100,800);b=R(100,999-a)}while(a%10+b%10>9||Math.floor(a/10)%10+Math.floor(b/10)%10>9);return Math.random()<.5?num(`${a} + ${b} = ?`,a+b):num(`${a+b} − ${b} = ?`,a)},
 ()=>{const k=R(0,2);if(k===0){const d=R(1,20);return num(`Thứ Hai tuần này là ngày ${d}. Thứ Hai tuần sau là ngày bao nhiêu?`,d+7,{ex:`Một tuần có 7 ngày: ${d} + 7 = ${d+7}`})}
  if(k===1){const a=R(150,600),b=R(120,350);return num(`Một trường có ${a} học sinh nam và ${b} học sinh nữ. Hỏi trường có tất cả bao nhiêu học sinh?`,a+b,{ex:`${a} + ${b} = ${a+b}`})}
  const h=R(6,10),d=R(1,3);return mc(`Bé vào học lúc ${h} giờ, học ${d} giờ thì nghỉ. Bé nghỉ lúc mấy giờ?`,`${h+d} giờ`,[`${h+d+1} giờ`,`${h} giờ`,`${h+d-1} giờ`],{ex:`${h} + ${d} = ${h+d}`})}]}],
tv:[
{n:"Từ chỉ sự vật, hoạt động, đặc điểm",b:[
 [1,"Từ nào chỉ sự vật?","quyển sách","đọc","đỏ","nhảy"],
 [1,"Từ nào chỉ hoạt động?","chạy","cái bút","xanh","quyển vở"],
 [1,"Từ nào chỉ đặc điểm?","cao","viết","bàn","cây"],
 [1,"Từ nào chỉ màu sắc?","tím","ngọt","to","hát"],
 [2,"Trong câu “Em đang quét nhà.”, từ chỉ hoạt động là:","quét","em","nhà","đang"],
 [2,"Từ nào không cùng nhóm với các từ còn lại?","chạy","bút","thước","vở"],
 [2,"Từ nào chỉ tính nết của người?","chăm chỉ","ngôi trường","mặt trời","nhảy dây"],
 [2,"Từ nào chỉ đồ dùng trong gia đình?","nồi cơm điện","bảng đen","phấn trắng","sân trường"],
 [3,"Câu “Bông hoa hồng đỏ thắm.” có từ chỉ đặc điểm là:","đỏ thắm","bông hoa","hồng","hoa hồng"],
 ["i",3,"Điền một từ chỉ hoạt động vào chỗ trống: Chú chim đang … trên cành.","hót|hót líu lo|líu lo|nhảy|nhảy nhót|ca hát|hát|kiếm mồi|tìm mồi|rỉa lông","=Có thể điền: hót, nhảy nhót, rỉa lông…"]]},
{n:"Câu giới thiệu, câu nêu hoạt động, câu nêu đặc điểm",b:[
 [1,"Câu “Mẹ em là bác sĩ.” là kiểu câu nào?","câu giới thiệu","câu nêu hoạt động","câu nêu đặc điểm","câu hỏi"],
 [1,"Câu “Bé Lan đang tưới cây.” là kiểu câu nào?","câu nêu hoạt động","câu giới thiệu","câu nêu đặc điểm","câu cảm"],
 [1,"Câu “Bầu trời rất trong xanh.” là kiểu câu nào?","câu nêu đặc điểm","câu giới thiệu","câu nêu hoạt động","câu hỏi"],
 [2,"Bộ phận nào trả lời câu hỏi “Làm gì?” trong câu “Các bạn nhỏ đang chơi kéo co.”?","đang chơi kéo co","Các bạn nhỏ","kéo co","các bạn"],
 [2,"Bộ phận nào trả lời câu hỏi “Ai?” trong câu “Ông em là bộ đội.”?","Ông em","là bộ đội","bộ đội","em"],
 [2,"Câu nào là câu giới thiệu?","Đây là bạn Minh.","Minh đang đọc truyện.","Minh rất chăm chỉ.","Minh ơi, đi chơi nhé!"],
 [3,"Điền từ để có câu giới thiệu: Vân Anh là … lớp 2A.","học sinh","đang học","chăm ngoan","rất vui"],
 ["o",2,"Xếp các thẻ thành câu nêu hoạt động:","Bạn Hà/đang đọc sách/trong thư viện"],
 ["o",3,"Xếp các thẻ thành câu nêu đặc điểm:","Những bông hoa/trong vườn/nở rất đẹp"]]},
{n:"Dấu chấm, dấu chấm hỏi, dấu chấm than, dấu phẩy",b:[
 [1,"Cuối câu kể, ta dùng dấu gì?","dấu chấm (.)","dấu chấm hỏi (?)","dấu chấm than (!)","dấu phẩy (,)"],
 [1,"Câu “Bạn tên là gì” cần dấu gì ở cuối?","dấu chấm hỏi (?)","dấu chấm (.)","dấu chấm than (!)","dấu phẩy (,)"],
 [1,"Câu “Ôi, bông hoa đẹp quá” cần dấu gì ở cuối?","dấu chấm than (!)","dấu chấm hỏi (?)","dấu chấm (.)","dấu phẩy (,)"],
 [2,"Câu nào đặt dấu phẩy đúng?","Em mua bút, thước và vở.","Em mua, bút thước và vở.","Em, mua bút thước và vở.","Em mua bút thước, và vở."],
 [2,"Câu nào là câu hỏi?","Hôm nay bạn có đi học không?","Hôm nay bạn đi học.","Bạn đi học sớm quá!","Bạn hãy đi học sớm."],
 [2,"Chữ đầu câu phải viết thế nào?","viết hoa","viết thường","viết nghiêng","viết đậm"],
 [3,"Câu nào dùng SAI dấu câu?","Em thích đọc truyện?","Em thích đọc truyện.","Bạn thích đọc truyện gì?","Ôi, truyện hay quá!","=Câu kể phải kết thúc bằng dấu chấm."],
 ["o",2,"Xếp các thẻ thành câu hỏi:","Bạn/có thích/đá bóng/không?"]]},
{n:"Chính tả: s/x, ch/tr, l/n, r/d/gi",b:[
 [1,"Từ nào viết đúng?","sáng sớm","xáng sớm","sáng xớm","xáng xớm"],
 [1,"Từ nào viết đúng?","trường học","chường học","trường hộc","chường hộc"],
 [1,"Từ nào viết đúng?","nắng nóng","lắng lóng","nắng lóng","lắng nóng"],
 [2,"Từ nào viết đúng?","quả chuối","quả truối","quả chối","quả chúi"],
 [2,"Từ nào viết đúng?","xe đạp","se đạp","xe đạt","se đạt"],
 [2,"Từ nào viết đúng?","dòng sông","dòng xông","giòng sông","ròng sông"],
 [2,"Từ nào viết đúng?","giọt mưa","dọt mưa","rọt mưa","giọt mứa"],
 ["i",1,"Điền s hoặc x vào chỗ trống: …ân trường","s"],
 ["i",2,"Điền ch hoặc tr vào chỗ trống: cây …e","tr","=Cây tre."],
 ["i",3,"Điền l hoặc n vào chỗ trống: …o lắng","l","=Lo lắng."]]},
{n:"Từ có nghĩa giống nhau, trái ngược",b:[
 [1,"Từ trái nghĩa với “cao” là:","thấp","to","dài","xa"],
 [1,"Từ trái nghĩa với “nóng” là:","lạnh","ấm","nắng","đỏ"],
 [1,"Từ có nghĩa giống “to” là:","lớn","bé","nhỏ","thấp"],
 [2,"Từ có nghĩa giống “siêng năng” là:","chăm chỉ","lười biếng","thông minh","vui vẻ"],
 [2,"Từ trái nghĩa với “nhanh” là:","chậm","vội","gấp","sớm"],
 [2,"Cặp từ nào có nghĩa trái ngược nhau?","khóc – cười","ăn – uống","đi – chạy","đẹp – xinh"],
 [3,"Tìm từ trái nghĩa điền vào chỗ trống: Chuột nhỏ, voi …","to","cao","chậm","dài"],
 ["i",3,"Viết từ trái nghĩa với “ngày”:","đêm|ban đêm"]]},
{n:"Đọc hiểu đoạn văn",p:{
 A:"Sáng chủ nhật, bố đưa Nam ra biển. Mặt biển xanh biếc, sóng vỗ rì rào. Nam cùng bố xây một lâu đài cát thật to. Lúc về, Nam nhặt một vỏ ốc nhỏ làm quà tặng em gái.",
 B:"Cây bàng ở sân trường em đã nhiều tuổi. Mùa hè, tán bàng xòe rộng như chiếc ô khổng lồ che mát cho chúng em vui chơi. Mùa đông, lá bàng chuyển sang màu đỏ rồi rụng xuống."},b:[
 [1,"@A","Bố đưa Nam đi đâu?","ra biển","về quê","đi công viên","đi sở thú"],
 [1,"@A","Mặt biển có màu gì?","xanh biếc","đỏ thắm","vàng óng","trắng xóa"],
 [2,"@A","Nam và bố đã cùng nhau làm gì?","xây lâu đài cát","bơi thi","câu cá","thả diều"],
 [3,"@A","Việc Nam mang vỏ ốc về tặng em gái cho thấy Nam là người thế nào?","biết quan tâm đến em","rất hiếu động","thích đi biển","hay nhặt đồ chơi"],
 [1,"@B","Cây bàng được trồng ở đâu?","sân trường","vườn nhà","công viên","ven đường"],
 [2,"@B","Tán bàng mùa hè được so sánh với gì?","chiếc ô khổng lồ","mái nhà","đám mây","cái nón"],
 [2,"@B","Mùa đông, lá bàng như thế nào?","chuyển màu đỏ rồi rụng","xanh mướt","nở hoa trắng","ra quả chín"],
 ["i",3,"@B","Tìm trong đoạn văn một từ chỉ màu sắc:","đỏ|màu đỏ"]]}]});
}
/* Bổ sung câu Tiếng Việt lớp 2 */
BV.G[2].tv[1].b.push([3,"Câu nào là câu nêu đặc điểm?","Chú mèo nhà em rất lười.","Chú mèo đang bắt chuột.","Đây là chú mèo nhà em.","Chú mèo ơi, lại đây!"]);
BV.G[2].tv[2].b.push([1,"Cuối câu hỏi, ta dùng dấu gì?","dấu chấm hỏi (?)","dấu chấm (.)","dấu phẩy (,)","dấu chấm than (!)"],[3,"Chọn dấu câu cho ô trống: “Mẹ ơi, con được điểm mười □”","dấu chấm than (!)","dấu chấm hỏi (?)","dấu phẩy (,)","dấu hai chấm (:)"]);
BV.G[2].tv[4].b.push([2,"Từ nào có nghĩa giống “chăm chỉ”?","cần cù","lười nhác","nhanh nhẹn","vui vẻ"],[1,"Từ trái nghĩa với “đen” là:","trắng","đỏ","tối","xanh"]);
BV.G[2].tv[5].b.push([2,"@A","Sóng biển vỗ như thế nào?","rì rào","ầm ầm","lặng im","róc rách"],[3,"@B","Vì sao các bạn nhỏ thích chơi dưới gốc bàng vào mùa hè?","Vì tán bàng xòe rộng che mát","Vì cây bàng ra nhiều quả","Vì lá bàng chuyển màu đỏ","Vì cây bàng ở cạnh lớp học"]);
