# Bắt đầu nhanh - Phát triển

Nhận Open Notebook chạy cục bộ trong 5 phút.

## Điều kiện tiên quyết

- **Python 3.11+**-**Git**-**uv** (trình quản lý gói) - cài đặt với `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **Docker** (tùy chọn, dành cho SurrealDB)

## 1. Sao chép kho lưu trữ (2 phút)



```bash
# Fork the repository on GitHub first, then clone your fork
git clone https://github.com/YOUR_USERNAME/open-notebook.git
cd open-notebook

# Add upstream remote for updates
git remote add upstream https://github.com/lfnovo/open-notebook.git
```



## 2. Cài đặt phụ thuộc (2 phút)



```bash
# Install Python dependencies
uv sync

# Verify uv is working
uv --version
```



## 3. Bắt đầu dịch vụ (1 phút)

Trong các cửa sổ đầu cuối riêng biệt:



```bash
# Terminal 1: Start SurrealDB (database)
make database
# or: docker run -d --name surrealdb -p 8000:8000 surrealdb/surrealdb:v2 start --user root --pass password --bind 0.0.0.0:8000 memory

# Terminal 2: Start API (backend on port 5055)
make api
# or: uv run --env-file .env uvicorn api.main:app --host 0.0.0.0 --port 5055

# Terminal 3: Start Frontend (UI on port 3000)
cd frontend && npm run dev
```



## 4. Xác minh mọi thứ hoạt động (tức thì)

- **API Health**: http://localhost:5055/health → sẽ trả về `{"status": "ok"}`
- **Tài liệu API**: http://localhost:5055/docs → tài liệu API tương tác
- **Giao diện người dùng**: http://localhost:3000 → Mở giao diện người dùng Notebook

**Cả ba đều xuất hiện?** ✅ Bạn đã sẵn sàng phát triển!

---

## Các bước tiếp theo

- **Số đầu tiên?** Chọn một [số đầu tiên hay](https://github.com/lfnovo/open-notebook/issues?q=label%3A%22good+first+issue%22)
- **Hiểu mã?** Đọc [Tổng quan về kiến trúc](architecture.md)
- **Thực hiện thay đổi?** Theo dõi [Hướng dẫn đóng góp](contributing.md)
- **Chi tiết thiết lập?** Xem [Thiết lập phát triển]( Development-setup.md)

---

## Khắc phục sự cố

### "Cổng 5055 đã được sử dụng"

```bash
# Find what's using the port
lsof -i :5055

# Use a different port
uv run uvicorn api.main:app --port 5056
```



### "Không thể kết nối với SurrealDB"

```bash
# Check if SurrealDB is running
docker ps | grep surrealdb

# Restart it
make database
```



### "Phiên bản Python quá cũ"

```bash
# Check your Python version
python --version  # Should be 3.11+

# Use Python 3.11 specifically
uv sync --python 3.11
```



### "npm: không tìm thấy lệnh"

```bash
# Install Node.js from https://nodejs.org/
# Then install frontend dependencies
cd frontend && npm install
```



---

## Các lệnh phát triển chung



```bash
# Run tests
uv run pytest

# Format code
make ruff

# Type checking
make lint

# Run the full stack
make start-all

# View API documentation
open http://localhost:5055/docs
```



---

Cần thêm trợ giúp? Xem [Thiết lập phát triển](development-setup.md) để biết chi tiết hoặc tham gia [Discord](https://discord.gg/37XJPXfz2w của chúng tôi).