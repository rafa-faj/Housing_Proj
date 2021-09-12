import React, { FunctionComponent } from 'react';
import { amenityToIcon, Amenity } from '@basics/Amenities';
import { Icon as IconType, miscIcons } from '@icons';

interface FallbackProps {
  amenity: Amenity;
}

// isAmenity is a type guard to check if key is of Amenity type
const isAmenity = (key: any): key is Amenity => {
  return key in amenityToIcon;
};

// Fallback Icon Component returns an amenity Icon if it is in the list of amenity icons
// otherwise, returns a fallback Icon
const FallbackIcon: FunctionComponent<FallbackProps> = ({ amenity }) => {
  const Icon: IconType = isAmenity(amenity)
    ? amenityToIcon[amenity]
    : miscIcons.Fallback;
  return <Icon />;
};

export default FallbackIcon;
