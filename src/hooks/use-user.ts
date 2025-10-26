import { useAppSelector } from './index';
import { userSelector } from '../store';

export default function useUser() {
  return useAppSelector(userSelector);
}
