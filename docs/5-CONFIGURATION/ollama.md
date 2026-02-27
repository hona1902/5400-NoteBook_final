#Hướng dẫn cài đặt Ollama

Ollama cung cấp các mô hình AI cục bộ, miễn phí chạy trên phần cứng của riêng bạn. Hướng dẫn này bao gồm mọi thứ bạn cần biết về việc thiết lập Ollama với Open Notebook, bao gồm các kịch bản triển khai và cấu hình mạng khác nhau.

##Tại sao chọn Ollama?

- **🆓 Hoàn toàn miễn phí**: Không mất phí API sau khi thiết lập ban đầu
- **🔒 Quyền riêng tư hoàn toàn**: Dữ liệu của bạn không bao giờ rời khỏi mạng cục bộ
- **📱 Có khả năng ngoại tuyến**: Hoạt động mà không cần kết nối internet
- **🚀 Nhanh**: Suy luận cục bộ không có độ trễ mạng
- **🧠 Mô hình lý luận**: Hỗ trợ các mô hình lý luận nâng cao như DeepSeek-R1
- **💾 Model Variety**: Truy cập vào hàng trăm mô hình nguồn mở

## Bắt đầu nhanh

### 1. Cài đặt Ollama

**Linux/macOS:**

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```



**Cửa sổ:**
Tải xuống và cài đặt từ [ollama.ai](https://ollama.ai/download)

### 2. Kéo các mẫu cần thiết



```bash
# Language models (choose one or more)
ollama pull qwen3              # Excellent general purpose, 7B parameters
ollama pull gemma3            # Google's model, good performance
ollama pull deepseek-r1       # Advanced reasoning model
ollama pull phi4              # Microsoft's efficient model

# Embedding model (required for search)
ollama pull mxbai-embed-large  # Best embedding model for Ollama
```



### 3. Cấu hình mở Notebook

**Thông qua giao diện người dùng Cài đặt (Được khuyến nghị):**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**→ Chọn**Ollama**
3. Nhập URL cơ sở (xem [Cấu hình mạng](#network-configuration-guide) bên dưới để biết URL chính xác)
4. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**5. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

**Cũ (Không dùng nữa) — Biến môi trường:**

```bash
# For local installation:
export OLLAMA_API_BASE=http://localhost:11434
# For Docker installation:
export OLLAMA_API_BASE=http://host.docker.internal:11434
```



> **Lưu ý**: Biến môi trường `OLLAMA_API_BASE` không được dùng nữa. Thay vào đó, hãy định cấu hình Ollama thông qua Cài đặt → Khóa API.

## Hướng dẫn cấu hình mạng

Khi thêm thông tin xác thực Ollama trong **Cài đặt → Khóa API**, bạn cần nhập đúng URL cơ sở. URL chính xác tùy thuộc vào kịch bản triển khai của bạn:

### Tình huống 1: Cài đặt cục bộ (Cùng máy)

Khi cả Open Notebook và Ollama đều chạy trực tiếp trên máy của bạn:

**URL cơ sở để nhập vào Cài đặt → Khóa API:** `http://localhost:11434`

Thay thế: `http://127.0.0.1:11434` (sử dụng nếu bạn gặp vấn đề về độ phân giải DNS với localhost)

### Tình huống 2: Mở Notebook trong Docker, Ollama trên Host

Khi Open Notebook chạy trong Docker nhưng Ollama chạy trên máy chủ của bạn:

**URL cơ sở để nhập vào Cài đặt → Khóa API:** `http://host.docker.internal:11434`

**⚠️ QUAN TRỌNG: Ollama phải chấp nhận các kết nối bên ngoài:**

```bash
# Start Ollama with external access enabled
export OLLAMA_HOST=0.0.0.0:11434
ollama serve
```



**⚠️ NGƯỜI SỬ DỤNG LINUX: Cần có cấu hình bổ sung!**

Trên Linux, `host.docker.internal` không tự động giải quyết như trên macOS/Windows. Bạn phải thêm `extra_hosts` vào docker-compose.yml của mình:



```yaml
services:
  open_notebook:
    image: lfnovo/open_notebook:v1-latest-single
    # ... other settings ...
    extra_hosts:
      - "host.docker.internal:host-gateway"
```



Nếu không có điều này, bạn sẽ gặp các lỗi kết nối như:

```
httpcore.ConnectError: [Errno -2] Name or service not known
```



