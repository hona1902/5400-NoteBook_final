# Nhà cung cấp tương thích với OpenAI

Sử dụng bất kỳ máy chủ nào triển khai định dạng API OpenAI với Open Notebook. Điều này bao gồm LM Studio, WebUI tạo văn bản, vLLM và nhiều thứ khác.

---

## Tương thích với OpenAI là gì?

Nhiều công cụ AI triển khai định dạng API giống như OpenAI:



```
POST /v1/chat/completions
POST /v1/embeddings
POST /v1/audio/speech
```



Open Notebook có thể kết nối với bất kỳ máy chủ nào bằng định dạng này.

---

## Máy chủ tương thích phổ biến

| Máy chủ | Trường hợp sử dụng | URL |
|--------|----------|------|
| **LM Studio** | GUI máy tính để bàn cho các mô hình cục bộ | https://lmstudio.ai |
| **WebUI tạo văn bản** | Suy luận cục bộ đầy đủ tính năng | https://github.com/oobabooga/text-thế hệ-webui |
| **vLLM** | Phục vụ hiệu suất cao | https://github.com/vllm-project/vllm |
| **Ollama** | Mô hình địa phương đơn giản | (Thay vào đó hãy sử dụng nhà cung cấp Ollama bản địa) |
| **AI địa phương** | Suy luận AI cục bộ | https://github.com/mudler/LocalAI |
| **máy chủ llama.cpp** | Suy luận nhẹ | https://github.com/ggerganov/llama.cpp |

---

## Cài đặt nhanh: LM Studio

### Bước 1: Cài đặt và khởi động LM Studio

1. Tải xuống từ https://lmstudio.ai
2. Cài đặt và khởi chạy
3. Tải xuống mô hình (ví dụ: Llama 3)
4. Khởi động máy chủ cục bộ (mặc định: cổng 1234)

### Bước 2: Cấu hình trong Giao diện người dùng Cài đặt (Khuyến nghị)

1. Đi tới **Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**→ Chọn**Tương thích với OpenAI**
3. Nhập URL cơ sở: `http://host.docker.internal:1234/v1` (Docker) hoặc `http://localhost:1234/v1` (local)
4. Khóa API: `lm-studio` (giữ chỗ, LM Studio không yêu cầu)
5. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

**Cũ (Không dùng nữa) — Biến môi trường:**

```bash
export OPENAI_COMPATIBLE_BASE_URL=http://localhost:1234/v1
export OPENAI_COMPATIBLE_API_KEY=not-needed
```



### Bước 3: Thêm Model vào Open Notebook

1. Đi tới **Cài đặt**→**Mẫu máy**2. Nhấp vào**Thêm mẫu**
3. Cấu hình:
   - **Nhà cung cấp**: `openai_tương thích`
   - **Tên mẫu**: Tên mẫu máy của bạn từ LM Studio
   - **Tên hiển thị**: `LM Studio - Llama 3`
4. Nhấp vào **Lưu**

---

## Cấu hình thông qua giao diện người dùng Cài đặt

Cách được đề xuất để định cấu hình các nhà cung cấp tương thích với OpenAI là thông qua Giao diện người dùng cài đặt:

1. Đi tới **Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**→ Chọn**Tương thích với OpenAI**
3. Nhập URL cơ sở và khóa API của bạn (nếu cần)
4. Tùy chọn định cấu hình URL cho mỗi dịch vụ cho LLM, Nhúng, TTS và STT
5. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

## Di sản: Biến môi trường (Không dùng nữa)

> **Không dùng nữa**: Các biến môi trường này không được dùng nữa. Thay vào đó hãy sử dụng Giao diện người dùng cài đặt.

### Mô hình ngôn ngữ (Trò chuyện)



```bash
OPENAI_COMPATIBLE_BASE_URL=http://localhost:1234/v1
OPENAI_COMPATIBLE_API_KEY=optional-api-key
```



### Nhúng



```bash
OPENAI_COMPATIBLE_BASE_URL_EMBEDDING=http://localhost:1234/v1
OPENAI_COMPATIBLE_API_KEY_EMBEDDING=optional-api-key
```



### Chuyển văn bản thành giọng nói



```bash
OPENAI_COMPATIBLE_BASE_URL_TTS=http://localhost:8969/v1
OPENAI_COMPATIBLE_API_KEY_TTS=optional-api-key
```



