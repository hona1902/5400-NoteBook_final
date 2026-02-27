# Khắc phục nhanh - 11 vấn đề & giải pháp hàng đầu

Các vấn đề thường gặp với giải pháp trong 1 phút.

---

## #1: "Không thể kết nối với máy chủ"

**Triệu chứng:** Trình duyệt hiển thị lỗi "Không thể kết nối với máy chủ" hoặc "Không thể truy cập API"

**Lý do:** Frontend không thể truy cập API

**Giải pháp (1 phút):**



```bash
# Step 1: Check if API is running
docker ps | grep api

# Step 2: Verify port 5055 is accessible
curl http://localhost:5055/health

# Expected output: {"status":"ok"}

# If that doesn't work:
# Step 3: Restart services
docker compose restart

# Step 4: Try again
# Open http://localhost:8502 in browser
```



**Nếu vẫn bị hỏng:**
- Kiểm tra `API_URL` trong .env (phải khớp với URL giao diện người dùng của bạn)
- Xem [Sự cố kết nối](connection-issues.md)

---

## #2: "Khóa API không hợp lệ" hoặc "Mô hình không hiển thị"

**Triệu chứng:** Cài đặt → Kiểu máy hiển thị "Không có kiểu máy nào"

**Lý do:** Không có thông tin xác thực nào được định cấu hình hoặc thông tin xác thực có khóa API không hợp lệ

**Giải pháp (1 phút):**



```
1. Go to Settings → API Keys
2. If no credential exists, click "Add Credential" and add one
3. If a credential exists, click "Test Connection"
4. If test fails, delete and re-create with correct key
5. After test passes, click "Discover Models" → "Register Models"
6. Go to Settings → Models to verify models appear
```



**Nếu vẫn bị hỏng:**
- Đảm bảo phím không có dấu cách thừa
- Tạo khóa mới từ bảng điều khiển của nhà cung cấp
- Kiểm tra xem `OPEN_NOTEBOOK_ENCRYPTION_KEY` đã được đặt trong docker-compose.yml chưa
- Xem [Vấn đề về AI và trò chuyện](ai-chat-issues.md)

---

## #3: "Cổng X đã được sử dụng"

**Triệu chứng:** Lỗi Docker "Cổng 8502 đã được cấp phát"

**Lý do:** Một dịch vụ khác sử dụng cổng đó

**Giải pháp (1 phút):**



```bash
# Option 1: Stop the other service
# Find what's using port 8502
lsof -i :8502
# Kill it or close the app

# Option 2: Use different port
# Edit docker-compose.yml
# Change: - "8502:8502"
# To:     - "8503:8502"

# Then restart
docker compose restart
# Access at: http://localhost:8503
```



---

## #4: "Không thể xử lý tệp" hoặc "Định dạng không được hỗ trợ"

**Triệu chứng:** Tải lên không thành công hoặc thông báo "Định dạng tệp không được hỗ trợ"

**Lý do:** Loại tệp không được hỗ trợ hoặc quá lớn

**Giải pháp (1 phút):**



```bash
# Check if file format is supported:
# ✓ PDF, DOCX, PPTX, XLSX (documents)
# ✓ MP3, WAV, M4A (audio)
# ✓ MP4, AVI, MOV (video)
# ✓ URLs/web links

# ✗ Pure images (.jpg without OCR)
# ✗ Files > 100MB

# Try these:
# - Convert to PDF if possible
# - Split large files
# - Try uploading again
```



---

## #5: "Trò chuyện rất chậm"

**Triệu chứng:** Phản hồi trò chuyện mất vài phút hoặc hết thời gian chờ

**Nguyên nhân:** Nhà cung cấp AI chậm, ngữ cảnh lớn hoặc hệ thống quá tải

**Giải pháp (1 phút):**



