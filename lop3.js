/* Lớp 3 – theo mạch bài Toán 3 và Tiếng Việt 3 (Kết nối tri thức với cuộc sống). */
{const{R,pick,shuffle,f,num,mc,inp,cmp,name}=BV.H;
const ROM=n=>{const t=[[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];let s="";for(const[v,r]of t)while(n>=v){s+=r;n-=v}return s};
const ct=(h,m)=>m?`${h} giờ ${m} phút`:`${h} giờ`;
BV.grade(3,{
toan:[
{n:"Bảng nhân, bảng chia 3 đến 9",g:[
 ()=>{const a=R(3,9),b=R(2,10);return Math.random()<.55?num(`${a} × ${b} = ?`,a*b):num(`${a*b} : ${a} = ?`,b,{ex:`Vì ${a} × ${b} = ${a*b}`})},
 ()=>{const a=R(3,9),b=R(2,9),k=R(0,2);if(k===0)return num(`Số nào điền vào chỗ trống: … × ${a} = ${a*b}`,b,{ex:`${a*b} : ${a} = ${b}`});if(k===1)return num(`Gấp ${b} lên ${a} lần được:`,a*b,{ex:`${b} × ${a} = ${a*b}`});return num(`Giảm ${a*b} đi ${a} lần được:`,b,{ex:`${a*b} : ${a} = ${b}`})},
 ()=>{const a=R(4,9),b=R(3,9),c=R(2,a*b-2);return Math.random()<.5?num(`Có ${b} hộp bút, mỗi hộp ${a} cái. Các bạn đã dùng ${c} cái. Hỏi còn lại bao nhiêu cái bút?`,a*b-c,{ex:`${a} × ${b} = ${a*b}; ${a*b} − ${c} = ${a*b-c}`}):num(`Mẹ mua ${b} túi cam, mỗi túi ${a} quả, rồi chia đều số cam vào ${pick([b])} đĩa. Mỗi đĩa có mấy quả cam?`,a,{ex:`${a} × ${b} = ${a*b}; ${a*b} : ${b} = ${a}`})}]},
{n:"Nhân, chia với số có một chữ số",g:[
 ()=>{const a=R(11,49),b=R(2,4);return num(`${a} × ${b} = ?`,a*b)},
 ()=>{const k=R(0,2);if(k===0){const b=R(2,6),q=R(12,99);return num(`${b*q} : ${b} = ?`,q,{ex:`${q} × ${b} = ${b*q}`})}if(k===1){const a=R(102,240),b=R(2,4);return num(`${a} × ${b} = ?`,a*b)}const b=R(3,9),q=R(4,9),r=R(1,b-1);return num(`${b*q+r} : ${b} = ${q} (dư …)`,r,{ex:`${b} × ${q} = ${b*q}; ${b*q+r} − ${b*q} = ${r}`})},
 ()=>{const b=R(4,9),q=R(5,12),r=R(1,b-1),n=b*q+r;return Math.random()<.5?num(`Có ${n} l nước mắm đổ vào các can, mỗi can ${b} l. Cần ít nhất bao nhiêu can để đựng hết?`,q+1,{ex:`${n} : ${b} = ${q} (dư ${r}); cần thêm 1 can cho ${r} l còn dư: ${q} + 1 = ${q+1}`}):num(`Có ${n} học sinh xếp vào các hàng, mỗi hàng ${b} bạn. Xếp được nhiều nhất bao nhiêu hàng đủ ${b} bạn?`,q,{ex:`${n} : ${b} = ${q} (dư ${r})`})}]},
{n:"Mi-li-mét, gam, mi-li-lít, nhiệt độ",g:[
 ()=>{const u=pick([["1 cm","mm",10],["1 m","cm",100],["1 kg","g",1000],["1 l","ml",1000],["1 m","mm",1000],["1 dm","cm",10]]);return num(`${u[0]} = … ${u[1]}`,u[2])},
 ()=>{const k=R(0,2);if(k===0){const a=R(2,8),b=R(1,95);return num(`${a} m ${b} cm = … cm`,a*100+b)}if(k===1){const a=R(1,4),b=R(1,9)*100;return num(`${a} kg ${b} g = … g`,a*1000+b)}const a=R(1,9)*100,b=pick([1000,a,R(1,9)*100]);return cmp(`Điền dấu thích hợp: ${a} g … ${b===1000?"1 kg":b+" g"}`,a,b)},
 ()=>{const k=R(0,1);if(k===0){const c=R(2,3),v=pick([200,250,300]);return num(`Bình có 1 l nước. Rót ra ${c} cốc, mỗi cốc ${v} ml. Hỏi bình còn lại bao nhiêu mi-li-lít nước?`,1000-c*v,{ex:`1 l = 1000 ml; ${c} × ${v} = ${c*v}; 1000 − ${c*v} = ${1000-c*v}`})}const s=R(18,30),d=R(3,9);return num(`Buổi sáng nhiệt độ là ${s} °C, buổi trưa tăng thêm ${d} °C. Hỏi buổi trưa nhiệt độ là bao nhiêu độ C?`,s+d)}]},
{n:"Chu vi, diện tích hình chữ nhật, hình vuông",g:[
 ()=>{const a=R(3,12);return num(`Hình vuông có cạnh ${a} cm. Chu vi hình vuông là bao nhiêu xăng-ti-mét?`,a*4,{pic:{k:"rect",w:a,h:a,u:"cm",sq:true},ex:`${a} × 4 = ${a*4} (cm)`})},
 ()=>{const w=R(5,15),h=R(2,w-1);return Math.random()<.5?num(`Chu vi hình chữ nhật là bao nhiêu xăng-ti-mét?`,(w+h)*2,{pic:{k:"rect",w,h,u:"cm"},ex:`(${w} + ${h}) × 2 = ${(w+h)*2} (cm)`}):num(`Diện tích hình chữ nhật là bao nhiêu xăng-ti-mét vuông?`,w*h,{pic:{k:"rect",w,h,u:"cm"},ex:`${w} × ${h} = ${w*h} (cm²)`})},
 ()=>{const k=R(0,2);if(k===0){const a=R(4,15);return num(`Một hình vuông có chu vi ${a*4} cm. Cạnh hình vuông dài bao nhiêu xăng-ti-mét?`,a,{ex:`${a*4} : 4 = ${a} (cm)`})}if(k===1){const h=R(2,7);return num(`Hình chữ nhật có chiều rộng ${h} cm, chiều dài gấp đôi chiều rộng. Diện tích hình chữ nhật là bao nhiêu xăng-ti-mét vuông?`,h*h*2,{ex:`Chiều dài: ${h} × 2 = ${h*2} cm; diện tích: ${h*2} × ${h} = ${h*h*2} (cm²)`})}const a=R(3,9);return num(`Ghép 2 hình vuông cạnh ${a} cm thành một hình chữ nhật. Chu vi hình chữ nhật là bao nhiêu xăng-ti-mét?`,a*6,{ex:`Chiều dài ${a*2} cm, chiều rộng ${a} cm: (${a*2} + ${a}) × 2 = ${a*6} (cm)`})}]},
{n:"Các số đến 100 000, làm tròn số, chữ số La Mã",g:[
 ()=>{if(Math.random()<.5){const n=[R(1,9),R(0,9),R(0,9),R(0,9)];return num(`Số gồm ${n[0]} nghìn, ${n[1]} trăm, ${n[2]} chục và ${n[3]} đơn vị là:`,+n.join(""),{noIn:true})}const n=R(1000,99998);return num(`Số liền sau của ${f(n)} là:`,n+1)},
 ()=>{const k=R(0,2);if(k===0){const a=R(10000,99999);let b=R(10000,99999);return cmp(`Điền dấu thích hợp: ${f(a)} … ${f(b)}`,a,b)}const a=R(1000,49999),b=R(1000,49999);return k===1?num(`${f(a)} + ${f(b)} = ?`,a+b):num(`${f(a+b)} − ${f(b)} = ?`,a)},
 ()=>{const k=R(0,2);if(k===0){const n=R(1,20);return num(`Số La Mã ${ROM(n)} là số nào?`,n,{noIn:true})}if(k===1){const n=R(1,20);return mc(`Số ${n} viết bằng chữ số La Mã là:`,ROM(n),[ROM(n%20+1),ROM(n>1?n-1:3),ROM((n+4)%20+1)])}
  const n=R(1001,9998),pl=pick([[10,"chục"],[100,"trăm"],[1000,"nghìn"]]);const v=Math.round(n/pl[0])*pl[0];return num(`Làm tròn số ${f(n)} đến hàng ${pl[1]} ta được:`,v,{ex:`Xét chữ số ngay bên phải hàng ${pl[1]}: nhỏ hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`})}]},
{n:"Xem đồng hồ, tháng năm, tiền, biểu thức",g:[
 ()=>{if(Math.random()<.7){const h=R(1,12),m=R(1,11)*5;return mc("Đồng hồ chỉ mấy giờ?",ct(h,m),[ct(m/5,h*5===60?55:h*5),ct(h%12+1,m),ct(h,(m+15)%60||5)],{pic:{k:"clock",h,m}})}return mc("Tháng nào sau đây có 31 ngày?","Tháng Bảy",["Tháng Tư","Tháng Sáu","Tháng Chín"])},
 ()=>{const a=R(10,60),b=R(2,9),c=R(2,9),k=R(0,2);if(k===0)return num(`Tính giá trị biểu thức: ${a} + ${b} × ${c}`,a+b*c,{ex:`Nhân trước, cộng sau: ${b} × ${c} = ${b*c}; ${a} + ${b*c} = ${a+b*c}`});if(k===1)return num(`Tính giá trị biểu thức: (${a} + ${b}) × ${c}`,(a+b)*c,{ex:`Trong ngoặc trước: ${a+b} × ${c} = ${(a+b)*c}`});const q=R(2,9);return num(`Tính giá trị biểu thức: ${a+30} − ${b*q} : ${b}`,a+30-q,{ex:`Chia trước: ${b*q} : ${b} = ${q}; ${a+30} − ${q} = ${a+30-q}`})},
 ()=>{if(Math.random()<.5){const p=R(4,9)*1000,c=R(2,3),pay=Math.ceil(p*c/10000)*10000;return num(`Mua ${c} quyển vở, mỗi quyển giá ${f(p)} đồng. Đưa cô bán hàng ${f(pay)} đồng thì được trả lại bao nhiêu đồng?`,pay-p*c,{ex:`${f(p)} × ${c} = ${f(p*c)}; ${f(pay)} − ${f(p*c)} = ${f(pay-p*c)}`})}
  const h=R(7,9),m=pick([0,15,30]),d=pick([30,45,90]);const tot=h*60+m+d;return mc(`Bé bắt đầu làm bài lúc ${ct(h,m)} và làm trong ${d} phút. Bé làm xong lúc mấy giờ?`,ct(Math.floor(tot/60),tot%60),[ct(Math.floor(tot/60)+1,tot%60),ct(h,(m+d)%60||30),ct(Math.floor(tot/60),(tot%60+15)%60)],{ex:`${ct(h,m)} thêm ${d} phút là ${ct(Math.floor(tot/60),tot%60)}`})}]}],
tv:[
{n:"Từ có nghĩa giống nhau, trái ngược nhau",b:[
 [1,"Từ có nghĩa giống với “chăm chỉ” là:","siêng năng","lười biếng","nhanh nhẹn","vui vẻ"],
 [1,"Từ trái nghĩa với “dũng cảm” là:","hèn nhát","gan dạ","mạnh mẽ","anh hùng"],
 [1,"Từ có nghĩa giống với “quê hương” là:","quê quán","thành phố","đất nước","làng xóm"],
 [2,"Cặp từ nào có nghĩa giống nhau?","to lớn – khổng lồ","cao – thấp","sáng – tối","ngọt – đắng"],
 [2,"Cặp từ nào có nghĩa trái ngược nhau?","đoàn kết – chia rẽ","hiền – lành","xinh – đẹp","nhanh – lẹ"],
 [2,"Từ nào KHÔNG cùng nghĩa với các từ còn lại: thông minh, sáng dạ, nhanh trí, chậm chạp?","chậm chạp","thông minh","sáng dạ","nhanh trí"],
 [3,"Điền từ trái nghĩa: “Lên thác xuống …”","ghềnh","sông","biển","núi"],
 [3,"Điền từ trái nghĩa: “Kính già, yêu …”","trẻ","em","nhỏ","bé"],
 ["i",2,"Viết từ trái nghĩa với “thật thà”:","dối trá|gian dối|giả dối|lừa dối"]]},
{n:"Biện pháp so sánh",b:[
 [1,"Câu nào có hình ảnh so sánh?","Mặt trăng tròn như quả bóng.","Mặt trăng rất sáng.","Đêm nay có trăng.","Em ngắm trăng."],
 [1,"Trong câu “Trẻ em như búp trên cành.”, trẻ em được so sánh với gì?","búp trên cành","cành cây","lá non","hoa"],
 [2,"Từ dùng để so sánh trong câu “Tiếng suối trong như tiếng hát xa.” là:","như","trong","tiếng","xa"],
 [2,"Câu “Bạn Lan cao hơn bạn Hà.” so sánh theo kiểu nào?","hơn kém","ngang bằng","không so sánh","so sánh âm thanh"],
 [2,"Điền từ để có câu so sánh: Mắt bé tròn xoe như …","hai hòn bi","quyển sách","cái bàn","con đường"],
 [3,"Câu nào so sánh âm thanh với âm thanh?","Tiếng mưa rơi như tiếng ai gõ cửa.","Mưa rơi trắng xóa.","Hạt mưa như hạt ngọc.","Trời mưa to quá."],
 [3,"Hình ảnh so sánh “Ông trăng tròn như cái mâm” giúp ta thấy trăng thế nào?","tròn và to","nhỏ và xa","mờ và tối","méo và lệch"]]},
{n:"Câu kể, câu hỏi, câu cảm, câu khiến",b:[
 [1,"Câu “Em hãy đóng cửa sổ lại.” là kiểu câu gì?","câu khiến","câu kể","câu hỏi","câu cảm"],
 [1,"Câu “Ôi, cánh đồng lúa đẹp quá!” là kiểu câu gì?","câu cảm","câu kể","câu hỏi","câu khiến"],
 [1,"Câu “Bạn đã làm bài tập chưa?” là kiểu câu gì?","câu hỏi","câu kể","câu cảm","câu khiến"],
 [2,"Câu khiến thường có những từ nào?","hãy, đừng, chớ","ôi, chao, quá","ai, gì, đâu","và, với, cùng"],
 [2,"Câu cảm thường kết thúc bằng dấu gì?","dấu chấm than","dấu chấm","dấu chấm hỏi","dấu hai chấm"],
 [2,"Câu nào là câu kể?","Sáng nay em đi học sớm.","Bạn đi học lúc mấy giờ?","Đi học sớm nhé!","Ôi, sớm quá!"],
 [3,"Chuyển câu “Bạn Nam đọc sách.” thành câu khiến:","Bạn Nam hãy đọc sách đi!","Bạn Nam đọc sách à?","Ôi, bạn Nam đọc sách!","Bạn Nam đã đọc sách."],
 ["o",3,"Xếp các thẻ thành câu hỏi:","Ai/là người/vẽ bức tranh/này?"]]},
{n:"Dấu hai chấm, dấu ngoặc kép, dấu gạch ngang",b:[
 [1,"Dấu hai chấm dùng để làm gì?","báo hiệu phần liệt kê hoặc lời nói","kết thúc câu","ngăn cách các vế câu","bày tỏ cảm xúc"],
 [1,"Dấu ngoặc kép thường dùng để:","đánh dấu lời nói trực tiếp","kết thúc câu hỏi","liệt kê sự vật","nối hai từ"],
 [2,"Câu nào dùng đúng dấu hai chấm?","Vườn nhà em có: cam, bưởi, ổi.","Vườn: nhà em có cam.","Vườn nhà: em có cam.","Vườn nhà em: có cam."],
 [2,"Dấu gạch ngang đặt ở đầu dòng để làm gì?","đánh dấu lời nói của nhân vật","kết thúc đoạn văn","đánh dấu tên riêng","thay cho dấu phẩy"],
 [3,"Câu nào dùng dấu ngoặc kép đúng?","Bé nói: “Con chào mẹ ạ!”","Bé “nói”: Con chào mẹ ạ!","“Bé nói: Con chào mẹ ạ!”","Bé nói “:” Con chào mẹ ạ!"]]},
{n:"Chính tả và viết hoa tên riêng",b:[
 [1,"Tên riêng nào viết đúng?","Hà Nội","hà Nội","Hà nội","hà nội"],
 [1,"Tên người nào viết đúng?","Nguyễn Văn An","nguyễn văn an","Nguyễn văn An","Nguyễn Văn an"],
 [2,"Từ nào viết đúng chính tả?","con sư tử","con xư tử","con sư tữ","con xư tữ"],
 [2,"Từ nào viết đúng chính tả?","sạch sẽ","sạch sẻ","sạch xẽ","xạch sẽ"],
 [2,"Tên địa danh nào viết đúng?","sông Hồng","Sông hồng","sông hồng","SÔNG hồng"],
 [3,"Câu nào viết hoa đúng?","Em đi thăm thành phố Hồ Chí Minh.","em đi thăm thành phố Hồ Chí Minh.","Em đi thăm Thành Phố hồ chí minh.","Em đi thăm thành phố hồ Chí Minh."],
 ["i",1,"Điền tr hoặc ch: …ăm chỉ","ch","=Chăm chỉ."],
 ["i",2,"Từ “suy nghi” còn thiếu dấu thanh. Viết lại chữ “nghi” với dấu đúng:","nghĩ","=Suy nghĩ."]]},
{n:"Đọc hiểu, thành ngữ, tục ngữ",p:{
 A:"Ông nội em năm nay đã bảy mươi tuổi nhưng vẫn rất khỏe. Sáng nào ông cũng dậy sớm tập thể dục rồi tưới cây trong vườn. Ông thường kể cho em nghe chuyện ngày xưa ông đi bộ đội. Em rất yêu và tự hào về ông.",
 B:"Đàn kiến nhỏ xếp hàng dài, chăm chỉ tha từng hạt gạo về tổ. Gặp hạt to, cả đàn cùng nhau khiêng. Nhờ đoàn kết, chẳng mấy chốc đàn kiến đã có một kho lương thực cho mùa mưa."},b:[
 [1,"@A","Ông nội của bạn nhỏ năm nay bao nhiêu tuổi?","bảy mươi tuổi","sáu mươi tuổi","tám mươi tuổi","năm mươi tuổi"],
 [2,"@A","Sáng nào ông cũng làm gì?","tập thể dục và tưới cây","đi chợ và nấu cơm","đọc báo và uống trà","đưa em đi học"],
 [3,"@A","Câu nào nói lên tình cảm của bạn nhỏ với ông?","Em rất yêu và tự hào về ông.","Ông vẫn rất khỏe.","Ông thường kể chuyện.","Ông tưới cây trong vườn."],
 [1,"@B","Đàn kiến tha gì về tổ?","hạt gạo","lá cây","quả chín","mẩu bánh"],
 [2,"@B","Gặp hạt to, đàn kiến làm thế nào?","cả đàn cùng nhau khiêng","bỏ lại hạt đó","gọi đàn khác đến","chia nhỏ hạt ra"],
 [3,"@B","Câu tục ngữ nào hợp với câu chuyện về đàn kiến?","Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.","Ăn quả nhớ kẻ trồng cây.","Uống nước nhớ nguồn.","Thương người như thể thương thân."],
 [2,"Điền tiếp: “Lá lành đùm lá …”","rách","xanh","vàng","khô"],
 [2,"Điền tiếp: “Anh em như thể tay …”","chân","mắt","tai","vai"]]}]});
}
/* Bổ sung câu Tiếng Việt lớp 3 */
BV.G[3].tv[0].b.push([1,"Từ có nghĩa giống “bao la” là:","mênh mông","nhỏ bé","chật hẹp","thấp thoáng"]);
BV.G[3].tv[1].b.push([1,"Câu nào có hình ảnh so sánh?","Những ngôi sao như những ngọn đèn nhỏ.","Trời đầy sao.","Sao sáng lấp lánh.","Em đếm sao."],[2,"Trong câu “Cánh diều như con chim bay lượn.”, cánh diều được so sánh với gì?","con chim","bầu trời","cơn gió","đám mây"],[3,"Câu “Bà như quả ngọt chín rồi” so sánh người với gì?","sự vật","âm thanh","con vật","hoạt động"]);
BV.G[3].tv[2].b.push([2,"Câu “Đừng nói chuyện trong giờ học!” là kiểu câu gì?","câu khiến","câu kể","câu cảm","câu hỏi"],[3,"Câu nào là câu cảm?","Chà, bông hoa này thơm quá!","Bông hoa này rất thơm.","Bông hoa này có thơm không?","Hãy ngửi bông hoa này."]);
BV.G[3].tv[3].b.push([1,"Câu nào cần dùng dấu hai chấm?","Mẹ dặn □ “Con nhớ học bài nhé!”","Mẹ □ đi chợ.","Em □ học bài.","Hôm nay □ trời đẹp."],[2,"Dấu ngoặc kép trong câu: Bạn Nam được gọi là “nhà thơ nhí” của lớp. dùng để:","đánh dấu từ ngữ được dùng với ý nghĩa đặc biệt","đánh dấu lời nói trực tiếp","liệt kê","kết thúc câu"],[2,"Đoạn hội thoại, mỗi lời nói của nhân vật thường bắt đầu bằng:","dấu gạch ngang","dấu phẩy","dấu chấm","dấu chấm than"],[3,"Câu nào dùng đúng dấu hai chấm để liệt kê?","Lớp em trồng ba loại cây: cam, chuối, bưởi.","Lớp em: trồng ba loại cây cam chuối bưởi.","Lớp em trồng: ba loại cây, cam chuối bưởi.","Lớp em trồng ba: loại cây cam, chuối, bưởi."],[1,"Dấu gạch ngang có thể dùng để:","đánh dấu lời nói của nhân vật","kết thúc câu kể","bày tỏ cảm xúc","đặt cuối câu hỏi"]);
BV.G[3].tv[4].b.push([1,"Từ nào viết đúng chính tả?","xinh xắn","sinh sắn","xinh sắn","sinh xắn"],[3,"Tên riêng nào viết đúng?","Vịnh Hạ Long","vịnh hạ long","Vịnh hạ Long","vịnh Hạ long"]);
BV.G[3].tv[5].b.push([1,"Điền tiếp: “Có công mài sắt, có ngày nên …”","kim","dao","búa","sắt"],[3,"Câu tục ngữ “Ăn quả nhớ kẻ trồng cây” khuyên ta điều gì?","biết ơn người đã giúp mình","chăm chỉ trồng cây","ăn nhiều hoa quả","giữ gìn cây xanh"]);
