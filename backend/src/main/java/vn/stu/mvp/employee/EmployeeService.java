package vn.stu.mvp.employee;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.stu.mvp.common.ConflictException;
import vn.stu.mvp.common.NotFoundException;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<EmployeeResponse> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "id")).stream()
                .map(EmployeeResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public EmployeeResponse findById(Long id) {
        return EmployeeResponse.from(get(id));
    }

    @Transactional
    public EmployeeResponse create(EmployeeRequest request) {
        if (repository.existsByEmployeeCode(request.employeeCode().trim())) {
            throw new ConflictException("Mã nhân viên đã tồn tại");
        }
        Employee employee = new Employee();
        apply(employee, request);
        return EmployeeResponse.from(repository.save(employee));
    }

    @Transactional
    public EmployeeResponse update(Long id, EmployeeRequest request) {
        Employee employee = get(id);
        if (repository.existsByEmployeeCodeAndIdNot(request.employeeCode().trim(), id)) {
            throw new ConflictException("Mã nhân viên đã tồn tại");
        }
        apply(employee, request);
        return EmployeeResponse.from(repository.save(employee));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(get(id));
    }

    private Employee get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy nhân viên có id " + id));
    }

    private void apply(Employee employee, EmployeeRequest request) {
        employee.setEmployeeCode(request.employeeCode().trim());
        employee.setFullName(request.fullName().trim());
        employee.setDepartment(request.department().trim());
        employee.setEmail(request.email().trim());
        employee.setPosition(request.position());
        employee.setHireDate(request.hireDate());
    }
}
