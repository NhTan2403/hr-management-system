package vn.stu.mvp.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record EmployeeRequest(
        @NotBlank(message = "Mã nhân viên không được để trống") @Size(max = 20) String employeeCode,
        @NotBlank(message = "Họ tên không được để trống") @Size(max = 100) String fullName,
        @NotBlank(message = "Email không được để trống") @Email(message = "Email không đúng định dạng")
        @Size(max = 100) String email,
        @NotBlank(message = "Phòng ban không được để trống") @Size(max = 100) String department,
        @Size(max = 100) String position,
        LocalDate hireDate) {
}
