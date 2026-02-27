# Ngữ Cảnh AI & RAG - Cách Open Notebook Sử Dụng Nghiên Cứu Của Bạn

Open Notebook sử dụng các phương pháp khác nhau để giúp mô hình AI nhận biết nghiên cứu tùy theo tính năng. Phần này giải thích **RAG** (dùng trong Hỏi) và **ngữ cảnh nội dung đầy đủ** (dùng trong Chat).

---

## Vấn Đề: Giúp AI Nhận Biết Dữ Liệu Của Bạn

### Các Phương Pháp Truyền Thống (và vấn đề của chúng)

**Cách 1: Tinh Chỉnh (Fine-Tuning)**
- Huấn luyện mô hình trên dữ liệu của bạn
- Ưu: Mô hình trở nên chuyên biệt
- Nhược: Tốn kém, chậm, vĩnh viễn (không thể quên)

**Cách 2: Gửi Mọi Thứ Lên Đám Mây**
- Tải tất cả dữ liệu lên API ChatGPT/Claude
- Ưu: Hoạt động tốt, nhanh
- Nhược: Ác mộng quyền riêng tư, dữ liệu rời khỏi kiểm soát, tốn kém

**Cách 3: Bỏ Qua Dữ Liệu**
- Chỉ dùng mô hình cơ sở mà không có nghiên cứu
- Ưu: Riêng tư, miễn phí
- Nhược: AI không biết gì về chủ đề cụ thể

### Phương Pháp Kép Của Open Notebook

**Cho Chat**: Gửi toàn bộ nội dung đã chọn tới LLM
- Đơn giản và minh bạch: Bạn chọn nguồn, chúng được gửi đầy đủ
- Ngữ cảnh tối đa: AI thấy mọi thứ bạn chọn
- Bạn kiểm soát nguồn nào được bao gồm

**Cho Hỏi (RAG)**: Truy Xuất Tăng Cường Sinh
- RAG = Retrieval-Augmented Generation (Truy Xuất Tăng Cường Sinh)
- Ý tưởng: *Tìm kiếm nội dung, tìm phần liên quan, chỉ gửi những phần đó*
- Tự động: AI quyết định gì liên quan dựa trên câu hỏi

---

## Cách RAG Hoạt Động: Ba Giai Đoạn

### Giai Đoạn 1: Chuẩn Bị Nội Dung

Khi bạn tải nguồn lên, Open Notebook chuẩn bị cho truy xuất:

```
1. TRÍCH XUẤT VĂN BẢN
   PDF → văn bản
   URL → văn bản trang web
   Âm thanh → văn bản phiên âm
   Video → phụ đề + phiên âm

2. CHIA THÀNH ĐOẠN
   Tài liệu dài → chia thành đoạn ~500 từ
   Tại sao? Ngữ cảnh AI có giới hạn; đoạn nhỏ chính xác hơn

3. TẠO NHÚNG (EMBEDDING)
   Mỗi đoạn → vector ngữ nghĩa (số đại diện ý nghĩa)
   Tại sao? Cho phép tìm đoạn theo tương tự, không chỉ từ khóa

4. LƯU TRỮ VÀO CƠ SỞ DỮ LIỆU
   Đoạn + nhúng + metadata → lưu trữ có thể tìm kiếm
```

**Ví dụ:**
```
Nguồn: "Nghiên Cứu An Toàn AI 2026" (PDF 50 trang)
↓
Trích xuất: 50 trang văn bản
↓
Chia đoạn: 150 đoạn (~500 từ mỗi đoạn)
↓
Nhúng: Mỗi đoạn có vector (1536 số cho OpenAI)
↓
Lưu trữ: Sẵn sàng tìm kiếm
```

---

### Giai Đoạn 2: Thời Điểm Truy Vấn (Bạn Tìm Gì)

Khi bạn đặt câu hỏi, hệ thống tìm nội dung liên quan:

