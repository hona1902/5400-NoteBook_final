# Chuyển đổi - Xử lý hàng loạt nguồn của bạn

Các phép biến đổi áp dụng cùng một phân tích cho nhiều nguồn cùng một lúc. Thay vì hỏi đi hỏi lại cùng một câu hỏi, hãy xác định một mẫu và chạy nó trên nội dung của bạn.

---

## Khi nào nên sử dụng phép biến đổi

| Sử dụng các phép biến đổi khi | Thay vào đó hãy sử dụng trò chuyện khi |
|--------------------------|----------------------|
| Phân tích giống nhau trên nhiều nguồn | Câu hỏi một lần |
| Cần định dạng đầu ra nhất quán | Trò chuyện khám phá |
| Xử lý hàng loạt | Cần có câu hỏi tiếp theo |
| Tạo ghi chú có cấu trúc | Bối cảnh thay đổi giữa các câu hỏi |

**Ví dụ**: Bạn có 10 bài viết và muốn có bản tóm tắt của từng bài. Chuyển đổi thực hiện nó trong một hoạt động.

---

## Bắt đầu nhanh: Sự chuyển đổi đầu tiên của bạn



```
1. Go to your notebook
2. Click "Transformations" in navigation
3. Select a built-in template (e.g., "Summary")
4. Select sources to transform
5. Click "Apply"
6. Wait for processing
7. New notes appear automatically
```



---

## Biến đổi tích hợp

Open Notebook bao gồm các mẫu sẵn sàng sử dụng:

### Bản tóm tắt



```
What it does: Creates a 200-300 word overview
Output: Key points, main arguments, conclusions
Best for: Quick reference, getting the gist
```



### Các khái niệm chính



```
What it does: Extracts main ideas and terminology
Output: List of concepts with explanations
Best for: Learning new topics, building vocabulary
```



### Phương pháp luận



```
What it does: Extracts research approach
Output: How the study was conducted
Best for: Academic papers, research review
```



###Món ăn mang đi



```
What it does: Extracts actionable insights
Output: What you should do with this information
Best for: Business documents, practical guides
```



### Câu hỏi



```
What it does: Generates questions the source raises
Output: Open questions, gaps, follow-up research
Best for: Literature review, research planning
```



---

## Tạo các chuyển đổi tùy chỉnh

### Từng bước



```
1. Go to "Transformations" page
2. Click "Create New"
3. Enter a name: "Academic Paper Analysis"
4. Write your prompt template:

   "Analyze this academic paper and extract:

   1. **Research Question**: What problem does this address?
   2. **Hypothesis**: What did they predict?
   3. **Methodology**: How did they test it?
   4. **Key Findings**: What did they discover? (numbered list)
   5. **Limitations**: What caveats do the authors mention?
   6. **Future Work**: What do they suggest next?

   Be specific and cite page numbers where possible."

5. Click "Save"
6. Your transformation appears in the list
```



### Mẹo về mẫu nhắc nhở

**Hãy cụ thể về định dạng:**

```
Good: "List 5 key points as bullet points"
Bad: "What are the key points?"
```



**Cấu trúc yêu cầu:**

```
Good: "Create sections for: Summary, Methods, Results"
Bad: "Tell me about this paper"
```



**Yêu cầu trích dẫn:**

```
Good: "Cite page numbers for each claim"
Bad: (no citation request)
```



**Đặt kỳ vọng về độ dài:**

```
Good: "In 200-300 words, summarize..."
Bad: "Summarize this"
```



---

## Áp dụng các phép biến đổi

### Đến một nguồn duy nhất



```
1. In Sources panel, click source menu (⋮)
2. Select "Transform"
3. Choose transformation template
4. Click "Apply"
5. Note appears when done
```



### Tới nhiều nguồn (Batch)



```
1. Go to Transformations page
2. Select your template
3. Check multiple sources
4. Click "Apply to Selected"
5. Processing runs in parallel
6. One note per source created
```



### Thời gian xử lý

| Nguồn | Giờ điển hình |
|----------|--------------|
| 1 nguồn | 30 giây - 1 phút |
| 5 nguồn | 2-3 phút |
| 10 nguồn | 4-5 phút |
| Hơn 20 nguồn | 8-10 phút |

Quá trình xử lý chạy ở chế độ nền. Bạn có thể tiếp tục làm việc.

---

## Ví dụ về chuyển đổi

### Mẫu bình luận văn học



```
Name: Literature Review Entry

Prompt:
"For this research paper, create a literature review entry:

**Citation**: [Author(s), Year, Title, Journal]
**Research Question**: What problem is addressed?
**Methodology**: What approach was used?
**Sample**: What population/data was studied?
**Key Findings**:
1. [Finding with page citation]
2. [Finding with page citation]
3. [Finding with page citation]
**Strengths**: What did this study do well?
**Limitations**: What are the gaps?
**Relevance**: How does this connect to my research?

Keep each section to 2-3 sentences."
```



### Mẫu ghi chú cuộc họp



```
Name: Meeting Summary

Prompt:
"From this meeting transcript, extract:

**Attendees**: Who was present
**Date/Time**: When it occurred
**Key Decisions**: What was decided (numbered)
**Action Items**:
- [ ] Task (Owner, Due Date)
**Open Questions**: Unresolved issues
**Next Steps**: What happens next

Format as clear, scannable notes."
```



### Mẫu phân tích đối thủ cạnh tranh



