export enum RoomType {
  Master = 'Master Bedroom',
  Guest = 'Guest Bedroom',
  Den = 'Den',
  Living = 'Living Room',
  Other = 'Other',
}

export const roomTypes = Object.values(RoomType);

export enum RoomCapacity {
  Single = 'Single',
  Double = 'Double',
  Triple = 'Triple',
}

export const roomCapacities = Object.values(RoomCapacity);
