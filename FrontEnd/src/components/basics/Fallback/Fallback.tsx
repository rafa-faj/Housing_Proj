import React, { FunctionComponent } from 'react';
import { amenityToIcon, Amenity } from '../Amenities/Amenities';
import { Icon as IconType, miscIcons } from '@icons';

// Amenity needs to be any so it can be type guarded
interface FallbackProps {
  amenity: any;
}

// Type guard to check if key is of Amenity type
const isAmenity = (key: any): key is Amenity => {
  return key in amenityToIcon;
};

// Fallback Icon Component (could be a normal amenity svg too)
const FallbackIcon: FunctionComponent<FallbackProps> = ({ amenity }) => {
  const Icon: IconType = isAmenity(amenity)
    ? amenityToIcon[amenity]
    : miscIcons.Fallback;
  return <Icon />;
};

export default FallbackIcon;
