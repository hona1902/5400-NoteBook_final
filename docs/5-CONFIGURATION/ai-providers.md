# Nhà cung cấp AI - Hướng dẫn cấu hình

Hoàn tất hướng dẫn thiết lập cho từng nhà cung cấp AI thông qua **Giao diện người dùng cài đặt**.

> **Mới trong v1.2**: Tất cả thông tin đăng nhập của nhà cung cấp AI hiện được quản lý thông qua Giao diện người dùng Cài đặt. Các biến môi trường cho khóa API không còn được dùng nữa.

---

## Cách thiết lập nhà cung cấp hoạt động

Open Notebook sử dụng **hệ thống dựa trên thông tin xác thực** để quản lý các nhà cung cấp AI:

1. **Nhận khóa API của bạn** từ trang web của nhà cung cấp
2. **Mở Cài đặt**→**Khóa API**→**Thêm thông tin xác thực**3.**Kiểm tra kết nối** để xác minh rằng nó hoạt động
4. **Khám phá và đăng ký mẫu** để cung cấp chúng
5. **Bắt đầu sử dụng** nhà cung cấp trong sổ ghi chép của bạn

> **Điều kiện tiên quyết**: Bạn phải đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY` trong docker-compose.yml trước khi lưu trữ thông tin xác thực. Xem [Cấu hình API](../3-USER-GUIDE/api-configuration.md#encryption-setup) để biết chi tiết.

---

## Nhà cung cấp đám mây (Được đề xuất cho hầu hết)

### OpenAI

**Chi phí:** ~$0,03-0,15 cho mỗi 1K mã thông báo (thay đổi tùy theo kiểu máy)

**Nhận khóa API của bạn:**
1. Truy cập https://platform.openai.com/api-keys
2. Tạo tài khoản (nếu cần)
3. Tạo khóa API mới (bắt đầu bằng "sk-proj-")
4. Thêm tín dụng $5+ vào tài khoản

**Định cấu hình trong Sổ tay mở:**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**OpenAI**
4. Đặt tên cho nó (ví dụ: "Khóa OpenAI của tôi")
5. Dán khóa API của bạn
6. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**7. Nhấp vào**Khám phá các mẫu** để tìm các mẫu có sẵn
8. Nhấp vào **Đăng ký mẫu** để cung cấp mẫu

**Các mẫu có sẵn (trong Sổ tay mở):**
- `gpt-4o` — Chất lượng tốt nhất, nhanh chóng (phiên bản mới nhất)
- `gpt-4o-mini` — Nhanh, rẻ, tốt cho việc thử nghiệm
- `o1` — Mô hình lý luận nâng cao (chậm hơn, đắt hơn)
- `o1-mini` — Mô hình suy luận nhanh hơn

**Khuyến nghị:**
- Dùng chung: `gpt-4o` (cân bằng tốt nhất)
- Để thử nghiệm/giá rẻ: `gpt-4o-mini` (rẻ hơn 90%)
- Đối với các bài toán phức tạp: `o1` (tốt nhất cho các bài toán khó)

**Ước tính chi phí:**

```
Light use: $1-5/month
Medium use: $10-30/month
Heavy use: $50-100+/month
```



**Xử lý sự cố:**
- "Khóa API không hợp lệ" → Kiểm tra khóa bắt đầu bằng "sk-proj-" và kiểm tra kết nối trong Cài đặt
- "Vượt quá giới hạn tỷ lệ" → Chờ hoặc nâng cấp tài khoản
- "Không có mẫu" → Thay vào đó hãy thử gpt-4o-mini hoặc khám phá lại các mẫu

---

### Nhân chủng học (Claude)

**Chi phí:** ~$0,80-3,00 cho mỗi 1 triệu token (rẻ hơn OpenAI trong bối cảnh dài)

**Nhận khóa API của bạn:**
1. Truy cập https://console.anthropic.com/
2. Tạo tài khoản hoặc đăng nhập
3. Vào phần Khóa API
4. Tạo khóa API mới (bắt đầu bằng "sk-ant-")

**Định cấu hình trong Sổ tay mở:**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**Anthropic**
4. Đặt tên cho nó, dán khóa API của bạn
5. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**6. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

**Các mẫu có sẵn:**
- `claude-sonnet-4-5-20250929` — Mới nhất, chất lượng tốt nhất (được khuyến nghị)
- `claude-3-5-sonnet-20241022` — Thế hệ trước, vẫn xuất sắc
- `claude-3-5-haiku-20241022` — Nhanh, rẻ
- `claude-opus-4-5-20251101` — Mạnh nhất, đắt nhất

**Khuyến nghị:**
- Dùng chung: `claude-sonnet-4-5` (tổng thể hay nhất, mới nhất)
- Với giá rẻ: `claude-3-5-haiku` (rẻ hơn 80%)
- Đối với phức tạp: `claude-opus-4-5` (có khả năng nhất)

**Ước tính chi phí:**

```
Sonnet: $3-20/month (typical use)
Haiku: $0.50-3/month
Opus: $10-50+/month
```



**Ưu điểm:**
- Hỗ trợ ngữ cảnh dài tuyệt vời (200K mã thông báo)
- Lập luận xuất sắc
- Xử lý nhanh

**Xử lý sự cố:**
- "Khóa API không hợp lệ" → Kiểm tra xem nó bắt đầu bằng "sk-ant-" và kiểm tra trong Cài đặt
- "Quá tải" → Anthropic đang bận, hãy thử lại sau
- "Mô hình không có sẵn" → Khám phá lại các mô hình từ thông tin xác thực

---

### Google Song Tử

**Chi phí:** ~$0,075-0,30 cho mỗi 1K mã thông báo (cạnh tranh với OpenAI)

**Nhận khóa API của bạn:**
1. Truy cập https://aistudio.google.com/app/apikey
2. Tạo tài khoản hoặc đăng nhập
3. Tạo khóa API mới

**Định cấu hình trong Sổ tay mở:**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**Google Gemini**
4. Đặt tên cho nó, dán khóa API của bạn
5. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**6. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

**Các mẫu có sẵn:**
- `gemini-2.0-flash-exp` — Thử nghiệm mới nhất, nhanh nhất (được khuyến nghị)
- `gemini-2.0-flash` — Phiên bản ổn định, nhanh, rẻ

**Khuyến nghị:**
- Dành cho mục đích sử dụng chung: `gemini-2.0-flash-exp` (giá trị tốt nhất, mới nhất)
- Đối với giá rẻ: `gemini-1.5-flash` (rất rẻ)
- Đối với ngữ cảnh phức tạp/dài: `gemini-1.5-pro-latest` (ngữ cảnh mã thông báo 2M)

**Ưu điểm:**
- Ngữ cảnh rất dài (1M token)
- Đa phương thức (hình ảnh, âm thanh, video)
- Tốt cho podcast

**Xử lý sự cố:**
- "Khóa API không hợp lệ" → Nhận khóa mới từ aistudio.google.com
- "Vượt quá hạn ngạch" → Cấp miễn phí bị giới hạn, nâng cấp tài khoản
- "Không tìm thấy mô hình" → Khám phá lại các mô hình từ thông tin xác thực

---

### Groq

**Chi phí:** ~$0,05 cho mỗi 1 triệu token (mẫu rẻ nhất nhưng có số lượng hạn chế)

**Nhận khóa API của bạn:**
1. Truy cập https://console.groq.com/keys
2. Tạo tài khoản hoặc đăng nhập
3. Tạo khóa API mới

**Định cấu hình trong Sổ tay mở:**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**Groq**
4. Đặt tên cho nó, dán khóa API của bạn
5. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**6. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

**Các mẫu có sẵn:**
- `llama-3.3-70b-đa năng` — Tốt nhất trên Groq (được khuyến nghị)
- `llama-3.1-70b-versatile` — Nhanh, có khả năng
- `mixtral-8x7b-32768` — Lựa chọn thay thế tốt
- `gemma2-9b-it` — Nhỏ, rất nhanh

**Khuyến nghị:**
- Về chất lượng: `llama-3.3-70b-versatile` (tốt nhất về tổng thể)
- Về tốc độ: `gemma2-9b-it` (cực nhanh)
- Để cân bằng: `llama-3.1-70b-versatile`

**Ưu điểm:**
- Suy luận cực nhanh
- Rất rẻ
- Tuyệt vời cho việc chuyển đổi/làm việc hàng loạt

**Nhược điểm:**
- Lựa chọn mô hình hạn chế
- Mô hình nhỏ hơn OpenAI/Anthropic

**Xử lý sự cố:**
- "Tỷ lệ giới hạn" → Bậc miễn phí có giới hạn, nâng cấp
- "Không có mẫu" → Khám phá lại các mẫu từ thông tin xác thực

---

### OpenRouter

**Chi phí:** Thay đổi theo mô hình ($0,05-15 cho mỗi 1M token)

**Nhận khóa API của bạn:**
1. Truy cập https://openrouter.ai/keys
2. Tạo tài khoản hoặc đăng nhập
3. Thêm tín dụng vào tài khoản của bạn
4. Tạo khóa API mới

**Định cấu hình trong Sổ tay mở:**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**OpenRouter**
4. Đặt tên cho nó, dán khóa API của bạn
5. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**6. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

**Các mẫu có sẵn (hơn 100 tùy chọn):**
- OpenAI: `openai/gpt-4o`, `openai/o1`
- Nhân loại: `nhân nhân/claude-sonnet-4.5`, `nhân nhân/claude-3.5-haiku`
- Google: `google/gemini-2.0-flash-exp`, `google/gemini-1.5-pro`
- Meta: `meta-llama/llama-3.3-70b-instruct`, `meta-llama/llama-3.1-405b-instruct`
- Mistral: `mistralai/mistral-large-2411`
- DeepSeek: `deepseek/deepseek-chat`
- Và nhiều hơn nữa...

**Khuyến nghị:**
- Về chất lượng: `anthropic/claude-sonnet-4.5` (tổng thể tốt nhất)
- Về tốc độ/chi phí: `google/gemini-2.0-flash-exp` (rất nhanh, rẻ)
- Đối với mã nguồn mở: `meta-llama/llama-3.3-70b-instruct`
- Để suy luận: `openai/o1`

**Ưu điểm:**
- Một khóa API cho hơn 100 mô hình
- Thanh toán thống nhất
- So sánh mô hình dễ dàng
- Truy cập vào các mô hình có thể có danh sách chờ ở nơi khác

**Ước tính chi phí:**

```
Light use: $1-5/month
Medium use: $10-30/month
Heavy use: Depends on models chosen
```



**Xử lý sự cố:**
- "Khóa API không hợp lệ" → Kiểm tra xem nó bắt đầu bằng "sk-or-"
- "Không đủ tín dụng" → Thêm tín dụng tại openrouter.ai
- "Không có mẫu" → Kiểm tra chính tả ID mẫu (sử dụng đường dẫn đầy đủ)

---

## Tự lưu trữ / Cục bộ

### Ollama (Được đề xuất cho địa phương)

**Chi phí:** Miễn phí (chỉ tiền điện)

**Cài đặt Ollama:**
1. Cài đặt Ollama: https://ollama.ai
2. Chạy Ollama ở chế độ nền: `ollama phục vụ`
3. Tải xuống mô hình: `ollama pull mistral`

**Định cấu hình trong Sổ tay mở:**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**Ollama**
4. Đặt tên cho nó (ví dụ: "Local Ollama")
5. Nhập URL cơ sở:
   - Cùng một máy (không phải Docker): `http://localhost:11434`
   - Docker với Ollama trên máy chủ: `http://host.docker.internal:11434`
   - Docker với bộ chứa Ollama: `http://ollama:11434`
6. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**7. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

Xem [Hướng dẫn thiết lập Ollama](ollama.md) để biết cấu hình mạng chi tiết.

**Các mẫu có sẵn:**
- `llama3.3:70b` — Chất lượng tốt nhất (yêu cầu 40GB+ RAM)
- `llama3.1:8b` — Được khuyến nghị, cân bằng (RAM 8GB)
- `qwen2.5:7b` — Tuyệt vời về mã và lý luận
- `mistral:7b` — Mục đích chung tốt
- `phi3:3.8b` — Nhỏ, nhanh (RAM 4GB)
- `gemma2:9b` — mô hình cân bằng của Google
- Nhiều hơn nữa: `danh sách ollama` để xem có sẵn

**Khuyến nghị:**
- Về chất lượng (có GPU): `llama3.3:70b` (tốt nhất)
- Dành cho mục đích sử dụng chung: `llama3.1:8b` (số dư tốt nhất)
- Về tốc độ/bộ nhớ thấp: `phi3:3.8b` (rất nhanh)
- Về code: `qwen2.5:7b` (code giỏi)

**Yêu cầu phần cứng:**

```
GPU (NVIDIA/AMD):
  8GB VRAM: Runs most models fine
  6GB VRAM: Works, slower
  4GB VRAM: Small models only

CPU-only:
  16GB+ RAM: Slow but works
  8GB RAM: Very slow
  4GB RAM: Not recommended
```



