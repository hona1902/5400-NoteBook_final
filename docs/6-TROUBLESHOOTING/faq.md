# Câu hỏi thường gặp

Các câu hỏi thường gặp về cách sử dụng, cấu hình và cách thực hành tốt nhất của Open Notebook.

---

## Cách sử dụng chung

### Sổ ghi chép mở là gì?

Open Notebook là một giải pháp thay thế tập trung vào quyền riêng tư, mã nguồn mở cho Notebook LM của Google. Nó cho phép bạn:
- Tạo và quản lý sổ ghi chép nghiên cứu
- Trò chuyện với tài liệu của bạn bằng AI
- Tạo podcast từ nội dung của bạn
- Tìm kiếm trên tất cả các nguồn của bạn bằng tìm kiếm ngữ nghĩa
- Chuyển đổi và phân tích nội dung của bạn

### Nó khác với Google Notebook LM như thế nào?

**Quyền riêng tư**: Theo mặc định, dữ liệu của bạn vẫn cục bộ. Chỉ các nhà cung cấp AI đã chọn của bạn mới nhận được truy vấn.
**Tính linh hoạt**: Hỗ trợ cho hơn 15 nhà cung cấp AI (OpenAI, Anthropic, Google, mô hình địa phương, v.v.)
**Tùy chỉnh**: Mã nguồn mở, do đó bạn có thể sửa đổi và mở rộng chức năng
**Kiểm soát**: Bạn kiểm soát dữ liệu, mô hình và quá trình xử lý của mình

### Tôi có thể sử dụng Open Notebook ngoại tuyến không?

**Một phần**: Ứng dụng chạy cục bộ nhưng cần có internet để:
- Lệnh gọi API mô hình AI (trừ khi sử dụng các mô hình cục bộ như Ollama)
- Quét nội dung web

**Hoàn toàn ngoại tuyến**: Có thể thực hiện được với các mô hình cục bộ (Ollama) cho chức năng cơ bản.

### Loại tệp nào được hỗ trợ?

**Tài liệu**: PDF, DOCX, TXT, Markdown
**Nội dung web**: URL, video YouTube
**Phương tiện**: MP3, WAV, M4A (âm thanh), MP4, AVI, MOV (video)
**Khác**: Nhập văn bản trực tiếp, CSV, tệp mã

###Nó có giá bao nhiêu?

**Phần mềm**: Miễn phí (mã nguồn mở)
**Chi phí API AI**: Trả tiền cho mỗi lần sử dụng cho nhà cung cấp:
- OpenAI: ~0,50-5 USD cho mỗi 1 triệu token
- Nhân loại: ~$3-75 cho mỗi 1M token
- Google: Thường có sẵn cấp miễn phí
- Model cục bộ: Miễn phí sau khi thiết lập ban đầu

**Chi phí thông thường hàng tháng**: $5-50 nếu sử dụng vừa phải.

---

## Nhà cung cấp và mô hình AI

### Tôi nên chọn nhà cung cấp AI nào?

**Dành cho người mới bắt đầu**: OpenAI (đáng tin cậy, được ghi chép đầy đủ)
**Vì quyền riêng tư**: Các mô hình địa phương (Ollama) hoặc các nhà cung cấp Châu Âu (Mistral)
**Để tối ưu hóa chi phí**: Groq, Google (cấp miễn phí) hoặc OpenRouter
**Đối với ngữ cảnh dài**: Anthropic (200 nghìn mã thông báo) hoặc Google Gemini (1 triệu mã thông báo)

### Tôi có thể sử dụng nhiều nhà cung cấp không?

**Có**: Định cấu hình các nhà cung cấp khác nhau cho các nhiệm vụ khác nhau:
- OpenAI để trò chuyện
- Google để nhúng
- ElevenLabs để chuyển văn bản thành giọng nói
- Nhân chủng học cho lý luận phức tạp

### Sự kết hợp mô hình tốt nhất là gì?

