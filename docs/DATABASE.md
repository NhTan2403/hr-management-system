# Database

MySQL, 1 bảng. Hibernate tự tạo bảng (`ddl-auto: update`).

## employees

| Cột | Kiểu | Ràng buộc |
|:---|:---|:---|
| id | BIGINT | PK, AUTO_INCREMENT |
| employee_code | VARCHAR(20) | NOT NULL, UNIQUE |
| full_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | NOT NULL |
| department | VARCHAR(100) | NOT NULL |
| position | VARCHAR(100) | |
| hire_date | DATE | |
