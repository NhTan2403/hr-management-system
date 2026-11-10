package vn.stu.mvp.intern;

import java.time.LocalDate;

public record InternResponse(Long id, String studentCode, String fullName,
                             String companyName, String position, LocalDate startDate) {

    static InternResponse from(Intern i) {
        return new InternResponse(i.getId(), i.getStudentCode(), i.getFullName(),
                i.getCompanyName(), i.getPosition(), i.getStartDate());
    }
}
