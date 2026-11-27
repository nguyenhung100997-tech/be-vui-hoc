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

## Bước 6. Bắt đầu dùng

**Thầy cô (làm một lần):**
1. Mở trang, vào mục **Lớp chung → Thầy cô tạo lớp mới**. Nhập tên lớp, khối và **PIN giáo viên** (4–6 số). Hãy ghi nhớ PIN này.
2. Ở thẻ **Giáo viên**, dán danh sách tên học sinh (mỗi dòng một tên), rồi bấm **Thêm và cấp mã**. Mỗi bé được:
   - một **mã 6 số**;
   - một **link riêng**: mở là vào học ngay, không cần gõ gì.
3. Bấm **Sao chép tất cả** để gửi cho từng phụ huynh. Hoặc bấm **In thẻ đăng nhập có mã QR**: in ra, cắt từng thẻ, dán vào vở của bé.
   Mã chỉ hiện lúc vừa cấp, nên hãy sao chép hoặc in ngay.
4. Gửi **link lớp** (ô "Đường link vào lớp") vào nhóm Zalo của lớp.

**Các bé đăng nhập bằng một trong ba cách:**
- **Mở link riêng hoặc quét mã QR trên thẻ:** vào thẳng bản đồ học.
- **Mở link lớp → bấm "Nhập mã của bé" → gõ 6 số:** vào học.
- **Những lần sau trên cùng máy:** mở link lớp, bấm **Tiếp tục học**.

Sau khi vào, bé học các chặng như bình thường. Sao tự cộng vào bảng xếp hạng của lớp. Bé vào thẻ **Thi chung** trong mục Lớp chung để làm đề thầy cô giao.

**Khi bé quên mã hoặc lộ mã:** ở danh sách học sinh, bấm **Cấp mã mới**. Mã và link cũ của bé hết hiệu lực ngay, nhưng sao và tiến trình của bé vẫn giữ nguyên.

**Thầy cô dùng máy khác:** vào **Lớp chung → Thầy cô vào lớp đã có**, nhập mã lớp và PIN giáo viên.

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

- Mã 6 số và link riêng giúp các bé vào học nhanh, chứ không phải mật khẩu bảo mật cao. Ai có link riêng của bé thì vào được tài khoản của bé, vì vậy chỉ gửi link riêng cho đúng phụ huynh. Không lưu thông tin nhạy cảm trong trang.
- Luật bảo mật không cho xoá dữ liệu, không cho sửa điểm thi đã nộp và không cho đổi PIN giáo viên.
- Quyền giáo viên (tạo đề, đặt lại PIN) được kiểm tra bằng PIN giáo viên ngay trên trang. Hãy chỉ chia sẻ địa chỉ trang và mã lớp cho phụ huynh trong lớp.

## Các tệp trong gói

| Tệp | Nội dung |
|---|---|
| `index.html` | Trang chính |
| `app.js` | Phần chạy chính của trang |
| `cloud.js` | Kết nối Firebase cho mục Lớp chung |
| `tranh.js` | Bộ tranh minh hoạ tự vẽ (con vật, hoa quả, đồ vật, thiên nhiên, hình cho Toán) |
| `baihoc.js` | Bài học có hình của 30 chặng: thẻ học và 12 bài tập có tranh mỗi chặng |
| `giongdoc.js` | Giọng cô giáo: chuẩn hoá cách đọc và chọn giọng |
| `giongdoc-config.js` | Nơi dán khoá Google Cloud cho giọng đọc cao cấp (không bắt buộc) |
| `qrcode.js` | Tạo mã QR cho thẻ đăng nhập (thư viện mã nguồn mở, giấy phép MIT) |
| `firebase-config.js` | Nơi dán cấu hình Firebase (Bước 3) |
| `firestore.rules` | Luật bảo mật dán vào Firebase (Bước 2) |
| `lopN.js`, `lopN-them.js` | Câu hỏi lớp 1–5. Thầy cô có thể mở bằng trình soạn thảo để thêm hoặc sửa câu |
