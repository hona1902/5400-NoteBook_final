# Hướng Dẫn Cài Đặt

Chọn lộ trình cài đặt dựa trên cài đặt và trường hợp sử dụng của bạn.

## Quyết Định Nhanh: Lộ Trình Nào?

### 🚀 Tôi muốn cài đặt dễ nhất (Khuyến nghị cho hầu hết)
**→ [Docker Compose](docker-compose.md)** - Cài đặt nhiều container, sẵn sàng production
- ✅ Tất cả tính năng hoạt động
- ✅ Phân tách dịch vụ rõ ràng
- ✅ Dễ mở rộng
- ✅ Hoạt động trên Mac, Windows, Linux
- ⏱️ 5 phút để chạy

---

### 🏠 Tôi muốn mọi thứ trong một container (Đơn giản hóa)
**→ [Container Đơn](single-container.md)** - Tất cả trong một cho triển khai đơn giản
- ✅ Cấu hình tối thiểu
- ✅ Sử dụng tài nguyên thấp hơn
- ✅ Tốt cho hosting chia sẻ
- ✅ Hoạt động trên PikaPods, Railway, v.v.
- ⏱️ 3 phút để chạy

---

### 👨‍💻 Tôi muốn phát triển/đóng góp (Chỉ dành cho nhà phát triển)
**→ [Từ Mã Nguồn](from-source.md)** - Clone repo, cài đặt cục bộ
- ✅ Kiểm soát hoàn toàn mã nguồn
- ✅ Dễ debug
- ✅ Có thể sửa đổi và kiểm thử
- ⚠️ Yêu cầu Python 3.11+, Node.js
- ⏱️ 10 phút để chạy

---


## Yêu Cầu Hệ Thống

### Tối thiểu
- **RAM**: 4GB
- **Lưu trữ**: 2GB cho ứng dụng + dung lượng cho tài liệu
- **CPU**: Bất kỳ bộ xử lý hiện đại
- **Mạng**: Internet (tùy chọn cho cài đặt ngoại tuyến)

### Khuyến nghị
- **RAM**: 8GB+
- **Lưu trữ**: 10GB+ cho tài liệu và mô hình
- **CPU**: Bộ xử lý đa nhân
- **GPU**: Tùy chọn (tăng tốc mô hình AI cục bộ)

---

## Tùy Chọn Nhà Cung Cấp AI

### Đám Mây (Trả theo sử dụng)
- **OpenAI** - GPT-4, GPT-4o, nhanh và mạnh
- **Anthropic (Claude)** - Claude 3.5 Sonnet, suy luận xuất sắc
- **Google Gemini** - Đa phương thức, tiết kiệm chi phí
- **Groq** - Suy luận siêu nhanh
- **Khác**: Mistral, DeepSeek, xAI, OpenRouter

**Chi phí**: Thường $0.01-$0.10 mỗi 1K token
**Tốc độ**: Nhanh (dưới 1 giây)
**Quyền riêng tư**: Dữ liệu được gửi lên đám mây

### Cục Bộ (Miễn phí, Riêng tư)
- **Ollama** - Chạy mô hình mã nguồn mở cục bộ
- **LM Studio** - Ứng dụng desktop cho mô hình cục bộ
- **Mô hình Hugging Face** - Tải và chạy

**Chi phí**: $0 (chỉ tốn điện)
**Tốc độ**: Phụ thuộc phần cứng (chậm đến trung bình)
**Quyền riêng tư**: 100% ngoại tuyến

---

## Chọn Lộ Trình

**Đã biết muốn đi hướng nào?** Chọn đường cài đặt:

- [Docker Compose](docker-compose.md) - **Hầu hết người dùng**
- [Container Đơn](single-container.md) - **Hosting chia sẻ**
- [Từ Mã Nguồn](from-source.md) - **Nhà phát triển**

> **Ưu tiên quyền riêng tư?** Bất kỳ phương pháp cài đặt nào đều hoạt động với Ollama cho AI cục bộ 100%. Xem [Hướng Dẫn Nhanh Cục Bộ](../0-START-HERE/quick-start-local.md).

---

## Danh Sách Kiểm Tra Trước Cài Đặt

Trước khi cài đặt, bạn cần:

- [ ] **Docker** (cho lộ trình Docker) hoặc **Node.js 18+** (cho mã nguồn)
- [ ] **Khóa API nhà cung cấp AI** (OpenAI, Anthropic, v.v.) HOẶC sẵn sàng sử dụng mô hình cục bộ miễn phí
- [ ] **Ít nhất 4GB RAM** khả dụng
- [ ] **Internet ổn định** (hoặc cài đặt ngoại tuyến với Ollama)

---

## Hướng Dẫn Cài Đặt Chi Tiết

### Cho Người Dùng Docker
1. Cài đặt [Docker Desktop](https://docker.com/products/docker-desktop)
2. Chọn: [Docker Compose](docker-compose.md) hoặc [Container Đơn](single-container.md)
3. Theo dõi hướng dẫn từng bước
4. Truy cập tại `http://localhost:8502`

### Cài Đặt Từ Mã Nguồn (Nhà Phát Triển)
1. Cần Python 3.11+, Node.js 18+, Git đã cài đặt
2. Theo dõi [Từ Mã Nguồn](from-source.md)
3. Chạy `make start-all`
4. Truy cập tại `http://localhost:8502` (frontend) hoặc `http://localhost:5055` (API)

---

## Sau Khi Cài Đặt

Khi đã chạy:

1. **Cấu Hình Mô Hình** - Chọn nhà cung cấp AI trong Cài đặt
2. **Tạo Notebook Đầu Tiên** - Bắt đầu tổ chức nghiên cứu
3. **Thêm Nguồn** - PDF, liên kết web, tài liệu
4. **Khám Phá Tính Năng** - Chat, tìm kiếm, biến đổi
5. **Đọc Hướng Dẫn Đầy Đủ** - [Hướng Dẫn Sử Dụng](../3-USER-GUIDE/index.md)

---

## Khắc Phục Sự Cố Khi Cài Đặt

**Gặp vấn đề?** Kiểm tra phần khắc phục sự cố trong hướng dẫn cài đặt bạn đã chọn, hoặc xem [Sửa Nhanh](../6-TROUBLESHOOTING/quick-fixes.md).

---

## Cần Trợ Giúp?

- **Discord**: [Tham gia cộng đồng](https://discord.gg/37XJPXfz2w)
- **GitHub Issues**: [Báo cáo vấn đề](https://github.com/hona1902/5400-NoteBook_final/issues)
- **Tài liệu**: Xem [Tài Liệu Đầy Đủ](../index.md)

---

## Triển Khai Production

Cài đặt cho sử dụng production? Xem thêm:

- [Tăng Cường Bảo Mật](../5-CONFIGURATION/security.md)
- [Cài Đặt Reverse Proxy](../5-CONFIGURATION/reverse-proxy.md)
- [Tinh Chỉnh Hiệu Suất](../5-CONFIGURATION/advanced.md)

---

**Sẵn sàng cài đặt?** Chọn lộ trình ở trên! ⬆️
