import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import {
  User,
  GraduationCap,
  Building2,
  Calendar,
  Mail,
  Phone,
  ShieldCheck,
  IdCard,
  Sparkles
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, showToast } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    setLoading(true);
    try {
      // First attempt profile endpoint for current logged in student
      const res = await api.get('/api/students/profile');
      setProfile(res.data);
    } catch (error) {
      console.log('Falling back to user info for profile view');
      // If profile fails, fetch via user me endpoint or user context
      try {
        const userRes = await api.get('/api/auth/me');
        setProfile(userRes.data);
      } catch (err) {
        setProfile(user);
      }
    } finally {
      setLoading(false);
    }
  };

  const studentName = profile?.name || user?.name || 'Rahul';

  return (
    <DashboardLayout pageTitle="Student Dashboard">
      {/* Welcome Section */}
      <div className="student-welcome-banner">
        <div className="welcome-avatar-large">
          {studentName.charAt(0)}
        </div>
        <div>
          <div className="welcome-tag">
            <Sparkles size={14} /> Official Student Portal
          </div>
          <h2 className="welcome-title">Welcome, {studentName}</h2>
          <p className="welcome-sub">
            Access your academic records, enrolled course details, and profile information.
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ borderColor: '#cbd5e1', borderTopColor: '#2563eb', margin: '0 auto 1rem auto' }}></div>
          <p style={{ color: '#64748b' }}>Loading your student profile...</p>
        </div>
      ) : (
        <>
          {/* Information Cards */}
          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <IdCard size={24} />
              </div>
              <div className="info-card-content">
                <span className="info-card-label">Student ID</span>
                <span className="info-card-value">#{profile?.id || '101'}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                <User size={24} />
              </div>
              <div className="info-card-content">
                <span className="info-card-label">Name</span>
                <span className="info-card-value">{studentName}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon" style={{ background: '#faf5ff', color: '#9333ea' }}>
                <GraduationCap size={24} />
              </div>
              <div className="info-card-content">
                <span className="info-card-label">Course</span>
                <span className="info-card-value">{profile?.course || 'Computer Science & Engineering'}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon" style={{ background: '#fff7ed', color: '#ea580c' }}>
                <Building2 size={24} />
              </div>
              <div className="info-card-content">
                <span className="info-card-label">Department</span>
                <span className="info-card-value">{profile?.department || 'Computer Science'}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon" style={{ background: '#fef2f2', color: '#dc2626' }}>
                <Calendar size={24} />
              </div>
              <div className="info-card-content">
                <span className="info-card-label">Year</span>
                <span className="info-card-value">{profile?.year || '3rd Year'}</span>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="card" style={{ marginTop: '1.75rem', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>My Profile Details</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Personal and Academic Information</p>
              </div>
              <span className="badge badge-success" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                <ShieldCheck size={14} style={{ marginRight: '4px' }} /> Verified Active Student
              </span>
            </div>

            <div className="profile-details-grid">
              <div className="profile-item">
                <span className="profile-item-label">
                  <User size={16} className="profile-item-icon" /> Full Name
                </span>
                <span className="profile-item-value">{profile?.name || studentName}</span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">
                  <ShieldCheck size={16} className="profile-item-icon" /> Username
                </span>
                <span className="profile-item-value">@{profile?.username || user?.username}</span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">
                  <Mail size={16} className="profile-item-icon" /> Email Address
                </span>
                <span className="profile-item-value">{profile?.email || `${profile?.username || 'student'}@college.edu`}</span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">
                  <Phone size={16} className="profile-item-icon" /> Phone Number
                </span>
                <span className="profile-item-value">{profile?.phone || '+91 9876543210'}</span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">
                  <GraduationCap size={16} className="profile-item-icon" /> Enrolled Course
                </span>
                <span className="profile-item-value">{profile?.course || 'Computer Science & Engineering'}</span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">
                  <Building2 size={16} className="profile-item-icon" /> Department
                </span>
                <span className="profile-item-value">{profile?.department || 'Computer Science'}</span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">
                  <Calendar size={16} className="profile-item-icon" /> Academic Year
                </span>
                <span className="profile-item-value">{profile?.year || '3rd Year'}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .student-welcome-banner {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 16px;
          padding: 2rem 2.25rem;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
          box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.3);
        }

        .welcome-avatar-large {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 3px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          flex-shrink: 0;
        }

        .welcome-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }

        .welcome-title {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .welcome-sub {
          color: #dbeafe;
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem;
        }

        .info-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }

        .info-card:hover {
          transform: translateY(-2px);
        }

        .info-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-card-content {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .info-card-label {
          font-size: 0.775rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .info-card-value {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
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

export default StudentDashboard;
