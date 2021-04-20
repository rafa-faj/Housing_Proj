import { User } from '../models/User';
import { backendAPI } from './apiBases';

export const getCurUser = async () => {
  const response = await backendAPI.get<User>('/me', {
    withCredentials: true,
  });

  return response.data;
};

export const updateCurUser = async (updates: Partial<Omit<User, 'email'>>) => {
  // TODO temporary until backend doesn't need email to be sent anymore
  const { email } = await getCurUser();

  const response = await backendAPI.post(
    '/profile',
    { email, updates },
    {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    },
  );

  return response.data;
};

export interface UserLoginResponse extends User {
  message: string;
  profile_photo: string;
}

type PotentialNewUser = (User & { isNewUser: false }) | { isNewUser: true };
/**
 * Login a user to a session.
 * @param name - the user's name
 * @param email - the user's email
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
export const login = async (
  name: string,
  email: string,
): Promise<PotentialNewUser> => {
  const response = await backendAPI.post<UserLoginResponse | { newUser: true }>(
    '/login',
    { name, email },
    {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    },
  );

  const isNewUser = 'newUser' in response.data;
  if (isNewUser) return { isNewUser };

  // Typescript can't tell that data must be of type UserLoginResponse here, so explicitly tell it
  const data = response.data as UserLoginResponse;
  const {
    profile_photo: profilePhoto,
    description,
    major,
    schoolYear,
    phone,
  } = data;

  return {
    isNewUser,
    name,
    email,
    profilePhoto,
    description,
    major,
    schoolYear,
    phone,
  };
};

/**
 * Logout a user from a session.
 *
 * @returns - undefined if error occured, string result message otherwise
 */
export const logout = async () => {
  const response = await backendAPI.post<string>('/logout', {
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
  });

  return response.data;
};

/**
 * Echo the edit of profile to backend.
 * @param kvPairs - key value pair for updates
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
export const userEditProfile = async (email: string, kvPairs: any) => {
  try {
    const response = await backendAPI.post(
      '/profile',
      { email, updates: kvPairs },
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    if (response.request?.status !== 201) throw Error('Bad request');

    return response.data;
  } catch (err) {
    console.error(err, 'user edit profile fail');
    return undefined;
  }
};

/**
 * Create a new user.
 * @param user - the user info to create
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
export const createUser = async (
  user: Omit<User, 'token' | 'profilePhoto'>,
): Promise<User> => {
  const response = await backendAPI.post<UserLoginResponse>(
    '/createUser',
    user,
    {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    },
  );

  const {
    profile_photo: profilePhoto,
    name,
    email,
    description,
    major,
    schoolYear,
    phone,
  } = response.data;

  return {
    profilePhoto,
    name,
    email,
    description,
    major,
    schoolYear,
    phone,
  };
};