**Ưu điểm:**
- Hoàn toàn riêng tư (chạy cục bộ)
- Miễn phí (chỉ điện)
- Không cần khóa API
- Hoạt động ngoại tuyến

**Nhược điểm:**
- Chậm hơn đám mây (trừ khi trên GPU)
- Mô hình nhỏ hơn đám mây
- Yêu cầu phần cứng cục bộ

**Xử lý sự cố:**
- "Kết nối bị từ chối" → Ollama không chạy hoặc sai URL trong thông tin xác thực
- "Không tìm thấy mẫu" → Tải xuống: `ollama pull modelname`
- "Hết bộ nhớ" → Sử dụng model nhỏ hơn hoặc bổ sung thêm RAM

---

### LM Studio (Thay thế tại địa phương)

**Chi phí:** Miễn phí

**Cài đặt LM Studio:**
1. Tải LM Studio: https://lmstudio.ai
2. Mở ứng dụng
3. Tải mô hình từ thư viện
4. Chuyển đến tab "Máy chủ cục bộ"
5. Khởi động máy chủ (cổng mặc định: 1234)

**Định cấu hình trong Sổ tay mở:**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**Tương thích với OpenAI**
4. Đặt tên cho nó (ví dụ: "LM Studio")
5. Nhập URL cơ sở: `http://host.docker.internal:1234/v1` (Docker) hoặc `http://localhost:1234/v1` (local)
6. Khóa API: `lm-studio` (giữ chỗ, LM Studio không yêu cầu)
7. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

