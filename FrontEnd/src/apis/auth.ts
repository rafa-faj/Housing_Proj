import { User } from '../models/User';
import { backendAPI } from './apiBases';

type UserLoginResponse = (User & { isNewUser: false }) | { isNewUser: true };

/**
 * Login a user to a session.
 * @param name - the user's name
 * @param email - the user's email
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
export const login = async (name: string, email: string) => {
  const response = await backendAPI.post<UserLoginResponse>(
    '/login',
    JSON.stringify({ name, email }),
  );

  const isNewUser = 'newUser' in response.data;

  if (isNewUser) {
    response.data;
    return { isNewUser };
  }

  const {
    profilePhoto,
    name,
    email,
    description,
    major,
    schoolYear,
    phone,
  } = response.data;

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
 * @param token - the token for the user's session.
 * @returns - undefined if error occured, string result message otherwise
 */
export const logout = async (token: string) => {
  const response = await backendAPI.post<string>('/logout');

  return response.data;
};

/**
 * Echo the edit of profile to backend.
 * @param kvPairs - key value pair for updates
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
export const userEditProfile = async (email: string, kvPairs: any) => {
  const response = await backendAPI.post(
    '/profile',
    JSON.stringify({ email, updates: kvPairs }),
  );

  return response.data;
};

/**
 * Create a new user.
 * @param user - the user info to create
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
export const newUser = async (user: User) => {
  const response = await backendAPI.post<UserLoginResponse>(
    '/createUser',
    user,
  );

  return {
    profilePhoto: response.data.profile_photo,
    name: response.data.name,
    email: response.data.email,
    description: response.data.description,
    major: response.data.major,
    schoolYear: response.data.schoolYear,
    phone: response.data.phone,
  } as User;
};
