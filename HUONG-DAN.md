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
| `qrcode.js` | Tạo mã QR cho thẻ đăng nhập (thư viện mã nguồn mở, giấy phép MIT) |
| `firebase-config.js` | Nơi dán cấu hình Firebase (Bước 3) |
| `firestore.rules` | Luật bảo mật dán vào Firebase (Bước 2) |
| `data/lopN.js`, `data/lopN-them.js` | Câu hỏi lớp 1–5. Thầy cô có thể mở bằng trình soạn thảo để thêm hoặc sửa câu |
