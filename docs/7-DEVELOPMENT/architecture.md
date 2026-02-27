# Kiến trúc Notebook mở

## Tổng quan cấp cao

Open Notebook tuân theo kiến ​​trúc ba tầng với sự phân chia rõ ràng các mối quan tâm:



```
┌─────────────────────────────────────────────────────────┐
│  Your Browser                                           │
│  Access: http://your-server-ip:8502                     │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Port 8502   │  ← Next.js Frontend (what you see)
         │   Frontend    │    Also proxies API requests internally!
         └───────┬───────┘
                 │ proxies /api/* requests ↓
                 ▼
         ┌───────────────┐
         │   Port 5055   │  ← FastAPI Backend (handles requests)
         │     API       │
         └───────┬───────┘
                 │
                 ▼
         ┌───────────────┐
         │   SurrealDB   │  ← Database (internal, auto-configured)
         │   (Port 8000) │
         └───────────────┘
```



**Những điểm chính:**-**v1.1+**: Next.js tự động ủy quyền các yêu cầu `/api/*` tới phần phụ trợ, đơn giản hóa việc thiết lập proxy ngược
- Trình duyệt của bạn tải giao diện người dùng từ cổng 8502
- Frontend cần biết tìm API ở đâu - khi truy cập từ xa, hãy đặt: `API_URL=http://your-server-ip:5055`
- **Phía sau proxy ngược?** Bây giờ bạn chỉ cần proxy tới cổng 8502! Xem [Cấu hình proxy ngược](../5-CONFIGUration/reverse-proxy.md)

---

## Kiến trúc chi tiết

Open Notebook được xây dựng trên **kiến trúc ba tầng, không đồng bộ đầu tiên** được thiết kế cho khả năng mở rộng, tính mô-đun và tính linh hoạt AI của nhiều nhà cung cấp. Hệ thống phân tách mối quan tâm giữa các lớp giao diện người dùng, API và cơ sở dữ liệu, với LangGraph hỗ trợ quy trình làm việc thông minh và Esperanto cho phép tích hợp liền mạch với hơn 8 nhà cung cấp AI.

**Triết lý cốt lõi**:
- Ưu tiên quyền riêng tư: Người dùng kiểm soát dữ liệu của họ và lựa chọn nhà cung cấp AI
- Không đồng bộ/chờ đợi xuyên suốt: Hoạt động không chặn cho UX đáp ứng
- Thiết kế hướng tên miền: Sự tách biệt rõ ràng giữa các mô hình miền, kho lưu trữ và bộ điều phối
- Tính linh hoạt của nhiều nhà cung cấp: Hoán đổi nhà cung cấp AI mà không cần thay đổi mã ứng dụng
- Khả năng tự lưu trữ: Tất cả các thành phần có thể triển khai trong môi trường biệt lập

---

## Kiến trúc ba tầng

### Lớp 1: Giao diện người dùng (React/Next.js @ port 3000)

**Mục đích**: Giao diện người dùng tương tác, đáp ứng để quản lý nghiên cứu, ghi chú, trò chuyện và podcast.

**Ngăn xếp công nghệ**:
- **Khung**: Next.js 15 với React 19
- **Ngôn ngữ**: TypeScript với tính năng kiểm tra kiểu nghiêm ngặt
- **Quản lý trạng thái**: Zustand (cửa hàng nhẹ) + Truy vấn TanStack (trạng thái máy chủ)
- **Tạo kiểu**: Tailwind CSS + thư viện thành phần Shadcn/ui
- **Công cụ xây dựng**: Webpack (được đóng gói qua Next.js)

**Trách nhiệm chính**:
- Kết xuất sổ ghi chép, nguồn, ghi chú, phiên trò chuyện và podcast
- Xử lý các tương tác của người dùng (tạo, đọc, cập nhật, xóa thao tác)
- Quản lý trạng thái giao diện người dùng phức tạp (phương thức, tải tệp lên, tìm kiếm theo thời gian thực)
- Truyền phát phản hồi từ API (trò chuyện, tạo podcast)
- Hiển thị các phần nhúng, kết quả tìm kiếm vector và thông tin chi tiết

**Mẫu giao tiếp**:
- Tất cả dữ liệu được tìm nạp qua API REST (yêu cầu không đồng bộ tới cổng 5055)
- URL cơ sở được định cấu hình: `http://localhost:5055` (dev) hoặc dành riêng cho môi trường (prod)
- TanStack Query xử lý bộ nhớ đệm, tìm nạp lại và đồng bộ hóa dữ liệu
- Zustand lưu trữ trạng thái toàn cầu (người dùng, sổ ghi chép, bối cảnh đã chọn)
- CORS được bật ở phía API cho các yêu cầu có nguồn gốc chéo

