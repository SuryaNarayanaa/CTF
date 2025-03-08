import { useSelector } from 'react-redux';

const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("This is from The useAuth hook", user);
  return { isAuthenticated: Boolean(user), user };
};

export default useAuth;