**Thân thiện với ngân sách**:
- Ngôn ngữ: `gpt-4o-mini` (OpenAI) hoặc `deepseek-chat`
- Nhúng: `văn bản-nhúng-3-small` (OpenAI)

**Chất lượng cao**:
- Ngôn ngữ: `claude-3-5-sonnet` (Nhân chủng học) hoặc `gpt-4o` (OpenAI)
- Nhúng: `văn bản-nhúng-3-large` (OpenAI)

**Tập trung vào quyền riêng tư**:
- Ngôn ngữ: Mô hình Ollama địa phương (mistral, llama3)
- Nhúng: Mô hình nhúng cục bộ

### Làm cách nào để tối ưu hóa chi phí AI?

**Lựa chọn mẫu**:
- Sử dụng các mô hình nhỏ hơn cho các tác vụ đơn giản (gpt-4o-mini, claude-3-5-haiku)
- Chỉ sử dụng các mô hình lớn hơn cho các lý luận phức tạp
- Tận dụng các bậc miễn phí khi có sẵn

**Tối ưu hóa việc sử dụng**:
- Sử dụng ngữ cảnh "Chỉ tóm tắt" cho các nguồn nền
- Đặt câu hỏi cụ thể hơn
- Sử dụng mô hình cục bộ (Ollama) cho các công việc thường xuyên

---

## Quản lý dữ liệu

### Dữ liệu của tôi được lưu trữ ở đâu?

**Bộ nhớ cục bộ**: Theo mặc định, tất cả dữ liệu được lưu trữ cục bộ:
- Cơ sở dữ liệu: File SurrealDB dạng `surreal_data/`
- Uploads: Các tập tin trong `data/uploads/`
- Podcasts: Âm thanh được tạo trong `data/podcasts/`
- Không truyền dữ liệu bên ngoài (ngoại trừ các nhà cung cấp AI được chọn)

### Làm cách nào để sao lưu dữ liệu của tôi?



```bash
# Create backup
tar -czf backup-$(date +%Y%m%d).tar.gz data/ surreal_data/

# Restore backup
tar -xzf backup-20240101.tar.gz
```



### Tôi có thể đồng bộ dữ liệu giữa các thiết bị không?

**Hiện tại**: Không có chức năng đồng bộ hóa tích hợp.
**Giải pháp**:
- Sử dụng bộ nhớ mạng chia sẻ cho các thư mục dữ liệu
- Sao lưu/khôi phục thủ công giữa các thiết bị

### Điều gì xảy ra nếu tôi xóa sổ ghi chép?

**Xóa mềm**: Sổ ghi chép được đánh dấu là đã lưu trữ, không bị xóa vĩnh viễn.
**Phục hồi**: Có thể khôi phục sổ ghi chép đã lưu trữ từ cơ sở dữ liệu.

---

## Các phương pháp hay nhất

### Tôi nên sắp xếp sổ ghi chép của mình như thế nào?

- **Theo chủ đề**: Sổ ghi chép riêng biệt cho các lĩnh vực nghiên cứu khác nhau
- **Theo dự án**: Một sổ tay cho mỗi dự án hoặc khóa học
- **Theo khoảng thời gian**: Sổ ghi chép hàng tháng hoặc hàng quý

**Kích thước được đề xuất**: 20-100 nguồn trên mỗi sổ ghi chép để có hiệu suất tốt nhất.

### Làm cách nào để có được kết quả tìm kiếm tốt nhất?

- Sử dụng các truy vấn mô tả ("phương pháp phân tích dữ liệu" chứ không chỉ "dữ liệu")
- Kết hợp nhiều thuật ngữ liên quan
- Sử dụng ngôn ngữ tự nhiên (đặt câu hỏi như cách bạn hỏi con người)
- Thử cả tìm kiếm văn bản (từ khóa) và tìm kiếm vector (khái niệm)

### Làm cách nào để cải thiện phản hồi trò chuyện?

- Cung cấp ngữ cảnh: Tham khảo các nguồn hoặc chủ đề cụ thể
- Hãy cụ thể: Đặt câu hỏi chi tiết hơn là những câu hỏi chung chung
- Yêu cầu trích dẫn: “Trả lời bằng trích dẫn trang”
- Sử dụng câu hỏi tiếp theo: Dựa trên những câu trả lời trước đó

