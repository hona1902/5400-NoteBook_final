# Tổng Quan Giao Diện - Tìm Đường Đi Của Bạn

Open Notebook sử dụng bố cục ba bảng điều khiển rõ ràng. Hướng dẫn này cho bạn thấy mọi thứ ở đâu.

---

## Bố Cục Chính

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Sổ tay  Tìm kiếm  Podcast  Mô hình  Cài đặt        │
├──────────────┬──────────────┬───────────────────────────────┤
│              │              │                               │
│  NGUỒN       │  GHI CHÚ     │           TRÒ CHUYỆN          │
│              │              │                               │
│  Tài liệu    │  Thông tin   │   Nói chuyện với AI về        │
│  PDF, URL    │  chi tiết    │   các nguồn của bạn           │
│  Video       │  tóm tắt     │                               │
│              │              │                               │
│  [+Thêm]     │  [+Viết]     │   [Nhập vào đây...]           │
│              │              │                               │
└──────────────┴──────────────┴───────────────────────────────┘
```

---

## Thanh Điều Hướng

Thanh điều hướng ở trên cùng đưa bạn đến các phần chính:

| Biểu tượng | Trang | Chức Năng |
|------|------|--------------|
| **Sổ tay (Notebooks)** | Không gian làm việc chính | Các dự án nghiên cứu của bạn |
| **Tìm kiếm (Search)** | Hỏi & Tìm kiếm | Truy vấn trên tất cả các sổ tay |
| **Podcast** | Tạo âm thanh | Quản lý hồ sơ podcast |
| **Mô hình (Models)** | Cấu hình AI | Thiết lập nhà cung cấp và mô hình |
| **Cài đặt (Settings)** | Tùy chọn | Cấu hình ứng dụng |

---

## Bảng Điều Khiển Bên Trái: Nguồn (Sources)

Tài liệu nghiên cứu của bạn ở đây.

### Những Gì Bạn Sẽ Thấy

```
┌─────────────────────────┐
│  Nguồn (5)              │
│  [+ Thêm Nguồn]         │
├─────────────────────────┤
│  ┌─────────────────┐    │
│  │ 📄 Paper.pdf    │    │
│  │ 🟢 Toàn Bộ NK   │    │
│  │ [⋮ Menu]        │    │
│  └─────────────────┘    │
│                         │
│  ┌─────────────────┐    │
│  │ 🔗 Article URL  │    │
│  │ 🟡 Chỉ Tóm Tắt  │    │
│  │ [⋮ Menu]        │    │
│  └─────────────────┘    │
└─────────────────────────┘
```

### Yếu Tố Thẻ Nguồn

- **Biểu tượng** - Loại tệp (PDF, URL, video, v.v.)
- **Tiêu đề** - Tên tài liệu
- **Chỉ báo Ngữ cảnh** - Những gì AI có thể xem (NK = Nội dung):
  - 🟢 Toàn Bộ Nội Dung
  - 🟡 Chỉ Tóm Tắt
  - ⛔ Không Nằm Trong Ngữ Cảnh
- **Menu (⋮)** - Chỉnh sửa, chuyển đổi, xóa

### Nút Thêm Nguồn

Nhấp để thêm:
- Tải tệp lên (PDF, DOCX, v.v.)
- URL Web
- Video YouTube
- Văn bản thuần túy

---

## Bảng Điều Khiển Ở Giữa: Ghi Chú (Notes)

Thông tin chi tiết và nội dung do AI tạo ra của bạn.

### Những Gì Bạn Sẽ Thấy

```
┌─────────────────────────┐
│  Ghi Chú (3)            │
│  [+ Viết Ghi Chú]       │
├─────────────────────────┤
│  ┌─────────────────┐    │
│  │ 📝 Phân tích    │    │
│  │ Ghi chú thủ công│    │
│  │ 3 Tháng 1, 2026 │    │
│  └─────────────────┘    │
│                         │
│  ┌─────────────────┐    │
│  │ 🤖 Tóm tắt      │    │
│  │ Từ chuyển đổi   │    │
│  │ 2 Tháng 1, 2026 │    │
│  └─────────────────┘    │
└─────────────────────────┘
```

### Yếu Tố Thẻ Ghi Chú

- **Biểu tượng** - Loại ghi chú (thủ công 📝 hoặc AI 🤖)
- **Tiêu đề** - Tên ghi chú
- **Nguồn gốc** - Cách nó được tạo ra
- **Ngày tháng** - Khi được tạo ra

### Nút Viết Ghi Chú

Nhấp để:
- Tạo ghi chú thủ công
- Thêm thông tin chi tiết của riêng bạn
- Hỗ trợ Markdown

---

## Bảng Điều Khiển Bên Phải: Trò Chuyện (Chat)

Không gian trò chuyện AI của bạn.

### Những Gì Bạn Sẽ Thấy

```
┌───────────────────────────────┐
│  Trò Chuyện                   │
│  Phiên: Thảo luận Nghiên cứu  │
│  [+ Phiên mới] [Phiên ▼]      │
├───────────────────────────────┤
│                               │
│  Bạn: Điểm chính               │
│       là gì?                  │
│                               │
│  AI: Dựa trên bài báo [1],    │
│      điểm chính là...         │
│      [Lưu làm Ghi chú]        │
│                               │
│  Bạn: Kể thêm cho tôi về      │
│       phương pháp luận.       │
│                               │
├───────────────────────────────┤
│  Ngữ cảnh: 3 nguồn (12K tok)  │
├───────────────────────────────┤
│  [Nhập tin nhắn...]      [↑]  │
└───────────────────────────────┘
```

### Yếu Tố Trò Chuyện

- **Bộ chọn phiên** - Chuyển đổi giữa các cuộc trò chuyện
- **Lịch sử tin nhắn** - Cuộc trò chuyện của bạn
- **Lưu làm Ghi chú** - Giữ lại các phản hồi tốt
- **Chỉ báo Ngữ cảnh** - Những gì AI có thể thấy
- **Trường nhập liệu** - Nhập câu hỏi của bạn

---

## Chỉ Báo Ngữ Cảnh

Chúng hiển thị những gì AI có thể truy cập:

### Bộ Đếm Token

```
Ngữ cảnh: 3 nguồn (12.450 tokens)
         ↑          ↑
         Các nguồn  Chỉ báo chi phí ước tính
         được bao gồm
