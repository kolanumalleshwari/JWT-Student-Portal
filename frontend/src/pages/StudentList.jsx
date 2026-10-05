import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Filter,
  RefreshCw
} from 'lucide-react';

const StudentList = () => {
  const { showToast } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (query = '') => {
    setLoading(true);
    try {
      const url = query ? `/api/students?search=${encodeURIComponent(query)}` : '/api/students';
      const res = await api.get(url);
      setStudents(res.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      showToast('Failed to load student records', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchStudents(term);
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
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to delete student', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Student Management">
      {/* Header & Controls Bar */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={24} style={{ color: '#2563eb' }} /> Student Directory
          </h2>
          <p className="page-subtitle">Manage, search, edit, and delete student records</p>
        </div>
        <Link to="/admin/students/add" className="btn btn-primary">
          <Plus size={18} /> Add New Student
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
            <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '2.6rem', height: '42px' }}
              placeholder="Search by name, username, email, course, department..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={() => fetchStudents(searchTerm)} className="btn btn-secondary" title="Refresh List">
              <RefreshCw size={16} /> Refresh
            </button>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
              Total Records: <strong style={{ color: '#0f172a' }}>{students.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="table-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner" style={{ borderColor: '#cbd5e1', borderTopColor: '#2563eb', margin: '0 auto 1rem auto' }}></div>
            <p style={{ color: '#64748b' }}>Fetching student directory...</p>
          </div>
        ) : students.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <Filter size={40} style={{ color: '#94a3b8', marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', color: '#334155', fontWeight: '700' }}>No Students Found</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {searchTerm ? `No results matching "${searchTerm}"` : 'The student directory is currently empty.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email & Phone</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: '700', color: '#475569' }}>#{student.id}</td>
                    <td>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>{student.name}</div>
                    </td>
                    <td>
                      <span className="badge badge-primary">@{student.username}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{student.email}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{student.phone}</div>
                    </td>
                    <td>{student.course}</td>
                    <td>{student.department}</td>
                    <td>
                      <span className="badge badge-success">{student.year}</span>
                    </td>
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
        title="Confirm Student Deletion"
        message={`Are you sure you want to permanently delete ${selectedStudent?.name} (${selectedStudent?.username})?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedStudent(null);
        }}
        loading={deleting}
      />
    </DashboardLayout>
  );
};

export default StudentList;
