import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';

const ProtectedAdminRoute = () => {
  const { isAdmin } = useAdminAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedAdminRoute;