```
Name: Competitor Analysis

Prompt:
"Analyze this company/product document:

**Company**: Name and overview
**Products/Services**: What they offer
**Target Market**: Who they serve
**Pricing**: If available
**Strengths**: Competitive advantages
**Weaknesses**: Gaps or limitations
**Opportunities**: How we compare
**Threats**: What they do better

Be objective and cite specific details."
```



### Mẫu tài liệu kỹ thuật



```
Name: API Documentation Summary

Prompt:
"Extract from this technical document:

**Overview**: What does this do? (1-2 sentences)
**Authentication**: How to authenticate
**Key Endpoints**:
- Endpoint 1: [method] [path] - [purpose]
- Endpoint 2: ...
**Common Parameters**: Frequently used params
**Rate Limits**: If mentioned
**Error Codes**: Key error responses
**Example Usage**: Simple code example if possible

Keep technical but concise."
```



---

## Quản lý các chuyển đổi

### Chỉnh sửa một chuyển đổi



```
1. Go to Transformations page
2. Find your template
3. Click "Edit"
4. Modify the prompt
5. Click "Save"
```



### Xóa một chuyển đổi



```
1. Go to Transformations page
2. Find the template
3. Click "Delete"
4. Confirm
```



### Sắp xếp lại/Sắp xếp

Các phép biến đổi tích hợp xuất hiện đầu tiên, sau đó là các phép biến đổi tùy chỉnh theo thứ tự bảng chữ cái.

---

## Đầu ra chuyển đổi

### Kết quả sẽ đi về đâu

- Mỗi nguồn tạo ra một ghi chú
- Ghi chú xuất hiện trong bảng Ghi chú của sổ ghi chép của bạn
- Ghi chú được gắn thẻ với tên chuyển đổi
- Nguồn gốc được liên kết

### Lưu ý Đặt tên



```
Default: "[Transformation Name] - [Source Title]"
Example: "Summary - Research Paper 2025.pdf"
```



### Chỉnh sửa đầu ra



```
1. Click the generated note
2. Click "Edit"
3. Refine the content
4. Save
```



---

## Các phương pháp hay nhất

### Thiết kế mẫu

1. **Bắt đầu cụ thể** - Lời nhắc mơ hồ cho kết quả mơ hồ
2. **Sử dụng định dạng** - Tiêu đề, dấu đầu dòng, danh sách đánh số
3. **Yêu cầu trích dẫn** - Làm cho kết quả có thể kiểm chứng được
4. **Đặt độ dài** - Ngăn đầu ra quá dài hoặc quá ngắn
5. **Kiểm tra trước** - Chạy trên một nguồn trước hàng loạt

### Lựa chọn nguồn

1. **Nội dung tương tự** - Chuyển đổi tương tự trên các nguồn tương tự
2. **Kích thước hợp lý** - Các nguồn rất dài có thể cần tách
3. **Trạng thái đã xử lý** - Đảm bảo nguồn được xử lý đầy đủ

### Kiểm soát chất lượng

1. **Xem lại mẫu** - Kiểm tra một số đầu ra đầu tiên trước khi tin cậy vào lô
2. **Chỉnh sửa khi cần** - Biến đổi là điểm khởi đầu
3. **Lặp lại lời nhắc** - Tinh chỉnh dựa trên kết quả

---

## Các vấn đề thường gặp

### Đầu ra chung

**Vấn đề**: Kết quả quá mơ hồ
**Giải pháp**: Đưa ra lời nhắc cụ thể hơn, thêm yêu cầu về định dạng

### Thiếu thông tin

**Vấn đề**: Chi tiết chính không được trích xuất
**Giải pháp**: Yêu cầu rõ ràng những gì bạn cần ngay lập tức

### Định dạng không nhất quán

**Vấn đề**: Mỗi nốt nhạc trông khác nhau
**Giải pháp**: Thêm hướng dẫn định dạng rõ ràng vào lời nhắc

### Quá dài/ngắn

**Vấn đề**: Kết quả đầu ra không đáp ứng mong đợi
**Giải pháp**: Chỉ định số từ hoặc độ dài phần

### Xử lý không thành công

**Sự cố**: Quá trình chuyển đổi không hoàn tất
**Giải pháp**:
- Kiểm tra nguồn đã được xử lý
- Thử lời nhắc ngắn hơn/đơn giản hơn
- Xử lý nguồn riêng lẻ

---

## Chuyển đổi so với Trò chuyện và Hỏi

| Tính năng | Biến đổi | Trò chuyện | Hỏi |
|----------|-------|------|------|
| **Đầu vào** | Mẫu được xác định trước | Câu hỏi của bạn | Câu hỏi của bạn |
| **Phạm vi** | Một nguồn tại một thời điểm | Nguồn chọn lọc | Tự động tìm kiếm |
| **Đầu ra** | Ghi chú có cấu trúc | Cuộc trò chuyện | Câu trả lời toàn diện |
| **Tốt nhất cho** | Xử lý hàng loạt | Thăm dò | Câu trả lời một lần |
| **Theo dõi** | Chạy lại | Hỏi thêm | Truy vấn mới |

---

## Bản tóm tắt



```
Transformations = Batch AI Processing

How to use:
1. Define template (or use built-in)
2. Select sources
3. Apply transformation
4. Get structured notes

When to use:
- Same analysis on many sources
- Consistent output needed
- Building structured knowledge base
- Saving time on repetitive tasks

Tips:
- Be specific in prompts
- Request formatting
- Test before batch
- Edit output as needed
```



Các chuyển đổi biến phân tích lặp đi lặp lại thành các thao tác bằng một cú nhấp chuột. Xác định một lần, áp dụng nhiều lần.