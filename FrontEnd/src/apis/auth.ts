import { User } from '@models';
import { backendAPI } from './apiBases';
import { formatWithAws } from '@utils';

export type UserLoginResponse = User | { newUser: boolean };

type PotentialNewUser = (User & { isNewUser: false }) | { isNewUser: true };

/**
 * Login a user to a session.
 *
 * @param name - the user's name
 * @param email - the user's email
 * @returns - { newUser: true } if a new user or a User object
 */
export const login = async (
  googleLoginToken: string,
): Promise<PotentialNewUser> => {
  const response = await backendAPI.post<UserLoginResponse>('/login', {
    googleLoginToken,
  });

  const isNewUser = 'newUser' in response.data;

  if (isNewUser) return { isNewUser };

  // Typescript can't tell that data must be of type User here, so explicitly tell it
  const data = response.data as User;
  const {
    profilePhoto,
    description,
    major,
    schoolYear,
    phone,
    name,
    email,
  } = data;

  return {
    isNewUser,
    profilePhoto: formatWithAws(profilePhoto),
    name,
    email,
    description,
    major,
    schoolYear,
    phone,
  };
};

/**
 * Logout a user from a session.
 *
 * @returns - void
 */
export const logout = async () => {
  backendAPI.get('/logout');
};

/**
 * Echo the edit of profile to backend.
 *
 * @param updates - key value pair for updates
 */
export const updateUser = async (updates: Partial<User>) => {
  const response = await backendAPI.post('/profile', {
    updates: updates,
  });

  return response.data;
};

/**
 * Create a new user.
 *
 * @param user - the user info to create
 * @returns - void
 */
export const createUser = async (user: User) => {
  backendAPI.post('/createUser', user);
};

/**
 * Get user profile information.
 * 400 error gets thrown if not logged in.
 *
 * @returns - User profile info
 */
export const getCurUser = async () => {
  // Google login token unnecessary when user is already logged in
  const data = await login('');

  // For typescript purposes, will never actually run
  if (data.isNewUser) {
    throw Error(
      'This should never be run since the passed google login token is an empty string.',
    );
  }

  return { ...data, isNewUser: undefined } as User;
};
