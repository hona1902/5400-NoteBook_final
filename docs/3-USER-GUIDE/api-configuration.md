# Cấu Hình API

Cấu hình credential nhà cung cấp AI qua giao diện Cài đặt. Không cần chỉnh sửa file.

> **Hệ thống Credential**: Open Notebook sử dụng credential được mã hóa lưu trong cơ sở dữ liệu. Mỗi credential kết nối đến nhà cung cấp và cho phép bạn khám phá, đăng ký và kiểm tra mô hình.

---

## Tổng Quan

Open Notebook quản lý truy cập nhà cung cấp AI qua **hệ thống dựa trên credential**:

1. Bạn tạo **credential** cho mỗi nhà cung cấp (khóa API + cài đặt)
2. Credential được **mã hóa** và lưu trong cơ sở dữ liệu
3. Bạn **kiểm tra kết nối** để xác minh credential hoạt động
4. Bạn **khám phá và đăng ký mô hình** từ mỗi credential
5. Mô hình được liên kết với credential để cấu hình trực tiếp

---

## Cài Đặt Mã Hóa

Trước khi lưu credential, bạn phải cấu hình khóa mã hóa.

### Đặt Khóa Mã Hóa

Thêm `OPEN_NOTEBOOK_ENCRYPTION_KEY` vào docker-compose.yml:

```yaml
environment:
  - OPEN_NOTEBOOK_ENCRYPTION_KEY=chuoi-bi-mat-cua-toi
```

Bất kỳ chuỗi nào cũng hoạt động như khóa — nó sẽ được dẫn xuất an toàn qua SHA-256 nội bộ.

> **Cảnh báo**: Nếu bạn thay đổi hoặc mất khóa mã hóa, **tất cả credential đã lưu sẽ không đọc được**. Sao lưu khóa mã hóa an toàn và riêng biệt với bản sao lưu cơ sở dữ liệu.

### Hỗ Trợ Docker Secrets

Cả mật khẩu và khóa mã hóa đều hỗ trợ Docker secrets:

```yaml
# docker-compose.yml
services:
  open_notebook:
    environment:
      - OPEN_NOTEBOOK_PASSWORD_FILE=/run/secrets/app_password
      - OPEN_NOTEBOOK_ENCRYPTION_KEY_FILE=/run/secrets/encryption_key
    secrets:
      - app_password
      - encryption_key

secrets:
  app_password:
    file: ./secrets/password.txt
  encryption_key:
    file: ./secrets/encryption_key.txt
```

### Chi Tiết Mã Hóa

Khóa API lưu trong cơ sở dữ liệu được mã hóa bằng Fernet (AES-128-CBC + HMAC-SHA256).

| Cấu hình | Hành vi |
|----------|---------|
| Khóa mã hóa được đặt | Khóa được mã hóa với khóa của bạn |
| Không có khóa mã hóa | Lưu credential bị tắt |

---

## Truy Cập Cấu Hình Credential

1. Nhấn **Cài đặt** trong thanh điều hướng
2. Chọn tab **Khóa API**
3. Bạn sẽ thấy credential hiện có và nút **Thêm Credential**

```
Điều hướng: Cài đặt → Khóa API
```

---

## Nhà Cung Cấp Được Hỗ Trợ

### Nhà Cung Cấp Đám Mây

| Nhà cung cấp | Trường bắt buộc | Trường tùy chọn |
|--------------|----------------|-----------------|
| OpenAI | Khóa API | — |
| Anthropic | Khóa API | — |
| Google Gemini | Khóa API | — |
| Groq | Khóa API | — |
| Mistral | Khóa API | — |
| DeepSeek | Khóa API | — |
| xAI | Khóa API | — |
| OpenRouter | Khóa API | — |
| Voyage AI | Khóa API | — |
| ElevenLabs | Khóa API | — |

### Cục Bộ/Tự Host

| Nhà cung cấp | Trường bắt buộc | Ghi chú |
|--------------|----------------|---------|
| Ollama | URL cơ sở | Thường `http://localhost:11434` hoặc `http://ollama:11434` |

### Doanh Nghiệp

| Nhà cung cấp | Trường bắt buộc | Trường tùy chọn |
|--------------|----------------|-----------------|
| Azure OpenAI | Khóa API, Endpoint, Phiên bản API | Endpoint theo dịch vụ (LLM, Embedding, STT, TTS) |
| Tương thích OpenAI | URL cơ sở | Khóa API, Cấu hình theo dịch vụ |
| Vertex AI | ID Dự án, Vị trí, Đường dẫn Credentials | — |

---

## Tạo Credential

### Bước 1: Thêm Credential

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm Credential**
3. Chọn nhà cung cấp
4. Đặt tên mô tả (ví dụ: "Khóa OpenAI Của Tôi", "Anthropic Công Việc")
5. Điền các trường bắt buộc (khóa API, URL cơ sở, v.v.)
6. Nhấn **Lưu**

