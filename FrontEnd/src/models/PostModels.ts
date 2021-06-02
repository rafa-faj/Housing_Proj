import { Amenity } from '@basics';
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
  facilities: Amenity[];
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

export interface LandlordHousePost {
  name: string;
  icon: string;
  address: string;
  distance: string;
  rent: string;
  roomType: string;
  availability: string;
  leaseTerm: string;
  petPolicy: string;
  parking: string;
  utilityDetails: string;
  facility: Amenity[]; // TODO change key to 'amenities'
  applicationFee: string;
  holdingPeriod: string;
  holdingDeposit: string;
  housingDeposit: string;
  verification: string;
  proofOfIncome: string;
  images: string[];
  website: string;
  phone: string;
  email: string;
}
