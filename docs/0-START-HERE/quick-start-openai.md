# Hướng Dẫn Nhanh - OpenAI (5 phút)

Chạy Open Notebook với các mô hình GPT của OpenAI. Nhanh, mạnh mẽ và đơn giản.

## Điều Kiện Tiên Quyết

1. **Docker Desktop** đã cài đặt
   - [Tải tại đây](https://www.docker.com/products/docker-desktop/)
   - Đã có rồi? Bỏ qua bước 2

2. **Khóa API OpenAI** (bắt buộc)
   - Truy cập https://platform.openai.com/api-keys
   - Tạo tài khoản → Tạo khóa bí mật mới
   - Nạp ít nhất $5 vào tài khoản
   - Sao chép khóa (bắt đầu bằng `sk-`)

## Bước 1: Tạo Cấu Hình (1 phút)

Tạo thư mục mới `open-notebook` và thêm file này:

**docker-compose.yml**:
```yaml
services:
  surrealdb:
    image: surrealdb/surrealdb:v2
    command: start --user root --pass password --bind 0.0.0.0:8000 rocksdb:/mydata/mydatabase.db
    ports:
      - "8000:8000"
    volumes:
      - ./surreal_data:/mydata

  open_notebook:
    image: lfnovo/open_notebook:v1-latest
    pull_policy: always
    ports:
      - "8502:8502"  # Giao diện Web
      - "5055:5055"  # API
    environment:
      # Khóa mã hóa cho lưu trữ credential (bắt buộc)
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=thay-doi-thanh-chuoi-bi-mat
      
      # Cơ sở dữ liệu (bắt buộc)
      - SURREAL_URL=ws://surrealdb:8000/rpc
      - SURREAL_USER=root
      - SURREAL_PASSWORD=password
      - SURREAL_NAMESPACE=open_notebook
      - SURREAL_DATABASE=open_notebook
    volumes:
      - ./notebook_data:/app/data
    depends_on:
      - surrealdb
    restart: always

```

**Chỉnh sửa file:**
- Thay `thay-doi-thanh-chuoi-bi-mat` bằng chuỗi bí mật của bạn (bất kỳ chuỗi nào đều được)

---

## Bước 2: Khởi Động Dịch Vụ (1 phút)

Mở terminal trong thư mục `open-notebook`:

```bash
docker compose up -d
```

Chờ 15-20 giây để dịch vụ khởi động.

---

## Bước 3: Truy Cập Open Notebook (ngay lập tức)

Mở trình duyệt:
```
http://localhost:8502
```

Bạn sẽ thấy giao diện Open Notebook!

---

## Bước 4: Cấu Hình Nhà Cung Cấp OpenAI (1 phút)

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm Credential**
3. Chọn nhà cung cấp: **OpenAI**
4. Đặt tên (ví dụ: "Khóa OpenAI")
5. Dán khóa API OpenAI của bạn
6. Nhấn **Lưu**
7. Nhấn **Kiểm Tra Kết Nối** — sẽ hiển thị thành công
8. Nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**

Các mô hình OpenAI đã sẵn sàng!

---

## Bước 5: Tạo Notebook Đầu Tiên (1 phút)

1. Nhấn **Notebook Mới**
2. Tên: "Nghiên Cứu Của Tôi"
3. Nhấn **Tạo**

---

## Bước 6: Thêm Nguồn (1 phút)

1. Nhấn **Thêm Nguồn**
2. Chọn **Liên Kết Web**
3. Dán: `https://en.wikipedia.org/wiki/Artificial_intelligence`
4. Nhấn **Thêm**
5. Chờ xử lý (30-60 giây)

---

## Bước 7: Chat Với Nội Dung (1 phút)

1. Vào **Chat**
2. Gõ: "Trí tuệ nhân tạo là gì?"
3. Nhấn **Gửi**
4. Xem GPT trả lời với thông tin từ nguồn của bạn!

---

## Danh Sách Kiểm Tra

- [ ] Docker đang chạy
- [ ] Có thể truy cập `http://localhost:8502`
- [ ] Credential OpenAI đã cấu hình và kiểm tra
- [ ] Đã tạo notebook
- [ ] Đã thêm nguồn
- [ ] Chat hoạt động

**Tất cả đã đánh dấu?** Bạn đã có trợ lý nghiên cứu AI hoạt động đầy đủ!

---

## Sử Dụng Các Mô Hình Khác

Trong notebook, vào **Cài đặt** → **Mô hình** để chọn:
- `gpt-4o` - Chất lượng tốt nhất (khuyến nghị)
- `gpt-4o-mini` - Nhanh và rẻ (tốt cho thử nghiệm)

---

## Khắc Phục Sự Cố

### "Cổng 8502 đã được sử dụng"

Thay đổi cổng trong docker-compose.yml:
```yaml
ports:
  - "8503:8502"  # Sử dụng 8503 thay thế
```

Sau đó truy cập tại `http://localhost:8503`

### "Khóa API không hoạt động"

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Kiểm Tra Kết Nối** trên credential OpenAI
3. Nếu thất bại, xác minh khóa tại https://platform.openai.com
4. Xóa credential và tạo mới với khóa đúng

### "Không thể kết nối đến máy chủ"

```bash
docker ps  # Kiểm tra tất cả dịch vụ đang chạy
docker compose logs  # Xem log
docker compose restart  # Khởi động lại tất cả
```

---

## Bước Tiếp Theo

1. **Thêm Nội Dung Của Bạn**: PDF, liên kết web, tài liệu
2. **Khám Phá Tính Năng**: Podcast, biến đổi, tìm kiếm
3. **Tài Liệu Đầy Đủ**: [Xem tất cả tính năng](../3-USER-GUIDE/index.md)

---

## Ước Tính Chi Phí

Giá OpenAI (ước tính):
- **Hội thoại**: $0.01-0.10 mỗi 1K token
- **Nhúng**: $0.02 mỗi 1M token
- **Sử dụng thông thường**: $1-5/tháng cho sử dụng nhẹ, $20-50/tháng cho sử dụng nặng

Kiểm tra https://openai.com/pricing để biết giá hiện tại.

---

**Cần trợ giúp?** Tham gia [cộng đồng Discord](https://discord.gg/37XJPXfz2w)!
