import { useAppSelector } from './index';
import { authSelector } from '../store';

export const useIsAuthenticated = () => {
  const { isAuthenticated, status } = useAppSelector(authSelector);

  return {
    isAuthenticated,
    isChecking: status === 'checking',
  };
};
