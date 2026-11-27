/* Lớp 4 – theo mạch bài Toán 4 và Tiếng Việt 4 (Kết nối tri thức với cuộc sống). */
{const{R,pick,shuffle,f,num,mc,inp,cmp,name,gcd}=BV.H;
const HANG=["đơn vị","chục","trăm","nghìn","chục nghìn","trăm nghìn","triệu","chục triệu","trăm triệu"];
const fr=(a,b)=>`${a}/${b}`;
const red=(a,b)=>{const g=gcd(a,b);return[a/g,b/g]};
BV.grade(4,{
toan:[
{n:"Số có nhiều chữ số, lớp triệu",g:[
 ()=>{const ds=[R(1,9),...[...Array(6)].map(()=>R(0,9))],pos=R(0,6),i=6-pos,oth=ds.filter((_,k)=>k!==i),av=[0,1,2,3,4,5,6,7,8,9].filter(x=>!oth.includes(x)&&(i>0||x>0));ds[i]=pick(av);const d=ds[i],n=+ds.join("");return mc(`Chữ số ${d} trong số ${f(n)} thuộc hàng nào?`,"hàng "+HANG[pos],shuffle(HANG.slice(0,7).filter((_,k)=>k!==pos)).slice(0,3).map(x=>"hàng "+x))},
 ()=>{if(Math.random()<.5){const a=R(1e6,9e6);let b=R(1e6,9e6);return cmp(`Điền dấu thích hợp: ${f(a)} … ${f(b)}`,a,b)}const t=R(1,9),h=R(1,9),k=R(1,9);return num(`Số gồm ${t} triệu, ${h} trăm nghìn và ${k} nghìn là:`,t*1e6+h*1e5+k*1e3,{noIn:true})},
 ()=>{if(Math.random()<.5){const n=R(1e6,9.9e6),v=Math.round(n/1e5)*1e5;return num(`Làm tròn số ${f(n)} đến hàng trăm nghìn ta được:`,v,{ex:"Xét chữ số hàng chục nghìn: từ 5 trở lên thì làm tròn lên, nhỏ hơn 5 thì làm tròn xuống."})}
  const ds=shuffle([0,...shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4)]);const s=[...ds].sort((a,b)=>a-b),mn=s[0]===0?[s[1],0,...s.slice(2)]:s;return num(`Dùng cả năm chữ số ${ds.join(", ")}, viết được số bé nhất có năm chữ số là:`,+mn.join(""),{ex:"Chữ số 0 không đứng đầu, nên đặt chữ số nhỏ nhất khác 0 lên đầu rồi xếp các chữ số còn lại từ bé đến lớn."})}]},
{n:"Góc, đường thẳng vuông góc, song song, hình bình hành, hình thoi",g:[
 ()=>{const t=pick([["góc nhọn",R(25,70)],["góc vuông",90],["góc tù",R(110,160)],["góc bẹt",180]]);return mc("Đây là góc gì?",t[0],["góc nhọn","góc vuông","góc tù","góc bẹt"],{pic:{k:"angle",d:t[1]}})},
 ()=>{const k=R(0,2);if(k===0)return mc("Góc vuông có số đo bằng bao nhiêu?","90°",["45°","180°","60°"]);if(k===1)return mc("Hình nào có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau?","hình thoi",["hình bình hành","hình thang","hình tam giác"]);return mc("Góc bẹt bằng mấy góc vuông?","2 góc vuông",["1 góc vuông","3 góc vuông","4 góc vuông"])},
 ()=>{const t=pick([[3,"góc vuông"],[9,"góc vuông"],[6,"góc bẹt"],[2,"góc nhọn"],[1,"góc nhọn"],[5,"góc tù"],[4,"góc tù"]]);return mc(`Lúc ${t[0]} giờ đúng, kim giờ và kim phút tạo thành góc gì?`,t[1],["góc nhọn","góc vuông","góc tù","góc bẹt"],{pic:{k:"clock",h:t[0],m:0},ex:"Mỗi khoảng giữa hai số liền nhau trên mặt đồng hồ là 30°."})}]},
{n:"Yến, tạ, tấn; giây, thế kỉ; mét vuông",g:[
 ()=>{const u=pick([["1 tấn","kg",1000],["1 tạ","kg",100],["1 yến","kg",10],["1 phút","giây",60],["1 thế kỉ","năm",100],["1 m²","dm²",100],["1 dm²","cm²",100],["1 tấn","tạ",10]]);return num(`${u[0]} = … ${u[1]}`,u[2])},
 ()=>{const k=R(0,2);if(k===0){const a=R(2,9),b=R(1,99);return num(`${a} tạ ${b} kg = … kg`,a*100+b)}if(k===1){const a=R(1,5),b=R(1,59);return num(`${a} phút ${b} giây = … giây`,a*60+b)}const y=pick([1945,1975,2000,2026,1802,1010,1288]);const c=Math.ceil(y/100);const RM=n=>{const t=[[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];let s="";for(const[v,r]of t)while(n>=v){s+=r;n-=v}return s};return mc(`Năm ${y} thuộc thế kỉ nào?`,"thế kỉ "+RM(c),["thế kỉ "+RM(c-1),"thế kỉ "+RM(c+1),"thế kỉ "+RM(c+2)],{ex:`Thế kỉ ${RM(c)} tính từ năm ${(c-1)*100+1} đến năm ${c*100}.`})},
 ()=>{const k=R(0,1);if(k===0){const t=R(2,9),b=pick([50,25,20]);return num(`Một xe tải chở ${t} tấn gạo. Mỗi bao gạo nặng ${b} kg. Hỏi xe chở bao nhiêu bao gạo?`,t*1000/b,{ex:`${t} tấn = ${t*1000} kg; ${t*1000} : ${b} = ${t*1000/b}`})}const a=R(3,9),b=R(2,8);return num(`Một mảnh vườn hình chữ nhật dài ${a} m, rộng ${b} m. Diện tích mảnh vườn là bao nhiêu đề-xi-mét vuông?`,a*b*100,{ex:`${a} × ${b} = ${a*b} m² = ${a*b*100} dm²`})}]},
{n:"Cộng, trừ, nhân, chia số có nhiều chữ số",g:[
 ()=>{const k=R(0,2);if(k===0){const a=R(1e4,5e5),b=R(1e4,4e5);return num(`${f(a)} + ${f(b)} = ?`,a+b)}if(k===1){const a=R(2e5,9e5),b=R(1e4,a-1e4);return num(`${f(a)} − ${f(b)} = ?`,a-b)}const a=R(12,999),m=pick([10,100,1000]);return num(`${a} × ${m} = ?`,a*m)},
 ()=>{const k=R(0,2);if(k===0){const a=R(12,99),b=R(12,99);return num(`${a} × ${b} = ?`,a*b)}if(k===1){const b=R(3,9),q=R(1000,9999);return num(`${f(b*q)} : ${b} = ?`,q)}const a=pick([25,50,125]),m={25:4,50:2,125:8}[a],c=R(3,19);return num(`Tính nhanh: ${a} × ${c} × ${m}`,a*c*m,{ex:`${a} × ${m} = ${a*m}; ${a*m} × ${c} = ${a*m*c}`})},
 ()=>{const k=R(0,1);if(k===0){const b=R(12,45),q=R(12,99);return num(`${f(b*q)} : ${b} = ?`,q,{ex:`${q} × ${b} = ${b*q}`})}const a=R(12,99),b=R(11,49),c=R(11,49);return num(`Tính bằng cách thuận tiện: ${a} × ${b} + ${a} × ${c}`,a*(b+c),{ex:`${a} × (${b} + ${c}) = ${a} × ${b+c} = ${a*(b+c)}`})}]},
{n:"Trung bình cộng; tìm hai số khi biết tổng và hiệu",g:[
 ()=>{const n=R(3,4),avg=R(10,90),xs=[...Array(n-1)].map(()=>avg+R(-9,9));xs.push(avg*n-xs.reduce((a,b)=>a+b,0));return num(`Trung bình cộng của các số ${xs.join("; ")} là:`,avg,{ex:`(${xs.join(" + ")}) : ${n} = ${avg}`})},
 ()=>{const b=R(10,60),d=R(2,30)*2,a=b+d;return Math.random()<.5?num(`Tổng hai số là ${a+b}, hiệu hai số là ${d}. Số lớn là:`,a,{ex:`Số lớn = (${a+b} + ${d}) : 2 = ${a}`}):num(`Tổng hai số là ${a+b}, hiệu hai số là ${d}. Số bé là:`,b,{ex:`Số bé = (${a+b} − ${d}) : 2 = ${b}`})},
 ()=>{if(Math.random()<.5){const g=R(10,30),d=R(2,8)*2,t=g*2+d;return num(`Lớp 4A có ${t} học sinh, số bạn nữ nhiều hơn số bạn nam ${d} bạn. Hỏi lớp có bao nhiêu bạn nam?`,g,{ex:`Số bạn nam = (${t} − ${d}) : 2 = ${g}`})}const avg=R(30,60),a=avg+R(-8,8),b=avg+R(-8,8),c=avg*3-a-b;return num(`Ba ngày, cửa hàng bán được ${a} kg, ${b} kg và ${c} kg gạo. Trung bình mỗi ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?`,avg,{ex:`(${a} + ${b} + ${c}) : 3 = ${avg}`})}]},
{n:"Phân số và các phép tính với phân số",g:[
 ()=>{const d=R(2,8),n=R(1,d-1);return mc("Phân số chỉ phần đã tô màu là:",fr(n,d),[fr(d-n,d),fr(d,n),fr(n,d+1)],{pic:{k:"frac",n,d}})},
 ()=>{const k=R(0,1);if(k===0){const b=R(2,9),a=R(1,b-1),[x,y]=red(a,b),m=R(2,5);return mc(`Rút gọn phân số ${fr(x*m,y*m)} được phân số tối giản là:`,fr(x,y),[fr(x,y*m),fr(x*m,y),fr(y,x),fr(x+1,y+1)],{ex:`Chia cả tử và mẫu cho ${m}`})}
  const d=R(3,9);let a=R(1,d-1),b=R(1,d-1);return cmp(`So sánh hai phân số: ${fr(a,d)} … ${fr(b,d)}`,a,b,{ex:"Hai phân số cùng mẫu: tử số nào lớn hơn thì phân số đó lớn hơn."})},
 ()=>{const k=R(0,2);if(k===0){const p=pick([[1,2,1,3],[1,2,1,4],[1,3,1,6],[2,3,1,4],[1,4,1,6],[3,4,1,8]]);const[a,b,c,d]=p;const N=a*d+c*b,D=b*d,[x,y]=red(N,D);return mc(`${fr(a,b)} + ${fr(c,d)} = ?`,fr(x,y),[fr(a+c,b+d),fr(a+c,b*d),fr(x+1,y)],{ex:`Quy đồng mẫu số rồi cộng tử số: ${fr(a*d,D)} + ${fr(c*b,D)} = ${fr(N,D)} = ${fr(x,y)}`})}
  if(k===1){const d=R(3,6),n=R(1,d-1),m=R(2,6);return num(`Tìm ${fr(n,d)} của ${d*m}:`,n*m,{ex:`${d*m} × ${n} : ${d} = ${n*m}`})}const d=R(4,9),a=R(2,d-1),b=R(1,a-1),[x,y]=red(a-b,d);return mc(`${fr(a,d)} − ${fr(b,d)} = ?`,fr(x,y),[fr(a+b,d),fr(a-b,0+d*2),fr(a-b+1,d)].filter(s=>s!==fr(x,y)))}]}],
tv:[
{n:"Danh từ, danh từ chung và danh từ riêng",b:[
 [1,"Từ nào là danh từ?","bàn ghế","chạy nhảy","xinh đẹp","vui vẻ"],
 [1,"Từ nào là danh từ riêng?","Hạ Long","vịnh biển","thành phố","dòng sông"],
 [2,"Danh từ chung trong câu “Bạn Minh đang đọc sách ở thư viện.” là:","sách, thư viện","Minh, đọc","đang, ở","bạn, đọc"],
 [2,"Danh từ nào chỉ hiện tượng tự nhiên?","cơn mưa","cái bút","cô giáo","con mèo"],
 [2,"Từ nào KHÔNG phải danh từ?","thông minh","học sinh","quyển vở","bầu trời"],
 [3,"Từ nào là danh từ chỉ thời gian?","buổi sáng","cơn mưa","cái cây","học sinh"],
 [3,"Danh từ riêng phải viết như thế nào?","viết hoa chữ cái đầu mỗi tiếng","viết thường toàn bộ","viết hoa toàn bộ","chỉ viết hoa chữ đầu câu"]]},
{n:"Động từ, tính từ",b:[
 [1,"Từ nào là động từ?","nhảy dây","cái bàn","đỏ tươi","hiền lành"],
 [1,"Từ nào là tính từ?","chăm chỉ","học bài","quyển sách","đi bộ"],
 [2,"Động từ trong câu “Chú mèo đang rình bắt chuột.” là:","rình, bắt","chú mèo","đang","chuột"],
 [2,"Tính từ trong câu “Bầu trời hôm nay trong xanh và cao vời vợi.” là:","trong xanh, cao vời vợi","bầu trời, hôm nay","hôm nay, và","bầu trời, cao"],
 [2,"Từ nào là động từ chỉ trạng thái?","yêu thương","chạy","viết","nhảy"],
 [3,"Thêm từ nào trước động từ “đọc” để chỉ việc đang diễn ra?","đang","sẽ","đã","rất"],
 [3,"Từ “rất” thường đi kèm với loại từ nào để chỉ mức độ?","tính từ","danh từ","động từ hành động","đại từ"]]},
{n:"Viết tên người, tên địa lí Việt Nam và nước ngoài",b:[
 [1,"Tên người nào viết đúng quy tắc?","Trần Quốc Toản","trần Quốc Toản","Trần quốc Toản","Trần Quốc toản"],
 [1,"Tên địa lí nào viết đúng?","Đà Nẵng","đà Nẵng","Đà nẵng","đà nẵng"],
 [2,"Tên nước ngoài nào viết đúng?","Lu-i Pa-xtơ","lu-i pa-xtơ","Lu-I Pa-Xtơ","Lu i Pa xtơ"],
 [2,"Tên địa lí nước ngoài nào viết đúng (phiên âm Hán Việt)?","Bắc Kinh","bắc Kinh","Bắc kinh","bắc kinh"],
 [3,"Câu nào viết đúng tên riêng?","Ở Mát-xcơ-va có Quảng trường Đỏ.","Ở mát-xcơ-va có quảng trường đỏ.","Ở Mát-Xcơ-Va có quảng trường Đỏ.","Ở Mát xcơ va có Quảng trường đỏ."],
 ["i",2,"Viết lại cho đúng tên tỉnh: “quảng ninh”","Quảng Ninh"]]},
{n:"Chủ ngữ, vị ngữ, trạng ngữ",b:[
 [1,"Chủ ngữ trong câu “Đàn cò trắng bay lượn trên cánh đồng.” là:","Đàn cò trắng","bay lượn","trên cánh đồng","cánh đồng"],
 [1,"Vị ngữ trong câu “Bà em rất hiền.” là:","rất hiền","Bà em","em","hiền"],
 [2,"Trạng ngữ trong câu “Sáng sớm, sương phủ trắng cánh đồng.” chỉ gì?","thời gian","nơi chốn","nguyên nhân","mục đích"],
 [2,"Trạng ngữ trong câu “Vì trời mưa to, chúng em nghỉ tập thể dục.” là:","Vì trời mưa to","chúng em","nghỉ tập thể dục","trời mưa"],
 [2,"Câu nào có trạng ngữ chỉ nơi chốn?","Trong vườn, chim hót líu lo.","Mùa hè, ve kêu râm ran.","Vì chăm học, Lan đạt điểm cao.","Để khỏe mạnh, em tập thể dục."],
 [3,"Thêm trạng ngữ chỉ mục đích cho câu: “…, em chăm chỉ học bài.”","Để đạt kết quả tốt","Sáng nay","Ở nhà","Vì trời mưa"],
 ["o",3,"Xếp các thẻ thành câu có trạng ngữ đứng đầu:","Trên cành cây,/những chú chim/đang hót/líu lo"]]},
{n:"Biện pháp nhân hoá; dấu gạch ngang, dấu ngoặc đơn",b:[
 [1,"Câu nào có biện pháp nhân hoá?","Chị gió vui vẻ chạy khắp cánh đồng.","Gió thổi mạnh.","Trời có gió.","Gió mùa đông bắc tràn về."],
 [2,"Trong câu “Ông mặt trời thức dậy sau rặng tre.”, sự vật được nhân hoá là:","mặt trời","rặng tre","ông","thức dậy"],
 [2,"Cách nhân hoá trong câu “Những chú gà con líu ríu gọi nhau.” là:","dùng từ chỉ người để gọi con vật","so sánh con vật với đồ vật","tả màu sắc con vật","kể số lượng con vật"],
 [2,"Dấu ngoặc đơn trong câu “Hà Nội (thủ đô của Việt Nam) rất đẹp.” dùng để:","đánh dấu phần chú thích","đánh dấu lời nói","liệt kê","kết thúc câu"],
 [3,"Dấu gạch ngang trong câu “Chuyến tàu Hà Nội – Huế khởi hành lúc 7 giờ.” dùng để:","nối các từ chỉ điểm đầu và điểm cuối","đánh dấu lời nói","đánh dấu phần chú thích","liệt kê"],
 [3,"Câu nào dùng biện pháp nhân hoá bằng cách nói với sự vật như nói với người?","Trâu ơi, ta bảo trâu này!","Con trâu đang cày ruộng.","Trâu ăn cỏ ngoài đồng.","Đàn trâu về chuồng."]]},
{n:"Đọc hiểu, thành ngữ, tục ngữ",p:{
 A:"Ngày còn nhỏ, Lương Thế Vinh nổi tiếng thông minh. Một lần chơi đùa, quả bưởi của các bạn rơi xuống hố sâu. Ai cũng loay hoay không lấy lên được. Cậu bé Vinh bảo các bạn đổ nước vào hố. Nước dâng lên, quả bưởi nổi lên theo và các bạn dễ dàng lấy được.",
 B:"Mỗi sáng, chị Gió đi khắp xóm đánh thức muôn loài. Chị lay nhẹ những tàu lá chuối, thì thầm với khóm tre đầu ngõ. Đi qua cánh đồng, chị khẽ vuốt ve những bông lúa đang trĩu hạt."},b:[
 [1,"@A","Quả bưởi rơi xuống đâu?","một cái hố sâu","dòng sông","bụi rậm","giếng nước"],
 [2,"@A","Cậu bé Vinh đã nghĩ ra cách gì?","đổ nước vào hố cho bưởi nổi lên","trèo xuống hố","dùng que khều","gọi người lớn giúp"],
 [3,"@A","Câu chuyện cho thấy cậu bé Vinh là người thế nào?","thông minh, nhanh trí","nghịch ngợm","nhút nhát","chăm làm"],
 [2,"@B","Trong đoạn văn, sự vật nào được nhân hoá?","gió","lá chuối","cánh đồng","bông lúa"],
 [3,"@B","Những từ ngữ nào giúp nhân hoá gió?","chị, đánh thức, thì thầm, vuốt ve","mỗi sáng, xóm","tàu lá chuối, khóm tre","cánh đồng, trĩu hạt"],
 [1,"Câu tục ngữ nào khuyên ta kiên trì?","Có chí thì nên.","Ăn cây nào rào cây ấy.","Gần mực thì đen.","Đứng núi này trông núi nọ."],
 [2,"Thành ngữ “Uống nước nhớ nguồn” khuyên ta điều gì?","biết ơn những người đi trước","phải uống nhiều nước","giữ gìn nguồn nước","đi tìm nguồn sông"],
 [2,"Điền tiếp: “Thất bại là mẹ …”","thành công","chiến thắng","cố gắng","kiên trì"]]}]});
}
/* Bổ sung câu Tiếng Việt lớp 4 */
BV.G[4].tv[0].b.push([1,"Từ nào là danh từ chỉ người?","bác sĩ","bệnh viện","khám bệnh","chu đáo"],[2,"Danh từ riêng trong câu “Bạn Hoa quê ở Huế.” là:","Hoa, Huế","bạn, quê","quê, ở","bạn, Huế"],[2,"Từ nào là danh từ chỉ hiện tượng tự nhiên?","sấm sét","học tập","ngôi nhà","chăm chỉ"]);
BV.G[4].tv[1].b.push([1,"Từ nào là tính từ chỉ màu sắc?","xanh lam","bầu trời","bay lượn","cánh diều"],[2,"Từ nào là động từ?","suy nghĩ","suy luận giỏi","sự suy nghĩ","thông minh"],[3,"Từ nào cùng loại với các từ: đọc, viết, vẽ?","hát","đẹp","bút","nhanh"]);
BV.G[4].tv[2].b.push([1,"Tên người nước ngoài nào viết đúng?","Mô-da","mô-da","Mô-Da","Mô da"],[2,"Tên địa lí nào viết đúng?","Thành phố Hồ Chí Minh","thành phố hồ chí minh","Thành Phố Hồ chí Minh","thành phố Hồ chí minh"],[3,"Câu nào viết đúng tên riêng?","Sông Mê Công chảy qua nhiều nước.","Sông mê công chảy qua nhiều nước.","Sông Mê công chảy qua nhiều nước.","sông mê Công chảy qua nhiều nước."],[2,"Tên cơ quan, tổ chức nào viết đúng?","Trường Tiểu học Kim Đồng","trường tiểu học Kim Đồng","Trường tiểu Học kim đồng","trường Tiểu học kim Đồng"]);
BV.G[4].tv[3].b.push([1,"Chủ ngữ trong câu “Những chú ong chăm chỉ hút mật.” là:","Những chú ong","chăm chỉ","hút mật","mật"],[3,"Trạng ngữ trong câu “Để bảo vệ môi trường, chúng em trồng thêm cây xanh.” chỉ gì?","mục đích","thời gian","nơi chốn","nguyên nhân"],[2,"Vị ngữ trong câu “Mẹ em đang nấu cơm trong bếp.” là:","đang nấu cơm trong bếp","Mẹ em","trong bếp","nấu cơm"]);
BV.G[4].tv[4].b.push([1,"Từ nào thường dùng để nhân hoá con vật?","chị, anh, cô, bác","to, nhỏ, cao","đỏ, xanh, vàng","và, với, nhưng"],[2,"Câu nào có dấu ngoặc đơn dùng đúng?","Bạn Lan (lớp trưởng) phát biểu rất hay.","Bạn (Lan lớp trưởng) phát biểu rất hay.","Bạn Lan lớp (trưởng phát biểu) rất hay.","(Bạn Lan) lớp trưởng phát biểu rất hay."],[3,"Trong câu thơ “Bác kim giờ thận trọng / Nhích từng li, từng li”, sự vật được nhân hoá là:","kim giờ","từng li","bác","thận trọng"],[1,"Câu nào dùng biện pháp nhân hoá?","Cô mây đang dạo chơi trên bầu trời.","Mây trôi trên bầu trời.","Bầu trời nhiều mây.","Mây trắng như bông."]);
BV.G[4].tv[5].b.push([3,"@A","Vì sao quả bưởi nổi lên được?","Vì bưởi nhẹ hơn nước nên nổi theo khi nước dâng","Vì các bạn kéo lên","Vì hố bị lấp đầy đất","Vì có gió thổi"],[1,"@B","Mỗi sáng chị Gió làm gì?","đi khắp xóm đánh thức muôn loài","ngủ say","thổi bay mái nhà","tưới nước cho lúa"]);