### Bước 2: Kiểm Tra Kết Nối

1. Trên thẻ credential mới, nhấn **Kiểm Tra Kết Nối**
2. Chờ kết quả:

| Kết quả | Ý nghĩa |
|---------|---------|
| Thành công | Khóa hợp lệ, nhà cung cấp có thể truy cập |
| Khóa API không hợp lệ | Kiểm tra định dạng và giá trị khóa |
| Kết nối thất bại | Kiểm tra URL, mạng, tường lửa |

### Bước 3: Khám Phá Mô Hình

1. Nhấn **Khám Phá Mô Hình** trên thẻ credential
2. Hệ thống truy vấn nhà cung cấp để lấy danh sách mô hình
3. Xem lại các mô hình được tìm thấy

### Bước 4: Đăng Ký Mô Hình

1. Chọn các mô hình bạn muốn sử dụng
2. Nhấn **Đăng Ký Mô Hình**
3. Mô hình giờ có thể dùng trong toàn bộ Open Notebook

---

## Hỗ Trợ Nhiều Credential

Mỗi nhà cung cấp có thể có **nhiều credential**. Hữu ích khi:
- Bạn có khóa API khác nhau cho các dự án khác nhau
- Bạn muốn kiểm tra với các endpoint khác nhau
- Nhiều thành viên nhóm cần credential riêng biệt

### Tạo Nhiều Credential

1. Nhấn **Thêm Credential** lại
2. Chọn cùng nhà cung cấp
3. Điền credential khác
4. Mỗi credential có thể khám phá và đăng ký mô hình riêng

### Cách Mô Hình Liên Kết Với Credential

Khi bạn đăng ký mô hình từ credential, mô hình đó được liên kết với credential cụ thể đó. Điều này có nghĩa là:
- Mỗi mô hình biết dùng khóa API nào
- Bạn có thể có mô hình từ credential khác nhau cho cùng nhà cung cấp
- Xóa credential sẽ xóa mô hình liên kết

---

## Kiểm Tra Kết Nối

Nhấn **Kiểm Tra Kết Nối** để xác minh credential:

| Kết quả | Ý nghĩa |
|---------|---------|
| Thành công | Khóa hợp lệ, nhà cung cấp có thể truy cập |
| Khóa API không hợp lệ | Kiểm tra định dạng và giá trị khóa |
| Kết nối thất bại | Kiểm tra URL, mạng, tường lửa |
| Mô hình không có | Khóa hợp lệ nhưng quyền truy cập mô hình bị hạn chế |

Kiểm tra dùng mô hình rẻ (ví dụ: `gpt-3.5-turbo`, `claude-3-haiku`) để giảm chi phí.

---

## Cấu Hình Nhà Cung Cấp Cụ Thể

### Nhà Cung Cấp Đơn Giản (Chỉ Khóa API)

Cho OpenAI, Anthropic, Google, Groq, Mistral, DeepSeek, xAI, OpenRouter:

1. Thêm credential với khóa API
2. Kiểm tra kết nối
3. Khám phá và đăng ký mô hình

### Ollama (Dựa Trên URL)

1. Thêm credential với nhà cung cấp **Ollama**
2. Nhập URL cơ sở (ví dụ: `http://ollama:11434`)
3. Kiểm tra kết nối
4. Khám phá và đăng ký mô hình

Ollama cho phép localhost và IP riêng vì chạy cục bộ.

### Azure OpenAI

Azure yêu cầu nhiều trường:

| Trường | Ví dụ | Bắt buộc |
|--------|--------|----------|
| Khóa API | `abc123...` | Có |
| Endpoint | `https://myresource.openai.azure.com` | Có |
| Phiên bản API | `2024-02-15-preview` | Có |
| LLM Endpoint | `https://myresource-llm.openai.azure.com` | Không |
| Embedding Endpoint | `https://myresource-embed.openai.azure.com` | Không |

Endpoint theo dịch vụ ghi đè endpoint chính cho loại dịch vụ đó.

### Tương Thích OpenAI

Cho server tùy chỉnh tương thích OpenAI (LM Studio, vLLM, v.v.):

1. Thêm credential với nhà cung cấp **Tương Thích OpenAI**
2. Nhập URL cơ sở
3. Nhập khóa API (nếu cần)
4. Tùy chọn cấu hình URL theo dịch vụ

Hỗ trợ cấu hình riêng cho:
- LLM (mô hình ngôn ngữ)
- Embedding
- STT (speech-to-text)
- TTS (text-to-speech)

### Vertex AI

Nền tảng AI doanh nghiệp của Google Cloud:

| Trường | Ví dụ |
|--------|--------|
| ID Dự án | `my-gcp-project` |
| Vị trí | `us-central1` |
| Đường dẫn Credentials | `/path/to/service-account.json` |

---

## Di Chuyển Từ Biến Môi Trường

