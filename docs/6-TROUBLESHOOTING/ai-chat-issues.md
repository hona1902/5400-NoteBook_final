# Vấn đề về AI & Trò chuyện - Cấu hình & Chất lượng mô hình

Các vấn đề với mô hình AI, trò chuyện và chất lượng phản hồi.

> **Lưu ý:** Mở Notebook hiện hiển thị thông báo lỗi mô tả về lỗi của nhà cung cấp AI. Thay vì thông báo chung chung là "Đã xảy ra lỗi không mong muốn", bạn sẽ thấy các thông báo cụ thể như "Xác thực không thành công. Vui lòng kiểm tra khóa API của bạn" hoặc "Vượt quá giới hạn tốc độ. Vui lòng đợi một lát và thử lại". Những thông báo này giúp bạn chẩn đoán và khắc phục sự cố nhanh hơn.

---

## Lỗi "Gửi tin nhắn không thành công"

**Triệu chứng:** Trò chuyện hiển thị bánh mì nướng "Không thể gửi tin nhắn". Nhật ký hiển thị:

```
Error executing chat: Model is not a LanguageModel: None
```



**Lý do:** Không có mô hình ngôn ngữ hợp lệ nào được định cấu hình để trò chuyện

**Giải pháp:**

### Giải pháp 1: Kiểm tra cấu hình model mặc định

```
1. Go to Settings → Models
2. Scroll to "Default Models" section
3. Verify "Default Chat Model" has a model selected
4. If empty, select an available language model
5. Click Save
```



### Giải pháp 2: Xác minh tên model (Người dùng Ollama)

```bash
# Get exact model names
ollama list

# Example output:
# NAME                   SIZE      MODIFIED
# gemma3:12b            8.1 GB    2 months ago

# The model name in Open Notebook must be EXACTLY "gemma3:12b"
# NOT "gemma3" or "gemma3-12b"
```



### Giải pháp 3: Thêm lại các mẫu bị thiếu

```
1. Note the exact model names from your provider
2. Go to Settings → Models
3. Delete any misconfigured models
4. Add models with exact names
5. Set new defaults
```



### Giải pháp 4: Kiểm tra Model vẫn tồn tại

```bash
# For Ollama: verify model is installed
ollama list

# For cloud providers: verify API key is valid
# and you have access to the model
```



> **Mẹo:** Lỗi này thường xảy ra khi bạn xóa một mẫu khỏi Ollama nhưng quên cập nhật các mẫu mặc định trong Open Notebook. Luôn định cấu hình lại mặc định sau khi xóa mô hình.

---

## "Không có mẫu" hoặc "Mẫu không hiển thị"

**Triệu chứng:** Cài đặt → Kiểu máy hiển thị trống hoặc "Không có kiểu máy nào được định cấu hình"

**Lý do:** Không có thông tin xác thực nào được định cấu hình hoặc thông tin xác thực có khóa API không hợp lệ

**Giải pháp:**

### Giải pháp 1: Thêm thông tin xác thực qua Giao diện người dùng cài đặt

```
1. Go to Settings → API Keys
2. Click "Add Credential"
3. Select your provider (e.g., OpenAI, Anthropic, Google)
4. Enter your API key
5. Click Save, then Test Connection
6. Click Discover Models → Register Models
7. Go to Settings → Models to verify
```



### Giải pháp 2: Kiểm tra Key có hợp lệ không

```
1. Go to Settings → API Keys
2. Click "Test Connection" on your credential
3. If it shows "Invalid API key":
   - Get a fresh key from the provider's website
   - Delete the credential and create a new one
```



### Giải pháp 3: Chuyển đổi nhà cung cấp

```
1. Go to Settings → API Keys
2. Add a credential for a different provider
3. Test Connection → Discover Models → Register Models
4. Go to Settings → Models to select the new provider's models
```



---

## "Khóa API không hợp lệ" hoặc "Trái phép"

**Triệu chứng:** Lỗi khi cố gắng trò chuyện: "Khóa API không hợp lệ"

**Lý do:** Thông tin xác thực có khóa API sai, hết hạn hoặc bị thu hồi

**Giải pháp:**

### Bước 1: Kiểm tra thông tin xác thực của bạn

```
1. Go to Settings → API Keys
2. Click "Test Connection" on your credential
3. If it fails, proceed to Step 2
```



### Bước 2: Lấy Fresh Key

