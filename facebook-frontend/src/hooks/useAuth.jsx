import { getItemFromLocalStorage } from 'utils';

export const useAuth = () => {
  const token = getItemFromLocalStorage('token');

  return {
    isLoggedIn: !!token
  };
};
