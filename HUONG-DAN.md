# Hướng dẫn cài đặt "Lớp chung" cho Bé Vui Học

Làm một lần, mất khoảng 15–20 phút. Bạn cần một tài khoản Google và một tài khoản GitHub, cả hai đều miễn phí.

Sau khi cài đặt xong:
- Các bé vào lớp từ bất kì máy nào (máy tính, máy tính bảng, điện thoại) bằng **mã lớp + tên + mã PIN**.
- Sao, điểm và tiến trình được lưu lâu dài, đổi máy vẫn còn.
- Có bảng xếp hạng **tuần này / tháng này / từ trước đến nay**.
- Thầy cô tạo **đề thi chung**: cả lớp nhận cùng một đề, mỗi bạn nộp một lần, có bảng điểm xếp theo điểm rồi theo thời gian làm bài.

---

## Bước 1. Tạo dự án Firebase

1. Vào https://console.firebase.google.com và đăng nhập bằng tài khoản Google.
2. Bấm **Create a project** (Tạo dự án). Đặt tên, ví dụ `be-vui-hoc`.
3. Ở bước Google Analytics, có thể tắt đi cho gọn. Bấm **Create project**.

## Bước 2. Bật đăng nhập ẩn danh và tạo cơ sở dữ liệu

1. Ở menu bên trái chọn **Build → Authentication → Get started**.
2. Vào thẻ **Sign-in method**, chọn **Anonymous** và bật **Enable**, rồi **Save**.
   (Các bé không cần email hay mật khẩu. Trang tự đăng nhập ẩn danh, bé chỉ nhập mã lớp và PIN.)
3. Chọn **Build → Firestore Database → Create database**.
   - Location: chọn `asia-southeast1 (Singapore)` cho nhanh.
   - Chọn **Start in production mode**.
4. Vào thẻ **Rules**, xoá hết nội dung cũ, dán toàn bộ nội dung tệp `firestore.rules` đi kèm, rồi bấm **Publish**.

## Bước 3. Lấy cấu hình và dán vào trang

1. Bấm biểu tượng bánh răng → **Project settings**.
2. Ở mục **Your apps**, bấm biểu tượng **</>** (Web). Đặt tên app, ví dụ `be-vui-hoc-web`, bấm **Register app**. Không cần chọn Firebase Hosting.
3. Firebase hiện một đoạn `const firebaseConfig = { ... }`. Chép phần trong ngoặc `{ ... }`.
4. Mở tệp `firebase-config.js` và sửa dòng cuối thành:

```js
window.BV_FIREBASE = {
  apiKey: "....",
  authDomain: "....firebaseapp.com",
  projectId: "....",
  storageBucket: "....",
  messagingSenderId: "....",
  appId: "...."
};
```

Các thông tin này được phép công khai trên trang web. Dữ liệu được bảo vệ bằng luật ở Bước 2.

## Bước 4. Đưa trang lên mạng bằng GitHub Pages

1. Vào https://github.com, tạo kho mới (**New repository**), ví dụ `be-vui-hoc`, chọn **Public**.
2. Bấm **uploading an existing file** và kéo thả **toàn bộ** các tệp trong gói này vào, kể cả thư mục `data`. Bấm **Commit changes**.
3. Vào **Settings → Pages**. Ở **Source** chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`, bấm **Save**.
4. Sau 1–2 phút, trang có địa chỉ dạng `https://ten-cua-ban.github.io/be-vui-hoc/`.

## Bước 5. Cho phép địa chỉ trang dùng Firebase

1. Quay lại Firebase → **Authentication → Settings → Authorized domains**.
2. Bấm **Add domain**, nhập `ten-cua-ban.github.io`, rồi lưu.

## Bước 6. Tạo key gốc (làm ngay sau khi đưa trang lên mạng)

Trang có hai loại key:

| Loại | Ai giữ | Mở được gì |
|---|---|---|
| **Key gốc** | Chỉ chủ trang | Tất cả: tạo lớp, tạo đề thi chung, chọn đề kiểm tra 3 mức nào được mở, cấp và thu hồi key học sinh |
| **Key học sinh** (8 số) | Mỗi bé một key | Vào Lớp chung, làm đề thi chung, làm các đề kiểm tra 3 mức mà chủ trang đã mở |

Không có key, bé vẫn học các chặng, bài học có hình, ôn câu sai, đổi quà như bình thường. Chỉ **Lớp chung** và **Kiểm tra theo 3 mức** bị khoá.

1. **Dán lại luật bảo mật mới:** Firebase → Firestore Database → **Rules** → xoá hết → dán toàn bộ nội dung tệp `firestore.rules` mới → **Publish**. (Bắt buộc. Thiếu bước này thì key không có tác dụng.)
2. Mở trang, gõ thêm `#quan-ly` vào cuối địa chỉ, ví dụ `https://ten.github.io/be-vui-hoc/#quan-ly`.
3. Ở ô **Tạo key gốc lần đầu**, nhập key gốc hai lần (ít nhất 8 kí tự, nên có chữ, số và kí hiệu), bấm **Tạo key gốc**. **Ghi key gốc ra giấy cất kĩ.** Trang không lưu key gốc ở dạng đọc được, nên không ai xem lại được.
   Hãy làm bước này ngay: ai tạo key gốc trước thì người đó là chủ trang.
