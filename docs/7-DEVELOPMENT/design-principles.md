# Nguyên tắc thiết kế & Tầm nhìn dự án

Tài liệu này phác thảo các nguyên tắc cốt lõi, tầm nhìn và triết lý thiết kế hướng dẫn sự phát triển của Open Notebook. Tất cả những người đóng góp nên đọc và hiểu những nguyên tắc này trước khi đề xuất những thay đổi hoặc tính năng mới.

## 🎯 Tầm nhìn dự án

Open Notebook nhằm mục đích trở thành một giải pháp thay thế tự lưu trữ, tập trung vào quyền riêng tư cho Notebook LM của Google, cho phép người dùng:

1. **Sở hữu dữ liệu nghiên cứu của họ** - Toàn quyền kiểm soát nơi dữ liệu tồn tại và ai có thể truy cập dữ liệu đó
2. **Chọn nhà cung cấp AI của họ** - Tự do sử dụng bất kỳ nhà cung cấp AI nào hoặc chạy mô hình tại địa phương
3. **Tùy chỉnh quy trình công việc của họ** - Tính linh hoạt để điều chỉnh công cụ cho phù hợp với các nhu cầu nghiên cứu khác nhau
4. **Truy cập công việc của họ ở mọi nơi** - Thông qua giao diện người dùng web, API hoặc tích hợp

### Sổ tay mở là gì

- **Trợ lý nghiên cứu** để quản lý và hiểu nội dung
- Một **nền tảng** kết nối nhiều nhà cung cấp AI khác nhau
- Công cụ **ưu tiên quyền riêng tư** giúp bạn kiểm soát dữ liệu của mình
- Một **hệ thống có thể mở rộng** với các API và các tùy chọn tùy chỉnh

### Sổ tay mở KHÔNG PHẢI là gì

- Trình chỉnh sửa tài liệu (sử dụng Google Docs, Notion, v.v. cho việc đó)
- Hệ thống lưu trữ tệp (sử dụng Dropbox, S3, v.v. cho điều đó)
- Một chatbot đa năng (sử dụng ChatGPT, Claude, v.v.)
- Một sự thay thế cho toàn bộ quy trình làm việc của bạn (đó là một công cụ trong bộ công cụ của bạn)

## 🏗️ Nguyên tắc thiết kế cốt lõi

### 1. Quyền riêng tư là trên hết

**Nguyên tắc**: Theo mặc định, dữ liệu và nghiên cứu của người dùng phải nằm dưới sự kiểm soát của người dùng.

**Trong thực tế**:
- Triển khai tự lưu trữ là trường hợp sử dụng chính
- Không có phép đo từ xa hoặc phân tích mà không có sự đồng ý tham gia rõ ràng
- Không phụ thuộc nhiều vào các dịch vụ đám mây cụ thể
- Xóa tài liệu về dữ liệu đi đâu

**Các quyết định mẫu**:
- ✅ Hỗ trợ các mô hình Ollama địa phương
- ✅ Lựa chọn nhà cung cấp AI có thể định cấu hình
- ❌ Tích hợp dịch vụ đám mây được mã hóa cứng
- ❌ Bắt buộc phải phụ thuộc vào dịch vụ bên ngoài

### 2. Đơn giản hơn tính năng

**Nguyên tắc**: Công cụ phải dễ hiểu và dễ sử dụng, ngay cả khi có ít tính năng hơn.

**Trong thực tế**:
- Giao diện người dùng rõ ràng, tập trung với các phần được xác định rõ ràng
- Mặc định hợp lý phù hợp với hầu hết người dùng
- Các tính năng nâng cao ẩn sau cấu hình tùy chọn
- Tài liệu viết cho người dùng không rành về kỹ thuật

**Các quyết định mẫu**:
- ✅ Bố cục ba cột (Nguồn, Ghi chú, Trò chuyện)
- ✅ Các mô hình mặc định hoạt động tốt
- ❌ Khiến người dùng choáng ngợp với quá nhiều lựa chọn trả trước
- ❌ Quy trình làm việc phức tạp gồm nhiều bước cho các tác vụ cơ bản

### 3. Kiến trúc API đầu tiên

**Nguyên tắc**: Tất cả chức năng phải có thể truy cập được thông qua API, không chỉ giao diện người dùng.

**Trong thực tế**:
- Giao diện người dùng gọi cùng một API mà khách hàng bên ngoài sử dụng
- API REST toàn diện với tài liệu OpenAPI
- Không có tính năng "chỉ dành cho giao diện người dùng" không thể tự động hóa
- Tách biệt rõ ràng giữa frontend và backend

