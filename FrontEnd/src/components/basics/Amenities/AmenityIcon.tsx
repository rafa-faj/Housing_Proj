import React, { FunctionComponent } from 'react';
import { amenityToIcon, Amenity } from '@basics/Amenities';
import { Icon as IconType, miscIcons } from '@icons';

interface AmentiyIconProps {
  amenity: Amenity;
}

// isAmenity is a type guard to check if key is of Amenity type
const isAmenityIcon = (key: any): key is Amenity => {
  return key in amenityToIcon;
};

// Fallback Icon Component returns an amenity Icon if it is in the list of amenity icons
// otherwise, returns a fallback Icon
const AmenityIcon: FunctionComponent<AmentiyIconProps> = ({ amenity }) => {
  const Icon: IconType = isAmenityIcon(amenity)
    ? amenityToIcon[amenity]
    : miscIcons.fallback;
  return <Icon />;
};

export default AmenityIcon;