```
Go to provider's dashboard:
- OpenAI: https://platform.openai.com/api-keys (starts with sk-proj-)
- Anthropic: https://console.anthropic.com/ (starts with sk-ant-)
- Google: https://aistudio.google.com/app/apikey (starts with AIzaSy)

Generate new key and copy exactly (no extra spaces)
```



### Bước 3: Cập nhật thông tin xác thực

```
1. Go to Settings → API Keys
2. Delete the old credential
3. Click "Add Credential" → select provider
4. Paste the new key
5. Click Save, then Test Connection
6. Re-discover and register models if needed
```



### Bước 4: Xác minh trong UI

```
1. Go to Settings → Models
2. Verify models are available
3. Try a test chat
```



---

## Trò chuyện Trả về các phản hồi chung/xấu

**Triệu chứng:** Phản hồi của AI rất nông cạn, chung chung hoặc sai

**Lý do:** Ngữ cảnh sai, câu hỏi mơ hồ hoặc mô hình sai

**Giải pháp:**

### Giải pháp 1: Kiểm tra ngữ cảnh

```
1. In Chat, click "Select Sources"
2. Verify sources you want are CHECKED
3. Set them to "Full Content" (not "Summary Only")
4. Click "Save"
5. Try chat again
```



### Giải pháp 2: Đặt câu hỏi hay hơn

```
Bad:     "What do you think?"
Good:    "Based on the paper's methodology, what are 3 limitations?"

Bad:     "Tell me about X"
Good:    "Summarize X in 3 bullet points with page citations"
```



### Giải pháp 3: Sử dụng Model mạnh hơn

```
OpenAI:
  Current: gpt-4o-mini → Switch to: gpt-4o

Anthropic:
  Current: claude-3-5-haiku → Switch to: claude-3-5-sonnet

To change:
1. Settings → Models
2. Select model
3. Try chat again
```



### Giải pháp 4: Thêm nguồn khác

```
If:  "Response seems incomplete"
Try: Add more relevant sources to provide context
```



---

## Trò chuyện rất chậm

**Triệu chứng:** Phản hồi trò chuyện mất vài phút

**Nguyên nhân:** Ngữ cảnh lớn, mô hình chậm hoặc API quá tải

**Giải pháp:**

### Giải pháp 1: Sử dụng Model nhanh hơn

```bash
Fastest: Groq (any model)
Fast: OpenAI gpt-4o-mini
Medium: Anthropic claude-3-5-haiku
Slow: Anthropic claude-3-5-sonnet

Switch in: Settings → Models
```



### Giải pháp 2: Giảm ngữ cảnh

```
1. Chat → Select Sources
2. Uncheck sources you don't need
3. Or switch to "Summary Only" for background sources
4. Save and try again
```



### Giải pháp 3: Tăng thời gian chờ

```bash
# In .env:
API_CLIENT_TIMEOUT=600  # 10 minutes

# Restart:
docker compose restart
```



### Giải pháp 4: Kiểm tra tải hệ thống

```bash
# See if API is overloaded:
docker stats

# If CPU >80% or memory >90%:
# Reduce: SURREAL_COMMANDS_MAX_TASKS=2
# Restart: docker compose restart
```



---

## Trò chuyện không nhớ lịch sử

**Triệu chứng:** Mỗi tin nhắn được coi là riêng biệt, không có ngữ cảnh giữa các câu hỏi

**Lý do:** Lịch sử trò chuyện chưa được lưu hoặc cuộc trò chuyện mới đã bắt đầu

**Giải pháp:**



```
1. Make sure you're in same Chat (not new Chat)
2. Check Chat title at top
3. If it's blank, start new Chat with a title
4. Each named Chat keeps its history
5. If you start new Chat, history is separate
```



---

## "Vượt quá giới hạn tỷ lệ"

**Triệu chứng:** Lỗi: "Vượt quá giới hạn tốc độ" hoặc "Quá nhiều yêu cầu"

**Lý do:** Đạt giới hạn tốc độ API của nhà cung cấp

**Giải pháp:**

### Dành cho nhà cung cấp đám mây (OpenAI, Anthropic, v.v.)

**Ngay lập tức:**
- Đợi 1-2 phút
- Thử lại

**Ngắn hạn:**
- Sử dụng mô hình rẻ hơn/nhỏ hơn
- Giảm các hoạt động đồng thời
- Yêu cầu giãn cách

