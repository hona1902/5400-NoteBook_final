# Chat vs. Hỏi vs. Biến Đổi - Công Cụ Nào Cho Việc Nào?

Open Notebook cung cấp nhiều cách làm việc với nghiên cứu. Hiểu khi nào dùng mỗi cách là chìa khóa để sử dụng hiệu quả.

---

## Ba Chế Độ Tương Tác

### 1. CHAT - Khám Phá Hội Thoại Với Ngữ Cảnh Thủ Công

**Là gì:** Hội thoại với AI về các nguồn đã chọn.

**Luồng:**
```
1. Bạn chọn nguồn nào bao gồm ("trong ngữ cảnh")
2. Bạn đặt câu hỏi
3. AI trả lời CHỈ dùng những nguồn đó
4. Bạn đặt câu hỏi tiếp (ngữ cảnh giữ nguyên)
5. Bạn thay đổi nguồn hoặc mức ngữ cảnh, rồi tiếp tục
```

**Quản lý ngữ cảnh:** Bạn chọn rõ ràng nguồn nào AI thấy.

**Hội thoại:** Nhiều câu hỏi với lịch sử chia sẻ.

**Ví dụ:**
```
Bạn: [Chọn nguồn: "bai1.pdf", "ghi_chu_nghien_cuu.txt"]
     [Đặt ngữ cảnh: Nội dung đầy đủ cho bài1, Tóm tắt cho ghi chú]

Bạn: "Luận điểm chính trong các nguồn này là gì?"
AI:  "Bài 1 lập luận X [trích dẫn]. Ghi chú nhấn mạnh Y [trích dẫn]."

Bạn: "Chúng khác nhau thế nào?"
AI:  "Bài 1 tập trung vào X [trích dẫn], trong khi ghi chú nhấn mạnh Y..."

Bạn: [Bây giờ chọn nguồn khác]

Bạn: "So sánh với quan điểm khác này"
AI:  "Nguồn mới này có cách tiếp cận khác..."
```

**Phù hợp nhất cho:**
- Khám phá chủ đề tập trung với nguồn cụ thể
- Đối thoại (nhiều câu hỏi qua lại)
- Khi bạn biết nguồn nào quan trọng
- Khi bạn muốn kiểm soát chặt gì đến AI

---

### 2. HỎI - Tìm Kiếm Toàn Diện Tự Động

**Là gì:** Đặt một câu hỏi phức tạp, hệ thống tự tìm nội dung liên quan.

**Luồng:**
```
1. Bạn đặt câu hỏi toàn diện
2. Hệ thống phân tích câu hỏi
3. Hệ thống tự tìm kiếm trong nguồn
4. Hệ thống lấy đoạn liên quan
5. Hệ thống tổng hợp câu trả lời từ tất cả kết quả
6. Bạn nhận một câu trả lời chi tiết (không hội thoại)
```

**Quản lý ngữ cảnh:** Tự động. Hệ thống xác định gì liên quan.

**Không hội thoại:** Một câu hỏi → một câu trả lời. Không tiếp tục.

**Ví dụ:**
```
Bạn: "Các bài báo so sánh phương pháp alignment thế nào?
      Mỗi bài khuyến nghị gì?"

Hệ thống:
  - Chia câu hỏi thành chiến lược tìm kiếm
  - Tìm tất cả nguồn về phương pháp alignment
  - Tìm tất cả nguồn về khuyến nghị
  - Lấy top 10 đoạn liên quan
  - Tổng hợp: "Bài A khuyến nghị X [trích dẫn].
               Bài B khuyến nghị Y [trích dẫn].
               Chúng khác nhau ở Z."

Bạn: [Nhận lại một câu trả lời toàn diện]
     [Nếu muốn tiếp tục, dùng Chat thay thế]
```

**Phù hợp nhất cho:**
- Câu hỏi toàn diện, một lần
- So sánh nhiều nguồn cùng lúc
- Khi bạn muốn hệ thống quyết định gì liên quan
- Câu hỏi phức tạp cần nhiều góc tìm kiếm
- Khi không cần hội thoại qua lại

