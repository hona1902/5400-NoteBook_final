# Cấu hình - Cài đặt cơ bản

Cấu hình là cách bạn tùy chỉnh Open Notebook cho thiết lập cụ thể của mình. Phần này bao gồm những gì bạn cần biết.

---

## Cần cấu hình gì?

Ba điều:

1. **Nhà cung cấp AI** — Dịch vụ LLM/nhúng nào bạn đang sử dụng (OpenAI, Anthropic, Ollama, v.v.)
2. **Cơ sở dữ liệu** — Cách kết nối với SurrealDB (thường được định cấu hình trước)
3. **Máy chủ** — URL API, cổng, thời gian chờ (thường được tự động phát hiện)

---

## Quyết định nhanh: Nhà cung cấp nào?

### Tùy chọn 1: Nhà cung cấp dịch vụ đám mây (Nhanh nhất)
- **OpenRouter (được khuyến nghị)** (truy cập vào tất cả các kiểu máy bằng một phím)
- **OpenAI** (GPT)
- **Nhân loại** (Claude)
- **Google Gemini** (đa phương thức, ngữ cảnh dài)
- **Groq** (suy luận cực nhanh)

Thiết lập: Nhận khóa API → Thêm thông tin xác thực trong Giao diện người dùng cài đặt → Xong

→ Đi đến **[Hướng dẫn về nhà cung cấp AI](ai-providers.md)**

### Tùy chọn 2: Local (Miễn phí & Riêng tư)
- **Ollama** (các mẫu mã nguồn mở, trên máy của bạn)

→ Đi đến **[Ollama Setup](ollama.md)**

### Lựa chọn 3: Tương thích với OpenAI
- **LM Studio** (địa phương)
- **Điểm cuối tùy chỉnh**

→ Đi tới **[Hướng dẫn tương thích với OpenAI](openai-tương thích.md)**

---

## Tệp cấu hình

Sử dụng đúng tập tin tùy thuộc vào thiết lập của bạn.

### `.env` (Phát triển cục bộ)

Bạn sẽ chỉ sử dụng .env nếu bạn đang chạy Open Notebook cục bộ.



```
Located in: project root
Use for: Development on your machine
Format: KEY=value, one per line
```



### `docker.env` (Triển khai Docker)

Bạn sẽ sử dụng tệp này để giữ các biến môi trường nếu bạn đang sử dụng docker-compose và không muốn đặt các biến trực tiếp vào tệp soạn thảo.

```
Located in: project root (or ./docker)
Use for: Docker deployments
Format: Same as .env
Loaded by: docker-compose.yml
```



---

## Cài đặt quan trọng nhất

Tất cả cài đặt được cung cấp bên dưới phải được đặt bên trong tệp môi trường của bạn (.env hoặc docker.env tùy thuộc vào thiết lập của bạn).

### Cơ sở dữ liệu siêu thực

Đây là cơ sở dữ liệu được ứng dụng sử dụng.



```
SURREAL_URL=ws://surrealdb:8000/rpc
SURREAL_USER=root
SURREAL_PASSWORD=root  # Change in production!
SURREAL_NAMESPACE=open_notebook
SURREAL_DATABASE=open_notebook
```



> Điều quan trọng duy nhất không được bỏ lỡ là tên máy chủ trong `SURREAL_URL`. Kiểm tra xem URL nào sẽ sử dụng dựa trên hoạt động triển khai của bạn, [tại đây](database.md).

### Nhà cung cấp AI (Thông tin xác thực)

Chúng tôi cần quyền truy cập vào LLM để ứng dụng hoạt động. Thông tin đăng nhập của nhà cung cấp AI được định cấu hình thông qua **Giao diện người dùng cài đặt**:

1. Đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY` trong môi trường của bạn (bắt buộc để lưu trữ thông tin xác thực)
2. Bắt đầu dịch vụ
3. Đi tới **Cài đặt → Khóa API → Thêm thông tin xác thực**
4. Chọn nhà cung cấp của bạn, dán khóa API của bạn
5. **Kiểm tra kết nối**→**Khám phá mẫu máy**→**Đăng ký mẫu máy**



```
# Required in your .env or docker-compose.yml:
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
```



> **Người dùng Ollama**: Thêm thông tin xác thực Ollama trong Cài đặt → Khóa API với URL cơ sở chính xác. Xem [Ollama Setup](ollama.md) để được trợ giúp về cấu hình mạng.

> **LM Studio / Tương thích với OpenAI**: Thêm thông tin xác thực tương thích với OpenAI trong Cài đặt → Khóa API. Xem [Hướng dẫn tương thích với OpenAI](openai-tương thích.md).

### URL API (Nếu đằng sau Proxy ngược)
Bạn chỉ cần lo lắng về điều này nếu bạn đang triển khai trên proxy hoặc nếu bạn đang thay đổi thông tin cổng. Nếu không, hãy bỏ qua điều này.



```
API_URL=https://your-domain.com
# Usually auto-detected. Only set if needed.
```



Tính năng tự động phát hiện hoạt động với hầu hết các thiết lập.

---

## Cấu hình theo kịch bản

### Kịch bản 1: Docker trên Localhost (Mặc định)

```env
# In docker.env:
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
# Everything else uses defaults
# Then configure AI provider in Settings → API Keys
```



### Kịch bản 2: Docker trên Remote Server

```env
# In docker.env:
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
API_URL=http://your-server-ip:5055
```



### Kịch bản 3: Đằng sau Reverse Proxy (Nginx/Cloudflare)

```env
# In docker.env:
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
API_URL=https://your-domain.com
# The reverse proxy handles HTTPS
```



### Kịch bản 4: Sử dụng Ollama cục bộ

```env
# In .env:
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
# Then add Ollama credential in Settings → API Keys
```



### Kịch bản 5: Sử dụng Azure OpenAI

```env
# In docker.env:
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
# Then add Azure OpenAI credential in Settings → API Keys
```



---

## Phần cấu hình

### [Nhà cung cấp AI](ai-providers.md)
- Cấu hình OpenAI
- Cấu hình nhân học
- Cấu hình Google Gemini
- Cấu hình Groq
- Cấu hình Olama
- Cấu hình Azure OpenAI
- Cấu hình tương thích OpenAI

### [Cơ sở dữ liệu](database.md)
- Thiết lập SurrealDB
- Chuỗi kết nối
- Cơ sở dữ liệu và không gian tên
- Chạy SurrealDB của riêng bạn

### [Nâng cao](advanced.md)
- Cổng và mạng
- Thời gian chờ và đồng thời
- SSL/bảo mật
- Thử lại cấu hình
- Sự đồng thời của công nhân
- Mô hình ngôn ngữ & nhúng
- Chuyển giọng nói thành văn bản và chuyển văn bản thành giọng nói
- Gỡ lỗi và ghi nhật ký

### [Proxy ngược](reverse-proxy.md)
- Cấu hình Nginx, Caddy, Traefik
- Thiết lập tên miền tùy chỉnh
- Cấu hình SSL/HTTPS
- Coolify và các nền tảng khác

### [Bảo mật](security.md)
- Bảo vệ bằng mật khẩu
- Xác thực API
- Tăng cường sản xuất
- Cấu hình tường lửa

### [TTS cục bộ](local-tts.md)
- Thiết lập bài phát biểu để chuyển văn bản thành giọng nói cục bộ
- Tăng tốc GPU
- Tùy chọn giọng nói
- Mạng Docker

### [STT cục bộ](local-stt.md)
- Thiết lập bài phát biểu để chuyển giọng nói thành văn bản cục bộ
- Tùy chọn mô hình thì thầm
- Tăng tốc GPU
- Mạng Docker

### [Ollama](ollama.md)
- Thiết lập và trỏ đến máy chủ Ollama
- Tải mô hình
- Sử dụng nhúng

### [Nhà cung cấp tương thích với OpenAI](openai-tương thích.md)
- LM Studio, vLLM, WebUI tạo văn bản
- Cấu hình kết nối
- Mạng Docker
- Khắc phục sự cố

### [Tham khảo đầy đủ](environment-reference.md)
- Tất cả các biến môi trường
- Được nhóm theo danh mục
- Mỗi người làm gì
- Giá trị mặc định

---

## Cách thêm cấu hình

### Cách 1: Giao diện người dùng cài đặt (Dành cho thông tin xác thực của nhà cung cấp AI)

Cách được đề xuất để định cấu hình nhà cung cấp AI:



```
1. Open Open Notebook in your browser
2. Go to Settings → API Keys
3. Click "Add Credential"
4. Select provider, enter API key
5. Click Save, then Test Connection
6. Click Discover Models → Register Models
```



Không chỉnh sửa tập tin, không khởi động lại. Thông tin xác thực được lưu trữ an toàn (được mã hóa) trong cơ sở dữ liệu.

→ **[Hướng dẫn đầy đủ: Cấu hình API](../3-USER-GUIDE/api-configuration.md)**

### Cách 2: Chỉnh sửa File `.env` (Cài đặt cơ sở hạ tầng)

Đối với cài đặt cơ sở dữ liệu, mạng và khóa mã hóa:



```bash
1. Open .env in your editor
2. Set OPEN_NOTEBOOK_ENCRYPTION_KEY and database vars
3. Save
4. Restart services
```



### Cách 3: Đặt môi trường Docker (Triển khai)



```bash
# In docker-compose.yml:
services:
  api:
    environment:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
      - API_URL=https://your-domain.com