**Kiến trúc thành phần**:
- `/src/app/`: Bộ định tuyến ứng dụng Next.js (trang, bố cục)
- `/src/comComponents/`: Các thành phần React có thể tái sử dụng (nút, biểu mẫu, thẻ)
- `/src/hooks/`: Móc tùy chỉnh (useNotebook, useChat, useSearch)
- `/src/lib/`: Hàm tiện ích, ứng dụng khách API, trình xác thực
- `/src/styles/`: CSS toàn cầu, cấu hình Tailwind

---

### Lớp 2: API (FastAPI @ port 5055)

**Mục đích**: Phần phụ trợ RESTful hiển thị các hoạt động trên sổ ghi chép, nguồn, ghi chú, phiên trò chuyện và mô hình AI.

**Ngăn xếp công nghệ**:
- **Khung**: FastAPI 0.104+ (khung web Python không đồng bộ)
- **Ngôn ngữ**: Python 3.11+
- **Xác thực**: Pydantic v2 (lược đồ yêu cầu/phản hồi)
- **Ghi nhật ký**: Loguru (ghi nhật ký JSON có cấu trúc)
- **Thử nghiệm**: Pytest (kiểm tra đơn vị và tích hợp)

**Ngành kiến ​​​​trúc**:

```
FastAPI App (main.py)
  ├── Routers (HTTP endpoints)
  │   ├── routers/notebooks.py (CRUD operations)
  │   ├── routers/sources.py (content ingestion, upload)
  │   ├── routers/notes.py (note management)
  │   ├── routers/chat.py (conversation sessions)
  │   ├── routers/search.py (full-text + vector search)
  │   ├── routers/transformations.py (custom transformations)
  │   ├── routers/models.py (AI model configuration)
  │   └── routers/*.py (11 additional routers)
  │
  ├── Services (business logic)
  │   ├── *_service.py (orchestration, graph invocation)
  │   ├── command_service.py (async job submission)
  │   └── middleware (auth, logging)
  │
  ├── Models (Pydantic schemas)
  │   └── models.py (validation, serialization)
  │
  └── Lifespan (startup/shutdown)
      └── AsyncMigrationManager (database schema migrations)
```



**Trách nhiệm chính**:
1. **Giao diện HTTP**: Chấp nhận yêu cầu REST, xác thực, trả về phản hồi JSON
2. **Logic nghiệp vụ**: Sắp xếp các mô hình miền, hoạt động kho lưu trữ và quy trình làm việc
3. **Hàng đợi công việc không đồng bộ**: Gửi các tác vụ chạy dài (tạo podcast, xử lý nguồn)
4. **Di chuyển cơ sở dữ liệu**: Chạy cập nhật lược đồ khi khởi động
5. **Xử lý lỗi**: Bắt ngoại lệ, trả về mã trạng thái HTTP thích hợp
6. **Ghi nhật ký**: Theo dõi các hoạt động để gỡ lỗi và giám sát

**Quy trình khởi động**:
1. Tải các biến môi trường `.env`
2. Khởi tạo ứng dụng FastAPI với phần mềm trung gian CORS + auth
3. Chạy AsyncMigrationManager (tạo/cập nhật lược đồ cơ sở dữ liệu)
4. Đăng ký tất cả các bộ định tuyến (hơn 20 điểm cuối)
5. Máy chủ sẵn sàng trên cổng 5055

**Chu kỳ phản hồi yêu cầu**:

```
HTTP Request → Router → Service → Domain/Repository → SurrealDB
                                       ↓
                                  LangGraph (optional)
                                       ↓
Response ← Pydantic serialization ← Service ← Result
```



---

### Lớp 3: Cơ sở dữ liệu (SurrealDB @ port 8000)

**Mục đích**: Cơ sở dữ liệu đồ thị có nhúng vectơ tích hợp, tìm kiếm ngữ nghĩa và quản lý mối quan hệ.

**Ngăn xếp công nghệ**:
- **Cơ sở dữ liệu**: SurrealDB (giao dịch đa mô hình, ACID)
- **Ngôn ngữ truy vấn**: SurrealQL (Cú pháp giống SQL với các phép toán biểu đồ)
- **Trình điều khiển Async**: Máy khách Async Rust dành cho Python
- **Di chuyển**: Các tệp `.surql` thủ công trong `/migrations/` (tự động chạy khi khởi động API)

**Bảng lõi**:

| Bảng | Mục đích | Các trường chính |
|-------|----------|----------|
| `sổ tay` | Container dự án nghiên cứu | id, tên, mô tả, lưu trữ, tạo, cập nhật |
| `nguồn` | Mục nội dung (PDF, URL, văn bản) | id, tiêu đề, full_text, chủ đề, nội dung, đã tạo, cập nhật |
| `source_embedding` | nhúng vector cho tìm kiếm ngữ nghĩa | id, nguồn, nhúng, chunk_text, chunk_index |
| `ghi chú` | Ghi chú nghiên cứu do người dùng tạo | id, tiêu đề, nội dung, note_type (human/ai), đã tạo, cập nhật |
| `phiên trò chuyện` | Phiên trò chuyện | id, notebook_id, tiêu đề, tin nhắn (JSON), đã tạo, cập nhật |
| `chuyển đổi` | Quy tắc chuyển đổi tùy chỉnh | id, tên, mô tả, lời nhắc, đã tạo, cập nhật |
| `nguồn_insight` | Đầu ra chuyển đổi | id, source_id, cái nhìn sâu sắc_type, nội dung, đã tạo, cập nhật |
| `tham khảo` | Mối quan hệ: nguồn → sổ ghi chép | ra (nguồn), vào (sổ tay) |
| `hiện vật` | Mối quan hệ: ghi chú → sổ tay | ra (ghi chú), vào (sổ tay) |

