export interface UserNameEmail {
  name: string;
  email: string;
}

export interface User extends UserNameEmail {
  profilePhoto: string;
  description: string;
  major: string;
  schoolYear: string;
  phone: string;
}

export const dummyUser: User = {
  profilePhoto: '',
  name: '',
  email: '',
  description: '',
  major: '',
  schoolYear: '',
  phone: '',
};
