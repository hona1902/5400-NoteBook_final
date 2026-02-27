# Cài Đặt Docker Compose (Khuyến Nghị)

Cài đặt nhiều container với các dịch vụ riêng biệt. **Tốt nhất cho hầu hết người dùng.**

> **Registry thay thế:** Tất cả image đều có trên Docker Hub (`lfnovo/open_notebook`) và GitHub Container Registry (`ghcr.io/lfnovo/open-notebook`). Sử dụng GHCR nếu Docker Hub bị chặn hoặc bạn ưa thích quy trình GitHub.

## Điều Kiện Tiên Quyết

- **Docker Desktop** đã cài đặt ([Tải](https://www.docker.com/products/docker-desktop/))
- **5-10 phút** thời gian
- **Khóa API** cho ít nhất một nhà cung cấp AI (khuyến nghị OpenAI cho người mới)

## Bước 1: Lấy docker-compose.yml (1 phút)

**Cách A: Tải từ repository**
```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/docker-compose.yml
```

**Cách B: Sử dụng file chính thức từ repo**

File `docker-compose.yml` chính thức nằm ở thư mục gốc repository: [Xem trên GitHub](https://github.com/lfnovo/open-notebook/blob/main/docker-compose.yml)

Sao chép file đó vào thư mục dự án.

**Cách C: Tạo thủ công**

Tạo file `docker-compose.yml` với nội dung:

```yaml
services:
  surrealdb:
    image: surrealdb/surrealdb:v2
    command: start --log info --user root --pass root rocksdb:/mydata/mydatabase.db
    user: root  # Bắt buộc cho bind mounts trên Linux
    ports:
      - "8000:8000"
    volumes:
      - ./surreal_data:/mydata
    environment:
      - SURREAL_EXPERIMENTAL_GRAPHQL=true
    restart: always
    pull_policy: always

  open_notebook:
    image: lfnovo/open_notebook:v1-latest
    ports:
      - "8502:8502"  # Giao diện Web
      - "5055:5055"  # REST API
    environment:
      # BẮT BUỘC: Thay bằng chuỗi bí mật của bạn
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=thay-doi-thanh-chuoi-bi-mat

      # Kết nối cơ sở dữ liệu (giá trị mặc định - không cần thay đổi)
      - SURREAL_URL=ws://surrealdb:8000/rpc
      - SURREAL_USER=root
      - SURREAL_PASSWORD=root
      - SURREAL_NAMESPACE=open_notebook
      - SURREAL_DATABASE=open_notebook
    volumes:
      - ./notebook_data:/app/data
    depends_on:
      - surrealdb
    restart: always
    pull_policy: always
```

**Chỉnh sửa file:**
- Thay `thay-doi-thanh-chuoi-bi-mat` bằng chuỗi bí mật của bạn (bất kỳ chuỗi nào, ví dụ: `khoa-bi-mat-cua-toi-123`)

---

## Bước 2: Khởi Động Dịch Vụ (2 phút)

Mở terminal trong thư mục `open-notebook`:

```bash
docker compose up -d
```

Chờ 15-20 giây để tất cả dịch vụ khởi động:
```
✅ surrealdb chạy trên :8000
✅ open_notebook chạy trên :8502 (UI) và :5055 (API)
```

Kiểm tra trạng thái:
```bash
docker compose ps
```

---

## Bước 3: Xác Minh Cài Đặt (1 phút)

**Kiểm tra API:**
```bash
curl http://localhost:5055/health
# Sẽ trả về: {"status": "healthy"}
```

**Truy cập Frontend:**
Mở trình duyệt tại:
```
http://localhost:8502
```

Bạn sẽ thấy giao diện Open Notebook!

---

## Bước 4: Cấu Hình Nhà Cung Cấp AI (2 phút)

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm Credential**
3. Chọn nhà cung cấp (ví dụ: OpenAI, Anthropic, Google)
4. Đặt tên, dán khóa API
5. Nhấn **Lưu**
6. Nhấn **Kiểm Tra Kết Nối** — sẽ hiển thị thành công
7. Nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**

Các mô hình đã sẵn sàng!

> **Cần khóa API?** Lấy từ nhà cung cấp bạn chọn:
> - **OpenAI**: https://platform.openai.com/api-keys
> - **Anthropic**: https://console.anthropic.com/
> - **Google**: https://aistudio.google.com/
> - **Groq**: https://console.groq.com/

---

## Bước 5: Notebook Đầu Tiên (2 phút)

1. Nhấn **Notebook Mới**
2. Tên: "Nghiên Cứu Của Tôi"
3. Mô tả: "Bắt đầu"
4. Nhấn **Tạo**

Xong! Bạn đã có instance Open Notebook hoạt động đầy đủ.

---

## Cấu Hình

### Thêm Ollama (Mô Hình Cục Bộ Miễn Phí)

Thay vì chỉnh sửa thủ công, sử dụng ví dụ sẵn có:

```bash
# Tải ví dụ Ollama
curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/examples/docker-compose-ollama.yml

# Hoặc sao chép từ repo
cp examples/docker-compose-ollama.yml docker-compose.yml
```

Xem [examples/docker-compose-ollama.yml](../../examples/docker-compose-ollama.yml) cho cài đặt đầy đủ.

**Cài đặt thủ công:** Thêm vào `docker-compose.yml` hiện tại:

```yaml
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama
    restart: always

volumes:
  ollama_models:
```

Sau đó khởi động lại và pull mô hình:
```bash
docker compose restart
docker exec open-notebook-local-ollama-1 ollama pull mistral
```

Cấu hình Ollama trong giao diện Cài đặt:
1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm Credential** → Chọn **Ollama**
3. Nhập URL cơ sở: `http://ollama:11434`
4. Nhấn **Lưu**, sau đó **Kiểm Tra Kết Nối**
5. Nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**

---

## Tham Chiếu Biến Môi Trường

| Biến | Mục đích | Ví dụ |
|------|----------|-------|
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | Khóa mã hóa cho credential | `khoa-bi-mat` |
| `SURREAL_URL` | Kết nối cơ sở dữ liệu | `ws://surrealdb:8000/rpc` |
| `SURREAL_USER` | Người dùng cơ sở dữ liệu | `root` |
| `SURREAL_PASSWORD` | Mật khẩu cơ sở dữ liệu | `root` |
| `SURREAL_NAMESPACE` | Namespace cơ sở dữ liệu | `open_notebook` |
| `SURREAL_DATABASE` | Tên cơ sở dữ liệu | `open_notebook` |
| `API_URL` | URL API bên ngoài | `http://localhost:5055` |

Xem [Tham Chiếu Biến Môi Trường](../5-CONFIGURATION/environment-reference.md) cho danh sách đầy đủ.

---

## Tác Vụ Thường Gặp

### Dừng Dịch Vụ
```bash
docker compose down
```

### Xem Log
```bash
# Tất cả dịch vụ
docker compose logs -f

# Dịch vụ cụ thể
docker compose logs -f api
```

### Khởi Động Lại Dịch Vụ
```bash
docker compose restart
```

### Cập Nhật Phiên Bản Mới Nhất
```bash
docker compose down
docker compose pull
docker compose up -d
```

### Xóa Tất Cả Dữ Liệu
```bash
docker compose down -v
```

---

## Khắc Phục Sự Cố

### Lỗi "Không thể kết nối đến API"

1. Kiểm tra Docker đang chạy:
```bash
docker ps
```

2. Kiểm tra dịch vụ đang chạy:
```bash
docker compose ps
```

3. Kiểm tra log API:
```bash
docker compose logs api
```

4. Đợi lâu hơn - dịch vụ có thể mất 20-30 giây để khởi động lần đầu

---

### Cổng Đã Được Sử Dụng

Nếu gặp "Cổng 8502 đã được sử dụng", thay đổi cổng:

```yaml
ports:
  - "8503:8502"  # Sử dụng 8503 thay thế
  - "5055:5055"  # Giữ nguyên cổng API
```

Sau đó truy cập tại `http://localhost:8503`

---

### Vấn Đề Credential

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Kiểm Tra Kết Nối** trên credential
3. Nếu thất bại, xác minh khóa tại website nhà cung cấp
4. Kiểm tra bạn có credit trong tài khoản
5. Xóa và tạo lại credential nếu cần

---

### Vấn Đề Kết Nối Cơ Sở Dữ Liệu

Kiểm tra SurrealDB đang chạy:
```bash
docker compose logs surrealdb
```

Đặt lại cơ sở dữ liệu:
```bash
docker compose down -v
docker compose up -d
```

### Quyền Truy Cập Cơ Sở Dữ Liệu Bị Từ Chối (Linux)

Nếu bạn thấy `Permission denied` hoặc `Failed to create RocksDB directory` trong log SurrealDB:

```bash
docker compose logs surrealdb | grep -i permission
```

Điều này xảy ra vì SurrealDB chạy với user không phải root nhưng Docker tạo thư mục bind mount với quyền root. Thêm `user: root` vào dịch vụ surrealdb:

```yaml
surrealdb:
  image: surrealdb/surrealdb:v2
  user: root  # Sửa lỗi quyền bind mount trên Linux
  # ... phần cấu hình còn lại
```

Sau đó khởi động lại:
```bash
docker compose down -v
docker compose up -d
```

---

## Cài Đặt Thay Thế

Tìm cấu hình khác? Xem thư mục [examples/](../../examples/):

- **[Cài Đặt Ollama](../../examples/docker-compose-ollama.yml)** - Chạy mô hình AI cục bộ (miễn phí, riêng tư)
- **[Container Đơn](../../examples/docker-compose-single.yml)** - Container tất cả trong một (không còn khuyến nghị)
- **[Phát Triển](../../examples/docker-compose-dev.yml)** - Cho người đóng góp và nhà phát triển

Mỗi ví dụ bao gồm ghi chú chi tiết và hướng dẫn sử dụng.

---

## Bước Tiếp Theo

1. **Thêm Nội Dung**: Nguồn, notebook, tài liệu
2. **Cấu Hình Mô Hình**: Cài đặt → Mô hình (chọn tùy chọn)
3. **Khám Phá Tính Năng**: Chat, tìm kiếm, biến đổi
4. **Đọc Hướng Dẫn**: [Hướng Dẫn Sử Dụng](../3-USER-GUIDE/index.md)

---

## Triển Khai Production

Cho sử dụng production, xem:
- [Tăng Cường Bảo Mật](../5-CONFIGURATION/security.md)
- [Reverse Proxy](../5-CONFIGURATION/reverse-proxy.md)

---

## Nhận Trợ Giúp

- **Discord**: [Hỗ trợ cộng đồng](https://discord.gg/37XJPXfz2w)
- **Issues**: [GitHub Issues](https://github.com/hona1902/5400-NoteBook_final/issues)
- **Tài liệu**: [Tài liệu đầy đủ](../index.md)