---

### 3. BIẾN ĐỔI - Xử Lý Dựa Trên Mẫu

**Là gì:** Áp dụng mẫu tái sử dụng cho nguồn và nhận đầu ra có cấu trúc.

**Luồng:**
```
1. Bạn định nghĩa biến đổi (hoặc chọn preset)
   "Trích xuất: luận điểm chính, phương pháp, hạn chế"

2. Bạn áp dụng cho MỘT nguồn mỗi lần
   (Có thể lặp lại cho nguồn khác)

3. Cho mỗi nguồn:
   - Nội dung nguồn + prompt biến đổi → AI
   - Kết quả lưu thành ghi chú mới

4. Bạn nhận lại
   - Đầu ra có cấu trúc (luận điểm, phương pháp, hạn chế)
   - Lưu thành ghi chú trong notebook
```

**Quản lý ngữ cảnh:** Xử lý một nguồn mỗi lần.

**Tái sử dụng:** Áp dụng cùng mẫu cho nguồn khác (từng cái một).

**Lưu ý**: Hiện xử lý một nguồn mỗi lần. Xử lý hàng loạt (nhiều nguồn cùng lúc) dự kiến trong phiên bản tương lai.

**Ví dụ:**
```
Bạn: Định nghĩa biến đổi
     "Cho mỗi bài báo học thuật, trích xuất:
      - Câu hỏi nghiên cứu chính
      - Phương pháp sử dụng
      - Phát hiện chính
      - Hạn chế và khoảng trống
      - Nghiên cứu tiếp theo khuyến nghị"

Bạn: Áp dụng cho bài 1

Hệ thống:
  - Chạy biến đổi trên bài 1
  - Kết quả lưu thành ghi chú mới

Bạn: Áp dụng cùng biến đổi cho bài 2, 3, v.v.

Sau 10 bài:
  - Bạn có 10 ghi chú có cấu trúc với định dạng nhất quán
  - Hoàn hảo để viết tổng quan tài liệu hoặc so sánh
```

**Phù hợp nhất cho:**
- Trích xuất cùng thông tin từ mỗi nguồn (chạy lặp lại)
- Tạo tóm tắt có cấu trúc với định dạng nhất quán
- Xây dựng cơ sở tri thức phân loại
- Khi muốn mẫu tái sử dụng áp dụng cho mỗi nguồn

---

## Cây Quyết Định: Dùng Công Cụ Nào?

```
Bạn đang cố làm gì?

│
├─→ "Tôi muốn hội thoại về chủ đề này"
│   └─→ Hội thoại khám phá hay cố định?
│       ├─→ Khám phá (sẽ hỏi tiếp)
│       │   └─→ DÙNG: CHAT
│       │
│       └─→ Cố định (Một câu hỏi → xong)
│           └─→ Xem câu hỏi tiếp
│
├─→ "Tôi cần so sánh nguồn hoặc câu trả lời toàn diện"
│   └─→ DÙNG: HỎI
│
├─→ "Tôi muốn trích xuất cùng thông tin từ mỗi nguồn"
│   └─→ DÙNG: BIẾN ĐỔI (áp dụng cho mỗi nguồn)
│
└─→ "Tôi chỉ muốn đọc và tìm kiếm"
    └─→ DÙNG: Tìm kiếm (văn bản hoặc vector)
        HOẶC đọc ghi chú
```

---

## So Sánh Song Song

