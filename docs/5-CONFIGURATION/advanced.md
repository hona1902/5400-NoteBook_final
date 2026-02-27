# Cấu hình nâng cao

Điều chỉnh hiệu suất, gỡ lỗi và các tính năng nâng cao.

---

## Điều chỉnh hiệu suất

### Kiểm soát đồng thời



```env
# Max concurrent database operations (default: 5)
# Increase: Faster processing, more conflicts
# Decrease: Slower, fewer conflicts
SURREAL_COMMANDS_MAX_TASKS=5
```



**Hướng dẫn:**
- CPU: 2 nhân → 2-3 tác vụ
- CPU: 4 nhân → 5 tác vụ (mặc định)
- CPU: 8+ nhân → 10-20 tác vụ

Tính đồng thời cao hơn = thông lượng cao hơn nhưng xung đột cơ sở dữ liệu nhiều hơn (thử lại sẽ xử lý vấn đề này).

### Thử lại chiến lược



```env
# How to wait between retries
SURREAL_COMMANDS_RETRY_WAIT_STRATEGY=exponential_jitter

# Options:
# - exponential_jitter (recommended)
# - exponential
# - fixed
# - random
```



Để triển khai đồng thời cao, hãy sử dụng `exponential_jitter` để ngăn chặn tình trạng dồn dập.

### Điều chỉnh thời gian chờ



```env
# Client timeout (default: 300 seconds)
API_CLIENT_TIMEOUT=300

# LLM timeout (default: 60 seconds)
ESPERANTO_LLM_TIMEOUT=60
```



**Hướng dẫn:** Đặt `API_CLIENT_TIMEOUT` > `ESPERANTO_LLM_TIMEOUT` + bộ đệm



```
Example:
  ESPERANTO_LLM_TIMEOUT=120
  API_CLIENT_TIMEOUT=180  # 120 + 60 second buffer
```



---

## Trộn theo mẻ

### Kích thước lô TTS

Để tạo podcast, hãy kiểm soát các yêu cầu TTS đồng thời:



```env
# Default: 5
TTS_BATCH_SIZE=2
```



**Nhà cung cấp và khuyến nghị:**
- OpenAI: 5 (có thể xử lý nhiều tác vụ đồng thời)
- Google: 4 (đồng thời tốt)
- ElevenLabs: 2 (số lượng yêu cầu đồng thời có giới hạn)
- TTS cục bộ: 1 (đơn luồng)

Thấp hơn = chậm hơn nhưng ổn định hơn. Cao hơn = nhanh hơn nhưng tải nhiều hơn cho nhà cung cấp.

---

## Ghi nhật ký và gỡ lỗi

### Kích hoạt tính năng ghi nhật ký chi tiết



```bash
# Start with debug logging
RUST_LOG=debug  # For Rust components
LOGLEVEL=DEBUG  # For Python components
```



### Gỡ lỗi các thành phần cụ thể



```bash
# Only surreal operations
RUST_LOG=surrealdb=debug

# Only langchain
LOGLEVEL=langchain:debug

# Only specific module
RUST_LOG=open_notebook::database=debug
```



### Truy tìm LangSmith

Để gỡ lỗi quy trình công việc LLM:



```env
LANGCHAIN_TRACING_V2=true
LANGCHAIN_ENDPOINT="https://api.smith.langchain.com"
LANGCHAIN_API_KEY=your-key
LANGCHAIN_PROJECT="Open Notebook"
```



Sau đó truy cập https://smith.langchain.com để xem dấu vết.

---

## Cấu hình cổng

### Cổng mặc định



```
Frontend: 8502 (Docker deployment)
Frontend: 3000 (Development from source)
API: 5055
SurrealDB: 8000
```



### Thay đổi cổng giao diện người dùng

Chỉnh sửa `docker-compose.yml`:



```yaml
services:
  open-notebook:
    ports:
      - "8001:8502"  # Change from 8502 to 8001
```



Truy cập tại: `http://localhost:8001`

API tự động phát hiện: `http://localhost:5055` ✓

### Thay đổi cổng API



```yaml
services:
  open-notebook:
    ports:
      - "127.0.0.1:8502:8502"  # Frontend
      - "5056:5055"            # Change API from 5055 to 5056
    environment:
      - API_URL=http://localhost:5056  # Update API_URL
```



Truy cập API trực tiếp: `http://localhost:5056/docs`

**Lưu ý:** Khi thay đổi cổng API, bạn phải đặt `API_URL` một cách rõ ràng vì tính năng tự động phát hiện sẽ sử dụng cổng 5055.

### Thay đổi cổng SurrealDB



