package com.example.jwtportal.jwtstudentportal.service;

import com.example.jwtportal.jwtstudentportal.dto.DashboardStatsDTO;
import com.example.jwtportal.jwtstudentportal.entity.Student;
import com.example.jwtportal.jwtstudentportal.entity.User;
import com.example.jwtportal.jwtstudentportal.repository.StudentRepository;
import com.example.jwtportal.jwtstudentportal.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Student> getAllStudents(String search) {
        if (search != null && !search.trim().isEmpty()) {
            return studentRepository.searchStudents(search.trim());
        }
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    public Student getStudentByUsername(String username) {
        return studentRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student profile not found for username: " + username));
    }

    @Transactional
    public Student addStudent(Student student) {
        if (studentRepository.existsByUsername(student.getUsername())) {
            throw new RuntimeException("Username already exists: " + student.getUsername());
        }

        Student savedStudent = studentRepository.save(student);

        // Synchronize with User account for login if not existing
        if (!userRepository.existsByUsername(student.getUsername())) {
            User user = new User();
            user.setUsername(student.getUsername());
            user.setPassword(passwordEncoder.encode("student123")); // Default password for new students
            user.setRole("STUDENT");
            user.setName(student.getName());
            user.setEmail(student.getEmail());
            user.setPhone(student.getPhone());
            user.setCourse(student.getCourse());
            user.setDepartment(student.getDepartment());
            user.setYear(student.getYear());
            userRepository.save(user);
        }

        return savedStudent;
    }

    @Transactional
    public Student updateStudent(Long id, Student updatedDetails) {
        Student existingStudent = getStudentById(id);

        String oldUsername = existingStudent.getUsername();
        existingStudent.setName(updatedDetails.getName());
        existingStudent.setEmail(updatedDetails.getEmail());
        existingStudent.setPhone(updatedDetails.getPhone());
        existingStudent.setCourse(updatedDetails.getCourse());
        existingStudent.setDepartment(updatedDetails.getDepartment());
        existingStudent.setYear(updatedDetails.getYear());

        // Update username if changed
        if (updatedDetails.getUsername() != null && !updatedDetails.getUsername().equals(oldUsername)) {
            if (studentRepository.existsByUsername(updatedDetails.getUsername())) {
                throw new RuntimeException("Username already in use: " + updatedDetails.getUsername());
            }
            existingStudent.setUsername(updatedDetails.getUsername());
        }

        Student savedStudent = studentRepository.save(existingStudent);

        // Synchronize corresponding User entity
        Optional<User> userOpt = userRepository.findByUsername(oldUsername);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(updatedDetails.getName());
            user.setUsername(savedStudent.getUsername());
            user.setEmail(updatedDetails.getEmail());
            user.setPhone(updatedDetails.getPhone());
            user.setCourse(updatedDetails.getCourse());
            user.setDepartment(updatedDetails.getDepartment());
            user.setYear(updatedDetails.getYear());
            userRepository.save(user);
        }

        return savedStudent;
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        String username = student.getUsername();
        studentRepository.delete(student);

        // Remove user login credentials
        userRepository.findByUsername(username).ifPresent(userRepository::delete);
    }

    public DashboardStatsDTO getDashboardStats() {
        long totalStudents = studentRepository.count();
        long totalDepartments = studentRepository.countDistinctDepartments();
        long totalCourses = studentRepository.countDistinctCourses();
        long activeStudents = totalStudents; // All registered students active in system

        if (totalDepartments == 0) totalDepartments = 4;
        if (totalCourses == 0) totalCourses = 6;

        return new DashboardStatsDTO(totalStudents, totalDepartments, totalCourses, activeStudents);
    }
}
