# Hướng Dẫn Sử Dụng - Cách Dùng Open Notebook

Hướng dẫn này bao gồm cách sử dụng thực tế, từng bước các tính năng của Open Notebook. Bạn đã hiểu các khái niệm; bây giờ hãy học cách thực sự sử dụng chúng.

> **Điều kiện tiên quyết**: Xem lại [2-KHÁI-NIỆM-CƠ-BẢN](../2-CORE-CONCEPTS/index.md) trước để hiểu các mô hình tư duy (notebook, nguồn, ghi chú, chat, biến đổi, podcast).

---

## Bắt Đầu Từ Đây

### [Tổng Quan Giao Diện](interface-overview.md)
Tìm hiểu bố cục trước khi bắt đầu. Hiểu thiết kế ba bảng và vị trí mọi thứ.

---

## Tám Tính Năng Cốt Lõi

### 1. [Thêm Nguồn](adding-sources.md)
Cách đưa nội dung vào notebook. Hỗ trợ PDF, liên kết web, âm thanh, video, văn bản và nhiều hơn.

**Liên kết nhanh:**
- Tải lên PDF hoặc tài liệu
- Thêm liên kết web hoặc bài viết
- Phiên âm âm thanh hoặc video
- Dán văn bản trực tiếp
- Lỗi phổ biến + cách sửa

---

### 2. [Làm Việc Với Ghi Chú](working-with-notes.md)
Tạo, tổ chức và sử dụng ghi chú (cả thủ công và do AI tạo).

**Liên kết nhanh:**
- Tạo ghi chú thủ công
- Lưu phản hồi AI thành ghi chú
- Áp dụng biến đổi để tạo thông tin chi tiết
- Tổ chức bằng thẻ và tên
- Sử dụng ghi chú trong notebook

---

### 3. [Chat Hiệu Quả](chat-effectively.md)
Trò chuyện với AI về nguồn của bạn. Quản lý ngữ cảnh để kiểm soát những gì AI thấy.

**Liên kết nhanh:**
- Bắt đầu cuộc chat đầu tiên
- Chọn nguồn nào đưa vào ngữ cảnh
- Đặt câu hỏi hiệu quả
- Sử dụng câu hỏi tiếp theo hiệu quả
- Hiểu trích dẫn và xác minh khẳng định

---

### 4. [Tạo Podcast](creating-podcasts.md)
Chuyển đổi nghiên cứu của bạn thành đối thoại âm thanh để tiêu thụ thụ động.

**Liên kết nhanh:**
- Tạo podcast đầu tiên
- Chọn hoặc tùy chỉnh người nói
- Chọn nhà cung cấp TTS
- Tạo và tải về
- Sửa lỗi chất lượng âm thanh phổ biến

---

### 5. [Tìm Kiếm Hiệu Quả](search.md)
Hai chế độ tìm kiếm: dựa trên văn bản (từ khóa) và dựa trên vector (ngữ nghĩa). Biết khi nào dùng mỗi loại.

**Liên kết nhanh:**
- Tìm kiếm văn bản vs tìm kiếm vector (khi nào dùng)
- Thực hiện tìm kiếm hiệu quả
- Sử dụng tính năng Hỏi cho câu trả lời toàn diện
- Lưu kết quả tìm kiếm thành ghi chú
- Khắc phục kết quả kém

---

### 6. [Biến Đổi](transformations.md)
Xử lý hàng loạt nguồn với các mẫu định sẵn. Trích xuất cùng thông tin chi tiết từ nhiều tài liệu.

**Liên kết nhanh:**
- Mẫu biến đổi tích hợp sẵn
- Tạo biến đổi tùy chỉnh
- Áp dụng cho một hoặc nhiều nguồn
- Quản lý đầu ra biến đổi

---

### 7. [Trích Dẫn](citations.md)
Xác minh khẳng định của AI bằng cách truy nguyên về tài liệu nguồn. Hiểu hệ thống trích dẫn.

**Liên kết nhanh:**
- Đọc và nhấp vào trích dẫn
- Xác minh khẳng định so với nguồn
- Yêu cầu trích dẫn tốt hơn
- Lưu nội dung có trích dẫn thành ghi chú

---

### 8. [Cấu Hình API](api-configuration.md)
Cấu hình khóa API nhà cung cấp AI trực tiếp qua giao diện Cài đặt.

**Liên kết nhanh:**
- Thêm khóa API không cần chỉnh sửa file
- Kiểm tra kết nối nhà cung cấp
- Di chuyển từ biến môi trường
- Quản lý nhà cung cấp Azure và tương thích OpenAI
- Hiểu lưu trữ và mã hóa khóa

---

## Tính Năng Nào Cho Tác Vụ Nào?