```

### Chỉ Báo Trên Từng Nguồn

| Chỉ Báo | Ý Nghĩa | Quyền Truy Cập AI |
|-----------|---------|-----------|
| 🟢 Toàn Bộ Nội Dung | Toàn bộ văn bản | Mọi thứ |
| 🟡 Chỉ Tóm Tắt | AI tóm tắt | Chỉ các điểm chính |
| ⛔ Không Nằm Trong Ngữ Cảnh | Đã loại trừ | Không có gì |

Nhấp vào bất kỳ nguồn nào để thay đổi mức độ ngữ cảnh của nó.

---

## Tab Podcast

Bên trong sổ tay, chuyển sang Podcast:

```
┌───────────────────────────────┐
│  [Trò Chuyện] [Podcast]       │
├───────────────────────────────┤
│  Hồ Sơ Tập: [Chọn ▼]          │
│                               │
│  Người Nói:                   │
│  ├─ Host: Alex (OpenAI)       │
│  └─ Guest: Sam (Google)       │
│                               │
│  Bao Gồm:                     │
│  ☑ Paper.pdf                  │
│  ☑ Phân tích của tôi (nốt)    │
│  ☐ Bài báo nền                │
│                               │
│  [Tạo Podcast]                │
└───────────────────────────────┘
```

---

## Trang Cài Đặt (Settings)

Truy cập qua thanh điều hướng → Cài đặt:

### Các Phần Chính

| Phần | Gì Nó Kiểm Soát |
|---------|------------------|
| **Xử Lý (Processing)** | Các công cụ trích xuất tài liệu và URL |
| **Nhúng (Embedding)** | Cài đặt tự động nhúng |
| **Tệp (Files)** | Tự động xóa tải lên sau khi xử lý |
| **YouTube** | Ngôn ngữ phiên âm ưu tiên |

---

## Trang Mô Hình (Models)

Cấu hình các nhà cung cấp AI:

```
┌───────────────────────────────────────┐
│  Các Mô Hình                          │
├───────────────────────────────────────┤
│  Mô Hình Ngôn Ngữ                     │
│  ┌─────────────────────────────────┐  │
│  │ GPT-4o (OpenAI)         [Chỉnh] │  │
│  │ Claude Sonnet (Anthropic)       │  │
│  │ Llama 3.3 (Ollama)      [⭐]    │  │
│  └─────────────────────────────────┘  │
│  [+ Thêm Mô Hình]                     │
│                                       │
│  Mô Hình Nhúng (Embedding)            │
│  ┌─────────────────────────────────┐  │
│  │ text-embedding-3-small  [⭐]    │  │
│  └─────────────────────────────────┘  │
│                                       │
│  Chuyển Văn Bản Thành Giọng Nói       │
│  ┌─────────────────────────────────┐  │
│  │ OpenAI TTS             [⭐]     │  │
│  │ Google TTS                      │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

