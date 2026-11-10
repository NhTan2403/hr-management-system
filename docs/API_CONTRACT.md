# API Contract — Hệ Thống Quản Lý Nhân Sự

Base URL: `http://localhost:8080` (máy cá nhân) hoặc địa chỉ backend trên host.

## Đối tượng Employee

| Trường | Kiểu | Bắt buộc | Ghi chú |
|:---|:---|:---:|:---|
| id | number | — | Tự tăng, chỉ có trong response |
| employeeCode | string (≤ 20) | ✅ | Không trùng |
| fullName | string (≤ 100) | ✅ | |
| email | string (≤ 100) | ✅ | Đúng định dạng email |
| department | string (≤ 100) | ✅ | |
| position | string (≤ 100) | | |
| hireDate | string `yyyy-MM-dd` | | |

## Endpoints

| Method | Đường dẫn | Body | Thành công | Lỗi |
|:---|:---|:---|:---|:---|
| GET | `/api/employees` | — | 200, mảng Employee (mới nhất trước) | |
| GET | `/api/employees/{id}` | — | 200, Employee | 404 |
| POST | `/api/employees` | Employee (không có id) | 201, Employee | 400, 409 |
| PUT | `/api/employees/{id}` | Employee (không có id) | 200, Employee | 400, 404, 409 |
| DELETE | `/api/employees/{id}` | — | 204 | 404 |

## Định dạng lỗi

Mọi lỗi trả về cùng một dạng:

```json
{ "message": "Mã nhân viên đã tồn tại" }
```

- 400: dữ liệu không hợp lệ (thiếu trường bắt buộc, quá dài)
- 404: không tìm thấy id
- 409: trùng mã nhân viên
