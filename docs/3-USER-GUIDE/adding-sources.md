# Thêm Nguồn - Đưa Nội Dung Vào Notebook

Nguồn là nguyên liệu thô cho nghiên cứu của bạn. Hướng dẫn này bao gồm cách thêm các loại nội dung khác nhau.

---

## Bắt Đầu Nhanh: Thêm Nguồn Đầu Tiên

### Tùy chọn 1: Tải lên File (PDF, Word, v.v.)

```
1. Trong notebook, nhấn "Thêm Nguồn"
2. Chọn "Tải lên File"
3. Chọn file từ máy tính
4. Nhấn "Tải lên"
5. Chờ 30-60 giây để xử lý
6. Xong! Nguồn xuất hiện trong notebook
```

### Tùy chọn 2: Thêm Liên Kết Web

```
1. Nhấn "Thêm Nguồn"
2. Chọn "Liên Kết Web"
3. Dán URL: https://example.com/bai-viet
4. Nhấn "Thêm"
5. Chờ xử lý (thường nhanh hơn file)
6. Xong!
```

### Tùy chọn 3: Dán Văn Bản

```
1. Nhấn "Thêm Nguồn"
2. Chọn "Văn Bản"
3. Dán hoặc nhập nội dung
4. Nhấn "Lưu"
5. Xong! Có thể dùng ngay
```

---

## Các Loại File Được Hỗ Trợ

### Tài Liệu
- **PDF** (.pdf) — Hỗ trợ tốt nhất, kể cả PDF được quét với OCR
- **Word** (.docx, .doc) — Hỗ trợ đầy đủ
- **PowerPoint** (.pptx) — Slide được chuyển thành văn bản
- **Excel** (.xlsx, .xls) — Dữ liệu bảng tính
- **EPUB** (.epub) — File sách điện tử
- **Markdown** (.md, .txt) — Định dạng văn bản thuần
- **HTML** (.html, .htm) — File trang web

**Giới hạn kích thước file:** Tối đa ~100MB (tùy hệ thống)

**Thời gian xử lý:** 10 giây - 2 phút (tùy độ dài và loại file)

### Âm Thanh & Video
- **Âm thanh**: MP3, WAV, M4A, OGG, FLAC (~30 giây - 3 phút mỗi giờ)
- **Video**: MP4, AVI, MOV, MKV, WebM (~3-10 phút mỗi giờ)
- **YouTube**: Hỗ trợ URL trực tiếp
- **Podcast**: URL RSS feed

**Phiên âm tự động**: Âm thanh/video được phiên âm thành văn bản tự động. Cần bật speech-to-text trong cài đặt.

### Nội Dung Web
- **Bài viết**: Blog, bài báo, Medium
- **YouTube**: Video đầy đủ hoặc danh sách phát
- **PDF online**: Liên kết PDF trực tiếp
- **Tin tức**: Bài báo của các trang tin

**Chỉ cần dán URL** vào phần "Liên Kết Web".

### Những Gì Không Hoạt Động
- Nội dung có paywall (WSJ, FT, v.v.) — Không thể trích xuất
- PDF được bảo vệ mật khẩu — Không thể mở
- File ảnh thuần (.jpg, .png) — Ngoại trừ PDF được quét có OCR
- File rất lớn (>100MB) — Timeout

---

## Điều Gì Xảy Ra Khi Thêm Nguồn

Hệ thống tự động thực hiện bốn việc:

```
1. TRÍCH XUẤT VĂN BẢN
   File/URL → Văn bản có thể đọc
   (PDF được OCR nếu là ảnh scan)
   (Video được phiên âm nếu đã bật)

2. CHIA THÀNH ĐOẠN
   Văn bản dài → Đoạn ~500 từ
   (Để tìm kiếm phần cụ thể, không phải toàn bộ tài liệu)

3. TẠO NHÚNG
   Mỗi đoạn → Biểu diễn vector
   (Cho phép tìm kiếm ngữ nghĩa/khái niệm)

4. LẬP CHỈ MỤC & LƯU TRỮ
   Tất cả → Cơ sở dữ liệu
   (Sẵn sàng tìm kiếm và truy xuất)
```

**Thời gian sử dụng:** Sau khi thanh tiến trình hoàn thành, nguồn có thể dùng ngay. Nhúng được tạo trong nền.

---

