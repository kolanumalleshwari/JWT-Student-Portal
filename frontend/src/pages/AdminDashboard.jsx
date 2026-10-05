import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  Users,
  Building2,
  BookOpen,
  UserCheck,
  Plus,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, showToast } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
    totalCourses: 0,
    activeStudents: 0,
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await api.get('/api/admin/stats');
      setStats(statsRes.data);

      // Fetch student list
      const studentRes = await api.get('/api/students');
      setStudents(studentRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showToast('Failed to load dashboard statistics', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (student) => {
    setSelectedStudent(student);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStudent) return;
    setDeleting(true);
    try {
      await api.delete(`/api/students/${selectedStudent.id}`);
      showToast(`Student ${selectedStudent.name} deleted successfully!`, 'success');
      setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
      setDeleteModalOpen(false);
      setSelectedStudent(null);
      // Refresh stats
      const statsRes = await api.get('/api/admin/stats');
      setStats(statsRes.data);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to delete student', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Admin Dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="banner-tag">
            <Sparkles size={14} /> Administrator Portal
          </div>
          <h2 className="welcome-heading">Welcome, {user?.name || 'Admin'}</h2>
          <p className="welcome-text">
            Manage student records, view system analytics, and perform administrative operations.
          </p>
        </div>
        <div className="banner-action">
          <Link to="/admin/students/add" className="btn btn-primary">
            <Plus size={18} /> Add New Student
          </Link>
        </div>
      </div>

      {/* Dashboard Stat Cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <Users size={26} />
          </div>
          <div>
            <div className="stat-value">{stats.totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#f0fdf4', color: '#16a34a' }}>
            <Building2 size={26} />
          </div>
          <div>
            <div className="stat-value">{stats.totalDepartments}</div>
            <div className="stat-label">Total Departments</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#faf5ff', color: '#9333ea' }}>
            <BookOpen size={26} />
          </div>
          <div>
            <div className="stat-value">{stats.totalCourses}</div>
            <div className="stat-label">Total Courses</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#fff7ed', color: '#ea580c' }}>
            <UserCheck size={26} />
          </div>
          <div>
            <div className="stat-value">{stats.activeStudents}</div>
            <div className="stat-label">Active Students</div>
          </div>
        </div>
      </div>

      {/* Recent Students Table Section */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>Recent Students</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Latest enrolled students in the portal</p>
          </div>
          <Link to="/admin/students" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2563eb', fontWeight: '600', fontSize: '0.875rem' }}>
            View All Students <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ borderColor: '#cbd5e1', borderTopColor: '#2563eb', margin: '0 auto 1rem auto' }}></div>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading student records...</p>
          </div>
        ) : students.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
            <Users size={40} style={{ color: '#94a3b8', marginBottom: '0.75rem' }} />
            <p style={{ color: '#475569', fontWeight: '600' }}>No student records found</p>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>Get started by adding a new student.</p>
            <Link to="/admin/students/add" className="btn btn-primary btn-sm">
              <Plus size={16} /> Add Student
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((student) => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: '700', color: '#475569' }}>#{student.id}</td>
                    <td style={{ fontWeight: '600', color: '#0f172a' }}>{student.name}</td>
                    <td><span className="badge badge-primary">{student.username}</span></td>
                    <td>{student.course}</td>
                    <td>{student.department}</td>
                    <td><span className="badge badge-success">{student.year}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => navigate(`/admin/students/view/${student.id}`)}
                          className="btn btn-sm btn-view"
                          title="View Profile"
                        >
                          <Eye size={15} /> View
                        </button>
                        <button
                          onClick={() => navigate(`/admin/students/edit/${student.id}`)}
                          className="btn btn-sm btn-edit"
                          title="Edit Student"
                        >
                          <Edit size={15} /> Edit
                        </button>
                        <button
                          onClick={() => handleOpenDelete(student)}
                          className="btn btn-sm btn-delete"
                          title="Delete Student"
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Student Record"
        message={`Are you sure you want to delete ${selectedStudent?.name} (${selectedStudent?.username})? This action cannot be reversed.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedStudent(null);
        }}
        loading={deleting}
      />

      <style>{`
        .welcome-banner {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          border-radius: 16px;
          padding: 2rem 2.25rem;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.3);
        }

        .banner-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.6rem;
        }

        .welcome-heading {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .welcome-text {
          color: #dbeafe;
          font-size: 0.925rem;
          margin-top: 0.35rem;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .welcome-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AdminDashboard;
