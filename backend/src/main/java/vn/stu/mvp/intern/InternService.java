package vn.stu.mvp.intern;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.stu.mvp.common.ConflictException;
import vn.stu.mvp.common.NotFoundException;

@Service
public class InternService {

    private final InternRepository repository;

    public InternService(InternRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<InternResponse> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "id")).stream()
                .map(InternResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public InternResponse findById(Long id) {
        return InternResponse.from(get(id));
    }

    @Transactional
    public InternResponse create(InternRequest request) {
        if (repository.existsByStudentCode(request.studentCode().trim())) {
            throw new ConflictException("Mã sinh viên đã tồn tại");
        }
        Intern intern = new Intern();
        apply(intern, request);
        return InternResponse.from(repository.save(intern));
    }

    @Transactional
    public InternResponse update(Long id, InternRequest request) {
        Intern intern = get(id);
        if (repository.existsByStudentCodeAndIdNot(request.studentCode().trim(), id)) {
            throw new ConflictException("Mã sinh viên đã tồn tại");
        }
        apply(intern, request);
        return InternResponse.from(repository.save(intern));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(get(id));
    }

    private Intern get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy sinh viên thực tập có id " + id));
    }

    private void apply(Intern intern, InternRequest request) {
        intern.setStudentCode(request.studentCode().trim());
        intern.setFullName(request.fullName().trim());
        intern.setCompanyName(request.companyName().trim());
        intern.setPosition(request.position());
        intern.setStartDate(request.startDate());
    }
}
