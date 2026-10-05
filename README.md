# JWT Student Portal

A full-stack Student Management Portal developed using React.js, Spring Boot, Spring Security, JWT Authentication, and MySQL.

The system provides secure role-based access for Admin and Student users and allows administrators to manage student records through a web-based dashboard.

---

## 🚀 Features

### 🔐 Authentication
- Secure username and password login
- JWT-based authentication
- BCrypt password encryption
- Role-based authorization
- Separate Admin and Student access
- Secure logout

### 👨‍💼 Admin Features
- Admin Dashboard
- View total students
- View total departments
- View total courses
- View active students
- View all students
- Add students
- Edit student details
- Delete students
- View student details
- Manage student records

### 👨‍🎓 Student Features
- Student Dashboard
- View personal profile
- View personal details
- Secure student access
- Logout

---

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- React Router
- Axios
- CSS

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- BCrypt
- REST API
- Maven

### Database
- MySQL
- Hibernate
- JPA

---

## 📁 Project Structure

```text
jwt-student-portal/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
