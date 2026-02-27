# Thiết lập phát triển cục bộ

Hướng dẫn này hướng dẫn bạn cách thiết lập Open Notebook để phát triển địa phương. Hãy làm theo các bước sau để có được toàn bộ ngăn xếp chạy trên máy của bạn.

## Điều kiện tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt những thứ sau:

- **Python 3.11+** - Kiểm tra bằng: `python --version`
- **uv**(được khuyến nghị) hoặc**pip** - Cài đặt từ: https://github.com/astral-sh/uv
- **SurrealDB** - Qua Docker hoặc nhị phân (xem bên dưới)
- **Docker** (tùy chọn) - Dành cho cơ sở dữ liệu được đóng gói
- **Node.js 18+** (tùy chọn) - Để phát triển giao diện người dùng
- **Git** - Để kiểm soát phiên bản

## Bước 1: Sao chép và thiết lập ban đầu



```bash
# Clone the repository
git clone https://github.com/lfnovo/open-notebook.git
cd open-notebook

# Add upstream remote for keeping your fork updated
git remote add upstream https://github.com/lfnovo/open-notebook.git
```



## Bước 2: Cài đặt Python Dependency



```bash
# Using uv (recommended)
uv sync

# Or using pip
pip install -e .
```



## Bước 3: Biến môi trường

Tạo tệp `.env` trong thư mục gốc của dự án với cấu hình của bạn:



```bash
# Copy from example
cp .env.example .env
```



Chỉnh sửa `.env` bằng cài đặt của bạn:



```bash
# Database
SURREAL_URL=ws://localhost:8000/rpc
SURREAL_USER=root
SURREAL_PASSWORD=password
SURREAL_NAMESPACE=open_notebook
SURREAL_DATABASE=development

# Credential encryption (required for storing API keys)
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-dev-secret-key

# Application
APP_PASSWORD=  # Optional password protection
DEBUG=true
LOG_LEVEL=DEBUG
```



### Cấu hình nhà cung cấp AI

Sau khi khởi động API và giao diện người dùng, hãy định cấu hình nhà cung cấp AI của bạn thông qua Giao diện người dùng cài đặt:

1. Mở **http://localhost:3000**→**Cài đặt**→**Khóa API**2. Nhấp vào**Thêm thông tin xác thực** → Chọn nhà cung cấp của bạn
3. Nhập khóa API của bạn (lấy từ bảng điều khiển của nhà cung cấp)
4. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**5. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

Các nhà cung cấp phổ biến:
- **OpenAI** - https://platform.openai.com/api-keys
- **Nhân loại (Claude)** - https://console.anthropic.com/
- **Google** - https://ai.google.dev/
- **Groq** - https://console.groq.com/

Để phát triển địa phương, bạn cũng có thể sử dụng:
- **Ollama** - Chạy cục bộ mà không cần khóa API (xem "Ollama cục bộ" bên dưới)

> **Lưu ý:** Các biến môi trường khóa API (ví dụ: `OPENAI_API_KEY`) không được dùng nữa. Thay vào đó, hãy sử dụng Giao diện người dùng cài đặt để quản lý thông tin xác thực.

## Bước 4: Khởi động SurrealDB

### Tùy chọn A: Sử dụng Docker (Được khuyến nghị)



```bash
# Start SurrealDB in memory
docker run -d --name surrealdb -p 8000:8000 \
  surrealdb/surrealdb:v2 start \
  --user root --pass password \
  --bind 0.0.0.0:8000 memory

# Or with persistent storage
docker run -d --name surrealdb -p 8000:8000 \
  -v surrealdb_data:/data \
  surrealdb/surrealdb:v2 start \
  --user root --pass password \
  --bind 0.0.0.0:8000 file:/data/surreal.db
```



### Tùy chọn B: Sử dụng Make



```bash
make database
```



### Tùy chọn C: Sử dụng Docker Compose



```bash
docker compose up -d surrealdb
```



### Xác minh SurrealDB đang chạy



```bash
# Should show server information
curl http://localhost:8000/
```



## Bước 5: Chạy di chuyển cơ sở dữ liệu

Quá trình di chuyển cơ sở dữ liệu sẽ tự động chạy khi bạn khởi động API. Lần khởi động đầu tiên sẽ áp dụng mọi di chuyển đang chờ xử lý.

