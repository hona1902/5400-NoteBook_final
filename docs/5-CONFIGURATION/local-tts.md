# Thiết lập chuyển văn bản thành giọng nói cục bộ

Chạy tính năng chuyển văn bản thành giọng nói cục bộ để tạo podcast riêng tư, miễn phí bằng cách sử dụng máy chủ TTS tương thích với OpenAI.

---

## Tại sao là TTS địa phương?

| Lợi ích | Mô tả |
|----------|-------------|
| **Miễn phí** | Không có chi phí cho mỗi ký tự sau khi thiết lập |
| **Riêng tư** | Âm thanh không bao giờ rời khỏi máy của bạn |
| **Không giới hạn** | Không có giới hạn tỷ lệ hoặc hạn ngạch |
| **Ngoại tuyến** | Hoạt động mà không cần internet |

---

## Bắt đầu nhanh với bài phát biểu

[Speaches](https://github.com/speaches-ai/speaches) là một máy chủ TTS mã nguồn mở, tương thích với OpenAI.

> **💡 Có sẵn các tệp Docker Compose được tạo sẵn:**> -**[docker-compose-speaches.yml](../../examples/docker-compose-speaches.yml)** - Speakes + Open Notebook
> - **[docker-compose-full-local.yml](../../examples/docker-compose-full-local.yml)** - Speakes + Ollama (thiết lập cục bộ 100%)
>
> Chúng bao gồm hướng dẫn thiết lập đầy đủ và ví dụ về cấu hình. Chỉ cần sao chép và chạy!

### Bước 1: Tạo file Docker Compose

Tạo một thư mục và thêm `docker-compose.yml`:



```yaml
services:
  speaches:
    image: ghcr.io/speaches-ai/speaches:latest-cpu
    container_name: speaches
    ports:
      - "8969:8000"
    volumes:
      - hf-hub-cache:/home/ubuntu/.cache/huggingface/hub
    restart: unless-stopped

volumes:
  hf-hub-cache:
```



### Bước 2: Bắt đầu và tải xuống mô hình



```bash
# Start Speaches
docker compose up -d

# Wait for startup
sleep 10

# Download voice model (~500MB)
docker compose exec speaches uv tool run speaches-cli model download speaches-ai/Kokoro-82M-v1.0-ONNX
```



### Bước 3: Kiểm tra



```bash
curl "http://localhost:8969/v1/audio/speech" -s \
  -H "Content-Type: application/json" \
  --output test.mp3 \
  --data '{
    "input": "Hello! Local TTS is working.",
    "model": "speaches-ai/Kokoro-82M-v1.0-ONNX",
    "voice": "af_bella"
  }'
```



Chơi `test.mp3` để xác minh.

### Bước 4: Cấu hình Open Notebook

**Thông qua giao diện người dùng Cài đặt (Được khuyến nghị):**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**→ Chọn**Tương thích với OpenAI**
3. Nhập URL cơ sở cho TTS: `http://host.docker.internal:8969/v1` (Docker) hoặc `http://localhost:8969/v1` (local)
4. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

**Cũ (Không dùng nữa) — Biến môi trường:**

```yaml
# In your Open Notebook docker-compose.yml
environment:
  - OPENAI_COMPATIBLE_BASE_URL_TTS=http://host.docker.internal:8969/v1
```





```bash
# Local development
export OPENAI_COMPATIBLE_BASE_URL_TTS=http://localhost:8969/v1
```



### Bước 5: Thêm Model vào Open Notebook

1. Đi tới **Cài đặt**→**Mẫu máy**2. Nhấp vào**Thêm mô hình** trong phần Chuyển văn bản thành giọng nói
3. Cấu hình:
   - **Nhà cung cấp**: `openai_tương thích`
   - **Tên mẫu**: `speaches-ai/Kokoro-82M-v1.0-ONNX`
   - **Tên hiển thị**: `TTS cục bộ`
4. Nhấp vào **Lưu**
5. Đặt làm mặc định nếu muốn

---

## Giọng nói có sẵn

Mô hình Kokoro bao gồm nhiều giọng nói:

### Giọng nữ
| ID giọng nói | Mô tả |
|----------|-------------|
| `af_bella` | Rõ ràng, chuyên nghiệp |
| `af_sarah` | Ấm áp, thân thiện |
| `af_nicole` | Năng động, biểu cảm |

### Giọng nam
| ID giọng nói | Mô tả |
|----------|-------------|
| `am_adam` | Sâu sắc, có thẩm quyền |
| `am_michael` | Thân thiện, trò chuyện |

### Giọng Anh
| ID giọng nói | Mô tả |
|----------|-------------|
| `bf_emma` | Nữ Anh, chuyên nghiệp |
| `bm_george` | Nam người Anh, trang trọng |

### Kiểm tra các giọng nói khác nhau



```bash
for voice in af_bella af_sarah am_adam am_michael; do
  curl "http://localhost:8969/v1/audio/speech" -s \
    -H "Content-Type: application/json" \
    --output "test_${voice}.mp3" \
    --data "{
      \"input\": \"Hello, this is the ${voice} voice.\",
      \"model\": \"speaches-ai/Kokoro-82M-v1.0-ONNX\",
      \"voice\": \"${voice}\"
    }"
done
```



---

## Tăng tốc GPU

Để tạo ra thế hệ nhanh hơn với GPU NVIDIA:



```yaml
services:
  speaches:
    image: ghcr.io/speaches-ai/speaches:latest-cuda
    container_name: speaches
    ports:
      - "8969:8000"
    volumes:
      - hf-hub-cache:/home/ubuntu/.cache/huggingface/hub
    restart: unless-stopped
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

volumes:
  hf-hub-cache:
```



---

## Mạng Docker

Khi định cấu hình thông tin xác thực Tương thích với OpenAI trong **Cài đặt → Khóa API**, hãy sử dụng URL cơ sở TTS thích hợp cho thiết lập của bạn:

### Mở Notebook trong Docker (macOS/Windows)

**URL cơ sở TTS:** `http://host.docker.internal:8969/v1`

### Mở Notebook trong Docker (Linux)

**URL cơ sở TTS (Tùy chọn 1 - IP cầu nối Docker):** `http://172.17.0.1:8969/v1`

**Tùy chọn 2:** Sử dụng chế độ kết nối mạng máy chủ (`docker run --network Host ...`), sau đó sử dụng: `http://localhost:8969/v1`

### Máy chủ từ xa

Chạy bài phát biểu trên một máy khác:

**URL cơ sở TTS:** `http://server-ip:8969/v1` (thay thế bằng IP máy chủ của bạn)

---

## Podcast nhiều loa

Định cấu hình các giọng nói khác nhau cho mỗi loa:



```
Speaker 1 (Host):
  Model: speaches-ai/Kokoro-82M-v1.0-ONNX
  Voice: af_bella

Speaker 2 (Guest):
  Model: speaches-ai/Kokoro-82M-v1.0-ONNX
  Voice: am_adam

Speaker 3 (Narrator):
  Model: speaches-ai/Kokoro-82M-v1.0-ONNX
  Voice: bf_emma
```



---

## Khắc phục sự cố

### Dịch vụ không bắt đầu



```bash
# Check logs
docker compose logs speaches

# Verify port available
lsof -i :8969

# Restart
docker compose down && docker compose up -d
```



### Kết nối bị từ chối



```bash
# Test Speaches is running
curl http://localhost:8969/v1/models

# From inside Open Notebook container
docker exec -it open-notebook curl http://host.docker.internal:8969/v1/models
```



### Không tìm thấy mẫu



```bash
# List downloaded models
docker compose exec speaches uv tool run speaches-cli model list

# Download if missing
docker compose exec speaches uv tool run speaches-cli model download speaches-ai/Kokoro-82M-v1.0-ONNX
```



### Chất lượng âm thanh kém

- Hãy thử những giọng nói khác nhau
- Điều chỉnh tốc độ: `"speed": 0.9` đến `1.2`
- Kiểm tra mô hình đã tải xuống hoàn toàn
- Phân bổ thêm bộ nhớ

### Thế hệ chậm

| Giải pháp | Như thế nào |
|----------|------|
| Sử dụng GPU | Chuyển sang hình ảnh `mới nhất-cuda` |
| Thêm CPU | Phân bổ nhiều lõi hơn trong Docker |
| Mô hình nhanh hơn | Sử dụng các mô hình nhỏ hơn/lượng tử hóa |
| lưu trữ SSD | Di chuyển khối lượng Docker sang SSD |

---

## Mẹo về hiệu suất

### Thông số kỹ thuật được đề xuất

| Thành phần | Tối thiểu | Được đề xuất |
|----------||----------|-------------|
| CPU | 2 lõi | 4+ lõi |
| RAM | 2GB | 4+GB |
| Lưu trữ | 5 GB | 10 GB (cho nhiều kiểu máy) |
| GPU | Không có | NVIDIA (tùy chọn) |

### Giới hạn tài nguyên



```yaml
services:
  speaches:
    # ... other config
    mem_limit: 4g
    cpus: 2
```



### Giám sát việc sử dụng



```bash
docker stats speaches
```



---

## So sánh: Cục bộ và Đám mây

| Khía cạnh | Địa phương (Bài phát biểu) | Đám mây (OpenAI/ElevenLabs) |
|--------|-------------------|------------------------------------------|
| **Chi phí** | Miễn phí | 0,015-0,10 USD/phút |
| **Quyền riêng tư** | Hoàn thành | Dữ liệu gửi đến nhà cung cấp |
| **Tốc độ** | Phụ thuộc vào phần cứng | Thường nhanh hơn |
| **Chất lượng** | Tốt | Xuất sắc |
| **Thiết lập** | Trung bình | Khóa API đơn giản |
| **Ngoại tuyến** | Có | Không |
| **Tiếng nói** | Hạn chế | Nhiều lựa chọn |

### Khi nào nên sử dụng địa phương

- Nội dung nhạy cảm về quyền riêng tư
- Tạo khối lượng lớn
- Phát triển/thử nghiệm
- Môi trường ngoại tuyến
- Kiểm soát chi phí

### Khi nào nên sử dụng đám mây

- Nhu cầu chất lượng cao cấp
- Nhiều ngôn ngữ
- Dự án nhạy cảm về thời gian
- Phần cứng hạn chế

---

## Tùy chọn TTS cục bộ khác

Mọi máy chủ TTS tương thích với OpenAI đều hoạt động. Chìa khóa là:

1. Máy chủ triển khai điểm cuối `/v1/audio/speech`
2. Thêm thông tin xác thực tương thích với OpenAI trong **Cài đặt → Khóa API** bằng URL cơ sở TTS
3. Thêm mô hình với nhà cung cấp `openai_tương thích`

---

## Có liên quan

- **[Thiết lập STT cục bộ](local-stt.md)** - Chuyển lời nói thành văn bản bằng bài phát biểu
- **[Nhà cung cấp tương thích với OpenAI](openai-tương thích.md)** - Thiết lập nhà cung cấp tương thích chung
- **[AI Providers](ai-providers.md)** - Tất cả cấu hình của nhà cung cấp
- **[Tạo Podcast](../3-USER-GUIDE/creating-podcasts.md)** - Sử dụng TTS cho podcast