```bash
# Step 1: Check which model you're using
# Settings → Models
# Note the model name

# Step 2: Try a cheaper/faster model
# OpenAI: Switch to gpt-4o-mini (10x cheaper, slightly faster)
# Anthropic: Switch to claude-3-5-haiku (fastest)
# Groq: Use any model (ultra-fast)

# Step 3: Reduce context
# Chat: Select fewer sources
# Use "Summary Only" instead of "Full Content"

# Step 4: Check if API is overloaded
docker stats
# Look at CPU/memory usage
```



Để tìm hiểu sâu hơn: Xem [Vấn đề về AI và trò chuyện](ai-chat-issues.md)

---

## #6: "Trò chuyện đưa ra phản hồi không tốt"

**Triệu chứng:** Phản hồi của AI là chung chung, sai hoặc không liên quan

**Lý do:** Ngữ cảnh sai, câu hỏi mơ hồ hoặc mô hình sai

**Giải pháp (1 phút):**



```bash
# Step 1: Make sure sources are in context
# Click "Select Sources" in Chat
# Verify relevant sources are checked and set to "Full Content"

# Step 2: Ask a specific question
# Bad: "What do you think?"
# Good: "Based on the paper's methodology section, what are the 3 main limitations?"

# Step 3: Try a more powerful model
# OpenAI: Use gpt-4o (better reasoning)
# Anthropic: Use claude-3-5-sonnet (best reasoning)

# Step 4: Check citations
# Click citations to verify AI actually saw those sources
```



Để được trợ giúp chi tiết: Xem [Trò chuyện hiệu quả](../3-USER-GUIDE/chat-performancely.md)

---

## #7: "Tìm kiếm không trả lại kết quả gì"

**Triệu chứng:** Tìm kiếm hiển thị 0 kết quả mặc dù nội dung vẫn tồn tại

**Nguyên nhân:** Loại tìm kiếm sai hoặc truy vấn kém

**Giải pháp (1 phút):**



```bash
# Try a different search type:

# If you searched with KEYWORDS:
# Try VECTOR SEARCH instead
# (Concept-based, not keyword-based)

# If you searched for CONCEPTS:
# Try TEXT SEARCH instead
# (Look for specific words in your query)

# Try simpler search:
# Instead of: "How do transformers work in neural networks?"
# Try: "transformers" or "neural networks"

# Check sources are processed:
# Go to notebook
# All sources should show green "Ready" status
```



Để được trợ giúp chi tiết: Xem [Tìm kiếm hiệu quả](../3-USER-GUIDE/search.md)

---

## #8: "Tạo podcast không thành công"

**Triệu chứng:** Lỗi "Tạo podcast không thành công"

**Lý do:** Không đủ nội dung, hạn ngạch API hoặc sự cố mạng

**Giải pháp (1 phút):**



```bash
# Step 1: Make sure you have content
# Select at least 1-2 sources
# Avoid single-sentence sources

# Step 2: Try again
# Sometimes it's a temporary API issue
# Wait 30 seconds and retry

# Step 3: Check your TTS provider has quota
# OpenAI: Check account has credits
# ElevenLabs: Check monthly quota
# Google: Check API quota

# Step 4: Try different TTS provider
# In podcast generation, choose "Google" or "Local"
# instead of "ElevenLabs"
```



Để được trợ giúp chi tiết: Xem [FAQ](faq.md)

---

## #9: "Dịch vụ không khởi động" hoặc lỗi Docker

**Triệu chứng:** Lỗi Docker khi chạy `docker soạn thảo`

**Nguyên nhân:** Cấu hình bị hỏng, vấn đề về quyền hoặc vấn đề về tài nguyên

**Giải pháp (1 phút):**



```bash
# Step 1: Check logs
docker compose logs

# Step 2: Try restart
docker compose restart

# Step 3: If that fails, rebuild
docker compose down
docker compose up --build

# Step 4: Check disk space
df -h
# Need at least 5GB free

# Step 5: Check Docker has enough memory
# Docker settings → Resources → Memory: 4GB+
```



---

## #10: "Cơ sở dữ liệu báo 'quá nhiều kết nối'"

