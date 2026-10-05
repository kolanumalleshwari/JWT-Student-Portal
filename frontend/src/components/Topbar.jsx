import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ toggleSidebar, pageTitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button onClick={toggleSidebar} className="menu-toggle-btn" aria-label="Toggle Sidebar">
          <Menu size={20} />
        </button>
        <div className="header-title-badge">
          <h1 className="topbar-title">{pageTitle || 'College Portal'}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="header-user-info">
          <div className="role-tag">
            <Shield size={13} style={{ marginRight: '4px' }} />
            {user?.role}
          </div>
          <div className="user-name-display">
            <User size={15} style={{ marginRight: '5px', color: '#3b82f6' }} />
            {user?.name || user?.username}
          </div>
        </div>

        <button onClick={handleLogout} className="topbar-logout-btn" title="Logout">
          <LogOut size={16} />
          <span className="logout-text">Logout</span>
        </button>
      </div>

      <style>{`
        .topbar {
          height: 64px;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle-btn {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .menu-toggle-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .topbar-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .header-user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
        }

        .role-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          background: #dbeafe;
          color: #1e40af;
          display: flex;
          align-items: center;
          text-transform: uppercase;
        }

        .user-name-display {
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
          display: flex;
          align-items: center;
        }

        .topbar-logout-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background-color: #fef2f2;
          color: #ef4444;
          border: 1px solid #fecaca;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .topbar-logout-btn:hover {
          background-color: #fee2e2;
          color: #dc2626;
        }

        @media (max-width: 640px) {
          .logout-text {
            display: none;
          }
          .role-tag {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Topbar;
