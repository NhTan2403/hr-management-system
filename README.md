# MVP — Hệ Thống Quản Lý Nhân Sự

Ứng dụng CRUD 1 bảng (`employees`) cho môn Phân tích thiết kế hệ thống.

- **Frontend**: React (Vite) + Tailwind CSS — thư mục `frontend/`
- **Backend**: Java 17 + Spring Boot (REST API) — thư mục `backend/`
- **Database**: MySQL
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) — push lên `main` là tự deploy

## Bản chạy trên host

- Giao diện (Vercel): https://hr-management-system-ten-virid.vercel.app
- API (Render): https://hr-management-system-api-jres.onrender.com/api/employees
- Cơ sở dữ liệu: TiDB Cloud Starter (tương thích MySQL, dùng driver MySQL); trên máy cá nhân chạy MySQL 8.4 bằng Docker

Backend chạy gói miễn phí của Render nên sẽ ngủ sau khoảng 15 phút không dùng; lần mở đầu tiên có thể chờ gần 1 phút.

## Quy trình CI/CD

Mỗi lần push lên `main`:

1. GitHub Actions chạy test backend và build frontend.
2. Test qua thì workflow gọi Deploy Hook của Render để deploy backend.
3. Frontend được deploy lên Vercel (qua kết nối GitHub của Vercel; nếu đặt `VERCEL_TOKEN` thì workflow tự deploy bằng Vercel CLI).

Tài liệu: [API contract](docs/API_CONTRACT.md) · [Database](docs/DATABASE.md)

## Chạy trên máy

Cần Java 17, Node, Docker.

```bash
docker compose up -d                  # MySQL ở cổng 3307
cd backend && ./mvnw spring-boot:run  # API ở http://localhost:8080
cd frontend && npm install && npm run dev   # Giao diện ở http://localhost:5173
```

Chạy test backend: `cd backend && ./mvnw test`

## Biến môi trường khi deploy

| Nơi | Biến | Ý nghĩa |
|:---|:---|:---|
| Backend | `DB_URL` | `jdbc:mysql://<host>:<port>/<db>?createDatabaseIfNotExist=true&sslMode=VERIFY_IDENTITY` |
| Backend | `DB_USER`, `DB_PASSWORD` | Tài khoản MySQL |
| Backend | `FRONTEND_URL` | Địa chỉ frontend được phép gọi API (CORS) |
| Frontend | `VITE_API_URL` | Địa chỉ backend |

## Secrets trên GitHub (Settings → Secrets and variables → Actions)

| Secret | Lấy ở đâu |
|:---|:---|
| `RENDER_DEPLOY_HOOK` | Render → service → Settings → Deploy Hook |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Vercel → Project → Settings |
