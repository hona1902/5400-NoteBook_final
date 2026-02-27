# Xác Thực và Phân Quyền

Open Notebook hỗ trợ xác thực đa người dùng với kiểm soát truy cập dựa trên vai trò (RBAC).

## Tính Năng

- **Xác thực đa người dùng** với đăng nhập email/mật khẩu
- **Token JWT** (token truy cập + token làm mới)
- **Kiểm soát truy cập dựa trên vai trò** (vai trò admin/user)
- **Tương thích ngược** với cơ chế `OPEN_NOTEBOOK_PASSWORD` cũ

## Vai Trò Người Dùng

### Admin
Truy cập đầy đủ tất cả tính năng:
- Tạo, chỉnh sửa, xóa nguồn (tài liệu, URL, văn bản)
- Quản lý mô hình AI và nhà cung cấp
- Cấu hình biến đổi
- Thay đổi cài đặt hệ thống
- Quản lý người dùng

### User
Truy cập giới hạn:
- Chat với notebook
- Tạo và quản lý notebook/ghi chú
- Thay đổi tùy chọn giao diện
- Tìm kiếm và duyệt nguồn hiện có (chỉ đọc)

**Bị chặn đối với user:**
- Thêm/chỉnh sửa/xóa nguồn
- Cấu hình mô hình/nhà cung cấp
- Quản lý biến đổi
- Cài đặt hệ thống
- Quản lý người dùng

## Biến Môi Trường

| Biến | Mặc định | Mô tả |
|------|----------|-------|
| `OPEN_NOTEBOOK_PASSWORD` | (trống) | Mật khẩu instance cũ. Khi được đặt, mật khẩu này cấp quyền admin. |
| `JWT_SECRET_KEY` | `change-me-in-production-use-secure-random-key` | Khóa bí mật để ký token JWT. **PHẢI thay đổi trong production!** |
| `JWT_ALGORITHM` | `HS256` | Thuật toán ký JWT |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Thời gian hết hạn token truy cập (phút) |
| `JWT_REFRESH_TOKEN_EXPIRE_DAYS` | `7` | Thời gian hết hạn token làm mới (ngày) |

## Tạo Người Dùng Admin Đầu Tiên

### Cách 1: Sử dụng OPEN_NOTEBOOK_PASSWORD (Nhanh)

Đặt biến môi trường `OPEN_NOTEBOOK_PASSWORD`. Bất kỳ đăng nhập nào với mật khẩu này sẽ có quyền admin.

```bash
OPEN_NOTEBOOK_PASSWORD=mat-khau-bao-mat-cua-ban
```

### Cách 2: Chèn trực tiếp vào SurrealDB (Khuyến nghị cho Production)

1. Kết nối tới instance SurrealDB của bạn
2. Chạy truy vấn sau để tạo người dùng admin:

```sql
-- Tạo hash mật khẩu với argon2
-- Trong production, sử dụng công cụ bảo mật để tạo hash
-- Hash ví dụ cho mật khẩu "admin123" (KHÔNG sử dụng trong production):
-- $argon2id$v=19$m=65536,t=3,p=4$...

CREATE user SET
  email = 'admin@example.com',
  password_hash = '<argon2-hashed-password>',
  role = 'admin',
  is_active = true,
  created = time::now(),
  updated = time::now();
```

### Cách 3: Sử dụng Script Python

Tạo file `scripts/create_admin.py`:

```python
import asyncio
from open_notebook.domain.user import User

async def create_admin():
    user = await User.create_user(
        email="admin@example.com",
        password="mat-khau-bao-mat-cua-ban",
        role="admin"
    )
    print(f"Đã tạo người dùng admin: {user.email}")

if __name__ == "__main__":
    asyncio.run(create_admin())
```

Chạy với: `uv run python scripts/create_admin.py`

## Điểm Cuối API

### Xác Thực

| Điểm cuối | Phương thức | Mô tả |
|-----------|-------------|-------|
| `/api/auth/status` | GET | Kiểm tra trạng thái xác thực |
| `/api/auth/login` | POST | Đăng nhập với email/mật khẩu |
| `/api/auth/logout` | POST | Đăng xuất người dùng hiện tại |
| `/api/auth/me` | GET | Lấy thông tin người dùng hiện tại |
| `/api/auth/refresh` | POST | Làm mới token truy cập |
| `/api/auth/users` | GET | Danh sách người dùng (chỉ admin) |
| `/api/auth/users` | POST | Tạo người dùng mới (chỉ admin) |

### Yêu Cầu Đăng Nhập

```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "mat-khau-cua-ban"
}
```

### Phản Hồi Đăng Nhập

```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

## Tích Hợp Frontend

Frontend tự động:
1. Lưu trữ token JWT an toàn
2. Đính kèm token vào các yêu cầu API
3. Làm mới token trước khi hết hạn
4. Ẩn các phần tử UI admin đối với người dùng thường
5. Chuyển hướng đến trang đăng nhập khi xác thực hết hạn

## Thực Hành Bảo Mật Tốt Nhất

1. **Thay đổi JWT_SECRET_KEY** trong production thành chuỗi ngẫu nhiên bảo mật (32+ ký tự)
2. **Sử dụng HTTPS** để bảo vệ token khi truyền
3. **Không bao giờ lưu mật khẩu dạng text** - luôn sử dụng hash argon2
4. **Đặt thời gian hết hạn token phù hợp** theo yêu cầu bảo mật của bạn
5. **Theo dõi các lần đăng nhập thất bại** trong log

## Tương Thích Ngược

Các triển khai hiện tại sử dụng `OPEN_NOTEBOOK_PASSWORD` vẫn hoạt động:
- Nếu mật khẩu được đặt, người dùng có thể đăng nhập với bất kỳ email nào + mật khẩu đó
- Điều này cấp quyền admin (đầy đủ chức năng)
- Hệ thống đa người dùng mới hoạt động song song với xác thực mật khẩu cũ