**Biểu đồ mối quan hệ**:

```
Notebook
  ↓ (referenced_by)
Source
  ├→ SourceEmbedding (1:many for chunked text)
  ├→ SourceInsight (1:many for transformation outputs)
  └→ Note (via artifact relationship)
    ├→ Embedding (semantic search)
    └→ Topics (tags)

ChatSession
  ├→ Notebook
  └→ Messages (stored as JSON array)
```



**Khả năng tìm kiếm vectơ**:
- Các phần nhúng được lưu trữ nguyên bản trong SurrealDB
- Tìm kiếm toàn văn trên `source.full_text` và `note.content`
- Tìm kiếm tương tự cosine trên các vectơ nhúng
- Tìm kiếm ngữ nghĩa tích hợp với điểm cuối tìm kiếm

**Quản lý kết nối**:
- Tổng hợp kết nối không đồng bộ (kích thước có thể định cấu hình)
- Hỗ trợ giao dịch cho các hoạt động đa bản ghi
- Tự động xác thực lược đồ thông qua di chuyển
- Bảo vệ thời gian chờ truy vấn (ngăn truy vấn vô hạn)

---

## Cơ sở lý luận về ngăn xếp công nghệ

### Tại sao phải dùng Python + FastAPI?

**Trăn**:
- Hệ sinh thái AI/ML phong phú (LangChain, LangGraph, Transformers, scikit-learn)
- Tạo mẫu và triển khai nhanh
- Hỗ trợ async mở rộng (asyncio, async/await)
- Gợi ý loại mạnh (Pydantic, mypy)

**FastAPI**:
- Framework hiện đại, không đồng bộ đầu tiên
- Tài liệu OpenAPI tự động (Giao diện người dùng Swagger @ /docs)
- Xác thực yêu cầu tích hợp (Pydantic)
- Hiệu suất tuyệt vời (đo điểm chuẩn gần tốc độ C/Rust)
- Dễ dàng chèn phần mềm trung gian/phụ thuộc

### Tại sao Next.js + React + TypeScript?

**Next.js**:
- Full-stack React framework với SSR/SSG
- Định tuyến dựa trên tệp (cấu trúc dự án trực quan)
- Các tuyến API tích hợp (đồng vị trí phụ trợ tùy chọn)
- Tối ưu hóa việc chia tách hình ảnh/mã
- Dễ dàng triển khai (Vercel, Docker, self-hosted)

**Phản ứng 19**:
- Giao diện người dùng dựa trên thành phần (có thể tái sử dụng, có thể kiểm tra)
- Công cụ và cộng đồng tuyệt vời
- Quản lý trạng thái phía khách hàng (Zustand)
- Đồng bộ trạng thái phía máy chủ (TanStack Query)

**TypeScript**:
- Kiểu an toàn bắt lỗi lúc biên dịch
- Tự động hoàn thiện và tái cấu trúc IDE tốt hơn
- Tài liệu qua các loại (mã tự ghi)
- Làm quen dễ dàng hơn với những người đóng góp mới

### Tại sao là SurrealDB?

**DB siêu thực**:
- Cơ sở dữ liệu đồ thị gốc (các mối quan hệ là hạng nhất)
- Tích hợp sẵn vectơ nhúng (không có DB vectơ riêng)
- Giao dịch ACID (tính nhất quán của dữ liệu)
- Đa mô hình (quan hệ + tài liệu + đồ thị)
- Tìm kiếm toàn văn + tìm kiếm ngữ nghĩa trong một truy vấn
- Tự lưu trữ (không giống như Pinecone/Weaviate được quản lý)
- SurrealQL linh hoạt (cú pháp giống SQL)

**Giải pháp thay thế được xem xét**: PostgreSQL + pgvector (các tiện ích mở rộng hoàn thiện hơn nhưng riêng biệt)

### Tại sao dùng Esperanto cho nhà cung cấp AI?

**Thư viện Esperanto**:
- Giao diện hợp nhất với hơn 8 nhà cung cấp LLM (OpenAI, Anthropic, Google, Groq, Ollama, Mistral, DeepSeek, xAI)
- Tích hợp nhiều nhà cung cấp (OpenAI, Google, Ollama, Mistral, Voyage)
- Tích hợp TTS/STT (OpenAI, Groq, ElevenLabs, Google)
- Lựa chọn nhà cung cấp thông minh (logic dự phòng, tối ưu hóa chi phí)
- Hỗ trợ ghi đè mô hình theo yêu cầu
- Hỗ trợ Ollama địa phương (tùy chọn hoàn toàn tự lưu trữ)