**Tại sao lại là `host.docker.internal`?**
- Docker container không thể truy cập `localhost` trên máy chủ
- `host.docker.internal` là tên máy chủ đặc biệt của Docker dành cho máy chủ
- Có sẵn trên Docker Desktop cho Mac/Windows; **yêu cầu `extra_hosts` trên Linux**

**Tại sao `OLLAMA_HOST=0.0.0.0:11434`?**
- Mặc định Ollama chỉ liên kết với localhost và từ chối các kết nối bên ngoài
- Docker container được coi là "bên ngoài" ngay cả khi chạy trên cùng một máy
- Cài đặt `OLLAMA_HOST=0.0.0.0:11434` cho phép kết nối từ vùng chứa Docker

### Kịch bản 3: Cả hai trong Docker (Same Compose)

Khi cả Open Notebook và Ollama đều chạy trong cùng một ngăn xếp Docker Compose:

**URL cơ sở để nhập vào Cài đặt → Khóa API:** `http://ollama:11434`

**Ví dụ soạn thảo Docker:**



```yaml
version: '3.8'
services:
  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    ports:
      - "8502:8502"
      - "5055:5055"
    environment:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=change-me-to-a-secret-string
    volumes:
      - ./notebook_data:/app/data
      - ./surreal_data:/mydata
    depends_on:
      - ollama

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    # Optional: GPU support
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

volumes:
  ollama_data:
```



### Kịch bản 4: Máy chủ Ollama từ xa

Khi Ollama chạy trên một máy khác trong mạng của bạn:

**URL cơ sở để nhập vào Cài đặt → Khóa API:** `http://192.168.1.100:11434` (thay thế bằng IP máy chủ Ollama của bạn)

**Ghi chú Bảo mật:** Chỉ sử dụng tính năng này trong các mạng đáng tin cậy. Ollama không có tính năng xác thực tích hợp.

### Kịch bản 5: Ollama với cổng tùy chỉnh

Nếu bạn đã định cấu hình Ollama để sử dụng một cổng khác:



```bash
# Start Ollama on custom port
OLLAMA_HOST=0.0.0.0:8080 ollama serve
```



**URL cơ sở để nhập vào Cài đặt → Khóa API:** `http://localhost:8080`

## Đề xuất mô hình

### Mô hình ngôn ngữ

| Người mẫu | Kích thước | Tốt nhất cho | Chất lượng | Tốc độ |
|-------|------|----------|----------|-------|
| **qwen3** | 7B | Mục đích chung, mã hóa | Xuất sắc | Nhanh |
| **deepseek-r1** | 7B | Lý luận, giải quyết vấn đề | Đặc biệt | Trung bình |
| **đá quý3** | 7B | Hiệu suất cân bằng | Rất Tốt | Nhanh |
| **phi4** | 14B | Hiệu quả trên phần cứng nhỏ | Tốt | Rất nhanh |
| **llama3** | 8B | Mục đích chung | Rất Tốt | Trung bình |

### Nhúng mô hình

| Người mẫu | Tốt nhất cho | Hiệu suất |
|-------|----------|-------------|
| **mxbai-nhúng-lớn** | Tìm kiếm chung | Xuất sắc |
| **văn bản nhúng-nomic** | Sự tương đồng về tài liệu | Tốt |
| **tối thiểu** | Tùy chọn nhẹ | Hội chợ |

### Lệnh cài đặt



```bash
# Essential models
ollama pull qwen3                 # Primary language model
ollama pull mxbai-embed-large     # Search embeddings

# Optional reasoning model
ollama pull deepseek-r1           # Advanced reasoning

# Alternative language models
ollama pull gemma3                # Google's model
ollama pull phi4                  # Microsoft's efficient model
```



## Yêu cầu phần cứng

### Yêu cầu tối thiểu
- **RAM**: 8GB (đối với model 7B)
- **Bộ nhớ**: 10GB dung lượng trống cho mỗi model
- **CPU**: Bộ xử lý đa lõi hiện đại

### Thiết lập được đề xuất
- **RAM**: 16GB+ (dành cho nhiều model)
- **Bộ nhớ**: SSD có dung lượng trống từ 50GB trở lên
- **GPU**: GPU NVIDIA với 8GB+ VRAM (tùy chọn nhưng nhanh hơn)

### Tăng tốc GPU

**GPU NVIDIA (CUDA):**

```bash
# Install NVIDIA Container Toolkit for Docker
# Then use the Docker Compose example above with GPU support

# For local installation, Ollama auto-detects CUDA
ollama pull qwen3
```



