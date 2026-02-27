<div align="center">
<a id="readme-top"></a>

<!-- [![Contributors][contributors-shield]][contributors-url] -->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->
</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/hona1902/5400-NoteBook_final">
    <img width="750" height="227" alt="Logo-ngang (1)" src="https://github.com/user-attachments/assets/3ec92917-63b6-4915-afa8-02877f2c17dd" />

  </a>

  <h3 align="center">ChatBot Demo</h3>

  <p align="center">
    Một giải pháp mã nguồn mở, tập trung vào quyền riêng tư, thay thế Google Notebook LM!
    <br />
    <a href="https://5491.io.vn"><strong>Trang chủ »</strong></a>
    <br />
    <br />
    <a href="docs/0-START-HERE/index.md">📚 Bắt đầu</a>
    ·
    <a href="docs/3-USER-GUIDE/index.md">📖 Hướng dẫn sử dụng</a>
    ·
    <a href="docs/2-CORE-CONCEPTS/index.md">✨ Tính năng</a>
    ·
    <a href="docs/1-INSTALLATION/index.md">🚀 Triển khai</a>
  </p>
</div>



<div align="center">
  <!-- Keep these links. Translations will automatically update with the README. -->
  <a href="https://zdoc.app/de/hona1902/5400-NoteBook_final">English</a> | 
  <a href="https://zdoc.app/es/hona1902/5400-NoteBook_final">Tiếng Việt</a> | 
</div>

## Giải pháp riêng tư, đa mô hình, 100% cục bộ, thay thế toàn diện cho Notebook LM

<img width="1653" height="895" alt="1" src="https://github.com/user-attachments/assets/2241c648-5a8a-41ec-b21b-e444b7d26b30" />



**ChatBot giúp bạn:**
- 🔒 **Kiểm soát dữ liệu** - Giữ nghiên cứu của bạn riêng tư và an toàn
- 🤖 **Chọn mô hình AI** - Hỗ trợ hơn 16 nhà cung cấp bao gồm OpenAI, Anthropic, Ollama, LM Studio và nhiều hơn nữa
- 🔍 **Tìm kiếm thông minh** - Tìm kiếm toàn văn bản và vector trên toàn bộ nội dung
- 💬 **Trò chuyện với tài liệu** - Hội thoại AI dựa trên tài liệu nghiên cứu của bạn
- 🌐 **Giao diện đa ngôn ngữ** - Hỗ trợ tiếng Anh, tiếng Việt
- 🔒 **Ưu tiên quyền riêng tư**: Nghiên cứu nhạy cảm của bạn hoàn toàn riêng tư
- 💰 **Kiểm soát chi phí**: Chọn nhà cung cấp AI rẻ hơn hoặc chạy cục bộ với Ollama
- 🔧 **Tùy chỉnh không giới hạn**: Sửa đổi, mở rộng và tích hợp theo nhu cầu
- 🌐 **Không phụ thuộc nhà cung cấp**: Chuyển đổi nhà cung cấp, triển khai mọi nơi, sở hữu dữ liệu của bạn

### Được xây dựng với

[![Python][Python]][Python-url] [![Next.js][Next.js]][Next-url] [![React][React]][React-url] [![SurrealDB][SurrealDB]][SurrealDB-url] [![LangChain][LangChain]][LangChain-url]

## 🚀 Bắt đầu nhanh
### Yêu cầu
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) đã được cài đặt
- Chỉ vậy thôi! (Khóa API sẽ được cấu hình sau trong giao diện)
### Bước 1: Tải docker-compose.yml

**Cách A:** Tải trực tiếp
```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/docker-compose.yml
```
**Cách B:** Tạo tệp thủ công
Sao chép nội dung này vào tệp mới có tên `docker-compose.yml`:
```yaml
services:
  surrealdb:
    image: surrealdb/surrealdb:v2
    command: start --log info --user root --pass root rocksdb:/mydata/mydatabase.db
    user: root
    ports:
      - "8000:8000"
    volumes:
      - ./surreal_data:/mydata
    restart: always

  open_notebook:
    image: lfnovo/open_notebook:v1-latest
    ports:
      - "8502:8502"
      - "5055:5055"
    environment:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=change-me-to-a-secret-string
      - SURREAL_URL=ws://surrealdb:8000/rpc
      - SURREAL_USER=root
      - SURREAL_PASSWORD=root
      - SURREAL_NAMESPACE=open_notebook
      - SURREAL_DATABASE=open_notebook
    volumes:
      - ./notebook_data:/app/data
    depends_on:
      - surrealdb
    restart: always
```

### Bước 2: Đặt khóa mã hóa
Chỉnh sửa `docker-compose.yml` và thay đổi dòng này:
```yaml
- OPEN_NOTEBOOK_ENCRYPTION_KEY=change-me-to-a-secret-string
```
thành bất kỳ giá trị bí mật nào (ví dụ: `my-super-secret-key-123`)

### Bước 3: Khởi động dịch vụ
```bash
docker compose up -d
```

Đợi 15-20 giây, sau đó mở: **http://localhost:8502**

### Bước 4: Cấu hình nhà cung cấp AI
1. Vào **Cài đặt** → **Khóa API**
2. Nhấn **Thêm thông tin xác thực**
3. Chọn nhà cung cấp (OpenAI, Anthropic, Google, v.v.)
4. Dán khóa API và nhấn **Lưu**
5. Nhấn **Kiểm tra kết nối** → **Khám phá mô hình** → **Đăng ký mô hình**

Xong!