```
Tác vụ: "Tôi muốn khám phá chủ đề với câu hỏi tiếp"
→ Dùng: Chat (thêm nguồn, chọn ngữ cảnh, có hội thoại)

Tác vụ: "Tôi muốn một câu trả lời toàn diện"
→ Dùng: Tìm kiếm / Hỏi (hệ thống tìm nội dung liên quan)

Tác vụ: "Tôi muốn trích xuất cùng thông tin từ nhiều nguồn"
→ Dùng: Biến đổi (định nghĩa mẫu, áp dụng cho tất cả)

Tác vụ: "Tôi muốn tóm tắt tất cả nguồn"
→ Dùng: Biến đổi (với mẫu tóm tắt tích hợp)

Tác vụ: "Tôi muốn chia sẻ nghiên cứu dưới dạng âm thanh"
→ Dùng: Podcast (tạo người nói, tạo tập)

Tác vụ: "Tôi muốn tìm câu trích dẫn tôi nhớ"
→ Dùng: Tìm kiếm / Tìm kiếm Văn bản (so khớp từ khóa)

Tác vụ: "Tôi đang khám phá khái niệm mà không biết từ chính xác"
→ Dùng: Tìm kiếm / Tìm kiếm Vector (tương tự ngữ nghĩa)

Tác vụ: "Tôi cần thêm hoặc thay đổi khóa API nhà cung cấp AI"
→ Dùng: Cài đặt / Khóa API (cấu hình nhà cung cấp không cần chỉnh sửa file)
```

---

## Checklist Bắt Đầu Nhanh: 15 Phút Đầu

**Bước 1: Tạo Notebook (1 phút)**
- Tên: Điều gì đó mô tả ("Nghiên Cứu Thị Trường Q1", "Bài Báo An Toàn AI", v.v.)
- Mô tả: 1-2 câu về bạn đang nghiên cứu gì
- Đây là container nghiên cứu của bạn

**Bước 2: Thêm Nguồn Đầu Tiên (3 phút)**
- Chọn một: PDF, liên kết web, hoặc văn bản
- Theo dõi [Thêm Nguồn](adding-sources.md)
- Chờ xử lý (thường 30-60 giây)

**Bước 3: Chat Về Nó (3 phút)**
- Vào Chat
- Chọn nguồn (đặt ngữ cảnh là "Nội dung đầy đủ")
- Đặt câu hỏi đơn giản: "Các điểm chính là gì?"
- Xem AI trả lời với trích dẫn

**Bước 4: Lưu Thông Tin Chi Tiết Thành Ghi Chú (2 phút)**
- Phản hồi tốt? Nhấn "Lưu thành ghi chú"
- Đặt tên hữu ích ("Điểm chính từ nguồn X")
- Bây giờ bạn có thông tin chi tiết đã lưu

**Bước 5: Khám Phá Thêm (6 phút)**
- Thêm nguồn khác
- Chat về cả hai cùng nhau
- Đặt câu hỏi so sánh chúng
- Theo dõi với câu hỏi làm rõ

**Xong!** Bạn đã sử dụng quy trình cốt lõi: notebook → nguồn → chat → ghi chú

---

## Lỗi Thường Gặp Cần Tránh

| Lỗi | Vấn đề | Cách sửa |
|-----|---------|----------|
| Thêm mọi thứ vào một notebook | Không cách ly giữa các dự án | Tạo notebook riêng cho các chủ đề khác nhau |
| Mong AI biết ngữ cảnh bạn | Câu hỏi nhận câu trả lời chung chung | Mô tả trọng tâm nghiên cứu trong ngữ cảnh chat |
| Quên trích dẫn nguồn | Không thể xác minh khẳng định | Nhấp vào trích dẫn để kiểm tra đoạn nguồn |
| Dùng Chat cho câu hỏi một lần | Chậm hơn Hỏi | Dùng Hỏi cho Q&A toàn diện, Chat cho khám phá |
| Thêm PDF lớn không chia đoạn | Xử lý chậm, tìm kiếm kém | Chia thành nhiều nguồn nhỏ hơn nếu có thể |
| Dùng cùng ngữ cảnh cho tất cả chat | Tốn kém, không tập trung | Điều chỉnh mức ngữ cảnh cho mỗi chat |
| Bỏ qua tìm kiếm vector | Chỉ tìm từ khóa chính xác | Dùng tìm kiếm vector để khám phá về khái niệm |

---

## Bước Tiếp Theo

1. **Theo dõi mỗi hướng dẫn** theo thứ tự (nguồn → ghi chú → chat → podcast → tìm kiếm)
2. **Tạo notebook đầu tiên** với nội dung thực
3. **Thực hành mỗi tính năng** với nghiên cứu của bạn
4. **Quay lại KHÁI-NIỆM-CƠ-BẢN** nếu bạn cần hiểu "tại sao"

---

## Nhận Trợ Giúp

- **Tính năng không hoạt động?** → Kiểm tra hướng dẫn tính năng (tìm phần "Khắc phục sự cố")
- **Thông báo lỗi?** → Kiểm tra [6-KHẮC-PHỤC-SỰ-CỐ](../6-TROUBLESHOOTING/index.md)
- **Hiểu cách hoạt động?** → Kiểm tra [2-KHÁI-NIỆM-CƠ-BẢN](../2-CORE-CONCEPTS/index.md)
- **Cài đặt lần đầu?** → Quay lại [1-CÀI-ĐẶT](../1-INSTALLATION/index.md)
- **Cho nhà phát triển** → Xem [7-PHÁT-TRIỂN](../7-DEVELOPMENT/index.md)

---

**Sẵn sàng bắt đầu?** Chọn hướng dẫn cho điều bạn muốn làm đầu tiên!
