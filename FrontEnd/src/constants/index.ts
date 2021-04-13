export * from './messages';
export * from './regex';
export * from './months';
export * from './majors';
export * from './years';
export * from './intervals';
export * from './roomType';
export * from './preferences';

const BackendMapping = {
  // TODO should be in camelCase format when returned from backend, this is temporary
  schoolYear: 'school_year',
  RoomType: 'room_type',
  stayPeriod: 'stay_period',
  token: 'token',
  description: 'description',
  major: 'major',
  phone: 'phone',
  name: 'name',
  email: 'email',
  profilePhoto: 'profile_photo',
};

export { BackendMapping };