### Các biện pháp bảo mật tốt nhất là gì?

- Không bao giờ chia sẻ khóa API một cách công khai
- Sử dụng `OPEN_NOTEBOOK_PASSWORD` để triển khai công khai
- Sử dụng HTTPS để sản xuất (thông qua proxy ngược)
- Luôn cập nhật hình ảnh Docker
- Mã hóa các bản sao lưu nếu chúng chứa dữ liệu nhạy cảm

---

## Câu hỏi kỹ thuật

### Tôi có thể sử dụng Open Notebook theo chương trình không?

**Có**: Open Notebook cung cấp API REST:
- Tài liệu API đầy đủ tại `http://localhost:5055/docs`
- Hỗ trợ tất cả các chức năng UI
- Xác thực thông qua tiêu đề mật khẩu

### Tôi có thể chạy Open Notebook trong sản xuất không?

**Có**: Được thiết kế để sử dụng trong sản xuất với:
- Triển khai Docker
- Tính năng bảo mật (bảo vệ bằng mật khẩu)
- Giám sát và ghi nhật ký
- Hỗ trợ proxy ngược (nginx, Caddy, Traefik)

### Yêu cầu hệ thống là gì?

**Tối thiểu**:
-RAM 4GB
- 2 lõi CPU
- Dung lượng đĩa 10GB

**Khuyến nghị**:
-RAM 8GB+
- 4+ lõi CPU
- Lưu trữ SSD
- Đối với các model cục bộ: 16GB+ RAM, khuyến nghị GPU

---

## Thời gian chờ và hiệu suất

### Tại sao tôi gặp lỗi hết thời gian chờ?

**Các nguyên nhân thường gặp**:
- Bối cảnh lớn (quá nhiều nguồn)
- Nhà cung cấp AI chậm
- Mô hình cục bộ trên CPU (chậm)
- Yêu cầu đầu tiên (tải mô hình)

**Giải pháp**:

```bash
# In .env:
API_CLIENT_TIMEOUT=600  # 10 minutes for slow setups
ESPERANTO_LLM_TIMEOUT=180  # 3 minutes for model inference
```



### Thời gian chờ được đề xuất theo thiết lập:

| Thiết lập | API_CLIENT_TIMEOUT |
|-------|-------------------|
| API đám mây (OpenAI, Anthropic) | 300 (mặc định) |
| Ollama địa phương có GPU | 600 |
| Ollama cục bộ với CPU | 1200 |
| Studio LM từ xa | 900 |

---

## Nhận trợ giúp

### Câu hỏi của tôi không được trả lời ở đây

1. Xem hướng dẫn khắc phục sự cố trong phần này
2. Tìm kiếm các vấn đề GitHub hiện có
3. Hỏi cộng đồng Discord
4. Tạo vấn đề GitHub với thông tin chi tiết

### Làm cách nào để báo cáo lỗi?

Bao gồm:
- Các bước tái hiện
- Hành vi dự kiến và hành vi thực tế
- Thông báo lỗi và nhật ký
- Thông tin hệ thống
- Chi tiết cấu hình (không có khóa API)

Gửi tới: [Vấn đề về GitHub](https://github.com/lfnovo/open-notebook/issues)

### Tôi có thể nhận trợ giúp ở đâu?

- **Discord**: https://discord.gg/37XJPXfz2w (nhanh nhất)
- **Vấn đề về GitHub**: Báo cáo lỗi và yêu cầu tính năng
- **Tài liệu**: Trang tài liệu này

---

## Có liên quan

- [Khắc phục nhanh](quick-fixes.md) - Các sự cố thường gặp với giải pháp trong 1 phút
- [Sự cố về AI & Trò chuyện](ai-chat-issues.md) - Sự cố về mô hình và trò chuyện
- [Sự cố kết nối](connection-issues.md) - Sự cố mạng và API