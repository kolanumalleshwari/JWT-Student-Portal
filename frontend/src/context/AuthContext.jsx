import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_info');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('jwt_token') || null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const { token: jwtToken, username: uname, role, name, id } = response.data;

      const userInfo = { username: uname, role, name, id };

      localStorage.setItem('jwt_token', jwtToken);
      localStorage.setItem('user_info', JSON.stringify(userInfo));

      setToken(jwtToken);
      setUser(userInfo);

      showToast(`Welcome back, ${name || uname}!`, 'success');
      return { success: true, role };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Invalid username or password';
      showToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
    setUser(null);
    setToken(null);
    showToast('Logged out successfully', 'success');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, toast, login, logout, showToast }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
