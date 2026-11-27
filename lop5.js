/* Lớp 5 – theo mạch bài Toán 5 và Tiếng Việt 5 (Kết nối tri thức với cuộc sống). */
{const{R,pick,shuffle,f,num,mc,inp,cmp,name,gcd,rd}=BV.H;
const fr=(a,b)=>`${a}/${b}`;
const pc=x=>f(rd(x))+"%";
BV.grade(5,{
toan:[
{n:"Phân số thập phân, hỗn số, số thập phân",g:[
 ()=>{const k=R(0,2);if(k===0){const d=pick([10,100,1000]),n=R(1,d-1);return num(`Phân số ${fr(n,d)} viết thành số thập phân là:`,rd(n/d),{noIn:true})}if(k===1){const a=R(1,99),b=R(1,99);const x=rd(a+b/100);return num(`Số thập phân gồm ${a} đơn vị và ${b} phần trăm là:`,x,{noIn:true})}const x=rd(R(1,99)+R(1,999)/1000);return num(`Phần nguyên của số ${f(x)} là:`,Math.floor(x))},
 ()=>{const k=R(0,2);if(k===0){const a=rd(R(10,999)/100);let b=rd(a+pick([-.1,.01,-.01,.1,0,.09]));return cmp(`Điền dấu thích hợp: ${f(a)} … ${f(b)}`,a,b)}if(k===1){const w=R(1,5),d=R(2,9),n=R(1,d-1);return mc(`Chuyển hỗn số ${w} ${fr(n,d)} thành phân số:`,fr(w*d+n,d),[fr(w+n,d),fr(w*n+d,d),fr(w*d+n,n)],{ex:`(${w} × ${d} + ${n}) / ${d} = ${fr(w*d+n,d)}`})}const m=R(1,9),c=R(1,9);return num(`${m} m ${c} cm = … m`,rd(m+c/100),{ex:`${c} cm = ${f(c/100)} m`})},
 ()=>{if(Math.random()<.5){const xs=[];while(xs.length<4){const v=rd(R(100,999)/100);if(!xs.includes(v))xs.push(v)}const a=Math.max(...xs);return mc(`Số lớn nhất trong các số ${xs.map(f).join("; ")} là:`,f(a),xs.filter(x=>x!==a).map(f))}const t=R(2,9),k=R(1,999);return num(`${t} tấn ${k} kg = … tấn`,rd(t+k/1000),{ex:`${k} kg = ${f(k/1000)} tấn`})}]},
{n:"Cộng, trừ, nhân, chia số thập phân",g:[
 ()=>{const a=rd(R(10,999)/10),b=rd(R(10,999)/100);return Math.random()<.5?num(`${f(a)} + ${f(b)} = ?`,rd(a+b)):num(`${f(rd(a+b))} − ${f(b)} = ?`,a)},
 ()=>{const k=R(0,2),a=rd(R(11,999)/100);if(k===0){const m=pick([10,100,1000]);return num(`${f(a)} × ${m} = ?`,rd(a*m),{ex:`Nhân với ${m}: dời dấu phẩy sang phải ${String(m).length-1} chữ số`})}if(k===1){const m=pick([0.1,0.01]);return num(`${f(a)} × ${f(m)} = ?`,rd(a*m),{ex:`Nhân với ${f(m)}: dời dấu phẩy sang trái ${m===0.1?1:2} chữ số`})}const n=R(2,9);return num(`${f(a)} × ${n} = ?`,rd(a*n))},
 ()=>{if(Math.random()<.5){const b=R(2,9),q=rd(R(11,999)/100);return num(`${f(rd(b*q))} : ${b} = ?`,q)}const p=rd(R(15,45)*1000),kg=rd(R(12,35)/10);return num(`Một ki-lô-gam táo giá ${f(p)} đồng. Mua ${f(kg)} kg táo hết bao nhiêu đồng?`,rd(p*kg),{ex:`${f(p)} × ${f(kg)} = ${f(rd(p*kg))}`})}]},
{n:"Tỉ số, tỉ số phần trăm",g:[
 ()=>{const k=R(0,1);if(k===0){const x=pick([0.25,0.5,0.75,0.4,0.6,0.08,0.35,1.2]);return mc(`Viết ${f(x)} dưới dạng tỉ số phần trăm:`,pc(x*100),[pc(x*10),pc(x),pc(x*1000)])}const a=R(1,9),b=R(2,9);return mc(`Tỉ số của ${a} và ${b} là:`,fr(a,b),[fr(b,a),fr(a,a+b),fr(a+b,b)])},
 ()=>{if(Math.random()<.5){const p=pick([10,20,25,50,15,40]),n=pick([40,60,80,120,200,300]);return num(`Tìm ${p}% của ${n}:`,n*p/100,{ex:`${n} × ${p} : 100 = ${n*p/100}`})}const b=pick([20,25,40,50,80]),p=pick([25,50,75,20,40,60]);const a=b*p/100;return mc(`Tỉ số phần trăm của ${f(a)} và ${b} là:`,pc(p),[pc(p/10),pc(100-p),pc(p*2)],{ex:`${f(a)} : ${b} × 100 = ${p}%`})},
 ()=>{const k=R(0,1);if(k===0){const n=pick([30,40,50]),p=pick([40,60,70,30]);return num(`Lớp 5A có ${n} học sinh, trong đó ${p}% là học sinh nữ. Hỏi lớp có bao nhiêu học sinh nam?`,n-n*p/100,{ex:`Nữ: ${n} × ${p} : 100 = ${n*p/100}; nam: ${n} − ${n*p/100} = ${n-n*p/100}`})}const a=R(1,4),b=R(a+1,6),u=R(5,20);return num(`Tổng hai số là ${(a+b)*u}. Tỉ số của số bé và số lớn là ${fr(a,b)}. Tìm số bé.`,a*u,{ex:`Tổng số phần: ${a} + ${b} = ${a+b}; số bé: ${(a+b)*u} : ${a+b} × ${a} = ${a*u}`})}]},
{n:"Hình tam giác, hình thang, hình tròn",g:[
 ()=>{const b=R(4,16),h=R(3,12)*2;return num("Diện tích hình tam giác là bao nhiêu xăng-ti-mét vuông?",b*h/2,{pic:{k:"tri",b,h,u:"cm"},ex:`${b} × ${h} : 2 = ${b*h/2} (cm²)`})},
 ()=>{if(Math.random()<.5){const a=R(8,16),b=R(3,a-2),h=R(2,8)*2;return num("Diện tích hình thang là bao nhiêu xăng-ti-mét vuông?",(a+b)*h/2,{pic:{k:"trap",a,b,h,u:"cm"},ex:`(${a} + ${b}) × ${h} : 2 = ${(a+b)*h/2} (cm²)`})}const r=R(2,10);return num(`Chu vi hình tròn có bán kính ${r} cm là bao nhiêu xăng-ti-mét?`,rd(r*2*3.14),{pic:{k:"circ",r,u:"cm"},ex:`${r} × 2 × 3,14 = ${f(rd(r*2*3.14))} (cm)`})},
 ()=>{if(Math.random()<.5){const r=R(2,10);return num(`Diện tích hình tròn có bán kính ${r} cm là bao nhiêu xăng-ti-mét vuông?`,rd(r*r*3.14),{ex:`${r} × ${r} × 3,14 = ${f(rd(r*r*3.14))} (cm²)`})}const d=R(2,8)*10,c=rd(d*3.14);return num(`Bánh xe có đường kính ${d} cm. Bánh xe lăn 10 vòng thì đi được bao nhiêu xăng-ti-mét?`,rd(c*10),{ex:`Chu vi: ${d} × 3,14 = ${f(c)} cm; 10 vòng: ${f(rd(c*10))} cm`})}]},
{n:"Thể tích; hình hộp chữ nhật, hình lập phương",g:[
 ()=>{if(Math.random()<.4){const u=pick([["1 dm³","cm³",1000],["1 m³","dm³",1000],["1 dm³","l",1]]);return num(`${u[0]} = … ${u[1]}`,u[2])}const a=R(3,9),b=R(2,6),c=R(2,7);return num("Thể tích hình hộp chữ nhật là bao nhiêu xăng-ti-mét khối?",a*b*c,{pic:{k:"box",a,b,c,u:"cm"},ex:`${a} × ${b} × ${c} = ${a*b*c} (cm³)`})},
 ()=>{if(Math.random()<.5){const a=R(4,9),b=R(2,6),c=R(2,7);return num("Diện tích xung quanh của hình hộp chữ nhật là bao nhiêu xăng-ti-mét vuông?",(a+b)*2*c,{pic:{k:"box",a,b,c,u:"cm"},ex:`Chu vi đáy × chiều cao: (${a} + ${b}) × 2 × ${c} = ${(a+b)*2*c} (cm²)`})}const a=R(2,9);return num(`Hình lập phương có cạnh ${a} cm. Thể tích hình lập phương là bao nhiêu xăng-ti-mét khối?`,a**3,{ex:`${a} × ${a} × ${a} = ${a**3} (cm³)`})},
 ()=>{if(Math.random()<.5){const a=R(2,9);return num(`Diện tích toàn phần của hình lập phương cạnh ${a} cm là bao nhiêu xăng-ti-mét vuông?`,a*a*6,{ex:`${a} × ${a} × 6 = ${a*a*6} (cm²)`})}const a=R(10,20),b=R(5,10),c=R(5,10);return num(`Một bể nước dạng hình hộp chữ nhật có kích thước trong lòng bể: dài ${a} dm, rộng ${b} dm, cao ${c} dm. Bể chứa đầy được bao nhiêu lít nước?`,a*b*c,{ex:`${a} × ${b} × ${c} = ${a*b*c} dm³ = ${a*b*c} l`})}]},
{n:"Số đo thời gian; vận tốc, quãng đường, thời gian",g:[
 ()=>{const k=R(0,1);if(k===0){const h=R(1,4),m=R(5,55);return num(`${h} giờ ${m} phút = … phút`,h*60+m)}const x=pick([1.5,2.5,0.5,1.25,0.75,3.5]);return num(`${f(x)} giờ = … phút`,x*60)},
 ()=>{const v=R(3,12)*5,t=R(2,5);return Math.random()<.5?num(`Một ô tô đi quãng đường ${v*t} km trong ${t} giờ. Vận tốc của ô tô là bao nhiêu ki-lô-mét/giờ?`,v,{ex:`v = s : t = ${v*t} : ${t} = ${v} (km/giờ)`}):num(`Một xe máy đi với vận tốc ${v} km/giờ trong ${t} giờ. Xe máy đi được bao nhiêu ki-lô-mét?`,v*t,{ex:`s = v × t = ${v} × ${t} = ${v*t} (km)`})},
 ()=>{if(Math.random()<.5){const v1=R(30,50),v2=R(30,50),t=R(2,4);return num(`Hai xe ô tô khởi hành cùng lúc từ hai thành phố cách nhau ${(v1+v2)*t} km, đi ngược chiều nhau. Xe thứ nhất đi ${v1} km/giờ, xe thứ hai đi ${v2} km/giờ. Sau bao nhiêu giờ hai xe gặp nhau?`,t,{ex:`Tổng vận tốc: ${v1+v2} km/giờ; ${(v1+v2)*t} : ${v1+v2} = ${t} (giờ)`})}const v=pick([4,5,12,15]),t=pick([1.5,2.5,0.5]);return num(`Một người đi quãng đường ${f(v*t)} km với vận tốc ${v} km/giờ. Người đó đi hết bao nhiêu phút?`,t*60,{ex:`t = ${f(v*t)} : ${v} = ${f(t)} giờ = ${t*60} phút`})}]}],
tv:[
{n:"Từ đồng nghĩa, từ đa nghĩa",b:[
 [1,"Từ nào đồng nghĩa với “Tổ quốc”?","đất nước","quê hương","làng xóm","thành phố"],
 [1,"Từ nào đồng nghĩa với “hạnh phúc”?","sung sướng","buồn bã","khó khăn","vất vả"],
 [2,"Nhóm từ nào gồm các từ đồng nghĩa?","xanh biếc, xanh thẳm, xanh ngắt","xanh, đỏ, tím","cao, thấp, dài","ăn, uống, ngủ"],
 [2,"Trong câu nào từ “chạy” được dùng với nghĩa gốc?","Em chạy thi trên sân trường.","Đồng hồ chạy rất đúng.","Nhà em chạy ăn từng bữa.","Con đường chạy qua làng."],
 [2,"Từ “chân” trong “chân bàn” được dùng với nghĩa nào?","nghĩa chuyển","nghĩa gốc","nghĩa trái ngược","không có nghĩa"],
 [3,"Từ “mắt” trong câu nào là nghĩa chuyển?","Quả na mở mắt.","Em bé có đôi mắt to.","Mắt bà đã mờ.","Bạn Lan nhắm mắt lại."],
 [3,"Chọn từ thích hợp nhất: “Ánh trăng … chiếu xuống mặt hồ.”","dịu dàng","dữ dội","ồn ào","mạnh mẽ"]]},
{n:"Đại từ, kết từ",b:[
 [1,"Từ nào là đại từ xưng hô?","chúng tôi","học sinh","trường học","và"],
 [1,"Từ nào là kết từ?","nhưng","bàn","chạy","đẹp"],
 [2,"Đại từ trong câu “Nam rất chăm, bạn ấy luôn làm bài đầy đủ.” dùng để thay cho:","Nam","bài","làm bài","rất chăm"],
 [2,"Kết từ trong câu “Trời mưa nên đường rất trơn.” là:","nên","trời","đường","rất"],
 [2,"Cặp kết từ nào chỉ nguyên nhân – kết quả?","Vì … nên …","Tuy … nhưng …","Nếu … thì …","Không những … mà còn …"],
 [3,"Điền cặp kết từ: “… trời mưa to … chúng em vẫn đi học đúng giờ.”","Tuy … nhưng","Vì … nên","Nếu … thì","Hễ … thì"],
 [3,"Đại từ “nó” trong câu “Con mèo nhà em rất lười, nó chỉ thích nằm sưởi nắng.” thay thế cho từ nào?","con mèo","nhà em","nắng","em"]]},
{n:"Câu ghép và cách nối các vế câu ghép",b:[
 [1,"Câu nào là câu ghép?","Mặt trời mọc, sương tan dần.","Mặt trời mọc từ phía đông.","Sáng nay trời rất đẹp.","Những tia nắng chiếu xuống."],
 [2,"Các vế trong câu “Vì trời mưa to nên trận đấu bị hoãn.” được nối bằng:","cặp kết từ","dấu phẩy","dấu chấm phẩy","không có từ nối"],
 [2,"Câu ghép “Gió thổi mạnh, cây cối nghiêng ngả.” có mấy vế?","2","1","3","4"],
 [2,"Quan hệ giữa các vế trong câu “Nếu em chăm học thì em sẽ tiến bộ.” là:","điều kiện – kết quả","tương phản","nguyên nhân – kết quả","tăng tiến"],
 [3,"Điền cặp từ thích hợp: “Lan … học giỏi … còn hát rất hay.”","không những … mà","vì … nên","tuy … nhưng","nếu … thì"],
 [3,"Câu nào là câu ghép có quan hệ tương phản?","Tuy nhà xa nhưng Hoa chưa bao giờ đi học muộn.","Vì nhà xa nên Hoa đi học sớm.","Nếu nhà gần thì Hoa đi bộ.","Hoa đi học sớm."],
 ["o",3,"Xếp các thẻ thành câu ghép đúng:","Vì trời mưa to/nên/con đường/ngập nước"]]},
{n:"Liên kết câu; dấu gạch ngang",b:[
 [1,"“Bé Mai rất ngoan. Mai luôn giúp mẹ việc nhà.” Hai câu liên kết bằng cách nào?","lặp từ ngữ","thay thế từ ngữ","dùng từ ngữ nối","không liên kết"],
 [2,"“Hà Nội là thủ đô của nước ta. Thành phố này có nhiều di tích lịch sử.” Từ “thành phố này” thay thế cho:","Hà Nội","thủ đô","nước ta","di tích"],
 [2,"Từ ngữ nối nào dùng để liên kết hai câu chỉ sự đối lập?","Tuy nhiên","Vì vậy","Sau đó","Ngoài ra"],
 [2,"Dấu gạch ngang trong câu “Lớp trưởng – bạn Minh – rất gương mẫu.” dùng để:","đánh dấu bộ phận chú thích","đánh dấu lời nói","nối các từ trong liên danh","liệt kê"],
 [3,"Chọn từ ngữ nối thích hợp: “Bạn Hùng ốm mấy ngày. … bạn vẫn tự học bài ở nhà.”","Tuy vậy,","Vì thế,","Trước hết,","Cuối cùng,"]]},
{n:"Điệp từ, điệp ngữ; thành ngữ, tục ngữ",b:[
 [1,"Câu thơ nào có điệp từ?","Nhớ sao lớp học i tờ / Nhớ sao tiếng mõ rừng chiều","Trăng sáng soi đường đi","Lá vàng rơi trong gió","Chim hót líu lo"],
 [2,"Tác dụng của điệp từ, điệp ngữ là:","nhấn mạnh ý, tạo nhịp điệu","kết thúc câu","giải thích nghĩa của từ","nối các vế câu"],
 [2,"Thành ngữ nào nói về tinh thần đoàn kết?","Chung lưng đấu cật","Chân cứng đá mềm","Đầu voi đuôi chuột","Ăn cháo đá bát"],
 [2,"Thành ngữ “Muôn người như một” có nghĩa là:","mọi người đồng lòng, thống nhất","có rất nhiều người","chỉ có một người","mỗi người một ý"],
 [3,"Câu tục ngữ “Tốt gỗ hơn tốt nước sơn” khuyên ta:","coi trọng phẩm chất bên trong hơn vẻ bề ngoài","nên sơn đồ gỗ cho đẹp","chọn gỗ tốt để làm nhà","không nên dùng sơn"],
 [3,"Điền tiếp: “Thương người như thể …”","thương thân","thương em","thương nhà","thương mình"]]},
{n:"Đọc hiểu văn bản",p:{
 A:"Mùa thu, cánh đồng quê em vàng óng màu lúa chín. Gió nhẹ thổi, những bông lúa trĩu hạt nghiêng mình như chào đón người nông dân ra đồng. Từ sáng sớm, các bác đã í ới gọi nhau đi gặt. Tiếng cười nói rộn ràng cả một vùng quê. Nhìn những gánh lúa nặng trĩu, em hiểu rằng mỗi hạt gạo là kết tinh của bao giọt mồ hôi.",
 B:"Ngày đầu tiên đến lớp, Hoà rụt rè ngồi ở góc bàn. Thấy vậy, Minh tiến lại, cười thân thiện: “Mình ngồi cạnh bạn được không?”. Rồi Minh chỉ cho Hoà thư viện, sân bóng và giới thiệu các bạn trong lớp. Chỉ sau một tuần, Hoà đã hoà nhập và trở thành bạn thân của Minh."},b:[
 [1,"@A","Cánh đồng quê vào mùa thu có màu gì?","vàng óng","xanh mướt","đỏ rực","trắng xóa"],
 [2,"@A","Hình ảnh “bông lúa trĩu hạt nghiêng mình như chào đón” dùng biện pháp nghệ thuật nào?","nhân hoá và so sánh","điệp từ","liệt kê","đảo ngữ"],
 [3,"@A","Câu cuối đoạn văn muốn nhắn nhủ điều gì?","trân trọng công sức lao động của người nông dân","lúa mùa thu rất đẹp","cần ra đồng từ sớm","phải ăn nhiều cơm"],
 [1,"@B","Ngày đầu đến lớp, Hoà như thế nào?","rụt rè","vui vẻ","nghịch ngợm","tự tin"],
 [2,"@B","Minh đã làm gì để giúp Hoà?","ngồi cạnh, giới thiệu trường lớp và các bạn","tặng Hoà quyển sách","kể chuyện cho cô giáo","rủ Hoà đi chơi xa"],
 [3,"@B","Câu chuyện ca ngợi phẩm chất nào của Minh?","thân thiện, biết quan tâm bạn bè","học giỏi","khỏe mạnh","đá bóng giỏi"],
 ["i",3,"@B","Tìm trong đoạn văn từ tả nụ cười của Minh:","thân thiện"]]}]});
}
/* Bổ sung câu Tiếng Việt lớp 5 */
BV.G[5].tv[0].b.push([1,"Từ nào đồng nghĩa với “siêng năng”?","cần cù","lười biếng","nhút nhát","kiêu ngạo"],[2,"Từ “ăn” trong câu nào được dùng với nghĩa gốc?","Cả nhà đang ăn cơm.","Tàu ăn hàng ở cảng.","Da bé ăn nắng.","Hồ dán không ăn giấy."],[3,"Từ nào thay được cho từ “to lớn” trong câu “Đó là một công trình to lớn.”?","đồ sộ","bé nhỏ","xinh xắn","mỏng manh"]);
BV.G[5].tv[1].b.push([1,"Đại từ nào dùng để hỏi?","ai","tôi","và","rất"],[2,"Kết từ “của” trong câu “Quyển sách của Lan rất đẹp.” chỉ quan hệ gì?","sở hữu","nguyên nhân","tương phản","điều kiện"],[3,"Câu nào dùng đại từ để tránh lặp từ?","Hoa rất chăm học. Bạn ấy luôn đạt điểm cao.","Hoa rất chăm học. Hoa luôn đạt điểm cao.","Hoa chăm học và điểm cao.","Hoa luôn đạt điểm cao."]);
BV.G[5].tv[2].b.push([1,"Câu ghép là câu:","do nhiều vế câu ghép lại, mỗi vế có cấu tạo giống một câu đơn","chỉ có một chủ ngữ và một vị ngữ","có trạng ngữ đứng đầu","kết thúc bằng dấu chấm than"],[2,"Câu “Trời càng mưa to, đường càng ngập.” thể hiện quan hệ gì giữa các vế?","tăng tiến","tương phản","điều kiện","lựa chọn"],[1,"Câu nào là câu đơn?","Chim hót líu lo trên cành.","Chim hót, hoa nở.","Mưa tạnh, cầu vồng hiện ra.","Tuy trời rét nhưng em vẫn dậy sớm."]);
BV.G[5].tv[3].b.push([1,"Từ ngữ nối nào thường dùng để liên kết câu chỉ kết quả?","Vì vậy","Tuy nhiên","Nhưng","Mặc dù"],[2,"“Con đường làng em rất đẹp. Hai bên đường trồng nhiều hoa.” Từ được lặp lại để liên kết là:","đường","làng","hoa","đẹp"],[3,"“Lan rất thích đọc sách. … bạn thường đến thư viện vào giờ ra chơi.” Chọn từ nối phù hợp:","Vì vậy,","Tuy vậy,","Trái lại,","Nhưng"],[1,"Dấu gạch ngang có thể dùng để:","đánh dấu các ý liệt kê","kết thúc câu","đặt sau tên người","thay cho dấu chấm hỏi"],[3,"Đoạn văn dùng cách nào để liên kết câu: “Nam đá bóng rất giỏi. Cậu là cầu thủ chính của đội.”?","thay thế từ ngữ","lặp từ ngữ","dùng từ ngữ nối","không liên kết"]);
BV.G[5].tv[4].b.push([1,"Thành ngữ nào nói về lòng biết ơn?","Uống nước nhớ nguồn","Nước đổ lá khoai","Đầu voi đuôi chuột","Nói một đằng làm một nẻo"],[2,"Từ nào được lặp lại (điệp từ) trong câu “Học, học nữa, học mãi.”?","học","nữa","mãi","học nữa"],[1,"Thành ngữ “Chịu thương chịu khó” nói về phẩm chất nào?","cần cù, chăm chỉ","dũng cảm","thông minh","trung thực"],[3,"Câu thơ “Việt Nam đất nước ta ơi / Mênh mông biển lúa đâu trời đẹp hơn” dùng hình ảnh “biển lúa” để:","gợi cánh đồng lúa rộng lớn","tả biển cả","so sánh lúa với cá","kể về nghề chài lưới"]);
BV.G[5].tv[5].b.push([2,"@A","Từ ngữ nào cho thấy không khí ngày gặt rộn ràng?","í ới gọi nhau, tiếng cười nói","vàng óng, trĩu hạt","gió nhẹ thổi","gánh lúa nặng trĩu"],[1,"@B","Minh nói gì khi tiến lại gần Hoà?","Mình ngồi cạnh bạn được không?","Bạn tên là gì?","Đi chơi với mình nhé!","Bạn học lớp nào?"],[2,"@B","Sau bao lâu Hoà đã hoà nhập với lớp?","một tuần","một ngày","một tháng","một năm"]);