Để xác minh việc di chuyển theo cách thủ công:



```bash
# API will run migrations on startup
uv run python -m api.main
```



Kiểm tra nhật ký - bạn sẽ thấy các thông báo như:

```
Running migration 001_initial_schema
Running migration 002_add_vectors
...
Migrations completed successfully
```



## Bước 6: Khởi động API Server

Trong cửa sổ terminal mới:



```bash
# Terminal 2: Start API (port 5055)
uv run --env-file .env uvicorn api.main:app --host 0.0.0.0 --port 5055

# Or using the shortcut
make api
```



Bạn nên xem:

```
INFO:     Application startup complete
INFO:     Uvicorn running on http://0.0.0.0:5055
```



### Xác minh API đang chạy



```bash
# Check health endpoint
curl http://localhost:5055/health

# View API documentation
open http://localhost:5055/docs
```



## Bước 7: Khởi động Frontend (Tùy chọn)

Nếu bạn muốn làm việc trên giao diện người dùng, hãy khởi động Next.js trong một thiết bị đầu cuối khác:



```bash
# Terminal 3: Start Next.js frontend (port 3000)
cd frontend
npm install  # First time only
npm run dev
```



Bạn nên xem:

```
> next dev
  ▲ Next.js 16.x
  - Local:        http://localhost:3000
```



### Truy cập giao diện người dùng

Mở trình duyệt của bạn tới: http://localhost:3000

## Danh sách kiểm tra xác minh

Sau khi thiết lập, hãy xác minh mọi thứ đều hoạt động:

- [ ] **SurrealDB**: `curl http://localhost:8000/` trả về nội dung
- [ ] **API**: `curl http://localhost:5055/health` trả về `{"status": "ok"}`
- [ ] **Tài liệu API**: `mở http://localhost:5055/docs` hoạt động
- [ ] **Cơ sở dữ liệu**: Nhật ký API hiển thị quá trình di chuyển đã hoàn tất
- [ ] **Giao diện người dùng** (tùy chọn): tải `http://localhost:3000`

## Cùng nhau bắt đầu dịch vụ

### Bắt đầu nhanh tất cả dịch vụ



```bash
make start-all
```



Điều này khởi động SurrealDB, API và giao diện người dùng trong một lệnh.

### Thiết bị đầu cuối riêng lẻ (Được đề xuất để phát triển)

**Nhà ga 1 - Cơ sở dữ liệu:**

```bash
make database
```



**Thiết bị đầu cuối 2 - API:**

```bash
make api
```



**Nhà ga 3 - Giao diện người dùng:**

```bash
cd frontend && npm run dev
```



## Thiết lập công cụ phát triển

### Móc cam kết trước (Tùy chọn nhưng được khuyến nghị)

Cài đặt git hook để tự động kiểm tra chất lượng mã:



```bash
uv run pre-commit install
```



Bây giờ các cam kết của bạn sẽ được kiểm tra trước khi chúng được thực hiện.

### Lệnh chất lượng mã



```bash
# Lint Python code (auto-fix)
make ruff
# or: ruff check . --fix

# Type check Python code
make lint
# or: uv run python -m mypy .

# Run tests
uv run pytest

# Run tests with coverage
uv run pytest --cov=open_notebook
```



## Nhiệm vụ phát triển chung

### Đang chạy thử nghiệm



```bash
# Run all tests
uv run pytest

# Run specific test file
uv run pytest tests/test_notebooks.py

# Run with coverage report
uv run pytest --cov=open_notebook --cov-report=html
```



### Tạo một nhánh tính năng



```bash
# Create and switch to new branch
git checkout -b feature/my-feature

# Make changes, then commit
git add .
git commit -m "feat: add my feature"

# Push to your fork
git push origin feature/my-feature
```



### Cập nhật từ thượng nguồn



```bash
# Fetch latest changes
git fetch upstream

# Rebase your branch
git rebase upstream/main

# Push updated branch
git push origin feature/my-feature -f
```



## Khắc phục sự cố

### "Kết nối bị từ chối" trên SurrealDB

**Sự cố**: API không thể kết nối với SurrealDB

