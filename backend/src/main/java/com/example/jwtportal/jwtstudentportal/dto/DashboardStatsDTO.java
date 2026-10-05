package com.example.jwtportal.jwtstudentportal.dto;

public class DashboardStatsDTO {
    private long totalStudents;
    private long totalDepartments;
    private long totalCourses;
    private long activeStudents;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(long totalStudents, long totalDepartments, long totalCourses, long activeStudents) {
        this.totalStudents = totalStudents;
        this.totalDepartments = totalDepartments;
        this.totalCourses = totalCourses;
        this.activeStudents = activeStudents;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public long getActiveStudents() {
        return activeStudents;
    }

    public void setActiveStudents(long activeStudents) {
        this.activeStudents = activeStudents;
    }
}
