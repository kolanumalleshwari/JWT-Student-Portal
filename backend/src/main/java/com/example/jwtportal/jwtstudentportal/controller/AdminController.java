package com.example.jwtportal.jwtstudentportal.controller;

import com.example.jwtportal.jwtstudentportal.dto.DashboardStatsDTO;
import com.example.jwtportal.jwtstudentportal.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final StudentService studentService;

    public AdminController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        DashboardStatsDTO stats = studentService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}
