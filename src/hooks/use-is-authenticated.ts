import useUser from './use-user';

export const useIsAuthenticated = () => {
  const user = useUser();

  return {
    isAuthenticated: Boolean(user?.email),
    isChecking: false,
  };
};