```
1. BẠN ĐẶT CÂU HỎI
   "Bài báo nói gì về alignment?"

2. HỆ THỐNG CHUYỂN CÂU HỎI THÀNH NHÚNG
   Câu hỏi → vector (cùng cách đoạn được vector hóa)

3. TÌM KIẾM TƯƠNG TỰ
   Tìm đoạn tương tự nhất với câu hỏi
   (dùng toán vector, không phải so khớp từ khóa)

4. TRẢ VỀ KẾT QUẢ TOP
   Thường top 5-10 đoạn tương tự nhất

5. BẠN NHẬN LẠI
   ✓ Các đoạn liên quan
   ✓ Nguồn gốc (nguồn + số trang)
   ✓ Điểm liên quan
```

**Ví dụ:**
```
H: "Bài báo nói gì về alignment?"
↓
Vector câu hỏi: [0.23, -0.51, 0.88, ..., 0.12]
↓
Tìm kiếm: So sánh với tất cả vector đoạn
↓
Kết quả:
  - Đoạn 47 (phần alignment): tương tự 0.94
  - Đoạn 63 (phương pháp an toàn): tương tự 0.88
  - Đoạn 12 (nghiên cứu liên quan): tương tự 0.71
```

---

### Giai Đoạn 3: Tăng Cường (Cách AI Sử Dụng)

Bây giờ bạn có các phần liên quan. AI sử dụng chúng:

```
HỆ THỐNG XÂY DỰNG PROMPT:
  "Bạn là trợ lý nghiên cứu AI.

   Người dùng có tài liệu nghiên cứu sau:
   [NỘI DUNG ĐOẠN 47]
   [NỘI DUNG ĐOẠN 63]

   Câu hỏi: 'Bài báo nói gì về alignment?'

   Trả lời dựa trên tài liệu trên."

AI TRẢ LỜI:
  "Dựa trên tài liệu nghiên cứu, bài báo tiếp cận
   alignment thông qua [trích từ đoạn] và nhấn mạnh
   [trích từ đoạn]..."

HỆ THỐNG THÊM TRÍCH DẪN:
  "- Xem tài liệu trang 15 cho chi tiết phương pháp
   - Xem tài liệu trang 23 cho nhấn mạnh về X"
```

---

## Hai Chế Độ Tìm Kiếm: Chính Xác vs. Ngữ Nghĩa

Open Notebook cung cấp hai chiến lược tìm kiếm khác nhau cho mục tiêu khác nhau.

### 1. Tìm Kiếm Văn Bản (So Khớp Từ Khóa)

**Cách hoạt động:**
- Sử dụng xếp hạng BM25 (cùng thuật toán Google dùng)
- Tìm đoạn chứa từ khóa
- Xếp hạng theo liên quan (tần suất từ khóa, vị trí, v.v.)

**Khi nào dùng:**
- "Tôi nhớ cụm từ chính xác 'X' và muốn tìm"
- "Tôi tìm tên hoặc số cụ thể"
- "Tôi cần trích dẫn chính xác"

**Ví dụ:**
```
Tìm kiếm: "transformer architecture"
Kết quả:
  1. Đoạn có "transformer architecture" 3 lần
  2. Đoạn có "transformer" và "architecture" riêng biệt
  3. Đoạn có "transformer-based models"
```

### 2. Tìm Kiếm Vector (Tương Tự Ngữ Nghĩa)

**Cách hoạt động:**
- Chuyển câu hỏi thành vector (nhúng số)
- Tìm đoạn có vector tương tự
- Không cần từ khóa—tìm nội dung tương tự về khái niệm

**Khi nào dùng:**
- "Tìm nội dung về X (không nói từ chính xác)"
- "Tôi đang khám phá khái niệm"
- "Tìm ý tưởng tương tự dù diễn đạt khác"

