package vn.stu.mvp.employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByEmployeeCode(String employeeCode);
    boolean existsByEmployeeCodeAndIdNot(String employeeCode, Long id);
}