### Chuyển giọng nói thành văn bản



```bash
OPENAI_COMPATIBLE_BASE_URL_STT=http://localhost:9000/v1
OPENAI_COMPATIBLE_API_KEY_STT=optional-api-key
```



---

## Mạng Docker

Khi Open Notebook chạy trong Docker và máy chủ tương thích của bạn chạy trên máy chủ, hãy sử dụng URL cơ sở thích hợp khi thêm thông tin xác thực của bạn trong **Cài đặt → Khóa API**:

###macOS/Windows

**URL cơ sở:** `http://host.docker.internal:1234/v1`

###Linux

**URL cơ sở (Tùy chọn 1 — IP cầu nối Docker):** `http://172.17.0.1:1234/v1`

**Tùy chọn 2:** Sử dụng chế độ kết nối mạng máy chủ: `docker run --network Host ...`
Sau đó sử dụng URL cơ sở: `http://localhost:1234/v1`

### Cùng một mạng Docker



```yaml
# docker-compose.yml
services:
  open-notebook:
    # ...

  lm-studio:
    # your LM Studio container
    ports:
      - "1234:1234"
```



**URL cơ sở trong Cài đặt → Khóa API:** `http://lm-studio:1234/v1`

---

## Thiết lập WebUI tạo văn bản

### Bắt đầu với API được kích hoạt



```bash
python server.py --api --listen
```



### Định cấu hình sổ ghi chép mở

Trong **Cài đặt → Khóa API**, thêm thông tin xác thực **Tương thích với OpenAI** với URL cơ sở: `http://localhost:5000/v1`

### Ví dụ soạn thảo Docker



```yaml
services:
  text-gen:
    image: atinoda/text-generation-webui:default
    ports:
      - "5000:5000"
      - "7860:7860"
    volumes:
      - ./models:/app/models
    command: --api --listen

  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    depends_on:
      - text-gen
```



Sau đó, trong **Cài đặt → Khóa API**, thêm thông tin xác thực **Tương thích với OpenAI** với URL cơ sở: `http://text-gen:5000/v1`

---

## Thiết lập vLLM

### Khởi động máy chủ vLLM



```bash
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Llama-3.1-8B-Instruct \
  --port 8000
```



### Định cấu hình sổ ghi chép mở

Trong **Cài đặt → Khóa API**, thêm thông tin xác thực **Tương thích với OpenAI** với URL cơ sở: `http://localhost:8000/v1`

### Docker Compose với GPU



```yaml
services:
  vllm:
    image: vllm/vllm-openai:latest
    command: --model meta-llama/Llama-3.1-8B-Instruct
    ports:
      - "8000:8000"
    volumes:
      - ~/.cache/huggingface:/root/.cache/huggingface
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    depends_on:
      - vllm
```



Sau đó, trong **Cài đặt → Khóa API**, thêm thông tin xác thực **Tương thích với OpenAI** với URL cơ sở: `http://vllm:8000/v1`

---

## Thêm mô hình vào sổ ghi chép đang mở

### Qua giao diện người dùng Cài đặt

1. Đi tới **Cài đặt**→**Mẫu máy**2. Nhấp vào**Thêm mẫu** trong phần thích hợp
3. Chọn **Nhà cung cấp**: `openai_tương thích`
4. Nhập **Tên mẫu**: chính xác như máy chủ mong đợi
5. Nhập **Tên hiển thị**: tên ưa thích của bạn
6. Nhấp vào **Lưu**

### Định dạng tên mẫu

Tên mô hình phải khớp với những gì máy chủ của bạn mong đợi:

| Máy chủ | Định dạng tên mẫu |
|--------|-------------------|
| Studio LM | Như được hiển thị trong LM Studio UI |
| vLLM | Đường dẫn mô hình HuggingFace |
| Văn bản Gen WebUI | Như đã tải trong UI |
| llama.cpp | Tên tệp mẫu |

---

## Kiểm tra kết nối

### Điểm cuối API kiểm tra



```bash
# Test chat completions
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-name",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```



### Kiểm tra từ Docker bên trong



```bash
docker exec -it open-notebook curl http://host.docker.internal:1234/v1/models
```



---

## Khắc phục sự cố

