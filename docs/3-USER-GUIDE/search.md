# Tìm Kiếm Hiệu Quả - Tìm Thứ Bạn Cần

Tìm kiếm là cửa ngõ vào nghiên cứu của bạn. Hướng dẫn này bao gồm hai chế độ tìm kiếm và thời điểm sử dụng từng chế độ.

---

## Bắt đầu nhanh: Tìm thứ gì đó

### Tìm kiếm đơn giản



```
1. Go to your notebook
2. Type in search box
3. See results (both sources and notes)
4. Click result to view source/note
5. Done!

That works for basic searches.
But you can do much better...
```



---

## Giải thích hai chế độ tìm kiếm

Open Notebook có hai cách tiếp cận tìm kiếm cơ bản khác nhau.

### Loại tìm kiếm 1: TÌM KIẾM VĂN BẢN (Khớp từ khóa)

**Cách thức hoạt động:**
- Bạn tìm kiếm từ: "máy biến áp"
- Hệ thống tìm thấy các đoạn có chứa "transformer"
- Xếp hạng theo mức độ liên quan: tần suất, vị trí, bối cảnh

**Tốc độ:** Rất nhanh (tức thời)

**Khi nào nên sử dụng:**
- Bạn nhớ chính xác các từ hoặc cụm từ
- Bạn đang tìm kiếm các thuật ngữ cụ thể
- Bạn muốn kết hợp từ khóa chính xác
- Bạn cần báo giá chính xác

**Ví dụ:**

```
Search: "attention mechanism"
Results:
  1. "The attention mechanism allows..." (perfect match)
  2. "Attention and other mechanisms..." (partial match)
  3. "How mechanisms work in attention..." (includes words separately)

All contain "attention" AND "mechanism"
Ranked by how close together they are
```



**Những gì nó tìm thấy:**
- Cụm từ chính xác: “mô hình máy biến áp”
- Từ riêng lẻ: máy biến áp HOẶC model (quá rộng)
- Tên: "Vaswani và cộng sự."
- Các số: “1994”, “GPT-4”
- Thuật ngữ kỹ thuật: “LSTM”, “tích chập”

**Những gì nó không tìm thấy:**
- Từ tương tự: tìm "chú ý" sẽ không tìm thấy "tập trung"
- Từ đồng nghĩa: tìm “lớn” sẽ không tìm được “lớn”
- Khái niệm: tìm “tương tự” sẽ không tìm thấy “giống”

---

### Loại tìm kiếm 2: TÌM KIẾM VECTOR (Khớp ngữ nghĩa/khái niệm)

**Cách thức hoạt động:**
- Tìm kiếm của bạn được chuyển đổi thành nhúng (vector)
- Tất cả các khối được chuyển đổi thành phần nhúng
- Hệ thống tìm thấy hầu hết các nhúng tương tự
- Xếp hạng theo sự tương đồng về ngữ nghĩa

**Tốc độ:** Chậm hơn một chút (1-2 giây)

**Khi nào nên sử dụng:**
- Bạn đang khám phá một khái niệm
- Bạn không biết chính xác từ ngữ
- Bạn muốn nội dung tương tự về mặt ngữ nghĩa
- Bạn đang khám phá chứ không phải đang tìm kiếm

**Ví dụ:**

```
Search: "What's the mechanism for understanding in models?"
(Notice: No chunk likely says exactly that)

Results:
  1. "Mechanistic interpretability allows understanding..." (semantic match)
  2. "Feature attribution reveals how models work..." (conceptually similar)
  3. "Attention visualization shows model decisions..." (same topic)

None contain your exact words
But all are semantically related
```



**Những gì nó tìm thấy:**
- Khái niệm tương tự: "hiểu" + "diễn giải" + "có thể giải thích được" (tất cả đều liên quan)
- Diễn giải: “lớn” và “lớn” (cùng nghĩa)
- Ý liên quan: “an toàn” liên quan đến “sự căn chỉnh” (các khái niệm liên kết)
- Tương tự: nội dung về học tập sinh học khi tìm kiếm “học tập”

**Những gì nó không tìm thấy:**
- Từ khóa chính xác: nếu bạn tìm kiếm một từ hiếm, tìm kiếm vector có thể bỏ lỡ nó
- Con số cụ thể: “1994” và “1993” khác nhau về mặt ngữ nghĩa
- Thuật ngữ kỹ thuật: "LSTM" và "RNN" khác nhau ngay cả khi có liên quan

