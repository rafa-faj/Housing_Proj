import { User } from '../models/User';
import { backendAPI } from './apiBases';

type UserLoginResponse = User | { newUser: boolean };

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
    profilePhoto,
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
 * @param kvPairs - key value pair for updates
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
export const userEditProfile = async (updates: Partial<User>) => {
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
 *
 * @returns - User profile info
 */
export const getCurUser = async () => {
  const response = await backendAPI.get<User>('/me');

  return response.data;
};
