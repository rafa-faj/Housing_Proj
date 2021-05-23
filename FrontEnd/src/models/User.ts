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
  name: 'Jacob Jones',
  email: '123456@ucsd.edu',
  description: '',
  major: 'Computer Science',
  schoolYear: 'Senior',
  phone: '858-123-4567',
};