4. Sau khi đăng nhập, menu có thêm mục **Quản lý**.

**Cấp key cho học sinh** (mục Quản lý → Cấp key học sinh):
- Chọn số key (tối đa 100 một lần), ghi chú (VD "Lớp 3A"), hạn dùng (không hạn, 30 ngày… 1 năm), rồi bấm **Tạo key**.
- Gửi mỗi bé một key: bấm **Sao chép tất cả**, hoặc **In thẻ key có mã QR**. Mỗi key có sẵn **link mở nhanh** (`…?key=12345678`): bé mở link là máy tự mở khoá.
- Bé chỉ nhập key **một lần**, máy nhớ cho những lần sau.
- Danh sách key cho biết mỗi key đã dùng trên mấy máy. Thấy key bị lộ (dùng trên quá nhiều máy), bấm **Thu hồi**: mọi máy dùng key đó mất quyền ngay. Bấm **Mở lại** nếu thu hồi nhầm.

**Mở đề kiểm tra 3 mức:** ở bảng **Mở đề kiểm tra 3 mức**, tick đề nào (VD Lớp 3 – Toán giữa năm) rồi bấm **Lưu**. Học sinh có key chỉ thấy các đề đã tick. Các đề chưa mở hiện hình ổ khoá.

**Lớp chung:**
1. Chủ trang vào **Lớp chung → Chủ trang tạo lớp mới** (chỉ hiện khi đã đăng nhập key gốc). Nhập tên lớp, khối.
2. Ở thẻ **Giáo viên**, dán danh sách tên học sinh (mỗi dòng một tên), bấm **Thêm và cấp mã**. Mỗi bé được một **mã 6 số** và một **link riêng**. Mã của bé cũng là chìa khoá vào lớp: bé có mã thì không cần key học sinh nữa.
3. Bấm **Sao chép tất cả** hoặc **In thẻ đăng nhập có mã QR**. Mã chỉ hiện lúc vừa cấp.
4. Tạo đề thi chung ở thẻ **Giáo viên**. Chỉ chủ trang tạo và đóng/mở đề được.

**Các bé vào Lớp chung bằng một trong các cách:**
- Mở link riêng hoặc quét mã QR trên thẻ: vào thẳng bản đồ học.
- Vào mục Lớp chung, nhập **mã lớp + mã của bé**.
- Vào mục Lớp chung, bấm **Nhập key học sinh**, gõ 8 số, rồi nhập mã lớp và chọn tên.

**Khi bé quên mã hoặc lộ mã:** ở danh sách học sinh, bấm **Cấp mã mới**. Mã và link cũ hết hiệu lực ngay; sao và tiến trình của bé vẫn giữ nguyên.

**Chủ trang dùng máy khác:** mở `#quan-ly`, nhập key gốc ở ô **Đăng nhập chủ trang**.

**Đổi key gốc:** mục Quản lý → **Đổi key gốc**. Mọi máy quản trị khác phải đăng nhập lại bằng key mới.

**Quên key gốc:** vào Firebase → Firestore Database → Data → mở bộ sưu tập `config` → xoá tài liệu `master`. Sau đó mở `#quan-ly` và tạo key gốc mới. Key học sinh, lớp và điểm vẫn giữ nguyên.

---

## Giọng cô giáo (đọc câu hỏi cho bé)

Trang luôn chuẩn hoá chữ trước khi đọc, để máy đọc đúng như cô giáo:
- Số: 21 đọc "hai mươi mốt", 105 đọc "một trăm linh năm", 1 005 đọc "một nghìn không trăm linh năm".
- Số thập phân và phân số: 2,5 đọc "hai phẩy năm", 3/4 đọc "ba phần tư", 25% đọc "hai mươi lăm phần trăm".
- Đơn vị: cm, kg, ml, m², °C, km/giờ… đọc thành tên đầy đủ.
- Phép tính: dấu + − × : = được đọc thành chữ; chỗ trống "…" đọc "chỗ trống".
- Tên âm: “m” đọc "mờ", “gh” đọc "gờ kép", “ngh” đọc "ngờ kép"…

Thầy cô kiểm tra và chỉnh trong mục **Hướng dẫn → Giọng cô giáo**:
- **Nghe thử** giọng, chọn giọng, chỉnh tốc độ đọc.
- **Gõ câu bất kì** để xem máy sẽ đọc thế nào.
- **Sửa cách đọc**: ghi từ viết và cách đọc đúng. Nếu đang ở chế độ giáo viên của lớp chung, bấm **Áp dụng cho cả lớp** để mọi máy của các bé cùng đọc theo.

### Cách 1 – Miễn phí, dùng giọng có sẵn trên máy

- **Máy tính Windows:** mở trang bằng **Microsoft Edge** để có giọng nữ "HoaiMy (Natural)" rất tự nhiên.
- **Android:** Cài đặt → Hệ thống → Ngôn ngữ → Chuyển văn bản thành giọng nói → chọn dịch vụ của Google và tải gói tiếng Việt.
- **iPhone, iPad:** Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Việt → tải giọng "Linh" (nâng cao).

