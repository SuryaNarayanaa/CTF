import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated);
  console.log(user);
  return isAuthenticated ? <Outlet context={user} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
