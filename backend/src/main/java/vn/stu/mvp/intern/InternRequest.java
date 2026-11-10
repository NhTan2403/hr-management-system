package vn.stu.mvp.intern;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record InternRequest(
        @NotBlank(message = "Mã sinh viên không được để trống") @Size(max = 20) String studentCode,
        @NotBlank(message = "Họ tên không được để trống") @Size(max = 100) String fullName,
        @NotBlank(message = "Tên công ty không được để trống") @Size(max = 150) String companyName,
        @Size(max = 100) String position,
        LocalDate startDate) {
}
