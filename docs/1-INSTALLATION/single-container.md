# Cài Đặt Container Đơn

Cài đặt container tất cả trong một. **Đơn giản hơn Docker Compose, nhưng ít linh hoạt hơn.**

**Phù hợp nhất cho:** PikaPods, Railway, hosting chia sẻ, cài đặt tối giản

> **Registry thay thế:** Image có trên cả Docker Hub (`lfnovo/open_notebook:v1-latest-single`) và GitHub Container Registry (`ghcr.io/lfnovo/open-notebook:v1-latest-single`).

> **Lưu ý**: Đây là cách đơn giản để bắt đầu, nhưng chúng tôi khuyến nghị [Docker Compose](docker-compose.md) cho hầu hết người dùng. Docker Compose linh hoạt hơn và sẽ dễ dàng hơn nếu chúng tôi thêm dịch vụ trong tương lai. Tùy chọn container đơn này phù hợp nhất cho nền tảng yêu cầu cụ thể (PikaPods, Railway, v.v.).

## Điều Kiện Tiên Quyết

- Docker đã cài đặt (cho thử nghiệm cục bộ)
- Khóa API từ OpenAI, Anthropic, hoặc nhà cung cấp khác
- 5 phút

## Cài Đặt Nhanh

### Cho Thử Nghiệm Cục Bộ (Docker)

```yaml
# docker-compose.yml
services:
  open_notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    ports:
      - "8502:8502"  # Giao diện Web (React frontend)
      - "5055:5055"  # API
    environment:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=thay-doi-thanh-chuoi-bi-mat
      - SURREAL_URL=ws://localhost:8000/rpc
      - SURREAL_USER=root
      - SURREAL_PASSWORD=password
      - SURREAL_NAMESPACE=open_notebook
      - SURREAL_DATABASE=open_notebook
    volumes:
      - ./data:/app/data
    restart: always
```

Chạy:
```bash
docker compose up -d
```

Truy cập: `http://localhost:8502`

Sau đó cấu hình nhà cung cấp AI:
1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm Credential** → Chọn nhà cung cấp → Dán khóa API
3. Nhấn **Lưu**, sau đó **Kiểm Tra Kết Nối**
4. Nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**

### Cho Nền Tảng Đám Mây

**PikaPods:**
1. Nhấn "New App"
2. Tìm kiếm "Open Notebook"
3. Đặt biến môi trường (tối thiểu: `OPEN_NOTEBOOK_ENCRYPTION_KEY`)
4. Nhấn "Deploy"
5. Mở ứng dụng → Vào **Cài đặt → Khóa API** để cấu hình nhà cung cấp AI

**Railway:**
1. Tạo dự án mới
2. Thêm `lfnovo/open_notebook:v1-latest-single`
3. Đặt biến môi trường (tối thiểu: `OPEN_NOTEBOOK_ENCRYPTION_KEY`)
4. Triển khai
5. Mở ứng dụng → Vào **Cài đặt → Khóa API** để cấu hình nhà cung cấp AI

**Render:**
1. Tạo Web Service mới
2. Sử dụng Docker image: `lfnovo/open_notebook:v1-latest-single`
3. Đặt biến môi trường trong bảng điều khiển (tối thiểu: `OPEN_NOTEBOOK_ENCRYPTION_KEY`)
4. Cấu hình đĩa lưu trữ cho `/app/data` và `/mydata`

**DigitalOcean App Platform:**
1. Tạo ứng dụng mới từ Docker Hub
2. Sử dụng image: `lfnovo/open_notebook:v1-latest-single`
3. Đặt cổng là 8502
4. Thêm biến môi trường (tối thiểu: `OPEN_NOTEBOOK_ENCRYPTION_KEY`)
5. Cấu hình lưu trữ lâu dài

**Heroku:**
```bash
# Sử dụng heroku.yml
heroku container:push web
heroku container:release web
heroku config:set OPEN_NOTEBOOK_ENCRYPTION_KEY=khoa-bi-mat-cua-ban
```

**Coolify:**
1. Thêm dịch vụ mới → Docker Image
2. Image: `lfnovo/open_notebook:v1-latest-single`
3. Cổng: 8502
4. Thêm biến môi trường (tối thiểu: `OPEN_NOTEBOOK_ENCRYPTION_KEY`)
5. Bật volumes lâu dài
6. Coolify tự động xử lý HTTPS

---

## Biến Môi Trường

| Biến | Mục đích | Ví dụ |
|------|----------|-------|
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | Khóa mã hóa cho credential (bắt buộc) | `khoa-bi-mat` |
| `SURREAL_URL` | Cơ sở dữ liệu | `ws://localhost:8000/rpc` |
| `SURREAL_USER` | Người dùng DB | `root` |
| `SURREAL_PASSWORD` | Mật khẩu DB | `password` |
| `SURREAL_NAMESPACE` | Namespace DB | `open_notebook` |
| `SURREAL_DATABASE` | Tên DB | `open_notebook` |
| `API_URL` | URL bên ngoài (cho truy cập từ xa) | `https://myapp.example.com` |

Khóa API nhà cung cấp AI được cấu hình qua giao diện **Cài đặt → Khóa API** sau khi triển khai.

---

## Hạn Chế So Với Docker Compose

| Tính năng | Container Đơn | Docker Compose |
|-----------|--------------|----------------|
| Thời gian cài đặt | 2 phút | 5 phút |
| Độ phức tạp | Tối thiểu | Trung bình |
| Dịch vụ | Gộp chung | Tách biệt |
| Khả năng mở rộng | Hạn chế | Xuất sắc |
| Sử dụng bộ nhớ | ~800MB | ~1.2GB |

---

## Bước Tiếp Theo

Tương tự cài đặt Docker Compose - truy cập qua `http://localhost:8502` (cục bộ) hoặc URL nền tảng (đám mây).

1. Vào **Cài đặt → Khóa API** để thêm credential nhà cung cấp AI
2. **Kiểm Tra Kết Nối** và **Khám Phá Mô Hình**

Xem [Docker Compose](docker-compose.md) cho hướng dẫn đầy đủ sau cài đặt.