---

## Quyết định: Tìm kiếm văn bản so với Tìm kiếm Vector?



```
Question: "Do I remember the exact words?"

→ YES: Use TEXT SEARCH
   Example: "I remember the paper said 'attention is all you need'"

→ NO: Use VECTOR SEARCH
   Example: "I'm looking for content about how models process information"

→ UNSURE: Try TEXT SEARCH first (faster)
         If no results, try VECTOR SEARCH

Text search: "I know what I'm looking for"
Vector search: "I'm exploring an idea"
```



---

## Từng bước: Sử dụng từng tìm kiếm

### Tìm kiếm văn bản



```
1. Go to search box
2. Type your keywords: "transformer", "attention", "2017"
3. Press Enter
4. Results appear (usually instant)
5. Click result to see context

Results show:
  - Which source contains it
  - How many times it appears
  - Relevance score
  - Preview of surrounding text
```



### Tìm kiếm vectơ



```
1. Go to search box
2. Type your concept: "How do models understand language?"
3. Choose "Vector Search" from dropdown
4. Press Enter
5. Results appear (1-2 seconds)
6. Click result to see context

Results show:
  - Semantically related chunks
  - Similarity score (higher = more related)
  - Preview of surrounding text
  - Different sources mixed together
```



---

## Tính năng Hỏi (Tìm kiếm tự động)

Hỏi khác với tìm kiếm đơn giản. Nó tự động tìm kiếm, tổng hợp và trả lời.

### Cách thức hoạt động của Ask



```
Stage 1: QUESTION UNDERSTANDING
  "Compare the approaches in my papers"
  → System: "This asks for comparison"

Stage 2: SEARCH STRATEGY
  → System: "I should search for each approach separately"

Stage 3: PARALLEL SEARCHES
  → Search 1: "Approach in paper A"
  → Search 2: "Approach in paper B"
  (Multiple searches happen at once)

Stage 4: ANALYSIS & SYNTHESIS
  → Per-result analysis: "Based on paper A, the approach is..."
  → Per-result analysis: "Based on paper B, the approach is..."
  → Final synthesis: "Comparing A and B: A differs from B in..."

Result: Comprehensive answer, not just search results
```



### Khi nào nên sử dụng Hỏi so với Tìm kiếm đơn giản

| Nhiệm vụ | Sử dụng | Tại sao |
|------|------|------|
| "Tìm câu trích dẫn về X" | **TÌM KIẾM VĂN BẢN** | Cần từ chính xác |
| "Nguồn A nói gì về X?" | **TÌM KIẾM VĂN BẢN** | Trả lời trực tiếp, nhanh chóng |
| "Tìm nội dung về X" | **TÌM KIẾM VECTOR** | Khám phá ngữ nghĩa |
| "So sánh A và B" | **HỎI** | Tổng hợp toàn diện |
| "Bức tranh lớn là gì?" | **HỎI** | Cần phân tích đầy đủ |
| “Những nguồn này có mối liên hệ như thế nào?” | **HỎI** | Tổng hợp nguồn chéo |
| "Tôi nhớ vài điều về X" | **TÌM KIẾM VĂN BẢN** | Nhớ lại bộ nhớ |
| “Tôi đang khám phá chủ đề X” | **TÌM KIẾM VECTOR** | Chế độ khám phá |

---

## Chiến lược tìm kiếm nâng cao

### Chiến lược 1: Tìm kiếm đơn giản với theo dõi



```
1. Text search: "attention mechanism"
   Results: 50 matches

2. Too many. Follow up with vector search:
   "Why is attention useful?" (concept search)
   Results: Most relevant papers/notes

3. Better results with less noise
```



### Chiến lược 2: Hỏi toàn diện, sau đó tìm kiếm chi tiết



```
1. Ask: "What are the main approaches to X?"
   Result: Comprehensive answer about A, B, C

2. Use that to identify specific sources

3. Text search in those specific sources:
   "Why did they choose method X?"
   Result: Detailed information
```



### Chiến lược 3: Tìm kiếm Vector để khám phá, văn bản để xác minh



```
1. Vector search: "How do transformers generalize?"
   Results: Related conceptual papers

2. Skim to understand landscape

3. Text search in promising sources:
   "generalization", "extrapolation", "transfer"
   Results: Specific passages to read carefully
```