## Hướng Dẫn Từng Bước Cho Các Loại Khác Nhau

### PDF

**Thực hành tốt nhất:**
```
PDF sạch:
  1. Tải lên → Xong
  2. Thời gian xử lý: ~30-60 giây

PDF được quét/ảnh:
  1. Tải lên cùng cách
  2. Hệ thống tự phát hiện và dùng OCR
  3. Thời gian xử lý: ~2-3 phút
  4. (Cao hơn, do chi phí OCR)

PDF lớn (50+ trang):
  1. Cân nhắc chia thành file nhỏ hơn
  2. Hoặc tải lên nguyên (hệ thống xử lý được)
  3. Thời gian xử lý tăng theo kích thước
```

**Lỗi phổ biến:**
- "Không thể trích xuất văn bản" → PDF bị hỏng hoặc có bảo vệ sao chép
- Giải pháp: Thử mở trong Adobe. Nếu không được, PDF có thể bị khóa.

### Liên Kết Web / Bài Viết

**Thực hành tốt nhất:**
```
1. Sao chép URL đầy đủ từ trình duyệt: https://example.com/ten-bai-viet
2. Dán vào "Liên Kết Web"
3. Nhấn Thêm
4. Chờ trích xuất

Thời gian xử lý: Thường 5-15 giây
```

**Hoạt động:**
- Bài viết web tiêu chuẩn
- Blog
- Bài báo tin tức
- Trang Wikipedia
- Bài Medium
- Bài Substack

**Không hoạt động:**
- Thread Twitter (không ổn định)
- Bài có paywall (không thể truy cập)
- Trang nặng JavaScript (nội dung không được trích xuất)

**Mẹo:** Nếu không hoạt động, sao chép nội dung bài viết và dán như "Văn Bản" thay thế.

### File Âm Thanh

**Thực hành tốt nhất:**
```
1. Đảm bảo speech-to-text được bật trong Cài đặt
2. Tải lên file MP3, WAV, hoặc M4A
3. Hệ thống tự phiên âm thành văn bản
4. Thời gian xử lý: ~1 phút cho mỗi 5 phút âm thanh

Ví dụ:
  - Podcast 1 giờ → 12 phút xử lý
  - Ghi âm 10 phút → 2 phút xử lý
```

**Chất lượng quan trọng:**
- Âm thanh rõ: Phiên âm nhanh
- Âm thanh nhỏ/ồn: Phiên âm chậm hơn, kém chính xác hơn
- Tiếng ồn nền: Cố gắng giảm thiểu trước khi tải lên

**Mẹo:** Nếu chất lượng âm thanh kém, AI có thể hiểu sai nội dung. Bạn có thể sửa phiên âm thủ công nếu cần.

### Video YouTube

**Thực hành tốt nhất:**
```
Hai cách thêm:

Cách 1: URL Trực Tiếp
  1. Sao chép URL YouTube: https://www.youtube.com/watch?v=...
  2. Dán vào "Liên Kết Web"
  3. Nhấn Thêm
  4. Hệ thống trích xuất phụ đề (nếu có) + phiên âm

Cách 2: Danh Sách Phát
  1. Dán URL danh sách phát
  2. Hệ thống thêm tất cả video thành nguồn riêng biệt
  3. Mỗi video được xử lý riêng
  4. Mất nhiều thời gian hơn (nhiều video)
```

**Những gì được trích xuất:**
- Phụ đề/caption (nếu có)
- Phiên âm (nếu không có phụ đề)
- Metadata cơ bản (tiêu đề, kênh, độ dài)

**Xử lý:**
- Video 10 phút: ~2-3 phút
- Video 1 giờ: ~10-15 phút

### Văn Bản / Nội Dung Dán

**Thực hành tốt nhất:**
```
1. Chọn "Văn Bản" khi thêm nguồn
2. Dán hoặc nhập nội dung
3. Hệ thống xử lý ngay
4. Không cần thời gian chờ

Tốt cho:
  - Ghi chú bạn muốn tham chiếu
  - Trích dẫn từ sách
  - Bản ghi bạn có sẵn
  - Đoạn nghiên cứu nhanh
```

---

## Quản Lý Nguồn

### Xem Chi Tiết Nguồn

```
Nhấp vào nguồn → Xem:
  - Tên/tiêu đề file gốc
  - Khi nào được thêm
  - Kích thước và định dạng
  - Trạng thái xử lý
  - Số lượng đoạn
```

