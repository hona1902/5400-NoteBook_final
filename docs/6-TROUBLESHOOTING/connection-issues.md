# Sự cố kết nối - Sự cố mạng & API

Giao diện người dùng không thể truy cập API hoặc dịch vụ sẽ không giao tiếp.

---

## "Không thể kết nối với máy chủ" (Thường gặp nhất)

**Nó trông như thế nào:**
- Trình duyệt hiển thị trang lỗi
- "Không thể truy cập API"
- "Không thể kết nối với máy chủ"
- Tải UI nhưng không thể tạo sổ ghi chép

**Chẩn đoán:**



```bash
# Check if API is running
docker ps | grep api
# Should see "api" service running

# Check if API is responding
curl http://localhost:5055/health
# Should show: {"status":"ok"}

# Check if frontend is running
docker ps | grep frontend
# Should see "frontend" or React service running
```



**Giải pháp:**

### Giải pháp 1: API không chạy

```bash
# Start API
docker compose up api -d

# Wait 5 seconds
sleep 5

# Verify it's running
docker compose logs api | tail -20
```



### Giải pháp 2: Cổng không được hiển thị

```bash
# Check docker-compose.yml has port mapping:
# api:
#   ports:
#     - "5055:5055"

# If missing, add it and restart:
docker compose down
docker compose up -d
```



### Giải pháp 3: API_URL không khớp

```bash
# In .env, check API_URL:
cat .env | grep API_URL

# Should match your frontend URL:
# Frontend: http://localhost:8502
# API_URL: http://localhost:5055

# If wrong, fix it:
# API_URL=http://localhost:5055
# Then restart:
docker compose restart frontend
```



### Giải pháp 4: Chặn tường lửa

```bash
# Verify port 5055 is accessible
netstat -tlnp | grep 5055
# Should show port listening

# If on different machine, try:
# Instead of localhost, use your IP:
API_URL=http://192.168.1.100:5055
```



### Giải pháp 5: Dịch vụ chưa được khởi động

```bash
# Restart everything
docker compose restart

# Wait 10 seconds
sleep 10

# Check all services
docker compose ps
# All should show "Up"
```



---

## Kết nối bị từ chối

**Nó trông như thế nào:**

```
Connection refused
ECONNREFUSED
Error: socket hang up
```



**Chẩn đoán:**
- Cổng API (5055) không mở
- API bị lỗi
- Sai IP/tên máy chủ

**Giải pháp:**



```bash
# Step 1: Check if API is running
docker ps | grep api

# Step 2: Check if port is listening
lsof -i :5055
# or
netstat -tlnp | grep 5055

# Step 3: Check API logs
docker compose logs api | tail -30
# Look for errors

# Step 4: Restart API
docker compose restart api
docker compose logs api | grep -i "error"
```



---

## Hết thời gian / Kết nối chậm

**Nó trông như thế nào:**
- Trang tải chậm
- Hết thời gian yêu cầu
- Lỗi "Hết thời gian cổng"

**Nguyên nhân:**
- API bị quá tải
- Mạng chậm
- Vấn đề proxy ngược

**Giải pháp:**

### Kiểm tra hiệu suất API

```bash
# See CPU/memory usage
docker stats

# Check logs for slow operations
docker compose logs api | grep "slow\|timeout"
```



### Giảm tải

```bash
# In .env:
SURREAL_COMMANDS_MAX_TASKS=2
API_CLIENT_TIMEOUT=600

# Restart
docker compose restart
```



### Kiểm tra mạng

```bash
# Test latency
ping localhost

# Test API directly
time curl http://localhost:5055/health

# Should be < 100ms
```



---

## 502 Cổng xấu (Proxy ngược)

**Nó trông như thế nào:**

```
502 Bad Gateway
The server is temporarily unable to service the request
```



**Lý do:** Proxy ngược không thể truy cập API

**Giải pháp:**

### Kiểm tra phần cuối đang chạy

```bash
# From the reverse proxy server
curl http://localhost:5055/health

# Should work
```



### Kiểm tra cấu hình proxy ngược

```nginx
# Nginx example (correct):
location /api {
    proxy_pass http://localhost:5055/api;
    proxy_http_version 1.1;
}

# Common mistake (wrong):
location /api {
    proxy_pass http://localhost:5055;  # Missing /api
}
```



### Đặt API_URL cho HTTPS

```bash
# In .env:
API_URL=https://yourdomain.com

# Restart
docker compose restart
```



---

## Ngắt kết nối không liên tục

**Nó trông như thế nào:**
- Đôi khi hoạt động, đôi khi thất bại
- Thỉnh thoảng xảy ra lỗi không kết nối được
- Đang hoạt động rồi ngừng hoạt động

**Nguyên nhân:** Sự cố mạng tạm thời hoặc xung đột cơ sở dữ liệu

**Giải pháp:**

### Kích hoạt tính năng Thử lại logic

```bash
# In .env:
SURREAL_COMMANDS_RETRY_ENABLED=true
SURREAL_COMMANDS_RETRY_MAX_ATTEMPTS=5
SURREAL_COMMANDS_RETRY_WAIT_STRATEGY=exponential_jitter

# Restart
docker compose restart
```



### Giảm tính đồng thời

