import useSWR, { mutate } from 'swr';
import { TEN_MINUTES } from '@constants';
import {
  getCurUser,
  updateCurUser,
  createUser as createUserAPI,
  logout as logoutAPI,
  login as loginAPI,
} from '@apis';
import { User } from '@models';

const swrID = '/swr/bookmarks';

type NewUser = Parameters<typeof createUserAPI>[0];
const createUser = (user: NewUser) => {
  const success = createUserAPI(user);
  if (success) {
    mutate(swrID);
  }
};

const logout = async () => {
  const success = await logoutAPI();
  if (success) {
    mutate(swrID);
  }
};

// const login = async (name: string, email: string) => {
//   const result = await loginAPI(name, email);
//   if (!result) return;

//   const newUser = 'newUser' in result;
//   if (newUser) {
//     return { newUser: true };
//   } else {
//     mutate(swrID);
//   }
// };

const useUser = () => {
  const { data, error, isValidating, mutate } = useSWR(
    swrID,
    getCurUser,
    // {
    //   refreshInterval: TEN_MINUTES,
    // },
  );

  const updateUser = (updates: Partial<Omit<User, 'email'>>) => {
    const success = updateCurUser(updates);
    if (success && data) {
      const updatedUser = { ...data, ...updates };
      mutate(updatedUser, false);
    }
  };

  return {
    user: data,
    updateUser,
    // createUser,
    // logout,
    error,
    isValidating,
    mutate,
  };
};

export default useUser;