**Apple Silicon (M1/M2/M3):**

```bash
# Ollama automatically uses Metal acceleration
# No additional setup required
ollama pull qwen3
```



**GPU AMD:**

```bash
# ROCm support varies by model and system
# Check Ollama documentation for latest compatibility
```



## Khắc phục sự cố

### Cấu hình tên mẫu (Quan trọng)

**⚠️ QUAN TRỌNG: Tên mẫu phải khớp chính xác với đầu ra của `danh sách ollama`**

Đây là nguyên nhân phổ biến nhất gây ra lỗi "Không gửi được tin nhắn". Open Notebook yêu cầu **tên model chính xác** như xuất hiện trong Ollama.

**Bước 1: Lấy tên model chính xác**

```bash
ollama list
```



Đầu ra ví dụ:

```
NAME                        ID              SIZE      MODIFIED
mxbai-embed-large:latest    468836162de7    669 MB    7 minutes ago
gemma3:12b                  f4031aab637d    8.1 GB    2 months ago
qwen3:32b                   030ee887880f    20 GB     9 days ago
```



**Bước 2: Sử dụng tên chính xác khi thêm mô hình vào Open Notebook**

| ✅ Đúng | ❌ Sai |
|----------||----------|
| `gemma3:12b` | `gemma3` (thiếu thẻ) |
| `qwen3:32b` | `qwen3-32b` (sai định dạng) |
| `mxbai-embed-large:mới nhất` | `mxbai-embed-large` (thiếu thẻ) |

**Lưu ý:** Một số kiểu máy sử dụng `:latest` làm thẻ mặc định. Nếu `danh sách ollama` hiển thị `model:mới nhất`, bạn phải sử dụng `model:mới nhất` trong Open Notebook, không chỉ `model`.

**Bước 3: Cấu hình trong Open Notebook**

1. Đi tới **Cài đặt → Kiểu máy**2. Nhấp vào**Thêm mẫu**3. Nhập**tên chính xác** từ `danh sách ollama`
4. Chọn nhà cung cấp: `ollama`
5. Chọn loại: `ngôn ngữ` (để trò chuyện) hoặc `nhúng` (để tìm kiếm)
6. Lưu mô hình
7. Đặt nó làm mặc định cho tác vụ thích hợp (trò chuyện, chuyển đổi, v.v.)

### Các vấn đề thường gặp

**1. "Ollama không có sẵn" trong Sổ tay mở**

**Kiểm tra Ollama đang chạy:**

```bash
curl http://localhost:11434/api/tags
```



**Xác minh thông tin xác thực đã được định cấu hình:**Kiểm tra**Cài đặt → Khóa API** để biết thông tin xác thực Ollama có URL cơ sở chính xác.

**⚠️ QUAN TRỌNG: Kích hoạt kết nối bên ngoài (cách khắc phục phổ biến nhất):**

```bash
# If Open Notebook runs in Docker or on a different machine,
# Ollama must bind to all interfaces, not just localhost
export OLLAMA_HOST=0.0.0.0:11434
ollama serve
```

> **Tại sao cần điều này:** Theo mặc định, Ollama chỉ chấp nhận kết nối từ `localhost` (127.0.0.1). Khi Open Notebook chạy trong Docker hoặc trên một máy khác, nó không thể truy cập Ollama trừ khi bạn định cấu hình `OLLAMA_HOST=0.0.0.0:11434` để chấp nhận các kết nối bên ngoài.

**Khởi động lại Ollama:**

```bash
# Linux/macOS
sudo systemctl restart ollama
# or
ollama serve

# Windows
# Restart from system tray or Services
```



**2. Sự cố mạng Docker**

**Từ bên trong hộp Open Notebook, kiểm tra Ollama:**

```bash
# Get into container
docker exec -it open-notebook bash

# Test connection
curl http://host.docker.internal:11434/api/tags
```