### Tổ Chức Với Metadata

Bạn có thể thêm cho mỗi nguồn:
- **Tiêu đề**: Tên tốt hơn tên file gốc
- **Thẻ**: Nhãn danh mục ("nghiên cứu chính", "nền tảng", "phân tích đối thủ")
- **Mô tả**: Vài ghi chú về nội dung chứa

**Tại sao quan trọng:**
- Làm nguồn dễ tìm hơn
- Giúp khi cung cấp ngữ cảnh cho Chat
- Hữu ích để tổ chức notebook lớn

### Tìm Kiếm Trong Nguồn

```
Sau khi thêm nguồn, bạn có thể:

Tìm kiếm văn bản: "Tìm cụm từ chính xác"
Tìm kiếm vector: "Tìm tương tự về khái niệm"

Cả hai tìm kiếm qua tất cả nguồn trong notebook.
Kết quả hiển thị:
  - Nguồn nào
  - Phần nào
  - Điểm liên quan
```

---

## Quản Lý Ngữ Cảnh: Cách Nguồn Được Sử Dụng

Bạn kiểm soát cách AI truy cập nguồn:

### Ba Mức (cho Chat)

**Nội Dung Đầy Đủ:**
```
AI thấy: Toàn bộ văn bản nguồn
Chi phí: 100% token
Dùng khi: Phân tích chi tiết, cần trích dẫn chính xác
Ví dụ: "Phân tích kỹ bài báo về phương pháp này"
```

**Chỉ Tóm Tắt:**
```
AI thấy: Tóm tắt do AI tạo (không phải toàn văn)
Chi phí: ~10-20% token
Dùng khi: Tài liệu nền, ngữ cảnh tham chiếu
Ví dụ: "Dùng cái này như ngữ cảnh nhưng tập trung vào nguồn chính"
```

**Không Trong Ngữ Cảnh:**
```
AI thấy: Không gì (loại trừ)
Chi phí: 0 token
Dùng khi: Bảo mật, không liên quan, hoặc lưu trữ
Ví dụ: "Giữ trong notebook nhưng không dùng trong cuộc trò chuyện này"
```

### Cách Đặt Ngữ Cảnh (trong Chat)

```
1. Vào Chat
2. Nhấn "Chọn Nguồn Ngữ Cảnh"
3. Cho mỗi nguồn:
   - Bật/tắt (bao gồm/loại trừ)
   - Chọn mức (Đầy đủ/Tóm tắt/Loại trừ)
4. Nhấn "Lưu"
5. Bây giờ chat dùng cài đặt này
```

---

## Lỗi Thường Gặp

| Lỗi | Điều Xảy Ra | Cách Sửa |
|-----|-------------|----------|
| Tải lên 200 nguồn cùng lúc | Hệ thống chậm, xử lý bị đình trệ | Thêm 10-20 mỗi lần, chờ xử lý |
| Dùng nội dung đầy đủ cho tất cả nguồn | Sử dụng token tăng vọt, tốn kém | Dùng "Tóm tắt" hoặc "Loại trừ" cho tài liệu nền |
| Thêm PDF lớn không chia | Xử lý chậm, kết quả tìm kiếm kém chính xác | Cân nhắc chia PDF lớn thành các chương |
| Quên tiêu đề nguồn | Không thể phân biệt nguồn tương tự | Đổi tên nguồn với tiêu đề mô tả ngay sau khi tải lên |
| Không gắn thẻ nguồn | Khó tìm kiếm và tổ chức sau này | Thêm thẻ ngay: "chính", "nền tảng", v.v. |
| Trộn ngôn ngữ trong một nguồn | Chất lượng phiên âm/nhúng giảm | Giữ mỗi ngôn ngữ trong nguồn riêng biệt |
| Dùng cùng nguồn nhiều lần | Chiếm dung lượng, gây nhầm lẫn | Thêm một lần; tái sử dụng trong nhiều chat/notebook |

---

## Trạng Thái Xử Lý & Khắc Phục Sự Cố

### Ý Nghĩa Các Chỉ Báo Trạng Thái

