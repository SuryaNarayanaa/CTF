import React from 'react';
import { useQueryClient } from 'react-query';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user");
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={user}/>;
};

export default ProtectedLayout;
