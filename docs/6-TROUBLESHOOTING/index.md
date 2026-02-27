# Xử lý sự cố - Hướng dẫn giải quyết vấn đề

Có vấn đề? Sử dụng hướng dẫn này để chẩn đoán và khắc phục sự cố.

---

## Cách sử dụng Hướng dẫn này

**Bước 1: Xác định vấn đề của bạn**
- Triệu chứng gì thế? (thông báo lỗi, hành vi, điều gì đó không hoạt động?)
- Chuyện đó xảy ra khi nào? (trong khi cài đặt, trong khi sử dụng, sau khi cập nhật?)

**Bước 2: Tìm hướng dẫn phù hợp**
- Nhìn bên dưới để biết triệu chứng của bạn
- Đi tới hướng dẫn khắc phục sự cố cụ thể

**Bước 3: Thực hiện theo các bước**
- Hướng dẫn được tổ chức theo triệu chứng, không theo nguyên nhân gốc rễ
- Mỗi bước đều có các bước chẩn đoán và giải pháp

---

## Bản đồ vấn đề nhanh

### Trong quá trình cài đặt

- **Docker không khởi động** → [Sửa nhanh](quick-fixes.md#9-services-wont-start-or-docker-error)
- **Cổng đã được sử dụng** → [Sửa nhanh](quick-fixes.md#3-port-x-already-in-use)
- **Quyền bị từ chối** → [Sửa nhanh](quick-fixes.md#9-services-wont-start-or-docker-error)
- **Không thể kết nối với cơ sở dữ liệu** → [Sự cố kết nối](connection-issues.md)

### Khi bắt đầu

- **API không khởi động** → [Sửa nhanh](quick-fixes.md#9-services-wont-start-or-docker-error)
- **Giao diện người dùng không tải** → [Sự cố kết nối](connection-issues.md)
- **Lỗi "Không thể kết nối với máy chủ"** → [Sự cố kết nối](connection-issues.md)

### Cài đặt/Cấu hình

- **Mô hình không hiển thị** → [Vấn đề về AI và trò chuyện](ai-chat-issues.md)
- **"Khóa API không hợp lệ"** → [Vấn đề về AI và trò chuyện](ai-chat-issues.md)
- **Không thể tìm thấy Cài đặt** → [Sửa nhanh](quick-fixes.md)

### Sử dụng tính năng

- **Trò chuyện không hoạt động** → [Vấn đề về AI và trò chuyện](ai-chat-issues.md)
- **Phản hồi trò chuyện chậm** → [Vấn đề về AI và trò chuyện](ai-chat-issues.md)
- **Trò chuyện đưa ra câu trả lời không tốt** → [Vấn đề về AI và trò chuyện](ai-chat-issues.md)

### Thêm nội dung

- **Không thể tải lên bản PDF** → [Sửa nhanh](quick-fixes.md#4-cannot-process-file-or-unsupported-format)
- **Tệp sẽ không xử lý** → [Sửa nhanh](quick-fixes.md#4-cannot-process-file-or-unsupported-format)
- **Liên kết web sẽ không giải nén được** → [Sửa nhanh](quick-fixes.md#4-cannot-process-file-or-unsupported-format)

### Tìm kiếm

- **Tìm kiếm không trả lại kết quả nào** → [Sửa nhanh](quick-fixes.md#7-search-returns-nothing)
- **Tìm kiếm trả về kết quả sai** → [Sửa nhanh](quick-fixes.md#7-search-returns-nothing)

### Podcast

- **Không thể tạo podcast** → [Sửa nhanh](quick-fixes.md#8-podcast-Generation-failed)
- **Podcast hiển thị huy hiệu "FAILED"**→ Kiểm tra thông báo lỗi hiển thị trên tập, sau đó sử dụng nút**Thử lại**. Xem [Giải thích về Podcast](../2-CORE-CONCEPTS/podcasts-explained.md#when-things-go-wrong-failures--retry)
- **Âm thanh podcast là robot** → [Sửa nhanh](quick-fixes.md#8-podcast-thế hệ-thất bại)
- **Đã hết thời gian tạo podcast** → [Sửa nhanh](quick-fixes.md#8-podcast-thế hệ-thất bại)

---

## Khắc phục sự cố bằng thông báo lỗi

### "Không thể kết nối với máy chủ"
→ [Sự cố kết nối](connection-issues.md) — Giao diện người dùng không thể truy cập API

### "Khóa API không hợp lệ"
→ [Sự cố về AI & Trò chuyện](ai-chat-issues.md) — Khóa API sai hoặc bị thiếu

### "Mẫu không có sẵn"
→ [Sự cố về AI & Trò chuyện](ai-chat-issues.md) — Mô hình chưa được định cấu hình

### "Kết nối bị từ chối"
→ [Sự cố kết nối](connection-issues.md) — Dịch vụ không chạy hoặc cổng sai

### "Cổng đã được sử dụng"
→ [Sửa nhanh](quick-fixes.md#3-port-x-already-in-use) — Xung đột cổng

### "Quyền bị từ chối"
→ [Khắc phục nhanh](quick-fixes.md#9-services-wont-start-or-docker-error) — Vấn đề về quyền truy cập tệp

### "Loại tệp không được hỗ trợ"
→ [Sửa nhanh](quick-fixes.md#4-cannot-process-file-or-unsupported-format) — Định dạng tệp không được hỗ trợ

### "Hết thời gian xử lý"
→ [Khắc phục nhanh](quick-fixes.md#5-chat-is-very-slow) — Tệp quá lớn hoặc xử lý chậm

---

## Khắc phục sự cố theo Thành phần

### Giao diện người dùng (Trình duyệt/UI)
- Không thể truy cập UI → [Sự cố kết nối](connection-issues.md)
- Giao diện người dùng chậm → [Sửa nhanh](quick-fixes.md)
- Thiếu nút/tính năng → [Sửa nhanh](quick-fixes.md)

### API (Phần cuối)
- API không khởi động → [Khắc phục nhanh](quick-fixes.md#9-services-wont-start-or-docker-error)
- Lỗi API trong nhật ký → [Sửa nhanh](quick-fixes.md#9-services-wont-start-or-docker-error)
- API chậm → [Sửa nhanh](quick-fixes.md)

### Cơ sở dữ liệu
- Không thể kết nối với cơ sở dữ liệu → [Sự cố kết nối](connection-issues.md)
- Dữ liệu bị mất sau khi khởi động lại → [FAQ](faq.md#how-do-i-backup-my-data)

### AI/Trò chuyện
- Trò chuyện không hoạt động → [Vấn đề về AI và trò chuyện](ai-chat-issues.md)
- Phản hồi không tốt → [Vấn đề về AI và trò chuyện](ai-chat-issues.md)
- Chi phí quá cao → [Vấn đề về AI và trò chuyện](ai-chat-issues.md#high-api-costs)

### Nguồn
- Không thể tải tệp lên → [Khắc phục nhanh](quick-fixes.md#4-cannot-process-file-or-unsupported-format)
- Tệp không xử lý → [Khắc phục nhanh](quick-fixes.md#4-cannot-process-file-or-unsupported-format)

### Podcast
- Sẽ không tạo ra → [Khắc phục nhanh](quick-fixes.md#8-podcast-Generation-failed)
- Chất lượng âm thanh kém → [Khắc phục nhanh](quick-fixes.md#8-podcast-thế hệ-thất bại)

---

## Danh sách kiểm tra chẩn đoán

**Khi có điều gì đó không ổn:**

- [ ] Kiểm tra xem các dịch vụ có đang chạy không: `docker ps`
- [ ] Kiểm tra nhật ký: `docker soạn nhật ký api` (hoặc frontend, siêu thựcdb)
- [ ] Xác minh các cổng bị lộ: `netstat -tlnp` hoặc `lsof -i :5055`
- [ ] Kiểm tra kết nối: `curl http://localhost:5055/health`
- [ ] Kiểm tra các biến môi trường: `docker kiểm tra <container>`
- [ ] Thử khởi động lại: `docker soạn khởi động lại`
- [ ] Kiểm tra xem tường lửa/chống vi-rút có chặn không

---

## Nhận trợ giúp

Nếu bạn không thể tìm thấy câu trả lời ở đây:

1. **Kiểm tra hướng dẫn liên quan** — Đọc hết, thử tất cả các bước
2. **Kiểm tra Câu hỏi thường gặp** — [Câu hỏi thường gặp](faq.md)
3. **Tìm kiếm Discord của chúng tôi** — Những người khác có thể gặp vấn đề tương tự
4. **Kiểm tra nhật ký** — Hầu hết các sự cố đều hiển thị thông báo lỗi trong nhật ký
5. **Báo cáo trên GitHub** — Bao gồm thông báo lỗi, các bước sao chép

### Cách báo cáo sự cố

Bao gồm:
1. Thông báo lỗi (chính xác)
2. Các bước tái tạo
3. Nhật ký: `docker soạn nhật ký`
4. Thiết lập của bạn: Docker/local, nhà cung cấp, hệ điều hành
5. Những gì bạn đã thử

→ [Báo cáo trên GitHub](https://github.com/lfnovo/open-notebook/issues)

---

## Hướng dẫn

### [Sửa nhanh](quick-fixes.md)
Top 10 vấn đề thường gặp nhất với giải pháp trong 1 phút.

### [Sự cố kết nối](connection-issues.md)
Frontend không vào được API, mạng có vấn đề.

### [Vấn đề về AI và trò chuyện](ai-chat-issues.md)
Trò chuyện không hoạt động, phản hồi kém, hiệu suất chậm.

### [Câu hỏi thường gặp](faq.md)
Các câu hỏi thường gặp về cách sử dụng, chi phí và cách thực hành tốt nhất.

---

## Giải pháp chung

**Dịch vụ không bắt đầu?**

```bash
# Check logs
docker compose logs

# Restart everything
docker compose restart

# Nuclear option: rebuild
docker compose down
docker compose up --build
```



**Xung đột cổng?**

```bash
# Find what's using port 5055
lsof -i :5055
# Kill it or use different port
```



**Không thể kết nối?**

```bash
# Test API directly
curl http://localhost:5055/health
# Should return: {"status":"ok"}
```



**Hiệu suất chậm?**

```bash
# Check resource usage
docker stats

# Reduce concurrency in .env
SURREAL_COMMANDS_MAX_TASKS=2
```



**Chi phí cao?**

```bash
# Switch to cheaper model
# In Settings → Models → Choose gpt-4o-mini (OpenAI)
# Or use Ollama (free)
```



---

## Vẫn bị kẹt?

**Trước khi yêu cầu trợ giúp:**
1. Đọc kỹ hướng dẫn liên quan
2. Hãy thử tất cả các bước
3. Kiểm tra nhật ký
4. Khởi động lại dịch vụ
5. Tìm kiếm các vấn đề hiện có trên GitHub

**Sau đó:**-**Discord**: https://discord.gg/37XJPXfz2w (phản hồi nhanh nhất)
- **Vấn đề về GitHub**: https://github.com/lfnovo/open-notebook/issues