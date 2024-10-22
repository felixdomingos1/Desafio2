// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuth();

  return token ? children : <Navigate to="/entrar" />;
};

export default PrivateRoute;
