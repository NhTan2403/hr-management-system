# MVP — Danh sách thực tập chuyên ngành

Ứng dụng CRUD 1 bảng (`interns`) cho môn Phân tích thiết kế hệ thống.

- **Frontend**: React (Vite) + Tailwind CSS — thư mục `frontend/`
- **Backend**: Java 17 + Spring Boot (REST API) — thư mục `backend/`
- **Database**: MySQL
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) — push lên `main` là tự deploy

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
| Backend | `DB_URL` | `jdbc:mysql://<host>:<port>/<db>?sslMode=REQUIRED` |
| Backend | `DB_USER`, `DB_PASSWORD` | Tài khoản MySQL |
| Backend | `FRONTEND_URL` | Địa chỉ frontend được phép gọi API (CORS) |
| Frontend | `VITE_API_URL` | Địa chỉ backend |

## Secrets trên GitHub (Settings → Secrets and variables → Actions)

| Secret | Lấy ở đâu |
|:---|:---|
| `RENDER_DEPLOY_HOOK` | Render → service → Settings → Deploy Hook |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Vercel → Project → Settings |
