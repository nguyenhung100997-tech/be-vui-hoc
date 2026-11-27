/* Lớp 1 – câu Tiếng Việt bổ sung */
{const{cls,pairQ,typeQ,sp}=BV.H;const T=BV.G[1].tv;
/* Chặng 1: âm và chữ cái */
const AM=[["bò","b","d|p|đ"],["cò","c","k|q|g"],["dê","d","đ|gi|b"],["đỏ","đ","d|b|t"],["gà","g","gh|ng|c"],["hổ","h","k|kh|n"],["lá","l","n|r|đ"],["mũ","m","n|b|ph"],["nơ","n","l|m|nh"],["rổ","r","d|gi|l"],["sẻ","s","x|ch|th"],["tô","t","th|tr|đ"],["vở","v","b|ph|d"],["xe","x","s|ch|kh"],["chó","ch","tr|c|x"],["nhà","nh","n|ng|gi"],["ngựa","ng","ngh|n|g"],["phở","ph","p|b|v"],["thỏ","th","t|tr|kh"],["trâu","tr","ch|t|th"],["khỉ","kh","k|h|c"],["giỏ","gi","d|r|g"]];
T[0].b.push(...AM.map(([w,a,ws],i)=>[a.length>1?2:1,`Tiếng “${w}” bắt đầu bằng âm nào?`,a,...ws.split("|")]));
/* Chặng 2: dấu thanh */
const TONES=["dấu sắc","dấu huyền","dấu hỏi","dấu ngã","dấu nặng","không có dấu"];
const DT=[["cá",0],["bà",1],["hổ",2],["ngã",3],["mẹ",4],["ba",5],["cờ",1],["mỏ",2],["vẽ",3],["đỗ",3],["chó",0],["khỉ",2],["mũ",3],["bút",0],["quạ",4],["xe",5],["gỗ",3],["thỏ",2],["cụ",4],["hoa",5]];
T[1].b.push(...DT.map(([w,k],i)=>[k>=2&&k!==4?2:1,`Tiếng “${w}” có dấu thanh gì?`,TONES[k],...[1,2,3].map(d=>TONES[(k+d+i)%6]).filter((x,j,a)=>x!==TONES[k]&&a.indexOf(x)===j)]));
T[1].b.push([3,"Tiếng nào khác dấu thanh với các tiếng còn lại: lá, cá, mẹ, bé?","mẹ","lá","cá","bé"],[3,"Tiếng nào khác dấu thanh với các tiếng còn lại: gỗ, mũ, vẽ, cỏ?","cỏ","gỗ","mũ","vẽ"]);
/* Chặng 3: vần */
const VAN=[["hoa","oa"],["khế","ê"],["cây","ây"],["sao","ao"],["gấu","âu"],["tim","im"],["bướm","ươm"],["trăng","ăng"],["đèn","en"],["mưa","ưa"],["rừng","ưng"],["nến","ên"],["buồm","uôm"],["cốc","ôc"],["thuyền","uyên"],["khoai","oai"],["tàu","au"],["bánh","anh"],["lửa","ưa"],["xoài","oai"]];
T[2].b.push(...pairQ(2,"Tiếng “%” có vần gì?",VAN).map((x,i)=>{x[0]=i<8?1:i<16?2:3;return x}));
/* Chặng 4: chính tả */
T[3].b.push(...sp(1,["cái kẹo|cái cẹo|kái kẹo|cái qẹo","dòng kênh|dòng cênh|dòng kêng|dòng khênh","gồ ghề|ghồ ghề|gồ gề|ngồ ghề","con ngỗng|con nghỗng|con ngổng|con ngộng","ngõ nhỏ|nghõ nhỏ|ngỏ nhỏ|ngõ nhõ"]),
 ...sp(2,["nghe nhạc|nge nhạc|nghe nhặc|ngê nhạc","củ gừng|củ ghừng|củ gưng|củ ngưng","kì cọ|cì cọ|kì kọ|khì cọ","cái kim|cái cim|cái kiem|cái khim","con ghẹ|con gẹ|con nghẹ|kon ghẹ","bé ngoan|bé nghoan|bé ngoang|bé ngooan"]),
 ...sp(3,["gà gô|ghà gô|gà ghô|ngà ghô","kể chuyện|cể chuyện|kể chiện|cể chiện"]),
 [1,"Điền c hoặc k: thước …ẻ","k","c","q","kh"],[1,"Điền c hoặc k: cái …ốc","c","k","q","kh"],[2,"Điền g hoặc gh: con …ẹ","gh","g","ng","ngh"],[2,"Điền g hoặc gh: …ọn gàng","g","gh","ng","ngh"],[2,"Điền ng hoặc ngh: …ã ba đường","ng","ngh","g","gh"],[3,"Điền ng hoặc ngh: suy …ĩ","ngh","ng","gh","g"],[3,"Điền ng hoặc ngh: bé …ồi ngay ngắn","ng","ngh","g","gh"]);
/* Chặng 5: từ ngữ quanh em */
const VAT=["con trâu","con voi","con thỏ","con cá","con chim","con ngựa"],HT=["cái bút","quyển vở","cái thước","cục tẩy","cặp sách","bảng con"],QUA=["quả chuối","quả cam","quả na","quả dưa","quả nho","quả táo"],NG=["bố mẹ","ông nội","bà ngoại","anh trai","chị gái","em bé"];
T[4].b.push(...cls(1,"Từ nào chỉ con vật?",VAT.slice(0,5),[...HT,...QUA,...NG]),...cls(1,"Từ nào chỉ đồ dùng học tập?",HT.slice(0,5),[...VAT,...QUA,...NG]),...cls(2,"Từ nào chỉ loại quả?",QUA.slice(0,5),[...VAT,...HT,...NG]),...cls(2,"Từ nào chỉ người trong gia đình?",NG.slice(0,5),[...VAT,...HT,...QUA]));
/* Chặng 6: đọc hiểu */
Object.assign(T[5].p,{
 C:"Mèo con nhà Bin có bộ lông trắng như bông. Mèo thích nằm sưởi nắng ở bậu cửa. Mỗi khi Bin đi học về, mèo chạy ra cọ đầu vào chân Bin. Bin thương mèo lắm.",
 D:"Hôm nay là ngày khai giảng. Bé Hà mặc áo trắng, váy xanh, đeo khăn đỏ. Mẹ đưa Hà đến trường. Sân trường rực rỡ cờ hoa. Tiếng trống vang lên “tùng, tùng, tùng”.",
 E:"Bà em trồng một cây khế ở góc vườn. Cây ra hoa tím nhỏ li ti. Ít lâu sau, quả khế chín vàng. Bà hái khế cho cả nhà nấu canh chua."});
T[5].b.push(
 [1,"@C","Lông mèo con màu gì?","trắng","đen","vàng","xám"],[2,"@C","Lông mèo được so sánh với gì?","bông","tuyết","mây","sữa"],[1,"@C","Mèo thích nằm sưởi nắng ở đâu?","bậu cửa","gầm giường","mái nhà","góc bếp"],[2,"@C","Khi Bin đi học về, mèo làm gì?","chạy ra cọ đầu vào chân Bin","nằm ngủ","trèo lên cây","bắt chuột"],[3,"@C","Bin đối với mèo con như thế nào?","rất thương mèo","sợ mèo","không thích mèo","hay trêu mèo"],
 [1,"@D","Hôm nay là ngày gì?","ngày khai giảng","ngày Tết","ngày sinh nhật","ngày nghỉ hè"],[1,"@D","Bé Hà mặc áo màu gì?","trắng","xanh","đỏ","vàng"],[1,"@D","Ai đưa Hà đến trường?","mẹ","bố","bà","anh"],[2,"@D","Sân trường như thế nào?","rực rỡ cờ hoa","vắng vẻ","đầy lá rụng","ướt nước mưa"],[2,"@D","Tiếng trống vang lên thế nào?","tùng, tùng, tùng","ò ó o","meo meo","rì rào"],[3,"@D","Ngày khai giảng là ngày gì?","ngày bắt đầu năm học mới","ngày kết thúc năm học","ngày nghỉ hè","ngày Tết"],
 [1,"@E","Bà trồng cây gì?","cây khế","cây cam","cây ổi","cây bưởi"],[1,"@E","Hoa khế màu gì?","tím","trắng","đỏ","vàng"],[2,"@E","Quả khế chín có màu gì?","vàng","xanh","tím","đỏ"],[2,"@E","Bà hái khế để làm gì?","nấu canh chua","làm mứt","bán ở chợ","cho hàng xóm"],[1,"@E","Cây khế được trồng ở đâu?","góc vườn","trước cổng","bên ao","trong chậu"],[3,"@E","Từ ngữ nào tả hoa khế?","nhỏ li ti","to tướng","đỏ rực","trắng tinh"],
 ["o",2,"Xếp các thẻ thành câu đúng:","Bà/hái khế/cho/cả nhà"],["o",2,"Xếp các thẻ thành câu đúng:","Em/rất/yêu/bà"],["o",3,"Xếp các thẻ thành câu đúng:","Mèo con/nằm/sưởi nắng/ở bậu cửa"]);
}