**Triệu chứng:** Lỗi về kết nối cơ sở dữ liệu

**Nguyên nhân:** Quá nhiều thao tác đồng thời

**Giải pháp (1 phút):**



```bash
# In .env, reduce concurrency:
SURREAL_COMMANDS_MAX_TASKS=2

# Then restart:
docker compose restart

# This makes it slower but more stable
```



---

## #11: Hết thời gian khởi động hoặc tải xuống chậm (Trung Quốc/Mạng chậm)

**Triệu chứng:** Vùng chứa gặp sự cố khi khởi động, nhân viên chuyển sang trạng thái TUYỆT VỜI hoặc tải xuống pip/uv không thành công

**Nguyên nhân:** Mạng chậm hoặc quyền truy cập bị hạn chế vào kho gói Python

**Giải pháp:**

### Tăng thời gian chờ tải xuống

```yaml
# In docker-compose.yml environment:
environment:
  - UV_HTTP_TIMEOUT=600  # 10 minutes (default is 30s)
```



###Sử dụng Gương Trung Quốc (nếu ở Trung Quốc)

```yaml
environment:
  - UV_HTTP_TIMEOUT=600
  - UV_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
  - PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
```



**Gương Trung Quốc thay thế:**
- Thanh Hoa: `https://pypi.tuna.tsinghua.edu.cn/simple`
- Aliyun: `https://mirrors.aliyun.com/pypi/simple/`
- Huawei: `https://repo.huaweicloud.com/repository/pypi/simple`

**Lưu ý:** Lần khởi động đầu tiên có thể mất vài phút trong khi tải xuống phần phụ thuộc. Những lần khởi động tiếp theo sẽ nhanh hơn.

---

## Danh sách kiểm tra khắc phục sự cố nhanh

Khi có thứ gì đó bị hỏng:

- [ ] **Khởi động lại dịch vụ:** `docker soạn thảo khởi động lại`
- [ ] **Kiểm tra nhật ký:** `docker soạn nhật ký`
- [ ] **Xác minh kết nối:** `curl http://localhost:5055/health`
- [ ] **Kiểm tra .env:** Đã đặt khóa API chưa? API_URL đúng không?
- [ ] **Kiểm tra tài nguyên:** `docker stats` (CPU/bộ nhớ)
- [ ] **Xóa bộ nhớ cache:** `docker system Prune` (dung lượng trống)
- [ ] **Xây dựng lại nếu cần:** `docker soạn thảo --build`

---

## Các lựa chọn hạt nhân (Phương án cuối cùng)

**Đặt lại hoàn toàn (sẽ mất tất cả dữ liệu trong Docker):**



```bash
docker compose down -v
docker compose up --build
```



**Đặt lại về mặc định:**

```bash
# Backup your .env first!
cp .env .env.backup

# Reset to example
cp .env.example .env

# Edit with your API keys
# Restart
docker compose up
```



---

## Mẹo phòng ngừa

1. **Giữ bản sao lưu** — Xuất sổ ghi chép của bạn thường xuyên
2. **Theo dõi nhật ký** — Kiểm tra định kỳ `docker soạn nhật ký`
3. **Cập nhật thường xuyên** — Kéo hình ảnh mới nhất: `docker pull lfnovo/open_notebook:latest`
4. **Thay đổi tài liệu** — Ghi chú về những gì bạn đã định cấu hình
5. **Kiểm tra sau khi cập nhật** — Xác minh mọi thứ đều hoạt động

---

## Vẫn bị kẹt?

- **Tra cứu lỗi chính xác của bạn** trong [Chỉ mục khắc phục sự cố](index.md)
- **Kiểm tra Câu hỏi thường gặp** trong [FAQ](faq.md)
- **Kiểm tra nhật ký:** `docker soạn nhật ký | đầu -50`
- **Yêu cầu trợ giúp:** [Discord](https://discord.gg/37XJPXfz2w) hoặc [Vấn đề về GitHub](https://github.com/lfnovo/open-notebook/issues)