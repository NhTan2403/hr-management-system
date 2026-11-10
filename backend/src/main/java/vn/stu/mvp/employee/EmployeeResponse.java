package vn.stu.mvp.employee;

import java.time.LocalDate;

public record EmployeeResponse(Long id, String employeeCode, String fullName, String email,
                             String department, String position, LocalDate hireDate) {

    static EmployeeResponse from(Employee i) {
        return new EmployeeResponse(i.getId(), i.getEmployeeCode(), i.getFullName(), i.getEmail(),
                i.getDepartment(), i.getPosition(), i.getHireDate());
    }
}