Chất lượng giọng phụ thuộc từng máy. Có máy đọc rất hay, có máy đọc kém.

### Cách 2 – Chuẩn nhất trên mọi máy: giọng Google Cloud

Mọi máy đều nghe cùng một giọng nữ chất lượng cao. Mỗi câu chỉ tạo âm thanh **một lần**, sau đó cả lớp dùng lại.

Bước này **cần gắn thẻ thanh toán** vào dự án Google. Google yêu cầu bật thanh toán mới dùng được dịch vụ đọc. Lớp học dùng trong hạn mức miễn phí sẽ không mất tiền, nhưng nên đặt cảnh báo chi phí như bước 6.

1. Vào https://console.cloud.google.com, chọn dự án **hoc-cho-be** (chính là dự án Firebase).
2. Menu → **Billing** (Thanh toán) → **Link a billing account** và làm theo hướng dẫn thêm thẻ. Firebase sẽ chuyển sang gói Blaze nhưng vẫn giữ phần miễn phí.
3. Menu → **APIs & Services → Library**, tìm **Cloud Text-to-Speech API**, bấm **Enable**.
4. Menu → **APIs & Services → Credentials → Create credentials → API key**. Bấm vào khoá vừa tạo để sửa:
   - **Application restrictions** chọn **Websites**, thêm dòng `https://nguyenhung100997-tech.github.io/*`.
   - **API restrictions** chọn **Restrict key**, tick **Cloud Text-to-Speech API**.
   - Bấm **Save**, rồi chép khoá (bắt đầu bằng `AIza…`).
5. Mở tệp `giongdoc-config.js`, dán khoá vào `apiKey: "…"`, rồi tải tệp lên GitHub. Hoặc gửi khoá cho người hỗ trợ để điền giúp.
6. Menu → **Billing → Budgets & alerts → Create budget**, đặt mức thấp (ví dụ 2 USD) để Google báo khi có chi phí.
7. Vào Firebase → Firestore → **Rules**, dán lại toàn bộ tệp `firestore.rules` mới (có thêm phần lưu âm thanh dùng chung) rồi bấm **Publish**.

Sau khi bật, mục **Giọng cô giáo** sẽ hiện danh sách giọng Google. Trang tự chọn giọng nữ tốt nhất; thầy cô có thể đổi giọng khác và bấm **Nghe thử**.

---

## Giới hạn miễn phí

Gói miễn phí Spark của Firebase cho mỗi ngày 50.000 lượt đọc và 20.000 lượt ghi. Một lớp 20 bé chỉ dùng một phần nhỏ trong số đó.

## Lưu ý về an toàn

- **Phần được khoá thật trên máy chủ:** mọi dữ liệu Lớp chung (danh sách lớp, học sinh, đề thi chung, điểm, xếp hạng) và danh sách key. Firebase kiểm tra key trước khi trả dữ liệu, nên dù ai đó sửa mã trang trên máy họ cũng không đọc hay ghi được.
- **Phần khoá trên trang:** đề **Kiểm tra theo 3 mức** được tạo từ ngân hàng câu hỏi nằm trong các tệp `.js` công khai. Người không có key không bấm vào làm được, nhưng người rành máy tính vẫn có thể đọc câu hỏi trong mã nguồn. Muốn giữ đề thật kín, hãy dùng **đề thi chung trong Lớp chung**.
- Key gốc và key học sinh chỉ được lưu ở dạng mã hoá một chiều (SHA-256). Danh sách key học sinh chỉ chủ trang xem được.
- Mã 6 số và link riêng giúp các bé vào học nhanh. Chỉ gửi link riêng cho đúng phụ huynh.
- Luật bảo mật không cho xoá dữ liệu và không cho sửa điểm thi đã nộp.

## Các tệp trong gói

| Tệp | Nội dung |
|---|---|
| `index.html` | Trang chính |
| `app.js` | Phần chạy chính của trang |
| `cloud.js` | Kết nối Firebase cho Lớp chung, key gốc và key học sinh |
| `tranh.js` | Bộ tranh minh hoạ tự vẽ (con vật, hoa quả, đồ vật, thiên nhiên, hình cho Toán) |
| `baihoc.js` | Bài học có hình của 30 chặng: thẻ học và 12 bài tập có tranh mỗi chặng |
| `giongdoc.js` | Giọng cô giáo: chuẩn hoá cách đọc và chọn giọng |
| `giongdoc-config.js` | Nơi dán khoá Google Cloud cho giọng đọc cao cấp (không bắt buộc) |
| `qrcode.js` | Tạo mã QR cho thẻ đăng nhập (thư viện mã nguồn mở, giấy phép MIT) |
| `firebase-config.js` | Nơi dán cấu hình Firebase (Bước 3) |
| `firestore.rules` | Luật bảo mật dán vào Firebase (Bước 2) |
| `data/lopN.js`, `data/lopN-them.js` | Câu hỏi lớp 1–5. Thầy cô có thể mở bằng trình soạn thảo để thêm hoặc sửa câu |