### Kết nối bị từ chối



```
Problem: Cannot connect to server

Solutions:
1. Verify server is running
2. Check port is correct
3. Test with curl directly
4. Check Docker networking (use host.docker.internal)
5. Verify firewall allows connection
```



### Không tìm thấy mẫu



```
Problem: Server returns "model not found"

Solutions:
1. Check model is loaded in server
2. Verify exact model name spelling
3. List available models: curl http://localhost:1234/v1/models
4. Update model name in Open Notebook
```



### Phản hồi chậm



```
Problem: Requests take very long

Solutions:
1. Check server resources (RAM, GPU)
2. Use smaller/quantized model
3. Reduce context length
4. Enable GPU acceleration if available
```



### Lỗi xác thực



```
Problem: 401 or authentication failed

Solutions:
1. Check if server requires API key
2. Set the API key in your credential (Settings → API Keys)
3. Some servers need any non-empty key (use a placeholder like "not-needed")
```



### Lỗi hết thời gian chờ



```
Problem: Request times out

Solutions:
1. Model may be loading (first request slow)
2. Increase timeout settings
3. Check server logs for errors
4. Reduce request size
```



---

## Nhiều điểm cuối tương thích

Bạn có thể sử dụng các máy chủ tương thích khác nhau cho các mục đích khác nhau. Khi thêm thông tin xác thực **OpenAI-Compatible**trong**Cài đặt → Khóa API**, bạn có thể định cấu hình URL cho mỗi dịch vụ:

- **URL LLM**: ví dụ: `http://localhost:1234/v1` (LM Studio)
- **URL nhúng**: ví dụ: `http://localhost:8080/v1` (máy chủ khác)
- **URL TTS**: ví dụ: `http://localhost:8969/v1` (Bài phát biểu)
- **URL STT**: ví dụ: `http://localhost:9000/v1` (Bài phát biểu)

Ngoài ra, hãy thêm từng thông tin dưới dạng thông tin xác thực riêng biệt với URL cơ sở riêng.

---

## Mẹo về hiệu suất

### Lựa chọn mẫu

| Kích thước mô hình | Cần RAM | Tốc độ |
|----------||-------------|-------|
| 7B | 8GB | Nhanh |
| 13B | 16GB | Trung bình |
| 70B | 64GB+ | Chậm |

### Lượng tử hóa

Sử dụng các mô hình lượng tử hóa (Q4, Q5) để suy luận nhanh hơn với ít RAM hơn:



```
llama-3-8b-q4_k_m.gguf  → ~4GB RAM, fast
llama-3-8b-f16.gguf     → ~16GB RAM, slower
```



### Tăng tốc GPU

Kích hoạt GPU trong máy chủ của bạn để suy luận nhanh hơn nhiều:
- LM Studio: Cài đặt → Lớp GPU
- vLLM: Tự động với CUDA
- llama.cpp: `--n-gpu-layer 35`

---

## So sánh: Bản địa và Tương thích

| Khía cạnh | Nhà cung cấp bản địa | Tương thích với OpenAI |
|--------|-------------------|-------------------|
| **Thiết lập** | Chỉ khóa API | Máy chủ + cấu hình |
| **Mô hình** | Mô hình của nhà cung cấp | Bất kỳ mẫu tương thích nào |
| **Chi phí** | Trả tiền cho mỗi mã thông báo | Miễn phí (địa phương) |
| **Tốc độ** | Thường nhanh | Phụ thuộc vào phần cứng |
| **Tính năng** | Hỗ trợ đầy đủ | Tính năng cơ bản |

Sử dụng tính năng tương thích với OpenAI khi:
- Chạy mô hình địa phương
- Sử dụng các mô hình tùy chỉnh/tinh chỉnh
- Yêu cầu về quyền riêng tư
- Kiểm soát chi phí

---

## Có liên quan

- **[Thiết lập TTS cục bộ](local-tts.md)** - Chuyển văn bản thành giọng nói bằng bài phát biểu
- **[Thiết lập STT cục bộ](local-stt.md)** - Chuyển lời nói thành văn bản bằng bài phát biểu
- **[AI Providers](ai-providers.md)** - Tất cả các tùy chọn của nhà cung cấp
- **[Ollama Setup](ollama.md)** - Tích hợp Ollama gốc