**Phương án thay thế được xem xét**: Sự trừu tượng hóa nhà cung cấp của LangChain (dài dòng hơn, kém linh hoạt hơn)

---

## Quy trình làm việc của LangGraph

LangGraph là một thư viện máy trạng thái điều phối các quy trình công việc AI gồm nhiều bước. Open Notebook sử dụng năm quy trình công việc cốt lõi:

### 1. **Quy trình xử lý nguồn** (`open_notebook/graphs/source.py`)

**Mục đích**: Nhập nội dung (PDF, URL, văn bản) và chuẩn bị cho tìm kiếm/thông tin chi tiết.

**Chảy**:

```
Input (file/URL/text)
  ↓
Extract Content (content-core library)
  ↓
Clean & tokenize text
  ↓
Generate Embeddings (Esperanto)
  ↓
Create SourceEmbedding records (chunked + indexed)
  ↓
Extract Topics (LLM summarization)
  ↓
Save to SurrealDB
  ↓
Output (Source record with embeddings)
```



**Quyết định của bang**:

```python
{
  "content_state": {"file_path" | "url" | "content": str},
  "source_id": str,
  "full_text": str,
  "embeddings": List[Dict],
  "topics": List[str],
  "notebook_ids": List[str],
}
```



**Được gọi bởi**: API nguồn (`POST /sources`)

---

### 2. **Quy trình trò chuyện** (`open_notebook/graphs/chat.py`)

**Mục đích**: Thực hiện các cuộc trò chuyện nhiều lượt bằng mô hình AI, tham chiếu ngữ cảnh của sổ ghi chép.

**Chảy**:

```
User Message
  ↓
Build Context (selected sources/notes)
  ↓
Add Message to Session
  ↓
Create Chat Prompt (system + history + context)
  ↓
Call LLM (via Esperanto)
  ↓
Stream Response
  ↓
Save AI Message to ChatSession
  ↓
Output (complete message)
```



**Quyết định của bang**:

```python
{
  "session_id": str,
  "messages": List[BaseMessage],
  "context": Dict[str, Any],  # sources, notes, snippets
  "response": str,
  "model_override": Optional[str],
}
```



**Các tính năng chính**:
- Lịch sử tin nhắn vẫn tồn tại trong SurrealDB (điểm kiểm tra SqliteSaver)
- Xây dựng bối cảnh thông qua tiện ích `build_context_for_chat()`
- Đếm mã thông báo để tránh tràn
- Hỗ trợ ghi đè mô hình trên mỗi tin nhắn

**Được gọi bởi**: API trò chuyện (`POST /chat/execute`)

---

### 3. **Hỏi quy trình công việc** (`open_notebook/graphs/ask.py`)

**Mục đích**: Trả lời câu hỏi của người dùng bằng cách tìm kiếm nguồn và tổng hợp câu trả lời.

**Chảy**:

```
User Question
  ↓
Plan Search Strategy (LLM generates searches)
  ↓
Execute Searches (vector + text search)
  ↓
Score & Rank Results
  ↓
Provide Answers (LLM synthesizes from results)
  ↓
Stream Responses
  ↓
Output (final answer)
```



**Quyết định của bang**:

```python
{
  "question": str,
  "strategy": SearchStrategy,
  "answers": List[str],
  "final_answer": str,
  "sources_used": List[Source],
}
```



**Truyền phát**: Sử dụng `astream()` để phát ra các bản cập nhật trong thời gian thực (chiến lược → câu trả lời → câu trả lời cuối cùng)

**Được gọi bởi**: API tìm kiếm (`POST /ask` với tính năng phát trực tuyến)

---

### 4. **Quy trình chuyển đổi** (`open_notebook/graphs/transformation.py`)

**Mục đích**: Áp dụng các phép biến đổi tùy chỉnh cho các nguồn (trích xuất tóm tắt, điểm chính, v.v.).

**Chảy**:

```
Source + Transformation Rule
  ↓
Generate Prompt (Jinja2 template)
  ↓
Call LLM
  ↓
Parse Output
  ↓
Create SourceInsight record
  ↓
Output (insight with type + content)
```



**Ví dụ về chuyển đổi**:
- Tóm tắt (tổng quan 5 câu)
- Những điểm chính (danh sách có dấu đầu dòng)
- Trích dẫn (đoạn trích đáng chú ý)
- Hỏi đáp (tạo câu hỏi và câu trả lời)

**Được gọi bởi**: API nguồn (`POST /sources/{id}/insights`)

---

### 5. **Quy trình làm việc nhanh chóng** (`open_notebook/graphs/prompt.py`)

**Mục đích**: Thực thi tác vụ LLM chung (ví dụ: tự động tạo tiêu đề ghi chú, phân tích nội dung).