### Chiến lược 4: Kết hợp Tìm kiếm với Chat



```
1. Vector search: "What's new in AI 2026?"
   Results: Latest papers

2. Go to Chat
3. Add those papers to context
4. Ask detailed follow-up questions
5. Get deep analysis of results
```



---

## Vấn đề về chất lượng tìm kiếm & cách khắc phục

### Không có kết quả

| Vấn đề | Nguyên nhân | Giải pháp |
|----------|-------|----------|
| Tìm kiếm văn bản: không có kết quả | Từ không xuất hiện | Thay vào đó hãy thử tìm kiếm vector |
| Tìm kiếm vector: không có kết quả | Khái niệm không có trong nội dung | Hãy thử cụm từ tìm kiếm rộng hơn |
| Cả hai đều trống | Nội dung không có trong sổ tay | Thêm nguồn vào sổ tay |
| | Nguồn chưa được xử lý | Đợi quá trình xử lý hoàn tất |

### Nhận được quá nhiều kết quả

| Vấn đề | Nguyên nhân | Giải pháp |
|----------|-------|----------|
| Hơn 1000 kết quả | Tìm kiếm quá rộng | Hãy cụ thể hơn |
| | Tất cả các nguồn | Lọc theo nguồn |
| | Từ khóa khớp với từ hiếm | Thay vào đó hãy sử dụng tìm kiếm vectơ |

### Nhận kết quả sai

| Vấn đề | Nguyên nhân | Giải pháp |
|----------|-------|----------|
| Kết quả không liên quan | Cụm từ tìm kiếm có nhiều nghĩa | Cung cấp thêm ngữ cảnh |
| | Sử dụng tìm kiếm văn bản cho các khái niệm | Hãy thử tìm kiếm vector |
| Ý nghĩa khác nhau | Từ đồng âm (từ có nghĩa là nhiều thứ) | Thêm ngữ cảnh (ví dụ: "cơ chế chú ý") |

### Nhận được kết quả chất lượng thấp

| Vấn đề | Nguyên nhân | Giải pháp |
|----------|-------|----------|
| Kết quả không phù hợp với ý định | Thuật ngữ tìm kiếm mơ hồ | Hãy cụ thể ("Ai đã phát minh ra X?" so với "X") |
| | Khái niệm không được thể hiện tốt | Thêm nhiều nguồn về chủ đề đó |
| | Nhúng vectơ chưa được đào tạo trên miền | Sử dụng tìm kiếm văn bản làm dự phòng |

---

## Mẹo để tìm kiếm tốt hơn

### Để tìm kiếm văn bản
1. **Hãy cụ thể** — "cơ chế chú ý" chứ không chỉ là "chú ý"
2. **Sử dụng các cụm từ chính xác** — Đặt dấu ngoặc kép xung quanh: "sự chú ý là tất cả những gì bạn cần"
3. **Bao gồm ngữ cảnh** — "LSTM vs sự chú ý" không chỉ là "sự chú ý"
4. **Sử dụng thuật ngữ kỹ thuật** — Những thuật ngữ này thường chính xác hơn
5. **Thử từ đồng nghĩa** — Nếu lần tìm kiếm đầu tiên không thành công, hãy thử các thuật ngữ liên quan

### Để tìm kiếm vectơ
1. **Đặt câu hỏi** — "Cách tốt nhất để đạt được X là gì?" tốt hơn "cách tốt nhất"
2. **Sử dụng ngôn ngữ tự nhiên** — Giải thích những gì bạn đang tìm kiếm
3. **Hãy cụ thể về ý định** — "So sánh X và Y" chứ không phải "X và Y"
4. **Bao gồm ngữ cảnh** — "Trong học máy, làm thế nào..." và chỉ "làm thế nào..."
5. **Suy nghĩ theo khái niệm** — Bạn đang khám phá ý tưởng gì?

### Lời khuyên chung
1. **Bắt đầu rộng, sau đó thu hẹp** — "Giấy tờ AI" → "máy biến áp" → "cơ chế chú ý"
2. **Thử cả hai loại tìm kiếm** — Mỗi loại tìm thấy những thứ khác nhau
3. **Sử dụng Đặt câu hỏi phức tạp** — Đừng chỉ tìm kiếm
4. **Lưu kết quả tốt dưới dạng ghi chú** — Tạo cơ sở kiến thức
5. **Lọc theo nguồn nếu cần** — "Chỉ tìm kiếm trong Bài A"

