# Database

MySQL, 1 bảng. Hibernate tự tạo bảng (`ddl-auto: update`).

## interns

| Cột | Kiểu | Ràng buộc |
|:---|:---|:---|
| id | BIGINT | PK, AUTO_INCREMENT |
| student_code | VARCHAR(20) | NOT NULL, UNIQUE |
| full_name | VARCHAR(100) | NOT NULL |
| company_name | VARCHAR(150) | NOT NULL |
| position | VARCHAR(100) | |
| start_date | DATE | |