```



---

## Xác minh

Sau khi cấu hình, hãy xác minh nó hoạt động:



```
1. Open your notebook
2. Go to Settings → Models
3. You should see your configured provider
4. Try a simple Chat question
5. If it responds, configuration is correct!
```



---

## Những lỗi thường gặp

| Sai lầm | Vấn đề | Sửa chữa |
|----------|----------|------|
| Không có thông tin xác thực nào được định cấu hình | Mẫu không có sẵn | Thêm thông tin xác thực trong Cài đặt → Khóa API |
| Thiếu khóa mã hóa | Không thể lưu thông tin xác thực | Đặt OPEN_NOTEBOOK_ENCRYPTION_KEY |
| URL cơ sở dữ liệu sai | Không thể khởi động API | Kiểm tra định dạng SURREAL_URL |
| Hiển thị cổng 5055 | "Không thể kết nối với máy chủ" | Hiển thị 5055 trong docker-compose |
| Lỗi đánh máy trong env var | Cài đặt bị bỏ qua | Kiểm tra chính tả (phân biệt chữ hoa chữ thường!) |
| Đừng khởi động lại | Cấu hình cũ vẫn dùng | Khởi động lại dịch vụ sau khi thay đổi env |

---

## Điều gì xảy ra sau khi cấu hình

Sau khi được cấu hình:

1. **[Bắt đầu nhanh](../0-START-HERE/index.md)** — Chạy sổ ghi chép đầu tiên của bạn
2. **[Installation](../1-INSTALLATION/index.md)** — Hướng dẫn triển khai nhiều tuyến
3. **[Hướng dẫn sử dụng](../3-USER-GUIDE/index.md)** — Cách sử dụng từng tính năng

---

## Nhận trợ giúp

- **Lỗi cấu hình?** → Kiểm tra [Xử lý sự cố](../6-TROUBLESHOOTING/quick-fixes.md)
- **Vấn đề cụ thể của nhà cung cấp?** → Kiểm tra [Nhà cung cấp AI](ai-providers.md)
- **Cần tham khảo đầy đủ?** → Xem [Tham khảo về môi trường](environment-reference.md)

---

## Bản tóm tắt

**Cấu hình tối thiểu để chạy:**
1. Đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY` trong môi trường của bạn
2. Bắt đầu dịch vụ
3. Thêm thông tin xác thực của nhà cung cấp AI trong Cài đặt → Khóa API
4. Xong!

Mọi thứ khác là tối ưu hóa tùy chọn.