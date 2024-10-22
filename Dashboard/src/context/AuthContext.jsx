import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../utils/uri';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, settoken] = useState(null);

  const login = async (telefone, password) => {
    try {
      const response = await axios.post(`${SERVER_URL}/admin/login`, { telefone, senha:password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      settoken(response.data.token);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    // localStorage.removeItem('token');
    // setIsAuthenticated(false);
    // settoken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
