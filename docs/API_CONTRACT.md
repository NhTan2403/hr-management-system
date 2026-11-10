# API Contract — Danh sách thực tập chuyên ngành

Base URL: `http://localhost:8080` (máy cá nhân) hoặc địa chỉ backend trên host.

## Đối tượng Intern

| Trường | Kiểu | Bắt buộc | Ghi chú |
|:---|:---|:---:|:---|
| id | number | — | Tự tăng, chỉ có trong response |
| studentCode | string (≤ 20) | ✅ | Không trùng |
| fullName | string (≤ 100) | ✅ | |
| companyName | string (≤ 150) | ✅ | |
| position | string (≤ 100) | | |
| startDate | string `yyyy-MM-dd` | | |

## Endpoints

| Method | Đường dẫn | Body | Thành công | Lỗi |
|:---|:---|:---|:---|:---|
| GET | `/api/interns` | — | 200, mảng Intern (mới nhất trước) | |
| GET | `/api/interns/{id}` | — | 200, Intern | 404 |
| POST | `/api/interns` | Intern (không có id) | 201, Intern | 400, 409 |
| PUT | `/api/interns/{id}` | Intern (không có id) | 200, Intern | 400, 404, 409 |
| DELETE | `/api/interns/{id}` | — | 204 | 404 |

## Định dạng lỗi

Mọi lỗi trả về cùng một dạng:

```json
{ "message": "Mã sinh viên đã tồn tại" }
```

- 400: dữ liệu không hợp lệ (thiếu trường bắt buộc, quá dài)
- 404: không tìm thấy id
- 409: trùng mã sinh viên
