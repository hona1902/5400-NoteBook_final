#Hướng dẫn bảo trì

Hướng dẫn này dành cho những người bảo trì dự án để giúp quản lý các khoản đóng góp một cách hiệu quả đồng thời duy trì chất lượng và tầm nhìn của dự án.

## Mục lục

- [Quản lý vấn đề](#issue-management)
- [Đánh giá yêu cầu kéo](#pull-request-review)
- [Kịch bản chung](#common-scenarios)
- [Mẫu giao tiếp](#communication-templates)

## Quản lý vấn đề

### Khi một vấn đề mới được tạo

**1. Phân loại ban đầu** (trong vòng 24-48 giờ)

- Thêm nhãn thích hợp:
  - `lỗi`, `nâng cao`, `tài liệu`, v.v.
  - `vấn đề đầu tiên hay` dành cho các nhiệm vụ thân thiện với người mới bắt đầu
  - `phân loại nhu cầu` cho đến khi được xem xét
  - `cần trợ giúp` nếu bạn hoan nghênh sự đóng góp của cộng đồng

- Đánh giá nhanh:
  - Nó có rõ ràng và được mô tả tốt không?
  - Nó có phù hợp với tầm nhìn của dự án không? (Xem [design-principles.md](design-principles.md))
  - Nó có trùng lặp một vấn đề hiện có không?

**2. Phản hồi ban đầu**



```markdown
Thanks for opening this issue! We'll review it and get back to you soon.

[If it's a bug] In the meantime, have you checked our troubleshooting guide?

[If it's a feature] You might find our [design principles](design-principles.md) helpful for understanding what we're building toward.
```



**3. Ra quyết định**

Hãy tự hỏi:
- Điều này có phù hợp với [nguyên tắc thiết kế](design-principles.md) của chúng tôi không?
- Đây có phải là thứ chúng tôi muốn trong dự án cốt lõi hay tốt hơn là dưới dạng plugin/tiện ích mở rộng?
- Chúng tôi có đủ khả năng hỗ trợ tính năng này lâu dài không?
- Điều này có mang lại lợi ích cho hầu hết người dùng hay chỉ một trường hợp sử dụng cụ thể?

**4. Vấn đề bài tập**

Nếu người đóng góp chọn "Tôi là nhà phát triển và muốn làm việc này":

**Đối với các vấn đề được chấp nhận:**

```markdown
Great idea! This aligns well with our goals, particularly [specific design principle].

I see you'd like to work on this. Before you start:

1. Please share your proposed approach/solution
2. Review our [Contributing Guide](contributing.md) and [Design Principles](design-principles.md)
3. Once we agree on the approach, I'll assign this to you

Looking forward to your thoughts!
```



**Đối với các vấn đề cần làm rõ:**

```markdown
Thanks for offering to work on this! Before we proceed, we need to clarify a few things:

1. [Question 1]
2. [Question 2]

Once we have these details, we can discuss the best approach.
```



**Đối với các vấn đề không phù hợp với tầm nhìn:**

```markdown
Thank you for the suggestion and for offering to work on this!

After reviewing against our [design principles](design-principles.md), we've decided not to pursue this in the core project because [specific reason].

However, you might be able to achieve this through [alternative approach, if applicable].

We appreciate your interest in contributing! Feel free to check out our [open issues](link) for other ways to contribute.
```



### Nhãn để sử dụng

**Ưu tiên:**
- `ưu tiên: quan trọng` - Vấn đề bảo mật, lỗi mất dữ liệu
- `ưu tiên: cao` - Chức năng chính bị hỏng
- `ưu tiên: trung bình` - Lỗi khó chịu, tính năng hữu ích
- `ưu tiên: thấp` - Rất vui khi có, các trường hợp khó khăn

**Trạng thái:**
- `cần-phân loại` - Chưa được người bảo trì xem xét
- `needs-info` - Chờ thêm thông tin từ phóng viên
- `needs-discussion` - Yêu cầu thảo luận của cộng đồng/nhóm
- `ready` - Đã được phê duyệt và sẵn sàng để bắt tay vào thực hiện
- `đang tiến hành` - Có người đang tích cực làm việc này
- `bị chặn` - Không thể tiếp tục do phụ thuộc vào bên ngoài

**Loại:**
- `bug` - Có gì đó bị hỏng
- `nâng cao` - Tính năng hoặc cải tiến mới
- `tài liệu` - Cải tiến tài liệu
- `câu hỏi` - Câu hỏi chung
- `refactor` - Dọn dẹp/tái cấu trúc mã

**Độ khó:**
- `vấn đề đầu tiên hay` - Tốt cho người mới
- `cần giúp đỡ` - Hoan nghênh sự đóng góp của cộng đồng
- `nâng cao` - Yêu cầu kiến thức sâu về codebase

## Xem xét yêu cầu kéo

### Danh sách kiểm tra đánh giá PR ban đầu

**Trước khi đi sâu vào mã:**

- [ ] Có vấn đề liên quan nào được phê duyệt không?
- [ ] PR có tham chiếu đến số phát hành không?
- [ ] Mô tả PR có rõ ràng về những gì đã thay đổi và tại sao không?
- [ ] Cộng tác viên có đánh dấu vào các ô liên quan trong mẫu PR không?
- [ ] Có bài kiểm tra không? Ảnh chụp màn hình (để thay đổi giao diện người dùng)?

**Cờ đỏ** (có thể yêu cầu đóng PR):
- Không có vấn đề liên quan
- Vấn đề chưa được giao cho người đóng góp
- PR cố gắng giải quyết nhiều vấn đề không liên quan
- Phá vỡ những thay đổi mà không cần thảo luận
- Xung đột với tầm nhìn dự án

### Quy trình xét duyệt mã

**1. Đánh giá cấp cao**

- Cách tiếp cận này có phù hợp với kiến ​​trúc của chúng tôi không?
- Giải pháp có phạm vi phù hợp không?
- Có lựa chọn thay thế nào đơn giản hơn không?
- Nó có tuân theo nguyên tắc thiết kế của chúng tôi không?

**2. Đánh giá chất lượng mã**

Trăn:
- [ ] Theo PEP 8
- [] Có gợi ý về loại
- [] Có tài liệu
- [ ] Xử lý lỗi thích hợp
- [ ] Không có lỗ hổng bảo mật

TypeScript/Giao diện người dùng:
- [ ] Tuân theo các phương pháp hay nhất của TypeScript
- [ ] Cấu trúc thành phần phù hợp
- [] Không còn console.log nào trong mã sản xuất
- [] Các thành phần giao diện người dùng có thể truy cập được

**3. Đánh giá thử nghiệm**

- [ ] Có phạm vi kiểm tra phù hợp
- [ ] Các thử nghiệm rất có ý nghĩa (không chỉ đối với tỷ lệ phần trăm bao phủ)
- [ ] Các bài kiểm tra đạt tại địa phương và trong CI
- [ ] Các trường hợp cạnh đã được thử nghiệm

**4. Đánh giá tài liệu**

- [ ] Code được bình luận tốt
- [ ] Logic phức tạp được giải thích
- [ ] Đã cập nhật tài liệu hướng tới người dùng (nếu có)
- [ ] Tài liệu API được cập nhật (nếu API thay đổi)
- [ ] Hướng dẫn di chuyển được cung cấp (nếu có thay đổi)

### Cung cấp phản hồi

**Phản hồi tích cực** (quan trọng!):

```markdown
Thanks for this PR! I really like [specific thing they did well].

[Feedback on what needs to change]
```



**Yêu cầu thay đổi:**

```markdown
This is a great start! A few things to address:

1. **[High-level concern]**: [Explanation and suggested approach]
2. **[Code quality issue]**: [Specific example and fix]
3. **[Testing gap]**: [What scenarios need coverage]

Let me know if you have questions about any of this!
```



**Đề xuất phương pháp thay thế:**

```markdown
I appreciate the effort you put into this! However, I'm concerned about [specific issue].

Have you considered [alternative approach]? It might be better because [reasons].

What do you think?
```



## Các tình huống phổ biến

### Kịch bản 1: Code tốt, cách tiếp cận sai

**Tình huống**: Người đóng góp đã viết mã chất lượng nhưng lại giải quyết vấn đề theo cách không phù hợp với kiến ​​trúc của chúng tôi.

**Phản ứng:**

```markdown
Thank you for this PR! The code quality is great, and I can see you put thought into this.

However, I'm concerned that this approach [specific architectural concern]. In our architecture, we [explain the pattern we follow].

Would you be open to refactoring this to [suggested approach]? I'm happy to provide guidance on the specifics.

Alternatively, if you don't have time for a refactor, I can take over and finish this up (with credit to you, of course).

Let me know what you prefer!
```



### Tình huống 2: PR không được chỉ định

**Tình huống**: Cộng tác viên đã gửi PR mà không trải qua quá trình phê duyệt vấn đề.

**Phản ứng:**

```markdown
Thanks for the PR! I appreciate you taking the time to contribute.

However, to maintain project coherence, we require all PRs to be linked to an approved issue that was assigned to the contributor. This is explained in our [Contributing Guide](contributing.md).

This helps us:
- Ensure work aligns with project vision
- Prevent duplicate efforts
- Discuss approach before implementation

Could you please:
1. Create an issue describing this change
2. Wait for it to be reviewed and assigned to you
3. We can then reopen this PR or you can create a new one

Sorry for the inconvenience - this process helps us manage the project effectively.
```



### Tình huống 3: Yêu cầu tính năng không phù hợp với tầm nhìn

**Tình huống**: Tính năng có thiện chí nhưng không phù hợp với mục tiêu của dự án.

**Phản ứng:**

```markdown
Thank you for this suggestion! I can see how this would be useful for [specific use case].

After reviewing against our [design principles](design-principles.md), we've decided not to include this in the core project because [specific reason - e.g., "it conflicts with our 'Simplicity Over Features' principle" or "it would require dependencies that conflict with our privacy-first approach"].

Some alternatives:
- [If applicable] This could be built as a plugin/extension
- [If applicable] This functionality might be achievable through [existing feature]
- [If applicable] You might be interested in [other tool] which is designed for this use case

We appreciate your contribution and hope you understand. Feel free to check our roadmap or open issues for other ways to contribute!
```



### Kịch bản 4: Bóng ma của cộng tác viên sau khi phản hồi

**Tình huống**: Bạn đã yêu cầu thay đổi nhưng cộng tác viên chưa phản hồi sau hơn 2 tuần.

**Sau 2 tuần:**

```markdown
Hey there! Just checking in on this PR. Do you have time to address the feedback, or would you like someone else to take over?

No pressure either way - just want to make sure this doesn't fall through the cracks.
```



**Sau 1 tháng không có phản hồi:**

```markdown
Thanks again for starting this work! Since we haven't heard back, I'm going to close this PR for now.

If you want to pick this up again in the future, feel free to reopen it or create a new PR. Alternatively, I'll mark the issue as available for someone else to work on.

We appreciate your contribution!
```



Sau đó:
- Đóng PR
- Bỏ gán vấn đề
- Thêm nhãn `cần trợ giúp` vào vấn đề

### Kịch bản 5: Thay đổi đột phá mà không cần thảo luận

**Tình huống**: PR giới thiệu những thay đổi đột phá chưa được thảo luận.

**Phản ứng:**

```markdown
Thanks for this PR! However, I notice this introduces breaking changes that weren't discussed in the original issue.

Breaking changes require:
1. Prior discussion and approval
2. Migration guide for users
3. Deprecation period (when possible)
4. Clear documentation of the change

Could we discuss the breaking changes first? Specifically:
- [What breaks and why]
- [Who will be affected]
- [Migration path]

We may need to adjust the approach to minimize impact on existing users.
```



## Mẫu giao tiếp

### Kết thúc một PR (Không phù hợp với Tầm nhìn)



```markdown
Thank you for taking the time to contribute! We really appreciate it.

After careful review, we've decided not to merge this PR because [specific reason related to design principles].

This isn't a reflection on your code quality - it's about maintaining focus on our core goals as outlined in [design-principles.md](design-principles.md).

We'd love to have you contribute in other ways! Check out:
- Good first issues
- Help wanted issues
- Our roadmap

Thanks again for your interest in Open Notebook!
```



### Đóng một vấn đề cũ



```markdown
We're closing this issue due to inactivity. If this is still relevant, feel free to reopen it with updated information.

Thanks!
```



### Hỏi thêm thông tin



```markdown
Thanks for reporting this! To help us investigate, could you provide:

1. [Specific information needed]
2. [Logs, screenshots, etc.]
3. [Steps to reproduce]

This will help us understand the issue better and find a solution.
```



### Cảm ơn người đóng góp



```markdown
Merged!

Thank you so much for this contribution, @username! [Specific thing they did well].

This will be included in the next release.
```



## Các phương pháp hay nhất

### Hãy tử tế và tôn trọng

- Cảm ơn những người đóng góp vì thời gian và công sức của họ
- Có ý định tốt
- Kiên nhẫn với người mới
- Giải thích *tại sao*, không chỉ *cái gì*

### Hãy rõ ràng và trực tiếp

- Đừng mơ hồ về các bước tiếp theo
- Nêu cụ thể những gì cần thay đổi
- Giải thích các quyết định kiến trúc
- Đặt kỳ vọng rõ ràng

### Hãy nhất quán

- Áp dụng các tiêu chuẩn giống nhau cho tất cả những người đóng góp
- Thực hiện theo quy trình bạn đã xác định
- Quyết định tài liệu để tham khảo trong tương lai

### Hãy bảo vệ tầm nhìn của dự án

- Có thể nói "không"
- Ưu tiên khả năng bảo trì lâu dài
- Không chấp nhận các tính năng mà bạn không thể hỗ trợ
- Giữ dự án tập trung

### Hãy phản ứng nhanh

- Trả lời các vấn đề trong vòng 48 giờ (thậm chí chỉ để xác nhận)
- Xem xét PR trong vòng một tuần khi có thể
- Giữ cho người đóng góp được cập nhật về trạng thái
- Đóng các vấn đề/PR cũ để giữ mọi thứ gọn gàng

## Khi nghi ngờ

Hãy tự hỏi:
1. Điều này có phù hợp với [nguyên tắc thiết kế](design-principles.md) của chúng tôi không?
2. Liệu chúng tôi có thể duy trì tính năng này lâu dài không?
3. Điều này có mang lại lợi ích cho hầu hết người dùng hay chỉ là một trường hợp đặc biệt?
4. Có cách thay thế nào đơn giản hơn không?
5. Tôi có muốn hỗ trợ việc này trong 2 năm nữa không?

Nếu bạn không chắc chắn, bạn hoàn toàn có thể:
- Yêu cầu đầu vào từ những người bảo trì khác
- Bắt đầu một vấn đề thảo luận
- Hãy cân nhắc trước khi đưa ra quyết định

---

**Hãy nhớ**: Khả năng bảo trì tốt là việc cân bằng giữa tính cởi mở trong việc đóng góp với việc bảo vệ tầm nhìn của dự án. Bạn sẽ không ác ý khi nói "không" với những thứ không phù hợp - bạn đang là người quản lý có trách nhiệm của dự án.