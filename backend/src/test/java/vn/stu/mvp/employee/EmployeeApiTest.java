package vn.stu.mvp.employee;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class EmployeeApiTest {

    private static final String BODY = """
            {"employeeCode":"NV0001","fullName":"Nguyễn Văn A","email":"a.nguyen@example.com",
             "department":"Phòng Kỹ thuật","position":"Developer","hireDate":"2026-11-16"}""";

    @Autowired MockMvc mvc;
    @Autowired EmployeeRepository repository;

    @BeforeEach
    void clean() {
        repository.deleteAll();
    }

    @Test
    void createListUpdateDelete() throws Exception {
        mvc.perform(post("/api/employees").contentType(MediaType.APPLICATION_JSON).content(BODY))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber());
        Long id = repository.findAll().get(0).getId();

        mvc.perform(get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].employeeCode").value("NV0001"));

        mvc.perform(put("/api/employees/" + id).contentType(MediaType.APPLICATION_JSON)
                        .content(BODY.replace("Developer", "Tester")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.position").value("Tester"));

        mvc.perform(delete("/api/employees/" + id)).andExpect(status().isNoContent());
        mvc.perform(get("/api/employees/" + id)).andExpect(status().isNotFound());
    }

    @Test
    void rejectsBlankNameAndDuplicateCode() throws Exception {
        mvc.perform(post("/api/employees").contentType(MediaType.APPLICATION_JSON)
                        .content(BODY.replace("Nguyễn Văn A", "")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());

        mvc.perform(post("/api/employees").contentType(MediaType.APPLICATION_JSON).content(BODY))
                .andExpect(status().isCreated());
        mvc.perform(post("/api/employees").contentType(MediaType.APPLICATION_JSON).content(BODY))
                .andExpect(status().isConflict());
    }
}