- **⭐** = Mô hình mặc định cho danh mục đó
- **[Chỉnh]** = Sửa đổi cấu hình
- **[+ Thêm]** = Thêm mô hình mới

---

## Trang Tìm Kiếm (Search)

Truy vấn trên tất cả các sổ tay:

```
┌───────────────────────────────────────┐
│  Tìm Kiếm                             │
├───────────────────────────────────────┤
│  [Bạn đang tìm gì?             ] [🔍] │
│                                       │
│  Loại TK: [Văn bản ▼] [Vector ▼]      │
│  Tìm trong:[Nguồn] [Ghi chú]          │
├───────────────────────────────────────┤
│  Kết quả (15)                         │
│                                       │
│  📄 Paper.pdf - Sổ tay: Nghiên cứu    │
│     "...mô hình transformer..."       │
│                                       │
│  📝 Phân tích - Sổ tay: Nghiên cứu    │
│     "...các phát hiện chính gồm..."   │
└───────────────────────────────────────┘
```

---

## Các Hành Động Chung

### Tạo Sổ Tay

```
Trang Sổ tay → [+ Sổ tay Mới] → Nhập tên → Tạo
```

### Thêm Một Nguồn

```
Bên trong sổ tay → [+ Thêm Nguồn] → Chọn loại → Tải lên/dán → Đợi xử lý
```

### Hỏi Một Câu Hỏi

```
Bên trong sổ tay → Bảng Trò Chuyện → Nhập câu hỏi → Enter → Đọc phản hồi
```

### Lưu Phản Hồi AI

```
Nhận được phản hồi tốt → Nhấp [Lưu làm Ghi chú] → Chỉnh sửa tiêu đề → Lưu
```

### Thay Đổi Mức Độ Ngữ Cảnh

```
Nhấp vào nguồn → Trình đơn thả xuống Ngữ cảnh → Chọn cấp độ → Các thay đổi áp dụng ngay lập tức
```

### Tạo Podcast

```
Tab Podcast → Chọn hồ sơ → Chọn các nguồn → [Tạo] → Đợi → Tải xuống
```

---

## Phím Tắt Bàn Phím

| Phím | Hành Động |
|-----|--------|
| `Enter` | Gửi tin nhắn trò chuyện |
| `Shift + Enter` | Dòng mới trong trò chuyện |
| `Escape` | Đóng hộp thoại |
| `Ctrl/Cmd + F` | Tìm kiếm trong trình duyệt |

---

## Chế Độ Xem Thiết Bị Di Động

Trên màn hình nhỏ hơn, bố cục ba bảng điều khiển xếp dọc:

```
┌─────────────────┐
│    NGUỒN        │
│    (chạm mở rộng)
├─────────────────┤
│    GHI CHÚ      │
│    (chạm mở rộng)
├─────────────────┤
│    TRÒ CHUYỆN   │
│    (luôn hiển thị)
└─────────────────┘
```

- Bảng điều khiển thu gọn để tiết kiệm không gian
- Chạm vào các tiêu đề để mở rộng/thu gọn
- Trò chuyện vẫn có thể truy cập được
- Đầy đủ chức năng được giữ nguyên

---

## Mẹo Để Điều Hướng Hiệu Quả

1. **Sử dụng bàn phím** - Enter gửi thông báo, Escape đóng hộp thoại
2. **Ngữ cảnh trước tiên** - Đặt ngữ cảnh nguồn trước khi trò chuyện
3. **Phiên** - Tạo phiên mới cho các chủ đề khác nhau
4. **Tìm kiếm toàn cầu** - Sử dụng trang Tìm kiếm để tìm trên tất cả các sổ tay
5. **Trang mô hình** - Đánh dấu trang các mô hình ưa thích của bạn

---

Bây giờ bạn đã biết mọi thứ ở đâu. Bắt đầu với [Thêm Các Nguồn](adding-sources.md) để bắt đầu nghiên cứu của bạn!
