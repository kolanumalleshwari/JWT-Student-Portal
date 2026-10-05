import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Edit, ArrowLeft, Save } from 'lucide-react';

const EditStudent = () => {
  const { id } = useParams();
  const { showToast } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    course: '',
    department: '',
    year: '',
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    setInitialLoading(true);
    try {
      const res = await api.get(`/api/students/${id}`);
      setFormData(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch student details';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await api.put(`/api/students/${id}`, formData);
      showToast(`Student ${formData.name} updated successfully!`, 'success');
      navigate('/admin/students');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update student.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Edit Student">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Edit size={24} style={{ color: '#d97706' }} /> Edit Student Information
          </h2>
          <p className="page-subtitle">Update record details for student #{id}</p>
        </div>
        <Link to="/admin/students" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        {initialLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ borderColor: '#cbd5e1', borderTopColor: '#2563eb', margin: '0 auto 1rem auto' }}></div>
            <p style={{ color: '#64748b' }}>Loading student information...</p>
          </div>
        ) : (
          <>
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="username">Username (Login ID) *</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Link to="/admin/students" className="btn btn-secondary" disabled={loading}>
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <span className="spinner"></span> : <><Save size={16} /> Update Student</>}
                </button>
              </div>
            </form>
          </>
        )}
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

export default EditStudent;