**Ưu điểm:**
- Giao diện GUI (dễ dàng hơn Ollama CLI)
- Lựa chọn mẫu mã tốt
- Tập trung vào quyền riêng tư
- Hoạt động ngoại tuyến

**Nhược điểm:**
- Chỉ dành cho máy tính để bàn (Mac/Windows/Linux)
- Chậm hơn mây
- Yêu cầu GPU cục bộ

---

### Tùy chỉnh tương thích với OpenAI

Đối với giao diện người dùng tạo văn bản, vLLM hoặc các điểm cuối tương thích với OpenAI khác:

1. Đi tới **Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**3. Chọn nhà cung cấp:**Tương thích với OpenAI**
4. Nhập URL cơ sở cho điểm cuối của bạn (ví dụ: `http://localhost:8000/v1`)
5. Nhập khóa API nếu được yêu cầu
6. Tùy chọn định cấu hình URL cho mỗi dịch vụ (LLM, Nhúng, TTS, STT)
7. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

Xem [Thiết lập tương thích với OpenAI](openai-tương thích.md) để biết hướng dẫn chi tiết.

---

## Doanh nghiệp

### Azure OpenAI

**Chi phí:** Tương tự như OpenAI (dựa trên mức sử dụng)

**Định cấu hình trong Sổ tay mở:**
1. Tạo dịch vụ Azure OpenAI trên cổng thông tin Azure
2. Triển khai mẫu GPT-4/3.5-turbo
3. Nhận điểm cuối và khóa của bạn
4. Đi tới **Cài đặt**→**Khóa API**5. Nhấp vào**Thêm thông tin xác thực**6. Chọn nhà cung cấp:**Azure OpenAI**
7. Điền: API Key, Endpoint, API Version
8. Tùy chọn định cấu hình các điểm cuối dành riêng cho dịch vụ (LLM, Nhúng)
9. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

**Ưu điểm:**
- Hỗ trợ doanh nghiệp
- Tích hợp VPC
- Tuân thủ (HIPAA, SOC2, v.v.)

**Nhược điểm:**
- Thiết lập phức tạp hơn
- Chi phí cao hơn
- Yêu cầu tài khoản Azure

---

## Nội dung nhúng (Dành cho tính năng tìm kiếm/ngữ nghĩa)

