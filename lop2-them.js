/* Lớp 2 – câu Tiếng Việt bổ sung */
{const{cls,pairQ,typeQ,sp}=BV.H;const T=BV.G[2].tv;
/* Chặng 1: từ chỉ sự vật, hoạt động, đặc điểm */
const SV=["cái cặp","con đường","ngôi nhà","dòng sông","cây bàng","chiếc lá","đám mây"],HD=["nhảy dây","quét nhà","tưới cây","đá bóng","đọc sách","rửa bát","múa hát"],DD=["xanh biếc","cao vút","thơm ngát","hiền lành","nhanh nhẹn","tròn xoe","ngọt lịm"];
T[0].b.push(...cls(1,"Từ nào chỉ sự vật?",SV,[...HD,...DD]),...cls(1,"Từ nào chỉ hoạt động?",HD,[...SV,...DD]),...cls(2,"Từ nào chỉ đặc điểm?",DD,[...SV,...HD]));
/* Chặng 2: các kiểu câu */
T[1].b.push(...typeQ(1,"Câu “%” là kiểu câu nào?",{"câu giới thiệu":["Bố em là kĩ sư.","Đây là ngôi trường của em.","Bạn Hùng là lớp trưởng.","Con trâu là bạn của nhà nông.","Cô Mai là cô giáo lớp em.","Hà Nội là thủ đô của nước ta."],"câu nêu hoạt động":["Mẹ đang nấu cơm.","Các bạn chơi đá cầu.","Đàn cá bơi tung tăng.","Ông em đọc báo.","Chị Lan quét sân.","Bầy chim bay về tổ."],"câu nêu đặc điểm":["Bông hoa hồng rất thơm.","Bạn Nam rất cao.","Nước suối mát lạnh.","Cây bàng xanh tốt.","Chú mèo rất đáng yêu.","Mái tóc bà bạc trắng."]},["câu hỏi"]).map((x,i)=>{x[0]=i%3===2?2:1;return x}),
 [3,"Câu nào là câu nêu hoạt động?","Chú công nhân đang sửa đường.","Chú công nhân rất khỏe.","Đây là chú công nhân.","Chú công nhân ơi!"],[3,"Bộ phận trả lời câu hỏi “Thế nào?” trong câu “Đôi mắt bé đen láy.” là:","đen láy","đôi mắt","bé","đôi mắt bé"]);
/* Chặng 3: dấu câu */
const END={"dấu chấm (.)":["Em đi học bằng xe đạp","Sáng nay trời nắng đẹp","Lớp em có ba mươi bạn","Bà kể chuyện cổ tích cho em nghe","Chú chó nằm ngủ dưới gốc cây","Em giúp mẹ tưới rau"],"dấu chấm hỏi (?)":["Bạn thích ăn quả gì","Nhà bạn ở đâu","Mấy giờ chúng mình đi học","Ai đã vẽ bức tranh này","Bạn có thích hát không","Hôm nay là thứ mấy"],"dấu chấm than (!)":["Ôi, cầu vồng đẹp quá","Chà, quả dưa to thế","A, mẹ về rồi","Bạn giỏi quá","Ồ, mưa đá kìa","Hoan hô, đội mình thắng rồi"]};
T[2].b.push(...typeQ(1,"Chọn dấu câu đặt ở cuối câu: “% □”",END,["dấu phẩy (,)"]).map((x,i)=>{x[0]=i<6?1:i<12?2:2;return x}),
 [2,"Câu nào đặt dấu phẩy đúng?","Lan, Hoa và Mai là bạn thân.","Lan Hoa, và Mai là bạn thân.","Lan Hoa và, Mai là bạn thân.","Lan, Hoa, và, Mai là bạn thân."],[3,"Câu nào đặt dấu phẩy đúng?","Em thích đá bóng, đá cầu và nhảy dây.","Em thích, đá bóng đá cầu và nhảy dây.","Em thích đá bóng đá cầu, và, nhảy dây.","Em, thích đá bóng đá cầu và nhảy dây."]);
/* Chặng 4: chính tả */
T[3].b.push(...sp(1,["xinh đẹp|sinh đẹp|xin đẹp|xinh đẹb","chăm chỉ|trăm chỉ|chăm trỉ|trăm trỉ","nóng nực|lóng lực|nóng lực|lóng nực","lên lớp|nên lớp|lên nớp|nên nớp","con sóc|con xóc|con sốc|con sóch"]),
 ...sp(2,["trang sách|chang sách|trang xách|chang xách","no nê|lo lê|no lê|lo nê","dạy dỗ|giạy dỗ|rạy rỗ|dạy giỗ","gió thổi|dó thổi|ró thổi|gió thỗi","rổ rá|dổ dá|giổ giá|rổ giá","xôi gấc|sôi gấc|xôi gất|sôi gất","sương sớm|xương sớm|sương xớm|xương xớm"]),
 ...sp(3,["chim sâu|trim sâu|chim xâu|trim xâu","cái chổi|cái trổi|cái chỗi|cái trỗi","lá chuối|ná chuối|lá truối|ná truối","nải chuối|lải chuối|nải truối|lải truối"]),
 ["i",1,"Điền s hoặc x: …e đạp","x"],["i",2,"Điền ch hoặc tr: …ú bộ đội","ch"],["i",2,"Điền l hoặc n: …ăng lực","n","=Năng lực."],["i",3,"Điền d, gi hoặc r: …a đình","gi","=Gia đình."]);
/* Chặng 5: từ có nghĩa giống nhau, trái ngược */
T[4].b.push(...pairQ(1,"Từ trái nghĩa với “%” là:",[["dài","ngắn"],["béo","gầy"],["sạch","bẩn"],["đúng","sai"],["mới","cũ"],["xa","gần"],["sớm","muộn"],["khỏe","yếu"]]),
 ...pairQ(2,"Từ trái nghĩa với “%” là:",[["đầy","vơi"],["nặng","nhẹ"],["rộng","hẹp"],["trước","sau"],["lên","xuống"],["mở","đóng"]]),
 ...pairQ(2,"Từ có nghĩa giống “%” là:",[["mẹ","má"],["nhanh","mau"],["xinh","đẹp"],["bé","nhỏ"],["ngắm","nhìn"],["thương","yêu"]]).map((x,i)=>{if(i>3)x[0]=3;return x}));
/* Chặng 6: đọc hiểu */
Object.assign(T[5].p,{
 C:"Chú bộ đội biên phòng đứng gác nơi biên giới. Dù trời mưa hay nắng, chú vẫn đứng nghiêm, mắt nhìn về phía trước. Nhờ có các chú, nhân dân được sống yên vui.",
 D:"Con đường từ nhà Lan đến trường có hai hàng phượng vĩ. Mùa hè, hoa phượng nở đỏ rực như những đốm lửa. Tiếng ve râm ran báo hiệu năm học sắp kết thúc.",
 E:"Mẹ mua cho Tú một chiếc cặp mới. Cặp màu xanh, có hai ngăn và quai đeo chắc chắn. Tú xếp sách vở gọn gàng vào cặp. Tú tự nhủ sẽ giữ gìn chiếc cặp thật cẩn thận."});
T[5].b.push(
 [1,"@C","Chú bộ đội đứng gác ở đâu?","nơi biên giới","trước cổng trường","giữa cánh đồng","bên bờ sông"],[2,"@C","Khi trời mưa hay nắng, chú bộ đội như thế nào?","vẫn đứng nghiêm","vào nhà trú","đi về nhà","ngồi nghỉ"],[3,"@C","Nhờ có các chú bộ đội, nhân dân được thế nào?","sống yên vui","có nhiều nhà","được nghỉ học","đi du lịch"],[3,"@C","Em cần có tình cảm gì với các chú bộ đội?","biết ơn, kính yêu","sợ hãi","không quan tâm","ghen tị"],
 [1,"@D","Hai bên đường đến trường có cây gì?","phượng vĩ","bàng","xà cừ","bằng lăng"],[2,"@D","Hoa phượng được so sánh với gì?","những đốm lửa","những chiếc ô","những ngôi sao","những đám mây"],[2,"@D","Tiếng ve báo hiệu điều gì?","năm học sắp kết thúc","trời sắp mưa","mùa xuân đến","giờ vào lớp"],[1,"@D","Hoa phượng nở vào mùa nào?","mùa hè","mùa xuân","mùa thu","mùa đông"],[3,"@D","Từ nào tả tiếng ve trong đoạn văn?","râm ran","rì rào","líu lo","ầm ầm"],
 [1,"@E","Mẹ mua cho Tú cái gì?","chiếc cặp mới","đôi giày","quyển truyện","hộp bút"],[1,"@E","Chiếc cặp màu gì?","xanh","đỏ","vàng","tím"],[2,"@E","Chiếc cặp có mấy ngăn?","hai ngăn","một ngăn","ba ngăn","bốn ngăn"],[2,"@E","Tú xếp sách vở vào cặp như thế nào?","gọn gàng","lộn xộn","vội vàng","chậm chạp"],[3,"@E","Tú tự nhủ điều gì?","sẽ giữ gìn chiếc cặp thật cẩn thận","sẽ mua thêm cặp","sẽ cho bạn mượn cặp","sẽ cất cặp đi"],
 ["o",2,"Xếp các thẻ thành câu đúng:","Hoa phượng/nở/đỏ rực/trên cành"],["o",3,"Xếp các thẻ thành câu đúng:","Chú bộ đội/đứng gác/nơi biên giới"]);
}
BV.G[2].tv[5].b.push([2,"@A","Nam nhặt vỏ ốc để làm gì?","làm quà tặng em gái","để chơi một mình","để bán","để trang trí lâu đài"],[1,"@B","Cây bàng đã nhiều tuổi đứng ở đâu?","sân trường","cổng làng","bờ ao","vườn nhà"],[1,"@E","Quai đeo của cặp như thế nào?","chắc chắn","mỏng manh","bị đứt","quá dài"],[3,"@E","Qua bài đọc, em học được điều gì từ Tú?","biết giữ gìn đồ dùng học tập","biết đi mua sắm","thích đổi cặp mới","thích màu xanh"]);