**Dài hạn:**
- Nâng cấp tài khoản của bạn
- Chuyển sang nhà cung cấp khác
- Sử dụng Ollama (địa phương, không giới hạn)

### Kiểm tra trạng thái tài khoản

```
OpenAI: https://platform.openai.com/account/usage/overview
Anthropic: https://console.anthropic.com/account/billing/overview
Google: Google Cloud Console
```



### Dành cho Ollama (Địa phương)
- Không giới hạn tỷ lệ
- Sử dụng `ollama pull mistral` để có mô hình tốt nhất
- Khởi động lại nếu đạt giới hạn tài nguyên

---

## "Vượt quá độ dài ngữ cảnh" hoặc "Giới hạn mã thông báo"

**Triệu chứng:** Lỗi về quá nhiều token

**Nguyên nhân:** Nguồn quá lớn cho mô hình

**Giải pháp:**

### Giải pháp 1: Sử dụng Model với ngữ cảnh dài hơn

```
Current: GPT-4o (128K tokens) → Switch to: Claude (200K tokens)
Current: Claude Haiku (200K) → Switch to: Gemini (1M tokens)

To change: Settings → Models
```



### Giải pháp 2: Giảm ngữ cảnh

```
1. Select fewer sources
2. Or use "Summary Only" instead of "Full Content"
3. Or split large documents into smaller pieces
```



### Giải pháp 3: Dành cho Ollama (Local)

```bash
# Use smaller model:
ollama pull phi  # Very small
# Instead of: ollama pull neural-chat  # Large
```



---

## "Cuộc gọi API không thành công" hoặc Hết thời gian chờ

**Triệu chứng:** Lỗi API chung, hết thời gian phản hồi

**Nguyên nhân:** API nhà cung cấp không hoạt động, sự cố mạng hoặc dịch vụ chậm

**Giải pháp:**

### Kiểm tra trạng thái nhà cung cấp

```
OpenAI: https://status.openai.com/
Anthropic: Check website
Google: Google Cloud Status
Groq: Check website
```



### Thử lại thao tác

```
1. Wait 30 seconds
2. Try again
```



### Sử dụng Model/Nhà cung cấp khác

```
1. Settings → Models
2. Try different provider
3. If OpenAI down, use Anthropic
```



### Kiểm tra mạng

```bash
# Verify internet working:
ping google.com

# Test API endpoint directly:
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```



---

## Phản hồi bao gồm ảo giác

**Triệu chứng:** AI tạo ra những sự thật không có trong nguồn

**Lý do:** Nguồn không đúng ngữ cảnh hoặc đoán theo mô hình

**Giải pháp:**

### Giải pháp 1: Xác minh bối cảnh

```
1. Click citation in response
2. Check source actually says that
3. If not, sources weren't in context
4. Add source to context and try again
```



### Giải pháp 2: Yêu cầu trích dẫn

```
Ask: "Answer this with citations to specific pages"

The AI will be more careful if asked for citations
```



### Giải pháp 3: Sử dụng Model mạnh hơn

```
Weaker models hallucinate more
Switch to: GPT-4o or Claude Sonnet
```



---

## Chi phí API cao

**Triệu chứng:** Hóa đơn API cao hơn dự kiến

**Lý do:** Sử dụng model đắt tiền, bối cảnh rộng, nhiều request

**Giải pháp:**

### Sử dụng mẫu rẻ hơn

```
Expensive: gpt-4o
Cheaper: gpt-4o-mini (10x cheaper)

Expensive: Claude Sonnet
Cheaper: Claude Haiku (5x cheaper)

Groq: Ultra cheap but fewer models
```



### Giảm ngữ cảnh

```
In Chat:
1. Select fewer sources
2. Use "Summary Only" for background
3. Ask more specific questions
```



### Chuyển sang Ollama (Miễn phí)

```bash
# Install Ollama
# Run: ollama serve
# Download: ollama pull mistral
# Set: OLLAMA_API_BASE=http://localhost:11434
# Cost: Free!
```



---

## Vẫn gặp sự cố khi trò chuyện?

- Hãy thử [Sửa nhanh](quick-fixes.md)
- Hãy thử [Hướng dẫn trò chuyện hiệu quả](../3-USER-GUIDE/chat-performancely.md)
- Kiểm tra log: `docker soạn log api | grep -i "lỗi"`
- Yêu cầu trợ giúp: [Chỉ mục khắc phục sự cố](index.md#getting-help)