**Giải pháp**:
1. Kiểm tra xem SurrealDB có đang chạy hay không: `docker ps | grep siêu thựcdb`
2. Xác minh URL trong `.env`: Phải là `ws://localhost:8000/rpc`
3. Khởi động lại SurrealDB: `docker stop siêu thựcdb && docker rm siêu thựcdb`
4. Sau đó khởi động lại với: `docker run -d --name siêu thựcdb -p 8000:8000 siêu thựcdb/surrealdb:v2 start --user root --pass mật khẩu --bind 0.0.0.0:8000 bộ nhớ`

### "Địa chỉ đã được sử dụng"

**Sự cố**: Cổng 5055 hoặc 3000 đã được sử dụng

**Giải pháp**:

```bash
# Find process using port
lsof -i :5055  # Check port 5055

# Kill process (macOS/Linux)
kill -9 <PID>

# Or use different port
uvicorn api.main:app --port 5056
```



### Lỗi không tìm thấy mô-đun

**Sự cố**: Lỗi nhập khi chạy API

**Giải pháp**:

```bash
# Reinstall dependencies
uv sync

# Or with pip
pip install -e .
```



### Lỗi di chuyển cơ sở dữ liệu

**Sự cố**: API không khởi động được do lỗi di chuyển

**Giải pháp**:
1. Kiểm tra SurrealDB đang chạy: `curl http://localhost:8000/`
2. Kiểm tra thông tin đăng nhập trong `.env` có khớp với thiết lập SurrealDB của bạn không
3. Kiểm tra nhật ký để tìm lỗi di chuyển cụ thể: `make api 2>&1 | grep -i di chuyển`
4. Xác minh cơ sở dữ liệu tồn tại: Kiểm tra bảng điều khiển SurrealDB tại http://localhost:8000/

### Di chuyển không áp dụng

**Vấn đề**: Lược đồ cơ sở dữ liệu dường như đã lỗi thời

**Giải pháp**:
1. Khởi động lại API - quá trình di chuyển chạy khi khởi động: `make api`
2. Kiểm tra nhật ký hiển thị "Quá trình di chuyển đã hoàn tất thành công"
3. Xác minh thư mục `/migrations/` tồn tại và có tệp
4. Kiểm tra SurrealDB có thể ghi và không ở chế độ chỉ đọc

## Tùy chọn: Thiết lập Ollama cục bộ

Để thử nghiệm với các mô hình AI cục bộ:



```bash
# Install Ollama from https://ollama.ai

# Pull a model (e.g., Mistral 7B)
ollama pull mistral
```



Sau đó định cấu hình thông qua Giao diện người dùng cài đặt:
1. Đi tới **Cài đặt**→**Khóa API**→**Thêm thông tin xác thực**→**Ollama**
2. Nhập URL cơ sở: `http://localhost:11434`
3. Nhấp vào **Lưu**, sau đó nhấp vào **Kiểm tra kết nối**4. Nhấp vào**Khám phá mẫu**→**Đăng ký mẫu**

## Tùy chọn: Môi trường phát triển Docker

Chạy toàn bộ ngăn xếp trong Docker:



```bash
# Start all services
docker compose --profile multi up

# Logs
docker compose logs -f

# Stop services
docker compose down
```



## Các bước tiếp theo

Sau khi thiết lập xong:

1. **Đọc Hướng dẫn đóng góp** - [contributing.md](contributing.md)
2. **Khám phá Kiến trúc** - Kiểm tra tài liệu
3. **Tìm vấn đề** - Tìm kiếm "vấn đề đầu tiên hay" trên GitHub
4. **Thiết lập cam kết trước** - Cài đặt git hook để đảm bảo chất lượng mã
5. **Tham gia Discord** - https://discord.gg/37XJPXfz2w

## Nhận trợ giúp

Nếu bạn gặp khó khăn:

- **Discord**: [Tham gia máy chủ của chúng tôi](https://discord.gg/37XJPXfz2w) để được trợ giúp theo thời gian thực
- **Vấn đề về GitHub**: Kiểm tra các vấn đề hiện có để tìm các vấn đề tương tự
- **Thảo luận GitHub**: Đặt câu hỏi trong các cuộc thảo luận
- **Tài liệu**: Xem [code-standards.md](code-standards.md) và [testing.md](testing.md)

---

**Sẵn sàng đóng góp?** Hãy truy cập [contributing.md](contributing.md) để biết quy trình đóng góp.