```yaml
services:
  surrealdb:
    ports:
      - "8001:8000"  # Change from 8000 to 8001
    environment:
      - SURREAL_URL=ws://surrealdb:8001/rpc  # Update connection URL
```



**Quan trọng:** Mạng Docker nội bộ sử dụng tên vùng chứa (`surrealdb`), không phải `localhost`.

---

## Cấu hình SSL/TLS

### Chứng chỉ CA tùy chỉnh

Đối với chứng chỉ tự ký của các nhà cung cấp địa phương:



```env
ESPERANTO_SSL_CA_BUNDLE=/path/to/ca-bundle.pem
```



### Tắt xác minh (Chỉ dành cho nhà phát triển)



```env
# WARNING: Only for testing/development
# Vulnerable to MITM attacks
ESPERANTO_SSL_VERIFY=false
```



---

## Thiết lập nhiều nhà cung cấp

### Sử dụng các nhà cung cấp khác nhau cho các nhiệm vụ khác nhau

Định cấu hình nhiều nhà cung cấp AI thông qua **Cài đặt → Khóa API**. Mỗi nhà cung cấp đều có thông tin xác thực riêng:

1. Thêm thông tin xác thực cho nhà cung cấp mô hình ngôn ngữ chính của bạn (ví dụ: OpenAI, Anthropic)
2. Thêm thông tin xác thực cho các nội dung nhúng (ví dụ: Voyage AI hoặc sử dụng cùng một nhà cung cấp)
3. Thêm thông tin xác thực cho TTS (ví dụ: ElevenLabs hoặc OpenAI-Tương thích cho các bài giảng địa phương)
4. Mỗi mẫu thông tin xác thực đều được đăng ký và cung cấp độc lập

### Nhiều điểm cuối tương thích với OpenAI

Khi sử dụng nhà cung cấp Tương thích với OpenAI, bạn có thể định cấu hình URL cho mỗi dịch vụ trong một thông tin xác thực duy nhất:

1. Đi tới **Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực**→ Chọn**Tương thích với OpenAI**
3. Định cấu hình các URL riêng cho LLM, Nhúng, TTS và STT
4. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**

---

## Tăng cường bảo mật

### Thay đổi thông tin xác thực mặc định



```env
# Don't use defaults in production
SURREAL_USER=your_secure_username
SURREAL_PASSWORD=$(openssl rand -base64 32)  # Generate secure password
```



### Thêm mật khẩu bảo vệ



```env
# Protect your Open Notebook instance
OPEN_NOTEBOOK_PASSWORD=your_secure_password
```



### Sử dụng HTTPS



```env
# Always use HTTPS in production
API_URL=https://mynotebook.example.com
```



### Quy tắc tường lửa

Hạn chế quyền truy cập vào Sổ tay mở của bạn:
- Port 8502 (frontend): Chỉ từ IP của bạn
- Cổng 5055 (API): Chỉ từ giao diện người dùng
- Cổng 8000 (SurrealDB): Không bao giờ tiếp xúc với internet

---

## Quét web & trích xuất nội dung

Open Notebook sử dụng nhiều dịch vụ để trích xuất nội dung:

### Pháo hoa

Để quét web nâng cao:



```env
FIRECRAWL_API_KEY=your-key
```



Nhận chìa khóa từ: https://firecrawl.dev/

### Jina AI

Trích xuất web thay thế:



```env
JINA_API_KEY=your-key
```



Nhận chìa khóa từ: https://jina.ai/

---

## Nhóm biến môi trường

### Bộ nhớ thông tin xác thực (Bắt buộc)

```env
OPEN_NOTEBOOK_ENCRYPTION_KEY    # Required for storing credentials
```



Khóa API của nhà cung cấp AI được định cấu hình thông qua **Cài đặt → Khóa API** (không phải biến môi trường).

### Cơ sở dữ liệu

```env
SURREAL_URL
SURREAL_USER
SURREAL_PASSWORD
SURREAL_NAMESPACE
SURREAL_DATABASE
```



### Hiệu suất

```env
SURREAL_COMMANDS_MAX_TASKS
SURREAL_COMMANDS_RETRY_ENABLED
SURREAL_COMMANDS_RETRY_MAX_ATTEMPTS
SURREAL_COMMANDS_RETRY_WAIT_STRATEGY
SURREAL_COMMANDS_RETRY_WAIT_MIN
SURREAL_COMMANDS_RETRY_WAIT_MAX
```



### Cài đặt API

```env
API_URL
INTERNAL_API_URL
API_CLIENT_TIMEOUT
ESPERANTO_LLM_TIMEOUT
```



### Âm thanh/TTS

```env
TTS_BATCH_SIZE
```



