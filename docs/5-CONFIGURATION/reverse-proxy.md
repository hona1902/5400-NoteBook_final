# Cấu hình proxy ngược

Triển khai Open Notebook phía sau nginx, Caddy, Traefik hoặc các proxy ngược khác với miền tùy chỉnh và HTTPS.

---

## Thiết lập đơn giản hóa (v1.1+)

Bắt đầu với v1.1, Open Notebook sử dụng tính năng ghi lại Next.js để đơn giản hóa cấu hình. **Bạn chỉ cần ủy quyền cho một cổng** - Next.js tự động xử lý việc định tuyến API nội bộ.

### Cách thức hoạt động



```
Browser → Reverse Proxy → Port 8502 (Next.js)
                             ↓ (internal proxy)
                          Port 5055 (FastAPI)
```



Next.js tự động chuyển tiếp các yêu cầu `/api/*` tới phần phụ trợ FastAPI, vì vậy proxy ngược của bạn chỉ cần một cổng!

---

## Ví dụ về cấu hình nhanh

### Nginx (Được khuyến nghị)



```nginx
server {
    listen 443 ssl http2;
    server_name notebook.example.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    # Allow file uploads up to 100MB
    client_max_body_size 100M;

    # Single location block - that's it!
    location / {
        proxy_pass http://open-notebook:8502;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name notebook.example.com;
    return 301 https://$server_name$request_uri;
}
```



### Người phục vụ



```caddy
notebook.example.com {
    reverse_proxy open-notebook:8502 {
        transport http {
            read_timeout 600s
            write_timeout 600s
        }
    }
}
```



Caddy tự động xử lý HTTPS. Cài đặt thời gian chờ đảm bảo các hoạt động chạy dài (chuyển đổi, tạo podcast) không bị lỗi.

### Traefik



```yaml
services:
  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    environment:
      - API_URL=https://notebook.example.com
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.notebook.rule=Host(`notebook.example.com`)"
      - "traefik.http.routers.notebook.entrypoints=websecure"
      - "traefik.http.routers.notebook.tls.certresolver=myresolver"
      - "traefik.http.services.notebook.loadbalancer.server.port=8502"
      # Timeout for long-running operations (transformations, podcasts)
      - "traefik.http.services.notebook.loadbalancer.responseforwarding.flushinterval=100ms"
    networks:
      - traefik-network
```



**Lưu ý**: Đối với Traefik v2+, bạn cũng có thể cần định cấu hình thời gian chờ `serverTransport` trong cấu hình tĩnh của mình:



```yaml
# traefik.yml (static configuration)
serversTransport:
  forwardingTimeouts:
    dialTimeout: 30s
    responseHeaderTimeout: 600s
    idleConnTimeout: 90s
```



### Làm mát

1. Tạo dịch vụ mới với `lfnovo/open_notebook:v1-latest-single`
2. Đặt cổng thành **8502**
3. Thêm môi trường: `API_URL=https://your-domain.com`
4. Kích hoạt HTTPS trong Coolify
5. Xong!

---

## Biến môi trường



```bash
# Required for reverse proxy setups
API_URL=https://your-domain.com

# Optional: For multi-container deployments
# INTERNAL_API_URL=http://api-service:5055
```