| Khía cạnh | CHAT | HỎI | BIẾN ĐỔI |
|-----------|------|------|-----------|
| **Dùng cho gì?** | Khám phá hội thoại | Hỏi đáp toàn diện | Trích xuất dựa trên mẫu |
| **Số câu hỏi** | Nhiều (hội thoại) | Một | Một mẫu mỗi nguồn |
| **Kiểm soát ngữ cảnh** | Thủ công (bạn chọn) | Tự động (hệ thống tìm) | Một nguồn mỗi lần |
| **Hội thoại?** | Có (tiếp tục được) | Không (chỉ một câu) | Không (hoạt động đơn) |
| **Đầu ra** | Hội thoại tự nhiên | Câu trả lời tự nhiên | Ghi chú có cấu trúc |
| **Thời gian** | Nhanh (qua lại) | Lâu hơn (toàn diện) | Mỗi nguồn |
| **Tốt nhất khi** | Khám phá & không chắc | Cần bức tranh đầy đủ | Muốn định dạng nhất quán |
| **Tốc độ mô hình** | Bất kỳ | Nhanh ưu tiên | Bất kỳ |

---

## Ví Dụ Quy Trình

### Ví dụ 1: Nghiên Cứu Học Thuật

```
Mục tiêu: Viết tổng quan tài liệu từ 15 bài báo

Bước 1: BIẾN ĐỔI
  - Định nghĩa: "Trích xuất tóm tắt, phương pháp, phát hiện, liên quan"
  - Áp dụng cho bài 1 → nhận ghi chú có cấu trúc
  - Áp dụng cho bài 2 → nhận ghi chú có cấu trúc
  - ... lặp lại cho tất cả 15 bài
  - Kết quả: 15 ghi chú cấu trúc với định dạng nhất quán

Bước 2: Đọc ghi chú
  - Giờ bạn có tóm tắt nhất quán

Bước 3: CHAT hoặc HỎI
  - Chat: "Giúp tôi tổ chức theo chủ đề"
  - Hỏi: "Phương pháp chung trên các bài là gì?"

Bước 4: Viết tổng quan
  - Dùng biến đổi làm nền tảng
  - Dùng thông tin chat/hỏi cho cấu trúc
```

### Ví dụ 2: Nghiên Cứu Sản Phẩm

```
Mục tiêu: Hiểu phản hồi khách hàng từ phỏng vấn

Bước 1: Thêm nguồn (bản ghi phỏng vấn)

Bước 2: HỎI
  - "Top 10 điểm đau được đề cập là gì?"
  - Nhận câu trả lời toàn diện với trích dẫn

Bước 3: CHAT
  - "Giúp tôi nhóm theo mức độ nghiêm trọng?"
  - Tiếp tục hội thoại để ưu tiên

Bước 4: BIẾN ĐỔI (tùy chọn)
  - Định nghĩa: "Trích xuất: điểm đau, tần suất, ai đề cập"
  - Áp dụng cho mỗi phỏng vấn (từng cái)
  - Nhận dữ liệu cấu trúc để phân tích
```

### Ví dụ 3: Phân Tích Chính Sách

```
Mục tiêu: So sánh tài liệu chính sách

Bước 1: Thêm tất cả tài liệu chính sách làm nguồn

Bước 2: HỎI
  - "Các chính sách khác nhau thế nào về biện pháp khí hậu?"
  - Hệ thống tìm tất cả tài liệu, cho so sánh toàn diện

Bước 3: CHAT (nếu cần)
  - "Chính sách nào phù hợp nhất với mục tiêu X?"
  - Thảo luận về đánh đổi

Bước 4: Xuất ghi chú
  - Lưu phản hồi AI làm ghi chú cho báo cáo
```

---

## Quản Lý Ngữ Cảnh: Bảng Điều Khiển

Cả ba chế độ cho phép kiểm soát AI thấy gì.

### Trong CHAT và BIẾN ĐỔI
```
Bạn chọn:
  - Nguồn nào bao gồm
  - Mức ngữ cảnh cho mỗi nguồn:
    ✓ Nội Dung Đầy Đủ (gửi toàn bộ văn bản)
    ✓ Chỉ Tóm Tắt (gửi tóm tắt AI, không phải toàn văn)
    ✓ Không Trong Ngữ Cảnh (loại trừ hoàn toàn)

Ví dụ:
  Bài A: Nội Dung Đầy Đủ (phân tích kỹ)
  Bài B: Chỉ Tóm Tắt (nền tảng)
  Bài C: Không Trong Ngữ Cảnh (bảo mật)
```

