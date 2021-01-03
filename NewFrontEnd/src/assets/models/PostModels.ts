import { facilityToIcon } from '../../components/HouseProfile';

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
  leaserIntro: string;
  photos: string[];
  profilePhoto: string;
  roomId: number;
  other: string[];
  facilities: (keyof typeof facilityToIcon)[];
  negotiable: boolean;
  numBaths: number;
  numBeds: number;
}

export type HousePostDisplayedProperties = Omit<HousePost, 'roomId'>;

export interface CreateHousePostProperties
  extends Omit<
    HousePost,
    | 'leaserName'
    | 'leaserEmail'
    | 'leaserPhone'
    | 'leaserSchoolYear'
    | 'leaserMajor'
    | 'leaserIntro'
    | 'profilePhoto'
    | 'roomId'
    | 'photos' // change photos to be of File type
  > {
  name: string; // TODO not in thouse post current - this is the propertyType
  location: string;
  distance: string;
  pricePerMonth: number;
  stayPeriod: number;
  early: string;
  late: string;
  roomType: string;
  photos: File[];
  other: string[];
  facilities: (keyof typeof facilityToIcon)[];
  negotiable: boolean; // TODO not in the housepost currently
}

export type HousePostUserData = Pick<
  HousePost,
  | 'leaserName'
  | 'leaserEmail'
  | 'leaserPhone'
  | 'leaserSchoolYear'
  | 'leaserMajor'
  | 'leaserIntro'
  | 'profilePhoto'
>;
