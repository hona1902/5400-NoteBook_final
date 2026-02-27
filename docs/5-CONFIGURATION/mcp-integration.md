# Tích hợp Giao thức bối cảnh mô hình (MCP)

Open Notebook có thể được tích hợp liền mạch vào quy trình làm việc AI của bạn bằng cách sử dụng **Giao thức bối cảnh mô hình (MCP)**, cho phép truy cập trực tiếp vào sổ ghi chép, nguồn và chức năng trò chuyện của bạn từ các trợ lý AI như Claude Desktop và tiện ích mở rộng VS Code.

##MCP là gì?

[Giao thức bối cảnh mô hình](https://modelcontextprotocol.io) là một tiêu chuẩn mở cho phép các ứng dụng AI kết nối an toàn với các công cụ và nguồn dữ liệu bên ngoài. Với máy chủ Open Notebook MCP, bạn có thể:

- 📚 **Truy cập sổ ghi chép của bạn** trực tiếp từ Claude Desktop hoặc VS Code
- 🔍 **Tìm kiếm nội dung nghiên cứu của bạn** mà không cần rời khỏi trợ lý AI của bạn
- 💬 **Tạo và quản lý các phiên trò chuyện** lấy nghiên cứu của bạn làm bối cảnh
- 📝 **Tạo ghi chú** và thông tin chi tiết một cách nhanh chóng
- 🤖 **Tự động hóa quy trình công việc** bằng cách sử dụng API Open Notebook đầy đủ

## Thiết lập nhanh

### Dành cho máy tính để bàn Claude

1. **Cài đặt máy chủ MCP** (tự động từ PyPI):



```bash
   # No manual installation needed! Claude Desktop will use uvx to run it automatically
   ```



2. **Cấu hình Claude Desktop**:

**macOS/Linux**: Chỉnh sửa `~/Library/Application Support/Claude/claude_desktop_config.json`



```json
   {
     "mcpServers": {
       "open-notebook": {
         "command": "uvx",
         "args": ["open-notebook-mcp"],
         "env": {
           "OPEN_NOTEBOOK_URL": "http://localhost:5055",
           "OPEN_NOTEBOOK_PASSWORD": "your_password_here"
         }
       }
     }
   }
   ```



**Windows**: Chỉnh sửa `%APPDATA%\Claude\claude_desktop_config.json`



```json
   {
     "mcpServers": {
       "open-notebook": {
         "command": "uvx",
         "args": ["open-notebook-mcp"],
         "env": {
           "OPEN_NOTEBOOK_URL": "http://localhost:5055",
           "OPEN_NOTEBOOK_PASSWORD": "your_password_here"
         }
       }
     }
   }
   ```



3. **Khởi động lại Claude Desktop** và bắt đầu sử dụng sổ ghi chép của bạn trong các cuộc trò chuyện!

### Dành cho Mã VS (Cline và các tiện ích mở rộng tương thích với MCP khác)

Thêm vào cài đặt Mã VS của bạn hoặc `.vscode/mcp.json`:



```json
{
  "servers": {
    "open-notebook": {
      "command": "uvx",
      "args": ["open-notebook-mcp"],
      "env": {
        "OPEN_NOTEBOOK_URL": "http://localhost:5055",
        "OPEN_NOTEBOOK_PASSWORD": "your_password_here"
      }
    }
  }
}
```



## Cấu hình

- **OPEN_NOTEBOOK_URL**: URL tới API Open Notebook của bạn (mặc định: `http://localhost:5055`)
- **OPEN_NOTEBOOK_PASSWORD**: Tùy chọn - chỉ cần nếu bạn đã bật bảo vệ bằng mật khẩu

### Dành cho máy chủ từ xa

Nếu phiên bản Open Notebook của bạn đang chạy trên máy chủ từ xa, hãy cập nhật URL tương ứng:



```json
"OPEN_NOTEBOOK_URL": "http://192.168.1.100:5055"
```



Hoặc với một tên miền:



```json
"OPEN_NOTEBOOK_URL": "https://notebook.yourdomain.com/api"
```



## Bạn có thể làm gì

Sau khi kết nối, bạn có thể yêu cầu Claude hoặc trợ lý AI của bạn:

- _"Tìm kiếm sổ ghi chép nghiên cứu của tôi để biết thông tin về [chủ đề]"_
- _"Tạo một ghi chú mới tóm tắt những điểm chính trong cuộc trò chuyện của chúng ta"_
- _"Liệt kê tất cả sổ ghi chép của tôi"_
- _"Bắt đầu phiên trò chuyện về [nguồn hoặc chủ đề cụ thể]"_
- _"Tôi có những nguồn nào trong sổ tay [tên sổ ghi chép] của mình?"_
- _"Thêm bản PDF này vào sổ tay nghiên cứu của tôi"_
- _"Cho tôi xem tất cả ghi chú trong [tên sổ ghi chép]"_

Máy chủ MCP cung cấp quyền truy cập đầy đủ vào các khả năng của Open Notebook, cho phép bạn quản lý nghiên cứu của mình một cách liền mạch từ bên trong trợ lý AI của mình.

## Công cụ có sẵn

Máy chủ Open Notebook MCP thể hiện các khả năng sau:

### Sổ tay

- Liệt kê sổ ghi chép
- Nhận chi tiết máy tính xách tay
- Tạo sổ ghi chép mới
- Cập nhật thông tin sổ ghi chép
- Xóa sổ ghi chép

### Nguồn

- Liệt kê các nguồn vào sổ ghi chép
- Nhận chi tiết nguồn
- Thêm nguồn mới (liên kết, tập tin, văn bản)
- Cập nhật siêu dữ liệu nguồn
- Xóa nguồn

### Ghi chú

- Liệt kê các ghi chú vào sổ tay
- Nhận chi tiết ghi chú
- Tạo ghi chú mới
- Cập nhật ghi chú
- Xóa ghi chú

### Trò chuyện

- Tạo phiên trò chuyện
- Gửi tin nhắn đến các phiên trò chuyện
- Nhận lịch sử trò chuyện
- Liệt kê các phiên trò chuyện

### Tìm kiếm

- Tìm kiếm Vector trên toàn bộ nội dung
- Tìm kiếm văn bản trên toàn bộ nội dung
- Lọc theo sổ tay

### Người mẫu

- Liệt kê các mô hình AI đã được cấu hình
- Nhận chi tiết mô hình
- Tạo cấu hình mô hình
- Cập nhật cài đặt mô hình

### Cài đặt

- Nhận cài đặt ứng dụng
- Cập nhật cài đặt

## Kho lưu trữ máy chủ MCP

Máy chủ Open Notebook MCP được phát triển và duy trì bởi nhóm Epochal:

**🔗 GitHub**: [Epochal-dev/open-notebook-mcp](https://github.com/Epochal-dev/open-notebook-mcp)

Đóng góp, vấn đề và yêu cầu tính năng đều được chào đón!

## Tìm máy chủ

Máy chủ MCP Open Notebook được xuất bản lên Cơ quan đăng ký MCP chính thức:

- **Registry**: Tìm kiếm "open-notebook" tại [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io)
- **PyPI**: [pypi.org/project/open-notebook-mcp](https://pypi.org/project/open-notebook-mcp)
- **GitHub**: [Epochal-dev/open-notebook-mcp](https://github.com/Epochal-dev/open-notebook-mcp)

## Khắc phục sự cố

### Lỗi kết nối

1. Xác minh `OPEN_NOTEBOOK_URL` là chính xác và có thể truy cập được
2. Nếu sử dụng bảo vệ bằng mật khẩu, hãy đảm bảo `OPEN_NOTEBOOK_PASSWORD` được đặt chính xác
3. Đối với các máy chủ từ xa, hãy đảm bảo rằng máy của bạn có thể truy cập được cổng 5055
4. Kiểm tra cài đặt tường lửa nếu kết nối với máy chủ từ xa

## Sử dụng với các máy khách MCP khác

Máy chủ Open Notebook MCP tuân theo giao thức MCP tiêu chuẩn và có thể được sử dụng với bất kỳ máy khách nào tương thích với MCP. Kiểm tra tài liệu của khách hàng để biết chi tiết cấu hình.

## Tìm hiểu thêm

- [Tài liệu về giao thức bối cảnh mô hình](https://modelcontextprotocol.io)