### Trong HỎI
```
Ngữ cảnh tự động:
  - Hệ thống tìm TẤT CẢ nguồn
  - Lấy đoạn liên quan nhất
  - Gửi những đoạn đó tới AI

Nhưng bạn có thể:
  - Tìm trong notebook cụ thể
  - Lọc theo loại nguồn
  - Dùng kết quả để quyết định ngữ cảnh cho Chat tiếp theo
```

---

## Chọn Mô Hình

Mỗi chế độ hoạt động với mô hình khác:

### CHAT
- **Bất kỳ mô hình** đều hoạt động
- Mô hình nhanh (GPT-4o mini, Claude Haiku): Phản hồi nhanh, tốt cho hội thoại
- Mô hình mạnh (GPT-4o, Claude Sonnet): Suy luận tốt hơn, tốt cho chủ đề phức tạp

### HỎI
- **Mô hình nhanh ưu tiên** (vì xử lý nhiều tìm kiếm)
- Có thể dùng mô hình mạnh nếu muốn tổng hợp sâu
- Ví dụ: GPT-4 cho lập kế hoạch chiến lược, GPT-4o-mini cho sự kiện nhanh

### BIẾN ĐỔI
- **Bất kỳ mô hình** đều hoạt động
- Mô hình nhanh (tiết kiệm chi phí cho xử lý hàng loạt)
- Mô hình mạnh (trích xuất chất lượng tốt hơn)

---

## Nâng Cao: Kết Hợp Các Chế Độ

Bạn có thể kết hợp các chế độ:

```
BIẾN ĐỔI → CHAT
  1. Dùng biến đổi để trích xuất dữ liệu cấu trúc
  2. Dùng chat để thảo luận kết quả

HỎI → BIẾN ĐỔI
  1. Dùng Hỏi để hiểu gì quan trọng
  2. Dùng Biến Đổi để trích xuất từ nguồn còn lại

CHAT → Lưu thành Ghi Chú → BIẾN ĐỔI
  1. Hội thoại (Chat)
  2. Lưu phản hồi tốt thành ghi chú
  3. Dùng ghi chú đó làm ngữ cảnh cho biến đổi
```

---

## Tóm Tắt: Khi Nào Dùng Mỗi Cái

| Tình huống | Dùng | Tại sao |
|-----------|------|---------|
| "Tôi muốn khám phá chủ đề với câu hỏi tiếp" | **CHAT** | Hội thoại, bạn kiểm soát ngữ cảnh |
| "Tôi cần câu trả lời toàn diện cho một câu hỏi phức tạp" | **HỎI** | Tìm kiếm tự động, câu trả lời tổng hợp |
| "Tôi muốn tóm tắt nhất quán từ mỗi nguồn" | **BIẾN ĐỔI** | Tái sử dụng mẫu, áp dụng cho mỗi nguồn |
| "Tôi đang so sánh hai nguồn cụ thể" | **CHAT** | Chọn chỉ 2 đó, thảo luận |
| "Tôi cần phân loại mỗi nguồn theo tiêu chí X" | **BIẾN ĐỔI** | Trích xuất phân loại từ mỗi nguồn |
| "Tôi muốn hiểu bức tranh lớn trên tất cả nguồn" | **HỎI** | Tìm kiếm toàn diện tự động |
| "Tôi muốn xây dựng cơ sở tri thức" | **BIẾN ĐỔI** | Tạo ghi chú cấu trúc từ mỗi nguồn |
| "Tôi muốn lặp lại để hiểu sâu hơn" | **CHAT** | Nhiều câu hỏi, tinh chỉnh suy nghĩ |

Ý tưởng chính: **Câu hỏi khác cần công cụ khác.** Open Notebook cho cả ba vì nghiên cứu hiếm khi phù hợp một chế độ.
