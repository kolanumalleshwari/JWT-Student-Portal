import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  User,
  LogOut,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'ADMIN';

  const adminNavs = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Add Student', path: '/admin/students/add', icon: UserPlus },
    { label: 'Profile', path: '/admin/profile', icon: User },
  ];

  const studentNavs = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
  ];

  const navItems = isAdmin ? adminNavs : studentNavs;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            zIndex: 40,
            display: 'block'
          }}
          className="mobile-overlay"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">
            <GraduationCap size={28} className="logo-icon" />
          </div>
          <div className="brand-text">
            <h2 className="brand-title">JWT Portal</h2>
            <span className="brand-sub">College Management</span>
          </div>
        </div>

        <div className="user-card-sm">
          <div className="user-avatar-circle">
            {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
          </div>
          <div className="user-details-sm">
            <div className="user-name-sm">{user?.name || user?.username}</div>
            <div className="user-role-badge">
              <ShieldCheck size={12} style={{ marginRight: '3px' }} />
              {user?.role}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Navigation</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) toggleSidebar();
                }}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="nav-section-title" style={{ marginTop: '1.5rem' }}>Account</div>
          <button onClick={handleLogout} className="nav-link logout-btn">
            <LogOut size={18} className="nav-icon" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <style>{`
        .sidebar {
          width: 260px;
          background-color: #1e293b;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #334155;
          min-height: 100vh;
          transition: transform 0.3s ease;
          z-index: 50;
        }

        .sidebar-brand {
          padding: 1.5rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          border-bottom: 1px solid #334155;
          background-color: #0f172a;
        }

        .brand-logo {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.35);
        }

        .brand-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .brand-sub {
          font-size: 0.725rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .user-card-sm {
          margin: 1.25rem 1rem;
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .user-details-sm {
          overflow: hidden;
        }

        .user-name-sm {
          font-size: 0.875rem;
          font-weight: 600;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role-badge {
          font-size: 0.7rem;
          color: #60a5fa;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          text-transform: uppercase;
        }

        .sidebar-nav {
          padding: 0 1rem 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .nav-section-title {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
          letter-spacing: 0.08em;
          padding: 0.5rem 0.75rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.7rem 0.85rem;
          color: #94a3b8;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          cursor: pointer;
          text-align: left;
        }

        .nav-link:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.08);
        }

        .nav-link.active {
          color: #ffffff;
          background: #2563eb;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .logout-btn:hover {
          background-color: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