**Quan trọng**: Đặt `API_URL` thành URL công khai của bạn (với https://).

**Lưu ý về HOSTNAME**: Hình ảnh Docker được đặt `HOSTNAME=0.0.0.0` theo mặc định, điều này đảm bảo Next.js liên kết với tất cả các giao diện và có thể truy cập được từ proxy ngược. Bạn thường không cần phải thiết lập điều này một cách thủ công.

---

## Tìm hiểu API_URL

Giao diện người dùng sử dụng hệ thống ưu tiên ba cấp để xác định URL API:

1. **Cấu hình thời gian chạy** (Mức độ ưu tiên cao nhất): Biến môi trường `API_URL` được đặt khi chạy vùng chứa
2. **Cấu hình thời gian xây dựng**: `NEXT_PUBLIC_API_URL` được đưa vào hình ảnh Docker
3. **Tự động phát hiện** (Dự phòng): Suy ra từ các tiêu đề yêu cầu HTTP đến

### Chi tiết Tự động Phát hiện

Khi `API_URL` không được đặt, giao diện Next.js:
- Phân tích yêu cầu HTTP đến
- Trích xuất tên máy chủ từ tiêu đề `host`
- Tôn trọng tiêu đề `X-Forwarded-Proto` (đối với HTTPS đằng sau proxy ngược)
- Xây dựng URL API dưới dạng `{protocol}://{hostname}:5055`
- Ví dụ: Yêu cầu tới `http://10.20.30.20:8502` → URL API trở thành `http://10.20.30.20:5055`

**Tại sao lại đặt API_URL một cách rõ ràng?**-**Độ tin cậy**: Tự động phát hiện có thể không thành công với các thiết lập proxy phức tạp
- **HTTPS**: Đảm bảo giao diện người dùng sử dụng `https://` khi đứng sau proxy kết thúc SSL
- **Miền tùy chỉnh**: Hoạt động chính xác với tên miền thay vì địa chỉ IP
- **Ánh xạ cổng**: Tránh hiển thị cổng 5055 trong URL khi sử dụng proxy ngược

**Quan trọng**: Không bao gồm `/api` ở cuối - hệ thống sẽ tự động thêm phần này!

---

## Ví dụ soạn thảo Docker hoàn chỉnh



```yaml
services:
  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    container_name: open-notebook
    environment:
      - API_URL=https://notebook.example.com
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=${OPEN_NOTEBOOK_ENCRYPTION_KEY}
      - OPEN_NOTEBOOK_PASSWORD=${OPEN_NOTEBOOK_PASSWORD}
    volumes:
      - ./notebook_data:/app/data
      - ./surreal_data:/mydata
    # Only expose to localhost (nginx handles public access)
    ports:
      - "127.0.0.1:8502:8502"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - open-notebook
    restart: unless-stopped
```



---

## Cấu hình Nginx đầy đủ



```nginx
events {
    worker_connections 1024;
}

http {
    upstream notebook {
        server open-notebook:8502;
    }

    # HTTP redirect
    server {
        listen 80;
        server_name notebook.example.com;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name notebook.example.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Allow file uploads up to 100MB
        client_max_body_size 100M;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # Proxy settings
        location / {
            proxy_pass http://notebook;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_cache_bypass $http_upgrade;

            # Timeouts for long-running operations (transformations, podcasts, etc.)
            # 600s matches the frontend timeout for slow LLM operations
            proxy_read_timeout 600s;
            proxy_connect_timeout 60s;
            proxy_send_timeout 600s;
        }
    }
}
```



---

## Truy cập API trực tiếp (Tùy chọn)

Nếu các tập lệnh hoặc tiện ích tích hợp bên ngoài cần quyền truy cập API trực tiếp, hãy định tuyến trực tiếp `/api/*`:



```nginx
# Direct API access (for external integrations)
location /api/ {
    proxy_pass http://open-notebook:5055/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Frontend (handles all other traffic)
location / {
    proxy_pass http://open-notebook:8502;
    # ... same headers as above
}
```



**Lưu ý**: Điều này chỉ cần thiết cho việc tích hợp API bên ngoài. Lưu lượng trình duyệt hoạt động tốt với thiết lập một cổng.

---

## Kịch bản nâng cao

### Truy cập máy chủ từ xa (LAN/VPS)

Truy cập Open Notebook từ một máy khác trên mạng của bạn:

**Bước 1: Nhận IP máy chủ của bạn**

```bash
# On the server running Open Notebook:
hostname -I
# or
ifconfig | grep "inet "
# Note the IP (e.g., 192.168.1.100)
```



**Bước 2: Định cấu hình API_URL**

```bash
# In docker-compose.yml or .env:
API_URL=http://192.168.1.100:5055
```



**Bước 3: Hiển thị các cổng**

```yaml
services:
  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    environment:
      - API_URL=http://192.168.1.100:5055
    ports:
      - "8502:8502"
      - "5055:5055"
```



**Bước 4: Truy cập từ máy client**

```bash
# In browser on other machine:
http://192.168.1.100:8502
```



**Khắc phục sự cố**:
- Kiểm tra tường lửa: `sudo ufw allow 8502 && sudo ufw allow 5055`
- Xác minh kết nối: `ping 192.168.1.100` từ máy khách
- Cổng kiểm tra: `telnet 192.168.1.100 8502` từ máy khách

---

### API trên tên miền phụ riêng biệt

Lưu trữ API và giao diện người dùng trên các tên miền phụ khác nhau:

**docker-compose.yml:**

```yaml
services:
  open-notebook:
    image: lfnovo/open_notebook:v1-latest-single
    pull_policy: always
    environment:
      - API_URL=https://api.notebook.example.com
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=${OPEN_NOTEBOOK_ENCRYPTION_KEY}
    # Don't expose ports (nginx handles routing)
```



**nginx.conf:**

```nginx
# Frontend server
server {
    listen 443 ssl http2;
    server_name notebook.example.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    location / {
        proxy_pass http://open-notebook:8502;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}

# API server (separate subdomain)
server {
    listen 443 ssl http2;
    server_name api.notebook.example.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    location / {
        proxy_pass http://open-notebook:5055;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```



**Trường hợp sử dụng**: Tách các bản ghi DNS, giới hạn tốc độ khác nhau hoặc kiểm soát quyền truy cập API riêng biệt.

---

### Triển khai nhiều container (Nâng cao)

Đối với các hoạt động triển khai phức tạp với các vùng chứa API và giao diện người dùng riêng biệt:

**docker-compose.yml:**

```yaml
services:
  frontend:
    image: lfnovo/open_notebook_frontend:v1-latest
    pull_policy: always
    environment:
      - API_URL=https://notebook.example.com
    ports:
      - "8502:8502"

  api:
    image: lfnovo/open_notebook_api:v1-latest
    pull_policy: always
    environment:
      - OPEN_NOTEBOOK_ENCRYPTION_KEY=${OPEN_NOTEBOOK_ENCRYPTION_KEY}
    ports:
      - "5055:5055"
    depends_on:
      - surrealdb

  surrealdb:
    image: surrealdb/surrealdb:latest
    command: start --log trace --user root --pass root file:/mydata/database.db
    ports:
      - "8000:8000"
    volumes:
      - ./surreal_data:/mydata
```



**nginx.conf:**

```nginx
http {
    upstream frontend {
        server frontend:8502;
    }

    upstream api {
        server api:5055;
    }

    server {
        listen 443 ssl http2;
        server_name notebook.example.com;

        # API routes
        location /api/ {
            proxy_pass http://api/api/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Frontend (catch-all)
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```



**Lưu ý**: Hầu hết người dùng nên sử dụng phương pháp tiếp cận một vùng chứa (`v1-mới nhất-single`). Nhiều vùng chứa chỉ cần thiết cho các yêu cầu chia tỷ lệ hoặc cách ly tùy chỉnh.

---

## Chứng chỉ SSL

### Hãy mã hóa bằng Certbot



```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d notebook.example.com

# Auto-renewal (usually configured automatically)
sudo certbot renew --dry-run
```



### Hãy mã hóa cùng Caddy

Caddy tự động xử lý SSL - không cần cấu hình!

### Tự ký (Chỉ dành cho nhà phát triển)



```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/privkey.pem \
  -out ssl/fullchain.pem \
  -subj "/CN=localhost"
```



---

## Khắc phục sự cố

### "Không thể kết nối với máy chủ"

1. **Kiểm tra API_URL đã được đặt**:

```bash
   docker exec open-notebook env | grep API_URL
   ```



2. **Xác minh proxy ngược đã đến vùng chứa**:

```bash
   curl -I http://localhost:8502
   ```



3. **Kiểm tra bảng điều khiển trình duyệt** (F12):
   - Tìm kiếm lỗi kết nối
   - Kiểm tra xem URL nào nó đang cố truy cập

### Lỗi nội dung hỗn hợp

Giao diện người dùng sử dụng HTTPS nhưng cố gắng tiếp cận API HTTP:



```bash
# Ensure API_URL uses https://
API_URL=https://notebook.example.com  # Not http://
```



### Sự cố về WebSocket

Đảm bảo proxy của bạn hỗ trợ nâng cấp WebSocket:



```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
```



### 502 Cổng xấu

1. Kiểm tra container đang chạy: `docker ps`
2. Kiểm tra nhật ký container: `docker log open-notebook`
3. Xác minh nginx có thể tiếp cận container (cùng mạng)

### Lỗi hết thời gian chờ

**Triệu chứng:**
- lỗi `socket treo` hoặc `ECONNRESET`
- `Hết thời gian chờ sau 30000ms` lỗi
- Thao tác thất bại sau đúng 30 giây

**Lý do:** Proxy ngược của bạn có thời gian chờ mặc định (thường là 30 giây) ngắn hơn các hoạt động của Open Notebook.

**Giải pháp bằng proxy:**

**Nginx:**

```nginx
proxy_read_timeout 600s;
proxy_send_timeout 600s;
```



**Caddy:**

```caddy
reverse_proxy open-notebook:8502 {
    transport http {
        read_timeout 600s
        write_timeout 600s
    }
}
```



**Traefik (cấu hình tĩnh):**

```yaml
serversTransport:
  forwardingTimeouts:
    responseHeaderTimeout: 600s
```



**Thời gian chờ ở cấp ứng dụng:**

Nếu bạn vẫn gặp phải tình trạng hết thời gian chờ sau khi định cấu hình proxy, bạn cũng có thể điều chỉnh thời gian chờ của ứng dụng:



```bash
# In .env file:
API_CLIENT_TIMEOUT=600      # API client timeout (default: 300s)
ESPERANTO_LLM_TIMEOUT=180   # LLM inference timeout (default: 60s)
```



Xem [Cấu hình nâng cao](advanced.md) để biết thêm tùy chọn thời gian chờ.

---

### Cách gỡ lỗi các vấn đề về cấu hình

**Bước 1: Kiểm tra bảng điều khiển trình duyệt** (F12 → tab Bảng điều khiển)

```
Look for messages starting with 🔧 [Config]
These show the configuration detection process
You'll see which API URL is being used
```



**Ví dụ đầu ra tốt:**

```
✅ [Config] Runtime API URL from server: https://your-domain.com
```



**Ví dụ đầu ra xấu:**

```
❌ [Config] Failed to fetch runtime config
⚠️  [Config] Using auto-detected URL: http://localhost:5055
```



**Bước 2: Kiểm tra API trực tiếp**

```bash
# Should return JSON config
curl https://your-domain.com/api/config

# Expected output:
{"status":"ok","credentials_configured":true,...}
```



**Bước 3: Kiểm tra nhật ký Docker**

```bash
docker logs open-notebook

# Look for:
# - Frontend startup: "▲ Next.js ready on http://0.0.0.0:8502"
# - API startup: "INFO:     Uvicorn running on http://0.0.0.0:5055"
# - Connection errors or CORS issues
```



**Bước 4: Xác minh biến môi trường**

```bash
docker exec open-notebook env | grep API_URL

# Should show:
# API_URL=https://your-domain.com
```



---

### Giao diện người dùng Thêm `:5055` vào URL (Phiên bản 1.0.10)

**Triệu chứng** (chỉ có ở các phiên bản cũ hơn):
- Bạn đặt `API_URL=https://your-domain.com`
- Bảng điều khiển trình duyệt hiển thị: "URL đã thử: https://your-domain.com:5055/api/config"
- Lỗi CORS với "Mã trạng thái: (null)"

**Nguyên nhân cốt lõi:**
Trong các phiên bản 1.0.10, điểm cuối cấu hình của giao diện người dùng là `/api/runtime-config`, điểm này đã bị chặn bởi các proxy ngược định tuyến tất cả các yêu cầu `/api/*` tới chương trình phụ trợ. Điều này đã ngăn giao diện người dùng đọc biến môi trường `API_URL`.

**Giải pháp:**
Nâng cấp lên phiên bản 1.0.11 trở lên. Điểm cuối cấu hình đã được chuyển đến `/config` để tránh xung đột định tuyến `/api/*`.

**Xác minh:**
Kiểm tra bảng điều khiển trình duyệt (F12) - sẽ thấy: ` ✅ [Cấu hình] URL API thời gian chạy từ máy chủ: https://your-domain.com`

**Nếu bạn không thể nâng cấp**, hãy định cấu hình rõ ràng tuyến `/config`:

```nginx
# Only needed for versions ≤ 1.0.10
location = /config {
    proxy_pass http://open-notebook:8502;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```



---

### Lỗi tải lên tệp (Tải trọng 413 quá lớn)

**Triệu chứng:**

```
CORS header 'Access-Control-Allow-Origin' missing. Status code: 413.
Error creating source. Please try again.
```



**Nguyên nhân cốt lõi:**
Khi tải tệp lên, proxy ngược của bạn có thể từ chối yêu cầu do giới hạn kích thước nội dung *trước khi* nó đến được ứng dụng. Vì lỗi xảy ra ở cấp proxy nên tiêu đề CORS không được đưa vào phản hồi.

**Yêu cầu phiên bản:**-**Cần mở Notebook v1.3.2+** để tải tệp lên >10MB
- Sử dụng Next.js 16+ hỗ trợ tùy chọn cấu hình `proxyClientMaxBodySize`
- Kiểm tra phiên bản của bạn: Cài đặt → Giới thiệu (cuối trang cài đặt)

**Giải pháp:**

1. **Nginx - Tăng giới hạn kích thước cơ thể**:

```nginx
   server {
       # Allow larger file uploads (default is 1MB)
       client_max_body_size 100M;

       # Add CORS headers to error responses
       error_page 413 = @cors_error_413;

       location @cors_error_413 {
           add_header 'Access-Control-Allow-Origin' '*' always;
           add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
           add_header 'Access-Control-Allow-Headers' '*' always;
           return 413 '{"detail": "File too large. Maximum size is 100MB."}';
       }

       location / {
           # ... your existing proxy configuration
       }
   }
   ```



2. **Traefik - Tăng kích thước bộ đệm**:

```yaml
   # In your traefik configuration
   http:
     middlewares:
       large-body:
         buffering:
           maxRequestBodyBytes: 104857600  # 100MB
   ```



Áp dụng phần mềm trung gian cho bộ định tuyến của bạn:

```yaml
   labels:
     - "traefik.http.routers.notebook.middlewares=large-body"
   ```



3. **Kubernetes Ingress (nginx-ingress)**:

```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: open-notebook
     annotations:
       nginx.ingress.kubernetes.io/proxy-body-size: "100m"
       # Add CORS headers for error responses
       nginx.ingress.kubernetes.io/configuration-snippet: |
         more_set_headers "Access-Control-Allow-Origin: *";
   ```



4. **Caddy**:

```caddy
   notebook.example.com {
       request_body {
           max_size 100MB
       }
       reverse_proxy open-notebook:8502 {
           transport http {
               read_timeout 600s
               write_timeout 600s
           }
       }
   }
   ```



**Lưu ý:** API của Open Notebook bao gồm các tiêu đề CORS trong phản hồi lỗi, nhưng điều này chỉ hoạt động đối với các lỗi xảy ra với ứng dụng. Các lỗi cấp proxy (như 413 từ nginx) cần được định cấu hình ở cấp proxy.

---

### Lỗi CORS

**Triệu chứng:**

```
Access-Control-Allow-Origin header is missing
Cross-Origin Request Blocked
Response to preflight request doesn't pass access control check
```



**Nguyên nhân có thể:**

1. **Thiếu tiêu đề proxy**:

```nginx
   # Make sure these are set:
   proxy_set_header X-Forwarded-Proto $scheme;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $host;
   ```



2. **Giao thức API_URL không khớp**:

```bash
   # Frontend is HTTPS, but API_URL is HTTP:
   API_URL=http://notebook.example.com  # ❌ Wrong
   API_URL=https://notebook.example.com # ✅ Correct
   ```



3. **Proxy ngược không chuyển tiếp `/api/*` chính xác**:

```nginx
   # Make sure this works:
   location /api/ {
       proxy_pass http://open-notebook:5055/api/;  # Note the trailing slash!
   }
   ```



---

### Thiếu tiêu đề ủy quyền

**Triệu chứng:**

```json
{"detail": "Missing authorization header"}
```



Điều này xảy ra khi:
- Bạn đã đặt `OPEN_NOTEBOOK_PASSWORD` để xác thực
- Bạn đang cố truy cập trực tiếp `/api/config` mà không đăng nhập trước

**Giải pháp:**Đây là**hành vi được mong đợi**! Giao diện người dùng tự động xử lý xác thực. Chỉ:
1. Truy cập URL giao diện người dùng (không phải trực tiếp `/api/`)
2. Đăng nhập thông qua giao diện người dùng
3. Giao diện người dùng sẽ xử lý các tiêu đề ủy quyền cho tất cả lệnh gọi API

**Đối với tích hợp API:** Bao gồm mật khẩu trong tiêu đề Ủy quyền:

```bash
curl -H "Authorization: Bearer your-password-here" \
  https://your-domain.com/api/config
```



---

### Lỗi chứng chỉ SSL/TLS

**Triệu chứng:**
- Trình duyệt hiển thị "Kết nối của bạn không phải là kết nối riêng tư"
- Cảnh báo chứng chỉ
- Lỗi nội dung hỗn hợp

**Giải pháp:**

1. **Sử dụng Let's Encrypt** (được khuyến nghị):

```bash
   sudo certbot --nginx -d notebook.example.com
   ```



2. **Kiểm tra đường dẫn chứng chỉ** trong nginx:

```nginx
   ssl_certificate /etc/nginx/ssl/fullchain.pem;      # Full chain
   ssl_certificate_key /etc/nginx/ssl/privkey.pem;    # Private key
   ```



3. **Xác minh chứng chỉ hợp lệ**:

```bash
   openssl x509 -in /etc/nginx/ssl/fullchain.pem -text -noout
   ```



4. **Để phát triển**, hãy sử dụng self-signed (không dành cho sản xuất):

```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout ssl/privkey.pem -out ssl/fullchain.pem \
     -subj "/CN=localhost"
   ```



---

## Các phương pháp hay nhất

1. **Luôn sử dụng HTTPS** trong sản xuất
2. **Đặt API_URL một cách rõ ràng** khi sử dụng proxy ngược để tránh sự cố tự động phát hiện
3. **Liên kết với localhost** (`127.0.0.1:8502`) và để proxy xử lý quyền truy cập công khai để bảo mật
4. **Bật tiêu đề bảo mật** (HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
5. **Thiết lập gia hạn chứng chỉ** cho Let's Encrypt (thường tự động với certbot)
6. **Giữ các cổng 5055 và 8502 có thể truy cập được** từ vùng chứa proxy ngược của bạn (sử dụng mạng Docker)
7. **Sử dụng tệp môi trường** (`.env` hoặc `docker.env`) để quản lý cấu hình một cách an toàn
8. **Kiểm tra cấu hình của bạn** trước khi đi vào hoạt động:
   - Kiểm tra bảng điều khiển trình duyệt để biết thông báo cấu hình
   - API kiểm tra: `curl https://your-domain.com/api/config`
   - Xác minh hoạt động xác thực
   - Kiểm tra các hoạt động chạy dài (tạo podcast)
9. **Theo dõi nhật ký** thường xuyên: `docker logs open-notebook`
10. **Không bao gồm `/api` trong API_URL** - hệ thống tự động thêm phần này

---

## Cấu hình kế thừa (Trước v1.1)

Nếu bạn đang chạy Open Notebook **phiên bản 1.0.x trở xuống**, bạn có thể cần sử dụng cấu hình hai cổng cũ trong đó bạn định tuyến rõ ràng `/api/*` tới cổng 5055.

**Check your version:**

```bash
docker exec open-notebook cat /app/package.json | grep version
```



**Nếu phiên bản < 1.1.0**, bạn có thể cần:
- Định tuyến `/api/*` rõ ràng tới cổng 5055 trong proxy ngược
- Định tuyến điểm cuối `/config` rõ ràng cho các phiên bản 1.0.10
- Xem phần khắc phục sự cố "Giao diện người dùng Thêm `:5055` vào URL" ở trên

**Khuyến nghị:** Nâng cấp lên v1.1+ để có cấu hình đơn giản và hiệu suất tốt hơn.

---

## Có liên quan

- **[Cấu hình bảo mật](security.md)** - Bảo vệ và tăng cường mật khẩu
- **[Cấu hình nâng cao](advanced.md)** - Cổng, thời gian chờ và cài đặt SSL
- **[Xử lý sự cố](../6-TROUBLESHOOTING/connection-issues.md)** - Sự cố kết nối
- **[Triển khai Docker](../1-INSTALLATION/docker-compose.md)** - Hướng dẫn triển khai đầy đủ