#Cấu hình bảo mật

Bảo vệ việc triển khai Open Notebook của bạn bằng xác thực mật khẩu và tăng cường sản xuất.

---

## Mã hóa khóa API

Open Notebook mã hóa các khóa API được lưu trữ trong cơ sở dữ liệu bằng mã hóa đối xứng Fernet (AES-128-CBC với HMAC-SHA256).

### Phương pháp cấu hình

| Phương pháp | Tài liệu |
|--------|--------------|
| **Giao diện người dùng cài đặt** | [Hướng dẫn cấu hình API](../3-USER-GUIDE/api-configuration.md) |
| **Biến môi trường** | Trang này (bên dưới) |

### Cài đặt

Đặt khóa mã hóa thành bất kỳ chuỗi bí mật nào:



```bash
# .env or docker.env
OPEN_NOTEBOOK_ENCRYPTION_KEY=my-secret-passphrase
```



Bất kỳ chuỗi nào cũng hoạt động - chuỗi đó sẽ được lấy một cách an toàn thông qua SHA-256 trong nội bộ. Sử dụng cụm mật khẩu mạnh để triển khai sản xuất.

### Thông tin xác thực mặc định

| Cài đặt | Mặc định | Cấp độ bảo mật |
|----------|----------|-------|
| Mật khẩu | `mở-sổ-thay-tôi` | Chỉ phát triển |
| Khóa mã hóa | **Không** (phải được định cấu hình) | Cần thiết để lưu trữ khóa API |

**Khóa mã hóa không có mặc định.** Bạn phải đặt `OPEN_NOTEBOOK_ENCRYPTION_KEY` trước khi sử dụng tính năng cấu hình khóa API. Không có nó, việc mã hóa/giải mã các khóa API sẽ không thành công.

### Hỗ trợ bí mật Docker

Cả hai cài đặt đều hỗ trợ bí mật Docker thông qua hậu tố `_FILE`:



```yaml
environment:
  - OPEN_NOTEBOOK_PASSWORD_FILE=/run/secrets/app_password
  - OPEN_NOTEBOOK_ENCRYPTION_KEY_FILE=/run/secrets/encryption_key
```



### Ghi chú bảo mật

| Kịch bản | Hành vi |
|----------|----------|
| Khóa được cấu hình | Khóa API được mã hóa bằng khóa của bạn |
| Không có khóa nào được định cấu hình | Mã hóa/giải mã sẽ không thành công (cần có khóa) |
| Chìa khóa đã thay đổi | Các khóa mã hóa cũ trở nên không thể đọc được |
| Dữ liệu kế thừa | Các khóa không được mã hóa vẫn hoạt động (dự phòng duyên dáng) |

### Quản lý khóa

- **Giữ bí mật**: Không bao giờ cam kết khóa mã hóa để kiểm soát phiên bản
- **Sao lưu an toàn**: Lưu trữ khóa riêng biệt với các bản sao lưu cơ sở dữ liệu
- **Chưa xoay vòng**: Thay đổi khóa yêu cầu lưu lại tất cả các khóa API
- **Mỗi lần triển khai**: Mỗi phiên bản phải có khóa mã hóa riêng

---

## Khi nào nên sử dụng Bảo vệ bằng mật khẩu

### Sử dụng nó cho:
- Triển khai đám mây công cộng (PikaPods, Railway, DigitalOcean)
- Môi trường mạng chia sẻ
- Bất kỳ triển khai nào có thể truy cập ngoài localhost

### Bạn có thể bỏ qua vì:
- Phát triển cục bộ trên máy của bạn
- Mạng riêng, biệt lập
- Thiết lập cục bộ một người dùng

---

## Thiết lập nhanh

### Triển khai Docker



```yaml
# docker-compose.yml
services:
  open_notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    environment:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=your-secret-encryption-key
      - OPEN_NOTEBOOK_PASSWORD=your_secure_password
    # ... rest of config
```



Hoặc sử dụng tệp môi trường:



```bash
# docker.env
OPEN_NOTEBOOK_ENCRYPTION_KEY=your-secret-encryption-key
OPEN_NOTEBOOK_PASSWORD=your_secure_password
```