**Ví dụ:**
```
Tìm kiếm: "cơ chế hiểu mô hình là gì?"
Kết quả (không có "hiểu" trong đoạn nào):
  1. Đoạn về khả năng diễn giải và phân tích cơ chế
  2. Đoạn về phân tích đặc trưng
  3. Đoạn về cơ chế attention

Tại sao? Vector tương tự ngữ nghĩa với khái niệm.
```

---

## Quản Lý Ngữ Cảnh: Bảng Điều Khiển Của Bạn

Đây là điểm khác biệt của Open Notebook: **Bạn quyết định AI thấy gì.**

### Ba Mức

| Mức | Chia sẻ gì | Chi phí ước tính | Riêng tư | Trường hợp sử dụng |
|-----|-----------|-----------------|----------|---------------------|
| **Nội Dung Đầy Đủ** | Toàn bộ văn bản nguồn | 10.000 token | Thấp | Phân tích chi tiết, đọc kỹ |
| **Chỉ Tóm Tắt** | Tóm tắt do AI tạo | 2.000 token | Cao | Tài liệu nền, tham chiếu |
| **Không Trong Ngữ Cảnh** | Không gì cả | 0 token | Tối đa | Bảo mật, không liên quan, lưu trữ |

### Cách Hoạt Động

**Nội Dung Đầy Đủ:**
```
Bạn: "Phương pháp trong bài A là gì?"
Hệ thống:
  - Tìm bài A
  - Lấy toàn bộ nội dung (hoặc đoạn lớn)
  - Gửi tới AI: "Đây là bài A. Trả lời về phương pháp."
  - AI phân tích nội dung hoàn chỉnh
  - Kết quả: Câu trả lời chi tiết, chính xác
```

**Chỉ Tóm Tắt:**
```
Bạn: "Tôi muốn chat dùng bài A và B"
Hệ thống:
  - Bài A: Gửi tóm tắt do AI tạo (không phải toàn văn)
  - Bài B: Gửi nội dung đầy đủ (phân tích chi tiết)
  - AI thấy 2 nguồn nhưng ở mức chi tiết khác nhau
  - Kết quả: Dùng tóm tắt cho ngữ cảnh, chi tiết cho nội dung tập trung
```

**Không Trong Ngữ Cảnh:**
```
Bạn: "Tôi có 10 nguồn nhưng chỉ muốn 5 trong ngữ cảnh"
Hệ thống:
  - Bài A-E: Trong ngữ cảnh (gửi tới AI)
  - Bài F-J: Không trong ngữ cảnh (AI không thấy, không tìm)
  - AI không bao giờ biết 5 nguồn này tồn tại
  - Kết quả: Ngữ cảnh gọn, tập trung
```

### Tại Sao Điều Này Quan Trọng

**Quyền riêng tư**: Bạn kiểm soát gì rời hệ thống
```
Kịch bản: Tài liệu mật công ty + nghiên cứu công khai
Kiểm soát: Nghiên cứu công khai trong ngữ cảnh → Tài liệu mật loại trừ
Kết quả: AI không bao giờ thấy nội dung mật
```

**Chi phí**: Bạn kiểm soát sử dụng token
```
Kịch bản: 100 nguồn nền + 5 cho phân tích chi tiết
Kiểm soát: Nội dung đầy đủ cho 5, tóm tắt cho 95
Kết quả: Giảm 80% chi phí token so với gửi tất cả
```

**Chất lượng**: Bạn kiểm soát AI tập trung vào gì
```
Kịch bản: 20 nguồn, câu hỏi cần phân tích sâu
Kiểm soát: Nội dung đầy đủ cho nguồn liên quan, loại trừ khác
Kết quả: AI không bị phân tâm; cho câu trả lời tốt hơn
```

---

## Sự Khác Biệt: Chat vs. Hỏi

**QUAN TRỌNG**: Chúng sử dụng phương pháp hoàn toàn khác!

### Chat: Ngữ Cảnh Nội Dung Đầy Đủ (KHÔNG RAG)