```bash
# In .env:
SURREAL_COMMANDS_MAX_TASKS=2

# Restart
docker compose restart
```



### Kiểm tra độ ổn định của mạng

```bash
# Monitor connection
ping google.com

# Long-running test
ping -c 100 google.com | grep "packet loss"
# Should be 0% loss
```



---

## Máy khác / Truy cập từ xa

**Bạn muốn truy cập Open Notebook từ một máy tính khác**

**Giải pháp:**

### Bước 1: Lấy IP máy của bạn

```bash
# On the server running Open Notebook:
ifconfig | grep "inet "
# or
hostname -I
# Note the IP (e.g., 192.168.1.100)
```



### Bước 2: Cập nhật API_URL

```bash
# In .env:
API_URL=http://192.168.1.100:5055

# Restart
docker compose restart
```



### Bước 3: Truy cập từ máy khác

```bash
# In browser on other machine:
http://192.168.1.100:8502
# (or your server IP)
```



### Bước 4: Xác minh cổng đã được hiển thị

```bash
# On server:
docker compose ps

# Should show port mapping:
# 0.0.0.0:8502->8502/tcp
# 0.0.0.0:5055->5055/tcp
```



### Nếu vẫn không được

```bash
# Check firewall on server
sudo ufw status
# May need to open ports:
sudo ufw allow 8502
sudo ufw allow 5055

# Check on different machine:
telnet 192.168.1.100 5055
# Should connect
```



---

## Lỗi CORS (Bảng điều khiển trình duyệt)

**Nó trông như thế nào:**

```
Cross-Origin Request Blocked
Access-Control-Allow-Origin
```



**Trong bảng điều khiển trình duyệt (F12):**

```
CORS policy: Response to preflight request doesn't pass access control check
```



**Lý do:** URL giao diện người dùng và URL API không khớp nhau

**Giải pháp:**



```bash
# Check browser console error for what URLs are being used
# The error shows:
# - Requesting from: http://localhost:8502
# - Trying to reach: http://localhost:5055

# Make sure API_URL matches:
API_URL=http://localhost:5055

# And protocol matches (http/https)
# Restart
docker compose restart frontend
```



---

## Kiểm tra kết nối

**Chẩn đoán đầy đủ:**



```bash
# 1. Services running?
docker compose ps
# All should show "Up"

# 2. Ports listening?
netstat -tlnp | grep -E "8502|5055|8000"

# 3. API responding?
curl http://localhost:5055/health

# 4. Frontend accessible?
curl http://localhost:8502 | head

# 5. Network OK?
ping google.com

# 6. No firewall?
sudo ufw status | grep -E "5055|8502|8000"
```



---

## Danh sách kiểm tra để truy cập từ xa

- [ ] IP máy chủ được ghi chú (ví dụ: 192.168.1.100)
- [] Cổng 8502, 5055, 8000 hiển thị trong docker-compose
- [ ] API_URL được đặt thành IP máy chủ
- [] Tường lửa cho phép cổng 8502, 5055, 8000
- [] Có thể truy cập máy chủ từ máy khách (ping IP)
- [] Tất cả các dịch vụ đang chạy (docker soạn ps)
- [ ] Có thể cuộn API từ máy khách (curl http://IP:5055/health)

---

## Lỗi chứng chỉ SSL

**Nó trông như thế nào:**

```
[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed
Connection error when using HTTPS endpoints
Works with HTTP but fails with HTTPS
```



**Lý do:** Chứng chỉ tự ký không được xác minh SSL của Python tin cậy

**Giải pháp:**

### Giải pháp 1: Sử dụng Custom CA Bundle (Khuyến nghị)

```bash
# In .env:
ESPERANTO_SSL_CA_BUNDLE=/path/to/your/ca-bundle.pem

# For Docker, mount the certificate:
# In docker-compose.yml:
volumes:
  - /path/to/your/ca-bundle.pem:/certs/ca-bundle.pem:ro
environment:
  - ESPERANTO_SSL_CA_BUNDLE=/certs/ca-bundle.pem
```



### Giải pháp 2: Tắt xác minh SSL (Chỉ dành cho nhà phát triển)

```bash
# WARNING: Only use in trusted development environments
# In .env:
ESPERANTO_SSL_VERIFY=false
```



### Giải pháp 3: Thay vào đó hãy sử dụng HTTP
Nếu các dịch vụ nằm trên mạng cục bộ đáng tin cậy thì HTTP có thể được chấp nhận:

```
Change the base URL in your credential (Settings → API Keys) from https:// to http://
Example: http://localhost:1234/v1
```



> **Lưu ý bảo mật:** Việc tắt xác minh SSL có thể khiến bạn gặp phải các cuộc tấn công trung gian. Luôn ưu tiên gói CA tùy chỉnh hoặc HTTP trên các mạng đáng tin cậy.

---

## Vẫn gặp sự cố?

- Kiểm tra [Sửa nhanh](quick-fixes.md)
- Kiểm tra [FAQ](faq.md)
- Kiểm tra log: `docker soạn log`
- Thử khởi động lại: `docker soạn khởi động lại`
- Kiểm tra tường lửa: `sudo ufw status`
- Yêu cầu trợ giúp trên [Discord](https://discord.gg/37XJPXfz2w)