**Các quyết định mẫu**:
- ✅ Phụ trợ FastAPI với tài liệu API đầy đủ
- ✅ Mẫu API nhất quán trên tất cả các điểm cuối
- ❌ Logic nghiệp vụ trong các thành phần UI
- ❌ Các tính năng yêu cầu truy cập cơ sở dữ liệu trực tiếp

### 4. Tính linh hoạt của nhiều nhà cung cấp

**Nguyên tắc**: Người dùng không bao giờ bị ràng buộc vào một nhà cung cấp AI duy nhất.

**Trong thực tế**:
- Hỗ trợ nhiều nhà cung cấp AI thông qua thư viện Esperanto
- Dễ dàng chuyển đổi giữa nhà cung cấp và mô hình
- Tài liệu rõ ràng về các giới hạn của nhà cung cấp
- Suy thoái nhẹ nhàng khi không có nhà cung cấp

**Các quyết định mẫu**:
- ✅ Hỗ trợ hơn 16 nhà cung cấp AI
- ✅ Lựa chọn mô hình theo tính năng (trò chuyện, nhúng, TTS)
- ❌ Các tính năng chỉ hoạt động với OpenAI
- ❌ Điểm cuối API được mã hóa cứng cho các nhà cung cấp cụ thể

### 5. Khả năng mở rộng thông qua các tiêu chuẩn

**Nguyên tắc**: Hệ thống phải có khả năng mở rộng thông qua các giao diện được xác định rõ ràng chứ không phải bằng cách phân nhánh.

**Trong thực tế**:
- Hệ thống plugin để chuyển đổi và ra lệnh
- Định dạng dữ liệu tiêu chuẩn (JSON, Markdown)
- Xóa các điểm mở rộng trong kiến trúc
- Tài liệu cho các kịch bản tùy chỉnh phổ biến

**Các quyết định mẫu**:
- ✅ Mẫu chuyển đổi tùy chỉnh
- ✅ Hệ thống lệnh nền
- ✅ Mẫu lời nhắc Jinja2
- ❌ Logic nghiệp vụ được mã hóa cứng không có điểm mở rộng

### 6. Không đồng bộ đầu tiên cho hiệu suất

**Nguyên tắc**: Các hoạt động kéo dài không được chặn giao diện người dùng hoặc API.

**Trong thực tế**:
- Các mẫu không đồng bộ/chờ đợi trong suốt phần phụ trợ
- Xử lý công việc nền cho khối lượng công việc nặng
- Cập nhật trạng thái và theo dõi tiến độ
- Xử lý khéo léo các phản hồi chậm của nhà cung cấp AI

**Các quyết định mẫu**:
- ✅ AsyncIO cho hoạt động cơ sở dữ liệu
- ✅ Lệnh nền để tạo podcast
- ✅ Truyền phát phản hồi để trò chuyện
- ❌ Hoạt động chặn đồng bộ ở điểm cuối API

## 🎨 Nguyên tắc UI/UX

### Tập trung vào nội dung, không phải Chrome

- Giảm thiểu sự lộn xộn và phiền nhiễu của giao diện người dùng
- Nội dung nên chiếm phần lớn không gian màn hình
- Điều khiển xuất hiện khi cần thiết, không phải lúc nào cũng hiển thị
- Bố cục nhất quán trên các chế độ xem khác nhau

### Tiết lộ dần dần

- Hiển thị các tùy chọn đơn giản trước, tùy chọn nâng cao theo yêu cầu
- Đừng làm choáng ngợp người dùng mới với mọi cài đặt có thể
- Cung cấp các giá trị mặc định hợp lý phù hợp với 80% trường hợp sử dụng
- Làm cho các tính năng mạnh mẽ có thể được khám phá nhưng không xâm phạm

### Đáp ứng và nhanh chóng

- Giao diện người dùng sẽ có cảm giác tức thì đối với các thao tác thông thường
- Hiển thị trạng thái tải cho các hoạt động mất thời gian
- Cache và tối ưu hóa nếu có thể
- Suy thoái một cách duyên dáng trên các kết nối chậm

## 🔧 Nguyên tắc kỹ thuật

### Tách biệt rõ ràng các mối quan tâm

**Các lớp không được rò rỉ**:
- Frontend không nên biết về cấu trúc cơ sở dữ liệu
- API không được chứa logic nghiệp vụ (ủy quyền cho lớp miền)
- Các mô hình miền không nên biết về các yêu cầu HTTP
- Lớp cơ sở dữ liệu không nên biết về nhà cung cấp AI

### Loại an toàn và xác thực

