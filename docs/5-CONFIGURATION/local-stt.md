# Thiết lập chuyển giọng nói thành văn bản cục bộ

Chạy tính năng chuyển giọng nói thành văn bản cục bộ để phiên âm âm thanh/video riêng tư, miễn phí bằng cách sử dụng máy chủ STT tương thích với OpenAI.

---

## Tại sao là STT cục bộ?

| Lợi ích | Mô tả |
|----------|-------------|
| **Miễn phí** | Không có chi phí mỗi phút sau khi thiết lập |
| **Riêng tư** | Âm thanh không bao giờ rời khỏi máy của bạn |
| **Không giới hạn** | Không có giới hạn tỷ lệ hoặc hạn ngạch |
| **Ngoại tuyến** | Hoạt động mà không cần internet |

---

## Bắt đầu nhanh với bài phát biểu

[Speaches](https://github.com/speaches-ai/speaches) là một máy chủ mã nguồn mở, tương thích với OpenAI, hỗ trợ cả TTS và STT. Nó sử dụng [faster-whisper](https://github.com/SYSTRAN/faster-whisper) để phiên âm.

> **💡 Có sẵn các tệp Docker Compose được tạo sẵn:**> -**[docker-compose-speaches.yml](../../examples/docker-compose-speaches.yml)** - Speakes + Open Notebook
> - **[docker-compose-full-local.yml](../../examples/docker-compose-full-local.yml)** - Speakes + Ollama (thiết lập cục bộ 100%)
>
> Chúng bao gồm hướng dẫn thiết lập đầy đủ và ví dụ về cấu hình. Just copy and run!

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

# Download Whisper model (~500MB for small)
docker compose exec speaches uv tool run speaches-cli model download Systran/faster-whisper-small
```



Các mô hình cũng có thể được tải xuống tự động trong lần sử dụng đầu tiên, nhưng việc tải xuống trước sẽ tránh được sự chậm trễ.

### Bước 3: Kiểm tra



```bash
# Create a test audio file (or use your own)
# Then transcribe it:
curl "http://localhost:8969/v1/audio/transcriptions" \
  -F "file=@test.mp3" \
  -F "model=Systran/faster-whisper-small"
```



Bạn sẽ thấy văn bản được phiên âm trong phản hồi.

### Bước 4: Cấu hình Open Notebook

**Thông qua giao diện người dùng Cài đặt (Được khuyến nghị):**1. Đi tới**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**→ Chọn**Tương thích với OpenAI**
3. Nhập URL cơ sở cho STT: `http://host.docker.internal:8969/v1` (Docker) hoặc `http://localhost:8969/v1` (local)
4. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

**Cũ (Không dùng nữa) — Biến môi trường:**

```yaml
# In your Open Notebook docker-compose.yml
environment:
  - OPENAI_COMPATIBLE_BASE_URL_STT=http://host.docker.internal:8969/v1
```





```bash
# Local development
export OPENAI_COMPATIBLE_BASE_URL_STT=http://localhost:8969/v1
```



### Bước 5: Thêm Model vào Open Notebook

1. Đi tới **Cài đặt**→**Mẫu máy**2. Nhấp vào**Thêm mẫu** trong phần Chuyển giọng nói thành văn bản
3. Cấu hình:
   - **Nhà cung cấp**: `openai_tương thích`
   - **Tên mẫu**: `Systran/faster-whisper-small`
   - **Tên hiển thị**: `Lời thì thầm cục bộ`
4. Nhấp vào **Lưu**
5. Đặt làm mặc định nếu muốn

---

## Các mẫu có sẵn

Speakes hỗ trợ nhiều kích cỡ mô hình Whisper khác nhau. Các mô hình lớn hơn thì chính xác hơn nhưng chậm hơn:

| Người mẫu | Kích thước | Tốc độ | Độ chính xác | VRAM (GPU) |
|-------|------|-------|----------|----------||
| `Systran/nhanh hơn-thì thầm` | ~75 MB | Nhanh nhất | Cơ bản | ~1 GB |
| `Systran/faster-thì thầm` | ~150 MB | Nhanh | Tốt | ~1 GB |
| `Systran/nhanh-thì-nhỏ` | ~500 MB | Trung bình | Tốt hơn | ~2 GB |
| `Systran/nhanh hơn thì thầm-medium` | ~1,5 GB | Chậm | Tuyệt vời | ~5 GB |
| `Systran/nhanh hơn thì thầm-large-v3` | ~3 GB | Chậm nhất | Tốt nhất | ~10GB |
| `Systran/faster-ditil-whisper-small.en` | ~400 MB | Nhanh | Tốt (chỉ bằng tiếng Anh) | ~2 GB |

### Liệt kê các mẫu có sẵn



```bash
docker compose exec speaches uv tool run speaches-cli registry ls --task automatic-speech-recognition
```



### Model được đề xuất

- **Về tốc độ**: `Systran/faster-whisper-tiny` hoặc `Systran/faster-whisper-base`
- **Để cân bằng**: `Systran/faster-whisper-small` (được khuyến nghị)
- **Để có độ chính xác**: `Systran/faster-whisper-large-v3`

---

## Tăng tốc GPU

Để sao chép nhanh hơn với GPU NVIDIA:



```yaml
services:
  speaches:
    image: ghcr.io/speaches-ai/speaches:latest-cuda
    container_name: speaches
    ports:
      - "8969:8000"
    volumes:
      - hf-hub-cache:/home/ubuntu/.cache/huggingface/hub
    environment:
      - WHISPER__TTL=-1  # Keep model in VRAM (recommended if you have enough memory)
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



### Lưu mô hình vào bộ nhớ

Theo mặc định, Speakes sẽ tải các mô hình sau một thời gian. Để giữ cho mô hình Whisper được tải để chép lời ngay lập tức:



```yaml
environment:
  - WHISPER__TTL=-1  # Never unload
```



Điều này được khuyến nghị nếu bạn có đủ RAM/VRAM vì việc tải mô hình có thể mất vài giây.

---

## Mạng Docker

Khi định cấu hình thông tin xác thực Tương thích với OpenAI trong **Cài đặt → Khóa API**, hãy sử dụng URL cơ sở STT thích hợp cho thiết lập của bạn:

### Mở Notebook trong Docker (macOS/Windows)

**URL cơ sở STT:** `http://host.docker.internal:8969/v1`

### Mở Notebook trong Docker (Linux)

**URL cơ sở STT (Tùy chọn 1 - IP cầu nối Docker):** `http://172.17.0.1:8969/v1`

**Tùy chọn 2:** Sử dụng chế độ kết nối mạng máy chủ (`docker run --network Host ...`), sau đó sử dụng: `http://localhost:8969/v1`

### Máy chủ từ xa

Chạy bài phát biểu trên một máy khác:

**URL cơ sở STT:** `http://server-ip:8969/v1` (thay thế bằng IP máy chủ của bạn)

---

## Hỗ trợ ngôn ngữ

Whisper hỗ trợ hơn 99 ngôn ngữ. Chỉ định ngôn ngữ để có độ chính xác cao hơn:



```bash
curl "http://localhost:8969/v1/audio/transcriptions" \
  -F "file=@audio.mp3" \
  -F "model=Systran/faster-whisper-small" \
  -F "language=ru"
```



Mã ngôn ngữ phổ biến:
- `en` - Tiếng Anh
- `ru` - Tiếng Nga
- `es` - tiếng Tây Ban Nha
- `fr` - tiếng Pháp
- `de` - Tiếng Đức
- `zh` - Tiếng Trung
- `ja` - Tiếng Nhật

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



### Tải xuống mô hình không thành công

Các mô hình được tải xuống tự động trong lần sử dụng đầu tiên. Nếu tải xuống không thành công:



```bash
# Check available disk space
df -h

# Check Docker logs for errors
docker compose logs speaches

# Restart and try again
docker compose restart speaches
```



### Chất lượng phiên âm kém

- Sử dụng mô hình lớn hơn (`faster-whisper-medium` hoặc `large-v3`)
- Chỉ định ngôn ngữ chính xác
- Đảm bảo chất lượng âm thanh tốt (giọng nói rõ ràng, tiếng ồn xung quanh tối thiểu)
- Thử các định dạng âm thanh khác nhau (WAV thường hoạt động tốt hơn MP3)

### Phiên âm chậm

| Giải pháp | Như thế nào |
|----------|------|
| Sử dụng GPU | Chuyển sang hình ảnh `mới nhất-cuda` |
| Mô hình nhỏ hơn | Sử dụng `faster-whisper-tiny` hoặc `base` |
| Thêm CPU | Phân bổ nhiều lõi hơn trong Docker |
| lưu trữ SSD | Di chuyển khối lượng Docker sang SSD |

---

## Mẹo về hiệu suất

### Thông số kỹ thuật được đề xuất

| Thành phần | Tối thiểu | Được đề xuất |
|----------||----------|-------------|
| CPU | 2 lõi | 4+ lõi |
| RAM | 2GB | 8+ GB |
| Lưu trữ | 5 GB | 10 GB (cho nhiều kiểu máy) |
| GPU | Không có | NVIDIA (tùy chọn, nhanh hơn nhiều) |

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

| Khía cạnh | Địa phương (Bài phát biểu) | Đám mây (OpenAI Whisper) |
|--------|-------------------|------------------------|
| **Chi phí** | Miễn phí | 0,006 USD/phút |
| **Quyền riêng tư** | Hoàn thành | Dữ liệu gửi đến nhà cung cấp |
| **Tốc độ** | Phụ thuộc vào phần cứng | Thường nhanh hơn |
| **Chất lượng** | Tuyệt vời (cùng Whisper) | Xuất sắc |
| **Thiết lập** | Trung bình | Khóa API đơn giản |
| **Ngoại tuyến** | Có | Không |
| **Ngôn ngữ** | 99+ | 99+ |

### Khi nào nên sử dụng địa phương

- Nội dung nhạy cảm về quyền riêng tư
- Phiên âm số lượng lớn
- Phát triển/thử nghiệm
- Môi trường ngoại tuyến
- Kiểm soát chi phí

### Khi nào nên sử dụng đám mây

- Phần cứng hạn chế
- Dự án nhạy cảm về thời gian
- Không có sẵn GPU
- Ưu tiên thiết lập đơn giản

---

## Sử dụng cả TTS và STT

Speakes hỗ trợ cả TTS và STT trong một máy chủ. Trong **Cài đặt → Khóa API**, hãy thêm một thông tin xác thực **OpenAI-Compatible** duy nhất và định cấu hình cả URL cơ sở TTS và STT để trỏ đến cùng một máy chủ Speakes (ví dụ: `http://localhost:8969/v1`).

Xem **[Local TTS Setup](local-tts.md)** để biết cấu hình TTS.

---

## Tùy chọn STT cục bộ khác

Mọi máy chủ STT tương thích với OpenAI đều hoạt động:

| Máy chủ | Mô tả |
|--------|-------------|
| [Bài phát biểu](https://github.com/speaches-ai/speaches) | TTS + STT trong một (được khuyến nghị) |
| [máy chủ thì thầm nhanh hơn](https://github.com/fedirz/faster-whisper-server) | Chỉ STT nhẹ |
| [thì thầm.cpp](https://github.com/ggerganov/whisper.cpp) | Triển khai C++ với chế độ máy chủ |
| [LocalAI](https://github.com/mudler/LocalAI) | Máy chủ AI cục bộ đa mô hình |

Các yêu cầu chính:

1. Máy chủ triển khai điểm cuối `/v1/audio/transcriptions`
2. Thêm thông tin xác thực Tương thích với OpenAI trong **Cài đặt → Khóa API** bằng URL cơ sở STT
3. Thêm mô hình với nhà cung cấp `openai_tương thích`

---

## Có liên quan

- **[Thiết lập TTS cục bộ](local-tts.md)** - Chuyển văn bản thành giọng nói bằng bài phát biểu
- **[Nhà cung cấp tương thích với OpenAI](openai-tương thích.md)** - Thiết lập nhà cung cấp tương thích chung
- **[AI Providers](ai-providers.md)** - Tất cả cấu hình của nhà cung cấp