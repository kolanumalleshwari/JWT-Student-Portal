import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Building2,
  Calendar,
  Mail,
  Phone,
  ArrowLeft,
  Edit,
  ShieldCheck,
  IdCard
} from 'lucide-react';

const StudentProfile = () => {
  const { id } = useParams();
  const { user, showToast } = useAuth();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      if (id) {
        // Fetch specific student by ID (for Admin or direct link)
        const res = await api.get(`/api/students/${id}`);
        setStudent(res.data);
      } else {
        // Fetch logged in user's profile
        try {
          const res = await api.get('/api/students/profile');
          setStudent(res.data);
        } catch (err) {
          const userRes = await api.get('/api/auth/me');
          setStudent(userRes.data);
        }
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      showToast('Student record not found', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <DashboardLayout pageTitle="Student Profile">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <User size={24} style={{ color: '#2563eb' }} /> Student Profile
          </h2>
          <p className="page-subtitle">Detailed record and credentials view</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {isAdmin ? (
            <>
              <Link to="/admin/students" className="btn btn-secondary">
                <ArrowLeft size={16} /> Directory
              </Link>
              {student?.id && (
                <Link to={`/admin/students/edit/${student.id}`} className="btn btn-primary">
                  <Edit size={16} /> Edit Student
                </Link>
              )}
            </>
          ) : (
            <Link to="/student/dashboard" className="btn btn-secondary">
              <ArrowLeft size={16} /> Dashboard
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ borderColor: '#cbd5e1', borderTopColor: '#2563eb', margin: '0 auto 1rem auto' }}></div>
          <p style={{ color: '#64748b' }}>Loading student record...</p>
        </div>
      ) : !student ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <User size={48} style={{ color: '#94a3b8', margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>Student Record Not Found</h3>
          <p style={{ color: '#64748b', marginTop: '0.5rem', marginBottom: '1.5rem' }}>The requested student profile does not exist or has been removed.</p>
          <Link to={isAdmin ? "/admin/students" : "/student/dashboard"} className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      ) : (
        <div className="card" style={{ padding: '2.25rem' }}>
          <div className="profile-header-card">
            <div className="profile-avatar-large">
              {student.name ? student.name.charAt(0) : 'S'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>{student.name}</h2>
                <span className="badge badge-primary">@{student.username}</span>
                <span className="badge badge-success">
                  <ShieldCheck size={13} style={{ marginRight: '3px' }} /> Active Student
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                {student.course} • {student.department} Department
              </p>
            </div>
          </div>

          <div className="profile-details-grid" style={{ marginTop: '2rem' }}>
            <div className="profile-item">
              <span className="profile-item-label">
                <IdCard size={16} className="profile-item-icon" /> Student ID
              </span>
              <span className="profile-item-value">#{student.id}</span>
            </div>

            <div className="profile-item">
              <span className="profile-item-label">
                <User size={16} className="profile-item-icon" /> Full Name
              </span>
              <span className="profile-item-value">{student.name}</span>
            </div>

            <div className="profile-item">
              <span className="profile-item-label">
                <ShieldCheck size={16} className="profile-item-icon" /> Username
              </span>
              <span className="profile-item-value">@{student.username}</span>
            </div>

            <div className="profile-item">
              <span className="profile-item-label">
                <Mail size={16} className="profile-item-icon" /> Email Address
              </span>
              <span className="profile-item-value">{student.email}</span>
            </div>

            <div className="profile-item">
              <span className="profile-item-label">
                <Phone size={16} className="profile-item-icon" /> Phone Number
              </span>
              <span className="profile-item-value">{student.phone}</span>
            </div>

            <div className="profile-item">
              <span className="profile-item-label">
                <GraduationCap size={16} className="profile-item-icon" /> Enrolled Course
              </span>
              <span className="profile-item-value">{student.course}</span>
            </div>

            <div className="profile-item">
              <span className="profile-item-label">
                <Building2 size={16} className="profile-item-icon" /> Department
              </span>
              <span className="profile-item-value">{student.department}</span>
            </div>

            <div className="profile-item">
              <span className="profile-item-label">
                <Calendar size={16} className="profile-item-icon" /> Academic Year
              </span>
              <span className="profile-item-value">{student.year}</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .profile-header-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .profile-avatar-large {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          font-weight: 800;
          box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);
          flex-shrink: 0;
        }

        .profile-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .profile-item {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          padding: 1.1rem;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .profile-item-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .profile-item-icon {
          color: #2563eb;
        }

        .profile-item-value {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default StudentProfile;
