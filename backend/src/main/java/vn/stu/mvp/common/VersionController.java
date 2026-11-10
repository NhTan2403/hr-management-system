package vn.stu.mvp.common;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** Cho biết bản backend đang chạy trên host, dùng để kiểm tra deploy tự động. */
@RestController
public class VersionController {

    @GetMapping("/api/version")
    public Map<String, String> version() {
        return Map.of("version", "1.0.2");
    }
}
