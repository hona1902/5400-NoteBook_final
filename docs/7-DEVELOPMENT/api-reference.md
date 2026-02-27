# Tham chiếu API

Hoàn thành API REST cho Sổ ghi chép mở. Tất cả các điểm cuối đều được cung cấp từ chương trình phụ trợ API (mặc định: `http://localhost:5055`).

**URL cơ sở**: `http://localhost:5055` (phát triển) hoặc URL sản xuất dành riêng cho môi trường

**Tài liệu tương tác**: Sử dụng giao diện người dùng Swagger tích hợp của FastAPI tại `http://localhost:5055/docs` để thử nghiệm và khám phá trực tiếp. Đây là tài liệu tham khảo chính cho tất cả các điểm cuối, lược đồ yêu cầu/phản hồi và thử nghiệm theo thời gian thực.

---

## Bắt đầu nhanh

### 1. Xác thực

Dựa trên mật khẩu đơn giản (chỉ dành cho phát triển):



```bash
curl http://localhost:5055/api/notebooks \
  -H "Authorization: Bearer your_password"
```



**⚠️ Sản xuất**: Thay thế bằng OAuth/JWT. Xem [Cấu hình bảo mật](../5-CONFIGUTURE/security.md) để biết chi tiết.

### 2. Luồng API cơ sở

Hầu hết các hoạt động đều theo mẫu này:
1. Tạo **Notebook** (hộp đựng nghiên cứu)
2. Thêm **Nguồn** (PDF, URL, văn bản)
3. Truy vấn qua **Trò chuyện**hoặc**Tìm kiếm**4. Xem kết quả và**Ghi chú**

### 3. Điểm cuối kiểm tra

Thay vì ghi nhớ điểm cuối, hãy sử dụng tài liệu API tương tác:
- Điều hướng đến `http://localhost:5055/docs`
- Thử yêu cầu trực tiếp trên trình duyệt
- Xem lược đồ yêu cầu/phản hồi trong thời gian thực
- Kiểm tra với dữ liệu của riêng bạn

---

## Tổng quan về điểm cuối API

### Các loại tài nguyên chính

**Sổ tay** - Dự án nghiên cứu có chứa nguồn và ghi chú
- `GET/POST /notebooks` - Liệt kê và tạo
- `GET/PUT/DELETE /notebooks/{id}` - Đọc, cập nhật, xóa

**Nguồn** - Mục nội dung (PDF, URL, văn bản)
- `GET/POST /sources` - Liệt kê và thêm nội dung
- `GET /sources/{id}` - Tìm nạp chi tiết nguồn
- `POST /sources/{id}/retry` - Thử lại quá trình xử lý không thành công
- `GET /sources/{id}/download` - Tải file gốc

**Ghi chú** - Ghi chú nghiên cứu do người dùng tạo hoặc do AI tạo
- `GET/POST /notes` - Liệt kê và tạo
- `GET/PUT/DELETE /notes/{id}` - Đọc, cập nhật, xóa

**Trò chuyện** - Giao diện AI đàm thoại
- `GET/POST /chat/sessions` - Quản lý phiên trò chuyện
- `POST /chat/execute` - Gửi tin nhắn và nhận phản hồi
- `POST /chat/context/build` - Chuẩn bị ngữ cảnh cho cuộc trò chuyện

**Tìm kiếm** - Tìm nội dung theo văn bản hoặc sự tương đồng về ngữ nghĩa
- `POST /search` - Tìm kiếm toàn văn hoặc vector
- `POST /ask` - Đặt câu hỏi (tìm kiếm + tổng hợp)

**Biến đổi** - Lời nhắc tùy chỉnh để trích xuất thông tin chi tiết
- `GET/POST /transformations` - Tạo quy tắc trích xuất tùy chỉnh
- `POST /sources/{id}/insights` - Áp dụng chuyển đổi cho nguồn

**Mô hình** - Định cấu hình nhà cung cấp AI
- `GET /models` - Các mẫu có sẵn
- `GET /models/defaults` - Mặc định hiện tại
- `POST /models/config` - Đặt mặc định

**Thông tin xác thực** - Quản lý thông tin xác thực của nhà cung cấp AI
- `GET/POST /credentials` - Liệt kê và tạo thông tin xác thực
- `GET/PUT/DELETE /credentials/{id}` - Thao tác CRUD
- `POST /credentials/{id}/test` - Kiểm tra kết nối
- `POST /credentials/{id}/discover` - Khám phá các mô hình từ nhà cung cấp
- `POST /credentials/{id}/register-models` - Đăng ký các mô hình được phát hiện
- `GET /credentials/status` - Tổng quan về trạng thái nhà cung cấp
- `GET /credentials/env-status` - Trạng thái biến môi trường
- `POST /credentials/migrate-from-env` - Di chuyển các biến env sang thông tin xác thực

**Sức khỏe & Tình trạng**
- `GET /health` - Kiểm tra sức khỏe
- `GET /commands/{id}` - Theo dõi các hoạt động không đồng bộ

---

## Xác thực

### Hiện tại (Phát triển)

