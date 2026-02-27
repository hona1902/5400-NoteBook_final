# Cài Đặt Từ Mã Nguồn

Clone repository và chạy cục bộ. **Dành cho nhà phát triển và người đóng góp.**

## Điều Kiện Tiên Quyết

- **Python 3.11+** - [Tải](https://www.python.org/)
- **Node.js 18+** - [Tải](https://nodejs.org/)
- **Git** - [Tải](https://git-scm.com/)
- **Docker** (cho SurrealDB) - [Tải](https://docker.com/)
- **uv** (trình quản lý gói Python) - `curl -LsSf https://astral.sh/uv/install.sh | sh`
- Khóa API từ OpenAI hoặc tương tự (hoặc dùng Ollama miễn phí)

## Cài Đặt Nhanh (10 phút)

### 1. Clone Repository

```bash
git clone https://github.com/lfnovo/open-notebook.git
cd open-notebook

# Nếu bạn đã fork:
git clone https://github.com/TEN_BAN/open-notebook.git
cd open-notebook
git remote add upstream https://github.com/lfnovo/open-notebook.git
```

### 2. Cài Đặt Phụ Thuộc Python

```bash
uv sync
uv pip install python-magic
```

#### 2.1 Thay thế: Cài Đặt Conda (Tùy chọn)

Nếu bạn thích sử dụng **Conda** để quản lý môi trường, làm theo các bước sau thay vì `uv sync` tiêu chuẩn:

```bash
# Tạo và kích hoạt môi trường
conda create -n open-notebook python=3.11 -y
conda activate open-notebook

# Cài đặt uv trong conda để duy trì tương thích với Makefile
conda install -c conda-forge uv nodejs -y

# Đồng bộ phụ thuộc
uv sync
```

> **Lưu ý**: Cài đặt `uv` trong môi trường Conda đảm bảo các lệnh như `make start-all` và `make api` tiếp tục hoạt động trơn tru.

### 3. Khởi Động SurrealDB

```bash
# Terminal 1
make database
# hoặc: docker compose up surrealdb
```

### 4. Đặt Biến Môi Trường

```bash
cp .env.example .env
# Chỉnh sửa .env và đặt:
# OPEN_NOTEBOOK_ENCRYPTION_KEY=khoa-bi-mat-cua-toi
```

Sau khi khởi động ứng dụng, cấu hình nhà cung cấp AI qua giao diện **Cài đặt → Khóa API** trên trình duyệt.

### 5. Khởi Động API

```bash
# Terminal 2
make api
# hoặc: uv run --env-file .env uvicorn api.main:app --host 0.0.0.0 --port 5055
```

### 6. Khởi Động Frontend

```bash
# Terminal 3
cd frontend && npm install && npm run dev
```

### 7. Truy Cập

- **Frontend**: http://localhost:3000
- **Tài liệu API**: http://localhost:5055/docs
- **Cơ sở dữ liệu**: http://localhost:8000

### 8. Cấu Hình Nhà Cung Cấp AI

1. Mở http://localhost:3000
2. Vào **Cài đặt** → **Khóa API**
3. Nhấn **Thêm Credential** → Chọn nhà cung cấp → Dán khóa API
4. Nhấn **Lưu**, sau đó **Kiểm Tra Kết Nối**
5. Nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**

---

## Quy Trình Phát Triển

### Chất Lượng Mã

```bash
# Định dạng và lint Python
make ruff
# hoặc: ruff check . --fix

# Kiểm tra kiểu
make lint
# hoặc: uv run python -m mypy .
```

### Chạy Kiểm Thử

```bash
uv run pytest tests/
```

### Các Lệnh Thường Dùng

```bash
# Khởi động tất cả
make start-all

# Xem tài liệu API
open http://localhost:5055/docs

# Kiểm tra migration cơ sở dữ liệu
# (Tự động chạy khi khởi động API)

# Dọn dẹp
make clean
```

---

## Khắc Phục Sự Cố

### Phiên bản Python quá cũ

```bash
python --version  # Kiểm tra phiên bản
uv sync --python 3.11  # Sử dụng phiên bản cụ thể
```

### npm: command not found

Cài đặt Node.js từ https://nodejs.org/

### Lỗi kết nối cơ sở dữ liệu

```bash
docker ps  # Kiểm tra SurrealDB đang chạy
docker logs surrealdb  # Xem log
```

### Cổng 5055 đã được sử dụng

```bash
# Sử dụng cổng khác
uv run uvicorn api.main:app --port 5056
```

---

## Bước Tiếp Theo

1. Đọc [Hướng Dẫn Phát Triển](../7-DEVELOPMENT/quick-start.md)
2. Xem [Tổng Quan Kiến Trúc](../7-DEVELOPMENT/architecture.md)
3. Kiểm tra [Hướng Dẫn Đóng Góp](../7-DEVELOPMENT/contributing.md)

---

## Nhận Trợ Giúp

- **Discord**: [Cộng đồng](https://discord.gg/37XJPXfz2w)
- **Issues**: [GitHub Issues](https://github.com/hona1902/5400-NoteBook_final/issues)