Theo mặc định, Open Notebook sử dụng phần nhúng của nhà cung cấp LLM. Các mô hình nhúng được phát hiện và đăng ký thông qua cùng một hệ thống thông tin xác thực — khi bạn khám phá các mô hình từ thông tin xác thực, các mô hình nhúng sẽ được đưa vào cùng với các mô hình ngôn ngữ.

---

## Chọn nhà cung cấp của bạn

**1. Không muốn chạy cục bộ và không muốn gây rối với các nhà cung cấp khác nhau:**

Sử dụng OpenAI
- Dựa trên đám mây
- Chất lượng tốt
- Chi phí hợp lý
- Thiết lập đơn giản nhất, hỗ trợ tất cả các chế độ (văn bản, nhúng, tts, stt, v.v.)

**Dành cho người tiết kiệm ngân sách:** Groq, OpenRouter hoặc Ollama
- Groq: Đám mây siêu rẻ
- Ollama: Miễn phí, nhưng địa phương
- OpenRouter: nhiều mô hình nguồn mở rất dễ tiếp cận

**Vì quyền riêng tư là trên hết:** Ollama hoặc LM Studio và Speakes ([TTS](local-tts.md), [STT](local-stt.md))
- Mọi thứ vẫn ở địa phương
- Hoạt động ngoại tuyến
- Không có khóa API nào được gửi đi bất cứ đâu

**Dành cho doanh nghiệp:** Azure OpenAI
- Tuân thủ
- Tích hợp VPC
- Hỗ trợ

---

## Các bước tiếp theo

1. **Chọn nhà cung cấp của bạn** từ phía trên
2. **Nhận khóa API** (nếu là đám mây) hoặc cài đặt cục bộ (nếu là Ollama)
3. **Đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY`** trong docker-compose.yml của bạn (bắt buộc để lưu trữ thông tin đăng nhập)
4. **Mở Cài đặt**→**Khóa API**→**Thêm thông tin xác thực**5.**Kiểm tra kết nối** để xác minh nó hoạt động
6. **Khám phá và đăng ký mẫu** để cung cấp chúng
7. **Xác minh nó hoạt động** bằng cuộc trò chuyện thử nghiệm

> **Nhiều nhà cung cấp**: Bạn có thể thêm thông tin xác thực cho bao nhiêu nhà cung cấp tùy thích. Tạo thông tin xác thực riêng cho các dự án hoặc thành viên nhóm khác nhau.

Xong!

---

## Di sản: Biến môi trường (Không dùng nữa)

> **Không được dùng nữa**: Việc định cấu hình khóa API của nhà cung cấp AI thông qua các biến môi trường không được dùng nữa. Thay vào đó hãy sử dụng Giao diện người dùng cài đặt. Các biến môi trường có thể vẫn hoạt động như một phương án dự phòng nhưng không còn là phương pháp được đề xuất nữa.

Nếu bạn đang di chuyển từ phiên bản cũ hơn sử dụng biến môi trường, hãy đi tới **Cài đặt**→**Khóa API**và nhấp vào nút**Di chuyển sang cơ sở dữ liệu** để nhập các khóa hiện có của bạn vào hệ thống thông tin xác thực.

---

## Có liên quan

- **[API Configuration](../3-USER-GUIDE/api-configuration.md)** — Hướng dẫn quản lý thông tin xác thực chi tiết
- **[Environment Reference](environment-reference.md)** - Danh sách đầy đủ tất cả các biến môi trường
- **[Cấu hình nâng cao](advanced.md)** - Hết giờ, SSL, điều chỉnh hiệu suất
- **[Ollama Setup](ollama.md)** - Hướng dẫn cấu hình Ollama chi tiết
- **[OpenAI-Compatible](openai-tương thích.md)** - LM Studio và các nhà cung cấp tương thích khác
- **[Thiết lập TTS cục bộ](local-tts.md)** - Chuyển văn bản thành giọng nói bằng bài phát biểu
- **[Thiết lập STT cục bộ](local-stt.md)** - Chuyển lời nói thành văn bản bằng bài phát biểu
- **[Xử lý sự cố](../6-TROUBLESHOOTING/quick-fixes.md)** - Các sự cố thường gặp và cách khắc phục