# Hướng Dẫn Nhanh - Nhà Cung Cấp AI Đám Mây (5 phút)

Chạy Open Notebook với **Anthropic, Google, Groq, hoặc các nhà cung cấp đám mây khác**. Đơn giản như OpenAI, với nhiều lựa chọn hơn.

## Điều Kiện Tiên Quyết

1. **Docker Desktop** đã cài đặt
   - [Tải tại đây](https://www.docker.com/products/docker-desktop/)
   - Đã có rồi? Bỏ qua bước 2

2. **Khóa API** từ nhà cung cấp bạn chọn:
   - **OpenRouter** (100+ mô hình, một khóa): https://openrouter.ai/keys
   - **Anthropic (Claude)**: https://console.anthropic.com/
   - **Google (Gemini)**: https://aistudio.google.com/
   - **Groq** (nhanh, có gói miễn phí): https://console.groq.com/
   - **Mistral**: https://console.mistral.ai/
   - **DeepSeek**: https://platform.deepseek.com/
   - **xAI (Grok)**: https://console.x.ai/

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

## Bước 4: Cấu Hình Nhà Cung Cấp AI (1 phút)

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm Credential**
3. Chọn nhà cung cấp (ví dụ: Anthropic, Google, Groq, OpenRouter)
4. Đặt tên, dán khóa API
5. Nhấn **Lưu**
6. Nhấn **Kiểm Tra Kết Nối** — sẽ hiển thị thành công
7. Nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**

Các mô hình của nhà cung cấp đã sẵn sàng!

> **Nhiều nhà cung cấp**: Bạn có thể thêm credential cho nhiều nhà cung cấp tùy thích. Chỉ cần lặp lại bước này cho mỗi nhà cung cấp.

---

## Bước 5: Cấu Hình Mô Hình (1 phút)

1. Vào **Cài đặt** (biểu tượng bánh răng)
2. Điều hướng đến **Mô hình**
3. Chọn mô hình của nhà cung cấp:

| Nhà cung cấp | Mô hình khuyến nghị | Ghi chú |
|--------------|---------------------|---------|
| **OpenRouter** | `anthropic/claude-3.5-sonnet` | Truy cập 100+ mô hình |
| **Anthropic** | `claude-3-5-sonnet-latest` | Suy luận tốt nhất |
| **Google** | `gemini-2.0-flash` | Ngữ cảnh lớn, nhanh |
| **Groq** | `llama-3.3-70b-versatile` | Siêu nhanh |
| **Mistral** | `mistral-large-latest` | Lựa chọn châu Âu mạnh |

4. Nhấn **Lưu**

---

## Bước 6: Tạo Notebook Đầu Tiên (1 phút)

1. Nhấn **Notebook Mới**
2. Tên: "Nghiên Cứu Của Tôi"
3. Nhấn **Tạo**

---

## Bước 7: Thêm Nội Dung & Chat (2 phút)

1. Nhấn **Thêm Nguồn**
2. Chọn **Liên Kết Web**
3. Dán bất kỳ URL bài viết nào
4. Chờ xử lý
5. Vào **Chat** và đặt câu hỏi!

---

## Danh Sách Kiểm Tra

- [ ] Docker đang chạy
- [ ] Có thể truy cập `http://localhost:8502`
- [ ] Credential nhà cung cấp đã cấu hình và kiểm tra
- [ ] Mô hình đã đăng ký
- [ ] Đã tạo notebook
- [ ] Chat hoạt động

**Tất cả đã đánh dấu?** Bạn đã sẵn sàng nghiên cứu!

---

## So Sánh Nhà Cung Cấp

| Nhà cung cấp | Tốc độ | Chất lượng | Ngữ cảnh | Chi phí |
|--------------|--------|-----------|----------|---------|
| **OpenRouter** | Khác nhau | Khác nhau | Khác nhau | Khác nhau (100+ mô hình) |
| **Anthropic** | Trung bình | Xuất sắc | 200K | $$$ |
| **Google** | Nhanh | Rất tốt | 1M+ | $$ |
| **Groq** | Siêu nhanh | Tốt | 128K | $ (có gói miễn phí) |
| **Mistral** | Nhanh | Tốt | 128K | $$ |
| **DeepSeek** | Trung bình | Rất tốt | 64K | $ |

---

## Khắc Phục Sự Cố

### Lỗi "Không tìm thấy mô hình"

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Kiểm Tra Kết Nối** trên credential
3. Nếu hợp lệ, nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**
4. Kiểm tra bạn có credit/quyền truy cập cho mô hình

### "Không thể kết nối đến máy chủ"

```bash
docker ps  # Kiểm tra tất cả dịch vụ đang chạy
docker compose logs  # Xem log
docker compose restart  # Khởi động lại tất cả
```

### Vấn Đề Theo Nhà Cung Cấp

**Anthropic**: Đảm bảo khóa bắt đầu bằng `sk-ant-`
**Google**: Sử dụng khóa AI Studio, không phải Cloud Console
**Groq**: Gói miễn phí có giới hạn tốc độ; nâng cấp nếu cần

---

## Ước Tính Chi Phí

Chi phí ước tính mỗi 1K token:

| Nhà cung cấp | Đầu vào | Đầu ra |
|--------------|---------|--------|
| Anthropic (Sonnet) | $0.003 | $0.015 |
| Google (Flash) | $0.0001 | $0.0004 |
| Groq (Llama 70B) | Có gói miễn phí | - |
| Mistral (Large) | $0.002 | $0.006 |

Kiểm tra website nhà cung cấp để biết giá hiện tại.

---

## Bước Tiếp Theo

1. **Thêm Nội Dung Của Bạn**: PDF, liên kết web, tài liệu
2. **Khám Phá Tính Năng**: Podcast, biến đổi, tìm kiếm
3. **Tài Liệu Đầy Đủ**: [Xem tất cả tính năng](../3-USER-GUIDE/index.md)

---

**Cần trợ giúp?** Tham gia [cộng đồng Discord](https://discord.gg/37XJPXfz2w)!
