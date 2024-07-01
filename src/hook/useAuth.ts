import { useSelector } from 'react-redux';
import { RootState } from '../common/types/store';

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};
