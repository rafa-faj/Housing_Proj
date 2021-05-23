import { facilityToIcon } from '@components/HouseProfile';
import { RoomType } from '../constants';

export interface HousePost {
  name: string;
  address: string;
  distance: string;
  pricePerMonth: number;
  stayPeriod: number;
  earlyDate: string;
  lateDate: string;
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

export interface LandlordHousePost {
  name: string;
  address: string;
  price: string;
  roomType: string;
  availability: string;
  leaseTerm: string;
  petPolicy: string;
  parking: string;
  utilityDetails: string;
  facility: (keyof typeof facilityToIcon)[];
  applicationFee: string;
  holdingPeriod: string;
  holdingDeposit: string;
  housingDeposit: string;
  verification: string;
  proofOfIncome: string;
}