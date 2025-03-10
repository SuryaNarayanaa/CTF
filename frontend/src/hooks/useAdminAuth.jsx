import useAuth from './useAuth';

const useAdminAuth = () => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = isAuthenticated && user.role === 'admin';
  return { isAdmin, user };
};

export default useAdminAuth;
