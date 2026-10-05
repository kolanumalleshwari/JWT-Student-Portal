package com.example.jwtportal.jwtstudentportal.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
            "status", "Online",
            "service", "JWT Student Portal Spring Boot REST API",
            "frontendUrl", "http://localhost:5173/login",
            "message", "Backend is running smoothly! Please access the web UI at http://localhost:5173/login"
        );
    }
}