> **Quan trọng**: Khóa mã hóa **bắt buộc** để lưu trữ thông tin xác thực. Nếu không có nó, bạn không thể lưu thông tin xác thực của nhà cung cấp AI thông qua Giao diện người dùng Cài đặt. Nếu bạn thay đổi hoặc mất khóa mã hóa, tất cả thông tin xác thực được lưu trữ sẽ không thể đọc được.

### Thiết lập phát triển



```bash
# .env
OPEN_NOTEBOOK_PASSWORD=your_secure_password
```



---

## Yêu cầu về mật khẩu

### Mật khẩu tốt



```bash
# Strong: 20+ characters, mixed case, numbers, symbols
OPEN_NOTEBOOK_PASSWORD=MySecure2024!Research#Tool
OPEN_NOTEBOOK_PASSWORD=Notebook$Dev$2024$Strong!

# Generated (recommended)
OPEN_NOTEBOOK_PASSWORD=$(openssl rand -base64 24)
```



### Mật khẩu sai



```bash
# DON'T use these
OPEN_NOTEBOOK_PASSWORD=password123
OPEN_NOTEBOOK_PASSWORD=opennotebook
OPEN_NOTEBOOK_PASSWORD=admin
```



---

## Nó hoạt động như thế nào

### Bảo vệ giao diện người dùng

1. Mẫu đăng nhập xuất hiện trong lần truy cập đầu tiên
2. Mật khẩu được lưu trong phiên trình duyệt
3. Phiên vẫn tồn tại cho đến khi đóng trình duyệt
4. Xóa dữ liệu trình duyệt để đăng xuất

### Bảo vệ API

Tất cả các điểm cuối API đều yêu cầu xác thực:



```bash
# Authenticated request
curl -H "Authorization: Bearer your_password" \
  http://localhost:5055/api/notebooks

# Unauthenticated (will fail)
curl http://localhost:5055/api/notebooks
# Returns: {"detail": "Missing authorization header"}
```



### Điểm cuối không được bảo vệ

Chúng hoạt động mà không cần xác thực:

- `/health` - Kiểm tra sức khỏe hệ thống
- `/docs` - Tài liệu API
- `/openapi.json` - Thông số OpenAPI

---

## Ví dụ về xác thực API

### uốn cong



```bash
# List notebooks
curl -H "Authorization: Bearer your_password" \
  http://localhost:5055/api/notebooks

# Create notebook
curl -X POST \
  -H "Authorization: Bearer your_password" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Notebook", "description": "Research notes"}' \
  http://localhost:5055/api/notebooks

# Upload file
curl -X POST \
  -H "Authorization: Bearer your_password" \
  -F "file=@document.pdf" \
  http://localhost:5055/api/sources/upload
```



### Python



```python
import requests

class OpenNotebookClient:
    def __init__(self, base_url: str, password: str):
        self.base_url = base_url
        self.headers = {"Authorization": f"Bearer {password}"}

    def get_notebooks(self):
        response = requests.get(
            f"{self.base_url}/api/notebooks",
            headers=self.headers
        )
        return response.json()

    def create_notebook(self, name: str, description: str = None):
        response = requests.post(
            f"{self.base_url}/api/notebooks",
            headers=self.headers,
            json={"name": name, "description": description}
        )
        return response.json()

# Usage
client = OpenNotebookClient("http://localhost:5055", "your_password")
notebooks = client.get_notebooks()
```



###JavaScript/TypeScript



```javascript
const API_URL = 'http://localhost:5055';
const PASSWORD = 'your_password';

async function getNotebooks() {
  const response = await fetch(`${API_URL}/api/notebooks`, {
    headers: {
      'Authorization': `Bearer ${PASSWORD}`
    }
  });
  return response.json();
}
```



---

## Tăng cường sản xuất

### Bảo mật Docker



```yaml
services:
  open_notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    ports:
      - "127.0.0.1:8502:8502"  # Bind to localhost only
    environment:
      - OPEN_NOTEBOOK_PASSWORD=your_secure_password
    security_opt:
      - no-new-privileges:true
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: "1.0"
    restart: always
```



### Cấu hình tường lửa



```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 8502/tcp   # Block direct access
sudo ufw deny 5055/tcp   # Block direct API access
sudo ufw enable

# iptables
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 8502 -j DROP
iptables -A INPUT -p tcp --dport 5055 -j DROP
```



