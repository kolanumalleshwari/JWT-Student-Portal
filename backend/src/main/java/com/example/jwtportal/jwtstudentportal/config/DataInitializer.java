package com.example.jwtportal.jwtstudentportal.config;

import com.example.jwtportal.jwtstudentportal.entity.Student;
import com.example.jwtportal.jwtstudentportal.entity.User;
import com.example.jwtportal.jwtstudentportal.repository.StudentRepository;
import com.example.jwtportal.jwtstudentportal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Ensure Admin user exists with valid password
        Optional<User> adminOpt = userRepository.findByUsername("admin");
        if (adminOpt.isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            admin.setName("System Administrator");
            admin.setEmail("admin@college.edu");
            admin.setPhone("+91 9876543200");
            admin.setDepartment("Administration");
            admin.setCourse("Management");
            admin.setYear("Staff");
            userRepository.save(admin);
            System.out.println("Default Admin created: admin / admin123");
        } else {
            // Update admin password to admin123 to guarantee login success
            User admin = adminOpt.get();
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Admin password refreshed: admin / admin123");
        }

        // Seed Sample Students if missing or reset passwords
        createOrUpdateStudent("Rahul Sharma", "rahul", "rahul.sharma@college.edu", "+91 9876543210", "Computer Science & Engineering", "Computer Science", "3rd Year", "student123");
        createOrUpdateStudent("Priya Patel", "priya", "priya.patel@college.edu", "+91 9876543211", "Electronics & Comm Eng", "Electronics", "2nd Year", "student123");
        createOrUpdateStudent("Amit Kumar", "amit", "amit.kumar@college.edu", "+91 9876543212", "Mechanical Engineering", "Mechanical", "4th Year", "student123");
        createOrUpdateStudent("Sneha Reddy", "sneha", "sneha.reddy@college.edu", "+91 9876543213", "Information Technology", "IT", "1st Year", "student123");
        createOrUpdateStudent("Vikram Singh", "vikram", "vikram.singh@college.edu", "+91 9876543214", "Electrical Engineering", "Electrical", "3rd Year", "student123");
        
        System.out.println("Sample Students & User accounts verified and ready!");
    }

    private void createOrUpdateStudent(String name, String username, String email, String phone, String course, String department, String year, String password) {
        if (!studentRepository.existsByUsername(username)) {
            Student student = new Student();
            student.setName(name);
            student.setUsername(username);
            student.setEmail(email);
            student.setPhone(phone);
            student.setCourse(course);
            student.setDepartment(department);
            student.setYear(year);
            studentRepository.save(student);
        }

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole("STUDENT");
            user.setName(name);
            user.setEmail(email);
            user.setPhone(phone);
            user.setCourse(course);
            user.setDepartment(department);
            user.setYear(year);
            userRepository.save(user);
        } else {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(password));
            user.setRole("STUDENT");
            userRepository.save(user);
        }
    }
}
