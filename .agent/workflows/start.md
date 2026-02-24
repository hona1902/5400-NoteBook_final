---
description: Khởi chạy dự án Open Notebook từ đầu trên Windows
---

# Khởi chạy Open Notebook (Windows)

## Yêu cầu cài đặt trước
- Docker Desktop (cho SurrealDB)
- Python 3.11+ & uv
- Node.js 18+

## Các bước khởi chạy

### Bước 1: Khởi động SurrealDB (Database)
```powershell
cd d:\Project Web\open-notebook
docker compose -f docker-compose.dev.yml up -d surrealdb
```
// turbo
Chờ 5 giây cho database sẵn sàng.

### Bước 2: Khởi động Backend API
Mở terminal mới:
```powershell
cd d:\Project Web\open-notebook
uv run --env-file .env python run_api.py
```
API sẽ chạy tại: http://localhost:5055
API Docs: http://localhost:5055/docs

### Bước 3: Khởi động Frontend
Mở terminal mới:
```powershell
cd d:\Project Web\open-notebook\frontend
npm run dev
```
Frontend sẽ chạy tại: http://localhost:3000

### Bước 4 (tùy chọn): Khởi động Background Worker
Mở terminal mới:
```powershell
cd d:\Project Web\open-notebook
uv run --env-file .env surreal-commands-worker --import-modules commands
```

## Đăng nhập
- URL: http://localhost:3000/login
- Username: admin
- Password: Admin@2025
(Hoặc theo ADMIN_USERNAME / ADMIN_PASSWORD trong file .env)

## Dừng tất cả
```powershell
# Dừng frontend: Ctrl+C trong terminal frontend
# Dừng API: Ctrl+C trong terminal API
# Dừng worker: Ctrl+C trong terminal worker
# Dừng database:
cd d:\Project Web\open-notebook
docker compose -f docker-compose.dev.yml down
```

## Lệnh nhanh (1 dòng khởi động tất cả)
Mở PowerShell:
```powershell
cd d:\Project Web\open-notebook; docker compose -f docker-compose.dev.yml up -d surrealdb; Start-Sleep 5; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\Project Web\open-notebook'; uv run --env-file .env python run_api.py"; Start-Sleep 3; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\Project Web\open-notebook\frontend'; npm run dev"
```