---

## Ví dụ tìm kiếm

### Ví dụ 1: Tìm một sự thật cụ thể

**Mục tiêu:** "Tìm ngày máy biến áp được giới thiệu"



```
Step 1: Text search
  "transformer 2017" (or year you remember)

If that works: Done!

If no results: Try
  "attention is all you need" (famous paper title)

Check result for exact date
```



### Ví dụ 2: Khám phá một khái niệm

**Mục tiêu:** "Tìm nội dung về khả năng diễn giải căn chỉnh"



```
Step 1: Vector search
  "How do we make AI interpretable?"

Results: Papers on interpretability, transparency, alignment

Step 2: Review results
  See which papers are most relevant

Step 3: Deep dive
  Go to Chat, add top 2-3 papers
  Ask detailed questions about alignment
```



### Ví dụ 3: Trả lời toàn diện

**Mục tiêu:** "So sánh các phương pháp khác nhau về an toàn AI như thế nào?"



```
Step 1: Ask
  "Compare the main approaches to AI safety in my sources"

Result: Comprehensive analysis comparing approaches

Step 2: Identify sources
  From answer, see which papers were most relevant

Step 3: Deep dive
  Text search in those papers:
  "limitations", "critiques", "open problems"

Step 4: Save as notes
  Create comparison note from Ask result
```



### Ví dụ 4: Tìm mẫu

**Mục tiêu:** "Tìm tất cả các bài báo đề cập đến máy biến áp"



```
Step 1: Text search
  "transformer"

Results: All papers mentioning "transformer"

Step 2: Vector search
  "neural network architecture for sequence processing"

Results: Papers that don't say "transformer" but discuss similar concept

Step 3: Combine
  Union of text + vector results shows full landscape

Step 4: Analyze
  Go to Chat with all results
  Ask: "What's common across all these?"
```



---

## Tìm kiếm trong quy trình làm việc

Cách tìm kiếm phù hợp với các tính năng khác:



```
SOURCES
  ↓
SEARCH (find what matters)
  ├─ Text search (precise)
  ├─ Vector search (exploration)
  └─ Ask (comprehensive)
  ↓
CHAT (explore with follow-ups)
  ↓
TRANSFORMATIONS (batch extract)
  ↓
NOTES (save insights)
```



### Ví dụ về quy trình làm việc



```
1. Add 10 papers to notebook

2. Search: "What's the state of the art?"
   (Vector search explores landscape)

3. Ask: "Compare these 3 approaches"
   (Comprehensive synthesis)

4. Chat: Deep questions about winner
   (Follow-up exploration)

5. Save best insights as notes
   (Knowledge capture)

6. Transform remaining papers
   (Batch extraction for later)

7. Create podcast from notes + sources
   (Share findings)
```



---

## Tóm tắt: Biết tìm kiếm của bạn

**TÌM KIẾM VĂN BẢN** — "Tôi biết mình đang tìm gì"
- Nhanh chóng, chính xác, dựa trên từ khóa
- Sử dụng khi bạn nhớ chính xác từ/cụm từ
- Tốt nhất cho: Tìm kiếm thông tin cụ thể, báo giá, thuật ngữ kỹ thuật
- Tốc độ: Tức thời

**TÌM KIẾM VECTOR** — "Tôi đang khám phá một ý tưởng"
- Chậm, dựa trên khái niệm, ngữ nghĩa
- Sử dụng khi bạn đang khám phá các kết nối
- Tốt nhất cho: Khám phá khái niệm, ý tưởng liên quan, từ đồng nghĩa
- Tốc độ: 1-2 giây

**HỎI** — "Tôi muốn một câu trả lời toàn diện"
- Tự động tìm kiếm, tự động phân tích, tổng hợp
- Sử dụng cho các câu hỏi phức tạp cần nhiều nguồn
- Tốt nhất cho: So sánh, câu hỏi tổng quát, tổng hợp
- Tốc độ: 10-30 giây

Chọn công cụ phù hợp cho mục tiêu tìm kiếm của bạn và bạn sẽ tìm thấy thứ mình cần nhanh hơn.