**Nếu điều này không thành công trên Linux** với "Tên hoặc dịch vụ không xác định", bạn cần thêm `extra_hosts` vào docker-compose.yml của mình. Xem phần [Khắc phục sự cố dành riêng cho Docker](#docker-specific-troubleshooting) bên dưới.

**3. Mô hình không tải xuống**

**Kiểm tra dung lượng ổ đĩa:**

```bash
df -h
```



**Kéo mô hình thủ công:**

```bash
ollama pull qwen3 --verbose
```



**Xóa các bản tải xuống không thành công:**

```bash
ollama rm qwen3
ollama pull qwen3
```



**4. Hiệu suất chậm**

**Kiểm tra kích thước model so với RAM có sẵn:**

```bash
ollama ps  # Show running models
free -h    # Check available memory
```



**Sử dụng mô hình nhỏ hơn:**

```bash
ollama pull phi4         # Instead of larger models
ollama pull gemma3:2b   # 2B parameter variant
```



**5. Xung đột cổng**

**Kiểm tra những gì đang sử dụng cổng 11434:**

```bash
lsof -i :11434
netstat -tulpn | grep 11434
```



**Sử dụng cổng tùy chỉnh:**

```bash
OLLAMA_HOST=0.0.0.0:8080 ollama serve
```

Sau đó cập nhật URL cơ sở trong **Cài đặt → Khóa API** thành `http://localhost:8080`

**6. "Không gửi được tin nhắn" trong Trò chuyện**

**Triệu chứng:** Trò chuyện hiển thị thông báo bánh mì nướng "Không thể gửi tin nhắn". Nhật ký có thể hiển thị:

```
Error executing chat: Model is not a LanguageModel: None
```



**Nguyên nhân (theo thứ tự khả năng xảy ra):**

1. **Tên model không khớp**: Tên model trong Open Notebook không khớp chính xác với `danh sách ollama`
2. **Chưa định cấu hình kiểu máy mặc định**: Bạn chưa đặt kiểu trò chuyện mặc định trong Cài đặt → Kiểu máy
3. **Mô hình đã bị xóa**: Bạn đã xóa mô hình khỏi Ollama nhưng không cập nhật cài đặt mặc định của Open Notebook
4. **Bản ghi mô hình đã bị xóa**: Mô hình đã bị xóa khỏi Open Notebook nhưng vẫn được đặt làm mặc định

**Giải pháp:**

**Kiểm tra 1: Xác minh tên mẫu máy khớp chính xác**

```bash
# Get exact model names from Ollama
ollama list

# Compare with what's configured in Open Notebook
# Go to Settings → Models and verify the names match EXACTLY
```



**Kiểm tra 2: Xác minh rằng các mẫu mặc định đã được đặt**1. Đi tới**Cài đặt → Kiểu máy**2. Di chuyển đến phần**Mẫu mặc định**3. Đảm bảo**Mô hình trò chuyện mặc định** có giá trị được chọn
4. Nếu trống, hãy chọn mô hình ngôn ngữ có sẵn

**Kiểm tra 3: Làm mới sau khi thay đổi**
Nếu bạn đã thêm/xóa mô hình trong Ollama:
1. Làm mới trang Open Notebook
2. Vào Cài đặt → Kiểu máy
3. Thêm lại bất kỳ mẫu nào bị thiếu với tên chính xác từ `danh sách ollama`
4. Chọn lại các mẫu mặc định nếu cần

**Kiểm tra 4: Kiểm tra mô hình trực tiếp**

```bash
# Verify Ollama can use the model
ollama run gemma3:12b "Hello, world"
```



### Khắc phục sự cố dành riêng cho Docker

**1. Linux: `host.docker.internal` không giải quyết được (Phổ biến nhất)**

Nếu bạn thấy lỗi `Name or service not known` trên Linux, hãy thêm `extra_hosts` vào docker-compose.yml của bạn:



```yaml
services:
  open_notebook:
    image: lfnovo/open_notebook:v1-latest-single
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
    # ... rest of your config
```



Sau đó, trong **Cài đặt → Khóa API**, hãy sử dụng URL cơ sở: `http://host.docker.internal:11434`

Điều này ánh xạ `host.docker.internal` tới IP của máy chủ của bạn. macOS/Windows Docker Desktop thực hiện việc này một cách tự động, nhưng Linux yêu cầu cấu hình rõ ràng.

**2. Mạng máy chủ trên Linux (thay thế):**

```bash
# Use host networking if host.docker.internal doesn't work
docker run --network host lfnovo/open_notebook:v1-latest-single
```

Sau đó, trong **Cài đặt → Khóa API**, hãy sử dụng URL cơ sở: `http://localhost:11434`

**3. Mạng cầu tùy chỉnh:**

```yaml
version: '3.8'
networks:
  ollama_network:
    driver: bridge

services:
  open-notebook:
    networks:
      - ollama_network
    environment:
  ollama:
    networks:
      - ollama_network
```



Sau đó, trong **Cài đặt → Khóa API**, hãy sử dụng URL cơ sở: `http://ollama:11434`

**4. Sự cố tường lửa:**

```bash
# Allow Ollama port through firewall
sudo ufw allow 11434
# or
sudo firewall-cmd --add-port=11434/tcp --permanent
```



## Tối ưu hóa hiệu suất

###Quản lý người mẫu

**Liệt kê các model đã cài đặt:**

```bash
ollama list
```



**Xóa các mẫu không sử dụng:**

```bash
ollama rm model_name
```



**Hiển thị các model đang chạy:**

```bash
ollama ps
```



**Tải trước các mô hình để khởi động nhanh hơn:**

```bash
# Keep model in memory
curl http://localhost:11434/api/generate -d '{
  "model": "qwen3",
  "prompt": "test",
  "keep_alive": -1
}'
```



###Tối ưu hóa hệ thống

**Linux: Tăng giới hạn tệp:**

```bash
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf
```



**macOS: Tăng giới hạn bộ nhớ:**

```bash
# Add to ~/.zshrc or ~/.bash_profile
export OLLAMA_MAX_LOADED_MODELS=2
export OLLAMA_NUM_PARALLEL=4
```



**Docker: Phân bổ tài nguyên:**

```yaml
services:
  ollama:
    deploy:
      resources:
        limits:
          memory: 8G
          cpus: '4'
```



## Cấu hình nâng cao

### Biến môi trường



```bash
# Ollama server configuration
export OLLAMA_HOST=0.0.0.0:11434      # Bind to all interfaces
export OLLAMA_KEEP_ALIVE=5m            # Keep models in memory
export OLLAMA_MAX_LOADED_MODELS=3      # Max concurrent models
export OLLAMA_MAX_QUEUE=512            # Request queue size
export OLLAMA_NUM_PARALLEL=4           # Parallel request handling
export OLLAMA_FLASH_ATTENTION=1        # Enable flash attention (if supported)

# Open Notebook configuration (configure via Settings → API Keys instead)
# OLLAMA_API_BASE=http://localhost:11434  # Deprecated — use Settings UI
```



### Cấu hình SSL (Chứng chỉ tự ký)

Nếu bạn đang chạy Ollama sau proxy ngược có chứng chỉ SSL tự ký (ví dụ: Caddy, nginx với chứng chỉ tùy chỉnh), bạn có thể gặp phải lỗi xác minh SSL:



```
[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate
```



**Giải pháp:**

**Tùy chọn 1: Sử dụng gói CA tùy chỉnh (được khuyến nghị)**

```bash
# Point to your CA certificate file
export ESPERANTO_SSL_CA_BUNDLE=/path/to/your/ca-bundle.pem
```



**Tùy chọn 2: Tắt xác minh SSL (chỉ dành cho phát triển)**

```bash
# WARNING: Only use in trusted development environments
export ESPERANTO_SSL_VERIFY=false
```



**Ví dụ về Docker Compose với cấu hình SSL:**

```yaml
services:
  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    environment:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=change-me-to-a-secret-string
      # Option 1: Custom CA bundle (if Ollama uses self-signed SSL)
      - ESPERANTO_SSL_CA_BUNDLE=/certs/ca-bundle.pem
      # Option 2: Disable verification (dev only)
      # - ESPERANTO_SSL_VERIFY=false
    volumes:
      - /path/to/your/ca-bundle.pem:/certs/ca-bundle.pem:ro
```



> **Lưu ý bảo mật:** Việc tắt xác minh SSL có thể khiến bạn gặp phải các cuộc tấn công trung gian. Luôn ưu tiên sử dụng gói CA tùy chỉnh trong môi trường sản xuất.

### Nhập mô hình tùy chỉnh

**Nhập mô hình tùy chỉnh:**

```bash
# Create Modelfile
cat > Modelfile << EOF
FROM qwen3
PARAMETER temperature 0.7
PARAMETER top_p 0.9
SYSTEM "You are a helpful research assistant."
EOF

# Create custom model
ollama create my-research-model -f Modelfile
```



**Sử dụng trong Notebook đang mở:**
1. Vào phần Mô hình
2. Thêm mô hình mới: `my-research-model`
3. Đặt làm mặc định cho các tác vụ cụ thể

### Giám sát và ghi nhật ký

**Theo dõi nhật ký Ollama:**

```bash
# Linux (systemd)
journalctl -u ollama -f

# Docker
docker logs -f ollama

# Manual run with verbose logging
OLLAMA_DEBUG=1 ollama serve
```



**Giám sát tài nguyên:**

```bash
# CPU and memory usage
htop

# GPU usage (NVIDIA)
nvidia-smi -l 1

# Model-specific metrics
ollama ps
```



## Ví dụ về tích hợp

### Tích hợp tập lệnh Python



```python
import requests
import os

# Test Ollama connection
ollama_base = os.environ.get('OLLAMA_API_BASE', 'http://localhost:11434')
response = requests.get(f'{ollama_base}/api/tags')
print(f"Available models: {response.json()}")

# Generate text
payload = {
    "model": "qwen3",
    "prompt": "Explain quantum computing",
    "stream": False
}
response = requests.post(f'{ollama_base}/api/generate', json=payload)
print(response.json()['response'])
```



### Kịch bản kiểm tra sức khỏe



```bash
#!/bin/bash
# ollama-health-check.sh

OLLAMA_API_BASE=${OLLAMA_API_BASE:-"http://localhost:11434"}

echo "Checking Ollama health..."
if curl -s "${OLLAMA_API_BASE}/api/tags" > /dev/null; then
    echo "✅ Ollama is running"
    echo "Available models:"
    curl -s "${OLLAMA_API_BASE}/api/tags" | jq -r '.models[].name'
else
    echo "❌ Ollama is not accessible at ${OLLAMA_API_BASE}"
    exit 1
fi
```



## Di chuyển từ các nhà cung cấp khác

### Đến từ OpenAI

**Mô hình hiệu suất tương tự:**
- GPT-4 → `qwen3` hoặc `deepseek-r1`
- GPT-3.5 → `gemma3` hoặc `phi4`
- text-embed-ada-002 → `mxbai-embed-large`

**So sánh chi phí:**
- OpenAI: 0,01-0,06 USD cho mỗi 1K mã thông báo
- Ollama: 0$ sau khi đầu tư phần cứng

### Đến từ nhân loại

**Gợi ý thay thế Claude:**
- Claude 3.5 Sonnet → `deepseek-r1` (lý luận)
- Claude 3 Haiku → `phi4` (tốc độ)

## Các phương pháp hay nhất

### Bảo vệ

1. **An ninh mạng:**
   - Chỉ chạy Ollama trên các mạng đáng tin cậy
   - Sử dụng quy tắc tường lửa để hạn chế quyền truy cập
   - Xem xét VPN để truy cập từ xa

2. **Xác minh mẫu:**
   - Chỉ lấy mô hình từ các nguồn đáng tin cậy
   - Xác minh tổng kiểm tra mô hình khi có thể

3. **Giới hạn tài nguyên:**
   - Đặt giới hạn bộ nhớ và CPU trong sản xuất
   - Giám sát việc sử dụng tài nguyên thường xuyên

### Hiệu suất

1. **Lựa chọn mẫu:**
   - Sử dụng kích thước mô hình phù hợp cho phần cứng của bạn
   - Mô hình nhỏ hơn cho các nhiệm vụ đơn giản
   - Chỉ lập luận mô hình khi cần thiết

2. **Quản lý tài nguyên:**
   - Tải trước các mô hình được sử dụng thường xuyên
   - Thường xuyên loại bỏ những model không sử dụng
   - Giám sát tài nguyên hệ thống

3. **Tối ưu hóa mạng:**
   - Sử dụng mạng cục bộ để có độ trễ tốt hơn
   - Cân nhắc việc lưu trữ SSD để tải mô hình nhanh hơn

## Nhận trợ giúp

**Tài nguyên cộng đồng:**
- [Ollama GitHub](https://github.com/jmorganca/ollama) - Kho lưu trữ chính thức
- [Ollama Discord](https://discord.gg/ollama) - Hỗ trợ cộng đồng
- [Open Notebook Discord](https://discord.gg/37XJPXfz2w) - Trợ giúp tích hợp

**Tài nguyên gỡ lỗi:**
- Kiểm tra nhật ký Ollama để tìm thông báo lỗi
- Kiểm tra kết nối bằng lệnh cuộn tròn
- Xác minh các biến môi trường
- Giám sát tài nguyên hệ thống

Hướng dẫn toàn diện này sẽ giúp bạn triển khai và tối ưu hóa thành công Ollama với Open Notebook. Bắt đầu với phần Bắt đầu nhanh và tham khảo các tình huống cụ thể nếu cần.