### Proxy ngược với SSL

Xem [Cấu hình proxy ngược](reverse-proxy.md) để biết cách thiết lập nginx/Caddy/Traefik hoàn chỉnh với HTTPS.

---

## Giới hạn bảo mật

Tính năng bảo vệ bằng mật khẩu của Open Notebook cung cấp **kiểm soát truy cập cơ bản**, không phải bảo mật cấp doanh nghiệp:

| Tính năng | Trạng thái |
|----------|--------|
| Truyền mật khẩu | Văn bản thuần túy (sử dụng HTTPS!) |
| Lưu trữ mật khẩu | Trong bộ nhớ |
| Quản lý người dùng | Mật khẩu duy nhất cho tất cả |
| Thời gian chờ của phiên | Không có (cho đến khi đóng trình duyệt) |
| Giới hạn tỷ lệ | Không có |
| Ghi nhật ký kiểm tra | Không có |

### Giảm thiểu rủi ro

1. **Luôn sử dụng HTTPS** - Mã hóa lưu lượng bằng TLS
2. **Mật khẩu mạnh** - Hơn 20 ký tự, phức tạp
3. **Bảo mật mạng** - Tường lửa, VPN dành cho các hoạt động triển khai nhạy cảm
4. **Cập nhật thường xuyên** - Luôn cập nhật vùng chứa và phần phụ thuộc
5. **Giám sát** - Kiểm tra nhật ký để phát hiện hoạt động đáng ngờ
6. **Sao lưu** - Sao lưu dữ liệu thường xuyên

---

## Những cân nhắc của doanh nghiệp

Đối với việc triển khai yêu cầu bảo mật nâng cao:

| Cần | Giải pháp |
|------|----------|
| SSO/OAuth | Triển khai proxy OAuth2/SAML |
| Truy cập dựa trên vai trò | Phần mềm trung gian tùy chỉnh |
| Ghi nhật ký kiểm tra | Dịch vụ tổng hợp nhật ký |
| Giới hạn tỷ lệ | Cổng API hoặc nginx |
| Mã hóa dữ liệu | Mã hóa khối lượng ở phần còn lại |
| Phân đoạn mạng | Mạng Docker, VPC |

---

## Khắc phục sự cố

### Mật khẩu không hoạt động



```bash
# Check env var is set
docker exec open-notebook env | grep OPEN_NOTEBOOK_PASSWORD

# Check logs
docker logs open-notebook | grep -i auth

# Test API directly
curl -H "Authorization: Bearer your_password" \
  http://localhost:5055/health
```



### 401 Lỗi trái phép



```bash
# Check header format
curl -v -H "Authorization: Bearer your_password" \
  http://localhost:5055/api/notebooks

# Verify password matches
echo "Password length: $(echo -n $OPEN_NOTEBOOK_PASSWORD | wc -c)"
```



### Không thể truy cập sau khi đặt mật khẩu

1. Xóa bộ nhớ cache và cookie của trình duyệt
2. Thử chế độ ẩn danh/riêng tư
3. Kiểm tra lỗi bảng điều khiển trình duyệt
4. Xác minh mật khẩu chính xác trong môi trường

### Kiểm tra bảo mật



```bash
# Without password (should fail)
curl http://localhost:5055/api/notebooks
# Expected: {"detail": "Missing authorization header"}

# With correct password (should succeed)
curl -H "Authorization: Bearer your_password" \
  http://localhost:5055/api/notebooks

# Health check (should work without password)
curl http://localhost:5055/health
```



---

## Báo cáo vấn đề bảo mật

Nếu bạn phát hiện ra lỗ hổng bảo mật:

1. **KHÔNG mở các vấn đề công khai**
2. Liên hệ trực tiếp với người bảo trì
3. Cung cấp thông tin chi tiết
4. Dành thời gian sửa lỗi trước khi tiết lộ

---

## Có liên quan

- **[Reverse Proxy](reverse-proxy.md)** - Thiết lập HTTPS và SSL
- **[Cấu hình nâng cao](advanced.md)** - Cổng, thời gian chờ và cài đặt SSL
- **[Environment Reference](environment-reference.md)** - Tất cả các tùy chọn cấu hình