Tất cả các yêu cầu đều yêu cầu tiêu đề mật khẩu:



```bash
curl -H "Authorization: Bearer your_password" http://localhost:5055/api/notebooks
```



Mật khẩu được định cấu hình thông qua biến môi trường `OPEN_NOTEBOOK_PASSWORD`.

> **📖 Xem [Cấu hình bảo mật](../5-CONFIGUATION/security.md)** để biết thông tin thiết lập xác thực hoàn chỉnh, ví dụ về API và tăng cường sản xuất.

### Sản xuất

**⚠️ Không an toàn.** Thay thế bằng:
- OAuth 2.0 (được khuyến nghị)
- Mã thông báo JWT
- Khóa API

Xem [Cấu hình bảo mật](../5-CONFIGUTURE/security.md) để biết thiết lập sản xuất.

---

## Các mẫu phổ biến

### Phân trang



```bash
# List sources with limit/offset
curl 'http://localhost:5055/sources?limit=20&offset=10'
```



### Lọc & Sắp xếp



```bash
# Filter by notebook, sort by date
curl 'http://localhost:5055/sources?notebook_id=notebook:abc&sort_by=created&sort_order=asc'
```



### Hoạt động không đồng bộ

Một số thao tác (xử lý nguồn, tạo podcast) trả về ngay lập tức bằng ID lệnh:



```bash
# Submit async operation
curl -X POST http://localhost:5055/sources -F async_processing=true
# Response: {"id": "source:src001", "command_id": "command:cmd123"}

# Poll status
curl http://localhost:5055/commands/command:cmd123
```



### Phản hồi trực tuyến

Điểm cuối `/ask` phản hồi luồng dưới dạng Sự kiện do máy chủ gửi:



```bash
curl -N 'http://localhost:5055/ask' \
  -H "Content-Type: application/json" \
  -d '{"question": "What is AI?"}'

# Outputs: data: {"type":"strategy",...}
#          data: {"type":"answer",...}
#          data: {"type":"final_answer",...}
```



### Tải lên tệp nhiều phần



```bash
curl -X POST http://localhost:5055/sources \
  -F "type=upload" \
  -F "notebook_id=notebook:abc" \
  -F "file=@document.pdf"
```



---

## Xử lý lỗi

Tất cả các lỗi đều trả về JSON kèm theo mã trạng thái:



```json
{"detail": "Notebook not found"}
```



### Mã trạng thái chung

| Mã | Ý nghĩa | Ví dụ |
|------|----------|----------|
| 200 | Thành công | Hoạt động hoàn thành |
| 400 | Yêu cầu Xấu | Đầu vào không hợp lệ |
| 404 | Không tìm thấy | Tài nguyên không tồn tại |
| 409 | Xung đột | Tài nguyên đã tồn tại |
| 500 | Lỗi Máy Chủ | Lỗi cơ sở dữ liệu/xử lý |

---

## Lời khuyên dành cho nhà phát triển

1. **Bắt đầu với tài liệu tương tác** (`http://localhost:5055/docs`) - đây là tài liệu tham khảo chính xác
2. **Bật ghi nhật ký** để gỡ lỗi (kiểm tra nhật ký API: `docker log`)
3. **Điểm cuối phát trực tuyến** yêu cầu xử lý đặc biệt (Sự kiện do máy chủ gửi, không phải JSON tiêu chuẩn)
4. **Hoạt động không đồng bộ** trả về ngay lập tức; luôn thăm dò trạng thái trước khi giả định hoàn thành
5. **Tìm kiếm vectơ** yêu cầu cấu hình mô hình nhúng (kiểm tra `/models`)
6. **Ghi đè mô hình** là theo yêu cầu; cài đặt trong body chứ không phải config
7. **Đã bật CORS** trong quá trình phát triển; cấu hình cho sản xuất

---

## Lộ trình học tập

1. **Xác thực**: Thêm tiêu đề `X-Password` vào tất cả các yêu cầu
2. **Tạo sổ ghi chép**: `POST /notebooks` với tên và mô tả
3. **Thêm nguồn**: `POST /sources` với tệp, URL hoặc văn bản
4. **Truy vấn nội dung của bạn**: `POST /chat/execute` để đặt câu hỏi
5. **Khám phá các tính năng nâng cao**: Tìm kiếm, chuyển đổi, phát trực tuyến

---

## Cân nhắc về sản xuất

- Thay thế mật khẩu xác thực bằng OAuth/JWT (xem [Security](../5-CONFIGUration/security.md))
- Thêm giới hạn tốc độ thông qua proxy ngược (Nginx, CloudFlare, Kong)
- Kích hoạt các hạn chế CORS (hiện cho phép tất cả các nguồn gốc)
- Sử dụng HTTPS qua proxy ngược (xem [Proxy ngược](../5-CONFIGUration/reverse-proxy.md))
- Thiết lập chiến lược phiên bản API (hiện đang ẩn)

Xem [Cấu hình bảo mật](../5-CONFIGUATION/security.md) và [Thiết lập proxy ngược](../5-CONFIGUATION/reverse-proxy.md) để biết thiết lập sản xuất hoàn chỉnh.