**Chảy**:

```
Input Text + Prompt
  ↓
Call LLM (simple request-response)
  ↓
Output (completion)
```



**Được sử dụng cho**: Tạo tiêu đề ghi chú, phân tích nội dung, v.v.

---

## Mẫu tích hợp nhà cung cấp AI

### ModelManager: Nhà máy tập trung

Nằm trong `open_notebook/ai/models.py`, ModelManager xử lý:

1. **Phát hiện nhà cung cấp**: Kiểm tra các biến môi trường để tìm nhà cung cấp có sẵn
2. **Lựa chọn mô hình**: Chọn mô hình tốt nhất dựa trên quy mô và nhiệm vụ ngữ cảnh
3. **Logic dự phòng**: Nếu nhà cung cấp chính không có sẵn, hãy thử sao lưu
4. **Tối ưu hóa chi phí**: Ưu tiên các mẫu rẻ hơn cho các nhiệm vụ đơn giản
5. **Tính toán mã thông báo**: Ước tính chi phí trước cuộc gọi LLM

**Cách sử dụng**:

```python
from open_notebook.ai.provision import provision_langchain_model

# Get best LLM for context size
model = await provision_langchain_model(
    task="chat",  # or "search", "extraction"
    model_override="anthropic/claude-opus-4",  # optional
    context_size=8000,  # estimated tokens
)

# Invoke model
response = await model.ainvoke({"input": prompt})
```



### Hỗ trợ nhiều nhà cung cấp

**Nhà cung cấp LLM**:
- OpenAI (gpt-4, gpt-4-turbo, gpt-3.5-turbo)
- Nhân loại (claude-opus, claude-sonnet, claude-haiku)
- Google (gemini-pro, gemini-1.5)
- Groq (hỗn hợp, llama-2)
- Ollama (người mẫu địa phương)
- Mistral (mistral-lớn, mistral-trung bình)
- DeepSeek (trò chuyện deepseek)
- xAI (ngớ ngẩn)

**Nhà cung cấp nhúng**:
- OpenAI (văn bản-nhúng-3-lớn, văn bản-nhúng-3-nhỏ)
- Google (nhúng-001)
- Ollama (nhúng cục bộ)
- Mistral (nhúng mistral)
- Hành trình (voyage-large-2)

**Nhà cung cấp TTS**:
- OpenAI (tts-1, tts-1-hd)
- Groq (không có TTS, dự phòng cho OpenAI)
- ElevenLabs (giọng nói đa ngôn ngữ)
- Google TTS (chuyển văn bản thành giọng nói)

### Ghi đè theo yêu cầu

Mọi lệnh gọi LangGraph đều chấp nhận tham số `config` để ghi đè các mô hình:



```python
result = await graph.ainvoke(
    input={...},
    config={
        "configurable": {
            "model_override": "anthropic/claude-opus-4"  # Use Claude instead
        }
    }
)
```



---

## Mẫu thiết kế

### 1. **Thiết kế hướng tên miền (DDD)**

**Đối tượng miền** (`open_notebook/domain/`):
- `Notebook`: Vùng chứa nghiên cứu với các mối quan hệ với nguồn/ghi chú
- `Source`: Mục nội dung (PDF, URL, văn bản) có phần nhúng
- `Note`: Ghi chú nghiên cứu do người dùng tạo hoặc do AI tạo
- `ChatSession`: Lịch sử hội thoại trên sổ ghi chép
- `Transformation`: Quy tắc tùy chỉnh để trích xuất thông tin chi tiết

**Mẫu kho lưu trữ**:
- Lớp truy cập cơ sở dữ liệu (`open_notebook/database/repository.py`)
- `repo_query()`: Thực thi các truy vấn SurrealQL
- `repo_create()`: Chèn bản ghi
- `repo_upsert()`: Hợp nhất các bản ghi
- `repo_delete()`: Xóa bản ghi

**Phương thức thực thể**:

```python
# Domain methods (business logic)
notebook = await Notebook.get(id)
await notebook.save()
notes = await notebook.get_notes()
sources = await notebook.get_sources()
```



### 2. **Kiến trúc không đồng bộ đầu tiên**

**Tất cả I/O đều không đồng bộ**:
- Truy vấn cơ sở dữ liệu: `await repo_query(...)`
- Lệnh gọi LLM: `await model.ainvoke(...)`
- Tệp I/O: `await upload_file.read()`
- Lệnh gọi đồ thị: `await graph.ainvoke(...)`

**Lợi ích**:
- Xử lý yêu cầu không chặn (FastAPI phục vụ nhiều yêu cầu đồng thời)
- Sử dụng tài nguyên tốt hơn (chờ I/O không chặn CPU)
- Phù hợp tự nhiên với cú pháp async/await của Python

**Ví dụ**:

```python
@router.post("/sources")
async def create_source(source_data: SourceCreate):
    # All operations are non-blocking
    source = Source(title=source_data.title)
    await source.save()  # async database operation
    await graph.ainvoke({...})  # async LangGraph invocation
    return SourceResponse(...)
```