Nếu bạn có khóa API trong biến môi trường (từ phiên bản trước):

1. Mở **Cài đặt → Khóa API**
2. Một banner xuất hiện: "Phát hiện biến môi trường"
3. Nhấn **Chuyển sang Cơ Sở Dữ Liệu**
4. Khóa được sao chép vào cơ sở dữ liệu (được mã hóa)
5. Biến môi trường gốc vẫn không thay đổi

### Hành Vi Di Chuyển

| Tình huống | Hành động |
|-----------|-----------|
| Khóa chỉ trong env | Di chuyển vào cơ sở dữ liệu |
| Khóa chỉ trong cơ sở dữ liệu | Không thay đổi |
| Khóa trong cả hai | Phiên bản cơ sở dữ liệu được giữ (bỏ qua) |

### Sau Khi Di Chuyển

- Credential cơ sở dữ liệu được dùng cho tất cả hoạt động
- Bạn có thể xóa biến môi trường khóa API khỏi docker-compose.yml
- Giữ `OPEN_NOTEBOOK_ENCRYPTION_KEY` — vẫn còn cần thiết

---

## Bảo Mật Lưu Trữ Khóa

### Mã Hóa

Khóa API lưu trong cơ sở dữ liệu được mã hóa bằng Fernet (AES-128-CBC + HMAC-SHA256).

| Cấu hình | Hành vi |
|----------|---------|
| Khóa mã hóa được đặt | Khóa được mã hóa với khóa của bạn |
| Không có khóa mã hóa | Lưu khóa API trong cơ sở dữ liệu bị tắt |

### Credential Mặc Định

| Cài đặt | Giá trị mặc định | Khuyến nghị production |
|---------|-----------------|----------------------|
| Mật khẩu | `open-notebook-change-me` | Đặt `OPEN_NOTEBOOK_PASSWORD` |
| Khóa mã hóa | Không có (phải đặt) | Đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY` thành bất kỳ chuỗi bí mật nào |

**Cho triển khai production, luôn đặt credential tùy chỉnh.**

---

## Xóa Credential

1. Nhấn nút **Xóa** trên thẻ credential
2. Xác nhận xóa
3. Credential và tất cả mô hình liên kết bị xóa khỏi cơ sở dữ liệu

---

## Khắc Phục Sự Cố

### Credential Không Lưu Được

| Triệu chứng | Nguyên nhân | Giải pháp |
|------------|------------|----------|
| Nút lưu bị tắt | Đầu vào trống hoặc không hợp lệ | Nhập khóa hợp lệ |
| Lỗi khi lưu | Khóa mã hóa chưa đặt | Đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY` trong docker-compose.yml |
| Lỗi khi lưu | Vấn đề kết nối cơ sở dữ liệu | Kiểm tra trạng thái cơ sở dữ liệu |

### Kiểm Tra Kết Nối Thất Bại

| Lỗi | Nguyên nhân | Giải pháp |
|-----|------------|----------|
| Khóa API không hợp lệ | Khóa sai hoặc định dạng | Xác minh khóa từ bảng điều khiển nhà cung cấp |
| Kết nối bị từ chối | URL sai | Kiểm tra định dạng URL cơ sở |
| Timeout | Vấn đề mạng | Kiểm tra tường lửa, cài đặt proxy |
| 403 Forbidden | Hạn chế IP | Whitelist IP server của bạn |

---

## Ghi Chú Theo Nhà Cung Cấp

### OpenAI
- Khóa bắt đầu bằng `sk-proj-` (khóa dự án) hoặc `sk-` (cũ)
- Cần bật thanh toán trong tài khoản

### Anthropic
- Khóa bắt đầu bằng `sk-ant-`
- Kiểm tra tài khoản đã bật quyền truy cập API

### Google Gemini
- Khóa bắt đầu bằng `AIzaSy`
- Gói miễn phí có giới hạn tốc độ

### Ollama
- Không cần khóa API
- URL mặc định: `http://localhost:11434` (cục bộ) hoặc `http://ollama:11434` (Docker)
- Đảm bảo Ollama server đang chạy

### Azure OpenAI
- Định dạng endpoint: `https://{resource-name}.openai.azure.com`
- Định dạng phiên bản API: `YYYY-MM-DD` hoặc `YYYY-MM-DD-preview`
- Tên triển khai được cấu hình riêng khi đăng ký mô hình qua hộp thoại Khám Phá Mô Hình của credential

---

## Liên Quan

- **[Nhà Cung Cấp AI](../5-CONFIGURATION/ai-providers.md)** — Hướng dẫn cài đặt nhà cung cấp và khuyến nghị
- **[Bảo Mật](../5-CONFIGURATION/security.md)** — Cấu hình mật khẩu và mã hóa
- **[Tham Chiếu Môi Trường](../5-CONFIGURATION/environment-reference.md)** — Tất cả tùy chọn cấu hình
