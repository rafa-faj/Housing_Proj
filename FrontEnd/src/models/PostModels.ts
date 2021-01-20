import { facilityToIcon } from '@components/HouseProfile';
import { RoomType } from '../constants';

export interface HousePost {
  name: string;
  location: string;
  distance: string;
  pricePerMonth: number;
  stayPeriod: number;
  early: string;
  late: string;
  roomType: string;
  leaserName: string;
  leaserEmail: string;
  leaserPhone: string;
  leaserSchoolYear: string; // TODO number;
  leaserMajor: string;
  photos: string[];
  profilePhoto: string;
  roomId: number;
  other: string[];
  facilities: (keyof typeof facilityToIcon)[];
  negotiable: boolean;
  numBaths: string;
  numBeds: string;
  roomDescription: string;
}

export interface HousePostUIData
  extends Omit<HousePost, 'roomId' | 'roomType'> {
  formattedMoveIn: string;
  roomType: RoomType;
}

export interface CreateHousePostProperties
  extends Omit<
    HousePost,
    | 'leaserName'
    | 'leaserEmail'
    | 'leaserPhone'
    | 'leaserSchoolYear'
    | 'leaserMajor'
    | 'profilePhoto'
    | 'roomId'
    | 'photos' // change photos to be of File type
  > {
  photos: File[];
}

export type HousePostUserData = Pick<
  HousePost,
  | 'leaserName'
  | 'leaserEmail'
  | 'leaserPhone'
  | 'leaserSchoolYear'
  | 'leaserMajor'
  | 'profilePhoto'
>;
