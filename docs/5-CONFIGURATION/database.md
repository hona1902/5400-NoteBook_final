# Cơ sở dữ liệu - Cấu hình SurrealDB

Open Notebook sử dụng SurrealDB cho nhu cầu cơ sở dữ liệu của nó.

---

## Cấu hình mặc định

Open Notebook sẽ hoạt động tốt với SurrealDB miễn là các biến môi trường được thiết lập chính xác.

### DB chạy trong cùng một docker soạn thảo như Open Notebook (được khuyến nghị)

Ví dụ trên dành cho khi bạn đang chạy SurrealDB dưới dạng một bộ chứa docker riêng biệt, đây là phương pháp được mô tả [tại đây](../1-INSTALLATION/docker-compose.md) (và phương pháp được chúng tôi đề xuất).



```env
SURREAL_URL="ws://surrealdb:8000/rpc"
SURREAL_USER="root"
SURREAL_PASSWORD="root"
SURREAL_NAMESPACE="open_notebook"
SURREAL_DATABASE="open_notebook"
```



### DB chạy trên máy chủ và Open Notebook chạy trên Docker

Nếu ON đang chạy trong docker và SurrealDB trên máy chủ của bạn, bạn cần trỏ tới nó.



```env
SURREAL_URL="ws://your-machine-ip:8000/rpc" #or host.docker.internal
SURREAL_USER="root"
SURREAL_PASSWORD="root"
SURREAL_NAMESPACE="open_notebook"
SURREAL_DATABASE="open_notebook"
```



### Mở Notebook và Surreal đang chạy trên cùng một máy

Nếu bạn đang chạy cục bộ cả hai dịch vụ hoặc nếu bạn đang sử dụng [thiết lập vùng chứa đơn](../1-INSTALLATION/single-container.md) không được dùng nữa



```env
SURREAL_URL="ws://localhost:8000/rpc"
SURREAL_USER="root"
SURREAL_PASSWORD="root"
SURREAL_NAMESPACE="open_notebook"
SURREAL_DATABASE="open_notebook"
```



## Nhiều cơ sở dữ liệu

Bạn có thể có nhiều không gian tên trong một phiên bản SurrealDB và bạn cũng có thể có nhiều cơ sở dữ liệu trong một phiên bản. Vì vậy, nếu muốn thiết lập nhiều triển khai noteobok mở cho những người dùng khác nhau, bạn không cần phải triển khai nhiều cơ sở dữ liệu.