### 3. **Mẫu dịch vụ**

Các dịch vụ sắp xếp các đối tượng miền, kho lưu trữ và quy trình làm việc:



```python
# api/notebook_service.py
class NotebookService:
    async def get_notebook_with_stats(notebook_id: str):
        notebook = await Notebook.get(notebook_id)
        sources = await notebook.get_sources()
        notes = await notebook.get_notes()
        return {
            "notebook": notebook,
            "source_count": len(sources),
            "note_count": len(notes),
        }
```



**Trách nhiệm**:
- Xác thực đầu vào (Pydantic)
- Điều phối hoạt động cơ sở dữ liệu
- Gọi quy trình công việc (đồ thị LangGraph)
- Xử lý lỗi và trả lại mã trạng thái phù hợp
- Hoạt động ghi nhật ký

### 4. **Mẫu phát trực tuyến**

Đối với các hoạt động kéo dài (yêu cầu quy trình làm việc, tạo podcast), truyền phát kết quả dưới dạng Sự kiện do máy chủ gửi:



```python
@router.post("/ask", response_class=StreamingResponse)
async def ask(request: AskRequest):
    async def stream_response():
        async for chunk in ask_graph.astream(input={...}):
            yield f"data: {json.dumps(chunk)}\n\n"
    return StreamingResponse(stream_response(), media_type="text/event-stream")
```



### 5. **Mẫu hàng đợi công việc**

Đối với các tác vụ nền không đồng bộ (xử lý nguồn), hãy sử dụng hàng đợi công việc Lệnh siêu thực:



```python
# Submit job
command_id = await CommandService.submit_command_job(
    app="open_notebook",
    command="process_source",
    input={...}
)

# Poll status
status = await source.get_status()
```



---

## Mẫu giao tiếp dịch vụ

### Giao diện người dùng → API

1. **Yêu cầu REST** (HTTP GET/POST/PUT/DELETE)
2. **Nội dung yêu cầu/phản hồi JSON**3.**Mã trạng thái HTTP tiêu chuẩn** (200, 400, 404, 500)
4. **Truyền phát tùy chọn** (Sự kiện do máy chủ gửi cho các hoạt động dài)

**Ví dụ**:

```typescript
// Frontend
const response = await fetch("http://localhost:5055/sources", {
  method: "POST",
  body: formData,  // multipart/form-data for file upload
});
const source = await response.json();
```



### API → SurrealDB

1. **Truy vấn SurrealQL** (tương tự SQL)
2. **Trình điều khiển không đồng bộ** với tính năng tổng hợp kết nối
3. **ID bản ghi an toàn loại** (cú pháp record_id)
4. **Hỗ trợ giao dịch** cho các thao tác nhiều bước

**Ví dụ**:

```python
# API
result = await repo_query(
    "SELECT * FROM source WHERE notebook = $notebook_id",
    {"notebook_id": ensure_record_id(notebook_id)}
)
```



### API → Nhà cung cấp AI (thông qua Esperanto)

1. **Giao diện hợp nhất Esperanto**2.**Ghi đè nhà cung cấp theo yêu cầu**3.**Tự động dự phòng khi thất bại**4.**Đếm token và ước tính chi phí**

**Ví dụ**:

```python
# API
model = await provision_langchain_model(task="chat")
response = await model.ainvoke({"input": prompt})
```



### API → Hàng đợi công việc (Lệnh siêu thực)

1. **Gửi công việc không đồng bộ**2.**Mô hình bắn và quên**3.**Kiểm tra trạng thái thông qua điểm cuối `/commands/{id}`**4.**Gọi lại hoàn thành công việc (tùy chọn)**

**Ví dụ**:

```python
# Submit async source processing
command_id = await CommandService.submit_command_job(...)

# Client polls status
response = await fetch(f"http://localhost:5055/commands/{command_id}")
status = await response.json()  # returns { status: "running|queued|completed|failed" }
```



---

## Tổng quan về lược đồ cơ sở dữ liệu

### Cấu trúc lược đồ cốt lõi

**Bàn** (20+):
- Sổ ghi chép (có tính năng xóa mềm thông qua cờ `lưu trữ`)
- Nguồn (nội dung + siêu dữ liệu)
- SourceEmbeddings (khối vector)
- Ghi chú (do người dùng tạo + do AI tạo)
- ChatSessions (lịch sử hội thoại)
- Chuyển đổi (quy tắc tùy chỉnh)
- SourceInsights (đầu ra chuyển đổi)
- Mối quan hệ (sổ tay→nguồn, sổ tay→ghi chú)

**Di chuyển**:
- Tự động khởi động API
- Nằm trong thư mục `/migrations/`
- Đánh số tuần tự (001_*.surql, 002_*.surql, v.v.)
- Được theo dõi trong bảng `_sbl_migrations`
- Rollback qua file `_down.surql` (thủ công)

