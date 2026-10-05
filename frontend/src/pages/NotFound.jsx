import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  const { user } = useAuth();

  const redirectPath = user?.role === 'ADMIN' ? '/admin/dashboard' : user?.role === 'STUDENT' ? '/student/dashboard' : '/login';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      padding: '1.5rem',
      textAlign: 'center'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '3rem 2.5rem',
        borderRadius: '20px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          background: '#fef2f2',
          color: '#dc2626',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          border: '1px solid #fecaca'
        }}>
          <AlertCircle size={36} />
        </div>

        <h1 style={{ fontSize: '4rem', fontWeight: '900', color: '#0f172a', lineHeight: '1' }}>404</h1>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#1e293b', marginTop: '0.5rem' }}>Page Not Found</h2>
        <p style={{ color: '#64748b', fontSize: '0.925rem', marginTop: '0.75rem', marginBottom: '2rem', lineHeight: '1.5' }}>
          The page you are looking for does not exist, has been moved, or is restricted in the college portal.
        </p>

        <Link to={redirectPath} className="btn btn-primary" style={{ width: '100%', height: '46px' }}>
          <Home size={18} /> Return to Portal Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
