import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, Save, User, Mail, Phone, GraduationCap, Building2, Calendar, Shield } from 'lucide-react';

const AddStudent = () => {
  const { showToast } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    course: 'Computer Science & Engineering',
    department: 'Computer Science',
    year: '1st Year',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/students', formData);
      showToast(`Student ${formData.name} added successfully! Default login password: student123`, 'success');
      navigate('/admin/students');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add student. Please check username availability.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Add New Student">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <UserPlus size={24} style={{ color: '#2563eb' }} /> Add New Student
          </h2>
          <p className="page-subtitle">Register a new student in the college portal</p>
        </div>
        <Link to="/admin/students" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <div className="input-icon-group">
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="username">Username (Login ID) *</label>
              <div className="input-icon-group">
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="e.g. rahul"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <div className="input-icon-group">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. rahul@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <div className="input-icon-group">
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="e.g. +91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                className="form-control"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="IT">Information Technology</option>
                <option value="Electrical">Electrical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="course">Course *</label>
              <select
                id="course"
                name="course"
                className="form-control"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Electronics & Comm Eng">Electronics & Comm Eng</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label" htmlFor="year">Academic Year *</label>
              <select
                id="year"
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#475569' }}>
            <strong>Note:</strong> Creating this student will automatically generate login credentials with default password <code>student123</code>.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <Link to="/admin/students" className="btn btn-secondary" disabled={loading}>
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner"></span> : <><Save size={16} /> Save Student</>}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-group[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AddStudent;
