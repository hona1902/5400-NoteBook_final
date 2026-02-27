# Hướng Dẫn Nhanh - Cục Bộ & Riêng Tư (5 phút)

Chạy Open Notebook với **AI cục bộ 100%** sử dụng Ollama. Không cần khóa API đám mây, hoàn toàn riêng tư.

## Điều Kiện Tiên Quyết

1. **Docker Desktop** đã cài đặt
   - [Tải tại đây](https://www.docker.com/products/docker-desktop/)
   - Đã có rồi? Bỏ qua bước 2

2. **LLM Cục Bộ** - Chọn một:
   - **Ollama** (khuyến nghị): [Tải tại đây](https://ollama.ai/)
   - **LM Studio** (giao diện thay thế): [Tải tại đây](https://lmstudio.ai)

## Bước 1: Chọn Cài Đặt (1 phút)

### Máy Cục Bộ (Cùng Máy Tính)
Mọi thứ chạy trên máy của bạn. Khuyến nghị cho thử nghiệm/học tập.

### Máy Chủ Từ Xa (Raspberry Pi, NAS, Cloud VM)
Chạy trên máy tính khác, truy cập từ máy khác. Cần cấu hình mạng.

---

## Bước 2: Tạo Cấu Hình (1 phút)

Tạo thư mục mới `open-notebook-local` và thêm file này:

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
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    ports:
      - "8502:8502"  # Giao diện Web (React frontend)
      - "5055:5055"  # API (bắt buộc!)
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
      - ./surreal_data:/mydata
    depends_on:
      - surrealdb
    restart: always

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ./ollama_models:/root/.ollama
    environment:
      # Tùy chọn: bật hỗ trợ GPU nếu có
      - OLLAMA_NUM_GPU=0
    restart: always

```

**Chỉnh sửa file:**
- Thay `thay-doi-thanh-chuoi-bi-mat` bằng chuỗi bí mật của bạn (bất kỳ chuỗi nào đều được)

---

## Bước 3: Khởi Động Dịch Vụ (1 phút)

Mở terminal trong thư mục `open-notebook-local`:

```bash
docker compose up -d
```

Chờ 10-15 giây để tất cả dịch vụ khởi động.

---

## Bước 4: Tải Mô Hình (2-3 phút)

Ollama cần ít nhất một mô hình ngôn ngữ. Chọn một:

```bash
# Nhanh nhất & nhỏ nhất (khuyến nghị cho thử nghiệm)
docker exec open-notebook-local-ollama-1 ollama pull mistral

# HOẶC: Chất lượng tốt hơn nhưng chậm hơn
docker exec open-notebook-local-ollama-1 ollama pull neural-chat

# HOẶC: Chất lượng tốt hơn nữa, cần nhiều VRAM hơn
docker exec open-notebook-local-ollama-1 ollama pull llama2
```

Lệnh này tải mô hình (sẽ mất 1-5 phút tùy tốc độ mạng).

---

## Bước 5: Truy Cập Open Notebook (ngay lập tức)

Mở trình duyệt:
```
http://localhost:8502
```

Bạn sẽ thấy giao diện Open Notebook.

---

## Bước 6: Cấu Hình Nhà Cung Cấp Ollama (1 phút)

1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm Credential**
3. Chọn nhà cung cấp: **Ollama**
4. Đặt tên (ví dụ: "Ollama Cục Bộ")
5. Nhập URL cơ sở: `http://ollama:11434`
6. Nhấn **Lưu**
7. Nhấn **Kiểm Tra Kết Nối** — sẽ hiển thị thành công
8. Nhấn **Khám Phá Mô Hình** → **Đăng Ký Mô Hình**

---

## Bước 7: Cấu Hình Mô Hình Cục Bộ (1 phút)

1. Vào **Cài đặt** → **Mô hình**
2. Đặt:
   - **Mô hình Ngôn ngữ**: `ollama/mistral` (hoặc mô hình bạn đã tải)
   - **Mô hình Nhúng**: `ollama/nomic-embed-text` (tự động tải nếu thiếu)
3. Nhấn **Lưu**

---

## Bước 8: Tạo Notebook Đầu Tiên (1 phút)

1. Nhấn **Notebook Mới**
2. Tên: "Nghiên Cứu Riêng Tư"
3. Nhấn **Tạo**

---

## Bước 9: Thêm Nội Dung Cục Bộ (1 phút)

1. Nhấn **Thêm Nguồn**
2. Chọn **Văn Bản**
3. Dán văn bản hoặc tài liệu cục bộ
4. Nhấn **Thêm**

---

## Bước 10: Chat Với Nội Dung (1 phút)

1. Vào **Chat**
2. Gõ: "Bạn đã học được gì từ nội dung này?"
3. Nhấn **Gửi**
4. Xem mô hình Ollama cục bộ trả lời!

---

## Danh Sách Kiểm Tra

- [ ] Docker đang chạy
- [ ] Có thể truy cập `http://localhost:8502`
- [ ] Credential Ollama đã cấu hình và kiểm tra
- [ ] Mô hình đã đăng ký
- [ ] Đã tạo notebook
- [ ] Chat hoạt động với mô hình cục bộ

**Tất cả đã đánh dấu?** Bạn đã có trợ lý nghiên cứu hoàn toàn **riêng tư, ngoại tuyến**!

---

## Ưu Điểm Cài Đặt Cục Bộ

- **Không tốn phí API** - Miễn phí mãi mãi
- **Không cần internet** - Khả năng ngoại tuyến thực sự
- **Quyền riêng tư hàng đầu** - Dữ liệu không bao giờ rời máy
- **Không đăng ký** - Không hóa đơn hàng tháng

**Đánh đổi:** Chậm hơn mô hình đám mây (phụ thuộc CPU/GPU)

---

## Khắc Phục Sự Cố

### "ollama: command not found"

Tên image Docker có thể khác:
```bash
docker ps  # Tìm tên container Ollama
docker exec <tên_container> ollama pull mistral
```

### Tải Mô Hình Bị Treo

Kiểm tra kết nối internet và khởi động lại:
```bash
docker compose restart ollama
```

Sau đó thử lại lệnh pull mô hình.

### Lỗi "Địa chỉ đã được sử dụng"

```bash
docker compose down
docker compose up -d
```

### Hiệu Suất Thấp

Kiểm tra GPU có sẵn không:
```bash
# Hiển thị GPU có sẵn
docker exec open-notebook-local-ollama-1 ollama ps

# Bật GPU trong docker-compose.yml:
# - OLLAMA_NUM_GPU=1
```

Sau đó khởi động lại: `docker compose restart ollama`

### Thêm Mô Hình

```bash
# Liệt kê mô hình có sẵn
docker exec open-notebook-local-ollama-1 ollama list

# Pull thêm mô hình
docker exec open-notebook-local-ollama-1 ollama pull neural-chat
```

---

## Bước Tiếp Theo

**Bây giờ đã chạy:**

1. **Thêm Nội Dung Của Bạn**: PDF, tài liệu, bài viết (xem 3-HƯỚNG-DẪN-SỬ-DỤNG)
2. **Khám Phá Tính Năng**: Podcast, biến đổi, tìm kiếm
3. **Tài Liệu Đầy Đủ**: [Xem tất cả tính năng](../3-USER-GUIDE/index.md)
4. **Nâng Cấp**: Triển khai trên máy chủ có phần cứng tốt hơn để phản hồi nhanh hơn
5. **Đánh Giá Mô Hình**: Thử các mô hình khác để tìm sự đánh đổi tốc độ/chất lượng bạn thích

---

## Thay Thế: Sử Dụng LM Studio Thay Ollama

**Thích giao diện?** LM Studio dễ hơn cho người dùng không chuyên kỹ thuật:

1. Tải LM Studio: https://lmstudio.ai
2. Mở ứng dụng, tải mô hình từ thư viện
3. Vào tab "Local Server", khởi động server (cổng 1234)
4. Trong Open Notebook, vào **Cài đặt** → **Khóa API**
5. Nhấn **Thêm Credential** → Chọn **Tương Thích OpenAI**
6. Nhập URL cơ sở: `http://host.docker.internal:1234/v1`
7. Nhập khóa API: `lm-studio` (giữ chỗ)
8. Nhấn **Lưu**, sau đó **Kiểm Tra Kết Nối**
9. Cấu hình trong Cài đặt → Mô hình → Chọn mô hình LM Studio

**Lưu ý**: LM Studio chạy ngoài Docker, sử dụng `host.docker.internal` để kết nối.

---

## Tìm Hiểu Thêm

- **Đổi mô hình**: Thay đổi trong Cài đặt → Mô hình bất cứ lúc nào
- **Thêm mô hình**:
  - Ollama: Chạy `ollama pull <mô_hình>`, sau đó khám phá lại mô hình từ credential
  - LM Studio: Tải từ thư viện ứng dụng
- **Triển khai server**: Cùng docker-compose.yml hoạt động ở mọi nơi
- **Hybrid đám mây**: Giữ một số mô hình cục bộ, thêm credential nhà cung cấp đám mây cho tác vụ phức tạp

---

## Lựa Chọn Mô Hình Phổ Biến

| Mô hình | Tốc độ | Chất lượng | VRAM | Phù hợp cho |
|---------|--------|-----------|------|-------------|
| **mistral** | Nhanh | Tốt | 4GB | Thử nghiệm, sử dụng chung |
| **neural-chat** | Trung bình | Tốt hơn | 6GB | Cân bằng, khuyến nghị |
| **llama2** | Chậm | Tốt nhất | 8GB+ | Suy luận phức tạp |
| **phi** | Rất nhanh | Khá | 2GB | Phần cứng tối thiểu |

---

**Cần Trợ Giúp?** Tham gia [cộng đồng Discord](https://discord.gg/37XJPXfz2w) - nhiều người dùng chạy cài đặt cục bộ!
