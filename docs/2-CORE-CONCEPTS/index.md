# Khái Niệm Cơ Bản - Hiểu Mô Hình Tư Duy

Trước khi tìm hiểu cách sử dụng Open Notebook, điều quan trọng là hiểu **cách nó hoạt động**. Các khái niệm cơ bản này giải thích "tại sao" đằng sau thiết kế.

## Năm Mô Hình Tư Duy

### 1. [Notebook, Nguồn và Ghi Chú](notebooks-sources-notes.md)
Cách Open Notebook tổ chức nghiên cứu của bạn. Hiểu cấu trúc container ba tầng và cách thông tin chảy từ nguyên liệu thô đến thông tin chi tiết hoàn chỉnh.

**Ý tưởng chính**: Notebook là container nghiên cứu có phạm vi. Nguồn là đầu vào (PDF, URL, v.v.). Ghi chú là đầu ra (thông tin chi tiết, tóm tắt do AI tạo, phản hồi đã lưu).

---

### 2. [Ngữ Cảnh AI & RAG](ai-context-rag.md)
Cách Open Notebook giúp AI nhận biết nghiên cứu của bạn - hai phương pháp khác nhau.

**Ý tưởng chính**: **Chat** gửi toàn bộ nguồn đã chọn tới LLM (ngữ cảnh đầy đủ, hội thoại). **Hỏi** sử dụng RAG (truy xuất tăng cường sinh) để tự động tìm kiếm và lấy chỉ các đoạn liên quan. Công cụ khác nhau cho nhu cầu khác nhau.

---

### 3. [Chat vs. Biến Đổi](chat-vs-transformations.md)
Tại sao Open Notebook có các chế độ tương tác khác nhau và khi nào nên dùng.

**Ý tưởng chính**: Chat là khám phá hội thoại (bạn kiểm soát ngữ cảnh). Biến đổi là trích xuất thông tin chi tiết. Chúng thu gọn nội dung thành các bit thông tin tập trung/đậm đặc hơn, phù hợp hơn nhiều cho AI sử dụng.

---

### 4. [Quản Lý Ngữ Cảnh](chat-vs-transformations.md#context-management-the-control-panel)
Bảng điều khiển quyền riêng tư và chi phí của bạn. Quyết định dữ liệu nào thực sự đến AI.

**Ý tưởng chính**: Bạn chọn ba mức—không trong ngữ cảnh (riêng tư), chỉ tóm tắt (thu gọn), hoặc nội dung đầy đủ (truy cập hoàn toàn). Điều này cho bạn kiểm soát chi tiết.

---

### 5. [Giải Thích Podcast](podcasts-explained.md)
Tại sao Open Notebook có thể biến nghiên cứu thành âm thanh và tại sao điều này quan trọng.

**Ý tưởng chính**: Podcast biến nghiên cứu thành định dạng tiêu thụ khác. Thay vì đọc, ai đó có thể nghe và hấp thụ thông tin chi tiết một cách thụ động.

---

## Đọc Phần Này Nếu:

- **Bạn mới dùng Open Notebook** — Bắt đầu ở đây để hiểu cách hệ thống hoạt động trước khi học các tính năng
- **Bạn bối rối về Chat vs Hỏi** — Phần 2 giải thích sự khác biệt (nội dung đầy đủ vs RAG)
- **Bạn thắc mắc khi nào dùng Chat vs Biến Đổi** — Phần 3 làm rõ sự khác biệt
- **Bạn muốn hiểu kiểm soát quyền riêng tư** — Phần 4 cho bạn thấy những gì bạn có thể kiểm soát
- **Bạn tò mò về podcast** — Phần 5 giải thích kiến trúc và tại sao nó khác với đối thủ

---

## Bức Tranh Tổng Thể

Open Notebook được xây dựng trên một ý tưởng đơn giản: **Nghiên cứu của bạn xứng đáng thuộc về bạn**.

Điều đó có nghĩa:
- **Riêng tư theo mặc định** — Dữ liệu không rời hạ tầng trừ khi bạn chọn rõ ràng
- **AI là công cụ, không phải người gác cổng** — Bạn quyết định nguồn nào AI thấy, không phải AI quyết định cho bạn
- **Tiêu thụ linh hoạt** — Đọc, nghe, tìm kiếm, chat, hoặc biến đổi nghiên cứu theo cách hợp lý

Các khái niệm cơ bản này giải thích cách hoạt động.

---

## Bước Tiếp Theo

1. **Chỉ muốn sử dụng?** → Đi tới [Hướng Dẫn Sử Dụng](../3-USER-GUIDE/index.md)
2. **Muốn hiểu trước?** → Đọc 5 phần ở trên (15 phút)
3. **Cài đặt lần đầu?** → Đi tới [Cài Đặt](../1-INSTALLATION/index.md)
