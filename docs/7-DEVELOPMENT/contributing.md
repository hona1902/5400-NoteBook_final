# Góp phần mở Notebook

Cảm ơn bạn đã quan tâm đóng góp cho Open Notebook! Chúng tôi hoan nghênh sự đóng góp từ các nhà phát triển ở mọi cấp độ kỹ năng. Hướng dẫn này sẽ giúp bạn hiểu quy trình đóng góp của chúng tôi và điều gì tạo nên sự đóng góp tốt.

## 🚨 Quy trình làm việc đầu tiên

**Để duy trì sự mạch lạc của dự án và tránh lãng phí công sức, vui lòng làm theo quy trình sau:**

1. **Tạo vấn đề trước** - Trước khi viết bất kỳ mã nào, hãy tạo một vấn đề mô tả lỗi hoặc tính năng
2. **Đề xuất giải pháp của bạn** - Giải thích cách bạn dự định triển khai bản sửa lỗi hoặc tính năng
3. **Chờ phân công** - Người bảo trì sẽ xem xét và giao vấn đề cho bạn nếu được phê duyệt
4. **Chỉ sau đó mới bắt đầu viết mã** - Điều này đảm bảo công việc của bạn phù hợp với tầm nhìn và kiến trúc của dự án

**Tại sao lại có quá trình này?**
- Ngăn chặn công việc trùng lặp
- Đảm bảo các giải pháp phù hợp với nguyên tắc kiến trúc và thiết kế của chúng tôi
- Tiết kiệm thời gian của bạn bằng cách nhận phản hồi trước khi mã hóa
- Giúp người bảo trì quản lý hướng dự án

> ⚠️ **Các yêu cầu kéo không có vấn đề được chỉ định có thể bị đóng**, ngay cả khi mã tốt. Chúng tôi muốn tôn trọng thời gian của bạn bằng cách đảm bảo công việc được sắp xếp hợp lý trước khi bắt đầu.

## Quy tắc ứng xử

Bằng cách tham gia vào dự án này, bạn phải tuân thủ Quy tắc ứng xử của chúng tôi. Hãy tôn trọng, xây dựng và hợp tác.

## Tôi có thể đóng góp như thế nào?

### Báo cáo lỗi