### Mô hình mối quan hệ

**Mối quan hệ đồ thị**:

```
Notebook
  ← reference ← Source (many:many)
  ← artifact ← Note (many:many)

Source
  → source_embedding (one:many)
  → source_insight (one:many)
  → embedding (via source_embedding)

ChatSession
  → messages (JSON array in database)
  → notebook_id (reference to Notebook)

Transformation
  → source_insight (one:many)
```



**Ví dụ về truy vấn** (lấy tất cả các nguồn vào sổ ghi chép có số lượng):

```sql
SELECT id, title,
  count(<-reference.in) as note_count,
  count(<-embedding.in) as embedded_chunks
FROM source
WHERE notebook = $notebook_id
ORDER BY updated DESC
```



---

## Các quyết định kiến ​​trúc quan trọng

### 1. **Không đồng bộ xuyên suốt**

Tất cả các hoạt động I/O đều không bị chặn để tối đa hóa khả năng xử lý đồng thời và khả năng phản hồi.

**Đánh đổi**: Mã phức tạp hơn một chút (cú pháp không đồng bộ/đang chờ) so với thông lượng cao.

### 2. **Đa nhà cung cấp từ Ngày 1**

Hỗ trợ tích hợp cho hơn 8 nhà cung cấp AI ngăn chặn việc khóa nhà cung cấp.

**Đánh đổi**: Đã tăng thêm độ phức tạp trong ModelManager so với tính linh hoạt và tối ưu hóa chi phí.

### 3. **Quy trình làm việc dựa trên đồ thị**

Máy trạng thái LangGraph dành cho các hoạt động nhiều bước phức tạp (hỏi, trò chuyện, chuyển đổi).

**Đánh đổi**: Đường cong học tập dốc hơn so với quy trình làm việc có thể duy trì, có thể sửa lỗi.

### 4. **Cơ sở dữ liệu tự lưu trữ**

SurrealDB để tìm kiếm đồ thị + vectơ trong một hệ thống (không phụ thuộc bên ngoài).

**Đánh đổi**: Trách nhiệm vận hành so với kiến ​​trúc đơn giản hóa và tiết kiệm chi phí.

### 5. **Hàng đợi công việc cho các tác vụ dài hạn**

Gửi công việc không đồng bộ (xử lý nguồn, tạo podcast) ngăn chặn thời gian chờ yêu cầu.

**Đánh đổi**: Tính nhất quán cuối cùng so với trải nghiệm người dùng đáp ứng.

---

## Những điều kỳ lạ và vấn đề quan trọng

### Khởi động API

- **Di chuyển chạy tự động** mỗi lần khởi động; kiểm tra nhật ký để tìm lỗi
- **SurrealDB phải đang chạy** trước khi khởi động API (kiểm tra kết nối trong vòng đời)
- **Phần mềm trung gian xác thực là cơ bản** (chỉ có mật khẩu); nâng cấp lên OAuth/JWT để sản xuất

### Thao tác với cơ sở dữ liệu

- **ID bản ghi sử dụng cú pháp SurrealDB** (định dạng bảng:id, ví dụ: "notebook:abc123")
- Trình trợ giúp **ensure_record_id()** ngăn chặn các ID không đúng định dạng
- **Xóa mềm** qua trường `archived` (dữ liệu không bị xóa, chỉ được đánh dấu là không hoạt động)
- **Dấu thời gian ở định dạng ISO 8601** (các trường đã tạo, cập nhật)

### Quy trình làm việc của LangGraph

- **Tính bền vững của trạng thái** thông qua SqliteSaver trong `/data/sqlite-db/`
- **Không có thời gian chờ tích hợp**; quy trình làm việc dài có thể chặn yêu cầu (sử dụng phát trực tuyến cho UX)
- **Dự phòng mô hình** tự động nếu nhà cung cấp chính không có sẵn
- **ID điểm kiểm tra** phải là duy nhất cho mỗi phiên (tránh xung đột)

### Tích hợp nhà cung cấp AI

- **Thư viện Esperanto** xử lý tất cả API của nhà cung cấp (không có lệnh gọi API trực tiếp)
- **Ghi đè theo yêu cầu** qua RunnableConfig (tạm thời, không liên tục)
- **Ước tính chi phí** thông qua việc đếm mã thông báo (không chính xác 100%, sử dụng để được hướng dẫn)
- **Logic dự phòng** thử các mô hình rẻ hơn nếu lỗi chính

### Tải lên tệp

- **Được lưu trữ trong thư mục `/data/uploads/`** (không phải cơ sở dữ liệu)
- **Tạo tên tệp duy nhất** ngăn chặn việc ghi đè (hậu tố bộ đếm)
- **Thư viện lõi nội dung** trích xuất văn bản từ hơn 50 loại tệp
- **Các tệp lớn** có thể chặn API trong thời gian ngắn (trích xuất nội dung đồng bộ hóa)

---

## Cân nhắc về hiệu suất