**Bắt lỗi sớm**:
- Sử dụng mô hình Pydantic cho tất cả ranh giới API
- Nhập gợi ý xuyên suốt cơ sở mã Python
- TypeScript cho mã giao diện người dùng
- Xác thực dữ liệu tại ranh giới hệ thống

### Kiểm tra xem vấn đề gì

**Tập trung vào các bài kiểm tra có giá trị**:
- Kiểm tra logic nghiệp vụ và mô hình miền
- Kiểm tra hợp đồng API và xử lý lỗi
- Không kiểm tra mã khung (FastAPI, React, v.v.)
- Kiểm thử tích hợp cho các quy trình công việc quan trọng

### Cơ sở dữ liệu là nguồn sự thật

**SurrealDB là nguồn thông tin duy nhất của chúng tôi**:
- Tất cả trạng thái vẫn tồn tại trong cơ sở dữ liệu
- Không có logic nghiệp vụ trong lớp cơ sở dữ liệu
- Sử dụng tính năng SurrealDB (ghi liên kết, truy vấn) phù hợp
- Di chuyển lược đồ cho tất cả các thay đổi lược đồ

## 🚫 Những mẫu chống đối cần tránh

### Tính năng leo

**Nó trông như thế nào**:
- Thêm các tính năng vì chúng "hay" hoặc "dễ"
- Xây dựng tính năng cho các trường hợp biên trước khi các trường hợp thông thường hoạt động tốt
- Cố gắng trở thành tất cả mọi thứ cho mọi người

**Tại sao chúng ta tránh nó**:
- Tăng độ phức tạp và gánh nặng bảo trì
- Làm cho công cụ khó học và sử dụng hơn
- Làm loãng đề xuất giá trị cốt lõi

**Thay vào đó**:
- Tập trung vào các trường hợp sử dụng cốt lõi
- Nói không với những tính năng không phù hợp với tầm nhìn
- Xây dựng các điểm mở rộng cho các trường hợp biên

### Tối ưu hóa sớm

**Nó trông như thế nào**:
- Tối ưu code trước khi biết có chậm không
- Chiến lược bộ nhớ đệm phức tạp mà không đo lường tác động
- Mã giao dịch rõ ràng để tăng hiệu suất cận biên

**Tại sao chúng ta tránh nó**:
- Làm cho mã khó hiểu và khó bảo trì hơn
- Tối ưu hóa những điều sai trái
- Lãng phí thời gian phát triển

**Thay vào đó**:
- Đo lường trước, tối ưu hóa sau
- Tập trung vào cải tiến thuật toán
- Hồ sơ trước khi thực hiện thay đổi hiệu suất

### Kỹ thuật quá mức

**Nó trông như thế nào**:
- Xây dựng các lớp trừu tượng "trong trường hợp chúng ta cần chúng sau này"
- Triển khai các mẫu thiết kế cho hàm 3 dòng
- Tạo khuôn khổ thay vì giải quyết vấn đề

**Tại sao chúng ta tránh nó**:
- Tăng tải nhận thức cho người đóng góp
- Thực hiện những thay đổi đơn giản yêu cầu chạm vào nhiều tập tin
- Ẩn logic kinh doanh thực tế

**Thay vào đó**:
- Bắt đầu đơn giản, tái cấu trúc khi mẫu xuất hiện
- Tối ưu hóa cho khả năng đọc và rõ ràng
- Sử dụng sự trừu tượng khi chúng đơn giản hóa, không phức tạp

### Thay đổi gây lỗi nếu không có đường dẫn di chuyển

**Nó trông như thế nào**:
- Thay đổi lược đồ cơ sở dữ liệu mà không cần tập lệnh di chuyển
- Sửa đổi hợp đồng API mà không cần phiên bản
- Loại bỏ các tính năng mà không có cảnh báo không dùng nữa

**Tại sao chúng ta tránh nó**:
- Phá vỡ các cài đặt hiện có
- Gây thất vọng cho người dùng và người đóng góp
- Tạo ra những cơn ác mộng bảo trì

**Thay vào đó**:
- Luôn cung cấp tập lệnh di chuyển khi thay đổi lược đồ
- Không dùng nữa trước khi gỡ bỏ
- Tài liệu phá vỡ các thay đổi rõ ràng

## 🤝 Khung ra quyết định

Khi đánh giá các tính năng hoặc thay đổi mới, hãy hỏi:

### 1. Nó có phù hợp với tầm nhìn của chúng tôi không?
- Nó có giúp người dùng làm chủ dữ liệu nghiên cứu của mình không?
- Nó có hỗ trợ quyền riêng tư và tự lưu trữ không?
- Nó có phù hợp với trường hợp sử dụng cốt lõi của chúng tôi không?

