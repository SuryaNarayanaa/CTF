import React from 'react';
import { useQueryClient } from 'react-query';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const queryClient = useQueryClient();
  console.log("inside protected layout");
  const user = queryClient.getQueryData("user");
  console.log("user", user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={user}/>;
};

export default ProtectedLayout;