### Chiến lược tối ưu hóa

1. **Kết nối tổng hợp**: Trình điều khiển không đồng bộ SurrealDB với kích thước nhóm có thể định cấu hình
2. **Bộ nhớ đệm truy vấn**: Truy vấn TanStack trên giao diện người dùng (bộ nhớ đệm phía máy khách)
3. **Tái sử dụng nhúng**: Tìm kiếm vectơ sử dụng các phần nhúng được tính toán trước
4. **Chunking**: Các nguồn được chia thành nhiều phần để có mức độ liên quan tìm kiếm tốt hơn
5. **Hoạt động không đồng bộ**: I/O không chặn để có tính đồng thời cao
6. **Lazy Loading**: Giao diện người dùng chỉ yêu cầu dữ liệu cần thiết (phân trang)

### Điểm nghẽn

1. **Cuộc gọi LLM**: Độ trễ tùy thuộc vào nhà cung cấp (thường là 1-30 giây)
2. **Thế hệ nhúng**: Thời gian tỷ lệ thuận với kích thước nội dung và nhà cung cấp
3. **Tìm kiếm vectơ**: Tính toán độ tương tự trên tất cả các phần nhúng
4. **Trích xuất nội dung**: Thao tác đồng bộ trong xử lý nguồn

### Giám sát

- **Nhật ký API**: Kiểm tra đầu ra loguru để tìm lỗi và hoạt động chậm
- **Truy vấn cơ sở dữ liệu**: Số liệu SurrealDB có sẵn thông qua giao diện người dùng quản trị viên
- **Mức sử dụng Token**: Ước tính thông qua tiện ích `estimate_tokens()`
- **Trạng thái công việc**: Thăm dò `/commands/{id}` để biết các hoạt động không đồng bộ

---

## Điểm mở rộng

### Thêm quy trình làm việc mới

1. Tạo `open_notebook/graphs/workflow_name.py`
2. Xác định các hàm StateDict và nút
3. Xây dựng biểu đồ với `.add_node()` / `.add_edge()`
4. Tạo dịch vụ trong `api/workflow_service.py`
5. Đăng ký bộ định tuyến trong `api/main.py`
6. Thêm bài kiểm tra vào `tests/test_workflow.py`

### Thêm mô hình dữ liệu mới

1. Tạo mô hình trong `open_notebook/domain/model_name.py`
2. Kế thừa từ BaseModel (đối tượng miền)
3. Triển khai các phương thức `save()`, `get()`, `delete()` (CRUD)
4. Thêm chức năng kho lưu trữ nếu cần các truy vấn phức tạp
5. Tạo di chuyển cơ sở dữ liệu trong `migrations/`
6. Thêm các tuyến và mô hình API trong `api/`

### Thêm nhà cung cấp AI mới

1. Định cấu hình Esperanto cho nhà cung cấp mới (xem .env.example)
2. ModelManager tự động phát hiện thông qua các biến môi trường
3. Ghi đè qua cấu hình theo yêu cầu (không cần thay đổi mã)
4. Kiểm tra logic dự phòng nếu nhà cung cấp không có sẵn

---

## Cân nhắc triển khai

### Phát triển

- Tất cả các dịch vụ trên localhost (3000, 5055, 8000)
- Tự động tải lại khi thay đổi tệp (Next.js, FastAPI)
- Di chuyển cơ sở dữ liệu tải lại nóng
- Mở tài liệu API tại http://localhost:5055/docs

### Sản xuất

- **Giao diện người dùng**: Triển khai lên Vercel, Netlify hoặc Docker
- **API**: Vùng chứa Docker (xem Dockerfile)
- **Cơ sở dữ liệu**: Vùng chứa SurrealDB hoặc dịch vụ được quản lý
- **Môi trường**: Bảo mật tệp .env bằng khóa API
- **SSL/TLS**: Proxy ngược (Nginx, CloudFlare)
- **Giới hạn tỷ lệ**: Thêm ở lớp proxy
- **Auth**: Thay thế PassAuthMiddleware bằng OAuth/JWT
- **Giám sát**: Tổng hợp nhật ký (CloudWatch, DataDog, v.v.)

---

## Bản tóm tắt

Kiến trúc của Open Notebook cung cấp nền tảng vững chắc cho nghiên cứu dựa trên AI, tập trung vào quyền riêng tư. Việc tách biệt các mối quan tâm (giao diện người dùng/API/cơ sở dữ liệu), thiết kế ưu tiên không đồng bộ và tính linh hoạt của nhiều nhà cung cấp cho phép phát triển nhanh chóng và triển khai dễ dàng. Quy trình làm việc của LangGraph sắp xếp các nhiệm vụ AI phức tạp, trong khi Esperanto tóm tắt thông tin chi tiết về nhà cung cấp. Kết quả là một hệ thống có thể mở rộng và bảo trì được, giúp người dùng kiểm soát dữ liệu và lựa chọn nhà cung cấp AI của họ.