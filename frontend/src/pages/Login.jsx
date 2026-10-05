import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, User, Eye, EyeOff, Shield, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    const res = await login(username, password);

    if (res.success) {
      if (res.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      setErrorMessage(res.message || 'Invalid username or password');
    }
  };

  const fillDemo = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="login-container">
      <div className="login-card-wrapper">
        <div className="login-header">
          <div className="portal-logo-badge">
            <GraduationCap size={36} />
          </div>
          <h1 className="portal-title">JWT Student Portal</h1>
          <p className="portal-subtitle">Secure College Management System</p>
        </div>

        {errorMessage && (
          <div className="login-error-alert">
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: '8px' }}></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="demo-credentials-box">
          <div className="demo-title">
            <Shield size={14} style={{ color: '#2563eb' }} /> Quick Demo Accounts:
          </div>
          <div className="demo-buttons">
            <button
              type="button"
              className="demo-pill admin-pill"
              onClick={() => fillDemo('admin', 'admin123')}
            >
              <CheckCircle2 size={12} /> Admin (admin / admin123)
            </button>
            <button
              type="button"
              className="demo-pill student-pill"
              onClick={() => fillDemo('rahul', 'student123')}
            >
              <CheckCircle2 size={12} /> Student (rahul / student123)
            </button>
          </div>
        </div>

        <div className="login-footer">
          © 2026 JWT Student Portal | College Management System
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%);
          padding: 1.5rem;
        }

        .login-card-wrapper {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          width: 100%;
          max-width: 440px;
          padding: 2.5rem 2.25rem;
          animation: slideUp 0.3s ease-out;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .portal-logo-badge {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
        }

        .portal-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .portal-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          margin-top: 0.35rem;
        }

        .login-error-alert {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 0.85rem;
          color: #94a3b8;
          pointer-events: none;
        }

        .input-with-icon .form-control {
          padding-left: 2.75rem;
          padding-right: 2.75rem;
          height: 46px;
          font-size: 0.95rem;
        }

        .toggle-password-btn {
          position: absolute;
          right: 0.85rem;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0.2rem;
        }

        .toggle-password-btn:hover {
          color: #475569;
        }

        .login-submit-btn {
          height: 48px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.75rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
        }

        .login-submit-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
        }

        .demo-credentials-box {
          margin-top: 1.75rem;
          padding: 1rem;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
        }

        .demo-title {
          font-size: 0.775rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .demo-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .demo-pill {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.45rem 0.75rem;
          border-radius: 6px;
          font-size: 0.775rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.15s;
        }

        .demo-pill:hover {
          border-color: #3b82f6;
          background: #eff6ff;
          color: #1d4ed8;
        }

        .login-footer {
          margin-top: 1.75rem;
          text-align: center;
          font-size: 0.75rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Login;
