# Tham khảo môi trường hoàn chỉnh

Danh sách đầy đủ tất cả các biến môi trường có sẵn trong Open Notebook.

---

## Cấu hình API

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `API_URL` | Không | Tự động phát hiện | URL nơi giao diện người dùng tiếp cận API (ví dụ: http://localhost:5055) |
| `NỘI BỘ_API_URL` | Không | http://localhost:5055 | URL API nội bộ cho proxy phía máy chủ Next.js |
| `API_CLIENT_TIMEOUT` | Không | 300 | Thời gian chờ của ứng dụng khách tính bằng giây (thời gian chờ phản hồi API) |
| `OPEN_NOTEBOOK_PASSWORD` | Không | Không có | Mật khẩu bảo vệ phiên bản Open Notebook |
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | **Có**| Không có | Chuỗi bí mật để mã hóa thông tin xác thực được lưu trữ trong cơ sở dữ liệu (bất kỳ chuỗi nào cũng hoạt động).**Bắt buộc** đối với hệ thống thông tin xác thực. Hỗ trợ bí mật Docker thông qua hậu tố `_FILE`. |
| `TÊN MÁY CHỦ` | Không | `0.0.0.0` (trong Docker) | Giao diện mạng để Next.js liên kết. Mặc định `0.0.0.0` đảm bảo khả năng truy cập từ proxy ngược |

> **Quan trọng**: Cần có `OPEN_NOTEBOOK_ENCRYPTION_KEY` để lưu trữ thông tin xác thực của nhà cung cấp AI thông qua Giao diện người dùng Cài đặt. Không có nó, bạn không thể lưu thông tin đăng nhập. Nếu bạn thay đổi hoặc làm mất khóa này, tất cả thông tin xác thực được lưu trữ sẽ không thể đọc được.

---

## Cơ sở dữ liệu: SurrealDB

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `SURREAL_URL` | Có | ws://surrealdb:8000/rpc | URL kết nối WebSocket SurrealDB |
| `SURREAL_USER` | Có | gốc | Tên người dùng SurrealDB |
| `SURREAL_PASSWORD` | Có | gốc | Mật khẩu SurrealDB |
| `SURREAL_NAMESPACE` | Có | open_notebook | Không gian tên SurrealDB |
| `SURREAL_CƠ SỞ DỮ LIỆU` | Có | open_notebook | Tên cơ sở dữ liệu SurrealDB |

---

## Cơ sở dữ liệu: Thử lại cấu hình

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `SURREAL_COMMANDS_RETRY_ENABLED` | Không | đúng | Cho phép thử lại khi thất bại |
| `SURREAL_COMMANDS_RETRY_MAX_ATTEMPTS` | Không | 3 | Số lần thử lại tối đa |
| `SURREAL_COMMANDS_RETRY_WAIT_STRATEGY` | Không | hàm mũ_jitter | Thử lại chiến lược chờ (exponential_jitter/exponential/fixed/random) |
| `SURREAL_COMMANDS_RETRY_WAIT_MIN` | Không | 1 | Thời gian chờ tối thiểu giữa các lần thử lại (giây) |
| `SURREAL_COMMANDS_RETRY_WAIT_MAX` | Không | 30 | Thời gian chờ tối đa giữa các lần thử lại (giây) |

---

## Cơ sở dữ liệu: Đồng thời

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `SURREAL_COMMANDS_MAX_TASKS` | Không | 5 | Nhiệm vụ cơ sở dữ liệu đồng thời tối đa |

---

## Hết giờ LLM

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `ESPERANTO_LLM_TIMEOUT` | Không | 60 | Thời gian chờ suy luận LLM tính bằng giây |
| `ESPERANTO_SSL_VERIFY` | Không | đúng | Xác minh chứng chỉ SSL (false = chỉ phát triển) |
| `ESPERANTO_SSL_CA_BUNDLE` | Không | Không có | Đường dẫn đến gói chứng chỉ CA tùy chỉnh |

---

## Chuyển văn bản thành giọng nói (TTS)

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `TTS_BATCH_SIZE` | Không | 5 | Yêu cầu TTS đồng thời (1-5, tùy thuộc vào nhà cung cấp) |

---

## Trích xuất nội dung

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `FIRECRAWL_API_KEY` | Không | Không có | Khóa API Firecrawl để quét web nâng cao |
| `JINA_API_KEY` | Không | Không có | Khóa API Jina AI để trích xuất web |

**Cài đặt:**
- Thu thập thông tin pháo hoa: https://firecrawl.dev/
- Jina: https://jina.ai/

---

## Mạng / Proxy

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `HTTP_PROXY` | Không | Không có | URL proxy HTTP cho các yêu cầu HTTP gửi đi |
| `HTTPS_PROXY` | Không | Không có | URL proxy HTTPS cho các yêu cầu HTTPS gửi đi |
| `NO_PROXY` | Không | Không có | Danh sách máy chủ được phân tách bằng dấu phẩy để bỏ qua proxy |

Định tuyến tất cả các yêu cầu HTTP gửi đi thông qua máy chủ proxy. Hữu ích cho môi trường công ty/có tường lửa.

Các thư viện cơ bản (esperanto, content-core, podcast-creator) tự động phát hiện cài đặt proxy từ các biến môi trường tiêu chuẩn này.

**Ảnh hưởng:**
- Lệnh gọi API của nhà cung cấp AI (OpenAI, Anthropic, Google, Groq, v.v.)
- Trích xuất nội dung từ URL (web, bản ghi YouTube)
- Tạo podcast (cuộc gọi của nhà cung cấp LLM và TTS)

**Định dạng:** `http://[user:pass@]host:port` hoặc `https://[user:pass@]host:port`

**Ví dụ:**

```bash
# Basic proxy
HTTP_PROXY=http://proxy.corp.com:8080
HTTPS_PROXY=http://proxy.corp.com:8080

# Authenticated proxy
HTTP_PROXY=http://user:password@proxy.corp.com:8080
HTTPS_PROXY=http://user:password@proxy.corp.com:8080

# Bypass proxy for local hosts
NO_PROXY=localhost,127.0.0.1,.local
```



---

## Gỡ lỗi và giám sát

| Biến | Yêu cầu? | Mặc định | Mô tả |
|----------|-------------|---------|-------------|
| `LANGCHAIN_TRACING_V2` | Không | sai | Kích hoạt tính năng truy tìm LangSmith |
| `LANGCHAIN_ENDPOINT` | Không | https://api.smith.langchain.com | Điểm cuối LangSmith |
| `LANGCHAIN_API_KEY` | Không | Không có | Khóa API LangSmith |
| `LANGCHAIN_DỰ ÁN` | Không | Mở sổ ghi chép | Tên dự án LangSmith |

**Cài đặt:** https://smith.langchain.com/

---

## Biến môi trường theo trường hợp sử dụng

### Thiết lập tối thiểu (Cài đặt mới)

```
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-key
SURREAL_URL=ws://surrealdb:8000/rpc
SURREAL_USER=root
SURREAL_PASSWORD=password
SURREAL_NAMESPACE=open_notebook
SURREAL_DATABASE=open_notebook
```

Sau đó định cấu hình nhà cung cấp AI thông qua **Cài đặt → Khóa API** trong trình duyệt.

### Triển khai sản xuất

```
OPEN_NOTEBOOK_ENCRYPTION_KEY=your-strong-secret-key
OPEN_NOTEBOOK_PASSWORD=your-secure-password
API_URL=https://mynotebook.example.com
SURREAL_USER=production_user
SURREAL_PASSWORD=secure_password
```



### Tự lưu trữ đằng sau Proxy ngược

```
OPEN_NOTEBOOK_ENCRYPTION_KEY=your-secret-key
API_URL=https://mynotebook.example.com
```



### Môi trường doanh nghiệp (Phía sau proxy)

```
OPEN_NOTEBOOK_ENCRYPTION_KEY=your-secret-key
HTTP_PROXY=http://proxy.corp.com:8080
HTTPS_PROXY=http://proxy.corp.com:8080
NO_PROXY=localhost,127.0.0.1
```



### Triển khai hiệu suất cao

```
OPEN_NOTEBOOK_ENCRYPTION_KEY=your-secret-key
SURREAL_COMMANDS_MAX_TASKS=10
TTS_BATCH_SIZE=5
API_CLIENT_TIMEOUT=600
```



### Gỡ lỗi

```
OPEN_NOTEBOOK_ENCRYPTION_KEY=your-secret-key
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your-key
```



---

## Xác thực

Kiểm tra xem một biến đã được đặt chưa:



```bash
# Check single variable
echo $OPEN_NOTEBOOK_ENCRYPTION_KEY

# Check multiple
env | grep -E "OPEN_NOTEBOOK|API_URL"

# Print all config
env | grep -E "^[A-Z_]+=" | sort
```



---

## Ghi chú

- **Phân biệt chữ hoa chữ thường:** `OPEN_NOTEBOOK_ENCRYPTION_KEY` ≠ `open_notebook_encryption_key`
- **Không có khoảng trắng:** `OPEN_NOTEBOOK_ENCRYPTION_KEY=my-key` không phải `OPEN_NOTEBOOK_ENCRYPTION_KEY = my-key`
- **Giá trị trích dẫn:** Sử dụng dấu ngoặc kép cho các giá trị có dấu cách: `API_URL="http://my server:5055"`
- **Yêu cầu khởi động lại:** Các thay đổi có hiệu lực sau khi khởi động lại dịch vụ
- **Bí mật:** Không cung cấp khóa mã hóa hoặc mật khẩu cho git
- **Nhà cung cấp AI:**Định cấu hình qua**Cài đặt → Khóa API** trong trình duyệt (không phải qua env vars)
- **Di chuyển:** Sử dụng Giao diện người dùng cài đặt để di chuyển các biến env hiện có sang hệ thống thông tin xác thực. Xem [Cấu hình API](../3-USER-GUIDE/api-configuration.md#migrating-from-environment-variables)

---

## Danh sách kiểm tra thiết lập nhanh

- [ ] Đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY` trong docker-compose.yml
- [ ] Đặt thông tin xác thực cơ sở dữ liệu (`SURREAL_*`)
- [] Bắt đầu dịch vụ
- [ ] Mở trình duyệt → Đi tới **Cài đặt → Khóa API**- [ ]**Thêm thông tin xác thực** cho nhà cung cấp AI của bạn
- [ ] **Kiểm tra kết nối** để xác minh
- [ ] **Khám phá và đăng ký mẫu**
- [ ] Đặt `API_URL` nếu đằng sau proxy ngược
- [ ] Thay đổi `SURREAL_PASSWORD` trong quá trình sản xuất
- [ ] Thử trò chuyện thử

Xong!

---

## Di sản: Biến môi trường của nhà cung cấp AI (Không dùng nữa)

> **Không được dùng nữa**: Các biến môi trường khóa API của nhà cung cấp AI sau đây không được dùng nữa. Thay vào đó, hãy định cấu hình nhà cung cấp thông qua Giao diện người dùng cài đặt. Các biến này có thể vẫn hoạt động như một phương án dự phòng nhưng không còn được khuyến nghị nữa.

Nếu bạn đã định cấu hình các biến này từ lần cài đặt trước, hãy nhấp vào nút **Di chuyển sang cơ sở dữ liệu**trong**Cài đặt → Khóa API** để nhập chúng vào hệ thống thông tin xác thực, sau đó xóa chúng khỏi cấu hình của bạn.

| Biến | Nhà cung cấp | Thay thế |
|----------|----------|-------------|
| `OPENAI_API_KEY` | OpenAI | Cài đặt → Khóa API → Thêm thông tin xác thực OpenAI |
| `ANTHOPIC_API_KEY` | Nhân chủng học | Cài đặt → Khóa API → Thêm thông tin xác thực nhân loại |
| `GOOGLE_API_KEY` | Google Song Tử | Cài đặt → Khóa API → Thêm thông tin xác thực Google |
| `GEMINI_API_BASE_URL` | Google Song Tử | Định cấu hình trong thông tin xác thực Google Gemini |
| `VERTEX_DỰ ÁN` | AI đỉnh | Cài đặt → Khóa API → Thêm thông tin xác thực Vertex AI |
| `VERTEX_LOCATION` | AI đỉnh | Định cấu hình trong thông tin xác thực AI của Vertex |
| `GOOGLE_APPLICATION_CREDENTIALS` | AI đỉnh | Định cấu hình trong thông tin xác thực AI của Vertex |
| `GROQ_API_KEY` | Groq | Cài đặt → Khóa API → Thêm thông tin xác thực Groq |
| `MISTRAL_API_KEY` | Mistral | Cài đặt → Khóa API → Thêm thông tin xác thực Mistral |
| `DEEPSEEK_API_KEY` | DeepSeek | Cài đặt → Khóa API → Thêm thông tin xác thực DeepSeek |
| `XAI_API_KEY` | xAI | Cài đặt → Khóa API → Thêm thông tin xác thực xAI |
| `OLLAMA_API_BASE` | Olama | Cài đặt → Khóa API → Thêm thông tin xác thực Ollama |
| `OPENROUTER_API_KEY` | OpenRouter | Cài đặt → Khóa API → Thêm thông tin xác thực OpenRouter |
| `OPENROUTER_BASE_URL` | OpenRouter | Định cấu hình trong thông tin xác thực OpenRouter |
| `VOYAGE_API_KEY` | Hành trình AI | Cài đặt → Khóa API → Thêm thông tin xác thực Voyage AI |
| `ELEVENLABS_API_KEY` | ElevenLabs | Cài đặt → Khóa API → Thêm thông tin xác thực ElevenLabs |
| `OPENAI_COMPATIBLE_BASE_URL` | Tương thích với OpenAI | Cài đặt → Khóa API → Thêm thông tin xác thực tương thích với OpenAI |
| `OPENAI_COMPATIBLE_API_KEY` | Tương thích với OpenAI | Configure in OpenAI-Compatible credential |
| `OPENAI_COMPATIBLE_BASE_URL_LLM` | Tương thích với OpenAI | Định cấu hình URL cho mỗi dịch vụ trong thông tin xác thực |
| `OPENAI_COMPATIBLE_API_KEY_LLM` | Tương thích với OpenAI | Định cấu hình khóa cho mỗi dịch vụ trong thông tin xác thực |
| `OPENAI_COMPATIBLE_BASE_URL_EMBEDDING` | Tương thích với OpenAI | Định cấu hình URL cho mỗi dịch vụ trong thông tin xác thực |
| `OPENAI_COMPATIBLE_API_KEY_EMBEDDING` | Tương thích với OpenAI | Định cấu hình khóa cho mỗi dịch vụ trong thông tin xác thực |
| `OPENAI_COMPATIBLE_BASE_URL_STT` | Tương thích với OpenAI | Định cấu hình URL cho mỗi dịch vụ trong thông tin xác thực |
| `OPENAI_COMPATIBLE_API_KEY_STT` | Tương thích với OpenAI | Định cấu hình khóa cho mỗi dịch vụ trong thông tin xác thực |
| `OPENAI_COMPATIBLE_BASE_URL_TTS` | Tương thích với OpenAI | Định cấu hình URL cho mỗi dịch vụ trong thông tin xác thực |
| `OPENAI_COMPATIBLE_API_KEY_TTS` | Tương thích với OpenAI | Định cấu hình khóa cho mỗi dịch vụ trong thông tin xác thực |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI | Cài đặt → Khóa API → Thêm thông tin xác thực Azure OpenAI |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI | Định cấu hình trong thông tin xác thực Azure OpenAI |
| `AZURE_OPENAI_API_VERSION` | Azure OpenAI | Định cấu hình trong thông tin xác thực Azure OpenAI |
| `AZURE_OPENAI_API_KEY_LLM` | Azure OpenAI | Định cấu hình cho mỗi dịch vụ trong thông tin xác thực |
| `AZURE_OPENAI_ENDPOINT_LLM` | Azure OpenAI | Định cấu hình cho mỗi dịch vụ trong thông tin xác thực |
| `AZURE_OPENAI_API_VERSION_LLM` | Azure OpenAI | Định cấu hình cho mỗi dịch vụ trong thông tin xác thực |
| `AZURE_OPENAI_API_KEY_EMBEDDING` | Azure OpenAI | Định cấu hình cho mỗi dịch vụ trong thông tin xác thực |
| `AZURE_OPENAI_ENDPOINT_EMBEDDING` | Azure OpenAI | Định cấu hình cho mỗi dịch vụ trong thông tin xác thực |
| `AZURE_OPENAI_API_VERSION_EMBEDDING` | Azure OpenAI | Định cấu hình cho mỗi dịch vụ trong thông tin xác thực |