```
🟡 Đang xử lý
  → Nguồn đang được trích xuất và nhúng
  → Chờ 30 giây - 3 phút tùy kích thước
  → Chưa dùng trong Chat

🟢 Sẵn sàng
  → Nguồn đã xử lý và có thể tìm kiếm
  → Có thể dùng ngay trong Chat
  → Có thể áp dụng biến đổi

🔴 Lỗi
  → Đã xảy ra sự cố
  → Nguyên nhân phổ biến:
    - Định dạng file không được hỗ trợ
    - File quá lớn hoặc bị hỏng
    - Timeout mạng

⚪ Không Trong Ngữ Cảnh
  → Nguồn đã thêm nhưng bị loại trừ khỏi Chat
  → Vẫn có thể tìm kiếm, không được gửi tới AI
```

### Lỗi Phổ Biến & Giải Pháp

**"Loại file không được hỗ trợ"**
- Bạn đã cố tải lên định dạng không có trong danh sách (ví dụ: ảnh `.webp`)
- Giải pháp: Chuyển sang định dạng được hỗ trợ (PDF cho tài liệu, MP3 cho âm thanh)

**"Timeout xử lý"**
- File rất lớn (>100MB) hoặc âm thanh rất dài
- Giải pháp: Chia thành phần nhỏ hơn hoặc thử tải lên lại

**"Phiên âm thất bại"**
- Chất lượng âm thanh quá kém hoặc ngôn ngữ không được phát hiện
- Giải pháp: Ghi lại với chất lượng tốt hơn, hoặc dán bản ghi văn bản thủ công

**"Liên kết web không trích xuất được"**
- Trang web chặn truy cập tự động hoặc dùng JavaScript cho nội dung
- Giải pháp: Sao chép nội dung bài viết và dán như "Văn Bản" thay thế

---

## Mẹo Để Có Kết Quả Tốt Nhất

### Cho PDF
- PDF kỹ thuật số, sạch hoạt động tốt nhất
- Xóa bảo vệ sao chép nếu có (một cách hợp pháp)
- PDF được quét hoạt động được nhưng mất nhiều thời gian hơn

### Cho Bài Viết Web
- Dùng URL đầy đủ bao gồm tên miền
- Tránh trang có nhiều cookie/popup
- Nếu trích xuất thất bại, sao chép-dán văn bản thay thế

### Cho Âm Thanh
- Âm thanh rõ, được ghi tốt phiên âm tốt hơn
- Xóa tiếng ồn nền nếu có thể
- Video YouTube thường có phiên âm tốt sẵn có

### Cho Tài Liệu Lớn
- Cân nhắc chia thành nguồn nhỏ hơn
- Cho kết quả tìm kiếm chính xác hơn
- Xử lý nhanh hơn cho các phần nhỏ hơn

### Cho Tổ Chức
- Đặt tên nguồn rõ ràng (không phải "document_2.pdf")
- Thêm thẻ ngay sau khi tải lên
- Dùng mô tả cho tài liệu phức tạp

---

## Tiếp Theo: Sử Dụng Nguồn

Sau khi thêm nguồn, bạn có thể:

- **Chat** → Đặt câu hỏi (xem [Chat Hiệu Quả](chat-effectively.md))
- **Tìm kiếm** → Tìm nội dung cụ thể (xem [Tìm Kiếm Hiệu Quả](search.md))
- **Biến đổi** → Trích xuất thông tin chi tiết có cấu trúc (xem [Làm Việc Với Ghi Chú](working-with-notes.md))
- **Hỏi** → Nhận câu trả lời toàn diện (xem [Tìm Kiếm Hiệu Quả](search.md))
- **Podcast** → Chuyển thành âm thanh (xem [Tạo Podcast](creating-podcasts.md))

---

## Checklist Tóm Tắt

Trước khi thêm nguồn, xác nhận:

- [ ] File ở định dạng được hỗ trợ
- [ ] File dưới 100MB (hoặc chia file lớn)
- [ ] Liên kết web là URL đầy đủ (không rút gọn)
- [ ] File âm thanh có giọng nói rõ (nếu phụ thuộc phiên âm)
- [ ] Bạn đã đặt tên nguồn rõ ràng
- [ ] Bạn đã thêm thẻ để tổ chức
- [ ] Bạn hiểu các mức ngữ cảnh (Đầy đủ/Tóm tắt/Loại trừ)

Xong! Nguồn giờ sẵn sàng cho Chat, Tìm kiếm, Biến đổi và nhiều hơn.
