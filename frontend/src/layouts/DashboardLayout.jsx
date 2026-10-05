import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const DashboardLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useAuth();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <Topbar toggleSidebar={toggleSidebar} pageTitle={pageTitle} />

        {toast && (
          <div className="toast-container">
            <div className={`toast toast-${toast.type}`}>
              {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        <main className="page-wrapper">
          {children}
        </main>

        <footer className="app-footer">
          <p>© 2026 JWT Student Portal | College Management System</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