> **Lưu ý:**`ELEVENLABS_API_KEY` không được dùng nữa. Định cấu hình ElevenLabs thông qua**Cài đặt → Khóa API**.

### Gỡ lỗi

```env
LANGCHAIN_TRACING_V2
LANGCHAIN_ENDPOINT
LANGCHAIN_API_KEY
LANGCHAIN_PROJECT
```



---

## Cấu hình thử nghiệm

### Kiểm tra nhanh



```bash
# Test API health
curl http://localhost:5055/health

# Test with sample (requires configured credential and registered models)
curl -X POST http://localhost:5055/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```



### Xác thực cấu hình



```bash
# Check environment variables are set
env | grep OPEN_NOTEBOOK_ENCRYPTION_KEY

# Verify database connection
python -c "import os; print(os.getenv('SURREAL_URL'))"
```



---

## Khắc phục sự cố về hiệu suất

### Sử dụng bộ nhớ cao



```env
# Reduce concurrency
SURREAL_COMMANDS_MAX_TASKS=2

# Reduce TTS batch size
TTS_BATCH_SIZE=1
```



### Mức sử dụng CPU cao



```env
# Check worker count
SURREAL_COMMANDS_MAX_TASKS

# Reduce if maxed out:
SURREAL_COMMANDS_MAX_TASKS=5
```



### Phản hồi chậm



```env
# Check timeout settings
API_CLIENT_TIMEOUT=300

# Check retry config
SURREAL_COMMANDS_RETRY_MAX_ATTEMPTS=3
```



### Xung đột cơ sở dữ liệu



```env
# Reduce concurrency
SURREAL_COMMANDS_MAX_TASKS=3

# Use jitter strategy
SURREAL_COMMANDS_RETRY_WAIT_STRATEGY=exponential_jitter
```



---

## Sao lưu và khôi phục

### Vị trí dữ liệu

| Đường dẫn | Nội dung |
|------|----------|
| `./data` hoặc `/app/data` | Tải lên, podcast, điểm kiểm tra |
| `./surreal_data` hoặc `/mydata` | Tệp cơ sở dữ liệu SurrealDB |

### Sao lưu nhanh



```bash
# Stop services (recommended for consistency)
docker compose down

# Create timestamped backup
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz \
  notebook_data/ surreal_data/

# Restart services
docker compose up -d
```



### Tập lệnh sao lưu tự động



```bash
#!/bin/bash
# backup.sh - Run daily via cron

BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d-%H%M%S)

# Create backup
tar -czf "$BACKUP_DIR/open-notebook-$DATE.tar.gz" \
  /path/to/notebook_data \
  /path/to/surreal_data

# Keep only last 7 days
find "$BACKUP_DIR" -name "open-notebook-*.tar.gz" -mtime +7 -delete

echo "Backup complete: open-notebook-$DATE.tar.gz"
```



Thêm vào cron:

```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh >> /var/log/open-notebook-backup.log 2>&1
```



### Khôi phục



```bash
# Stop services
docker compose down

# Remove old data (careful!)
rm -rf notebook_data/ surreal_data/

# Extract backup
tar -xzf backup-20240115-120000.tar.gz

# Restart services
docker compose up -d
```



### Di chuyển giữa các máy chủ



```bash
# On source server
docker compose down
tar -czf open-notebook-migration.tar.gz notebook_data/ surreal_data/

# Transfer to new server
scp open-notebook-migration.tar.gz user@newserver:/path/

# On new server
tar -xzf open-notebook-migration.tar.gz
docker compose up -d
```



---

## Quản lý vùng chứa

### Các lệnh thông dụng



```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs (all services)
docker compose logs -f

# View logs (specific service)
docker compose logs -f api

# Restart specific service
docker compose restart api

# Update to latest version
docker compose down
docker compose pull
docker compose up -d

# Check resource usage
docker stats

# Check service health
docker compose ps
```



### Dọn dẹp



```bash
# Remove stopped containers
docker compose rm

# Remove unused images
docker image prune

# Full cleanup (careful!)
docker system prune -a
```



---

## Bản tóm tắt

**Hầu hết các hoạt động triển khai đều cần:**
- Một khóa API của nhà cung cấp AI
- Cài đặt cơ sở dữ liệu mặc định
- Thời gian chờ mặc định

**Chỉ điều chỉnh hiệu suất nếu:**
- Bạn có những trở ngại cụ thể
- Khối lượng công việc đồng thời cao
- Phần cứng tùy chỉnh (rất nhanh hoặc rất chậm)

**Tính năng nâng cao:**
- Firecrawl để quét web tốt hơn
- LangSmith để gỡ lỗi quy trình công việc
- Gói CA tùy chỉnh cho chứng chỉ tự ký