**Cách hoạt động:**
```
BẠN:
  1. Chọn nguồn nào bao gồm trong ngữ cảnh
  2. Đặt mức ngữ cảnh (đầy đủ/tóm tắt/loại trừ)
  3. Đặt câu hỏi

HỆ THỐNG:
  - Lấy TẤT CẢ nguồn đã chọn (theo mức ngữ cảnh)
  - Gửi TOÀN BỘ nội dung tới LLM cùng lúc
  - KHÔNG tìm kiếm, KHÔNG truy xuất, KHÔNG chia đoạn
  - AI thấy mọi thứ bạn chọn

AI:
  - Trả lời dựa trên nội dung đầy đủ bạn cung cấp
  - Có thể tham chiếu bất kỳ phần nào của nguồn đã chọn
  - Hội thoại: ngữ cảnh duy trì cho câu hỏi tiếp theo
```

**Dùng khi**:
- Bạn biết nguồn nào liên quan
- Bạn muốn hội thoại qua lại
- Bạn muốn AI thấy ngữ cảnh hoàn chỉnh
- Bạn đang đọc kỹ hoặc phân tích

**Ưu điểm:**
- Đơn giản và minh bạch
- AI thấy mọi thứ (không bỏ sót nội dung)
- Luồng hội thoại

**Hạn chế:**
- Giới hạn bởi cửa sổ ngữ cảnh LLM
- Phải tự chọn nguồn liên quan
- Gửi nhiều token hơn (chi phí cao với nhiều nguồn)

---

### Hỏi: RAG - Truy Xuất Tự Động

**Cách hoạt động:**
```
BẠN:
  Đặt một câu hỏi phức tạp

HỆ THỐNG:
  1. Phân tích câu hỏi
  2. Tìm kiếm TẤT CẢ nguồn tự động
  3. Tìm đoạn liên quan qua tương tự vector
  4. Lấy chỉ những phần liên quan nhất
  5. Gửi CHỈ các đoạn đó tới LLM
  6. Tổng hợp thành câu trả lời toàn diện

AI:
  - Thấy CHỈ đoạn được lấy (không phải toàn bộ nguồn)
  - Trả lời dựa trên nội dung được tìm thấy liên quan
  - Trả lời một lần (không hội thoại)
```

**Dùng khi**:
- Bạn có nhiều nguồn và không biết nguồn nào liên quan
- Bạn muốn AI tự tìm kiếm
- Bạn cần câu trả lời toàn diện cho câu hỏi phức tạp
- Bạn muốn giảm thiểu token gửi tới LLM

**Ưu điểm:**
- Tìm kiếm tự động (bạn không chọn nguồn)
- Hoạt động trên nhiều nguồn cùng lúc
- Tiết kiệm chi phí (chỉ gửi đoạn liên quan)

**Hạn chế:**
- Không hội thoại (một câu hỏi/trả lời)
- AI chỉ thấy đoạn được lấy (có thể bỏ sót ngữ cảnh)
- Chất lượng tìm kiếm phụ thuộc câu hỏi khớp nội dung thế nào

---

## Ý Nghĩa: Riêng Tư Theo Thiết Kế

Phương pháp RAG của Open Notebook cho bạn điều bạn không có với ChatGPT hay Claude trực tiếp:

**Bạn kiểm soát ranh giới giữa:**
- Gì giữ riêng tư (trên hệ thống của bạn)
- Gì đến AI (được chọn rõ ràng)
- Gì AI có thể thấy (mức ngữ cảnh)

### Dấu Vết Kiểm Toán

Vì mọi thứ được truy xuất rõ ràng, bạn có thể hỏi:
- "AI dùng nguồn nào cho câu trả lời này?" → Xem trích dẫn
- "AI thấy chính xác gì?" → Xem đoạn trong mức ngữ cảnh
- "Khẳng định của AI có trong nguồn không?" → Xác minh trích dẫn

Điều này ngăn ảo giác hoặc trình bày sai tốt hơn hầu hết hệ thống.

