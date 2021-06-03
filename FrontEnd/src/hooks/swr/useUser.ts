import useSWR from 'swr';
import { TEN_MINUTES } from '@constants';
import {
  getCurUser,
  login as loginAPI,
  updateUser as updateUserAPI,
  logout as logoutAPI,
  createUser as createUserAPI,
} from '@apis';
import { User } from '@models';

/**
 *
 */
const useUser = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/user',
    getCurUser,
    {
      refreshInterval: TEN_MINUTES,
    },
  );

  // user is only logged in if there is NO ERROR and we have the appropriate user information.
  // explicitly check that `data.name` exists since `data` might exist with `data.message` for
  // the error message
  const isLoggedIn = !error && data && 'name' in data;

  // Use discriminated typing for easy type check
  const userData = { ...data, isLoggedIn } as
    | ({ isLoggedIn: true } & User)
    | { isLoggedIn: false };

  // login wrapper which will also mutate the user with their info
  const login = async (googleLoginToken: string) => {
    const data = await loginAPI(googleLoginToken);

    if (data && !data.isNewUser) mutate(data);
    return data;
  };

  // user update wrapper which will also mutate the user with their info
  const updateUser = async (updates: Partial<User>) => {
    if (!userData.isLoggedIn) return;

    await updateUserAPI(updates);

    const newUserData = { ...userData, ...updates };
    mutate(newUserData);
  };

  // create user wrapper which will also mutate the user with their info
  const createUser = async (user: User) => {
    const data = await createUserAPI(user);

    if (data) mutate(data);
    return data;
  };

  // logout wrapper which will also mutate the user
  const logout = async () => {
    await logoutAPI();
    mutate();
  };

  return {
    data: userData,
    isLoading: !data && !error, // TODO redesign this in the future to be more consistent with other SWR hooks (i.e. so you can do if (!data) rather than if (isLoading))
    login,
    updateUser,
    createUser,
    logout,
    isValidating,
    error,
    mutate,
  };
};

export default useUser;