1. **Tìm kiếm các sự cố hiện có** - Kiểm tra xem lỗi đã được báo cáo chưa
2. **Tạo báo cáo lỗi** - Sử dụng [Mẫu báo cáo lỗi](https://github.com/lfnovo/open-notebook/issues/new?template=bug_report.yml)
3. **Cung cấp thông tin chi tiết** - Bao gồm:
   - Các bước tái hiện
   - Hành vi dự kiến và hành vi thực tế
   - Nhật ký, ảnh chụp màn hình hoặc thông báo lỗi
   - Môi trường của bạn (OS, phiên bản Docker, phiên bản Open Notebook)
4. **Cho biết bạn có muốn khắc phục không** - Đánh dấu vào ô "Tôi muốn làm việc này" nếu bạn quan tâm

### Tính năng gợi ý

1. **Tìm kiếm các vấn đề hiện có** - Kiểm tra xem tính năng này đã được đề xuất chưa
2. **Tạo yêu cầu tính năng** - Sử dụng [Mẫu yêu cầu tính năng](https://github.com/lfnovo/open-notebook/issues/new?template=feature_request.yml)
3. **Giải thích giá trị** - Mô tả lý do tại sao tính năng này lại hữu ích
4. **Đề xuất thực hiện** - Nếu bạn có ý tưởng về cách thực hiện, hãy chia sẻ chúng
5. **Cho biết bạn có muốn xây dựng nó không** - Đánh dấu vào ô "Tôi muốn làm việc này" nếu bạn quan tâm

### Mã đóng góp (Yêu cầu kéo)

**QUAN TRỌNG: Thực hiện theo quy trình xử lý sự cố đầu tiên ở trên trước khi bắt đầu bất kỳ hoạt động PR nào**

Sau khi vấn đề của bạn được chỉ định:

1. **Fork repo** và tạo nhánh của bạn từ `main`
2. **Hiểu rõ tầm nhìn và nguyên tắc của chúng tôi** - Đọc [design-principles.md](design-principles.md) để hiểu điều gì dẫn dắt các quyết định của chúng tôi
3. **Theo dõi kiến trúc của chúng tôi** - Tham khảo tài liệu kiến trúc để hiểu cấu trúc dự án
4. **Viết mã chất lượng** - Tuân theo các tiêu chuẩn được nêu trong [code-standards.md](code-standards.md)
5. **Kiểm tra các thay đổi của bạn** - Xem [testing.md](testing.md) để biết hướng dẫn kiểm tra
6. **Cập nhật tài liệu** - Nếu bạn thay đổi chức năng, hãy cập nhật các tài liệu liên quan
7. **Tạo PR của bạn**:
   - Tham chiếu số vấn đề (ví dụ: "Bản sửa lỗi #123")
   - Mô tả những gì đã thay đổi và tại sao
   - Bao gồm ảnh chụp màn hình để thay đổi giao diện người dùng
   - Giữ PR tập trung - một vấn đề cho mỗi PR

### Điều gì tạo nên sự đóng góp tốt?

✅ **Chúng tôi yêu thích những PR:**
- Giải quyết một vấn đề thực tế được mô tả trong một vấn đề
- Tuân theo các tiêu chuẩn về kiến trúc và mã hóa của chúng tôi
- Bao gồm các bài kiểm tra và tài liệu
- Có phạm vi tốt (tập trung vào một điều)
- Có thông điệp cam kết rõ ràng

❌ **Chúng tôi có thể đóng các PR:**
- Không có vấn đề liên quan được phê duyệt
- Đưa ra những thay đổi mang tính đột phá mà không cần thảo luận
- Xung đột với tầm nhìn kiến trúc của chúng tôi
- Thiếu các bài kiểm tra hoặc tài liệu
- Cố gắng giải quyết nhiều vấn đề không liên quan

## Tin nhắn cam kết Git

- Dùng thì hiện tại ("Thêm tính năng" chứ không phải "Thêm tính năng")
- Sử dụng thể mệnh lệnh ("Di chuyển con trỏ tới..." chứ không phải "Di chuyển con trỏ tới...")
- Giới hạn dòng đầu tiên ở mức 72 ký tự trở xuống
- Tham khảo các vấn đề và kéo các yêu cầu một cách tự do sau dòng đầu tiên

## Quy trình phát triển

### Chiến lược chi nhánh

Chúng tôi sử dụng **quy trình làm việc của nhánh tính năng**:

1. **Chi nhánh chính**: `main` - mã sẵn sàng sản xuất
2. **Nhánh tính năng**: `feature/description` - tính năng mới
3. **Sửa lỗi**: `sửa/mô tả` - sửa lỗi
4. **Tài liệu**: `docs/description` - cập nhật tài liệu

### Thực hiện thay đổi

1. **Tạo một nhánh tính năng**:

```bash
git checkout -b feature/amazing-new-feature
```



2. **Thực hiện các thay đổi** theo tiêu chuẩn mã hóa của chúng tôi

3. **Kiểm tra các thay đổi của bạn**:

```bash
# Run tests
uv run pytest

# Run linting
uv run ruff check .

# Run formatting
uv run ruff format .
```



4. **Cam kết thay đổi của bạn**:

```bash
git add .
git commit -m "feat: add amazing new feature"
```



5. **Đẩy và tạo PR**:

```bash
git push origin feature/amazing-new-feature
# Then create a Pull Request on GitHub
```



### Luôn cập nhật fork của bạn



```bash
# Fetch upstream changes
git fetch upstream

# Switch to main and merge
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```



## Quá trình yêu cầu kéo

Khi bạn tạo một yêu cầu kéo:

1. **Liên kết vấn đề của bạn** - Tham khảo số vấn đề trong mô tả PR
2. **Mô tả những thay đổi của bạn** - Giải thích những gì đã thay đổi và tại sao
3. **Cung cấp bằng chứng kiểm tra** - Ảnh chụp màn hình, kết quả kiểm tra hoặc nhật ký
4. **Kiểm tra mẫu PR** - Đảm bảo bạn đã hoàn thành tất cả các phần được yêu cầu
5. **Chờ xem xét** - Người bảo trì sẽ xem xét PR của bạn trong vòng một tuần

### Kỳ vọng xét duyệt PR

- Phản hồi đánh giá mã là về mã chứ không phải con người
- Cởi mở với những gợi ý và phương pháp tiếp cận thay thế
- Giải quyết các nhận xét đánh giá một cách rõ ràng và tôn trọng
- Đặt câu hỏi nếu phản hồi không rõ ràng

## Lĩnh vực ưu tiên hiện tại

Chúng tôi đang tích cực tìm kiếm sự đóng góp trong các lĩnh vực sau:

1. **Cải tiến giao diện người dùng** - Giúp cải thiện giao diện người dùng Next.js/React với các bản cập nhật theo thời gian thực và UX tốt hơn
2. **Thử nghiệm** - Mở rộng phạm vi thử nghiệm trên tất cả các thành phần
3. **Hiệu suất** - Cải tiến xử lý không đồng bộ và bộ nhớ đệm
4. **Tài liệu** - Ví dụ về API và hướng dẫn sử dụng
5. **Tích hợp** - Nguồn nội dung mới và nhà cung cấp AI

## Nhận trợ giúp

### Hỗ trợ cộng đồng

- **Discord**: [Tham gia máy chủ Discord của chúng tôi](https://discord.gg/37XJPXfz2w) để được trợ giúp theo thời gian thực
- **Thảo luận GitHub**: Dành cho các câu hỏi và ý tưởng dài hơn
- **Vấn đề về GitHub**: Dành cho báo cáo lỗi và yêu cầu tính năng

### Tài liệu tham khảo

- [Nguyên tắc thiết kế](design-principles.md) - Hiểu tầm nhìn dự án của chúng tôi
- [Tiêu chuẩn mã](code-standards.md) - Hướng dẫn mã hóa theo ngôn ngữ
- [Hướng dẫn kiểm tra](testing.md) - Cách viết bài kiểm tra
- [Thiết lập phát triển]( Development-setup.md) - Bắt đầu cục bộ

## Sự công nhận

Chúng tôi ghi nhận những đóng góp thông qua:

- **Tín dụng GitHub** cho các bản phát hành
- **Sự công nhận của cộng đồng** trong Discord
- **Thống kê đóng góp** trong phân tích dự án
- **Cân nhắc người duy trì** dành cho những người đóng góp tích cực

---

Cảm ơn bạn đã đóng góp cho Open Notebook! Những đóng góp của bạn giúp làm cho nghiên cứu trở nên dễ tiếp cận và riêng tư hơn đối với mọi người.

Nếu có câu hỏi về hướng dẫn này hoặc đóng góp nói chung, vui lòng liên hệ trên [Discord](https://discord.gg/37XJPXfz2w) hoặc mở Thảo luận GitHub.