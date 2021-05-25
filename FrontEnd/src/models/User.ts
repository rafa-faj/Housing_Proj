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
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis tristique dui. Etiam facilisis turpis mauris, ac dignissim justo elementum ut. Vivamus et nulla non nunc volutpat pulvinar. Maecenas lacinia enim in magna molestie, a ultrices nisi hendrerit. Duis ut nisi magna. Etiam non nisi sed sem fringilla pellentesque ac ut purus. Nullam molestie molestie gravida. Quisque sollicitudin quam in enim eleifend, at finibus nulla molestie. Cras sed arcu lacus. Praesent efficitur rutrum ligula eu consequat. Sed posuere cursus urna sed rhoncus. Donec sollicitudin faucibus odio eu auct. ',
  major: 'Computer Science',
  schoolYear: 'Senior',
  phone: '858-123-4567',
};