### 2. Nó có tuân theo nguyên tắc của chúng tôi không?
- Sử dụng có đơn giản và dễ hiểu không?
- Nó có hoạt động thông qua API không?
- Nó có hỗ trợ nhiều nhà cung cấp không?
- Người dùng có thể mở rộng nó không?

### 3. Việc triển khai có hợp lý không?
- Nó có duy trì sự tách biệt các mối quan tâm không?
- Nó có được gõ và xác nhận đúng không?
- Nó có bao gồm các bài kiểm tra không?
- Nó có được ghi lại không?

### 4. Chi phí là bao nhiêu?
- Nó thêm bao nhiêu phức tạp?
- Gánh nặng bảo trì bao nhiêu?
- Nó có giới thiệu các phụ thuộc mới không?
- Liệu nó có được sử dụng đủ để biện minh cho chi phí không?

### 5. Có lựa chọn thay thế nào không?
- Các tính năng hiện có có thể giải quyết được vấn đề này không?
- Cái này có thể được xây dựng như một plugin hoặc tiện ích mở rộng không?
- Thay vào đó, đây có phải là một công cụ riêng biệt không?

## 📚 Ví dụ về các quyết định dựa trên nguyên tắc

### Tại sao chúng tôi di chuyển từ Streamlit sang Next.js

**Nguyên tắc**: Kiến trúc API đầu tiên

**Lý do**:
- Hợp lý hóa giao diện người dùng và logic phụ trợ
- Khó xây dựng sự tích hợp bên ngoài
- Kiểm soát hạn chế đối với hành vi API
- Next.js + FastAPI cung cấp sự phân tách rõ ràng

### Tại sao chúng tôi sử dụng Esperanto cho các nhà cung cấp AI

**Nguyên tắc**: Tính linh hoạt của nhiều nhà cung cấp

**Lý do**:
- Tóm tắt chi tiết cụ thể của nhà cung cấp
- Dễ dàng thêm nhà cung cấp mới
- Giao diện nhất quán giữa các nhà cung cấp
- Không khóa nhà cung cấp

### Tại sao chúng ta có Hệ thống lệnh nền

**Nguyên tắc**: Async-First for Performance

**Lý do**:
- Tạo podcast mất vài phút
- Người dùng không nên chờ đợi thao tác lâu
- Cần theo dõi trạng thái và xử lý lỗi
- Hỗ trợ hoạt động hàng loạt trong tương lai

### Tại sao chúng tôi hỗ trợ Ollama địa phương

**Nguyên tắc**: Quyền riêng tư là trên hết

**Lý do**:
- Cho phép hoạt động ngoại tuyến hoàn toàn
- Không có dữ liệu được gửi đến các dịch vụ bên ngoài
- Miễn phí cho người dùng sau chi phí phần cứng
- Phù hợp với triết lý tự lưu trữ

## 🔄 Sự phát triển của Nguyên tắc

Những nguyên tắc này không cố định. Khi dự án phát triển và chúng tôi học hỏi từ người dùng, một số nguyên tắc có thể phát triển. Tuy nhiên, những thay đổi đối với các nguyên tắc cốt lõi nên là:

1. **Chính đáng** - Lý do rõ ràng về lý do cần thay đổi
2. **Thảo luận cởi mở** - Ý kiến của cộng đồng về những thay đổi lớn
3. **Được ghi lại** - Đã cập nhật trong tài liệu này kèm theo lời giải thích
4. **Dần dần** - Không được triển khai dưới dạng các thay đổi đột phá khi có thể

---

## Dành cho người đóng góp

Khi đề xuất một tính năng hoặc thay đổi:

1. **Tham khảo các nguyên tắc này** - Giải thích cách đề xuất của bạn phù hợp
2. **Xác định sự đánh đổi** - Hãy trung thực về những gì bạn đang đánh đổi để lấy cái gì
3. **Đề xuất các lựa chọn thay thế** - Cho thấy bạn đã cân nhắc các phương pháp khác
4. **Cởi mở với phản hồi** - Người bảo trì có thể thấy những mối lo ngại mà bạn không thấy

**Hãy nhớ**: Việc "không" đối với một tính năng không phải là sự đánh giá về bạn hoặc ý tưởng của bạn. Điều đó có nghĩa là chúng tôi đang tập trung vào tầm nhìn cốt lõi của mình. Chúng tôi đánh giá cao mọi đóng góp và ý tưởng!

---

**Bạn có câu hỏi về những nguyên tắc này?** Mở một cuộc thảo luận trên GitHub hoặc tham gia [Discord](https://discord.gg/37XJPXfz2w) của chúng tôi.