---

## Cách Nhúng Hoạt Động (Đơn Giản Hóa)

Phép thuật tìm kiếm ngữ nghĩa đến từ nhúng. Đây là trực giác:

### Ý Tưởng
Thay vì lưu văn bản, lưu dưới dạng danh sách số (vector) đại diện "ý nghĩa."

```
Đoạn: "Transformer sử dụng cơ chế attention"
Vector: [0.23, -0.51, 0.88, 0.12, ..., 0.34]
        (1536 số cho OpenAI)

Đoạn khác: "Attention cho phép mô hình tập trung vào phần liên quan"
Vector: [0.24, -0.48, 0.87, 0.15, ..., 0.35]
        (số tương tự = ý nghĩa tương tự!)
```

### Tại Sao Hoạt Động
Từ tương tự ngữ nghĩa tạo vector tương tự. Vì vậy:
- "alignment" và "interpretability" có vector tương tự
- "transformer" và "attention" có vector liên quan
- "mèo" và "chó" tương tự hơn "mèo" và "máy sưởi"

### Cách Tìm Kiếm Hoạt Động
```
Câu hỏi: "Mô hình hiểu quyết định thế nào?"
Vector câu hỏi: [0.25, -0.50, 0.86, 0.14, ..., 0.33]

So sánh với tất cả vector đã lưu. Tìm tương tự nhất:
- Đoạn về interpretability: tương tự 0.94
- Đoạn về explainability: tương tự 0.91
- Đoạn về feature attribution: tương tự 0.88

Trả về kết quả top.
```

Đây là lý do tìm kiếm ngữ nghĩa tìm nội dung tương tự về khái niệm ngay cả khi từ khác.

---

## Quyết Định Thiết Kế Chính

### 1. Tìm Kiếm, Không Huấn Luyện
**Tại sao?** Tinh chỉnh chậm và vĩnh viễn. Tìm kiếm linh hoạt và có thể đảo ngược.

### 2. Truy Xuất Rõ Ràng, Không Phải Kiến Thức Ngầm
**Tại sao?** Bạn có thể xác minh AI thấy gì. Có dấu vết kiểm toán. Bạn kiểm soát gì rời hệ thống.

### 3. Nhiều Loại Tìm Kiếm
**Tại sao?** Câu hỏi khác cần tìm kiếm khác (từ khóa vs. ngữ nghĩa). Cung cấp cả hai mạnh mẽ hơn.

### 4. Ngữ Cảnh Như Hệ Thống Quyền
**Tại sao?** Không phải mọi thứ bạn lưu cần đến AI. Bạn kiểm soát chi tiết.

---

## Tóm Tắt

Open Notebook cho bạn **hai cách** làm việc với AI:

### Chat (Nội Dung Đầy Đủ)
- Gửi toàn bộ nguồn đã chọn tới LLM
- Kiểm soát thủ công: bạn chọn nguồn
- Hội thoại: đối thoại qua lại
- Minh bạch: bạn biết chính xác AI thấy gì
- Phù hợp nhất cho: phân tích tập trung, đọc kỹ

### Hỏi (RAG)
- Tìm kiếm và truy xuất đoạn liên quan tự động
- Tự động: AI tìm gì liên quan
- Một lần: câu trả lời toàn diện đơn
- Hiệu quả: chỉ gửi phần liên quan
- Phù hợp nhất cho: câu hỏi rộng trên nhiều nguồn

**Cả hai phương pháp:**
1. Giữ dữ liệu riêng tư (không rời hệ thống theo mặc định)
2. Cho bạn kiểm soát (bạn chọn tính năng nào dùng)
3. Tạo dấu vết kiểm toán (trích dẫn cho thấy gì được dùng)
4. Hỗ trợ nhiều nhà cung cấp AI

**Sắp ra mắt**: Cộng đồng đang làm việc để thêm khả năng RAG vào Chat, mang đến cho bạn điều tốt nhất của cả hai.
