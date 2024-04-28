// src/hooks/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ username: null, customer_id: null });

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth({ username: null, customer_id: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
