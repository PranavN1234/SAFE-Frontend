import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Retrieve auth data from localStorage if available
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : { username: null, customer_id: null, fullname: null, is_admin: null };
  });

  useEffect(() => {
    // Update localStorage when auth changes
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth({ username: null, customer_id: null, fullname: null, is_admin: null });
    localStorage.removeItem('auth'); // Clear auth data from localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
